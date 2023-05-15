import * as internal from "@effect/io/internal_effect_untraced/config";
/**
 * @since 1.0.0
 * @category symbols
 */
export const ConfigTypeId = internal.ConfigTypeId;
/**
 * Constructs a config for an array of values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const arrayOf = internal.arrayOf;
/**
 * Constructs a config for a boolean value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const bool = internal.bool;
/**
 * Constructs a config for a sequence of values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const chunkOf = internal.chunkOf;
/**
 * Constructs a config for a date value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const date = internal.date;
/**
 * Lazily constructs a config.
 *
 * @since 1.0.0
 * @category constructors
 */
export const defer = internal.defer;
/**
 * Constructs a config that fails with the specified message.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fail = internal.fail;
/**
 * Constructs a config for a float value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const float = internal.float;
/**
 * Constructs a config for a integer value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const integer = internal.integer;
/**
 * This function returns `true` if the specified value is an `Config` value,
 * `false` otherwise.
 *
 * This function can be useful for checking the type of a value before
 * attempting to operate on it as an `Config` value. For example, you could
 * use `isConfig` to check the type of a value before using it as an
 * argument to a function that expects an `Config` value.
 *
 * @param u - The value to check for being a `Config` value.
 *
 * @returns `true` if the specified value is a `Config` value, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isConfig = internal.isConfig;
/**
 * Returns a  config whose structure is the same as this one, but which produces
 * a different value, constructed using the specified function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const map = internal.map;
/**
 * Returns a config whose structure is the same as this one, but which may
 * produce a different value, constructed using the specified function, which
 * may throw exceptions that will be translated into validation errors.
 *
 * @since 1.0.0
 * @category mutations
 */
export const mapAttempt = internal.mapAttempt;
/**
 * Returns a new config whose structure is the samea as this one, but which
 * may produce a different value, constructed using the specified fallible
 * function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const mapOrFail = internal.mapOrFail;
/**
 * Returns a config that has this configuration nested as a property of the
 * specified name.
 *
 * @since 1.0.0
 * @category mutations
 */
export const nested = internal.nested;
/**
 * Returns a config whose structure is preferentially described by this
 * config, but which falls back to the specified config if there is an issue
 * reading from this config.
 *
 * @since 1.0.0
 * @category mutations
 */
export const orElse = internal.orElse;
/**
 * Returns configuration which reads from this configuration, but which falls
 * back to the specified configuration if reading from this configuration
 * fails with an error satisfying the specified predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const orElseIf = internal.orElseIf;
/**
 * Returns an optional version of this config, which will be `None` if the
 * data is missing from configuration, and `Some` otherwise.
 *
 * @since 1.0.0
 * @category mutations
 */
export const optional = internal.optional;
/**
 * Constructs a new primitive config.
 *
 * @since 1.0.0
 * @category constructors
 */
export const primitive = internal.primitive;
/**
 * Returns a config that describes a sequence of values, each of which has the
 * structure of this config.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeat = internal.repeat;
/**
 * Constructs a config for a secret value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const secret = internal.secret;
/**
 * Constructs a config for a sequence of values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const setOf = internal.setOf;
/**
 * Constructs a config for a string value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const string = internal.string;
/**
 * Constructs a config which contains the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeed = internal.succeed;
/**
 * Constructs a config which contains the specified lazy value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const sync = internal.sync;
/**
 * Constructs a config for a sequence of values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const table = internal.table;
/**
 * Constructs a config from a tuple / struct / arguments of configs.
 *
 * @since 1.0.0
 * @category constructors
 */
export const all = internal.all;
/**
 * Constructs a config from some configuration wrapped with the `Wrap<A>` utility type.
 *
 * For example:
 *
 * ```
 * import { Config, unwrap } from "@effect/io/Config"
 *
 * interface Options { key: string }
 *
 * const makeConfig = (config: Config.Wrap<Options>): Config<Options> => unwrap(config)
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
export const unwrap = internal.unwrap;
/**
 * Returns a config that describes the same structure as this one, but which
 * performs validation during loading.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validate = internal.validate;
/**
 * Returns a config that describes the same structure as this one, but has the
 * specified default value in case the information cannot be found.
 *
 * @since 1.0.0
 * @category mutations
 */
export const withDefault = internal.withDefault;
/**
 * Adds a description to this configuration, which is intended for humans.
 *
 * @since 1.0.0
 * @category mutations
 */
export const withDescription = internal.withDescription;
/**
 * Returns a config that is the composition of this config and the specified
 * config.
 *
 * @since 1.0.0
 * @category mutations
 */
export const zip = internal.zip;
/**
 * Returns a config that is the composes this config and the specified config
 * using the provided function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const zipWith = internal.zipWith;
//# sourceMappingURL=Config.mjs.map