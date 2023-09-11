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
  physics: {
    enabled: false,
    stabilization: false,
    solver: "forceAtlas2Based",
    forceAtlas2Based: {
      gravitationalConstant: -200,
      springLength: 250,
      springConstant: 0.5,
      avoidOverlap: 1,
    },
  },
};

export function getAppropriateMassGivenDataset(datasetSize: number) {
  if (datasetSize <= 10) {
    return 1;
  } else if (datasetSize <= 30) {
    return 2;
  } else if (datasetSize <= 40) {
    return 3;
  } else if (datasetSize <= 50) {
    return 4;
  } else {
    return 5;
  }
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

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
  const dataSpacingFactor = data.length > 100 ? 2.5 : 1;

  data.forEach((node) => {
    const baseOptions = {
      id: node.id,
      label: node.id,
      x: getRandomArbitrary(-15, 15) * 100 * dataSpacingFactor,
      y: getRandomArbitrary(-15, 15) * 100 * dataSpacingFactor,
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
      graphEdges.push({
        id: createEdgeId(node.id, adjacentNodeId),
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
