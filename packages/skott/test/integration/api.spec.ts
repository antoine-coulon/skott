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
  });
});
