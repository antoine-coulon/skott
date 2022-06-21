/* eslint-disable no-sync */
import { expect } from "chai";
import * as memfs from "memfs";

import { Cyclops, FileReader } from "./index";

export class InMemoryFileReader implements FileReader {
  read(filename: string): Promise<string> {
    return new Promise((resolve) => {
      // @ts-expect-error - Will be a string as its decoded in utf-8
      resolve(memfs.fs.readFileSync(filename, "utf-8"));
    });
  }
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

          const cyclops = new Cyclops(
            {
              entrypoint: "index.js"
            },
            new InMemoryFileReader()
          );

          const graph = await cyclops.buildGraph();

          expect(graph).to.be.deep.equal({
            graph: {
              "index.js": {
                adjacentTo: [],
                id: "index.js",
                payload: {}
              }
            },
            files: ["index.js"],
            cycles: []
          });
        });
      });

      describe("When the file has one import statement", () => {
        it("cyclops should build the graph with two nodes and one edge", async () => {
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

          const cyclops = new Cyclops(
            { entrypoint: "index.js" },
            new InMemoryFileReader()
          );
          const graph = await cyclops.buildGraph();

          expect(graph).to.be.deep.equal({
            graph: {
              "index.js": {
                adjacentTo: ["src/foo.js"],
                id: "index.js",
                payload: {}
              },
              "src/foo.js": {
                adjacentTo: [],
                id: "src/foo.js",
                payload: {}
              }
            },
            files: ["index.js", "src/foo.js"],
            cycles: []
          });
        });
      });

      describe("When the project has four nested import statements", () => {
        it("cyclops should build the graph with all nodes and edges", async () => {
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

          const cyclops = new Cyclops(
            { entrypoint: "index.js" },
            new InMemoryFileReader()
          );
          const graph = await cyclops.buildGraph();

          expect(graph).to.be.deep.equal({
            graph: {
              "index.js": {
                adjacentTo: ["src/foo.js"],
                id: "index.js",
                payload: {}
              },
              "src/foo.js": {
                adjacentTo: ["src/bar.js"],
                id: "src/foo.js",
                payload: {}
              },
              "src/bar.js": {
                adjacentTo: ["src/lib/baz/index.js"],
                id: "src/bar.js",
                payload: {}
              },
              "src/lib/baz/index.js": {
                adjacentTo: ["src/lol/index.js"],
                id: "src/lib/baz/index.js",
                payload: {}
              },
              "src/lol/index.js": {
                adjacentTo: [],
                id: "src/lol/index.js",
                payload: {}
              }
            },
            files: [
              "index.js",
              "src/foo.js",
              "src/bar.js",
              "src/lib/baz/index.js",
              "src/lol/index.js"
            ],
            cycles: []
          });
        });
      });
    });
  });
});
