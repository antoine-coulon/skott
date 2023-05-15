import * as monoid from "@effect/data/typeclass/Monoid";
import * as order from "@effect/data/typeclass/Order";
import * as semigroup from "@effect/data/typeclass/Semigroup";
/**
 * `Monoid` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const min = B => monoid.fromSemigroup(semigroup.min(B), B.maxBound);
/**
 * `Monoid` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const max = B => monoid.fromSemigroup(semigroup.max(B), B.minBound);
/**
 * @category instances
 * @since 1.0.0
 */
export const number = {
  compare: order.number.compare,
  maxBound: Infinity,
  minBound: -Infinity
};
/**
 * Checks if a value is between the lower and upper limit of a bound.
 *
 * @category predicates
 * @since 1.0.0
 */
export const between = B => order.between(B)(B.minBound, B.maxBound);
/**
 * Clamp a value between `minBound` and `maxBound` values.
 *
 * @category utils
 * @since 1.0.0
 */
export const clamp = B => order.clamp(B)(B.minBound, B.maxBound);
/**
 * Reverses the `Order` of a `Bounded` and flips `maxBound` and `minBound` values.
 *
 * @category utils
 * @since 1.0.0
 */
export const reverse = B => ({
  ...order.reverse(B),
  minBound: B.maxBound,
  maxBound: B.minBound
});
//# sourceMappingURL=Bounded.mjs.map