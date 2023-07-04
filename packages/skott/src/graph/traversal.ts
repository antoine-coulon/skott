import type { DiGraph } from "digraph-js";
import type { SkottNode } from "./node.js";
import { SkottConfig } from "../skott.js";
import * as Option from "@effect/data/Option";

export const CollectLevel = {
  Deep: "deep",
  Shallow: "shallow"
} as const;

export type CollectLevelValues =
  (typeof CollectLevel)[keyof typeof CollectLevel];

export interface TraversalApi<T> {
  getFileNode(id: string): SkottNode<T>;
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
  findLeaves: () => string[];
  findCircularDependencies: () => string[][];
  hasCircularDependencies: () => boolean;
}

const skottToDiGraphTraversal = {
  deepFirst: "dfs",
  shallowFirst: "bfs"
} as const;

export function makeTraversalApi<T>(
  graph: DiGraph<SkottNode<T>>,
  config: SkottConfig<T>
): TraversalApi<T> {
  const nodes = graph.toDict();

  return {
    getFileNode: (id) => nodes[id],

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
    },

    hasCircularDependencies(): boolean {
      return graph.hasCycles({
        maxDepth: config.circularMaxDepth ?? Number.POSITIVE_INFINITY
      });
    },

    findCircularDependencies(): SkottNode["id"][][] {
      return graph.findCycles({
        maxDepth: config.circularMaxDepth ?? Number.POSITIVE_INFINITY
      });
    },

    findLeaves(): SkottNode["id"][] {
      return Object.entries(nodes)
        .filter(([_, node]) => node.adjacentTo.length === 0)
        .map(([leafId]) => leafId);
    }
  };
}
