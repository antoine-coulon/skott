import { FileSystemReader } from "./src/filesystem/file-reader.js";
import { FileSystemWriter } from "./src/filesystem/file-writer.js";
import { ModuleWalkerSelector } from "./src/modules/walkers/common.js";
import { Skott, SkottConfig, SkottInstance } from "./src/skott.js";

export default async function skott(
  config: SkottConfig
): Promise<SkottInstance> {
  const skottInstance = await new Skott(
    config,
    new FileSystemReader(),
    new FileSystemWriter(),
    new ModuleWalkerSelector()
  ).initialize();

  return skottInstance;
}

export * from "./src/skott.js";
