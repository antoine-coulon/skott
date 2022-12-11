/* eslint-disable max-classes-per-file */
import { expect } from "chai";

import {
  createNodeHash,
  makeInitialSkottNodeValue,
  SkottCache,
  SkottCachedNode
} from "../../src/cache/handler";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer";
import { ModuleWalker, WalkerSelector } from "../../src/modules/walkers/common";
import { JavaScriptModuleWalker } from "../../src/modules/walkers/ecmascript";
import { defaultConfig, Skott } from "../../src/skott";
import {
  fakeNodeBody,
  InMemoryFileReader,
  mountFakeFileSystem
} from "../ecmascript/shared";

function dictFromCache(cache: SkottCache): Record<string, SkottCachedNode> {
  return Object.fromEntries(cache.entries());
}

const defaultIncrementalConfig = {
  ...defaultConfig,
  incremental: true
};

class NotWorkingWalkerSelector {
  public getAppropriateWalker(): void {
    throw new Error("It should not get to there!");
  }
}

const fileWriter = new InMemoryFileWriter();
const fileReader = new InMemoryFileReader();
const walkerSelector = new WalkerSelector();

describe("Incremental analysis", () => {
  describe("When Skott runs an analysis for the first time", () => {
    const hashFromTheOnlyExistingFile = createNodeHash("const a = 1;");

    function makeNewSkottInstance(entrypoint?: string): Skott {
      return new Skott(
        { ...defaultIncrementalConfig, entrypoint, incremental: true },
        fileReader,
        fileWriter,
        walkerSelector
      );
    }

    describe("When providing an entrypoint", () => {
      it("should store the generated graph in its cache", async () => {
        mountFakeFileSystem({
          "index.js": "const a = 1;"
        });

        const skottInstance = makeNewSkottInstance("index.js");
        expect(skottInstance.getStructureCache().size).to.eq(0);

        await skottInstance.initialize();

        expect(dictFromCache(skottInstance.getStructureCache())).to.deep.equal({
          "index.js": {
            hash: hashFromTheOnlyExistingFile,
            value: makeInitialSkottNodeValue("index.js")
          }
        });
      });
    });

    describe("When not providing an entrypoint", () => {
      it("should store the generated graph in its cache", async () => {
        mountFakeFileSystem({
          "index.js": "const a = 1;",
          "lib.js": "const a = 1;"
        });

        const skottInstance = makeNewSkottInstance();
        expect(skottInstance.getStructureCache().size).to.eq(0);

        await skottInstance.initialize();

        expect(dictFromCache(skottInstance.getStructureCache())).to.deep.equal({
          "index.js": {
            hash: hashFromTheOnlyExistingFile,
            value: makeInitialSkottNodeValue("index.js")
          },
          "lib.js": {
            hash: hashFromTheOnlyExistingFile,
            value: makeInitialSkottNodeValue("lib.js")
          }
        });
      });
    });
  });

  describe("When Skott runs an analysis for the second time", () => {
    describe("When dealing with independent files with no links between each other", () => {
      describe("When files have not changed since the last run", () => {
        describe("When having a filled cache and providing a broken Module Walker", () => {
          it("should be able to retrieve the graph structure using cache while parsing is voluntarily broken", async () => {
            mountFakeFileSystem({
              "index.js": "const a = 1;",
              "lib.js": "const b = 2;"
            });

            const indexHash = createNodeHash("const a = 1;");
            const libHash = createNodeHash("const b = 2;");
            const skott = new Skott(
              { ...defaultIncrementalConfig, entrypoint: undefined },
              fileReader,
              fileWriter,
              walkerSelector
            );

            await skott.initialize();

            const expectedCache = {
              "index.js": {
                hash: indexHash,
                value: makeInitialSkottNodeValue("index.js")
              },
              "lib.js": {
                hash: libHash,
                value: makeInitialSkottNodeValue("lib.js")
              }
            };

            expect(dictFromCache(skott.getStructureCache())).to.deep.equal(
              expectedCache
            );

            /**
             * No files changed at this point.
             * We now want to re-run Skott but now with a broken walker, meaning that
             * if we succeed to get the graph structure, it means that Skott did not
             * parse the files again, otherwise we wouldn't be able to get the structure.
             */

            const skottWithCacheAndBrokenWalker = new Skott(
              { ...defaultIncrementalConfig, entrypoint: undefined },
              fileReader,
              fileWriter,
              new NotWorkingWalkerSelector() as any
            );

            const { getStructure } =
              await skottWithCacheAndBrokenWalker.initialize();

            expect(
              dictFromCache(skottWithCacheAndBrokenWalker.getStructureCache())
            ).to.deep.equal(expectedCache);

            expect(getStructure().graph).to.deep.equal({
              "index.js": makeInitialSkottNodeValue("index.js"),
              "lib.js": makeInitialSkottNodeValue("lib.js")
            });
          });
        });
      });

      describe("When files changed since the last run", () => {
        it("should be able to retrieve the graph structure using cache and re-compute files that changed/added", async () => {
          mountFakeFileSystem({
            "index.js": "const a = 1;",
            "lib.js": "const b = 2;"
          });

          const indexHash = createNodeHash("const a = 1;");
          const libHash = createNodeHash("const b = 2;");
          const skottWithoutCache = new Skott(
            { ...defaultIncrementalConfig, entrypoint: undefined },
            fileReader,
            fileWriter,
            walkerSelector
          );

          await skottWithoutCache.initialize();

          const expectedCache = {
            "index.js": {
              hash: indexHash,
              value: makeInitialSkottNodeValue("index.js")
            },
            "lib.js": {
              hash: libHash,
              value: makeInitialSkottNodeValue("lib.js")
            }
          };

          expect(
            dictFromCache(skottWithoutCache.getStructureCache())
          ).to.deep.equal(expectedCache);

          const updatedNodeContent = "const b = 2; function something() {}";
          const updatedHashContent = createNodeHash(updatedNodeContent);
          const newNodeContent = "export function somethingNew() {}";
          const newHashContent = createNodeHash(newNodeContent);

          mountFakeFileSystem({
            "index.js": "const a = 1;",
            // File content is changing right there
            "lib.js": updatedNodeContent,
            // New file is added
            "someNewFile.js": newNodeContent,
            "SKOTT_CACHE.json": JSON.stringify(
              dictFromCache(skottWithoutCache.getStructureCache())
            )
          });

          const affectedFilesThatShouldNotBeRetrievedFromCache: string[] = [];

          class WalkerSelectorWithFileTracking {
            public getAppropriateWalker(fileName: string): ModuleWalker {
              // This step must only occur for the files that changed or that were added
              // We want to track which files are affected by the change
              // and assert that only the changed/added files are affected
              affectedFilesThatShouldNotBeRetrievedFromCache.push(fileName);

              return new JavaScriptModuleWalker();
            }
          }

          const skottWithCache = new Skott(
            { ...defaultIncrementalConfig, entrypoint: undefined },
            fileReader,
            fileWriter,
            new WalkerSelectorWithFileTracking() as any
          );

          const { getStructure } = await skottWithCache.initialize();

          expect(affectedFilesThatShouldNotBeRetrievedFromCache).to.deep.equal([
            "lib.js",
            "someNewFile.js"
          ]);

          expect(
            dictFromCache(skottWithCache.getStructureCache())
          ).to.deep.equal({
            ...expectedCache,
            "lib.js": {
              hash: updatedHashContent,
              value: makeInitialSkottNodeValue("lib.js")
            },
            "someNewFile.js": {
              hash: newHashContent,
              value: makeInitialSkottNodeValue("someNewFile.js")
            }
          });

          expect(getStructure().graph).to.deep.equal({
            "index.js": makeInitialSkottNodeValue("index.js"),
            "lib.js": makeInitialSkottNodeValue("lib.js"),
            "someNewFile.js": makeInitialSkottNodeValue("someNewFile.js")
          });
        });
      });
    });

    describe("When dealing with files having dependencies", () => {
      describe("When files have not changed since the last run", () => {
        describe("When dealing with links that must be resolved correctly with a flat directory", () => {
          it("should restore nodes dependencies without having to parse file content again", async () => {
            const indexFileContent = `
              import { something } from "./src/lib.js";
            
              export function main() {}
            `;
            const libFileContent = `
              import { runPromise } from "@effect-ts/core/Effect";
              export function something() {}
            `;

            mountFakeFileSystem({
              "index.js": indexFileContent,
              "src/lib.js": libFileContent
            });

            const indexHash = createNodeHash(indexFileContent);
            const libHash = createNodeHash(libFileContent);
            const skott = new Skott(
              {
                ...defaultIncrementalConfig,
                entrypoint: "index.js",
                dependencyTracking: {
                  thirdParty: true,
                  builtin: false,
                  typeOnly: true
                }
              },
              fileReader,
              fileWriter,
              walkerSelector
            );

            const { getStructure } = await skott.initialize();
            const expectedGraphStructure = {
              "index.js": {
                id: "index.js",
                adjacentTo: ["src/lib.js"],
                body: fakeNodeBody
              },
              "src/lib.js": {
                id: "src/lib.js",
                adjacentTo: [],
                body: {
                  ...fakeNodeBody,
                  thirdPartyDependencies: ["@effect-ts/core"]
                }
              }
            };
            const expectedCache = {
              "index.js": {
                hash: indexHash,
                value: expectedGraphStructure["index.js"]
              },
              "src/lib.js": {
                hash: libHash,
                value: expectedGraphStructure["src/lib.js"]
              }
            };

            expect(getStructure().graph).to.deep.equal(expectedGraphStructure);
            expect(dictFromCache(skott.getStructureCache())).to.deep.equal(
              expectedCache
            );

            const secondSkottInstance = new Skott(
              {
                ...defaultIncrementalConfig,
                entrypoint: "index.js",
                dependencyTracking: {
                  thirdParty: true,
                  builtin: false,
                  typeOnly: false
                }
              },
              fileReader,
              fileWriter,
              new NotWorkingWalkerSelector() as any
            );

            const { getStructure: getStructureSecondInstance } =
              await secondSkottInstance.initialize();

            expect(getStructureSecondInstance().graph).to.deep.equal(
              expectedGraphStructure
            );
            expect(
              dictFromCache(secondSkottInstance.getStructureCache())
            ).to.deep.equal(expectedCache);
          });
        });

        describe("When dealing with links that must be resolved correctly with a nested directory", () => {
          it("should restore nodes dependencies without having to parse file content again", async () => {
            const indexFileContent = `
              import { something } from "../lib/index.js";
            
              export function main() {}
            `;
            const libFileContent = `
              import path from "node:path";
              import { pipe } from "@effect-ts/core/Function";
              export function something() {}
            `;

            mountFakeFileSystem({
              "src/index.js": indexFileContent,
              "lib/index.js": libFileContent
            });

            const indexHash = createNodeHash(indexFileContent);
            const libHash = createNodeHash(libFileContent);
            const skottWithoutCache = new Skott(
              {
                ...defaultIncrementalConfig,
                includeBaseDir: false,
                entrypoint: "src/index.js",
                dependencyTracking: {
                  thirdParty: true,
                  builtin: true,
                  typeOnly: false
                }
              },
              fileReader,
              fileWriter,
              walkerSelector
            );

            const { getStructure } = await skottWithoutCache.initialize();
            const expectedGraphStructure = {
              "index.js": {
                id: "index.js",
                adjacentTo: ["../lib/index.js"],
                body: fakeNodeBody
              },
              "../lib/index.js": {
                id: "../lib/index.js",
                adjacentTo: [],
                body: {
                  size: 0,
                  thirdPartyDependencies: ["@effect-ts/core"],
                  builtinDependencies: ["node:path"]
                }
              }
            };
            const expectedCache = {
              "index.js": {
                hash: indexHash,
                value: expectedGraphStructure["index.js"]
              },
              "../lib/index.js": {
                hash: libHash,
                value: expectedGraphStructure["../lib/index.js"]
              }
            };

            expect(getStructure().graph).to.deep.equal(expectedGraphStructure);
            expect(
              dictFromCache(skottWithoutCache.getStructureCache())
            ).to.deep.equal(expectedCache);

            const skottWithCacheAndBrokenWalker = new Skott(
              {
                ...defaultIncrementalConfig,
                includeBaseDir: false,
                entrypoint: "src/index.js",
                dependencyTracking: {
                  thirdParty: true,
                  builtin: true,
                  typeOnly: false
                }
              },
              fileReader,
              fileWriter,
              new NotWorkingWalkerSelector() as any
            );

            const { getStructure: getStructureRebuiltBasedOnCache } =
              await skottWithCacheAndBrokenWalker.initialize();

            expect(getStructureRebuiltBasedOnCache().graph).to.deep.equal(
              expectedGraphStructure
            );
            expect(
              dictFromCache(skottWithCacheAndBrokenWalker.getStructureCache())
            ).to.deep.equal(expectedCache);
          });
        });
      });

      describe("When files changed since the last run", () => {
        it("should be able to retrieve the graph structure using cache and re-compute files that changed/added", async () => {
          const indexFileContent = `
              import { something } from "./lib.js";
            
              export function main() {}
            `;
          const libFileContent = `
              import { runPromise } from "@effect-ts/core/Effect";
              export function something() {}
          `;

          mountFakeFileSystem({
            "index.js": indexFileContent,
            "lib.js": libFileContent
          });

          const skott = new Skott(
            {
              ...defaultIncrementalConfig,
              entrypoint: "index.js",
              dependencyTracking: {
                thirdParty: true,
                builtin: false,
                typeOnly: false
              }
            },
            fileReader,
            fileWriter,
            walkerSelector
          );

          const { getStructure } = await skott.initialize();

          const expectedGraphStructure = {
            "index.js": {
              id: "index.js",
              adjacentTo: ["lib.js"],
              body: fakeNodeBody
            },
            "lib.js": {
              id: "lib.js",
              adjacentTo: [],
              body: {
                ...fakeNodeBody,
                thirdPartyDependencies: ["@effect-ts/core"]
              }
            }
          };

          expect(getStructure().graph).to.deep.equal(expectedGraphStructure);

          // Simulate changes in the filesystem previously analyzed
          mountFakeFileSystem({
            "index.js": `
              import { something } from "./lib.js";
              import { something } from "./newlyAddedFile.js";
              export function main() {}
            `,
            "lib.js": libFileContent,
            "newlyAddedFile.js": `
              export function something() {}
            `,
            "SKOTT_CACHE.json": JSON.stringify(
              dictFromCache(skott.getStructureCache())
            )
          });

          const affectedFilesThatShouldNotBeRetrievedFromCache: string[] = [];

          class WalkerSelectorWithFileTracking {
            public getAppropriateWalker(fileName: string): ModuleWalker {
              // This step must only occur for the files that changed or that were added
              // We want to track which files are affected by the change
              // and assert that only the changed/added files are affected
              affectedFilesThatShouldNotBeRetrievedFromCache.push(fileName);

              return new JavaScriptModuleWalker();
            }
          }

          const skottWithCache = new Skott(
            {
              ...defaultIncrementalConfig,
              entrypoint: "index.js",
              dependencyTracking: {
                thirdParty: true,
                builtin: false,
                typeOnly: false
              }
            },
            fileReader,
            fileWriter,
            new WalkerSelectorWithFileTracking() as any
          );

          await skottWithCache.initialize();

          expect(affectedFilesThatShouldNotBeRetrievedFromCache).to.deep.equal([
            "index.js",
            "newlyAddedFile.js"
          ]);

          const { getStructure: getAffectedStructure } =
            await skottWithCache.initialize();

          const expectedAffectedGraphStructure = {
            "index.js": {
              id: "index.js",
              adjacentTo: ["lib.js", "newlyAddedFile.js"],
              body: fakeNodeBody
            },
            "lib.js": expectedGraphStructure["lib.js"],
            "newlyAddedFile.js": {
              id: "newlyAddedFile.js",
              adjacentTo: [],
              body: fakeNodeBody
            }
          };

          expect(getAffectedStructure().graph).to.deep.equal(
            expectedAffectedGraphStructure
          );
        });
      });
    });
  });
});
