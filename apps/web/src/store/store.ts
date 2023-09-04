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
import reducers from "../sidebar/file-explorer/reducers";

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

  getState() {
    return this._store$.getValue();
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
    this._reducers.forEach((reducer) =>
      pipe(
        reducer(action, this._store$.getValue()),
        Option.match(
          () => {},
          (state) => {
            return this._store$.next(state);
          }
        )
      )
    );
  }
}

const listOfReducers = [...reducers];

const instance = new AppStore(
  new BehaviorSubject(storeDefaultValue),
  new ReplaySubject(),
  listOfReducers
);

export const notify = (event: UiEvents) => instance.events$.next(event);

export const callUseCase = <T>(
  useCase: (appStore: AppStore) => (args: T) => void
) => {
  return (args: T) => useCase(instance)(args);
};

export const AppStoreInstance = instance;
