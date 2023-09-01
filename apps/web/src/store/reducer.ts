import * as Option from "@effect/data/Option";

import { AppState } from "./state";
import { AppEvents } from "./events";

export interface StoreReducer<StoreShape, ActionShape> {
  (action: ActionShape): (state: StoreShape) => Option.Option<StoreShape>;
}

export interface AppReducer extends StoreReducer<AppState, AppEvents> {}
