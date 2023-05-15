/**
 * @since 2.0.0
 */
import { Category2 } from './Category'
import { Choice2 } from './Choice'
import { Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { Profunctor2 } from './Profunctor'
import { Semigroup } from './Semigroup'
import { Strong2 } from './Strong'
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Reader: Reader<E, A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'Reader'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface Reader<R, A> {
  (r: R): A
}
/**
 * Reads the current context
 *
 * @since 2.0.0
 */
export declare const ask: <R>() => Reader<R, R>
/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.0.0
 */
export declare function local<Q, R>(f: (d: Q) => R): <A>(ma: Reader<R, A>) => Reader<Q, A>
/**
 * @since 2.0.0
 */
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>>
/**
 * @since 2.0.0
 */
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>>
/**
 * @since 2.0.0
 */
export declare const of: <R, A>(a: A) => Reader<R, A>
/**
 * @since 2.0.0
 */
export declare const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI>
declare const ap: <E, A>(fa: Reader<E, A>) => <B>(fab: Reader<E, (a: A) => B>) => Reader<E, B>,
  apFirst: <E, B>(fb: Reader<E, B>) => <A>(fa: Reader<E, A>) => Reader<E, A>,
  apSecond: <E, B>(fb: Reader<E, B>) => <A>(fa: Reader<E, A>) => Reader<E, B>,
  chain: <E, A, B>(f: (a: A) => Reader<E, B>) => (ma: Reader<E, A>) => Reader<E, B>,
  chainFirst: <E, A, B>(f: (a: A) => Reader<E, B>) => (ma: Reader<E, A>) => Reader<E, A>,
  compose: <E, A>(la: Reader<E, A>) => <B>(ab: Reader<A, B>) => Reader<E, B>,
  flatten: <E, A>(mma: Reader<E, Reader<E, A>>) => Reader<E, A>,
  map: <A, B>(f: (a: A) => B) => <E>(fa: Reader<E, A>) => Reader<E, B>,
  promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B>
export {
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
  chain,
  /**
   * @since 2.0.0
   */
  chainFirst,
  /**
   * @since 2.0.0
   */
  compose,
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
  promap
}
