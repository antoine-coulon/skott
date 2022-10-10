import path from "node:path";
import { performance } from "node:perf_hooks";

import { makeTreeStructure, TreeStructure } from "fs-tree-structure";
import kleur from "kleur";
import ora from "ora";

import skott from "../index.js";
import { SkottInstance, SkottNode } from "../src/skott.js";
import { findWorkspaceEntrypointModule } from "../src/workspace/index.js";

const kLeftSeparator = "└──";

function isDirectory(nodePath: string): boolean {
  return path.extname(nodePath) === "";
}

function makeIndents(numberOfIndents: number): string {
  return Array.from({ length: numberOfIndents }, () => " ").join("");
}

function displayAsFileTree(
  treeStructure: TreeStructure,
  filesInvolvedInCycles: string[],
  whitespaces = 0
): void {
  const leftLevelSeparator = whitespaces === 0 ? "" : kLeftSeparator;
  const indents = makeIndents(whitespaces);
  for (const [node, subNodes] of Object.entries(treeStructure)) {
    if (isDirectory(node)) {
      console.log(
        `${indents} ${leftLevelSeparator} ${kleur.bold().yellow(node)}/`
      );
    } else {
      console.log(
        `${indents} ${leftLevelSeparator} ${kleur.bold().blue(node)}`
      );
    }
    displayAsFileTree(subNodes, filesInvolvedInCycles, whitespaces + 2);
  }
}

function displayAsGraph(
  graph: Record<string, SkottNode>,
  filesInvolvedInCycles: string[]
): void {
  const leftArrow = `${kLeftSeparator}>`;
  for (const [nodeId, nodeValue] of Object.entries(graph)) {
    console.log();

    if (filesInvolvedInCycles.includes(nodeId)) {
      console.log(
        `${makeIndents(1)} ${kleur.red().underline().bold(nodeId)} ${kleur
          .bold()
          .yellow("♻️")}`
      );
    } else {
      console.log(`${makeIndents(1)} ${kleur.blue().underline().bold(nodeId)}`);
    }

    for (const subNode of nodeValue.adjacentTo) {
      console.log(kleur.bold().yellow(`${makeIndents(3)} │`));
      if (filesInvolvedInCycles.includes(subNode)) {
        const subNodeWithWarning = `${subNode} ${kleur.bold().yellow("♻️")}`;
        console.log(
          `${makeIndents(3)} ${kleur.bold().yellow(leftArrow)} ${kleur
            .bold()
            .red(subNodeWithWarning)} `
        );
      } else {
        console.log(
          `${makeIndents(3)} ${kleur.bold().yellow(leftArrow)} ${kleur
            .bold()
            .white(subNode)}`
        );
      }
    }
  }
}

function displayThirdPartyDependencies(graph: Record<string, SkottNode>): void {
  console.log(`\n npm third-party dependencies: \n`);
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
}

function displayBuiltinDependencies(graph: Record<string, SkottNode>): void {
  console.log(`\n Builtin Node.js dependencies: \n`);
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

  for (const [depName, depOccurrence] of builtinRegistry.entries()) {
    console.log(
      `${makeIndents(1)} ${kleur.magenta().bold(depName)} (imports=${kleur
        .bold()
        .yellow(depOccurrence)})`
    );
  }
}

function displayWarningOnHighCircularDepth(circularDepth: number): void {
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

function displayCircularDependenciesPaths(
  circularDependencies: string[][]
): void {
  circularDependencies.forEach((circularDependency) => {
    const cyclicIndex = kleur.bold().yellow(`•`);
    console.log(
      `\n ${cyclicIndex} ${kleur.bold().red(circularDependency.join(" -> "))}`
    );
  });
}

function displayNoCircularDependenciesFound(circularMaxDepth: number): void {
  console.log(
    `${kleur.bold().green("\n ✓ no circular dependencies found")} (depth=${kleur
      .bold()
      .yellow(circularMaxDepth)})`
  );
}

function makeCircularDependenciesUI(
  skottInstance: SkottInstance,
  options: CliOptions
): string[][] {
  const circularDependencies: string[][] = [];
  const { findCircularDependencies, hasCircularDependencies } = skottInstance;

  // only find circular dependencies on-demand as it can be expensive
  if (options.showCircularDependencies) {
    displayWarningOnHighCircularDepth(options.circularMaxDepth);

    circularDependencies.push(...findCircularDependencies());
    if (circularDependencies.length > 0) {
      console.log(kleur.bold().red(`\n ✖ circular dependencies found:`));
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
        .red(`\n ✖ Graph is not Acyclic as circular dependencies were found.`)
    );
    process.exitCode = options.exitCodeOnCircularDependencies;
  } else {
    displayNoCircularDependenciesFound(options.circularMaxDepth);
  }

  return circularDependencies;
}

type CliOptions = {
  circularMaxDepth: number;
  includeBaseDir: boolean;
  displayMode: string;
  exitCodeOnCircularDependencies: number;
  showCircularDependencies: boolean;
  trackThirdPartyDependencies: boolean;
  trackBuiltinDependencies: boolean;
};

export async function displaySkott(
  entrypoint: string,
  options: CliOptions
): Promise<void> {
  const entrypointModule =
    entrypoint ?? (await findWorkspaceEntrypointModule());

  console.log(
    `\n Running ${kleur.blue().bold("Skott")} from entrypoint: ${kleur
      .yellow()
      .underline()
      .bold(`${entrypointModule}`)}`
  );

  const spinner = ora(`Initializing ${kleur.blue().bold("Skott")}`).start();
  const start = performance.now();

  const skottInstance = await skott({
    entrypoint: entrypointModule,
    circularMaxDepth: options.circularMaxDepth ?? Number.POSITIVE_INFINITY,
    includeBaseDir: options.includeBaseDir,
    dependencyTracking: {
      thirdParty: options.trackThirdPartyDependencies,
      builtin: options.trackBuiltinDependencies
    }
  });

  const timeTook = `${(performance.now() - start).toFixed(3)}ms`;
  spinner.text = `Finished Skott initialization (${kleur
    .magenta()
    .bold(timeTook)})`;
  spinner.color = "green";

  const skottStructure = skottInstance.getStructure();
  const { graph, files } = skottStructure;
  const filesWord = files.length > 1 ? "files" : "file";
  const timeTookStructure = `${(performance.now() - start).toFixed(3)}ms`;

  spinner.stop();
  console.log(
    `\n Processed ${kleur.bold().green(files.length)} ${filesWord} (${kleur
      .magenta()
      .bold(timeTookStructure)})`
  );

  const circularDeps = makeCircularDependenciesUI(skottInstance, options);

  if (options.displayMode === "raw") {
    return;
  }

  const filesInvolvedInCircularDependencies = circularDeps.flat(1);

  if (options.displayMode === "file-tree") {
    const flattenedFilesPaths = Object.values(graph).flatMap((rootValue) => [
      rootValue.id,
      ...rootValue.adjacentTo
    ]);
    const treeStructure = makeTreeStructure(flattenedFilesPaths);
    console.log();
    displayAsFileTree(treeStructure, filesInvolvedInCircularDependencies);
  }

  if (options.displayMode === "graph") {
    displayAsGraph(graph, filesInvolvedInCircularDependencies);
  }

  if (options.trackThirdPartyDependencies) {
    displayThirdPartyDependencies(graph);
  }

  if (options.trackBuiltinDependencies) {
    displayBuiltinDependencies(graph);
  }
}

process.on("exit", (code) => {
  console.log(
    `\n ${kleur.bold().blue("Skott")} exited with code ${kleur
      .bold()
      .yellow(code)}`
  );
});
