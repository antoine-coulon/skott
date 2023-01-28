import { describe, expect, it } from "vitest";

import { InMemoryFileReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import { WalkerSelector } from "../../src/modules/walkers/common.js";
import { defaultConfig, Skott, SkottConfig } from "../../src/skott.js";
import { mountFakeFileSystem } from "../shared.js";

describe("Searching for unused dependencies", () => {
  describe("When targetting third-party dependencies", () => {
    const defaultConfigWithThirdPartyTracking = {
      ...defaultConfig,
      dependencyTracking: {
        thirdParty: true,
        builtin: false,
        typeOnly: false
      }
    };
    function makeSkott(config: Partial<SkottConfig> = {}) {
      return new Skott(
        { ...defaultConfigWithThirdPartyTracking, ...config },
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new WalkerSelector()
      );
    }

    describe("When there is a package.json located in the same directory as the files", () => {
      describe("When there is no use of third-party dependencies", () => {
        it("should not find any used dependency", async () => {
          mountFakeFileSystem({
            "index.js": ``,
            "package.json": JSON.stringify({
              dependencies: {}
            })
          });

          const skott = makeSkott();
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies();

          expect(thirdParty).to.deep.equal([]);
        });
      });

      describe("When there is only one unused third-party dependency", () => {
        it("should find the unused dependency using package.json located in the cwd", async () => {
          mountFakeFileSystem({
            "index.js": `function foo() {}`,
            "package.json": JSON.stringify({
              dependencies: {
                skott: "^1.0.0"
              }
            })
          });

          const skott = makeSkott();
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies();

          expect(thirdParty).to.deep.equal(["skott"]);
        });

        it("should find the unused dependency using package.json located in the base directory of the entrypoint", async () => {
          mountFakeFileSystem({
            "lib/index.js": `function foo() {}`,
            "lib/package.json": JSON.stringify({
              dependencies: {
                "@effect/core": "^1.0.0"
              }
            })
          });

          const skott = makeSkott({
            entrypoint: "lib/index.js"
          });
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies();

          expect(thirdParty).to.deep.equal(["@effect/core"]);
        });

        it("should find the unused dependency using package.json located in the cwd while the entrypoint has a base dir located deeper in the FS", async () => {
          mountFakeFileSystem({
            "lib/index.js": `function foo() {}`,
            "package.json": JSON.stringify({
              dependencies: {
                "@nodesecure/ci": "^1.0.0"
              }
            })
          });

          const skott = makeSkott({
            entrypoint: "lib/index.js"
          });
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies();

          expect(thirdParty).to.deep.equal(["@nodesecure/ci"]);
        });

        it("should find the unused dependency using package.json path provided from the config", async () => {
          mountFakeFileSystem({
            "libs/some-lib/index.js": `function foo() {}`,
            "libs/package.json": JSON.stringify({
              dependencies: {
                "@nodesecure/ci": "^1.0.0"
              }
            })
          });

          const skott = makeSkott({
            entrypoint: "libs/some-lib/index.js",
            manifestPath: "libs/package.json"
          });
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies();

          expect(thirdParty).to.deep.equal(["@nodesecure/ci"]);
        });
      });

      describe("When there are multiple unused amongst other used third-party dependencies", () => {
        it("should find the unused dependency using root package.json", async () => {
          mountFakeFileSystem({
            "index.js": `
              import {of} from 'rxjs/internal';
              import {pipe} from '@effect-ts/core/Function';
              import format from 'ajv-format';
              function foo() {}
            `,
            "package.json": JSON.stringify({
              dependencies: {
                skott: "*",
                rxjs: "*",
                ramda: "*",
                "lodash.difference": "*",
                "@effect-ts/core": "*",
                ajv: "*",
                "ajv-format": "*"
              }
            })
          });

          const skott = makeSkott();
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies();

          expect(thirdParty).to.deep.equal([
            "skott",
            "ramda",
            "lodash.difference",
            "ajv"
          ]);
        });
      });
    });

    describe("When package.json file can't be found following the current resolution strategy", () => {
      function mountFS() {
        mountFakeFileSystem({
          "src/lib/index.js": `
            import {pipe} from "lodash/fp";
          `,
          "src/package.json": JSON.stringify({
            dependencies: {
              rxjs: "*",
              lodash: "*"
            }
          })
        });
      }

      describe("When searching at the level from which the command was started", () => {
        it("should produce a defect as deep manifest searching is not supported yet", async () => {
          mountFS();
          const skott = makeSkott();
          const { findUnusedDependencies } = await skott.initialize();

          try {
            await findUnusedDependencies();
            expect(
              false,
              "Should not get there as the function is expected to throw"
            ).to.equal(true);
          } catch (e: unknown) {
            // @ts-expect-error - message will exist in our case
            expect(e?.message).to.equal(
              "The package.json manifest file could not be found or read."
            );
          }
        });
      });

      describe("When searching from the entrypoint's base directory level", () => {
        it("should produce a defect as deep manifest searching is not supported yet", async () => {
          mountFS();
          const skott = makeSkott({ entrypoint: "src/lib/index.js" });
          const { findUnusedDependencies } = await skott.initialize();

          try {
            await findUnusedDependencies();
            expect(
              false,
              "Should not get there as the function is expected to throw"
            ).to.equal(true);
          } catch (e: unknown) {
            // @ts-expect-error - message will exist in our case
            expect(e?.message).to.equal(
              "The package.json manifest file could not be found or read."
            );
          }
        });
      });
    });
  });
});
