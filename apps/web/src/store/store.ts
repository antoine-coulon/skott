import { BehaviorSubject, Subject } from "rxjs";
import * as Option from "@effect/data/Option";
import { pipe } from "@effect/data/Function";

import { AppEvents } from "./events";
import { AppActions } from "./actions";
import { AppState, storeDefaultValue } from "./state";
import { StoreReducer } from "./reducer";
import { fileSystemReducers } from "../core/file-system/reducers";
import { networkReducers } from "@/core/network/reducers";

export type AppEffects = AppEvents | AppActions;

export class AppStore {
  constructor(
    private readonly _store$: BehaviorSubject<AppState>,
    private readonly _reducers: StoreReducer<AppState, AppEffects>[]
  ) {}

  private _eventStream$ = new Subject<AppEffects>();
  private _initialState: AppState = storeDefaultValue;

  private notify(event: AppActions) {
    this.events$.next(event);
  }

  get store$() {
    return this._store$;
  }

  get events$() {
    return this._eventStream$;
  }

  getState() {
    return this._store$.getValue();
  }

  getInitialState() {
    return this._initialState;
  }

  setInitialState(dataStore: AppState) {
    this._initialState = dataStore;
    this.store$.next(dataStore);
  }

  resetState() {
    this._store$.next(this._initialState);
  }

  dispatch(action: AppActions, dispatchOptions = { notify: false }) {
    this._reducers.forEach((reducer) =>
      pipe(
        reducer(action, this.getState()),
        Option.match(
          () => {},
          (state) => {
            return this._store$.next(state);
          }
        )
      )
    );

    if (dispatchOptions.notify) {
      this.notify(action);
    }
  }
}

const listOfReducers = [...fileSystemReducers, ...networkReducers];

const instance = new AppStore(
  new BehaviorSubject<AppState>(storeDefaultValue),
  listOfReducers
);

export const notify = (event: AppEvents) => instance.events$.next(event);

export const callUseCase = <T>(
  useCase: (appStore: AppStore) => (args: T) => void
) => {
  return (args: T) => useCase(instance)(args);
};

export const AppStoreInstance = instance;
