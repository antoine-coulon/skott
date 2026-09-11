import { activeGraphData } from "@/core/network/active-graph";
import { AppState, storeDefaultValue } from "@/store/state";
import * as Option from "@effect/data/Option";
import { describe, expect, test } from "vitest";

const moduleGraph = {
  "a.ts": { id: "a.ts", adjacentTo: [], body: {} },
} as unknown as AppState["data"]["graph"];

const groupedGraph = {
  featureA: { id: "featureA", adjacentTo: [], body: { files: ["a.ts"] } },
} as unknown as NonNullable<AppState["data"]["groupedGraph"]>;

function makeState(granularity: Option.Option<"module" | "group">): AppState {
  return {
    ...storeDefaultValue,
    data: { ...storeDefaultValue.data, graph: moduleGraph, groupedGraph },
    ui: { ...storeDefaultValue.ui, visualization: { granularity } },
  };
}

describe("Active graph selection for dependency visualizations", () => {
  test("keeps the module graph when granularity is module", () => {
    const active = activeGraphData(makeState(Option.some("module")));

    expect(active.graph).toBe(moduleGraph);
  });

  test("swaps in the grouped graph when granularity is group", () => {
    const active = activeGraphData(makeState(Option.some("group")));

    expect(active.graph).toBe(groupedGraph);
    expect(active.entrypoint).toBe("none");
  });
});
