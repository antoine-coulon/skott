/**
 * This module provides utility functions for working with arrays in TypeScript.
 *
 * @since 1.0.0
 */

import type { Either } from "@effect/data/Either"
import * as E from "@effect/data/Either"
import { dual, identity } from "@effect/data/Function"
import type { LazyArg } from "@effect/data/Function"
import type { Kind, TypeLambda } from "@effect/data/HKT"
import * as readonlyArray from "@effect/data/internal/ReadonlyArray"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import * as RR from "@effect/data/ReadonlyRecord"
import * as string from "@effect/data/String"
import * as applicative from "@effect/data/typeclass/Applicative"
import * as chainable from "@effect/data/typeclass/Chainable"
import type { Coproduct } from "@effect/data/typeclass/Coproduct"
import * as covariant from "@effect/data/typeclass/Covariant"
import type * as filterable from "@effect/data/typeclass/Filterable"
import * as flatMap_ from "@effect/data/typeclass/FlatMap"
import * as foldable from "@effect/data/typeclass/Foldable"
import * as invariant from "@effect/data/typeclass/Invariant"
import type * as monad from "@effect/data/typeclass/Monad"
import type { Monoid } from "@effect/data/typeclass/Monoid"
import * as monoid from "@effect/data/typeclass/Monoid"
import * as of_ from "@effect/data/typeclass/Of"
import * as order from "@effect/data/typeclass/Order"
import type { Order } from "@effect/data/typeclass/Order"
import type * as pointed from "@effect/data/typeclass/Pointed"
import type * as product_ from "@effect/data/typeclass/Product"
import * as semiApplicative from "@effect/data/typeclass/SemiApplicative"
import type { Semigroup } from "@effect/data/typeclass/Semigroup"
import * as semigroup from "@effect/data/typeclass/Semigroup"
import * as semiProduct from "@effect/data/typeclass/SemiProduct"
import * as traversable from "@effect/data/typeclass/Traversable"
import * as traversableFilterable from "@effect/data/typeclass/TraversableFilterable"

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Target"]>
}

/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyReadonlyArray<A> = readonly [A, ...Array<A>]

/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyArray<A> = [A, ...Array<A>]

/**
 * Builds a `NonEmptyArray` from an non-empty collection of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const make = <Elements extends NonEmptyArray<any>>(
  ...elements: Elements
): NonEmptyArray<Elements[number]> => elements

/**
 * Return a `NonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to an integer >= 1.
 *
 * @example
 * import { makeBy } from '@effect/data/ReadonlyArray'
 *
 * assert.deepStrictEqual(makeBy(5, n => n * 2), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 1.0.0
 */
export const makeBy = <A>(n: number, f: (i: number) => A): NonEmptyArray<A> => {
  const max = Math.max(1, Math.floor(n))
  const out: NonEmptyArray<A> = [f(0)]
  for (let i = 1; i < max; i++) {
    out.push(f(i))
  }
  return out
}

/**
 * Return a `NonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from '@effect/data/ReadonlyArray'
 *
 * assert.deepStrictEqual(range(1, 3), [1, 2, 3])
 *
 * @category constructors
 * @since 1.0.0
 */
export const range = (start: number, end: number): NonEmptyArray<number> =>
  start <= end ? makeBy(end - start + 1, (i) => start + i) : [start]

/**
 * Return a `NonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to an integer >= 1.
 *
 * @example
 * import { replicate } from '@effect/data/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate("a", 3), ["a", "a", "a"])
 *
 * @category constructors
 * @since 1.0.0
 */
export const replicate: {
  (n: number): <A>(a: A) => NonEmptyArray<A>
  <A>(a: A, n: number): NonEmptyArray<A>
} = dual(2, <A>(a: A, n: number): NonEmptyArray<A> => makeBy(n, () => a))

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable: <A>(collection: Iterable<A>) => Array<A> = readonlyArray.fromIterable

/**
 * Takes a record and returns an array of tuples containing its keys and values.
 *
 * @param self - The record to transform.
 *
 * @example
 * import { fromRecord } from "@effect/data/ReadonlyArray"
 *
 * const x = { a: 1, b: 2, c: 3 }
 * assert.deepStrictEqual(fromRecord(x), [["a", 1], ["b", 2], ["c", 3]])
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromRecord: <K extends string, A>(self: Readonly<Record<K, A>>) => Array<[K, A]> = RR.toEntries

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromOption: <A>(self: Option<A>) => Array<A> = O.toArray

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromEither: <E, A>(self: Either<E, A>) => Array<A> = E.toArray

/**
 * @category pattern matching
 * @since 1.0.0
 */
export const match: {
  <B, A, C = B>(
    onEmpty: LazyArg<B>,
    onNonEmpty: (self: NonEmptyReadonlyArray<A>) => C
  ): (self: ReadonlyArray<A>) => B | C
  <A, B, C = B>(
    self: ReadonlyArray<A>,
    onEmpty: LazyArg<B>,
    onNonEmpty: (self: NonEmptyReadonlyArray<A>) => C
  ): B | C
} = dual(3, <A, B, C = B>(
  self: ReadonlyArray<A>,
  onEmpty: LazyArg<B>,
  onNonEmpty: (self: NonEmptyReadonlyArray<A>) => C
): B | C => isNonEmptyReadonlyArray(self) ? onNonEmpty(self) : onEmpty())

/**
 * @category pattern matching
 * @since 1.0.0
 */
export const matchLeft: {
  <B, A, C = B>(
    onEmpty: LazyArg<B>,
    onNonEmpty: (head: A, tail: Array<A>) => C
  ): (self: ReadonlyArray<A>) => B | C
  <A, B, C = B>(
    self: ReadonlyArray<A>,
    onEmpty: LazyArg<B>,
    onNonEmpty: (head: A, tail: Array<A>) => C
  ): B | C
} = dual(3, <A, B, C = B>(
  self: ReadonlyArray<A>,
  onEmpty: LazyArg<B>,
  onNonEmpty: (head: A, tail: Array<A>) => C
): B | C => isNonEmptyReadonlyArray(self) ? onNonEmpty(headNonEmpty(self), tailNonEmpty(self)) : onEmpty())

/**
 * @category pattern matching
 * @since 1.0.0
 */
export const matchRight: {
  <B, A, C = B>(
    onEmpty: LazyArg<B>,
    onNonEmpty: (init: Array<A>, last: A) => C
  ): (self: ReadonlyArray<A>) => B | C
  <A, B, C = B>(
    self: ReadonlyArray<A>,
    onEmpty: LazyArg<B>,
    onNonEmpty: (init: Array<A>, last: A) => C
  ): B | C
} = dual(3, <A, B, C = B>(
  self: ReadonlyArray<A>,
  onEmpty: LazyArg<B>,
  onNonEmpty: (init: Array<A>, last: A) => C
): B | C =>
  isNonEmptyReadonlyArray(self) ?
    onNonEmpty(initNonEmpty(self), lastNonEmpty(self)) :
    onEmpty())

/**
 * Prepend an element to the front of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
export const prepend: {
  <B>(head: B): <A>(self: Iterable<A>) => NonEmptyArray<A | B>
  <A, B>(self: Iterable<A>, head: B): NonEmptyArray<A | B>
} = dual(2, <A, B>(self: Iterable<A>, head: B): NonEmptyArray<A | B> => [head, ...self])

/**
 * @since 1.0.0
 */
export const prependAll: {
  <B>(that: Iterable<B>): <A>(self: Iterable<A>) => Array<A | B>
  <A, B>(self: Iterable<A>, that: Iterable<B>): Array<A | B>
} = dual(
  2,
  <A>(self: Iterable<A>, that: Iterable<A>): Array<A> => fromIterable(that).concat(fromIterable(self))
)

/**
 * @since 1.0.0
 */
export const prependAllNonEmpty: {
  <B>(that: NonEmptyReadonlyArray<B>): <A>(self: Iterable<A>) => NonEmptyArray<A | B>
  <B>(that: Iterable<B>): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>
  <A, B>(self: Iterable<A>, that: NonEmptyReadonlyArray<B>): NonEmptyArray<A | B>
  <A, B>(self: NonEmptyReadonlyArray<A>, that: Iterable<B>): NonEmptyArray<A | B>
} = dual(
  2,
  <A, B>(self: Iterable<A>, that: Iterable<B>): Array<A | B> => prependAll(self, that)
)

/**
 * Append an element to the end of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
export const append: {
  <B>(last: B): <A>(self: Iterable<A>) => NonEmptyArray<A | B>
  <A, B>(self: Iterable<A>, last: B): NonEmptyArray<A | B>
} = dual(2, <A, B>(self: Iterable<A>, last: B): Array<A | B> => [...self, last])

/**
 * @since 1.0.0
 */
