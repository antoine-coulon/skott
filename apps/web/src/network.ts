import { of } from "rxjs";
import { SkottNode } from "skott";
import { DataSet } from "vis-data";
import { Edge, Network, Node } from "vis-network";

import { SkottStructureWithCycles } from "./skott";

export let network: Network | null = null;
export let nodes: DataSet<Node, "id">;
export let edges: DataSet<Edge, "id">;

export const defaultNodeOptions = {
  shape: "box",
  color: {
    border: "#000000",
    background: "#ECECEC",
    highlight: {
      border: "#00ADE9",
      background: "#E5E5E5",
    },
  },
  font: {
    color: "#343434",
    size: 18,
    face: "Monospace",
    background: "none",
    strokeWidth: 0,
    strokeColor: "#ffffff",
    align: "center",
  },
  shadow: {
    enabled: true,
    color: "rgba(0,0,0,0.5)",
    size: 10,
    x: 5,
    y: 5,
  },
};

export const defaultEdgeOptions = {
  color: {
    color: "#7E7E7E",
    highlight: "#00ADE9",
    hover: "#000000 ",
    inherit: false,
  },
};

export const networkOptions = {
  edges: {
    arrows: "to",
    // As to be proportional to the number of nodes and edges
    length: 150,
    ...defaultEdgeOptions,
  },
  physics: {
    enabled: false,
    stabilization: false,
    solver: "repulsion",
    repulsion: {
      // As to be proportional to the number of nodes and edges
      nodeDistance: 350, // Put more distance between the nodes.
    },
  },
};

function makeDatasetFromSkottPayload(graphNodes: Node[], graphEdges: Edge[]) {
  nodes = new DataSet(graphNodes);
  edges = new DataSet(graphEdges);

  return {
    nodes,
    edges,
  };
}

function makeNodesAndEdges(data: SkottNode[]): {
  graphNodes: Node[];
  graphEdges: Edge[];
} {
  if (!Array.isArray(data)) {
    return {
      graphNodes: [],
      graphEdges: [],
    };
  }

  const graphNodes: Node[] = [];
  const graphEdges: Edge[] = [];

  data.forEach((node) => {
    graphNodes.push({
      id: node.id,
      label: node.id,
      ...defaultNodeOptions,
    });

    node.adjacentTo.forEach((adjacentNodeId: string) => {
      graphEdges.push({
        id: `${node.id}-${adjacentNodeId}`,
        from: node.id,
        to: adjacentNodeId,
      });
    });
  });

  return {
    graphNodes,
    graphEdges,
  };
}

function makeInitialNetwork(
  graphNodes: Node[],
  graphEdges: Edge[],
  onNetworkConstruction: () => void
) {
  if (network !== null) {
    network.destroy();
    network = null;
  }

  const { nodes, edges } = makeDatasetFromSkottPayload(graphNodes, graphEdges);
  const container = document.getElementById("skott-network");
  const data = { nodes, edges };

  network = new Network(container!, data, networkOptions);
  onNetworkConstruction();
  network.stabilize();
}

export function buildNetworkIncremental(
  chunkedData: SkottNode[],
  onNetworkConstruction: () => void
) {
  const { graphNodes, graphEdges } = makeNodesAndEdges(chunkedData);

  if (!nodes) {
    makeInitialNetwork(graphNodes, graphEdges, onNetworkConstruction);
    return;
  }

  try {
    nodes.add(graphNodes);
    edges.add(graphEdges);
  } catch {}
}

export function isNetworkNode(
  networkElement: Node | Edge
): networkElement is Node {
  return !("from" in networkElement);
}

export function isNetworkEdge(
  networkElement: Node | Edge
): networkElement is Edge {
  return !isNetworkNode(networkElement);
}

const circularNodeOptions = {
  color: {
    border: "#000000",
    background: "#FF5656",
    highlight: {
      border: "#000000",
      background: "#FF5656",
    },
  },
};

const circularEdgeOptions = {
  color: "#FF0000",
  highlight: "#DF0000",
  hover: "#DF0000",
  inherit: false,
};

