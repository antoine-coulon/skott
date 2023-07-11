import { R_OK } from "node:constants";
import fsSync from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

import * as Context from "@effect/data/Context";
import ignoreWalk from "ignore-walk";
import { type MinimatchOptions, minimatch } from "minimatch";

import {
  isDirSupportedByDefault,
  isFileSupportedByDefault,
  isManifestFile
} from "../modules/resolvers/base-resolver.js";

export interface FileReader {
  read: (filename: string) => Promise<string>;
  readSync: (filename: string) => string;
  readdir: (root: string, extensions: string[]) => AsyncGenerator<string>;
  stats: (filename: string) => Promise<number>;
  getCurrentWorkingDir: () => string;
}

export const FileReaderTag = Context.Tag<FileReader>();

interface FileSystemConfig {
  cwd: string;
  ignorePattern: string;
}

const minimatchDefaultOptions: MinimatchOptions = {
  dot: true
};

function matchWith(filename: string, options = minimatchDefaultOptions) {
  return (pattern: string) => minimatch(filename, pattern, options);
}

export class FileSystemReader implements FileReader {
  constructor(private readonly config: FileSystemConfig) {}

  private isFileIgnored(filename: string): boolean {
    if (this.config.ignorePattern === "") {
      return false;
    }

    const match = matchWith(filename);

    return (
      match(path.join(this.config.cwd, path.sep, this.config.ignorePattern)) ||
      match(this.config.ignorePattern)
    );
  }

  read(filename: string): Promise<string> {
    if (this.isFileIgnored(filename)) {
      return Promise.reject(
        `File ${filename} is ignored due to the ignore pattern ${this.config.ignorePattern}`
      );
    }
    return fs.readFile(filename, { encoding: "utf-8", flag: R_OK });
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
