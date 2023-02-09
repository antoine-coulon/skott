import { describe, expect, test } from "vitest";

import { InMemoryFileReader } from "../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../src/filesystem/file-writer.js";
import { ModuleWalkerSelector } from "../src/modules/walkers/common.js";
import { defaultConfig, Skott } from "../src/skott.js";

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
      new InMemoryFileReader({ cwd: "./apps" }),
      new InMemoryFileWriter(),
      new ModuleWalkerSelector()
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
        new InMemoryFileReader({ cwd }),
        new InMemoryFileWriter(),
        new ModuleWalkerSelector()
      );

      const { thirdParty } = await skott
        .initialize()
        .then(({ findUnusedDependencies }) =>
          findUnusedDependencies(inMemoryImplicitDependenciesFinder)
        );

      expect(thirdParty).toEqual(expectedUnused);
    }
  });
});
