/**
 * This module provides utility functions for working with arrays in TypeScript.
 *
 * @since 1.0.0
 */
import type { Either } from "@effect/data/Either";
import type { LazyArg } from "@effect/data/Function";
import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Option } from "@effect/data/Option";
import type { Predicate, Refinement } from "@effect/data/Predicate";
import * as applicative from "@effect/data/typeclass/Applicative";
import * as chainable from "@effect/data/typeclass/Chainable";
import type { Coproduct } from "@effect/data/typeclass/Coproduct";
import * as covariant from "@effect/data/typeclass/Covariant";
import type * as filterable from "@effect/data/typeclass/Filterable";
import * as flatMap_ from "@effect/data/typeclass/FlatMap";
import * as foldable from "@effect/data/typeclass/Foldable";
import * as invariant from "@effect/data/typeclass/Invariant";
import type * as monad from "@effect/data/typeclass/Monad";
import type { Monoid } from "@effect/data/typeclass/Monoid";
import * as order from "@effect/data/typeclass/Order";
import type { Order } from "@effect/data/typeclass/Order";
import type * as pointed from "@effect/data/typeclass/Pointed";
import type * as product_ from "@effect/data/typeclass/Product";
import * as semiApplicative from "@effect/data/typeclass/SemiApplicative";
import type { Semigroup } from "@effect/data/typeclass/Semigroup";
import * as semiProduct from "@effect/data/typeclass/SemiProduct";
import * as traversable from "@effect/data/typeclass/Traversable";
import * as traversableFilterable from "@effect/data/typeclass/TraversableFilterable";
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface ReadonlyArrayTypeLambda extends TypeLambda {
    readonly type: ReadonlyArray<this["Target"]>;
}
/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyReadonlyArray<A> = readonly [A, ...Array<A>];
/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyArray<A> = [A, ...Array<A>];
/**
 * Builds a `NonEmptyArray` from an non-empty collection of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const make: <Elements extends [any, ...any[]]>(...elements: Elements) => [Elements[number], ...Elements[number][]];
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
export declare const makeBy: <A>(n: number, f: (i: number) => A) => [A, ...A[]];
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
export declare const range: (start: number, end: number) => [number, ...number[]];
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
export declare const replicate: {
    (n: number): <A>(a: A) => NonEmptyArray<A>;
    <A>(a: A, n: number): NonEmptyArray<A>;
};
/**
 * @category conversions
 * @since 1.0.0
 */
export declare const fromIterable: <A>(collection: Iterable<A>) => Array<A>;
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
export declare const fromRecord: <K extends string, A>(self: Readonly<Record<K, A>>) => Array<[K, A]>;
/**
 * @category conversions
 * @since 1.0.0
 */
export declare const fromOption: <A>(self: Option<A>) => Array<A>;
/**
 * @category conversions
 * @since 1.0.0
 */
export declare const fromEither: <E, A>(self: Either<E, A>) => Array<A>;
/**
 * @category pattern matching
 * @since 1.0.0
 */
export declare const match: {
    <B, A, C = B>(onEmpty: LazyArg<B>, onNonEmpty: (self: NonEmptyReadonlyArray<A>) => C): (self: ReadonlyArray<A>) => B | C;
    <A, B, C = B>(self: ReadonlyArray<A>, onEmpty: LazyArg<B>, onNonEmpty: (self: NonEmptyReadonlyArray<A>) => C): B | C;
};
/**
 * @category pattern matching
 * @since 1.0.0
 */
export declare const matchLeft: {
    <B, A, C = B>(onEmpty: LazyArg<B>, onNonEmpty: (head: A, tail: Array<A>) => C): (self: ReadonlyArray<A>) => B | C;
    <A, B, C = B>(self: ReadonlyArray<A>, onEmpty: LazyArg<B>, onNonEmpty: (head: A, tail: Array<A>) => C): B | C;
};
/**
 * @category pattern matching
 * @since 1.0.0
 */
export declare const matchRight: {
    <B, A, C = B>(onEmpty: LazyArg<B>, onNonEmpty: (init: Array<A>, last: A) => C): (self: ReadonlyArray<A>) => B | C;
    <A, B, C = B>(self: ReadonlyArray<A>, onEmpty: LazyArg<B>, onNonEmpty: (init: Array<A>, last: A) => C): B | C;
};
/**
 * Prepend an element to the front of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
export declare const prepend: {
    <B>(head: B): <A>(self: Iterable<A>) => NonEmptyArray<A | B>;
    <A, B>(self: Iterable<A>, head: B): NonEmptyArray<A | B>;
};
/**
 * @since 1.0.0
 */
export declare const prependAll: {
    <B>(that: Iterable<B>): <A>(self: Iterable<A>) => Array<A | B>;
    <A, B>(self: Iterable<A>, that: Iterable<B>): Array<A | B>;
};
/**
 * @since 1.0.0
 */
export declare const prependAllNonEmpty: {
    <B>(that: NonEmptyReadonlyArray<B>): <A>(self: Iterable<A>) => NonEmptyArray<A | B>;
    <B>(that: Iterable<B>): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>;
    <A, B>(self: Iterable<A>, that: NonEmptyReadonlyArray<B>): NonEmptyArray<A | B>;
    <A, B>(self: NonEmptyReadonlyArray<A>, that: Iterable<B>): NonEmptyArray<A | B>;
};
/**
 * Append an element to the end of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
export declare const append: {
    <B>(last: B): <A>(self: Iterable<A>) => NonEmptyArray<A | B>;
    <A, B>(self: Iterable<A>, last: B): NonEmptyArray<A | B>;
};
/**
 * @since 1.0.0
 */
