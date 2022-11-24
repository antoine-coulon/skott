import { R_OK } from "node:constants";
import fs from "node:fs/promises";
import path from "node:path";

import {
  isDirSupportedByDefault,
  isFileSupportedByDefault
} from "../modules/walkers/ecmascript/module-resolver.js";

export interface FileReader {
  read: (filename: string) => Promise<string>;
  readdir: (root: string, extensions: string[]) => AsyncGenerator<string>;
  stats: (filename: string) => Promise<number>;
  getCurrentWorkingDir: () => string;
}

export class FileSystemReader implements FileReader {
  read(filename: string): Promise<string> {
    return fs.readFile(filename, { encoding: "utf-8", flag: R_OK });
  }

  stats(filename: string): Promise<number> {
    return fs
      .stat(filename, { bigint: false })
      .then((stats) => stats.size)
      .catch(() => 0);
  }

  getCurrentWorkingDir(): string {
    return process.cwd();
  }

  async *readdir(
    root: string,
    fileExtensions: string[]
  ): AsyncGenerator<string> {
    const rootDir = await fs.opendir(root);

    for await (const dirent of rootDir) {
      if (dirent.isDirectory() && isDirSupportedByDefault(dirent.name)) {
        yield* this.readdir(path.join(root, dirent.name), fileExtensions);
      } else if (fileExtensions.includes(path.extname(dirent.name))) {
        yield path.join(root, dirent.name);
      }
    }
  }
}
