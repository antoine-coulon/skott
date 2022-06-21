import fs from "fs/promises";
import path from "path";

import { DiGraph } from "digraph-js";
import { walk } from "estree-walker";
import { parseScript } from "meriyah";

interface CyclopsConfig {
  entrypoint: string;
}

export interface FileReader {
  read: (filename: string) => Promise<string>;
}

export class FileSystemReader implements FileReader {
  read(filename: string): Promise<string> {
    return fs.readFile(filename, "utf-8");
  }
}

export class Cyclops {
  #projectGraph = new DiGraph();

  constructor(
    private readonly cyclopsConfig: CyclopsConfig,
    private readonly fileReader: FileReader
  ) {}

  private addNode(node: string): void {
    this.#projectGraph.addVertices({
      id: node,
      adjacentTo: [],
      payload: {}
    });
  }

  private linkNodes({ from, to }: { from: string; to: string }): void {
    this.#projectGraph.addEdge({
      from: {
        id: from,
        adjacentTo: [],
        payload: {}
      },
      to: {
        id: to,
        adjacentTo: [],
        payload: {}
      }
    });
  }

  private async traverseImportStatementsFromFile(
    rootDir: string,
    fileContent: string
  ): Promise<void> {
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

      await this.traverseImportStatementsFromFile(
        fullFilePathFromEntrypoint,
        nextFileToExplore
      );
    }
  }

  async buildGraph(): Promise<any> {
    this.addNode(this.cyclopsConfig.entrypoint);

    const rootFileContent = await this.fileReader.read(
      this.cyclopsConfig.entrypoint
    );
    const rootDirPath = this.cyclopsConfig.entrypoint;

    await this.traverseImportStatementsFromFile(rootDirPath, rootFileContent);

    const fileList = Object.keys(this.#projectGraph.asObject());

    return {
      graph: this.#projectGraph.asObject(),
      files: fileList,
      cycles: []
    };
  }
}