export const appendAll: {
  <B>(that: Iterable<B>): <A>(self: Iterable<A>) => Array<A | B>
  <A, B>(self: Iterable<A>, that: Iterable<B>): Array<A | B>
} = dual(
  2,
  <A>(self: Iterable<A>, that: Iterable<A>): Array<A> => fromIterable(self).concat(fromIterable(that))
)

/**
 * @since 1.0.0
 */
export const appendAllNonEmpty: {
  <B>(that: NonEmptyReadonlyArray<B>): <A>(self: Iterable<A>) => NonEmptyArray<A | B>
  <B>(that: Iterable<B>): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>
  <A, B>(self: Iterable<A>, that: NonEmptyReadonlyArray<B>): NonEmptyArray<A | B>
  <A, B>(self: NonEmptyReadonlyArray<A>, that: Iterable<B>): NonEmptyArray<A | B>
} = dual(
  2,
  <A, B>(self: Iterable<A>, that: Iterable<B>): Array<A | B> => appendAll(self, that)
)

/**
 * Reduce an `Iterable` from the left, keeping all intermediate results instead of only the final result.
 *
 * @category folding
 * @since 1.0.0
 */
export const scan: {
  <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<A>) => NonEmptyArray<B>
  <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A) => B): NonEmptyArray<B>
} = dual(3, <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A) => B): NonEmptyArray<B> => {
  const out: NonEmptyArray<B> = [b]
  let i = 0
  for (const a of self) {
    out[i + 1] = f(out[i], a)
    i++
  }
  return out
})

/**
 * Reduce an `Iterable` from the right, keeping all intermediate results instead of only the final result.
 *
 * @category folding
 * @since 1.0.0
 */
export const scanRight: {
  <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<A>) => NonEmptyArray<B>
  <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A) => B): NonEmptyArray<B>
} = dual(3, <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A) => B): NonEmptyArray<B> => {
  const input = fromIterable(self)
  const out: NonEmptyArray<B> = new Array(input.length + 1) as any
  out[input.length] = b
  for (let i = input.length - 1; i >= 0; i--) {
    out[i] = f(out[i + 1], input[i])
  }
  return out
})

/**
 * Determine if an `Array` is empty narrowing down the type to `[]`.
 *
 * @param self - The `Array` to check.
 *
 * @example
 * import { isEmptyArray } from "@effect/data/ReadonlyArray"
 *
 * assert.deepStrictEqual(isEmptyArray([]), true);
 * assert.deepStrictEqual(isEmptyArray([1, 2, 3]), false);
 *
 * @category guards
 * @since 1.0.0
 */
export const isEmptyArray = <A>(self: Array<A>): self is [] => self.length === 0

/**
 * Determine if a `ReadonlyArray` is empty narrowing down the type to `readonly []`.
 *
 * @param self - The `ReadonlyArray` to check.
 *
 * @example
 * import { isEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
 *
 * assert.deepStrictEqual(isEmptyReadonlyArray([]), true);
 * assert.deepStrictEqual(isEmptyReadonlyArray([1, 2, 3]), false);
 *
 * @category guards
 * @since 1.0.0
 */
export const isEmptyReadonlyArray: <A>(self: ReadonlyArray<A>) => self is readonly [] = isEmptyArray as any

/**
 * Determine if an `Array` is non empty narrowing down the type to `NonEmptyArray`.
 *
 * An `Array` is considered to be a `NonEmptyArray` if it contains at least one element.
 *
 * @param self - The `Array` to check.
 *
 * @example
 * import { isNonEmptyArray } from "@effect/data/ReadonlyArray"
 *
 * assert.deepStrictEqual(isNonEmptyArray([]), false);
 * assert.deepStrictEqual(isNonEmptyArray([1, 2, 3]), true);
 *
 * @category guards
 * @since 1.0.0
 */
export const isNonEmptyArray: <A>(self: Array<A>) => self is NonEmptyArray<A> = readonlyArray.isNonEmptyArray

/**
 * Determine if a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray`.
 *
 * A `ReadonlyArray` is considered to be a `NonEmptyReadonlyArray` if it contains at least one element.
 *
 * @param self - The `ReadonlyArray` to check.
 *
 * @example
 * import { isNonEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
 *
 * assert.deepStrictEqual(isNonEmptyReadonlyArray([]), false);
 * assert.deepStrictEqual(isNonEmptyReadonlyArray([1, 2, 3]), true);
 *
 * @category guards
 * @since 1.0.0
 */
export const isNonEmptyReadonlyArray: <A>(self: ReadonlyArray<A>) => self is NonEmptyReadonlyArray<A> =
  readonlyArray.isNonEmptyArray

/**
 * Return the number of elements in a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export const length = <A>(self: ReadonlyArray<A>): number => self.length

const isOutOfBound = <A>(i: number, as: ReadonlyArray<A>): boolean => i < 0 || i >= as.length

const clamp = <A>(i: number, as: ReadonlyArray<A>): number => Math.floor(Math.min(Math.max(0, i), as.length))

/**
 * This function provides a safe way to read a value at a particular index from a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export const get: {
  (index: number): <A>(self: ReadonlyArray<A>) => Option<A>
  <A>(self: ReadonlyArray<A>, index: number): Option<A>
} = dual(2, <A>(self: ReadonlyArray<A>, index: number): Option<A> => {
  const i = Math.floor(index)
  return isOutOfBound(i, self) ? O.none() : O.some(self[i])
})

/**
 * Gets an element unsafely, will throw on out of bounds.
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeGet: {
  (index: number): <A>(self: ReadonlyArray<A>) => A
  <A>(self: ReadonlyArray<A>, index: number): A
} = dual(2, <A>(self: ReadonlyArray<A>, index: number): A => {
  const i = Math.floor(index)
  if (isOutOfBound(i, self)) {
    throw new Error(`Index ${i} out of bounds`)
  }
  return self[i]
})

/**
 * Return a tuple containing the first element, and a new `Array` of the remaining elements, if any.
 *
 * @category getters
 * @since 1.0.0
 */
export const unprepend = <A>(
  self: NonEmptyReadonlyArray<A>
): [A, Array<A>] => [headNonEmpty(self), tailNonEmpty(self)]

/**
 * Return a tuple containing a copy of the `NonEmptyReadonlyArray` without its last element, and that last element.
 *
 * @category getters
 * @since 1.0.0
 */
export const unappend = <A>(
  self: NonEmptyReadonlyArray<A>
): [Array<A>, A] => [initNonEmpty(self), lastNonEmpty(self)]

/**
 * Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const head: <A>(self: ReadonlyArray<A>) => Option<A> = get(0)

/**
 * @category getters
 * @since 1.0.0
 */
export const headNonEmpty: <A>(self: NonEmptyReadonlyArray<A>) => A = unsafeGet(0)

/**
 * Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const last = <A>(self: ReadonlyArray<A>): Option<A> =>
  isNonEmptyReadonlyArray(self) ? O.some(lastNonEmpty(self)) : O.none()

/**
 * @category getters
 * @since 1.0.0
 */
export const lastNonEmpty = <A>(self: NonEmptyReadonlyArray<A>): A => self[self.length - 1]

/**
 * Get all but the first element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const tail = <A>(self: Iterable<A>): Option<Array<A>> => {
  const input = fromIterable(self)
  return isNonEmptyReadonlyArray(input) ? O.some(tailNonEmpty(input)) : O.none()
}

/**
 * @category getters
 * @since 1.0.0
 */
export const tailNonEmpty = <A>(self: NonEmptyReadonlyArray<A>): Array<A> => self.slice(1)

/**
 * Get all but the last element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const init = <A>(self: Iterable<A>): Option<Array<A>> => {
  const input = fromIterable(self)
  return isNonEmptyReadonlyArray(input) ? O.some(initNonEmpty(input)) : O.none()
}

/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @category getters
 * @since 1.0.0
 */
export const initNonEmpty = <A>(self: NonEmptyReadonlyArray<A>): Array<A> => self.slice(0, -1)

/**
 * Keep only a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const take: {
  (n: number): <A>(self: Iterable<A>) => Array<A>
  <A>(self: Iterable<A>, n: number): Array<A>
} = dual(2, <A>(self: Iterable<A>, n: number): Array<A> => {
  const input = fromIterable(self)
  return input.slice(0, clamp(n, input))
})

/**
 * Keep only a max number of elements from the end of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const takeRight: {
  (n: number): <A>(self: Iterable<A>) => Array<A>
  <A>(self: Iterable<A>, n: number): Array<A>
} = dual(2, <A>(self: Iterable<A>, n: number): Array<A> => {
  const input = fromIterable(self)
  const i = clamp(n, input)
  return i === 0 ? [] : input.slice(-i)
})

/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.
 *
 * @category getters
 * @since 1.0.0
 */
