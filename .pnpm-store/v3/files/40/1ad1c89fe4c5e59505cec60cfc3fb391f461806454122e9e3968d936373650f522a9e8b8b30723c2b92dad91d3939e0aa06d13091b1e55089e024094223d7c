import type { Ordering } from "@effect/data/Ordering";
import * as bounded from "@effect/data/typeclass/Bounded";
import * as equivalence from "@effect/data/typeclass/Equivalence";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as order from "@effect/data/typeclass/Order";
import * as semigroup from "@effect/data/typeclass/Semigroup";
/**
 * Tests if a value is a `number`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isNumber } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(isNumber(2), true)
 * assert.deepStrictEqual(isNumber("2"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isNumber: (input: unknown) => input is number;
/**
 * Provides an addition operation on `number`s.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { sum } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(sum(2, 3), 5)
 *
 * @category math
 * @since 1.0.0
 */
export declare const sum: {
    (that: number): (self: number) => number;
    (self: number, that: number): number;
};
/**
 * Provides a multiplication operation on `number`s.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { multiply } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(multiply(2, 3), 6)
 *
 * @category math
 * @since 1.0.0
 */
export declare const multiply: {
    (that: number): (self: number) => number;
    (self: number, that: number): number;
};
/**
 * Provides a subtraction operation on `number`s.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { subtract } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(subtract(2, 3), -1)
 *
 * @category math
 * @since 1.0.0
 */
export declare const subtract: {
    (that: number): (self: number) => number;
    (self: number, that: number): number;
};
/**
 * Provides a division operation on `number`s.
 *
 * @param self - The dividend operand.
 * @param that - The divisor operand.
 *
 * @example
 * import { divide } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(divide(6, 3), 2)
 *
 * @category math
 * @since 1.0.0
 */
export declare const divide: {
    (that: number): (self: number) => number;
    (self: number, that: number): number;
};
/**
 * Returns the result of adding `1` to a given number.
 *
 * @param n - A `number` to be incremented.
 *
 * @example
 * import { increment } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(increment(2), 3)
 *
 * @category math
 * @since 1.0.0
 */
export declare const increment: (n: number) => number;
/**
 * Decrements a number by `1`.
 *
 * @param n - A `number` to be decremented.
 *
 * @example
 * import { decrement } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(decrement(3), 2)
 *
 * @category math
 * @since 1.0.0
 */
export declare const decrement: (n: number) => number;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Equivalence: equivalence.Equivalence<number>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Order: order.Order<number>;
/**
 * Returns `true` if the first argument is less than the second, otherwise `false`.
 *
 * @param self - The first argument.
 * @param that - The second argument.
 *
 * @example
 * import { lessThan } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(lessThan(2, 3), true)
 * assert.deepStrictEqual(lessThan(3, 3), false)
 * assert.deepStrictEqual(lessThan(4, 3), false)
 *
 * @category predicates
 * @since 1.0.0
 */
export declare const lessThan: {
    (that: number): (self: number) => boolean;
    (self: number, that: number): boolean;
};
/**
 * Returns a function that checks if a given `number` is less than or equal to the provided one.
 *
 * @param self - The first `number` to compare with.
 * @param that - The second `number` to compare with.
 *
 * @example
 * import { lessThanOrEqualTo } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(lessThanOrEqualTo(2, 3), true)
 * assert.deepStrictEqual(lessThanOrEqualTo(3, 3), true)
 * assert.deepStrictEqual(lessThanOrEqualTo(4, 3), false)
 *
 * @category predicates
 * @since 1.0.0
 */
export declare const lessThanOrEqualTo: {
    (that: number): (self: number) => boolean;
    (self: number, that: number): boolean;
};
/**
 * Returns `true` if the first argument is greater than the second, otherwise `false`.
 *
 * @param self - The first argument.
 * @param that - The second argument.
 *
 * @example
 * import { greaterThan } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(greaterThan(2, 3), false)
 * assert.deepStrictEqual(greaterThan(3, 3), false)
 * assert.deepStrictEqual(greaterThan(4, 3), true)
 *
 * @category predicates
 * @since 1.0.0
 */
export declare const greaterThan: {
    (that: number): (self: number) => boolean;
    (self: number, that: number): boolean;
};
/**
 * Returns a function that checks if a given `number` is greater than or equal to the provided one.
 *
 * @param self - The first `number` to compare with.
 * @param that - The second `number` to compare with.
 *
 * @example
 * import { greaterThanOrEqualTo } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(greaterThanOrEqualTo(2, 3), false)
 * assert.deepStrictEqual(greaterThanOrEqualTo(3, 3), true)
 * assert.deepStrictEqual(greaterThanOrEqualTo(4, 3), true)
 *
 * @category predicates
 * @since 1.0.0
 */
export declare const greaterThanOrEqualTo: {
    (that: number): (self: number) => boolean;
    (self: number, that: number): boolean;
};
/**
 * Checks if a `number` is between a `minimum` and `maximum` value (inclusive).
 *
 * @param self - The `number` to check.
 * @param minimum - The `minimum` value to check.
 * @param maximum - The `maximum` value to check.
 *
 * @example
 * import { between } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(between(0, 5)(3), true)
 * assert.deepStrictEqual(between(0, 5)(-1), false)
 * assert.deepStrictEqual(between(0, 5)(6), false)
 *
 * @category predicates
 * @since 1.0.0
 */
