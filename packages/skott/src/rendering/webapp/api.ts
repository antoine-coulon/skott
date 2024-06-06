import EventEmitter from "events";

import type { InputConfig } from "../../config.js";
import { createRuntimeConfig, runFromRuntimeConfig } from "../../instance.js";
import type { SkottStructure } from "../../skott.js";
import { registerWatchMode } from "../watch-mode.js";

import { createHttpApp, resolveEntrypointPath } from "./internal.js";

export interface ApiResponses {
  cycles: string[][];
  structure: SkottStructure & {
    entrypoint: string | "none";
    cycles: string[][];
  };
  meta: {
    granularity: "module" | "group";
  };
}

export async function renderStandaloneWebApplication<T>(
  apiConfig: InputConfig<T>,
  applicationConfig: {
    port: number;
    open: boolean;
    visualization: {
      granularity: "module" | "group";
    };
    watch: boolean;
    onListen?: (port: number) => void;
    onOpenError?: (error: Error) => void;
  }
) {
  const runtimeConfig = createRuntimeConfig(apiConfig);
  const entrypoint = resolveEntrypointPath({
    entrypoint: runtimeConfig.entrypoint,
    includeBaseDir: runtimeConfig.includeBaseDir
  });
  const runSkott = () => runFromRuntimeConfig(runtimeConfig);
  const { port, open, onListen, onOpenError, visualization, watch } =
    applicationConfig;
  const { app, listen } = createHttpApp(port);

  let skottInstance = await runSkott();

  const watcherEmitter = applicationConfig.watch
    ? new EventEmitter()
    : undefined;

  if (watch) {
    registerWatchMode({
      cwd: runtimeConfig.cwd,
      ignorePattern: runtimeConfig.ignorePattern,
      fileExtensions: runtimeConfig.fileExtensions,
      onChangesDetected: () => {
        runSkott().then((newSkottInstance) => {
          skottInstance = newSkottInstance;
          watcherEmitter!.emit("change");
        });
      }
    });
  }

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

  app.get("/api/meta", (_, response) => {
    const meta = { visualization };

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(meta));
  });

  listen({
    autoOpen: open,
    onListen,
    onOpenError
  });
}
