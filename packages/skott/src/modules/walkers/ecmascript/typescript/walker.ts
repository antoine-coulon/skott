import { walk } from "estree-walker";

import { ModuleWalker, ModuleWalkerResult } from "../../common.js";
import { isCommonJSModuleImport } from "../javascript/cjs.js";
import { isEcmaScriptModuleDeclaration } from "../module-declaration.js";

async function tryOrElse(
  tryFn: () => void,
  orElseFn: () => void
): Promise<void> {
  try {
    await tryFn();

    return;
  } catch {}

  try {
    orElseFn();
  } catch {}
}

export class TypeScriptModuleWalker implements ModuleWalker {
  public async walk(fileContent: string): Promise<ModuleWalkerResult> {
    const { parse } = await import("@typescript-eslint/typescript-estree");
    const moduleDeclarations = new Set<string>();
    let jsxEnabled = true;

    function processWalk(): void {
      const node = parse(fileContent, {
        jsx: jsxEnabled,
        loc: false,
        comment: false
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
    }

    await tryOrElse(processWalk, () => {
      // Retry without JSX enabled
      jsxEnabled = false;

      return processWalk();
    });

    return { moduleDeclarations };
  }
}
