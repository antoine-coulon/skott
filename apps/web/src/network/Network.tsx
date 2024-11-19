import React from "react";
import { Subscription, delay, distinctUntilChanged, map, tap } from "rxjs";

import { DataSet } from "vis-data";
import { Edge, Network, Node } from "vis-network";
import { isEqual } from "lodash-es";

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
  getMethodToApplyOnNetworkElement,
  isNetworkEdge,
  isNetworkNode,
  makeNetworkConfiguration,
  makeNodesAndEdges,
} from "./configuration";
import {
  circularEdgeOptions,
  circularNodeOptions,
  computeBuiltinDependencies,
  computeThirdPartyDependencies,
  deepDependencyEdgeOptions,
  deepDependencyNodeOptions,
} from "./dependencies";
import { ProgressLoader } from "@/network/ProgressLoader";
import { AppEffects, callUseCase, notify } from "@/store/store";
import { updateConfiguration } from "@/core/network/update-configuration";
import { storeDefaultValue } from "@/store/state";

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

  function highlightDeepDependencies(
    data: SkottStructureWithCycles,
    nodeId: string,
    highlighted: boolean
  ) {
    const nodeOptions = highlighted ? deepDependencyNodeOptions : defaultNodeOptions;
    const edgeOptions = highlighted ? deepDependencyEdgeOptions : defaultEdgeOptions;

    const traversedNodeId = new Set<string>()

    function dfs(nodeId: string) {
      if (traversedNodeId.has(nodeId)) return
      traversedNodeId.add(nodeId)

      if (!data.graph[nodeId]) return
      nodesDataset.update({
        id: nodeId,
        ...nodeOptions,
      })
      for (const childNodeId of data.graph[nodeId].adjacentTo) {
        nodesDataset.update({
          id: childNodeId,
          ...nodeOptions,
        });
        edgesDataset.update({
          id: createEdgeId(nodeId, childNodeId),
          ...edgeOptions,
          from: nodeId,
          to: childNodeId,
        });
        dfs(childNodeId)
      }

    }
    dfs(nodeId)

    if (!highlighted && data.entrypoint !== "none") {
      highlightEntrypoint(data.entrypoint);
    }
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

    if (!highlighted && data.entrypoint !== "none") {
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
    const { ui, data } = appStore.getState();
    switch (appEvents.action) {
      case "select_node": {
        if (ui.network.dependencies.deep.active) {
          if (appEvents.payload.nodeId !== appEvents.payload.oldNodeId) {
            highlightDeepDependencies(data, appEvents.payload.oldNodeId, false);
            if (appEvents.payload.nodeId !== '') {
              highlightDeepDependencies(data, appEvents.payload.nodeId, true);
            }
          }
          ui.network.selectedNodeId = appEvents.payload.nodeId
        }
        break;
      }
      case "focus_on_node": {
        focusOnNetworkNode(appEvents.payload.nodeId);
        break;
      }
      case "toggle_deep": {
        if (ui.network.dependencies.deep.active === false) {
          highlightDeepDependencies(data, ui.network.selectedNodeId, false);
          ui.network.selectedNodeId = ''
        }
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

  function destroyOnCancel(appEffect: AppEffects) {
    if (appEffect.action === "network_cancel") {
      network?.destroy();
    }
  }

  function initNetwork(graphConfiguration: NetworkLayout) {
    let patchedGraphConfiguration = { ...graphConfiguration };

    if (!network) {
      if (nodesDataset.length > 0 && nodesDataset.length < 300) {
        patchedGraphConfiguration.smooth_edges = true;

        const invokeUseCase = callUseCase(updateConfiguration);

        // `initNetwork` will be rerun as the configuration changes will be dispatched
        return invokeUseCase({
          ...storeDefaultValue.ui.network.layout,
          smooth_edges: true,
        });
      }
    }

    const networkConfiguration = makeNetworkConfiguration(
      patchedGraphConfiguration
    );

    const _network = new Network(
      networkContainerRef.current!,
      { nodes: nodesDataset, edges: edgesDataset },
      networkConfiguration
    );

    _network.on("stabilizationProgress", (params) => {
      notify({
        action: "network_loading",
        payload: {
          progress: (params.iterations / params.total) * 100,
        },
      });
    });

    _network.on("stabilizationIterationsDone", () => {
      notify({
        action: "network_loading",
        payload: {
          progress: 100,
        },
      });

      _network.stopSimulation();
    });


    _network.on('click', (params) => {
      const { ui } = appStore.getState();
      appStore.dispatch({
        action: "select_node",
        payload: {
          nodeId: params.nodes.length > 0 ? params.nodes[0] : "",
          oldNodeId: ui.network.selectedNodeId
        },
      }, {
        notify: true
      });
    })
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
    network?.destroy();

    setTimeout(() => initNetwork(graphConfig), 200);

    return () => {
      network?.destroy();
    };
  }, [nodesDataset, edgesDataset, graphConfig]);

  React.useEffect(() => {
    const appEventsSubscription = appStore.events$
      .pipe(tap(destroyOnCancel), delay(150))
      .subscribe((appEvent) =>
        networkUIReducer(appStore.getState().data, appEvent)
      );

    return () => {
      appEventsSubscription.unsubscribe();
    };
  }, [network]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ActionMenu
        network={network}
        initNetwork={() => initNetwork(graphConfig)}
      />
      <ProgressLoader />
      <div
        style={{
          height: "100%",
        }}
        ref={networkContainerRef}
      />
    </div>
  );
}