export declare const appendAll: {
    <B>(that: Iterable<B>): <A>(self: Iterable<A>) => Array<A | B>;
    <A, B>(self: Iterable<A>, that: Iterable<B>): Array<A | B>;
};
/**
 * @since 1.0.0
 */
export declare const appendAllNonEmpty: {
    <B>(that: NonEmptyReadonlyArray<B>): <A>(self: Iterable<A>) => NonEmptyArray<A | B>;
    <B>(that: Iterable<B>): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>;
    <A, B>(self: Iterable<A>, that: NonEmptyReadonlyArray<B>): NonEmptyArray<A | B>;
    <A, B>(self: NonEmptyReadonlyArray<A>, that: Iterable<B>): NonEmptyArray<A | B>;
};
/**
 * Reduce an `Iterable` from the left, keeping all intermediate results instead of only the final result.
 *
 * @category folding
 * @since 1.0.0
 */
export declare const scan: {
    <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<A>) => NonEmptyArray<B>;
    <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A) => B): NonEmptyArray<B>;
};
/**
 * Reduce an `Iterable` from the right, keeping all intermediate results instead of only the final result.
 *
 * @category folding
 * @since 1.0.0
 */
export declare const scanRight: {
    <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<A>) => NonEmptyArray<B>;
    <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A) => B): NonEmptyArray<B>;
};
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
export declare const isEmptyArray: <A>(self: A[]) => self is [];
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
export declare const isEmptyReadonlyArray: <A>(self: ReadonlyArray<A>) => self is readonly [];
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
export declare const isNonEmptyArray: <A>(self: Array<A>) => self is NonEmptyArray<A>;
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
export declare const isNonEmptyReadonlyArray: <A>(self: ReadonlyArray<A>) => self is NonEmptyReadonlyArray<A>;
/**
 * Return the number of elements in a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const length: <A>(self: readonly A[]) => number;
/**
 * This function provides a safe way to read a value at a particular index from a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const get: {
    (index: number): <A>(self: ReadonlyArray<A>) => Option<A>;
    <A>(self: ReadonlyArray<A>, index: number): Option<A>;
};
/**
 * Gets an element unsafely, will throw on out of bounds.
 *
 * @since 1.0.0
 * @category unsafe
 */
export declare const unsafeGet: {
    (index: number): <A>(self: ReadonlyArray<A>) => A;
    <A>(self: ReadonlyArray<A>, index: number): A;
};
/**
 * Return a tuple containing the first element, and a new `Array` of the remaining elements, if any.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const unprepend: <A>(self: readonly [A, ...A[]]) => [A, A[]];
/**
 * Return a tuple containing a copy of the `NonEmptyReadonlyArray` without its last element, and that last element.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const unappend: <A>(self: readonly [A, ...A[]]) => [A[], A];
/**
 * Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const head: <A>(self: ReadonlyArray<A>) => Option<A>;
/**
 * @category getters
 * @since 1.0.0
 */
export declare const headNonEmpty: <A>(self: NonEmptyReadonlyArray<A>) => A;
/**
 * Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const last: <A>(self: readonly A[]) => Option<A>;
/**
 * @category getters
 * @since 1.0.0
 */
export declare const lastNonEmpty: <A>(self: readonly [A, ...A[]]) => A;
/**
 * Get all but the first element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const tail: <A>(self: Iterable<A>) => Option<A[]>;
/**
 * @category getters
 * @since 1.0.0
 */
export declare const tailNonEmpty: <A>(self: readonly [A, ...A[]]) => A[];
/**
 * Get all but the last element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const init: <A>(self: Iterable<A>) => Option<A[]>;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const initNonEmpty: <A>(self: readonly [A, ...A[]]) => A[];
/**
 * Keep only a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const take: {
    (n: number): <A>(self: Iterable<A>) => Array<A>;
    <A>(self: Iterable<A>, n: number): Array<A>;
};
/**
 * Keep only a max number of elements from the end of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const takeRight: {
    (n: number): <A>(self: Iterable<A>) => Array<A>;
    <A>(self: Iterable<A>, n: number): Array<A>;
};
/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const takeWhile: {
    <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Array<B>;
    <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Array<B>;
    <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Array<B>;
    <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Array<B>;
};
/**
 * Split an `Iterable` into two parts:
 *
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @category filtering
 * @since 1.0.0
 */
