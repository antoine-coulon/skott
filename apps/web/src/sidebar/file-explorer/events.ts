import { AppState } from "../../store/state";

export type FileExplorerEvents =
  | {
      action: "filter_by_glob";
      payload: {
        glob: string;
      };
    }
  | {
      action: "reset_glob_filter";
      payload: {
        data: AppState["data"];
      };
    };
