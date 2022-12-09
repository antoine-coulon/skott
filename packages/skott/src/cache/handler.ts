import crypto from "node:crypto";
import path from "node:path";

import { FileReader } from "../filesystem/file-reader";
import { InMemoryFileSystemWriter } from "../filesystem/file-writer.js";
import type { SkottNode } from "../skott";

export function createNodeHash(content: string): string {
  return crypto.createHash("sha1").update(content).digest("hex");
}

export interface SkottCachedNode {
  hash: string;
  value: SkottNode;
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

export type SkottCache = Map<SkottNode["id"], SkottCachedNode>;

const kSkottCacheFileName = "SKOTT_CACHE.json";

export class SkottCacheHandler {
  #cache = new Map<SkottNode["id"], SkottCachedNode>();
  #nextCache = new Map<SkottNode["id"], SkottCachedNode>();

  constructor(
    private readonly fileReader: FileReader,
    private readonly fileWriter = new InMemoryFileSystemWriter()
  ) {
    try {
      this.#cache = new Map(
        Object.entries(
          JSON.parse(
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
    } catch {}
  }

  get store(): Map<SkottNode["id"], SkottCachedNode> {
    return this.#cache;
  }

  public has(fileId: string): boolean {
    return this.#cache.has(fileId);
  }

  public get(fileId: string): SkottCachedNode | undefined {
    return this.#cache.get(fileId);
  }

  public addSourceFile(fileId: string, fileContent: string): void {
    const hashedContent = createNodeHash(fileContent);

    this.#nextCache.set(fileId, {
      hash: hashedContent,
      value: makeEmptySkottCachedNodeValue(fileId)
    });
  }

  public async save(): Promise<void> {
    try {
      await this.fileWriter.write(
        path.join(this.fileReader.getCurrentWorkingDir(), kSkottCacheFileName),
        JSON.stringify(Object.fromEntries(this.#nextCache.entries()))
      );

      this.#cache = this.#nextCache;
    } catch {}
  }
}
