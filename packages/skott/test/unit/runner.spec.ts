import { describe, expect, test } from "vitest";

import { InMemoryFileReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import { FakeLogger } from "../../src/logger.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { defaultConfig, Skott } from "../../src/skott.js";

import {
  fakeNodeBody,
  inMemoryImplicitDependenciesFinder,
  mountFakeFileSystem
} from "./shared.js";

describe("Skott analysis runner", () => {
  test("Should be able to run Skott from a given cwd", async () => {
    mountFakeFileSystem({
      "./apps/app1/src/feature.ts": `
        export function feature() {}
      `,
      "./apps/app1/src/index.ts": `
        import { feature } from "./feature.ts";
      `,
      "./libs/lib1/src/index.ts": ``
    });

    const skott = new Skott(
      defaultConfig,
      new InMemoryFileReader({ cwd: "./apps", ignorePattern: "" }),
      new InMemoryFileWriter(),
      new ModuleWalkerSelector(),
      new FakeLogger()
    );

    const { graph } = await skott
      .initialize()
      .then(({ getStructure }) => getStructure());

    expect(graph).toEqual({
      "apps/app1/src/index.ts": {
        id: "apps/app1/src/index.ts",
        adjacentTo: ["apps/app1/src/feature.ts"],
        body: fakeNodeBody
      },
      "apps/app1/src/feature.ts": {
        id: "apps/app1/src/feature.ts",
        adjacentTo: [],
        body: fakeNodeBody
      }
    });
  });

  test("Should be able to collect unused third-party deps from multiple packages", async () => {
    const project1FS = {
      "./apps/app1/src/feature.ts": `
        export function feature() {}
      `,
      "./apps/app1/src/index.ts": `
        import { feature } from "./feature.ts";
      `,
      "./apps/package.json": `
        {
          "dependencies": {
            "lodash": "^4.17.21"
          }
        }
      `
    };

    const project2FS = {
      "./libs/lib1/src/index.ts": ``,
      "./libs/package.json": `
        {
            "dependencies": {
                "@effect/io": "0.1.0"
            }
        }
      `
    };

    const projectConfigurations = [
      {
        cwd: "./apps",
        fs: project1FS,
        expectedUnused: ["lodash"]
      },
      {
        cwd: "./libs",
        fs: project2FS,
        expectedUnused: ["@effect/io"]
      }
    ];

    for (const { cwd, fs, expectedUnused } of projectConfigurations) {
      mountFakeFileSystem(fs);

      const skott = new Skott(
        defaultConfig,
        new InMemoryFileReader({ cwd, ignorePattern: "" }),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      const { thirdParty } = await skott
        .initialize()
        .then(({ findUnusedDependencies }) =>
          findUnusedDependencies(inMemoryImplicitDependenciesFinder)
        );

      expect(thirdParty).toEqual(expectedUnused);
    }
  });

  test("Should produce an explicit error message when the entrypoint can't be found", async () => {
    const skott = new Skott(
      { ...defaultConfig, entrypoint: "not-existing.ts" },
      new InMemoryFileReader(),
      new InMemoryFileWriter(),
      new ModuleWalkerSelector(),
      new FakeLogger()
    );

    expect(skott.initialize()).rejects.toThrowError(
      `Entrypoint "not-existing.ts" not found`
    );
  });

  describe("When using ignore pattern", () => {
    describe("When using a pattern specific to file names", () => {
      test("Should ignore all test files including `.spec` and `.test` prefixes", async () => {
        mountFakeFileSystem({
          "./src/apps/app1/src/feature.ts": ``,
          "./src/apps/app1/src/feature.spec.ts": ``,
          "./src/lib/feature.test.ts": ``,
          "./src/lib/feature.unit.test.ts": ``
        });

        const skott = new Skott(
          defaultConfig,
          new InMemoryFileReader({
            cwd: "./",
            ignorePattern: "**/*.+(spec|test).*"
          }),
          new InMemoryFileWriter(),
          new ModuleWalkerSelector(),
          new FakeLogger()
        );

        const { files } = await skott
          .initialize()
          .then(({ getStructure }) => getStructure());

        expect(files).toEqual(["src/apps/app1/src/feature.ts"]);
      });
    });

    describe("When using bulk analysis with no imports between files", () => {
      test("Should ignore all files within `tests` folder", async () => {
        mountFakeFileSystem({
          "./src/apps/app1/src/feature.ts": ``,
          "./src/apps/app1/src/index.ts": ``,
          "./src/tests/test-1.ts": ``,
          "./src/tests/test-2.ts": ``
        });

        const skott = new Skott(
          defaultConfig,
          new InMemoryFileReader({
            cwd: "./",
            ignorePattern: "**/tests/**/*.ts"
          }),
          new InMemoryFileWriter(),
          new ModuleWalkerSelector(),
          new FakeLogger()
        );

        const { files } = await skott
          .initialize()
          .then(({ getStructure }) => getStructure());

        expect(files).toEqual([
          "src/apps/app1/src/feature.ts",
          "src/apps/app1/src/index.ts"
        ]);
      });
    });

    describe("When using bulk analysis with imports between files", () => {
      test("Should even discard files that are imported from non-ignored files", async () => {
        mountFakeFileSystem({
          "./apps/app1/feature.ts": `
            import { lib } from "../../libs/lib-1/test-1.ts";
            export function feature() {}
          `,
          "./apps/app1/index.ts": `
            import { feature } from "./feature.ts";
          `,
          "./libs/lib-1/test-1.ts": `
            export function lib() {}
          `
        });

        const skott = new Skott(
          { ...defaultConfig },
          new InMemoryFileReader({ ignorePattern: "libs/**/*.ts", cwd: "./" }),
          new InMemoryFileWriter(),
          new ModuleWalkerSelector(),
          new FakeLogger()
        );

        const { graph, files } = await skott
          .initialize()
          .then(({ getStructure }) => getStructure());

        expect(files).toEqual(["apps/app1/feature.ts", "apps/app1/index.ts"]);

        expect(graph).toEqual({
          "apps/app1/index.ts": {
            id: "apps/app1/index.ts",
            adjacentTo: ["apps/app1/feature.ts"],
            body: fakeNodeBody
          },
          "apps/app1/feature.ts": {
            id: "apps/app1/feature.ts",
            adjacentTo: [],
            body: fakeNodeBody
          }
        });
      });
    });

    describe("When using an entrypoint with imports between files", () => {
      test("Should even discard files that are imported from non-ignored files", async () => {
        mountFakeFileSystem({
          "./apps/app1/feature.ts": `
            import { lib } from "../../libs/lib-1/test-1.ts";
            export function feature() {}
          `,
          "./apps/app1/index.ts": `
            import { feature } from "./feature.ts";
          `,
          "./libs/lib-1/test-1.ts": `
            export function lib() {}
          `
        });

        const skott = new Skott(
          {
            ...defaultConfig,
            entrypoint: "apps/app1/index.ts",
            includeBaseDir: true
          },
          new InMemoryFileReader({ ignorePattern: "libs/**/*.ts", cwd: "./" }),
          new InMemoryFileWriter(),
          new ModuleWalkerSelector(),
          new FakeLogger()
        );

        const { graph, files } = await skott
          .initialize()
          .then(({ getStructure }) => getStructure());

        expect(files).toEqual(["apps/app1/index.ts", "apps/app1/feature.ts"]);

        expect(graph).toEqual({
          "apps/app1/index.ts": {
            id: "apps/app1/index.ts",
            adjacentTo: ["apps/app1/feature.ts"],
            body: fakeNodeBody
          },
          "apps/app1/feature.ts": {
            id: "apps/app1/feature.ts",
            adjacentTo: [],
            body: fakeNodeBody
          }
        });
      });
    });
  });
});
