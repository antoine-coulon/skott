/**
 * @since 2.3.0
 */
import { IO } from './IO'
import { Monad2 } from './Monad'
import { MonadTask2 } from './MonadTask'
import { Monoid } from './Monoid'
import { Reader } from './Reader'
import { Semigroup } from './Semigroup'
import * as TA from './Task'
import Task = TA.Task
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly ReaderTask: ReaderTask<E, A>
  }
}
/**
 * @since 2.3.0
 */
export declare const URI = 'ReaderTask'
/**
 * @since 2.3.0
 */
export declare type URI = typeof URI
/**
 * @since 2.3.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
/**
 * @since 2.4.0
 */
export declare function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A>
/**
 * @since 2.3.0
 */
export declare const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare function fromIO<R, A>(ma: IO<A>): ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare const of: <R, A>(a: A) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>>
/**
 * @since 2.3.0
 */
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>>
/**
 * @since 2.3.0
 */
export declare const ask: <R>() => ReaderTask<R, R>
/**
 * @since 2.3.0
 */
export declare const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare function local<Q, R>(f: (f: Q) => R): <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A>
/**
 * @since 2.4.0
 */
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
): <R>(...a: A) => ReaderTask<R, B>
/**
 * @since 2.4.0
 */
export declare function chainIOK<A, B>(f: (a: A) => IO<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * @since 2.4.0
 */
export declare function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B>
/**
 * @since 2.4.0
 */
export declare function chainTaskK<A, B>(f: (a: A) => Task<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * @since 2.3.0
 */
export declare const readerTask: Monad2<URI> & MonadTask2<URI>
/**
 * Like `readerTask` but `ap` is sequential
 * @since 2.3.0
 */
export declare const readerTaskSeq: typeof readerTask
declare const ap: <E, A>(fa: ReaderTask<E, A>) => <B>(fab: ReaderTask<E, (a: A) => B>) => ReaderTask<E, B>,
  apFirst: <E, B>(fb: ReaderTask<E, B>) => <A>(fa: ReaderTask<E, A>) => ReaderTask<E, A>,
  apSecond: <E, B>(fb: ReaderTask<E, B>) => <A>(fa: ReaderTask<E, A>) => ReaderTask<E, B>,
  chain: <E, A, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, B>,
  chainFirst: <E, A, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, A>,
  flatten: <E, A>(mma: ReaderTask<E, ReaderTask<E, A>>) => ReaderTask<E, A>,
  map: <A, B>(f: (a: A) => B) => <E>(fa: ReaderTask<E, A>) => ReaderTask<E, B>
export {
  /**
   * @since 2.3.0
   */
  ap,
  /**
   * @since 2.3.0
   */
  apFirst,
  /**
   * @since 2.3.0
   */
  apSecond,
  /**
   * @since 2.3.0
   */
  chain,
  /**
   * @since 2.3.0
   */
  chainFirst,
  /**
   * @since 2.3.0
   */
  flatten,
  /**
   * @since 2.3.0
   */
  map
}
