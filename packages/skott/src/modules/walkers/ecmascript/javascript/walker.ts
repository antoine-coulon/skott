import { walk } from "estree-walker";

import { ModuleWalker, ModuleWalkerResult } from "../../common.js";

import { isCommonJSModuleImport } from "./cjs.js";
import { isEcmaScriptModuleDeclaration } from "../module-declaration.js";

export class JavaScriptModuleWalker implements ModuleWalker {
  public async walk(fileContent: string): Promise<ModuleWalkerResult> {
    const { parseScript } = await import("meriyah");
    const moduleDeclarations = new Set<string>();
    const node = parseScript(fileContent, {
      module: true,
      next: true
    });
    const isRootNode = node.type === "Program";

    walk(isRootNode ? node.body : node, {
      enter(node) {
        if (isCommonJSModuleImport(node)) {
          moduleDeclarations.add(node.arguments[0].value);
        }

        if (isEcmaScriptModuleDeclaration(node)) {
          moduleDeclarations.add(node.source.value);
        }

        if (node.type === "ImportExpression") {
          moduleDeclarations.add(node.source.value);
        }
      }
    });

    return { moduleDeclarations };
  }
}
