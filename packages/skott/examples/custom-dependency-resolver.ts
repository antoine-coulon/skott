import { Option } from "effect";

import skott from "../index.js";
import { DependencyResolverOptions } from "../src/modules/resolvers/base-resolver.js";

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

    return Option.none;
  }
}

skott({
  entrypoint: "./with-custom-resolver.ts",
  dependencyResolvers: [new CustomDependencyResolver()]
}).then(({ getStructure }) => {
  const { graph } = getStructure();
  console.log(graph["with-custom-resolver.ts"]);
});
