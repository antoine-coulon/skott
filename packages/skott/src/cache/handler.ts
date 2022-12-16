import path from "node:path";

import type { FileReader } from "../filesystem/file-reader.js";
import type { FileWriter } from "../filesystem/file-writer.js";
import type { SkottConfig, SkottNode, SkottStructure } from "../skott.js";

import { createNodeHash, isConfigurationAffected } from "./affected.js";

export function createInitialSkottNodeValue(id: string): SkottNode {
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

export interface SkottCachedNode {
  hash: string;
  value: SkottNode;
}

export type SkottCache = {
  configurationHash: string;
  sourceFiles: Map<SkottNode["id"], SkottCachedNode>;
};

export const kSkottCacheFileName = path.join(".skott", "cache.json");

function readSkottCache<
  T extends Record<string, SkottCachedNode> & { configuration: string }
>(readFile: () => string): T {
  try {
    return JSON.parse(readFile());
  } catch {
    return {} as T;
  }
}

function createEmptyCache(): SkottCache {
  return {
    configurationHash: "",
    sourceFiles: new Map()
  };
}

export class SkottCacheHandler {
  #cache = createEmptyCache();
  #nextCache = createEmptyCache();
  #currentConfigHash = "";

  constructor(
    private readonly fileReader: FileReader,
    private readonly fileWriter: FileWriter,
    private readonly config: SkottConfig
  ) {
    if (!this.config.incremental) {
      return;
    }

    try {
      this.#currentConfigHash = createNodeHash(JSON.stringify(this.config));
      this.#cache = this.createCache();
    } catch {}
  }

  get store(): SkottCache {
    return this.#cache;
  }

  private createCache(): SkottCache {
    const cache = readSkottCache(() =>
      // eslint-disable-next-line no-sync
      this.fileReader.readSync(
        path.join(this.fileReader.getCurrentWorkingDir(), kSkottCacheFileName)
      )
    );

    if (isConfigurationAffected(this.#currentConfigHash, cache.configuration)) {
      return {
        configurationHash: this.#currentConfigHash,
        sourceFiles: new Map()
      };
    }

    return {
      configurationHash: cache.configuration,
      sourceFiles: new Map(Object.entries(cache.sourceFiles))
    };
  }

  public get(fileId: string): SkottCachedNode | undefined {
    return this.#cache.sourceFiles.get(fileId);
  }

  public addSourceFile(fileId: string, fileContent: string): void {
    const hashedContent = createNodeHash(fileContent);
    const currentlyCachedNode = this.#cache.sourceFiles.get(fileId);
    const cacheNodeValue = currentlyCachedNode
      ? currentlyCachedNode.value
      : createInitialSkottNodeValue(fileId);

    this.#nextCache.sourceFiles.set(fileId, {
      hash: hashedContent,
      value: cacheNodeValue
    });
  }

  public async save(
    latestComputedGraph: SkottStructure["graph"]
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

      await this.fileWriter.write(
        path.join(this.fileReader.getCurrentWorkingDir(), kSkottCacheFileName),
        JSON.stringify({
          configuration: this.#currentConfigHash,
          sourceFiles: graphWithLatestHashes
        })
      );

      this.#cache = {
        configurationHash: this.#currentConfigHash,
        sourceFiles: new Map(Object.entries(graphWithLatestHashes))
      };
    } catch {}
  }
}
