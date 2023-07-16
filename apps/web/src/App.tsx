import React from "react";
import { AppShell } from "@mantine/core";
import { ReplaySubject } from "rxjs";

import { DoubleNavbar } from "./sidebar/Layout";
import GraphNetwork from "./network/Network.tsx";
import GlobalSearch from "./global-search/GlobalSearch.tsx";
import { SkottCycles, SkottStructureWithMetadata } from "./skott";

import { fakeSkottData } from "./fake-data";
import { DataStore, UiEvents } from "./events";
import Header from "./header/Header.tsx";

function fetchAnalysisReport(): Promise<SkottStructureWithMetadata> {
  return fetch("/api/analysis")
    .then((res) => res.json())
    .catch(() => fakeSkottData);
}

function fetchCyclesReport(): Promise<SkottCycles> {
  return fetch("/api/cycles")
    .then((res) => res.json())
    .catch(() => ({
      cycles: [],
    }));
}

function App() {
  const dataStore$ = new ReplaySubject<DataStore>();
  const uiEvents$ = new ReplaySubject<UiEvents>();

  React.useEffect(() => {
    Promise.all([fetchAnalysisReport(), fetchCyclesReport()])
      .then(([analysisReport, cyclesReport]) => {
        dataStore$.next({ ...analysisReport, cycles: cyclesReport.cycles });
      })
      .catch((exception) => {
        console.error("Failed to fetch analysis report", exception);
      });
  }, []);

  return (
    <>
      <GlobalSearch dataStore$={dataStore$} uiEvents$={uiEvents$} />
      <AppShell header={<Header />} navbar={<DoubleNavbar />}>
        <div className="root-container">
          <GraphNetwork dataStore$={dataStore$} uiEvents$={uiEvents$} />
        </div>
      </AppShell>
    </>
  );
}

export default App;
