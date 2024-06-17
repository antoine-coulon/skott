import type EventEmitter from "node:events";

import kleur from "kleur";

import {
  createHttpApp,
  resolveEntrypointPath
} from "../../../../rendering/webapp/internal.js";
import type { SkottInstance, SkottConfig } from "../../../../skott.js";

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

  app.get("/api/unused", async (_, response) => {
    const unusedDependencies =
      await getSkottInstance().findUnusedDependencies();
    const unusedFiles = getSkottInstance().useGraph().collectUnusedFiles();

    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        dependencies: unusedDependencies,
        files: unusedFiles
      })
    );
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

  app.get("/api/meta", (_, response) => {
    // When the webapp is registered from the CLI, the only default option is "group"
    const meta = {
      visualization: {
        granularity: "group"
      },
      tracking: dependencyTracking
    };

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(meta));
  });

  listen({ autoOpen: true });
}
