import { AppShell } from "@mantine/core";

import { DoubleNavbar } from "./sidebar/Layout";
import GraphNetwork from "./network/Network";
import GlobalSearch from "./global-search/GlobalSearch";
import Header from "./header/Header";
import { callUseCase } from "@/store/store";
import { useClient } from "@/client/react-bindings";
import { useSubscribeToWatchMode } from "@/event-source";
import { bootstrapApp } from "@/core/bootstrap-app";

function App() {
  const client = useClient();
  callUseCase(bootstrapApp)(client);
  useSubscribeToWatchMode();

  return (
    <>
      <GlobalSearch />
      <AppShell header={<Header />} navbar={<DoubleNavbar />}>
        <div className="root-container">
          <GraphNetwork />
        </div>
      </AppShell>
    </>
  );
}

export default App;
