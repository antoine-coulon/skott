/**
 * @since 1.0.0
 */
import type * as Duration from "@effect/data/Duration";
import type * as Effect from "@effect/io/Effect";
import type * as Scope from "@effect/io/Scope";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const KeyedPoolTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type KeyedPoolTypeId = typeof KeyedPoolTypeId;
/**
 * A `KeyedPool<K, E, A>` is a pool of `Pool`s of items of type `A`. Each pool
 * in the `KeyedPool` is associated with a key of type `K`.
 *
 * @since 1.0.0
 * @category models
 */
export interface KeyedPool<K, E, A> extends KeyedPool.Variance<K, E, A> {
    /**
     * Retrieves an item from the pool belonging to the given key in a scoped
     * effect. Note that if acquisition fails, then the returned effect will fail
     * for that same reason. Retrying a failed acquisition attempt will repeat the
     * acquisition attempt.
     */
    get(key: K): Effect.Effect<Scope.Scope, E, A>;
    /**
     * Invalidates the specified item. This will cause the pool to eventually
     * reallocate the item, although this reallocation may occur lazily rather
     * than eagerly.
     */
    invalidate(item: A): Effect.Effect<never, never, void>;
}
/**
 * @since 1.0.0
 */
export declare namespace KeyedPool {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<K, E, A> {
        readonly [KeyedPoolTypeId]: {
            readonly _K: (_: K) => void;
            readonly _E: (_: never) => E;
            readonly _A: (_: never) => A;
        };
    }
}
/**
 * Makes a new pool of the specified fixed size. The pool is returned in a
 * `Scope`, which governs the lifetime of the pool. When the pool is shutdown
 * because the `Scope` is closed, the individual items allocated by the pool
 * will be released in some unspecified order.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const makeSized: <K, R, E, A>(get: (key: K) => Effect.Effect<R, E, A>, size: number) => Effect.Effect<Scope.Scope | R, never, KeyedPool<K, E, A>>;
/**
 * Makes a new pool of the specified fixed size. The pool is returned in a
 * `Scope`, which governs the lifetime of the pool. When the pool is shutdown
 * because the `Scope` is closed, the individual items allocated by the pool
 * will be released in some unspecified order.
 *
 * The size of the underlying pools can be configured per key.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const makeSizedWith: <K, R, E, A>(get: (key: K) => Effect.Effect<R, E, A>, size: (key: K) => number) => Effect.Effect<Scope.Scope | R, never, KeyedPool<K, E, A>>;
/**
 * Makes a new pool with the specified minimum and maximum sizes and time to
 * live before a pool whose excess items are not being used will be shrunk
 * down to the minimum size. The pool is returned in a `Scope`, which governs
 * the lifetime of the pool. When the pool is shutdown because the `Scope` is
 * used, the individual items allocated by the pool will be released in some
 * unspecified order.
 *
 * The size of the underlying pools can be configured per key.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const makeSizedWithTTL: <K, R, E, A>(get: (key: K) => Effect.Effect<R, E, A>, min: (key: K) => number, max: (key: K) => number, timeToLive: Duration.Duration) => Effect.Effect<Scope.Scope | R, never, KeyedPool<K, E, A>>;
/**
 * Makes a new pool with the specified minimum and maximum sizes and time to
 * live before a pool whose excess items are not being used will be shrunk
 * down to the minimum size. The pool is returned in a `Scope`, which governs
 * the lifetime of the pool. When the pool is shutdown because the `Scope` is
 * used, the individual items allocated by the pool will be released in some
 * unspecified order.
 *
 * The size of the underlying pools can be configured per key.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const makeSizedWithTTLBy: <K, R, E, A>(get: (key: K) => Effect.Effect<R, E, A>, min: (key: K) => number, max: (key: K) => number, timeToLive: (key: K) => Duration.Duration) => Effect.Effect<Scope.Scope | R, never, KeyedPool<K, E, A>>;
/**
 * Retrieves an item from the pool belonging to the given key in a scoped
 * effect. Note that if acquisition fails, then the returned effect will fail
 * for that same reason. Retrying a failed acquisition attempt will repeat the
 * acquisition attempt.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const get: {
    <K>(key: K): <E, A>(self: KeyedPool<K, E, A>) => Effect.Effect<Scope.Scope, E, A>;
    <K, E, A>(self: KeyedPool<K, E, A>, key: K): Effect.Effect<Scope.Scope, E, A>;
};
/**
 * Invalidates the specified item. This will cause the pool to eventually
 * reallocate the item, although this reallocation may occur lazily rather
 * than eagerly.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const invalidate: {
    <A>(item: A): <K, E>(self: KeyedPool<K, E, A>) => Effect.Effect<never, never, void>;
    <K, E, A>(self: KeyedPool<K, E, A>, item: A): Effect.Effect<never, never, void>;
};
//# sourceMappingURL=KeyedPool.d.ts.map