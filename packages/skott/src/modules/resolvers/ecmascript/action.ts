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
  nodePath: string;
  followModuleDeclaration: (args: FollowModuleDeclarationOptions) => A;
}

interface ResolverResult {
  followModuleDeclaration: boolean;
}

export default async function moduleAction<T extends DiGraph<SkottNode>, A>({
  moduleDeclaration,
  config,
  projectGraph,
  nodePath,
  followModuleDeclaration
}: ResolverOptions<T, A>): Promise<ResolverResult> {
  if (isBinaryModule(moduleDeclaration) || isJSONModule(moduleDeclaration)) {
    return {
      followModuleDeclaration: false
    };
  }

  if (isBuiltinModule(moduleDeclaration)) {
    if (!config.dependencyTracking.builtin) {
      return {
        followModuleDeclaration: false
      };
    }

    projectGraph.mergeVertexBody(nodePath, (body) => {
      body.builtinDependencies =
        body.builtinDependencies.concat(moduleDeclaration);
    });
  } else if (isTypeScriptPathAlias(moduleDeclaration)) {
    const resolvedModulePath = resolvePathAlias(moduleDeclaration);

    if (resolvedModulePath) {
      await followModuleDeclaration({
        moduleDeclaration: resolvedModulePath,
        rootPath: nodePath,
        isPathAliasDeclaration: true
      });
    }
  } else if (isThirdPartyModule(moduleDeclaration)) {
    if (!config.dependencyTracking.thirdParty) {
      return {
        followModuleDeclaration: false
      };
    }

    const dependencyName =
      extractNpmNameFromThirdPartyModuleDeclaration(moduleDeclaration);

    projectGraph.mergeVertexBody(nodePath, (body) => {
      body.thirdPartyDependencies = Array.from(
        new Set(body.thirdPartyDependencies.concat(dependencyName))
      );
    });
  }

  return {
    followModuleDeclaration: true
  };
}
