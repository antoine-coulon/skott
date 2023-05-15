/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Bifunctor2, Bifunctor2C } from './Bifunctor'
import * as E from './Either'
import { Filterable2C } from './Filterable'
import { Lazy } from './function'
import { IO } from './IO'
import { Monad2, Monad2C } from './Monad'
import { MonadIO2, MonadIO2C } from './MonadIO'
import { MonadThrow2, MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import Either = E.Either
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly IOEither: IOEither<E, A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'IOEither'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}
/**
 * @since 2.0.0
 */
export declare const left: <E = never, A = never>(l: E) => IOEither<E, A>
/**
 * @since 2.0.0
 */
export declare const right: <E = never, A = never>(a: A) => IOEither<E, A>
/**
 * @since 2.0.0
 */
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => IOEither<E, A>
/**
 * @since 2.0.0
 */
export declare const leftIO: <E = never, A = never>(me: IO<E>) => IOEither<E, A>
/**
 * @since 2.0.0
 */
export declare function fold<E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>): (ma: IOEither<E, A>) => IO<B>
/**
 * @since 2.0.0
 */
export declare function getOrElse<E, A>(onLeft: (e: E) => IO<A>): (ma: IOEither<E, A>) => IO<A>
/**
 * @since 2.0.0
 */
export declare function orElse<E, A, M>(onLeft: (e: E) => IOEither<M, A>): (ma: IOEither<E, A>) => IOEither<M, A>
/**
 * @since 2.0.0
 */
export declare const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E>
/**
 * @since 2.0.0
 */
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>
/**
 * @since 2.0.0
 */
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>
/**
 * @since 2.0.0
 */
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>>
/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @since 2.0.0
 */
export declare function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A>
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export declare function bracket<E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: Either<E, B>) => IOEither<E, void>
): IOEither<E, B>
/**
 * @since 2.0.0
 */
export declare function getIOValidation<E>(
  S: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2C<URI, E> & Alt2C<URI, E> & MonadIO2C<URI, E> & MonadThrow2C<URI, E>
/**
 * @since 2.1.0
 */
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
/**
 * @since 2.4.0
 */
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => IOEither<E, B>
/**
 * @since 2.4.0
 */
export declare function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: IOEither<E, A>) => IOEither<E, B>
/**
 * @since 2.0.0
 */
export declare const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadThrow2<URI>
declare const alt: <E, A>(that: () => IOEither<E, A>) => (fa: IOEither<E, A>) => IOEither<E, A>,
  ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>,
  apFirst: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A>,
  apSecond: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, B>,
  bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B>,
  chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>,
  chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>,
  flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>,
  map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>,
  mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A>,
  fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A>,
  fromOption: <E>(onNone: () => E) => <A>(ma: import('./Option').Option<A>) => IOEither<E, A>,
  fromPredicate: {
    <E, A, B extends A>(refinement: import('./function').Refinement<A, B>, onFalse: (a: A) => E): (
      a: A
    ) => IOEither<E, B>
    <E_1, A_1>(predicate: import('./function').Predicate<A_1>, onFalse: (a: A_1) => E_1): (a: A_1) => IOEither<E_1, A_1>
  },
  filterOrElse: {
    <E, A, B extends A>(refinement: import('./function').Refinement<A, B>, onFalse: (a: A) => E): (
      ma: IOEither<E, A>
    ) => IOEither<E, B>
    <E_1, A_1>(predicate: import('./function').Predicate<A_1>, onFalse: (a: A_1) => E_1): (
      ma: IOEither<E_1, A_1>
    ) => IOEither<E_1, A_1>
  }
export {
  /**
   * @since 2.0.0
   */
  alt,
  /**
   * @since 2.0.0
   */
  ap,
  /**
   * @since 2.0.0
   */
  apFirst,
  /**
   * @since 2.0.0
   */
  apSecond,
  /**
   * @since 2.0.0
   */
  bimap,
  /**
   * @since 2.0.0
   */
  chain,
  /**
   * @since 2.0.0
   */
  chainFirst,
  /**
   * @since 2.0.0
   */
  flatten,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  mapLeft,
  /**
   * @since 2.0.0
   */
  fromEither,
  /**
   * @since 2.0.0
   */
  fromOption,
  /**
   * @since 2.0.0
   */
  fromPredicate,
  /**
   * @since 2.0.0
   */
  filterOrElse
}
