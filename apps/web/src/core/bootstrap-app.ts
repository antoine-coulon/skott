import { SkottHttpClient } from "@/client/http-client";
import { AppStore } from "@/store/store";
import { logError } from "@/logger";
import { AppState, storeDefaultValue } from "@/store/state";
import * as Option from "@effect/data/Option";

export function bootstrapApp(store: AppStore) {
  return async function (client: SkottHttpClient) {
    return Promise.all([client.fetchAnalysis(), client.fetchMeta()])
      .then(([analysisReport, meta]) => {
        const appStateValue: AppState = {
          data: {
            ...storeDefaultValue.data,
            ...analysisReport,
            cycles: [],
            tracking: meta.tracking ?? storeDefaultValue.data.tracking,
          },
          ui: {
            ...storeDefaultValue.ui,
            visualization: {
              granularity: Option.some(meta.visualization.granularity),
            },
          },
        };

        store.setInitialState(appStateValue);

        /**
         * Cycle detection can be expensive on large graphs, so it must not block
         * the initial render. Fetch it separately and merge it in when ready.
         */
        client
          .fetchCycles()
          .then((cycles) => {
            const current = store.getState();
            store.setInitialState({
              ...current,
              data: { ...current.data, cycles },
            });
          })
          .catch((exception) => {
            logError(`Failed to fetch cycles. Reason: ${exception}`);
          });
      })
      .catch((exception) => {
        logError(`Failed to fetch analysis report. Reason: ${exception}`);
      });
  };
}
