/**
 * @since 2.0.0
 */
import { ApplicativeCompositionHKT2C, ApplicativeComposition12C, ApplicativeComposition22C } from './Applicative'
import { Either, URI } from './Either'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Semigroup } from './Semigroup'
/**
 * @since 2.0.0
 */
export interface ValidationT<M, E, A> extends HKT<M, Either<E, A>> {}
/**
 * @since 2.0.0
 */
export interface ValidationM<M, E> extends ApplicativeCompositionHKT2C<M, URI, E> {
  readonly chain: <A, B>(ma: ValidationT<M, E, A>, f: (a: A) => ValidationT<M, E, B>) => ValidationT<M, E, B>
  readonly alt: <A>(fx: ValidationT<M, E, A>, f: () => ValidationT<M, E, A>) => ValidationT<M, E, A>
}
/**
 * @since 2.0.0
 */
export declare type ValidationT1<M extends URIS, E, A> = Kind<M, Either<E, A>>
/**
 * @since 2.0.0
 */
export interface ValidationM1<M extends URIS, E> extends ApplicativeComposition12C<M, URI, E> {
  readonly chain: <A, B>(ma: ValidationT1<M, E, A>, f: (a: A) => ValidationT1<M, E, B>) => ValidationT1<M, E, B>
  readonly alt: <A>(fx: ValidationT1<M, E, A>, f: () => ValidationT1<M, E, A>) => ValidationT1<M, E, A>
}
/**
 * @since 2.0.0
 */
export declare type ValidationT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>
/**
 * @since 2.0.0
 */
export interface ValidationM2<M extends URIS2, E> extends ApplicativeComposition22C<M, URI, E> {
  readonly chain: <R, A, B>(
    ma: ValidationT2<M, R, E, A>,
    f: (a: A) => ValidationT2<M, R, E, B>
  ) => ValidationT2<M, R, E, B>
  readonly alt: <R, A>(fx: ValidationT2<M, R, E, A>, f: () => ValidationT2<M, R, E, A>) => ValidationT2<M, R, E, A>
}
/**
 * @since 2.0.0
 */
export declare function getValidationM<E, M extends URIS2>(S: Semigroup<E>, M: Monad2<M>): ValidationM2<M, E>
export declare function getValidationM<E, M extends URIS>(S: Semigroup<E>, M: Monad1<M>): ValidationM1<M, E>
export declare function getValidationM<E, M>(S: Semigroup<E>, M: Monad<M>): ValidationM<M, E>
