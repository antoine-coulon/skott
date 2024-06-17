import { FileExplorerActions } from "@/core/file-system/actions";
import { NetworkActions } from "@/core/network/actions";
import { ApplicationLifecycleActions } from "@/core/refresh-app";

export type AppActions =
  | NetworkActions
  | FileExplorerActions
  | ApplicationLifecycleActions;
