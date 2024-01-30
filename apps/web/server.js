import http from "node:http";

const skottGraphData = {
  "bin/cli.ts": {
    id: "bin/cli.ts",
    adjacentTo: ["src/modules/resolvers/base-resolver.ts", "bin/main.ts"],
    body: {
      size: 4811,
      thirdPartyDependencies: ["commander"],
      builtinDependencies: ["node:fs", "node:path", "node:url"],
    },
  },
  "src/modules/resolvers/base-resolver.ts": {
    id: "src/modules/resolvers/base-resolver.ts",
    adjacentTo: [
      "src/filesystem/file-reader.ts",
      "src/graph/node.ts",
      "src/logger.ts",
      "src/skott.ts",
      "src/modules/resolvers/ecmascript/resolver.ts",
    ],
    body: {
      size: 7698,
      thirdPartyDependencies: [
        "@effect/data",
        "@effect/io",
        "digraph-js",
        "io-ts",
      ],
      builtinDependencies: ["node:path"],
    },
  },
  "src/filesystem/file-reader.ts": {
    id: "src/filesystem/file-reader.ts",
    adjacentTo: ["src/modules/resolvers/base-resolver.ts"],
    body: {
      size: 3087,
      thirdPartyDependencies: ["@effect/data", "ignore-walk", "minimatch"],
      builtinDependencies: [
        "node:constants",
        "node:fs",
        "node:fs/promises",
        "node:path",
      ],
    },
  },
  "src/graph/node.ts": {
    id: "src/graph/node.ts",
    adjacentTo: [],
    body: {
      size: 241,
      thirdPartyDependencies: ["digraph-js"],
      builtinDependencies: [],
    },
  },
  "src/logger.ts": {
    id: "src/logger.ts",
    adjacentTo: [],
    body: {
      size: 1866,
      thirdPartyDependencies: ["@effect/data", "@effect/io", "kleur"],
      builtinDependencies: ["perf_hooks"],
    },
  },
  "src/skott.ts": {
    id: "src/skott.ts",
    adjacentTo: [
      "src/cache/index.ts",
      "src/filesystem/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/graph/node.ts",
      "src/graph/traversal.ts",
      "src/logger.ts",
      "src/modules/resolvers/base-resolver.ts",
      "src/modules/resolvers/ecmascript/resolver.ts",
      "src/modules/walkers/common.ts",
      "src/modules/walkers/ecmascript/typescript/path-alias.ts",
      "src/workspace/index.ts",
    ],
    body: {
      size: 17518,
      thirdPartyDependencies: [
        "@effect/data",
        "@effect/io",
        "digraph-js",
        "lodash-es",
      ],
      builtinDependencies: ["node:path"],
    },
  },
  "src/cache/index.ts": {
    id: "src/cache/index.ts",
    adjacentTo: ["src/cache/affected.ts", "src/cache/handler.ts"],
    body: {
      size: 161,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/cache/affected.ts": {
    id: "src/cache/affected.ts",
    adjacentTo: [],
    body: {
      size: 458,
      thirdPartyDependencies: [],
      builtinDependencies: ["node:crypto"],
    },
  },
  "src/cache/handler.ts": {
    id: "src/cache/handler.ts",
    adjacentTo: [
      "src/filesystem/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/graph/node.ts",
      "src/logger.ts",
      "src/skott.ts",
      "src/cache/affected.ts",
    ],
    body: {
      size: 5631,
      thirdPartyDependencies: [],
      builtinDependencies: ["node:path"],
    },
  },
  "src/filesystem/file-writer.ts": {
    id: "src/filesystem/file-writer.ts",
    adjacentTo: [],
    body: {
      size: 899,
      thirdPartyDependencies: ["memfs"],
      builtinDependencies: ["node:fs/promises", "node:path"],
    },
  },
  "src/graph/traversal.ts": {
    id: "src/graph/traversal.ts",
    adjacentTo: ["src/skott.ts", "src/graph/node.ts"],
    body: {
      size: 2623,
      thirdPartyDependencies: ["digraph-js"],
      builtinDependencies: [],
    },
  },
  "src/modules/resolvers/ecmascript/resolver.ts": {
    id: "src/modules/resolvers/ecmascript/resolver.ts",
    adjacentTo: [
      "src/filesystem/file-reader.ts",
      "src/logger.ts",
      "src/workspace/index.ts",
      "src/modules/walkers/ecmascript/typescript/path-alias.ts",
      "src/modules/resolvers/base-resolver.ts",
    ],
    body: {
      size: 8569,
      thirdPartyDependencies: ["@effect/data", "@effect/io"],
      builtinDependencies: ["node:module", "node:path"],
    },
  },
  "src/workspace/index.ts": {
    id: "src/workspace/index.ts",
    adjacentTo: ["src/filesystem/file-reader.ts", "src/logger.ts"],
    body: {
      size: 5908,
      thirdPartyDependencies: ["@effect/data", "@effect/io", "depcheck"],
      builtinDependencies: ["node:fs/promises", "node:path"],
    },
  },
  "src/modules/walkers/ecmascript/typescript/path-alias.ts": {
    id: "src/modules/walkers/ecmascript/typescript/path-alias.ts",
    adjacentTo: ["src/filesystem/file-reader.ts", "src/logger.ts"],
    body: {
      size: 8473,
      thirdPartyDependencies: ["@effect/data", "json5", "typescript"],
      builtinDependencies: ["node:module", "node:path"],
    },
  },
  "src/modules/walkers/common.ts": {
    id: "src/modules/walkers/common.ts",
    adjacentTo: [
      "src/logger.ts",
      "src/modules/resolvers/ecmascript/resolver.ts",
      "src/modules/walkers/ecmascript/index.ts",
    ],
    body: {
      size: 1076,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/modules/walkers/ecmascript/index.ts": {
    id: "src/modules/walkers/ecmascript/index.ts",
    adjacentTo: [
      "src/modules/walkers/ecmascript/javascript/walker.ts",
      "src/modules/walkers/ecmascript/typescript/walker.ts",
    ],
    body: {
      size: 130,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/modules/walkers/ecmascript/javascript/walker.ts": {
    id: "src/modules/walkers/ecmascript/javascript/walker.ts",
    adjacentTo: [
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/modules/walkers/ecmascript/module-declaration.ts",
    ],
    body: {
      size: 969,
      thirdPartyDependencies: ["estree-walker", "meriyah"],
      builtinDependencies: [],
    },
  },
  "src/modules/walkers/ecmascript/module-declaration.ts": {
    id: "src/modules/walkers/ecmascript/module-declaration.ts",
    adjacentTo: ["src/modules/walkers/ecmascript/javascript/cjs.ts"],
    body: {
      size: 2258,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/modules/walkers/ecmascript/javascript/cjs.ts": {
    id: "src/modules/walkers/ecmascript/javascript/cjs.ts",
    adjacentTo: [],
    body: {
      size: 404,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/modules/walkers/ecmascript/typescript/walker.ts": {
    id: "src/modules/walkers/ecmascript/typescript/walker.ts",
    adjacentTo: [
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/modules/walkers/ecmascript/module-declaration.ts",
    ],
    body: {
      size: 1635,
      thirdPartyDependencies: [
        "@effect/data",
        "@effect/io",
        "@typescript-eslint/typescript-estree",
        "estree-walker",
      ],
      builtinDependencies: [],
    },
  },
  "bin/main.ts": {
    id: "bin/main.ts",
    adjacentTo: [
      "index.ts",
      "src/graph/node.ts",
      "src/modules/resolvers/base-resolver.ts",
      "src/modules/resolvers/ecmascript/resolver.ts",
      "src/skott.ts",
      "bin/ui/console.ts",
      "bin/ui/webapp.ts",
    ],
    body: {
      size: 9636,
      thirdPartyDependencies: ["fs-tree-structure", "kleur", "ora"],
      builtinDependencies: ["node:module", "node:path", "node:perf_hooks"],
    },
  },
  "index.ts": {
    id: "index.ts",
    adjacentTo: [
      "src/config.ts",
      "src/filesystem/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
    ],
    body: {
      size: 1809,
      thirdPartyDependencies: ["@effect/data"],
      builtinDependencies: [],
    },
  },
  "src/config.ts": {
    id: "src/config.ts",
    adjacentTo: ["src/modules/resolvers/base-resolver.ts", "src/skott.ts"],
    body: {
      size: 1962,
      thirdPartyDependencies: ["@effect/data", "fp-ts", "io-ts"],
      builtinDependencies: [],
    },
  },
  "bin/ui/console.ts": {
    id: "bin/ui/console.ts",
    adjacentTo: ["src/graph/node.ts", "src/skott.ts"],
    body: {
      size: 7895,
      thirdPartyDependencies: ["fs-tree-structure", "kleur"],
      builtinDependencies: ["node:path", "node:perf_hooks"],
    },
  },
  "bin/ui/webapp.ts": {
    id: "bin/ui/webapp.ts",
    adjacentTo: ["src/skott.ts"],
    body: {
      size: 2945,
      thirdPartyDependencies: [
        "compression",
        "kleur",
        "openurl",
        "polka",
        "sirv",
        "skott-webapp",
      ],
      builtinDependencies: ["node:http"],
    },
  },
  "examples/dependency-resolver-basic.ts": {
    id: "examples/dependency-resolver-basic.ts",
    adjacentTo: ["index.ts", "src/modules/resolvers/base-resolver.ts"],
    body: {
      size: 877,
      thirdPartyDependencies: ["@effect/io"],
      builtinDependencies: [],
    },
  },
  "examples/dependency-resolver-with-custom-body.ts": {
    id: "examples/dependency-resolver-with-custom-body.ts",
    adjacentTo: [
      "index.ts",
      "src/modules/resolvers/base-resolver.ts",
      "src/modules/resolvers/ecmascript/resolver.ts",
    ],
    body: {
      size: 1882,
      thirdPartyDependencies: [],
      builtinDependencies: ["async_hooks"],
    },
  },
  "meek.js": {
    id: "meek.js",
    adjacentTo: ["dist/index.js"],
    body: {
      size: 296,
      thirdPartyDependencies: [],
      builtinDependencies: ["fs"],
    },
  },
  "dist/index.js": {
    id: "dist/index.js",
    adjacentTo: [
      "dist/src/config.js",
      "dist/src/filesystem/file-reader.js",
      "dist/src/filesystem/file-writer.js",
      "dist/src/logger.js",
      "dist/src/modules/walkers/common.js",
      "dist/src/skott.js",
    ],
    body: {
      size: 1558,
      thirdPartyDependencies: ["@effect/data"],
      builtinDependencies: [],
    },
  },
  "dist/src/config.js": {
    id: "dist/src/config.js",
    adjacentTo: [
      "dist/src/modules/resolvers/base-resolver.js",
      "dist/src/skott.js",
    ],
    body: {
      size: 1891,
      thirdPartyDependencies: ["@effect/data", "fp-ts", "io-ts"],
      builtinDependencies: [],
    },
  },
  "dist/src/modules/resolvers/base-resolver.js": {
    id: "dist/src/modules/resolvers/base-resolver.js",
    adjacentTo: [
      "dist/src/filesystem/file-reader.js",
      "dist/src/logger.js",
      "dist/src/modules/resolvers/ecmascript/resolver.js",
    ],
    body: {
      size: 6078,
      thirdPartyDependencies: ["@effect/data", "@effect/io", "io-ts"],
      builtinDependencies: ["node:path"],
    },
  },
  "dist/src/filesystem/file-reader.js": {
    id: "dist/src/filesystem/file-reader.js",
    adjacentTo: ["dist/src/modules/resolvers/base-resolver.js"],
    body: {
      size: 2626,
      thirdPartyDependencies: ["@effect/data", "ignore-walk", "minimatch"],
      builtinDependencies: [
        "node:constants",
        "node:fs",
        "node:fs/promises",
        "node:path",
      ],
    },
  },
  "dist/src/logger.js": {
    id: "dist/src/logger.js",
    adjacentTo: [],
    body: {
      size: 1593,
      thirdPartyDependencies: ["@effect/data", "@effect/io", "kleur"],
      builtinDependencies: ["perf_hooks"],
    },
  },
  "dist/src/modules/resolvers/ecmascript/resolver.js": {
    id: "dist/src/modules/resolvers/ecmascript/resolver.js",
    adjacentTo: [
      "dist/src/filesystem/file-reader.js",
      "dist/src/logger.js",
      "dist/src/modules/walkers/ecmascript/typescript/path-alias.js",
      "dist/src/modules/resolvers/base-resolver.js",
    ],
    body: {
      size: 8112,
      thirdPartyDependencies: ["@effect/data", "@effect/io"],
      builtinDependencies: ["node:module", "node:path"],
    },
  },
  "dist/src/modules/walkers/ecmascript/typescript/path-alias.js": {
    id: "dist/src/modules/walkers/ecmascript/typescript/path-alias.js",
    adjacentTo: [],
    body: {
      size: 7853,
      thirdPartyDependencies: ["@effect/data", "json5"],
      builtinDependencies: ["node:module", "node:path"],
    },
  },
  "dist/src/skott.js": {
    id: "dist/src/skott.js",
    adjacentTo: [
      "dist/src/cache/index.js",
      "dist/src/filesystem/file-reader.js",
      "dist/src/graph/traversal.js",
      "dist/src/logger.js",
      "dist/src/modules/resolvers/base-resolver.js",
      "dist/src/modules/resolvers/ecmascript/resolver.js",
      "dist/src/modules/walkers/ecmascript/typescript/path-alias.js",
      "dist/src/workspace/index.js",
    ],
    body: {
      size: 18423,
      thirdPartyDependencies: [
        "@effect/data",
        "@effect/io",
        "digraph-js",
        "lodash-es",
      ],
      builtinDependencies: ["node:path"],
    },
  },
  "dist/src/cache/index.js": {
    id: "dist/src/cache/index.js",
    adjacentTo: ["dist/src/cache/affected.js", "dist/src/cache/handler.js"],
    body: {
      size: 176,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "dist/src/cache/affected.js": {
    id: "dist/src/cache/affected.js",
    adjacentTo: [],
    body: {
      size: 425,
      thirdPartyDependencies: [],
      builtinDependencies: ["node:crypto"],
    },
  },
  "dist/src/cache/handler.js": {
    id: "dist/src/cache/handler.js",
    adjacentTo: ["dist/src/cache/affected.js"],
    body: {
      size: 7005,
      thirdPartyDependencies: [],
      builtinDependencies: ["node:path"],
    },
  },
  "dist/src/graph/traversal.js": {
    id: "dist/src/graph/traversal.js",
    adjacentTo: [],
    body: {
      size: 1989,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "dist/src/workspace/index.js": {
    id: "dist/src/workspace/index.js",
    adjacentTo: ["dist/src/filesystem/file-reader.js"],
    body: {
      size: 5168,
      thirdPartyDependencies: ["@effect/data", "@effect/io", "depcheck"],
      builtinDependencies: ["node:fs/promises", "node:path"],
    },
  },
  "dist/src/filesystem/file-writer.js": {
    id: "dist/src/filesystem/file-writer.js",
    adjacentTo: [],
    body: {
      size: 800,
      thirdPartyDependencies: ["memfs"],
      builtinDependencies: ["node:fs/promises", "node:path"],
    },
  },
  "dist/src/modules/walkers/common.js": {
    id: "dist/src/modules/walkers/common.js",
    adjacentTo: [
      "dist/src/modules/resolvers/ecmascript/resolver.js",
      "dist/src/modules/walkers/ecmascript/index.js",
    ],
    body: {
      size: 1589,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "dist/src/modules/walkers/ecmascript/index.js": {
    id: "dist/src/modules/walkers/ecmascript/index.js",
    adjacentTo: [
      "dist/src/modules/walkers/ecmascript/javascript/walker.js",
      "dist/src/modules/walkers/ecmascript/typescript/walker.js",
    ],
    body: {
      size: 163,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "dist/src/modules/walkers/ecmascript/javascript/walker.js": {
    id: "dist/src/modules/walkers/ecmascript/javascript/walker.js",
    adjacentTo: [
      "dist/src/logger.js",
      "dist/src/modules/walkers/ecmascript/module-declaration.js",
    ],
    body: {
      size: 933,
      thirdPartyDependencies: ["estree-walker", "meriyah"],
      builtinDependencies: [],
    },
  },
  "dist/src/modules/walkers/ecmascript/module-declaration.js": {
    id: "dist/src/modules/walkers/ecmascript/module-declaration.js",
    adjacentTo: ["dist/src/modules/walkers/ecmascript/javascript/cjs.js"],
    body: {
      size: 2380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "dist/src/modules/walkers/ecmascript/javascript/cjs.js": {
    id: "dist/src/modules/walkers/ecmascript/javascript/cjs.js",
    adjacentTo: [],
    body: {
      size: 426,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "dist/src/modules/walkers/ecmascript/typescript/walker.js": {
    id: "dist/src/modules/walkers/ecmascript/typescript/walker.js",
    adjacentTo: [
      "dist/src/logger.js",
      "dist/src/modules/walkers/ecmascript/module-declaration.js",
    ],
    body: {
      size: 1445,
      thirdPartyDependencies: [
        "@effect/data",
        "@effect/io",
        "@typescript-eslint/typescript-estree",
        "estree-walker",
      ],
      builtinDependencies: [],
    },
  },
  "src/filesystem/fake/file-reader.ts": {
    id: "src/filesystem/fake/file-reader.ts",
    adjacentTo: [
      "src/modules/resolvers/base-resolver.ts",
      "src/filesystem/file-reader.ts",
    ],
    body: {
      size: 2108,
      thirdPartyDependencies: ["memfs", "minimatch"],
      builtinDependencies: ["node:path"],
    },
  },
  "test/integration/api.spec.ts": {
    id: "test/integration/api.spec.ts",
    adjacentTo: [
      "index.ts",
      "src/filesystem/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
      "test/integration/create-fs-sandbox.ts",
    ],
    body: {
      size: 10014,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/integration/create-fs-sandbox.ts": {
    id: "test/integration/create-fs-sandbox.ts",
    adjacentTo: [],
    body: {
      size: 1035,
      thirdPartyDependencies: [],
      builtinDependencies: ["node:fs/promises", "node:path"],
    },
  },
  "test/integration/ecmascript/typescript.spec.ts": {
    id: "test/integration/ecmascript/typescript.spec.ts",
    adjacentTo: [
      "src/filesystem/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
      "test/unit/shared.ts",
      "test/integration/create-fs-sandbox.ts",
    ],
    body: {
      size: 3901,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/shared.ts": {
    id: "test/unit/shared.ts",
    adjacentTo: [
      "src/filesystem/fake/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/graph/node.ts",
      "src/logger.ts",
      "src/modules/resolvers/base-resolver.ts",
      "src/modules/resolvers/ecmascript/resolver.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
    ],
    body: {
      size: 2767,
      thirdPartyDependencies: ["memfs"],
      builtinDependencies: [],
    },
  },
  "test/integration/workspace.spec.ts": {
    id: "test/integration/workspace.spec.ts",
    adjacentTo: [
      "src/filesystem/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
      "test/integration/create-fs-sandbox.ts",
    ],
    body: {
      size: 3181,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/ecmascript/agnostic.spec.ts": {
    id: "test/unit/ecmascript/agnostic.spec.ts",
    adjacentTo: [
      "src/modules/resolvers/base-resolver.ts",
      "test/unit/shared.ts",
    ],
    body: {
      size: 17827,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/ecmascript/graph.spec.ts": {
    id: "test/unit/ecmascript/graph.spec.ts",
    adjacentTo: [
      "src/filesystem/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/graph/node.ts",
      "src/graph/traversal.ts",
      "src/logger.ts",
      "src/modules/resolvers/ecmascript/resolver.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
      "test/unit/shared.ts",
    ],
    body: {
      size: 13242,
      thirdPartyDependencies: ["memfs", "vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/ecmascript/javascript.spec.ts": {
    id: "test/unit/ecmascript/javascript.spec.ts",
    adjacentTo: ["test/unit/shared.ts", "test/unit/ecmascript/jsx-and-tsx.ts"],
    body: {
      size: 24981,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/ecmascript/jsx-and-tsx.ts": {
    id: "test/unit/ecmascript/jsx-and-tsx.ts",
    adjacentTo: ["test/unit/shared.ts"],
    body: {
      size: 7694,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/ecmascript/typescript.spec.ts": {
    id: "test/unit/ecmascript/typescript.spec.ts",
    adjacentTo: ["test/unit/shared.ts", "test/unit/ecmascript/jsx-and-tsx.ts"],
    body: {
      size: 44044,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/ecmascript/unused.spec.ts": {
    id: "test/unit/ecmascript/unused.spec.ts",
    adjacentTo: [
      "src/filesystem/fake/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
      "test/unit/shared.ts",
    ],
    body: {
      size: 14953,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/incremental/index.spec.ts": {
    id: "test/unit/incremental/index.spec.ts",
    adjacentTo: [
      "src/cache/affected.ts",
      "src/cache/handler.ts",
      "src/filesystem/fake/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/modules/walkers/ecmascript/index.ts",
      "src/skott.ts",
      "test/unit/shared.ts",
    ],
    body: {
      size: 26143,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/plugins/custom-resolver.spec.ts": {
    id: "test/unit/plugins/custom-resolver.spec.ts",
    adjacentTo: [
      "src/filesystem/fake/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/logger.ts",
      "src/modules/resolvers/base-resolver.ts",
      "src/modules/resolvers/ecmascript/resolver.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
      "test/unit/shared.ts",
    ],
    body: {
      size: 7228,
      thirdPartyDependencies: ["@effect/data", "vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/runner.spec.ts": {
    id: "test/unit/runner.spec.ts",
    adjacentTo: [
      "src/filesystem/fake/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
      "test/unit/shared.ts",
    ],
    body: {
      size: 8857,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/traversal.spec.ts": {
    id: "test/unit/traversal.spec.ts",
    adjacentTo: [
      "src/filesystem/fake/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/graph/traversal.ts",
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
      "test/unit/shared.ts",
    ],
    body: {
      size: 7016,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/unit/workspace.spec.ts": {
    id: "test/unit/workspace.spec.ts",
    adjacentTo: [
      "src/filesystem/fake/file-reader.ts",
      "src/filesystem/file-writer.ts",
      "src/logger.ts",
      "src/modules/walkers/common.ts",
      "src/skott.ts",
      "test/unit/shared.ts",
    ],
    body: {
      size: 4205,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/vitest.config.js": {
    id: "test/vitest.config.js",
    adjacentTo: [],
    body: {
      size: 127,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/vitest.integration.js": {
    id: "test/vitest.integration.js",
    adjacentTo: [],
    body: {
      size: 206,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
  "test/vitest.unit.js": {
    id: "test/vitest.unit.js",
    adjacentTo: [],
    body: {
      size: 161,
      thirdPartyDependencies: ["vitest"],
      builtinDependencies: [],
    },
  },
};

const fakeSkottData = {
  entrypoint: "index.ts",
  files: Object.keys(skottGraphData),
  graph: {
    ...skottGraphData,
  },
};

const fakeSkottCyclesData = [
  ["src/modules/resolvers/base-resolver.ts", "src/filesystem/file-reader.ts"],
  [
    "src/modules/resolvers/base-resolver.ts",
    "src/skott.ts",
    "src/cache/index.ts",
    "src/cache/handler.ts",
    "src/filesystem/file-reader.ts",
  ],
  [
    "src/modules/resolvers/base-resolver.ts",
    "src/modules/resolvers/ecmascript/resolver.ts",
    "src/filesystem/file-reader.ts",
  ],
  [
    "src/skott.ts",
    "src/filesystem/file-reader.ts",
    "src/modules/resolvers/base-resolver.ts",
  ],
  ["src/skott.ts", "src/graph/traversal.ts"],
  ["src/skott.ts", "src/modules/resolvers/base-resolver.ts"],
  [
    "src/skott.ts",
    "src/modules/resolvers/ecmascript/resolver.ts",
    "src/filesystem/file-reader.ts",
    "src/modules/resolvers/base-resolver.ts",
  ],
  [
    "src/skott.ts",
    "src/modules/walkers/common.ts",
    "src/modules/resolvers/ecmascript/resolver.ts",
    "src/filesystem/file-reader.ts",
    "src/modules/resolvers/base-resolver.ts",
  ],
  [
    "src/skott.ts",
    "src/modules/walkers/ecmascript/typescript/path-alias.ts",
    "src/filesystem/file-reader.ts",
    "src/modules/resolvers/base-resolver.ts",
  ],
  [
    "src/skott.ts",
    "src/workspace/index.ts",
    "src/filesystem/file-reader.ts",
    "src/modules/resolvers/base-resolver.ts",
  ],
  ["src/cache/handler.ts", "src/skott.ts", "src/cache/index.ts"],
  [
    "src/modules/resolvers/ecmascript/resolver.ts",
    "src/workspace/index.ts",
    "src/filesystem/file-reader.ts",
    "src/modules/resolvers/base-resolver.ts",
    "src/skott.ts",
  ],
  [
    "src/modules/resolvers/ecmascript/resolver.ts",
    "src/modules/walkers/ecmascript/typescript/path-alias.ts",
    "src/filesystem/file-reader.ts",
    "src/modules/resolvers/base-resolver.ts",
    "src/skott.ts",
  ],
  [
    "src/modules/resolvers/ecmascript/resolver.ts",
    "src/modules/resolvers/base-resolver.ts",
    "src/skott.ts",
  ],
  [
    "src/modules/walkers/common.ts",
    "src/modules/walkers/ecmascript/index.ts",
    "src/modules/walkers/ecmascript/javascript/walker.ts",
  ],
  [
    "src/modules/walkers/ecmascript/index.ts",
    "src/modules/walkers/ecmascript/typescript/walker.ts",
    "src/modules/walkers/common.ts",
  ],
  [
    "dist/src/modules/resolvers/base-resolver.js",
    "dist/src/filesystem/file-reader.js",
  ],
  [
    "dist/src/modules/resolvers/base-resolver.js",
    "dist/src/modules/resolvers/ecmascript/resolver.js",
    "dist/src/filesystem/file-reader.js",
  ],
  [
    "dist/src/modules/resolvers/ecmascript/resolver.js",
    "dist/src/modules/resolvers/base-resolver.js",
  ],
];

const routes = {
  "/cycles": {
    data: fakeSkottCyclesData,
  },
  "/analysis": {
    data: fakeSkottData,
  },
};

const endpoints = Object.keys(routes);

const server = http.createServer((req, res) => {
  const pathWithoutPrefix = req.url.split("/api")[1];

  if (endpoints.includes(pathWithoutPrefix)) {
    res.write(JSON.stringify(routes[pathWithoutPrefix].data));
  }

  return res.end();
});

process.on("SIGINT", () => {
  server.close();
});

server.listen(3333);
