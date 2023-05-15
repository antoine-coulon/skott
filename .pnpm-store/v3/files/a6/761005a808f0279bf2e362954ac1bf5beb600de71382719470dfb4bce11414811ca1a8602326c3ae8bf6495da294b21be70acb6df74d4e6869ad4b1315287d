/**
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Contravariant2 } from './Contravariant'
import { Functor2 } from './Functor'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Eq } from './Eq'
import { Show } from './Show'
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Const: Const<E, A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'Const'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export declare type Const<E, A> = E & {
  readonly _A: A
}
/**
 * @since 2.0.0
 */
export declare const make: <E, A = never>(l: E) => Const<E, A>
/**
 * @since 2.0.0
 */
export declare function getShow<E, A>(S: Show<E>): Show<Const<E, A>>
/**
 * @since 2.0.0
 */
export declare const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>>
/**
 * @since 2.0.0
 */
export declare function getApply<E>(S: Semigroup<E>): Apply2C<URI, E>
/**
 * @since 2.0.0
 */
export declare function getApplicative<E>(M: Monoid<E>): Applicative2C<URI, E>
/**
 * @since 2.0.0
 */
export declare const const_: Functor2<URI> & Contravariant2<URI>
declare const contramap: <A, B>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B>,
  map: <A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B>
export {
  /**
   * @since 2.0.0
   */
  contramap,
  /**
   * @since 2.0.0
   */
  map
}
