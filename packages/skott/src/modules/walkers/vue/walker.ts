import { compile as compileDom } from "@vue/compiler-dom";
import { SFCParseResult, parse, SFCDescriptor } from "@vue/compiler-sfc";

import type {
  ModuleWalker,
  ModuleWalkerConfig,
  ModuleWalkerResult
} from "../common.js";
import {
  TypeScriptModuleWalker,
  JavaScriptModuleWalker
} from "../ecmascript/index.js";

type VueSFCParseResult = SFCParseResult | SFCDescriptor;

export class VueModuleWorker implements ModuleWalker {
  public async walk(
    fileContent: string,
    config: ModuleWalkerConfig
  ): Promise<ModuleWalkerResult> {
    const moduleDeclarations: string[] = [];
    const sfcParseResult = parse(fileContent) as VueSFCParseResult;
    const sfcDescriptor =
      "descriptor" in sfcParseResult
        ? sfcParseResult.descriptor
        : sfcParseResult;
    let Walker: { new (): ModuleWalker };
    const {
      script: scriptBlock,
      template: templateBlock,
      scriptSetup: scriptSetupBlock
    } = sfcDescriptor;
    if (scriptBlock) {
      Walker =
        scriptBlock.lang === "ts"
          ? TypeScriptModuleWalker
          : JavaScriptModuleWalker;
      moduleDeclarations.push(
        ...(await new Walker().walk(scriptBlock.content, config))
          .moduleDeclarations
      );
    }
    if (scriptSetupBlock) {
      Walker =
        scriptSetupBlock.lang === "ts"
          ? TypeScriptModuleWalker
          : JavaScriptModuleWalker;
      moduleDeclarations.push(
        ...(await new Walker().walk(scriptSetupBlock.content, config))
          .moduleDeclarations
      );
    }
    Walker ??= JavaScriptModuleWalker;

    if (templateBlock) {
      // if (Walker === JavaScriptModuleWalker) {
      // TODO: Do only support javascript in template.
      moduleDeclarations.push(
        ...(
          await new JavaScriptModuleWalker().walk(
            compileDom(templateBlock.content).code,
            {
              ...config,
              astParseOptions: {
                module: false,
                impliedStrict: false,
                globalReturn: true,
                ...config.astParseOptions
              }
            }
          )
        ).moduleDeclarations
      );
      // }
    }

    return {
      moduleDeclarations: new Set(moduleDeclarations)
    };
  }
}
