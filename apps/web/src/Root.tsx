import React from "react";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";

import App from "./App";
import { AppStoreProvider } from "./store/react-bindings";
import { AppStoreInstance } from "./store/store";

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
        <AppStoreProvider value={AppStoreInstance}>
          <App />
        </AppStoreProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default Root;
