import { networkReducers } from "@/core/network/reducers";
import { updateConfiguration } from "@/core/network/update-configuration";
import { toPromise } from "@/core/utils";
import { AppState, storeDefaultValue } from "@/store/state";
import { AppStore } from "@/store/store";
import { BehaviorSubject } from "rxjs";
import { describe, expect, test } from "vitest";

describe("Graph dynamic configuration", () => {
  test("Should update the configuration", async () => {
    const appStore = new AppStore(
      new BehaviorSubject<AppState>(storeDefaultValue),
      networkReducers
    );

    const { ui: initialUi } = await toPromise(appStore.store$);
    expect(initialUi).toEqual({
      ...storeDefaultValue.ui,
      network: {
        ...storeDefaultValue.ui.network,
        layout: {
          type: "cluster",
          spacing_algorithm: "repulsion",
          node_spacing: 500,
        },
      },
    });

    const dispatchAction = updateConfiguration(appStore);

    dispatchAction({
      type: "hierarchical",
      direction: "LR",
      node_spacing: 300,
      spacing_algorithm: "directed",
    });

    const { ui: updatedUi } = await toPromise(appStore.store$);
    expect(updatedUi).toEqual({
      ...storeDefaultValue.ui,
      network: {
        ...storeDefaultValue.ui.network,
        layout: {
          type: "hierarchical",
          direction: "LR",
          node_spacing: 300,
          spacing_algorithm: "directed",
        },
      },
    });
  });
});
