import { readFile } from "node:fs/promises";
import path from "node:path";

import type { FileReader } from "../filesystem/file-reader";
import { tryOrElse } from "../util.js";

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

export async function findManifestDependencies(
  baseDir: string,
  manifestPath: string,
  fileReader: FileReader
): Promise<string[]> {
  let rawManifest = "";
  const cwd = fileReader.getCurrentWorkingDir();
  try {
    rawManifest = await tryOrElse(
      () => fileReader.read(path.join(cwd, manifestPath)),
      () => fileReader.read(path.join(cwd, baseDir, manifestPath))
    );
  } catch {
    throw new Error(
      "The package.json manifest file could not be found or read."
    );
  }

  return Object.keys(JSON.parse(rawManifest).dependencies);
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
