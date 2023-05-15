/**
 * @since 2.0.0
 */
import { Alt4 } from './Alt'
import { Bifunctor4 } from './Bifunctor'
import { Either } from './Either'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad4 } from './Monad'
import { MonadTask4 } from './MonadTask'
import { MonadThrow4 } from './MonadThrow'
import { Reader } from './Reader'
import { ReaderEither } from './ReaderEither'
import * as RTE from './ReaderTaskEither'
import { State } from './State'
import { Task } from './Task'
import { TaskEither } from './TaskEither'
import ReaderTaskEither = RTE.ReaderTaskEither
declare module './HKT' {
  interface URItoKind4<S, R, E, A> {
    readonly StateReaderTaskEither: StateReaderTaskEither<S, R, E, A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'StateReaderTaskEither'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}
/**
 * @since 2.0.0
 */
export declare function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>>
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
export declare const evalState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, A>
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
export declare const execState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, S>
/**
 * @since 2.0.0
 */
export declare function left<S, R, E = never, A = never>(e: E): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare const right: <S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function rightTask<S, R, E = never, A = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function leftTask<S, R, E = never, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function fromTaskEither<S, R, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function rightReader<S, R, E = never, A = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function leftReader<S, R, E = never, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function fromIOEither<S, R, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function fromReaderEither<S, R, E, A>(ma: ReaderEither<R, E, A>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function rightIO<S, R, E = never, A = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function leftIO<S, R, E = never, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare const rightState: <S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare function leftState<S, R, E = never, A = never>(me: State<S, E>): StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.0.0
 */
export declare const fromReaderTaskEither: <S, R, E, A>(
  ma: ReaderTaskEither<R, E, A>
) => StateReaderTaskEither<S, R, E, A>
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export declare const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S>
/**
 * Set the state
 *
 * @since 2.0.0
 */
export declare const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void>
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export declare const modify: <S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void>
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export declare const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A>
/**
 * @since 2.4.0
 */
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
/**
 * @since 2.4.0
 */
export declare function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * @since 2.4.0
 */
export declare function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
/**
 * @since 2.4.0
 */
export declare function chainIOEitherK<E, A, B>(
  f: (a: A) => IOEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * @since 2.4.0
 */
export declare function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
/**
 * @since 2.4.0
 */
export declare function chainTaskEitherK<E, A, B>(
  f: (a: A) => TaskEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * @since 2.4.0
 */
export declare function fromReaderTaskEitherK<R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): <S>(...a: A) => StateReaderTaskEither<S, R, E, B>
/**
 * @since 2.4.0
 */
export declare function chainReaderTaskEitherK<R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * @since 2.0.0
 */
export declare const stateReaderTaskEither: Monad4<URI> &
  Bifunctor4<URI> &
  Alt4<URI> &
  MonadTask4<URI> &
  MonadThrow4<URI>
/**
 * Like `stateReaderTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export declare const stateReaderTaskEitherSeq: typeof stateReaderTaskEither
declare const ap: <S, R, E, A>(
    fa: StateReaderTaskEither<S, R, E, A>
  ) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>,
  apFirst: <S, R, E, B>(
    fb: StateReaderTaskEither<S, R, E, B>
  ) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>,
  apSecond: <S, R, E, B>(
    fb: StateReaderTaskEither<S, R, E, B>
  ) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>,
  chain: <S, R, E, A, B>(
    f: (a: A) => StateReaderTaskEither<S, R, E, B>
  ) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>,
  chainFirst: <S, R, E, A, B>(
    f: (a: A) => StateReaderTaskEither<S, R, E, B>
  ) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>,
  flatten: <S, R, E, A>(
    mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
  ) => StateReaderTaskEither<S, R, E, A>,
  map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>,
  fromEither: <S, R, E, A>(ma: Either<E, A>) => StateReaderTaskEither<S, R, E, A>,
  fromOption: <E>(onNone: () => E) => <S, R, A>(ma: import('./Option').Option<A>) => StateReaderTaskEither<S, R, E, A>,
  filterOrElse: {
    <E, A, B extends A>(refinement: import('./function').Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
      ma: StateReaderTaskEither<S, R, E, A>
    ) => StateReaderTaskEither<S, R, E, B>
    <E_1, A_1>(predicate: import('./function').Predicate<A_1>, onFalse: (a: A_1) => E_1): <S_1, R_1>(
      ma: StateReaderTaskEither<S_1, R_1, E_1, A_1>
    ) => StateReaderTaskEither<S_1, R_1, E_1, A_1>
  },
  fromPredicate: {
    <E, A, B extends A>(refinement: import('./function').Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
      a: A
    ) => StateReaderTaskEither<S, R, E, B>
    <E_1, A_1>(predicate: import('./function').Predicate<A_1>, onFalse: (a: A_1) => E_1): <S_1, R_1>(
      a: A_1
    ) => StateReaderTaskEither<S_1, R_1, E_1, A_1>
  }
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
  map,
  /**
   * @since 2.0.0
   */
  fromEither,
  /**
   * @since 2.0.0
   */
  fromOption,
  /**
   * @since 2.4.4
   */
  fromPredicate,
  /**
   * @since 2.4.4
   */
  filterOrElse
}
