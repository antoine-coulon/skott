import { Either } from "effect";
import * as D from "io-ts/lib/Decoder.js";

export interface TerminalConfig {
  watch: boolean;
  displayMode: "raw" | "file-tree" | "graph" | "webapp";
  showCircularDependencies: boolean;
  showUnusedDependencies: boolean;
  showUnusedFiles: boolean;
  exitCodeOnCircularDependencies: number;
}

export const defaultTerminalConfig: TerminalConfig = {
  watch: false,
  displayMode: "raw",
  showCircularDependencies: false,
  showUnusedDependencies: false,
  showUnusedFiles: false,
  exitCodeOnCircularDependencies: 1
};

const terminalSchema = D.struct({
  watch: D.boolean,
  displayMode: D.union(
    D.literal("raw"),
    D.literal("file-tree"),
    D.literal("graph"),
    D.literal("webapp")
  ),
  showCircularDependencies: D.boolean,
  showUnusedDependencies: D.boolean,
  exitCodeOnCircularDependencies: D.number
});

export function ensureNoIllegalTerminalConfig(
  options: TerminalConfig & { entrypoint: string | undefined }
) {
  const result = terminalSchema.decode(options);

  if (result._tag === "Left") {
    return Either.left(
      `Invalid terminal configuration: ${D.draw(result.left)}`
    );
  }
  /**
   * Some `show*` params exist but are only relevant when using CLI-based.
   * `--showCircularDependencies` is already supported in the webapp even without
   * the flag.
   * `--showUnusedDependencies` is not supported in the webapp yet but to enforce
   * consistency, we don't allow it to be used with `--displayMode=webapp`.
   */
  if (options.displayMode === "webapp") {
    if (options.showCircularDependencies) {
      return Either.left(
        "`--showCircularDependencies` can't be used when using `--displayMode=webapp`"
      );
    }
    if (options.showUnusedDependencies) {
      return Either.left(
        "`--showUnusedDependencies` can't be used when using `--displayMode=webapp`"
      );
    }
    if (options.showUnusedFiles) {
      return Either.left(
        "`--showUnusedFiles` can't be used when using `--displayMode=webapp`"
      );
    }
  }

  if (options.entrypoint && options.showUnusedFiles) {
    return Either.left(
      "`--showUnusedFiles` can't be used when using providing an entrypoint."
    );
  }

  if (options.watch) {
    if (
      options.displayMode !== "webapp" &&
      options.displayMode !== "graph" &&
      options.displayMode !== "raw" &&
      options.displayMode !== "file-tree"
    ) {
      return Either.left(
        "`--watch` needs either `raw`, `file-tree`, `graph` or `webapp` display mode"
      );
    }
  }

  return Either.right(void 0);
}
