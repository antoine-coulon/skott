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

async function readManifestFileAt(
  atLocation: string,
  fileReader: FileReader
): Promise<string> {
  return await fileReader.read(path.join(atLocation, "package.json"));
}

export async function findManifestDependencies(
  baseDir: string,
  fileReader: FileReader
): Promise<string[]> {
  let rawManifest = "";
  const cwd = fileReader.getCurrentWorkingDir();
  try {
    rawManifest = await tryOrElse(
      () => readManifestFileAt(cwd, fileReader),
      () => readManifestFileAt(path.join(cwd, baseDir), fileReader)
    );
  } catch {
    throw new Error("No 'package.json' was found in the base directory.");
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
