import fs from "node:fs/promises";
import path from "node:path";

type AsyncCallback = () => Promise<void>;

export function createRealFileSystem<
  RootDir extends string,
  File extends `${string}.${string}`
>(fsRootDir: RootDir, entries: Record<`${RootDir}/${File}`, string>) {
  async function make() {
    try {
      for (const [filePath, content] of Object.entries<string>(entries)) {
        await fs.mkdir(path.dirname(filePath), {
          recursive: true
        });
        await fs.writeFile(filePath, content);
      }
    } catch {}
  }

  async function unmake() {
    await fs.rm(fsRootDir, { recursive: true });
  }

  return async (cb: AsyncCallback) => {
    try {
      await make();
      await cb();
    } finally {
      await unmake();
    }
  };
}

export function createNpmManifest(dependencies: Record<string, any>) {
  return JSON.stringify(dependencies);
}
