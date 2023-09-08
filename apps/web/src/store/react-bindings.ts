import React from "react";
import { map } from "rxjs";

import { AppStore, AppStoreInstance } from "./store";
import { AppState } from "./state";

const AppStoreContext = React.createContext<AppStore>(AppStoreInstance);

export const useAppStore = () => React.useContext(AppStoreContext);

export const AppStoreProvider = AppStoreContext.Provider;

export const useStoreSelect = <
  T extends keyof AppState,
  K extends keyof AppState[T]
>(
  storeSegment: T,
  pluckedProperty: K
) => {
  const [state, setState] = React.useState<AppState[T][K]>(null!);
  const store = useAppStore();

  React.useEffect(() => {
    const subscription = store.store$
      .pipe(map((state) => state[storeSegment][pluckedProperty]))
      .subscribe(setState);

    return () => {
      subscription.unsubscribe();
    };
  });

  return state;
};
