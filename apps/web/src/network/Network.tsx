import React from "react";
import { Subscription, combineLatest, distinctUntilChanged, map } from "rxjs";

import { DataSet } from "vis-data";
import { Edge, Network, Node } from "vis-network";
import isEqual from "lodash.isequal";

import { SkottStructureWithCycles, SkottStructureWithMetadata } from "../skott";
import {
  defaultEdgeOptions,
  defaultNodeOptions,
  getAppropriateMassGivenDataset,
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
import { AppState } from "@/store/state";
import { useAppStore } from "@/store/react-bindings";
import { AppActions } from "@/store/actions";
import { AppEvents } from "@/store/events";

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
    nodesDataset.update([
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

          edgesDataset.update([
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

    nodesDataset[getMethodToApplyOnNetworkElement(enabled)](linkedNodes);
    edgesDataset[getMethodToApplyOnNetworkElement(enabled)](linkedEdges);
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
        if (dataStore.entrypoint) {
          highlightEntrypoint(dataStore.entrypoint);
        }
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
    const networkOptionsWithMass = {
      ...networkOptions,
      nodes: {
        ...networkOptions.nodes,
        mass: getAppropriateMassGivenDataset(nodesDataset.length),
      },
    };

    /**
     * TODO: instead of destroying the whole network, we should have a more fine-grained
     * control and update the nodes and edges invidually.
     * The network has to be built only once.
     */
    setNetwork(
      new Network(
        networkContainerRef.current!,
        { nodes: nodesDataset, edges: edgesDataset },
        networkOptionsWithMass
      )
    );

    return () => {
      network?.destroy();
    };
  }, [nodesDataset, edgesDataset]);

  React.useEffect(() => {
    const uiEventsSubscription = combineLatest([
      appStore.events$,
      appStore.store$,
    ]).subscribe(([uiEvents, { data }]) => networkUIReducer(data, uiEvents));

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
