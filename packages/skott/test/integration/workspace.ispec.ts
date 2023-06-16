import { describe, expect, test } from "vitest";

import { FileSystemReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import { FakeLogger } from "../../src/logger.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { Skott, defaultConfig } from "../../src/skott.js";

import { createNpmManifest, createRealFileSystem } from "./file-system.js";

describe("When running Skott with a real file system", () => {
  test("Should collect workspace dependencies", async () => {
    const fsRootDir = `skott-real-temp-fs`;

    const runSandbox = createRealFileSystem(fsRootDir, {
      "skott-real-temp-fs/app1/package.json": createNpmManifest({
        name: "apponio1",
        dependencies: {
          rxjs: "^7.3.0"
        }
      }),
      "skott-real-temp-fs/app2/package.json": createNpmManifest({
        name: "apponio2"
      })
    });

    expect.assertions(1);

    const skott = new Skott(
      { ...defaultConfig },
      new FileSystemReader({ cwd: fsRootDir }),
      new InMemoryFileWriter(),
      new ModuleWalkerSelector(),
      new FakeLogger()
    );

    await runSandbox(async () => {
      const { getWorkspace } = await skott.initialize();
      const workspace = getWorkspace();

      expect(workspace).toEqual({
        apponio1: {
          dependencies: {
            rxjs: "^7.3.0"
          },
          devDependencies: {},
          peerDependencies: {}
        },
        apponio2: {
          dependencies: {},
          devDependencies: {},
          peerDependencies: {}
        }
      });
    });
  });

  test.skip("Should detect unused deps");
});
