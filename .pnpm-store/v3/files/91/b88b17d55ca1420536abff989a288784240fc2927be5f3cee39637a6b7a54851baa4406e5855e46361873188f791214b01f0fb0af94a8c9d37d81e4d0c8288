/**
 * @since 1.0.0
 */
import type * as Data from "@effect/data/Data";
import type * as Duration from "@effect/data/Duration";
import type * as Effect from "@effect/io/Effect";
import type * as Scope from "@effect/io/Scope";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const PoolTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type PoolTypeId = typeof PoolTypeId;
/**
 * A `Pool<E, A>` is a pool of items of type `A`, each of which may be
 * associated with the acquisition and release of resources. An attempt to get
 * an item `A` from a pool may fail with an error of type `E`.
 *
 * @since 1.0.0
 * @category models
 */
export interface Pool<E, A> extends Data.Case, Pool.Variance<E, A> {
    /**
     * Retrieves an item from the pool in a scoped effect. Note that if
     * acquisition fails, then the returned effect will fail for that same reason.
     * Retrying a failed acquisition attempt will repeat the acquisition attempt.
     */
    get(): Effect.Effect<Scope.Scope, E, A>;
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
export declare namespace Pool {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<E, A> {
        readonly [PoolTypeId]: {
            readonly _E: (_: never) => E;
            readonly _A: (_: never) => A;
        };
    }
}
/**
 * Returns `true` if the specified value is a `Pool`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export declare const isPool: (u: unknown) => u is Pool<unknown, unknown>;
/**
 * Makes a new pool of the specified fixed size. The pool is returned in a
 * `Scope`, which governs the lifetime of the pool. When the pool is shutdown
 * because the `Scope` is closed, the individual items allocated by the pool
 * will be released in some unspecified order.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <R, E, A>(get: Effect.Effect<R, E, A>, size: number) => Effect.Effect<Scope.Scope | R, never, Pool<E, A>>;
/**
 * Makes a new pool with the specified minimum and maximum sizes and time to
 * live before a pool whose excess items are not being used will be shrunk
 * down to the minimum size. The pool is returned in a `Scope`, which governs
 * the lifetime of the pool. When the pool is shutdown because the `Scope` is
 * used, the individual items allocated by the pool will be released in some
 * unspecified order.
 *
 * ```ts
 * import * as Duration from "@effect/data/Duration"
 * import * as Effect from "@effect/io/Effect"
 * import * as Pool from "@effect/io/Pool"
 * import * as Scope from "@effect/io/Scope"
 * import { pipe } from "@effect/data/Function"
 *
 * Effect.scoped(
 *   pipe(
 *     Pool.make(acquireDbConnection, 10, 20, Duration.seconds(60)),
 *     Effect.flatMap((pool) =>
 *       Effect.scoped(
 *         pipe(
 *           pool.get(),
 *           Effect.flatMap((connection) => useConnection(connection))
 *         )
 *       )
 *     )
 *   )
 * )
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const makeWithTTL: <R, E, A>(get: Effect.Effect<R, E, A>, min: number, max: number, timeToLive: Duration.Duration) => Effect.Effect<Scope.Scope | R, never, Pool<E, A>>;
/**
 * Retrieves an item from the pool in a scoped effect. Note that if
 * acquisition fails, then the returned effect will fail for that same reason.
 * Retrying a failed acquisition attempt will repeat the acquisition attempt.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const get: <E, A>(self: Pool<E, A>) => Effect.Effect<Scope.Scope, E, A>;
/**
 * Invalidates the specified item. This will cause the pool to eventually
 * reallocate the item, although this reallocation may occur lazily rather
 * than eagerly.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const invalidate: {
    <A>(value: A): <E>(self: Pool<E, A>) => Effect.Effect<Scope.Scope, never, void>;
    <E, A>(self: Pool<E, A>, value: A): Effect.Effect<Scope.Scope, never, void>;
};
//# sourceMappingURL=Pool.d.ts.map