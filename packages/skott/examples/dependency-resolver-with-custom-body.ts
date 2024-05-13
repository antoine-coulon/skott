// @ts-ignore - Just for the sake of the example
import "async_hooks";

import skott from "../index.js";
import {
  continueResolution,
  type DependencyResolver,
  type DependencyResolverOptions
} from "../src/modules/resolvers/base-resolver.js";
import { EcmaScriptDependencyResolver } from "../src/modules/resolvers/ecmascript/resolver.js";

interface CustomDependencies {
  customDependencies: string[];
}

class CustomDependencyResolver<T extends CustomDependencies>
  implements DependencyResolver<T>
{
  async resolve({
    moduleDeclaration,
    resolvedNodePath,
    projectGraph
  }: DependencyResolverOptions<T>) {
    if (moduleDeclaration === "async_hooks") {
      projectGraph.mergeVertexBody(resolvedNodePath, (body) => {
        body.customDependencies = ["async_hooks"];
      });
    }

    return continueResolution();
  }
}

async function main() {
  // Only the Custom Dependency Resolver is used
  await skott({
    entrypoint: "./dependency-resolver-with-custom-body.ts",
    dependencyResolvers: [new CustomDependencyResolver()]
  }).then(({ getStructure }) => {
    const { graph } = getStructure();
    console.log(
      "Custom resolver",
      graph["dependency-resolver-with-custom-body.ts"]
    );
  });

  console.log("\n ------------------ \n");

  // Now we also want to use the default dependency resolvers in combination with the custom one
  // The default one will resolve all the local files and the custom one will resolve the async_hooks
  await skott({
    entrypoint: "./dependency-resolver-with-custom-body.ts",
    dependencyResolvers: [
      new CustomDependencyResolver(),
      new EcmaScriptDependencyResolver()
    ]
  }).then(({ getStructure }) => {
    const { graph } = getStructure();
    console.log(
      "Custom + EcmaScript resolvers",
      graph["dependency-resolver-with-custom-body.ts"]
    );
  });
}

main().catch(() => {});
