/**
 * This module provides utility functions and type class instances for working with the `bigint` type in TypeScript.
 * It includes functions for basic arithmetic operations, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */

import { dual } from "@effect/data/Function"
import type { Ordering } from "@effect/data/Ordering"
import * as predicate from "@effect/data/Predicate"
import * as equivalence from "@effect/data/typeclass/Equivalence"
import * as monoid from "@effect/data/typeclass/Monoid"
import * as order from "@effect/data/typeclass/Order"
import * as semigroup from "@effect/data/typeclass/Semigroup"

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
export const isBigint: (u: unknown) => u is bigint = predicate.isBigint

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
export const sum: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = dual(2, semigroup.bigintSum.combine)

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
export const multiply: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = dual(2, semigroup.bigintMultiply.combine)

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
export const subtract: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = dual(2, (self: bigint, that: bigint): bigint => self - that)

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
export const divide: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = dual(2, (self: bigint, that: bigint): bigint => self / that)

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
export const increment = (n: bigint): bigint => n + 1n

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
export const decrement = (n: bigint): bigint => n - 1n

/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence: equivalence.Equivalence<bigint> = equivalence.bigint

/**
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<bigint> = order.bigint

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
export const lessThan: {
  (that: bigint): (self: bigint) => boolean
  (self: bigint, that: bigint): boolean
} = order.lessThan(Order)

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
export const lessThanOrEqualTo: {
  (that: bigint): (self: bigint) => boolean
  (self: bigint, that: bigint): boolean
} = order.lessThanOrEqualTo(Order)

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
export const greaterThan: {
  (that: bigint): (self: bigint) => boolean
  (self: bigint, that: bigint): boolean
} = order.greaterThan(Order)

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
export const greaterThanOrEqualTo: {
  (that: bigint): (self: bigint) => boolean
  (self: bigint, that: bigint): boolean
} = order.greaterThanOrEqualTo(Order)

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
export const between: {
  (minimum: bigint, maximum: bigint): (self: bigint) => boolean
  (self: bigint, minimum: bigint, maximum: bigint): boolean
} = order.between(Order)

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
export const clamp: {
  (minimum: bigint, maximum: bigint): (self: bigint) => bigint
  (self: bigint, minimum: bigint, maximum: bigint): bigint
} = order.clamp(Order)

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
export const min: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = order.min(Order)

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
export const max: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = order.max(Order)

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
export const SemigroupSum: semigroup.Semigroup<bigint> = semigroup.bigintSum

/**
 * `bigint` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMultiply: semigroup.Semigroup<bigint> = semigroup.bigintMultiply

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
export const SemigroupMin: semigroup.Semigroup<bigint> = semigroup.min(Order)

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
export const SemigroupMax: semigroup.Semigroup<bigint> = semigroup.max(Order)

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
export const MonoidSum: monoid.Monoid<bigint> = monoid.bigintSum

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
export const MonoidMultiply: monoid.Monoid<bigint> = monoid.bigintMultiply

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
export const sign = (n: bigint): Ordering => Order.compare(n, 0n)

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
export const sumAll: (collection: Iterable<bigint>) => bigint = MonoidSum.combineAll

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
export const multiplyAll: (collection: Iterable<bigint>) => bigint = MonoidMultiply.combineAll
