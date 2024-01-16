import type EventEmitter from "node:events";
import path from "node:path";

import compression from "compression";
import kleur from "kleur";
import polka from "polka";
import sirv from "sirv";
import resolveWebAppStaticPath from "skott-webapp";

import type { SkottInstance } from "../../src/skott.js";
import type { CliOptions } from "../cli-config.js";

import { open } from "./open-url.js";

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

function findSkottWebAppDirectory(): string {
  const skottWebAppDirectory = resolveWebAppStaticPath();

  return skottWebAppDirectory;
}

function renderSelectedTracking(
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

function resolveEntrypointPath(options: CliOptions) {
  const { entrypoint, includeBaseDir } = options;
  let baseEntrypointPath: string | undefined;

  if (includeBaseDir && entrypoint) {
    baseEntrypointPath = path.join(path.dirname(entrypoint), entrypoint);
  } else if (entrypoint) {
    baseEntrypointPath = path.basename(entrypoint);
  }

  return baseEntrypointPath;
}

export function renderWebApplication(config: {
  skottInstance: SkottInstance;
  options: CliOptions;
  watcherEmitter?: EventEmitter;
}): void {
  const entrypoint = resolveEntrypointPath(config.options);
  const { skottInstance, watcherEmitter } = config;
  const skottWebAppPath = findSkottWebAppDirectory();
  const dependencyTracking = {
    thirdParty: config.options.trackThirdPartyDependencies,
    builtin: config.options.trackBuiltinDependencies,
    typeOnly: config.options.trackTypeOnlyDependencies
  };

  for (const [key, value] of Object.entries(dependencyTracking)) {
    renderSelectedTracking(key as keyof typeof trackingWithCommands, value);
  }

  const compress = compression();
  const assets = sirv(skottWebAppPath, {
    immutable: true
  });
  const app = polka().use(compress, assets);

  app.get("/subscribe", (request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "access-control-allow-origin": "*",
      Connection: "keep-alive"
    });

    const listener = () => response.write(`refresh\n\n`);
    watcherEmitter?.on("change", listener);

    request.on("close", () => {
      watcherEmitter?.removeListener("change", listener);
    });
  });

  app.get("/api/cycles", (_, response) => {
    const cycles = skottInstance.useGraph().findCircularDependencies();

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(cycles));
  });

  app.get("/api/analysis", (_, response) => {
    const structure = skottInstance.getStructure();

    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        ...structure,
        entrypoint: entrypoint ?? "none",
        cycles: []
      })
    );
  });

  app.listen(process.env.SKOTT_PORT || 0);

  // @ts-expect-error - "port" exists
  const bindedAddress = `http://localhost:${app.server?.address()?.port}`;

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