export declare const span: {
    <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => [init: Array<B>, rest: Array<A>];
    <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => [init: Array<B>, rest: Array<B>];
    <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): [init: Array<B>, rest: Array<A>];
    <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): [init: Array<B>, rest: Array<B>];
};
/**
 * Drop a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const drop: {
    (n: number): <A>(self: Iterable<A>) => Array<A>;
    <A>(self: Iterable<A>, n: number): Array<A>;
};
/**
 * Drop a max number of elements from the end of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const dropRight: {
    (n: number): <A>(self: Iterable<A>) => Array<A>;
    <A>(self: Iterable<A>, n: number): Array<A>;
};
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const dropWhile: {
    <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Array<B>;
    <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Array<B>;
    <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Array<B>;
    <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Array<B>;
};
/**
 * Return the first index for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const findFirstIndex: {
    <A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<number>;
    <A>(self: Iterable<A>, predicate: Predicate<A>): Option<number>;
};
/**
 * Return the last index for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const findLastIndex: {
    <A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<number>;
    <A>(self: Iterable<A>, predicate: Predicate<A>): Option<number>;
};
/**
 * Find the first element for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const findFirst: {
    <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Option<B>;
    <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Option<B>;
    <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Option<B>;
    <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Option<B>;
};
/**
 * Find the last element for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const findLast: {
    <A, B extends A>(refinement: Refinement<A, B>): (self: Iterable<A>) => Option<B>;
    <A>(predicate: Predicate<A>): <B extends A>(self: Iterable<B>) => Option<B>;
    <A, B extends A>(self: Iterable<A>, refinement: Refinement<A, B>): Option<B>;
    <B extends A, A>(self: Iterable<B>, predicate: Predicate<A>): Option<B>;
};
/**
 * Insert an element at the specified index, creating a new `NonEmptyArray`,
 * or return `None` if the index is out of bounds.
 *
 * @since 1.0.0
 */
export declare const insertAt: {
    <B>(i: number, b: B): <A>(self: Iterable<A>) => Option<NonEmptyArray<A | B>>;
    <A, B>(self: Iterable<A>, i: number, b: B): Option<NonEmptyArray<A | B>>;
};
/**
 * Change the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export declare const replace: {
    <B>(i: number, b: B): <A>(self: Iterable<A>) => Array<A | B>;
    <A, B>(self: Iterable<A>, i: number, b: B): Array<A | B>;
};
/**
 * @since 1.0.0
 */
export declare const replaceOption: {
    <B>(i: number, b: B): <A>(self: Iterable<A>) => Option<Array<A | B>>;
    <A, B>(self: Iterable<A>, i: number, b: B): Option<Array<A | B>>;
};
/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export declare const modify: {
    <A, B>(i: number, f: (a: A) => B): (self: Iterable<A>) => Array<A | B>;
    <A, B>(self: Iterable<A>, i: number, f: (a: A) => B): Array<A | B>;
};
/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return `None` if the index is out of bounds.
 *
 * @since 1.0.0
 */
export declare const modifyOption: {
    <A, B>(i: number, f: (a: A) => B): (self: Iterable<A>) => Option<Array<A | B>>;
    <A, B>(self: Iterable<A>, i: number, f: (a: A) => B): Option<Array<A | B>>;
};
/**
 * Delete the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export declare const remove: {
    (i: number): <A>(self: Iterable<A>) => Array<A>;
    <A>(self: Iterable<A>, i: number): Array<A>;
};
/**
 * Reverse an `Iterable`, creating a new `Array`.
 *
 * @since 1.0.0
 */
export declare const reverse: <A>(self: Iterable<A>) => A[];
/**
 * @since 1.0.0
 */
export declare const reverseNonEmpty: <A>(self: readonly [A, ...A[]]) => [A, ...A[]];
/**
 * Return all the `Right` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const rights: <E, A>(self: Iterable<Either<E, A>>) => Array<A>;
/**
 * Return all the `Left` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const lefts: <E, A>(self: Iterable<Either<E, A>>) => Array<E>;
/**
 * Sort the elements of an `Iterable` in increasing order, creating a new `Array`.
 *
 * @category sorting
 * @since 1.0.0
 */
export declare const sort: {
    <B>(O: Order<B>): <A extends B>(self: Iterable<A>) => Array<A>;
    <A extends B, B>(self: Iterable<A>, O: Order<B>): Array<A>;
};
/**
 * Sort the elements of a `NonEmptyReadonlyArray` in increasing order, creating a new `NonEmptyArray`.
 *
 * @category sorting
 * @since 1.0.0
 */
export declare const sortNonEmpty: {
    <B>(O: Order<B>): <A extends B>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>;
    <A extends B, B>(self: NonEmptyReadonlyArray<A>, O: Order<B>): NonEmptyArray<A>;
};
/**
 * Sort the elements of an `Iterable` in increasing order, where elements are compared
 * using first `orders[0]`, then `orders[1]`, etc...
 *
 * @category sorting
 * @since 1.0.0
 */
export declare const sortBy: <B>(...orders: readonly order.Order<B>[]) => <A extends B>(self: Iterable<A>) => A[];
/**
 * @category sorting
 * @since 1.0.0
 */
export declare const sortByNonEmpty: <B>(...orders: readonly order.Order<B>[]) => <A extends B>(as: readonly [A, ...A[]]) => [A, ...A[]];
/**
 * Takes two `Iterable`s and returns an `Array` of corresponding pairs.
 * If one input `Iterable` is short, excess elements of the
 * longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
export declare const zip: {
    <B>(that: Iterable<B>): <A>(self: Iterable<A>) => Array<[A, B]>;
    <A, B>(self: Iterable<A>, that: Iterable<B>): Array<[A, B]>;
};
/**
 * Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
 * input `Iterable` is short, excess elements of the longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
export declare const zipWith: {
    <B, A, C>(that: Iterable<B>, f: (a: A, b: B) => C): (self: Iterable<A>) => Array<C>;
    <B, A, C>(self: Iterable<A>, that: Iterable<B>, f: (a: A, b: B) => C): Array<C>;
};
/**
 * @since 1.0.0
 */
