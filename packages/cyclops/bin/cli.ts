#!/usr/bin/env node

import path from "node:path";
import { performance } from "node:perf_hooks";

import { makeTreeStructure, TreeStructure } from "fs-tree-structure";
import kleur from "kleur";
import sade from "sade";

import cyclops from "../index.js";
import { CyclopsNode } from "../src/cyclops.js";
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
  graph: Record<string, CyclopsNode>,
  filesInvolvedInCycles: string[]
): void {
  const leftArrow = `${kLeftSeparator}>`;
  for (const [nodeId, nodeValue] of Object.entries(graph)) {
    console.log();

    if (filesInvolvedInCycles.includes(nodeId)) {
      console.log(
        `${makeIndents(1)} ${kleur.red().underline().bold(nodeId)} 🔄`
      );
    } else {
      console.log(`${makeIndents(1)} ${kleur.blue().underline().bold(nodeId)}`);
    }

    for (const subNode of nodeValue.adjacentTo) {
      console.log(kleur.bold().yellow(`${makeIndents(3)} │`));
      if (filesInvolvedInCycles.includes(subNode)) {
        const subNodeWithWarning = `${subNode} 🔄`;
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

type CliOptions = {
  circularMaxDepth: number;
  includeBaseDir: boolean;
  displayMode: string;
  exitCodeOnCircularDependencies: number;
};

async function displayCyclops(
  entrypoint: string,
  options: CliOptions
): Promise<void> {
  const entrypointModule =
    entrypoint ?? (await findWorkspaceEntrypointModule());
  console.log(
    `\n👁 ${kleur.blue().bold(" Cyclops")} entrypoint: ${kleur
      .yellow()
      .underline()
      .bold(`${entrypointModule}`)}`
  );

  const start = performance.now();
  const instance = await cyclops({
    entrypoint: entrypointModule,
    circularMaxDepth: options.circularMaxDepth ?? Number.POSITIVE_INFINITY,
    includeBaseDir: options.includeBaseDir
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
}

process.on("exit", (code) => {
  console.log(
    `\n ${kleur.bold().blue("Cyclops")} exited with code ${kleur
      .bold()
      .yellow(code)}`
  );
});

const cli = sade("cyclops <entrypoint>", true)
  .describe("Start the cyclops analysis to fully build the graph")

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
  .example(
    "./node_modules/.bin/cyclops src/index.js --circular --displayMode=file-tree"
  )
  .action(displayCyclops);

cli.parse(process.argv);
