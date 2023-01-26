import type { DiGraph } from "digraph-js";

import { SkottConfig, SkottNode } from "../../skott";
import {
  extractNpmNameFromThirdPartyModuleDeclaration,
  isBinaryModule,
  isBuiltinModule,
  isJSONModule,
  isThirdPartyModule
} from "../walkers/ecmascript/module-resolver.js";
import {
  isTypeScriptPathAlias,
  resolvePathAlias
} from "../walkers/ecmascript/typescript/path-alias";

interface ResolverOptions<T extends DiGraph<SkottNode>> {
  moduleDeclaration: string;
  projectGraph: T;
  config: SkottConfig;
  nodePath: string;
}

interface AdditionalModuleDeclaration {
  moduleDeclaration: string;
  isPathAlias: boolean;
}

interface ResolverResult {
  followModuleDeclaration: boolean;
  additionalModuleDeclarationsToFollow: AdditionalModuleDeclaration[];
}

export default function resolver<T extends DiGraph<SkottNode>>({
  moduleDeclaration,
  config,
  projectGraph,
  nodePath
}: ResolverOptions<T>): ResolverResult {
  const additionalModuleDeclarations: AdditionalModuleDeclaration[] = [];

  if (isBinaryModule(moduleDeclaration) || isJSONModule(moduleDeclaration)) {
    return {
      additionalModuleDeclarationsToFollow: additionalModuleDeclarations,
      followModuleDeclaration: false
    };
  }

  if (isBuiltinModule(moduleDeclaration)) {
    if (!config.dependencyTracking.builtin) {
      return {
        additionalModuleDeclarationsToFollow: additionalModuleDeclarations,
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
      additionalModuleDeclarations.push({
        moduleDeclaration: resolvedModulePath,
        isPathAlias: true
      });
    }
  } else if (isThirdPartyModule(moduleDeclaration)) {
    if (!config.dependencyTracking.thirdParty) {
      return {
        additionalModuleDeclarationsToFollow: [],
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
    additionalModuleDeclarationsToFollow: additionalModuleDeclarations,
    followModuleDeclaration: true
  };
}
