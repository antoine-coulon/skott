import { FileExplorerActions } from "@/core/file-system/actions";
import { NetworkActions } from "@/core/network/actions";
import { GlobalActions } from "@/refresh-app";

export type AppActions = NetworkActions | FileExplorerActions | GlobalActions;
