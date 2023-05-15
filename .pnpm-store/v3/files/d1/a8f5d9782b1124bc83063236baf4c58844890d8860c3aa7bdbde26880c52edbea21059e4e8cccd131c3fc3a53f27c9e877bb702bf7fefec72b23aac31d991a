/**
 * @since 1.0.0
 */
import * as Hash from "@effect/data/Hash";
import type { Equivalence } from "@effect/data/typeclass/Equivalence";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const symbol: unique symbol;
/**
 * @since 1.0.0
 * @category models
 */
export interface Equal extends Hash.Hash {
    [symbol](that: Equal): boolean;
}
/**
 * @since 1.0.0
 * @category equality
 */
export declare function equals<B>(that: B): <A>(self: A) => boolean;
/**
 * @since 1.0.0
 * @category equality
 */
export declare function equals<A, B>(self: A, that: B): boolean;
/**
 * @since 1.0.0
 * @category guards
 */
export declare const isEqual: (u: unknown) => u is Equal;
/**
 * @since 1.0.0
 * @category instances
 */
export declare const equivalence: <A>() => Equivalence<A>;
//# sourceMappingURL=Equal.d.ts.map