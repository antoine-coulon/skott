/**
 * @since 1.0.0
 */
import type * as HashSet from "@effect/data/HashSet";
import type * as Option from "@effect/data/Option";
import type * as Arr from "@effect/data/ReadonlyArray";
import type * as Effect from "@effect/io/Effect";
import type * as FiberId from "@effect/io/Fiber/Id";
import type * as FiberRef from "@effect/io/FiberRef";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const FiberRefsSym: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type FiberRefsSym = typeof FiberRefsSym;
/**
 * `FiberRefs` is a data type that represents a collection of `FiberRef` values.
 *
 * This allows safely propagating `FiberRef` values across fiber boundaries, for
 * example between an asynchronous producer and consumer.
 *
 * @since 1.0.0
 * @category models
 */
export interface FiberRefs {
    readonly [FiberRefsSym]: FiberRefsSym;
    readonly locals: Map<FiberRef.FiberRef<any>, Arr.NonEmptyReadonlyArray<readonly [FiberId.Runtime, any]>>;
}
declare const delete_: {
    <A>(fiberRef: FiberRef.FiberRef<A>): (self: FiberRefs) => FiberRefs;
    <A>(self: FiberRefs, fiberRef: FiberRef.FiberRef<A>): FiberRefs;
};
export { 
/**
 * Deletes the specified `FiberRef` from the `FibterRefs`.
 *
 * @since 1.0.0
 * @category mutations
 */
delete_ as delete };
/**
 * Returns a set of each `FiberRef` in this collection.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const fiberRefs: (self: FiberRefs) => HashSet.HashSet<FiberRef.FiberRef<any>>;
/**
 * Forks this collection of fiber refs as the specified child fiber id. This
 * will potentially modify the value of the fiber refs, as determined by the
 * individual fiber refs that make up the collection.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const forkAs: {
    (childId: FiberId.Runtime): (self: FiberRefs) => FiberRefs;
    (self: FiberRefs, childId: FiberId.Runtime): FiberRefs;
};
/**
 * Gets the value of the specified `FiberRef` in this collection of `FiberRef`
 * values if it exists or `None` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const get: {
    <A>(fiberRef: FiberRef.FiberRef<A>): (self: FiberRefs) => Option.Option<A>;
    <A>(self: FiberRefs, fiberRef: FiberRef.FiberRef<A>): Option.Option<A>;
};
/**
 * Gets the value of the specified `FiberRef` in this collection of `FiberRef`
 * values if it exists or the `initial` value of the `FiberRef` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const getOrDefault: {
    <A>(fiberRef: FiberRef.FiberRef<A>): (self: FiberRefs) => A;
    <A>(self: FiberRefs, fiberRef: FiberRef.FiberRef<A>): A;
};
/**
 * Joins this collection of fiber refs to the specified collection, as the
 * specified fiber id. This will perform diffing and merging to ensure
 * preservation of maximum information from both child and parent refs.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const joinAs: {
    (fiberId: FiberId.Runtime, that: FiberRefs): (self: FiberRefs) => FiberRefs;
    (self: FiberRefs, fiberId: FiberId.Runtime, that: FiberRefs): FiberRefs;
};
/**
 * Set each ref to either its value or its default.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const setAll: (self: FiberRefs) => Effect.Effect<never, never, void>;
/**
 * Updates the value of the specified `FiberRef` using the provided `FiberId`
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const updatedAs: {
    <A>(fiberId: FiberId.Runtime, fiberRef: FiberRef.FiberRef<A>, value: A): (self: FiberRefs) => FiberRefs;
    <A>(self: FiberRefs, fiberId: FiberId.Runtime, fiberRef: FiberRef.FiberRef<A>, value: A): FiberRefs;
};
/**
 * Note: it will not copy the provided Map, make sure to provide a fresh one.
 *
 * @since 1.0.0
 * @category unsafe
 */
export declare const unsafeMake: (fiberRefLocals: Map<FiberRef.FiberRef<any>, Arr.NonEmptyReadonlyArray<readonly [FiberId.Runtime, any]>>) => FiberRefs;
//# sourceMappingURL=FiberRefs.d.ts.map