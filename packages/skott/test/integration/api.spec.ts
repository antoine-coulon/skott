import { describe, expect, test } from "vitest";

import skott from "../../index.js";
import { FileSystemReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import { FakeLogger } from "../../src/logger.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { Skott, defaultConfig } from "../../src/skott.js";

import { createRealFileSystem } from "./create-fs-sandbox.js";

describe("When running Skott using all real dependencies", () => {
  describe("When providing various configurations", () => {
    test("Should support empty config", async () => {
      const skottInstance = await skott();

      expect(skottInstance).toBeDefined();
    });

    test("Should not allow `includeBaseDir` to be truthy when no entrypoint is provided", async () => {
      function makeSkott() {
        return skott({
          cwd: "./",
          entrypoint: undefined,
          includeBaseDir: true
        });
      }

      await expect(makeSkott()).rejects.toThrow(
        "Illegal configuration: `includeBaseDir` can only be used when providing an entrypoint"
      );
    });

    test("Should not allow `cwd` to be customized when using an entrypoint", async () => {
      function makeSkott() {
        return skott({
          cwd: "./apps/some-app",
          verbose: false,
          entrypoint: "./anything.ts"
        });
      }

      await expect(makeSkott()).rejects.toThrow(
        "Illegal configuration: `cwd` can't be customized when providing an entrypoint"
      );
    });

    describe("groupBy", () => {
      test("Should not allow `groupBy` to be a non-function", async () => {
        await expect(() =>
          skott({
            // @ts-expect-error
            groupBy: "not-a-function"
          })
        ).rejects.toThrow(
          "`groupBy` must be a function or not provided at all"
        );
      });

      test("Should allow `groupBy` to be a function", async () => {
        const skottInstance = await skott({
          groupBy: (_path) => "group"
        });

        expect(skottInstance).toBeDefined();
      });
    });
  });

  describe("When traversing files", () => {
    test("Should ignore files listed in `.gitignore`", async () => {
      const fsRootDir = `skott-ignore-temp-fs`;

      const runSandbox = createRealFileSystem(fsRootDir, {
        "skott-ignore-temp-fs/.gitignore": `dist \r\n *.js`,
        "skott-ignore-temp-fs/dist/index.ts": `console.log("hello world")`,
        "skott-ignore-temp-fs/index.js": `console.log("hello world")`,
        "skott-ignore-temp-fs/blob.ts": `console.log("hello world")`
      });

      expect.assertions(1);

      const skott = new Skott(
        defaultConfig,
        new FileSystemReader({ cwd: fsRootDir, ignorePattern: "" }),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      await runSandbox(async () => {
        const { graph } = await skott
          .initialize()
          .then(({ getStructure }) => getStructure());

        expect(graph).toEqual({
          "skott-ignore-temp-fs/blob.ts": {
            id: "skott-ignore-temp-fs/blob.ts",
            adjacentTo: [],
            body: {
              builtinDependencies: [],
              size: 26,
              thirdPartyDependencies: []
            }
          }
        });
      });
    });

    describe("When using ignore pattern", () => {
      describe("When running bulk analysis", () => {
        test("Should discard files with pattern relative to an absolute directory path", async () => {
          const fsRootDir = `skott-ignore-temp-fs`;

          const runSandbox = createRealFileSystem(fsRootDir, {
            "skott-ignore-temp-fs/src/project-a/file.ts": `export interface File { name: string }`,
            "skott-ignore-temp-fs/src/project-b/file.ts": `export interface File { name: string }`,
            "skott-ignore-temp-fs/lib/index.ts": `console.log("hello world")`
          });

          expect.assertions(1);

          const skott = new Skott(
            defaultConfig,
            new FileSystemReader({
              cwd: fsRootDir,
              ignorePattern: `src/project-b/**/*`
            }),
            new InMemoryFileWriter(),
            new ModuleWalkerSelector(),
            new FakeLogger()
          );

          await runSandbox(async () => {
            const { files } = await skott
              .initialize()
              .then(({ getStructure }) => getStructure());

            expect(files).toEqual([
              "skott-ignore-temp-fs/lib/index.ts",
              "skott-ignore-temp-fs/src/project-a/file.ts"
            ]);
          });
        });

        test("Should discard files with pattern relative to a relative directory path", async () => {
          const fsRootDir = `./skott-ignore-temp-fs`;

          const runSandbox = createRealFileSystem(fsRootDir, {
            "./skott-ignore-temp-fs/src/project-a/file.ts": `export interface File { name: string }`,
            "./skott-ignore-temp-fs/src/project-b/file.ts": `export interface File { name: string }`,
            "./skott-ignore-temp-fs/lib/index.ts": `console.log("hello world")`
          });

          expect.assertions(1);

          const skott = new Skott(
            defaultConfig,
            new FileSystemReader({
              cwd: fsRootDir,
              ignorePattern: `src/project-b/**/*`
            }),
            new InMemoryFileWriter(),
            new ModuleWalkerSelector(),
            new FakeLogger()
          );

          await runSandbox(async () => {
            const { files } = await skott
              .initialize()
              .then(({ getStructure }) => getStructure());

            expect(files).toEqual([
              "skott-ignore-temp-fs/lib/index.ts",
              "skott-ignore-temp-fs/src/project-a/file.ts"
            ]);
          });
        });

        describe("When there is module imports between files", () => {
          test("Should discard files + ignore their imported files with pattern relative to the baseDir", async () => {
            const fsRootDir = `skott-ignore-temp-fs`;

            const runSandbox = createRealFileSystem(fsRootDir, {
              "skott-ignore-temp-fs/project-a/file.ts": `import ../util/dates`,
              "skott-ignore-temp-fs/project-b/nested/file.ts": `import ../../util/dates`,
              "skott-ignore-temp-fs/util/dates/index.ts": `console.log("hello world")`
            });

            expect.assertions(1);

            const skott = new Skott(
              defaultConfig,
              new FileSystemReader({
                cwd: fsRootDir,
                ignorePattern: `util/dates/**/*`
              }),
              new InMemoryFileWriter(),
              new ModuleWalkerSelector(),
              new FakeLogger()
            );

            await runSandbox(async () => {
              const { files } = await skott
                .initialize()
                .then(({ getStructure }) => getStructure());

              expect(files).toEqual([
                "skott-ignore-temp-fs/project-a/file.ts",
                "skott-ignore-temp-fs/project-b/nested/file.ts"
              ]);
            });
          });

          test("Should ignore files + their relatively imported files with pattern realtive to cwd", async () => {
            const skott = new Skott(
              defaultConfig,
              new FileSystemReader({
                cwd: process.cwd(),
                ignorePattern: `src/**/*`
              }),
              new InMemoryFileWriter(),
              new ModuleWalkerSelector(),
              new FakeLogger()
            );

            const { files } = await skott
              .initialize()
              .then(({ getStructure }) => getStructure());

            expect(files.filter((f) => f.includes("src"))).toEqual([]);
          });
        });
      });

      describe("When running analysis starting from an entrypoint", () => {
        test("Should ignore files using ignore pattern relatively to the provided the base dir", async () => {
          const fsRootDir = `skott-ignore-temp-fs`;

          const runSandbox = createRealFileSystem(fsRootDir, {
            "skott-ignore-temp-fs/project-a/file.ts": `
              import "../lib/index";
            `,
            "skott-ignore-temp-fs/lib/index.ts": `console.log("hello world")`
          });

          expect.assertions(1);

          const skott = new Skott(
            {
              ...defaultConfig,
              entrypoint: `${fsRootDir}/project-a/file.ts`,
              includeBaseDir: true
            },
            new FileSystemReader({
              cwd: fsRootDir,
              ignorePattern: `lib/**/*`
            }),
            new InMemoryFileWriter(),
            new ModuleWalkerSelector(),
            new FakeLogger()
          );

          await runSandbox(async () => {
            const { files } = await skott
              .initialize()
              .then(({ getStructure }) => getStructure());

            expect(files).toEqual(["skott-ignore-temp-fs/project-a/file.ts"]);
          });
        });

        test("Should ignore files using ignore pattern without relying on provided the base dir", async () => {
          const fsRootDir = `skott-ignore-temp-fs`;

          const runSandbox = createRealFileSystem(fsRootDir, {
            "skott-ignore-temp-fs/project-a/file.ts": `
              import "../lib/index";
              import "../sub-folder/lib/index";
            `,
            "skott-ignore-temp-fs/sub-folder/lib/index.ts": `console.log("hello world")`,
            "skott-ignore-temp-fs/lib/index.ts": `console.log("hello world")`
          });

          expect.assertions(1);

          const skott = new Skott(
            {
              ...defaultConfig,
              entrypoint: `${fsRootDir}/project-a/file.ts`,
              includeBaseDir: false
            },
            new FileSystemReader({
              cwd: fsRootDir,
              ignorePattern: `lib/**/*`
            }),
            new InMemoryFileWriter(),
            new ModuleWalkerSelector(),
            new FakeLogger()
          );

          await runSandbox(async () => {
            const { files } = await skott
              .initialize()
              .then(({ getStructure }) => getStructure());

            expect(files).toEqual(["file.ts", "../sub-folder/lib/index.ts"]);
          });
        });
      });
    });

    describe("When grouping is enabled", () => {
      const fsRootDir = `skott-ignore-temp-fs`;

      const runSandbox = createRealFileSystem(fsRootDir, {
        "skott-ignore-temp-fs/src/core/index.js": `export const N = 42;`,
        "skott-ignore-temp-fs/src/features/feature-a/index.js": `import { N } from "../../core"; export const A = N;`,
        "skott-ignore-temp-fs/src/features/feature-b/index.js": `import { N } from "../../core"; import { A } from "../feature-a"; console.log(A); export const B = N;`,
        "skott-ignore-temp-fs/src/features/feature-c/a.js": `import { N } from "../../core"; import { A } from "../feature-a"; export { N, A };`,
        "skott-ignore-temp-fs/src/features/feature-c/b.js": `import { B } from "./src/features/feature-b"; export { B };`,
        "skott-ignore-temp-fs/src/features/feature-c/c.js": `import { N, A } from "./a"; import { B } from "./b"; export { N, A, B };`,
        "skott-ignore-temp-fs/src/features/feature-c/index.js": `export { N as CN, A as CA, B as CB } from "./c";`,
        "skott-ignore-temp-fs/index.js": `import { N } from "./src/core"; import { A } from "./src/features/feature-a"; import { B } from "./src/features/feature-b"; import * as C from "./src/features/feature-c"; console.log(N, A, B, C);`
      });

      test("Should group files using the provided function", async () => {
        expect.assertions(1);

        const skott = new Skott(
          {
            ...defaultConfig,
            groupBy: (path) => {
              if (path.includes("src/core")) return "core";

              if (path.includes("src/features/feature-a")) return "feature-a";

              if (path.includes("src/features/feature-b")) return "feature-b";

              if (path.includes("src/features/feature-c")) return "feature-c";

              return undefined;
            }
          },
          new FileSystemReader({ cwd: fsRootDir, ignorePattern: "" }),
          new InMemoryFileWriter(),
          new ModuleWalkerSelector(),
          new FakeLogger()
        );

        await runSandbox(async () => {
          const { groupedGraph } = await skott
            .initialize()
            .then(({ getStructure }) => getStructure());

          expect(groupedGraph).toEqual({
            core: {
              id: "core",
              adjacentTo: [],
              body: {
                size: 20,
                files: ["skott-ignore-temp-fs/src/core/index.js"],
                thirdPartyDependencies: [],
                builtinDependencies: []
              }
            },
            "feature-a": {
              id: "feature-a",
              adjacentTo: ["core"],
              body: {
                size: 51,
                files: ["skott-ignore-temp-fs/src/features/feature-a/index.js"],
                thirdPartyDependencies: [],
                builtinDependencies: []
              }
            },
            "feature-b": {
              id: "feature-b",
              adjacentTo: ["core", "feature-a"],
              body: {
                size: 101,
                files: ["skott-ignore-temp-fs/src/features/feature-b/index.js"],
                thirdPartyDependencies: [],
                builtinDependencies: []
              }
            },
            "feature-c": {
              id: "feature-c",
              adjacentTo: ["core", "feature-a", "feature-b"],
              body: {
                size: 261,
                files: [
                  "skott-ignore-temp-fs/src/features/feature-c/index.js",
                  "skott-ignore-temp-fs/src/features/feature-c/c.js",
                  "skott-ignore-temp-fs/src/features/feature-c/a.js",
                  "skott-ignore-temp-fs/src/features/feature-c/b.js"
                ],
                thirdPartyDependencies: [],
                builtinDependencies: []
              }
            }
          });
        });
      });
    });
  });
});
