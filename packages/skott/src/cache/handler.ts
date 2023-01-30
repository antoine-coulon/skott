import path from "node:path";

import type { FileReader } from "../filesystem/file-reader.js";
import type { FileWriter } from "../filesystem/file-writer.js";
import type { SkottConfig, SkottNode, SkottStructure } from "../skott.js";

import { createNodeHash, isConfigurationAffected } from "./affected.js";

export function createInitialSkottNodeValue<T>(id: string): SkottNode<T> {
  return {
    id,
    adjacentTo: [],
    // @ts-ignore
    body: {
      size: 0,
      builtinDependencies: [],
      thirdPartyDependencies: []
    }
  };
}

export interface SkottCachedNode<T> {
  hash: string;
  value: SkottNode<T>;
}

export type SkottCache<T> = {
  configurationHash: string;
  sourceFiles: Map<SkottNode<T>["id"], SkottCachedNode<T>>;
};

export const kSkottCacheFileName = path.join(".skott", "cache.json");

function readSkottCache<
  T extends Record<string, SkottCachedNode<T>> & { configuration: string }
>(readFile: () => string): T {
  try {
    return JSON.parse(readFile());
  } catch {
    return {} as T;
  }
}

function createEmptyCache<T>(): SkottCache<T> {
  return {
    configurationHash: "",
    sourceFiles: new Map()
  };
}

export class SkottCacheHandler<T> {
  #cache = createEmptyCache();
  #nextCache = createEmptyCache();
  #currentConfigHash = "";

  constructor(
    private readonly fileReader: FileReader,
    private readonly fileWriter: FileWriter,
    private readonly config: SkottConfig<T>
  ) {
    if (!this.config.incremental) {
      return;
    }

    try {
      this.#currentConfigHash = createNodeHash(JSON.stringify(this.config));
      this.#cache = this.createCache();
    } catch {}
  }

  get store(): SkottCache<T> {
    return this.#cache as SkottCache<T>;
  }

  private createCache(): SkottCache<T> {
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

  public get(fileId: string): SkottCachedNode<T> | undefined {
    return this.#cache.sourceFiles.get(fileId) as SkottCachedNode<T>;
  }

  /**
   * When stored, nodes paths are absolute hence not ECMAScript compliant for
   * imports declarations. When reading them again, we must be sure to put a
   * compliant path again so that they can be looked up correctly.
   */
  public restoreFileRelativePath(moduleName: string, baseDir: string): string {
    if (moduleName.startsWith("../")) {
      return moduleName;
    }

    return path.relative(baseDir, moduleName);
  }

  public restoreModuleDeclarations(
    node: SkottCachedNode<T>,
    baseDir: string
  ): Set<string> {
    return new Set(
      node.value.adjacentTo
        .map((moduleName) => this.restoreFileRelativePath(moduleName, baseDir))
        .concat(node.value.body.thirdPartyDependencies)
        .concat(node.value.body.builtinDependencies)
    );
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
    latestComputedGraph: SkottStructure<T>["graph"]
  ): Promise<void> {
    try {
      const graphWithLatestHashes: Record<
        SkottNode<T>["id"],
        SkottCachedNode<T>
      > = {};

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
