import builtinModules from "builtin-modules";

const NODE_PROTOCOL = "node:";

export function isBuiltinModule(module: string): boolean {
  if (module.startsWith("node:")) {
    // node:fs => fs
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
