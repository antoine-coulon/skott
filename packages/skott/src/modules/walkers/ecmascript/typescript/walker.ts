import { walk } from "estree-walker";

import { ModuleWalker, ModuleWalkerResult } from "../../common.js";
import { isCommonJSModuleImport } from "../javascript/cjs.js";
import { isEcmaScriptModuleDeclaration } from "../module-declaration.js";

/**
 * TypeScript implements the ECMAScript standard module system. This walker
 * is nearly the same as the JavaScript walker, minus the CJS support which
 * is not needed here.
 */
export class TypeScriptModuleWalker implements ModuleWalker {
  public async walk(fileContent: string): Promise<ModuleWalkerResult> {
    const { parse } = await import("@typescript-eslint/typescript-estree");
    const moduleDeclarations = new Set<string>();
    const node = parse(fileContent, { jsx: true, loc: false, comment: false });
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
