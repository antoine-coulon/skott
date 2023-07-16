import * as Option from "@effect/data/Option";
import { Subject } from "rxjs";

import { SkottStructureWithCycles } from "./skott.js";
import { isJavaScriptModule, isTypeScriptModule } from "./util.js";
import { UiEvents } from "./events.js";
import React from "react";

interface SkottData extends SkottStructureWithCycles {
  numberOfTypeScriptFiles: number;
  numberOfJavaScriptFiles: number;
  builtinRegistry: Set<string>;
  npmRegistry: Set<string>;
}

export default function Sidebar({
  dataStore$,
  uiEvents$,
}: {
  dataStore$: Subject<SkottStructureWithCycles>;
  uiEvents$: Subject<UiEvents>;
}) {
  const [analysisData, setAnalysisData] = React.useState<
    Option.Option<SkottData>
  >(Option.none());

  const [visualizationOptions, setVisualizationOptions] = React.useState({
    circular: false,
    third_party: false,
    builtin: false,
  });

  React.useEffect(() => {
    const subscription = dataStore$.subscribe((data) => {
      const builtinRegistry = new Set<string>();
      const npmRegistry = new Set<string>();
      let numberOfTypeScriptFiles = 0;
      let numberOfJavaScriptFiles = 0;

      for (const file of data.files) {
        if (isTypeScriptModule(file)) {
          numberOfTypeScriptFiles++;
        }

        if (isJavaScriptModule(file)) {
          numberOfJavaScriptFiles++;
        }
      }

      for (const node of Object.values(data.graph)) {
        node.body.thirdPartyDependencies.forEach((dep) => {
          npmRegistry.add(dep);
        });
        node.body.builtinDependencies.forEach((dep) => {
          builtinRegistry.add(dep);
        });
      }

      setAnalysisData(
        Option.some({
          ...data,
          numberOfJavaScriptFiles,
          numberOfTypeScriptFiles,
          builtinRegistry,
          npmRegistry,
        })
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function toggleCircularDependencies() {
    const optionStatus = visualizationOptions.circular;

    uiEvents$.next({
      action: "toggle_circular",
      payload: { enabled: optionStatus },
    });

    setVisualizationOptions({
      ...visualizationOptions,
      circular: !optionStatus,
    });
  }

  function toggleBuiltinDependencies() {
    const optionStatus = visualizationOptions.builtin;

    uiEvents$.next({
      action: "toggle_builtin",
      payload: {
        enabled: !optionStatus,
      },
    });

    setVisualizationOptions({
      ...visualizationOptions,
      builtin: !optionStatus,
    });
  }

  function toggleThirdPartyDependencies() {
    const optionStatus = visualizationOptions.third_party;

    uiEvents$.next({
      action: "toggle_thirdparty",
      payload: {
        enabled: !optionStatus,
      },
    });

    setVisualizationOptions({
      ...visualizationOptions,
      third_party: !optionStatus,
    });
  }

  function openSearch() {
    uiEvents$.next({
      action: "open_search",
    });
  }

  if (Option.isNone(analysisData)) {
    return <label>loading</label>;
  }

  const {
    files,
    numberOfTypeScriptFiles,
    numberOfJavaScriptFiles,
    builtinRegistry,
    cycles,
    npmRegistry,
  } = analysisData.value;

  return (
    <div id="skott-sidebar">
      <div className="skott-logo">
        <img src="./skott.svg" id="skott-logo" alt="Skott Logo" />
      </div>

      <div className="options-container">
        <div>
          <div className="options-container-header">Skott explorer</div>

          <div className="explorer-options">
            <div className="explorer-option">
              <span> Search node </span>
              <div className="kbd-option" onClick={openSearch}>
                <kbd className="kbd-left"> CMD </kbd>
                <strong> + </strong>
                <kbd className="kbd-right"> K </kbd>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="options-container-header">Skott analysis</div>

        <div className="skott-stats">
          <section>
            <div className="skott-stats-container">
              <span className="skott-stats-label">Files</span>
              <span className="skott-stats-tooltip">
                Number of scanned files
              </span>
              <span className="skott-stats-value" id="stats-file">
                {files.length}
              </span>
            </div>

            <div className="skott-stats-container">
              <div>
                <img
                  src="./typescript.png"
                  alt="typescript"
                  className="tall-icons"
                />
              </div>
              <span className="skott-stats-tooltip"> TypeScript files </span>
              <span className="skott-stats-value" id="stats-ts">
                {numberOfTypeScriptFiles}
              </span>
            </div>

            <div className="skott-stats-container">
              <div>
                <img
                  src="./javascript.png"
                  alt="javascript"
                  className="tall-icons"
                />
              </div>
              <span className="skott-stats-tooltip"> JavaScript files </span>
              <span className="skott-stats-value" id="stats-js">
                {numberOfJavaScriptFiles}
              </span>
            </div>
          </section>

          <section>
            <div className="skott-stats-container">
              <div>
                <img src="./skott-raw.svg" alt="skott" className="tall-icons" />
              </div>
              <span className="skott-stats-tooltip">Circular dependencies</span>
              <span className="skott-stats-value" id="stats-circular">
                {cycles.length}
              </span>
            </div>
          </section>

          <section>
            <div className="skott-stats-container">
              <div>
                <img
                  src="./npm.svg"
                  alt="npm third-party dependencies"
                  className="wide-icons"
                />
              </div>
              <span className="skott-stats-tooltip">
                Third-party dependencies
              </span>
              <span className="skott-stats-value" id="stats-npm">
                {npmRegistry.size}
              </span>
            </div>

            <div className="skott-stats-container">
              <div>
                <img
                  src="./nodejs.svg"
                  alt="nodejs builtin dependencies"
                  className="wide-icons"
                />
              </div>
              <span className="skott-stats-tooltip">Builtin dependencies</span>
              <span className="skott-stats-value" id="stats-node">
                {builtinRegistry.size}
              </span>
            </div>
          </section>
        </div>

        <hr />

        <div className="skott-actions">
          <div className="options-container-header">
            Node visualization options
          </div>

          {cycles.length > 0 ? (
            <div className="option-selector" id="circular-container">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox check-circular"
                  id="opt-circular"
                  onChange={toggleCircularDependencies}
                />
                <label id="checkbox-label" htmlFor="opt-circular">
                  <div className="tick-mark"></div>
                </label>
              </div>
              <div className="option-label">Circular dependencies</div>
            </div>
          ) : null}

          {npmRegistry.size > 0 ? (
            <div className="option-selector" id="third-party-container">
              <div className="checkbox-container">
                <input
                  disabled={npmRegistry.size === 0}
                  type="checkbox"
                  className="checkbox check-third-party"
                  id="opt-thirdparty"
                  onChange={toggleThirdPartyDependencies}
                />
                <label id="checkbox-label" htmlFor="opt-thirdparty">
                  <div className="tick-mark"></div>
                </label>
              </div>
              <div className="option-label">Third-party dependencies</div>
            </div>
          ) : null}

          {builtinRegistry.size > 0 ? (
            <div className="option-selector" id="builtin-container">
              <div className="checkbox-container">
                <input
                  disabled={builtinRegistry.size === 0}
                  type="checkbox"
                  className="checkbox check-builtin"
                  id="opt-builtin"
                  onChange={toggleBuiltinDependencies}
                />
                <label id="checkbox-label" htmlFor="opt-builtin">
                  <div className="tick-mark"></div>
                </label>
              </div>
              <div className="option-label">Builtin dependencies</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
