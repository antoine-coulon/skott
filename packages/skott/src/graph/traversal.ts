import type { DiGraph } from "digraph-js";
import type { SkottNode } from "./node.js";

export const CollectLevel = {
  Deep: "deep",
  Shallow: "shallow"
} as const;

export type CollectLevelValues =
  (typeof CollectLevel)[keyof typeof CollectLevel];

export interface TraversalApi<T> {
  traverseFiles: (options?: {
    rootFile?: string;
    moduleImportsCollection?: "deepFirst" | "shallowFirst";
  }) => Generator<SkottNode<T>, void, void>;
  collectFilesDependencies: (
    rootFile: string,
    level: CollectLevelValues
  ) => SkottNode<T>[];
  collectFilesDependingOn: (
    rootFile: string,
    level: CollectLevelValues
  ) => SkottNode<T>[];
}

const skottToDiGraphTraversal = {
  deepFirst: "dfs",
  shallowFirst: "bfs"
} as const;

export function makeTraversalApi<T>(
  graph: DiGraph<SkottNode<T>>
): TraversalApi<T> {
  const nodes = graph.toDict();

  return {
    *traverseFiles(options) {
      const rootNode = options?.rootFile;
      const moduleImportsCollection =
        options?.moduleImportsCollection ?? "shallowFirst";

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
    },

    collectFilesDependencies: (rootFile, collectLevel) => {
      if (collectLevel == CollectLevel.Shallow) {
        return graph.getChildren(rootFile);
      }

      return Array.from(graph.getDeepChildren(rootFile)).map((id) => nodes[id]);
    },

    collectFilesDependingOn: (rootFile, collectLevel) => {
      if (collectLevel == CollectLevel.Shallow) {
        return graph.getParents(rootFile);
      }

      return Array.from(graph.getDeepParents(rootFile)).map((id) => nodes[id]);
    }
  };
}
