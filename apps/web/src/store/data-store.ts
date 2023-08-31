import React from "react";
import { ReplaySubject } from "rxjs";

import { SkottStructureWithCycles } from "../skott.js";

const storeInitialValue = {
  cycles: [],
  files: [],
  graph: {},
};

const StoreInitialValue = {
  dataStore$: new ReplaySubject<DataStorePayload>(),
};

export type DataStorePayload = SkottStructureWithCycles;

export class DataStore {
  private _dataStore: DataStorePayload = storeInitialValue;

  constructor(private readonly _dataStore$: ReplaySubject<DataStorePayload>) {}

  get store$() {
    return this._dataStore$;
  }

  public getInitialStore() {
    return this._dataStore;
  }

  public setInitialStore(dataStore: DataStorePayload) {
    this._dataStore = dataStore;
  }

  public resetStore() {
    this._dataStore$.next(this._dataStore);
  }
}

const instance = new DataStore(StoreInitialValue.dataStore$);

const DataStoreContext = React.createContext<DataStore>(instance);

export const useDataStore = () => React.useContext(DataStoreContext);

export const DataStoreProvider = DataStoreContext.Provider;
export const DataStoreInstance = instance;
