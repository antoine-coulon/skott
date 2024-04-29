import EventEmitter from "node:events";
import path from "node:path";
import { performance } from "node:perf_hooks";

import kleur from "kleur";

import type { SkottStructure } from "../index.js";

import {
  ensureValidConfiguration,
  type CliParameterOptions
} from "./cli-config.js";
import { makeSkottRunner } from "./runner.js";
import { renderStaticFile } from "./static-file.js";
import {
  displayCircularDependencies,
  displayDependenciesReport
} from "./ui/console/dependencies.js";
import { renderFileTree } from "./ui/renderers/file-tree.js";
import { renderGraph } from "./ui/renderers/graph.js";
import { RenderManager, CliComponent } from "./ui/renderers/render-manager.js";
import { renderWebApplication } from "./ui/renderers/webapp.js";
import { registerWatchMode } from "./watch-mode.js";

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

export async function main(
  entrypoint: string | undefined,
  options: CliParameterOptions
): Promise<void> {
  const isValid = ensureValidConfiguration(entrypoint, options);

  if (isValid._tag === "Left") {
    console.log(`\n ${kleur.bold().red(isValid.left)}`);
    process.exit(1);
  }

  const runSkott = makeSkottRunner(entrypoint, options);

  if (entrypoint) {
    console.log(
      `\n Running ${kleur.blue().bold("skott")} from entrypoint: ${kleur
        .yellow()
        .underline()
        .bold(`${entrypoint}`)}`
    );
  } else {
    console.log(
      `\n Running ${kleur.blue().bold("skott")} from current directory: ${kleur
        .yellow()
        .underline()
        .bold(`${path.basename(options.cwd)}`)}`
    );
  }

  if (options.incremental) {
    console.log(
      `\n ${kleur
        .bold()
        .yellow(
          "`incremental` mode is experimental. Please report any issues you encounter."
        )}`
    );
  }

  const start = performance.now();
  let skottInstance = await runSkott();
  const { graph, files } = skottInstance.getStructure();
  displayInitialGetStructureTime(files, start);

  let watcherEmitter: EventEmitter | undefined;
  let renderManager: RenderManager | undefined;

  if (options.watch) {
    watcherEmitter = new EventEmitter();
    renderManager = new RenderManager(watcherEmitter);
  }

  if (options.displayMode === "file-tree") {
    const fileTreeComponent = new CliComponent(() =>
      renderFileTree(skottInstance, options)
    );

    renderManager?.renderOnChanges(fileTreeComponent);
  } else if (options.displayMode === "graph") {
    const graphComponent = new CliComponent(() =>
      renderGraph(skottInstance, options)
    );

    renderManager?.renderOnChanges(graphComponent);
  } else if (options.displayMode === "webapp") {
    const circularDepsComponent = new CliComponent(() =>
      displayCircularDependencies(skottInstance, {
        ...options,
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
      options: { entrypoint, ...options },
      watcherEmitter
    });
  } else if (options.displayMode === "raw") {
    const circularDepsComponent = new CliComponent(() =>
      displayCircularDependencies(skottInstance, options)
    );

    renderManager?.renderOnChanges(circularDepsComponent);
  } else {
    // @TODO: check if this is a valid display mode if the registered plugin
    // is registered.
    await renderStaticFile(graph, options.displayMode);
  }

  // Additional information we want to display when using the console UI
  // To avoid redondant information, we don't display it when using the webapp
  if (options.displayMode !== "webapp") {
    await new Promise((resolve) => {
      const depsReportComponent = new CliComponent(() =>
        displayDependenciesReport(skottInstance, options).then(resolve)
      );

      renderManager?.renderOnChanges(depsReportComponent);
    });
  }

  if (options.watch) {
    registerWatchMode({
      cwd: options.cwd,
      ignorePattern: options.ignorePattern,
      fileExtensions: options.fileExtensions.split(","),
      onChangesDetected: (done) => {
        runSkott().then((newSkottInstance) => {
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
