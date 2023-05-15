import url from 'node:url';
import { resolve } from 'pathe';
import { i as isNode } from './chunk-utils-env.860d90c2.js';

const rootDir = isNode ? resolve(url.fileURLToPath(import.meta.url), "../../") : import.meta.url;
const distDir = isNode ? resolve(url.fileURLToPath(import.meta.url), "../../dist") : import.meta.url;
const defaultPort = 51204;
const EXIT_CODE_RESTART = 43;
const API_PATH = "/__vitest_api__";
const configFiles = [
  "vitest.config.ts",
  "vitest.config.mts",
  "vitest.config.cts",
  "vitest.config.js",
  "vitest.config.mjs",
  "vitest.config.cjs",
  "vite.config.ts",
  "vite.config.mts",
  "vite.config.cts",
  "vite.config.js",
  "vite.config.mjs",
  "vite.config.cjs"
];
const globalApis = [
  "suite",
  "test",
  "describe",
  "it",
  "chai",
  "expect",
  "assert",
  "expectTypeOf",
  "assertType",
  "vitest",
  "vi",
  "beforeAll",
  "afterAll",
  "beforeEach",
  "afterEach"
];

export { API_PATH as A, EXIT_CODE_RESTART as E, defaultPort as a, configFiles as c, distDir as d, globalApis as g, rootDir as r };
