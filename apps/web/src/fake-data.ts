import { SkottStructureWithCycles } from "./skott";

export const graphDataWithCycles = {
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
      thirdPartyDependencies: [],
      builtinDependencies: [],
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

export const fakeCyclesData = [
  [
    "src/server/settings.ts",
    "src/lib/fastify/index.ts",
    "src/server/errors.ts",
  ],
];

export const fakeSkottData: SkottStructureWithCycles = {
  cycles: [],
  entrypoint: "src/lib/fastify/index.ts",
  files: Object.keys(graphDataWithCycles),
  graph: {
    ...graphDataWithCycles,
  },
};
