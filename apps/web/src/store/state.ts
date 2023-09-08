import { SkottStructureWithCycles } from "../skott";

export interface UiState {
  filters: {
    glob: string;
  };
  network: {
    dependencies: {
      circular: {
        active: boolean;
      };
      builtin: {
        active: boolean;
      };
      thirdparty: {
        active: boolean;
      };
    };
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
    network: {
      dependencies: {
        circular: {
          active: false,
        },
        thirdparty: {
          active: false,
        },
        builtin: {
          active: false,
        },
      },
    },
  },
};
