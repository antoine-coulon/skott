import { identity, pipe } from "effect";
import { either } from "fp-ts";
import * as D from "io-ts/lib/Decoder.js";

import { dependencyResolverDecoder } from "./modules/resolvers/base-resolver.js";
import { defaultConfig, SkottConfig } from "./skott.js";

function withDefaultValue<T>(defaultValue: T) {
  return (decoder: D.Decoder<unknown, T>): D.Decoder<unknown, T> => {
    return {
      decode: (v) =>
        v === undefined ? D.success(defaultValue) : decoder.decode(v)
    };
  };
}

const config = D.struct({
  entrypoint: withDefaultValue(defaultConfig.entrypoint)(D.string),
  includeBaseDir: withDefaultValue(defaultConfig.includeBaseDir)(D.boolean),
  incremental: withDefaultValue(defaultConfig.incremental)(D.boolean),
  circularMaxDepth: withDefaultValue(defaultConfig.circularMaxDepth)(D.number),
  dependencyTracking: withDefaultValue(defaultConfig.dependencyTracking)(
    D.struct({
      thirdParty: D.boolean,
      builtin: D.boolean,
      typeOnly: D.boolean
    })
  ),
  fileExtensions: withDefaultValue(defaultConfig.fileExtensions)(
    D.array(D.literal(".js", ".ts", ".jsx", ".tsx", ".mjs", ".cjs"))
  ),
  tsConfigPath: withDefaultValue(defaultConfig.tsConfigPath)(D.string),
  manifestPath: withDefaultValue(defaultConfig.manifestPath)(D.string),
  dependencyResolvers: D.array(dependencyResolverDecoder())
});

export function makeSkottConfig(
  partialConfig: Partial<SkottConfig>
): SkottConfig {
  return pipe(
    config.decode(partialConfig),
    either.fold((decodeError) => {
      throw new Error(`Invalid Skott config. Reason: ${D.draw(decodeError)}`);
    }, identity)
  );
}
