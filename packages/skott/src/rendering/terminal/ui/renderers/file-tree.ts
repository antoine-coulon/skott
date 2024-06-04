import path from "node:path";

import { makeTreeStructure, type TreeStructure } from "fs-tree-structure";
import kleur from "kleur";

import type { SkottInstance } from "../../../../../index.js";
import type { CliParameterOptions } from "../../cli-config.js";
import { displayCircularDependencies } from "../console/dependencies.js";
import { kLeftSeparator, makeIndents } from "../console/shared.js";

function isDirectory(nodePath: string): boolean {
  return path.extname(nodePath) === "";
}

function render(
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
    render(subNodes, filesInvolvedInCycles, whitespaces + 2);
  }
}

export function renderFileTree(
  skottInstance: SkottInstance,
  options: CliParameterOptions
) {
  const circularDeps = displayCircularDependencies(skottInstance, options);
  const filesInvolvedInCycles = circularDeps.flat(1);
  const { graph } = skottInstance.getStructure();

  const flattenedFilesPaths = Object.values(graph).flatMap((rootValue) => [
    rootValue.id,
    ...rootValue.adjacentTo
  ]);
  const treeStructure = makeTreeStructure(flattenedFilesPaths);
  console.log();
  render(treeStructure, filesInvolvedInCycles, 0);
}
