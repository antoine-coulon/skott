/**
 * @since 1.0.0
 */
import type { LazyArg } from "@effect/data/Function";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as semigroup from "@effect/data/typeclass/Semigroup";
/**
 * @category model
 * @since 1.0.0
 */
export type Ordering = -1 | 0 | 1;
/**
 * Inverts the ordering of the input `Ordering`.
 *
 * @param o - The input `Ordering`.
 *
 * @example
 * import { reverse } from "@effect/data/Ordering"
 *
 * assert.deepStrictEqual(reverse(1), -1)
 * assert.deepStrictEqual(reverse(-1), 1)
 * assert.deepStrictEqual(reverse(0), 0)
 *
 * @since 1.0.0
 */
export declare const reverse: (o: Ordering) => Ordering;
/**
 * Depending on the `Ordering` parameter given to it, returns a value produced by one of the 3 functions provided as parameters.
 *
 * @param self - The `Ordering` parameter to match against.
 * @param onLessThan - A function that will be called if the `Ordering` parameter is `-1`.
 * @param onEqual - A function that will be called if the `Ordering` parameter is `0`.
 * @param onGreaterThan - A function that will be called if the `Ordering` parameter is `1`.
 *
 * @example
 * import { match } from "@effect/data/Ordering"
 * import { constant } from "@effect/data/Function"
 *
 * const toMessage = match(
 *   constant('less than'),
 *   constant('equal'),
 *   constant('greater than')
 * )
 *
 * assert.deepStrictEqual(toMessage(-1), "less than")
 * assert.deepStrictEqual(toMessage(0), "equal")
 * assert.deepStrictEqual(toMessage(1), "greater than")
 *
 * @category pattern matching
 * @since 1.0.0
 */
export declare const match: {
    <A, B, C = B>(onLessThan: LazyArg<A>, onEqual: LazyArg<B>, onGreaterThan: LazyArg<C>): (self: Ordering) => A | B | C;
    <A, B, C = B>(o: Ordering, onLessThan: LazyArg<A>, onEqual: LazyArg<B>, onGreaterThan: LazyArg<C>): A | B | C;
};
/**
 * `Semigroup` instance for `Ordering`, returns the left-most non-zero `Ordering`.
 *
 * @example
 * import { Semigroup } from "@effect/data/Ordering"
 *
 * assert.deepStrictEqual(Semigroup.combine(0, -1), -1)
 * assert.deepStrictEqual(Semigroup.combine(0, 1), 1)
 * assert.deepStrictEqual(Semigroup.combine(1, -1), 1)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const Semigroup: semigroup.Semigroup<Ordering>;
/**
 * `Monoid` instance for `Ordering`, returns the left-most non-zero `Ordering`.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { Monoid } from "@effect/data/Ordering"
 *
 * assert.deepStrictEqual(Monoid.combine(Monoid.empty, -1), -1)
 * assert.deepStrictEqual(Monoid.combine(Monoid.empty, 1), 1)
 * assert.deepStrictEqual(Monoid.combine(1, -1), 1)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const Monoid: monoid.Monoid<Ordering>;
//# sourceMappingURL=Ordering.d.ts.map