import { toPromise } from "@/core/utils";
import { AppState, storeDefaultValue } from "@/store/state";
import { AppStore } from "@/store/store";
import { BehaviorSubject } from "rxjs";
import { describe, expect, test } from "vitest";
import { bootstrapApp } from "@/core/bootstrap-app";
import * as Option from "@effect/data/Option";

const moduleGraph = {
  "some-file.ts": {
    adjacentTo: [],
    body: {
      size: 0,
      builtinDependencies: [],
      thirdPartyDependencies: [],
    },
    id: "some-file.ts",
  },
};

describe("Initialization of the application", () => {
  test("Should populate store and group when a grouped graph is provided", async () => {
    const appStore = new AppStore(
      new BehaviorSubject<AppState>(storeDefaultValue),
      [],
    );

    const groupedGraph = {
      group: {
        adjacentTo: [],
        body: {
          size: 0,
          files: ["some-file.ts"],
          builtinDependencies: [],
          thirdPartyDependencies: [],
        },
        id: "group",
      },
    };

    const dispatchAction = bootstrapApp(appStore);

    await dispatchAction({
      fetchAnalysis() {
        return Promise.resolve({
          entrypoint: "some-file.ts",
          files: ["some-file.ts"],
          graph: moduleGraph,
          groupedGraph,
        });
      },

      fetchCycles() {
        return Promise.resolve([["some-file.ts", "another-file.ts"]]);
      },

      fetchMeta() {
        return Promise.resolve({
          tracking: {
            builtin: true,
            thirdParty: true,
            typeOnly: false,
          },
          visualization: {
            granularity: "group",
          },
        });
      },
    });

    const appState = await toPromise(appStore.store$);

    expect(appState).toEqual<AppState>({
      data: {
        cycles: [["some-file.ts", "another-file.ts"]],
        entrypoint: "some-file.ts",
        files: ["some-file.ts"],
        graph: moduleGraph,
        groupedGraph,
        tracking: {
          builtin: true,
          thirdParty: true,
          typeOnly: false,
        },
      },
      ui: {
        filters: storeDefaultValue.ui.filters,
        network: {
          selectedNodeId: '',
          dependencies: {
            builtin: {
              active: false,
            },
            circular: {
              active: false,
            },
            deep: {
              active: false,
            },
            thirdparty: {
              active: false,
            },
          },
          layout: storeDefaultValue.ui.network.layout,
        },
        visualization: {
          granularity: Option.some("group"),
        },
      },
    });
  });

  describe("When no grouped graph is provided", () => {
    test("Should stay in module view and fall back on default tracking", async () => {
      const appStore = new AppStore(
        new BehaviorSubject<AppState>(storeDefaultValue),
        [],
      );

      const dispatchAction = bootstrapApp(appStore);

      await dispatchAction({
        fetchAnalysis() {
          return Promise.resolve({
            entrypoint: "some-file.ts",
            files: ["some-file.ts"],
            graph: moduleGraph,
            groupedGraph: {},
          });
        },

        fetchCycles() {
          return Promise.resolve([["some-file.ts", "another-file.ts"]]);
        },

        fetchMeta() {
          return Promise.resolve({
            visualization: {
              granularity: "module",
            },
          });
        },
      });

      const appState = await toPromise(appStore.store$);

      expect(appState).toEqual<AppState>({
        data: {
          cycles: [["some-file.ts", "another-file.ts"]],
          entrypoint: "some-file.ts",
          files: ["some-file.ts"],
          graph: moduleGraph,
          groupedGraph: {},
          tracking: {
            builtin: false,
            thirdParty: false,
            typeOnly: false,
          },
        },
        ui: {
          filters: storeDefaultValue.ui.filters,
          network: {
            selectedNodeId: '',
            dependencies: {
              builtin: {
                active: false,
              },
              circular: {
                active: false,
              },
              deep: {
                active: false,
              },
              thirdparty: {
                active: false,
              },
            },
            layout: storeDefaultValue.ui.network.layout,
          },
          visualization: {
            granularity: Option.some("module"),
          },
        },
      });
    });
  });
});
