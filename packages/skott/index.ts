import { Option } from "effect";

import { decodeInputConfig } from "./src/config.js";
import { FileSystemReader } from "./src/filesystem/file-reader.js";
import { FileSystemWriter } from "./src/filesystem/file-writer.js";
import { FakeLogger, SkottLogger } from "./src/logger.js";
import { ModuleWalkerSelector } from "./src/modules/walkers/common.js";
import { Skott } from "./src/skott.js";
import type { SkottConfig, SkottInstance } from "./src/skott.js";

interface InputConfig<T> extends Partial<SkottConfig<T>> {
  cwd?: string;
  verbose?: boolean;
  ignorePattern?: string;
}

function raiseIllegalConfigException(configuration: string): never {
  throw new Error(`Illegal configuration: ${configuration}`);
}

function checkIllegalConfigs<T>(config: Option.Option<InputConfig<T>>): void {
  if (Option.isSome(config)) {
    const { entrypoint, includeBaseDir, cwd } = config.value;

    if (!entrypoint && includeBaseDir) {
      raiseIllegalConfigException(
        "`includeBaseDir` can only be used when providing an entrypoint"
      );
    }

    if (entrypoint && cwd && cwd !== process.cwd()) {
      raiseIllegalConfigException(
        "`cwd` can't be customized when providing an entrypoint"
      );
    }
  }
}

export default async function skott<T>(
  inputConfig: InputConfig<T> | null = Object.create(null)
): Promise<SkottInstance<T>> {
  const config = Option.fromNullable(inputConfig);

  checkIllegalConfigs(config);

  const { cwd, verbose, ignorePattern, ...skottConfig } =
    decodeInputConfig(config);
  const logger = verbose ? new SkottLogger() : new FakeLogger();

  const skottInstance = await new Skott<T>(
    skottConfig,
    new FileSystemReader({ cwd, ignorePattern }),
    new FileSystemWriter(),
    new ModuleWalkerSelector(),
    logger
  ).initialize();

  return skottInstance;
}

export * from "./src/skott.js";
