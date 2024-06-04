import { Either } from "effect";

export type CliOptions = {
  entrypoint: string | undefined;
} & CliParameterOptions;

export type CliParameterOptions = {
  circularMaxDepth: number;
  cwd: string;
  displayMode: string;
  exitCodeOnCircularDependencies: number;
  fileExtensions: string;
  ignorePattern: string;
  includeBaseDir: boolean;
  incremental: boolean;
  manifest: string;
  showCircularDependencies: boolean;
  showUnusedDependencies: boolean;
  trackBuiltinDependencies: boolean;
  trackThirdPartyDependencies: boolean;
  trackTypeOnlyDependencies: boolean;
  tsconfig: string;
  verbose: boolean;
  watch: boolean;
};

function ensureNoIllegalConfigState({
  entrypoint,
  cwd,
  includeBaseDir,
  watch,
  displayMode,
  showCircularDependencies,
  showUnusedDependencies
}: CliOptions) {
  if (entrypoint) {
    if (cwd !== process.cwd()) {
      return Either.left(
        "`--cwd` can't be customized when providing an entrypoint"
      );
    }
  } else if (includeBaseDir) {
    return Either.left(
      "`--includeBaseDir` can only be used when providing an entrypoint"
    );
  }

  /**
   * Some `show*` params exist but are only relevant when using CLI-based.
   * `--showCircularDependencies` is already supported in the webapp even without
   * the flag.
   * `--showUnusedDependencies` is not supported in the webapp yet but to enforce
   * consistency, we don't allow it to be used with `--displayMode=webapp`.
   */
  if (displayMode === "webapp") {
    if (showCircularDependencies) {
      return Either.left(
        "`--showCircularDependencies` can't be used when using `--displayMode=webapp`"
      );
    }
    if (showUnusedDependencies) {
      return Either.left(
        "`--showUnusedDependencies` can't be used when using `--displayMode=webapp`"
      );
    }
  }

  if (watch) {
    if (
      displayMode !== "webapp" &&
      displayMode !== "graph" &&
      displayMode !== "raw" &&
      displayMode !== "file-tree"
    ) {
      return Either.left(
        "`--watch` needs either `raw`, `file-tree`, `graph` or `webapp` display mode"
      );
    }
  }

  return Either.right(void 0);
}

export function ensureValidConfiguration(
  entrypoint: string | undefined,
  options: CliParameterOptions
): Either.Either<void, string> {
  return ensureNoIllegalConfigState({ entrypoint, ...options });
}
