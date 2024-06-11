import fs from "node:fs/promises";
import path from "node:path";

export interface FileWriter {
  write(filePath: string, fileContent: string): Promise<void>;
}

export class FileSystemWriter implements FileWriter {
  async write(filePath: string, fileContent: string): Promise<void> {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, fileContent);
  }
}
