/**
 * The `State` monad is a synonym for the `StateT` monad transformer, applied to the `Identity` monad.
 *
 * @since 2.0.0
 */
import { Monad2 } from './Monad'
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly State: State<E, A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'State'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.0.0
 */
export declare const evalState: <S, A>(ma: State<S, A>, s: S) => A
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.0.0
 */
export declare const execState: <S, A>(ma: State<S, A>, s: S) => S
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export declare const get: <S>() => State<S, S>
/**
 * Set the state
 *
 * @since 2.0.0
 */
export declare const put: <S>(s: S) => State<S, void>
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export declare const modify: <S>(f: (s: S) => S) => State<S, void>
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export declare const gets: <S, A>(f: (s: S) => A) => State<S, A>
/**
 * @since 2.0.0
 */
export declare const of: <S, A>(a: A) => State<S, A>
/**
 * @since 2.0.0
 */
export declare const state: Monad2<URI>
declare const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B>,
  apFirst: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, A>,
  apSecond: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, B>,
  chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B>,
  chainFirst: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, A>,
  flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A>,
  map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B>
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