export function toggleCircularDependencies(
  enabled: boolean,
  data: SkottStructureWithCycles
) {
  const nodeOptions = enabled ? circularNodeOptions : defaultNodeOptions;
  const edgeOptions = enabled ? circularEdgeOptions : defaultEdgeOptions;

  for (const cycle of data.cycles) {
    for (let index = 0; index < cycle.length; index++) {
      const node1 = cycle[index];
      const node2 = cycle[index + 1];

      if (node1 && node2) {
        nodes.update([
          {
            id: node1,
            ...nodeOptions,
          },
          {
            id: node2,
            ...nodeOptions,
          },
        ]);

        edges.update([
          {
            id: `${node1}-${node2}`,
            from: node1,
            to: node2,
            ...edgeOptions,
          },
          {
            id: `${node2}-${node1}`,
            from: node2,
            to: node1,
            ...edgeOptions,
          },
        ]);
      }
    }
  }

  return of([]);
}

export function getMethodToApplyOnNetworkElement(enable: boolean) {
  return enable ? "update" : "remove";
}

const builtinNodeOptions = {
  color: {
    border: "#000000",
    background: "#74b859",
    highlight: {
      border: "#00ADE9",
      background: "#026e00",
    },
  },
};

const builtinEdgeOptions = {
  color: "#BE9700",
  highlight: "#F9CD26",
  hover: "#000000",
  inherit: false,
};

export function makeBuiltinDependencies(data: SkottStructureWithCycles) {
  function makeBuiltinDependencyNode(
    builtinDependencyId: string,
    builtinId: string
  ) {
    return {
      id: builtinDependencyId,
      label: builtinId,
      ...defaultNodeOptions,
      ...builtinNodeOptions,
    };
  }

  function makeBuiltinDependencyEdge(
    builtinDependencyId: string,
    nodeId: string
  ) {
    return {
      id: builtinDependencyId,
      from: nodeId,
      to: builtinDependencyId,
      ...builtinEdgeOptions,
    };
  }

  const nodesWithEdges = [];

  for (const skottNode of Object.values(data.graph)) {
    for (const builtin of skottNode.body.builtinDependencies) {
      const builtinDependencyId = `${skottNode.id}-${builtin}`;

      nodesWithEdges.push(
        makeBuiltinDependencyNode(builtinDependencyId, builtin),
        makeBuiltinDependencyEdge(builtinDependencyId, skottNode.id)
      );
    }
  }

  return of(nodesWithEdges);
}

const thirdPartyNodeOptions = {
  color: {
    border: "#000000",
    background: "#FF60FB",
    highlight: {
      border: "#00ADE9",
      background: "#FF56FA",
    },
  },
};

const thirdPartyEdgeOptions = {
  color: "#B300AE",
  highlight: "#FF56FA",
  hover: "#000000",
  inherit: false,
};

export function makeThirdPartyDependencies(data: SkottStructureWithCycles) {
  function makeThirdPartyNode(
    thirdPartyId: string,
    thirdPartyDependencyId: string
  ) {
    return {
      id: thirdPartyDependencyId,
      label: thirdPartyId,
      ...defaultNodeOptions,
      ...thirdPartyNodeOptions,
    };
  }

  function makeThirdPartyEdge(nodeId: string, thirdPartyDependencyId: string) {
    return {
      id: thirdPartyDependencyId,
      from: nodeId,
      to: thirdPartyDependencyId,
      ...thirdPartyEdgeOptions,
    };
  }

  const nodesWithEdges = [];

  for (const skottNode of Object.values(data.graph)) {
    for (const thirdParty of skottNode.body.thirdPartyDependencies) {
      const thirdPartyDependencyId = `${skottNode.id}-${thirdParty}`;

      nodesWithEdges.push(
        makeThirdPartyNode(thirdParty, thirdPartyDependencyId),
        makeThirdPartyEdge(skottNode.id, thirdPartyDependencyId)
      );
    }
  }

  return of(nodesWithEdges);
}
