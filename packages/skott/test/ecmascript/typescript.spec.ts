import { describe, expect, it } from "vitest";

import {
  buildSkottProjectUsingInMemoryFileExplorer,
  fakeNodeBody,
  mountFakeFileSystem
} from "../shared";

import { makeTestSuiteForJsxOrTsx as makeTestSuiteForTsx } from "./jsx-and-tsx";

describe("When traversing a TypeScript project", () => {
  describe("When the file does not have any module declarations", () => {
    it("skott should build a graph with only the root node", async () => {
      mountFakeFileSystem({
        "index.ts": "console.log('Hello, world!');"
      });

      const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
        entrypoint: "index.ts"
      });

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

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
            entrypoint: "index.ts"
          });

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

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
            entrypoint: "index.ts"
          });

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
        describe("When type imports are taken into account", () => {
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

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
              entrypoint: "index.ts"
            });

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

        describe("When type imports are ignored", () => {
          it("skott should build the graph with only the root node", async () => {
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

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
              entrypoint: "index.ts",
              trackTypeOnly: false
            });

            expect(graph).to.be.deep.equal({
              "index.ts": {
                adjacentTo: [],
                id: "index.ts",
                body: fakeNodeBody
              }
            });
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

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
            entrypoint: "index.ts"
          });

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

      describe("When the the file includes relative imports with no leading '.' or './' identifier", () => {
        describe("When the baseUrl is the root mounting point", () => {
          const baseUrls = ["./", "."];

          it.each(baseUrls)(
            "should resolve imports relatively from the baseUrl to the location of the tsconfig",
            async (baseUrl) => {
              const tsConfig = {
                compilerOptions: {
                  baseUrl
                }
              };

              mountFakeFileSystem({
                "index.ts": `
                import { foo } from "lib/foo";
              `,
                "lib/foo.ts": `
                export function foo(): string {}
              `,
                "tsconfig.json": JSON.stringify(tsConfig)
              });

              const { graph } =
                await buildSkottProjectUsingInMemoryFileExplorer({
                  entrypoint: "index.ts",
                  includeBaseDir: false,
                  trackThirdParty: true
                });

              expect(graph).to.be.deep.equal({
                "index.ts": {
                  adjacentTo: ["lib/foo.ts"],
                  id: "index.ts",
                  body: {
                    ...fakeNodeBody,
                    thirdPartyDependencies: []
                  }
                },
                "lib/foo.ts": {
                  adjacentTo: [],
                  id: "lib/foo.ts",
                  body: fakeNodeBody
                }
              });
            }
          );
        });

        describe("When the baseUrl is a given directory", () => {
          it("should resolve relative imports with no leading identifiers from the baseUrl to the location of the tsconfig", async () => {
            const tsConfig = {
              compilerOptions: {
                baseUrl: "libs"
              }
            };

            mountFakeFileSystem({
              "index.ts": `
                import { foo } from "foo";
                import * as Effect from "@effect/io";
                import * as smthing from "./something-else";
              `,
              "libs/foo.ts": `
                export function foo(): string {}
              `,
              "something-else.ts": ``,
              "tsconfig.json": JSON.stringify(tsConfig)
            });

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
              entrypoint: "index.ts",
              includeBaseDir: false,
              trackThirdParty: true
            });

            expect(graph).to.be.deep.equal({
              "index.ts": {
                adjacentTo: ["libs/foo.ts", "something-else.ts"],
                id: "index.ts",
                body: {
                  ...fakeNodeBody,
                  thirdPartyDependencies: ["@effect/io"]
                }
              },
              "libs/foo.ts": {
                adjacentTo: [],
                id: "libs/foo.ts",
                body: fakeNodeBody
              },
              "something-else.ts": {
                adjacentTo: [],
                id: "something-else.ts",
                body: fakeNodeBody
              }
            });
          });
        });
      });

      describe("When the file includes path aliases", () => {
        describe("When the baseUrl is just the root mounting point", () => {
          it("should resolve paths aliases relatively to a entrypoint at a the same level than the tsconfig", async () => {
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

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
              entrypoint: "index.ts",
              includeBaseDir: false,
              trackThirdParty: true
            });

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

          it("should resolve paths aliases relatively to a entrypoint at a lower file level than the tsconfig", async () => {
            const tsConfig = {
              compilerOptions: {
                baseUrl: ".",
                paths: {
                  "@libs/toolchain": ["libs/toolchain/index.ts"]
                }
              }
            };

            mountFakeFileSystem({
              "apps/index.ts": `
                import * as toolchain from "@libs/toolchain";
              `,
              "libs/toolchain/index.ts": `
                export function foo(): string {}
              `,
              "tsconfig.json": JSON.stringify(tsConfig)
            });

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
              entrypoint: "apps/index.ts",
              includeBaseDir: false,
              tsConfigPath: "tsconfig.json"
            });

            expect(graph).to.be.deep.equal({
              "index.ts": {
                adjacentTo: ["../libs/toolchain/index.ts"],
                id: "index.ts",
                body: fakeNodeBody
              },
              "../libs/toolchain/index.ts": {
                adjacentTo: [],
                id: "../libs/toolchain/index.ts",
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

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
              entrypoint: "index.ts",
              includeBaseDir: false,
              trackThirdParty: true
            });

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
          describe("When root alias are used", () => {
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

              const { graph } =
                await buildSkottProjectUsingInMemoryFileExplorer({
                  entrypoint: "index.ts",
                  includeBaseDir: false,
                  trackThirdParty: true
                });

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

          describe("When deep alias are used", () => {
            it("should replace glob segments", async () => {
              const tsConfig = {
                compilerOptions: {
                  baseUrl: ".",
                  paths: {
                    "@lib": ["lib/index.ts"],
                    "@/*": ["src/*"],
                    "@nested/path1/path2/*": ["core/path1/path2/*"],
                    "@nested/path3/path4/*": ["core/path3/path4/*"]
                  }
                }
              };

              mountFakeFileSystem({
                "index.ts": `
                  import { script } from "@typescript-eslint/estree-parser";
                  import { foo } from "@lib";
                  import { bar } from "@/some-folder/file";
                  import { nestedA } from "@/some-folder/nested/a";
                  import { nestedB } from "@/some-other-folder/nested/b";
                  import { coreA } from "@nested/path1/path2/feat";
                `,
                "lib/index.ts": `
                  export function foo(): string {}
                `,
                "src/some-folder/file.ts": `
                  export function bar(): string {}
                `,
                "src/some-folder/nested/a.ts": `
                  import { coreB } from "@nested/path3/path4/util";

                  export function nestedA(): string {}
                `,
                "src/some-other-folder/nested/b.ts": `
                  export function nestedB(): string {}
                `,
                "core/path1/path2/feat.ts": `
                  export function coreA(): string {}
                `,
                "core/path3/path4/util.ts": `
                  export function coreB(): string {}
                `,
                "tsconfig.json": JSON.stringify(tsConfig)
              });

              const { graph } =
                await buildSkottProjectUsingInMemoryFileExplorer({
                  entrypoint: "index.ts",
                  includeBaseDir: false,
                  trackThirdParty: true
                });

              expect(graph).to.be.deep.equal({
                "index.ts": {
                  adjacentTo: [
                    "lib/index.ts",
                    "src/some-folder/file.ts",
                    "src/some-folder/nested/a.ts",
                    "src/some-other-folder/nested/b.ts",
                    "core/path1/path2/feat.ts"
                  ],
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
                },
                "src/some-folder/file.ts": {
                  adjacentTo: [],
                  id: "src/some-folder/file.ts",
                  body: fakeNodeBody
                },
                "src/some-folder/nested/a.ts": {
                  adjacentTo: ["core/path3/path4/util.ts"],
                  id: "src/some-folder/nested/a.ts",
                  body: fakeNodeBody
                },
                "src/some-other-folder/nested/b.ts": {
                  adjacentTo: [],
                  id: "src/some-other-folder/nested/b.ts",
                  body: fakeNodeBody
                },
                "core/path1/path2/feat.ts": {
                  adjacentTo: [],
                  id: "core/path1/path2/feat.ts",
                  body: fakeNodeBody
                },
                "core/path3/path4/util.ts": {
                  adjacentTo: [],
                  id: "core/path3/path4/util.ts",
                  body: fakeNodeBody
                }
              });
            });
          });
        });

        describe("When resolving tsconfig.json from a different location than the cwd", () => {
          it("should resolve path alias relatively to the tsconfig location", async () => {
            const tsConfig = {
              compilerOptions: {
                baseUrl: ".",
                paths: {
                  "@libs/auth": ["libs/auth/index.ts"]
                }
              }
            };

            mountFakeFileSystem({
              "project/src/index.ts": `
                import { foo } from "@libs/auth";
              `,
              "project/libs/auth/index.ts": `
                export function foo(): string {}
              `,
              "project/tsconfig.json": JSON.stringify(tsConfig)
            });

            const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
              entrypoint: "project/src/index.ts",
              includeBaseDir: false,
              tsConfigPath: "project/tsconfig.json"
            });

            expect(graph).to.be.deep.equal({
              "index.ts": {
                adjacentTo: ["../libs/auth/index.ts"],
                id: "index.ts",
                body: fakeNodeBody
              },
              "../libs/auth/index.ts": {
                adjacentTo: [],
                id: "../libs/auth/index.ts",
                body: fakeNodeBody
              }
            });
          });
        });
      });
    });

    describe("When a global analysis without any entrypoint is requested", () => {
      describe("When there is a tsconfig located in the root directory including path aliases", () => {
        it("should resolve paths aliases", async () => {
          const tsConfig = {
            compilerOptions: {
              baseUrl: ".",
              paths: {
                "@lib1": ["libs/lib1/index.ts"],
                "@lib2": ["libs/lib2/index.ts"],
                "@lib3": ["libs/lib3/index.ts"]
              }
            }
          };

          mountFakeFileSystem({
            "libs/lib1/index.ts": `
                import * as lib2 from "@lib2";
              `,
            "libs/lib2/index.ts": `
                import * as lib3 from "@lib3";
                export function someComponent() {}
              `,
            "libs/lib3/index.ts": `
                export function lib() {}
              `,
            "apps/main/util.ts": `
                export function somethingUtil() {}
              `,
            "apps/main/index.ts": `
                import * as lib2 from "@lib2";
                import util from "./util";
              `,
            "tsconfig.json": JSON.stringify(tsConfig)
          });

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
            trackThirdParty: true
          });

          expect(graph).to.be.deep.equal({
            "libs/lib1/index.ts": {
              adjacentTo: ["libs/lib2/index.ts"],
              id: "libs/lib1/index.ts",
              body: fakeNodeBody
            },
            "libs/lib2/index.ts": {
              adjacentTo: ["libs/lib3/index.ts"],
              id: "libs/lib2/index.ts",
              body: fakeNodeBody
            },
            "libs/lib3/index.ts": {
              adjacentTo: [],
              id: "libs/lib3/index.ts",
              body: fakeNodeBody
            },
            "apps/main/util.ts": {
              adjacentTo: [],
              id: "apps/main/util.ts",
              body: fakeNodeBody
            },
            "apps/main/index.ts": {
              adjacentTo: ["libs/lib2/index.ts", "apps/main/util.ts"],
              id: "apps/main/index.ts",
              body: fakeNodeBody
            }
          });
        });
      });

      describe("When providing a base tsconfig extending other configs with both path aliases", () => {
        it("should resolve all paths aliases starting from base config", async () => {
          const tsConfigBase = {
            compilerOptions: {
              baseUrl: ".",
              paths: {
                "@path-alias1": ["path/alias1/index.ts"]
              }
            }
          };

          const tsConfigBuild = {
            extends: "./tsconfig.base.json",
            compilerOptions: {
              baseUrl: ".",
              paths: {
                "@path-alias2": ["path/alias2/index.ts"]
              }
            }
          };

          mountFakeFileSystem({
            "main/app/index.ts": `
                import "@path-alias1";
                import "@path-alias2";
            `,
            "path/alias1/index.ts": `
                export function something() {}
            `,
            "path/alias2/index.ts": `
                export function something() {}
              `,
            "tsconfig.base.json": JSON.stringify(tsConfigBase),
            "tsconfig.build.json": JSON.stringify(tsConfigBuild)
          });

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
            trackThirdParty: true,
            tsConfigPath: "tsconfig.build.json"
          });

          expect(graph).to.be.deep.equal({
            "main/app/index.ts": {
              adjacentTo: ["path/alias1/index.ts", "path/alias2/index.ts"],
              id: "main/app/index.ts",
              body: fakeNodeBody
            },
            "path/alias1/index.ts": {
              id: "path/alias1/index.ts",
              adjacentTo: [],
              body: fakeNodeBody
            },
            "path/alias2/index.ts": {
              id: "path/alias2/index.ts",
              adjacentTo: [],
              body: fakeNodeBody
            }
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

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
            entrypoint: "index.ts"
          });

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
