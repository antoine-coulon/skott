import { decodeInputConfig } from "./src/config.js";
import { FileSystemReader } from "./src/filesystem/file-reader.js";
import { FileSystemWriter } from "./src/filesystem/file-writer.js";
import { FakeLogger, Logger } from "./src/logger.js";
import { ModuleWalkerSelector } from "./src/modules/walkers/common.js";
import { Skott, SkottConfig, SkottInstance } from "./src/skott.js";

function raiseIllegalConfigException(configuration: string): never {
  throw new Error(`Illegal configuration: ${configuration}`);
}

function checkIllegalConfigs<T>(
  config: Partial<SkottConfig<T>> & { cwd?: string; verbose?: boolean }
): void {
  if (!config.entrypoint && config.includeBaseDir) {
    raiseIllegalConfigException(
      "`includeBaseDir` can only be used when providing an entrypoint"
    );
  }

  if (config.entrypoint && config.cwd !== process.cwd()) {
    raiseIllegalConfigException(
      "`cwd` can't be used when providing an entrypoint"
    );
  }
}

export default async function skott<T>(
  config: Partial<SkottConfig<T>> & { cwd?: string; verbose?: boolean }
): Promise<SkottInstance<T>> {
  checkIllegalConfigs(config);

  const { cwd, verbose, ...skottConfig } = decodeInputConfig(config);
  const logger = verbose ? new Logger() : new FakeLogger();

  const skottInstance = await new Skott<T>(
    skottConfig,
    new FileSystemReader({ cwd }),
    new FileSystemWriter(),
    new ModuleWalkerSelector(),
    logger
  ).initialize();

  return skottInstance;
}

export * from "./src/skott.js";
