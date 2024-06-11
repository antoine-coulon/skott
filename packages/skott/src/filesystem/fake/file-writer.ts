import path from "node:path";

import type { FileWriter } from "../file-writer.js";

export class InMemoryFileWriter implements FileWriter {
  async write(filePath: string, fileContent: string): Promise<void> {
    const memfs = await import("memfs");
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
