import { walk as walkAST } from "estree-walker";
import { parseScript } from "meriyah";

import type { ModuleWalker, ModuleWalkerResult } from "../../common.js";
import { extractModuleDeclarations } from "../module-declaration.js";

export class JavaScriptModuleWalker implements ModuleWalker {
  public async walk(fileContent: string): Promise<ModuleWalkerResult> {
    const moduleDeclarations = new Set<string>();
    try {
      const node = parseScript(fileContent, {
        module: true,
        next: true,
        jsx: true,
        loc: false
      });
      const isRootNode = node.type === "Program";

      walkAST(isRootNode ? node.body : node, {
        enter(node) {
          extractModuleDeclarations(node, moduleDeclarations);
        }
      });
    } catch {}

    return { moduleDeclarations };
  }
}
