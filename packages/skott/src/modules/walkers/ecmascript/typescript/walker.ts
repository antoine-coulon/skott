import { pipe } from "@effect/data/Function";
import * as Effect from "@effect/io/Effect";
import { parse } from "@typescript-eslint/typescript-estree";
import { walk as walkAST } from "estree-walker";

import { highlight } from "../../../../logger.js";
import type {
  ModuleWalker,
  ModuleWalkerResult,
  WalkerOptions
} from "../../common.js";
import { extractModuleDeclarations } from "../module-declaration.js";

export class TypeScriptModuleWalker implements ModuleWalker {
  public async walk({
    fileContent,
    fileName,
    config,
    logger
  }: WalkerOptions): Promise<ModuleWalkerResult> {
    const trackTypeOnlyDependencies = config.trackTypeOnlyDependencies;
    const moduleDeclarations = new Set<string>();

    function processWalk({ jsx } = { jsx: true }) {
      return Effect.tryCatch(
        () => {
          const node = parse(fileContent, {
            jsx,
            loc: false,
            comment: false
          });

          walkAST(node, {
            enter(node) {
              extractModuleDeclarations(
                node,
                moduleDeclarations,
                trackTypeOnlyDependencies
              );
            }
          });
        },
        () => Effect.fail("_")
      );
    }

    pipe(
      processWalk(),
      Effect.orElse(() => processWalk({ jsx: false })),
      Effect.tapError(() =>
        Effect.sync(() =>
          logger.failure(`${highlight(fileName)}: file could not be parsed`)
        )
      ),
      // eslint-disable-next-line no-sync
      Effect.runSyncExit
    );

    return { moduleDeclarations };
  }
}
