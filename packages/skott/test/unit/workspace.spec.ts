import { describe, expect, test } from "vitest";

import { InMemoryFileReader } from "../../src/filesystem/fake/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/fake/file-writer.js";
import { FakeLogger } from "../../src/logger.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { Skott, defaultConfig } from "../../src/skott.js";

import { mountFakeFileSystem } from "./shared.js";

describe("When building the workspace dependency tree using manifest files", () => {
  describe("When the project manifest cant be parsed", () => {
    test("Should skip the project", async () => {
      mountFakeFileSystem({
        "./apps/app1/package.json": `// invalid json`
      });

      const skott = new Skott(
        { ...defaultConfig },
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      const { getWorkspace } = await skott.initialize();

      expect(getWorkspace()).toEqual({});
    });
  });

  describe("When the project manifest does not have a 'name' field", () => {
    test("Should collect only dependencies from the projects that have a name", async () => {
      mountFakeFileSystem({
        "./apps/app1/package.json": JSON.stringify({
          dependencies: {
            "@effect-ts/core": "0.1.0"
          }
        }),
        "./libs/package.json": JSON.stringify({
          name: "lib1",
          dependencies: {
            "@effect/io": "0.26.0"
          }
        })
      });

      const skott = new Skott(
        { ...defaultConfig },
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      const { getWorkspace } = await skott.initialize();

      expect(getWorkspace()).toEqual({
        lib1: {
          dependencies: {
            "@effect/io": "0.26.0"
          },
          devDependencies: {},
          peerDependencies: {}
        }
      });
    });
  });

  describe("When the project manifest does not have any dependencies listed", () => {
    test("Should create a project reference with empty dependencies", async () => {
      mountFakeFileSystem({
        "./apps/app1/package.json": JSON.stringify({
          name: "app1"
        })
      });

      const skott = new Skott(
        { ...defaultConfig },
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      const { getWorkspace } = await skott.initialize();

      expect(getWorkspace()).toEqual({
        app1: {
          dependencies: {},
          devDependencies: {},
          peerDependencies: {}
        }
      });
    });
  });

  test("Should collect all available dependencies by project name", async () => {
    mountFakeFileSystem({
      "./apps/app1/package.json": JSON.stringify({
        name: "app1",
        dependencies: {
          "@effect-ts/core": "0.1.0"
        },
        devDependencies: {
          typescript: "4.3.5"
        }
      }),
      "./libs/lib1/package.json": JSON.stringify({
        name: "lib1",
        dependencies: {
          "@effect/io": "0.26.0"
        }
      }),
      "./libs/lib2/package.json": JSON.stringify({
        name: "lib2",
        peerDependencies: {
          "@effect/data": "0.10.0"
        }
      })
    });

    const skott = new Skott(
      { ...defaultConfig },
      new InMemoryFileReader(),
      new InMemoryFileWriter(),
      new ModuleWalkerSelector(),
      new FakeLogger()
    );

    const { getWorkspace } = await skott.initialize();

    expect(getWorkspace()).toEqual({
      app1: {
        dependencies: {
          "@effect-ts/core": "0.1.0"
        },
        devDependencies: {
          typescript: "4.3.5"
        },
        peerDependencies: {}
      },
      lib1: {
        dependencies: {
          "@effect/io": "0.26.0"
        },
        devDependencies: {},
        peerDependencies: {}
      },
      lib2: {
        dependencies: {},
        devDependencies: {},
        peerDependencies: {
          "@effect/data": "0.10.0"
        }
      }
    });
  });
});
