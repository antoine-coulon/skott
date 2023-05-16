import path from "node:path";

import { pipe } from "@effect/data/Function";
import * as Option from "@effect/data/Option";
import * as Effect from "@effect/io/Effect";
import { DiGraph } from "digraph-js";
import * as D from "io-ts/lib/Decoder.js";

import { FileReader, FileReaderTag } from "../../filesystem/file-reader.js";
import { Logger, LoggerTag, highlight } from "../../logger.js";
import type {
  SkottConfig,
  SkottNode,
  WorkspaceConfiguration
} from "../../skott.js";

import {
  isMinifiedFile,
  isTestFile,
  isTypeScriptDeclarationFile
} from "./ecmascript/resolver.js";

export interface FollowModuleDeclarationOptions {
  rootPath: string;
  moduleDeclaration: string;
  isPathAliasDeclaration?: boolean;
  pathAliasBaseUrl?: string;
}

export interface DependencyResolverOptions<T = unknown> {
  moduleDeclaration: string;
  projectGraph: DiGraph<SkottNode<T>>;
  config: SkottConfig<T>;
  rawNodePath: string;
  resolvedNodePath: string;
  workspaceConfiguration: WorkspaceConfiguration;
  logger: Logger;
  followModuleDeclaration: (
    args: FollowModuleDeclarationOptions
  ) => Promise<boolean>;
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
  return Option.none();
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

export const defaultIgnoredDirs = new Set([
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

export function isDirSupportedByDefault(directoryName: string): boolean {
  return !defaultIgnoredDirs.has(directoryName);
}

function isExistingModule(
  module: string
): Effect.Effect<FileReader, never, boolean> {
  return pipe(
    Effect.service(FileReaderTag),
    Effect.flatMap((fileReader) =>
      pipe(
        Effect.tryPromise(() => fileReader.read(module)),
        Effect.map(() => true)
      )
    ),
    Effect.orElse(() => Effect.succeed(false))
  );
}

/**
 * A module is considered existing when the module name can be resolved to a
 * readable file.
 */
function resolveToModuleIfExists(moduleName: string) {
  return pipe(
    Effect.service(FileReaderTag),
    Effect.zip(Effect.service(LoggerTag)),
    Effect.flatMap(([fileReader, logger]) =>
      pipe(
        Effect.tryPromise(() => fileReader.read(moduleName)),
        Effect.tapBoth(
          () =>
            Effect.sync(() => {
              logger.failure(`Failed to resolve ${highlight(moduleName)}`);
            }),
          () =>
            Effect.sync(() => {
              logger.success(`Successfully resolved ${highlight(moduleName)}`);
            })
        ),
        Effect.map(() => moduleName)
      )
    )
  );
}

class ModuleNotFoundError {
  readonly _tag = "ModuleNotFoundError";
  constructor(private readonly message: string) {}
}

export function resolveImportedModulePath(
  module: string
): Effect.Effect<FileReader | Logger, ModuleNotFoundError, string> {
  return pipe(
    Effect.service(LoggerTag),
    Effect.tap((logger) =>
      Effect.sync(() =>
        logger.info(`Start resolution for ${highlight(module)}`)
      )
    ),
    Effect.zip(isExistingModule(module)),
    Effect.flatMap(([logger, moduleExists]) => {
      /**
       * If the module name can directly be resolved, we have nothing to do.
       * Note: If the module is supported and it appears that `moduleExists` is false, it
       * might be the case where TypeScript is used with ECMAScript modules.
       */
      if (isFileSupportedByDefault(module) && moduleExists) {
        return pipe(
          Effect.succeed(module),
          Effect.tap((module) =>
            Effect.sync(() =>
              logger.success(`Succesfully resolved ${highlight(module)}`)
            )
          )
        );
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
         * Otherwise, it might be a simple JSX module.
         * Example: `require("./component")` will resolve to `./component.jsx`.
         */
        JSX_MODULE: module.concat(".jsx"),
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
         * Otherwise, it might be a simple TSX module.
         * Example: `require("./component")` will resolve to `./component.tsx`.
         */
        TSX_MODULE: module.concat(".tsx"),
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
        Effect.orElse(() =>
          resolveToModuleIfExists(ecmaScriptModuleCombinations.JS_MODULE)
        ),
        Effect.orElse(() =>
          resolveToModuleIfExists(ecmaScriptModuleCombinations.TSX_MODULE)
        ),
        Effect.orElse(() =>
          resolveToModuleIfExists(ecmaScriptModuleCombinations.JSX_MODULE)
        ),
        Effect.orElse(() =>
          resolveToModuleIfExists(ecmaScriptModuleCombinations.JS_INDEX_MODULE)
        )
      );
    }),
    Effect.mapError(
      () =>
        new ModuleNotFoundError(
          `Module declaration "${module}" could not be resolved`
        )
    )
  );
}
