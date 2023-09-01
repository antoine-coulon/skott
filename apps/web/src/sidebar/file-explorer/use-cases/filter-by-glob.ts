import { AppStore } from "../../../store/store";

export function filterByGlob(store: AppStore) {
  return function (glob: string) {
    if (glob !== "") {
      return store.dispatch({
        action: "filter_by_glob",
        payload: {
          glob,
        },
      });
    }

    store.dispatch({
      action: "reset_glob_filter",
      payload: {
        data: store.getInitialState().data,
      },
    });
  };
}
