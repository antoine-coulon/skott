/* eslint-disable max-classes-per-file */
import { describe, expect, it } from "vitest";

import { createNodeHash } from "../../../src/cache/affected.js";
import {
  createInitialSkottNodeValue,
  kSkottCacheFileName,
  SkottCache,
  SkottCachedNode
} from "../../../src/cache/handler.js";
import { InMemoryFileReader } from "../../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../../src/filesystem/file-writer.js";
import { FakeLogger } from "../../../src/logger.js";
import {
  ModuleWalker,
  ModuleWalkerSelector
} from "../../../src/modules/walkers/common.js";
import { JavaScriptModuleWalker } from "../../../src/modules/walkers/ecmascript/index.js";
import { defaultConfig, Skott } from "../../../src/skott.js";
import { fakeNodeBody, mountFakeFileSystem } from "../shared.js";

function dictFromCache(
  cache: SkottCache<unknown>
): Record<string, SkottCachedNode<unknown>> {
  return Object.fromEntries(cache.sourceFiles.entries());
}

const defaultIncrementalConfig = {
  ...defaultConfig,
  incremental: true
};

class NotWorkingWalkerSelector {
  public selectAppropriateModuleWalker(): void {
    throw new Error("It should not get to there!");
  }
}

const fileWriter = new InMemoryFileWriter();
const fileReader = new InMemoryFileReader();
const walkerSelector = new ModuleWalkerSelector();
const logger = new FakeLogger();