export declare const zipNonEmpty: {
    <B>(that: NonEmptyReadonlyArray<B>): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<[A, B]>;
    <A, B>(self: NonEmptyReadonlyArray<A>, that: NonEmptyReadonlyArray<B>): NonEmptyArray<[A, B]>;
};
/**
 * @since 1.0.0
 */
export declare const zipNonEmptyWith: {
    <B, A, C>(that: NonEmptyReadonlyArray<B>, f: (a: A, b: B) => C): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<C>;
    <A, B, C>(self: NonEmptyReadonlyArray<A>, that: NonEmptyReadonlyArray<B>, f: (a: A, b: B) => C): NonEmptyArray<C>;
};
/**
 * This function is the inverse of `zip`. Takes an `Iterable` of pairs and return two corresponding `Array`s.
 *
 * @since 1.0.0
 */
export declare const unzip: <A, B>(self: Iterable<[A, B]>) => [A[], B[]];
/**
 * @since 1.0.0
 */
export declare const unzipNonEmpty: <A, B>(self: readonly [[A, B], ...[A, B][]]) => [[A, ...A[]], [B, ...B[]]];
/**
 * Places an element in between members of an `Iterable`
 *
 * @since 1.0.0
 */
export declare const intersperse: {
    <B>(middle: B): <A>(self: Iterable<A>) => Array<A | B>;
    <A, B>(self: Iterable<A>, middle: B): Array<A | B>;
};
/**
 * Places an element in between members of a `NonEmptyReadonlyArray`
 *
 * @since 1.0.0
 */
export declare const intersperseNonEmpty: {
    <B>(middle: B): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>;
    <A, B>(self: NonEmptyReadonlyArray<A>, middle: B): NonEmptyArray<A | B>;
};
/**
 * Apply a function to the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export declare const modifyNonEmptyHead: {
    <A, B>(f: (a: A) => B): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>;
    <A, B>(self: NonEmptyReadonlyArray<A>, f: (a: A) => B): NonEmptyArray<A | B>;
};
/**
 * Change the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export declare const setNonEmptyHead: {
    <B>(b: B): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>;
    <A, B>(self: NonEmptyReadonlyArray<A>, b: B): NonEmptyArray<A | B>;
};
/**
 * Apply a function to the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export declare const modifyNonEmptyLast: {
    <A, B>(f: (a: A) => B): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>;
    <A, B>(self: NonEmptyReadonlyArray<A>, f: (a: A) => B): NonEmptyArray<A | B>;
};
/**
 * Change the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export declare const setNonEmptyLast: {
    <B>(b: B): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>;
    <A, B>(self: NonEmptyReadonlyArray<A>, b: B): NonEmptyArray<A | B>;
};
/**
 * Rotate an `Iterable` by `n` steps.
 *
 * @since 1.0.0
 */
export declare const rotate: {
    (n: number): <A>(self: Iterable<A>) => Array<A>;
    <A>(self: Iterable<A>, n: number): Array<A>;
};
/**
 * Rotate a `NonEmptyReadonlyArray` by `n` steps.
 *
 * @since 1.0.0
 */
export declare const rotateNonEmpty: {
    (n: number): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>;
    <A>(self: NonEmptyReadonlyArray<A>, n: number): NonEmptyArray<A>;
};
/**
 * Returns a function that checks if a `ReadonlyArray` contains a given value using a provided `equivalence` function.
 *
 * @category predicates
 * @since 1.0.0
 */
export declare const contains: <A>(isEquivalent: (self: A, that: A) => boolean) => {
    (a: A): (self: Iterable<A>) => boolean;
    (self: Iterable<A>, a: A): boolean;
};
/**
 * Remove duplicates from am `Iterable`, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 */
export declare const uniq: {
    <A>(isEquivalent: (self: A, that: A) => boolean): (self: Iterable<A>) => Array<A>;
    <A>(self: Iterable<A>, isEquivalent: (self: A, that: A) => boolean): Array<A>;
};
/**
 * Remove duplicates from a `NonEmptyReadonlyArray`, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 */
export declare const uniqNonEmpty: {
    <A>(isEquivalent: (self: A, that: A) => boolean): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>;
    <A>(self: NonEmptyReadonlyArray<A>, isEquivalent: (self: A, that: A) => boolean): NonEmptyArray<A>;
};
/**
 * A useful recursion pattern for processing an `Iterable` to produce a new `Array`, often used for "chopping" up the input
 * `Iterable`. Typically chop is called with some function that will consume an initial prefix of the `Iterable` and produce a
 * value and the rest of the `Array`.
 *
 * @since 1.0.0
 */
export declare const chop: {
    <A, B>(f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]): (self: Iterable<A>) => Array<B>;
    <A, B>(self: Iterable<A>, f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]): Array<B>;
};
/**
 * A useful recursion pattern for processing a `NonEmptyReadonlyArray` to produce a new `NonEmptyReadonlyArray`, often used for "chopping" up the input
 * `NonEmptyReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `NonEmptyReadonlyArray` and produce a
 * value and the tail of the `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export declare const chopNonEmpty: {
    <A, B>(f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<B>;
    <A, B>(self: NonEmptyReadonlyArray<A>, f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]): NonEmptyArray<B>;
};
/**
 * Splits an `Iterable` into two pieces, the first piece has max `n` elements.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const splitAt: {
    (n: number): <A>(self: Iterable<A>) => [Array<A>, Array<A>];
    <A>(self: Iterable<A>, n: number): [Array<A>, Array<A>];
};
/**
 * @since 1.0.0
 */
