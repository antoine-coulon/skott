"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = exports.zip = exports.withDescription = exports.withDefault = exports.validate = exports.unwrap = exports.table = exports.sync = exports.succeed = exports.string = exports.setOf = exports.secret = exports.repeat = exports.primitive = exports.orElseIf = exports.orElse = exports.optional = exports.nested = exports.mapOrFail = exports.mapAttempt = exports.map = exports.isConfig = exports.integer = exports.float = exports.fail = exports.defer = exports.date = exports.chunkOf = exports.bool = exports.arrayOf = exports.all = exports.ConfigTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/config"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const ConfigTypeId = internal.ConfigTypeId;
/**
 * Constructs a config for an array of values.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.ConfigTypeId = ConfigTypeId;
const arrayOf = internal.arrayOf;
/**
 * Constructs a config for a boolean value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.arrayOf = arrayOf;
const bool = internal.bool;
/**
 * Constructs a config for a sequence of values.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.bool = bool;
const chunkOf = internal.chunkOf;
/**
 * Constructs a config for a date value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.chunkOf = chunkOf;
const date = internal.date;
/**
 * Lazily constructs a config.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.date = date;
const defer = internal.defer;
/**
 * Constructs a config that fails with the specified message.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.defer = defer;
const fail = internal.fail;
/**
 * Constructs a config for a float value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fail = fail;
const float = internal.float;
/**
 * Constructs a config for a integer value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.float = float;
const integer = internal.integer;
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
exports.integer = integer;
const isConfig = internal.isConfig;
/**
 * Returns a  config whose structure is the same as this one, but which produces
 * a different value, constructed using the specified function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.isConfig = isConfig;
const map = internal.map;
/**
 * Returns a config whose structure is the same as this one, but which may
 * produce a different value, constructed using the specified function, which
 * may throw exceptions that will be translated into validation errors.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.map = map;
const mapAttempt = internal.mapAttempt;
/**
 * Returns a new config whose structure is the samea as this one, but which
 * may produce a different value, constructed using the specified fallible
 * function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.mapAttempt = mapAttempt;
const mapOrFail = internal.mapOrFail;
/**
 * Returns a config that has this configuration nested as a property of the
 * specified name.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.mapOrFail = mapOrFail;
const nested = internal.nested;
/**
 * Returns a config whose structure is preferentially described by this
 * config, but which falls back to the specified config if there is an issue
 * reading from this config.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.nested = nested;
const orElse = internal.orElse;
/**
 * Returns configuration which reads from this configuration, but which falls
 * back to the specified configuration if reading from this configuration
 * fails with an error satisfying the specified predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.orElse = orElse;
const orElseIf = internal.orElseIf;
/**
 * Returns an optional version of this config, which will be `None` if the
 * data is missing from configuration, and `Some` otherwise.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.orElseIf = orElseIf;
const optional = internal.optional;
/**
 * Constructs a new primitive config.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.optional = optional;
const primitive = internal.primitive;
/**
 * Returns a config that describes a sequence of values, each of which has the
 * structure of this config.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.primitive = primitive;
const repeat = internal.repeat;
/**
 * Constructs a config for a secret value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.repeat = repeat;
const secret = internal.secret;
/**
 * Constructs a config for a sequence of values.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.secret = secret;
const setOf = internal.setOf;
/**
 * Constructs a config for a string value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.setOf = setOf;
const string = internal.string;
/**
 * Constructs a config which contains the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.string = string;
const succeed = internal.succeed;
/**
 * Constructs a config which contains the specified lazy value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.succeed = succeed;
const sync = internal.sync;
/**
 * Constructs a config for a sequence of values.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.sync = sync;
const table = internal.table;
/**
 * Constructs a config from a tuple / struct / arguments of configs.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.table = table;
const all = internal.all;
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
exports.all = all;
const unwrap = internal.unwrap;
/**
 * Returns a config that describes the same structure as this one, but which
 * performs validation during loading.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.unwrap = unwrap;
const validate = internal.validate;
/**
 * Returns a config that describes the same structure as this one, but has the
 * specified default value in case the information cannot be found.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validate = validate;
const withDefault = internal.withDefault;
/**
 * Adds a description to this configuration, which is intended for humans.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.withDefault = withDefault;
const withDescription = internal.withDescription;
/**
 * Returns a config that is the composition of this config and the specified
 * config.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.withDescription = withDescription;
const zip = internal.zip;
/**
 * Returns a config that is the composes this config and the specified config
 * using the provided function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.zip = zip;
const zipWith = internal.zipWith;
exports.zipWith = zipWith;
//# sourceMappingURL=Config.js.map