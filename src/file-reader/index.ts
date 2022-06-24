import fs from "fs/promises";

export interface FileReader {
  read: (filename: string) => Promise<string>;
}

export class FileSystemReader implements FileReader {
  read(filename: string): Promise<string> {
    return fs.readFile(filename, "utf-8");
  }
}
