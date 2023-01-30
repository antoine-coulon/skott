// Just for the sake of the example
import * as _Effect from "effect";

import skott from "../index.js";
import {
  continueResolution,
  DependencyResolverOptions
} from "../src/modules/resolvers/base-resolver.js";

class CustomDependencyResolver {
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
  entrypoint: "./custom-dependency-resolver.ts",
  dependencyResolvers: [new CustomDependencyResolver()]
}).then(({ getStructure }) => {
  const { graph } = getStructure();
  console.log(graph["custom-dependency-resolver.ts"]);
});
