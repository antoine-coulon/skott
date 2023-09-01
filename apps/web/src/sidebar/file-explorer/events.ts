export interface FileExplorerEvents {
  action: "filter_by_glob";
  payload: {
    glob: string;
  };
}
