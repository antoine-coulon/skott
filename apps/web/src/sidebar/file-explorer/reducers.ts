import { AppReducer } from "../../store/reducer";
import * as Option from "@effect/data/Option";

function filterByGlob(): AppReducer {
  return function (event) {
    if (event.action === "filter_by_glob") {
      return function (state) {
        return Option.some({
          ...state,
          ui: {
            filters: {
              ...state.ui.filters,
              glob: event.payload.glob,
            },
          },
        });
      };
    }
    return () => Option.none();
  };
}

export default [filterByGlob()];
