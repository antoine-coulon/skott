import type EventEmitter from "node:events";
import path from "node:path";

import kleur from "kleur";

import { createHttpApp } from "../../../../rendering/webapp/internal.js";
import type { SkottInstance } from "../../../../skott.js";

import type { SkottConfig } from "skott";

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

function resolveEntrypointPath(options: {
  entrypoint: string | undefined;
  includeBaseDir: boolean;
}) {
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
  getSkottInstance: () => SkottInstance;
  options: {
    tracking: SkottConfig<unknown>["dependencyTracking"];
    entrypoint: string | undefined;
    includeBaseDir: boolean;
  };
  watcherEmitter?: EventEmitter;
}): void {
  const entrypoint = resolveEntrypointPath(config.options);
  const { getSkottInstance, watcherEmitter } = config;
  const dependencyTracking = {
    thirdParty: config.options.tracking.thirdParty,
    builtin: config.options.tracking.builtin,
    typeOnly: config.options.tracking.typeOnly
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

  listen({ autoOpen: true });
}
