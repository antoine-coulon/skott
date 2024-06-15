import type { DiGraph } from "digraph-js";

import type { SkottConfig } from "../skott.js";

import type { SkottNode } from "./node.js";

export const CollectLevel = {
  Deep: "deep",
  Shallow: "shallow"
} as const;

export type CollectLevelValues =
  (typeof CollectLevel)[keyof typeof CollectLevel];

const skottToDiGraphTraversal = {
  deepFirst: "dfs",
  shallowFirst: "bfs"
} as const;

export class GraphApi<T> {
  constructor(
    private readonly graph: DiGraph<SkottNode<T>>,
    private readonly config: SkottConfig<T>
  ) {
    this.getFileNode = this.getFileNode.bind(this);
    this.getNodes = this.getNodes.bind(this);
    this.traverseFiles = this.traverseFiles.bind(this);
    this.collectFilesDependencies = this.collectFilesDependencies.bind(this);
    this.collectFilesDependingOn = this.collectFilesDependingOn.bind(this);
    this.collectUnusedFiles = this.collectUnusedFiles.bind(this);
    this.hasCircularDependencies = this.hasCircularDependencies.bind(this);
    this.findCircularDependencies = this.findCircularDependencies.bind(this);
    this.findLeaves = this.findLeaves.bind(this);
  }

  getFileNode(id: string): SkottNode<T> {
    return this.getNodes()[id];
  }

  getNodes() {
    return this.graph.toDict();
  }

  *traverseFiles(options?: {
    rootFile?: string;
    moduleImportsCollection?: "deepFirst" | "shallowFirst";
  }): Generator<SkottNode<T>, void, void> {
    const rootNode = options?.rootFile;
    const moduleImportsCollection =
      options?.moduleImportsCollection ?? "shallowFirst";

    const traversal = skottToDiGraphTraversal[moduleImportsCollection];

    if (rootNode) {
      return yield* this.graph.traverse({
        rootVertexId: rootNode,
        traversal
      });
    }

    return yield* this.graph.traverse({
      traversal
    });
  }

  collectFilesDependencies(
    rootFile: string,
    collectLevel: CollectLevelValues
  ): SkottNode<T>[] {
    if (collectLevel === CollectLevel.Shallow) {
      return this.graph.getChildren(rootFile);
    }

    const nodes = this.getNodes();
    const childrenIds = Array.from(this.graph.getDeepChildren(rootFile));
    const dependencies = [];

    for (const id of childrenIds) {
      dependencies.push(nodes[id]);
    }

    return dependencies;
  }

  collectFilesDependingOn(
    rootFile: string,
    collectLevel: CollectLevelValues
  ): SkottNode<T>[] {
    if (collectLevel === CollectLevel.Shallow) {
      return this.graph.getParents(rootFile);
    }

    const nodes = this.getNodes();
    const parentIds = Array.from(this.graph.getDeepParents(rootFile));
    const dependingOn = [];

    for (const id of parentIds) {
      dependingOn.push(nodes[id]);
    }

    return dependingOn;
  }

  collectUnusedFiles(): Array<SkottNode["id"]> {
    const leaves = this.findLeaves();
    const unused = [];

    for (const leaf of leaves) {
      const node = this.getFileNode(leaf);
      const noNodesDependingOn =
        this.collectFilesDependingOn(leaf, CollectLevel.Deep).length === 0;
      if (noNodesDependingOn) {
        unused.push(node.id);
      }
    }

    return unused;
  }

  hasCircularDependencies(): boolean {
    return this.graph.hasCycles({
      maxDepth: this.config.circularMaxDepth ?? Number.POSITIVE_INFINITY
    });
  }

  findCircularDependencies(): Array<Array<SkottNode["id"]>> {
    return this.graph.findCycles({
      maxDepth: this.config.circularMaxDepth ?? Number.POSITIVE_INFINITY
    });
  }

  findLeaves(): Array<SkottNode["id"]> {
    const nodes = this.getNodes();
    const leaves = [];

    for (const node of Object.values(nodes)) {
      if (node.adjacentTo.length === 0) {
        leaves.push(node.id);
      }
    }

    return leaves;
  }
}
