import type EventEmitter from "node:events";
import { ServerResponse } from "node:http";

import compression from "compression";
import kleur from "kleur";
import polka from "polka";
import sirv from "sirv";
import resolveWebAppStaticPath from "skott-webapp";

import type { SkottInstance, SkottStructure } from "../../src/skott.js";

import { open } from "./open-url.js";

function findSkottWebAppDirectory(): string {
  const skottWebAppDirectory = resolveWebAppStaticPath();

  return skottWebAppDirectory;
}

const trackingWithCommands = {
  builtin: {
    label: "Built-in dependencies",
    argument: "--trackBuiltinDependencies"
  },
  thirdParty: {
    label: "Third-party dependencies",
    argument: "--trackThirdPartyDependencies"
  },
  typeOnly: {
    label: "Type-level only dependencies",
    argument: "--trackTypeOnlyDependencies"
  }
} as const;

function displaySelectedTracking(
  option: keyof typeof trackingWithCommands,
  enabled: boolean
): void {
  const optionInformation = trackingWithCommands[option];
  console.log(
    `\n ${kleur
      .bold()
      .magenta(`${optionInformation.label}: ${enabled ? "✅" : "❌"}`)}`
  );
  if (!enabled) {
    console.log(
      `\n --> Use ${kleur
        .bold()
        .yellow(optionInformation.argument)} to enable tracking.`
    );
  }
}

export function openWebApplication(config: {
  skottInstance: SkottInstance;
  getSkottStructure: () => SkottStructure;
  entrypoint: string | undefined;
  dependencyTracking: {
    thirdParty: boolean;
    builtin: boolean;
    typeOnly: boolean;
  };
  watcherEmitter?: EventEmitter;
}): void {
  const {
    skottInstance,
    getSkottStructure,
    entrypoint,
    dependencyTracking,
    watcherEmitter
  } = config;

  const skottWebAppPath = findSkottWebAppDirectory();

  for (const [key, value] of Object.entries(dependencyTracking)) {
    displaySelectedTracking(key as keyof typeof trackingWithCommands, value);
  }

  const compress = compression();
  const assets = sirv(skottWebAppPath, {
    immutable: true
  });
  const srv = polka().use(compress, assets);

  console.log(`\n ${kleur.italic("Prefetching data...")} `);

  srv.get("/subscribe", (_, response: ServerResponse) => {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "access-control-allow-origin": "*",
      Connection: "keep-alive"
    });

    watcherEmitter?.on("change", () => {
      response.write("refresh\n\n");
    });
  });

  srv.get("/api/cycles", (_, response: ServerResponse) => {
    const cycles = skottInstance.useGraph().findCircularDependencies();

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(cycles));
  });

  srv.get("/api/analysis", (_, response: ServerResponse) => {
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        ...getSkottStructure(),
        entrypoint: entrypoint ?? "none",
        cycles: []
      })
    );
  });

  srv.listen(process.env.SKOTT_PORT || 0);

  // @ts-expect-error - "port" exists
  const bindedAddress = `http://localhost:${srv.server?.address()?.port}`;

  console.log(
    `\n ${kleur.bold(`💻 Web application is ready:`)} ${kleur
      .bold()
      .underline()
      .magenta(`${bindedAddress}`)}`
  );

  open(bindedAddress, (error) => {
    if (error) {
      console.log(
        `\n ${kleur
          .red()
          .bold(
            `Could not automatically open the application on ${bindedAddress}. Reason: "${
              error.message ?? "unknown"
            }"`
          )}
          \n ${kleur.yellow().bold("Application remains accessible manually")}
        `
      );
    }
  });
}
