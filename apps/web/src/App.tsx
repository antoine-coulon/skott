import React from "react";

import Sidebar from "./Sidebar";
import GraphNetwork from "./Network.tsx";
import GlobalSearch from "./GlobalSearch.tsx";
import { SkottCycles, SkottStructureWithMetadata } from "./skott";

import { fakeCyclesData, fakeSkottData } from "./fake-data";
import { ReplaySubject } from "rxjs";
import { DataStore, UiEvents } from "./events";

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
        dataStore$.next({ ...analysisReport, cycles: fakeCyclesData });
      })
      .catch(() => {
        // displayError
      });
  }, []);

  return (
    <div className="root-container">
      <GlobalSearch dataStore$={dataStore$} uiEvents$={uiEvents$} />
      <Sidebar dataStore$={dataStore$} uiEvents$={uiEvents$} />
      <GraphNetwork dataStore$={dataStore$} uiEvents$={uiEvents$} />
    </div>
  );
}

export default App;
