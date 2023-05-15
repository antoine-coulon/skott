/**
 * @since 1.0.0
 */
import type { LazyArg } from "@effect/data/Function";
import type * as Option from "@effect/data/Option";
import type * as Cause from "@effect/io/Cause";
import type * as Effect from "@effect/io/Effect";
import type * as Exit from "@effect/io/Exit";
import type * as FiberId from "@effect/io/Fiber/Id";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const DeferredTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type DeferredTypeId = typeof DeferredTypeId;
/**
 * A `Deferred` represents an asynchronous variable that can be set exactly
 * once, with the ability for an arbitrary number of fibers to suspend (by
 * calling `Deferred.await`) and automatically resume when the variable is set.
 *
 * `Deferred` can be used for building primitive actions whose completions
 * require the coordinated action of multiple fibers, and for building
 * higher-level concurrent or asynchronous structures.
 *
 * @since 1.0.0
 * @category models
 */
export interface Deferred<E, A> extends Deferred.Variance<E, A> {
}
/**
 * @since 1.0.0
 */
export declare namespace Deferred {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<E, A> {
        readonly [DeferredTypeId]: {
            readonly _E: (_: never) => E;
            readonly _A: (_: never) => A;
        };
    }
}
/**
 * Creates a new `Deferred`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <E, A>() => Effect.Effect<never, never, Deferred<E, A>>;
/**
 * Creates a new `Deferred` from the specified `FiberId`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const makeAs: <E, A>(fiberId: FiberId.FiberId) => Effect.Effect<never, never, Deferred<E, A>>;
declare const _await: <E, A>(self: Deferred<E, A>) => Effect.Effect<never, E, A>;
export { 
/**
 * Retrieves the value of the `Deferred`, suspending the fiber running the
 * workflow until the result is available.
 *
 * @since 1.0.0
 * @category getters
 */
_await as await };
/**
 * Completes the deferred with the result of the specified effect. If the
 * deferred has already been completed, the method will produce false.
 *
 * Note that `Deferred.completeWith` will be much faster, so consider using
 * that if you do not need to memoize the result of the specified effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const complete: {
    <E, A>(effect: Effect.Effect<never, E, A>): (self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, effect: Effect.Effect<never, E, A>): Effect.Effect<never, never, boolean>;
};
/**
 * Completes the deferred with the result of the specified effect. If the
 * deferred has already been completed, the method will produce false.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const completeWith: {
    <E, A>(effect: Effect.Effect<never, E, A>): (self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, effect: Effect.Effect<never, E, A>): Effect.Effect<never, never, boolean>;
};
/**
 * Exits the `Deferred` with the specified `Exit` value, which will be
 * propagated to all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const done: {
    <E, A>(exit: Exit.Exit<E, A>): (self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, exit: Exit.Exit<E, A>): Effect.Effect<never, never, boolean>;
};
/**
 * Fails the `Deferred` with the specified error, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const fail: {
    <E>(error: E): <A>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, error: E): Effect.Effect<never, never, boolean>;
};
/**
 * Fails the `Deferred` with the specified error, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const failSync: {
    <E>(evaluate: LazyArg<E>): <A>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, evaluate: LazyArg<E>): Effect.Effect<never, never, boolean>;
};
/**
 * Fails the `Deferred` with the specified `Cause`, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const failCause: {
    <E>(cause: Cause.Cause<E>): <A>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, cause: Cause.Cause<E>): Effect.Effect<never, never, boolean>;
};
/**
 * Fails the `Deferred` with the specified `Cause`, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const failCauseSync: {
    <E>(evaluate: LazyArg<Cause.Cause<E>>): <A>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, evaluate: LazyArg<Cause.Cause<E>>): Effect.Effect<never, never, boolean>;
};
/**
 * Kills the `Deferred` with the specified defect, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const die: {
    (defect: unknown): <E, A>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, defect: unknown): Effect.Effect<never, never, boolean>;
};
/**
 * Kills the `Deferred` with the specified defect, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const dieSync: {
    (evaluate: LazyArg<unknown>): <E, A>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, evaluate: LazyArg<unknown>): Effect.Effect<never, never, boolean>;
};
/**
 * Completes the `Deferred` with interruption. This will interrupt all fibers
 * waiting on the value of the `Deferred` with the `FiberId` of the fiber
 * calling this method.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const interrupt: <E, A>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
/**
 * Completes the `Deferred` with interruption. This will interrupt all fibers
 * waiting on the value of the `Deferred` with the specified `FiberId`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const interruptWith: {
    (fiberId: FiberId.FiberId): <E, A>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, fiberId: FiberId.FiberId): Effect.Effect<never, never, boolean>;
};
/**
 * Returns `true` if this `Deferred` has already been completed with a value or
 * an error, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const isDone: <E, A>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
/**
 * Returns a `Some<Effect<R, E, A>>` from the `Deferred` if this `Deferred` has
 * already been completed, `None` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const poll: <E, A>(self: Deferred<E, A>) => Effect.Effect<never, never, Option.Option<Effect.Effect<never, E, A>>>;
/**
 * Completes the `Deferred` with the specified value.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const succeed: {
    <A>(value: A): <E>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, value: A): Effect.Effect<never, never, boolean>;
};
/**
 * Completes the `Deferred` with the specified lazily evaluated value.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const sync: {
    <A>(evaluate: LazyArg<A>): <E>(self: Deferred<E, A>) => Effect.Effect<never, never, boolean>;
    <E, A>(self: Deferred<E, A>, evaluate: LazyArg<A>): Effect.Effect<never, never, boolean>;
};
/**
 * Unsafely creates a new `Deferred` from the specified `FiberId`.
 *
 * @since 1.0.0
 * @category unsafe
 */
export declare const unsafeMake: <E, A>(fiberId: FiberId.FiberId) => Deferred<E, A>;
/**
 * Unsafely exits the `Deferred` with the specified `Exit` value, which will be
 * propagated to all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category unsafe
 */
export declare const unsafeDone: <E, A>(self: Deferred<E, A>, effect: Effect.Effect<never, E, A>) => void;
//# sourceMappingURL=Deferred.d.ts.map