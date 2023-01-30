import path from "node:path";

import { DiGraph } from "digraph-js";
import { Effect, Option, pipe } from "effect";
import * as D from "io-ts/lib/Decoder.js";

import { FileReader, FileReaderTag } from "../../filesystem/file-reader.js";
import type { SkottConfig, SkottNode } from "../../skott.js";

import {
  isMinifiedFile,
  isTestFile,
  isTypeScriptDeclarationFile
} from "./ecmascript/resolver.js";

export interface FollowModuleDeclarationOptions {
  rootPath: string;
  moduleDeclaration: string;
  isPathAliasDeclaration?: boolean;
}

export interface DependencyResolverOptions<T = unknown> {
  moduleDeclaration: string;
  projectGraph: DiGraph<SkottNode<T>>;
  config: SkottConfig<T>;
  rawNodePath: string;
  resolvedNodePath: string;
  followModuleDeclaration: (
    args: FollowModuleDeclarationOptions
  ) => Promise<void>;
}

export type DependencyResolverControlFlow = Option.Option<{
  exitOnResolve: boolean;
}>;

export interface DependencyResolver<T = unknown> {
  resolve(
    options: DependencyResolverOptions<T>
  ): Promise<DependencyResolverControlFlow>;
}

export function dependencyResolverDecoder<T>(): D.Decoder<
  unknown,
  DependencyResolver<T>
> {
  return {
    decode: (v) =>
      v &&
      typeof v === "object" &&
      "resolve" in v &&
      typeof v.resolve === "function"
        ? D.success(v as unknown as DependencyResolver<T>)
        : D.failure(v, "DependencyResolver")
  };
}

export function skipNextResolvers(): Option.Option<{
  exitOnResolve: boolean;
}> {
  return Option.some({
    exitOnResolve: true
  });
}

export function continueResolution(): Option.Option<never> {
  return Option.none;
}

export const kExpectedModuleExtensions = new Set([
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx"
]);

export function isFileSupportedByDefault(fileName: string): boolean {
  return (
    kExpectedModuleExtensions.has(path.extname(fileName)) &&
    !isTypeScriptDeclarationFile(fileName) &&
    !isTestFile(fileName) &&
    !isMinifiedFile(fileName)
  );
}

// TODO: Merge with .gitignore
export function isDirSupportedByDefault(directoryName: string): boolean {
  const directoriesThatShouldBeIgnored = new Set([
    "node_modules",
    "dist",
    "build",
    "coverage",
    "docs",
    "examples",
    "test",
    "__tests__",
    "temp"
  ]);

  return !directoriesThatShouldBeIgnored.has(directoryName);
}

async function isExistingModule(
  module: string,
  fileReader: FileReader
): Promise<boolean> {
  try {
    await fileReader.read(module);

    return true;
  } catch {
    return false;
  }
}

/**
 * A module is considered existing when the module name can be resolved to a
 * readable file.
 */
function resolveToModuleIfExists(moduleName: string) {
  return pipe(
    Effect.service(FileReaderTag),
    Effect.flatMap((fileReader) =>
      Effect.tryPromise(() => fileReader.read(moduleName))
    ),
    Effect.map(() => moduleName)
  );
}

export async function resolveImportedModulePath(
  module: string,
  fileReader: FileReader
): Promise<string> {
  const moduleExists = await isExistingModule(module, fileReader);
  /**
   * If the module name can directly be resolved, we have nothing to do.
   * Note: If the module is supported and it appears that `moduleExists` is false, it
   * might be the case where TypeScript is used with ECMAScript modules.
   */
  if (isFileSupportedByDefault(module) && moduleExists) {
    return module;
  }

  const ecmaScriptModuleCombinations = {
    /**
     * In case of CommonJS modules, the module can be targetted through a directory
     * import e.g: require("./lib") which will eventually resolve to "lib/index.js".
     */
    JS_INDEX_MODULE: path.join(module, "index.js"),
    /**
     * Otherwise, it might be a simple JavaScript module.
     * Example: `require("./lib")` will resolve to `./lib.js`.
     */
    JS_MODULE: module.concat(".js"),
    /**
     * In case of TypeScript modules, the module can be targetted through a directory
     * import e.g: import "./lib" which will eventually resolve to "lib/index.ts".
     */
    TS_INDEX_MODULE: path.join(module, "index.ts"),
    /**
     * TypeScript file targetted, with classic TypeScript module declarations.
     */
    TS_MODULE: module.concat(".ts"),
    /**
     * In case of TypeScript modules but when targetting ECMAScript modules,
     * modules are suffixed with ".js" but should resolve to their corresponding
     * ".ts" file.
     */
    TS_MODULE_WITH_JS_EXTENSION: module
      .split(path.extname(module))[0]
      .concat(".ts")
  };

  return pipe(
    resolveToModuleIfExists(ecmaScriptModuleCombinations.JS_INDEX_MODULE),
    Effect.orElse(() =>
      resolveToModuleIfExists(ecmaScriptModuleCombinations.TS_MODULE)
    ),
    Effect.orElse(() =>
      resolveToModuleIfExists(ecmaScriptModuleCombinations.TS_INDEX_MODULE)
    ),
    Effect.orElse(() =>
      resolveToModuleIfExists(
        ecmaScriptModuleCombinations.TS_MODULE_WITH_JS_EXTENSION
      )
    ),
    Effect.orElseSucceed(() => ecmaScriptModuleCombinations.JS_MODULE),
    Effect.provideService(FileReaderTag)(fileReader),
    Effect.unsafeRunPromise
  );
}
