import { describe, expect, test } from "vitest";

import { FileSystemReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import { FakeLogger } from "../../src/logger.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { Skott, defaultConfig } from "../../src/skott.js";

import {
  createNpmManifest,
  createRealFileSystem
} from "./create-fs-sandbox.js";

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

  describe("When collecting unused dependencies using both skott + depcheck analysis from a single-repo", () => {
    test("Should merge the devDeps additionnally found by depcheck with the prodDeps found by skott", async () => {
      const fsRootDir = `skott-real-temp-fs`;

      const runSandbox = createRealFileSystem(fsRootDir, {
        "skott-real-temp-fs/package.json": createNpmManifest({
          name: "library1",
          dependencies: {
            rxjs: "^7.3.0",
            "ts-pattern": "^7.3.0"
          },
          devDependencies: {
            eslint: "^3.19.0",
            "eslint-plugin-import": "^2.22.1"
          }
        }),
        "skott-real-temp-fs/index.ts": `
          import { Observable } from 'rxjs';
        `
      });

      expect.assertions(1);

      const skott = new Skott(
        {
          ...defaultConfig,
          dependencyTracking: {
            ...defaultConfig.dependencyTracking,
            thirdParty: true
          }
        },
        new FileSystemReader({ cwd: fsRootDir }),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      await runSandbox(async () => {
        const { findUnusedDependencies } = await skott.initialize();

        const { thirdParty } = await findUnusedDependencies();

        expect(thirdParty).toEqual([
          "ts-pattern",
          "eslint",
          "eslint-plugin-import"
        ]);
      });
    });
  });
});
