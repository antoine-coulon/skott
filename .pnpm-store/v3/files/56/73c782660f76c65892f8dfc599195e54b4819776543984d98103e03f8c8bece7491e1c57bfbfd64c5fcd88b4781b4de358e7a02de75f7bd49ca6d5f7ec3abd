/**
 * @since 1.0.0
 */

import type * as Data from "@effect/data/Data"
import * as Equal from "@effect/data/Equal"
import type { LazyArg } from "@effect/data/Function"
import { constNull, constUndefined, dual, identity } from "@effect/data/Function"
import * as Gen from "@effect/data/Gen"
import type { Kind, TypeLambda } from "@effect/data/HKT"
import * as either from "@effect/data/internal/Either"
import * as option from "@effect/data/internal/Option"
import * as N from "@effect/data/Number"
import type { Option } from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import * as applicative from "@effect/data/typeclass/Applicative"
import * as bicovariant from "@effect/data/typeclass/Bicovariant"
import * as chainable from "@effect/data/typeclass/Chainable"
import * as covariant from "@effect/data/typeclass/Covariant"
import type { Equivalence } from "@effect/data/typeclass/Equivalence"
import * as equivalence from "@effect/data/typeclass/Equivalence"
import * as flatMap_ from "@effect/data/typeclass/FlatMap"
import * as foldable from "@effect/data/typeclass/Foldable"
import * as invariant from "@effect/data/typeclass/Invariant"
import type * as monad from "@effect/data/typeclass/Monad"
import type { Monoid } from "@effect/data/typeclass/Monoid"
import * as of_ from "@effect/data/typeclass/Of"
import type * as pointed from "@effect/data/typeclass/Pointed"
import * as product_ from "@effect/data/typeclass/Product"
import type * as semiAlternative from "@effect/data/typeclass/SemiAlternative"
import * as semiApplicative from "@effect/data/typeclass/SemiApplicative"
import * as semiCoproduct from "@effect/data/typeclass/SemiCoproduct"
import type { Semigroup } from "@effect/data/typeclass/Semigroup"
import * as semigroup from "@effect/data/typeclass/Semigroup"
import * as semiProduct from "@effect/data/typeclass/SemiProduct"
import * as traversable from "@effect/data/typeclass/Traversable"

/**
 * @category models
 * @since 1.0.0
 */
export type Either<E, A> = Left<E> | Right<A>

/**
 * @category models
 * @since 1.0.0
 */
export interface Left<E> extends Data.Case {
  readonly _tag: "Left"
  readonly left: E
}

/**
 * @category models
 * @since 1.0.0
 */
