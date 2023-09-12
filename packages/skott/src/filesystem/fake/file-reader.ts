import path from "node:path";

import * as memfs from "memfs";
import { type MinimatchOptions, minimatch } from "minimatch";

import {
  isDirSupportedByDefault,
  isFileSupportedByDefault,
  isManifestFile
} from "../../modules/resolvers/base-resolver.js";
import { FileReader } from "../file-reader.js";

interface FileSystemConfig {
  cwd: string;
  ignorePattern: string;
}

const minimatchDefaultOptions: MinimatchOptions = {
  dot: true
};

/* eslint-disable no-sync */
export class InMemoryFileReader implements FileReader {
  constructor(
    private readonly config: FileSystemConfig = { cwd: "./", ignorePattern: "" }
  ) {}

  private isFileIgnored(filename: string): boolean {
    return minimatch(
      filename,
      this.config.ignorePattern,
      minimatchDefaultOptions
    );
  }

  read(filename: string): Promise<string> {
    if (this.isFileIgnored(filename)) {
      return Promise.reject("_discard_");
    }

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
        isManifestFile(_dirent) ||
        (isFileSupportedByDefault(_dirent) &&
          fileExtensions.includes(path.extname(_dirent)) &&
          !this.isFileIgnored(path.join(root, _dirent)))
      ) {
        yield path.join(root, _dirent);
      }
    }
  }

  exists(_filename: string) {
    return Promise.resolve(true);
  }

  stats(_filename: string): Promise<number> {
    return new Promise((resolve) => resolve(0));
  }

  getCurrentWorkingDir(): string {
    return this.config.cwd;
  }
}
