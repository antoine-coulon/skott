import React from "react";
import { ReplaySubject } from "rxjs";
import { DataStore, UiEvents } from "./events";

const storeInitialValue = {
  cycles: [],
  files: [],
  graph: {},
};

const eventStoreInitialValue = {
  dataStore$: new ReplaySubject<DataStore>(),
  uiEvents$: new ReplaySubject<UiEvents>(),
};

export class EventStore {
  private _dataStore: DataStore = storeInitialValue;

  constructor(
    public dataStore$: ReplaySubject<DataStore>,
    public uiEvents$: ReplaySubject<UiEvents>
  ) {}

  public getInitialStore() {
    return this._dataStore;
  }

  public setInitialStore(dataStore: DataStore) {
    this._dataStore = dataStore;
  }

  public resetStore() {
    this.dataStore$.next(this._dataStore);
  }
}

const instance = new EventStore(
  eventStoreInitialValue.dataStore$,
  eventStoreInitialValue.uiEvents$
);

const EventStoreContext = React.createContext<EventStore>(instance);

export const useEventStore = () => React.useContext(EventStoreContext);

export const DataStoreProvider = EventStoreContext.Provider;
export const EventStoreInstance = instance;
