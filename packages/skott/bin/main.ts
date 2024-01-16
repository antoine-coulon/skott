import EventEmitter from "node:events";
import { createRequire } from "node:module";
import path from "node:path";
import { performance } from "node:perf_hooks";

import kleur from "kleur";
import ora from "ora";

import type { SkottNode } from "../src/graph/node.js";
import type { SkottInstance } from "../src/skott.js";

import { ensureValidConfiguration, type CliOptions } from "./cli-config.js";
import { makeSkottRunner } from "./runner.js";
import {
  displayBuiltinDependencies,
  displayCircularDependenciesPaths,
  displayNoCircularDependenciesFound,
  displayThirdPartyDependencies,
  displayWarningOnHighCircularDepth
} from "./ui/console/dependencies.js";
import { displayAsFileTree } from "./ui/console/file-tree.js";
import { displayAsGraph } from "./ui/console/graph.js";
import { openWebApplication } from "./ui/webapp.js";
import { registerWatchMode } from "./watch-mode.js";

async function generateStaticFile(
  graph: Record<string, SkottNode>,
  staticFileType: string
): Promise<void> {
  console.log();

  try {
    const require = createRequire(import.meta.url);
    const pluginPath = require.resolve("@skottorg/static-file-plugin");
    const { generateStaticFile, supportedStaticFileTypes } = await import(
      pluginPath
    );

    if (!supportedStaticFileTypes.includes(staticFileType)) {
      console.error(
        kleur.red(
          ` Provided type: "${staticFileType}". Expected one of: ${supportedStaticFileTypes.join(
            ", "
          )}`
        )
      );

      return;
    }

    try {
      const spinner = ora("Generating static file").start();
      // @ts-ignore - dynamic import that might not be available
      generateStaticFile(graph, staticFileType);
      spinner.stop();

      console.log(kleur.green(` Static file generation successful.`));
    } catch (error) {
      console.error(
        kleur.red(` Static file generation failed. Reason: ${error}`)
      );
      process.exitCode = 1;
    }
  } catch {
    console.error(
      kleur.red(
        `Static file generation is not available. Please install the '@skottorg/static-file-plugin' package.`
      )
    );
    process.exitCode = 1;
  }
}

function makeCircularDependenciesUI(
  skottInstance: SkottInstance,
  options: CliOptions
): string[][] {
  const circularDependencies: string[][] = [];
  const { findCircularDependencies, hasCircularDependencies } =
    skottInstance.useGraph();

  // only find circular dependencies on-demand as it can be expensive
  if (options.showCircularDependencies) {
    displayWarningOnHighCircularDepth(options.circularMaxDepth);

    circularDependencies.push(...findCircularDependencies());
    if (circularDependencies.length > 0) {
      console.log(
        kleur
          .bold()
          .red(
            `\n ✖ (${circularDependencies.length}) circular dependencies found`
          )
      );
      displayCircularDependenciesPaths(circularDependencies);
      process.exitCode = options.exitCodeOnCircularDependencies;
    } else {
      displayNoCircularDependenciesFound(options.circularMaxDepth);
    }

    return circularDependencies;
  }

  // otherwise, just find if the graph has at least one cycle which is not expensive
  const hasCircularDeps = hasCircularDependencies();

  if (hasCircularDeps) {
    console.log(
      kleur
        .bold()
        .red(`\n ✖ Circular dependencies were found. Graph is not Acyclic.`)
    );
    process.exitCode = options.exitCodeOnCircularDependencies;
  } else {
    displayNoCircularDependenciesFound(options.circularMaxDepth);
  }

  return circularDependencies;
}

export async function main(
  entrypoint: string | undefined,
  options: CliOptions
): Promise<void> {
  const isValid = ensureValidConfiguration(entrypoint, options);
  if (isValid._tag === "Left") {
    console.log(`\n ${kleur.bold().red(isValid.left)}`);
    process.exitCode = 1;

    return;
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
  let mutableSkottInstance = await runSkott(start);

  const skottStructure = mutableSkottInstance!.getStructure();
  const { graph, files } = skottStructure;
  const filesWord = files.length > 1 ? "files" : "file";
  const timeTookStructure = `${(performance.now() - start).toFixed(3)}ms`;

  console.log(
    `\n Processed ${kleur.bold().green(files.length)} ${filesWord} (${kleur
      .magenta()
      .bold(timeTookStructure)})`
  );

  const circularDeps = makeCircularDependenciesUI(
    mutableSkottInstance!,
    options
  );
  const filesInvolvedInCircularDependencies = circularDeps.flat(1);

  let watcherEmitter: EventEmitter | undefined;

  if (options.watch) {
    watcherEmitter = new EventEmitter();
  }

  if (options.displayMode === "file-tree") {
    displayAsFileTree(graph, filesInvolvedInCircularDependencies);
  } else if (options.displayMode === "graph") {
    displayAsGraph(graph, filesInvolvedInCircularDependencies);
  } else if (options.displayMode === "webapp") {
    let baseEntrypointPath: string | undefined;
    const dependencyTracking = {
      thirdParty: options.trackThirdPartyDependencies,
      builtin: options.trackBuiltinDependencies,
      typeOnly: options.trackTypeOnlyDependencies
    };

    if (options.includeBaseDir && entrypoint) {
      baseEntrypointPath = path.join(path.dirname(entrypoint), entrypoint);
    } else if (entrypoint) {
      baseEntrypointPath = path.basename(entrypoint);
    }

    openWebApplication({
      skottInstance: mutableSkottInstance!,
      getSkottStructure: () => mutableSkottInstance!.getStructure(),
      entrypoint: baseEntrypointPath,
      dependencyTracking,
      watcherEmitter
    });
  } else if (options.displayMode !== "raw") {
    await generateStaticFile(graph, options.displayMode);
  }

  if (options.displayMode !== "webapp") {
    if (
      options.showUnusedDependencies &&
      !options.trackThirdPartyDependencies
    ) {
      console.log(
        `\n ${kleur
          .bold()
          .yellow(
            "Warning: `--trackThirdPartyDependencies` must be provided when searching for unused dependencies."
          )}`
      );

      console.log(
        `\n ${kleur
          .bold()
          .grey(
            "Example: `skott --displayMode=raw --showUnusedDependencies --trackThirdPartyDependencies`"
          )} \n`
      );
    }

    if (options.trackThirdPartyDependencies) {
      await displayThirdPartyDependencies(
        mutableSkottInstance,
        graph,
        options.showUnusedDependencies
      );
    }

    if (options.trackBuiltinDependencies) {
      displayBuiltinDependencies(graph);
    }
  }

  if (options.watch) {
    registerWatchMode({
      cwd: options.cwd,
      ignorePattern: options.ignorePattern,
      fileExtensions: options.fileExtensions.split(","),
      onChangesDetected: () => {
        const now = performance.now();

        runSkott(now).then((newSkottInstance) => {
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
