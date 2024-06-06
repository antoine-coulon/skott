import type { InputConfig } from "../../config.js";
import { run } from "../../instance.js";
import type { SkottStructure } from "../../skott.js";

import { createHttpApp } from "./internal.js";

export interface ResponseData {
  cycles: string[][];
  structure: SkottStructure & {
    entrypoint: string | "none";
    cycles: string[][];
  };
  meta: {
    granularity: "module" | "group";
  };
}

export async function renderWebApplication<T>(
  apiConfig: InputConfig<T>,
  applicationConfig: {
    port: number;
    open: boolean;
    visualization: {
      granularity: "module" | "group";
    };
    onListen?: (port: number) => void;
    onOpenError?: (error: Error) => void;
  }
) {
  const skott = await run(apiConfig);
  const { port, open, onListen, onOpenError, visualization } =
    applicationConfig;
  const { app, listen } = createHttpApp(port);

  app.get("/api/cycles", (_, response) => {
    const cycles = skott.useGraph().findCircularDependencies();

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(cycles));
  });

  app.get("/api/analysis", (_, response) => {
    const structure = skott.getStructure();

    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        ...structure,
        entrypoint: apiConfig.entrypoint ?? "none",
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