export declare const between: {
    (minimum: number, maximum: number): (self: number) => boolean;
    (self: number, minimum: number, maximum: number): boolean;
};
/**
 * Restricts the given `number` to be within the range specified by the `minimum` and `maximum` values.
 *
 * - If the `number` is less than the `minimum` value, the function returns the `minimum` value.
 * - If the `number` is greater than the `maximum` value, the function returns the `maximum` value.
 * - Otherwise, it returns the original `number`.
 *
 * @param self - The `number` to be clamped.
 * @param minimum - The lower end of the range.
 * @param maximum - The upper end of the range.
 *
 * @example
 * import { clamp } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(clamp(0, 5)(3), 3)
 * assert.deepStrictEqual(clamp(0, 5)(-1), 0)
 * assert.deepStrictEqual(clamp(0, 5)(6), 5)
 *
 * @since 1.0.0
 */
export declare const clamp: {
    (minimum: number, maximum: number): (self: number) => number;
    (self: number, minimum: number, maximum: number): number;
};
/**
 * Returns the minimum between two `number`s.
 *
 * @param self - The first `number`.
 * @param that - The second `number`.
 *
 * @example
 * import { min } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(min(2, 3), 2)
 *
 * @since 1.0.0
 */
export declare const min: {
    (that: number): (self: number) => number;
    (self: number, that: number): number;
};
/**
 * Returns the maximum between two `number`s.
 *
 * @param self - The first `number`.
 * @param that - The second `number`.
 *
 * @example
 * import { max } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(max(2, 3), 3)
 *
 * @since 1.0.0
 */
export declare const max: {
    (that: number): (self: number) => number;
    (self: number, that: number): number;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Bounded: bounded.Bounded<number>;
/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(SemigroupSum.combine(2, 3), 5)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const SemigroupSum: semigroup.Semigroup<number>;
/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupMultiply } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(SemigroupMultiply.combine(2, 3), 6)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const SemigroupMultiply: semigroup.Semigroup<number>;
/**
 * A `Semigroup` that uses the minimum between two values.
 *
 * @example
 * import { SemigroupMin } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(SemigroupMin.combine(2, 3), 2)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const SemigroupMin: semigroup.Semigroup<number>;
/**
 * A `Semigroup` that uses the maximum between two values.
 *
 * @example
 * import { SemigroupMax } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(SemigroupMax.combine(2, 3), 3)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const SemigroupMax: semigroup.Semigroup<number>;
/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { MonoidSum } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(MonoidSum.combine(2, 3), 5)
 * assert.deepStrictEqual(MonoidSum.combine(2, MonoidSum.empty), 2)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const MonoidSum: monoid.Monoid<number>;
/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @example
 * import { MonoidMultiply } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(MonoidMultiply.combine(2, 3), 6)
 * assert.deepStrictEqual(MonoidMultiply.combine(2, MonoidMultiply.empty), 2)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const MonoidMultiply: monoid.Monoid<number>;
/**
 * A `Monoid` that uses the minimum between two values.
 *
 * The `empty` value is `-Infinity`.
 *
 * @example
 * import { MonoidMin } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(MonoidMin.combine(2, 3), 2)
 * assert.deepStrictEqual(MonoidMin.combine(2, MonoidMin.empty), 2)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const MonoidMin: monoid.Monoid<number>;
/**
 * A `Monoid` that uses the maximum between two values.
 *
 * The `empty` value is `Infinity`.
 *
 * @example
 * import { MonoidMax } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(MonoidMax.combine(2, 3), 3)
 * assert.deepStrictEqual(MonoidMax.combine(2, MonoidMax.empty), 2)
 *
 * @category instances
 * @since 1.0.0
 */
export declare const MonoidMax: monoid.Monoid<number>;
/**
 * Determines the sign of a given `number`.
 *
 * @param n - The `number` to determine the sign of.
 *
 * @example
 * import { sign } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(sign(-5), -1)
 * assert.deepStrictEqual(sign(0), 0)
 * assert.deepStrictEqual(sign(5), 1)
 *
 * @category math
 * @since 1.0.0
 */
export declare const sign: (n: number) => Ordering;
/**
 * Takes an `Iterable` of `number`s and returns their sum as a single `number`.
 *
 * @param collection - The collection of `number`s to sum.
 *
 * @example
 * import { sumAll } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(sumAll([2, 3, 4]), 9)
 *
 * @category math
 * @since 1.0.0
 */
export declare const sumAll: (collection: Iterable<number>) => number;
/**
 * Takes an `Iterable` of `number`s and returns their multiplication as a single `number`.
 *
 * @param collection - The collection of `number`s to multiply.
 *
 * @example
 * import { multiplyAll } from '@effect/data/Number'
 *
 * assert.deepStrictEqual(multiplyAll([2, 3, 4]), 24)
 *
 * @category math
 * @since 1.0.0
 */
export declare const multiplyAll: (collection: Iterable<number>) => number;
/**
 * Returns the remainder left over when one operand is divided by a second operand.
 *
 * It always takes the sign of the dividend.
 *
 * @param self - The dividend.
 * @param divisor - The divisor.
 *
 * @example
 * import { remainder } from "@effect/data/Number"
 *
 * assert.deepStrictEqual(remainder(2, 2), 0)
 * assert.deepStrictEqual(remainder(3, 2), 1)
 * assert.deepStrictEqual(remainder(-4, 2), -0)
 *
 * @category math
 * @since 1.0.0
 */
export declare const remainder: {
    (divisor: number): (self: number) => number;
    (self: number, divisor: number): number;
};
//# sourceMappingURL=Number.d.ts.map