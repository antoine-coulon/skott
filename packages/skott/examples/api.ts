/* eslint-disable @typescript-eslint/no-unused-vars */

import skott from "../index.js";
import { EcmaScriptDependencyResolver } from "../src/modules/resolvers/ecmascript/resolver.js";

async function showcase() {
  const api = await skott({
    entrypoint: "./dependency-resolver-basic.ts",
    dependencyResolvers: [new EcmaScriptDependencyResolver()],
    circularMaxDepth: 10,
    cwd: process.cwd(),
    dependencyTracking: {
      builtin: true,
      thirdParty: true,
      typeOnly: true
    },
    fileExtensions: [".ts", ".tsx", ".js", ".jsx"],
    ignorePattern: "",
    includeBaseDir: false,
    incremental: false,
    manifestPath: "package.json",
    tsConfigPath: "tsconfig.json",
    verbose: false
  });

  const { getStructure, getWorkspace, useGraph, findUnusedDependencies } = api;

  /**
   * Access the raw structure of the project including the graph and the files
   * composing the project.
   */
  const { files, graph } = getStructure();

  /**
   * Access the current workspace information, each project is keyed by its manifest
   * name and contains the list of its dependencies (prod/devDeps/peerDeps).
   *
   * Example of a subset of the skott monorepo workspace:
   *
   * {
   *    "skott": {
   *       "dependencies": {
   *         "digraph-js": "^2.2.3"
   *       },
   *       "devDependencies": {...},
   *       "peerDependencies": {...}
   *    },
   *    "fs-tree-structure": {
   *       "dependencies": {...},
   *       "devDependencies": {...},
   *       "peerDependencies": {...}
   *    }
   * }
   */
  const workspace = getWorkspace();

  /**
   * Graph API allowing to leverage the graph structure to perform operations
   * on it such as finding circular dependencies, leaves, search for parent
   * dependencies, etc.
   */
  const {
    collectFilesDependencies,
    collectFilesDependingOn,
    findCircularDependencies,
    findLeaves,
    hasCircularDependencies,
    traverseFiles
  } = useGraph();

  /**
   * Find unused dependencies in the project.
   */
  const unusedDependencies = findUnusedDependencies();
}
