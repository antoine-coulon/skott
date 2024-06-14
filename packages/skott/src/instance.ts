import { Option } from "effect";

import {
  checkIllegalRuntimeConfigs,
  decodeInputConfig,
  type InputConfig
} from "./config.js";
import type { RuntimeConfig } from "./config.js";
import { FileSystemReader } from "./filesystem/file-reader.js";
import { FileSystemWriter } from "./filesystem/file-writer.js";
import { FakeLogger, SkottLogger } from "./logger.js";
import { ModuleWalkerSelector } from "./modules/walkers/common.js";
import { Skott, type SkottInstance } from "./skott.js";

export function createRuntimeConfig<T>(
  inputConfig: InputConfig<T> | null = Object.create(null)
): RuntimeConfig {
  const config = Option.fromNullable(inputConfig);

  checkIllegalRuntimeConfigs(config);

  return decodeInputConfig(config);
}

export function createInstance<T>(runtimeConfig: RuntimeConfig): Skott<T> {
  const { cwd, verbose, ignorePatterns, ...skottConfig } =
    createRuntimeConfig(runtimeConfig);
  const logger = verbose ? new SkottLogger() : new FakeLogger();

  return new Skott<T>(
    skottConfig,
    new FileSystemReader({ cwd, ignorePatterns }),
    new FileSystemWriter(),
    new ModuleWalkerSelector(),
    logger
  );
}

export function run<T>(
  inputConfig: InputConfig<T> | null = Object.create(null)
): Promise<SkottInstance<T>> {
  const config = createRuntimeConfig(inputConfig);
  const instance = createInstance<T>(config);

  return instance.initialize();
}

export function runFromRuntimeConfig<T>(
  runtimeConfig: RuntimeConfig
): Promise<SkottInstance<T>> {
  return createInstance<T>(runtimeConfig).initialize();
}
