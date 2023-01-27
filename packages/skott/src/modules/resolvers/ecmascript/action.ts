import type { DiGraph } from "digraph-js";

import type { FollowModuleDeclarationOptions } from "../../../ioc.js";
import type { SkottConfig, SkottNode } from "../../../skott.js";
import {
  isTypeScriptPathAlias,
  resolvePathAlias
} from "../../walkers/ecmascript/typescript/path-alias.js";

import {
  extractNpmNameFromThirdPartyModuleDeclaration,
  isBinaryModule,
  isBuiltinModule,
  isJSONModule,
  isThirdPartyModule
} from "./resolver.js";

interface ResolverOptions<T extends DiGraph<SkottNode>, A> {
  moduleDeclaration: string;
  projectGraph: T;
  config: SkottConfig;
  rawNodePath: string;
  resolvedNodePath: string;
  followModuleDeclaration: (args: FollowModuleDeclarationOptions) => A;
}

export default async function moduleAction<T extends DiGraph<SkottNode>, A>({
  moduleDeclaration,
  config,
  projectGraph,
  resolvedNodePath,
  rawNodePath,
  followModuleDeclaration
}: ResolverOptions<T, A>): Promise<void> {
  if (isBinaryModule(moduleDeclaration) || isJSONModule(moduleDeclaration)) {
    return;
  }

  if (isBuiltinModule(moduleDeclaration)) {
    if (!config.dependencyTracking.builtin) {
      return;
    }

    projectGraph.mergeVertexBody(resolvedNodePath, (body) => {
      body.builtinDependencies =
        body.builtinDependencies.concat(moduleDeclaration);
    });
  } else if (isTypeScriptPathAlias(moduleDeclaration)) {
    const resolvedModulePath = resolvePathAlias(moduleDeclaration);

    if (resolvedModulePath) {
      await followModuleDeclaration({
        moduleDeclaration: resolvedModulePath,
        rootPath: resolvedNodePath,
        isPathAliasDeclaration: true
      });
    }
  } else if (isThirdPartyModule(moduleDeclaration)) {
    if (!config.dependencyTracking.thirdParty) {
      return;
    }

    const dependencyName =
      extractNpmNameFromThirdPartyModuleDeclaration(moduleDeclaration);

    projectGraph.mergeVertexBody(resolvedNodePath, (body) => {
      body.thirdPartyDependencies = Array.from(
        new Set(body.thirdPartyDependencies.concat(dependencyName))
      );
    });
  }

  await followModuleDeclaration({
    rootPath: rawNodePath,
    moduleDeclaration
  });
}
