import { AppReducer } from "@/store/reducer";
import * as Option from "@effect/data/Option";

function toggleDependencies(): AppReducer {
  return function (event, state) {
    if (
      event.action === "toggle_circular" ||
      event.action === "toggle_builtin" ||
      event.action === "toggle_thirdparty"
    ) {
      const target = event.action.split("_")[1];

      return Option.some({
        data: state.data,
        ui: {
          ...state.ui,
          network: {
            dependencies: {
              ...state.ui.network.dependencies,
              [target]: {
                active: event.payload.enabled,
              },
            },
          },
        },
      });
    }

    return Option.none();
  };
}

export const networkReducers = [toggleDependencies()];
