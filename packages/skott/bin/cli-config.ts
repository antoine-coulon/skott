import * as E from "@effect/data/Either";

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
  includeBaseDir
}: CliOptions) {
  if (entrypoint) {
    if (cwd !== process.cwd()) {
      return E.left("`--cwd` can't be customized when providing an entrypoint");
    }
  } else if (includeBaseDir) {
    return E.left(
      "`--includeBaseDir` can only be used when providing an entrypoint"
    );
  }

  return E.right(void 0);
}

export function ensureValidConfiguration(
  entrypoint: string | undefined,
  options: CliParameterOptions
): E.Either<string, void> {
  ensureNoIllegalConfigState({ entrypoint, ...options });

  return E.right(void 0);
}