export const takeWhile: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Array<B>
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Array<B>
  <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Array<B>
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Array<B>
} = dual(2, <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Array<B> => {
  const out: Array<B> = []
  for (const a of self) {
    if (!predicate(a)) {
      break
    }
    out.push(a)
  }
  return out
})

const spanIndex = <A>(self: Iterable<A>, predicate: Predicate<A>): number => {
  let i = 0
  for (const a of self) {
    if (!predicate(a)) {
      break
    }
    i++
  }
  return i
}

/**
 * Split an `Iterable` into two parts:
 *
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @category filtering
 * @since 1.0.0
 */
export const span: {
  <A, B extends A>(
    refinement: Refinement<A, B>
  ): (self: Iterable<A>) => [init: Array<B>, rest: Array<A>]
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => [init: Array<B>, rest: Array<B>]
  <A, B extends A>(
    self: Iterable<A>,
    refinement: Refinement<A, B>
  ): [init: Array<B>, rest: Array<A>]
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): [init: Array<B>, rest: Array<B>]
} = dual(
  2,
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): [init: Array<B>, rest: Array<B>] =>
    splitAt(self, spanIndex(self, predicate))
)

/**
 * Drop a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const drop: {
  (n: number): <A>(self: Iterable<A>) => Array<A>
  <A>(self: Iterable<A>, n: number): Array<A>
} = dual(2, <A>(self: Iterable<A>, n: number): Array<A> => {
  const input = fromIterable(self)
  return input.slice(clamp(n, input), input.length)
})

/**
 * Drop a max number of elements from the end of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const dropRight: {
  (n: number): <A>(self: Iterable<A>) => Array<A>
  <A>(self: Iterable<A>, n: number): Array<A>
} = dual(2, <A>(self: Iterable<A>, n: number): Array<A> => {
  const input = fromIterable(self)
  return input.slice(0, input.length - clamp(n, input))
})

/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.
 *
 * @category getters
 * @since 1.0.0
 */
export const dropWhile: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Array<B>
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Array<B>
  <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Array<B>
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Array<B>
} = dual(
  2,
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Array<B> =>
    fromIterable(self).slice(spanIndex(self, predicate))
)

/**
 * Return the first index for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findFirstIndex: {
  <A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<number>
  <A>(self: Iterable<A>, predicate: Predicate<A>): Option<number>
} = dual(2, <A>(self: Iterable<A>, predicate: Predicate<A>): Option<number> => {
  let i = 0
  for (const a of self) {
    if (predicate(a)) {
      return O.some(i)
    }
    i++
  }
  return O.none()
})

/**
 * Return the last index for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findLastIndex: {
  <A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<number>
  <A>(self: Iterable<A>, predicate: Predicate<A>): Option<number>
} = dual(2, <A>(self: Iterable<A>, predicate: Predicate<A>): Option<number> => {
  const input = fromIterable(self)
  for (let i = input.length - 1; i >= 0; i--) {
    if (predicate(input[i])) {
      return O.some(i)
    }
  }
  return O.none()
})

/**
 * Find the first element for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findFirst: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Option<B>
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Option<B>
  <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Option<B>
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Option<B>
} = dual(2, <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Option<B> => {
  const input = fromIterable(self)
  for (let i = 0; i < input.length; i++) {
    if (predicate(input[i])) {
      return O.some(input[i])
    }
  }
  return O.none()
})

/**
 * Find the last element for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findLast: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Option<B>
  <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Option<B>
  <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Option<B>
  <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Option<B>
} = dual(2, <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Option<B> => {
  const input = fromIterable(self)
  for (let i = input.length - 1; i >= 0; i--) {
    if (predicate(input[i])) {
      return O.some(input[i])
    }
  }
  return O.none()
})

/**
 * Insert an element at the specified index, creating a new `NonEmptyArray`,
 * or return `None` if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const insertAt: {
  <B>(i: number, b: B): <A>(self: Iterable<A>) => Option<NonEmptyArray<A | B>>
  <A, B>(self: Iterable<A>, i: number, b: B): Option<NonEmptyArray<A | B>>
} = dual(3, <A, B>(self: Iterable<A>, i: number, b: B): Option<NonEmptyArray<A | B>> => {
  const out: Array<A | B> = Array.from(self)
  //             v--- `= self.length` is ok, it means inserting in last position
  if (i < 0 || i > out.length) {
    return O.none()
  }
  out.splice(i, 0, b)
  return O.some(out) as any
})

/**
 * Change the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const replace: {
  <B>(i: number, b: B): <A>(self: Iterable<A>) => Array<A | B>
  <A, B>(self: Iterable<A>, i: number, b: B): Array<A | B>
} = dual(3, <A, B>(self: Iterable<A>, i: number, b: B): Array<A | B> => modify(self, i, () => b))

/**
 * @since 1.0.0
 */
export const replaceOption: {
  <B>(i: number, b: B): <A>(self: Iterable<A>) => Option<Array<A | B>>
  <A, B>(self: Iterable<A>, i: number, b: B): Option<Array<A | B>>
} = dual(
  3,
  <A, B>(self: Iterable<A>, i: number, b: B): Option<Array<A | B>> => modifyOption(self, i, () => b)
)

/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const modify: {
  <A, B>(i: number, f: (a: A) => B): (self: Iterable<A>) => Array<A | B>
  <A, B>(self: Iterable<A>, i: number, f: (a: A) => B): Array<A | B>
} = dual(
  3,
  <A, B>(self: Iterable<A>, i: number, f: (a: A) => B): Array<A | B> =>
    O.getOrElse(modifyOption(self, i, f), () => Array.from(self))
)

/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return `None` if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const modifyOption: {
  <A, B>(i: number, f: (a: A) => B): (self: Iterable<A>) => Option<Array<A | B>>
  <A, B>(self: Iterable<A>, i: number, f: (a: A) => B): Option<Array<A | B>>
} = dual(3, <A, B>(self: Iterable<A>, i: number, f: (a: A) => B): Option<Array<A | B>> => {
  const out = Array.from(self)
  if (isOutOfBound(i, out)) {
    return O.none()
  }
  const next = f(out[i])
  // @ts-expect-error
  out[i] = next
  return O.some(out)
})

/**
 * Delete the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const remove: {
  (i: number): <A>(self: Iterable<A>) => Array<A>
  <A>(self: Iterable<A>, i: number): Array<A>
} = dual(2, <A>(self: Iterable<A>, i: number): Array<A> => {
  const out = Array.from(self)
  if (isOutOfBound(i, out)) {
    return out
  }
  out.splice(i, 1)
  return out
})

/**
 * Reverse an `Iterable`, creating a new `Array`.
 *
 * @since 1.0.0
 */
export const reverse = <A>(self: Iterable<A>): Array<A> => Array.from(self).reverse()

/**
 * @since 1.0.0
 */
export const reverseNonEmpty = <A>(
  self: NonEmptyReadonlyArray<A>
): NonEmptyArray<A> => [lastNonEmpty(self), ...self.slice(0, -1).reverse()]

/**
 * Return all the `Right` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const rights: <E, A>(self: Iterable<Either<E, A>>) => Array<A> = E.rights

/**
 * Return all the `Left` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const lefts: <E, A>(self: Iterable<Either<E, A>>) => Array<E> = E.lefts

/**
 * Sort the elements of an `Iterable` in increasing order, creating a new `Array`.
 *
 * @category sorting
 * @since 1.0.0
 */
export const sort: {
  <B>(O: Order<B>): <A extends B>(self: Iterable<A>) => Array<A>
  <A extends B, B>(self: Iterable<A>, O: Order<B>): Array<A>
} = dual(2, <A extends B, B>(self: Iterable<A>, O: Order<B>): Array<A> => {
  const out = Array.from(self)
  out.sort(O.compare)
  return out
})

/**
 * Sort the elements of a `NonEmptyReadonlyArray` in increasing order, creating a new `NonEmptyArray`.
 *
 * @category sorting
 * @since 1.0.0
 */
export const sortNonEmpty: {
  <B>(O: Order<B>): <A extends B>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>
  <A extends B, B>(self: NonEmptyReadonlyArray<A>, O: Order<B>): NonEmptyArray<A>
} = dual(2, <A extends B, B>(self: NonEmptyReadonlyArray<A>, O: Order<B>): NonEmptyArray<A> => sort(O)(self) as any)