describe("Incremental analysis", () => {
  describe("When Skott runs an analysis for the first time", () => {
    const hashFromTheOnlyExistingFile = createNodeHash("const a = 1;");

    function makeNewSkottInstance(
      entrypoint?: string,
      config = defaultIncrementalConfig
    ): Skott<unknown> {
      return new Skott(
        { ...config, entrypoint },
        fileReader,
        fileWriter,
        walkerSelector,
        logger
      );
    }

    describe("When inspecting the provided configuration", () => {
      describe("When the provided configuration change since the last analysis", () => {
        it("should invalidate the cache and store the new configuration hash", async () => {
          const fileContent = `
            const x = 2;
          `;
          mountFakeFileSystem({
            "index.js": fileContent
          });

          const initialConfiguration = {
            ...defaultIncrementalConfig,
            entrypoint: "index.js",
            dependencyTracking: {
              builtin: false,
              thirdParty: false,
              typeOnly: false
            }
          };
          const skottInstance = makeNewSkottInstance(
            "index.js",
            initialConfiguration
          );
          const { getStructure } = await skottInstance.initialize();

          expect(skottInstance.getStructureCache().configurationHash).to.equal(
            createNodeHash(JSON.stringify(initialConfiguration))
          );

          expect(getStructure().graph).to.deep.equal({
            "index.js": {
              body: {
                ...fakeNodeBody,
                builtinDependencies: []
              },
              id: "index.js",
              adjacentTo: []
            }
          });

          mountFakeFileSystem({
            "index.js": fileContent,
            [kSkottCacheFileName]: JSON.stringify({
              configuration:
                skottInstance.getStructureCache().configurationHash,
              sourceFiles: {
                "index.js": {
                  hash: hashFromTheOnlyExistingFile,
                  value: createInitialSkottNodeValue("index.js")
                }
              }
            })
          });

          const modifiedConfig = {
            ...initialConfiguration,
            dependencyTracking: {
              ...initialConfiguration.dependencyTracking,
              builtin: true
            }
          };
          const newSkottInstanceWithModifiedConfig = makeNewSkottInstance(
            "index.js",
            modifiedConfig
          );
          const modifiedConfigHash = createNodeHash(
            JSON.stringify(modifiedConfig)
          );

          const {
            sourceFiles: invalidatedSourceFiles,
            configurationHash: modifiedConfigurationHash
          } = newSkottInstanceWithModifiedConfig.getStructureCache();

          expect(invalidatedSourceFiles.size).to.equal(0);
          expect(modifiedConfigurationHash).to.equal(modifiedConfigHash);

          // restart the analysis process
          await newSkottInstanceWithModifiedConfig.initialize();

          const newSkottInstanceWithSameConfigAsBefore = makeNewSkottInstance(
            "index.js",
            modifiedConfig
          );
          const {
            configurationHash: sameConfigurationHashAsBefore,
            sourceFiles: sourceFilesFromCache
          } = newSkottInstanceWithSameConfigAsBefore.getStructureCache();
          expect(sourceFilesFromCache.size).to.equal(1);
          expect(sameConfigurationHashAsBefore).to.equal(modifiedConfigHash);
        });
      });
    });

    describe("When providing an entrypoint", () => {
      it("should store the generated graph in its cache", async () => {
        mountFakeFileSystem({
          "index.js": "const a = 1;"
        });

        const skottInstance = makeNewSkottInstance("index.js");
        expect(skottInstance.getStructureCache().sourceFiles.size).to.eq(0);

        await skottInstance.initialize();

        expect(dictFromCache(skottInstance.getStructureCache())).to.deep.equal({
          "index.js": {
            hash: hashFromTheOnlyExistingFile,
            value: createInitialSkottNodeValue("index.js")
          }
        });
      });

      it("should store the generated graph in its cache", async () => {
        const hashFromIndex = createNodeHash(
          "import { FileReader } from './filesystem/file-reader.js'"
        );
        const fileReaderContent = `
          import {
            isDirSupportedByDefault,
            isFileSupportedByDefault
          } from "../modules/walkers/ecmascript/module-resolver.js";          
        `;
        const hashFromFileReader = createNodeHash(fileReaderContent);
        const hashFromModuleResolver = createNodeHash(
          "const myModule = 'abc';"
        );
        mountFakeFileSystem({
          "index.ts":
            "import { FileReader } from './filesystem/file-reader.js'",
          "filesystem/file-reader.ts": fileReaderContent,
          "modules/walkers/ecmascript/module-resolver.ts":
            "const myModule = 'abc';"
        });

        const skottInstance = makeNewSkottInstance("index.ts");

        await skottInstance.initialize();

        expect(dictFromCache(skottInstance.getStructureCache())).to.deep.equal({
          "index.ts": {
            hash: hashFromIndex,
            value: {
              id: "index.ts",
              body: fakeNodeBody,
              adjacentTo: ["filesystem/file-reader.ts"]
            }
          },
          "filesystem/file-reader.ts": {
            hash: hashFromFileReader,
            value: {
              id: "filesystem/file-reader.ts",
              body: fakeNodeBody,
              adjacentTo: ["modules/walkers/ecmascript/module-resolver.ts"]
            }
          },
          "modules/walkers/ecmascript/module-resolver.ts": {
            hash: hashFromModuleResolver,
            value: createInitialSkottNodeValue(
              "modules/walkers/ecmascript/module-resolver.ts"
            )
          }
        });

        const skottInstance2 = makeNewSkottInstance("index.ts");

        await skottInstance2.initialize();

        expect(dictFromCache(skottInstance2.getStructureCache())).to.deep.equal(
          {
            "index.ts": {
              hash: hashFromIndex,
              value: {
                id: "index.ts",
                body: fakeNodeBody,
                adjacentTo: ["filesystem/file-reader.ts"]
              }
            },
            "filesystem/file-reader.ts": {
              hash: hashFromFileReader,
              value: {
                id: "filesystem/file-reader.ts",
                body: fakeNodeBody,
                adjacentTo: ["modules/walkers/ecmascript/module-resolver.ts"]
              }
            },
            "modules/walkers/ecmascript/module-resolver.ts": {
              hash: hashFromModuleResolver,
              value: createInitialSkottNodeValue(
                "modules/walkers/ecmascript/module-resolver.ts"
              )
            }
          }
        );
      });
    });

    describe("When not providing an entrypoint", () => {
      it("should store the generated graph in its cache", async () => {
        mountFakeFileSystem({
          "index.js": "const a = 1;",
          "lib.js": "const a = 1;"
        });

        const skottInstance = makeNewSkottInstance();
        expect(skottInstance.getStructureCache().sourceFiles.size).to.eq(0);

        await skottInstance.initialize();

        expect(dictFromCache(skottInstance.getStructureCache())).to.deep.equal({
          "index.js": {
            hash: hashFromTheOnlyExistingFile,
            value: createInitialSkottNodeValue("index.js")
          },
          "lib.js": {
            hash: hashFromTheOnlyExistingFile,
            value: createInitialSkottNodeValue("lib.js")
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
              walkerSelector,
              logger
            );

            await skott.initialize();

            const expectedCache = {
              "index.js": {
                hash: indexHash,
                value: createInitialSkottNodeValue("index.js")
              },
              "lib.js": {
                hash: libHash,
                value: createInitialSkottNodeValue("lib.js")
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
              new NotWorkingWalkerSelector() as any,
              logger
            );

            const { getStructure } =
              await skottWithCacheAndBrokenWalker.initialize();

            expect(
              dictFromCache(skottWithCacheAndBrokenWalker.getStructureCache())
            ).to.deep.equal(expectedCache);

            expect(getStructure().graph).to.deep.equal({
              "index.js": createInitialSkottNodeValue("index.js"),
              "lib.js": createInitialSkottNodeValue("lib.js")
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
          const initialConfiguration = {
            ...defaultIncrementalConfig,
            entrypoint: undefined
          };
          const skottWithoutCache = new Skott(
            initialConfiguration,
            fileReader,
            fileWriter,
            walkerSelector,
            logger
          );

          await skottWithoutCache.initialize();

          const expectedCache = {
            "index.js": {
              hash: indexHash,
              value: createInitialSkottNodeValue("index.js")
            },
            "lib.js": {
              hash: libHash,
              value: createInitialSkottNodeValue("lib.js")
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
            [kSkottCacheFileName]: JSON.stringify({
              configuration: createNodeHash(
                JSON.stringify(initialConfiguration)
              ),
              sourceFiles: dictFromCache(skottWithoutCache.getStructureCache())
            })
          });

          const affectedFilesThatShouldNotBeRetrievedFromCache: string[] = [];

          class WalkerSelectorWithFileTracking {
            public selectAppropriateModuleWalker(
              fileName: string
            ): ModuleWalker {
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
            new WalkerSelectorWithFileTracking() as any,
            logger
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
              value: createInitialSkottNodeValue("lib.js")
            },
            "someNewFile.js": {
              hash: newHashContent,
              value: createInitialSkottNodeValue("someNewFile.js")
            }
          });

          expect(getStructure().graph).to.deep.equal({
            "index.js": createInitialSkottNodeValue("index.js"),
            "lib.js": createInitialSkottNodeValue("lib.js"),
            "someNewFile.js": createInitialSkottNodeValue("someNewFile.js")
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
            const initialConfiguration = {
              ...defaultIncrementalConfig,
              entrypoint: "index.js",
              dependencyTracking: {
                thirdParty: true,
                builtin: false,
                typeOnly: false
              }
            };
            const skott = new Skott(
              initialConfiguration,
              fileReader,
              fileWriter,
              walkerSelector,
              logger
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
              initialConfiguration,
              fileReader,
              fileWriter,
              new NotWorkingWalkerSelector() as any,
              logger
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
            const initialConfig = {
              ...defaultIncrementalConfig,
              includeBaseDir: false,
              entrypoint: "src/index.js",
              dependencyTracking: {
                thirdParty: true,
                builtin: true,
                typeOnly: false
              }
            };
            const skottWithoutCache = new Skott(
              initialConfig,
              fileReader,
              fileWriter,
              walkerSelector,
              logger
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
              initialConfig,
              fileReader,
              fileWriter,
              new NotWorkingWalkerSelector() as any,
              logger
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

          const initialConfiguration = {
            ...defaultIncrementalConfig,
            entrypoint: "index.js",
            dependencyTracking: {
              thirdParty: true,
              builtin: false,
              typeOnly: false
            }
          };
          const skott = new Skott(
            initialConfiguration,
            fileReader,
            fileWriter,
            walkerSelector,
            logger
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
            [kSkottCacheFileName]: JSON.stringify({
              configuration: createNodeHash(
                JSON.stringify(initialConfiguration)
              ),
              sourceFiles: dictFromCache(skott.getStructureCache())
            })
          });

          const affectedFilesThatShouldNotBeRetrievedFromCache: string[] = [];

          class WalkerSelectorWithFileTracking {
            public selectAppropriateModuleWalker(
              fileName: string
            ): ModuleWalker {
              // This step must only occur for the files that changed or that were added
              // We want to track which files are affected by the change
              // and assert that only the changed/added files are affected
              affectedFilesThatShouldNotBeRetrievedFromCache.push(fileName);

              return new JavaScriptModuleWalker();
            }
          }

          const skottWithCache = new Skott(
            initialConfiguration,
            fileReader,
            fileWriter,
            new WalkerSelectorWithFileTracking() as any,
            logger
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
