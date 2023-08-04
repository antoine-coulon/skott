import { SkottStructureWithMetadata } from "./skott.js";

export const graphDataWithCycles = {
  "src/server/main.js": {
    id: "src/server/main.js",
    adjacentTo: [],
    body: {
      size: 191,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/server/errors.ts": {
    id: "src/server/errors.ts",
    adjacentTo: ["src/server/settings.ts"],
    body: {
      size: 191,
      thirdPartyDependencies: ["@effect-ts/core"],
      builtinDependencies: ["node:fs"],
    },
  },
  "src/lib/fastify/index.ts": {
    id: "src/lib/fastify/index.ts",
    adjacentTo: ["src/server/errors.ts"],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/index.ts": {
    id: "src/index.ts",
    adjacentTo: ["src/server/errors.ts"],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/main.ts": {
    id: "src/main.ts",
    adjacentTo: ["src/entrypoint.ts"],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/entrypoint.ts": {
    id: "src/entrypoint.ts",
    adjacentTo: [],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/server/settings.ts": {
    id: "src/server/settings.ts",
    adjacentTo: ["src/lib/fastify/index.ts"],
    body: {
      size: 1380,
      thirdPartyDependencies: ["dotenv"],
      builtinDependencies: [],
    },
  },
  "src/core/index.ts": {
    id: "src/core/index.ts",
    adjacentTo: [],
    body: {
      size: 1380,
      thirdPartyDependencies: [
        "rxjs",
        "fastify",
        "@azure/keyvault-secrets",
        "@azure/identity",
        "@azure/core-http",
      ],
      builtinDependencies: [
        "node:child_process",
        "node:ffi",
        "node:path",
        "node:process",
        "node:module",
        "node:util",
        "node:fs",
        "node:os",
        "node:events",
        "node:stream",
        "node:net",
        "node:tls",
        "node:crypto",
        "node:assert",
        "node:zlib",
        "node:dns",
      ],
    },
  },
  "src/core/primary_adapters/index.ts": {
    id: "src/core/primary_adapters/index.ts",
    adjacentTo: [],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/core/secondary_adapters/index.ts": {
    id: "src/core/secondary_adapters/index.ts",
    adjacentTo: [],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
};

export const fakeCyclesData = [["a.js", "b.js", "c.js"]];

export const fakeSkottData: SkottStructureWithMetadata = {
  entrypoint: "src/lib/fastify/index.ts",
  files: Object.keys(graphDataWithCycles),
  graph: {
    ...graphDataWithCycles,
  },
};

export const fakeSkottData2: SkottStructureWithMetadata = {
  entrypoint: "src/lib/fastify/index.ts",
  files: Object.keys(graphDataWithCycles),
  graph: {
    ...graphDataWithCycles,
  },
};
