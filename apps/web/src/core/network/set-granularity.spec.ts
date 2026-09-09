import { networkReducers } from "@/core/network/reducers";
import { setGranularity } from "@/core/network/set-granularity";
import { toPromise } from "@/core/utils";
import { AppState, storeDefaultValue } from "@/store/state";
import { AppStore } from "@/store/store";
import * as Option from "@effect/data/Option";
import { BehaviorSubject } from "rxjs";
import { describe, expect, test } from "vitest";

describe("Visualization granularity", () => {
  test("Should switch the granularity to grouped visualization", async () => {
    const appStore = new AppStore(
      new BehaviorSubject<AppState>(storeDefaultValue),
      networkReducers
    );

    const { ui: initialUi } = await toPromise(appStore.store$);
    expect(initialUi.visualization.granularity).toEqual(Option.none());

    setGranularity(appStore)({ granularity: "group" });

    const { ui: updatedUi } = await toPromise(appStore.store$);
    expect(updatedUi.visualization.granularity).toEqual(Option.some("group"));
  });
});
