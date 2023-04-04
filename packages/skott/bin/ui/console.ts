import path from "node:path";
import { performance } from "node:perf_hooks";

import { TreeStructure } from "fs-tree-structure";
import kleur from "kleur";

import { SkottInstance, SkottNode, SkottNodeBody } from "../../src/skott.js";

const kLeftSeparator = "└──";

export function bytesToKB(bytes: number): string {
  const kilobytes = (bytes / 1024).toFixed(2);

  return kleur.bold().yellow(`${kilobytes} KB`);
}

function isDirectory(nodePath: string): boolean {
  return path.extname(nodePath) === "";
}

function makeIndents(numberOfIndents: number): string {
  return Array.from({ length: numberOfIndents }, () => " ").join("");
}

export function displayAsFileTree(
  treeStructure: TreeStructure,
  filesInvolvedInCycles: string[],
  whitespaces = 0
): void {
  const leftLevelSeparator = whitespaces === 0 ? "" : kLeftSeparator;
  const indents = makeIndents(whitespaces);
  for (const [nodeId, subNodes] of Object.entries(treeStructure)) {
    if (isDirectory(nodeId)) {
      console.log(
        `${indents} ${leftLevelSeparator} ${kleur.bold().yellow(nodeId)}/`
      );
    } else {
      console.log(
        `${indents} ${leftLevelSeparator} ${kleur.bold().blue(nodeId)}`
      );
    }
    displayAsFileTree(subNodes, filesInvolvedInCycles, whitespaces + 2);
  }
}

export function displayAsGraph(
  graph: Record<string, SkottNode>,
  filesInvolvedInCycles: string[],
  nodesWithBodyBindings: Map<string, SkottNodeBody>
): void {
  const leftArrow = `${kLeftSeparator}>`;
  for (const [nodeId, nodeValue] of Object.entries(graph)) {
    const localStore = nodeValue.adjacentTo.reduce(
      (store, current) => {
        const nodeSize = nodesWithBodyBindings.get(current)?.size ?? 0;
        store[current] = nodeSize;
        store.sum += nodeSize;

        return store;
      },
      { sum: 0 } as Record<string, number>
    );

    const parentNodeSize = bytesToKB(nodeValue.body.size ?? 0);
    const totalOfChildrenSize = bytesToKB(localStore.sum);
    console.log();

    if (filesInvolvedInCycles.includes(nodeId)) {
      console.log(
        `${makeIndents(1)} ${kleur.red().underline().bold(nodeId)} ${kleur
          .bold()
          .yellow("♻️")}`
      );
    } else {
      console.log(
        `${makeIndents(1)} ${kleur
          .blue()
          .underline()
          .bold(
            nodeId
          )} (self=${parentNodeSize}, imported=${totalOfChildrenSize})`
      );
    }

    for (const subNode of nodeValue.adjacentTo) {
      const nodeSize = bytesToKB(localStore[subNode]);

      console.log(kleur.bold().yellow(`${makeIndents(3)} │`));
      if (filesInvolvedInCycles.includes(subNode)) {
        const subNodeWithWarning = `${subNode} ${kleur.bold().yellow("♻️")}`;
        console.log(
          `${makeIndents(3)} ${kleur.bold().yellow(leftArrow)} ${kleur
            .bold()
            .red(subNodeWithWarning)}`
        );
      } else {
        console.log(
          `${makeIndents(3)} ${kleur.bold().yellow(leftArrow)} ${kleur
            .bold()
            .white(subNode)} (${nodeSize})`
        );
      }
    }
  }
}

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
        .magenta("\n ✓ no third-party dependencies found in the source code")}`
    );
  }

  console.log(`\n third-party dependencies: \n`);

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
              "Note: `unused` dependencies that are in fact used probably means the dependency should be moved to `devDependencies`. \n If it's already there, then it's probably a false alert."
            )}
          `,
          `${kleur.bold(
            `\n Found ${kleur
              .bold()
              .red(
                thirdParty.length
              )} third-party dependencies that ${kleur.yellow(
              "might be unused"
            )}`
          )} (${kleur.bold().magenta(timeTook)}) \n`
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
