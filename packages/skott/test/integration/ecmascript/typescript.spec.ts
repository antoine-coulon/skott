import { describe, expect, test } from "vitest";

import { InMemoryFileWriter } from "../../../src/filesystem/fake/file-writer.js";
import { FileSystemReader } from "../../../src/filesystem/file-reader.js";
import { FakeLogger } from "../../../src/logger.js";
import { ModuleWalkerSelector } from "../../../src/modules/walkers/common.js";
import { Skott, defaultConfig } from "../../../src/skott.js";
import { fakeNodeBody } from "../../unit/shared.js";
import { createRealFileSystem, withRootDir } from "../create-fs-sandbox.js";

describe("When the extended config is coming from a third-party module", () => {
  test("should resolve the path alias using the third-party config", async () => {
    const tsConfigRemote = {
      compilerOptions: {
        baseUrl: "./",
        paths: {
          "@path-alias": ["path/alias/index.ts"]
        }
      }
    };

    const tsConfigBuild = {
      extends: "@some-lib/tsconfig.json"
    };

    const rootDir = "temp-fs-typescript";
    const makeFilePath = withRootDir(rootDir);

    const runSandbox = createRealFileSystem(rootDir, {
      [makeFilePath("main/app/index.ts")]: `
          import "@path-alias";
        `,
      [makeFilePath("path/alias/index.ts")]: `
          export function something() {}
        `,
      [makeFilePath("node_modules/@some-lib/tsconfig.json")]:
        JSON.stringify(tsConfigRemote),
      [makeFilePath("tsconfig.build.json")]: JSON.stringify(tsConfigBuild)
    });

    const skott = new Skott(
      { ...defaultConfig, tsConfigPath: "tsconfig.build.json" },
      new FileSystemReader({
        cwd: rootDir,
        ignorePatterns: []
      }),
      new InMemoryFileWriter(),
      new ModuleWalkerSelector(),
      new FakeLogger()
    );

    await runSandbox(async () => {
      const { getStructure } = await skott.initialize();
      const { graph } = await getStructure();

      expect(graph).to.be.deep.equal({
        [makeFilePath("main/app/index.ts")]: {
          id: makeFilePath("main/app/index.ts"),
          adjacentTo: [makeFilePath("path/alias/index.ts")],
          body: { ...fakeNodeBody, size: 41 }
        },
        [makeFilePath("path/alias/index.ts")]: {
          id: makeFilePath("path/alias/index.ts"),
          adjacentTo: [],
          body: { ...fakeNodeBody, size: 50 }
        }
      });
    });
  });
});

describe("When resolving modules with path aliases", () => {
  test("Should only include file paths starting from the project base directory", async () => {
    const tsConfig = {
      compilerOptions: {
        baseUrl: "src"
      }
    };

    const rootDir = "temp-fs-typescript-modules";
    const makeFilePath = withRootDir(rootDir);

    const runSandbox = createRealFileSystem(rootDir, {
      [makeFilePath("subfolder/src/foo/index.ts")]: `
          import { a } from "./foo";
        `,
      [makeFilePath("subfolder/src/foo/foo.ts")]: `
          import { b } from "bar/bar";
        `,
      [makeFilePath("subfolder/src/bar/bar.ts")]: `
          export const b = "b";
        `,
      [makeFilePath("subfolder/tsconfig.json")]: JSON.stringify(tsConfig)
    });

    const skott = new Skott(
      {
        ...defaultConfig,
        entrypoint: "temp-fs-typescript-modules/subfolder/src/foo/index.ts",
        includeBaseDir: true,
        tsConfigPath: "temp-fs-typescript-modules/subfolder/tsconfig.json"
      },
      new FileSystemReader({
        cwd: process.cwd(),
        ignorePatterns: []
      }),
      new InMemoryFileWriter(),
      new ModuleWalkerSelector(),
      new FakeLogger()
    );

    await runSandbox(async () => {
      const { getStructure } = await skott.initialize();
      const { files } = await getStructure();

      expect(files).toEqual([
        makeFilePath("subfolder/src/foo/index.ts"),
        makeFilePath("subfolder/src/foo/foo.ts"),
        makeFilePath("subfolder/src/bar/bar.ts")
      ]);
    });
  });
});
