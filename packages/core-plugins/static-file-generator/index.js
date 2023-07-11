import fs from "node:fs/promises";
import path from "node:path";

import { generateMermaid } from "ligie";

export const supportedStaticFileTypes = ["json", "svg", "png", "md"];

export async function generateStaticFile(graph, staticFileType) {
  const rawGraph = Object.entries(graph).reduce((acc, [key, val]) => {
    return {
      ...acc,
      [key]: val.adjacentTo,
    };
  }, {});

  if (staticFileType === "json") {
    await fs.writeFile(
      path.join(process.cwd(), "skott.json"),
      JSON.stringify(graph, null, 2),
      "utf-8"
    );
  }

  const mermaid = generateMermaid(rawGraph, process.cwd(), {
    orientation: "TB",
  });

  if (staticFileType === "svg") {
    await mermaid.toSvg();
  }
  if (staticFileType === "png") {
    await mermaid.toPng();
  }
  if (staticFileType === "md") {
    await mermaid.toMarkdown();
  }
}
