import { walk as walkAST } from "estree-walker";
import { parseScript } from "meriyah";

import { highlight } from "../../../../logger.js";
import type {
  ModuleWalker,
  ModuleWalkerResult,
  WalkerOptions
} from "../../common.js";
import { extractModuleDeclarations } from "../module-declaration.js";

export class JavaScriptModuleWalker implements ModuleWalker {
  public async walk({
    fileName,
    fileContent,
    logger
  }: WalkerOptions): Promise<ModuleWalkerResult> {
    const moduleDeclarations = new Set<string>();

    try {
      const node = parseScript(fileContent, {
        module: true,
        next: true,
        jsx: true,
        loc: false
      });

      // @ts-expect-error
      walkAST(node, {
        enter(node) {
          extractModuleDeclarations(node, moduleDeclarations);
        }
      });
    } catch {
      logger.failure(`${highlight(fileName)}: file could not be parsed`);
    }

    return { moduleDeclarations };
  }
}
