import { readFile } from "node:fs/promises";
import path from "node:path";

import { pipe } from "@effect/data/Function";
import * as Effect from "@effect/io/Effect";
import depcheck from "depcheck";

import { FileReader, FileReaderTag } from "../filesystem/file-reader.js";
import { SkottLogger } from "../logger.js";

export async function findWorkspaceEntrypointModule(): Promise<string> {
  // look for package.json
  const packageJson = JSON.parse(
    await readFile(path.join(process.cwd(), "package.json"), "utf-8")
  );
  if (packageJson.main) {
    return packageJson.main;
  }
  throw new Error(
    `Could not automatically find the default entrypoint while looking at the "main" property
    of your "package.json" file. Please try to provide it manually using the "entrypoint" property.`
  );
}

class ManifestFileReadingError {
  readonly _tag = "ManifestFileReadingError";
  constructor(private readonly message: string) {}
}

function readManifestAt(
  manifestPath: string
): Effect.Effect<FileReader, ManifestFileReadingError, string> {
  return pipe(
    Effect.service(FileReaderTag),
    Effect.flatMap((fileReader) =>
      Effect.tryPromise(() => fileReader.read(manifestPath))
    ),
    Effect.mapError(
      () =>
        new ManifestFileReadingError(
          "The package.json manifest file could not be found or read."
        )
    )
  );
}

export async function findManifestDependencies(
  baseDir: string,
  manifestPath: string,
  fileReader: FileReader
): Promise<string[]> {
  return pipe(
    Effect.sync(() => fileReader.getCurrentWorkingDir()),
    Effect.flatMap((cwd) =>
      pipe(
        readManifestAt(path.join(cwd, manifestPath)),
        Effect.orElse(() =>
          readManifestAt(path.join(cwd, baseDir, manifestPath))
        )
      )
    ),
    Effect.flatMap((rawManifest) =>
      pipe(
        Effect.attempt(() => Object.keys(JSON.parse(rawManifest).dependencies)),
        Effect.orElse(() => Effect.succeed([]))
      )
    ),
    Effect.provideService(FileReaderTag, fileReader),
    Effect.runPromise
  );
}

/**
 * As third-party dependencies can be accessed through exported modules
 * such as "rjxs/internal/observable/empty", we must be able to match that
 * whole path with the dependency name in the manifest file (e.g. "rxjs").
 */
export function findMatchesBetweenGraphAndManifestDependencies(
  graphDependencies: string[],
  manifestDependencies: string[]
): string[] {
  return graphDependencies.map((fullDependencyPath) => {
    const hasScopeOrNamespace = fullDependencyPath.includes("/");

    if (hasScopeOrNamespace) {
      const baseDependencyWithoutNamespace = manifestDependencies.find(
        (manifestDep) => fullDependencyPath.startsWith(manifestDep)
      );

      if (baseDependencyWithoutNamespace) {
        return baseDependencyWithoutNamespace;
      }
    }

    return fullDependencyPath;
  });
}

export function findUnusedImplicitDependencies(cwd: string): Promise<string[]> {
  const depcheckDefaults = {
    ignoreDirs: [
      "sandbox",
      "dist",
      "generated",
      ".generated",
      "build",
      "fixtures",
      "jspm_packages"
    ],
    ignoreMatches: [
      "gulp-*",
      "grunt-*",
      "karma-*",
      "angular-*",
      "babel-*",
      "metalsmith-*",
      "eslint-plugin-*",
      "@types/*",
      "grunt",
      "mocha",
      "ava"
    ],
    ignorePatterns: ["node_modules"]
  };

  /**
   * TODO: Make sure depcheck only scans files that were not already analyzed by
   * Skott otherwise files will be traversed more than once.
   * The objective of adding depcheck is only to detect more implicit dependencies
   * coming from configuration files (e.g. .babelrc, .eslintrc, etc.).
   * One of the solutions could be using the graph from Skott and determine
   * which files were already analyzed and generate a glob from it to include
   * that in the "ignorePatterns" depcheck option.
   */
  return new Promise((resolve) => {
    try {
      depcheck(cwd, depcheckDefaults, (unusedDependencies) => {
        resolve(unusedDependencies.dependencies);
      });
    } catch {
      resolve([]);
    }
  });
}

type ManifestDependencyType =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies";

export interface ManifestDependenciesByName {
  [workspaceProjectName: string]: Record<
    ManifestDependencyType,
    Record<string, string>
  >;
}

export function extractInformationFromManifest(
  manifestContent: string,
  rootFile: string,
  logger: SkottLogger,
  manifests: ManifestDependenciesByName
) {
  try {
    const manifestParsed = JSON.parse(manifestContent);

    if (manifestParsed.name) {
      logger.info(`Found ${manifestParsed.name} manifest file at: ${rootFile}`);

      manifests[manifestParsed.name as ManifestDependencyType] = {
        dependencies: manifestParsed.dependencies ?? {},
        devDependencies: manifestParsed.devDependencies ?? {},
        peerDependencies: manifestParsed.peerDependencies ?? {}
      };
    } else {
      logger.failure(
        `Found manifest file at ${rootFile} but it does not contain "name" field.`.concat(
          `The project won't be included in the workspace tree.`
        )
      );
    }
  } catch {
    logger.failure(`Unable to parse manifest file at ${rootFile}.`);
  }
}
