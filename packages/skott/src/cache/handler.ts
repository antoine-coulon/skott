import crypto from "node:crypto";
import path from "node:path";

import { FileReader } from "../filesystem/file-reader";
import { InMemoryFileSystemWriter } from "../filesystem/file-writer.js";
import type { SkottNode, SkottStructure } from "../skott";

export function createNodeHash(content: string): string {
  return crypto.createHash("sha1").update(content).digest("hex");
}

export function makeEmptySkottCachedNodeValue(id: string): SkottNode {
  return {
    id,
    adjacentTo: [],
    body: {
      size: 0,
      builtinDependencies: [],
      thirdPartyDependencies: []
    }
  };
}

export function isFileAffected(
  fileContent: string,
  hashInCache: string
): boolean {
  return createNodeHash(fileContent) !== hashInCache;
}

export interface SkottCachedNode {
  hash: string;
  value: SkottNode;
}

export type SkottCache = Map<SkottNode["id"], SkottCachedNode>;

const kSkottCacheFileName = "SKOTT_CACHE.json";

function readSkottCache<T extends Record<string, SkottCachedNode>>(
  readFile: () => string
): T {
  try {
    return JSON.parse(readFile());
  } catch {
    return {} as T;
  }
}

export class SkottCacheHandler {
  #cache = new Map<SkottNode["id"], SkottCachedNode>();
  #nextCache = new Map<SkottNode["id"], SkottCachedNode>();

  constructor(
    private readonly fileReader: FileReader,
    private readonly fileWriter = new InMemoryFileSystemWriter()
  ) {
    try {
      this.#cache = this.makeCache();
    } catch {}
  }

  private makeCache(): SkottCache {
    return new Map(
      Object.entries(
        readSkottCache(() =>
          // eslint-disable-next-line no-sync
          this.fileReader.readSync(
            path.join(
              this.fileReader.getCurrentWorkingDir(),
              kSkottCacheFileName
            )
          )
        )
      )
    );
  }

  get store(): Map<SkottNode["id"], SkottCachedNode> {
    return this.#cache;
  }

  public get(fileId: string): SkottCachedNode | undefined {
    return this.#cache.get(fileId);
  }

  public addSourceFile(fileId: string, fileContent: string): void {
    const hashedContent = createNodeHash(fileContent);
    const currentlyCachedNode = this.#cache.get(fileId);

    if (!currentlyCachedNode) {
      this.#nextCache.set(fileId, {
        hash: hashedContent,
        value: makeEmptySkottCachedNodeValue(fileId)
      });

      return;
    }

    this.#nextCache.set(fileId, {
      hash: hashedContent,
      value: currentlyCachedNode.value
    });
  }

  public async save(skottGraph: SkottStructure["graph"]): Promise<void> {
    try {
      const graphWithHashes: Record<SkottNode["id"], SkottCachedNode> = {};

      for (const [key, value] of Object.entries(skottGraph)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { hash } = this.#nextCache.get(key)!;

        graphWithHashes[key] = {
          hash,
          value
        };
      }

      await this.fileWriter.write(
        path.join(this.fileReader.getCurrentWorkingDir(), kSkottCacheFileName),
        JSON.stringify(graphWithHashes)
      );

      this.#cache = new Map(Object.entries(graphWithHashes));
    } catch {}
  }
}
