import { decodeInputConfig } from "./src/config.js";
import { FileSystemReader } from "./src/filesystem/file-reader.js";
import { FileSystemWriter } from "./src/filesystem/file-writer.js";
import { Logger } from "./src/logger.js";
import { ModuleWalkerSelector } from "./src/modules/walkers/common.js";
import { Skott, SkottConfig, SkottInstance } from "./src/skott.js";

export default async function skott<T>(
  config: Partial<SkottConfig<T>> & { cwd?: string }
): Promise<SkottInstance<T>> {
  const { cwd, ...skottConfig } = decodeInputConfig(config);
  const skottInstance = await new Skott<T>(
    skottConfig,
    new FileSystemReader({ cwd }),
    new FileSystemWriter(),
    new ModuleWalkerSelector(),
    new Logger()
  ).initialize();

  return skottInstance;
}

export * from "./src/skott.js";
