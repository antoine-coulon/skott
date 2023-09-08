import * as Option from "@effect/data/Option";
import * as m from "minimatch-browser-fork";

import { AppReducer } from "@/store/reducer";
import { AppState } from "@/store/state";

function filterByGlobMatch(glob: string) {
  return function (filename: string) {
    return !m.filter(glob, { matchBase: true })(filename);
  };
}

function areKeptFiles(glob: string) {
  return function (files: string[]) {
    return !files.some((file) => m.minimatch(file, glob, { matchBase: true }));
  };
}

function applyGlob(glob: string, state: AppState["data"]): AppState["data"] {
  const filteredFiles = state.files.filter(filterByGlobMatch(glob));
  const filteredGraph = Object.fromEntries(
    Object.entries(state.graph).filter(([key]) => {
      return filteredFiles.includes(key);
    })
  );
  const filteredCycles = state.cycles.filter(areKeptFiles(glob));

  return {
    files: filteredFiles,
    graph: filteredGraph,
    cycles: filteredCycles,
  };
}

function filterByGlob(): AppReducer {
  return function (event, state) {
    if (event.action === "filter_by_glob") {
      return Option.some({
        data: {
          ...state.data,
          ...applyGlob(event.payload.glob, event.payload.data),
        },
        ui: {
          ...state.ui,
          filters: {
            glob: event.payload.glob,
          },
        },
      });
    }

    if (event.action === "reset_glob_filter") {
      return Option.some({
        data: event.payload.data,
        ui: {
          ...state.ui,
          filters: {
            glob: "",
          },
        },
      });
    }

    return Option.none();
  };
}

export const fileSystemReducers = [filterByGlob()];
