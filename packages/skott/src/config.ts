import { identity, pipe, Option } from "effect";
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

const decodeGroupBy: D.Decoder<unknown, (input: string) => string | undefined> =
  {
    // Typecast is ok here as we can't really runtime-check (before any calls) that the provided function
    // will always return a valid value anyawy
    // Separate runtime checks will be done during the actual usage of the function for each call
    decode: (input) =>
      typeof input === "function"
        ? D.success(input as (input: string) => string | undefined)
        : D.failure(
            input,
            "`groupBy` must be a function or not provided at all"
          )
  };

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
  groupBy: withDefaultValue(defaultConfig.groupBy)(decodeGroupBy),
  /**
   * External runner only config
   */
  cwd: withDefaultValue(process.cwd())(D.string),
  verbose: withDefaultValue(false)(D.boolean),
  ignorePattern: withDefaultValue("")(D.string)
});

export function decodeInputConfig<T>(
  partialConfig: Option.Option<Partial<SkottConfig<T>>>
) {
  return pipe(
    partialConfig,
    Option.getOrNull,
    config.decode,
    E.fold((decodeError) => {
      throw new Error(`Invalid Skott config. Reason: ${D.draw(decodeError)}`);
    }, identity)
  );
}