/**
 * Sort the elements of an `Iterable` in increasing order, where elements are compared
 * using first `orders[0]`, then `orders[1]`, etc...
 *
 * @category sorting
 * @since 1.0.0
 */
export const sortBy = <B>(...orders: ReadonlyArray<Order<B>>) =>
  <A extends B>(self: Iterable<A>): Array<A> => {
    const input = fromIterable(self)
    return (isNonEmptyReadonlyArray(input) ? sortByNonEmpty(...orders)(input) : [])
  }

/**
 * @category sorting
 * @since 1.0.0
 */
export const sortByNonEmpty = <B>(
  ...orders: ReadonlyArray<Order<B>>
): (<A extends B>(as: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>) =>
  sortNonEmpty(order.getMonoid<B>().combineAll(orders))

/**
 * Takes two `Iterable`s and returns an `Array` of corresponding pairs.
 * If one input `Iterable` is short, excess elements of the
 * longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
export const zip: {
  <B>(that: Iterable<B>): <A>(self: Iterable<A>) => Array<[A, B]>
  <A, B>(self: Iterable<A>, that: Iterable<B>): Array<[A, B]>
} = dual(
  2,
  <A, B>(self: Iterable<A>, that: Iterable<B>): Array<[A, B]> => zipWith(self, that, (a, b) => [a, b])
)

/**
 * Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
 * input `Iterable` is short, excess elements of the longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
export const zipWith: {
  <B, A, C>(that: Iterable<B>, f: (a: A, b: B) => C): (self: Iterable<A>) => Array<C>
  <B, A, C>(self: Iterable<A>, that: Iterable<B>, f: (a: A, b: B) => C): Array<C>
} = dual(3, <B, A, C>(self: Iterable<A>, that: Iterable<B>, f: (a: A, b: B) => C): Array<C> => {
  const as = fromIterable(self)
  const bs = fromIterable(that)
  return isNonEmptyReadonlyArray(as) && isNonEmptyReadonlyArray(bs) ? zipNonEmptyWith(bs, f)(as) : []
})

/**
 * @since 1.0.0
 */
export const zipNonEmpty: {
  <B>(that: NonEmptyReadonlyArray<B>): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<[A, B]>
  <A, B>(self: NonEmptyReadonlyArray<A>, that: NonEmptyReadonlyArray<B>): NonEmptyArray<[A, B]>
} = dual(
  2,
  <A, B>(self: NonEmptyReadonlyArray<A>, that: NonEmptyReadonlyArray<B>): NonEmptyArray<[A, B]> =>
    zipNonEmptyWith(self, that, (a, b) => [a, b])
)

/**
 * @since 1.0.0
 */
export const zipNonEmptyWith: {
  <B, A, C>(
    that: NonEmptyReadonlyArray<B>,
    f: (a: A, b: B) => C
  ): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<C>
  <A, B, C>(
    self: NonEmptyReadonlyArray<A>,
    that: NonEmptyReadonlyArray<B>,
    f: (a: A, b: B) => C
  ): NonEmptyArray<C>
} = dual(3, <A, B, C>(
  self: NonEmptyReadonlyArray<A>,
  that: NonEmptyReadonlyArray<B>,
  f: (a: A, b: B) => C
): NonEmptyArray<C> => {
  const cs: NonEmptyArray<C> = [f(headNonEmpty(self), headNonEmpty(that))]
  const len = Math.min(self.length, that.length)
  for (let i = 1; i < len; i++) {
    cs[i] = f(self[i], that[i])
  }
  return cs
})

/**
 * This function is the inverse of `zip`. Takes an `Iterable` of pairs and return two corresponding `Array`s.
 *
 * @since 1.0.0
 */
export const unzip = <A, B>(self: Iterable<[A, B]>): [Array<A>, Array<B>] => {
  const input = fromIterable(self)
  return isNonEmptyReadonlyArray(input) ? unzipNonEmpty(input) : [[], []]
}

/**
 * @since 1.0.0
 */
export const unzipNonEmpty = <A, B>(
  self: NonEmptyReadonlyArray<[A, B]>
): [NonEmptyArray<A>, NonEmptyArray<B>] => {
  const fa: NonEmptyArray<A> = [self[0][0]]
  const fb: NonEmptyArray<B> = [self[0][1]]
  for (let i = 1; i < self.length; i++) {
    fa[i] = self[i][0]
    fb[i] = self[i][1]
  }
  return [fa, fb]
}

/**
 * Places an element in between members of an `Iterable`
 *
 * @since 1.0.0
 */
export const intersperse: {
  <B>(middle: B): <A>(self: Iterable<A>) => Array<A | B>
  <A, B>(self: Iterable<A>, middle: B): Array<A | B>
} = dual(2, <A, B>(self: Iterable<A>, middle: B): Array<A | B> => {
  const input = fromIterable(self)
  return (isNonEmptyReadonlyArray(input) ? intersperseNonEmpty(input, middle) : [])
})

/**
 * Places an element in between members of a `NonEmptyReadonlyArray`
 *
 * @since 1.0.0
 */
export const intersperseNonEmpty: {
  <B>(middle: B): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>
  <A, B>(self: NonEmptyReadonlyArray<A>, middle: B): NonEmptyArray<A | B>
} = dual(2, <A, B>(self: NonEmptyReadonlyArray<A>, middle: B): NonEmptyArray<A | B> => {
  const out: NonEmptyArray<A | B> = [headNonEmpty(self)]
  const tail = tailNonEmpty(self)
  for (let i = 0; i < tail.length; i++) {
    if (i < tail.length) {
      out.push(middle)
    }
    out.push(tail[i])
  }
  return out
})

/**
 * Apply a function to the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const modifyNonEmptyHead: {
  <A, B>(f: (a: A) => B): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>
  <A, B>(self: NonEmptyReadonlyArray<A>, f: (a: A) => B): NonEmptyArray<A | B>
} = dual(
  2,
  <A, B>(
    self: NonEmptyReadonlyArray<A>,
    f: (a: A) => B
  ): NonEmptyArray<A | B> => [f(headNonEmpty(self)), ...tailNonEmpty(self)]
)

/**
 * Change the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const setNonEmptyHead: {
  <B>(b: B): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>
  <A, B>(self: NonEmptyReadonlyArray<A>, b: B): NonEmptyArray<A | B>
} = dual(
  2,
  <A, B>(self: NonEmptyReadonlyArray<A>, b: B): NonEmptyArray<A | B> => modifyNonEmptyHead(self, () => b)
)

/**
 * Apply a function to the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const modifyNonEmptyLast: {
  <A, B>(f: (a: A) => B): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>
  <A, B>(self: NonEmptyReadonlyArray<A>, f: (a: A) => B): NonEmptyArray<A | B>
} = dual(
  2,
  <A, B>(self: NonEmptyReadonlyArray<A>, f: (a: A) => B): NonEmptyArray<A | B> =>
    append(initNonEmpty(self), f(lastNonEmpty(self)))
)

/**
 * Change the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const setNonEmptyLast: {
  <B>(b: B): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>
  <A, B>(self: NonEmptyReadonlyArray<A>, b: B): NonEmptyArray<A | B>
} = dual(
  2,
  <A, B>(self: NonEmptyReadonlyArray<A>, b: B): NonEmptyArray<A | B> => modifyNonEmptyLast(self, () => b)
)

/**
 * Rotate an `Iterable` by `n` steps.
 *
 * @since 1.0.0
 */
export const rotate: {
  (n: number): <A>(self: Iterable<A>) => Array<A>
  <A>(self: Iterable<A>, n: number): Array<A>
} = dual(2, <A>(self: Iterable<A>, n: number): Array<A> => {
  const input = fromIterable(self)
  return isNonEmptyReadonlyArray(input) ? rotateNonEmpty(input, n) : []
})

/**
 * Rotate a `NonEmptyReadonlyArray` by `n` steps.
 *
 * @since 1.0.0
 */
export const rotateNonEmpty: {
  (n: number): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>
  <A>(self: NonEmptyReadonlyArray<A>, n: number): NonEmptyArray<A>
} = dual(2, <A>(self: NonEmptyReadonlyArray<A>, n: number): NonEmptyArray<A> => {
  const len = self.length
  const m = Math.round(n) % len
  if (isOutOfBound(Math.abs(m), self) || m === 0) {
    return copy(self)
  }
  if (m < 0) {
    const [f, s] = splitNonEmptyAt(self, -m)
    return appendAllNonEmpty(s, f)
  } else {
    return rotateNonEmpty(self, m - len)
  }
})

/**
 * Returns a function that checks if a `ReadonlyArray` contains a given value using a provided `equivalence` function.
 *
 * @category predicates
 * @since 1.0.0
 */
export const contains = <A>(isEquivalent: (self: A, that: A) => boolean): {
  (a: A): (self: Iterable<A>) => boolean
  (self: Iterable<A>, a: A): boolean
} =>
  dual(2, (self: Iterable<A>, a: A): boolean => {
    for (const i of self) {
      if (isEquivalent(a, i)) {
        return true
      }
    }
    return false
  })

/**
 * Remove duplicates from am `Iterable`, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 */
export const uniq: {
  <A>(isEquivalent: (self: A, that: A) => boolean): (self: Iterable<A>) => Array<A>
  <A>(self: Iterable<A>, isEquivalent: (self: A, that: A) => boolean): Array<A>
} = dual(
  2,
  <A>(self: Iterable<A>, isEquivalent: (self: A, that: A) => boolean): Array<A> => {
    const input = fromIterable(self)
    return isNonEmptyReadonlyArray(input) ? uniqNonEmpty(isEquivalent)(input) : []
  }
)

/**
 * Remove duplicates from a `NonEmptyReadonlyArray`, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 */
export const uniqNonEmpty: {
  <A>(isEquivalent: (self: A, that: A) => boolean): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>
  <A>(self: NonEmptyReadonlyArray<A>, isEquivalent: (self: A, that: A) => boolean): NonEmptyArray<A>
} = dual(2, <A>(self: NonEmptyReadonlyArray<A>, isEquivalent: (self: A, that: A) => boolean): NonEmptyArray<A> => {
  const out: NonEmptyArray<A> = [headNonEmpty(self)]
  const rest = tailNonEmpty(self)
  for (const a of rest) {
    if (out.every((o) => !isEquivalent(a, o))) {
      out.push(a)
    }
  }
  return out
})

/**
 * A useful recursion pattern for processing an `Iterable` to produce a new `Array`, often used for "chopping" up the input
 * `Iterable`. Typically chop is called with some function that will consume an initial prefix of the `Iterable` and produce a
 * value and the rest of the `Array`.
 *
 * @since 1.0.0
 */
export const chop: {
  <A, B>(
    f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
  ): (self: Iterable<A>) => Array<B>
  <A, B>(
    self: Iterable<A>,
    f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
  ): Array<B>
} = dual(2, <A, B>(
  self: Iterable<A>,
  f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
): Array<B> => {
  const input = fromIterable(self)
  return isNonEmptyReadonlyArray(input) ? chopNonEmpty(input, f) : []
})

/**
 * A useful recursion pattern for processing a `NonEmptyReadonlyArray` to produce a new `NonEmptyReadonlyArray`, often used for "chopping" up the input
 * `NonEmptyReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `NonEmptyReadonlyArray` and produce a
 * value and the tail of the `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const chopNonEmpty: {
  <A, B>(
    f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
  ): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<B>
  <A, B>(
    self: NonEmptyReadonlyArray<A>,
    f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
  ): NonEmptyArray<B>
} = dual(2, <A, B>(
  self: NonEmptyReadonlyArray<A>,
  f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
): NonEmptyArray<B> => {
  const [b, rest] = f(self)
  const out: NonEmptyArray<B> = [b]
  let next: ReadonlyArray<A> = rest
  while (readonlyArray.isNonEmptyArray(next)) {
    const [b, rest] = f(next)
    out.push(b)
    next = rest
  }
  return out
})

/**
 * Splits an `Iterable` into two pieces, the first piece has max `n` elements.
 *
 * @category getters
 * @since 1.0.0
 */
export const splitAt: {
  (n: number): <A>(self: Iterable<A>) => [Array<A>, Array<A>]
  <A>(self: Iterable<A>, n: number): [Array<A>, Array<A>]
} = dual(2, <A>(self: Iterable<A>, n: number): [Array<A>, Array<A>] => {
  const input = Array.from(self)
  return n >= 1 && isNonEmptyReadonlyArray(input) ?
    splitNonEmptyAt(input, n) :
    isEmptyReadonlyArray(input) ?
    [input, []] :
    [[], input]
})

/**
 * @since 1.0.0
 */
export const copy: {
  <A>(self: NonEmptyReadonlyArray<A>): NonEmptyArray<A>
  <A>(self: ReadonlyArray<A>): Array<A>
} = (<A>(self: ReadonlyArray<A>): Array<A> => self.slice()) as any

/**
 * Splits a `NonEmptyReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category getters
 * @since 1.0.0
 */
export const splitNonEmptyAt: {
  (n: number): <A>(self: NonEmptyReadonlyArray<A>) => [NonEmptyArray<A>, Array<A>]
  <A>(self: NonEmptyReadonlyArray<A>, n: number): [NonEmptyArray<A>, Array<A>]
} = dual(2, <A>(self: NonEmptyReadonlyArray<A>, n: number): [NonEmptyArray<A>, Array<A>] => {
  const m = Math.max(1, n)
  return m >= self.length ?
    [copy(self), []] :
    [prepend(self.slice(1, m), headNonEmpty(self)), self.slice(m)]
})

/**
 * Splits an `Iterable` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `Iterable`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `self`.
 *
 * @category getters
 * @since 1.0.0
 */
export const chunksOf: {
  (n: number): <A>(self: Iterable<A>) => Array<NonEmptyArray<A>>
  <A>(self: Iterable<A>, n: number): Array<NonEmptyArray<A>>
} = dual(2, <A>(self: Iterable<A>, n: number): Array<NonEmptyArray<A>> => {
  const input = fromIterable(self)
  return isNonEmptyReadonlyArray(input) ? chunksOfNonEmpty(input, n) : []
})

/**
 * Splits a `NonEmptyReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `NonEmptyReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export const chunksOfNonEmpty: {
  (n: number): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
  <A>(self: NonEmptyReadonlyArray<A>, n: number): NonEmptyArray<NonEmptyArray<A>>
} = dual(
  2,
  <A>(self: NonEmptyReadonlyArray<A>, n: number): NonEmptyArray<NonEmptyArray<A>> =>
    chopNonEmpty(self, splitNonEmptyAt(n))
)

/**
 * Group equal, consecutive elements of a `NonEmptyReadonlyArray` into `NonEmptyArray`s.
 *
 * @category grouping
 * @since 1.0.0
 */
export const group: {
  <A>(isEquivalent: (self: A, that: A) => boolean): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
  <A>(self: NonEmptyReadonlyArray<A>, isEquivalent: (self: A, that: A) => boolean): NonEmptyArray<NonEmptyArray<A>>
} = dual(
  2,
  <A>(self: NonEmptyReadonlyArray<A>, isEquivalent: (self: A, that: A) => boolean): NonEmptyArray<NonEmptyArray<A>> =>
    chopNonEmpty(self, (as) => {
      const h = headNonEmpty(as)
      const out: NonEmptyArray<A> = [h]
      let i = 1
      for (; i < as.length; i++) {
        const a = as[i]
        if (isEquivalent(a, h)) {
          out.push(a)
        } else {
          break
        }
      }
      return [out, as.slice(i)]
    })
)

/**
 * Splits an `Iterable` into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @category grouping
 * @since 1.0.0
 */
export const groupBy: {
  <A>(f: (a: A) => string): (self: Iterable<A>) => Record<string, NonEmptyArray<A>>
  <A>(self: Iterable<A>, f: (a: A) => string): Record<string, NonEmptyArray<A>>
} = dual(2, <A>(self: Iterable<A>, f: (a: A) => string): Record<string, NonEmptyArray<A>> => {
  const out: Record<string, NonEmptyArray<A>> = {}
  for (const a of self) {
    const k = f(a)
    if (Object.prototype.hasOwnProperty.call(out, k)) {
      out[k].push(a)
    } else {
      out[k] = [a]
    }
  }
  return out
})

/**
 * @since 1.0.0
 */
export const union = <A>(isEquivalent: (self: A, that: A) => boolean): {
  (that: ReadonlyArray<A>): (self: ReadonlyArray<A>) => Array<A>
  (self: ReadonlyArray<A>, that: ReadonlyArray<A>): Array<A>
} =>
  dual(2, (self: ReadonlyArray<A>, that: ReadonlyArray<A>): Array<A> => {
    const a = Array.from(self)
    const b = Array.from(that)
    return isNonEmptyReadonlyArray(a) && isNonEmptyReadonlyArray(b) ?
      unionNonEmpty(isEquivalent)(a, b) :
      isNonEmptyReadonlyArray(a) ?
      a :
      b
  })

/**
 * @since 1.0.0
 */
export const unionNonEmpty = <A>(isEquivalent: (self: A, that: A) => boolean): {
  (that: NonEmptyReadonlyArray<A>): (self: ReadonlyArray<A>) => NonEmptyArray<A>
  (that: ReadonlyArray<A>): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>
  (self: ReadonlyArray<A>, that: NonEmptyReadonlyArray<A>): NonEmptyArray<A>
  (self: NonEmptyReadonlyArray<A>, that: ReadonlyArray<A>): NonEmptyArray<A>
} =>
  dual(
    2,
    (self: NonEmptyReadonlyArray<A>, that: ReadonlyArray<A>): NonEmptyArray<A> =>
      uniqNonEmpty(isEquivalent)(appendAllNonEmpty(self, that))
  )

/**
 * Creates an `Array` of unique values that are included in all given `Iterable`s.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
export const intersection = <A>(isEquivalent: (self: A, that: A) => boolean): {
  (that: Iterable<A>): (self: Iterable<A>) => Array<A>
  (self: Iterable<A>, that: Iterable<A>): Array<A>
} => {
  const has = contains(isEquivalent)
  return dual(
    2,
    (self: Iterable<A>, that: Iterable<A>): Array<A> => fromIterable(self).filter((a) => has(that, a))
  )
}

/**
 * Creates a `Array` of values not included in the other given `Iterable`.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
export const difference = <A>(isEquivalent: (self: A, that: A) => boolean): {
  (that: Iterable<A>): (self: Iterable<A>) => Array<A>
  (self: Iterable<A>, that: Iterable<A>): Array<A>
} => {
  const has = contains(isEquivalent)
  return dual(
    2,
    (self: Iterable<A>, that: Iterable<A>): Array<A> => fromIterable(self).filter((a) => !has(that, a))
  )
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const empty: <A = never>() => Array<A> = () => []

/**
 * Constructs a new `NonEmptyArray<A>` from the specified value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const of = <A>(a: A): NonEmptyArray<A> => [a]

const Of: of_.Of<ReadonlyArrayTypeLambda> = {
  of
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const map: {
  <A, B>(f: (a: A, i: number) => B): (self: ReadonlyArray<A>) => Array<B>
  <A, B>(self: ReadonlyArray<A>, f: (a: A, i: number) => B): Array<B>
} = dual(2, <A, B>(self: ReadonlyArray<A>, f: (a: A, i: number) => B): Array<B> => self.map(f))

/**
 * @category mapping
 * @since 1.0.0
 */
export const mapNonEmpty: {
  <A, B>(f: (a: A, i: number) => B): (self: readonly [A, ...Array<A>]) => [B, ...Array<B>]
  <A, B>(self: readonly [A, ...Array<A>], f: (a: A, i: number) => B): [B, ...Array<B>]
} = map as any

const imap = covariant.imap<ReadonlyArrayTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<ReadonlyArrayTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<ReadonlyArrayTypeLambda> = {
  imap
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const tupled: <A>(self: ReadonlyArray<A>) => Array<[A]> = invariant
  .tupled(Invariant) as any

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: {
  <A, B>(a: A, self: ReadonlyArray<(a: A) => B>): Array<B>
  <A, B>(self: ReadonlyArray<(a: A) => B>): (a: A) => Array<B>
} = covariant.flap(Covariant) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<ReadonlyArrayTypeLambda> = {
  of,
  imap,
  map
}

/**
 * @category combining
 * @since 1.0.0
 */
export const flatMap: {
  <A, B>(f: (a: A, i: number) => ReadonlyArray<B>): (self: ReadonlyArray<A>) => Array<B>
  <A, B>(self: ReadonlyArray<A>, f: (a: A, i: number) => ReadonlyArray<B>): Array<B>
} = dual(
  2,
  <A, B>(self: ReadonlyArray<A>, f: (a: A, i: number) => ReadonlyArray<B>): Array<B> => {
    if (isEmptyReadonlyArray(self)) {
      return []
    }
    const out: Array<B> = []
    for (let i = 0; i < self.length; i++) {
      out.push(...f(self[i], i))
    }
    return out
  }
)

/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapNonEmpty: {
  <A, B>(
    f: (a: A, i: number) => NonEmptyReadonlyArray<B>
  ): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<B>
  <A, B>(
    self: NonEmptyReadonlyArray<A>,
    f: (a: A, i: number) => NonEmptyReadonlyArray<B>
  ): NonEmptyArray<B>
} = flatMap as any

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<ReadonlyArrayTypeLambda> = {
  flatMap
}

/**
 * @category combining
 * @since 1.0.0
 */
export const flatten: <A>(self: ReadonlyArray<ReadonlyArray<A>>) => Array<A> = flatMap_
  .flatten(FlatMap) as any

/**
 * @category combining
 * @since 1.0.0
 */
export const flattenNonEmpty: <A>(
  self: NonEmptyReadonlyArray<NonEmptyReadonlyArray<A>>
) => NonEmptyArray<A> = flatMapNonEmpty(identity)

/**
 * @since 1.0.0
 */
export const composeK: {
  <A, B, C>(
    afb: (a: A) => ReadonlyArray<B>,
    bfc: (b: B) => ReadonlyArray<C>
  ): (a: A) => ReadonlyArray<C>
  <B, C>(
    bfc: (b: B) => ReadonlyArray<C>
  ): <A>(afb: (a: A) => ReadonlyArray<B>) => (a: A) => ReadonlyArray<C>
} = flatMap_.composeK(FlatMap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<ReadonlyArrayTypeLambda> = {
  imap,
  map,
  flatMap
}

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap: {
  <A, B>(f: (a: A, i: number) => Option<B>): (self: Iterable<A>) => Array<B>
  <A, B>(self: Iterable<A>, f: (a: A, i: number) => Option<B>): Array<B>
} = dual(
  2,
  <A, B>(self: Iterable<A>, f: (a: A, i: number) => Option<B>): Array<B> => {
    const as = fromIterable(self)
    const out: Array<B> = []
    for (let i = 0; i < as.length; i++) {
      const o = f(as[i], i)
      if (O.isSome(o)) {
        out.push(o.value)
      }
    }
    return out
  }
)

/**
 * @category filtering
 * @since 1.0.0
 */
export const partitionMap: {
  <A, B, C>(f: (a: A, i: number) => Either<B, C>): (self: Iterable<A>) => [Array<B>, Array<C>]
  <A, B, C>(self: Iterable<A>, f: (a: A, i: number) => Either<B, C>): [Array<B>, Array<C>]
} = dual(
  2,
  <A, B, C>(self: Iterable<A>, f: (a: A, i: number) => Either<B, C>): [Array<B>, Array<C>] => {
    const left: Array<B> = []
    const right: Array<C> = []
    const as = fromIterable(self)
    for (let i = 0; i < as.length; i++) {
      const e = f(as[i], i)
      if (E.isLeft(e)) {
        left.push(e.left)
      } else {
        right.push(e.right)
      }
    }
    return [left, right]
  }
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable: filterable.Filterable<ReadonlyArrayTypeLambda> = {
  partitionMap,
  filterMap
}

/**
 * @category filtering
 * @since 1.0.0
 */
export const compact: <A>(self: Iterable<Option<A>>) => Array<A> = filterMap(identity)

/**
 * @category filtering
 * @since 1.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(
    refinement: (a: A, i: number) => a is B
  ): (self: Iterable<C>) => Array<B>
  <B extends A, A = B>(predicate: (a: A, i: number) => boolean): (self: Iterable<B>) => Array<B>
  <C extends A, B extends A, A = C>(
    self: Iterable<C>,
    refinement: (a: A, i: number) => a is B
  ): Array<B>
  <B extends A, A = B>(self: Iterable<B>, predicate: (a: A, i: number) => boolean): Array<B>
} = dual(
  2,
  <B extends A, A = B>(self: Iterable<B>, predicate: (a: A, i: number) => boolean): Array<B> => {
    const as = fromIterable(self)
    const out: Array<B> = []
    for (let i = 0; i < as.length; i++) {
      if (predicate(as[i], i)) {
        out.push(as[i])
      }
    }
    return out
  }
)

/**
 * @category filtering
 * @since 1.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: (a: A, i: number) => a is B): (
    self: Iterable<C>
  ) => [Array<C>, Array<B>]
  <B extends A, A = B>(
    predicate: (a: A, i: number) => boolean
  ): (self: Iterable<B>) => [Array<B>, Array<B>]
  <C extends A, B extends A, A = C>(
    self: Iterable<C>,
    refinement: (a: A, i: number) => a is B
  ): [Array<C>, Array<B>]
  <B extends A, A = B>(
    self: Iterable<B>,
    predicate: (a: A, i: number) => boolean
  ): [Array<B>, Array<B>]
} = dual(
  2,
  <B extends A, A = B>(
    self: Iterable<B>,
    predicate: (a: A, i: number) => boolean
  ): [Array<B>, Array<B>] => {
    const left: Array<B> = []
    const right: Array<B> = []
    const as = fromIterable(self)
    for (let i = 0; i < as.length; i++) {
      if (predicate(as[i], i)) {
        right.push(as[i])
      } else {
        left.push(as[i])
      }
    }
    return [left, right]
  }
)

/**
 * @category filtering
 * @since 1.0.0
 */
export const separate: <A, B>(self: Iterable<Either<A, B>>) => [Array<A>, Array<B>] = partitionMap(
  identity
)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseNonEmpty = <F extends TypeLambda>(
  F: semiApplicative.SemiApplicative<F>
): {
  <A, R, O, E, B>(
    f: (a: A, i: number) => Kind<F, R, O, E, B>
  ): (self: NonEmptyReadonlyArray<A>) => Kind<F, R, O, E, NonEmptyArray<B>>
  <A, R, O, E, B>(
    self: NonEmptyReadonlyArray<A>,
    f: (a: A, i: number) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, NonEmptyArray<B>>
} =>
  dual(2, <A, R, O, E, B>(
    self: NonEmptyReadonlyArray<A>,
    f: (a: A, i: number) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, NonEmptyArray<B>> => {
    const [head, ...tail] = mapNonEmpty(self, f)
    return F.productMany(head, tail)
  })

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda>(F: applicative.Applicative<F>): {
  <A, R, O, E, B>(
    f: (a: A, i: number) => Kind<F, R, O, E, B>
  ): (self: Iterable<A>) => Kind<F, R, O, E, Array<B>>
  <A, R, O, E, B>(
    self: Iterable<A>,
    f: (a: A, i: number) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Array<B>>
} =>
  dual(2, <A, R, O, E, B>(
    self: Iterable<A>,
    f: (a: A, i: number) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Array<B>> => F.productAll(fromIterable(self).map(f)))

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): <R, O, E, A>(
  self: ReadonlyArray<Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, Array<A>> => traverse(F)(identity)

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<ReadonlyArrayTypeLambda> = {
  traverse: traverse as any
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Array<A>>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): (self: ReadonlyArray<A>) => Kind<F, R, O, E, Array<A>>
} = traversable.traverseTap(Traversable) as any

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequenceNonEmpty = <F extends TypeLambda>(
  F: semiApplicative.SemiApplicative<F>
): (<R, O, E, A>(
  self: NonEmptyReadonlyArray<Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, NonEmptyArray<A>>) => traverseNonEmpty(F)(identity)

const product = <A, B>(self: ReadonlyArray<A>, that: ReadonlyArray<B>): ReadonlyArray<[A, B]> => {
  if (isEmptyReadonlyArray(self) || isEmptyReadonlyArray(that)) {
    return empty()
  }
  const out: Array<[A, B]> = []
  for (let i = 0; i < self.length; i++) {
    for (let j = 0; j < that.length; j++) {
      out.push([self[i], that[j]])
    }
  }
  return out
}

const productMany = semiProduct.productMany<ReadonlyArrayTypeLambda>(map, product)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<ReadonlyArrayTypeLambda> = {
  imap,
  product,
  productMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<ReadonlyArrayTypeLambda> = {
  imap,
  map,
  product,
  productMany
}

/**
 * @since 1.0.0
 */
export const ap: {
  <A, B>(self: ReadonlyArray<(a: A) => B>, that: ReadonlyArray<A>): Array<B>
  <A>(that: ReadonlyArray<A>): <B>(self: ReadonlyArray<(a: A) => B>) => Array<B>
} = semiApplicative.ap(SemiApplicative) as any

/**
 * Lifts a binary function into `ReadonlyArray`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => {
  (self: ReadonlyArray<A>, that: ReadonlyArray<B>): Array<C>
  (that: ReadonlyArray<B>): (self: ReadonlyArray<A>) => Array<C>
} = semiApplicative.lift2(SemiApplicative) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<ReadonlyArrayTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll: (collection) => {
    const arrays = fromIterable(collection)
    return isEmptyReadonlyArray(arrays) ? empty() : SemiProduct.productMany(arrays[0], arrays.slice(1))
  }
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<ReadonlyArrayTypeLambda> = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll: Product.productAll
}

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftMonoid: <A>(M: Monoid<A>) => Monoid<ReadonlyArray<A>> = applicative
  .getMonoid(
    Applicative
  )

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<ReadonlyArrayTypeLambda> = {
  imap,
  of,
  map,
  flatMap
}

/**
 * @category folding
 * @since 1.0.0
 */
export const reduce: {
  <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Iterable<A>) => B
  <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A, i: number) => B): B
} = dual(
  3,
  <B, A>(self: Iterable<A>, b: B, f: (b: B, a: A, i: number) => B): B =>
    fromIterable(self).reduce((b, a, i) => f(b, a, i), b)
)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceRight: {
  <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Iterable<A>) => B
  <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A, i: number) => B): B
} = dual(
  3,
  <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A, i: number) => B): B =>
    fromIterable(self).reduceRight((b, a, i) => f(b, a, i), b)
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<ReadonlyArrayTypeLambda> = {
  reduce
}

/**
 * @category folding
 * @since 1.0.0
 */
export const combineMap = <M>(Monoid: Monoid<M>): {
  <A>(f: (a: A, i: number) => M): (self: Iterable<A>) => M
  <A>(self: Iterable<A>, f: (a: A, i: number) => M): M
} =>
  dual(
    2,
    <A>(self: Iterable<A>, f: (a: A, i: number) => M): M =>
      fromIterable(self).reduce((m, a, i) => Monoid.combine(m, f(a, i)), Monoid.empty)
  )

/**
 * @category folding
 * @since 1.0.0
 */
export const combineMapNonEmpty = <S>(S: Semigroup<S>): {
  <A>(f: (a: A, i: number) => S): (self: NonEmptyReadonlyArray<A>) => S
  <A>(self: NonEmptyReadonlyArray<A>, f: (a: A, i: number) => S): S
} =>
  dual(
    2,
    <A>(self: NonEmptyReadonlyArray<A>, f: (a: A, i: number) => S): S =>
      tailNonEmpty(self).reduce((s, a, i) => S.combine(s, f(a, i + 1)), f(headNonEmpty(self), 0))
  )

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceKind: <G extends TypeLambda>(
  G: monad.Monad<G>
) => {
  <B, A, R, O, E>(
    b: B,
    f: (b: B, a: A) => Kind<G, R, O, E, B>
  ): (self: ReadonlyArray<A>) => Kind<G, R, O, E, B>
  <A, B, R, O, E>(
    self: ReadonlyArray<A>,
    b: B,
    f: (b: B, a: A) => Kind<G, R, O, E, B>
  ): Kind<G, R, O, E, B>
} = foldable.reduceKind(Foldable)

/**
 * @category folding
 * @since 1.0.0
 */
export const coproductMapKind: <G extends TypeLambda>(
  G: Coproduct<G>
) => {
  <A, R, O, E, B>(
    f: (a: A) => Kind<G, R, O, E, B>
  ): (self: ReadonlyArray<A>) => Kind<G, R, O, E, B>
  <A, R, O, E, B>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<G, R, O, E, B>
  ): Kind<G, R, O, E, B>
} = foldable.coproductMapKind(Foldable)

/**
 * @category filtering
 * @since 1.0.0
 */
export const traversePartitionMap = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B, C>(
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): (self: ReadonlyArray<A>) => Kind<F, R, O, E, [Array<B>, Array<C>]>
  <A, R, O, E, B, C>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): Kind<F, R, O, E, [Array<B>, Array<C>]>
} =>
  dual(2, <A, R, O, E, B, C>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): Kind<F, R, O, E, [Array<B>, Array<C>]> => {
    return F.map(traverse(F)(self, f), separate)
  })

