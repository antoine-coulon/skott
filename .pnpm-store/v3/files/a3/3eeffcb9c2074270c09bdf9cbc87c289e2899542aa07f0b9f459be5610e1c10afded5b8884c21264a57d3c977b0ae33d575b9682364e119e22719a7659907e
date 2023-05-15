/**
 * This module provides an implementation of the `Equivalence` type class, which defines a binary relation
 * that is reflexive, symmetric, and transitive. In other words, it defines a notion of equivalence between values of a certain type.
 * These properties are also known in mathematics as an "equivalence relation".
 *
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function"
import type { TypeLambda } from "@effect/data/HKT"
import * as readonlyArray from "@effect/data/internal/ReadonlyArray"
import * as contravariant from "@effect/data/typeclass/Contravariant"
import type * as invariant from "@effect/data/typeclass/Invariant"
import type { Monoid } from "@effect/data/typeclass/Monoid"
import * as monoid from "@effect/data/typeclass/Monoid"
import * as product_ from "@effect/data/typeclass/Product"
import type { Semigroup } from "@effect/data/typeclass/Semigroup"
import * as semigroup from "@effect/data/typeclass/Semigroup"
import type * as semiProduct from "@effect/data/typeclass/SemiProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Equivalence<A> {
  (self: A, that: A): boolean
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface EquivalenceTypeLambda extends TypeLambda {
  readonly type: Equivalence<this["Target"]>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <A>(isEquivalent: (self: A, that: A) => boolean): Equivalence<A> =>
  (self: A, that: A): boolean => self === that || isEquivalent(self, that)

const isStrictEquivalent = (x: unknown, y: unknown) => x === y

/**
 * Return an `Equivalence` that uses strict equality (===) to compare values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const strict: <A>() => Equivalence<A> = () => isStrictEquivalent

/**
 * @category instances
 * @since 1.0.0
 */
export const string: Equivalence<string> = strict()

/**
 * @category instances
 * @since 1.0.0
 */
export const number: Equivalence<number> = strict()

/**
 * @category instances
 * @since 1.0.0
 */
export const boolean: Equivalence<boolean> = strict()

/**
 * @category instances
 * @since 1.0.0
 */
export const bigint: Equivalence<bigint> = strict()

/**
 * @category instances
 * @since 1.0.0
 */
export const symbol: Equivalence<symbol> = strict()

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = <A>(): Semigroup<Equivalence<A>> =>
  semigroup.make(
    (self, that) => make((x, y) => self(x, y) && that(x, y)),
    (self, collection) =>
      make((x, y) => {
        if (!self(x, y)) {
          return false
        }
        for (const equivalence of collection) {
          if (!equivalence(x, y)) {
            return false
          }
        }
        return true
      })
  )

const isAlwaysEquivalent: Equivalence<unknown> = (_x, _y) => true

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = <A>(): Monoid<Equivalence<A>> => monoid.fromSemigroup(getSemigroup<A>(), isAlwaysEquivalent)

/**
 * @category combinators
 * @since 1.0.0
 */
export const contramap: {
  <B, A>(f: (b: B) => A): (self: Equivalence<A>) => Equivalence<B>
  <A, B>(self: Equivalence<A>, f: (b: B) => A): Equivalence<B>
} = dual(
  2,
  <A, B>(self: Equivalence<A>, f: (b: B) => A): Equivalence<B> => make((x, y) => self(f(x), f(y)))
)

const imap = contravariant.imap<EquivalenceTypeLambda>(contramap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant: contravariant.Contravariant<EquivalenceTypeLambda> = {
  imap,
  contramap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<EquivalenceTypeLambda> = {
  imap
}

const product = <A, B>(self: Equivalence<A>, that: Equivalence<B>): Equivalence<[A, B]> =>
  make(([xa, xb], [ya, yb]) => self(xa, ya) && that(xb, yb))

const productAll = <A>(collection: Iterable<Equivalence<A>>): Equivalence<Array<A>> => {
  const equivalences = readonlyArray.fromIterable(collection)
  return make((x, y) => {
    const len = Math.min(x.length, y.length, equivalences.length)
    for (let i = 0; i < len; i++) {
      if (!equivalences[i](x[i], y[i])) {
        return false
      }
    }
    return true
  })
}

const productMany = <A>(
  self: Equivalence<A>,
  collection: Iterable<Equivalence<A>>
): Equivalence<[A, ...Array<A>]> => {
  const equivalence = productAll(collection)
  return make((x, y) => !self(x[0], y[0]) ? false : equivalence(x.slice(1), y.slice(1)))
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<EquivalenceTypeLambda> = {
  imap,
  product,
  productMany
}

const of: <A>(a: A) => Equivalence<A> = () => isAlwaysEquivalent

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<EquivalenceTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll
}

/**
 * Similar to `Promise.all` but operates on `Equivalence`s.
 *
 * ```
 * [Equivalence<A>, Equivalence<B>, ...] -> Equivalence<[A, B, ...]>
 * ```
 *
 * Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
 * by applying each `Equivalence` to the corresponding element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Equivalence<any>>>(
  ...predicates: T
) => Equivalence<Readonly<{ [I in keyof T]: [T[I]] extends [Equivalence<infer A>] ? A : never }>> = product_.tuple(
  Product
)

/**
 * Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
 * by applying each `Equivalence` to the corresponding property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export const struct: <R extends Record<string, Equivalence<any>>>(
  predicates: R
) => Equivalence<{ readonly [K in keyof R]: [R[K]] extends [Equivalence<infer A>] ? A : never }> = product_.struct(
  Product
)
