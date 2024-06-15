import kleur from "kleur";

import { kExpectedModuleExtensions } from "../../modules/resolvers/base-resolver.js";
import { toRuntimeConfigOrDie } from "../config.js";

import { runTerminal } from "./runner.js";
import { makeSkottRunner } from "./runner.js";
import { ensureNoIllegalTerminalConfig } from "./terminal-config.js";

export type CliOptions = {
  entrypoint: string | undefined;
} & CliParameterOptions;

export type CliParameterOptions = {
  circularMaxDepth: number;
  cwd: string;
  displayMode: "raw" | "file-tree" | "graph" | "webapp";
  exitCodeOnCircularDependencies: number;
  fileExtensions: string;
  ignorePattern: string[];
  includeBaseDir: boolean;
  incremental: boolean;
  manifest: string;
  showCircularDependencies: boolean;
  showUnusedDependencies: boolean;
  showUnusedFiles: boolean;
  trackBuiltinDependencies: boolean;
  trackThirdPartyDependencies: boolean;
  trackTypeOnlyDependencies: boolean;
  tsconfig: string;
  verbose: boolean;
  watch: boolean;
};

export function runTerminalApplicationFromCLI<T>(
  entrypoint: string | undefined,
  options: CliParameterOptions
): Promise<void> {
  const isTerminalConfigValid = ensureNoIllegalTerminalConfig(options, {
    entrypoint,
    trackThirdPartyDependencies: options.trackThirdPartyDependencies
  });

  if (isTerminalConfigValid._tag === "Left") {
    console.log(`\n ${kleur.bold().red(isTerminalConfigValid.left)}`);
    process.exit(1);
  }

  const runtimeConfig = toRuntimeConfigOrDie<T>({
    entrypoint,
    ignorePatterns: options.ignorePattern,
    dependencyTracking: {
      thirdParty: options.trackThirdPartyDependencies,
      builtin: options.trackBuiltinDependencies,
      typeOnly: options.trackTypeOnlyDependencies
    },
    fileExtensions: options.fileExtensions
      .split(",")
      .filter((ext) => kExpectedModuleExtensions.has(ext)),
    circularMaxDepth: options.circularMaxDepth,
    tsConfigPath: options.tsconfig,
    manifestPath: options.manifest,
    includeBaseDir: options.includeBaseDir,
    cwd: options.cwd,
    incremental: options.incremental,
    verbose: options.verbose
  });

  const runSkott = makeSkottRunner(runtimeConfig);

  return runTerminal(runSkott, runtimeConfig, options);
}
