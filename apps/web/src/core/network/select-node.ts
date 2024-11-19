import { AppStore } from "@/store/store";

export function selectNode(appStore: AppStore) {
  return function (nodes: string[]) {
    const { ui } = appStore.getState();
    appStore.dispatch({
      action: "select_node",
      payload: {
        nodeId: nodes.length > 0 ? nodes[0] : "",
        oldNodeId: ui.network.selectedNodeId
      },
    }, {
      notify: true
    });
  };
}
