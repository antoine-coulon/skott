import { expect } from "chai";

import * as cyclops from "./index";

describe("When traversing a JavaScript project", () => {
  describe("When the project uses ECMAScript modules", () => {
    describe("When extracting import statements in the root file", () => {
      describe("When the file does not have import statements", () => {
        it("cyclops should build a graph with one node", async () => {
          const graph = await cyclops.buildGraph({
            rootFile: "fixture/root-file.js"
          })(() => Promise.resolve(`console.log(2)`));
          expect(graph).to.be.deep.equal({
            graph: {
              "fixture/root-file.js": {
                adjacentTo: [],
                id: "fixture/root-file.js",
                payload: {}
              }
            },
            files: ["fixture/root-file.js"],
            cycles: [],
            fileCount: 1
          });
        });
      });

      describe("When the file has one import statement", () => {
        it("cyclops should build the graph with two nodes and one edge", async () => {
          const graph = await cyclops.buildGraph({
            rootFile: "fixture/root-file.js"
          })(() =>
            Promise.resolve(`
          import { foo } from "./foo.js";
  
          console.log(foo.doSomething());
        `)
          );

          expect(graph).to.be.deep.equal({
            graph: {
              "fixture/root-file.js": {
                adjacentTo: ["fixture/foo.js"],
                id: "fixture/root-file.js",
                payload: {}
              },
              "fixture/foo.js": {
                adjacentTo: [],
                id: "fixture/foo.js",
                payload: {}
              }
            },
            files: ["fixture/root-file.js", "fixture/foo.js"],
            cycles: [],
            fileCount: 2
          });
        });
      });

      describe("When the project has three import statements", () => {
        it("cyclops should build the graph with three nodes and two edges", async () => {
          const graph = await cyclops.buildGraph({
            rootFile: "fixture/root-file.js"
          })(() =>
            Promise.resolve(`
          import { foo } from "./foo.js";
          import { bar } from "./bar.js";
  
          console.log(foo.doSomething());
        `)
          );
          expect(graph).to.be.deep.equal({
            graph: {
              "fixture/root-file.js": {
                adjacentTo: ["fixture/foo.js", "fixture/bar.js"],
                id: "fixture/root-file.js",
                payload: {}
              },
              "fixture/foo.js": {
                adjacentTo: [],
                id: "fixture/foo.js",
                payload: {}
              },
              "fixture/bar.js": {
                adjacentTo: [],
                id: "fixture/bar.js",
                payload: {}
              }
            },
            files: ["fixture/root-file.js", "fixture/foo.js", "fixture/bar.js"],
            cycles: [],
            fileCount: 3
          });
        });
      });
    });
  });
});
