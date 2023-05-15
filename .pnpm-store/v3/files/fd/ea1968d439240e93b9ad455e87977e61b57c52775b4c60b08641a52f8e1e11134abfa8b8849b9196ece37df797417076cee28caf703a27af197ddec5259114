/**
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { ChainRec1 } from './ChainRec'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Foldable1 } from './Foldable'
import { Monad1 } from './Monad'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
declare module './HKT' {
  interface URItoKind<A> {
    readonly Identity: Identity<A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'Identity'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export declare type Identity<A> = A
/**
 * @since 2.0.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<Identity<A>>
/**
 * @since 2.0.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<Identity<A>>
/**
 * @since 2.0.0
 */
export declare const identity: Monad1<URI> &
  Foldable1<URI> &
  Traversable1<URI> &
  Alt1<URI> &
  Comonad1<URI> &
  ChainRec1<URI>
declare const alt: <A>(that: () => A) => (fa: A) => A,
  ap: <A>(fa: A) => <B>(fab: (a: A) => B) => B,
  apFirst: <B>(fb: B) => <A>(fa: A) => A,
  apSecond: <B>(fb: B) => <A>(fa: A) => B,
  chain: <A, B>(f: (a: A) => B) => (ma: A) => B,
  chainFirst: <A, B>(f: (a: A) => B) => (ma: A) => A,
  duplicate: <A>(ma: A) => A,
  extend: <A, B>(f: (fa: A) => B) => (ma: A) => B,
  flatten: <A>(mma: A) => A,
  foldMap: <M>(M: import('./Monoid').Monoid<M>) => <A>(f: (a: A) => M) => (fa: A) => M,
  map: <A, B>(f: (a: A) => B) => (fa: A) => B,
  reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: A) => B,
  reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: A) => B
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
  chain,
  /**
   * @since 2.0.0
   */
  chainFirst,
  /**
   * @since 2.0.0
   */
  duplicate,
  /**
   * @since 2.0.0
   */
  extend,
  /**
   * @since 2.0.0
   */
  flatten,
  /**
   * @since 2.0.0
   */
  foldMap,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  reduce,
  /**
   * @since 2.0.0
   */
  reduceRight
}
