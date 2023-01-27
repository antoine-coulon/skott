import path from "node:path";

import { DiGraph, VertexDefinition } from "digraph-js";
import difference from "lodash.difference";

import {
  isFileAffected,
  SkottCache,
  SkottCacheHandler
} from "./cache/index.js";
import { FileReader } from "./filesystem/file-reader.js";
import { FileWriter } from "./filesystem/file-writer.js";
import type { FollowModuleDeclarationOptions } from "./ioc.js";
import execModuleAction from "./modules/resolvers/ecmascript/action.js";
import {
  isTypeScriptModule,
  kExpectedModuleExtensions,
  resolveImportedModulePath
} from "./modules/resolvers/ecmascript/resolver.js";
import { WalkerSelector } from "./modules/walkers/common.js";
import { buildPathAliases } from "./modules/walkers/ecmascript/typescript/path-alias.js";
import {
  findManifestDependencies,
  findMatchesBetweenGraphAndManifestDependencies
} from "./workspace/index.js";

export type SkottNodeBody = {
  size: number;
  thirdPartyDependencies: string[];
  builtinDependencies: string[];
};

export type SkottNode = VertexDefinition<SkottNodeBody>;

export interface SkottConfig {
  entrypoint?: string;
  circularMaxDepth?: number;
  includeBaseDir: boolean;
  incremental?: boolean;
  dependencyTracking: {
    thirdParty: boolean;
    builtin: boolean;
    typeOnly: boolean;
  };
  fileExtensions: string[];
  tsConfigPath: string;
  manifestPath: string;
}

export interface SkottStructure {
  graph: Record<string, SkottNode>;
  files: string[];
}

export interface UnusedDependencies {
  thirdParty: string[];
}

export interface SkottInstance {
  getStructure: () => SkottStructure;
  findLeaves: () => string[];
  findCircularDependencies: () => string[][];
  findUnusedDependencies: () => Promise<UnusedDependencies>;
  hasCircularDependencies: () => boolean;
  findParentsOf: (node: string) => string[];
}

export const defaultConfig = {
  entrypoint: "",
  includeBaseDir: false,
  incremental: false,
  circularMaxDepth: Number.POSITIVE_INFINITY,
  dependencyTracking: {
    thirdParty: false,
    builtin: false,
    typeOnly: true
  },
  fileExtensions: [...kExpectedModuleExtensions],
  tsConfigPath: "tsconfig.json",
  manifestPath: "package.json"
};

export class Skott {
  #cacheHandler: SkottCacheHandler;
  #projectGraph = new DiGraph<SkottNode>();
  #visitedNodes = new Set<string>();
  #baseDir = ".";

