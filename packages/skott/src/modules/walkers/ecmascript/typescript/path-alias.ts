import path from "node:path";

import JSON5 from "json5";
import type { CompilerOptions } from "typescript";

import type { FileReader } from "../../../../filesystem/file-reader.js";

const aliasLinks = new Map<string, string>();

export interface TSConfig {
  baseUrl?: string;
}

interface SupportedTSConfig {
  extends?: string;
  compilerOptions?: CompilerOptions;
}

export async function buildPathAliases(
  fileReader: FileReader,
  tsConfigPath: string
): Promise<TSConfig> {
  try {
    const baseTsConfig = await fileReader.read(
      path.join(fileReader.getCurrentWorkingDir(), tsConfigPath)
    );
    const tsConfigJson = JSON5.parse<SupportedTSConfig>(baseTsConfig);
    const baseUrl = tsConfigJson.compilerOptions?.baseUrl ?? ".";

    const paths: Record<string, string[]> =
      tsConfigJson.compilerOptions?.paths ?? {};

    if (paths) {
      for (const [alias, aliasedPath] of Object.entries(paths)) {
        /**
         * When the path alias is like "foo/*": ["foo/lib/*"], we must be sure
         * to only use known segments of the glob so that we can map easily
         * once glob segment "foo/baz/bar" to "foo/lib/baz/bar".
         */
        const aliasWithoutGlob = alias.split("/*")[0];
        const realPathWithoutGlob = aliasedPath[0].split("/*")[0];

        aliasLinks.set(
          aliasWithoutGlob,
          path.join(baseUrl, realPathWithoutGlob)
        );
      }
    }

    // If the config provided extends another one, we must keep looking for
    // path aliases elsewhere.
    const extendedTsConfigPath = tsConfigJson.extends;
    if (extendedTsConfigPath) {
      await buildPathAliases(fileReader, extendedTsConfigPath);
    }

    return {
      baseUrl: tsConfigJson.compilerOptions?.baseUrl
    };
  } catch {
    return {};
  }
}

function resolveAliasToRelativePath(
  moduleDeclaration: string,
  baseAlias: string,
  baseAliasDirname: string
): string {
  /**
   * When having a path alias like "foo/*": ["core/lib/*"], we want to map
   * any segment such as "foo/lib/baz" to "core/lib/baz".
   */
  const modulePathWithoutAliasBaseDirname = moduleDeclaration.split(
    path.join(baseAliasDirname, path.sep)
  )[1];

  const realPathWithAlias = path.join(
    baseAlias,
    modulePathWithoutAliasBaseDirname
  );

  return realPathWithAlias;
}

function isNotBasePathSegment(segment: string): boolean {
  return segment.includes(path.sep);
}

export function resolvePathAlias(
  moduleDeclaration: string,
  baseDir: string
): string | undefined {
  const aliasWithoutGlob = aliasLinks.get(moduleDeclaration);

  if (aliasWithoutGlob) {
    return path.join(baseDir, aliasWithoutGlob);
  }

  let baseAliasDirname = path.dirname(moduleDeclaration);
  let baseAlias = aliasLinks.get(baseAliasDirname);

  if (baseAlias) {
    return path.join(
      baseDir,
      resolveAliasToRelativePath(moduleDeclaration, baseAlias, baseAliasDirname)
    );
  }

  while (isNotBasePathSegment(baseAliasDirname)) {
    baseAliasDirname = path.dirname(baseAliasDirname);
    const deepBaseAlias = aliasLinks.get(baseAliasDirname);

    if (deepBaseAlias) {
      baseAlias = resolveAliasToRelativePath(
        moduleDeclaration,
        deepBaseAlias,
        baseAliasDirname
      );
      break;
    }
  }

  if (!baseAlias) {
    return undefined;
  }

  return path.join(baseDir, baseAlias);
}

export function isTypeScriptRelativePathWithNoLeadingIdentifier(
  baseUrl: string | undefined,
  moduleDeclaration: string
): boolean {
  return (
    baseUrl !== undefined &&
    !moduleDeclaration.startsWith(".") &&
    !moduleDeclaration.startsWith("./")
  );
}

export function isTypeScriptPathAlias(moduleDeclaration: string): boolean {
  let pathSegmentToMatch = path.dirname(moduleDeclaration);
  let isPathAlias = aliasLinks.has(moduleDeclaration);

  if (aliasLinks.has(pathSegmentToMatch)) {
    return true;
  }

  while (isNotBasePathSegment(pathSegmentToMatch)) {
    pathSegmentToMatch = path.dirname(pathSegmentToMatch);

    if (aliasLinks.has(pathSegmentToMatch)) {
      isPathAlias = true;
      break;
    }
  }

  return isPathAlias;
}
