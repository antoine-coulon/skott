import { toPromise } from "@/core/utils";
import { AppState, storeDefaultValue } from "@/store/state";
import { AppStore } from "@/store/store";
import { BehaviorSubject } from "rxjs";
import { describe, expect, test } from "vitest";
import { bootstrapApp } from "@/core/bootstrap-app";
import * as Option from "@effect/data/Option";

describe("Initialization of the application", () => {
  test("Should populate store with initially fetched values", async () => {
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
          graph: {
            "some-file.ts": {
              adjacentTo: [],
              body: {
                size: 0,
                builtinDependencies: [],
                thirdPartyDependencies: [],
              },
              id: "some-file.ts",
            },
          },
          groupedGraph: {},
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
        graph: {
          "some-file.ts": {
            adjacentTo: [],
            body: {
              size: 0,
              builtinDependencies: [],
              thirdPartyDependencies: [],
            },
            id: "some-file.ts",
          },
        },
        groupedGraph: {},
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

  describe("When meta does not provide tracking", () => {
    test("Should populate store with initially fetched values", async () => {
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
            graph: {
              "some-file.ts": {
                adjacentTo: [],
                body: {
                  size: 0,
                  builtinDependencies: [],
                  thirdPartyDependencies: [],
                },
                id: "some-file.ts",
              },
            },
            groupedGraph: {},
          });
        },

        fetchCycles() {
          return Promise.resolve([["some-file.ts", "another-file.ts"]]);
        },

        fetchMeta() {
          return Promise.resolve({
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
          graph: {
            "some-file.ts": {
              adjacentTo: [],
              body: {
                size: 0,
                builtinDependencies: [],
                thirdPartyDependencies: [],
              },
              id: "some-file.ts",
            },
          },
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
            granularity: Option.some("group"),
          },
        },
      });
    });
  });
});
