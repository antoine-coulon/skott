import { Either } from "effect";

export interface TerminalConfig {
  watch: boolean;
  displayMode: "raw" | "file-tree" | "graph" | "webapp";
  showCircularDependencies: boolean;
  showUnusedDependencies: boolean;
  exitCodeOnCircularDependencies: number;
}

export const defaultTerminalConfig: TerminalConfig = {
  watch: false,
  displayMode: "raw",
  showCircularDependencies: false,
  showUnusedDependencies: false,
  exitCodeOnCircularDependencies: 1
};

export function ensureNoIllegalTerminalConfig(options: TerminalConfig) {
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
