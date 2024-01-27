import { SkottStructureWithMetadata } from "@/skott";
import { noOp } from "@/util";

export interface SkottHttpClient {
  fetchAnalysis: () => Promise<SkottStructureWithMetadata>;
  fetchCycles: () => Promise<string[][]>;
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
};
