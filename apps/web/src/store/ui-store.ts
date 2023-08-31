import React from "react";
import { ReplaySubject } from "rxjs";
import { UiEvents } from "../events";

interface UiStorePayload {}

export class UiStore {
  constructor(
    private readonly _uiStore$: ReplaySubject<UiStorePayload>,
    private readonly _uiEvents$: ReplaySubject<UiEvents>
  ) {}

  get store$() {
    return this._uiStore$;
  }

  get events$() {
    return this._uiEvents$;
  }
}

const instance = new UiStore(new ReplaySubject(), new ReplaySubject());

export const dispatch = (event: UiEvents) => instance.events$.next(event);

const UiStoreContext = React.createContext<UiStore>(instance);

export const useUiStore = () => React.useContext(UiStoreContext);

export const UiStoreProvider = UiStoreContext.Provider;
export const UiStoreInstance = instance;
