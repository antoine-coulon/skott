import { FileSystemReader } from "./src/filesystem/file-reader.js";
import { FileSystemWriter } from "./src/filesystem/file-writer.js";
import { ModuleWalkerSelector } from "./src/modules/walkers/common.js";
import {
  defaultConfig,
  Skott,
  SkottConfig,
  SkottInstance
} from "./src/skott.js";

function makeSkottConfig(partialConfig: Partial<SkottConfig>): SkottConfig {
  return {
    ...partialConfig,
    ...defaultConfig
  };
}

export default async function skott(
  config: Partial<SkottConfig>
): Promise<SkottInstance> {
  const skottInstance = await new Skott(
    makeSkottConfig(config),
    new FileSystemReader(),
    new FileSystemWriter(),
    new ModuleWalkerSelector()
  ).initialize();

  return skottInstance;
}

export * from "./src/skott.js";
