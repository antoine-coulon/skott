import { writeFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";

import { makeTreeStructure, TreeStructure } from "fs-tree-structure";
import kleur from "kleur";
import { generateMermaid } from "ligie";
import ora from "ora";

import skott from "../index.js";
import { kExpectedModuleExtensions } from "../src/modules/walkers/ecmascript/module-resolver.js";
import { SkottInstance, SkottNode, SkottNodeBody } from "../src/skott.js";

const kLeftSeparator = "└──";

function bytesToKB(bytes: number): string {
  const kilobytes = (bytes / 1024).toFixed(2);

  return kleur.bold().yellow(`${kilobytes} KB`);
}

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

function displayAsGraph(
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

async function generateStaticFile(
  graph: Record<string, SkottNode>,
  staticFile: string
): Promise<void> {
  console.log();
  const rawGraph = Object.entries(graph).reduce((acc, [key, val]) => {
    return {
      ...acc,
      [key]: val.adjacentTo
    };
  }, {});
  const spinner = ora("Generating static file").start();

  if (staticFile === "json") {
    await writeFile(
      path.join(process.cwd(), "skott.json"),
      JSON.stringify(graph, null, 2),
      "utf-8"
    );
  }

  const mermaid = generateMermaid(rawGraph, process.cwd(), {
    orientation: "TB"
  });

  spinner.color = "magenta";

  if (staticFile === "svg") {
    await mermaid.toSvg();
  }
  if (staticFile === "png") {
    await mermaid.toPng();
  }
  if (staticFile === "md") {
    await mermaid.toMarkdown();
  }

  spinner.stop();
}

function displayThirdPartyDependencies(graph: Record<string, SkottNode>): void {
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
      `${kleur.bold().magenta("\n ✓ no third-party dependencies found")}`
    );

    return;
  }

  console.log(`\n npm third-party dependencies: \n`);

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
  circularDependencies.forEach((circularDependency, index) => {
    const cyclicIndex = kleur.bold().red(`${index + 1}.`);
    console.log(
      `\n ${cyclicIndex} \n\n ${kleur.bold().red("->")} ${kleur
        .bold()
        .blue(circularDependency.join(kleur.red("\n -> ")))}`
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

type CliOptions = {
  circularMaxDepth: number;
  includeBaseDir: boolean;
  displayMode: string;
  staticFile: string;
  exitCodeOnCircularDependencies: number;
  showCircularDependencies: boolean;
  trackThirdPartyDependencies: boolean;
  trackBuiltinDependencies: boolean;
  trackTypeOnlyDependencies: boolean;
  fileExtensions: string;
  tsconfig: string;
};

export async function displaySkott(
  entrypoint: string | undefined,
  options: CliOptions
): Promise<void> {
  if (entrypoint) {
    console.log(
      `\n Running ${kleur.blue().bold("Skott")} from entrypoint: ${kleur
        .yellow()
        .underline()
        .bold(`${entrypoint}`)}`
    );
  } else {
    console.log(
      `\n Running ${kleur.blue().bold("Skott")} from current directory: ${kleur
        .yellow()
        .underline()
        .bold(`${path.basename(process.cwd())}`)}`
    );
  }

  const spinner = ora(`Initializing ${kleur.blue().bold("Skott")}`).start();
  const start = performance.now();

  const skottInstance = await skott({
    entrypoint: entrypoint ? entrypoint : undefined,
    circularMaxDepth: options.circularMaxDepth ?? Number.POSITIVE_INFINITY,
    includeBaseDir: options.includeBaseDir,
    dependencyTracking: {
      thirdParty: options.trackThirdPartyDependencies,
      builtin: options.trackBuiltinDependencies,
      typeOnly: options.trackTypeOnlyDependencies
    },
    fileExtensions: options.fileExtensions
      .split(",")
      .filter((ext) => kExpectedModuleExtensions.has(ext)),
    tsConfigPath: options.tsconfig
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

  const filesInvolvedInCircularDependencies = circularDeps.flat(1);

  if (options.displayMode === "file-tree") {
    const flattenedFilesPaths = Object.values(graph).flatMap((rootValue) => [
      rootValue.id,
      ...rootValue.adjacentTo
    ]);
    const treeStructure = makeTreeStructure(flattenedFilesPaths);
    console.log();
    displayAsFileTree(treeStructure, filesInvolvedInCircularDependencies, 0);
  }

  if (options.displayMode === "graph") {
    const nodesWithBodyBindings = new Map<string, SkottNodeBody>();

    for (const [nodeId, nodeValue] of Object.entries(graph)) {
      nodesWithBodyBindings.set(nodeId, nodeValue.body);
    }

    displayAsGraph(
      graph,
      filesInvolvedInCircularDependencies,
      nodesWithBodyBindings
    );
  }

  if (options.trackThirdPartyDependencies) {
    displayThirdPartyDependencies(graph);
  }

  if (options.trackBuiltinDependencies) {
    displayBuiltinDependencies(graph);
  }

  if (options.staticFile !== "none") {
    await generateStaticFile(graph, options.staticFile);
  }
}

process.on("exit", (code) => {
  console.log(
    `\n ${kleur.bold().blue("Skott")} exited with code ${kleur
      .bold()
      .yellow(code)}`
  );
});
