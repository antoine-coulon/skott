import { R_OK } from "node:constants";
import fs from "node:fs/promises";

export interface FileReader {
  read: (filename: string) => Promise<string>;
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
}
