import path from "node:path";

import { pipe } from "@effect/data/Function";
import * as Option from "@effect/data/Option";
import * as Effect from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import { DiGraph } from "digraph-js";
import difference from "lodash.difference";

import {
  isFileAffected,
  type SkottCache,
  SkottCacheHandler
} from "./cache/index.js";
import { type FileReader, FileReaderTag } from "./filesystem/file-reader.js";
import type { FileWriter } from "./filesystem/file-writer.js";
import { toUnixPathLike } from "./filesystem/path.js";
import type { SkottNode } from "./graph/node.js";
import { type TraversalApi, makeTraversalApi } from "./graph/traversal.js";
import {
  highlight,
  logFailureM,
  LoggerTag,
  logSuccessM,
  lowlight,
  type SkottLogger
} from "./logger.js";
import {
  type DependencyResolver,
  type FollowModuleDeclarationOptions,
  isManifestFile,
  kExpectedModuleExtensions,
  resolveImportedModulePath
} from "./modules/resolvers/base-resolver.js";
import {
  EcmaScriptDependencyResolver,
  isTypeScriptProject
} from "./modules/resolvers/ecmascript/resolver.js";
import { ModuleWalkerSelector } from "./modules/walkers/common.js";
import {
  buildPathAliases,
  type TSConfig
} from "./modules/walkers/ecmascript/typescript/path-alias.js";
import {
  extractInformationFromManifest,
  findManifestDependencies,
  findMatchesBetweenGraphAndManifestDependencies,
  findRootManifest,
  findUnusedImplicitDependencies,
  type ManifestDependenciesByName
} from "./workspace/index.js";

export interface SkottConfig<T> {
  entrypoint?: string;
  circularMaxDepth: number;
  dependencyResolvers: DependencyResolver<T>[];
  dependencyTracking: {
    thirdParty: boolean;
    builtin: boolean;
    typeOnly: boolean;
  };
  fileExtensions: string[];
  includeBaseDir: boolean;
  incremental: boolean;
  manifestPath: string;
  tsConfigPath: string;
}

export interface SkottStructure<T = unknown> {
  graph: Record<string, SkottNode<T>>;
  files: string[];
}

export interface UnusedDependencies {
  thirdParty: string[];
}

export interface ImplicitUnusedDependenciesOptions {
  implicitDependencies: {
    findUnused: (cwd: string) => Promise<string[]>;
  };
}

export interface SkottInstance<T = unknown> {
  useGraph: () => TraversalApi<T>;
  getStructure: () => SkottStructure<T>;
  getWorkspace: () => ManifestDependenciesByName;
  findUnusedDependencies: (
    options?: ImplicitUnusedDependenciesOptions
  ) => Promise<UnusedDependencies>;
}

export const defaultConfig = {
  entrypoint: "",
  circularMaxDepth: Number.POSITIVE_INFINITY,
  dependencyResolvers: [new EcmaScriptDependencyResolver()],
  dependencyTracking: {
    thirdParty: false,
    builtin: false,
    typeOnly: true
  },
  fileExtensions: [...kExpectedModuleExtensions],
  includeBaseDir: false,
  incremental: false,
  manifestPath: "package.json",
  tsConfigPath: "tsconfig.json"
};

export interface WorkspaceConfiguration {
  typescript: TSConfig;
  pathAliases: Map<string, string>;
  manifests: ManifestDependenciesByName;
}

