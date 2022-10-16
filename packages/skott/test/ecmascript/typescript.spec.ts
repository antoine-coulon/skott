import { expect } from "chai";

import {
  buildSkottProjectUsingInMemoryFileExplorer,
  fakeNodeBody,
  mountFakeFileSystem
} from "./shared";

describe("When traversing a TypeScript project", () => {
  describe("When the file does not have any module declarations", () => {
    it("skott should build a graph with only the root node", async () => {
      mountFakeFileSystem({
        "index.ts": "console.log('Hello, world!');"
      });

      const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
        "index.ts"
      );

      expect(skottProject).to.be.deep.equal({
        graph: {
          "index.ts": {
            adjacentTo: [],
            id: "index.ts",
            body: fakeNodeBody
          }
        },
        files: ["index.ts"],
        circularDependencies: [],
        hasCircularDependencies: false,
        leaves: ["index.ts"]
      });
    });
  });

  describe("When using TypeScript module declarations", () => {
    describe("When extracting static import declarations", () => {
      describe("When the file has one import declaration", () => {
        it("skott should build the graph with two nodes and one link", async () => {
          // Forcing files to add specific TS syntax
          mountFakeFileSystem({
            "index.ts": `
                import { foo } from "./src/foo";
  
                const someTypeScriptSpecificStuff: number = 10;
                console.log(foo.doSomething());
            `,
            "src/foo.ts": `
                export const foo = { doSomething: (): string => 'Hello, world!' };
            `
          });

          const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
            "index.ts"
          );

          expect(skottProject).to.be.deep.equal({
            graph: {
              "index.ts": {
                adjacentTo: ["src/foo.ts"],
                id: "index.ts",
                body: fakeNodeBody
              },
              "src/foo.ts": {
                adjacentTo: [],
                id: "src/foo.ts",
                body: fakeNodeBody
              }
            },
            files: ["index.ts", "src/foo.ts"],
            circularDependencies: [],
            hasCircularDependencies: false,
            leaves: ["src/foo.ts"]
          });
        });
      });

      describe("When the file includes an import declaration refering implicitely to an index module", () => {
        it("skott should build the graph with two nodes and one link", async () => {
          // Forcing files to add specific TS syntax
          mountFakeFileSystem({
            "index.ts": `
                import { foo } from "./src/foo";
  
                const someTypeScriptSpecificStuff: number = 10;
                console.log(foo.doSomething());
            `,
            "src/foo/index.ts": `
                export const foo = { doSomething: (): string => 'Hello, world!' };
            `
          });

          const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
            "index.ts"
          );

          expect(skottProject).to.be.deep.equal({
            graph: {
              "index.ts": {
                adjacentTo: ["src/foo/index.ts"],
                id: "index.ts",
                body: fakeNodeBody
              },
              "src/foo/index.ts": {
                adjacentTo: [],
                id: "src/foo/index.ts",
                body: fakeNodeBody
              }
            },
            files: ["index.ts", "src/foo/index.ts"],
            circularDependencies: [],
            hasCircularDependencies: false,
            leaves: ["src/foo/index.ts"]
          });
        });
      });

      describe("When the file includes type imports", () => {
        it("skott should build the graph with two nodes and one link", async () => {
          // Forcing files to add specific TS syntax
          mountFakeFileSystem({
            "index.ts": `
                import type { Foo } from "./foo";
  
                const someTypeScriptSpecificStuff: number = 10;
                console.log(foo.doSomething());
            `,
            "foo.ts": `
                export type Foo = {
                    doSomething: () => stng;
                }
            `
          });

          const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
            "index.ts"
          );

          expect(skottProject).to.be.deep.equal({
            graph: {
              "index.ts": {
                adjacentTo: ["foo.ts"],
                id: "index.ts",
                body: fakeNodeBody
              },
              "foo.ts": {
                adjacentTo: [],
                id: "foo.ts",
                body: fakeNodeBody
              }
            },
            files: ["index.ts", "foo.ts"],
            circularDependencies: [],
            hasCircularDependencies: false,
            leaves: ["foo.ts"]
          });
        });
      });

      describe("When the file includes Node.js require imports", () => {
        it("skott should build the graph with two nodes and one link", async () => {
          // Forcing files to add specific TS syntax
          mountFakeFileSystem({
            "index.ts": `
                require("./side-effect");
                require("./side-effect.ts");
            `,
            "side-effect.ts": `
              export function sideEffect(): void {
                  fetch("https://example.com");
              }
  
              sideEffect();
            `
          });

          const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
            "index.ts"
          );

          expect(skottProject).to.be.deep.equal({
            graph: {
              "index.ts": {
                adjacentTo: ["side-effect.ts"],
                id: "index.ts",
                body: fakeNodeBody
              },
              "side-effect.ts": {
                adjacentTo: [],
                id: "side-effect.ts",
                body: fakeNodeBody
              }
            },
            files: ["index.ts", "side-effect.ts"],
            circularDependencies: [],
            hasCircularDependencies: false,
            leaves: ["side-effect.ts"]
          });
        });
      });

      describe("When the file includes path aliases", () => {
        it.skip("should build the graph of nodes by resolving paths aliases", () => {
          // TODO
        });
      });
    });
  });

  describe("SKIPPED: When TypeScript targets ECMAScript modules", () => {
    describe("When extracting module declarations starting from the root file", () => {
      describe("When extracting static import declarations", () => {
        describe("When the file has one import declaration", () => {
          it.skip("skott should build the graph with two nodes and one link", async () => {
            mountFakeFileSystem({
              "index.ts": `
                import { foo } from "./src/foo.js";
              
                console.log(foo.doSomething());
            `,
              "src/foo.ts": `
                export const foo = { doSomething: () => 'Hello, world!' };
            `
            });

            const skottProject =
              await buildSkottProjectUsingInMemoryFileExplorer("index.ts");

            expect(skottProject).to.be.deep.equal({
              graph: {
                "index.ts": {
                  adjacentTo: ["src/foo.ts"],
                  id: "index.ts",
                  body: fakeNodeBody
                },
                "src/foo.ts": {
                  adjacentTo: [],
                  id: "src/foo.js",
                  body: fakeNodeBody
                }
              },
              files: ["index.ts", "src/foo.ts"],
              circularDependencies: [],
              hasCircularDependencies: false,
              leaves: ["src/foo.ts"]
            });
          });
        });
      });
    });
  });
});
