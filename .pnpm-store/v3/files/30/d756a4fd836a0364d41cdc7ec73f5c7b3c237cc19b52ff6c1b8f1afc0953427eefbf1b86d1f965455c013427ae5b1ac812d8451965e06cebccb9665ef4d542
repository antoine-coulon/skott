/**
 * @since 1.0.0
 */
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags";
/**
 * @since 1.0.0
 * @category models
 */
export type RuntimeFlagsPatch = number & {
    readonly RuntimeFlagsPatch: unique symbol;
};
/**
 * The empty `RuntimeFlagsPatch`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: RuntimeFlagsPatch;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const make: (active: number, enabled: number) => RuntimeFlagsPatch;
/**
 * Creates a `RuntimeFlagsPatch` describing enabling the provided `RuntimeFlag`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const enable: (flag: RuntimeFlags.RuntimeFlag) => RuntimeFlagsPatch;
/**
 * Creates a `RuntimeFlagsPatch` describing disabling the provided `RuntimeFlag`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const disable: (flag: RuntimeFlags.RuntimeFlag) => RuntimeFlagsPatch;
/**
 * Returns `true` if the specified `RuntimeFlagsPatch` is empty.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const isEmpty: (patch: RuntimeFlagsPatch) => boolean;
/**
 * Returns `true` if the `RuntimeFlagsPatch` describes the specified
 * `RuntimeFlag` as active.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const isActive: {
    (flag: RuntimeFlagsPatch): (self: RuntimeFlagsPatch) => boolean;
    (self: RuntimeFlagsPatch, flag: RuntimeFlagsPatch): boolean;
};
/**
 * Returns `true` if the `RuntimeFlagsPatch` describes the specified
 * `RuntimeFlag` as enabled.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const isEnabled: {
    (flag: RuntimeFlags.RuntimeFlag): (self: RuntimeFlagsPatch) => boolean;
    (self: RuntimeFlagsPatch, flag: RuntimeFlags.RuntimeFlag): boolean;
};
/**
 * Returns `true` if the `RuntimeFlagsPatch` describes the specified
 * `RuntimeFlag` as disabled.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const isDisabled: {
    (flag: RuntimeFlags.RuntimeFlag): (self: RuntimeFlagsPatch) => boolean;
    (self: RuntimeFlagsPatch, flag: RuntimeFlags.RuntimeFlag): boolean;
};
/**
 * Returns `true` if the `RuntimeFlagsPatch` includes the specified
 * `RuntimeFlag`, `false` otherwise.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const includes: {
    (flag: RuntimeFlagsPatch): (self: RuntimeFlagsPatch) => boolean;
    (self: RuntimeFlagsPatch, flag: RuntimeFlagsPatch): boolean;
};
/**
 * Creates a `RuntimeFlagsPatch` describing the application of the `self` patch,
 * followed by `that` patch.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const andThen: {
    (that: RuntimeFlagsPatch): (self: RuntimeFlagsPatch) => RuntimeFlagsPatch;
    (self: RuntimeFlagsPatch, that: RuntimeFlagsPatch): RuntimeFlagsPatch;
};
/**
 * Creates a `RuntimeFlagsPatch` describing application of both the `self` patch
 * and `that` patch.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const both: {
    (that: RuntimeFlagsPatch): (self: RuntimeFlagsPatch) => RuntimeFlagsPatch;
    (self: RuntimeFlagsPatch, that: RuntimeFlagsPatch): RuntimeFlagsPatch;
};
/**
 * Creates a `RuntimeFlagsPatch` describing application of either the `self`
 * patch or `that` patch.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const either: {
    (that: RuntimeFlagsPatch): (self: RuntimeFlagsPatch) => RuntimeFlagsPatch;
    (self: RuntimeFlagsPatch, that: RuntimeFlagsPatch): RuntimeFlagsPatch;
};
/**
 * Creates a `RuntimeFlagsPatch` which describes exclusion of the specified
 * `RuntimeFlag` from the set of `RuntimeFlags`.
 *
 * @category mutations
 * @since 1.0.0
 */
export declare const exclude: {
    (flag: RuntimeFlags.RuntimeFlag): (self: RuntimeFlagsPatch) => RuntimeFlagsPatch;
    (self: RuntimeFlagsPatch, flag: RuntimeFlags.RuntimeFlag): RuntimeFlagsPatch;
};
/**
 * Creates a `RuntimeFlagsPatch` which describes the inverse of the patch
 * specified by the provided `RuntimeFlagsPatch`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const inverse: (patch: RuntimeFlagsPatch) => RuntimeFlagsPatch;
/**
 * Returns a `ReadonlySet<number>` containing the `RuntimeFlags` described as
 * enabled by the specified `RuntimeFlagsPatch`.
 *
 * @since 1.0.0
 * @category destructors
 */
export declare const enabledSet: (self: RuntimeFlagsPatch) => ReadonlySet<RuntimeFlags.RuntimeFlag>;
/**
 * Returns a `ReadonlySet<number>` containing the `RuntimeFlags` described as
 * disabled by the specified `RuntimeFlagsPatch`.
 *
 * @since 1.0.0
 * @category destructors
 */
export declare const disabledSet: (self: RuntimeFlagsPatch) => ReadonlySet<RuntimeFlags.RuntimeFlag>;
/**
 * Renders the provided `RuntimeFlagsPatch` to a string.
 *
 * @since 1.0.0
 * @category destructors
 */
export declare const render: (self: RuntimeFlagsPatch) => string;
//# sourceMappingURL=Patch.d.ts.map