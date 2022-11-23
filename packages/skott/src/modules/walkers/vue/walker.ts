import { SFCParseResult, parse, SFCDescriptor } from "@vue/compiler-sfc";

import type {
  ModuleWalker,
  ModuleWalkerConfig,
  ModuleWalkerResult
} from "../common.js";
import {
  JavaScriptModuleWalker,
  TypeScriptModuleWalker
} from "../ecmascript/index.js";

type VueSFCParseResult = SFCParseResult | SFCDescriptor;

export class VueModuleWorker implements ModuleWalker {
  public async walk(
    fileContent: string,
    config: ModuleWalkerConfig
  ): Promise<ModuleWalkerResult> {
    const sfcParseResult = parse(fileContent) as VueSFCParseResult;
    const sfcDescriptor =
      "descriptor" in sfcParseResult
        ? sfcParseResult.descriptor
        : sfcParseResult;
    let scriptWalker: ModuleWalker;
    const { script: scriptBlock } = sfcDescriptor;
    if (scriptBlock) {
      if (scriptBlock.lang === "ts") {
        scriptWalker = new TypeScriptModuleWalker();
      } else {
        scriptWalker = new JavaScriptModuleWalker();
      }

      return scriptWalker.walk(scriptBlock.content, config);
    }

    return {
      moduleDeclarations: new Set<string>([])
    };
  }
}
