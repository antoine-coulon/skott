import { DiGraph } from "digraph-js";
import type { SkottNode } from "./node.js";

export interface TraversalApi<T> {
  traverseFiles: (options?: {
    rootFile?: string;
    moduleImportsCollection?: "deepFirst" | "neighborFirst";
  }) => Generator<SkottNode<T>, void, void>;
}

const skottToDiGraphTraversal = {
  deepFirst: "dfs",
  neighborFirst: "bfs"
} as const;

export function makeTraversalApi<T>(
  graph: DiGraph<SkottNode<T>>
): TraversalApi<T> {
  return {
    *traverseFiles(options) {
      const rootNode = options?.rootFile;
      const moduleImportsCollection =
        options?.moduleImportsCollection ?? "neighborFirst";

      const traversal = skottToDiGraphTraversal[moduleImportsCollection];

      if (rootNode) {
        return yield* graph.traverse({
          rootVertexId: rootNode,
          traversal
        });
      }

      return yield* graph.traverse({
        traversal
      });
    }
  };
}
