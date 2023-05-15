"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.make = exports.isEnabled = exports.isEmpty = exports.isDisabled = exports.isActive = exports.inverse = exports.includes = exports.exclude = exports.enabledSet = exports.enable = exports.empty = exports.either = exports.disabledSet = exports.disable = exports.both = exports.andThen = void 0;
var runtimeFlags = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlags"));
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlagsPatch"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * The empty `RuntimeFlagsPatch`.
 *
 * @since 1.0.0
 * @category constructors
 */
const empty = internal.empty;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const make = internal.make;
/**
 * Creates a `RuntimeFlagsPatch` describing enabling the provided `RuntimeFlag`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.make = make;
const enable = internal.enable;
/**
 * Creates a `RuntimeFlagsPatch` describing disabling the provided `RuntimeFlag`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.enable = enable;
const disable = internal.disable;
/**
 * Returns `true` if the specified `RuntimeFlagsPatch` is empty.
 *
 * @since 1.0.0
 * @category getters
 */
exports.disable = disable;
const isEmpty = internal.isEmpty;
/**
 * Returns `true` if the `RuntimeFlagsPatch` describes the specified
 * `RuntimeFlag` as active.
 *
 * @since 1.0.0
 * @category elements
 */
exports.isEmpty = isEmpty;
const isActive = internal.isActive;
/**
 * Returns `true` if the `RuntimeFlagsPatch` describes the specified
 * `RuntimeFlag` as enabled.
 *
 * @since 1.0.0
 * @category elements
 */
exports.isActive = isActive;
const isEnabled = internal.isEnabled;
/**
 * Returns `true` if the `RuntimeFlagsPatch` describes the specified
 * `RuntimeFlag` as disabled.
 *
 * @since 1.0.0
 * @category elements
 */
exports.isEnabled = isEnabled;
const isDisabled = internal.isDisabled;
/**
 * Returns `true` if the `RuntimeFlagsPatch` includes the specified
 * `RuntimeFlag`, `false` otherwise.
 *
 * @since 1.0.0
 * @category elements
 */
exports.isDisabled = isDisabled;
const includes = internal.isActive;
/**
 * Creates a `RuntimeFlagsPatch` describing the application of the `self` patch,
 * followed by `that` patch.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.includes = includes;
const andThen = internal.andThen;
/**
 * Creates a `RuntimeFlagsPatch` describing application of both the `self` patch
 * and `that` patch.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.andThen = andThen;
const both = internal.both;
/**
 * Creates a `RuntimeFlagsPatch` describing application of either the `self`
 * patch or `that` patch.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.both = both;
const either = internal.either;
/**
 * Creates a `RuntimeFlagsPatch` which describes exclusion of the specified
 * `RuntimeFlag` from the set of `RuntimeFlags`.
 *
 * @category mutations
 * @since 1.0.0
 */
exports.either = either;
const exclude = internal.exclude;
/**
 * Creates a `RuntimeFlagsPatch` which describes the inverse of the patch
 * specified by the provided `RuntimeFlagsPatch`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.exclude = exclude;
const inverse = internal.inverse;
/**
 * Returns a `ReadonlySet<number>` containing the `RuntimeFlags` described as
 * enabled by the specified `RuntimeFlagsPatch`.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.inverse = inverse;
const enabledSet = runtimeFlags.enabledSet;
/**
 * Returns a `ReadonlySet<number>` containing the `RuntimeFlags` described as
 * disabled by the specified `RuntimeFlagsPatch`.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.enabledSet = enabledSet;
const disabledSet = runtimeFlags.disabledSet;
/**
 * Renders the provided `RuntimeFlagsPatch` to a string.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.disabledSet = disabledSet;
const render = runtimeFlags.renderPatch;
exports.render = render;
//# sourceMappingURL=Patch.js.map