import fs from "node:fs/promises";
import path from "node:path";

type AsyncCallback = () => Promise<void>;
type FsDelimiter = `` | `/` | `./`;

export const withRootDir = (rootDir: string) => (path: string) =>
  `${rootDir}/${path}`;

export function createRealFileSystem<
  RootDir extends string,
  File extends `${string}.${string}`
>(
  fsRootDir: RootDir,
  entries: Record<`${FsDelimiter}${RootDir}/${File}`, string>
) {
  async function make() {
    for (const [filePath, content] of Object.entries<string>(entries)) {
      try {
        await fs.mkdir(path.dirname(filePath), {
          recursive: true
        });
        await fs.writeFile(filePath, content);
      } catch {}
    }
  }

  async function unmake() {
    try {
      await fs.rm(fsRootDir, { recursive: true });
    } catch {}
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
