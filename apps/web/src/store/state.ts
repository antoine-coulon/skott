import { SkottStructureWithCycles } from "../skott";

export type NetworkLayout = (
  | {
      type: "hierarchical";
      direction: "UD" | "DU" | "LR" | "RL";
      spacing_algorithm: "hubsize" | "directed";
    }
  | {
      type: "cluster";
      spacing_algorithm: "repulsion" | "barnes_hut" | "force_atlas_2";
    }
) & { node_spacing: number; smooth_edges: boolean };

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

export const storeDefaultValue = {
  data: {
    entrypoint: "none",
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
        smooth_edges: false,
        spacing_algorithm: "repulsion",
        node_spacing: 500,
      },
    },
  },
} satisfies AppState;
