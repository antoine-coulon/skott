/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Effect from "@effect/io/Effect";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const RandomTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type RandomTypeId = typeof RandomTypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface Random {
    readonly [RandomTypeId]: RandomTypeId;
    /**
     * Returns the next numeric value from the pseudo-random number generator.
     */
    next(): Effect.Effect<never, never, number>;
    /**
     * Returns the next boolean value from the pseudo-random number generator.
     */
    nextBoolean(): Effect.Effect<never, never, boolean>;
    /**
     * Returns the next integer value from the pseudo-random number generator.
     */
    nextInt(): Effect.Effect<never, never, number>;
    /**
     * Returns the next numeric value in the specified range from the
     * pseudo-random number generator.
     */
    nextRange(min: number, max: number): Effect.Effect<never, never, number>;
    /**
     * Returns the next integer value in the specified range from the
     * pseudo-random number generator.
     */
    nextIntBetween(min: number, max: number): Effect.Effect<never, never, number>;
    /**
     * Uses the pseudo-random number generator to shuffle the specified iterable.
     */
    shuffle<A>(elements: Iterable<A>): Effect.Effect<never, never, Chunk.Chunk<A>>;
}
/**
 * Returns the next numeric value from the pseudo-random number generator.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const next: (_: void) => Effect.Effect<never, never, number>;
/**
 * Returns the next integer value from the pseudo-random number generator.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const nextInt: (_: void) => Effect.Effect<never, never, number>;
/**
 * Returns the next boolean value from the pseudo-random number generator.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const nextBoolean: (_: void) => Effect.Effect<never, never, boolean>;
/**
 * Returns the next numeric value in the specified range from the
 * pseudo-random number generator.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const nextRange: (min: number, max: number) => Effect.Effect<never, never, number>;
/**
 * Returns the next integer value in the specified range from the
 * pseudo-random number generator.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const nextIntBetween: (min: number, max: number) => Effect.Effect<never, never, number>;
/**
 * Uses the pseudo-random number generator to shuffle the specified iterable.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const shuffle: <A>(elements: Iterable<A>) => Effect.Effect<never, never, Chunk.Chunk<A>>;
/**
 * Retreives the `Random` service from the context and uses it to run the
 * specified workflow.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const randomWith: <R, E, A>(f: (random: Random) => Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>;
//# sourceMappingURL=Random.d.ts.map