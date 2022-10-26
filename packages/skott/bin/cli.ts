#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sade from "sade";

import { kExpectedModuleExtensions } from "../src/modules/walkers/ecmascript/module-resolver.js";

import { displaySkott } from "./main.js";

function readManifestVersion(): string {
  try {
    const pathToManifest = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "..",
      "package.json"
    );
    // eslint-disable-next-line no-sync
    const manifestContent = fs.readFileSync(path.join(pathToManifest), "utf-8");
    const { version } = JSON.parse(manifestContent);

    return version;
  } catch {
    return "0.0.0";
  }
}

const cli = sade("skott [entrypoint]", true)
  .version(readManifestVersion())
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
    "ext, fileExtensions",
    "File extensions to consider when building the graph",
    [...kExpectedModuleExtensions].join(",")
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
    "ts, --tsconfig",
    "Provide a path to a tsconfig.json file to use for path aliases resolution",
    "tsconfig.json"
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
