/**
 * @since 1.0.0
 */
import type { Chunk } from "@effect/data/Chunk";
import type { Context } from "@effect/data/Context";
import type { ChunkPatch } from "@effect/data/Differ/ChunkPatch";
import type { ContextPatch } from "@effect/data/Differ/ContextPatch";
import type { HashMapPatch } from "@effect/data/Differ/HashMapPatch";
import type { HashSetPatch } from "@effect/data/Differ/HashSetPatch";
import type { OrPatch } from "@effect/data/Differ/OrPatch";
import type { Either } from "@effect/data/Either";
import type { HashMap } from "@effect/data/HashMap";
import type { HashSet } from "@effect/data/HashSet";
declare const TypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * A `Differ<Value, Patch>` knows how to compare an old value and new value of
 * type `Value` to produce a patch of type `Patch` that describes the
 * differences between those values. A `Differ` also knows how to apply a patch
 * to an old value to produce a new value that represents the old value updated
 * with the changes described by the patch.
 *
 * A `Differ` can be used to construct a `FiberRef` supporting compositional
 * updates using the `FiberRef.makePatch` constructor.
 *
 * The `Differ` companion object contains constructors for `Differ` values for
 * common data types such as `Chunk`, `HashMap`, and `HashSet``. In addition,
 * `Differ`values can be transformed using the `transform` operator and combined
 * using the `orElseEither` and `zip` operators. This allows creating `Differ`
 * values for arbitrarily complex data types compositionally.
 *
 * @since 1.0.0
 * @category models
 */
export interface Differ<Value, Patch> {
    readonly _id: TypeId;
    readonly _V: (_: Value) => Value;
    readonly _P: (_: Patch) => Patch;
}
export declare namespace Differ {
    namespace Or {
        type Patch<Value, Value2, Patch, Patch2> = OrPatch<Value, Value2, Patch, Patch2>;
    }
    namespace Context {
        type Patch<Input, Output> = ContextPatch<Input, Output>;
    }
    namespace Chunk {
        type Patch<Value, Patch> = ChunkPatch<Value, Patch>;
    }
    namespace HashMap {
        type Patch<Key, Value, Patch> = HashMapPatch<Key, Value, Patch>;
    }
    namespace HashSet {
        type Patch<Value> = HashSetPatch<Value>;
    }
}
/**
 * An empty patch that describes no changes.
 *
 * @since 1.0.0
 * @category patch
 */
export declare const empty: <Value, Patch>(self: Differ<Value, Patch>) => Patch;
/**
 * An empty patch that describes no changes.
 *
 * @since 1.0.0
 * @category patch
 */
export declare const diff: {
    <Value>(oldValue: Value, newValue: Value): <Patch>(differ: Differ<Value, Patch>) => Patch;
    <Value, Patch>(differ: Differ<Value, Patch>, oldValue: Value, newValue: Value): Patch;
};
/**
 * Combines two patches to produce a new patch that describes the updates of
 * the first patch and then the updates of the second patch. The combine
 * operation should be associative. In addition, if the combine operation is
 * commutative then joining multiple fibers concurrently will result in
 * deterministic `FiberRef` values.
 *
 * @since 1.0.0
 * @category patch
 */
export declare const combine: {
    <Patch>(first: Patch, second: Patch): <Value>(self: Differ<Value, Patch>) => Patch;
    <Value, Patch>(self: Differ<Value, Patch>, first: Patch, second: Patch): Patch;
};
/**
 * Applies a patch to an old value to produce a new value that is equal to the
 * old value with the updates described by the patch.
 *
 * @since 1.0.0
 * @category patch
 */
export declare const patch: {
    <Patch, Value>(patch: Patch, oldValue: Value): (self: Differ<Value, Patch>) => Value;
    <Patch, Value>(self: Differ<Value, Patch>, patch: Patch, oldValue: Value): Value;
};
/**
 * Constructs a new `Differ`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <Value, Patch>(params: {
    readonly empty: Patch;
    readonly diff: (oldValue: Value, newValue: Value) => Patch;
    readonly combine: (first: Patch, second: Patch) => Patch;
    readonly patch: (patch: Patch, oldValue: Value) => Value;
}) => Differ<Value, Patch>;
/**
 * Constructs a differ that knows how to diff `Env` values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const environment: <A>() => Differ<Context<A>, ContextPatch<A, A>>;
/**
 * Constructs a differ that knows how to diff a `Chunk` of values given a
 * differ that knows how to diff the values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const chunk: <Value, Patch>(differ: Differ<Value, Patch>) => Differ<Chunk<Value>, ChunkPatch<Value, Patch>>;
/**
 * Constructs a differ that knows how to diff a `HashMap` of keys and values given
 * a differ that knows how to diff the values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const hashMap: <Key, Value, Patch>(differ: Differ<Value, Patch>) => Differ<HashMap<Key, Value>, HashMapPatch<Key, Value, Patch>>;
/**
 * Constructs a differ that knows how to diff a `HashSet` of values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const hashSet: <Value>() => Differ<HashSet<Value>, HashSetPatch<Value>>;
/**
 * Combines this differ and the specified differ to produce a differ that
 * knows how to diff the sum of their values.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const orElseResult: {
    <Value2, Patch2>(that: Differ<Value2, Patch2>): <Value, Patch>(self: Differ<Value, Patch>) => Differ<Either<Value, Value2>, OrPatch<Value, Value2, Patch, Patch2>>;
    <Value, Patch, Value2, Patch2>(self: Differ<Value, Patch>, that: Differ<Value2, Patch2>): Differ<Either<Value, Value2>, OrPatch<Value, Value2, Patch, Patch2>>;
};
/**
 * Transforms the type of values that this differ knows how to differ using
 * the specified functions that map the new and old value types to each other.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const transform: {
    <Value, Value2>(f: (value: Value) => Value2, g: (value: Value2) => Value): <Patch>(self: Differ<Value, Patch>) => Differ<Value2, Patch>;
    <Value, Patch, Value2>(self: Differ<Value, Patch>, f: (value: Value) => Value2, g: (value: Value2) => Value): Differ<Value2, Patch>;
};
/**
 * Constructs a differ that just diffs two values by returning a function that
 * sets the value to the new value. This differ does not support combining
 * multiple updates to the value compositionally and should only be used when
 * there is no compositional way to update them.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const update: <A>() => Differ<A, (a: A) => A>;
/**
 * A variant of `update` that allows specifying the function that will be used
 * to combine old values with new values.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const updateWith: <A>(f: (x: A, y: A) => A) => Differ<A, (a: A) => A>;
/**
 * Combines this differ and the specified differ to produce a new differ that
 * knows how to diff the product of their values.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const zip: {
    <Value2, Patch2>(that: Differ<Value2, Patch2>): <Value, Patch>(self: Differ<Value, Patch>) => Differ<readonly [Value, Value2], readonly [Patch, Patch2]>;
    <Value, Patch, Value2, Patch2>(self: Differ<Value, Patch>, that: Differ<Value2, Patch2>): Differ<readonly [Value, Value2], readonly [Patch, Patch2]>;
};
export {};
//# sourceMappingURL=Differ.d.ts.map