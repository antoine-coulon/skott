import type EventEmitter from "node:events";
import path from "node:path";

import compression from "compression";
import kleur from "kleur";
import polka from "polka";
import sirv from "sirv";
import type { SkottStructure } from "skott";
import resolveWebAppStaticPath from "skott-webapp";

import type { SkottInstance } from "../../../src/skott.js";
import type { CliOptions } from "../../cli-config.js";
import { open } from "../../open-url.js";
import type { WatchModeOptions } from "../../watch-mode.js";

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

function createHttpApp(port: number) {
  const skottWebAppPath = findSkottWebAppDirectory();
  const compress = compression();
  const assets = sirv(skottWebAppPath, {
    immutable: true
  });
  const app = polka().use(compress, assets);

  return {
    app,
    listen: () => {
      app.listen(port);

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
              \n ${kleur
                .yellow()
                .bold("Application remains accessible manually")}
            `
          );
        }
      });
    }
  };
}

export function renderWebApplication(config: {
  getSkottInstance: () => SkottInstance;
  options: CliOptions;
  watcherEmitter?: EventEmitter;
}): void {
  const entrypoint = resolveEntrypointPath(config.options);
  const { getSkottInstance, watcherEmitter } = config;
  const dependencyTracking = {
    thirdParty: config.options.trackThirdPartyDependencies,
    builtin: config.options.trackBuiltinDependencies,
    typeOnly: config.options.trackTypeOnlyDependencies
  };

  for (const [key, value] of Object.entries(dependencyTracking)) {
    renderSelectedTracking(key as keyof typeof trackingWithCommands, value);
  }

  const { app, listen } = createHttpApp(
    process.env.SKOTT_PORT ? parseInt(process.env.SKOTT_PORT, 10) : 0
  );

  app.get("/api/subscribe", (request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    });

    const listener = () => {
      /**
       * For now, we don't send any specific data related to the changes that
       * were detected, we just want to send a raw notification for the client
       * to be able to refresh the visualization.
       */
      response.write(`data: refresh\n\n`);
      /**
       * Response needs to be manually flushed to the client given that we are using
       * `compression` middleware. Otherwise no events will be sent to the client.
       * See the following comment to understand why we manually need to flush
       * the response:
       * https://github.com/lukeed/polka/issues/84#issuecomment-1902697935
       */
      response.flush();
    };

    watcherEmitter?.on("change", listener);

    request.on("close", () => {
      watcherEmitter?.removeListener("change", listener);
    });
  });

  app.get("/api/cycles", (_, response) => {
    const cycles = getSkottInstance().useGraph().findCircularDependencies();

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(cycles));
  });

  app.get("/api/analysis", (_, response) => {
    const structure = getSkottInstance().getStructure();

    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        ...structure,
        entrypoint: entrypoint ?? "none",
        cycles: []
      })
    );
  });

  listen();
}

export function renderStandaloneWebApplication(config: {
  application: {
    port: number;
    watchMode: WatchModeOptions;
    data: {
      cycles: () => string[][];
      structure: () => SkottStructure & {
        entrypoint: string | "none";
        cycles: string[][];
      };
    };
  };
}) {
  const { application } = config;
  const { app, listen } = createHttpApp(application.port);

  app.get("/api/cycles", (_, response) => {
    const cycles = application.data.cycles();

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(cycles));
  });

  app.get("/api/analysis", (_, response) => {
    const structure = application.data.structure();

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(structure));
  });

  listen();
}
