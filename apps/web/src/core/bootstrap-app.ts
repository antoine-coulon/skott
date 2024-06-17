import { SkottHttpClient } from "@/client/http-client";
import { AppStore } from "@/store/store";
import { logError } from "@/logger";
import { AppState, storeDefaultValue } from "@/store/state";

export function bootstrapApp(store: AppStore) {
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

        const appStateValue: AppState = {
          data: {
            ...storeDefaultValue.data,
            ...nextDataValue,
          },
          ui: {
            ...storeDefaultValue.ui,
            visualization: {
              granularity: meta.visualization.granularity,
            },
          },
        };

        store.setInitialState(appStateValue);
      })
      .catch((exception) => {
        logError(`Failed to fetch analysis report. Reason: ${exception}`);
      });
  };
}
