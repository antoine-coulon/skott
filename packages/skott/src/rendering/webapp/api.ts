import type { SkottStructure } from "../../skott.js";

import { createHttpApp } from "./internal.js";

export function renderStandaloneWebApplication(config: {
  application: {
    port: number;
    open: boolean;
    data: {
      cycles: () => string[][];
      structure: () => SkottStructure & {
        entrypoint: string | "none";
        cycles: string[][];
      };
      meta: () => {
        granularity: "module" | "group";
      };
    };
    onOpen?: (err?: Error) => void;
    onListen?: (port: number) => void;
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

  app.get("/api/meta", (_, response) => {
    const meta = application.data.meta();

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(meta));
  });

  listen({
    autoOpen: config.application.open,
    onListen: config.application.onListen,
    onOpen: config.application.onOpen
  });
}
