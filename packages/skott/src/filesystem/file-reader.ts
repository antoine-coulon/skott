import { R_OK } from "node:constants";
import fsSync from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

import { Context } from "effect";
import ignoreWalk from "ignore-walk";
import { type MinimatchOptions, minimatch } from "minimatch";

import {
  isDirSupportedByDefault,
  isFileSupportedByDefault,
  isManifestFile
} from "../modules/resolvers/base-resolver.js";

import { toUnixPathLike } from "./path.js";

export interface FileReader {
  read: (filename: string) => Promise<string>;
  exists: (filename: string) => Promise<boolean>;
  readSync: (filename: string) => string;
  readdir: (root: string, extensions: string[]) => AsyncGenerator<string>;
  stats: (filename: string) => Promise<number>;
  getCurrentWorkingDir: () => string;
}

// eslint-disable-next-line no-redeclare
export const FileReader = Context.GenericTag<FileReader>("FileReader");

export interface FileSystemConfig {
  cwd: string;
  ignorePatterns: string[];
}

const minimatchDefaultOptions: MinimatchOptions = {
  dot: true
};

function matchWith(filename: string, options = minimatchDefaultOptions) {
  return (pattern: string) => minimatch(filename, pattern, options);
}

/**
 * minimatch only supports forward slashes as described there
 * https://github.com/isaacs/minimatch. Consequently, we must map all Windows paths
 * to Unix-like paths for the glob comparison to be effective.
 */
function toForwardSlashesOnly(filename: string) {
  return toUnixPathLike(filename);
}

export class FileSystemReader implements FileReader {
  constructor(private readonly config: FileSystemConfig) {}

  private isFileIgnored(filename: string): boolean {
    if (this.config.ignorePatterns.length === 0) {
      return false;
    }

    const match = matchWith(filename);

    return this.config.ignorePatterns.some(
      (pattern) =>
        match(
          toForwardSlashesOnly(path.join(this.config.cwd, path.sep, pattern))
        ) || match(pattern)
    );
  }

  read(filename: string): Promise<string> {
    if (this.isFileIgnored(filename)) {
      return Promise.reject(
        `File ${filename} is ignored due to one of these ignore patterns ${this.config.ignorePatterns.join(
          " - "
        )}`
      );
    }

    return fs.readFile(filename, { encoding: "utf-8", flag: R_OK });
  }

  exists(filename: string) {
    return fs
      .access(filename, R_OK)
      .then(() => true)
      .catch(() => false);
  }

  readSync(filename: string): string {
    // eslint-disable-next-line no-sync
    return fsSync.readFileSync(filename, { encoding: "utf-8" });
  }

  stats(filename: string): Promise<number> {
    return fs
      .stat(filename, { bigint: false })
      .then((stats) => stats.size)
      .catch(() => 0);
  }

  getCurrentWorkingDir(): string {
    return this.config.cwd;
  }

  async *readdir(
    root: string,
    providedFileExtensions: string[]
  ): AsyncGenerator<string> {
    const filePaths = await ignoreWalk({
      path: root,
      ignoreFiles: [".gitignore"]
    });

    const filePathsWithRoot = filePaths.map((fp) => path.join(root, fp));

    for (const filePath of filePathsWithRoot) {
      const isFileMatchingExtensions = providedFileExtensions.includes(
        path.extname(filePath)
      );
      const isSupportedFile =
        isDirSupportedByDefault(path.dirname(filePath)) &&
        isFileSupportedByDefault(filePath) &&
        isFileMatchingExtensions;

      if (isSupportedFile || isManifestFile(filePath)) {
        if (!this.isFileIgnored(filePath)) {
          yield filePath;
        }
      }
    }
  }
}
