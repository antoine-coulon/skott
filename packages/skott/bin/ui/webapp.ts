import { ServerResponse } from "node:http";
import path from "node:path";
import url from "node:url";

import compression from "compression";
import kleur from "kleur";
import polka from "polka";
import sirv from "sirv";

import { SkottInstance, SkottStructure } from "../../src/skott.js";

export function openWebApplication(
  skottInstance: SkottInstance,
  skottStructure: SkottStructure
): void {
  const __dirname = path.dirname(url.fileURLToPath(new URL(import.meta.url)));
  const baseSkottWebAppDirectory = path.join(
    __dirname,
    "..",
    "..",
    "node_modules",
    "@skott",
    "webapp",
    "dist"
  );

  const compress = compression();
  const assets = sirv(baseSkottWebAppDirectory, {
    immutable: true
  });
  const port = 49389;

  polka()
    .use(compress, assets)
    .use("/api", (_: any, response: ServerResponse) => {
      const cycles = skottInstance.findCircularDependencies();

      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ ...skottStructure, cycles }));
    })
    .listen(port, () => {
      console.log(
        `\n ${kleur.bold("💻 Opened Skott web app on")} ${kleur
          .bold()
          .bgMagenta(`http://127.0.0.1:${port}`)}`
      );
    });
}
