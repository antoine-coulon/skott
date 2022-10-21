import { expect } from "chai";

import { makeTestSuiteForJsxOrTsx as makeTestSuiteForTsx } from "./jsx-and-tsx";
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

      const { graph } = await buildSkottProjectUsingInMemoryFileExplorer(
        "index.ts"
      );

      expect(graph).to.be.deep.equal({
        "index.ts": {
          adjacentTo: [],
          id: "index.ts",
          body: fakeNodeBody
        }
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

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer(
            "index.ts"
          );

          expect(graph).to.be.deep.equal({
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

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer(
            "index.ts"
          );

          expect(graph).to.be.deep.equal({
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

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer(
            "index.ts"
          );

          expect(graph).to.be.deep.equal({
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

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer(
            "index.ts"
          );

          expect(graph).to.be.deep.equal({
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
          });
        });
      });

      describe("When the file includes path aliases", () => {
        describe("When the baseUrl is just the root mounting point", () => {
          it("should build the graph of nodes by resolving paths aliases", async () => {
            const tsConfig = {
              compilerOptions: {
                baseUrl: ".",
                paths: {
                  "@lib": ["lib/index.ts"]
                }
              }
            };

            mountFakeFileSystem({
              "index.ts": `
              import { script } from "@typescript-eslint/estree-parser";
              import { foo } from "@lib";
            `,
              "lib/index.ts": `
              export function foo(): string {}
            `,
              "tsconfig.json": JSON.stringify(tsConfig)
            });

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer(
              "index.ts",
              false,
              true
            );

            expect(graph).to.be.deep.equal({
              "index.ts": {
                adjacentTo: ["lib/index.ts"],
                id: "index.ts",
                body: {
                  ...fakeNodeBody,
                  thirdPartyDependencies: ["@typescript-eslint/estree-parser"]
                }
              },
              "lib/index.ts": {
                adjacentTo: [],
                id: "lib/index.ts",
                body: fakeNodeBody
              }
            });
          });
        });

        describe("When the baseUrl specifies a base directory", () => {
          it("should build the graph of nodes by resolving paths aliases", async () => {
            const tsConfig = {
              compilerOptions: {
                baseUrl: "src",
                paths: {
                  "@lib": ["lib/index.ts"]
                }
              }
            };

            mountFakeFileSystem({
              "index.ts": `
              import { foo } from "@lib";
            `,
              "src/lib/index.ts": `
              export function foo(): string {}
            `,
              "tsconfig.json": JSON.stringify(tsConfig)
            });

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer(
              "index.ts",
              false,
              true
            );

            expect(graph).to.be.deep.equal({
              "index.ts": {
                adjacentTo: ["src/lib/index.ts"],
                id: "index.ts",
                body: fakeNodeBody
              },
              "src/lib/index.ts": {
                adjacentTo: [],
                id: "src/lib/index.ts",
                body: fakeNodeBody
              }
            });
          });
        });

        describe("When path alias are using globs", () => {
          it("should replace glob segments", async () => {
            const tsConfig = {
              compilerOptions: {
                baseUrl: "src",
                paths: {
                  "config/*": ["config/*"],
                  "app/*": ["core/apps/*"],
                  "shared/*": ["core/shared/*"]
                }
              }
            };

            mountFakeFileSystem({
              "index.ts": `
                import "config/json";
                import "./lib";
              `,
              "lib.ts": `
                import app from "app/skott";
                import s from "shared";
                import { script } from "@typescript-eslint/estree-parser";
              `,
              "src/config/json/index.ts": `
                export function json(): string {}
              `,
              "src/core/apps/skott.ts": `
                export function skottHtml(): string { return "<h1>skott</h1>"; }
              `,
              "src/core/shared/index.ts": `
                export function shared(): string {}
              `,
              "tsconfig.json": JSON.stringify(tsConfig)
            });

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer(
              "index.ts",
              false,
              true
            );

            expect(graph).to.be.deep.equal({
              "index.ts": {
                adjacentTo: ["src/config/json/index.ts", "lib.ts"],
                id: "index.ts",
                body: fakeNodeBody
              },
              "lib.ts": {
                adjacentTo: [
                  "src/core/apps/skott.ts",
                  "src/core/shared/index.ts"
                ],
                id: "lib.ts",
                body: {
                  ...fakeNodeBody,
                  thirdPartyDependencies: ["@typescript-eslint/estree-parser"]
                }
              },
              "src/config/json/index.ts": {
                adjacentTo: [],
                id: "src/config/json/index.ts",
                body: fakeNodeBody
              },
              "src/core/apps/skott.ts": {
                adjacentTo: [],
                id: "src/core/apps/skott.ts",
                body: fakeNodeBody
              },
              "src/core/shared/index.ts": {
                adjacentTo: [],
                id: "src/core/shared/index.ts",
                body: fakeNodeBody
              }
            });
          });
        });
      });
    });
  });

  describe("When TypeScript targets ECMAScript modules", () => {
    describe("When extracting static import declarations", () => {
      describe("When file includes mixin of .js and .ts imports", () => {
        it("skott should resolve JavaScript files to their corresponding TypeScript files", async () => {
          mountFakeFileSystem({
            "index.ts": `
                import { foo } from "./src/foo.js";
              
                console.log(foo.doSomething());
            `,
            "src/foo.ts": `
                import './index.js';
                export const foo = { doSomething: () => 'Hello, world!' };
            `,
            "src/index.js": `
                export const bar = { doSomething: () => 'Hello, world!' };
            `
          });

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer(
            "index.ts"
          );

          expect(graph).to.be.deep.equal({
            "index.ts": {
              adjacentTo: ["src/foo.ts"],
              id: "index.ts",
              body: fakeNodeBody
            },
            "src/foo.ts": {
              adjacentTo: ["src/index.js"],
              id: "src/foo.ts",
              body: fakeNodeBody
            },
            "src/index.js": {
              adjacentTo: [],
              id: "src/index.js",
              body: fakeNodeBody
            }
          });
        });
      });
    });
  });

  describe("When the project uses TSX files", () => {
    makeTestSuiteForTsx("ts");
  });
});
