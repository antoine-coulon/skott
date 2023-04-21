import { builtinModules } from "node:module";
import path from "node:path";

import {
  isTypeScriptPathAlias,
  isTypeScriptRelativePathWithNoLeadingIdentifier,
  resolvePathAlias
} from "../../walkers/ecmascript/typescript/path-alias.js";
import {
  continueResolution,
  DependencyResolver,
  DependencyResolverControlFlow,
  DependencyResolverOptions,
  kExpectedModuleExtensions
} from "../base-resolver.js";

const NODE_PROTOCOL = "node:";

export function isBuiltinModule(module: string): boolean {
  // fs, path, etc
  if (builtinModules.includes(module)) {
    return true;
  }

  // node:fs
  if (module.startsWith("node:")) {
    const moduleName = module.slice(NODE_PROTOCOL.length);

    // node:fs/promises
    if (module.includes("/")) {
      return isBuiltinModule(moduleName);
    }

    return builtinModules.includes(moduleName);
  } else if (module.includes("/")) {
    const [moduleName] = module.split("/");

    return builtinModules.includes(moduleName);
  }

  return false;
}

export function isThirdPartyModule(
  module: string,
  expectedModuleExtensions: Set<string>
): boolean {
  const extension = path.extname(module);
  const hasExpectedExtension =
    extension !== "" && expectedModuleExtensions.has(extension);

  return !module.startsWith(".") && !hasExpectedExtension;
}

export function extractNpmNameFromThirdPartyModuleDeclaration(
  moduleDeclarationPath: string
): string {
  const declarationPathSegments = moduleDeclarationPath.split("/");
  const scopeOrName = declarationPathSegments[0];
  const isScopedPackage = scopeOrName.startsWith("@");

  if (isScopedPackage) {
    return declarationPathSegments.slice(0, 2).join("/");
  }

  return scopeOrName;
}

export function isJSONModule(module: string): boolean {
  return module.endsWith(".json");
}

export function isBinaryModule(module: string): boolean {
  return module.endsWith(".node");
}

export function isJavaScriptModule(module: string): boolean {
  const extension = path.extname(module);

  return (
    extension === ".js" ||
    extension === ".jsx" ||
    extension === ".mjs" ||
    extension === ".cjs"
  );
}

export function isTypeScriptModule(module: string): boolean {
  const extension = path.extname(module);

  return extension === ".ts" || extension === ".tsx";
}

export function isTypeScriptDeclarationFile(module: string): boolean {
  return module.endsWith(".d.ts");
}

export function isTestFile(fileName: string): boolean {
  return fileName.includes(".test") || fileName.includes(".spec");
}

export function isMinifiedFile(fileName: string): boolean {
  return fileName.includes(".min");
}

function collectThirdPartyModule(
  moduleDeclaration: string,
  resolvedNodePath: string,
  projectGraph: DependencyResolverOptions["projectGraph"]
) {
  const dependencyName =
    extractNpmNameFromThirdPartyModuleDeclaration(moduleDeclaration);

  projectGraph.mergeVertexBody(resolvedNodePath, (body) => {
    body.thirdPartyDependencies = Array.from(
      new Set(body.thirdPartyDependencies.concat(dependencyName))
    );
  });
}

export class EcmaScriptDependencyResolver implements DependencyResolver {
  async resolve({
    moduleDeclaration,
    projectGraph,
    config,
    rawNodePath,
    resolvedNodePath,
    workspaceConfiguration,
    followModuleDeclaration
  }: DependencyResolverOptions): Promise<DependencyResolverControlFlow> {
    if (isBinaryModule(moduleDeclaration) || isJSONModule(moduleDeclaration)) {
      return continueResolution();
    }

    if (isBuiltinModule(moduleDeclaration)) {
      if (!config.dependencyTracking.builtin) {
        return continueResolution();
      }

      projectGraph.mergeVertexBody(resolvedNodePath, (body) => {
        body.builtinDependencies =
          body.builtinDependencies.concat(moduleDeclaration);
      });
    } else if (isTypeScriptPathAlias(moduleDeclaration)) {
      const resolvedModulePath = resolvePathAlias(
        moduleDeclaration,
        path.dirname(config.tsConfigPath)
      );

      if (resolvedModulePath) {
        await followModuleDeclaration({
          moduleDeclaration: resolvedModulePath,
          rootPath: resolvedNodePath,
          isPathAliasDeclaration: true
        });
      }
    } else if (
      isTypeScriptRelativePathWithNoLeadingIdentifier(
        workspaceConfiguration.typescript.baseUrl,
        moduleDeclaration
      )
    ) {
      const moduleSuccessfullyResolved = await followModuleDeclaration({
        rootPath: rawNodePath,
        moduleDeclaration,
        isPathAliasDeclaration: true,
        pathAliasBaseUrl: workspaceConfiguration.typescript.baseUrl
      });

      // In the context of TypeScript, a module declaration such as "libs/foo" could
      // be interpreted as a path alias or a third-party module. If the module
      // is not found following the module resolution, it means that it is probably a third-party
      // module.
      if (
        !moduleSuccessfullyResolved &&
        isThirdPartyModule(moduleDeclaration, kExpectedModuleExtensions)
      ) {
        if (!config.dependencyTracking.thirdParty) {
          return continueResolution();
        }

        collectThirdPartyModule(
          moduleDeclaration,
          resolvedNodePath,
          projectGraph
        );
      }
    } else if (
      isThirdPartyModule(moduleDeclaration, kExpectedModuleExtensions)
    ) {
      if (!config.dependencyTracking.thirdParty) {
        return continueResolution();
      }

      collectThirdPartyModule(
        moduleDeclaration,
        resolvedNodePath,
        projectGraph
      );
    } else {
      await followModuleDeclaration({
        rootPath: rawNodePath,
        moduleDeclaration
      });
    }

    return continueResolution();
  }
}
