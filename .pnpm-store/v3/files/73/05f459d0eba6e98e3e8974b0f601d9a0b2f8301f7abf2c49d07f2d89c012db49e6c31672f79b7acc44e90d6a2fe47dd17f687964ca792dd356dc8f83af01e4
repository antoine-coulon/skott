'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var stdEnv = require('std-env');

var _a;
typeof process < "u" && typeof process.stdout < "u" && !((_a = process.versions) == null ? void 0 : _a.deno) && !globalThis.window;

const defaultInclude = ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"];
const defaultExclude = ["**/node_modules/**", "**/dist/**", "**/cypress/**", "**/.{idea,git,cache,output,temp}/**", "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*"];
const defaultCoverageExcludes = [
  "coverage/**",
  "dist/**",
  "packages/*/test{,s}/**",
  "**/*.d.ts",
  "cypress/**",
  "test{,s}/**",
  "test{,-*}.{js,cjs,mjs,ts,tsx,jsx}",
  "**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}",
  "**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}",
  "**/__tests__/**",
  "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
  "**/.{eslint,mocha,prettier}rc.{js,cjs,yml}"
];
const coverageConfigDefaults = {
  provider: "c8",
  enabled: false,
  clean: true,
  cleanOnRerun: true,
  reportsDirectory: "./coverage",
  exclude: defaultCoverageExcludes,
  reporter: ["text", "html", "clover", "json"],
  extension: [".js", ".cjs", ".mjs", ".ts", ".mts", ".cts", ".tsx", ".jsx", ".vue", ".svelte"]
};
const fakeTimersDefaults = {
  loopLimit: 1e4,
  shouldClearNativeTimers: true,
  toFake: [
    "setTimeout",
    "clearTimeout",
    "setInterval",
    "clearInterval",
    "setImmediate",
    "clearImmediate",
    "Date"
  ]
};
const config = {
  allowOnly: !stdEnv.isCI,
  watch: !stdEnv.isCI,
  globals: false,
  environment: "node",
  threads: true,
  clearMocks: false,
  restoreMocks: false,
  mockReset: false,
  include: defaultInclude,
  exclude: defaultExclude,
  testTimeout: 5e3,
  hookTimeout: 1e4,
  teardownTimeout: 1e4,
  isolate: true,
  watchExclude: ["**/node_modules/**", "**/dist/**"],
  forceRerunTriggers: [
    "**/package.json/**",
    "**/{vitest,vite}.config.*/**"
  ],
  update: false,
  reporters: [],
  silent: false,
  api: false,
  ui: false,
  uiBase: "/__vitest__/",
  open: true,
  css: {
    include: []
  },
  coverage: coverageConfigDefaults,
  fakeTimers: fakeTimersDefaults,
  maxConcurrency: 5,
  dangerouslyIgnoreUnhandledErrors: false,
  typecheck: {
    checker: "tsc",
    include: ["**/*.{test,spec}-d.{ts,js}"],
    exclude: defaultExclude
  },
  slowTestThreshold: 300
};
const configDefaults = Object.freeze(config);

function defineConfig(config) {
  return config;
}

exports.configDefaults = configDefaults;
exports.coverageConfigDefaults = coverageConfigDefaults;
exports.defaultExclude = defaultExclude;
exports.defaultInclude = defaultInclude;
exports.defineConfig = defineConfig;
