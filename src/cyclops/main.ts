import path from "path";

import { DiGraph, VertexDefinition } from "digraph-js";
import { walk } from "estree-walker";
import { parseScript } from "meriyah";

import { FileReader, FileSystemReader } from "../file-reader/index.js";

import {
  isBuiltinModule,
  isThirdPartyModule
} from "./module-import-checker.js";

type CyclopsNode = VertexDefinition<{ size: number }>;

export interface CyclopsConfig {
  entrypoint: string;
}

export interface CyclopsStructure {
  graph: Record<string, CyclopsNode>;
  files: string[];
  circularDependencies: string[][];
  hasCircularDependencies: boolean;
  leaves: string[];
}

export interface CyclopsInstance {
  getStructure: () => CyclopsStructure;
  findLeaves: () => string[];
  findCircularDependencies: () => string[][];
  hasCircularDependencies: () => boolean;
}

export class Cyclops {
  #projectGraph = new DiGraph<CyclopsNode>();
  #visitedNodes = new Set<string>();

  constructor(
    private readonly config: CyclopsConfig,
    private readonly fileReader: FileReader = new FileSystemReader()
  ) {}

  private addNode(node: string): void {
    this.#projectGraph.addVertex({
      id: node,
      adjacentTo: [],
      body: {
        size: 0
      }
    });
  }

  private linkNodes({ from, to }: { from: string; to: string }): void {
    this.addNode(to);
    this.#projectGraph.addEdge({
      from,
      to
    });
  }

  private async followModuleDeclarationsFromFile(
    rootDir: string,
    fileContent: string
  ): Promise<void> {
    if (this.#visitedNodes.has(rootDir)) {
      return;
    }

    const moduleDeclarations = new Set<string>();
    const node = parseScript(fileContent, { module: true });
    const isRootNode = node.type === "Program";

    walk(isRootNode ? node.body : node, {
      enter(node) {
        /**
         * Searching for named exports with no local variable binding such as
         * export { foo } from "./foo.js" as this export from another file is creating
         * a link between the two files.
         *
         * A named export with a local variable binding is not interesting as
         * it doesn't create a link between files:
         * const foo = () => {};
         * export { foo };
         */
        if (node.type === "ExportNamedDeclaration" && node.source) {
          moduleDeclarations.add(node.source.value);
        }

        // export * as foo from "./foo.js";
        // export * from "./foo.js"
        if (node.type === "ExportAllDeclaration") {
          moduleDeclarations.add(node.source.value);
        }

        // Every type of import can be caught using the same node type
        if (node.type === "ImportDeclaration") {
          moduleDeclarations.add(node.source.value);
        }
      }
    });

    this.#visitedNodes.add(rootDir);

    if (moduleDeclarations.size === 0) {
      return;
    }

    for (const moduleDeclaration of moduleDeclarations.values()) {
      if (
        isBuiltinModule(moduleDeclaration) ||
        isThirdPartyModule(moduleDeclaration)
      ) {
        continue;
      }

      const fullFilePathFromEntrypoint = path.join(
        path.dirname(rootDir),
        moduleDeclaration
      );

      this.addNode(fullFilePathFromEntrypoint);
      this.linkNodes({
        from: rootDir,
        to: fullFilePathFromEntrypoint
      });

      const nextFileContentToExplore = await this.fileReader.read(
        fullFilePathFromEntrypoint
      );

      await this.followModuleDeclarationsFromFile(
        fullFilePathFromEntrypoint,
        nextFileContentToExplore
      );
    }
  }

  private hasCircularDependencies(): boolean {
    return this.#projectGraph.hasCycles();
  }

  private circularDependencies(): string[][] {
    return this.#projectGraph.findCycles();
  }

  private findLeaves(): string[] {
    return Object.entries(this.#projectGraph.toDict())
      .filter(([_, node]) => node.adjacentTo.length === 0)
      .map(([leafId]) => leafId);
  }

  private makeProjectStructure(): CyclopsStructure {
    const projectStructure = this.#projectGraph.toDict();

    return {
      graph: projectStructure,
      files: Object.keys(projectStructure),
      leaves: this.findLeaves(),
      circularDependencies: this.circularDependencies(),
      hasCircularDependencies: this.hasCircularDependencies()
    };
  }

  public async initialize(): Promise<CyclopsInstance> {
    const { entrypoint } = this.config;
    const rootFileContent = await this.fileReader.read(entrypoint);
    const rootDirPath = entrypoint;

    this.addNode(entrypoint);
    await this.followModuleDeclarationsFromFile(rootDirPath, rootFileContent);

    return {
      getStructure: this.makeProjectStructure.bind(this),
      findCircularDependencies: this.circularDependencies.bind(this),
      hasCircularDependencies: this.hasCircularDependencies.bind(this),
      findLeaves: this.findLeaves.bind(this)
    };
  }
}
