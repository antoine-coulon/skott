import fs from "node:fs/promises";
import path from "node:path";

import { describe, expect, test } from "vitest";

import { FileSystemReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import { FakeLogger } from "../../src/logger.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { Skott, defaultConfig } from "../../src/skott.js";

function makeRealFileSystem(
  fsRootDir: string,
  entries: Record<string, string>
) {
  return {
    make: async () => {
      try {
        for (const [filePath, content] of Object.entries(entries)) {
          await fs.mkdir(path.dirname(filePath), {
            recursive: true
          });
          await fs.writeFile(filePath, content);
        }
      } catch {}
    },
    unmake: async () => {
      await fs.rm(fsRootDir, { recursive: true });
    }
  };
}

function makeNpmManifest(dependencies: Record<string, any>) {
  return JSON.stringify(dependencies);
}

describe("When running Skott with a real file system", () => {
  test("Should collect workspace dependencies", async () => {
    const fsRootDir = `skott-real-fs`;

    const { make, unmake } = makeRealFileSystem(fsRootDir, {
      "skott-real-fs/app1/package.json": makeNpmManifest({
        name: "apponio1",
        dependencies: {
          rxjs: "^7.3.0"
        }
      }),
      "skott-real-fs/app2/package.json": makeNpmManifest({
        name: "apponio2"
      })
    });

    expect.assertions(1);

    try {
      await make();
      const skott = new Skott(
        { ...defaultConfig },
        new FileSystemReader({ cwd: fsRootDir }),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

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
    } finally {
      await unmake();
    }
  });
});
