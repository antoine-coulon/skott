import { Option } from "effect";
import { describe, expect, test } from "vitest";

import { InMemoryFileReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import {
  DependencyResolver,
  DependencyResolverOptions
} from "../../src/modules/resolvers/base-resolver.js";
import { EcmaScriptDependencyResolver } from "../../src/modules/resolvers/ecmascript/resolver.js";
import { WalkerSelector } from "../../src/modules/walkers/common.js";
import { defaultConfig, Skott } from "../../src/skott.js";
import { fakeNodeBody, mountFakeFileSystem } from "../shared.js";

describe("When using dependency resolvers", () => {
  describe("When not providing any custom resolver", () => {
    test("should use the default Skott resolver to cover standard cases", async () => {
      mountFakeFileSystem({
        "index.js": `
            import path from "node:path";
            import "./something.js";
        `,
        "something.js": `
            import { something } from "@npm-lib";
        `
      });

      const skott = new Skott(
        {
          ...defaultConfig,
          entrypoint: "index.js",
          dependencyTracking: {
            ...defaultConfig.dependencyTracking,
            builtin: true,
            thirdParty: true
          }
        },
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new WalkerSelector()
      );

      const { getStructure } = await skott.initialize();
      const { graph } = await getStructure();

      expect(graph).to.deep.equal({
        "index.js": {
          id: "index.js",
          adjacentTo: ["something.js"],
          body: { ...fakeNodeBody, builtinDependencies: ["node:path"] }
        },
        "something.js": {
          id: "something.js",
          adjacentTo: [],
          body: { ...fakeNodeBody, thirdPartyDependencies: ["@npm-lib"] }
        }
      });
    });
  });

  describe("When using only one custom resolver", () => {
    test("should allow the custom resolver to skip all module declarations", async () => {
      mountFakeFileSystem({
        "index.js": `
            import "./file2.js";
        `,
        "file2.js": `
            export function something() {}
        `
      });

      class CustomDependencyResolver implements DependencyResolver {
        async resolve() {
          // do nothing, so only the entrypoint should be added in the graph
          return Option.none;
        }
      }

      const skott = new Skott(
        { ...defaultConfig, entrypoint: "index.js" },
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new WalkerSelector(),
        [new CustomDependencyResolver()]
      );

      const { getStructure } = await skott.initialize();
      const { graph } = await getStructure();

      expect(graph).to.deep.equal({
        "index.js": {
          id: "index.js",
          adjacentTo: [],
          body: fakeNodeBody
        }
      });
    });

    test("should allow the resolver to fully customize the way module declaration are used in the graph", async () => {
      mountFakeFileSystem({
        "index.js": `
            import "./file2.js";
            import { foo } from "@my-custom-monorepo-lib";
            function foo() {}
        `,
        "file2.js": `
            export function something() {}
        `
      });

      class CustomDependencyResolver implements DependencyResolver {
        async resolve({
          moduleDeclaration,
          resolvedNodePath,
          projectGraph
        }: DependencyResolverOptions) {
          if (moduleDeclaration === "@my-custom-monorepo-lib") {
            projectGraph.mergeVertexBody(resolvedNodePath, (node) => {
              // Freely consider where to put the module declaration
              node.builtinDependencies = node.builtinDependencies.concat([
                moduleDeclaration
              ]);
            });
          }

          return Option.none;
        }
      }

      const skott = new Skott(
        { ...defaultConfig, entrypoint: "index.js" },
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new WalkerSelector(),
        [new CustomDependencyResolver()]
      );

      const { getStructure } = await skott.initialize();
      const { graph } = await getStructure();

      expect(graph).to.deep.equal({
        "index.js": {
          id: "index.js",
          adjacentTo: [],
          body: {
            ...fakeNodeBody,
            builtinDependencies: ["@my-custom-monorepo-lib"]
          }
        }
      });
    });
  });

  describe("When using multiple resolvers", () => {
    test("should allow one resolver to enhance the behavior of the other ones", async () => {
      mountFakeFileSystem({
        "index.js": `
            import { Effect } from "effect";
            import fs from "node:fs";
            import { foo } from "@my-custom-monorepo-lib";
            
            import "./file2.js";
        `,
        "file2.js": ``
      });

      class CustomDependencyResolver implements DependencyResolver {
        async resolve({
          moduleDeclaration,
          resolvedNodePath,
          projectGraph
        }: DependencyResolverOptions) {
          if (moduleDeclaration === "@my-custom-monorepo-lib") {
            projectGraph.mergeVertexBody(resolvedNodePath, (node) => {
              // Freely consider where to put the module declaration
              node.builtinDependencies = node.builtinDependencies.concat([
                moduleDeclaration
              ]);
            });

            // Exit to prevent the default resolver to handle the module declaration
            return Option.some({
              exitOnResolve: true
            });
          }

          return Option.none;
        }
      }

      const skott = new Skott(
        {
          ...defaultConfig,
          entrypoint: "index.js",
          dependencyTracking: {
            ...defaultConfig.dependencyTracking,
            thirdParty: true,
            builtin: true
          }
        },
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new WalkerSelector(),
        [new CustomDependencyResolver(), new EcmaScriptDependencyResolver()]
      );

      const { getStructure } = await skott.initialize();
      const { graph } = await getStructure();

      expect(graph).to.deep.equal({
        "index.js": {
          id: "index.js",
          adjacentTo: ["file2.js"],
          body: {
            size: 0,
            thirdPartyDependencies: ["effect"],
            builtinDependencies: ["node:fs", "@my-custom-monorepo-lib"]
          }
        },
        "file2.js": {
          id: "file2.js",
          adjacentTo: [],
          body: fakeNodeBody
        }
      });
    });
  });
});
