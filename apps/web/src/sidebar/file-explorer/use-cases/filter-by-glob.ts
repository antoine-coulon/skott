import { AppStore } from "../../../store/store";

export function filterByGlob(store: AppStore) {
  return function (glob: string) {
    const initialStoreData = store.getInitialState().data;

    if (glob === "") {
      return store.dispatch({
        action: "reset_glob_filter",
        payload: {
          data: initialStoreData,
        },
      });
    }

    if (initialStoreData.files.length > 0) {
      return store.dispatch({
        action: "filter_by_glob",
        payload: {
          glob,
          data: initialStoreData,
        },
      });
    }

    return store.dispatch({
      action: "filter_by_glob",
      payload: {
        glob,
        data: store.getState().data,
      },
    });
  };
}