export declare const copy: {
    <A>(self: NonEmptyReadonlyArray<A>): NonEmptyArray<A>;
    <A>(self: ReadonlyArray<A>): Array<A>;
};
/**
 * Splits a `NonEmptyReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const splitNonEmptyAt: {
    (n: number): <A>(self: NonEmptyReadonlyArray<A>) => [NonEmptyArray<A>, Array<A>];
    <A>(self: NonEmptyReadonlyArray<A>, n: number): [NonEmptyArray<A>, Array<A>];
};
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
export declare const chunksOf: {
    (n: number): <A>(self: Iterable<A>) => Array<NonEmptyArray<A>>;
    <A>(self: Iterable<A>, n: number): Array<NonEmptyArray<A>>;
};
/**
 * Splits a `NonEmptyReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `NonEmptyReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const chunksOfNonEmpty: {
    (n: number): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<NonEmptyArray<A>>;
    <A>(self: NonEmptyReadonlyArray<A>, n: number): NonEmptyArray<NonEmptyArray<A>>;
};
/**
 * Group equal, consecutive elements of a `NonEmptyReadonlyArray` into `NonEmptyArray`s.
 *
 * @category grouping
 * @since 1.0.0
 */
export declare const group: {
    <A>(isEquivalent: (self: A, that: A) => boolean): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<NonEmptyArray<A>>;
    <A>(self: NonEmptyReadonlyArray<A>, isEquivalent: (self: A, that: A) => boolean): NonEmptyArray<NonEmptyArray<A>>;
};
/**
 * Splits an `Iterable` into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @category grouping
 * @since 1.0.0
 */
export declare const groupBy: {
    <A>(f: (a: A) => string): (self: Iterable<A>) => Record<string, NonEmptyArray<A>>;
    <A>(self: Iterable<A>, f: (a: A) => string): Record<string, NonEmptyArray<A>>;
};
/**
 * @since 1.0.0
 */
export declare const union: <A>(isEquivalent: (self: A, that: A) => boolean) => {
    (that: readonly A[]): (self: readonly A[]) => A[];
    (self: readonly A[], that: readonly A[]): A[];
};
/**
 * @since 1.0.0
 */
export declare const unionNonEmpty: <A>(isEquivalent: (self: A, that: A) => boolean) => {
    (that: readonly [A, ...A[]]): (self: readonly A[]) => [A, ...A[]];
    (that: readonly A[]): (self: readonly [A, ...A[]]) => [A, ...A[]];
    (self: readonly A[], that: readonly [A, ...A[]]): [A, ...A[]];
    (self: readonly [A, ...A[]], that: readonly A[]): [A, ...A[]];
};
/**
 * Creates an `Array` of unique values that are included in all given `Iterable`s.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
export declare const intersection: <A>(isEquivalent: (self: A, that: A) => boolean) => {
    (that: Iterable<A>): (self: Iterable<A>) => A[];
    (self: Iterable<A>, that: Iterable<A>): A[];
};
/**
 * Creates a `Array` of values not included in the other given `Iterable`.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
export declare const difference: <A>(isEquivalent: (self: A, that: A) => boolean) => {
    (that: Iterable<A>): (self: Iterable<A>) => A[];
    (self: Iterable<A>, that: Iterable<A>): A[];
};
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const empty: <A = never>() => Array<A>;
/**
 * Constructs a new `NonEmptyArray<A>` from the specified value.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const of: <A>(a: A) => [A, ...A[]];
/**
 * @category mapping
 * @since 1.0.0
 */
export declare const map: {
    <A, B>(f: (a: A, i: number) => B): (self: ReadonlyArray<A>) => Array<B>;
    <A, B>(self: ReadonlyArray<A>, f: (a: A, i: number) => B): Array<B>;
};
/**
 * @category mapping
 * @since 1.0.0
 */
