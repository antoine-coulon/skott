import path from "node:path";

import { DiGraph, VertexDefinition } from "digraph-js";

import { FileReader, FileSystemReader } from "./filesystem/file-reader.js";
import { selectAppropriateModuleWalker } from "./modules/walkers/common.js";
import {
  resolveImportedModulePath,
  isBinaryModule,
  isBuiltinModule,
  isJSONModule,
  isThirdPartyModule,
  kExpectedModuleExtensions,
  isTypeScriptModule
} from "./modules/walkers/ecmascript/module-resolver.js";
import {
  buildPathAliases,
  isTypeScriptPathAlias,
  resolvePathAlias
} from "./modules/walkers/ecmascript/typescript/path-alias.js";

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
  dependencyTracking: {
    thirdParty: boolean;
    builtin: boolean;
    typeOnly: boolean;
  };
  fileExtensions: string[];
  tsConfigPath: string;
}

export interface SkottStructure {
  graph: Record<string, SkottNode>;
  files: string[];
}

export interface SkottInstance {
  getStructure: () => SkottStructure;
  findLeaves: () => string[];
  findCircularDependencies: () => string[][];
  hasCircularDependencies: () => boolean;
  findParentsOf: (node: string) => string[];
}

const defaultConfig = {
  entrypoint: "",
  includeBaseDir: false,
  circularMaxDepth: Number.POSITIVE_INFINITY,
  dependencyTracking: {
    thirdParty: false,
    builtin: false,
    typeOnly: true
  },
  fileExtensions: [...kExpectedModuleExtensions],
  tsConfigPath: "tsconfig.json"
};

export class Skott {
  #projectGraph = new DiGraph<SkottNode>();
  #visitedNodes = new Set<string>();
  #baseDir = ".";

  constructor(
    private readonly config: SkottConfig = defaultConfig,
    private readonly fileReader: FileReader = new FileSystemReader()
  ) {}

  private formatNodePath(nodePath: string): string {
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
      id: this.formatNodePath(node),
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
      from: this.formatNodePath(from),
      to: this.formatNodePath(to)
    });
  }

  private async findModuleDeclarations(
    fileName: string,
    fileContent: string
  ): Promise<Set<string>> {
    const moduleWalker = selectAppropriateModuleWalker(fileName);
    const moduleWalkerConfig = {
      trackTypeOnlyDependencies: this.config.dependencyTracking.typeOnly
    };
    const { moduleDeclarations } = await moduleWalker.walk(
      fileContent,
      moduleWalkerConfig
    );

    return moduleDeclarations;
  }

  private async followModuleDeclarationsFromFile({
    rootPath,
    moduleDeclaration,
    isPathAliasDeclaration = false
  }: {
    rootPath: string;
    moduleDeclaration: string;
    isPathAliasDeclaration?: boolean;
  }): Promise<void> {
    /**
     * When performing a global analysis, path aliases must be resolved from
     * the working directory the analysis was started from.
     */
    const baseDirectory =
      !this.config.entrypoint && isPathAliasDeclaration
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

      await this.collectModuleDeclarationsFromFile(
        fullFilePathFromBaseDirectory,
        nextFileContentToExplore
      );
    } catch {}
  }

  private async collectModuleDeclarationsFromFile(
    rootPath: string,
    fileContent: string
  ): Promise<void> {
    if (this.#visitedNodes.has(rootPath)) {
      return;
    }

    const moduleDeclarations = await this.findModuleDeclarations(
      rootPath,
      fileContent
    );

    this.#visitedNodes.add(rootPath);

    if (moduleDeclarations.size === 0) {
      return;
    }

    for (const moduleDeclaration of moduleDeclarations.values()) {
      if (
        isBinaryModule(moduleDeclaration) ||
        isJSONModule(moduleDeclaration)
      ) {
        continue;
      }

      const formattedNodePath = this.formatNodePath(rootPath);

      if (isBuiltinModule(moduleDeclaration)) {
        if (!this.config.dependencyTracking.builtin) {
          continue;
        }

        this.#projectGraph.mergeVertexBody(formattedNodePath, (body) => {
          body.builtinDependencies =
            body.builtinDependencies.concat(moduleDeclaration);
        });
      } else if (isTypeScriptPathAlias(moduleDeclaration)) {
        const resolvedModulePath = resolvePathAlias(moduleDeclaration);

        if (resolvedModulePath) {
          await this.followModuleDeclarationsFromFile({
            rootPath,
            moduleDeclaration: resolvedModulePath,
            isPathAliasDeclaration: true
          });
        }
      } else if (isThirdPartyModule(moduleDeclaration)) {
        if (!this.config.dependencyTracking.thirdParty) {
          continue;
        }

        this.#projectGraph.mergeVertexBody(formattedNodePath, (body) => {
          body.thirdPartyDependencies =
            body.thirdPartyDependencies.concat(moduleDeclaration);
        });
      }

      await this.followModuleDeclarationsFromFile({
        rootPath,
        moduleDeclaration
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

    this.#baseDir = path.dirname(entrypointModulePath);
    await this.addNode(entrypointModulePath);
    await this.collectModuleDeclarationsFromFile(
      entrypointModulePath,
      rootFileContent
    );
  }

  private async buildFromRootDirectory(): Promise<void> {
    await buildPathAliases(this.fileReader, this.config.tsConfigPath);

    for await (const rootFile of this.fileReader.readdir(
      this.fileReader.getCurrentWorkingDir(),
      this.config.fileExtensions
    )) {
      const rootFileContent = await this.fileReader.read(rootFile);
      await this.addNode(rootFile);
      await this.collectModuleDeclarationsFromFile(rootFile, rootFileContent);
    }
  }

  public async initialize(): Promise<SkottInstance> {
    if (this.config.entrypoint) {
      await this.buildFromEntrypoint(this.config.entrypoint);
    } else {
      await this.buildFromRootDirectory();
    }

    return {
      getStructure: this.makeProjectStructure.bind(this),
      findCircularDependencies: this.circularDependencies.bind(this),
      hasCircularDependencies: this.hasCircularDependencies.bind(this),
      findLeaves: this.findLeaves.bind(this),
      findParentsOf: this.findParentsOf.bind(this)
    };
  }
}
