import { walk } from "estree-walker";
import type { Options as AstParserOptions } from "meriyah";

import type {
  ModuleWalker,
  ModuleWalkerConfig,
  ModuleWalkerResult
} from "../../common.js";
import { extractModuleDeclarations } from "../module-declaration.js";

export class JavaScriptModuleWalker implements ModuleWalker {
  public async walk(
    fileContent: string,
    config: ModuleWalkerConfig & {
      astParseOptions?: AstParserOptions;
    }
  ): Promise<ModuleWalkerResult> {
    const { parseScript } = await import("meriyah");
    const moduleDeclarations = new Set<string>();
    const node = parseScript(fileContent, {
      module: true,
      next: true,
      jsx: true,
      loc: false,
      ...config.astParseOptions
    });
    const isRootNode = node.type === "Program";

    walk(isRootNode ? node.body : node, {
      enter(node) {
        extractModuleDeclarations(node, moduleDeclarations);
      }
    });

    return { moduleDeclarations };
  }
}
