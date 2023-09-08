import { FileExplorerActions } from "@/core/file-system/actions";

export type AppActions =
  | { action: "toggle_circular"; payload: { enabled: boolean } }
  | { action: "toggle_builtin"; payload: { enabled: boolean } }
  | { action: "toggle_thirdparty"; payload: { enabled: boolean } }
  | FileExplorerActions;
