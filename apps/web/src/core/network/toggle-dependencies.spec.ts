import { AppState, storeDefaultValue } from "@/store/state";
import { AppStore } from "@/store/store";
import { BehaviorSubject } from "rxjs";
import { describe, expect, test } from "vitest";
import { toggleDependencies } from "./toggle-dependencies";
import { toPromise } from "../utils";
import { networkReducers } from "./reducers";

describe("When interacting with network dependencies", () => {
  describe.each([
    { target: "deep" },
    { target: "circular" },
    { target: "builtin" },
    { target: "thirdparty" },
  ] as const)("When enabling $target dependencies", ({ target }) => {
    test(`Should register the activated state for ${target} deps`, async () => {
      const appStore = new AppStore(
        new BehaviorSubject<AppState>(storeDefaultValue),
        networkReducers
      );

      const emittedEvents: string[] = [];
      const subscription = appStore.events$.subscribe((events) => {
        emittedEvents.push(events.action);
      });
      const dispatchAction = toggleDependencies(appStore);

      dispatchAction({ target });

      const { ui: uiState1 } = await toPromise(appStore.store$);

      expect(uiState1).toEqual({
        ...storeDefaultValue.ui,
        network: {
          ...storeDefaultValue.ui.network,
          dependencies: {
            ...storeDefaultValue.ui.network.dependencies,
            [target]: {
              active: true,
            },
          },
        },
      });

      dispatchAction({ target });

      const { ui: uiState2 } = await toPromise(appStore.store$);

      expect(uiState2).toEqual({
        ...storeDefaultValue.ui,
        network: {
          ...storeDefaultValue.ui.network,
          dependencies: {
            ...storeDefaultValue.ui.network.dependencies,
            [target]: {
              active: false,
            },
          },
        },
      });

      const appEvent = `toggle_${target}`;
      expect(emittedEvents).toEqual([appEvent, appEvent]);

      subscription.unsubscribe();
    });
  });
});
