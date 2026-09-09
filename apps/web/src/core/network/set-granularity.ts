import { AppStore } from "@/store/store";

export function setGranularity(appStore: AppStore) {
  return function (params: { granularity: "module" | "group" }) {
    appStore.dispatch({
      action: "set_granularity",
      payload: params,
    });
  };
}
