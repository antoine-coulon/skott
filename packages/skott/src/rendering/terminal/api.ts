import kleur from "kleur";

import type { InputConfig } from "../../config.js";
import { toRuntimeConfigOrDie } from "../config.js";

import { runTerminal } from "./runner.js";
import { makeSkottRunner } from "./runner.js";
import {
  defaultTerminalConfig,
  ensureNoIllegalTerminalConfig,
  type TerminalConfig
} from "./terminal-config.js";

process.on("exit", (code) => {
  console.log(
    `\n ${kleur.bold().blue("skott")} exited with code ${kleur
      .bold()
      .yellow(code)}`
  );
});

export function renderTerminalApplication<T>(
  apiConfig: InputConfig<T>,
  options: TerminalConfig = defaultTerminalConfig
): Promise<void> {
  const runtimeConfig = toRuntimeConfigOrDie(apiConfig);

  const terminalOptions: TerminalConfig = {
    watch: options.watch ?? defaultTerminalConfig.watch,
    displayMode: options.displayMode ?? defaultTerminalConfig.displayMode,
    exitCodeOnCircularDependencies: options.exitCodeOnCircularDependencies ?? 1,
    showCircularDependencies:
      options.showCircularDependencies ??
      defaultTerminalConfig.showCircularDependencies,
    showUnusedDependencies:
      options.showUnusedDependencies ??
      defaultTerminalConfig.showUnusedDependencies,
    showUnusedFiles:
      options.showUnusedFiles ?? defaultTerminalConfig.showUnusedFiles
  };

  const isTerminalConfigValid = ensureNoIllegalTerminalConfig(terminalOptions, {
    entrypoint: runtimeConfig.entrypoint,
    trackThirdPartyDependencies: runtimeConfig.dependencyTracking.thirdParty
  });

  if (isTerminalConfigValid._tag === "Left") {
    console.log(`\n ${kleur.bold().red(isTerminalConfigValid.left)}`);
    process.exit(1);
  }

  const runSkott = makeSkottRunner(runtimeConfig);

  return runTerminal(runSkott, runtimeConfig, terminalOptions);
}
