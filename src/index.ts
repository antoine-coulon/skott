import path from "path";

import { DiGraph } from "digraph-js";
import { walk } from "estree-walker";
import { parseScript } from "meriyah";

function extractImportStatementsFromFile(fileContent: string): Array<string> {
  const program = parseScript(fileContent, { module: true });

  const importIdentifiers = new Set<string>();

  walk(program.body, {
    enter(node) {
      if (node.type === "ImportDeclaration") {
        importIdentifiers.add(node.source.value);
      }
    }
  });

  return [...importIdentifiers];
}

export function buildGraph({ rootFile }: { rootFile: string }) {
  return async function openFile(
    readRootFile: (file: string) => Promise<string>
  ): Promise<any> {
    const graph = new DiGraph();
    graph.addVertices({ id: rootFile, adjacentTo: [], payload: {} });

    const rootFileContent = await readRootFile(rootFile);
    const importStatementsFromFile =
      extractImportStatementsFromFile(rootFileContent);

    for (const fileImport of importStatementsFromFile) {
      const relativePath = path.join(path.dirname(rootFile), fileImport);
      graph.addVertices({ id: relativePath, adjacentTo: [], payload: {} });
      graph.addEdge({
        from: { id: rootFile, adjacentTo: [], payload: {} },
        to: { id: relativePath, adjacentTo: [], payload: {} }
      });
    }

    const fileList = Object.keys(graph.asObject());

    return {
      graph: graph.asObject(),
      files: fileList,
      cycles: [],
      fileCount: fileList.length
    };
  };
}
