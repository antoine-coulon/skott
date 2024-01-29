/* eslint-disable max-lines */

import { describe, expect, it } from "vitest";

import {
  buildSkottProjectUsingInMemoryFileExplorer,
  fakeNodeBody,
  mountFakeFileSystem
} from "../shared.js";

import { makeTestSuiteForJsxOrTsx as makeTestSuiteForJsx } from "./jsx-and-tsx.js";

describe("When traversing a JavaScript/Node.js project", () => {
  describe("When the project uses ECMAScript modules", () => {
    describe("When extracting module declarations starting from the root file", () => {
      describe("When extracting static import declarations", () => {
        describe("When the file does not have any module declarations", () => {
          it("skott should build a graph with only the root node", async () => {
            mountFakeFileSystem({
              "index.js": "console.log('Hello, world!');"
            });

            const skottProject =
              await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "index.js"
              });

            expect(skottProject).to.be.deep.equal({
              graph: {
                "index.js": {
                  adjacentTo: [],
                  id: "index.js",
                  body: fakeNodeBody
                }
              },
              files: ["index.js"],
              circularDependencies: [],
              hasCircularDependencies: false,
              leaves: ["index.js"]
            });
          });
        });

        describe("When the file has one import declaration", () => {
          it("skott should build the graph with two nodes and one link", async () => {
            mountFakeFileSystem({
              "index.js": `
                  import { foo } from "./src/foo.js";
                  console.log(foo.doSomething());
              `,
              "src/foo.js": `
                  export const foo = { doSomething: () => 'Hello, world!' };
              `
            });

            const skottProject =
              await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "index.js"
              });

            expect(skottProject).to.be.deep.equal({
              graph: {
                "index.js": {
                  adjacentTo: ["src/foo.js"],
                  id: "index.js",
                  body: fakeNodeBody
                },
                "src/foo.js": {
                  adjacentTo: [],
                  id: "src/foo.js",
                  body: fakeNodeBody
                }
              },
              files: ["index.js", "src/foo.js"],
              circularDependencies: [],
              hasCircularDependencies: false,
              leaves: ["src/foo.js"]
            });
          });
        });

        describe("When the project has four nested import declarations", () => {
          it("skott should build the graph with all nodes and links", async () => {
            mountFakeFileSystem({
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
            });

            const skottProject =
              await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "index.js"
              });

            expect(skottProject).to.be.deep.equal({
              graph: {
                "index.js": {
                  adjacentTo: ["src/foo.js"],
                  id: "index.js",
                  body: fakeNodeBody
                },
                "src/foo.js": {
                  adjacentTo: ["src/bar.js"],
                  id: "src/foo.js",
                  body: fakeNodeBody
                },
                "src/bar.js": {
                  adjacentTo: ["src/lib/baz/index.js"],
                  id: "src/bar.js",
                  body: fakeNodeBody
                },
                "src/lib/baz/index.js": {
                  adjacentTo: ["src/lol/index.js"],
                  id: "src/lib/baz/index.js",
                  body: fakeNodeBody
                },
                "src/lol/index.js": {
                  adjacentTo: [],
                  id: "src/lol/index.js",
                  body: fakeNodeBody
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
              hasCircularDependencies: false,
              leaves: ["src/lol/index.js"]
            });
          });
        });

        describe("When the file contains imports of Node.js core modules", () => {
          it("should not consider Node.js core modules imports as file dependencies", async () => {
            mountFakeFileSystem({
              "index.js": `
                import { readFile } from "fs/promises";
                import { join } from "node:path";
                import { setImmediate } from "node:timers/promises";
                      
                import * as foobar from "./foobar.js";
    
                console.log(foobar.foo.doSomething());
              `,
              "foobar.js": `
                export const foo = { doSomething: () => 'Hello, world!' };
              `
            });

            const skottProject =
              await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "index.js"
              });

            expect(skottProject.graph).to.be.deep.equal({
              "index.js": {
                adjacentTo: ["foobar.js"],
                id: "index.js",
                body: fakeNodeBody
              },
              "foobar.js": {
                adjacentTo: [],
                id: "foobar.js",
                body: fakeNodeBody
              }
            });
            expect(skottProject.files).to.be.deep.equal([
              "index.js",
              "foobar.js"
            ]);
          });
        });

        describe("When the file imports third-party libraries", () => {
          it("should not consider third-party libraries as file dependencies", async () => {
            mountFakeFileSystem({
              "index.js": `
                import { parseScript } from "meriyah";
                import * as vuln from "@nodesecure/vuln";
    
                import * as foobar from "./foobar.js";
    
                console.log(foobar.foo.doSomething());
              `,
              "foobar.js": `
                export const foo = { doSomething: () => 'Hello, world!' };
              `
            });

            const skottProject =
              await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "index.js"
              });

            expect(skottProject.graph).to.be.deep.equal({
              "index.js": {
                adjacentTo: ["foobar.js"],
                id: "index.js",
                body: fakeNodeBody
              },
              "foobar.js": {
                adjacentTo: [],
                id: "foobar.js",
                body: fakeNodeBody
              }
            });
            expect(skottProject.files).to.be.deep.equal([
              "index.js",
              "foobar.js"
            ]);
          });
        });
      });

      describe("When extracting export declarations", () => {
        describe("When the file contains some 'ExportAllDeclaration'", () => {
          it("should extract all related export declarations", async () => {
            mountFakeFileSystem({
              "index.js": `
                export * from "./foobar.js";
                export * as foo from "./foo.js";
              `,
              "foobar.js": `
                export const foo = { doSomething: () => 'Hello, world!' };
              `,
              "foo.js": `
                export const foo = { doSomething: () => 'Hello, world!' };
              `
            });

            const skottProject =
              await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "index.js"
              });

            expect(skottProject.graph).to.be.deep.equal({
              "index.js": {
                adjacentTo: ["foobar.js", "foo.js"],
                id: "index.js",
                body: fakeNodeBody
              },
              "foobar.js": {
                adjacentTo: [],
                id: "foobar.js",
                body: fakeNodeBody
              },
              "foo.js": {
                adjacentTo: [],
                id: "foo.js",
                body: fakeNodeBody
              }
            });
            expect(skottProject.files).to.be.deep.equal([
              "index.js",
              "foobar.js",
              "foo.js"
            ]);
          });
        });

        describe("When the file contains some 'ExportNamedDeclaration", () => {
          it("should only extract named exports with a source", async () => {
            mountFakeFileSystem({
              "index.js": `
                export { foobar } from "./foobar.js";
              `,
              "foobar.js": `
                import { foo } from "./foo.js"
                export const foobar = { doSomething: () => 'Hello, world!' };
              `,
              "foo.js": `
                export const foo = { doSomething: () => foobar() };
    
                const foo2 = { doSomething: () => foobar() };
                export { foo2 };
        `
            });

            const skottProject =
              await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "index.js"
              });

            expect(skottProject.graph).to.be.deep.equal({
              "index.js": {
                adjacentTo: ["foobar.js"],
                id: "index.js",
                body: fakeNodeBody
              },
              "foobar.js": {
                adjacentTo: ["foo.js"],
                id: "foobar.js",
                body: fakeNodeBody
              },
              "foo.js": {
                adjacentTo: [],
                id: "foo.js",
                body: fakeNodeBody
              }
            });
            expect(skottProject.files).to.be.deep.equal([
              "index.js",
              "foobar.js",
              "foo.js"
            ]);
          });
        });
      });

      describe("When the project contains circular dependencies", () => {
        describe("When there is direct a circular dependency between two files importing each other", () => {
          it("should find the cycle and keep traversing other nodes", async () => {
            mountFakeFileSystem({
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
            });

            const { graph, hasCircularDependencies, circularDependencies } =
              await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "a.js"
              });

            expect(graph).to.deep.equal({
              "a.js": {
                id: "a.js",
                adjacentTo: ["b.js"],
                body: fakeNodeBody
              },
              "b.js": {
                id: "b.js",
                adjacentTo: ["a.js", "c.js"],
                body: fakeNodeBody
              },
              "c.js": {
                id: "c.js",
                adjacentTo: [],
                body: fakeNodeBody
              }
            });

            expect(hasCircularDependencies).to.equal(true);
            expect(circularDependencies).to.deep.equal([["a.js", "b.js"]]);
          });
        });

        describe("When there is an indirect circular dependency involving many files imports", () => {
          describe("When all the files are involved in the cycle", () => {
            it("should find the cycle and traverse+link all nodes involved in the cycle", async () => {
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
                  export const c = { doSomething: () => {} };
                `,
                "d.js": `
                  import { a } from "./a.js";
                  export const d = { doSomething: () => {} };
                `
              });

              const { graph, hasCircularDependencies, circularDependencies } =
                await buildSkottProjectUsingInMemoryFileExplorer({
                  entrypoint: "a.js"
                });

              expect(graph).to.deep.equal({
                "a.js": {
                  id: "a.js",
                  adjacentTo: ["b.js"],
                  body: fakeNodeBody
                },
                "b.js": {
                  id: "b.js",
                  adjacentTo: ["c.js"],
                  body: fakeNodeBody
                },
                "c.js": {
                  id: "c.js",
                  adjacentTo: ["d.js"],
                  body: fakeNodeBody
                },
                "d.js": {
                  id: "d.js",
                  adjacentTo: ["a.js"],
                  body: fakeNodeBody
                }
              });

              expect(hasCircularDependencies).to.equal(true);
              expect(circularDependencies).to.deep.equal([
                ["a.js", "b.js", "c.js", "d.js"]
              ]);
            });
          });

          describe("When only some of the files are involved in the cycle", () => {
            it("should find the cycle and keep traversing+linking other nodes not involved in the cycle", async () => {
              mountFakeFileSystem({
                "index.js": `
                  import * as _ from "./src/feature.js";
                `,
                "src/feature.js": `
                  import * as _ from "./constants.js";
                  import * as _ from "./utils/index.js";
                  import * as _ from "./other-feature.js";
                `,
                "src/constants.js": ``,
                "src/utils/index.js": `
                  import { doSomethingUtil } from "./doSomethingUtil.js";
                `,
                "src/utils/doSomethingUtil.js": `
                  import { anything } from "./index.js";
                `,
                "src/other-feature.js": `
                  import { scripts } from "./last-feature.js";
                  import { utils } from "./utils/index.js";
                `,
                "src/last-feature.js": ``
              });

              const {
                graph,
                circularDependencies,
                hasCircularDependencies,
                files
              } = await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "index.js"
              });

              expect(graph).to.deep.equal({
                "index.js": {
                  id: "index.js",
                  adjacentTo: ["src/feature.js"],
                  body: fakeNodeBody
                },
                "src/feature.js": {
                  id: "src/feature.js",
                  adjacentTo: [
                    "src/constants.js",
                    "src/utils/index.js",
                    "src/other-feature.js"
                  ],
                  body: fakeNodeBody
                },
                "src/constants.js": {
                  id: "src/constants.js",
                  adjacentTo: [],
                  body: fakeNodeBody
                },
                "src/utils/index.js": {
                  id: "src/utils/index.js",
                  adjacentTo: ["src/utils/doSomethingUtil.js"],
                  body: fakeNodeBody
                },
                "src/utils/doSomethingUtil.js": {
                  id: "src/utils/doSomethingUtil.js",
                  adjacentTo: ["src/utils/index.js"],
                  body: fakeNodeBody
                },
                "src/other-feature.js": {
                  id: "src/other-feature.js",
                  adjacentTo: ["src/last-feature.js", "src/utils/index.js"],
                  body: fakeNodeBody
                },
                "src/last-feature.js": {
                  id: "src/last-feature.js",
                  adjacentTo: [],
                  body: fakeNodeBody
                }
              });

              expect(files).to.deep.equal([
                "index.js",
                "src/feature.js",
                "src/constants.js",
                "src/utils/index.js",
                "src/utils/doSomethingUtil.js",
                "src/other-feature.js",
                "src/last-feature.js"
              ]);

              expect(hasCircularDependencies).to.equal(true);
              expect(circularDependencies).to.deep.equal([
                ["src/utils/index.js", "src/utils/doSomethingUtil.js"]
              ]);
            });
          });
        });
      });
    });
  });

  describe("When the project uses CommonJS modules", () => {
    describe("When extracting import declarations", () => {
      describe("When extracting import declarations targetting files", () => {
        const mixOfScenariosWithRequireImports = [
          {
            description:
              "When the file has one require identifier without the file extension",
            requireIdentifier: `require("./src/foo")`,
            expectedFinalFileExtension: "js"
          },
          {
            description:
              "When the file has one require identifier with a .js extension",
            requireIdentifier: `require("./src/foo.js")`,
            expectedFinalFileExtension: "js"
          },
          {
            description:
              "When the file has one require identifier with a .cjs extension",
            requireIdentifier: `require("./src/foo.cjs")`,
            expectedFinalFileExtension: "cjs"
          }
        ];

        for (const scenarioWithRequireImport of mixOfScenariosWithRequireImports) {
          it(scenarioWithRequireImport.description, async () => {
            mountFakeFileSystem({
              "index.js": `
                    const { foo } = ${scenarioWithRequireImport.requireIdentifier};
            
                    console.log(foo.doSomething());
                  `,
              [`src/foo.${scenarioWithRequireImport.expectedFinalFileExtension}`]: `
                    module.exports.foo = { doSomething: () => 'Hello, world!' };
                  `
            });

            const skottProject =
              await buildSkottProjectUsingInMemoryFileExplorer({
                entrypoint: "index.js",
                includeBaseDir: false
              });

            expect(skottProject).to.be.deep.equal({
              graph: {
                "index.js": {
                  adjacentTo: [
                    `src/foo.${scenarioWithRequireImport.expectedFinalFileExtension}`
                  ],
                  id: `index.js`,
                  body: fakeNodeBody
                },
                [`src/foo.${scenarioWithRequireImport.expectedFinalFileExtension}`]:
                  {
                    adjacentTo: [],
                    id: `src/foo.${scenarioWithRequireImport.expectedFinalFileExtension}`,
                    body: fakeNodeBody
                  }
              },
              files: [
                `index.js`,
                `src/foo.${scenarioWithRequireImport.expectedFinalFileExtension}`
              ],
              circularDependencies: [],
              hasCircularDependencies: false,
              leaves: [
                `src/foo.${scenarioWithRequireImport.expectedFinalFileExtension}`
              ]
            });
          });
        }
      });

      describe("When extracting import declarations targetting folders", () => {
        it("should find the index.js linked to the folder import", async () => {
          mountFakeFileSystem({
            "index.js": `
              const { foo } = require("./lib");
              const { foobar } = require("./foobar");
            `,
            "lib/index.js": "",
            "foobar.js": ""
          });

          const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
            {
              entrypoint: "index.js"
            }
          );

          expect(skottProject).to.be.deep.equal({
            graph: {
              "index.js": {
                adjacentTo: ["lib/index.js", "foobar.js"],
                id: "index.js",
                body: fakeNodeBody
              },
              "lib/index.js": {
                adjacentTo: [],
                id: "lib/index.js",
                body: fakeNodeBody
              },
              "foobar.js": {
                adjacentTo: [],
                id: "foobar.js",
                body: fakeNodeBody
              }
            },
            files: ["index.js", "lib/index.js", "foobar.js"],
            circularDependencies: [],
            hasCircularDependencies: false,
            leaves: ["lib/index.js", "foobar.js"]
          });
        });
      });
    });

    describe("When extracting export declarations", () => {
      describe("When exporting something imported", () => {
        it("should add a link between the file exporting and the file being imported", async () => {
          mountFakeFileSystem({
            "index.js": `
              const { foo } = require("./lib");
              const { foobar } = require("./foobar");
            `,
            "lib/index.js": `
              module.exports = require("../fizzbuzz.js");
            `,
            "fizzbuzz.js": `
              module.exports.foobaz = require("./foobaz.js");
            `,
            "foobar.js": `
              exports.foobaz = require("./foobaz.js");
            `,
            "foobaz.js": ""
          });

          const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
            {
              entrypoint: "index.js"
            }
          );

          expect(skottProject).to.be.deep.equal({
            graph: {
              "index.js": {
                adjacentTo: ["lib/index.js", "foobar.js"],
                id: "index.js",
                body: fakeNodeBody
              },
              "lib/index.js": {
                adjacentTo: ["fizzbuzz.js"],
                id: "lib/index.js",
                body: fakeNodeBody
              },
              "foobar.js": {
                adjacentTo: ["foobaz.js"],
                id: "foobar.js",
                body: fakeNodeBody
              },
              "fizzbuzz.js": {
                adjacentTo: ["foobaz.js"],
                id: "fizzbuzz.js",
                body: fakeNodeBody
              },
              "foobaz.js": {
                adjacentTo: [],
                id: "foobaz.js",
                body: fakeNodeBody
              }
            },
            files: [
              "index.js",
              "lib/index.js",
              "fizzbuzz.js",
              "foobaz.js",
              "foobar.js"
            ],
            circularDependencies: [],
            hasCircularDependencies: false,
            leaves: ["foobaz.js"]
          });
        });
      });
    });
  });

  describe("When the project uses JSX", () => {
    makeTestSuiteForJsx("js");
  });
});
