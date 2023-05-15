"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sumAll = exports.sum = exports.subtract = exports.sign = exports.multiplyAll = exports.multiply = exports.min = exports.max = exports.lessThanOrEqualTo = exports.lessThan = exports.isBigint = exports.increment = exports.greaterThanOrEqualTo = exports.greaterThan = exports.divide = exports.decrement = exports.clamp = exports.between = exports.SemigroupSum = exports.SemigroupMultiply = exports.SemigroupMin = exports.SemigroupMax = exports.Order = exports.MonoidSum = exports.MonoidMultiply = exports.Equivalence = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var predicate = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Predicate"));
var equivalence = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Equivalence"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * This module provides utility functions and type class instances for working with the `bigint` type in TypeScript.
 * It includes functions for basic arithmetic operations, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */

/**
 * Tests if a value is a `bigint`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isBigint } from "@effect/data/Bigint"
 *
 * assert.deepStrictEqual(isBigint(1n), true)
 * assert.deepStrictEqual(isBigint(1), false)
 *
 * @category guards
 * @since 1.0.0
 */
const isBigint = predicate.isBigint;
/**
 * Provides an addition operation on `bigint`s.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { sum } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(sum(2n, 3n), 5n)
 *
 * @category math
 * @since 1.0.0
 */
exports.isBigint = isBigint;
const sum = /*#__PURE__*/(0, _Function.dual)(2, semigroup.bigintSum.combine);
/**
 * Provides a multiplication operation on `bigint`s.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { multiply } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(multiply(2n, 3n), 6n)
 *
 * @category math
 * @since 1.0.0
 */
exports.sum = sum;
const multiply = /*#__PURE__*/(0, _Function.dual)(2, semigroup.bigintMultiply.combine);
/**
 * Provides a subtraction operation on `bigint`s.
 *
 * @param self - The first operand.
 * @param that - The second operand.
 *
 * @example
 * import { subtract } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(subtract(2n, 3n), -1n)
 *
 * @category math
 * @since 1.0.0
 */
exports.multiply = multiply;
const subtract = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => self - that);
/**
 * Provides a division operation on `bigint`s.
 *
 * If the dividend is not a multiple of the divisor the result will be a `bigint` value
 * which represents the integer division rounded down to the nearest integer.
 *
 * @param self - The dividend operand.
 * @param that - The divisor operand.
 *
 * @example
 * import { divide } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(divide(6n, 3n), 2n)
 * assert.deepStrictEqual(divide(6n, 4n), 1n)
 *
 * @category math
 * @since 1.0.0
 * @since 1.0.0
 */
exports.subtract = subtract;
const divide = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => self / that);
/**
 * Returns the result of adding `1n` to a given number.
 *
 * @param n - A `bigint` to be incremented.
 *
 * @example
 * import { increment } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(increment(2n), 3n)
 *
 * @category math
 * @since 1.0.0
 */
exports.divide = divide;
const increment = n => n + 1n;
/**
 * Decrements a number by `1n`.
 *
 * @param n - A `bigint` to be decremented.
 *
 * @example
 * import { decrement } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(decrement(3n), 2n)
 *
 * @category math
 * @since 1.0.0
 */
exports.increment = increment;
const decrement = n => n - 1n;
/**
 * @category instances
 * @since 1.0.0
 */
exports.decrement = decrement;
const Equivalence = equivalence.bigint;
/**
 * @category instances
 * @since 1.0.0
 */
exports.Equivalence = Equivalence;
const Order = order.bigint;
/**
 * Returns `true` if the first argument is less than the second, otherwise `false`.
 *
 * @param self - The first argument.
 * @param that - The second argument.
 *
 * @example
 * import { lessThan } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(lessThan(2n, 3n), true)
 * assert.deepStrictEqual(lessThan(3n, 3n), false)
 * assert.deepStrictEqual(lessThan(4n, 3n), false)
 *
 * @category predicates
 * @since 1.0.0
 */
exports.Order = Order;
const lessThan = /*#__PURE__*/order.lessThan(Order);
/**
 * Returns a function that checks if a given `bigint` is less than or equal to the provided one.
 *
 * @param self - The first `bigint` to compare with.
 * @param that - The second `bigint` to compare with.
 *
 * @example
 * import { lessThanOrEqualTo } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(lessThanOrEqualTo(2n, 3n), true)
 * assert.deepStrictEqual(lessThanOrEqualTo(3n, 3n), true)
 * assert.deepStrictEqual(lessThanOrEqualTo(4n, 3n), false)
 *
 * @category predicates
 * @since 1.0.0
 */
exports.lessThan = lessThan;
const lessThanOrEqualTo = /*#__PURE__*/order.lessThanOrEqualTo(Order);
/**
 * Returns `true` if the first argument is greater than the second, otherwise `false`.
 *
 * @param self - The first argument.
 * @param that - The second argument.
 *
 * @example
 * import { greaterThan } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(greaterThan(2n, 3n), false)
 * assert.deepStrictEqual(greaterThan(3n, 3n), false)
 * assert.deepStrictEqual(greaterThan(4n, 3n), true)
 *
 * @category predicates
 * @since 1.0.0
 */
exports.lessThanOrEqualTo = lessThanOrEqualTo;
const greaterThan = /*#__PURE__*/order.greaterThan(Order);
/**
 * Returns a function that checks if a given `bigint` is greater than or equal to the provided one.
 *
 * @param self - The first `bigint` to compare with.
 * @param that - The second `bigint` to compare with.
 *
 * @example
 * import { greaterThanOrEqualTo } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(greaterThanOrEqualTo(2n, 3n), false)
 * assert.deepStrictEqual(greaterThanOrEqualTo(3n, 3n), true)
 * assert.deepStrictEqual(greaterThanOrEqualTo(4n, 3n), true)
 *
 * @category predicates
 * @since 1.0.0
 */
