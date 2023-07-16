import React from "react";
import { Subject, Subscription, combineLatest, of } from "rxjs";

import { DataSet } from "vis-data";
import { Edge, Network, Node } from "vis-network";

import {
  SkottMetadata,
  SkottNode,
  SkottStructureWithCycles,
  SkottStructureWithMetadata,
} from "./skott.js";
import { DataStore, UiEvents } from "./events.js";

export let nodes: DataSet<Node, "id">;
export let edges: DataSet<Edge, "id">;

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

function getAppropriateMassGivenDataset(datasetSize: number) {
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

function makeNodesAndEdges(
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
      const node2 = cycle[index + 1] ? cycle[index + 1] : cycle[0];

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
        ]);
      }
    }
  }

  return of([]);
}

export function getMethodToApplyOnNetworkElement(enable: boolean) {
  console.log({ mode: enable ? "update" : "remove" });
  return enable ? "update" : "remove";
}

const builtinNodeOptions = {
  color: {
    border: "#000000",
    background: "#74b859",
    highlight: {
      border: "#337718",
      background: "#5AA33C",
    },
  },
};

const builtinEdgeOptions = {
  color: "#5F9C47",
  highlight: "#4C8834",
  hover: "#000000",
  inherit: false,
};

export function computeBuiltinDependencies(data: SkottStructureWithMetadata) {
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

  const nodesWithEdges: Node[] = [];

  for (const skottNode of Object.values(data.graph)) {
    for (const builtin of skottNode.body.builtinDependencies) {
      const builtinDependencyId = `${skottNode.id}-${builtin}`;

      nodesWithEdges.push(
        makeBuiltinDependencyNode(builtinDependencyId, builtin),
        makeBuiltinDependencyEdge(builtinDependencyId, skottNode.id)
      );
    }
  }

  return nodesWithEdges;
}

const thirdPartyNodeOptions = {
  color: {
    border: "#000000",
    background: "#FF60FB",
    highlight: {
      border: "#A600A2",
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

export function computeThirdPartyDependencies(
  data: SkottStructureWithMetadata
) {
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

  const nodesWithEdges: Node[] = [];

  for (const skottNode of Object.values(data.graph)) {
    for (const thirdParty of skottNode.body.thirdPartyDependencies) {
      const thirdPartyDependencyId = `${skottNode.id}-${thirdParty}`;

      nodesWithEdges.push(
        makeThirdPartyNode(thirdParty, thirdPartyDependencyId),
        makeThirdPartyEdge(skottNode.id, thirdPartyDependencyId)
      );
    }
  }

  return nodesWithEdges;
}

export default function GraphNetwork({
  dataStore$,
  uiEvents$,
}: {
  dataStore$: Subject<DataStore>;
  uiEvents$: Subject<UiEvents>;
}) {
  const networkContainerRef = React.useRef(null);
  const [network, setNetwork] = React.useState<Network>();
  const [nodeDataset, setNodeDataset] = React.useState(
    new DataSet<Node, "id">([])
  );
  const [edgeDataset, setEdgeDataset] = React.useState(
    new DataSet<Edge, "id">([])
  );

  function focusOnNetworkNode(nodeId: string) {
    network?.selectNodes([nodeId], true);
    network?.focus(nodeId, {
      animation: {
        duration: 400,
        easingFunction: "easeInOutCubic",
      },
      scale: 1.1,
    });
  }

  function highlightEntrypoint(nodeId: string) {
    nodeDataset.update([
      {
        id: nodeId,
        color: {
          border: "#000000",
          background: "#ebde02",
          highlight: {
            border: "#000000",
            background: "#ebde02",
          },
        },
      },
    ]);
  }

  function highlightCircularDependencies(
    data: SkottStructureWithCycles,
    highlighted: boolean
  ) {
    const nodeOptions = !highlighted ? circularNodeOptions : defaultNodeOptions;
    const edgeOptions = !highlighted ? circularEdgeOptions : defaultEdgeOptions;

    for (const cycle of data.cycles) {
      for (let index = 0; index < cycle.length; index++) {
        const node1 = cycle[index];
        const node2 = cycle[index + 1] ? cycle[index + 1] : cycle[0];

        if (node1 && node2) {
          nodeDataset.update([
            {
              id: node1,
              ...nodeOptions,
            },
            {
              id: node2,
              ...nodeOptions,
            },
          ]);

          edgeDataset.update([
            {
              id: `${node1}-${node2}`,
              from: node1,
              to: node2,
              ...edgeOptions,
            },
          ]);
        }
      }
    }
  }

  function toggleDependencies(
    data: SkottStructureWithMetadata,
    type: "builtin" | "third_party",
    enabled: boolean
  ) {
    const dependencies =
      type === "builtin"
        ? computeBuiltinDependencies(data)
        : computeThirdPartyDependencies(data);

    const linkedNodes = dependencies.filter(isNetworkNode);
    const linkedEdges = dependencies.filter(isNetworkEdge);

    nodeDataset[getMethodToApplyOnNetworkElement(enabled)](linkedNodes);
    edgeDataset[getMethodToApplyOnNetworkElement(enabled)](linkedEdges);
  }

  function networkReducer(dataStore: DataStore, uiEvents: UiEvents) {
    switch (uiEvents.action) {
      case "focus": {
        focusOnNetworkNode(uiEvents.payload.nodeId);
        break;
      }
      case "toggle_circular": {
        highlightCircularDependencies(dataStore, uiEvents.payload.enabled);
        if (dataStore.entrypoint) {
          highlightEntrypoint(dataStore.entrypoint);
        }
        break;
      }
      case "toggle_builtin": {
        toggleDependencies(dataStore, "builtin", uiEvents.payload.enabled);
        break;
      }
      case "toggle_thirdparty": {
        toggleDependencies(dataStore, "third_party", uiEvents.payload.enabled);
        break;
      }
    }
  }

  React.useEffect(() => {
    let subscription: Subscription;

    if (networkContainerRef.current) {
      subscription = dataStore$.subscribe((dataStore) => {
        const { graphNodes, graphEdges } = makeNodesAndEdges(
          Object.values(dataStore.graph),
          { entrypoint: dataStore.entrypoint }
        );

        setNodeDataset(new DataSet(graphNodes));
        setEdgeDataset(new DataSet(graphEdges));
      });
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const networkOptionsWithMass = {
      ...networkOptions,
      nodes: {
        ...networkOptions.nodes,
        mass: getAppropriateMassGivenDataset(nodeDataset.length),
      },
    };

    setNetwork(
      new Network(
        networkContainerRef.current!,
        { nodes: nodeDataset, edges: edgeDataset },
        networkOptionsWithMass
      )
    );

    return () => {
      network?.destroy();
    };
  }, [nodeDataset, edgeDataset]);

  React.useEffect(() => {
    const uiEventsSubscription = combineLatest([
      dataStore$,
      uiEvents$,
    ]).subscribe(([dataStore, uiEvents]) =>
      networkReducer(dataStore, uiEvents)
    );

    return () => {
      uiEventsSubscription.unsubscribe();
    };
  }, [network]);

  return (
    <div
      style={{
        height: "100%",
      }}
      ref={networkContainerRef}
    />
  );
}
