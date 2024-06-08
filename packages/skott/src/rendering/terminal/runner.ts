import EventEmitter from "node:events";
import path from "node:path";
import { performance } from "node:perf_hooks";

import kleur from "kleur";
import type { Ora } from "ora";
import ora from "ora";

import type { SkottInstance, SkottStructure } from "../../../index.js";
import type { RuntimeConfig } from "../../config.js";
import { runFromRuntimeConfig } from "../../instance.js";
import { registerWatchMode } from "../watch-mode.js";

import { renderStaticFile } from "./static-file.js";
import type { TerminalConfig } from "./terminal-config.js";
import {
  displayCircularDependencies,
  displayDependenciesReport
} from "./ui/console/dependencies.js";
import { renderFileTree } from "./ui/renderers/file-tree.js";
import { renderGraph } from "./ui/renderers/graph.js";
import { RenderManager, CliComponent } from "./ui/renderers/render-manager.js";
import { renderWebApplication } from "./ui/renderers/webapp.js";

export function makeSkottRunner<T>(
  config: RuntimeConfig
): () => Promise<SkottInstance<T>> {
  let isFirstRun = true;

  if (config.entrypoint) {
    console.log(
      `\n Running ${kleur.blue().bold("skott")} from entrypoint: ${kleur
        .yellow()
        .underline()
        .bold(`${config.entrypoint}`)}`
    );
  } else {
    console.log(
      `\n Running ${kleur.blue().bold("skott")} from current directory: ${kleur
        .yellow()
        .underline()
        .bold(`${path.basename(config.cwd)}`)}`
    );
  }

  if (config.incremental) {
    console.log(
      `\n ${kleur
        .bold()
        .yellow(
          "`incremental` mode is experimental. Please report any issues you encounter."
        )}`
    );
  }

  return async () => {
    const startTime = performance.now();
    let spinner: Ora | undefined;

    try {
      if (!config.verbose && isFirstRun) {
        spinner = ora(`Initializing ${kleur.blue().bold("skott")}`).start();
      }

      isFirstRun = false;

      const skottResult = await runFromRuntimeConfig<T>(config);

      const timeTook = `${(performance.now() - startTime).toFixed(3)}ms`;

      if (spinner && isFirstRun) {
        spinner.text = `Finished Skott initialization (${kleur
          .magenta()
          .bold(timeTook)})`;
        spinner.color = "green";
      }

      spinner?.stop();

      return skottResult;
    } catch (error: any) {
      if (spinner) {
        spinner.stop();
      }

      if (error.message) {
        console.log(`\n ${kleur.bold().red("Error: ".concat(error.message))}`);
      } else {
        console.log(
          `\n ${kleur
            .bold()
            .red(
              "Unexpected error. Please use `--verbose` flag and report" +
                " an issue at https://github.com/antoine-coulon/skott/issues"
            )}`
        );
      }

      process.exitCode = 1;

      return undefined as never;
    }
  };
}

function displayInitialGetStructureTime(
  files: SkottStructure["files"],
  startTime: number
) {
  const filesWord = files.length > 1 ? "files" : "file";
  const timeTookStructure = `${(performance.now() - startTime).toFixed(3)}ms`;

  console.log(
    `\n Processed ${kleur.bold().green(files.length)} ${filesWord} (${kleur
      .magenta()
      .bold(timeTookStructure)})`
  );
}