export declare const mapNonEmpty: {
    <A, B>(f: (a: A, i: number) => B): (self: readonly [A, ...Array<A>]) => [B, ...Array<B>];
    <A, B>(self: readonly [A, ...Array<A>], f: (a: A, i: number) => B): [B, ...Array<B>];
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Covariant: covariant.Covariant<ReadonlyArrayTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Invariant: invariant.Invariant<ReadonlyArrayTypeLambda>;
/**
 * @category mapping
 * @since 1.0.0
 */
export declare const tupled: <A>(self: ReadonlyArray<A>) => Array<[A]>;
/**
 * @category mapping
 * @since 1.0.0
 */
export declare const flap: {
    <A, B>(a: A, self: ReadonlyArray<(a: A) => B>): Array<B>;
    <A, B>(self: ReadonlyArray<(a: A) => B>): (a: A) => Array<B>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Pointed: pointed.Pointed<ReadonlyArrayTypeLambda>;
/**
 * @category combining
 * @since 1.0.0
 */
export declare const flatMap: {
    <A, B>(f: (a: A, i: number) => ReadonlyArray<B>): (self: ReadonlyArray<A>) => Array<B>;
    <A, B>(self: ReadonlyArray<A>, f: (a: A, i: number) => ReadonlyArray<B>): Array<B>;
};
/**
 * @category combining
 * @since 1.0.0
 */
export declare const flatMapNonEmpty: {
    <A, B>(f: (a: A, i: number) => NonEmptyReadonlyArray<B>): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<B>;
    <A, B>(self: NonEmptyReadonlyArray<A>, f: (a: A, i: number) => NonEmptyReadonlyArray<B>): NonEmptyArray<B>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const FlatMap: flatMap_.FlatMap<ReadonlyArrayTypeLambda>;
/**
 * @category combining
 * @since 1.0.0
 */
export declare const flatten: <A>(self: ReadonlyArray<ReadonlyArray<A>>) => Array<A>;
/**
 * @category combining
 * @since 1.0.0
 */
export declare const flattenNonEmpty: <A>(self: NonEmptyReadonlyArray<NonEmptyReadonlyArray<A>>) => NonEmptyArray<A>;
/**
 * @since 1.0.0
 */
export declare const composeK: {
    <A, B, C>(afb: (a: A) => ReadonlyArray<B>, bfc: (b: B) => ReadonlyArray<C>): (a: A) => ReadonlyArray<C>;
    <B, C>(bfc: (b: B) => ReadonlyArray<C>): <A>(afb: (a: A) => ReadonlyArray<B>) => (a: A) => ReadonlyArray<C>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Chainable: chainable.Chainable<ReadonlyArrayTypeLambda>;
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const filterMap: {
    <A, B>(f: (a: A, i: number) => Option<B>): (self: Iterable<A>) => Array<B>;
    <A, B>(self: Iterable<A>, f: (a: A, i: number) => Option<B>): Array<B>;
};
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const partitionMap: {
    <A, B, C>(f: (a: A, i: number) => Either<B, C>): (self: Iterable<A>) => [Array<B>, Array<C>];
    <A, B, C>(self: Iterable<A>, f: (a: A, i: number) => Either<B, C>): [Array<B>, Array<C>];
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Filterable: filterable.Filterable<ReadonlyArrayTypeLambda>;
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const compact: <A>(self: Iterable<Option<A>>) => Array<A>;
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const filter: {
    <C extends A, B extends A, A = C>(refinement: (a: A, i: number) => a is B): (self: Iterable<C>) => Array<B>;
    <B extends A, A = B>(predicate: (a: A, i: number) => boolean): (self: Iterable<B>) => Array<B>;
    <C extends A, B extends A, A = C>(self: Iterable<C>, refinement: (a: A, i: number) => a is B): Array<B>;
    <B extends A, A = B>(self: Iterable<B>, predicate: (a: A, i: number) => boolean): Array<B>;
};
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const partition: {
    <C extends A, B extends A, A = C>(refinement: (a: A, i: number) => a is B): (self: Iterable<C>) => [Array<C>, Array<B>];
    <B extends A, A = B>(predicate: (a: A, i: number) => boolean): (self: Iterable<B>) => [Array<B>, Array<B>];
    <C extends A, B extends A, A = C>(self: Iterable<C>, refinement: (a: A, i: number) => a is B): [Array<C>, Array<B>];
    <B extends A, A = B>(self: Iterable<B>, predicate: (a: A, i: number) => boolean): [Array<B>, Array<B>];
};
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const separate: <A, B>(self: Iterable<Either<A, B>>) => [Array<A>, Array<B>];
/**
 * @category traversing
 * @since 1.0.0
 */
export declare const traverseNonEmpty: <F extends TypeLambda>(F: semiApplicative.SemiApplicative<F>) => {
    <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>): (self: readonly [A, ...A[]]) => Kind<F, R, O, E, [B, ...B[]]>;
    <A_1, R_1, O_1, E_1, B_1>(self: readonly [A_1, ...A_1[]], f: (a: A_1, i: number) => Kind<F, R_1, O_1, E_1, B_1>): Kind<F, R_1, O_1, E_1, [B_1, ...B_1[]]>;
};
/**
 * @category traversing
 * @since 1.0.0
 */
export declare const traverse: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>): (self: Iterable<A>) => Kind<F, R, O, E, B[]>;
    <A_1, R_1, O_1, E_1, B_1>(self: Iterable<A_1>, f: (a: A_1, i: number) => Kind<F, R_1, O_1, E_1, B_1>): Kind<F, R_1, O_1, E_1, B_1[]>;
};
/**
 * @category traversing
 * @since 1.0.0
 */
export declare const sequence: <F extends TypeLambda>(F: applicative.Applicative<F>) => <R, O, E, A>(self: readonly Kind<F, R, O, E, A>[]) => Kind<F, R, O, E, A[]>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Traversable: traversable.Traversable<ReadonlyArrayTypeLambda>;
/**
 * @category traversing
 * @since 1.0.0
 */
export declare const traverseTap: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <A, R, O, E, B>(self: ReadonlyArray<A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Array<A>>;
    <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): (self: ReadonlyArray<A>) => Kind<F, R, O, E, Array<A>>;
};
/**
 * @category traversing
 * @since 1.0.0
 */
export declare const sequenceNonEmpty: <F extends TypeLambda>(F: semiApplicative.SemiApplicative<F>) => <R, O, E, A>(self: readonly [Kind<F, R, O, E, A>, ...Kind<F, R, O, E, A>[]]) => Kind<F, R, O, E, [A, ...A[]]>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiProduct: semiProduct.SemiProduct<ReadonlyArrayTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiApplicative: semiApplicative.SemiApplicative<ReadonlyArrayTypeLambda>;
/**
 * @since 1.0.0
 */
export declare const ap: {
    <A, B>(self: ReadonlyArray<(a: A) => B>, that: ReadonlyArray<A>): Array<B>;
    <A>(that: ReadonlyArray<A>): <B>(self: ReadonlyArray<(a: A) => B>) => Array<B>;
};
/**
 * Lifts a binary function into `ReadonlyArray`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => {
    (self: ReadonlyArray<A>, that: ReadonlyArray<B>): Array<C>;
    (that: ReadonlyArray<B>): (self: ReadonlyArray<A>) => Array<C>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Product: product_.Product<ReadonlyArrayTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Applicative: applicative.Applicative<ReadonlyArrayTypeLambda>;
/**
 * @category lifting
 * @since 1.0.0
 */
export declare const liftMonoid: <A>(M: Monoid<A>) => Monoid<ReadonlyArray<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Monad: monad.Monad<ReadonlyArrayTypeLambda>;
/**
 * @category folding
 * @since 1.0.0
 */
export declare const reduce: {
    <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Iterable<A>) => B;
    <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A, i: number) => B): B;
};
/**
 * @category folding
 * @since 1.0.0
 */
