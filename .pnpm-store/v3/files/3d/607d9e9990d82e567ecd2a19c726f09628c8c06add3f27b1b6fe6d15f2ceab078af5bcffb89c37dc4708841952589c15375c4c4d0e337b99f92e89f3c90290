import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";

import { run } from "@mermaid-js/mermaid-cli";

const mermaidConfig = {
  quiet: true,
  config: "./mermaid.config.json",
};

async function safeGeneration(buildMermaidTargetFn) {
  try {
    await buildMermaidTargetFn();
  } catch (e) {
    console.log("Error trying to generate file with mermaid", e.message ?? e);
  }
}

function toRaw(mermaid, outDir) {
  return () =>
    safeGeneration(async () => {
      const location = path.join(outDir, `graph-${Date.now()}.mmd`);
      await fs.writeFile(location, mermaid);
    });
}

function toMarkdown(mermaid, outDir) {
  return () =>
    safeGeneration(async () => {
      const location = path.join(outDir, `graph-${Date.now()}.md`);
      await fs.writeFile(location, "```mermaid\n".concat(mermaid, "\n```"));
    });
}

function toSvg(mermaid, outDir) {
  return () =>
    safeGeneration(async () => {
      const location = path.join(os.tmpdir(), `graph-${Date.now()}.mmd`);
      await fs.writeFile(location, mermaid);

      await run(
        location,
        path.join(outDir, `graph-${Date.now()}.svg`),
        mermaidConfig
      );
    });
}

function toPng(mermaid, outDir) {
  return () =>
    safeGeneration(async () => {
      const location = path.join(os.tmpdir(), `graph-${Date.now()}.mmd`);
      await fs.writeFile(location, mermaid);

      await run(
        location,
        path.join(outDir, `graph-${Date.now()}.png`),
        mermaidConfig
      );
    });
}

const validOrientations = ["LR", "RL", "BT", "TD", "TB"];

export function generateMermaid(
  graph,
  outDir = process.cwd(),
  options = { orientation: "LR" }
) {
  if (!validOrientations.includes(options.orientation)) {
    throw new Error("Invalid graph orientation");
  }

  let mermaid = `graph ${options.orientation}; \n`;

  for (const [nodeId, adjacentNodes] of Object.entries(graph)) {
    mermaid += adjacentNodes
      .map((childId) => `${nodeId} --> ${childId};`)
      .join("\n");
  }

  return {
    toRaw: toRaw(mermaid, outDir),
    toMarkdown: toMarkdown(mermaid, outDir),
    toSvg: toSvg(mermaid, outDir),
    toPng: toPng(mermaid, outDir),
  };
}
