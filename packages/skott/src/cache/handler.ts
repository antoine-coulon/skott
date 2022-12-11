import crypto from "node:crypto";
import path from "node:path";

import { FileReader } from "../filesystem/file-reader";
import { FileWriter } from "../filesystem/file-writer.js";
import type { SkottNode, SkottStructure } from "../skott";

export function createNodeHash(content: string): string {
  return crypto.createHash("sha1").update(content).digest("hex");
}

export function makeInitialSkottNodeValue(id: string): SkottNode {
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

export function isAffectedFile(
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
    private readonly fileWriter: FileWriter
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
        value: makeInitialSkottNodeValue(fileId)
      });

      return;
    }

    this.#nextCache.set(fileId, {
      hash: hashedContent,
      value: currentlyCachedNode.value
    });
  }

  public async save(
    latestComputedGraph: SkottStructure["graph"]
  ): Promise<void> {
    try {
      const graphWithLatestHashes: Record<SkottNode["id"], SkottCachedNode> =
        {};

      for (const [nodeId, nodeValue] of Object.entries(latestComputedGraph)) {
        const currentNode = this.#nextCache.get(nodeId);

        if (currentNode) {
          graphWithLatestHashes[nodeId] = {
            hash: currentNode.hash,
            value: nodeValue
          };
        }
      }

      await this.fileWriter.write(
        path.join(this.fileReader.getCurrentWorkingDir(), kSkottCacheFileName),
        JSON.stringify(graphWithLatestHashes)
      );

      this.#cache = new Map(Object.entries(graphWithLatestHashes));
    } catch {}
  }
}
