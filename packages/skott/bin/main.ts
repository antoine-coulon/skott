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
import { renderFileTree } from "./ui/display-modes/file-tree.js";
import { renderGraph } from "./ui/display-modes/graph.js";
import { renderWebApplication } from "./ui/display-modes/webapp.js";
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

  let mutableSkottInstance = await runSkott();

  const start = performance.now();
  const { graph, files } = mutableSkottInstance.getStructure();
  displayInitialGetStructureTime(files, start);

  const circularDeps = displayCircularDependencies(
    mutableSkottInstance!,
    options
  );
  const filesInvolvedInCircularDependencies = circularDeps.flat(1);

  let watcherEmitter: EventEmitter | undefined;

  if (options.watch) {
    watcherEmitter = new EventEmitter();
  }

  if (options.displayMode === "file-tree") {
    renderFileTree(graph, filesInvolvedInCircularDependencies);
  } else if (options.displayMode === "graph") {
    renderGraph(graph, filesInvolvedInCircularDependencies);
  } else if (options.displayMode === "webapp") {
    renderWebApplication({
      skottInstance: mutableSkottInstance!,
      watcherEmitter,
      options: { entrypoint, ...options }
    });
  } else if (options.displayMode !== "raw") {
    // @TODO: check if this is a valid display mode if the registered plugin
    // is registered.
    await renderStaticFile(graph, options.displayMode);
  }

  // Additional information we want to display when using the console UI
  // To avoid redondant information, we don't display it when using the webapp
  if (options.displayMode !== "webapp") {
    displayDependenciesReport(mutableSkottInstance, options);
  }

  if (options.watch) {
    registerWatchMode({
      cwd: options.cwd,
      ignorePattern: options.ignorePattern,
      fileExtensions: options.fileExtensions.split(","),
      onChangesDetected: () => {
        runSkott().then((newSkottInstance) => {
          mutableSkottInstance = newSkottInstance;
          watcherEmitter?.emit("change");
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
