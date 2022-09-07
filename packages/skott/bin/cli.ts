#!/usr/bin/env node

import path from "node:path";
import { performance } from "node:perf_hooks";

import { makeTreeStructure, TreeStructure } from "fs-tree-structure";
import kleur from "kleur";
import sade from "sade";

import skott from "../index.js";
import { SkottNode } from "../src/skott.js";
import { findWorkspaceEntrypointModule } from "../src/workspace/index.js";

const kLeftSeparator = "└──";

function isDirectory(nodePath: string): boolean {
  return path.extname(nodePath) === "";
}

function makeIndents(numberOfIndents: number): string {
  return Array.from({ length: numberOfIndents }, () => " ").join("");
}

function displayAsFileTree(
  treeStructure: TreeStructure,
  filesInvolvedInCycles: string[],
  whitespaces = 0
): void {
  const leftLevelSeparator = whitespaces === 0 ? "" : kLeftSeparator;
  const indents = makeIndents(whitespaces);
  for (const [node, subNodes] of Object.entries(treeStructure)) {
    if (isDirectory(node)) {
      console.log(
        `${indents} ${leftLevelSeparator} ${kleur.bold().yellow(node)}/`
      );
    } else {
      console.log(
        `${indents} ${leftLevelSeparator} ${kleur.bold().blue(node)}`
      );
    }
    displayAsFileTree(subNodes, filesInvolvedInCycles, whitespaces + 2);
  }
}

function displayAsGraph(
  graph: Record<string, SkottNode>,
  filesInvolvedInCycles: string[]
): void {
  const leftArrow = `${kLeftSeparator}>`;
  for (const [nodeId, nodeValue] of Object.entries(graph)) {
    console.log();

    if (filesInvolvedInCycles.includes(nodeId)) {
      console.log(
        `${makeIndents(1)} ${kleur.red().underline().bold(nodeId)} ${kleur
          .bold()
          .yellow("♻️")}`
      );
    } else {
      console.log(`${makeIndents(1)} ${kleur.blue().underline().bold(nodeId)}`);
    }

    for (const subNode of nodeValue.adjacentTo) {
      console.log(kleur.bold().yellow(`${makeIndents(3)} │`));
      if (filesInvolvedInCycles.includes(subNode)) {
        const subNodeWithWarning = `${subNode} ${kleur.bold().yellow("♻️")}`;
        console.log(
          `${makeIndents(3)} ${kleur.bold().yellow(leftArrow)} ${kleur
            .bold()
            .red(subNodeWithWarning)} `
        );
      } else {
        console.log(
          `${makeIndents(3)} ${kleur.bold().yellow(leftArrow)} ${kleur
            .bold()
            .white(subNode)}`
        );
      }
    }
  }
}

function displayThirdPartyDependencies(graph: Record<string, SkottNode>): void {
  console.log(`\n Third-party dependencies: \n`);
  const thirdPartyRegistry = new Map<string, number>();
  for (const node of Object.values(graph)) {
    node.body.thirdPartyDependencies.forEach((dep) => {
      const occurrencesOfDep = thirdPartyRegistry.get(dep);
      if (occurrencesOfDep) {
        thirdPartyRegistry.set(dep, occurrencesOfDep + 1);
      } else {
        thirdPartyRegistry.set(dep, 1);
      }
    });
  }

  const sortedDependencies = [...thirdPartyRegistry.entries()].sort(
    ([a], [b]) => {
      if (a > b) return 1;
      if (a < b) return -1;

      return 0;
    }
  );

  for (const [depName, depOccurrence] of sortedDependencies) {
    console.log(
      `${makeIndents(1)} ${kleur.magenta().bold(depName)} (imports=${kleur
        .bold()
        .yellow(depOccurrence)})`
    );
  }
}

type CliOptions = {
  circularMaxDepth: number;
  includeBaseDir: boolean;
  displayMode: string;
  exitCodeOnCircularDependencies: number;
  trackThirdPartyDependencies: boolean;
};

async function displaySkott(
  entrypoint: string,
  options: CliOptions
): Promise<void> {
  const entrypointModule =
    entrypoint ?? (await findWorkspaceEntrypointModule());
  console.log(
    `\n👁 ${kleur.blue().bold(" Skott")} entrypoint: ${kleur
      .yellow()
      .underline()
      .bold(`${entrypointModule}`)}`
  );

  const start = performance.now();
  const instance = await skott({
    entrypoint: entrypointModule,
    circularMaxDepth: options.circularMaxDepth ?? Number.POSITIVE_INFINITY,
    includeBaseDir: options.includeBaseDir,
    dependencyTracking: {
      thirdParty: options.trackThirdPartyDependencies
    }
  });
  const timeTook = `${(performance.now() - start).toFixed(3)}ms`;
  const { files, graph, circularDependencies } = instance.getStructure();
  const filesWord = files.length > 1 ? "files" : "file";
  console.log(
    `\nProcessed ${kleur.bold().green(files.length)} ${filesWord} (${kleur
      .magenta()
      .bold(timeTook)})`
  );

  if (circularDependencies.length > 0) {
    console.log(kleur.bold().red(`\n ✖ circular dependencies found:`));

    circularDependencies.forEach((circularDependency) => {
      const cyclicIndex = kleur.bold().yellow(`•`);
      console.log(
        `\n ${cyclicIndex} ${kleur.bold().red(circularDependency.join(" -> "))}`
      );
    });
    process.exitCode = options.exitCodeOnCircularDependencies;
  } else {
    console.log(
      `${kleur
        .bold()
        .green("\n ✓ no circular dependencies found")} (depth=${kleur
        .bold()
        .yellow(options.circularMaxDepth)})`
    );
  }

  if (options.displayMode === "raw") {
    return;
  }

  const filesInvolvedInCircularDependencies = circularDependencies.flat(1);

  if (options.displayMode === "file-tree") {
    const flattenedFilesPaths = Object.values(graph).flatMap((rootValue) => [
      rootValue.id,
      ...rootValue.adjacentTo
    ]);
    const treeStructure = makeTreeStructure(flattenedFilesPaths);
    console.log();
    displayAsFileTree(treeStructure, filesInvolvedInCircularDependencies);
  } else {
    displayAsGraph(graph, filesInvolvedInCircularDependencies);
  }

  if (options.trackThirdPartyDependencies) {
    displayThirdPartyDependencies(graph);
  }
}

process.on("exit", (code) => {
  console.log(
    `\n ${kleur.bold().blue("Skott")} exited with code ${kleur
      .bold()
      .yellow(code)}`
  );
});

const cli = sade("skott <entrypoint>", true)
  .describe("Start the Skott analysis to fully build the graph")

  .option(
    "-b, --includeBaseDir",
    "Include the base directory name for each graph node",
    false
  )
  .option(
    "-c, --circularMaxDepth",
    "Define the max depth of the nested circular dependencies search",
    Number.POSITIVE_INFINITY
  )
  .option(
    "d, --displayMode",
    "Either display the result of the analysis as a graph, as a file-tree or raw",
    "graph"
  )
  .option(
    "e, --exitCodeOnCircularDependencies",
    "Either display the result of the analysis as a graph or as a file-tree",
    1
  )
  .option(
    "t, --trackThirdPartyDependencies",
    "Enable third party dependency tracking",
    false
  )
  .example(
    "./node_modules/.bin/skott src/index.js --circular --displayMode=file-tree"
  )
  .action(displaySkott);

cli.parse(process.argv);
