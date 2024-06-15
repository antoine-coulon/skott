import kleur from "kleur";

import type { SkottInstance } from "../../../../../index.js";
import type { SkottNode } from "../../../../graph/node.js";

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

  console.log(
    "\n" + kleur.bold().white().underline("Third-party dependencies:") + "\n"
  );

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
          `\n ${kleur
            .bold()
            .grey(
              "Note: production dependencies used elsewhere than in the currently targeted source" +
                " files (e.g. configuration files not analyzed by skott) might be wrongly " +
                " reported as 'unused'. Please double check their potential use in other places than" +
                " source files before removing them. You might also want to move them as 'devDependencies'" +
                " if that is the case."
            )}
            `,
          `${kleur.bold(
            `\n Found ${kleur
              .bold()
              .red(
                thirdParty.length
              )} third-party dependencies (dev/prod) that ${kleur.yellow(
              "might be unused (check message just above)"
            )}`
          )} (${kleur.bold().magenta(timeTook)}) \n`
        );

        for (const dep of thirdParty) {
          const d = `➡️ ${dep}`;
          console.log(`${indents} ${kleur.bold().red(d)}`);
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

  console.log(
    "\n" +
      kleur.bold().white().underline("Builtin Node.js dependencies:") +
      "\n"
  );

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

export async function displayDependenciesReport(
  skottInstance: SkottInstance,
  options: {
    showUnusedDependencies: boolean;
    showUnusedFiles: boolean;
    trackThirdPartyDependencies: boolean;
    trackBuiltinDependencies: boolean;
  }
) {
  const { graph } = skottInstance.getStructure();

  if (options.trackThirdPartyDependencies) {
    await displayThirdPartyDependencies(
      skottInstance,
      graph,
      options.showUnusedDependencies
    );
  }

  if (options.trackBuiltinDependencies) {
    displayBuiltinDependencies(graph);
  }

  if (options.showUnusedFiles) {
    displayUnusedFiles(skottInstance);
  }
}

export function displayCircularDependencies(
  skottInstance: SkottInstance,
  options: {
    circularMaxDepth: number;
    showCircularDependencies: boolean;
    exitCodeOnCircularDependencies: number;
  }
): string[][] {
  const circularDependencies: string[][] = [];
  const { findCircularDependencies, hasCircularDependencies } =
    skottInstance.useGraph();

  // only find circular dependencies on-demand as it can be expensive
  if (options.showCircularDependencies) {
    displayWarningOnHighCircularDepth(options.circularMaxDepth);

    circularDependencies.push(...findCircularDependencies());
    if (circularDependencies.length > 0) {
      console.log(
        kleur
          .bold()
          .red(
            `\n ✖ (${circularDependencies.length}) circular dependencies found`
          )
      );
      displayCircularDependenciesPaths(circularDependencies);
      process.exitCode = options.exitCodeOnCircularDependencies;
    } else {
      displayNoCircularDependenciesFound(options.circularMaxDepth);
    }

    return circularDependencies;
  }

  // otherwise, just find if the graph has at least one cycle which is not expensive
  const hasCircularDeps = hasCircularDependencies();

  if (hasCircularDeps) {
    console.log(
      kleur
        .bold()
        .red(`\n ✖ Circular dependencies were found. Graph is not Acyclic.`)
    );
    process.exitCode = options.exitCodeOnCircularDependencies;
  } else {
    displayNoCircularDependenciesFound(options.circularMaxDepth);
  }

  return circularDependencies;
}

export function displayUnusedFiles(skottInstance: SkottInstance) {
  const unusedFiles = skottInstance.useGraph().collectUnusedFiles();

  if (unusedFiles.length > 0) {
    console.log("\n " + kleur.bold().white().underline(`Unused files found:`));

    for (const unused of unusedFiles) {
      console.log(kleur.bold().red(`\n ➡️ ${unused}`));
    }

    console.log(
      kleur
        .bold()
        .grey(
          `\n Warning: files are marked as unused based on source code analysis.` +
            `\n They might be exported through package.json or used through other mechanisms not analyzed by skott.` +
            `\n Please double check their potential use before removing them.`
        )
    );
  } else {
    console.log(kleur.bold().green(`\n 🧹 no unused files found`));
  }
}
