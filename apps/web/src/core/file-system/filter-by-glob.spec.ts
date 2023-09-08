import { describe, test, expect } from "vitest";
import { BehaviorSubject, Subject } from "rxjs";

import { AppStore } from "@/store/store";
import { AppState, storeDefaultValue } from "@/store/state";
import { filterByGlob } from "./filter-by-glob";
import { fileSystemReducers } from "./reducers";
import { toPromise } from "../utils";

describe("When filtering data by adding a glob", () => {
  describe("When the data store is initially empty", () => {
    test("Should apply the filter in the ui store but should not change anything in the data store", async () => {
      const appStore = new AppStore(
        new BehaviorSubject<AppState>(storeDefaultValue),
        fileSystemReducers
      );

      const dispatchAction = filterByGlob(appStore);

      dispatchAction("src/**/*.ts");

      const { data, ui } = await toPromise(appStore.store$);

      expect(data).toEqual({
        cycles: [],
        files: [],
        graph: {},
      });

      expect(ui).toEqual({
        ...storeDefaultValue.ui,
        filters: {
          glob: "src/**/*.ts",
        },
      });
    });
  });

  describe("When the data store is filled", () => {
    test("Should apply the filter on Files and Graph from the data store", async () => {
      const appStore = new AppStore(
        new BehaviorSubject<AppState>({
          ...storeDefaultValue,
          data: {
            cycles: [["a.js", "b.js"]],
            files: ["test.ts", "src/a.ts", "a.js", "b.js"],
            graph: {
              "a.js": {
                id: "a.js",
                adjacentTo: [],
                body: {} as any,
              },
              "b.js": {
                id: "b.js",
                adjacentTo: [],
                body: {} as any,
              },
              "test.ts": {
                id: "test.ts",
                adjacentTo: [],
                body: {} as any,
              },
              "src/a.ts": {
                id: "src/a.ts",
                adjacentTo: [],
                body: {} as any,
              },
            },
          },
        }),
        fileSystemReducers
      );

      const dispatchAction = filterByGlob(appStore);

      dispatchAction("*.ts");

      const { data, ui } = await toPromise(appStore.store$);

      expect(data).toEqual({
        cycles: [["a.js", "b.js"]],
        files: ["a.js", "b.js"],
        graph: {
          "a.js": {
            id: "a.js",
            adjacentTo: [],
            body: {} as any,
          },
          "b.js": {
            id: "b.js",
            adjacentTo: [],
            body: {} as any,
          },
        },
      });

      expect(ui).toEqual({
        ...storeDefaultValue.ui,
        filters: {
          glob: "*.ts",
        },
      });
    });

    test("Should apply the filter on Cycles from the data store", async () => {
      const appStore = new AppStore(
        new BehaviorSubject<AppState>({
          ...storeDefaultValue,
          data: {
            cycles: [
              ["a.js", "b.js"],
              ["c.js", "d.js"],
            ],
            files: [],
            graph: {},
          },
        }),
        fileSystemReducers
      );

      const dispatchAction = filterByGlob(appStore);

      dispatchAction("a.js");

      const { data, ui } = await toPromise(appStore.store$);

      expect(data).toEqual({
        cycles: [["c.js", "d.js"]],
        files: [],
        graph: {},
      });

      expect(ui).toEqual({
        ...storeDefaultValue.ui,
        filters: {
          glob: "a.js",
        },
      });
    });
  });
});

describe("When resetting the glob to none", () => {
  test("Should reset the store to the initially set value", async () => {
    const initialAppState = {
      data: {
        cycles: [["a.js", "b.js"]],
        files: ["a.js", "b.js"],
        graph: {
          "a.js": {
            id: "a.js",
            adjacentTo: [],
            body: {} as any,
          },
          "b.js": {
            id: "b.js",
            adjacentTo: [],
            body: {} as any,
          },
        },
      },
      ui: storeDefaultValue.ui,
    };

    const appStore = new AppStore(
      new BehaviorSubject<AppState>(storeDefaultValue),
      fileSystemReducers
    );

    appStore.setInitialState(initialAppState);

    const dispatchAction = filterByGlob(appStore);

    dispatchAction("*.js");
    dispatchAction("");

    const appState = await toPromise(appStore.store$);

    expect(appState).toEqual(initialAppState);
  });
});

describe("When removing an initially set glob", () => {
  test("Should reset the store to the initially set value", async () => {
    const initialAppState = {
      data: {
        entrypoint: "src/c.js",
        cycles: [],
        files: ["src/lib/a.js", "src/lib/b.js", "src/c.js"],
        graph: {
          "src/lib/a.js": {
            id: "src/lib/a.js",
            adjacentTo: [],
            body: {} as any,
          },
          "src/lib/b.js": {
            id: "src/lib/b.js",
            adjacentTo: [],
            body: {} as any,
          },
          "src/c.js": {
            id: "src/c.js",
            adjacentTo: [],
            body: {} as any,
          },
        },
      },
      ui: storeDefaultValue.ui,
    };

    const appStore = new AppStore(
      new BehaviorSubject<AppState>(storeDefaultValue),
      fileSystemReducers
    );

    appStore.setInitialState(initialAppState);

    const dispatchAction = filterByGlob(appStore);

    dispatchAction("src/**/*");
    dispatchAction("src/lib/**/*");

    const appState = await toPromise(appStore.store$);

    expect(appState).toEqual({
      data: {
        entrypoint: "src/c.js",
        cycles: [],
        files: ["src/c.js"],
        graph: {
          "src/c.js": {
            id: "src/c.js",
            adjacentTo: [],
            body: {} as any,
          },
        },
      },
      ui: {
        ...storeDefaultValue.ui,
        filters: {
          glob: "src/lib/**/*",
        },
      },
    });
  });
});
