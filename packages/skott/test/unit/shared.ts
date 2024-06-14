import * as memfs from "memfs";

import { InMemoryFileReader } from "../../src/filesystem/fake/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/fake/file-writer.js";
import type { SkottNode } from "../../src/graph/node.js";
import { FakeLogger } from "../../src/logger.js";
import { kExpectedModuleExtensions } from "../../src/modules/resolvers/base-resolver.js";
import { EcmaScriptDependencyResolver } from "../../src/modules/resolvers/ecmascript/resolver.js";
import { ModuleWalkerSelector } from "../../src/modules/walkers/common.js";
import { Skott } from "../../src/skott.js";

interface UnwrappedSkottStructure {
  graph: Record<string, SkottNode>;
  files: string[];
  circularDependencies: string[][];
  hasCircularDependencies: boolean;
  leaves: string[];
}

export async function buildSkottProjectUsingInMemoryFileExplorer({
  entrypoint,
  includeBaseDir = false,
  trackThirdParty = false,
  trackTypeOnly = true,
  fileExtensions = [...kExpectedModuleExtensions],
  tsConfigPath = "./tsconfig.json",
  manifestPath = "./package.json",
  cwd = "./"
}: {
  entrypoint?: string;
  includeBaseDir?: boolean;
  trackThirdParty?: boolean;
  trackTypeOnly?: boolean;
  fileExtensions?: string[];
  tsConfigPath?: string;
  manifestPath?: string;
  cwd?: string;
} = {}): Promise<UnwrappedSkottStructure> {
  const skott = new Skott(
    {
      entrypoint,
      incremental: false,
      circularMaxDepth: Number.POSITIVE_INFINITY,
      includeBaseDir,
      dependencyTracking: {
        thirdParty: trackThirdParty,
        builtin: false,
        typeOnly: trackTypeOnly
      },
      fileExtensions,
      tsConfigPath,
      manifestPath,
      dependencyResolvers: [new EcmaScriptDependencyResolver()]
    },
    new InMemoryFileReader({ cwd, ignorePatterns: [] }),
    new InMemoryFileWriter(),
    new ModuleWalkerSelector(),
    new FakeLogger()
  );
  const skottInstance = await skott.initialize();
  const graph = skottInstance.useGraph();
  const structure = skottInstance.getStructure();

  return {
    graph: structure.graph,
    files: structure.files,
    circularDependencies: graph.findCircularDependencies(),
    hasCircularDependencies: graph.hasCircularDependencies(),
    leaves: graph.findLeaves()
  };
}

export const fakeNodeBody = {
  size: 0,
  thirdPartyDependencies: [],
  builtinDependencies: []
};

export function mountFakeFileSystem(
  fs: Record<string, string>,
  mountingPoint = "./"
): void {
  // As Volumes are shared, we need to clear the volume before mounting another one
  // specifically for a test
  memfs.vol.reset();
  memfs.vol.fromJSON(fs, mountingPoint);
}

export const inMemoryImplicitDependenciesFinder = {
  implicitDependencies: {
    findUnused: () => Promise.resolve([])
  }
};
