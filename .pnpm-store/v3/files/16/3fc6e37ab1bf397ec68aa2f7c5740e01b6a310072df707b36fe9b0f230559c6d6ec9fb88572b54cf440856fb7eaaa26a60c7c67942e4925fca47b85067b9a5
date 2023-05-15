import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Covariant } from "@effect/data/typeclass/Covariant";
import type { Semigroup } from "@effect/data/typeclass/Semigroup";
import type { SemiProduct } from "@effect/data/typeclass/SemiProduct";
/**
 * @category type class
 * @since 1.0.0
 */
export interface SemiApplicative<F extends TypeLambda> extends SemiProduct<F>, Covariant<F> {
}
/**
 * Lift a `Semigroup` into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @category lifting
 * @since 1.0.0
 */
export declare const getSemigroup: <F extends TypeLambda>(F: SemiApplicative<F>) => <A, R, O, E>(S: Semigroup<A>) => Semigroup<Kind<F, R, O, E, A>>;
/**
 * Zips two `F` values together using a provided function, returning a new `F` of the result.
 *
 * @param self - The left-hand side of the zip operation
 * @param that - The right-hand side of the zip operation
 * @param f - The function used to combine the values of the two `Option`s
 *
 * @since 1.0.0
 */
export declare const zipWith: <F extends TypeLambda>(F: SemiApplicative<F>) => {
    <R2, O2, E2, B, A, C>(that: Kind<F, R2, O2, E2, B>, f: (a: A, b: B) => C): <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, C>;
    <R1_1, O1_1, E1_1, A_1, R2_1, O2_1, E2_1, B_1, C_1>(self: Kind<F, R1_1, O1_1, E1_1, A_1>, that: Kind<F, R2_1, O2_1, E2_1, B_1>, f: (a: A_1, b: B_1) => C_1): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, C_1>;
};
/**
 * @since 1.0.0
 */
export declare const ap: <F extends TypeLambda>(F: SemiApplicative<F>) => {
    <R2, O2, E2, A>(that: Kind<F, R2, O2, E2, A>): <R1, O1, E1, B>(self: Kind<F, R1, O1, E1, (a: A) => B>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, B>;
    <R1_1, O1_1, E1_1, A_1, B_1, R2_1, O2_1, E2_1>(self: Kind<F, R1_1, O1_1, E1_1, (a: A_1) => B_1>, that: Kind<F, R2_1, O2_1, E2_1, A_1>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, B_1>;
};
/**
 * @since 1.0.0
 */
export declare const andThenDiscard: <F extends TypeLambda>(F: SemiApplicative<F>) => {
    <R2, O2, E2, _>(that: Kind<F, R2, O2, E2, _>): <R1, O1, E1, A>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, A>;
    <R1_1, O1_1, E1_1, A_1, R2_1, O2_1, E2_1, __1>(self: Kind<F, R1_1, O1_1, E1_1, A_1>, that: Kind<F, R2_1, O2_1, E2_1, __1>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, A_1>;
};
/**
 * @since 1.0.0
 */
export declare const andThen: <F extends TypeLambda>(F: SemiApplicative<F>) => {
    <R2, O2, E2, B>(that: Kind<F, R2, O2, E2, B>): <R1, O1, E1, _>(self: Kind<F, R1, O1, E1, _>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, B>;
    <R1_1, O1_1, E1_1, __1, R2_1, O2_1, E2_1, B_1>(self: Kind<F, R1_1, O1_1, E1_1, __1>, that: Kind<F, R2_1, O2_1, E2_1, B_1>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, B_1>;
};
/**
 * Lifts a binary function into `F`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export declare const lift2: <F extends TypeLambda>(F: SemiApplicative<F>) => <A, B, C>(f: (a: A, b: B) => C) => {
    <R2, O2, E2>(that: Kind<F, R2, O2, E2, B>): <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, C>;
    <R1_1, O1_1, E1_1, R2_1, O2_1, E2_1>(self: Kind<F, R1_1, O1_1, E1_1, A>, that: Kind<F, R2_1, O2_1, E2_1, B>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, C>;
};
//# sourceMappingURL=SemiApplicative.d.ts.map