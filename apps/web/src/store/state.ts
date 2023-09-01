import { SkottStructureWithCycles } from "../skott";

export interface UiState {
  filters: {
    glob: string;
  };
}

export interface DataState extends SkottStructureWithCycles {}

export interface AppState {
  data: DataState;
  ui: UiState;
}

export const storeDefaultValue: AppState = {
  data: {
    cycles: [],
    files: [],
    graph: {},
  },
  ui: {
    filters: {
      glob: "",
    },
  },
};
