import { describe, expect, it } from "vitest";

import { InMemoryFileReader } from "../../../src/filesystem/fake/file-reader.js";
import { InMemoryFileWriter } from "../../../src/filesystem/fake/file-writer.js";
import { FakeLogger } from "../../../src/logger.js";
import { ModuleWalkerSelector } from "../../../src/modules/walkers/common.js";
import { defaultConfig, Skott, type SkottConfig } from "../../../src/skott.js";
import {
  inMemoryImplicitDependenciesFinder,
  mountFakeFileSystem
} from "../shared.js";

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

    function makeSkott(config: Partial<SkottConfig<unknown>> = {}) {
      return new Skott(
        { ...defaultConfigWithThirdPartyTracking, ...config },
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );
    }

    describe("When there is a package.json located in the same directory as the files", () => {
      describe("When there is no use of third-party dependencies", () => {
        it("should not find any used dependency", async () => {
          mountFakeFileSystem({
            "index.js": ``,
            "package.json": JSON.stringify({
              name: "empty-package"
            })
          });

          const skott = makeSkott();
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies(
            inMemoryImplicitDependenciesFinder
          );

          expect(thirdParty).to.deep.equal([]);
        });

        it("should not find any used dependency", async () => {
          mountFakeFileSystem({
            "index.js": ``,
            "package.json": JSON.stringify({
              dependencies: {}
            })
          });

          const skott = makeSkott();
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies(
            inMemoryImplicitDependenciesFinder
          );

          expect(thirdParty).to.deep.equal([]);
        });
      });

      describe("When there is only one unused third-party dependency", () => {
        describe("When there is a package.json in the cwd", () => {
          it("should find the unused dependency", async () => {
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
            const { thirdParty } = await findUnusedDependencies(
              inMemoryImplicitDependenciesFinder
            );

            expect(thirdParty).to.deep.equal(["skott"]);
          });

          it("should find the unused dependency when using an entrypoint", async () => {
            mountFakeFileSystem({
              "index.js": `
                import * as E from "fp-ts/lib/Either.js";
                import * as D from "io-ts/lib/Decoder.js";
              `,
              "package.json": JSON.stringify({
                dependencies: {
                  "fp-ts": "^1.0.0",
                  "io-ts": "^1.0.0",
                  ramda: "^1.0.0"
                }
              })
            });

            const skott = makeSkott({
              entrypoint: "index.js",
              dependencyTracking: {
                thirdParty: true,
                builtin: false,
                typeOnly: false
              }
            });
            const { findUnusedDependencies } = await skott.initialize();
            const { thirdParty } = await findUnusedDependencies(
              inMemoryImplicitDependenciesFinder
            );

            expect(thirdParty).to.deep.equal(["ramda"]);
          });

          it("should find the unused dependency when NOT using an entrypoint", async () => {
            mountFakeFileSystem({
              "index.js": `
                import * as E from "fp-ts/lib/Either.js";
                import * as D from "io-ts/lib/Decoder.js";
              `,
              "package.json": JSON.stringify({
                dependencies: {
                  "fp-ts": "^1.0.0",
                  "io-ts": "^1.0.0",
                  ramda: "^1.0.0"
                }
              })
            });

            const skott = makeSkott({
              dependencyTracking: {
                thirdParty: true,
                builtin: false,
                typeOnly: false
              }
            });
            const { findUnusedDependencies } = await skott.initialize();
            const { thirdParty } = await findUnusedDependencies(
              inMemoryImplicitDependenciesFinder
            );

            expect(thirdParty).to.deep.equal(["ramda"]);
          });
        });

        describe("When there is a package.json in the base directory of the entrypoint", () => {
          it("should find the unused dependency starting from the base directory", async () => {
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
            const { thirdParty } = await findUnusedDependencies(
              inMemoryImplicitDependenciesFinder
            );

            expect(thirdParty).to.deep.equal(["@effect/core"]);
          });
        });

        describe("When the entrypoint is one level deeper than the location of the package.json", () => {
          it("should find the unused dependency using package.json located in the cwd", async () => {
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
            const { thirdParty } = await findUnusedDependencies(
              inMemoryImplicitDependenciesFinder
            );

            expect(thirdParty).to.deep.equal(["@nodesecure/ci"]);
          });
        });

        describe("When providing a package.json `manifestPath` to use to find unused dependencies", () => {
          it("should find the unused dependency using package.json path provided", async () => {
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
            const { thirdParty } = await findUnusedDependencies(
              inMemoryImplicitDependenciesFinder
            );

            expect(thirdParty).to.deep.equal(["@nodesecure/ci"]);
          });
        });
      });

      describe("When there are multiple unused amongst other used third-party dependencies", () => {
        it("should find the unused dependencies using root package.json", async () => {
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
                "lodash-es": "*",
                "@effect-ts/core": "*",
                ajv: "*",
                "ajv-format": "*"
              }
            })
          });

          const skott = makeSkott();
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies(
            inMemoryImplicitDependenciesFinder
          );

          expect(thirdParty).to.deep.equal([
            "skott",
            "ramda",
            "lodash-es",
            "ajv"
          ]);
        });

        it("should find the unused dependency using root package.json", async () => {
          mountFakeFileSystem({
            "index.js": `
              import {of} from '@org/lib';
              import {pipe} from '@org/libV2';
            `,
            "package.json": JSON.stringify({
              dependencies: {
                ramda: "*",
                "@org/lib": "*",
                "@org/libV2": "*"
              }
            })
          });

          const skott = makeSkott();
          const { findUnusedDependencies } = await skott.initialize();
          const { thirdParty } = await findUnusedDependencies(
            inMemoryImplicitDependenciesFinder
          );

          expect(thirdParty).to.deep.equal(["ramda"]);
        });
      });

      describe("When using a complementary analysis to look for unused implicit dependencies", () => {
        describe("When the complementary analysis does not find any unused dependencies", () => {
          it("should only return unused find by skott main analysis", async () => {
            mountFakeFileSystem({
              "index.js": `
                import {pipe} from '@effect-ts/core/Function';
              `,
              "package.json": JSON.stringify({
                dependencies: {
                  "@effect-ts/core": "*",
                  "ajv-format": "*"
                },
                devDependencies: {}
              })
            });

            const skott = makeSkott();
            const { findUnusedDependencies } = await skott.initialize();
            const { thirdParty } = await findUnusedDependencies(
              inMemoryImplicitDependenciesFinder
            );

            expect(thirdParty).to.deep.equal(["ajv-format"]);
          });
        });

        describe("When the complementary analysis finds additional unused dependencies", () => {
          it("should concat all found unused dependencies", async () => {
            mountFakeFileSystem({
              "index.js": `
                import {pipe} from '@effect-ts/core/Function';
              `,
              "package.json": JSON.stringify({
                dependencies: {
                  "@effect-ts/core": "*",
                  "ajv-format": "*"
                },
                devDependencies: {}
              })
            });

            const skott = makeSkott();
            const { findUnusedDependencies } = await skott.initialize();
            const { thirdParty } = await findUnusedDependencies({
              implicitDependencies: {
                findUnused: () => Promise.resolve(["typescript"])
              }
            });

            expect(thirdParty).to.deep.equal(["ajv-format", "typescript"]);
          });
        });

        describe("When the complementary analysis finds unused dependencies including duplicates", () => {
          it("should keep a unique set of unused dependencies", async () => {
            mountFakeFileSystem({
              "index.js": `
                import {pipe} from '@effect-ts/core/Function';
              `,
              "package.json": JSON.stringify({
                dependencies: {
                  "@effect-ts/core": "*",
                  "ajv-format": "*",
                  rxjs: "*"
                }
              })
            });

            const skott = makeSkott();
            const { findUnusedDependencies } = await skott.initialize();
            const { thirdParty } = await findUnusedDependencies({
              implicitDependencies: {
                findUnused: () =>
                  Promise.resolve(["ajv-format", "eslint", "typescript"])
              }
            });

            expect(thirdParty).to.deep.equal([
              "ajv-format",
              "rxjs",
              "eslint",
              "typescript"
            ]);
          });
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