export class Skott<T> {
  #cacheHandler: SkottCacheHandler<T>;
  #projectGraph = new DiGraph<SkottNode<T>>();
  #visitedNodes = new Set<string>();
  #baseDir = ".";
  #workspaceConfiguration: WorkspaceConfiguration = {
    typescript: {},
    pathAliases: new Map(),
    manifests: {}
  };

  constructor(
    private readonly config: SkottConfig<T>,
    private readonly fileReader: FileReader,
    private readonly fileWriter: FileWriter,
    private readonly walkerSelector: ModuleWalkerSelector,
    private readonly logger: SkottLogger
  ) {
    this.#cacheHandler = new SkottCacheHandler(
      this.fileReader,
      this.fileWriter,
      this.config,
      this.logger
    );
  }

  public getStructureCache(): SkottCache<T> {
    return this.#cacheHandler.store;
  }

  private resolveNodePath(
    nodePath: string,
    fallbackToRelativeResolution = true
  ): string {
    const normalizedNodePath = toUnixPathLike(nodePath);
    const fileHasNoBaseDir = path.dirname(nodePath) === ".";
    const fileIsAlreadyRelativelyResolved = nodePath.includes("..");
    /**
     * When the base directory name has to be included, every node path should be
     * registered while being discovered without any further do
     */
    if (
      this.config.includeBaseDir ||
      fileIsAlreadyRelativelyResolved ||
      fileHasNoBaseDir
    ) {
      return normalizedNodePath;
    }

    /**
     * When the base directory name has to be ignored, we try to remove it
     * in the current node path.
     * "lib/index.js" <-- "lib" is the base directory name
     * "lib/util/index.js" <-- "lib" must be removed from the node path.
     *
     * Given that "lib/index.js" uses "lib/util/index.js" we should have the
     * following graph:
     * {
     *    "index.js": {
     *      adjacentTo: ["util/index.js"]
     *    },
     *    "util/index.js": {}
     * }
     * See above how "lib/" was removed from the "lib/util/index.js" node path
     * because everything needs to be relative to the entrypoint when not including
     * base directory name.
     */
    const baseDirWithFileSystemSeparator = this.#baseDir.concat("/");
    const nodePathWithoutBaseDir = normalizedNodePath.split(
      baseDirWithFileSystemSeparator
    )[1];

    if (nodePathWithoutBaseDir) {
      return nodePathWithoutBaseDir;
    }

    /**
     * If we can't create a node path without the base directory name,
     * it probably means that the initial node path is located in a higher scope
     * than the base directory name.
     * Example:
     * Say we have the following file "lib/feature/index.js" with the following
     * content:
     *    import * as _1 from "../something.js";
     *
     * If providing the entrypoint as "lib/feature/index.js", the base
     * directory name will be "lib/feature".
     * However "../something.js" is located in lib/ and is out of the scope of
     * lib/feature (base directory name). Consequently, the node path must
     * be resolved relatively from the base directory name.
     */
    if (fallbackToRelativeResolution) {
      return toUnixPathLike(path.relative(this.#baseDir, nodePath));
    }

    return normalizedNodePath;
  }

  private async addNode(node: string): Promise<void> {
    this.#projectGraph.addVertex({
      id: this.resolveNodePath(node),
      adjacentTo: [],
      // @ts-ignore
      body: {
        size: await this.fileReader.stats(node),
        thirdPartyDependencies: [],
        builtinDependencies: []
      }
    });
  }

  private async linkNodes({
    from,
    to,
    useRelativeResolution = false
  }: {
    from: string;
    to: string;
    useRelativeResolution?: boolean;
  }): Promise<void> {
    await this.addNode(to);
    this.#projectGraph.addEdge({
      from: this.resolveNodePath(from, !useRelativeResolution),
      to: this.resolveNodePath(to)
    });
  }

  private async findModuleDeclarations(
    fileName: string,
    fileContent: string
  ): Promise<Set<string>> {
    if (this.config.incremental) {
      const cachedNode = this.#cacheHandler.get(this.resolveNodePath(fileName));

      if (cachedNode && !isFileAffected(fileContent, cachedNode.hash)) {
        this.logger.info(
          `Restoring module declarations from unaffected ${fileName}`
        );

        return this.#cacheHandler.restoreModuleDeclarations(
          cachedNode,
          this.#baseDir
        );
      }
    }

    const moduleWalker =
      this.walkerSelector.selectAppropriateModuleWalker(fileName);
    const moduleWalkerConfig = {
      trackTypeOnlyDependencies: this.config.dependencyTracking.typeOnly
    };

    this.logger.info(
      `Looking for ${highlight(fileName)} module declarations ${lowlight(
        `using ${moduleWalker.constructor.name}`
      )}`
    );

    const { moduleDeclarations } = await moduleWalker.walk({
      fileName,
      fileContent,
      config: moduleWalkerConfig,
      logger: this.logger
    });

    return moduleDeclarations;
  }

  private async followModuleDeclaration({
    rootPath,
    moduleDeclaration,
    isPathAliasDeclaration = false,
    pathAliasBaseUrl = "./"
  }: FollowModuleDeclarationOptions): Promise<boolean> {
    /**
     * When performing a global analysis, path aliases must be resolved from
     * the working directory the analysis was started from.
     */
    let isModuleSuccessfullyResolved = false;
    const baseDirectory = isPathAliasDeclaration
      ? pathAliasBaseUrl
      : path.dirname(rootPath);

    const moduleResolutionExit = await pipe(
      resolveImportedModulePath(path.join(baseDirectory, moduleDeclaration)),
      Effect.orElse(() =>
        resolveImportedModulePath(path.join(this.#baseDir, moduleDeclaration))
      ),
      Effect.orElse(() =>
        resolveImportedModulePath(
          path.join(this.fileReader.getCurrentWorkingDir(), moduleDeclaration)
        )
      ),
      Effect.orElse(() => {
        const cwd = this.fileReader.getCurrentWorkingDir();
        const baseDirectory = cwd === process.cwd() ? "./" : cwd;
        const aliasPathStartingFromTsConfig = path.join(
          baseDirectory,
          path.dirname(this.config.tsConfigPath),
          pathAliasBaseUrl,
          moduleDeclaration
        );

        return resolveImportedModulePath(aliasPathStartingFromTsConfig);
      }),
      Effect.provideService(FileReaderTag, this.fileReader),
      Effect.provideService(LoggerTag, this.logger),
      Effect.runPromiseExit
    );

    if (Exit.isFailure(moduleResolutionExit)) {
      return false;
    }

    if (this.config.incremental) {
      try {
        const restoredPath = this.#cacheHandler.restoreFileRelativePath(
          moduleDeclaration,
          this.#baseDir
        );
        const nextFileContentToExplore =
          await this.fileReader.read(restoredPath);

        await this.addNode(restoredPath);
        await this.linkNodes({
          from: rootPath,
          to: restoredPath
        });

        await this.collectModuleDeclarations(
          restoredPath,
          nextFileContentToExplore
        );

        return true;
      } catch {}
    }

    try {
      const fullFilePathFromBaseDirectory = moduleResolutionExit.value;

      const nextFileContentToExplore = await this.fileReader.read(
        fullFilePathFromBaseDirectory
      );

      await this.linkNodes({
        from: rootPath,
        to: fullFilePathFromBaseDirectory,
        /**
         * Resolving the source node ("from" in that case) can be done using
         * multiple base directory strategies. When resolving a path alias, the
         * base directory is the path alias base directory. When resolving a
         * relative path, the base directory is the base directory of the project.
         * Consequently when having a path alias, the "from" node path must
         * not be resolved relatively to the base directory of the project but
         * relatively to the path alias base directory.
         */
        useRelativeResolution: isPathAliasDeclaration
      });

      await this.collectModuleDeclarations(
        fullFilePathFromBaseDirectory,
        nextFileContentToExplore
      );

      isModuleSuccessfullyResolved = true;
    } catch {}

    return isModuleSuccessfullyResolved;
  }

  private async collectModuleDeclarations(
    rootPath: string,
    fileContent: string
  ): Promise<void> {
    if (this.#visitedNodes.has(rootPath)) {
      return;
    }

    if (this.config.incremental) {
      this.#cacheHandler.addSourceFile(
        this.resolveNodePath(rootPath),
        fileContent
      );
    }

    const moduleDeclarations = await this.findModuleDeclarations(
      rootPath,
      fileContent
    );

    this.#visitedNodes.add(rootPath);

    if (moduleDeclarations.size === 0) {
      return;
    }

    const resolvedNodePath = this.resolveNodePath(rootPath);

    for (const moduleDeclaration of moduleDeclarations.values()) {
      for (const resolver of this.config.dependencyResolvers) {
        this.logger.info(
          `Resolving ${highlight(moduleDeclaration)} ${lowlight(
            `using ${resolver.constructor.name}`
          )}`
        );

        const result = await resolver.resolve({
          moduleDeclaration,
          projectGraph: this.#projectGraph,
          config: this.config,
          rawNodePath: rootPath,
          resolvedNodePath,
          workspaceConfiguration: this.#workspaceConfiguration,
          logger: this.logger,
          followModuleDeclaration: this.followModuleDeclaration.bind(this)
        });

        if (Option.isSome(result)) {
          if (result.value.exitOnResolve) {
            break;
          }
        }
      }
    }
  }

  private findThirdPartyDependenciesFromGraph(): string[] {
    const graphDependencies = new Set<string>();

    for (const { body } of Object.values(this.#projectGraph.toDict())) {
      body.thirdPartyDependencies.forEach((dep) => graphDependencies.add(dep));
    }

    return Array.from(graphDependencies);
  }

  private async findUnusedDependencies(
    options = {
      implicitDependencies: {
        findUnused: findUnusedImplicitDependencies
      }
    }
  ): Promise<UnusedDependencies> {
    const manifestDependencies = await pipe(
      findManifestDependencies(this.#baseDir, this.config.manifestPath),
      Effect.provideService(FileReaderTag, this.fileReader),
      Effect.runPromise
    );

    const graphDependencies = this.findThirdPartyDependenciesFromGraph();

    const matchedDependencies = findMatchesBetweenGraphAndManifestDependencies(
      graphDependencies,
      manifestDependencies
    );

    const unusedImplicitDependencies =
      await options.implicitDependencies.findUnused(
        path.join(
          this.fileReader.getCurrentWorkingDir(),
          path.dirname(this.config.manifestPath)
        )
      );

    return {
      thirdParty: Array.from(
        new Set(
          difference(manifestDependencies, matchedDependencies).concat(
            unusedImplicitDependencies
          )
        )
      )
    };
  }

  private makeProjectStructure(): SkottStructure<T> {
    const projectStructure = this.#projectGraph.toDict();

    return {
      graph: projectStructure,
      files: Object.keys(projectStructure)
    };
  }

  private async buildFromEntrypoint(entrypoint: string): Promise<void> {
    const entrypointModulePath = await pipe(
      resolveImportedModulePath(entrypoint),
      Effect.provideService(FileReaderTag, this.fileReader),
      Effect.provideService(LoggerTag, this.logger),
      Effect.mapError(() => new Error(`Entrypoint "${entrypoint}" not found`)),
      Effect.tapBoth(
        ({ message }) => Effect.sync(() => this.logger.failure(message)),
        () => Effect.sync(() => this.logger.success(`${entrypoint} found.`))
      ),
      Effect.runPromise
    );

    const doesTsConfigExist = await pipe(
      isTypeScriptProject(this.config.tsConfigPath),
      Effect.provideService(FileReaderTag, this.fileReader),
      Effect.runPromise
    );

    if (doesTsConfigExist) {
      const rootTSConfig = await buildPathAliases(
        this.fileReader,
        this.config.tsConfigPath,
        this.#workspaceConfiguration.pathAliases,
        this.logger
      );
      this.#workspaceConfiguration.typescript = rootTSConfig;
    }

    const rootFileContent = await this.fileReader.read(entrypointModulePath);
    if (this.config.incremental) {
      this.#cacheHandler.addSourceFile(entrypointModulePath, rootFileContent);
    }

    this.#baseDir = path.dirname(entrypointModulePath);
    await this.addNode(entrypointModulePath);
    await this.collectModuleDeclarations(entrypointModulePath, rootFileContent);
  }

  private async buildFromRootDirectory(): Promise<void> {
    const rootTSConfig = await buildPathAliases(
      this.fileReader,
      this.config.tsConfigPath,
      this.#workspaceConfiguration.pathAliases,
      this.logger
    );
    this.#workspaceConfiguration.typescript = rootTSConfig;

    for await (const rootFile of this.fileReader.readdir(
      this.fileReader.getCurrentWorkingDir(),
      this.config.fileExtensions
    )) {
      const rootFileContent = await this.fileReader.read(rootFile);

      if (isManifestFile(rootFile)) {
        extractInformationFromManifest(
          rootFileContent,
          rootFile,
          this.logger,
          this.#workspaceConfiguration.manifests
        );

        continue;
      }

      if (this.config.incremental) {
        this.#cacheHandler.addSourceFile(rootFile, rootFileContent);
      }

      await this.addNode(rootFile);
      await this.collectModuleDeclarations(rootFile, rootFileContent);
    }
  }

  private extractRootManifestInformation() {
    return pipe(
      findRootManifest(this.#baseDir, this.config.manifestPath),
      Effect.tap(({ dependencies, name }) =>
        Effect.sync(() => {
          this.#workspaceConfiguration.manifests[name ?? "root"] = {
            dependencies,
            devDependencies: {},
            peerDependencies: {}
          };
        })
      ),
      Effect.tapBoth(
        () =>
          logFailureM(
            "Root manifest not found. Third-party dependencies will to be resolved with other heuristics."
          ),
        () =>
          logSuccessM(
            "Root manifest found. Third-party dependencies will to be resolved from it."
          )
      ),
      Effect.provideService(LoggerTag, this.logger),
      Effect.provideService(FileReaderTag, this.fileReader)
    );
  }

  public async initialize(): Promise<SkottInstance<T>> {
    await pipe(this.extractRootManifestInformation(), Effect.runPromiseExit);

    if (this.config.entrypoint) {
      this.logger.info(`Building from entrypoint: ${this.config.entrypoint}`);
      await this.buildFromEntrypoint(this.config.entrypoint);
    } else {
      this.logger.info(`Building from root directory`);
      await this.buildFromRootDirectory();
    }

    if (this.config.incremental) {
      const { graph } = this.makeProjectStructure();
      await this.#cacheHandler.save(graph);
    }

    return {
      useGraph: () => makeTraversalApi(this.#projectGraph, this.config),
      getStructure: this.makeProjectStructure.bind(this),
      getWorkspace: () => this.#workspaceConfiguration.manifests,
      findUnusedDependencies: this.findUnusedDependencies.bind(this)
    };
  }
}
