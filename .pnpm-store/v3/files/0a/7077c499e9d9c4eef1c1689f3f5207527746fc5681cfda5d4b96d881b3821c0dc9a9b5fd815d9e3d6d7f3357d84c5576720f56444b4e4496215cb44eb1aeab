/**
 * @since 1.0.0
 */
import { dual, identity } from "@effect/data/Function"
import type { Kind, TypeLambda } from "@effect/data/HKT"
import * as readonlyArray from "@effect/data/internal/ReadonlyArray"
import type * as applicative from "@effect/data/typeclass/Applicative"
import * as chainable from "@effect/data/typeclass/Chainable"
import * as covariant from "@effect/data/typeclass/Covariant"
import type * as flatMap_ from "@effect/data/typeclass/FlatMap"
import type * as foldable from "@effect/data/typeclass/Foldable"
import * as invariant from "@effect/data/typeclass/Invariant"
import type * as monad from "@effect/data/typeclass/Monad"
import * as of_ from "@effect/data/typeclass/Of"
import type * as pointed from "@effect/data/typeclass/Pointed"
import type * as product_ from "@effect/data/typeclass/Product"
import type * as semiAlternative from "@effect/data/typeclass/SemiAlternative"
import type * as semiApplicative from "@effect/data/typeclass/SemiApplicative"
import type * as semiCoproduct from "@effect/data/typeclass/SemiCoproduct"
import type { Semigroup } from "@effect/data/typeclass/Semigroup"
import * as semiProduct from "@effect/data/typeclass/SemiProduct"
import type * as traversable from "@effect/data/typeclass/Traversable"

/**
 * @category models
 * @since 1.0.0
 */
export type Identity<A> = A

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface IdentityTypeLambda extends TypeLambda {
  readonly type: Identity<this["Target"]>
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface IdentityTypeLambdaFix<A> extends TypeLambda {
  readonly type: Identity<A>
}

const map: {
  <A, B>(f: (a: A) => B): (self: Identity<A>) => Identity<B>
  <A, B>(self: Identity<A>, f: (a: A) => B): Identity<B>
} = dual(2, <A, B>(self: Identity<A>, f: (a: A) => B): Identity<B> => f(self))

const imap = covariant.imap<IdentityTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<IdentityTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<IdentityTypeLambda> = {
  imap
}

const of: <A>(a: A) => Identity<A> = identity

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<IdentityTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<IdentityTypeLambda> = {
  of,
  imap,
  map
}

const flatMap: {
  <A, B>(f: (a: A) => B): (self: Identity<A>) => Identity<B>
  <A, B>(self: Identity<A>, f: (a: A) => B): Identity<B>
} = dual(2, <A, B>(self: Identity<A>, f: (a: A) => B): Identity<B> => f(self))

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<IdentityTypeLambda> = {
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<IdentityTypeLambda> = {
  imap,
  map,
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<IdentityTypeLambda> = {
  imap,
  of,
  map,
  flatMap
}

const product = <A, B>(self: Identity<A>, that: Identity<B>): Identity<[A, B]> => [self, that]

const productMany = <A>(
  self: Identity<A>,
  collection: Iterable<A>
): [A, ...Array<A>] => [self, ...collection]

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<IdentityTypeLambda> = {
  imap,
  product,
  productMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<IdentityTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll: readonlyArray.fromIterable
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<IdentityTypeLambda> = {
  imap,
  map,
  product,
  productMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<IdentityTypeLambda> = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll: readonlyArray.fromIterable
}

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemiCoproduct = <A>(
  S: Semigroup<A>
): semiCoproduct.SemiCoproduct<IdentityTypeLambdaFix<A>> => ({
  imap,
  coproduct: dual(2, S.combine),
  coproductMany: dual(2, S.combineMany)
})

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemiAlternative = <A>(
  S: Semigroup<A>
): semiAlternative.SemiAlternative<IdentityTypeLambdaFix<A>> => ({
  ...getSemiCoproduct(S),
  map
})

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<IdentityTypeLambda> = {
  reduce: dual(3, <A, B>(self: Identity<A>, b: B, f: (b: B, a: A) => B): B => f(b, self))
}

const traverse = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): (self: Identity<A>) => Kind<F, R, O, E, B>
  <A, R, O, E, B>(self: Identity<A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, B>
} =>
  dual(
    2,
    <A, R, O, E, B>(self: Identity<A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, B> => f(self)
  )

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<IdentityTypeLambda> = {
  traverse
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: {
  <N extends string>(name: N): <A>(self: Identity<A>) => Identity<{ [K in N]: A }>
  <A, N extends string>(self: Identity<A>, name: N): Identity<{ [K in N]: A }>
} = invariant.bindTo(Invariant)

const let_: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): (self: Identity<A>) => Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Identity<A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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
export const Do: Identity<{}> = of_.Do(Of)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Identity<B>
  ): (self: Identity<A>) => Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Identity<A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => Identity<B>
  ): Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = chainable.bind(Chainable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    that: Identity<B>
  ): (self: Identity<A>) => Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Identity<A>,
    name: Exclude<N, keyof A>,
    that: Identity<B>
  ): Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = semiProduct.andThenBind(SemiProduct)