/**
 * @category filtering
 * @since 1.0.0
 */
export const traverseFilterMap = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): (self: ReadonlyArray<A>) => Kind<F, R, O, E, Array<B>>
  <A, R, O, E, B>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): Kind<F, R, O, E, Array<B>>
} =>
  dual(2, <A, R, O, E, B>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): Kind<F, R, O, E, Array<B>> => {
    return F.map(traverse(F)(self, f), compact)
  })

/**
 * @category instances
 * @since 1.0.0
 */
export const TraversableFilterable: traversableFilterable.TraversableFilterable<
  ReadonlyArrayTypeLambda
> = {
  traversePartitionMap: traversePartitionMap as any,
  traverseFilterMap: traverseFilterMap as any
}

/**
 * Filter values inside a context.
 *
 * @since 1.0.0
 */
export const traverseFilter: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <B extends A, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, R, O, E, boolean>
  ): (self: ReadonlyArray<B>) => Kind<F, R, O, E, Array<B>>
  <B extends A, R, O, E, A = B>(
    self: ReadonlyArray<B>,
    predicate: (a: A) => Kind<F, R, O, E, boolean>
  ): Kind<F, R, O, E, Array<B>>
} = traversableFilterable.traverseFilter(TraversableFilterable) as any

/**
 * @since 1.0.0
 */
