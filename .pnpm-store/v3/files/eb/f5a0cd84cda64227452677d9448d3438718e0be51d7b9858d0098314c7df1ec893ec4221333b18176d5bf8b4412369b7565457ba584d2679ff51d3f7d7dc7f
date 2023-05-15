/**
 * @since 1.0.0
 */
import { dual, identity, SK } from "@effect/data/Function";
import * as semigroup from "@effect/data/typeclass/Semigroup";
/**
 * Lift a `Semigroup` into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const getSemigroup = F => S => semigroup.make((self, that) => F.map(F.product(self, that), ([a1, a2]) => S.combine(a1, a2)), (self, collection) => F.map(F.productMany(self, collection), ([head, ...tail]) => S.combineMany(head, tail)));
/**
 * Zips two `F` values together using a provided function, returning a new `F` of the result.
 *
 * @param self - The left-hand side of the zip operation
 * @param that - The right-hand side of the zip operation
 * @param f - The function used to combine the values of the two `Option`s
 *
 * @since 1.0.0
 */
export const zipWith = F => dual(3, (self, that, f) => F.map(F.product(self, that), ([a, b]) => f(a, b)));
/**
 * @since 1.0.0
 */
export const ap = F => dual(2, (self, that) => zipWith(F)(self, that, (f, a) => f(a)));
/**
 * @since 1.0.0
 */
export const andThenDiscard = F => dual(2, (self, that) => zipWith(F)(self, that, identity));
/**
 * @since 1.0.0
 */
export const andThen = F => dual(2, (self, that) => zipWith(F)(self, that, SK));
/**
 * Lifts a binary function into `F`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2 = F => f => dual(2, (self, that) => zipWith(F)(self, that, f));
//# sourceMappingURL=SemiApplicative.mjs.map