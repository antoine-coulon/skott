import { isTypeScriptModule } from "../resolvers/ecmascript/resolver.js";

import {
  JavaScriptModuleWalker,
  TypeScriptModuleWalker
} from "./ecmascript/index.js";

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

export class ModuleWalkerSelector {
  #walkers = {} as Record<Walkers, ModuleWalker>;

  public selectAppropriateModuleWalker(fileName: string): ModuleWalker {
    if (isTypeScriptModule(fileName)) {
      if (!this.#walkers.TS) {
        this.#walkers.TS = new TypeScriptModuleWalker();
      }

      return this.#walkers.TS;
    }

    if (!this.#walkers.JS) {
      this.#walkers.JS = new JavaScriptModuleWalker();
    }

    return this.#walkers.JS;
  }
}
