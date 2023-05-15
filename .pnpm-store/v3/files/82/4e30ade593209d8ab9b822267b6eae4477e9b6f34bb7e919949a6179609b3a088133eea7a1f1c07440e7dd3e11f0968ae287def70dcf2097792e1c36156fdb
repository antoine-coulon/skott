"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.within = exports.upperCase = exports.unnested = exports.snakeCase = exports.orElse = exports.nested = exports.makeFlat = exports.make = exports.lowerCase = exports.kebabCase = exports.fromMap = exports.fromFlat = exports.fromEnv = exports.contramapPath = exports.constantCase = exports.Tag = exports.FlatConfigProviderTypeId = exports.ConfigProviderTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/configProvider"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const ConfigProviderTypeId = internal.ConfigProviderTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.ConfigProviderTypeId = ConfigProviderTypeId;
const FlatConfigProviderTypeId = internal.FlatConfigProviderTypeId;
/**
 * The service tag for `ConfigProvider`.
 *
 * @since 1.0.0
 * @category context
 */
exports.FlatConfigProviderTypeId = FlatConfigProviderTypeId;
const Tag = internal.configProviderTag;
/**
 * Creates a new config provider.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.Tag = Tag;
const make = internal.make;
/**
 * Creates a new flat config provider.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.make = make;
const makeFlat = internal.makeFlat;
/**
 * A config provider that loads configuration from context variables,
 * using the default System service.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.makeFlat = makeFlat;
const fromEnv = internal.fromEnv;
/**
 * Constructs a new `ConfigProvider` from a key/value (flat) provider, where
 * nesting is embedded into the string keys.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromEnv = fromEnv;
const fromFlat = internal.fromFlat;
/**
 * Constructs a ConfigProvider using a map and the specified delimiter string,
 * which determines how to split the keys in the map into path segments.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromFlat = fromFlat;
const fromMap = internal.fromMap;
/**
 * Returns a new config provider that will automatically convert all property
 * names to constant case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.fromMap = fromMap;
const constantCase = internal.constantCase;
/**
 * Returns a new config provider that will automatically tranform all path
 * configuration names with the specified function. This can be utilized to
 * adapt the names of configuration properties from one naming convention to
 * another.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.constantCase = constantCase;
const contramapPath = internal.contramapPath;
/**
 * Returns a new config provider that will automatically convert all property
 * names to kebab case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.contramapPath = contramapPath;
const kebabCase = internal.kebabCase;
/**
 * Returns a new config provider that will automatically convert all property
 * names to lower case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.kebabCase = kebabCase;
const lowerCase = internal.lowerCase;
/**
 * Returns a new config provider that will automatically nest all
 * configuration under the specified property name. This can be utilized to
 * aggregate separate configuration sources that are all required to load a
 * single configuration value.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.lowerCase = lowerCase;
const nested = internal.nested;
/**
 * Returns a new config provider that preferentially loads configuration data
 * from this one, but which will fall back to the specified alternate provider
 * if there are any issues loading the configuration from this provider.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.nested = nested;
const orElse = internal.orElse;
/**
 * Returns a new config provider that will automatically un-nest all
 * configuration under the specified property name. This can be utilized to
 * de-aggregate separate configuration sources that are all required to load a
 * single configuration value.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.orElse = orElse;
const unnested = internal.unnested;
/**
 * Returns a new config provider that will automatically convert all property
 * names to upper case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.unnested = unnested;
const snakeCase = internal.snakeCase;
/**
 * Returns a new config provider that will automatically convert all property
 * names to upper case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.snakeCase = snakeCase;
const upperCase = internal.upperCase;
/**
 * Returns a new config provider that transforms the config provider with the
 * specified function within the specified path.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.upperCase = upperCase;
const within = internal.within;
exports.within = within;
//# sourceMappingURL=Provider.js.map