/**
 * @since 2.0.0
 */
import { Comonad2 } from './Comonad'
import { Endomorphism } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Store: Store<E, A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'Store'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface Store<S, A> {
  readonly peek: (s: S) => A
  readonly pos: S
}
/**
 * Reposition the focus at the specified position
 *
 * @since 2.0.0
 */
export declare function seek<S>(s: S): <A>(wa: Store<S, A>) => Store<S, A>
/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
export declare function seeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => Store<S, A>
/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
export declare function peeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => A
/**
 * Extract a collection of values from positions which depend on the current position
 *
 * @since 2.0.0
 */
export declare function experiment<F extends URIS3>(
  F: Functor3<F>
): <R, E, S>(f: (s: S) => Kind3<F, R, E, S>) => <A>(wa: Store<S, A>) => Kind3<F, R, E, A>
export declare function experiment<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, S>(f: (s: S) => Kind3<F, R, E, S>) => <A>(wa: Store<S, A>) => Kind3<F, R, E, A>
export declare function experiment<F extends URIS2>(
  F: Functor2<F>
): <E, S>(f: (s: S) => Kind2<F, E, S>) => <A>(wa: Store<S, A>) => Kind2<F, E, A>
export declare function experiment<F extends URIS2, E>(
  F: Functor2C<F, E>
): <S>(f: (s: S) => Kind2<F, E, S>) => <A>(wa: Store<S, A>) => Kind2<F, E, A>
export declare function experiment<F extends URIS>(
  F: Functor1<F>
): <S>(f: (s: S) => Kind<F, S>) => <A>(wa: Store<S, A>) => Kind<F, A>
export declare function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A>
/**
 * @since 2.0.0
 */
export declare const store: Comonad2<URI>
declare const duplicate: <E, A>(ma: Store<E, A>) => Store<E, Store<E, A>>,
  extend: <E, A, B>(f: (fa: Store<E, A>) => B) => (ma: Store<E, A>) => Store<E, B>,
  map: <A, B>(f: (a: A) => B) => <E>(fa: Store<E, A>) => Store<E, B>
export {
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
  map
}
