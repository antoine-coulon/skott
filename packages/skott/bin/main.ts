import { writeFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";

import { makeTreeStructure } from "fs-tree-structure";
import kleur from "kleur";
import { generateMermaid } from "ligie";
import ora from "ora";

import skott from "../index.js";
import { kExpectedModuleExtensions } from "../src/modules/walkers/ecmascript/module-resolver.js";
import { SkottInstance, SkottNode, SkottNodeBody } from "../src/skott.js";

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

async function generateStaticFile(
  graph: Record<string, SkottNode>,
  staticFile: string
): Promise<void> {
  console.log();
  const rawGraph = Object.entries(graph).reduce((acc, [key, val]) => {
    return {
      ...acc,
      [key]: val.adjacentTo
    };
  }, {});
  const spinner = ora("Generating static file").start();

  if (staticFile === "json") {
    await writeFile(
      path.join(process.cwd(), "skott.json"),
      JSON.stringify(graph, null, 2),
      "utf-8"
    );
  }

  const mermaid = generateMermaid(rawGraph, process.cwd(), {
    orientation: "TB"
  });

  spinner.color = "magenta";

  if (staticFile === "svg") {
    await mermaid.toSvg();
  }
  if (staticFile === "png") {
    await mermaid.toPng();
  }
  if (staticFile === "md") {
    await mermaid.toMarkdown();
  }

  spinner.stop();
}

function makeCircularDependenciesUI(
  skottInstance: SkottInstance,
  options: CliOptions
): string[][] {
  const circularDependencies: string[][] = [];
  const { findCircularDependencies, hasCircularDependencies } = skottInstance;

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
  includeBaseDir: boolean;
  incremental: boolean;
  displayMode: string;
  staticFile: string;
  exitCodeOnCircularDependencies: number;
  showCircularDependencies: boolean;
  showUnusedDependencies: boolean;
  trackThirdPartyDependencies: boolean;
  trackBuiltinDependencies: boolean;
  trackTypeOnlyDependencies: boolean;
  fileExtensions: string;
  tsconfig: string;
  manifest: string;
};

export async function displaySkott(
  entrypoint: string | undefined,
  options: CliOptions
): Promise<void> {
  if (entrypoint) {
    console.log(
      `\n Running ${kleur.blue().bold("Skott")} from entrypoint: ${kleur
        .yellow()
        .underline()
        .bold(`${entrypoint}`)}`
    );
  } else {
    console.log(
      `\n Running ${kleur.blue().bold("Skott")} from current directory: ${kleur
        .yellow()
        .underline()
        .bold(`${path.basename(process.cwd())}`)}`
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

  const spinner = ora(`Initializing ${kleur.blue().bold("Skott")}`).start();
  const start = performance.now();

  const dependencyTracking = {
    thirdParty: options.trackThirdPartyDependencies,
    builtin: options.trackBuiltinDependencies,
    typeOnly: options.trackTypeOnlyDependencies
  };

  const skottInstance = await skott({
    entrypoint: entrypoint ? entrypoint : undefined,
    incremental: options.incremental,
    circularMaxDepth: options.circularMaxDepth ?? Number.POSITIVE_INFINITY,
    includeBaseDir: options.includeBaseDir,
    dependencyTracking,
    fileExtensions: options.fileExtensions
      .split(",")
      .filter((ext) => kExpectedModuleExtensions.has(ext)),
    tsConfigPath: options.tsconfig,
    manifestPath: options.manifest
  });

  const timeTook = `${(performance.now() - start).toFixed(3)}ms`;
  spinner.text = `Finished Skott initialization (${kleur
    .magenta()
    .bold(timeTook)})`;
  spinner.color = "green";

  const skottStructure = skottInstance.getStructure();
  const { graph, files } = skottStructure;
  const filesWord = files.length > 1 ? "files" : "file";
  const timeTookStructure = `${(performance.now() - start).toFixed(3)}ms`;

  spinner.stop();
  console.log(
    `\n Processed ${kleur.bold().green(files.length)} ${filesWord} (${kleur
      .magenta()
      .bold(timeTookStructure)})`
  );

  const circularDeps = makeCircularDependenciesUI(skottInstance, options);

  const filesInvolvedInCircularDependencies = circularDeps.flat(1);

  if (options.displayMode === "file-tree") {
    const flattenedFilesPaths = Object.values(graph).flatMap((rootValue) => [
      rootValue.id,
      ...rootValue.adjacentTo
    ]);
    const treeStructure = makeTreeStructure(flattenedFilesPaths);
    console.log();
    displayAsFileTree(treeStructure, filesInvolvedInCircularDependencies, 0);
  }

  if (options.displayMode === "graph") {
    const nodesWithBodyBindings = new Map<string, SkottNodeBody>();

    for (const [nodeId, nodeValue] of Object.entries(graph)) {
      nodesWithBodyBindings.set(nodeId, nodeValue.body);
    }

    displayAsGraph(
      graph,
      filesInvolvedInCircularDependencies,
      nodesWithBodyBindings
    );
  }

  if (options.displayMode === "webapp") {
    openWebApplication(
      skottInstance,
      skottStructure,
      entrypoint,
      dependencyTracking
    );

    return;
  }

  if (options.showUnusedDependencies && !options.trackThirdPartyDependencies) {
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
      skottInstance,
      graph,
      options.showUnusedDependencies
    );
  }

  if (options.trackBuiltinDependencies) {
    displayBuiltinDependencies(graph);
  }

  if (options.staticFile !== "none") {
    await generateStaticFile(graph, options.staticFile);
  }
}

process.on("exit", (code) => {
  console.log(
    `\n ${kleur.bold().blue("Skott")} exited with code ${kleur
      .bold()
      .yellow(code)}`
  );
});
