import * as Option from "@effect/data/Option";
import { DiGraph } from "digraph-js";

import { AppState } from "@/store/state";
import { SkottStructureWithCycles } from "@/skott";

/**
 * The graph currently displayed: the grouped graph when the visualization
 * granularity is "group" (and one exists), otherwise the module graph. Features
 * that operate on "the graph on screen" (search, dependency highlights, ...)
 * should read this and stay agnostic of whether it is grouped or not.
 */
export function activeGraph(state: AppState): SkottStructureWithCycles["graph"] {
  const { data, ui } = state;
  const granularity = ui.visualization.granularity;
  const groupedGraph = Option.fromNullable(data.groupedGraph);

  const isGrouped =
    Option.isSome(granularity) && granularity.value === "group";

  return isGrouped && Option.isSome(groupedGraph)
    ? groupedGraph.value
    : data.graph;
}

/**
 * The displayed graph as a full structure, with group-level cycles recomputed
 * when grouped. Used by the network's dependency visualizations.
 */
export function activeGraphData(state: AppState): SkottStructureWithCycles {
  const { data } = state;
  const graph = activeGraph(state);

  if (graph === data.graph) {
    return data;
  }

  return {
    ...data,
    graph,
    entrypoint: "none",
    cycles: DiGraph.fromRaw(graph).findCycles(),
  };
}
