import { performance } from "node:perf_hooks";

import kleur from "kleur";
import type { Ora } from "ora";
import ora from "ora";

import skott, { type SkottInstance } from "../../../index.js";
import { kExpectedModuleExtensions } from "../../modules/resolvers/base-resolver.js";
import { EcmaScriptDependencyResolver } from "../../modules/resolvers/ecmascript/resolver.js";

import type { CliParameterOptions } from "./cli-config.js";

export function makeSkottRunner(
  entrypoint: string | undefined,
  options: CliParameterOptions
): () => Promise<SkottInstance> {
  let isFirstRun = true;

  const dependencyTracking = {
    thirdParty: options.trackThirdPartyDependencies,
    builtin: options.trackBuiltinDependencies,
    typeOnly: options.trackTypeOnlyDependencies
  };
  const fileExtensions = options.fileExtensions
    .split(",")
    .filter((ext) => kExpectedModuleExtensions.has(ext));
  const dependencyResolvers = [new EcmaScriptDependencyResolver()];

  return async () => {
    const startTime = performance.now();
    let spinner: Ora | undefined;

    try {
      if (!options.verbose && isFirstRun) {
        spinner = ora(`Initializing ${kleur.blue().bold("skott")}`).start();
      }

      isFirstRun = false;

      const skottResult = await skott({
        entrypoint: entrypoint ? entrypoint : undefined,
        ignorePattern: options.ignorePattern,
        incremental: options.incremental,
        circularMaxDepth: options.circularMaxDepth ?? Number.POSITIVE_INFINITY,
        includeBaseDir: options.includeBaseDir,
        dependencyTracking,
        fileExtensions,
        tsConfigPath: options.tsconfig,
        manifestPath: options.manifest,
        dependencyResolvers,
        cwd: options.cwd,
        verbose: options.verbose
      });

      const timeTook = `${(performance.now() - startTime).toFixed(3)}ms`;

      if (spinner && isFirstRun) {
        spinner.text = `Finished Skott initialization (${kleur
          .magenta()
          .bold(timeTook)})`;
        spinner.color = "green";
      }

      spinner?.stop();

      return skottResult;
    } catch (error: any) {
      if (spinner) {
        spinner.stop();
      }

      if (error.message) {
        console.log(`\n ${kleur.bold().red("Error: ".concat(error.message))}`);
      } else {
        console.log(
          `\n ${kleur
            .bold()
            .red(
              "Unexpected error. Please use `--verbose` flag and report" +
                " an issue at https://github.com/antoine-coulon/skott/issues"
            )}`
        );
      }

      process.exitCode = 1;

      return undefined as never;
    }
  };
}
