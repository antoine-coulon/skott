import { Groups } from "@/sidebar/summary/group/Groups";
import { Stats } from "@/sidebar/summary/module/Stats";
import { isSelectorAvailable, useStoreSelect } from "@/store/react-bindings";
import * as Option from "@effect/data/Option";

export function Summary() {
  const visualizationSelector = useStoreSelect("ui", "visualization");

  if (!isSelectorAvailable(visualizationSelector)) {
    return null;
  }

  if (Option.isNone(visualizationSelector.value.granularity)) {
    return null;
  }

  const granularity = visualizationSelector.value.granularity.value;

  switch (granularity) {
    case "module":
      return <Stats />;
    case "group":
      return <Groups />;
    default:
      return null;
  }
}
