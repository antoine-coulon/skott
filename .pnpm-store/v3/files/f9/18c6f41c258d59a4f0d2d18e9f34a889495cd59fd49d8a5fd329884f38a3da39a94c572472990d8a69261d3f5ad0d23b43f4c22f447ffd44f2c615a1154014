/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@effect/data/HKT";
import type { Coproduct } from "@effect/data/typeclass/Coproduct";
import type { Monad } from "@effect/data/typeclass/Monad";
import type { Monoid } from "@effect/data/typeclass/Monoid";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
    readonly reduce: {
        <A, B>(b: B, f: (b: B, a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => B;
        <R, O, E, A, B>(self: Kind<F, R, O, E, A>, b: B, f: (b: B, a: A) => B): B;
    };
}
/**
 * Returns a default ternary `reduce` composition.
 *
 * @since 1.0.0
 */
export declare const reduceComposition: <F extends TypeLambda, G extends TypeLambda>(F: Foldable<F>, G: Foldable<G>) => <FR, FO, FE, GR, GO, GE, A, B>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>, b: B, f: (b: B, a: A) => B) => B;
/**
 * @since 1.0.0
 */
export declare const toArrayMap: <F extends TypeLambda>(F: Foldable<F>) => {
    <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => B[];
    <R_1, O_1, E_1, A_1, B_1>(self: Kind<F, R_1, O_1, E_1, A_1>, f: (a: A_1) => B_1): B_1[];
};
/**
 * @since 1.0.0
 */
export declare const toArray: <F extends TypeLambda>(F: Foldable<F>) => <R, O, E, A>(self: Kind<F, R, O, E, A>) => A[];
/**
 * @since 1.0.0
 */
export declare const combineMap: <F extends TypeLambda>(F: Foldable<F>) => <M>(M: Monoid<M>) => {
    <A>(f: (a: A) => M): <R, O, E>(self: Kind<F, R, O, E, A>) => M;
    <R_1, O_1, E_1, A_1>(self: Kind<F, R_1, O_1, E_1, A_1>, f: (a: A_1) => M): M;
};
/**
 * @since 1.0.0
 */
export declare const reduceKind: <F extends TypeLambda>(F: Foldable<F>) => <G extends TypeLambda>(G: Monad<G>) => {
    <B, A, R, O, E>(b: B, f: (b: B, a: A) => Kind<G, R, O, E, B>): <FR, FO, FE>(self: Kind<F, FR, FO, FE, A>) => Kind<G, R, O, E, B>;
    <FR_1, FO_1, FE_1, A_1, B_1, R_1, O_1, E_1>(self: Kind<F, FR_1, FO_1, FE_1, A_1>, b: B_1, f: (b: B_1, a: A_1) => Kind<G, R_1, O_1, E_1, B_1>): Kind<G, R_1, O_1, E_1, B_1>;
};
/**
 * @since 1.0.0
 */
export declare const coproductMapKind: <F extends TypeLambda>(F: Foldable<F>) => <G extends TypeLambda>(G: Coproduct<G>) => {
    <A, R, O, E, B>(f: (a: A) => Kind<G, R, O, E, B>): <FR, FO, FE>(self: Kind<F, FR, FO, FE, A>) => Kind<G, R, O, E, B>;
    <FR_1, FO_1, FE_1, A_1, R_1, O_1, E_1, B_1>(self: Kind<F, FR_1, FO_1, FE_1, A_1>, f: (a: A_1) => Kind<G, R_1, O_1, E_1, B_1>): Kind<G, R_1, O_1, E_1, B_1>;
};
//# sourceMappingURL=Foldable.d.ts.map