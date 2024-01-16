import EventEmitter from "node:events";
import { createRequire } from "node:module";
import path from "node:path";
import { performance } from "node:perf_hooks";

import { makeTreeStructure } from "fs-tree-structure";
import kleur from "kleur";
import ora, { type Ora } from "ora";

import skott from "../index.js";
import type { SkottNode, SkottNodeBody } from "../src/graph/node.js";
import { kExpectedModuleExtensions } from "../src/modules/resolvers/base-resolver.js";
import { EcmaScriptDependencyResolver } from "../src/modules/resolvers/ecmascript/resolver.js";
import type { SkottInstance } from "../src/skott.js";

import {
  displayAsFileTree,
  displayAsGraph,
  displayBuiltinDependencies,
  displayCircularDependenciesPaths,
  displayNoCircularDependenciesFound,
  displayThirdPartyDependencies,
  displayWarningOnHighCircularDepth
} from "./ui/console.js";
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

type CliOptions = {
  circularMaxDepth: number;
  cwd: string;
  displayMode: string;
  exitCodeOnCircularDependencies: number;
  fileExtensions: string;
  ignorePattern: string;
  includeBaseDir: boolean;
  incremental: boolean;
  manifest: string;
  showCircularDependencies: boolean;
  showUnusedDependencies: boolean;
  trackBuiltinDependencies: boolean;
  trackThirdPartyDependencies: boolean;
  trackTypeOnlyDependencies: boolean;
  tsconfig: string;
  verbose: true;
  watch: true;
};

export async function displaySkott(
  entrypoint: string | undefined,
  options: CliOptions
): Promise<void> {
  if (entrypoint) {
    console.log(
      `\n Running ${kleur.blue().bold("skott")} from entrypoint: ${kleur
        .yellow()
        .underline()
        .bold(`${entrypoint}`)}`
    );

    if (options.cwd !== process.cwd()) {
      console.log(
        `\n ${kleur
          .red()
          .bold("`--cwd` can't be customized when providing an entrypoint")} `
      );

      process.exitCode = 1;

      return;
    }
  } else {
    if (options.includeBaseDir) {
      console.log(
        `\n ${kleur
          .red()
          .bold(
            "`--includeBaseDir` can only be used when providing an entrypoint"
          )} `
      );

      process.exitCode = 1;

      return;
    }

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

  let spinner: Ora | undefined;
  let skottInstance: SkottInstance;

  const dependencyTracking = {
    thirdParty: options.trackThirdPartyDependencies,
    builtin: options.trackBuiltinDependencies,
    typeOnly: options.trackTypeOnlyDependencies
  };
  const start = performance.now();

  async function runSkott() {
    try {
      if (!options.verbose) {
        spinner = ora(`Initializing ${kleur.blue().bold("skott")}`).start();
      }

      skottInstance = await skott({
        entrypoint: entrypoint ? entrypoint : undefined,
        ignorePattern: options.ignorePattern,
        incremental: options.incremental,
        circularMaxDepth: options.circularMaxDepth ?? Number.POSITIVE_INFINITY,
        includeBaseDir: options.includeBaseDir,
        dependencyTracking,
        fileExtensions: options.fileExtensions
          .split(",")
          .filter((ext) => kExpectedModuleExtensions.has(ext)),
        tsConfigPath: options.tsconfig,
        manifestPath: options.manifest,
        dependencyResolvers: [new EcmaScriptDependencyResolver()],
        cwd: options.cwd,
        verbose: options.verbose
      });
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

      return;
    }

    const timeTook = `${(performance.now() - start).toFixed(3)}ms`;

    if (spinner) {
      spinner.text = `Finished Skott initialization (${kleur
        .magenta()
        .bold(timeTook)})`;
      spinner.color = "green";
    }

    spinner?.stop();
  }

  await runSkott();

  const skottStructure = skottInstance!.getStructure();
  const { graph, files } = skottStructure;
  const filesWord = files.length > 1 ? "files" : "file";
  const timeTookStructure = `${(performance.now() - start).toFixed(3)}ms`;

  console.log(
    `\n Processed ${kleur.bold().green(files.length)} ${filesWord} (${kleur
      .magenta()
      .bold(timeTookStructure)})`
  );

  const circularDeps = makeCircularDependenciesUI(skottInstance!, options);
  const filesInvolvedInCircularDependencies = circularDeps.flat(1);

  let watcherEmitter: EventEmitter | undefined;

  if (options.watch) {
    watcherEmitter = new EventEmitter();
  }

  if (options.displayMode === "file-tree") {
    const flattenedFilesPaths = Object.values(graph).flatMap((rootValue) => [
      rootValue.id,
      ...rootValue.adjacentTo
    ]);
    const treeStructure = makeTreeStructure(flattenedFilesPaths);
    console.log();
    displayAsFileTree(treeStructure, filesInvolvedInCircularDependencies, 0);
  } else if (options.displayMode === "graph") {
    const nodesWithBodyBindings = new Map<string, SkottNodeBody>();

    for (const [nodeId, nodeValue] of Object.entries(graph)) {
      nodesWithBodyBindings.set(nodeId, nodeValue.body);
    }

    displayAsGraph(
      graph,
      filesInvolvedInCircularDependencies,
      nodesWithBodyBindings
    );
  } else if (options.displayMode === "webapp") {
    let baseEntrypointPath: string | undefined;

    if (options.includeBaseDir && entrypoint) {
      baseEntrypointPath = path.join(path.dirname(entrypoint), entrypoint);
    } else if (entrypoint) {
      baseEntrypointPath = path.basename(entrypoint);
    }

    openWebApplication({
      skottInstance: skottInstance!,
      getSkottStructure: () => skottInstance!.getStructure(),
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
        // @ts-ignore
        skottInstance,
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
        runSkott().then(() => {
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
