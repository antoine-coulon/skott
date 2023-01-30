import { makeSkottConfig } from "./src/config.js";
import { FileSystemReader } from "./src/filesystem/file-reader.js";
import { FileSystemWriter } from "./src/filesystem/file-writer.js";
import { ModuleWalkerSelector } from "./src/modules/walkers/common.js";
import { Skott, SkottConfig, SkottInstance } from "./src/skott.js";

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

export {
  continueResolution,
  DependencyResolver,
  DependencyResolverOptions,
  skipNextResolvers
} from "./src/modules/resolvers/base-resolver.js";
export * from "./src/skott.js";
