import React from "react";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";

import App from "./App.tsx";
import { DataStoreProvider, DataStoreInstance } from "./store/data-store.ts";

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
        <DataStoreProvider value={DataStoreInstance}>
          <App />
        </DataStoreProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default Root;
