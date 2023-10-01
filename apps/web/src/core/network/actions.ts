import { NetworkLayout } from "@/store/state";

export type NetworkActions =
  | { action: "toggle_circular"; payload: { enabled: boolean } }
  | { action: "toggle_builtin"; payload: { enabled: boolean } }
  | { action: "toggle_thirdparty"; payload: { enabled: boolean } }
  | {
      action: "update_configuration";
      payload: NetworkLayout;
    };
