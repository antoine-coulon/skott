import memfs from "memfs";

export interface FileSystemWriter {
  write(filePath: string, fileContent: string): Promise<void>;
}

export class InMemoryFileSystemWriter implements FileSystemWriter {
  async write(filePath: string, fileContent: string): Promise<void> {
    return new Promise((resolve) => {
      memfs.fs.writeFile(filePath, fileContent, () => {
        resolve();
      });
    });
  }
}
