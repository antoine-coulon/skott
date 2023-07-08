import { describe, expect, it } from "vitest";
import { createRealFileSystem, withRootDir } from "../create-fs-sandbox";
import { Skott, defaultConfig } from "../../../src/skott";
import { FileSystemReader } from "../../../src/filesystem/file-reader";
import { InMemoryFileWriter } from "../../../src/filesystem/file-writer";
import { ModuleWalkerSelector } from "../../../src/modules/walkers/common";
import { FakeLogger } from "../../../src/logger";
import { fakeNodeBody } from "../../unit/shared";

describe("When the extended config is coming from a third-party module", () => {
  it("should resolve the path alias using the third-party config", async () => {
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
        ignorePattern: ""
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
