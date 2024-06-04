#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Command } from "commander";

import { kExpectedModuleExtensions } from "../src/modules/resolvers/base-resolver.js";
import { renderTerminalApplication } from "../src/rendering/terminal/api.js";

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

/**
 * Parses a string into an integer value.
 * @param {string} value - The string to be parsed into an integer.
 * @return {number} - The parsed integer value.
 * @throws {Error} - Throws an error if the given value is not a number.
 */
function commanderParseInt(value: string): number {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new Error("Not a number.");
  }

  return parsedValue;
}

/**
 * Function similar to kotlin's trimMargin
 * This is really helpful to print multiline string while keeping code indentation readable
 * Example:
 * trimMargin('|')(`
 *     |this is a super long multiline string
 *     |defined on multiple lines
 *     |while well formatted in the code
 * `)
 * will return:
 * this is a super long multiline string
 * defined on multiple lines
 * while well formatted in the code
 * @param delimiter
 */
export function trimMargin(delimiter = "|"): (str: string) => string {
  const reg = new RegExp(`^\\s*\\${delimiter}`, "g");

  return (str: string): string =>
    str
      .split("\n")
      .map((line) => line.replace(reg, ""))
      .join("\n");
}

const cli = new Command();

cli
  .version(readManifestVersion())
  .description("Start the skott analysis to fully build the graph")
  .option(
    "-b, --includeBaseDir",
    "Include the base directory name for each graph node. Relative to the entrypoint base directory or the current working directory",
    false
  )
  .option(
    "-c, --exitCodeOnCircularDependencies <code>",
    "Specify the exit code to use when circular dependencies are found",
    commanderParseInt,
    1
  )
  .option(
    "-d, --circularMaxDepth <maxDepth>",
    "Define the max depth of the nested circular dependencies search",
    commanderParseInt,
    Number.POSITIVE_INFINITY
  )
  .option(
    "-e, --fileExtensions <extensions>",
    'File extensions to explore when building the graph, separated by a comma (ex: ".js,.ts)"',
    [...kExpectedModuleExtensions].join(",")
  )
  .option(
    "-m, --displayMode <mode>",
    "Either display the result of the analysis as a 'webapp', 'graph', 'file-tree' or 'raw'",
    "webapp"
  )
  .option(
    "-n, --trackBuiltinDependencies",
    "Enable Node.js builtin dependency tracking",
    false
  )
  .option(
    "-i, --incremental",
    "(Experimental) Enable incremental mode. Only the files that changed since the last run will be analyzed",
    false
  )
  .option(
    "-it, --trackTypeOnlyDependencies",
    "Enable dependency tracking for TypeScript 'import type' statements",
    true
  )
  .option(
    "-nit, --no-trackTypeOnlyDependencies",
    "Disable dependency tracking for TypeScript 'import type' statements"
  )
  .option(
    "-ig, --ignorePattern <pattern>",
    "Provide ignore pattern to exclude files from the analysis",
    ""
  )
  .option(
    "-s, --showCircularDependencies",
    "Show all circular dependencies in the graph",
    false
  )
  .option(
    "-ts, --tsconfig <path>",
    "Provide a path to a tsconfig.json file to use for path aliases resolution",
    "tsconfig.json"
  )
  .option(
    "-mf, --manifest <path>",
    "Provide a path to a manifest file used for dependencies resolution",
    "package.json"
  )
  .option(
    "-t, --trackThirdPartyDependencies",
    "Enable npm third-party dependency tracking",
    false
  )
  .option(
    "-u, --showUnusedDependencies",
    "Search for unused third-party dependencies in the graph",
    false
  )
  .option("-vb, --verbose", "Enable verbose mode. Display all the logs", false)
  .option(
    "-w, --cwd <path>",
    "Define the base working directory to use for the analysis. Defaults to the current working directory",
    process.cwd()
  )
  .option(
    "-fw, --watch",
    "Watch for changes depending on the provided '--cwd' or defaults to process.cwd() and re-run the analysis when a supported file is added/deleted/modified",
    false
  )
  .argument("[entrypoint]", "optional entrypoint file to use")
  .usage(
    trimMargin("|")(`
          | ./node_modules/.bin/skott src/index.js --displayMode=file-tree --no-trackTypeOnlyDependencies"\n
          | ./node_modules/.bin/skott  --fileExtensions=.ts,.tsx --tsconfig=tsconfig.base.json\n
          | ./node_modules/.bin/skott --showCircularDependencies --displayMode=raw --watch\n
        `)
  )
  .action((name, commandAndOptions) =>
    renderTerminalApplication(name, commandAndOptions)
  );

cli.parse(process.argv);
