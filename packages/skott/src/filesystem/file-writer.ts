import fs from "node:fs/promises";

import memfs from "memfs";

export interface FileWriter {
  write(filePath: string, fileContent: string): Promise<void>;
}

export class InMemoryFileSystemWriter implements FileWriter {
  async write(filePath: string, fileContent: string): Promise<void> {
    return new Promise((resolve) => {
      memfs.fs.writeFile(filePath, fileContent, () => {
        resolve();
      });
    });
  }
}

export class FileSystemWriter implements FileWriter {
  async write(filePath: string, fileContent: string): Promise<void> {
    await fs.writeFile(filePath, fileContent);
  }
}
