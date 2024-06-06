import kleur from "kleur";

import type { InputConfig } from "../../config.js";
import { createRuntimeConfig } from "../../instance.js";

import { runTerminal } from "./runner.js";
import { makeSkottRunner } from "./runner.js";
import {
  defaultTerminalConfig,
  ensureNoIllegalTerminalConfig,
  type TerminalConfig
} from "./terminal-config.js";

export async function renderTerminalApplication<T>(
  apiConfig: InputConfig<T>,
  options: TerminalConfig = defaultTerminalConfig
): Promise<void> {
  const runtimeConfig = createRuntimeConfig(apiConfig);
  const terminalOptions: TerminalConfig = {
    watch: options.watch ?? defaultTerminalConfig.watch,
    displayMode: options.displayMode ?? defaultTerminalConfig.displayMode,
    exitCodeOnCircularDependencies: options.exitCodeOnCircularDependencies ?? 1,
    showCircularDependencies:
      options.showCircularDependencies ??
      defaultTerminalConfig.showCircularDependencies,
    showUnusedDependencies:
      options.showUnusedDependencies ??
      defaultTerminalConfig.showUnusedDependencies
  };
  const isTerminalConfigValid = ensureNoIllegalTerminalConfig(terminalOptions);

  if (isTerminalConfigValid._tag === "Left") {
    console.log(`\n ${kleur.bold().red(isTerminalConfigValid.left)}`);
    process.exit(1);
  }

  const runSkott = makeSkottRunner(runtimeConfig);

  runTerminal(runSkott, runtimeConfig, terminalOptions);
}
