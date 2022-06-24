/* eslint-disable no-sync */
import { expect } from "chai";
import * as memfs from "memfs";

import { FileReader } from "../file-reader";

import { Cyclops, CyclopsStructure } from "./main";

class InMemoryFileReader implements FileReader {
  read(filename: string): Promise<string> {
    return new Promise((resolve) => {
      // @ts-expect-error - Will be a string as its decoded in utf-8
      resolve(memfs.fs.readFileSync(filename, "utf-8"));
    });
  }
}

async function buildProjectStructureUsingInMemoryFileExplorer(
  entrypoint: string
): Promise<CyclopsStructure> {
  const cyclops = new Cyclops({ entrypoint }, new InMemoryFileReader());

  return cyclops.buildProjectStructure();
}

describe("When traversing a JavaScript project", () => {
  describe("When the project uses ECMAScript modules", () => {
    describe("When extracting import statements in the root file", () => {
      describe("When the file does not have any import statements", () => {
        it("cyclops should build a graph with one node", async () => {
          const fakeFileSystem = {
            "index.js": "console.log('Hello, world!');"
          };
          memfs.vol.fromJSON(fakeFileSystem, "./");

          const projectStructure =
            await buildProjectStructureUsingInMemoryFileExplorer("index.js");

          expect(projectStructure).to.be.deep.equal({
            graph: {
              "index.js": {
                adjacentTo: [],
                id: "index.js",
                body: { size: 0 }
              }
            },
            files: ["index.js"],
            circularDependencies: [],
            hasCircularDependencies: false
          });
        });
      });

      describe("When the file has one import statement", () => {
        it("cyclops should build the graph with two nodes and one link", async () => {
          const fakeFileSystem = {
            "index.js": `
            import { foo } from "./src/foo.js";
    
            console.log(foo.doSomething());
          `,
            "src/foo.js": `
              export const foo = { doSomething: () => 'Hello, world!' };
            `
          };

          memfs.vol.fromJSON(fakeFileSystem, "./");

          const projectStructure =
            await buildProjectStructureUsingInMemoryFileExplorer("index.js");

          expect(projectStructure).to.be.deep.equal({
            graph: {
              "index.js": {
                adjacentTo: ["src/foo.js"],
                id: "index.js",
                body: { size: 0 }
              },
              "src/foo.js": {
                adjacentTo: [],
                id: "src/foo.js",
                body: { size: 0 }
              }
            },
            files: ["index.js", "src/foo.js"],
            circularDependencies: [],
            hasCircularDependencies: false
          });
        });
      });

      describe("When the project has four nested import statements", () => {
        it("cyclops should build the graph with all nodes and links", async () => {
          const fakeFileSystem = {
            "index.js": `
              import { foo } from "./src/foo.js";
              console.log(foo.doSomething());
            `,
            "src/foo.js": `
              import { bar } from "./bar.js";
              export const foo = { doSomething: () => bar() };
            `,
            "src/bar.js": `
              import { baz } from './lib/baz/index.js';
              export const bar = () => 'Hello, world!';
            `,
            "src/lib/baz/index.js": `
              import lol from "../../lol/index.js";
              export const baz = () => 'Hello, baz!';
            `,
            "src/lol/index.js": `
              const lol = () => 'Hello, baz!';
              export default lol;
            `
          };

          memfs.vol.fromJSON(fakeFileSystem, "./");

          const projectStructure =
            await buildProjectStructureUsingInMemoryFileExplorer("index.js");

          expect(projectStructure).to.be.deep.equal({
            graph: {
              "index.js": {
                adjacentTo: ["src/foo.js"],
                id: "index.js",
                body: { size: 0 }
              },
              "src/foo.js": {
                adjacentTo: ["src/bar.js"],
                id: "src/foo.js",
                body: { size: 0 }
              },
              "src/bar.js": {
                adjacentTo: ["src/lib/baz/index.js"],
                id: "src/bar.js",
                body: { size: 0 }
              },
              "src/lib/baz/index.js": {
                adjacentTo: ["src/lol/index.js"],
                id: "src/lib/baz/index.js",
                body: { size: 0 }
              },
              "src/lol/index.js": {
                adjacentTo: [],
                id: "src/lol/index.js",
                body: { size: 0 }
              }
            },
            files: [
              "index.js",
              "src/foo.js",
              "src/bar.js",
              "src/lib/baz/index.js",
              "src/lol/index.js"
            ],
            circularDependencies: [],
            hasCircularDependencies: false
          });
        });
      });

      describe("When the project contains circular dependencies", () => {
        describe("When there is direct a circular dependency between two files importing each other", () => {
          it("should find the cycle and keep traversing other nodes", async () => {
            const fakeFileSystem = {
              "a.js": `
                import { b } from "./b.js";
                export const a = () => b();
              `,
              "b.js": `
                import { a } from "./a.js";
                import { c } from "./c.js";
                export const b = { doSomething: () => bar() };
              `,
              "c.js": `
                export const c = { doSomething: () => {} };
              `
            };

            memfs.vol.fromJSON(fakeFileSystem, "./");

            const { graph, hasCircularDependencies, circularDependencies } =
              await buildProjectStructureUsingInMemoryFileExplorer("a.js");

            expect(graph).to.deep.equal({
              "a.js": {
                id: "a.js",
                adjacentTo: ["b.js"],
                body: { size: 0 }
              },
              "b.js": {
                id: "b.js",
                adjacentTo: ["a.js", "c.js"],
                body: { size: 0 }
              },
              "c.js": {
                id: "c.js",
                adjacentTo: [],
                body: { size: 0 }
              }
            });

            expect(hasCircularDependencies).to.equal(true);
            expect(circularDependencies).to.deep.equal([["b.js", "a.js"]]);
          });
        });

        describe("When there is an indirect circular dependency involving many files imports", () => {
          it("should find the cycle and keep traversing other nodes", async () => {
            const fakeFileSystem = {
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
                export const c = { doSomething: () => {} };
              `,
              "d.js": `
                import { a } from "./a.js";
                export const d = { doSomething: () => {} };
              `
            };

            memfs.vol.fromJSON(fakeFileSystem, "./");

            const { graph, hasCircularDependencies, circularDependencies } =
              await buildProjectStructureUsingInMemoryFileExplorer("a.js");

            expect(graph).to.deep.equal({
              "a.js": {
                id: "a.js",
                adjacentTo: ["b.js"],
                body: { size: 0 }
              },
              "b.js": {
                id: "b.js",
                adjacentTo: ["c.js"],
                body: { size: 0 }
              },
              "c.js": {
                id: "c.js",
                adjacentTo: ["d.js"],
                body: { size: 0 }
              },
              "d.js": {
                id: "d.js",
                adjacentTo: ["a.js"],
                body: { size: 0 }
              }
            });

            expect(hasCircularDependencies).to.equal(true);
            expect(circularDependencies).to.deep.equal([
              ["b.js", "c.js", "d.js", "a.js"]
            ]);
          });
        });
      });
    });
  });
});
