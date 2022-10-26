import path from "node:path";

import { FileReader } from "../../../../filesystem/file-reader";

const aliasLinks = new Map<string, string>();

export async function buildPathAliases(
  fileReader: FileReader,
  tsConfigPath: string
): Promise<void> {
  try {
    const baseTsConfig = await fileReader.read(
      path.join(fileReader.getCurrentWorkingDir(), tsConfigPath)
    );
    const tsConfigJson = JSON.parse(baseTsConfig);
    const baseUrl = tsConfigJson.compilerOptions.baseUrl ?? ".";
    const paths: Record<string, string[]> = tsConfigJson.compilerOptions.paths;

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
  } catch {}
}

export function resolvePathAlias(
  moduleDeclaration: string
): string | undefined {
  const aliasWithoutGlob = aliasLinks.get(moduleDeclaration);

  if (aliasWithoutGlob) {
    return aliasWithoutGlob;
  }

  const baseAliasDirname = path.dirname(moduleDeclaration);
  const baseAlias = aliasLinks.get(baseAliasDirname);

  if (baseAlias) {
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

  return undefined;
}

export function isTypeScriptPathAlias(moduleDeclaration: string): boolean {
  if (aliasLinks.has(path.dirname(moduleDeclaration))) {
    return true;
  }

  return aliasLinks.has(moduleDeclaration);
}
