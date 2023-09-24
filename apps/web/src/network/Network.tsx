import React from "react";
import { Subscription, delay, distinctUntilChanged, map } from "rxjs";

import { DataSet } from "vis-data";
import { Edge, Network, Node } from "vis-network";
import isEqual from "lodash.isequal";

import { AppState, NetworkLayout } from "@/store/state";
import { useAppStore } from "@/store/react-bindings";
import { AppActions } from "@/store/actions";
import { AppEvents } from "@/store/events";
import { ActionMenu } from "@/network/Action";

import { SkottStructureWithCycles, SkottStructureWithMetadata } from "../skott";
import {
  createEdgeId,
  defaultEdgeOptions,
  defaultNodeOptions,
  isNetworkEdge,
  isNetworkNode,
  makeNodesAndEdges,
  networkOptions,
} from "./configuration";
import {
  circularEdgeOptions,
  circularNodeOptions,
  computeBuiltinDependencies,
  computeThirdPartyDependencies,
} from "./dependencies";
import { set } from "node_modules/@effect/data/HashMap";

export function getMethodToApplyOnNetworkElement(enable: boolean) {
  return enable ? "update" : "remove";
}

export default function GraphNetwork() {
  const appStore = useAppStore();
  const networkContainerRef = React.useRef(null);
  const [network, setNetwork] = React.useState<Network>();
  const [nodesDataset, setNodesDataset] = React.useState(
    new DataSet<Node, "id">([])
  );
  const [edgesDataset, setEdgesDataset] = React.useState(
    new DataSet<Edge, "id">([])
  );
  const [graphConfig, setGraphConfig] = React.useState<NetworkLayout>(
    appStore.getState().ui.network.layout
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
    nodesDataset.update({
      id: nodeId,
      color: {
        border: "#000000",
        background: "#ebde02",
        highlight: {
          border: "#000000",
          background: "#ebde02",
        },
      },
    });
  }

  function highlightCircularDependencies(
    data: SkottStructureWithCycles,
    highlighted: boolean
  ) {
    const nodeOptions = highlighted ? circularNodeOptions : defaultNodeOptions;
    const edgeOptions = highlighted ? circularEdgeOptions : defaultEdgeOptions;

    for (const cycle of data.cycles) {
      for (let index = 0; index < cycle.length; index++) {
        const node1 = cycle[index];
        const node2 = cycle[index + 1] ? cycle[index + 1] : cycle[0];

        if (node1 && node2) {
          nodesDataset.update([
            {
              id: node1,
              ...nodeOptions,
            },
            {
              id: node2,
              ...nodeOptions,
            },
          ]);

          edgesDataset.update({
            id: createEdgeId(node1, node2),
            ...edgeOptions,
            from: node1,
            to: node2,
          });
        }
      }
    }

    if (!highlighted && data.entrypoint) {
      highlightEntrypoint(data.entrypoint);
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

    nodesDataset[getMethodToApplyOnNetworkElement(enabled)](linkedNodes);
    edgesDataset[getMethodToApplyOnNetworkElement(enabled)](linkedEdges);
  }

  function reconciliateNetwork(network: Network) {
    const { ui, data } = appStore.getState();

    if (ui.network.dependencies.circular.active) {
      highlightCircularDependencies(data, true);
    }

    if (ui.network.dependencies.builtin.active) {
      toggleDependencies(data, "builtin", true);
      network.stabilize();
    }

    if (ui.network.dependencies.thirdparty.active) {
      toggleDependencies(data, "third_party", true);
      network.stabilize();
    }
  }

  function networkUIReducer(
    dataStore: AppState["data"],
    appEvents: AppActions | AppEvents
  ) {
    switch (appEvents.action) {
      case "focus_on_node": {
        focusOnNetworkNode(appEvents.payload.nodeId);
        break;
      }
      case "toggle_circular": {
        highlightCircularDependencies(dataStore, appEvents.payload.enabled);

        break;
      }
      case "toggle_builtin": {
        toggleDependencies(dataStore, "builtin", appEvents.payload.enabled);
        network?.stabilize();
        break;
      }
      case "toggle_thirdparty": {
        toggleDependencies(dataStore, "third_party", appEvents.payload.enabled);
        network?.stabilize();
        break;
      }
    }
  }

  const toVisJSSolvers = {
    repulsion: "repulsion",
    barnes_hut: "barnesHut",
    force_atlas_2: "forceAtlas2Based",
  } as const;

  function initNetwork(graphConfiguration: NetworkLayout) {
    const baseNetworkOptions = {
      ...networkOptions,
      nodes: {
        ...networkOptions.nodes,
      },
    };

    if (graphConfiguration.type === "cluster") {
      const resolverAlgorithm =
        toVisJSSolvers[graphConfiguration.spacing_algorithm];

      baseNetworkOptions.layout.hierarchical.enabled = false;
      baseNetworkOptions.physics.enabled = true;
      baseNetworkOptions.physics.solver = resolverAlgorithm;

      if (resolverAlgorithm === "repulsion") {
        baseNetworkOptions.physics.repulsion = {
          ...baseNetworkOptions.physics.repulsion,
          nodeDistance: graphConfiguration.node_spacing,
        };
      } else {
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

    const _network = new Network(
      networkContainerRef.current!,
      { nodes: nodesDataset, edges: edgesDataset },
      baseNetworkOptions
    );

    setNetwork(_network);
    reconciliateNetwork(_network);
  }

  React.useEffect(() => {
    let subscription: Subscription;

    if (networkContainerRef.current) {
      subscription = appStore.store$
        .pipe(
          map(({ data }) => data),
          distinctUntilChanged(isEqual)
        )
        .subscribe((data) => {
          const { graphNodes, graphEdges } = makeNodesAndEdges(
            Object.values(data.graph),
            { entrypoint: data.entrypoint }
          );

          setNodesDataset(new DataSet(graphNodes));
          setEdgesDataset(new DataSet(graphEdges));
        });
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const graphConfigSubscription = appStore.store$
      .pipe(
        map(({ ui }) => ui.network.layout),
        distinctUntilChanged(isEqual),
        delay(150)
      )
      .subscribe(setGraphConfig);

    return () => {
      graphConfigSubscription.unsubscribe();
    };
  });

  React.useEffect(() => {
    initNetwork(graphConfig);
    return () => {
      network?.destroy();
    };
  }, [nodesDataset, edgesDataset, graphConfig]);

  React.useEffect(() => {
    const appEventsSubscription = appStore.events$
      .pipe(delay(150))
      .subscribe((appEvent) =>
        networkUIReducer(appStore.getState().data, appEvent)
      );

    return () => {
      appEventsSubscription.unsubscribe();
    };
  }, [network]);

  return (
    <>
      <ActionMenu
        network={network}
        initNetwork={() => initNetwork(graphConfig)}
      />
      <div
        style={{
          height: "100%",
        }}
        ref={networkContainerRef}
      />
    </>
  );
}
