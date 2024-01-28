import { AppShell } from "@mantine/core";

import { DoubleNavbar } from "./sidebar/Layout";
import GraphNetwork from "./network/Network";
import GlobalSearch from "./global-search/GlobalSearch";
import Header from "./header/Header";
import { AppState, storeDefaultValue } from "./store/state";
import { useAppStore } from "./store/react-bindings";
import { AppStore } from "@/store/store";
import { SkottHttpClient } from "@/client/http-client";
import { useClient } from "@/client/react-bindings";
import { logError } from "@/logger";
import { useSubscribeToWatchMode } from "@/event-source";

function initializeStore(client: SkottHttpClient, dataStoreRef: AppStore) {
  return Promise.all([client.fetchAnalysis(), client.fetchCycles()])
    .then(([analysisReport, cyclesReport]) => {
      const nextDataValue = {
        ...analysisReport,
        cycles: cyclesReport,
      };

      const appStateValue: AppState = {
        ...storeDefaultValue,
        data: nextDataValue,
      };

      dataStoreRef.setInitialState(appStateValue);
    })
    .catch((exception) => {
      logError(`Failed to fetch analysis report. Reason: ${exception}`);
    });
}

function App() {
  const dataStore = useAppStore();
  const client = useClient();
  useSubscribeToWatchMode();

  initializeStore(client, dataStore);

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
