import { FileExplorerEvents } from "@/core/file-system/events";

export type UiEvents =
  | { action: "toggle_circular"; payload: { enabled: boolean } }
  | { action: "toggle_builtin"; payload: { enabled: boolean } }
  | { action: "toggle_thirdparty"; payload: { enabled: boolean } }
  | {
      action: "open_search";
    }
  | {
      action: "focus_on_node";
      payload: {
        nodeId: string;
      };
    }
  | {
      action: "isolate_node";
      payload: {
        nodeId: string;
      };
    }
  | FileExplorerEvents;

export type AppEvents = UiEvents;
