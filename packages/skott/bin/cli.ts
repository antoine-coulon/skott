#!/usr/bin/env node

import sade from "sade";

import { displaySkott } from "./main.js";

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
    "-f, --staticFile",
    "Generate a static file from the graph. Can be 'none', 'svg', 'png', 'md'.",
    "none"
  )
  .option(
    "s, --showCircularDependencies",
    "Show all circular dependencies in the graph",
    false
  )
  .option(
    "ttp, --trackThirdPartyDependencies",
    "Enable npm third-party dependency tracking",
    false
  )
  .option(
    "tb, --trackBuiltinDependencies",
    "Enable Node.js builtin dependency tracking",
    false
  )

  .example("./node_modules/.bin/skott src/index.js --displayMode=file-tree")
  .action(displaySkott);

cli.parse(process.argv);
