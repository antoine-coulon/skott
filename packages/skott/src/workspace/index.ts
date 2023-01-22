import { readFile } from "node:fs/promises";
import path from "node:path";

import { Effect, pipe } from "effect";

import { FileReader, FileReaderTag } from "../filesystem/file-reader.js";

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
    Effect.map((rawManifest) =>
      Object.keys(JSON.parse(rawManifest).dependencies)
    ),
    Effect.provideService(FileReaderTag)(fileReader),
    Effect.unsafeRunPromise
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
