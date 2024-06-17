import { SkottStructureWithMetadata } from "@/skott";
import { noOp } from "@/util";

export interface SkottHttpClient {
  fetchAnalysis: () => Promise<SkottStructureWithMetadata>;
  fetchCycles: () => Promise<string[][]>;
  fetchMeta: () => Promise<{
    visualization: {
      granularity: "group" | "module";
    };
    tracking?: {
      thirdParty: boolean;
      builtin: boolean;
      typeOnly: boolean;
    };
  }>;
}

export const httpClientLive: SkottHttpClient = {
  fetchAnalysis() {
    return fetch("/api/analysis")
      .then((response) => response.json())
      .catch(noOp);
  },

  fetchCycles() {
    return fetch("/api/cycles")
      .then((response) => response.json())
      .catch(() => ({
        cycles: [],
      }));
  },

  fetchMeta() {
    return fetch("/api/meta")
      .then((response) => response.json())
      .catch(() => ({
        visualization: {
          granularity: "module",
        },
        tracking: {
          thirdParty: false,
          builtin: false,
          typeOnly: false,
        },
      }));
  },
};
