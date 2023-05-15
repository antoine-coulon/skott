import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Covariant } from "@effect/data/typeclass/Covariant";
import type { FlatMap } from "@effect/data/typeclass/FlatMap";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Chainable<F extends TypeLambda> extends FlatMap<F>, Covariant<F> {
}
/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combining
 * @since 1.0.0
 */
export declare const andThenDiscard: <F extends TypeLambda>(F: Chainable<F>) => {
    <R2, O2, E2, _>(that: Kind<F, R2, O2, E2, _>): <R1, O1, E1, A>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, A>;
    <R1_1, O1_1, E1_1, A_1, R2_1, O2_1, E2_1, __1>(self: Kind<F, R1_1, O1_1, E1_1, A_1>, that: Kind<F, R2_1, O2_1, E2_1, __1>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, A_1>;
};
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 1.0.0
 */
export declare const tap: <F extends TypeLambda>(F: Chainable<F>) => {
    <A, R2, O2, E2, _>(f: (a: A) => Kind<F, R2, O2, E2, _>): <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, A>;
    <R1_1, O1_1, E1_1, A_1, R2_1, O2_1, E2_1, __1>(self: Kind<F, R1_1, O1_1, E1_1, A_1>, f: (a: A_1) => Kind<F, R2_1, O2_1, E2_1, __1>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, A_1>;
};
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bind: <F extends TypeLambda>(F: Chainable<F>) => {
    <N extends string, A extends object, R2, O2, E2, B>(name: Exclude<N, keyof A>, f: (a: A) => Kind<F, R2, O2, E2, B>): <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>;
    <R1_1, O1_1, E1_1, A_1 extends object, N_1 extends string, R2_1, O2_1, E2_1, B_1>(self: Kind<F, R1_1, O1_1, E1_1, A_1>, name: Exclude<N_1, keyof A_1>, f: (a: A_1) => Kind<F, R2_1, O2_1, E2_1, B_1>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, { [K_1 in N_1 | keyof A_1]: K_1 extends keyof A_1 ? A_1[K_1] : B_1; }>;
};
//# sourceMappingURL=Chainable.d.ts.map