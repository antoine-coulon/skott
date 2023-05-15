"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windDown = exports.toSet = exports.runtimeMetrics = exports.render = exports.patch = exports.opSupervision = exports.none = exports.make = exports.isEnabled = exports.isDisabled = exports.interruption = exports.interruptible = exports.enableWindDown = exports.enableRuntimeMetrics = exports.enableOpSupervision = exports.enableInterruption = exports.enableCooperativeYielding = exports.enableAll = exports.enable = exports.disableWindDown = exports.disableRuntimeMetrics = exports.disableOpSupervision = exports.disableInterruption = exports.disableCooperativeYielding = exports.disableAll = exports.disable = exports.differ = exports.diff = exports.cooperativeYielding = exports.WindDown = exports.RuntimeMetrics = exports.OpSupervision = exports.None = exports.Interruption = exports.CooperativeYielding = void 0;
var circular = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/layer/circular"));
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlags"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * No runtime flags.
 *
 * @since 1.0.0
 * @category constructors
 */
const None = internal.None;
/**
 * The interruption flag determines whether or not the Effect runtime system will
 * interrupt a fiber.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.None = None;
const Interruption = internal.Interruption;
/**
 * The op supervision flag determines whether or not the Effect runtime system
 * will supervise all operations of the Effect runtime. Use of this flag will
 * negatively impact performance, but is required for some operations, such as
 * profiling.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.Interruption = Interruption;
const OpSupervision = internal.OpSupervision;
/**
 * The runtime metrics flag determines whether or not the Effect runtime system
 * will collect metrics about the Effect runtime. Use of this flag will have a
 * very small negative impact on performance, but generates very helpful
 * operational insight into running Effect applications that can be exported to
 * Prometheus or other tools via Effect Metrics.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.OpSupervision = OpSupervision;
const RuntimeMetrics = internal.RuntimeMetrics;
/**
 * The wind down flag determines whether the Effect runtime system will execute
 * effects in wind-down mode. In wind-down mode, even if interruption is
 * enabled and a fiber has been interrupted, the fiber will continue its
 * execution uninterrupted.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.RuntimeMetrics = RuntimeMetrics;
const WindDown = internal.WindDown;
/**
 * The cooperative yielding flag determines whether the Effect runtime will
 * yield to another fiber.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.WindDown = WindDown;
const CooperativeYielding = internal.CooperativeYielding;
/**
 * Returns `true` if the `CooperativeYielding` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.CooperativeYielding = CooperativeYielding;
const cooperativeYielding = internal.cooperativeYielding;
/**
 * Creates a `RuntimeFlagsPatch` which describes the difference between `self`
 * and `that`.
 *
 * @since 1.0.0
 * @category diffing
 */
exports.cooperativeYielding = cooperativeYielding;
const diff = internal.diff;
/**
 * Constructs a differ that knows how to diff `RuntimeFlags` values.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.diff = diff;
const differ = internal.differ;
/**
 * Disables the specified `RuntimeFlag`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.differ = differ;
const disable = internal.disable;
/**
 * Disables all of the `RuntimeFlag`s in the specified set of `RuntimeFlags`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.disable = disable;
const disableAll = internal.disableAll;
/**
 * @since 1.0.0
 * @category context
 */
exports.disableAll = disableAll;
const disableCooperativeYielding = circular.disableCooperativeYielding;
/**
 * @since 1.0.0
 * @category context
 */
exports.disableCooperativeYielding = disableCooperativeYielding;
const disableInterruption = circular.disableInterruption;
/**
 * @since 1.0.0
 * @category context
 */
exports.disableInterruption = disableInterruption;
const disableOpSupervision = circular.disableOpSupervision;
/**
 * @since 1.0.0
 * @category context
 */
exports.disableOpSupervision = disableOpSupervision;
const disableRuntimeMetrics = circular.disableRuntimeMetrics;
/**
 * @since 1.0.0
 * @category context
 */
exports.disableRuntimeMetrics = disableRuntimeMetrics;
const disableWindDown = circular.disableWindDown;
/**
 * Enables the specified `RuntimeFlag`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.disableWindDown = disableWindDown;
const enable = internal.enable;
/**
 * Enables all of the `RuntimeFlag`s in the specified set of `RuntimeFlags`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.enable = enable;
const enableAll = internal.enableAll;
/**
 * @since 1.0.0
 * @category context
 */
exports.enableAll = enableAll;
const enableCooperativeYielding = circular.enableCooperativeYielding;
/**
 * @since 1.0.0
 * @category context
 */
exports.enableCooperativeYielding = enableCooperativeYielding;
const enableInterruption = circular.enableInterruption;
/**
 * @since 1.0.0
 * @category context
 */
exports.enableInterruption = enableInterruption;
const enableOpSupervision = circular.enableOpSupervision;
/**
 * @since 1.0.0
 * @category context
 */
exports.enableOpSupervision = enableOpSupervision;
const enableRuntimeMetrics = circular.enableRuntimeMetrics;
/**
 * @since 1.0.0
 * @category context
 */
exports.enableRuntimeMetrics = enableRuntimeMetrics;
const enableWindDown = circular.enableWindDown;
/**
 * Returns true only if the `Interruption` flag is **enabled** and the
 * `WindDown` flag is **disabled**.
 *
 * A fiber is said to be interruptible if interruption is enabled and the fiber
 * is not in its wind-down phase, in which it takes care of cleanup activities
 * related to fiber shutdown.
 *
 * @since 1.0.0
 * @category getters
 */
exports.enableWindDown = enableWindDown;
const interruptible = internal.interruptible;
/**
 * Returns `true` if the `Interruption` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.interruptible = interruptible;
const interruption = internal.interruption;
/**
 * Returns `true` if the specified `RuntimeFlag` is enabled, `false` otherwise.
 *
 * @since 1.0.0
 * @category elements
 */
exports.interruption = interruption;
const isEnabled = internal.isEnabled;
/**
 * Returns `true` if the specified `RuntimeFlag` is disabled, `false` otherwise.
 *
 * @since 1.0.0
 * @category elements
 */
exports.isEnabled = isEnabled;
const isDisabled = internal.isDisabled;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.isDisabled = isDisabled;
const make = internal.make;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.make = make;
const none = internal.none;
/**
 * Returns `true` if the `OpSupervision` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.none = none;
const opSupervision = internal.opSupervision;
/**
 * Patches a set of `RuntimeFlag`s with a `RuntimeFlagsPatch`, returning the
 * patched set of `RuntimeFlag`s.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.opSupervision = opSupervision;
const patch = internal.patch;
/**
 * Converts the provided `RuntimeFlags` into a `string`.
 *
 * @category conversions
 * @since 1.0.0
 */
exports.patch = patch;
const render = internal.render;
/**
 * Returns `true` if the `RuntimeMetrics` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.render = render;
const runtimeMetrics = internal.runtimeMetrics;
/**
 * Converts the provided `RuntimeFlags` into a `ReadonlySet<number>`.
 *
 * @category conversions
 * @since 1.0.0
 */
exports.runtimeMetrics = runtimeMetrics;
const toSet = internal.toSet;
/**
 * Returns `true` if the `WindDown` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.toSet = toSet;
const windDown = internal.windDown;
exports.windDown = windDown;
//# sourceMappingURL=Flags.js.map