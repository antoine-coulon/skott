import EventEmitter from "events";

import type { InputConfig } from "../../config.js";
import { runFromRuntimeConfig } from "../../instance.js";
import type { SkottInstance, SkottStructure } from "../../skott.js";
import { toRuntimeConfigOrDie } from "../config.js";
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

/**
 * Renders skott web application using the api and application configurations.
 * skott's manages its own lifecycle and internals will automatically be used by
 * the rendering process to generate all the data source information then consumed
 * by the web client.
 *
 * @param apiConfig Configuration that will be used by skott's internals to generate
 * the whole data source consumed by the web client. This is equivalent to the
 * runtime configuration accepted by skott entrypoint module.
 *
 * @param applicationConfig Application configuration used by the web application
 * that will be rendered.
 */
export async function renderWebApplication<T>(
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
  const runtimeConfig = toRuntimeConfigOrDie<T>(apiConfig);
  const entrypoint = resolveEntrypointPath({
    entrypoint: runtimeConfig.entrypoint,
    includeBaseDir: runtimeConfig.includeBaseDir
  });
  const runSkott = () => runFromRuntimeConfig<T>(runtimeConfig);
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
      ignorePatterns: runtimeConfig.ignorePatterns,
      fileExtensions: runtimeConfig.fileExtensions,
      verbose: true,
      onChangesDetected: (done) => {
        runSkott().then((newSkottInstance) => {
          skottInstance = newSkottInstance;
          watcherEmitter!.emit("change");
          done();
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

/**
 * Renders a standalone skott web application using an arbitrary function that
 * returns a SkottInstance interface. This is useful when generating skott-like
 * information from plugins that need additional context to generate the graph,
 * while waiting for skott to allow such behavior directly from its runtime config.
 *
 * @param fromInstance Factory function returning a SkottInstance interface that
 * will be used as the data source for the web application. As long as the interface
 * is compatible with the SkottInstance interface, the web client will work as expected.
 *
 * @param applicationConfig Application configuration used by the web application
 * that will be rendered.
 */
export async function renderStandaloneWebApplication<T>(
  fromInstance: () => Promise<SkottInstance<T>>,
  applicationConfig: {
    port: number;
    open: boolean;
    visualization: {
      granularity: "module" | "group";
    };
    watch: {
      cwd: string;
      ignorePatterns: string[];
      fileExtensions: string[];
      verbose: boolean;
    };
    onListen?: (port: number) => void;
    onOpenError?: (error: Error) => void;
  }
) {
  const { port, open, onListen, onOpenError, visualization, watch } =
    applicationConfig;
  const { app, listen } = createHttpApp(port);

  let skottInstance = await fromInstance();
  const runSkott = () => fromInstance();

  const watcherEmitter = applicationConfig.watch
    ? new EventEmitter()
    : undefined;

  if (watch) {
    registerWatchMode({
      cwd: applicationConfig.watch.cwd,
      ignorePatterns: applicationConfig.watch.ignorePatterns,
      fileExtensions: applicationConfig.watch.fileExtensions,
      verbose: applicationConfig.watch.verbose,
      onChangesDetected: (done) => {
        runSkott().then((newSkottInstance) => {
          skottInstance = newSkottInstance;
          watcherEmitter!.emit("change");
          done();
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
        entrypoint: "none",
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
