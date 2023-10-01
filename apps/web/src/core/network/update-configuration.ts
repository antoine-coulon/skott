import { NetworkLayout } from "@/store/state";
import { AppStore } from "@/store/store";

export function updateConfiguration(appStore: AppStore) {
  return function (params: NetworkLayout) {
    appStore.dispatch({
      action: "update_configuration",
      payload: params,
    });
  };
}
