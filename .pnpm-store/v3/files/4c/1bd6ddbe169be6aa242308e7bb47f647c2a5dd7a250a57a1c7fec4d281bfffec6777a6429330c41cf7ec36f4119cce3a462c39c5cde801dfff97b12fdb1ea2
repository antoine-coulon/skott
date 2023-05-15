import type { Kind, TypeClass, TypeLambda } from "@effect/data/HKT";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Invariant<F extends TypeLambda> extends TypeClass<F> {
    readonly imap: {
        <A, B>(to: (a: A) => B, from: (b: B) => A): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>;
        <R, O, E, A, B>(self: Kind<F, R, O, E, A>, to: (a: A) => B, from: (b: B) => A): Kind<F, R, O, E, B>;
    };
}
/**
 * Returns a default ternary `imap` composition.
 *
 * @since 1.0.0
 */
export declare const imapComposition: <F extends TypeLambda, G extends TypeLambda>(F: Invariant<F>, G: Invariant<G>) => <FR, FO, FE, GR, GO, GE, A, B>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>, to: (a: A) => B, from: (b: B) => A) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bindTo: <F extends TypeLambda>(F: Invariant<F>) => {
    <N extends string>(name: N): <R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, { [K in N]: A; }>;
    <R_1, O_1, E_1, A_1, N_1 extends string>(self: Kind<F, R_1, O_1, E_1, A_1>, name: N_1): Kind<F, R_1, O_1, E_1, { [K_1 in N_1]: A_1; }>;
};
/**
 * Convert a value in a singleton array in a given effect.
 *
 * @since 1.0.0
 */
export declare const tupled: <F extends TypeLambda>(F: Invariant<F>) => <R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, [A]>;
//# sourceMappingURL=Invariant.d.ts.map