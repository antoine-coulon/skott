import { Edge, Node } from "vis-network";

import { SkottMetadata, SkottNode } from "../skott";

export const defaultNodeOptions = {
  shape: "box",
  color: {
    border: "#000000",
    background: "#ffffff",
    highlight: {
      border: "#2597ff",
      background: "#F5F5F5",
    },
  },
  font: {
    color: "#121212",
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
    highlight: "#007BEB",
    hover: "#007BEB ",
    inherit: false,
  },
};

export const networkOptions = {
  nodes: {
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  },
  edges: {
    arrows: "to",
    ...defaultEdgeOptions,
  },
  layout: {
    randomSeed: 2,
  },
  // layout: {
  //   randomSeed: undefined,
  //   improvedLayout: true,
  //   clusterThreshold: 150,
  //   hierarchical: {
  //     enabled: false,
  //     levelSeparation: 250,
  //     nodeSpacing: 1000,
  //     treeSpacing: 200,
  //     blockShifting: true,
  //     edgeMinimization: true,
  //     parentCentralization: true,
  //     direction: "RL", // UD, DU, LR, RL
  //     sortMethod: "hubsize", // hubsize, directed
  //     shakeTowards: "leaves", // roots, leaves
  //   },
  // },
  // physics: {
  //   enabled: true,
  //   barnesHut: {
  //     theta: 0.5,
  //     gravitationalConstant: -2000,
  //     centralGravity: 0.3,
  //     springLength: 95,
  //     springConstant: 0.04,
  //     damping: 0.09,
  //     avoidOverlap: 0,
  //   },
  //   forceAtlas2Based: {
  //     theta: 0.5,
  //     gravitationalConstant: -50,
  //     centralGravity: 0.01,
  //     springConstant: 0.08,
  //     springLength: 100,
  //     damping: 0.4,
  //     avoidOverlap: 0,
  //   },
  //   repulsion: {
  //     centralGravity: 0.2,
  //     springLength: 200,
  //     springConstant: 0.05,
  //     nodeDistance: 100,
  //     damping: 0.09,
  //   },
  //   hierarchicalRepulsion: {
  //     centralGravity: 0.0,
  //     springLength: 100,
  //     springConstant: 0.01,
  //     nodeDistance: 120,
  //     damping: 0.09,
  //     avoidOverlap: 0,
  //   },
  //   maxVelocity: 50,
  //   minVelocity: 0.1,
  //   solver: "forceAtlas2Based",
  //   stabilization: {
  //     enabled: true,
  //     iterations: 1000,
  //     updateInterval: 100,
  //     onlyDynamicEdges: false,
  //     fit: true,
  //   },
  //   timestep: 0.5,
  //   adaptiveTimestep: true,
  //   wind: { x: 0, y: 0 },
  // },
  physics: {
    enabled: true,
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 50,
      onlyDynamicEdges: false,
      fit: true,
    },
    solver: "repulsion",
    repulsion: {
      nodeDistance: 500, // Put more distance between the nodes.
    },
  },
};

export function createEdgeId(node1: string, node2: string) {
  return [node1, node2].sort().join("-");
}

export function makeNodesAndEdges(
  data: SkottNode[],
  metadata: SkottMetadata
): {
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
  const edgeIds = new Set();

  data.forEach((node) => {
    const baseOptions = {
      id: node.id,
      label: node.id,
      ...defaultNodeOptions,
    };

    if (node.id === metadata.entrypoint) {
      baseOptions.color = {
        border: "#000000",
        background: "#ebde02",
        highlight: {
          border: "#000000",
          background: "#ebde02",
        },
      };
    }

    graphNodes.push(baseOptions);

    node.adjacentTo.forEach((adjacentNodeId: string) => {
      const edgeId = createEdgeId(node.id, adjacentNodeId);

      if (!edgeIds.has(edgeId)) {
        graphEdges.push({
          id: edgeId,
          from: node.id,
          to: adjacentNodeId,
        });

        edgeIds.add(edgeId);
      }
    });
  });

  return {
    graphNodes,
    graphEdges,
  };
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
