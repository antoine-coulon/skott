import { expect } from "chai";
import * as memfs from "memfs";

import { FileReader } from "./filesystem/file-reader.js";
import { JavaScriptModuleWalker } from "./modules/walkers/ecmascript/javascript/walker.js";
import { Skott, SkottStructure } from "./skott.js";

class InMemoryFileReader implements FileReader {
  read(filename: string): Promise<string> {
    return new Promise((resolve) => {
      /* eslint-disable no-sync */
      resolve(memfs.fs.readFileSync(filename, "utf-8") as string);
    });
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
}

function mountFakeFileSystem(
  fs: Record<string, string>,
  mountingPoint = "./"
): void {
  memfs.vol.fromJSON(fs, mountingPoint);
}

async function makeScott(): Promise<SkottStructure> {
  const skott = new Skott(
    {
      entrypoint: "index.js",
      circularMaxDepth: Number.POSITIVE_INFINITY,
      includeBaseDir: false,
      dependencyTracking: {
        thirdParty: true,
        builtin: true
      }
    },
    new JavaScriptModuleWalker(),
    new InMemoryFileReader()
  );
  const skottInstance = await skott.initialize();

  return skottInstance.getStructure();
}

describe("Skott Node details", () => {
  describe("When there is only one file in the project", () => {
    describe("When the file is empty", () => {
      it("should generate basic data", async () => {
        mountFakeFileSystem({
          "index.js": ""
        });

        const { graph } = await makeScott();

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

          const { graph } = await makeScott();

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

          const { graph } = await makeScott();
          const indexFile = graph["index.js"];

          expect(indexFile.body.thirdPartyDependencies).to.deep.equal([
            "meriyah"
          ]);
        });
        it("should find many third-party dependencies", async () => {
          memfs.vol.fromJSON(
            {
              "index.js": `
                import * as anything from "./lib.js";
                import { parseScript } from 'meriyah';
                import 'side-effect-library';
                import { getStrategy } from "@nodesecure/vulnera";
              `,
              "lib.js": ""
            },
            "./"
          );

          const { graph } = await makeScott();
          const indexFile = graph["index.js"];

          expect(indexFile.body.thirdPartyDependencies).to.deep.equal([
            "meriyah",
            "side-effect-library",
            "@nodesecure/vulnera"
          ]);
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

            const { graph } = await makeScott();
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
