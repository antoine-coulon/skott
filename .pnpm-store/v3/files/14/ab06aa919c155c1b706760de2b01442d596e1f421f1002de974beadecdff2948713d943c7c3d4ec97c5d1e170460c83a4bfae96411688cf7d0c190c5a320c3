"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sumAll = exports.sum = exports.subtract = exports.sign = exports.remainder = exports.multiplyAll = exports.multiply = exports.min = exports.max = exports.lessThanOrEqualTo = exports.lessThan = exports.isNumber = exports.increment = exports.greaterThanOrEqualTo = exports.greaterThan = exports.divide = exports.decrement = exports.clamp = exports.between = exports.SemigroupSum = exports.SemigroupMultiply = exports.SemigroupMin = exports.SemigroupMax = exports.Order = exports.MonoidSum = exports.MonoidMultiply = exports.MonoidMin = exports.MonoidMax = exports.Equivalence = exports.Bounded = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var predicate = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Predicate"));
var bounded = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Bounded"));
var equivalence = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Equivalence"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * This module provides utility functions and type class instances for working with the `number` type in TypeScript.
 * It includes functions for basic arithmetic operations, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */

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
const isNumber = predicate.isNumber;
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
exports.isNumber = isNumber;
const sum = /*#__PURE__*/(0, _Function.dual)(2, semigroup.numberSum.combine);
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
exports.sum = sum;
const multiply = /*#__PURE__*/(0, _Function.dual)(2, semigroup.numberMultiply.combine);
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
exports.multiply = multiply;
const subtract = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => self - that);
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
exports.subtract = subtract;
const divide = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => self / that);
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
exports.divide = divide;
const increment = n => n + 1;
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
exports.increment = increment;
const decrement = n => n - 1;
/**
 * @category instances
 * @since 1.0.0
 */
exports.decrement = decrement;
const Equivalence = equivalence.number;
/**
 * @category instances
 * @since 1.0.0
 */
exports.Equivalence = Equivalence;
const Order = order.number;
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
exports.Order = Order;
const lessThan = /*#__PURE__*/order.lessThan(Order);
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
exports.lessThan = lessThan;
const lessThanOrEqualTo = /*#__PURE__*/order.lessThanOrEqualTo(Order);
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
exports.lessThanOrEqualTo = lessThanOrEqualTo;
const greaterThan = /*#__PURE__*/order.greaterThan(Order);
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
exports.greaterThan = greaterThan;
const greaterThanOrEqualTo = /*#__PURE__*/order.greaterThanOrEqualTo(Order);
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
exports.greaterThanOrEqualTo = greaterThanOrEqualTo;
const between = /*#__PURE__*/order.between(Order);
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
exports.between = between;
const clamp = /*#__PURE__*/order.clamp(Order);
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
exports.clamp = clamp;
const min = /*#__PURE__*/order.min(Order);
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
exports.min = min;
const max = /*#__PURE__*/order.max(Order);
/**
 * @category instances
 * @since 1.0.0
 */
exports.max = max;
const Bounded = bounded.number;
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
exports.Bounded = Bounded;
const SemigroupSum = semigroup.numberSum;
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
exports.SemigroupSum = SemigroupSum;
const SemigroupMultiply = semigroup.numberMultiply;
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
exports.SemigroupMultiply = SemigroupMultiply;
const SemigroupMin = /*#__PURE__*/semigroup.min(Order);
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
exports.SemigroupMin = SemigroupMin;
const SemigroupMax = /*#__PURE__*/semigroup.max(Order);
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
exports.SemigroupMax = SemigroupMax;
const MonoidSum = monoid.numberSum;
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
exports.MonoidSum = MonoidSum;
const MonoidMultiply = monoid.numberMultiply;
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
exports.MonoidMultiply = MonoidMultiply;
const MonoidMin = /*#__PURE__*/bounded.min(Bounded);
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
exports.MonoidMin = MonoidMin;
const MonoidMax = /*#__PURE__*/bounded.max(Bounded);
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
exports.MonoidMax = MonoidMax;
const sign = n => Order.compare(n, 0);
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
exports.sign = sign;
const sumAll = MonoidSum.combineAll;
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
exports.sumAll = sumAll;
const multiplyAll = MonoidMultiply.combineAll;
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
exports.multiplyAll = multiplyAll;
const remainder = /*#__PURE__*/(0, _Function.dual)(2, (self, divisor) => {
  // https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
  const selfDecCount = (self.toString().split(".")[1] || "").length;
  const divisorDecCount = (divisor.toString().split(".")[1] || "").length;
  const decCount = selfDecCount > divisorDecCount ? selfDecCount : divisorDecCount;
  const selfInt = parseInt(self.toFixed(decCount).replace(".", ""));
  const divisorInt = parseInt(divisor.toFixed(decCount).replace(".", ""));
  return selfInt % divisorInt / Math.pow(10, decCount);
});
exports.remainder = remainder;
//# sourceMappingURL=Number.js.map