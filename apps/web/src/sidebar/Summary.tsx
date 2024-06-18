import { Groups } from "@/sidebar/summary/group/Groups";
import { Stats } from "@/sidebar/summary/module/Stats";
import { useStoreSelect } from "@/store/react-bindings";
import * as Option from "@effect/data/Option";

export function Summary() {
  const maybeProp = useStoreSelect("ui", "visualization");

  if (Option.isNone(maybeProp)) {
    return null;
  }

  const visualization = maybeProp.value;

  switch (visualization.granularity) {
    case "module":
      return <Stats />;
    case "group":
      return <Groups />;
    default:
      return null;
  }
}
