import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Invariant } from "@effect/data/typeclass/Invariant";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Covariant<F extends TypeLambda> extends Invariant<F> {
    readonly map: {
        <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>;
        <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B): Kind<F, R, O, E, B>;
    };
}
/**
 * Returns a default `map` composition.
 *
 * @since 1.0.0
 */
export declare const mapComposition: <F extends TypeLambda, G extends TypeLambda>(F: Covariant<F>, G: Covariant<G>) => <FR, FO, FE, GR, GO, GE, A, B>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>, f: (a: A) => B) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>;
/**
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
export declare const imap: <F extends TypeLambda>(map: <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B) => Kind<F, R, O, E, B>) => {
    <A_1, B_1>(to: (a: A_1) => B_1, from: (b: B_1) => A_1): <R_1, O_1, E_1>(self: Kind<F, R_1, O_1, E_1, A_1>) => Kind<F, R_1, O_1, E_1, B_1>;
    <R_2, O_2, E_2, A_2, B_2>(self: Kind<F, R_2, O_2, E_2, A_2>, to: (a: A_2) => B_2, from: (b: B_2) => A_2): Kind<F, R_2, O_2, E_2, B_2>;
};
/**
 * @category mapping
 * @since 1.0.0
 */
export declare const flap: <F extends TypeLambda>(F: Covariant<F>) => {
    <R, O, E, A, B>(self: Kind<F, R, O, E, (a: A) => B>): (a: A) => Kind<F, R, O, E, B>;
    <A_1, R_1, O_1, E_1, B_1>(a: A_1, self: Kind<F, R_1, O_1, E_1, (a: A_1) => B_1>): Kind<F, R_1, O_1, E_1, B_1>;
};
/**
 * @category mapping
 * @since 1.0.0
 */
export declare const as: <F extends TypeLambda>(F: Covariant<F>) => {
    <B>(b: B): <R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, B>;
    <R_1, O_1, E_1, __1, B_1>(self: Kind<F, R_1, O_1, E_1, __1>, b: B_1): Kind<F, R_1, O_1, E_1, B_1>;
};
/**
 * @category mapping
 * @since 1.0.0
 */
export declare const asUnit: <F extends TypeLambda>(F: Covariant<F>) => <R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, void>;
declare const let_: <F extends TypeLambda>(F: Covariant<F>) => {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>;
    <R_1, O_1, E_1, A_1 extends object, N_1 extends string, B_1>(self: Kind<F, R_1, O_1, E_1, A_1>, name: Exclude<N_1, keyof A_1>, f: (a: A_1) => B_1): Kind<F, R_1, O_1, E_1, { [K_1 in N_1 | keyof A_1]: K_1 extends keyof A_1 ? A_1[K_1] : B_1; }>;
};
export { 
/**
 * @category do notation
 * @since 1.0.0
 */
let_ as let };
//# sourceMappingURL=Covariant.d.ts.map