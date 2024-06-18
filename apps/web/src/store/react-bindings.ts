import React from "react";
import { map } from "rxjs";
import * as Option from "@effect/data/Option";

import { AppEffects, AppStore, AppStoreInstance } from "./store";
import { AppState } from "./state";
import { flow } from "@effect/data/Function";

const AppStoreContext = React.createContext<AppStore>(AppStoreInstance);

export const useAppStore = () => React.useContext(AppStoreContext);

export const AppStoreProvider = AppStoreContext.Provider;

export const useStoreSelect = <
  T extends keyof AppState,
  K extends keyof AppState[T],
>(
  storeSegment: T,
  pluckedProperty: K
) => {
  const [state, setState] = React.useState<Option.Option<AppState[T][K]>>(
    null!
  );
  const store = useAppStore();

  React.useEffect(() => {
    const subscription = store.store$
      .pipe(map((state) => state[storeSegment][pluckedProperty]))
      .subscribe(flow(Option.some, setState));

    return () => {
      subscription.unsubscribe();
    };
  });

  return state;
};

export const useAppEffects = <R>(callback: (events: AppEffects) => R) => {
  const store = useAppStore();

  React.useEffect(() => {
    const subscription = store.events$.subscribe(callback);

    return () => {
      subscription.unsubscribe();
    };
  });
};
