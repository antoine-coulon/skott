import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Invariant } from "@effect/data/typeclass/Invariant";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Contravariant<F extends TypeLambda> extends Invariant<F> {
    readonly contramap: {
        <B, A>(f: (b: B) => A): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>;
        <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (b: B) => A): Kind<F, R, O, E, B>;
    };
}
/**
 * Composing two contravariant functors yields a Covariant functor.
 *
 * Returns a default binary `map` composition.
 *
 * @since 1.0.0
 */
export declare const contramapComposition: <F extends TypeLambda, G extends TypeLambda>(F: Contravariant<F>, G: Contravariant<G>) => <FR, FO, FE, GR, GO, GE, A, B>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>, f: (a: A) => B) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>;
/**
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
export declare const imap: <F extends TypeLambda>(contramap: <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (b: B) => A) => Kind<F, R, O, E, B>) => {
    <A_1, B_1>(to: (a: A_1) => B_1, from: (b: B_1) => A_1): <R_1, O_1, E_1>(self: Kind<F, R_1, O_1, E_1, A_1>) => Kind<F, R_1, O_1, E_1, B_1>;
    <R_2, O_2, E_2, A_2, B_2>(self: Kind<F, R_2, O_2, E_2, A_2>, to: (a: A_2) => B_2, from: (b: B_2) => A_2): Kind<F, R_2, O_2, E_2, B_2>;
};
//# sourceMappingURL=Contravariant.d.ts.map