export declare const reduceRight: {
    <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Iterable<A>) => B;
    <A, B>(self: Iterable<A>, b: B, f: (b: B, a: A, i: number) => B): B;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Foldable: foldable.Foldable<ReadonlyArrayTypeLambda>;
/**
 * @category folding
 * @since 1.0.0
 */
export declare const combineMap: <M>(Monoid: Monoid<M>) => {
    <A>(f: (a: A, i: number) => M): (self: Iterable<A>) => M;
    <A_1>(self: Iterable<A_1>, f: (a: A_1, i: number) => M): M;
};
/**
 * @category folding
 * @since 1.0.0
 */
export declare const combineMapNonEmpty: <S>(S: Semigroup<S>) => {
    <A>(f: (a: A, i: number) => S): (self: readonly [A, ...A[]]) => S;
    <A_1>(self: readonly [A_1, ...A_1[]], f: (a: A_1, i: number) => S): S;
};
/**
 * @category folding
 * @since 1.0.0
 */
export declare const reduceKind: <G extends TypeLambda>(G: monad.Monad<G>) => {
    <B, A, R, O, E>(b: B, f: (b: B, a: A) => Kind<G, R, O, E, B>): (self: ReadonlyArray<A>) => Kind<G, R, O, E, B>;
    <A, B, R, O, E>(self: ReadonlyArray<A>, b: B, f: (b: B, a: A) => Kind<G, R, O, E, B>): Kind<G, R, O, E, B>;
};
/**
 * @category folding
 * @since 1.0.0
 */
export declare const coproductMapKind: <G extends TypeLambda>(G: Coproduct<G>) => {
    <A, R, O, E, B>(f: (a: A) => Kind<G, R, O, E, B>): (self: ReadonlyArray<A>) => Kind<G, R, O, E, B>;
    <A, R, O, E, B>(self: ReadonlyArray<A>, f: (a: A) => Kind<G, R, O, E, B>): Kind<G, R, O, E, B>;
};
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const traversePartitionMap: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <A, R, O, E, B, C>(f: (a: A) => Kind<F, R, O, E, Either<B, C>>): (self: readonly A[]) => Kind<F, R, O, E, [B[], C[]]>;
    <A_1, R_1, O_1, E_1, B_1, C_1>(self: readonly A_1[], f: (a: A_1) => Kind<F, R_1, O_1, E_1, Either<B_1, C_1>>): Kind<F, R_1, O_1, E_1, [B_1[], C_1[]]>;
};
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const traverseFilterMap: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, Option<B>>): (self: readonly A[]) => Kind<F, R, O, E, B[]>;
    <A_1, R_1, O_1, E_1, B_1>(self: readonly A_1[], f: (a: A_1) => Kind<F, R_1, O_1, E_1, Option<B_1>>): Kind<F, R_1, O_1, E_1, B_1[]>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const TraversableFilterable: traversableFilterable.TraversableFilterable<ReadonlyArrayTypeLambda>;
/**
 * Filter values inside a context.
 *
 * @since 1.0.0
 */
export declare const traverseFilter: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <B extends A, R, O, E, A = B>(predicate: (a: A) => Kind<F, R, O, E, boolean>): (self: ReadonlyArray<B>) => Kind<F, R, O, E, Array<B>>;
    <B extends A, R, O, E, A = B>(self: ReadonlyArray<B>, predicate: (a: A) => Kind<F, R, O, E, boolean>): Kind<F, R, O, E, Array<B>>;
};
/**
 * @since 1.0.0
 */
export declare const traversePartition: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <B extends A, R, O, E, A = B>(predicate: (a: A) => Kind<F, R, O, E, boolean>): (self: ReadonlyArray<B>) => Kind<F, R, O, E, [Array<B>, Array<B>]>;
    <B extends A, R, O, E, A = B>(self: ReadonlyArray<B>, predicate: (a: A) => Kind<F, R, O, E, boolean>): Kind<F, R, O, E, [Array<B>, Array<B>]>;
};
/**
 * @category lifting
 * @since 1.0.0
 */
