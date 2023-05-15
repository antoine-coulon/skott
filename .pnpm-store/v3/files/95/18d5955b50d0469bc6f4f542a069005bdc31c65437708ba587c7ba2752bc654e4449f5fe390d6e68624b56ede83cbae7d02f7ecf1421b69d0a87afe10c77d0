/**
 * This module provides utility functions for working with tuples in TypeScript.
 *
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function"
import type { TypeLambda } from "@effect/data/HKT"
import * as bicovariant from "@effect/data/typeclass/Bicovariant"
import * as equivalence from "@effect/data/typeclass/Equivalence"
import * as monoid from "@effect/data/typeclass/Monoid"
import * as order from "@effect/data/typeclass/Order"
import * as semigroup from "@effect/data/typeclass/Semigroup"

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface TupleTypeLambda extends TypeLambda {
  readonly type: [this["Out1"], this["Target"]]
}

/**
 * Constructs a new tuple from the provided values.
 *
 * @param elements - The list of elements to create the tuple from.
 *
 * @example
 * import { tuple } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(tuple(1, 'hello', true), [1, 'hello', true])
 *
 * @category constructors
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<any>>(...elements: A): A => elements

/**
 * Return the first element of a tuple.
 *
 * @param self - A tuple of length `2`.
 *
 * @example
 * import { getFirst } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(getFirst(["hello", 42]), "hello")
 *
 * @category getters
 * @since 1.0.0
 */
export const getFirst = <L, R>(self: readonly [L, R]): L => self[0]

/**
 * Return the second element of a tuple.
 *
 * @param self - A tuple of length `2`.
 *
 * @example
 * import { getSecond } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(getSecond(["hello", 42]), 42)
 *
 * @category getters
 * @since 1.0.0
 */
export const getSecond = <L, R>(self: readonly [L, R]): R => self[1]

/**
 * Transforms both elements of a tuple using the given functions.
 *
 * @param self - A tuple of length `2`.
 * @param f - The function to transform the first element of the tuple.
 * @param g - The function to transform the second element of the tuple.
 *
 * @example
 * import { bimap } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(
 *   bimap(["hello", 42], s => s.toUpperCase(), n => n.toString()),
 *   ["HELLO", "42"]
 * )
 *
 * @category mapping
 * @since 1.0.0
 */
export const bimap: {
  <L1, L2, R1, R2>(f: (e: L1) => L2, g: (a: R1) => R2): (self: readonly [L1, R1]) => [L2, R2]
  <L1, R1, L2, R2>(self: readonly [L1, R1], f: (e: L1) => L2, g: (a: R1) => R2): [L2, R2]
} = dual(
  3,
  <L1, R1, L2, R2>(
    self: readonly [L1, R1],
    f: (e: L1) => L2,
    g: (a: R1) => R2
  ): [L2, R2] => [f(self[0]), g(self[1])]
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Bicovariant: bicovariant.Bicovariant<TupleTypeLambda> = {
  bimap
}

/**
 * Transforms the first component of a tuple using a given function.
 *
 * @param self - A tuple of length `2`.
 * @param f - The function to transform the first element of the tuple.
 *
 * @example
 * import { mapFirst } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(
 *   mapFirst(["hello", 42], s => s.toUpperCase()),
 *   ["HELLO", 42]
 * )
 *
 * @category mapping
 * @since 1.0.0
 */
export const mapFirst: {
  <L1, L2>(f: (left: L1) => L2): <R>(self: readonly [L1, R]) => [L2, R]
  <L1, R, L2>(self: readonly [L1, R], f: (left: L1) => L2): [L2, R]
} = bicovariant.mapLeft(Bicovariant) as any

/**
 * Transforms the second component of a tuple using a given function.
 *
 * @param self - A tuple of length `2`.
 * @param f - The function to transform the second element of the tuple.
 *
 * @example
 * import { mapSecond } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(
 *   mapSecond(["hello", 42], n => n.toString()),
 *   ["hello", "42"]
 * )
 *
 * @category mapping
 * @since 1.0.0
 */
export const mapSecond: {
  <R1, R2>(f: (right: R1) => R2): <L>(self: readonly [L, R1]) => [L, R2]
  <L, R1, R2>(self: readonly [L, R1], f: (right: R1) => R2): [L, R2]
} = bicovariant.map(Bicovariant) as any

/**
 * Swaps the two elements of a tuple.
 *
 * @param self - A tuple of length `2`.
 *
 * @example
 * import { swap } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(swap(["hello", 42]), [42, "hello"])
 *
 * @since 1.0.0
 */
export const swap = <L, R>(self: readonly [L, R]): [R, L] => [self[1], self[0]]

/**
 * Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
 * by applying each `Equivalence` to the corresponding element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getEquivalence: <T extends ReadonlyArray<equivalence.Equivalence<any>>>(
  ...predicates: T
) => equivalence.Equivalence<
  Readonly<{ [I in keyof T]: [T[I]] extends [equivalence.Equivalence<infer A>] ? A : never }>
> = equivalence.tuple

/**
 * This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
 * The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
 * It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
 * of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getOrder: <T extends ReadonlyArray<order.Order<any>>>(
  ...elements: T
) => order.Order<{ [I in keyof T]: [T[I]] extends [order.Order<infer A>] ? A : never }> = order.tuple

/**
 * This function creates and returns a new `Semigroup` for a tuple of values based on the given `Semigroup`s for each element in the tuple.
 * The returned `Semigroup` combines two tuples of the same type by applying the corresponding `Semigroup` passed as arguments to each element in the tuple.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getSemigroup = semigroup.tuple

/**
 * This function creates and returns a new `Monoid` for a tuple of values based on the given `Monoid`s for each element in the tuple.
 * The returned `Monoid` combines two tuples of the same type by applying the corresponding `Monoid` passed as arguments to each element in the tuple.
 *
 * The `empty` value of the returned `Monoid` is the tuple of `empty` values of the input `Monoid`s.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getMonoid = monoid.tuple

/**
 * Appends an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const appendElement: {
  <B>(that: B): <A extends ReadonlyArray<unknown>>(self: A) => [...A, B]
  <A extends ReadonlyArray<unknown>, B>(self: A, that: B): [...A, B]
} = dual(2, <A extends ReadonlyArray<unknown>, B>(self: A, that: B): [...A, B] => [...self, that])

/*

  TODO:

  - at
  - swap

*/
