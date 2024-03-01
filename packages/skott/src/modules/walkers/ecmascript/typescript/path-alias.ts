import { createRequire } from "node:module";
import path from "node:path";

import { pipe, Option } from "effect";
import JSON5 from "json5";
import type { CompilerOptions } from "typescript";

import type { FileReader } from "../../../../filesystem/file-reader.js";
import { Logger } from "../../../../logger.js";

export interface TSConfig {
  baseUrl?: string;
}

interface SupportedTSConfig {
  extends?: string;
  compilerOptions?: CompilerOptions;
}

function resolveAliasToRelativePath(
  moduleDeclaration: string,
  baseAlias: string,
  baseAliasDirname: string,
  logger: Logger
): Option.Option<string> {
  /**
   * When having a path alias like "foo/*": ["core/lib/*"], we want to map
   * any segment such as "foo/lib/baz" to "core/lib/baz".
   */
  try {
    logger.info(
      `Extracting "${moduleDeclaration}" base path using path alias base directory "${baseAliasDirname}"`
    );

    const modulePathWithoutAliasBaseDirname = moduleDeclaration.split(
      baseAliasDirname.concat("/")
    )[1];

    logger.info(
      `Attempt to map alias path to real file-system path.` +
        ` Join "${baseAlias}" -> "${modulePathWithoutAliasBaseDirname}"`
    );

    const realPathWithAlias = path.join(
      baseAlias,
      modulePathWithoutAliasBaseDirname
    );

    return Option.some(realPathWithAlias);
  } catch {
    logger.failure(
      `Could not resolve ${moduleDeclaration} alias path to real file-system path` +
        ` using ${baseAlias} and ${baseAliasDirname}.`
    );

    return Option.none();
  }
}

function isRootAliasSymbol(segment: string): boolean {
  return !segment.includes("/");
}

async function readTSConfig(
  tsConfigPath: string,
  logger: Logger,
  fileReader: FileReader
): Promise<SupportedTSConfig> {
  let tsconfig = "";

  try {
    const localTSConfigPath = path.join(
      fileReader.getCurrentWorkingDir(),
      tsConfigPath
    );
    tsconfig = await fileReader.read(localTSConfigPath);
    logger.success(`Successfully found tsconfig: ${localTSConfigPath}`);
  } catch (exception: any) {
    logger.failure(
      `An exception occured reading from tsconfig: ${tsConfigPath}. Reason ${exception.message}}`
    );

    /**
     * If the tsconfig could not be resolved using the provided path, it might
     * mean that the path is actually a third party module. In this case, we
     * try to resolve the path using the node module resolution algorithm.
     */
    try {
      const moduleRequire = createRequire(import.meta.url);
      const thirdPartyTSConfigPath = moduleRequire.resolve(tsConfigPath, {
        paths: [fileReader.getCurrentWorkingDir()]
      });
      tsconfig = await fileReader.read(thirdPartyTSConfigPath);

      logger.success(
        `Successfully found tsconfig at: ${thirdPartyTSConfigPath}`
      );
    } catch (exception: any) {
      logger.failure(
        `An exception occured reading from tsconfig: ${tsConfigPath}. Reason ${exception.message}}`
      );
    }
  }

  return JSON5.parse<SupportedTSConfig>(tsconfig);
}

