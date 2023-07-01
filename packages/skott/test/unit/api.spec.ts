import { describe, expect, test } from "vitest";

import {
  fakeNodeBody,
  inMemoryImplicitDependenciesFinder,
  mountFakeFileSystem
} from "./shared.js";

import { InMemoryFileReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import { FakeLogger } from "../../src/logger.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { defaultConfig, Skott } from "../../src/skott.js";

describe("Skott API", () => {
  describe("When using graph API", () => {
    function makeFs() {
      mountFakeFileSystem({
        "a.ts": `
            import { featureB } from "./b";
        `,
        "b.ts": `
            import { featureD } from "./d";
            import { featureC } from "./c";
        `,
        "c.ts": `
            export function featureC() {}
        `,
        "d.ts": `
            import { featureE } from "./e";
            export function featureD() {}
        `,
        "e.ts": `
            export function featureE() {}
        `
      });
    }

    test("Should traverse the whole graph (BFS) when no starting node is provided", async () => {
      makeFs();

      const skott = new Skott(
        defaultConfig,
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      const { traverseFiles } = await skott
        .initialize()
        .then(({ useGraph }) => useGraph());

      const traversedNodes = [
        ...traverseFiles({ moduleImportsCollection: "neighborFirst" })
      ];

      expect(traversedNodes.map((n) => n.id)).toEqual([
        "a.ts",
        "b.ts",
        "d.ts",
        "c.ts",
        "e.ts"
      ]);
    });

    test("Should traverse the whole graph (BFS) starting from root node", async () => {
      makeFs();

      const skott = new Skott(
        defaultConfig,
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      const { traverseFiles } = await skott
        .initialize()
        .then(({ useGraph }) => useGraph());

      const traversedNodes = [
        ...traverseFiles({
          rootFile: "a.ts",
          moduleImportsCollection: "neighborFirst"
        })
      ];

      expect(traversedNodes.map((n) => n.id)).toEqual([
        "a.ts",
        "b.ts",
        "d.ts",
        "c.ts",
        "e.ts"
      ]);
    });

    test("Should traverse the whole graph (DFS) when no root node is provided", async () => {
      makeFs();

      const skott = new Skott(
        defaultConfig,
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      const { traverseFiles } = await skott
        .initialize()
        .then(({ useGraph }) => useGraph());

      const traversedNodes = [
        ...traverseFiles({ moduleImportsCollection: "deepFirst" })
      ];

      expect(traversedNodes.map((n) => n.id)).toEqual([
        "a.ts",
        "b.ts",
        "d.ts",
        "e.ts",
        "c.ts"
      ]);
    });

    test("Should traverse the whole graph (DFS) starting from root node", async () => {
      makeFs();

      const skott = new Skott(
        defaultConfig,
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );

      const { traverseFiles } = await skott
        .initialize()
        .then(({ useGraph }) => useGraph());

      const traversedNodes = [
        ...traverseFiles({
          rootFile: "a.ts",
          moduleImportsCollection: "deepFirst"
        })
      ];

      expect(traversedNodes.map((n) => n.id)).toEqual([
        "a.ts",
        "b.ts",
        "d.ts",
        "e.ts",
        "c.ts"
      ]);
    });
  });
});