export declare const liftPredicate: {
    <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => Array<B>;
    <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Array<B>;
};
/**
 * @category lifting
 * @since 1.0.0
 */
export declare const liftOption: <A extends unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => B[];
/**
 * @category conversions
 * @since 1.0.0
 */
export declare const fromNullable: <A>(a: A) => NonNullable<A>[];
/**
 * @category lifting
 * @since 1.0.0
 */
export declare const liftNullable: <A extends unknown[], B>(f: (...a: A) => B | null | undefined) => (...a: A) => NonNullable<B>[];
/**
 * @category combining
 * @since 1.0.0
 */
export declare const flatMapNullable: {
    <A, B>(f: (a: A) => B | null | undefined): (self: ReadonlyArray<A>) => Array<NonNullable<B>>;
    <A, B>(self: ReadonlyArray<A>, f: (a: A) => B | null | undefined): Array<NonNullable<B>>;
};
/**
 * @category lifting
 * @since 1.0.0
 */
export declare const liftEither: <A extends unknown[], E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => B[];
/**
 * Check if a predicate holds true for every `ReadonlyArray` member.
 *
 * @category predicates
 * @since 1.0.0
 */
export declare function every<A, B extends A>(refinement: Refinement<A, B>): Refinement<ReadonlyArray<A>, ReadonlyArray<B>>;
export declare function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>>;
/**
 * Check if a predicate holds true for some `ReadonlyArray` member.
 *
 * @category predicates
 * @since 1.0.0
 */
export declare const some: <A>(predicate: Predicate<A>) => (self: readonly A[]) => self is readonly [A, ...A[]];
/**
 * Fold an `Iterable`, accumulating values in some `Monoid`, combining adjacent elements
 * using the specified separator.
 *
 * @since 1.0.0
 */
export declare const intercalate: <A>(M: Monoid<A>) => {
    (middle: A): (self: Iterable<A>) => A;
    (self: Iterable<A>, middle: A): A;
};
/**
 * Places an element in between members of a `NonEmptyReadonlyArray`, then folds the results using the provided `Semigroup`.
 *
 * @since 1.0.0
 */
export declare const intercalateNonEmpty: <A>(S: Semigroup<A>) => {
    (middle: A): (self: readonly [A, ...A[]]) => A;
    (self: readonly [A, ...A[]], middle: A): A;
};
/**
 * @since 1.0.0
 */
export declare const join: {
    (middle: string): (self: ReadonlyArray<string>) => string;
    (self: ReadonlyArray<string>, middle: string): string;
};
/**
 * @since 1.0.0
 */
export declare const extend: {
    <A, B>(f: (as: ReadonlyArray<A>) => B): (self: ReadonlyArray<A>) => Array<B>;
    <A, B>(self: ReadonlyArray<A>, f: (as: ReadonlyArray<A>) => B): Array<B>;
};
/**
 * @since 1.0.0
 */
export declare const min: {
    <A>(O: Order<A>): (self: NonEmptyReadonlyArray<A>) => A;
    <A>(self: NonEmptyReadonlyArray<A>, O: Order<A>): A;
};
/**
 * @since 1.0.0
 */
export declare const max: {
    <A>(O: Order<A>): (self: NonEmptyReadonlyArray<A>) => A;
    <A>(self: NonEmptyReadonlyArray<A>, O: Order<A>): A;
};
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const unfold: <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>) => A[];
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getUnionSemigroup: <A>(isEquivalent: (self: A, that: A) => boolean) => Semigroup<readonly A[]>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getUnionMonoid: <A>(isEquivalent: (self: A, that: A) => boolean) => Monoid<readonly A[]>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getIntersectionSemigroup: <A>(isEquivalent: (self: A, that: A) => boolean) => Semigroup<readonly A[]>;
/**
 * Returns a `Semigroup` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const getSemigroup: <A>() => Semigroup<ReadonlyArray<A>>;
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const getMonoid: <A>() => Monoid<ReadonlyArray<A>>;
/**
 * This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
 * The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
 * If all elements are equal, the arrays are then compared based on their length.
 * It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
 *
 * @category lifting
 * @since 1.0.0
 */
export declare const getOrder: <A>(O: Order<A>) => Order<ReadonlyArray<A>>;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bindTo: {
    <N extends string>(name: N): <A>(self: ReadonlyArray<A>) => Array<{
        [K in N]: A;
    }>;
    <A, N extends string>(self: ReadonlyArray<A>, name: N): Array<{
        [K in N]: A;
    }>;
};
declare const let_: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): (self: ReadonlyArray<A>) => Array<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: ReadonlyArray<A>, name: Exclude<N, keyof A>, f: (a: A) => B): Array<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
export { 
/**
 * @category do notation
 * @since 1.0.0
 */
let_ as let };
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const Do: ReadonlyArray<{}>;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bind: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => ReadonlyArray<B>): (self: ReadonlyArray<A>) => Array<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: ReadonlyArray<A>, name: Exclude<N, keyof A>, f: (a: A) => ReadonlyArray<B>): Array<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export declare const andThenBind: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, that: ReadonlyArray<B>): (self: ReadonlyArray<A>) => Array<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: ReadonlyArray<A>, name: Exclude<N, keyof A>, that: ReadonlyArray<B>): Array<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
//# sourceMappingURL=ReadonlyArray.d.ts.map