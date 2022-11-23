import { builtinModules } from "node:module";
import path from "node:path";

import type { FileReader } from "../../../filesystem/file-reader";

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
  return !module.startsWith(".");
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

export function isVueModule(module: string): boolean {
  const extension = path.extname(module);

  return extension === ".vue";
}

export const kExpectedModuleExtensions = new Set([
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".vue"
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

// Given a module name, resolve it to a file path.
export async function resolveImportedModulePath(
  module: string,
  fileReader: FileReader
): Promise<string> {
  const moduleExists = await isExistingModule(module, fileReader);
  /**
   * If the module name is the module itself, we have nothing to do.
   * If the module is supported and it appears that `moduleExists` is false, it
   * might be the case where TypeScript is used with ECMAScript modules.
   */
  if (isFileSupportedByDefault(module) && moduleExists) {
    return module;
  }

  /**
   * In case of CommonJS modules, the module can be targetted through a directory
   * import e.g: require("./lib") which will eventually resolve to "lib/index.js".
   */
  try {
    const maybePathToModule = path.join(module, "index.js");

    await fileReader.read(maybePathToModule);

    // If the file is found, we must resolve the path to the index.js file.
    return maybePathToModule;
  } catch {}

  // TypeScript file, with classic TypeScript module declarations.
  try {
    const maybePathToModule = module.concat(".ts");

    await fileReader.read(maybePathToModule);

    return maybePathToModule;
  } catch {}

  /**
   * In case of TypeScript modules, the module can be targetted through a directory
   * import e.g: import "./lib" which will eventually resolve to "lib/index.ts".
   */
  try {
    const maybePathToModule = path.join(module, "index.ts");

    await fileReader.read(maybePathToModule);

    // If the file is found, we must resolve the path to the index.ts file.
    return maybePathToModule;
  } catch {}

  /**
   * In case of TypeScript modules but when targetting ECMAScript modules,
   * modules are suffixed with ".js" but should resolve to their corresponding
   * ".ts" file.
   */
  try {
    const maybePathToModule = module.split(path.extname(module))[0];
    const javaScriptToTypeScriptFile = maybePathToModule.concat(".ts");
    await fileReader.read(javaScriptToTypeScriptFile);

    // If the file is found, we must resolve the path to the corresponding TypeScript file.
    return javaScriptToTypeScriptFile;
  } catch {}

  // Otherwise, require("./lib") will resolve to "./lib.js".
  return module.concat(".js");
}
