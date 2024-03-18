import { describe, expect, test } from "vitest";

import { InMemoryFileReader } from "../../src/filesystem/fake/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/fake/file-writer.js";
import { CollectLevel } from "../../src/graph/traversal.js";
import { FakeLogger } from "../../src/logger.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { defaultConfig, Skott } from "../../src/skott.js";

import { mountFakeFileSystem } from "./shared.js";

describe("Skott API", () => {
  describe("When using graph API", () => {
    function makeSkott() {
      return new Skott(
        defaultConfig,
        new InMemoryFileReader(),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector(),
        new FakeLogger()
      );
    }

    function mountFakeFs() {
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
      mountFakeFs();

      const skott = makeSkott();

      const { traverseFiles } = await skott
        .initialize()
        .then(({ useGraph }) => useGraph());

      const traversedNodes = [
        ...traverseFiles({ moduleImportsCollection: "shallowFirst" })
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
      mountFakeFs();

      const skott = makeSkott();

      const { traverseFiles } = await skott
        .initialize()
        .then(({ useGraph }) => useGraph());

      const traversedNodes = [
        ...traverseFiles({
          rootFile: "a.ts",
          moduleImportsCollection: "shallowFirst"
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
      mountFakeFs();

      const skott = makeSkott();

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
      mountFakeFs();

      const skott = makeSkott();

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

    describe("When shallow collecting file dependencies", () => {
      test("Should collect direct imported files starting from a root file", async () => {
        mountFakeFileSystem({
          "a.ts": `
            import { featureB } from "./b";
          `,
          "b.ts": `
            import { featureC } from "./c";
          `,
          "c.ts": `
            export function featureC() {}
          `
        });

        const skott = makeSkott();

        const { collectFilesDependencies } = await skott
          .initialize()
          .then(({ useGraph }) => useGraph());

        const dependsOn = [
          ...collectFilesDependencies("a.ts", CollectLevel.Shallow)
        ];
        expect(dependsOn.map((n) => n.id)).toEqual(["b.ts"]);
      });

      test("Should collect files directly importing a root file", async () => {
        mountFakeFileSystem({
          "a.ts": `
            import { featureB } from "./b";
          `,
          "b.ts": `
            import { featureC } from "./c";
          `,
          "c.ts": `
            export function featureC() {}
          `
        });

        const skott = makeSkott();

        const { collectFilesDependingOn } = await skott
          .initialize()
          .then(({ useGraph }) => useGraph());

        const dependingOnC = [
          ...collectFilesDependingOn("c.ts", CollectLevel.Shallow)
        ];
        expect(dependingOnC.map((n) => n.id)).toEqual(["b.ts"]);

        const dependingOnA = [
          ...collectFilesDependingOn("a.ts", CollectLevel.Shallow)
        ];
        expect(dependingOnA).toEqual([]);
      });
    });

    describe("When deeply collecting file dependencies", () => {
      test("Should collect all imported files starting from a root file", async () => {
        mountFakeFileSystem({
          "a.ts": `
            import { featureB } from "./b";
            import { featureB } from "./c";
          `,
          "b.ts": `
            import { featureC } from "./c";
          `,
          "c.ts": `
            export function featureC() {}
          `
        });

        const skott = makeSkott();

        const { collectFilesDependencies } = await skott
          .initialize()
          .then(({ useGraph }) => useGraph());

        const dependsOn = [
          ...collectFilesDependencies("a.ts", CollectLevel.Deep)
        ];
        expect(dependsOn.map((n) => n.id)).toEqual(["b.ts", "c.ts"]);

        const dependsOnC = [
          ...collectFilesDependencies("c.ts", CollectLevel.Deep)
        ];
        expect(dependsOnC).toEqual([]);
      });

      test("Should collect all files directly or indirectly importing a root file", async () => {
        mountFakeFileSystem({
          "a.ts": `
            import { featureB } from "./b";
            import { featureB } from "./c";
          `,
          "b.ts": `
            import { featureC } from "./c";
          `,
          "c.ts": `
            export function featureC() {}
          `
        });

        const skott = makeSkott();

        const { collectFilesDependingOn } = await skott
          .initialize()
          .then(({ useGraph }) => useGraph());

        const dependingOnC = [
          ...collectFilesDependingOn("c.ts", CollectLevel.Deep)
        ];
        expect(dependingOnC.map((n) => n.id)).toEqual(["a.ts", "b.ts"]);

        const dependingOnA = [
          ...collectFilesDependingOn("a.ts", CollectLevel.Deep)
        ];
        expect(dependingOnA).toEqual([]);
      });
    });
  });
});
