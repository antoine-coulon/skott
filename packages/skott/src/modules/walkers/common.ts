import {
  JavaScriptModuleWalker,
  TypeScriptModuleWalker
} from "./ecmascript/index.js";
import {
  isTypeScriptModule,
  isVueModule
} from "./ecmascript/module-resolver.js";
import { VueModuleWorker } from "./vue/walker.js";

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
  astParseOptions?: Record<string, any>;
};

type Walkers = "JS" | "TS" | "VUE";

function getAppropriateWalker(): (fileName: string) => ModuleWalker {
  const walkers = {} as Record<Walkers, ModuleWalker>;

  return function pickWalker(fileName: string) {
    if (isTypeScriptModule(fileName)) {
      if (!walkers.TS) {
        walkers.TS = new TypeScriptModuleWalker();
      }

      return walkers.TS;
    }

    if (isVueModule(fileName)) {
      if (!walkers.VUE) {
        walkers.VUE = new VueModuleWorker();
      }

      return walkers.VUE;
    }

    if (!walkers.JS) {
      walkers.JS = new JavaScriptModuleWalker();
    }

    return walkers.JS;
  };
}

export const selectAppropriateModuleWalker = getAppropriateWalker();
