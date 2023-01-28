import type { DiGraph } from "digraph-js";
import { Option } from "effect";

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
} from "./helpers.js";

export interface DependencyResolverOptions {
  moduleDeclaration: string;
  projectGraph: DiGraph<SkottNode>;
  config: SkottConfig;
  rawNodePath: string;
  resolvedNodePath: string;
  followModuleDeclaration: (
    args: FollowModuleDeclarationOptions
  ) => Promise<void>;
}

export interface DependencyResolver {
  resolve(
    options: DependencyResolverOptions
  ): Promise<Option.Option<{ exitOnResolve: boolean }>>;
}

export class EcmaScriptDependencyResolver implements DependencyResolver {
  async resolve({
    moduleDeclaration,
    projectGraph,
    config,
    rawNodePath,
    resolvedNodePath,
    followModuleDeclaration
  }: DependencyResolverOptions) {
    if (isBinaryModule(moduleDeclaration) || isJSONModule(moduleDeclaration)) {
      return Option.none;
    }

    if (isBuiltinModule(moduleDeclaration)) {
      if (!config.dependencyTracking.builtin) {
        return Option.none;
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
        return Option.none;
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

    // The default resolver should not allow other resolvers to run after
    return Option.none;
  }
}
