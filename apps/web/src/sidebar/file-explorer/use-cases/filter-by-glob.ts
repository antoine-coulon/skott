import { AppStore } from "../../../store/store";

export function filterByGlob(dependencies: { appStore: AppStore }) {
  return function (glob: string) {
    dependencies.appStore.dispatch({
      action: "filter_by_glob",
      payload: {
        glob,
      },
    });
  };
}
