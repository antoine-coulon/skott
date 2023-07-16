import React from "react";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";

import App from "./App.tsx";

function Root() {
  const [colorScheme, setColorScheme] = React.useState<"light" | "dark">(
    "light"
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
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default Root;
