import React from "react";
import {
  BehaviorSubject,
  ReplaySubject,
  distinctUntilChanged,
  map,
} from "rxjs";
import * as Option from "@effect/data/Option";
import { pipe } from "@effect/data/Function";

import { AppEvents, UiEvents } from "./events";
import { AppState, storeDefaultValue } from "./state";
import { StoreReducer } from "./reducer";

export class AppStore {
  constructor(
    private readonly _store$: BehaviorSubject<AppState>,
    private readonly _uiEvents$: ReplaySubject<UiEvents>,
    private readonly _reducers: StoreReducer<AppState, AppEvents>[]
  ) {}

  private _initialState: AppState = storeDefaultValue;

  get store$() {
    return this._store$;
  }

  get dataState$() {
    return this._store$.pipe(
      map((state) => state.data),
      distinctUntilChanged()
    );
  }

  get uiState$() {
    return this._store$.pipe(
      map((state) => state.ui),
      distinctUntilChanged()
    );
  }

  get events$() {
    return this._uiEvents$;
  }

  getInitialState() {
    return this._initialState;
  }

  setInitialState(dataStore: AppState) {
    this._initialState = dataStore;
  }

  resetState() {
    this._store$.next(this._initialState);
  }

  dispatch(action: AppEvents) {
    this._reducers.forEach((reducer) => {
      // no batching for now
      const newState = reducer(action)(this._store$.getValue());
      return pipe(
        newState,
        Option.match(
          () => {},
          (state) => this._store$.next(state)
        )
      );
    });
  }
}

const instance = new AppStore(
  new BehaviorSubject(storeDefaultValue),
  new ReplaySubject(),
  []
);

export const dispatch = (event: UiEvents) => instance.events$.next(event);

const AppStoreContext = React.createContext<AppStore>(instance);

export const useAppStore = () => React.useContext(AppStoreContext);

export const AppStoreProvider = AppStoreContext.Provider;
export const AppStoreInstance = instance;
