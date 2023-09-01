import React from "react";

import { AppStore, AppStoreInstance } from "./store";

const AppStoreContext = React.createContext<AppStore>(AppStoreInstance);

export const useAppStore = () => React.useContext(AppStoreContext);

export const AppStoreProvider = AppStoreContext.Provider;
