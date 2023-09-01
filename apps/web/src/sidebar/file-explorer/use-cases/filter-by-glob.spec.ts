import { describe, test, expect } from "vitest";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { filterByGlob } from "./filter-by-glob";
import reducers from "../reducers";
import { AppStore } from "../../../store/store";
import { AppState, storeDefaultValue } from "../../../store/state";

function toPromise<T>(observable: Observable<T>): Promise<T> {
  return new Promise((resolve) => {
    observable.subscribe((data) => {
      resolve(data);
    });
  });
}

describe("Filter by glob", () => {
  describe("When the store is empty", () => {
    test("Should apply the filter in the ui store but should not change anything in the data store", async () => {
      const appStore = new AppStore(
        new BehaviorSubject<AppState>(storeDefaultValue),
        new ReplaySubject(),
        reducers
      );

      const dispatchAction = filterByGlob({ appStore });

      dispatchAction("src/**/*.ts");

      const { data, ui } = await toPromise(appStore.store$);

      expect(data).toEqual({
        cycles: [],
        files: [],
        graph: {},
      });

      expect(ui).toEqual({
        filters: {
          glob: "src/**/*.ts",
        },
      });
    });
  });
});
