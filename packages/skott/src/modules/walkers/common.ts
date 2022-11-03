import { JavaScriptModuleWalker, TypeScriptModuleWalker } from "./ecmascript";
import { isTypeScriptModule } from "./ecmascript/module-resolver.js";

export interface ModuleWalkerResult {
  moduleDeclarations: Set<string>;
}

export interface ModuleWalker {
  walk(
    fileContent: string,
    config: ModuleWalkerConfig
  ): Promise<ModuleWalkerResult>;
}

export type ModuleWalkerConfig = {
  trackTypeOnlyDependencies: boolean;
};

type Walkers = "JS" | "TS";

function getAppropriateWalker(): (fileName: string) => ModuleWalker {
  const walkers = {} as Record<Walkers, ModuleWalker>;

  return function pickWalker(fileName: string) {
    if (isTypeScriptModule(fileName)) {
      if (!walkers.TS) {
        walkers.TS = new TypeScriptModuleWalker();
      }

      return walkers.TS;
    }

    if (!walkers.JS) {
      walkers.JS = new JavaScriptModuleWalker();
    }

    return walkers.JS;
  };
}

export const selectAppropriateModuleWalker = getAppropriateWalker();
