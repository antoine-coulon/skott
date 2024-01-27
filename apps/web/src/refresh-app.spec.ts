import { toPromise } from "@/core/utils";
import { globalReducers, refreshApp } from "./refresh-app";
import { AppState, storeDefaultValue } from "@/store/state";
import { AppStore } from "@/store/store";
import { BehaviorSubject } from "rxjs";
import { describe, expect, test } from "vitest";

describe("Hot refresh of the application", () => {
  test("Should update the data state with incoming data", async () => {
    const appStore = new AppStore(
      new BehaviorSubject<AppState>(storeDefaultValue),
      globalReducers
    );

    const dispatchAction = refreshApp(appStore);

    await dispatchAction({
      fetchAnalysis() {
        return Promise.resolve({
          entrypoint: "none",
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
        });
      },
      fetchCycles() {
        return Promise.resolve([]);
      },
    });

    const { data } = await toPromise(appStore.store$);

    expect(data).toEqual({
      ...storeDefaultValue.data,
      files: ["some-file.ts"],
      graph: {
        "some-file.ts": {
          adjacentTo: [],
          body: expect.any(Object),
          id: "some-file.ts",
        },
      },
    });
  });

  test("Should preserve UI state settled before refresh", async () => {
    const uiStateToPreserve = {
      ...storeDefaultValue.ui,
      filters: {
        glob: "some-glob/**/*.ts",
      },
      network: {
        ...storeDefaultValue.ui.network,
        dependencies: {
          ...storeDefaultValue.ui.network.dependencies,
          circular: {
            active: true,
          },
        },
      },
    };

    const appStore = new AppStore(
      new BehaviorSubject<AppState>({
        ...storeDefaultValue,
        ui: uiStateToPreserve,
      }),
      globalReducers
    );

    const dispatchAction = refreshApp(appStore);

    await dispatchAction({
      fetchAnalysis() {
        return Promise.resolve({
          entrypoint: "none",
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
        });
      },
      fetchCycles() {
        return Promise.resolve([]);
      },
    });

    const { ui } = await toPromise(appStore.store$);

    expect(ui).toEqual(uiStateToPreserve);
  });
});