  // eslint-disable-next-line max-params
  constructor(
    private readonly config: SkottConfig = defaultConfig,
    private readonly fileReader: FileReader,
    private readonly fileWriter: FileWriter,
    private readonly walkerSelector: WalkerSelector
  ) {
    this.#cacheHandler = new SkottCacheHandler(
      this.fileReader,
      this.fileWriter,
      this.config
    );
  }

  public getStructureCache(): SkottCache {
    return this.#cacheHandler.store;
  }

  private resolveNodePath(nodePath: string): string {
    /**
     * When the base directory name has to be included, every node path should be
     * registered while being discovered without any further do
     */
    if (this.config.includeBaseDir) {
      return nodePath;
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
    const baseDirWithFileSystemSeparator = this.#baseDir.concat(path.sep);
    const nodePathWithoutBaseDir = nodePath.split(
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
    return path.relative(this.#baseDir, nodePath);
  }

  private async addNode(node: string): Promise<void> {
    this.#projectGraph.addVertex({
      id: this.resolveNodePath(node),
      adjacentTo: [],
      body: {
        size: await this.fileReader.stats(node),
        thirdPartyDependencies: [],
        builtinDependencies: []
      }
    });
  }

  private async linkNodes({
    from,
    to
  }: {
    from: string;
    to: string;
  }): Promise<void> {
    await this.addNode(to);
    this.#projectGraph.addEdge({
      from: this.resolveNodePath(from),
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
    const { moduleDeclarations } = await moduleWalker.walk(
      fileContent,
      moduleWalkerConfig
    );

    return moduleDeclarations;
  }

  private async followModuleDeclaration({
    rootPath,
    moduleDeclaration,
    isPathAliasDeclaration = false
  }: FollowModuleDeclarationOptions): Promise<void> {
    /**
     * When performing a global analysis, path aliases must be resolved from
     * the working directory the analysis was started from.
     */
    const baseDirectory = isPathAliasDeclaration
      ? this.fileReader.getCurrentWorkingDir()
      : path.dirname(rootPath);
    const fullFilePathFromBaseDirectory = await resolveImportedModulePath(
      path.join(baseDirectory, moduleDeclaration),
      this.fileReader
    );

    try {
      const nextFileContentToExplore = await this.fileReader.read(
        fullFilePathFromBaseDirectory
      );

      await this.addNode(fullFilePathFromBaseDirectory);
      await this.linkNodes({
        from: rootPath,
        to: fullFilePathFromBaseDirectory
      });

      await this.collectModuleDeclarations(
        fullFilePathFromBaseDirectory,
        nextFileContentToExplore
      );

      return;
    } catch {}

    if (this.config.incremental) {
      try {
        const restoredPath = this.#cacheHandler.restoreFileRelativePath(
          moduleDeclaration,
          this.#baseDir
        );
        const nextFileContentToExplore = await this.fileReader.read(
          restoredPath
        );

        await this.addNode(restoredPath);
        await this.linkNodes({
          from: rootPath,
          to: restoredPath
        });

        await this.collectModuleDeclarations(
          restoredPath,
          nextFileContentToExplore
        );
      } catch {}
    }
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
      await execModuleAction({
        moduleDeclaration,
        projectGraph: this.#projectGraph,
        rawNodePath: rootPath,
        resolvedNodePath,
        config: this.config,
        followModuleDeclaration: this.followModuleDeclaration.bind(this)
      });
    }
  }

  private hasCircularDependencies(): boolean {
    return this.#projectGraph.hasCycles({
      maxDepth: this.config.circularMaxDepth ?? Number.POSITIVE_INFINITY
    });
  }

  private circularDependencies(): string[][] {
    return this.#projectGraph.findCycles({
      maxDepth: this.config.circularMaxDepth ?? Number.POSITIVE_INFINITY
    });
  }

  private findLeaves(): string[] {
    return Object.entries(this.#projectGraph.toDict())
      .filter(([_, node]) => node.adjacentTo.length === 0)
      .map(([leafId]) => leafId);
  }

  private findParentsOf(node: string): string[] {
    const uniqueSetOfParents = new Set<string>([
      ...this.#projectGraph.getDeepParents(node)
    ]);

    return [...uniqueSetOfParents];
  }

  private findAllThirdPartyDependencies(): string[] {
    const graphDependencies = new Set<string>();

    for (const { body } of Object.values(this.#projectGraph.toDict())) {
      body.thirdPartyDependencies.forEach((dep) => graphDependencies.add(dep));
    }

    return Array.from(graphDependencies);
  }

  private async findUnusedDependencies(): Promise<UnusedDependencies> {
    const manifestDependencies = await findManifestDependencies(
      this.#baseDir,
      this.config.manifestPath,
      this.fileReader
    );
    const graphDependencies = this.findAllThirdPartyDependencies();
    const matchedDependencies = findMatchesBetweenGraphAndManifestDependencies(
      graphDependencies,
      manifestDependencies
    );

    return {
      thirdParty: difference(manifestDependencies, matchedDependencies)
    };
  }

  private makeProjectStructure(): SkottStructure {
    const projectStructure = this.#projectGraph.toDict();

    return {
      graph: projectStructure,
      files: Object.keys(projectStructure)
    };
  }

  private async buildFromEntrypoint(entrypoint: string): Promise<void> {
    const entrypointModulePath = await resolveImportedModulePath(
      entrypoint,
      this.fileReader
    );

    if (isTypeScriptModule(entrypointModulePath)) {
      await buildPathAliases(this.fileReader, this.config.tsConfigPath);
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
    await buildPathAliases(this.fileReader, this.config.tsConfigPath);

    for await (const rootFile of this.fileReader.readdir(
      this.fileReader.getCurrentWorkingDir(),
      this.config.fileExtensions
    )) {
      const rootFileContent = await this.fileReader.read(rootFile);

      if (this.config.incremental) {
        this.#cacheHandler.addSourceFile(rootFile, rootFileContent);
      }

      await this.addNode(rootFile);
      await this.collectModuleDeclarations(rootFile, rootFileContent);
    }
  }

  public async initialize(): Promise<SkottInstance> {
    if (this.config.entrypoint) {
      await this.buildFromEntrypoint(this.config.entrypoint);
    } else {
      await this.buildFromRootDirectory();
    }

    if (this.config.incremental) {
      const { graph } = this.makeProjectStructure();
      await this.#cacheHandler.save(graph);
    }

    return {
      getStructure: this.makeProjectStructure.bind(this),
      findCircularDependencies: this.circularDependencies.bind(this),
      hasCircularDependencies: this.hasCircularDependencies.bind(this),
      findLeaves: this.findLeaves.bind(this),
      findParentsOf: this.findParentsOf.bind(this),
      findUnusedDependencies: this.findUnusedDependencies.bind(this)
    };
  }
}
