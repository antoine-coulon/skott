import { builtinModules } from "node:module";
import path from "node:path";

import { Effect, pipe } from "effect";

import { FileReader, FileReaderTag } from "../../../filesystem/file-reader.js";

const NODE_PROTOCOL = "node:";

export function isBuiltinModule(module: string): boolean {
  // fs, path, etc
  if (builtinModules.includes(module)) {
    return true;
  }

  // node:fs
  if (module.startsWith("node:")) {
    const moduleName = module.slice(NODE_PROTOCOL.length);

    // node:fs/promises
    if (module.includes("/")) {
      return isBuiltinModule(moduleName);
    }

    return builtinModules.includes(moduleName);
  } else if (module.includes("/")) {
    const [moduleName] = module.split("/");

    return builtinModules.includes(moduleName);
  }

  return false;
}

export function isThirdPartyModule(module: string): boolean {
  const extension = path.extname(module);
  const hasExpectedExtension =
    extension !== "" && kExpectedModuleExtensions.has(extension);

  return !module.startsWith(".") && !hasExpectedExtension;
}

export function extractNpmNameFromThirdPartyModuleDeclaration(
  moduleDeclarationPath: string
): string {
  const declarationPathSegments = moduleDeclarationPath.split("/");
  const scopeOrName = declarationPathSegments[0];
  const isScopedPackage = scopeOrName.startsWith("@");

  if (isScopedPackage) {
    return declarationPathSegments.slice(0, 2).join("/");
  }

  return scopeOrName;
}

export function isJSONModule(module: string): boolean {
  return module.endsWith(".json");
}

export function isBinaryModule(module: string): boolean {
  return module.endsWith(".node");
}

export function isJavaScriptModule(module: string): boolean {
  const extension = path.extname(module);

  return (
    extension === ".js" ||
    extension === ".jsx" ||
    extension === ".mjs" ||
    extension === ".cjs"
  );
}

export function isTypeScriptModule(module: string): boolean {
  const extension = path.extname(module);

  return extension === ".ts" || extension === ".tsx";
}

export const kExpectedModuleExtensions = new Set([
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx"
]);

function isTypeScriptDeclarationFile(module: string): boolean {
  return module.endsWith(".d.ts");
}

function isTestFile(fileName: string): boolean {
  return fileName.includes(".test") || fileName.includes(".spec");
}

function isMinifiedFile(fileName: string): boolean {
  return fileName.includes(".min");
}

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
