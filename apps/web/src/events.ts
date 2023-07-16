import { SkottStructureWithCycles } from "./skott";

export type UiEvents =
  | {
      action: "focus";
      payload: {
        nodeId: string;
      };
    }
  | { action: "toggle_circular"; payload: { enabled: boolean } }
  | { action: "toggle_builtin"; payload: { enabled: boolean } }
  | { action: "toggle_thirdparty"; payload: { enabled: boolean } }
  | {
      action: "open_search";
    };

export type DataStore = SkottStructureWithCycles;
