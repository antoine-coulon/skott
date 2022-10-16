import * as memfs from "memfs";

import { FileReader } from "../../src/filesystem/file-reader.js";
import { Skott, SkottNode } from "../../src/skott";

export class InMemoryFileReader implements FileReader {
  read(filename: string): Promise<string> {
    return new Promise((resolve) => {
      /* eslint-disable no-sync */
      resolve(memfs.fs.readFileSync(filename, "utf-8") as string);
    });
  }
  stats(_filename: string): Promise<number> {
    return new Promise((resolve) => resolve(0));
  }
}

type UnwrappedSkottStructure = {
  graph: Record<string, SkottNode>;
  files: string[];
  circularDependencies: string[][];
  hasCircularDependencies: boolean;
  leaves: string[];
};

export async function buildSkottProjectUsingInMemoryFileExplorer(
  entrypoint: string,
  includeBaseDir = false
): Promise<UnwrappedSkottStructure> {
  const skott = new Skott(
    {
      entrypoint,
      circularMaxDepth: Number.POSITIVE_INFINITY,
      includeBaseDir,
      dependencyTracking: {
        thirdParty: false,
        builtin: false
      }
    },
    new InMemoryFileReader()
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
