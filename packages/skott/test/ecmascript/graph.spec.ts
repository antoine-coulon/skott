import * as memfs from "memfs";
import { describe, expect, it } from "vitest";

import { FileReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import { EcmaScriptDependencyResolver } from "../../src/modules/resolvers/ecmascript/resolver.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { Skott, SkottStructure } from "../../src/skott.js";
import {
  buildSkottProjectUsingInMemoryFileExplorer,
  mountFakeFileSystem
} from "../shared";

class InMemoryFileReaderWithFakeStats implements FileReader {
  read(filename: string): Promise<string> {
    return new Promise((resolve) => {
      /* eslint-disable no-sync */
      resolve(memfs.fs.readFileSync(filename, "utf-8") as string);
    });
  }

  readSync(filename: string): string {
    return memfs.fs.readFileSync(filename, "utf-8") as string;
  }

  async *readdir(): AsyncGenerator<string> {
    yield Promise.resolve("fake");
  }
  stats(filename: string): Promise<number> {
    return new Promise((resolve) => {
      memfs.fs.stat(filename, (err, data) => {
        if (err) {
          return resolve(0);
        }

        if (data) {
          return resolve(Number(data.size));
        }

        return resolve(0);
      });
    });
  }
  getCurrentWorkingDir(): string {
    return process.cwd();
  }
}

async function makeSkott(
  entrypoint = "index.js",
  includeBaseDir = false
): Promise<SkottStructure> {
  const skott = new Skott(
    {
      entrypoint,
      circularMaxDepth: Number.POSITIVE_INFINITY,
      includeBaseDir,
      dependencyTracking: {
        thirdParty: true,
        builtin: true,
        typeOnly: true
      },
      fileExtensions: [".js", ".ts"],
      tsConfigPath: "./tsconfig.json",
      manifestPath: "./package.json",
      dependencyResolvers: [new EcmaScriptDependencyResolver()]
    },
    new InMemoryFileReaderWithFakeStats(),
    new InMemoryFileWriter(),
    new ModuleWalkerSelector()
  );
  const skottInstance = await skott.initialize();

  return skottInstance.getStructure();
}

describe("When building the project structure independently of JavaScript or TypeScript", () => {
  describe("When searching for leaves", () => {
    it("should only return nodes identifiers with no children", async () => {
      mountFakeFileSystem({
        "index.js": "export * from './file1.js';",
        "file1.js": "import { F2 } from './file2.js';",
        "file2.js": "export const F2 = 10;"
      });

      const { leaves } = await buildSkottProjectUsingInMemoryFileExplorer({
        entrypoint: "index.js"
      });

      expect(leaves).to.be.deep.equal(["file2.js"]);
    });
  });

  describe("When deeply searching for parents of a given node", () => {
    it("should traverse the graph bottom-to-top and collect every file depending on the target", async () => {
      mountFakeFileSystem({
        "a.js": `
              import { b } from "./b.js";
              export const a = () => b();
            `,
        "b.js": `
              import { c } from "./c.js";
              export const b = { doSomething: () => bar() };
            `,
        "c.js": `
              import { d } from "./d.js";
              import { x } from "./x.js";
              export const c = { doSomething: () => {} };
            `,
        "x.js": `
              export const x = { doSomething: () => {} };
            `,
        "d.js": `
              export const d = { doSomething: () => {} };
            `
      });

      const skott = new Skott(
        {
          entrypoint: "a.js",
          circularMaxDepth: Number.POSITIVE_INFINITY,
          includeBaseDir: false,
          dependencyTracking: {
            thirdParty: false,
            builtin: false,
            typeOnly: true
          },
          fileExtensions: [".js"],
          tsConfigPath: "./tsconfig.json",
          manifestPath: "./package.json",
          dependencyResolvers: [new EcmaScriptDependencyResolver()]
        },
        new InMemoryFileReaderWithFakeStats(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector()
      );

      const skottInstance = await skott.initialize();
      expect(skottInstance.findParentsOf("d.js")).to.deep.equal([
        "c.js",
        "b.js",
        "a.js"
      ]);
      expect(skottInstance.findParentsOf("c.js")).to.deep.equal([
        "b.js",
        "a.js"
      ]);
      expect(skottInstance.findParentsOf("a.js")).to.deep.equal([]);
    });
  });

  describe("Skott Node details", () => {
    describe("When there is only one file in the project", () => {
      describe("When the file is empty", () => {
        it("should generate basic data", async () => {
          mountFakeFileSystem({
            "index.js": ""
          });

          const { graph } = await makeSkott();

          expect(graph["index.js"]).to.deep.equal({
            id: "index.js",
            adjacentTo: [],
            body: {
              size: 0,
              thirdPartyDependencies: [],
              builtinDependencies: []
            }
          });
        });
      });

      describe("When the file contains some source code", () => {
        describe("When computing the file size", () => {
          it("should return the size in bytes of the file", async () => {
            const fakeFs = {
              "index.js": `
                import * as lib from "./lib.js";
                const x = 3;
            `,
              "lib.js": `
                function doSomething() {
                    return "doSomething";
                }

                /**
                 * next-gen js-doc
                 */
                function helloEverybody() {
                    return "helloEverybody";
                }

                export { doSomething, helloEverybody };
            `
            };

            mountFakeFileSystem(fakeFs);

            const { graph } = await makeSkott();

            const indexFile = graph["index.js"];
            const libFile = graph["lib.js"];

            expect(indexFile.body).to.deep.equal({
              size: Buffer.byteLength(fakeFs["index.js"], "utf-8"),
              thirdPartyDependencies: [],
              builtinDependencies: []
            });
            expect(libFile.body).to.deep.equal({
              size: Buffer.byteLength(fakeFs["lib.js"], "utf-8"),
              thirdPartyDependencies: [],
              builtinDependencies: []
            });
          });
        });

        describe("When tracking third-party dependencies", async () => {
          it("should find one third-party dependency", async () => {
            mountFakeFileSystem({
              "index.js": `
              import * as anything from "./lib.js";
              import { parseScript } from 'meriyah';
              import path from "path";
              import * as fs from "node:fs"; 
            `,
              "lib.js": ""
            });

            const { graph } = await makeSkott();
            const indexFile = graph["index.js"];

            expect(indexFile.body.thirdPartyDependencies).to.deep.equal([
              "meriyah"
            ]);
          });

          it("should find all types of third-party dependencies", async () => {
            memfs.vol.fromJSON(
              {
                "index.js": `
                import * as anything from "./lib.js";
                import { parseScript } from 'meriyah';
                import 'side-effect-library';
                import { getStrategy } from "@nodesecure/vulnera";
                import difference from "lodash.difference";
                import _ from "next-plugin-preval/config";
              `,
                "lib.js": ""
              },
              "./"
            );

            const { graph } = await makeSkott();
            const indexFile = graph["index.js"];

            expect(indexFile.body.thirdPartyDependencies).to.deep.equal([
              "meriyah",
              "side-effect-library",
              "@nodesecure/vulnera",
              "lodash.difference",
              "next-plugin-preval"
            ]);
          });

          describe("When third-party dependencies are exposing namespaces", () => {
            it("should keep only one version of a same dependency", async () => {
              mountFakeFileSystem({
                "index.js": `
                  import { pipe } from '@effect-ts/core/Function';
                  import { Has } from '@effect-ts/core/Has';
                  import * as System from '@effect-ts/system';
                `
              });

              const { graph } = await makeSkott();

              const indexFile = graph["index.js"];

              expect(indexFile.body.thirdPartyDependencies).to.deep.equal([
                "@effect-ts/core",
                "@effect-ts/system"
              ]);
            });
          });

          describe("When the entrypoint contains a base directory", () => {
            it("should find one third-party dependency", async () => {
              mountFakeFileSystem({
                "src/index.js": `
                import * as anything from "./lib.js";
                import { parse } from '@typescript-eslint/typescript-estree';
                import path from "path";
                import * as fs from "node:fs"; 
              `,
                "src/lib.js": ""
              });

              const { graph } = await makeSkott("src/index.js", false);
              const indexFile = graph["index.js"];

              expect(indexFile.body.thirdPartyDependencies).to.deep.equal([
                "@typescript-eslint/typescript-estree"
              ]);
            });
          });
        });

        describe("When tracking native dependencies", async () => {
          describe("When the source file contains native dependencies", async () => {
            it("should collect all native dependencies", async () => {
              mountFakeFileSystem({
                "index.js": `
                import * as anything from "./lib.js";
                import { parseScript } from 'meriyah';
                import path from "path";
                import * as fs from "node:fs"; 
              `,
                "lib.js": ""
              });

              const { graph } = await makeSkott();
              const indexFile = graph["index.js"];

              expect(indexFile.body.builtinDependencies).to.deep.equal([
                "path",
                "node:fs"
              ]);
            });

            describe("When the entrypoint contains a base directory", () => {
              it("should collect native dependencies", async () => {
                mountFakeFileSystem({
                  "src/index.js": `
                  import * as anything from "./lib.js";
                  import { parse } from '@typescript-eslint/typescript-estree';
                  import path from "path";
                  import * as fs from "node:fs"; 
                `,
                  "src/lib.js": ""
                });

                const { graph } = await makeSkott("src/index.js", false);
                const indexFile = graph["index.js"];

                expect(indexFile.body.builtinDependencies).to.deep.equal([
                  "path",
                  "node:fs"
                ]);
              });
            });
          });
        });
      });
    });
  });
});
