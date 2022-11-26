import { ServerResponse } from "node:http";
import path from "node:path";
import url from "node:url";

import compression from "compression";
import kleur from "kleur";
import { open } from "openurl";
import polka from "polka";
import sirv from "sirv";

import { SkottInstance, SkottStructure } from "../../src/skott.js";

function findSkottWebAppDirectory(): string {
  const __dirname = path.dirname(url.fileURLToPath(new URL(import.meta.url)));
  const rootSkottDirectory = path.join(__dirname, "..", "..", "..");
  const skottWebAppDirectory = path.join(
    "node_modules",
    "@skott",
    "webapp",
    "dist"
  );

  return path.join(rootSkottDirectory, skottWebAppDirectory);
}

export function openWebApplication(
  skottInstance: SkottInstance,
  skottStructure: SkottStructure
): void {
  const skottWebAppPath = findSkottWebAppDirectory();

  const compress = compression();
  const assets = sirv(skottWebAppPath, {
    immutable: true
  });

  const srv = polka()
    .use(compress, assets)
    .use("/api", (_, response: ServerResponse) => {
      const cycles = skottInstance.findCircularDependencies();

      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ ...skottStructure, cycles }));
    })
    .listen(process.env.SKOTT_PORT || 0);

  // @ts-expect-error - "port" exists
  const bindedAddress = `http://127.0.0.1:${srv.server?.address()?.port}`;

  console.log(
    `\n ${kleur.bold("💻 Opened @skott/webapp on")} ${kleur
      .bold()
      .bgMagenta(`${bindedAddress}`)}`
  );

  open(bindedAddress, (error) => {
    if (error) {
      console.log(
        `\n ${kleur
          .red()
          .bold(`Could not open @skott/webapp on ${bindedAddress}`)}`
      );
    }
  });
}