export const traversePartition: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <B extends A, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, R, O, E, boolean>
  ): (self: ReadonlyArray<B>) => Kind<F, R, O, E, [Array<B>, Array<B>]>
  <B extends A, R, O, E, A = B>(
    self: ReadonlyArray<B>,
    predicate: (a: A) => Kind<F, R, O, E, boolean>
  ): Kind<F, R, O, E, [Array<B>, Array<B>]>
} = traversableFilterable.traversePartition(TraversableFilterable) as any

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => Array<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Array<B>
} = <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => predicate(b) ? [b] : []

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftOption = <A extends Array<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A): Array<B> => fromOption(f(...a))

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromNullable = <A>(a: A): Array<NonNullable<A>> => a == null ? empty() : [a as NonNullable<A>]

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftNullable = <A extends Array<unknown>, B>(
  f: (...a: A) => B | null | undefined
): (...a: A) => Array<NonNullable<B>> => (...a) => fromNullable(f(...a))

/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapNullable: {
  <A, B>(f: (a: A) => B | null | undefined): (self: ReadonlyArray<A>) => Array<NonNullable<B>>
  <A, B>(self: ReadonlyArray<A>, f: (a: A) => B | null | undefined): Array<NonNullable<B>>
} = dual(
  2,
  <A, B>(self: ReadonlyArray<A>, f: (a: A) => B | null | undefined): Array<NonNullable<B>> =>
    isNonEmptyReadonlyArray(self) ? fromNullable(f(headNonEmpty(self))) : empty()
)

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftEither = <A extends Array<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) =>
  (...a: A): Array<B> => {
    const e = f(...a)
    return E.isLeft(e) ? [] : [e.right]
  }

