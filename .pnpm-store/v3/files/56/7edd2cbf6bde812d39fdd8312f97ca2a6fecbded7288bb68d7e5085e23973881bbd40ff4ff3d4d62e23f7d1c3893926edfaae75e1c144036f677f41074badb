import * as internal from "@effect/io/internal_effect_untraced/pool";
/**
 * @since 1.0.0
 * @category symbols
 */
export const PoolTypeId = internal.PoolTypeId;
/**
 * Returns `true` if the specified value is a `Pool`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isPool = internal.isPool;
/**
 * Makes a new pool of the specified fixed size. The pool is returned in a
 * `Scope`, which governs the lifetime of the pool. When the pool is shutdown
 * because the `Scope` is closed, the individual items allocated by the pool
 * will be released in some unspecified order.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = internal.make;
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
export const makeWithTTL = internal.makeWithTTL;
/**
 * Retrieves an item from the pool in a scoped effect. Note that if
 * acquisition fails, then the returned effect will fail for that same reason.
 * Retrying a failed acquisition attempt will repeat the acquisition attempt.
 *
 * @since 1.0.0
 * @category getters
 */
export const get = internal.get;
/**
 * Invalidates the specified item. This will cause the pool to eventually
 * reallocate the item, although this reallocation may occur lazily rather
 * than eagerly.
 *
 * @since 1.0.0
 * @category combinators
 */
export const invalidate = internal.invalidate;
//# sourceMappingURL=Pool.mjs.map