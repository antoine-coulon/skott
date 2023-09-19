import { FileExplorerActions } from "@/core/file-system/actions";
import { NetworkActions } from "@/core/network/actions";

export type AppActions = NetworkActions | FileExplorerActions;
