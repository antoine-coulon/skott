import { Edge, Node } from "vis-network";

import { SkottMetadata, SkottNode } from "../skott";
import { NetworkLayout, storeDefaultValue } from "@/store/state";

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
  scaling: {
    min: 10,
    max: 30,
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
    enabled: false,
  },
};

export const defaultEdgeOptions = {
  color: {
    color: "#7E7E7E",
    highlight: "#007BEB",
    hover: "#007BEB",
    inherit: false,
  },
  smooth: {
    // enabled when graph is small
    enabled: true,
    forceDirection: false,
    roundness: 0.5,
    // dynamic when graph is small
    type: "continuous",
  },
};

export const toVisSolvers = {
  repulsion: "repulsion",
  barnes_hut: "barnesHut",
  force_atlas_2: "forceAtlas2Based",
} as const;

const defaultConfigurableNetworkOptions = {
  nodeSpacing: storeDefaultValue.ui.network.layout.node_spacing,
  solver: storeDefaultValue.ui.network.layout.spacing_algorithm,
};

const layoutConfigs = {
  physics: {
    // shared
    enabled: true,
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 50,
      onlyDynamicEdges: false,
      fit: true,
    },
    maxVelocity: 50,
    minVelocity: 0.1,
    timestep: 0.5,
    adaptiveTimestep: true,
    wind: { x: 0, y: 0 },
    solver: defaultConfigurableNetworkOptions.solver as string,
    // algorithms
    repulsion: {
      centralGravity: 0.2,
      springLength: 200,
      springConstant: 0.05,
      nodeDistance: defaultConfigurableNetworkOptions.nodeSpacing,
      damping: 0.09,
    },
    forceAtlas2Based: {
      theta: 0.5,
      gravitationalConstant: -50,
      centralGravity: 0.01,
      springConstant: 0.08,
      springLength: 100,
      damping: 0.4,
      avoidOverlap: 0,
    },
    barnesHut: {
      theta: 0.5,
      gravitationalConstant: -2000,
      centralGravity: 0.3,
      springLength: 95,
      springConstant: 0.04,
      damping: 0.09,
      avoidOverlap: 0,
    },
  },
  layout: {
    improvedLayout: false,
    hierarchical: {
      enabled: false,
      levelSeparation: 150,
      nodeSpacing: defaultConfigurableNetworkOptions.nodeSpacing,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: "UD",
      sortMethod: "hubsize",
      shakeTowards: "leaves",
    },
  },
  interaction: {
    hideEdgesOnDrag: true,
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
  ...layoutConfigs,
} as const;

export function makeNetworkConfiguration(graphConfiguration: NetworkLayout) {
  const baseNetworkOptions = { ...networkOptions };
  baseNetworkOptions.edges.smooth.type = graphConfiguration.smooth_edges
    ? "dynamic"
    : "continuous";

  if (graphConfiguration.type === "cluster") {
    const resolverAlgorithm =
      toVisSolvers[graphConfiguration.spacing_algorithm];

    baseNetworkOptions.layout.hierarchical.enabled = false;
    baseNetworkOptions.physics.enabled = true;
    baseNetworkOptions.physics.solver = resolverAlgorithm;
    baseNetworkOptions.edges.smooth.enabled = graphConfiguration.smooth_edges;

    if (resolverAlgorithm === "repulsion") {
      baseNetworkOptions.physics.repulsion = {
        ...baseNetworkOptions.physics.repulsion,
        nodeDistance: graphConfiguration.node_spacing,
      };
    } else {
      // Converting 100 to 1000 node spacing to overlap ratio between 0 and 1
      const nodeSpacingToOverlap = graphConfiguration.node_spacing / 1000;
      baseNetworkOptions.physics[resolverAlgorithm].avoidOverlap =
        nodeSpacingToOverlap;
    }
  } else {
    baseNetworkOptions.physics.enabled = false;
    baseNetworkOptions.layout.hierarchical.enabled = true;
    baseNetworkOptions.layout.hierarchical.direction =
      graphConfiguration.direction;
    baseNetworkOptions.layout.hierarchical.sortMethod =
      graphConfiguration.spacing_algorithm;
    baseNetworkOptions.layout.hierarchical.nodeSpacing =
      graphConfiguration.node_spacing;
  }

  return baseNetworkOptions;
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
      } else {
        graphEdges.find((edge) => edge.id === edgeId)!.arrows = "to, from";
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

export function getMethodToApplyOnNetworkElement(enable: boolean) {
  return enable ? "update" : "remove";
}