export async function buildPathAliases(
  fileReader: FileReader,
  tsConfigPath: string,
  aliasLinks: Map<string, string>,
  logger: Logger
): Promise<TSConfig> {
  try {
    logger.info(`Reading from tsconfig: ${tsConfigPath}`);

    const tsConfig = await readTSConfig(tsConfigPath, logger, fileReader);
    const baseUrl = tsConfig.compilerOptions?.baseUrl ?? ".";

    const paths: Record<string, string[]> =
      tsConfig.compilerOptions?.paths ?? {};

    if (paths) {
      logger.info(`Extracting path aliases from tsconfig: ${tsConfigPath}`);

      for (const [alias, aliasedPath] of Object.entries(paths)) {
        logger.info(`Found path alias "${alias}": ["${aliasedPath}"]`);
        /**
         * When the path alias is like "foo/*": ["foo/lib/*"], we must be sure
         * to only use known segments of the glob so that we can map easily
         * once glob segment "foo/baz/bar" to "foo/lib/baz/bar".
         */
        const aliasWithoutWildcard = alias.split("/*")[0];
        const realPathWithoutWildcard = aliasedPath[0].split("/*")[0];

        const realPathAliasLocation = path.join(
          baseUrl,
          realPathWithoutWildcard
        );

        aliasLinks.set(aliasWithoutWildcard, realPathAliasLocation);

        logger.info(
          `Registering path alias without wildcards "${aliasWithoutWildcard}": ["${realPathAliasLocation}"]`
        );
      }
    }

    // If the config provided extends another one, we must keep looking for
    // path aliases elsewhere.
    const extendedTsConfigPath = tsConfig.extends;
    if (extendedTsConfigPath) {
      logger.info(`Found tsconfig extension: ${extendedTsConfigPath}`);

      await buildPathAliases(
        fileReader,
        extendedTsConfigPath,
        aliasLinks,
        logger
      );

      logger.success(
        `Finished extracting path aliases from tsconfig. ${aliasLinks.size} aliases found.`
      );
    }

    return {
      baseUrl: tsConfig.compilerOptions?.baseUrl
    };
  } catch (exception: any) {
    logger.failure(
      `An exception occured reading from tsconfig: ${tsConfigPath}. Reason ${exception.message}}`
    );

    return {};
  }
}

export function resolvePathAlias(
  moduleDeclaration: string,
  baseDir: string,
  aliasLinks: Map<string, string>,
  logger: Logger
): Option.Option<string> {
  const aliasWithoutGlob = aliasLinks.get(moduleDeclaration);

  if (aliasWithoutGlob) {
    return Option.some(path.join(baseDir, aliasWithoutGlob));
  }

  let baseAliasDirname = path.dirname(moduleDeclaration);
  let baseAlias = aliasLinks.get(baseAliasDirname);

  if (baseAlias) {
    const aliasPath = resolveAliasToRelativePath(
      moduleDeclaration,
      baseAlias,
      baseAliasDirname,
      logger
    );

    if (Option.isNone(aliasPath)) {
      logger.failure(
        `${moduleDeclaration} path alias could not be resolved using base path ${baseAlias}`
      );
    }

    return pipe(
      aliasPath,
      Option.map((resolvedPath) => path.join(baseDir, resolvedPath))
    );
  }
  logger.failure(
    `No match found for ${moduleDeclaration} using base ${baseAlias} path alias in the registered entries`
  );

  /**
   * In some cases I'm not able to identify yet, the path alias is never resolved
   * resulting in an endless loop. This is a temporary fix until the logs are
   * providing enough information to fix the root cause.
   */
  let pathDepthAttempts = 0;
  while (!isRootAliasSymbol(baseAliasDirname) && pathDepthAttempts < 10) {
    pathDepthAttempts += 1;
    baseAliasDirname = path.dirname(baseAliasDirname);
    const deepBaseAlias = aliasLinks.get(baseAliasDirname);

    if (deepBaseAlias) {
      baseAlias = Option.getOrUndefined(
        resolveAliasToRelativePath(
          moduleDeclaration,
          deepBaseAlias,
          baseAliasDirname,
          logger
        )
      );
      pathDepthAttempts = 0;
      break;
    }
  }

  if (!baseAlias) {
    logger.failure(
      `No match found for ${moduleDeclaration} and corresponding segments of ${baseAlias}` +
        ` path alias in the registered entries. Path depth attempts: ${pathDepthAttempts}`
    );

    return Option.none();
  }

  return Option.some(path.join(baseDir, baseAlias));
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

export function isTypeScriptPathAlias(
  moduleDeclaration: string,
  aliasLinks: Map<string, string>
): boolean {
  let pathSegmentToMatch = path.dirname(moduleDeclaration);
  let isPathAlias = aliasLinks.has(moduleDeclaration);

  if (aliasLinks.has(pathSegmentToMatch)) {
    return true;
  }

  /**
   * In some cases I'm not able to identify yet, the path alias is never resolved
   * resulting in an endless loop. This is a temporary fix until the logs are
   * providing enough information to fix the root cause.
   */
  let pathDepthAttempts = 0;
  while (!isRootAliasSymbol(pathSegmentToMatch) && pathDepthAttempts < 10) {
    pathDepthAttempts += 1;
    pathSegmentToMatch = path.dirname(pathSegmentToMatch);

    if (aliasLinks.has(pathSegmentToMatch)) {
      isPathAlias = true;
      pathDepthAttempts = 0;
      break;
    }
  }

  return isPathAlias;
}
