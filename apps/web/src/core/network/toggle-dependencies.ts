import { AppStore } from "@/store/store";

export function toggleDependencies(appStore: AppStore) {
  return function (params: { target: "circular" | "builtin" | "thirdparty" }) {
    const networkDependency =
      appStore.getState().ui.network.dependencies[params.target];

    appStore.dispatch(
      {
        action: `toggle_${params.target}`,
        payload: {
          enabled: !networkDependency.active,
        },
      },
      { notify: true }
    );
  };
}
