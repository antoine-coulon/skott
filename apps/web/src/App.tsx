import React from "react";
import { AppShell } from "@mantine/core";

import { DoubleNavbar } from "./sidebar/Layout";
import GraphNetwork from "./network/Network";
import GlobalSearch from "./global-search/GlobalSearch";
import { SkottStructureWithMetadata } from "./skott";
import Header from "./header/Header";
import { storeDefaultValue } from "./store/state";
import { useAppStore } from "./store/react-bindings";

function fetchAnalysisReport(): Promise<SkottStructureWithMetadata> {
  return fetch("/api/analysis")
    .then((res) => res.json())
    .catch(() => {});
}

function fetchCyclesReport(): Promise<string[][]> {
  return fetch("/api/cycles")
    .then((res) => res.json())
    .catch(() => ({
      cycles: [],
    }));
}

function App() {
  const dataStore = useAppStore();

  React.useEffect(() => {
    Promise.all([fetchAnalysisReport(), fetchCyclesReport()])
      .then(([analysisReport, cyclesReport]) => {
        const nextValue = {
          ...analysisReport,
          cycles: cyclesReport,
        };
        const appStateValue = { ...storeDefaultValue, data: nextValue };
        dataStore.setInitialState(appStateValue);
      })
      .catch((exception) => {
        console.error("Failed to fetch analysis report", exception);
      });
  }, []);

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
