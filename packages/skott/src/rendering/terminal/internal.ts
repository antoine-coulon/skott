import kleur from "kleur";

import { createRuntimeConfig } from "../../instance.js";
import { kExpectedModuleExtensions } from "../../modules/resolvers/base-resolver.js";

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
  const isTerminalConfigValid = ensureNoIllegalTerminalConfig(options);

  if (isTerminalConfigValid._tag === "Left") {
    console.log(`\n ${kleur.bold().red(isTerminalConfigValid.left)}`);
    process.exit(1);
  }

  const runtimeConfig = createRuntimeConfig<T>({
    ...options,
    entrypoint,
    ignorePatterns: options.ignorePattern,
    fileExtensions: options.fileExtensions
      .split(",")
      .filter((ext) => kExpectedModuleExtensions.has(ext))
  });

  const runSkott = makeSkottRunner(runtimeConfig);

  return runTerminal(runSkott, runtimeConfig, options);
}
