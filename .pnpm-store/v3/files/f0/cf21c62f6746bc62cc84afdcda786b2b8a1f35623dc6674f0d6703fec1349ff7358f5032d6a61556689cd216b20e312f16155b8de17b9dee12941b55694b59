import type { Kind, TypeClass, TypeLambda } from "@effect/data/HKT";
import type { Covariant } from "@effect/data/typeclass/Covariant";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Bicovariant<F extends TypeLambda> extends TypeClass<F> {
    readonly bimap: {
        <E1, E2, A, B>(f: (e: E1) => E2, g: (a: A) => B): <R, O>(self: Kind<F, R, O, E1, A>) => Kind<F, R, O, E2, B>;
        <R, O, E1, A, E2, B>(self: Kind<F, R, O, E1, A>, f: (e: E1) => E2, g: (a: A) => B): Kind<F, R, O, E2, B>;
    };
}
/**
 * Returns a default ternary `bimap` composition.
 *
 * @since 1.0.0
 */
export declare const bimapComposition: <F extends TypeLambda, G extends TypeLambda>(CovariantF: Covariant<F>, BicovariantG: Bicovariant<G>) => <FR, FO, FE, GR, GO, E1, A, E2, B>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, E1, A>>, f: (e: E1) => E2, g: (a: A) => B) => Kind<F, FR, FO, FE, Kind<G, GR, GO, E2, B>>;
/**
 * Returns a default `mapLeft` implementation.
 *
 * @since 1.0.0
 */
export declare const mapLeft: <F extends TypeLambda>(F: Bicovariant<F>) => {
    <E, G>(f: (e: E) => G): <R, O, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, G, A>;
    <R_1, O_1, E_1, A_1, G_1>(self: Kind<F, R_1, O_1, E_1, A_1>, f: (e: E_1) => G_1): Kind<F, R_1, O_1, G_1, A_1>;
};
/**
 * Returns a default `map` implementation.
 *
 * @since 1.0.0
 */
export declare const map: <F extends TypeLambda>(F: Bicovariant<F>) => {
    <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>;
    <R_1, O_1, E_1, A_1, B_1>(self: Kind<F, R_1, O_1, E_1, A_1>, f: (a: A_1) => B_1): Kind<F, R_1, O_1, E_1, B_1>;
};
//# sourceMappingURL=Bicovariant.d.ts.map