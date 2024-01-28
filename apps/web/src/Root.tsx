import React from "react";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";

import App from "./App";
import { AppStoreProvider } from "./store/react-bindings";
import { AppStoreInstance } from "./store/store";
import { ClientProvider } from "@/client/react-bindings";
import { httpClientLive } from "@/client/http-client";

function Root() {
  const [colorScheme, setColorScheme] = React.useState<"light" | "dark">(
    "dark"
  );
  const toggleColorScheme = () =>
    setColorScheme((scheme) => (scheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}
      >
        <ClientProvider value={httpClientLive}>
          <AppStoreProvider value={AppStoreInstance}>
            <App />
          </AppStoreProvider>
        </ClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default Root;