export async function runTerminal<T>(
  run: () => Promise<SkottInstance<T>>,
  runtimeConfig: RuntimeConfig,
  terminalOptions: TerminalConfig
): Promise<void> {
  let skottInstance = await run();

  const start = performance.now();
  const { graph, files } = skottInstance.getStructure();
  displayInitialGetStructureTime(files, start);

  let watcherEmitter: EventEmitter | undefined;
  let renderManager: RenderManager | undefined;

  if (terminalOptions.watch) {
    watcherEmitter = new EventEmitter();
    renderManager = new RenderManager(watcherEmitter);
  }

  if (terminalOptions.displayMode === "file-tree") {
    const fileTreeComponent = new CliComponent(() =>
      renderFileTree(skottInstance, {
        circularMaxDepth: runtimeConfig.circularMaxDepth,
        exitCodeOnCircularDependencies:
          terminalOptions.exitCodeOnCircularDependencies,
        showCircularDependencies: terminalOptions.showCircularDependencies
      })
    );

    renderManager?.renderOnChanges(fileTreeComponent);
  } else if (terminalOptions.displayMode === "graph") {
    const graphComponent = new CliComponent(() =>
      renderGraph(skottInstance, {
        circularMaxDepth: runtimeConfig.circularMaxDepth,
        exitCodeOnCircularDependencies:
          terminalOptions.exitCodeOnCircularDependencies,
        showCircularDependencies: terminalOptions.showCircularDependencies
      })
    );

    renderManager?.renderOnChanges(graphComponent);
  } else if (terminalOptions.displayMode === "webapp") {
    const circularDepsComponent = new CliComponent(() =>
      displayCircularDependencies(skottInstance, {
        circularMaxDepth: runtimeConfig.circularMaxDepth,
        exitCodeOnCircularDependencies:
          terminalOptions.exitCodeOnCircularDependencies,
        /**
         * We only want to display the overview that is whether the graph is
         * acyclic or not. Circular dependencies will be displayed within the webapp
         * itself.
         */
        showCircularDependencies: false
      })
    );

    renderManager?.renderOnChanges(circularDepsComponent);

    renderWebApplication({
      getSkottInstance: () => skottInstance,
      options: {
        entrypoint: runtimeConfig.entrypoint,
        includeBaseDir: runtimeConfig.includeBaseDir,
        tracking: runtimeConfig.dependencyTracking
      },
      watcherEmitter
    });
  } else if (terminalOptions.displayMode === "raw") {
    const circularDepsComponent = new CliComponent(() =>
      displayCircularDependencies(skottInstance, {
        circularMaxDepth: runtimeConfig.circularMaxDepth,
        exitCodeOnCircularDependencies:
          terminalOptions.exitCodeOnCircularDependencies,
        showCircularDependencies: terminalOptions.showCircularDependencies
      })
    );

    renderManager?.renderOnChanges(circularDepsComponent);
  } else {
    // @TODO: check if this is a valid display mode if the registered plugin
    // is registered.
    await renderStaticFile(graph, terminalOptions.displayMode);
  }

  // Additional information we want to display when using the console UI
  // To avoid redondant information, we don't display it when using the webapp
  if (terminalOptions.displayMode !== "webapp") {
    await new Promise((resolve) => {
      const depsReportComponent = new CliComponent(() =>
        displayDependenciesReport(skottInstance, {
          showUnusedDependencies: terminalOptions.showUnusedDependencies,
          trackBuiltinDependencies: runtimeConfig.dependencyTracking.builtin,
          trackThirdPartyDependencies:
            runtimeConfig.dependencyTracking.thirdParty
        }).then(resolve)
      );

      renderManager?.renderOnChanges(depsReportComponent);
    });
  }

  if (terminalOptions.watch) {
    registerWatchMode({
      cwd: runtimeConfig.cwd,
      ignorePattern: runtimeConfig.ignorePattern,
      fileExtensions: runtimeConfig.fileExtensions,
      verbose: true,
      onChangesDetected: (done) => {
        run().then((newSkottInstance) => {
          skottInstance = newSkottInstance;
          watcherEmitter!.emit("change");
          renderManager!.afterRenderingPhase(done);
        });
      }
    });
  }
}

process.on("exit", (code) => {
  console.log(
    `\n ${kleur.bold().blue("skott")} exited with code ${kleur
      .bold()
      .yellow(code)}`
  );
});
