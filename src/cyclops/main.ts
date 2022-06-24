import path from "path";

import { DiGraph, VertexDefinition } from "digraph-js";
import { walk } from "estree-walker";
import { parseScript } from "meriyah";

import { FileReader, FileSystemReader } from "../file-reader/index.js";

type CyclopsNode = VertexDefinition<{ size: number }>;

export interface CyclopsConfig {
  entrypoint: string;
}

export interface CyclopsStructure {
  graph: Record<string, CyclopsNode>;
  files: string[];
  circularDependencies: string[][];
  hasCircularDependencies: boolean;
}

export class Cyclops {
  #projectGraph = new DiGraph<CyclopsNode>();

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

  private circularDependencies(): {
    hasCircularDependencies: boolean;
    circularDependencies: string[][];
  } {
    const { cycles, hasCycles } = this.#projectGraph.findCycles();

    return {
      hasCircularDependencies: hasCycles,
      circularDependencies: cycles
    };
  }

  private async followImportStatementsFromFile(
    rootDir: string,
    fileContent: string
  ): Promise<void> {
    const { hasCircularDependencies } = this.circularDependencies();
    if (hasCircularDependencies) {
      return;
    }

    const importIdentifiers = new Set<string>();
    const node = parseScript(fileContent, { module: true });
    const isRootNode = node.type === "Program";

    walk(isRootNode ? node.body : node, {
      enter(node) {
        if (node.type === "ImportDeclaration") {
          importIdentifiers.add(node.source.value);
        }
      }
    });

    if (importIdentifiers.size === 0) {
      return;
    }

    for (const importIdentifier of importIdentifiers.values()) {
      const fullFilePathFromEntrypoint = path.join(
        path.dirname(rootDir),
        importIdentifier
      );

      this.addNode(fullFilePathFromEntrypoint);
      this.linkNodes({
        from: rootDir,
        to: fullFilePathFromEntrypoint
      });

      const nextFileToExplore = await this.fileReader.read(
        fullFilePathFromEntrypoint
      );

      await this.followImportStatementsFromFile(
        fullFilePathFromEntrypoint,
        nextFileToExplore
      );
    }
  }

  public async buildProjectStructure(): Promise<CyclopsStructure> {
    this.addNode(this.config.entrypoint);

    const rootFileContent = await this.fileReader.read(this.config.entrypoint);
    const rootDirPath = this.config.entrypoint;

    await this.followImportStatementsFromFile(rootDirPath, rootFileContent);

    const projectStructure = this.#projectGraph.toDict();
    const projectFileList = Object.keys(projectStructure);
    const { circularDependencies, hasCircularDependencies } =
      this.circularDependencies();

    return {
      graph: projectStructure,
      files: projectFileList,
      circularDependencies,
      hasCircularDependencies
    };
  }
}
