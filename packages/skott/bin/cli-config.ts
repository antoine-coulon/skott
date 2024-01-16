import * as E from "@effect/data/Either";

export type CliOptions = {
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
  verbose: true;
  watch: true;
};

export function ensureValidConfiguration(
  entrypoint: string | undefined,
  options: CliOptions
): E.Either<string, void> {
  if (entrypoint) {
    if (options.cwd !== process.cwd()) {
      return E.left("`--cwd` can't be customized when providing an entrypoint");
    }
  } else if (options.includeBaseDir) {
    return E.left(
      "`--includeBaseDir` can only be used when providing an entrypoint"
    );
  }

  return E.right(void 0);
}