exports.greaterThan = greaterThan;
const greaterThanOrEqualTo = /*#__PURE__*/order.greaterThanOrEqualTo(Order);
/**
 * Checks if a `bigint` is between a `minimum` and `maximum` value (inclusive).
 *
 * @param self - The `number` to check.
 * @param minimum - The `minimum` value to check.
 * @param maximum - The `maximum` value to check.
 *
 * @example
 * import { between } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(between(0n, 5n)(3n), true)
 * assert.deepStrictEqual(between(0n, 5n)(-1n), false)
 * assert.deepStrictEqual(between(0n, 5n)(6n), false)
 *
 * @category predicates
 * @since 1.0.0
 */
exports.greaterThanOrEqualTo = greaterThanOrEqualTo;
const between = /*#__PURE__*/order.between(Order);
/**
 * Restricts the given `bigint` to be within the range specified by the `minimum` and `maximum` values.
 *
 * - If the `bigint` is less than the `minimum` value, the function returns the `minimum` value.
 * - If the `bigint` is greater than the `maximum` value, the function returns the `maximum` value.
 * - Otherwise, it returns the original `bigint`.
 *
 * @param self - The `bigint` to be clamped.
 * @param minimum - The lower end of the range.
 * @param maximum - The upper end of the range.
 *
 * @example
 * import { clamp } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(clamp(0n, 5n)(3n), 3n)
 * assert.deepStrictEqual(clamp(0n, 5n)(-1n), 0n)
 * assert.deepStrictEqual(clamp(0n, 5n)(6n), 5n)
 *
 * @since 1.0.0
 */
exports.between = between;
const clamp = /*#__PURE__*/order.clamp(Order);
/**
 * Returns the minimum between two `bigint`s.
 *
 * @param self - The first `bigint`.
 * @param that - The second `bigint`.
 *
 * @example
 * import { min } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(min(2n, 3n), 2n)
 *
 * @since 1.0.0
 */
exports.clamp = clamp;
const min = /*#__PURE__*/order.min(Order);
/**
 * Returns the maximum between two `bigint`s.
 *
 * @param self - The first `bigint`.
 * @param that - The second `bigint`.
 *
 * @example
 * import { max } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(max(2n, 3n), 3n)
 *
 * @since 1.0.0
 */
exports.min = min;
const max = /*#__PURE__*/order.max(Order);
/**
 * `bigint` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(SemigroupSum.combine(2n, 3n), 5n)
 *
 * @category instances
 * @since 1.0.0
 */
exports.max = max;
const SemigroupSum = semigroup.bigintSum;
/**
 * `bigint` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupSum = SemigroupSum;
const SemigroupMultiply = semigroup.bigintMultiply;
/**
 * A `Semigroup` that uses the minimum between two values.
 *
 * @example
 * import { SemigroupMin } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(SemigroupMin.combine(2n, 3n), 2n)
 *
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupMultiply = SemigroupMultiply;
const SemigroupMin = /*#__PURE__*/semigroup.min(Order);
/**
 * A `Semigroup` that uses the maximum between two values.
 *
 * @example
 * import { SemigroupMax } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(SemigroupMax.combine(2n, 3n), 3n)
 *
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupMin = SemigroupMin;
const SemigroupMax = /*#__PURE__*/semigroup.max(Order);
/**
 * `bigint` monoid under addition.
 *
 * The `empty` value is `0n`.
 *
 * @example
 * import { MonoidSum } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(MonoidSum.combine(2n, 3n), 5n)
 * assert.deepStrictEqual(MonoidSum.combine(2n, MonoidSum.empty), 2n)
 *
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupMax = SemigroupMax;
const MonoidSum = monoid.bigintSum;
/**
 * `bigint` monoid under multiplication.
 *
 * The `empty` value is `1n`.
 *
 * @example
 * import { MonoidMultiply } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(MonoidMultiply.combine(2n, 3n), 6n)
 * assert.deepStrictEqual(MonoidMultiply.combine(2n, MonoidMultiply.empty), 2n)
 *
 * @category instances
 * @since 1.0.0
 */
exports.MonoidSum = MonoidSum;
const MonoidMultiply = monoid.bigintMultiply;
/**
 * Determines the sign of a given `bigint`.
 *
 * @param n - The `bigint` to determine the sign of.
 *
 * @example
 * import { sign } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(sign(-5n), -1)
 * assert.deepStrictEqual(sign(0n), 0)
 * assert.deepStrictEqual(sign(5n), 1)
 *
 * @category math
 * @since 1.0.0
 */
exports.MonoidMultiply = MonoidMultiply;
const sign = n => Order.compare(n, 0n);
/**
 * Takes an `Iterable` of `bigint`s and returns their sum as a single `bigint
 *
 * @param collection - The collection of `bigint`s to sum.
 *
 * @example
 * import { sumAll } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(sumAll([2n, 3n, 4n]), 9n)
 *
 * @category math
 * @since 1.0.0
 */
exports.sign = sign;
const sumAll = MonoidSum.combineAll;
/**
 * Takes an `Iterable` of `bigint`s and returns their multiplication as a single `number`.
 *
 * @param collection - The collection of `bigint`s to multiply.
 *
 * @example
 * import { multiplyAll } from '@effect/data/Bigint'
 *
 * assert.deepStrictEqual(multiplyAll([2n, 3n, 4n]), 24n)
 *
 * @category math
 * @since 1.0.0
 */
exports.sumAll = sumAll;
const multiplyAll = MonoidMultiply.combineAll;
exports.multiplyAll = multiplyAll;
//# sourceMappingURL=Bigint.js.map