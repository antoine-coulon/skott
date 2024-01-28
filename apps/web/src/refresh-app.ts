import { SkottHttpClient } from "@/client/http-client";
import { logError } from "@/logger";
import { AppReducer } from "@/store/reducer";
import { DataState } from "@/store/state";
import { AppStore } from "@/store/store";
import * as Option from "@effect/data/Option";

export type GlobalActions = {
  action: "refresh_app";
  payload: { dataState: DataState };
};

export const globalReducers: AppReducer[] = [
  (event, state) => {
    if (event.action === "refresh_app") {
      return Option.some({
        ...state,
        data: event.payload.dataState,
      });
    }

    return Option.none();
  },
];

export function refreshApp(store: AppStore) {
  return async function (client: SkottHttpClient) {
    return Promise.all([client.fetchAnalysis(), client.fetchCycles()])
      .then(([analysisReport, cyclesReport]) => {
        const nextDataValue = {
          ...analysisReport,
          cycles: cyclesReport,
        };

        const incomingDataState: DataState = {
          ...nextDataValue,
        };

        store.dispatch({
          action: "refresh_app",
          payload: {
            dataState: incomingDataState,
          },
        });
      })
      .catch((exception) => {
        logError(`Failed to refresh application. Reason ${exception}`);
      });
  };
}
