import * as Option from "@effect/data/Option";
import { DiGraph } from "digraph-js";

import { AppState } from "@/store/state";
import { SkottStructureWithCycles } from "@/skott";

/**
 * The structure the network currently renders: the grouped graph when the
 * visualization granularity is "group", otherwise the module graph. Dependency
 * visualizations operate on this so they act on the nodes actually on screen
 * (group nodes carry aggregated built-in/third-party dependencies), and cycles
 * are recomputed at the group level.
 */
export function activeGraphData(state: AppState): SkottStructureWithCycles {
  const { data, ui } = state;
  const granularity = ui.visualization.granularity;
  const groupedGraph = Option.fromNullable(data.groupedGraph);

  const isGrouped =
    Option.isSome(granularity) && granularity.value === "group";

  if (!isGrouped || Option.isNone(groupedGraph)) {
    return data;
  }

  return {
    ...data,
    graph: groupedGraph.value,
    entrypoint: "none",
    cycles: DiGraph.fromRaw(groupedGraph.value).findCycles(),
  };
}
