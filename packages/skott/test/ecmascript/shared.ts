import path from "node:path";

import * as memfs from "memfs";

import { FileReader } from "../../src/filesystem/file-reader.js";
import { InMemoryFileWriter } from "../../src/filesystem/file-writer.js";
import {
  isDirSupportedByDefault,
  isFileSupportedByDefault,
  kExpectedModuleExtensions
} from "../../src/modules/resolvers/ecmascript/resolver.js";
import { WalkerSelector } from "../../src/modules/walkers/common.js";
import { Skott, SkottNode } from "../../src/skott";

/* eslint-disable no-sync */
export class InMemoryFileReader implements FileReader {
  read(filename: string): Promise<string> {
    return new Promise((resolve) => {
      resolve(memfs.fs.readFileSync(filename, "utf-8") as string);
    });
  }

  readSync(filename: string): string {
    return memfs.fs.readFileSync(filename, { encoding: "utf-8" }) as string;
  }

  async *readdir(
    root: string,
    fileExtensions: string[]
  ): AsyncGenerator<string> {
    for (const dirent of memfs.fs.readdirSync(root)) {
      const _dirent = dirent as string;
      if (memfs.fs.lstatSync(path.join(root, _dirent)).isDirectory()) {
        if (isDirSupportedByDefault(path.join(root, _dirent))) {
          yield* this.readdir(path.join(root, _dirent), fileExtensions);
        }
      } else if (
        isFileSupportedByDefault(_dirent) &&
        fileExtensions.includes(path.extname(_dirent))
      ) {
        yield path.join(root, _dirent);
      }
    }
  }

  stats(_filename: string): Promise<number> {
    return new Promise((resolve) => resolve(0));
  }

  getCurrentWorkingDir(): string {
    return "./";
  }
}

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
