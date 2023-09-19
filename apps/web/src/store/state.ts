import { SkottStructureWithCycles } from "../skott";

export type NetworkLayout =
  | {
      type: "hierarchical";
      direction: "lr" | "td";
    }
  | {
      type: "cluster";
      spacing_algorithm: "repulsion" | "barnes_hut" | "force_atlas_2";
      node_spacing: number;
    };

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
    layout: NetworkLayout;
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
      layout: {
        type: "cluster",
        spacing_algorithm: "repulsion",
        node_spacing: 100,
      },
    },
  },
};