export interface Right<A> extends Data.Case {
  readonly _tag: "Right"
  readonly right: A
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface EitherTypeLambda extends TypeLambda {
  readonly type: Either<this["Out1"], this["Target"]>
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 1.0.0
 */
export const right: <A>(a: A) => Either<never, A> = either.right

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 1.0.0
 */
export const left: <E>(e: E) => Either<E, never> = either.left

/**
 * Tests if a value is a `Either`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isEither, left, right } from '@effect/data/Either'
 *
 * assert.deepStrictEqual(isEither(right(1)), true)
 * assert.deepStrictEqual(isEither(left("error")), true)
 * assert.deepStrictEqual(isEither({ right: 1 }), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isEither = (input: unknown): input is Either<unknown, unknown> =>
  typeof input === "object" && input != null && "_tag" in input &&
  (input["_tag"] === "Left" || input["_tag"] === "Right") && Equal.isEqual(input)

/**
 * Determine if a `Either` is a `Left`.
 *
 * @param self - The `Either` to check.
 *
 * @example
 * import { isLeft, left, right } from '@effect/data/Either'
 *
 * assert.deepStrictEqual(isLeft(right(1)), false)
 * assert.deepStrictEqual(isLeft(left("error")), true)
 *
 * @category guards
 * @since 1.0.0
 */
export const isLeft: <E, A>(self: Either<E, A>) => self is Left<E> = either.isLeft

/**
 * Determine if a `Either` is a `Right`.
 *
 * @param self - The `Either` to check.
 *
 * @example
 * import { isRight, left, right } from '@effect/data/Either'
 *
 * assert.deepStrictEqual(isRight(right(1)), true)
 * assert.deepStrictEqual(isRight(left("error")), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isRight: <E, A>(self: Either<E, A>) => self is Right<A> = either.isRight

/**
 * Returns a `Refinement` from a `Either` returning function.
 * This function ensures that a `Refinement` definition is type-safe.
 *
 * @category conversions
 * @since 1.0.0
 */
export const toRefinement = <A, E, B extends A>(f: (a: A) => Either<E, B>): Refinement<A, B> =>
  (a: A): a is B => isRight(f(a))

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable: {
  <E>(onEmpty: LazyArg<E>): <A>(collection: Iterable<A>) => Either<E, A>
  <A, E>(collection: Iterable<A>, onEmpty: LazyArg<E>): Either<E, A>
} = dual(2, <A, E>(collection: Iterable<A>, onEmpty: LazyArg<E>): Either<E, A> => {
  for (const a of collection) {
    return right(a)
  }
  return left(onEmpty())
})

/**
 * Converts a `Either` to an `Option` discarding the error.
 *
 * @param self - The `Either` to convert to an `Option`.
 *
 * @example
 * import * as O from '@effect/data/Option'
 * import * as E from '@effect/data/Either'
 *
 * assert.deepStrictEqual(E.toOption(E.right(1)), O.some(1))
 * assert.deepStrictEqual(E.toOption(E.left('a')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export const toOption: <E, A>(self: Either<E, A>) => Option<A> = either.getRight

/**
 * Converts a `Either` to an `Option` discarding the error.
 *
 * Alias of {@link toOption}.
 *
 * @example
 * import * as O from '@effect/data/Option'
 * import * as E from '@effect/data/Either'
 *
 * assert.deepStrictEqual(E.getRight(E.right('ok')), O.some('ok'))
 * assert.deepStrictEqual(E.getRight(E.left('err')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export const getRight: <E, A>(self: Either<E, A>) => Option<A> = toOption

/**
 * Converts a `Either` to an `Option` discarding the value.
 *
 * @example
 * import * as O from '@effect/data/Option'
 * import * as E from '@effect/data/Either'
 *
 * assert.deepStrictEqual(E.getLeft(E.right('ok')), O.none())
 * assert.deepStrictEqual(E.getLeft(E.left('err')), O.some('err'))
 *
 * @category conversions
 * @since 1.0.0
 */
export const getLeft: <E, A>(self: Either<E, A>) => Option<E> = either.getLeft

/**
 * @example
 * import * as E from '@effect/data/Either'
 * import * as O from '@effect/data/Option'
 *
 * assert.deepStrictEqual(E.fromOption(O.some(1), () => 'error'), E.right(1))
 * assert.deepStrictEqual(E.fromOption(O.none(), () => 'error'), E.left('error'))
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromOption: {
  <A, E>(fa: Option<A>, onNone: () => E): Either<E, A>
  <E>(onNone: () => E): <A>(fa: Option<A>) => Either<E, A>
} = either.fromOption

/**
 * @category equivalence
 * @since 1.0.0
 */
export const getEquivalence = <E, A>(
  EE: Equivalence<E>,
  EA: Equivalence<A>
): Equivalence<Either<E, A>> =>
  equivalence.make((x, y) =>
    x === y ||
    (isLeft(x) ?
      isLeft(y) && EE(x.left, y.left) :
      isRight(y) && EA(x.right, y.right))
  )

/**
 * @category mapping
 * @since 1.0.0
 */
export const bimap: {
  <E1, E2, A, B>(f: (e: E1) => E2, g: (a: A) => B): (self: Either<E1, A>) => Either<E2, B>
  <E1, A, E2, B>(self: Either<E1, A>, f: (e: E1) => E2, g: (a: A) => B): Either<E2, B>
} = dual(
  3,
  <E1, A, E2, B>(self: Either<E1, A>, f: (e: E1) => E2, g: (a: A) => B): Either<E2, B> =>
    isLeft(self) ? left(f(self.left)) : right(g(self.right))
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Bicovariant: bicovariant.Bicovariant<EitherTypeLambda> = {
  bimap
}

/**
 * Maps the `Left` side of an `Either` value to a new `Either` value.
 *
 * @param self - The input `Either` value to map.
 * @param f - A transformation function to apply to the `Left` value of the input `Either`.
 *
 * @category error handling
 * @since 1.0.0
 */
export const mapLeft: {
  <E, G>(f: (e: E) => G): <A>(self: Either<E, A>) => Either<G, A>
  <E, A, G>(self: Either<E, A>, f: (e: E) => G): Either<G, A>
} = bicovariant.mapLeft(Bicovariant)

/**
 * Maps the `Right` side of an `Either` value to a new `Either` value.
 *
 * @param self - An `Either` to map
 * @param f - The function to map over the value of the `Either`
 *
 * @category mapping
 * @since 1.0.0
 */
export const map: {
  <A, B>(f: (a: A) => B): <E>(self: Either<E, A>) => Either<E, B>
  <E, A, B>(self: Either<E, A>, f: (a: A) => B): Either<E, B>
} = dual(
  2,
  <E, A, B>(self: Either<E, A>, f: (a: A) => B): Either<E, B> => isRight(self) ? right(f(self.right)) : self
)

const imap = covariant.imap<EitherTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<EitherTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<EitherTypeLambda> = {
  imap
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: {
  <A, E, B>(a: A, self: Either<E, (a: A) => B>): Either<E, B>
  <E, A, B>(self: Either<E, (a: A) => B>): (a: A) => Either<E, B>
} = covariant.flap(Covariant)

/**
 * Maps the `Right` value of this `Either` to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: {
  <E, _, B>(self: Either<E, _>, b: B): Either<E, B>
  <B>(b: B): <E, _>(self: Either<E, _>) => Either<E, B>
} = covariant.as(Covariant)

/**
 * Maps the `Right` value of this `Either` to the `void` constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const asUnit: <E, _>(self: Either<E, _>) => Either<E, void> = covariant.asUnit(
  Covariant
)

const of: <A>(a: A) => Either<never, A> = right

const Of: of_.Of<EitherTypeLambda> = {
  of
}

/**
 * @since 1.0.0
 */
export const unit: Either<never, void> = of_.unit(Of)

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<EitherTypeLambda> = {
  of,
  imap,
  map
}

/**
 * @category combining
 * @since 1.0.0
 */
export const flatMap: {
  <A, E2, B>(f: (a: A) => Either<E2, B>): <E1>(self: Either<E1, A>) => Either<E1 | E2, B>
  <E1, A, E2, B>(self: Either<E1, A>, f: (a: A) => Either<E2, B>): Either<E1 | E2, B>
} = dual(
  2,
  <E1, A, E2, B>(self: Either<E1, A>, f: (a: A) => Either<E2, B>): Either<E1 | E2, B> =>
    isLeft(self) ? self : f(self.right)
)

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<EitherTypeLambda> = {
  flatMap
}

/**
 * @since 1.0.0
 */
export const flatten: <E1, E2, A>(self: Either<E1, Either<E2, A>>) => Either<E1 | E2, A> = flatMap_
  .flatten(FlatMap)

/**
 * @since 1.0.0
 */
export const andThen: {
  <E1, _, E2, B>(self: Either<E1, _>, that: Either<E2, B>): Either<E1 | E2, B>
  <E2, B>(that: Either<E2, B>): <E1, _>(self: Either<E1, _>) => Either<E2 | E1, B>
} = flatMap_.andThen(FlatMap)

/**
 * @since 1.0.0
 */
export const composeK: {
  <A, E1, B, E2, C>(
    afb: (a: A) => Either<E1, B>,
    bfc: (b: B) => Either<E2, C>
  ): (a: A) => Either<E1 | E2, C>
  <B, E2, C>(
    bfc: (b: B) => Either<E2, C>
  ): <A, E1>(afb: (a: A) => Either<E1, B>) => (a: A) => Either<E2 | E1, C>
} = flatMap_.composeK(FlatMap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<EitherTypeLambda> = {
  imap,
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combining
 * @since 1.0.0
 */
export const andThenDiscard: {
  <E1, A, E2, _>(self: Either<E1, A>, that: Either<E2, _>): Either<E1 | E2, A>
  <E2, _>(that: Either<E2, _>): <E1, A>(self: Either<E1, A>) => Either<E2 | E1, A>
} = chainable.andThenDiscard(Chainable)

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<EitherTypeLambda> = {
  imap,
  of,
  map,
  flatMap
}

const product = <E1, A, E2, B>(self: Either<E1, A>, that: Either<E2, B>): Either<E1 | E2, [A, B]> =>
  isRight(self) ? (isRight(that) ? right([self.right, that.right]) : that) : self

const productMany = <E, A>(
  self: Either<E, A>,
  collection: Iterable<Either<E, A>>
): Either<E, [A, ...Array<A>]> => {
  if (isLeft(self)) {
    return self
  }
  const out: [A, ...Array<A>] = [self.right]
  for (const e of collection) {
    if (isLeft(e)) {
      return e
    }
    out.push(e.right)
  }
  return right(out)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<EitherTypeLambda> = {
  imap,
  product,
  productMany
}

/**
 * Similar to `Promise.all` but operates on `Either`s.
 *
 * ```
 * Iterable<Either<E, A>> -> Either<E, A[]>
 * ```
 *
 * Flattens a collection of `Either`s into a single `Either` that contains a list of all the `Right` values.
 * If there is a `Left` value in the collection, it returns the first `Left` found as the result.
 *
 * @param collection - An iterable collection of `Either`s to flatten.
 *
 * @example
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(E.all([E.right(1), E.right(2), E.right(3)]), E.right([1, 2, 3]))
 * assert.deepStrictEqual(E.all([E.right(1), E.left("error"), E.right(3)]), E.left("error"))
 *
 * @category combining
 * @since 1.0.0
 */
export const all = <E, A>(
  collection: Iterable<Either<E, A>>
): Either<E, Array<A>> => {
  const out: Array<A> = []
  for (const e of collection) {
    if (isLeft(e)) {
      return e
    }
    out.push(e.right)
  }
  return right(out)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<EitherTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll: all
}

/**
 * Similar to `Promise.all` but operates on `Either`s.
 *
 * ```
 * [Either<E1, A>, Either<E1, B>, ...] -> Either<E1 \| E2 \| ..., [A, B, ...]>
 * ```
 *
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Either<any, any>>>(
  ...elements: T
) => Either<
  [T[number]] extends [Either<infer E, any>] ? E : never,
  { [I in keyof T]: [T[I]] extends [Either<any, infer A>] ? A : never }
> = product_.tuple(Product)

/**
 * @since 1.0.0
 */
export const struct: <R extends Record<string, Either<any, any>>>(
  fields: R
) => Either<
  [R[keyof R]] extends [Either<infer E, any>] ? E : never,
  { [K in keyof R]: [R[K]] extends [Either<any, infer A>] ? A : never }
> = product_.struct(Product)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<EitherTypeLambda> = {
  imap,
  map,
  product,
  productMany
}

/**
 * Lifts a binary function into `Either`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => {
  <E1, E2>(self: Either<E1, A>, that: Either<E2, B>): Either<E1 | E2, C>
  <E2>(that: Either<E2, B>): <E1>(self: Either<E1, A>) => Either<E2 | E1, C>
} = semiApplicative.lift2(SemiApplicative)

/**
 * @category combining
 * @since 1.0.0
 */
export const zipWith: {
  <E1, A, E2, B, C>(
    self: Either<E1, A>,
    that: Either<E2, B>,
    f: (a: A, b: B) => C
  ): Either<E1 | E2, C>
  <E2, B, A, C>(
    that: Either<E2, B>,
    f: (a: A, b: B) => C
  ): <E1>(self: Either<E1, A>) => Either<E2 | E1, C>
} = semiApplicative.zipWith(SemiApplicative)

/**
 * @since 1.0.0
 */
export const ap: {
  <E1, A, B, E2>(self: Either<E1, (a: A) => B>, that: Either<E2, A>): Either<E1 | E2, B>
  <E2, A>(that: Either<E2, A>): <E1, B>(self: Either<E1, (a: A) => B>) => Either<E2 | E1, B>
} = semiApplicative.ap(SemiApplicative)

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<EitherTypeLambda> = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll: all
}

/**
 * `Semigroup` returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are combined using the provided `Semigroup`.
 *
 * ```
 * | self       | that       | combine(self, that)     |
 * | ---------- | ---------- | ----------------------- |
 * | left(e1)   | left(e2)   | left(e1)                |
 * | left(e1)   | right(a2)  | left(e1)                |
 * | right(a1)  | left(e2)   | left(e2)                |
 * | right(a1)  | right(a2)  | right(combine(a1, a2))  |
 * ```
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstLeftSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Either<E, A>> = semiApplicative.getSemigroup(
  SemiApplicative
)

/**
 * `Monoid` returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are combined using the provided `Monoid`.
 *
 * - `combine` is provided by {@link getFirstLeftSemigroup}.
 * - `empty` is `right(M.empty)`
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstLeftMonoid: <A, E>(M: Monoid<A>) => Monoid<Either<E, A>> = applicative
  .getMonoid(Applicative)

const coproduct = <E1, A, E2, B>(
  self: Either<E1, A>,
  that: Either<E2, B>
): Either<E1 | E2, A | B> => isRight(self) ? self : that

const coproductMany = <E, A>(
  self: Either<E, A>,
  collection: Iterable<Either<E, A>>
): Either<E, A> => {
  let out = self
  if (isRight(out)) {
    return out
  }
  for (out of collection) {
    if (isRight(out)) {
      return out
    }
  }
  return out
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiCoproduct: semiCoproduct.SemiCoproduct<EitherTypeLambda> = {
  imap,
  coproduct,
  coproductMany
}

/**
 * @category error handling
 * @since 1.0.0
 */
export const firstRightOf: {
  <E, A>(collection: Iterable<Either<E, A>>): (self: Either<E, A>) => Either<E, A>
  <E, A>(self: Either<E, A>, collection: Iterable<Either<E, A>>): Either<E, A>
} = dual(2, coproductMany)

/**
 * Semigroup returning the left-most `Right` value.
 *
 * ```
 * | self       | that       | combine(self, that) |
 * | ---------- | ---------- | ------------------- |
 * | left(e1)   | left(e2)   | left(e2)            |
 * | left(e1)   | right(a2)  | right(a2)           |
 * | right(a1)  | left(e2)   | right(a1)           |
 * | right(a1)  | right(a2)  | right(a1)           |
 * ```
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstRightSemigroup: <E, A>() => Semigroup<Either<E, A>> = semiCoproduct
  .getSemigroup(SemiCoproduct)

/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import * as E from '@effect/data/Either'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(
 *   E.getOrElse(E.right(1), () => 0),
 *   1
 * )
 * assert.deepStrictEqual(
 *   E.getOrElse(E.left('error'), () => 0),
 *   0
 * )
 *
 * @category getters
 * @since 1.0.0
 */
export const getOrElse: {
  <E, B>(onLeft: (e: E) => B): <A>(self: Either<E, A>) => B | A
  <E, A, B>(self: Either<E, A>, onLeft: (e: E) => B): A | B
} = dual(
  2,
  <E, A, B>(self: Either<E, A>, onLeft: (e: E) => B): A | B => isLeft(self) ? onLeft(self.left) : self.right
)

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElse: {
  <E1, E2, B>(that: (e1: E1) => Either<E2, B>): <A>(self: Either<E1, A>) => Either<E2, A | B>
  <E1, A, E2, B>(self: Either<E1, A>, that: (e1: E1) => Either<E2, B>): Either<E2, A | B>
} = dual(
  2,
  <E1, A, E2, B>(self: Either<E1, A>, that: (e1: E1) => Either<E2, B>): Either<E2, A | B> =>
    isLeft(self) ? that(self.left) : self
)

/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseEither: {
  <E1, E2, B>(that: (e1: E1) => Either<E2, B>): <A>(self: Either<E1, A>) => Either<E2, Either<A, B>>
  <E1, A, E2, B>(self: Either<E1, A>, that: (e1: E1) => Either<E2, B>): Either<E2, Either<A, B>>
} = dual(
  2,
  <E1, A, E2, B>(self: Either<E1, A>, that: (e1: E1) => Either<E2, B>): Either<E2, Either<A, B>> =>
    isLeft(self) ?
      map(that(self.left), right) :
      map(self, left)
)

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * fails with the specified error.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseFail: {
  <E2>(onLeft: LazyArg<E2>): <E1, A>(self: Either<E1, A>) => Either<E2, A>
  <E1, A, E2>(self: Either<E1, A>, onLeft: LazyArg<E2>): Either<E2, A>
} = dual(
  2,
  <E1, A, E2>(self: Either<E1, A>, onLeft: LazyArg<E2>): Either<E2, A> => orElse(self, () => left(onLeft()))
)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiAlternative: semiAlternative.SemiAlternative<EitherTypeLambda> = {
  map,
  imap,
  coproduct,
  coproductMany: firstRightOf
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<EitherTypeLambda> = {
  reduce: dual(
    3,
    <E, A, B>(self: Either<E, A>, b: B, f: (b: B, a: A) => B): B => isLeft(self) ? b : f(b, self.right)
  )
}

/**
 * Transforms an `Either` into an `Array`.
 * If the input is `Left`, an empty array is returned.
 * If the input is `Right`, the value is wrapped in an array.
 *
 * @param self - The `Either` to convert to an array.
 *
 * @example
 * import { right, left, toArray } from '@effect/data/Either'
 *
 * assert.deepStrictEqual(toArray(right(1)), [1])
 * assert.deepStrictEqual(toArray(left("error")), [])
 *
 * @category conversions
 * @since 1.0.0
 */
export const toArray: <E, A>(self: Either<E, A>) => Array<A> = foldable.toArray(Foldable)

/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import * as E from '@effect/data/Either'
 * import { pipe } from '@effect/data/Function'
 *
 * const onLeft  = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`
 *
 * const onRight = (value: number): string => `Ok: ${value}`
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.match(onLeft , onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left(['error 1', 'error 2']),
 *     E.match(onLeft , onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category pattern matching
 * @since 1.0.0
 */
export const match: {
  <E, B, A, C = B>(onLeft: (e: E) => B, onRight: (a: A) => C): (self: Either<E, A>) => B | C
  <E, A, B, C = B>(self: Either<E, A>, onLeft: (e: E) => B, onRight: (a: A) => C): B | C
} = dual(
  3,
  <E, A, B, C = B>(self: Either<E, A>, onLeft: (e: E) => B, onRight: (a: A) => C): B | C =>
    isLeft(self) ? onLeft(self.left) : onRight(self.right)
)

/**
 * Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import * as E from '@effect/data/Either'
 *
 * const parse = E.fromNullable(() => 'nullable')
 *
 * assert.deepStrictEqual(parse(1), E.right(1))
 * assert.deepStrictEqual(parse(null), E.left('nullable'))
 *
 * @category interop
 * @since 1.0.0
 */
export const fromNullable: {
  <A, E>(onNullable: (a: A) => E): (a: A) => Either<E, NonNullable<A>>
  <A, E>(a: A, onNullable: (a: A) => E): Either<E, NonNullable<A>>
} = dual(
  2,
  <A, E>(a: A, onNullable: (a: A) => E): Either<E, NonNullable<A>> =>
    a == null ? left(onNullable(a)) : right(a as NonNullable<A>)
)

/**
 * @category interop
 * @since 1.0.0
 */
export const liftNullable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A): Either<E, NonNullable<B>> => fromNullable(f(...a), () => onNullable(...a))

/**
 * @category interop
 * @since 1.0.0
 */
export const merge: <E, A>(self: Either<E, A>) => E | A = match(identity, identity)

/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapNullable: {
  <A, B, E2>(
    f: (a: A) => B | null | undefined,
    onNullable: (a: A) => E2
  ): <E1>(self: Either<E1, A>) => Either<E1 | E2, NonNullable<B>>
  <E1, A, B, E2>(
    self: Either<E1, A>,
    f: (a: A) => B | null | undefined,
    onNullable: (a: A) => E2
  ): Either<E1 | E2, NonNullable<B>>
} = dual(3, <E1, A, B, E2>(
  self: Either<E1, A>,
  f: (a: A) => B | null | undefined,
  onNullable: (a: A) => E2
): Either<E1 | E2, NonNullable<B>> => flatMap(self, liftNullable(f, onNullable)))

/**
 * Extracts the value of an `Either` or throws if the `Either` is `Left`.
 *
 * If a default error is sufficient for your use case and you don't need to configure the thrown error, see {@link getOrThrow}.
 *
 * @param self - The `Either` to extract the value from.
 * @param onLeft - A function that will be called if the `Either` is `Left`. It returns the error to be thrown.
 *
 * @example
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(
 *   E.getOrThrowWith(E.right(1), () => new Error('Unexpected Left')),
 *   1
 * )
 * assert.throws(() => E.getOrThrowWith(E.left("error"), () => new Error('Unexpected Left')))
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrThrowWith: {
  <E>(onLeft: (e: E) => unknown): <A>(self: Either<E, A>) => A
  <E, A>(self: Either<E, A>, onLeft: (e: E) => unknown): A
} = dual(2, <E, A>(self: Either<E, A>, onLeft: (e: E) => unknown): A => {
  if (isRight(self)) {
    return self.right
  }
  throw onLeft(self.left)
})

/**
 * Extracts the value of an `Either` or throws if the `Either` is `Left`.
 *
 * The thrown error is a default error. To configure the error thrown, see  {@link getOrThrowWith}.
 *
 * @param self - The `Either` to extract the value from.
 * @throws `Error("getOrThrow called on a Left")`
 *
 * @example
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(E.getOrThrow(E.right(1)), 1)
 * assert.throws(() => E.getOrThrow(E.left("error")))
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrThrow: <E, A>(self: Either<E, A>) => A = getOrThrowWith(() =>
  new Error("getOrThrow called on a Left")
)

/**
 * Lifts a function that may throw to one returning a `Either`.
 *
 * @category interop
 * @since 1.0.0
 */
export const liftThrowable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
): ((...a: A) => Either<E, B>) =>
  (...a) => {
    try {
      return right(f(...a))
    } catch (e) {
      return left(onThrow(e))
    }
  }

/**
 * @since 1.0.0
 */
export const reverse = <E, A>(self: Either<E, A>): Either<A, E> => isLeft(self) ? right(self.left) : left(self.right)

/**
 * @category filtering
 * @since 1.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E2>): <E1>(
    self: Either<E1, C>
  ) => Either<E1 | E2, B>
  <B extends A, E2, A = B>(
    predicate: Predicate<A>,
    onFalse: LazyArg<E2>
  ): <E1>(self: Either<E1, B>) => Either<E1 | E2, B>
  <E1, C extends A, B extends A, E2, A = C>(
    self: Either<E1, C>,
    refinement: Refinement<A, B>,
    onFalse: LazyArg<E2>
  ): Either<E1 | E2, B>
  <E1, B extends A, E2, A = B>(
    self: Either<E1, B>,
    predicate: Predicate<A>,
    onFalse: LazyArg<E2>
  ): Either<E1 | E2, B>
} = dual(3, <E1, B extends A, E2, A = B>(
  self: Either<E1, B>,
  predicate: Predicate<A>,
  onFalse: LazyArg<E2>
): Either<E1 | E2, B> => isLeft(self) ? self : predicate(self.right) ? self : left(onFalse()))

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap: {
  <A, B, E2>(
    f: (a: A) => Option<B>,
    onNone: LazyArg<E2>
  ): <E1>(self: Either<E1, A>) => Either<E1 | E2, B>
  <E1, A, B, E2>(
    self: Either<E1, A>,
    f: (a: A) => Option<B>,
    onNone: LazyArg<E2>
  ): Either<E1 | E2, B>
} = dual(3, <E1, A, B, E2>(
  self: Either<E1, A>,
  f: (a: A) => Option<B>,
  onNone: LazyArg<E2>
): Either<E1 | E2, B> =>
  flatMap(self, (a) => {
    const ob = f(a)
    return option.isNone(ob) ? left(onNone()) : right(ob.value)
  }))

/**
 * @category filtering
 * @since 1.0.0
 */
export const compact: {
  <E2>(onNone: LazyArg<E2>): <E1, A>(self: Either<E1, Option<A>>) => Either<E1 | E2, A>
  <E1, A, E2>(self: Either<E1, Option<A>>, onNone: LazyArg<E2>): Either<E1 | E2, A>
} = dual(
  2,
  <E1, A, E2>(self: Either<E1, Option<A>>, onNone: LazyArg<E2>): Either<E1 | E2, A> => filterMap(self, identity, onNone)
)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): <TE>(self: Either<TE, A>) => Kind<F, R, O, E, Either<TE, B>>
  <TE, A, R, O, E, B>(
    self: Either<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Either<TE, B>>
} =>
  dual(2, <TE, A, R, O, E, B>(
    self: Either<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Either<TE, B>> =>
    isLeft(self) ?
      F.of<Either<TE, B>>(self) :
      F.map<R, O, E, B, Either<TE, B>>(f(self.right), right))

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<EitherTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <TE, R, O, E, A>(
  self: Either<TE, Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, Either<TE, A>> = traversable.sequence(Traversable)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <TE, A, R, O, E, B>(
    self: Either<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Either<TE, A>>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): <TE>(self: Either<TE, A>) => Kind<F, R, O, E, Either<TE, A>>
} = traversable.traverseTap(Traversable)

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tap: {
  <E1, A, E2, _>(self: Either<E1, A>, f: (a: A) => Either<E2, _>): Either<E1 | E2, A>
  <A, E2, _>(f: (a: A) => Either<E2, _>): <E1>(self: Either<E1, A>) => Either<E2 | E1, A>
} = chainable.tap(Chainable)

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectRight: {
  <A>(onRight: (a: A) => void): <E>(self: Either<E, A>) => Either<E, A>
  <E, A>(self: Either<E, A>, onRight: (a: A) => void): Either<E, A>
} = dual(2, <E, A>(self: Either<E, A>, onRight: (a: A) => void): Either<E, A> => {
  if (isRight(self)) {
    onRight(self.right)
  }
  return self
})

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectLeft: {
  <E>(onLeft: (e: E) => void): <A>(self: Either<E, A>) => Either<E, A>
  <E, A>(self: Either<E, A>, onLeft: (e: E) => void): Either<E, A>
} = dual(2, <E, A>(self: Either<E, A>, onLeft: (e: E) => void): Either<E, A> => {
  if (isLeft(self)) {
    onLeft(self.left)
  }
  return self
})

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const tapError: {
  <E1, E2, _>(onLeft: (e: E1) => Either<E2, _>): <A>(self: Either<E1, A>) => Either<E1 | E2, A>
  <E1, A, E2, _>(self: Either<E1, A>, onLeft: (e: E1) => Either<E2, _>): Either<E1 | E2, A>
} = dual(
  2,
  <E1, A, E2, _>(self: Either<E1, A>, onLeft: (e: E1) => Either<E2, _>): Either<E1 | E2, A> => {
    if (isRight(self)) {
      return self
    }
    const out = onLeft(self.left)
    return isLeft(out) ? out : self
  }
)

/**
 * @category getters
 * @since 1.0.0
 */
export const getOrNull: <E, A>(self: Either<E, A>) => A | null = getOrElse(constNull)

/**
 * @category getters
 * @since 1.0.0
 */
export const getOrUndefined: <E, A>(self: Either<E, A>) => A | undefined = getOrElse(constUndefined)

/**
 * @example
 * import { liftPredicate, left, right } from '@effect/data/Either'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     liftPredicate((n) => n > 0, () => 'error')
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     liftPredicate((n) => n > 0, () => 'error')
 *   ),
 *   left('error')
 * )
 *
 * @category lifting
 * @since 1.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(
    refinement: Refinement<A, B>,
    onFalse: (c: C) => E
  ): (c: C) => Either<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => Either<E, B>
} = <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E) =>
  (b: B) => predicate(b) ? right(b) : left(onFalse(b))

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftOption = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A): Either<E, B> => fromOption(() => onNone(...a))(f(...a))

/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapOption: {
  <A, B, E2>(
    f: (a: A) => Option<B>,
    onNone: (a: A) => E2
  ): <E1>(self: Either<E1, A>) => Either<E1 | E2, B>
  <E1, A, B, E2>(
    self: Either<E1, A>,
    f: (a: A) => Option<B>,
    onNone: (a: A) => E2
  ): Either<E1 | E2, B>
} = dual(3, <E1, A, B, E2>(
  self: Either<E1, A>,
  f: (a: A) => Option<B>,
  onNone: (a: A) => E2
): Either<E1 | E2, B> => flatMap(self, liftOption(f, onNone)))

/**
 * Returns a function that checks if an `Either` contains a given value using a provided `equivalence` function.
 *
 * @since 1.0.0
 */
export const contains = <A>(isEquivalent: (self: A, that: A) => boolean): {
  (a: A): <E>(self: Either<E, A>) => boolean
  <E>(self: Either<E, A>, a: A): boolean
} =>
  dual(
    2,
    <E>(self: Either<E, A>, a: A): boolean => isLeft(self) ? false : isEquivalent(self.right, a)
  )

/**
 * Returns `false` if `Left` or returns the Either of the application of the given predicate to the `Right` value.
 *
 * @example
 * import * as E from '@effect/data/Either'
 *
 * const f = E.exists((n: number) => n > 2)
 *
 * assert.deepStrictEqual(f(E.left('a')), false)
 * assert.deepStrictEqual(f(E.right(1)), false)
 * assert.deepStrictEqual(f(E.right(3)), true)
 *
 * @since 1.0.0
 */
export const exists: {
  <A>(predicate: Predicate<A>): <E>(self: Either<E, A>) => boolean
  <E, A>(self: Either<E, A>, predicate: Predicate<A>): boolean
} = dual(
  2,
  <E, A>(self: Either<E, A>, predicate: Predicate<A>): boolean => isLeft(self) ? false : predicate(self.right)
)

/**
 * Semigroup that models the combination of values that may be absent, elements that are `Left` are ignored
 * while elements that are `Right` are combined using the provided `Semigroup`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getOptionalSemigroup = <E, A>(S: Semigroup<A>): Semigroup<Either<E, A>> =>
  semigroup.make((
    x,
    y
  ) => (isLeft(y) ? x : isLeft(x) ? y : right(S.combine(x.right, y.right))))

/**
 * @category math
 * @since 1.0.0
 */
export const sum: {
  <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>
  <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>
} = lift2(N.sum)

/**
 * @category math
 * @since 1.0.0
 */
export const multiply: {
  <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>
  <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>
} = lift2(N.multiply)

/**
 * @category math
 * @since 1.0.0
 */
export const subtract: {
  <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>
  <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>
} = lift2(N.subtract)

/**
 * @category math
 * @since 1.0.0
 */
export const divide: {
  <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>
  <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>
} = lift2(N.divide)

/**
 * Return all the `Right` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const rights = <E, A>(self: Iterable<Either<E, A>>): Array<A> => {
  const out: Array<A> = []
  for (const a of self) {
    if (isRight(a)) {
      out.push(a.right)
    }
  }
  return out
}

/**
 * Return all the `Left` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const lefts = <E, A>(self: Iterable<Either<E, A>>): Array<E> => {
  const out: Array<E> = []
  for (const a of self) {
    if (isLeft(a)) {
      out.push(a.left)
    }
  }
  return out
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 1.0.0
 */
export const tupled: <E, A>(self: Either<E, A>) => Either<E, [A]> = invariant.tupled(
  Invariant
)

/**
 * Appends an element to the end of a tuple.
 *
 * @category do notation
 * @since 1.0.0
 */
export const appendElement: {
  <E1, A extends ReadonlyArray<any>, E2, B>(
    self: Either<E1, A>,
    that: Either<E2, B>
  ): Either<E1 | E2, [...A, B]>
  <E2, B>(
    that: Either<E2, B>
  ): <E1, A extends ReadonlyArray<any>>(self: Either<E1, A>) => Either<E2 | E1, [...A, B]>
} = semiProduct.appendElement(SemiProduct)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: {
  <N extends string>(
    name: N
  ): <E, A>(self: Either<E, A>) => Either<E, { [K in N]: A }>
  <E, A, N extends string>(self: Either<E, A>, name: N): Either<E, { [K in N]: A }>
} = invariant.bindTo(Invariant)

const let_: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): <E>(
    self: Either<E, A>
  ) => Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E, A extends object, N extends string, B>(
    self: Either<E, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = covariant.let(Covariant)

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
export const Do: Either<never, {}> = of_.Do(Of)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: {
  <N extends string, A extends object, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Either<E2, B>
  ): <E1>(
    self: Either<E1, A>
  ) => Either<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Either<E1, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => Either<E2, B>
  ): Either<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = chainable.bind(Chainable)

/**
 * Extends the `Either` value with the value of another `Either` type.
 *
 * If both `Either` instances are `Left`, then the result will be the first `Left`.
 *
 * @param self - The original `Either` value.
 * @param name - The name of the property that will be added to the original `Either` type.
 * @param that - The `Either` value that will be added to the original `Either` type.
 *
 * @example
 * import * as E from '@effect/data/Either'
 * import { pipe } from '@effect/data/Function'
 *
 * const result = pipe(
 *   E.Do,
 *   E.bind("a", () => E.left("e1")),
 *   E.andThenBind("b", E.left("e2"))
 * )
 *
 * assert.deepStrictEqual(result, E.left("e1"))
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: {
  <N extends string, A extends object, E2, B>(
    name: Exclude<N, keyof A>,
    that: Either<E2, B>
  ): <E1>(
    self: Either<E1, A>
  ) => Either<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Either<E1, A>,
    name: Exclude<N, keyof A>,
    that: Either<E2, B>
  ): Either<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = semiProduct.andThenBind(SemiProduct)

/**
 * The `gen` API is a helper function that provides a generator interface for the `Either` monad instance.
 * It can be used to easily create complex `Either` computations in a readable and concise manner.
 *
 * @example
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(
 *   E.gen(function*($) {
 *     const a = yield* $(E.right(1))
 *     const b = yield* $(E.right(2))
 *     return a + b
 *   }),
 *   E.right(3)
 * )
 *
 * @since 1.0.0
 * @category generators
 */
export const gen: Gen.Gen<EitherTypeLambda, Gen.Adapter<EitherTypeLambda>> = Gen.singleShot(Monad)(
  Gen.adapter<EitherTypeLambda>()
)
