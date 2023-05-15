import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { ChainRec1 } from './ChainRec'
declare module './HKT' {
  interface URItoKind<A> {
    readonly IO: IO<A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'IO'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface IO<A> {
  (): A
}
/**
 * @since 2.0.0
 */
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>>
/**
 * @since 2.0.0
 */
export declare function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>>
/**
 * @since 2.0.0
 */
export declare const of: <A>(a: A) => IO<A>
/**
 * @since 2.0.0
 */
export declare const io: Monad1<URI> & MonadIO1<URI> & ChainRec1<URI>
declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>,
  apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A>,
  apSecond: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<B>,
  chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>,
  chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A>,
  flatten: <A>(mma: IO<IO<A>>) => IO<A>,
  map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
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
  flatten,
  /**
   * @since 2.0.0
   */
  map
}