/**
 * Check if a predicate holds true for every `ReadonlyArray` member.
 *
 * @category predicates
 * @since 1.0.0
 */
export function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<ReadonlyArray<A>, ReadonlyArray<B>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>> {
  return (self) => self.every(predicate)
}

/**
 * Check if a predicate holds true for some `ReadonlyArray` member.
 *
 * @category predicates
 * @since 1.0.0
 */
export const some = <A>(predicate: Predicate<A>) =>
  (self: ReadonlyArray<A>): self is NonEmptyReadonlyArray<A> => self.some(predicate)

/**
 * Fold an `Iterable`, accumulating values in some `Monoid`, combining adjacent elements
 * using the specified separator.
 *
 * @since 1.0.0
 */
export const intercalate = <A>(M: Monoid<A>): {
  (middle: A): (self: Iterable<A>) => A
  (self: Iterable<A>, middle: A): A
} =>
  dual(
    2,
    (self: Iterable<A>, middle: A): A => {
      const as = fromIterable(self)
      return isNonEmptyReadonlyArray(as) ? intercalateNonEmpty(M)(as, middle) : M.empty
    }
  )

/**
 * Places an element in between members of a `NonEmptyReadonlyArray`, then folds the results using the provided `Semigroup`.
 *
 * @since 1.0.0
 */
