import { identity, pipe } from "@effect/data/Function";
import * as O from "@effect/data/Option";
import * as E from "fp-ts/lib/Either.js";
import * as D from "io-ts/lib/Decoder.js";

import { dependencyResolverDecoder } from "./modules/resolvers/base-resolver.js";
import { defaultConfig, type SkottConfig } from "./skott.js";

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
  dependencyResolvers: withDefaultValue(defaultConfig.dependencyResolvers)(
    D.array(dependencyResolverDecoder())
  ),
  /**
   * External runner only config
   */
  cwd: withDefaultValue(process.cwd())(D.string),
  verbose: withDefaultValue(false)(D.boolean),
  ignorePattern: withDefaultValue("")(D.string)
});

export function decodeInputConfig<T>(
  partialConfig: O.Option<Partial<SkottConfig<T>>>
) {
  return pipe(
    partialConfig,
    O.getOrNull,
    config.decode,
    E.fold((decodeError) => {
      throw new Error(`Invalid Skott config. Reason: ${D.draw(decodeError)}`);
    }, identity)
  );
}
