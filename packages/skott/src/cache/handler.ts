import crypto from "node:crypto";
import path from "node:path";

import { FileReader } from "../filesystem/file-reader";
import { FileWriter } from "../filesystem/file-writer.js";
import type { SkottConfig, SkottNode, SkottStructure } from "../skott";

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

export type SkottCache = {
  configurationHash: string;
  sourceFiles: Map<SkottNode["id"], SkottCachedNode>;
};

export const kSkottCacheFileName = "SKOTT_CACHE.json";

function readSkottCache<
  T extends Record<string, SkottCachedNode> & { configuration: string }
>(readFile: () => string): T {
  try {
    return JSON.parse(readFile());
  } catch {
    return {} as T;
  }
}

function makeEmptyCache(): SkottCache {
  return {
    configurationHash: "",
    sourceFiles: new Map()
  };
}

export class SkottCacheHandler {
  #cache = makeEmptyCache();
  #nextCache = makeEmptyCache();

  constructor(
    private readonly fileReader: FileReader,
    private readonly fileWriter: FileWriter,
    private readonly config: SkottConfig
  ) {
    if (!this.config.incremental) {
      return;
    }

    try {
      this.#cache = this.makeCache();
    } catch {}
  }

  private isConfigurationAffected(configurationHash: string): boolean {
    return createNodeHash(JSON.stringify(this.config)) !== configurationHash;
  }

  private makeCache(): SkottCache {
    const cache = readSkottCache(() =>
      // eslint-disable-next-line no-sync
      this.fileReader.readSync(
        path.join(this.fileReader.getCurrentWorkingDir(), kSkottCacheFileName)
      )
    );

    if (this.isConfigurationAffected(cache.configuration)) {
      return {
        configurationHash: cache.configuration,
        sourceFiles: new Map()
      };
    }

    return {
      configurationHash: cache.configuration,
      sourceFiles: new Map(Object.entries(cache.sourceFiles))
    };
  }

  get store(): SkottCache {
    // Return Immutable version of the cache
    return this.#cache;
  }

  public get(fileId: string): SkottCachedNode | undefined {
    return this.#cache.sourceFiles.get(fileId);
  }

  public addSourceFile(fileId: string, fileContent: string): void {
    const hashedContent = createNodeHash(fileContent);
    const currentlyCachedNode = this.#cache.sourceFiles.get(fileId);

    if (!currentlyCachedNode) {
      this.#nextCache.sourceFiles.set(fileId, {
        hash: hashedContent,
        value: makeInitialSkottNodeValue(fileId)
      });

      return;
    }

    this.#nextCache.sourceFiles.set(fileId, {
      hash: hashedContent,
      value: currentlyCachedNode.value
    });
  }

  public async save(
    latestComputedGraph: SkottStructure["graph"],
    config: SkottConfig
  ): Promise<void> {
    try {
      const graphWithLatestHashes: Record<SkottNode["id"], SkottCachedNode> =
        {};

      for (const [nodeId, nodeValue] of Object.entries(latestComputedGraph)) {
        const currentNode = this.#nextCache.sourceFiles.get(nodeId);

        if (currentNode) {
          graphWithLatestHashes[nodeId] = {
            hash: currentNode.hash,
            value: nodeValue
          };
        }
      }

      const configHash = createNodeHash(JSON.stringify(config));

      await this.fileWriter.write(
        path.join(this.fileReader.getCurrentWorkingDir(), kSkottCacheFileName),
        JSON.stringify({
          configuration: configHash,
          sourceFiles: graphWithLatestHashes
        })
      );

      this.#cache = {
        configurationHash: configHash,
        sourceFiles: new Map(Object.entries(graphWithLatestHashes))
      };
    } catch {}
  }
}
