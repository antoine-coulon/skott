import { SkottStructureWithCycles } from "../skott";
import * as Option from "@effect/data/Option";

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
  visualization: {
    granularity: Option.Option<"module" | "group">;
  };
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

export interface DataState extends SkottStructureWithCycles {
  tracking: {
    builtin: boolean;
    thirdParty: boolean;
    typeOnly: boolean;
  };
}

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
    tracking: {
      builtin: false,
      thirdParty: false,
      typeOnly: false,
    },
  },
  ui: {
    visualization: {
      granularity: Option.none(),
    },
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
