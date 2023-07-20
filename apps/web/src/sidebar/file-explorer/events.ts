export type FileExplorerEvents = {
  action: "filter_by_glob";
  payload: {
    glob: string;
  };
};
