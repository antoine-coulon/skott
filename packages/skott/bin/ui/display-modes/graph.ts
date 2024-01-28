import kleur from "kleur";

import type { SkottInstance } from "../../../index.js";
import type { SkottNode, SkottNodeBody } from "../../../src/graph/node.js";
import type { CliParameterOptions } from "../../cli-config.js";
import { displayCircularDependencies } from "../console/dependencies.js";
import { bytesToKB, kLeftSeparator, makeIndents } from "../console/shared.js";

function render(
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

export function renderGraph(
  skottInstance: SkottInstance,
  options: CliParameterOptions
) {
  const circularDeps = displayCircularDependencies(skottInstance, options);
  const filesInvolvedInCycles = circularDeps.flat(1);
  const { graph } = skottInstance.getStructure();

  const nodesWithBodyBindings = new Map<string, SkottNodeBody>();

  for (const [nodeId, nodeValue] of Object.entries(graph)) {
    nodesWithBodyBindings.set(nodeId, nodeValue.body);
  }

  render(graph, filesInvolvedInCycles, nodesWithBodyBindings);
}