export const intercalateNonEmpty = <A>(
  S: Semigroup<A>
): {
  (middle: A): (self: NonEmptyReadonlyArray<A>) => A
  (self: NonEmptyReadonlyArray<A>, middle: A): A
} =>
  dual(
    2,
    (self: NonEmptyReadonlyArray<A>, middle: A): A =>
      semigroup.intercalate(S, middle).combineMany(headNonEmpty(self), tailNonEmpty(self))
  )

/**
 * @since 1.0.0
 */
export const join: {
  (middle: string): (self: ReadonlyArray<string>) => string
  (self: ReadonlyArray<string>, middle: string): string
} = intercalate(string.Monoid)

/**
 * @since 1.0.0
 */
export const extend: {
  <A, B>(f: (as: ReadonlyArray<A>) => B): (self: ReadonlyArray<A>) => Array<B>
  <A, B>(self: ReadonlyArray<A>, f: (as: ReadonlyArray<A>) => B): Array<B>
} = dual(
  2,
  <A, B>(self: ReadonlyArray<A>, f: (as: ReadonlyArray<A>) => B): Array<B> => self.map((_, i, as) => f(as.slice(i)))
)

/**
 * @since 1.0.0
 */
export const min: {
  <A>(O: Order<A>): (self: NonEmptyReadonlyArray<A>) => A
  <A>(self: NonEmptyReadonlyArray<A>, O: Order<A>): A
} = dual(2, <A>(self: NonEmptyReadonlyArray<A>, O: Order<A>): A => {
  const S = semigroup.min(O)
  return self.reduce(S.combine)
})

/**
 * @since 1.0.0
 */
export const max: {
  <A>(O: Order<A>): (self: NonEmptyReadonlyArray<A>) => A
  <A>(self: NonEmptyReadonlyArray<A>, O: Order<A>): A
} = dual(2, <A>(self: NonEmptyReadonlyArray<A>, O: Order<A>): A => {
  const S = semigroup.max(O)
  return self.reduce(S.combine)
})

/**
 * @category constructors
 * @since 1.0.0
 */
export const unfold = <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>): Array<A> => {
  const out: Array<A> = []
  let next: B = b
  let o: Option<readonly [A, B]>
  while (O.isSome(o = f(next))) {
    const [a, b] = o.value
    out.push(a)
    next = b
  }
  return out
}

/**
 * @category instances
 * @since 1.0.0
 */
export const getUnionSemigroup = <A>(
  isEquivalent: (self: A, that: A) => boolean
): Semigroup<ReadonlyArray<A>> => semigroup.make(union(isEquivalent)) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const getUnionMonoid = <A>(
  isEquivalent: (self: A, that: A) => boolean
): Monoid<ReadonlyArray<A>> => {
  const S = getUnionSemigroup<A>(isEquivalent)
  return ({
    combine: S.combine,
    combineMany: S.combineMany,
    combineAll: (collection) => S.combineMany([], collection),
    empty: []
  })
}

/**
 * @category instances
 * @since 1.0.0
 */
export const getIntersectionSemigroup = <A>(
  isEquivalent: (self: A, that: A) => boolean
): Semigroup<ReadonlyArray<A>> => semigroup.make(intersection(isEquivalent)) as any

/**
 * Returns a `Semigroup` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup: <A>() => Semigroup<ReadonlyArray<A>> = semigroup.array

/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getMonoid: <A>() => Monoid<ReadonlyArray<A>> = monoid.array

/**
 * This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
 * The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
 * If all elements are equal, the arrays are then compared based on their length.
 * It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
 *
 * @category lifting
 * @since 1.0.0
 */
export const getOrder: <A>(O: Order<A>) => Order<ReadonlyArray<A>> = order.array

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: {
  <N extends string>(name: N): <A>(self: ReadonlyArray<A>) => Array<{ [K in N]: A }>
  <A, N extends string>(self: ReadonlyArray<A>, name: N): Array<{ [K in N]: A }>
} = invariant.bindTo(Invariant) as any

const let_: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): (self: ReadonlyArray<A>) => Array<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: ReadonlyArray<A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): Array<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = covariant.let(Covariant) as any

export {
  /**
   * @category do notation
   * @since 1.0.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 1.0.0
 */
export const Do: ReadonlyArray<{}> = of_.Do(Of)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => ReadonlyArray<B>
  ): (self: ReadonlyArray<A>) => Array<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: ReadonlyArray<A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => ReadonlyArray<B>
  ): Array<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = chainable.bind(Chainable) as any

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    that: ReadonlyArray<B>
  ): (self: ReadonlyArray<A>) => Array<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: ReadonlyArray<A>,
    name: Exclude<N, keyof A>,
    that: ReadonlyArray<B>
  ): Array<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = semiProduct.andThenBind(SemiProduct) as any
