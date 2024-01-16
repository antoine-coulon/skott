import kleur from "kleur";

import type { SkottInstance } from "../../../index.js";
import type { SkottNode } from "../../../src/graph/node.js";

import { makeIndents } from "./shared.js";

export async function displayThirdPartyDependencies(
  skottInstance: SkottInstance,
  graph: Record<string, SkottNode>,
  showUnusedDependencies: boolean
): Promise<void> {
  const thirdPartyRegistry = new Map<string, number>();
  for (const node of Object.values(graph)) {
    node.body.thirdPartyDependencies.forEach((dep) => {
      const occurrencesOfDep = thirdPartyRegistry.get(dep);
      if (occurrencesOfDep) {
        thirdPartyRegistry.set(dep, occurrencesOfDep + 1);
      } else {
        thirdPartyRegistry.set(dep, 1);
      }
    });
  }

  if (thirdPartyRegistry.size === 0) {
    console.log(
      `${kleur
        .bold()
        .magenta(
          "\n ✓ no third-party production dependencies found in the source code"
        )}`
    );
  }

  console.log(`\n production third-party dependencies: \n`);

  const sortedDependencies = [...thirdPartyRegistry.entries()].sort(
    ([a], [b]) => {
      if (a > b) return 1;
      if (a < b) return -1;

      return 0;
    }
  );

  for (const [depName, depOccurrence] of sortedDependencies) {
    console.log(
      `${makeIndents(1)} ${kleur.magenta().bold(depName)} (imports=${kleur
        .bold()
        .yellow(depOccurrence)})`
    );
  }

  if (showUnusedDependencies) {
    try {
      const start = performance.now();
      const { thirdParty } = await skottInstance.findUnusedDependencies();
      const timeTook = `${(performance.now() - start).toFixed(3)}ms`;

      const indents = makeIndents(1);
      if (thirdParty.length > 0) {
        console.log(
          `${kleur.bold(
            `\n Found ${kleur
              .bold()
              .red(
                thirdParty.length
              )} third-party dependencies (dev/prod) that ${kleur.yellow(
              "might be unused"
            )}`
          )} (${kleur.bold().magenta(timeTook)}) \n`,
          `\n ${kleur
            .bold()
            .grey(
              "Note: production dependencies used elsewhere than in the currently targeted source" +
                " files (e.g. configuration files not analyzed by skott) might be wrongly " +
                " reported as 'unused'. Please double check their potential use in other places than" +
                " source files before removing them. You might also want to move them as 'devDependencies'" +
                " if that is the case."
            )}
            `
        );

        for (const dep of thirdParty) {
          console.log(`${indents} ${kleur.bold().red(dep)}`);
        }
      } else {
        console.log(
          `${kleur.bold().green(`\n ✓ all third-party dependencies are used.`)}`
        );
      }
    } catch (e) {
      console.log(
        `${kleur.bold().red(
          // @ts-ignore - error is handled by skott
          `\n ✖ Could not search for unused dependencies. Reason: ${e.message} \n`
        )}`
      );
    }
  }
}

export function displayBuiltinDependencies(
  graph: Record<string, SkottNode>
): void {
  const builtinRegistry = new Map<string, number>();
  for (const node of Object.values(graph)) {
    node.body.builtinDependencies.forEach((dep) => {
      const occurrencesOfDep = builtinRegistry.get(dep);
      if (occurrencesOfDep) {
        builtinRegistry.set(dep, occurrencesOfDep + 1);
      } else {
        builtinRegistry.set(dep, 1);
      }
    });
  }

  if (builtinRegistry.size === 0) {
    console.log(
      `${kleur.bold().magenta("\n ✓ no builtin dependencies found")}`
    );

    return;
  }

  console.log(`\n Builtin Node.js dependencies: \n`);

  for (const [depName, depOccurrence] of builtinRegistry.entries()) {
    console.log(
      `${makeIndents(1)} ${kleur.magenta().bold(depName)} (imports=${kleur
        .bold()
        .yellow(depOccurrence)})`
    );
  }
}

export function displayWarningOnHighCircularDepth(circularDepth: number): void {
  if (circularDepth > 50) {
    console.log(
      kleur
        .yellow()
        .bold(
          `\n Warning: Circular max depth is high (${circularDepth}). Finding exact circular paths might take a while on big graphs.`
        )
    );
  }
}

export function displayCircularDependenciesPaths(
  circularDependencies: string[][]
): void {
  circularDependencies.forEach((circularDependency, index) => {
    const cyclicIndex = kleur.bold().red(`${index + 1}.`);
    console.log(
      `\n ${cyclicIndex} \n\n ${kleur.bold().red("->")} ${kleur
        .bold()
        .blue(circularDependency.join(kleur.red("\n -> ")))}`
    );
  });
}

export function displayNoCircularDependenciesFound(
  circularMaxDepth: number
): void {
  console.log(
    `${kleur.bold().green("\n ✓ no circular dependencies found")} (depth=${kleur
      .bold()
      .yellow(circularMaxDepth)})`
  );
}
