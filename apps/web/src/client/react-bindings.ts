import { SkottHttpClient, httpClientLive } from "@/client/http-client";
import React from "react";

const ClientContext = React.createContext<SkottHttpClient>(httpClientLive);

export const useClient = () => React.useContext(ClientContext);

export const ClientProvider = ClientContext.Provider;
