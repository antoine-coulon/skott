/**
 * @since 2.5.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Foldable2 } from './Foldable'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2 } from './Traversable'
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly ReadonlyTuple: readonly [A, E]
  }
}
/**
 * @since 2.5.0
 */
export declare const URI = 'ReadonlyTuple'
/**
 * @since 2.5.0
 */
export declare type URI = typeof URI
/**
 * @since 2.5.0
 */
export declare function fst<A, S>(sa: readonly [A, S]): A
/**
 * @since 2.5.0
 */
export declare function snd<A, S>(sa: readonly [A, S]): S
/**
 * @since 2.5.0
 */
export declare function swap<A, S>(sa: readonly [A, S]): readonly [S, A]
/**
 * @since 2.5.0
 */
export declare function getApply<S>(S: Semigroup<S>): Apply2C<URI, S>
/**
 * @since 2.5.0
 */
export declare function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S>
/**
 * @since 2.5.0
 */
export declare function getChain<S>(S: Semigroup<S>): Chain2C<URI, S>
/**
 * @since 2.5.0
 */
export declare function getMonad<S>(M: Monoid<S>): Monad2C<URI, S>
/**
 * @since 2.5.0
 */
export declare function getChainRec<S>(M: Monoid<S>): ChainRec2C<URI, S>
/**
 * @since 2.5.0
 */
export declare const readonlyTuple: Semigroupoid2<URI> &
  Bifunctor2<URI> &
  Comonad2<URI> &
  Foldable2<URI> &
  Traversable2<URI>
declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: readonly [A, E]) => readonly [B, G],
  compose: <E, A>(la: readonly [A, E]) => <B>(ab: readonly [B, A]) => readonly [B, E],
  duplicate: <E, A>(ma: readonly [A, E]) => readonly [readonly [A, E], E],
  extend: <E, A, B>(f: (fa: readonly [A, E]) => B) => (ma: readonly [A, E]) => readonly [B, E],
  foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M,
  map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E],
  mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: readonly [A, E]) => readonly [A, G],
  reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B,
  reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B
export {
  /**
   * @since 2.5.0
   */
  bimap,
  /**
   * @since 2.5.0
   */
  compose,
  /**
   * @since 2.5.0
   */
  duplicate,
  /**
   * @since 2.5.0
   */
  extend,
  /**
   * @since 2.5.0
   */
  foldMap,
  /**
   * @since 2.5.0
   */
  map,
  /**
   * @since 2.5.0
   */
  mapLeft,
  /**
   * @since 2.5.0
   */
  reduce,
  /**
   * @since 2.5.0
   */
  reduceRight
}
