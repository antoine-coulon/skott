import { AppState } from "../../store/state";

export type FileExplorerActions =
  | {
      action: "filter_by_glob";
      payload: {
        glob: string;
        data: AppState["data"];
      };
    }
  | {
      action: "reset_glob_filter";
      payload: {
        data: AppState["data"];
      };
    };
