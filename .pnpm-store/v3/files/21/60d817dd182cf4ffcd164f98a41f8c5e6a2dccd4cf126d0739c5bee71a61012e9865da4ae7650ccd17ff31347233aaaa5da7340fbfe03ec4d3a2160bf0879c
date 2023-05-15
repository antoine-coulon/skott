/**
 * @since 1.0.0
 */
import * as circular from "@effect/io/internal_effect_untraced/layer/circular";
import * as internal from "@effect/io/internal_effect_untraced/runtimeFlags";
/**
 * No runtime flags.
 *
 * @since 1.0.0
 * @category constructors
 */
export const None = internal.None;
/**
 * The interruption flag determines whether or not the Effect runtime system will
 * interrupt a fiber.
 *
 * @since 1.0.0
 * @category constructors
 */
export const Interruption = internal.Interruption;
/**
 * The op supervision flag determines whether or not the Effect runtime system
 * will supervise all operations of the Effect runtime. Use of this flag will
 * negatively impact performance, but is required for some operations, such as
 * profiling.
 *
 * @since 1.0.0
 * @category constructors
 */
export const OpSupervision = internal.OpSupervision;
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
export const RuntimeMetrics = internal.RuntimeMetrics;
/**
 * The wind down flag determines whether the Effect runtime system will execute
 * effects in wind-down mode. In wind-down mode, even if interruption is
 * enabled and a fiber has been interrupted, the fiber will continue its
 * execution uninterrupted.
 *
 * @since 1.0.0
 * @category constructors
 */
export const WindDown = internal.WindDown;
/**
 * The cooperative yielding flag determines whether the Effect runtime will
 * yield to another fiber.
 *
 * @since 1.0.0
 * @category constructors
 */
export const CooperativeYielding = internal.CooperativeYielding;
/**
 * Returns `true` if the `CooperativeYielding` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const cooperativeYielding = internal.cooperativeYielding;
/**
 * Creates a `RuntimeFlagsPatch` which describes the difference between `self`
 * and `that`.
 *
 * @since 1.0.0
 * @category diffing
 */
export const diff = internal.diff;
/**
 * Constructs a differ that knows how to diff `RuntimeFlags` values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const differ = internal.differ;
/**
 * Disables the specified `RuntimeFlag`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const disable = internal.disable;
/**
 * Disables all of the `RuntimeFlag`s in the specified set of `RuntimeFlags`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const disableAll = internal.disableAll;
/**
 * @since 1.0.0
 * @category context
 */
export const disableCooperativeYielding = circular.disableCooperativeYielding;
/**
 * @since 1.0.0
 * @category context
 */
export const disableInterruption = circular.disableInterruption;
/**
 * @since 1.0.0
 * @category context
 */
export const disableOpSupervision = circular.disableOpSupervision;
/**
 * @since 1.0.0
 * @category context
 */
export const disableRuntimeMetrics = circular.disableRuntimeMetrics;
/**
 * @since 1.0.0
 * @category context
 */
export const disableWindDown = circular.disableWindDown;
/**
 * Enables the specified `RuntimeFlag`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const enable = internal.enable;
/**
 * Enables all of the `RuntimeFlag`s in the specified set of `RuntimeFlags`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const enableAll = internal.enableAll;
/**
 * @since 1.0.0
 * @category context
 */
export const enableCooperativeYielding = circular.enableCooperativeYielding;
/**
 * @since 1.0.0
 * @category context
 */
export const enableInterruption = circular.enableInterruption;
/**
 * @since 1.0.0
 * @category context
 */
export const enableOpSupervision = circular.enableOpSupervision;
/**
 * @since 1.0.0
 * @category context
 */
export const enableRuntimeMetrics = circular.enableRuntimeMetrics;
/**
 * @since 1.0.0
 * @category context
 */
export const enableWindDown = circular.enableWindDown;
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
export const interruptible = internal.interruptible;
/**
 * Returns `true` if the `Interruption` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const interruption = internal.interruption;
/**
 * Returns `true` if the specified `RuntimeFlag` is enabled, `false` otherwise.
 *
 * @since 1.0.0
 * @category elements
 */
export const isEnabled = internal.isEnabled;
/**
 * Returns `true` if the specified `RuntimeFlag` is disabled, `false` otherwise.
 *
 * @since 1.0.0
 * @category elements
 */
export const isDisabled = internal.isDisabled;
/**
 * @since 1.0.0
 * @category constructors
 */
export const make = internal.make;
/**
 * @since 1.0.0
 * @category constructors
 */
export const none = internal.none;
/**
 * Returns `true` if the `OpSupervision` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const opSupervision = internal.opSupervision;
/**
 * Patches a set of `RuntimeFlag`s with a `RuntimeFlagsPatch`, returning the
 * patched set of `RuntimeFlag`s.
 *
 * @since 1.0.0
 * @category mutations
 */
export const patch = internal.patch;
/**
 * Converts the provided `RuntimeFlags` into a `string`.
 *
 * @category conversions
 * @since 1.0.0
 */
export const render = internal.render;
/**
 * Returns `true` if the `RuntimeMetrics` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const runtimeMetrics = internal.runtimeMetrics;
/**
 * Converts the provided `RuntimeFlags` into a `ReadonlySet<number>`.
 *
 * @category conversions
 * @since 1.0.0
 */
export const toSet = internal.toSet;
/**
 * Returns `true` if the `WindDown` `RuntimeFlag` is enabled, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const windDown = internal.windDown;
//# sourceMappingURL=Flags.mjs.map