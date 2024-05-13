// Just for the sake of the example
import * as _Effect from "@effect/io/Effect";

import skott from "../index.js";
import {
  continueResolution,
  type DependencyResolver,
  type DependencyResolverOptions
} from "../src/modules/resolvers/base-resolver.js";

class BasicDependencyResolver implements DependencyResolver {
  async resolve({
    moduleDeclaration,
    resolvedNodePath,
    projectGraph
  }: DependencyResolverOptions) {
    if (moduleDeclaration === "effect") {
      projectGraph.mergeVertexBody(resolvedNodePath, (body) => {
        body.thirdPartyDependencies = ["effect"];
      });
    }

    return continueResolution();
  }
}

skott({
  entrypoint: "./dependency-resolver-basic.ts",
  dependencyResolvers: [new BasicDependencyResolver()]
}).then(({ getStructure }) => {
  const { graph } = getStructure();
  console.log(graph["dependency-resolver-basic.ts"]);
});
