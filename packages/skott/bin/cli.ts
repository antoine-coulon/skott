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
    "-b, --baseDir",
    "Include the base directory name for each graph node. Relative to the entrypoint base directory or the current working directory.",
    false
  )

  .option(
    "-c, --exitCodeOnCircularDependencies",
    "Specify the exit code to use when circular dependencies are found",
    1
  )

  .option(
    "-d, --circularMaxDepth",
    "Define the max depth of the nested circular dependencies search",
    Number.POSITIVE_INFINITY
  )

  .option(
    "-e, --fileExtensions",
    "File extensions to explore when building the graph",
    [...kExpectedModuleExtensions].join(",")
  )

  .option(
    "-f, --staticFile",
    "Generate a static file from the graph. Can be 'none', 'svg', 'png', 'md'.",
    "none"
  )

  .option(
    "-m, --displayMode",
    "Either display the result of the analysis as a 'graph', as a 'file-tree' or 'raw'",
    "webapp"
  )

  .option(
    "-n, --trackBuiltinDependencies",
    "Enable Node.js builtin dependency tracking",
    false
  )

  .option(
    "-i, --incremental",
    "Enable incremental mode. Only the files that changed since the last run will be analyzed.",
    true
  )

  .option(
    "-it, --trackTypeOnlyDependencies",
    "Enable dependency tracking for Typescript 'import type' statements",
    true
  )

  .option(
    "-s, --showCircularDependencies",
    "Show all circular dependencies in the graph",
    false
  )

  .option(
    "-ts, --tsconfig",
    "Provide a path to a tsconfig.json file to use for path aliases resolution",
    "tsconfig.json"
  )

  .option(
    "-t, --trackThirdPartyDependencies",
    "Enable npm third-party dependency tracking",
    false
  )

  .example(
    "./node_modules/.bin/skott src/index.js --displayMode=file-tree --staticFile=md"
  )
  .example(
    "./node_modules/.bin/skott  --fileExtensions=.ts,.tsx --tsconfig=tsconfig.base.json"
  )
  .example(
    "./node_modules/.bin/skott --showCircularDependencies --displayMode=raw"
  )

  .action(displaySkott);

cli.parse(process.argv, { unknown: (flag) => `Unknown option: ${flag}` });
