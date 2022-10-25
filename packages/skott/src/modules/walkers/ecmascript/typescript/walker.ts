import { walk } from "estree-walker";

import { ModuleWalker, ModuleWalkerResult } from "../../common.js";
import { extractModuleDeclarations } from "../module-declaration.js";

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
          extractModuleDeclarations(node, moduleDeclarations);
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
