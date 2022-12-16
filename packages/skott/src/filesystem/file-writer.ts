import fs from "node:fs/promises";
import path from "node:path";

import memfs from "memfs";

export interface FileWriter {
  write(filePath: string, fileContent: string): Promise<void>;
}

export class InMemoryFileWriter implements FileWriter {
  async write(filePath: string, fileContent: string): Promise<void> {
    const baseDir = path.dirname(filePath);

    await new Promise<void>((resolve) => {
      memfs.fs.mkdir(baseDir, { recursive: true }, () => {
        resolve();
      });
    });

    await new Promise<void>((resolve) => {
      memfs.fs.writeFile(filePath, fileContent, () => {
        resolve();
      });
    });
  }
}

export class FileSystemWriter implements FileWriter {
  async write(filePath: string, fileContent: string): Promise<void> {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, fileContent);
  }
}
