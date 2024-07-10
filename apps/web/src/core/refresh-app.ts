import { SkottHttpClient } from "@/client/http-client";
import { AppReducer } from "@/store/reducer";
import { AppStore } from "@/store/store";
import * as Option from "@effect/data/Option";
import { logError } from "@/logger";
import { DataState, storeDefaultValue } from "@/store/state";

export type ApplicationLifecycleActions = {
  action: "refresh_app";
  payload: { dataState: DataState };
};

export const applicationLifecycleReducers: AppReducer[] = [
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
    return Promise.all([
      client.fetchAnalysis(),
      client.fetchCycles(),
      client.fetchMeta(),
    ])
      .then(([analysisReport, cyclesReport, meta]) => {
        const nextDataValue = {
          ...analysisReport,
          cycles: cyclesReport,
          tracking: meta.tracking ?? storeDefaultValue.data.tracking,
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
