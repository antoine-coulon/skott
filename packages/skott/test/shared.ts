import * as memfs from "memfs";

import { InMemoryFileReader } from "../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../src/filesystem/file-writer.js";
import { kExpectedModuleExtensions } from "../src/modules/resolvers/ecmascript/helpers.js";
import { WalkerSelector } from "../src/modules/walkers/common.js";
import { Skott, SkottNode } from "../src/skott";

type UnwrappedSkottStructure = {
  graph: Record<string, SkottNode>;
  files: string[];
  circularDependencies: string[][];
  hasCircularDependencies: boolean;
  leaves: string[];
};

export async function buildSkottProjectUsingInMemoryFileExplorer({
  entrypoint,
  includeBaseDir = false,
  trackThirdParty = false,
  trackTypeOnly = true,
  fileExtensions = [...kExpectedModuleExtensions],
  tsConfigPath = "./tsconfig.json",
  manifestPath = "./package.json"
}: {
  entrypoint?: string;
  includeBaseDir?: boolean;
  trackThirdParty?: boolean;
  trackTypeOnly?: boolean;
  fileExtensions?: string[];
  tsConfigPath?: string;
  manifestPath?: string;
} = {}): Promise<UnwrappedSkottStructure> {
  const skott = new Skott(
    {
      entrypoint,
      circularMaxDepth: Number.POSITIVE_INFINITY,
      includeBaseDir,
      dependencyTracking: {
        thirdParty: trackThirdParty,
        builtin: false,
        typeOnly: trackTypeOnly
      },
      fileExtensions,
      tsConfigPath,
      manifestPath
    },
    new InMemoryFileReader(),
    new InMemoryFileWriter(),
    new WalkerSelector()
  );
  const skottInstance = await skott.initialize();
  const structure = skottInstance.getStructure();

  return {
    graph: structure.graph,
    files: structure.files,
    circularDependencies: skottInstance.findCircularDependencies(),
    hasCircularDependencies: skottInstance.hasCircularDependencies(),
    leaves: skottInstance.findLeaves()
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
