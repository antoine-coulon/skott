import { expect } from "chai";

import {
  createNodeHash,
  makeEmptySkottCachedNodeValue,
  SkottCache,
  SkottCachedNode
} from "../../src/cache/handler";
import { WalkerSelector } from "../../src/modules/walkers/common";
import { defaultConfig, Skott } from "../../src/skott";
import { InMemoryFileReader, mountFakeFileSystem } from "../ecmascript/shared";

function makeDictFromStructureCache(
  cache: SkottCache
): Record<string, SkottCachedNode> {
  return Object.fromEntries(cache.entries());
}

const defaultIncrementalConfig = {
  ...defaultConfig,
  incremental: true
};

describe("Incremental analysis", () => {
  describe("When Skott runs an analysis for the first time", () => {
    const hashFromTheOnlyExistingFile = createNodeHash("const a = 1;");

    function makeNewSkottInstance(entrypoint?: string): Skott {
      const fileReader = new InMemoryFileReader();

      return new Skott(
        { ...defaultIncrementalConfig, entrypoint, incremental: true },
        fileReader
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

        expect(
          makeDictFromStructureCache(skottInstance.getStructureCache())
        ).to.deep.equal({
          "index.js": {
            hash: hashFromTheOnlyExistingFile,
            value: makeEmptySkottCachedNodeValue("index.js")
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

        expect(
          makeDictFromStructureCache(skottInstance.getStructureCache())
        ).to.deep.equal({
          "index.js": {
            hash: hashFromTheOnlyExistingFile,
            value: makeEmptySkottCachedNodeValue("index.js")
          },
          "lib.js": {
            hash: hashFromTheOnlyExistingFile,
            value: makeEmptySkottCachedNodeValue("lib.js")
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

            const fileReader = new InMemoryFileReader();
            const walkerSelector = new WalkerSelector();
            const indexHash = createNodeHash("const a = 1;");
            const libHash = createNodeHash("const b = 2;");
            const skott = new Skott(
              { ...defaultIncrementalConfig, entrypoint: undefined },
              fileReader,
              walkerSelector
            );

            await skott.initialize();

            const expectedCache = {
              "index.js": {
                hash: indexHash,
                value: makeEmptySkottCachedNodeValue("index.js")
              },
              "lib.js": {
                hash: libHash,
                value: makeEmptySkottCachedNodeValue("lib.js")
              }
            };

            expect(
              makeDictFromStructureCache(skott.getStructureCache())
            ).to.deep.equal(expectedCache);

            /**
             * No files changed at this point.
             * We now want to re-run Skott but now with a broken walker, meaning that
             * if we succeed to get the graph structure, it means that Skott did not
             * parse the files again, otherwise we wouldn't be able to get the structure.
             */

            class NotWorkingWalkerSelector {
              public getAppropriateWalker(): void {
                throw new Error("It should not get to there!");
              }
            }

            const skottWithCacheAndBrokenWalker = new Skott(
              { ...defaultIncrementalConfig, entrypoint: undefined },
              fileReader,
              new NotWorkingWalkerSelector() as any
            );

            const { getStructure } =
              await skottWithCacheAndBrokenWalker.initialize();

            expect(
              makeDictFromStructureCache(
                skottWithCacheAndBrokenWalker.getStructureCache()
              )
            ).to.deep.equal(expectedCache);

            expect(getStructure().graph).to.deep.equal({
              "index.js": makeEmptySkottCachedNodeValue("index.js"),
              "lib.js": makeEmptySkottCachedNodeValue("lib.js")
            });
          });
        });
      });

      describe("When files changed since the last run", () => {
        describe("When having a filled cache and providing a broken Module Walker", () => {
          it("should be able to retrieve the graph structure using cache while parsing is voluntarily broken", async () => {
            mountFakeFileSystem({
              "index.js": "const a = 1;",
              "lib.js": "const b = 2;"
            });

            const fileReader = new InMemoryFileReader();
            const walkerSelector = new WalkerSelector();
            const indexHash = createNodeHash("const a = 1;");
            const libHash = createNodeHash("const b = 2;");
            const skott = new Skott(
              { ...defaultIncrementalConfig, entrypoint: undefined },
              fileReader,
              walkerSelector
            );

            await skott.initialize();

            const expectedCache = {
              "index.js": {
                hash: indexHash,
                value: makeEmptySkottCachedNodeValue("index.js")
              },
              "lib.js": {
                hash: libHash,
                value: makeEmptySkottCachedNodeValue("lib.js")
              }
            };

            expect(
              makeDictFromStructureCache(skott.getStructureCache())
            ).to.deep.equal(expectedCache);

            /**
             * No files changed at this point.
             * We now want to re-run Skott but now with a broken walker, meaning that
             * if we succeed to get the graph structure, it means that Skott did not
             * parse the files again, otherwise we wouldn't be able to get the structure.
             */

            class NotWorkingWalkerSelector {
              public getAppropriateWalker(): void {
                throw new Error("It should not get to there!");
              }
            }

            const skottWithCacheAndBrokenWalker = new Skott(
              { ...defaultIncrementalConfig, entrypoint: undefined },
              fileReader,
              new NotWorkingWalkerSelector() as any
            );

            const { getStructure } =
              await skottWithCacheAndBrokenWalker.initialize();

            expect(
              makeDictFromStructureCache(
                skottWithCacheAndBrokenWalker.getStructureCache()
              )
            ).to.deep.equal(expectedCache);

            expect(getStructure().graph).to.deep.equal({
              "index.js": makeEmptySkottCachedNodeValue("index.js"),
              "lib.js": makeEmptySkottCachedNodeValue("lib.js")
            });
          });
        });
      });
    });
  });
});
