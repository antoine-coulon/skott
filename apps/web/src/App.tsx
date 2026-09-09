import React from "react";
import { AppShell, Box, LoadingOverlay } from "@mantine/core";

import { DoubleNavbar } from "./sidebar/Layout";
import GraphNetwork from "./network/Network";
import GlobalSearch from "./global-search/GlobalSearch";
import Header from "./header/Header";
import { AppStoreInstance } from "@/store/store";
import { useClient } from "@/client/react-bindings";
import { useSubscribeToWatchMode } from "@/event-source";
import { bootstrapApp } from "@/core/bootstrap-app";

function App() {
  const client = useClient();
  const [loading, setLoading] = React.useState(true);
  useSubscribeToWatchMode();

  React.useEffect(() => {
    bootstrapApp(AppStoreInstance)(client).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Box pos="fixed" style={{ inset: 0, zIndex: 1000 }} hidden={!loading}>
        <LoadingOverlay visible={loading} overlayBlur={2} />
      </Box>
      <GlobalSearch />
      <AppShell
        navbarOffsetBreakpoint="sm"
        header={<Header />}
        navbar={<DoubleNavbar />}
      >
        <div className="root-container">
          <GraphNetwork />
        </div>
      </AppShell>
    </>
  );
}

export default App;
