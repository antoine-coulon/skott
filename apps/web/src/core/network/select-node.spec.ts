import { AppState, storeDefaultValue } from "@/store/state";
import { AppStore } from "@/store/store";
import { BehaviorSubject } from "rxjs";
import { describe, expect, test } from "vitest";
import { toPromise } from "../utils";
import { networkReducers } from "./reducers";
import { selectNode } from "./select-node";

describe("When clicking on a node", () => {
  test(`Should update selected nodeId`, async () => {
    const appStore = new AppStore(
      new BehaviorSubject<AppState>(storeDefaultValue),
      networkReducers
    );

    const emittedEvents: string[] = [];
    const subscription = appStore.events$.subscribe((events) => {
      emittedEvents.push(events.action);
    });

    const dispatchAction = selectNode(appStore);

    dispatchAction(['file-1.ts']);

    const { ui: uiState1 } = await toPromise(appStore.store$);

    expect(uiState1).toEqual({
      ...storeDefaultValue.ui,
      network: {
        ...storeDefaultValue.ui.network,
        selectedNodeId: 'file-1.ts'
      },
    });

    dispatchAction(['file-2.ts']);

    const { ui: uiState2 } = await toPromise(appStore.store$);

    expect(uiState2).toEqual({
      ...storeDefaultValue.ui,
      network: {
        ...storeDefaultValue.ui.network,
        selectedNodeId: 'file-2.ts'
      },
    });

    const appEvent = "select_node";
    expect(emittedEvents).toEqual([appEvent, appEvent]);

    subscription.unsubscribe();
  });
});
