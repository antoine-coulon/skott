import type { Kind, TypeClass, TypeLambda } from "@effect/data/HKT";
import type { Applicative } from "@effect/data/typeclass/Applicative";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Traversable<T extends TypeLambda> extends TypeClass<T> {
    readonly traverse: <F extends TypeLambda>(F: Applicative<F>) => {
        <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>;
        <TR, TO, TE, A, R, O, E, B>(self: Kind<T, TR, TO, TE, A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>;
    };
}
/**
 * Returns a default binary `traverse` composition.
 *
 * @since 1.0.0
 */
export declare const traverseComposition: <T extends TypeLambda, G extends TypeLambda>(T: Traversable<T>, G: Traversable<G>) => <F extends TypeLambda>(F: Applicative<F>) => <TR, TO, TE, GR, GO, GE, A, R, O, E, B>(self: Kind<T, TR, TO, TE, Kind<G, GR, GO, GE, A>>, f: (a: A) => Kind<F, R, O, E, B>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, Kind<G, GR, GO, GE, B>>>;
/**
 * Returns a default `sequence` implementation.
 *
 * @since 1.0.0
 */
export declare const sequence: <T extends TypeLambda>(T: Traversable<T>) => <F extends TypeLambda>(F: Applicative<F>) => <TR, TO, TE, R, O, E, A>(self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>;
/**
 * Given a function which returns a `F` effect, thread this effect
 * through the running of this function on all the values in `T`,
 * returning an `T<A>` in a `F` context, ignoring the values
 * returned by the provided function.
 *
 * @since 1.0.0
 */
export declare const traverseTap: <T extends TypeLambda>(T: Traversable<T>) => <F extends TypeLambda>(F: Applicative<F>) => {
    <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>;
    <TR_1, TO_1, TE_1, A_1, R_1, O_1, E_1, B_1>(self: Kind<T, TR_1, TO_1, TE_1, A_1>, f: (a: A_1) => Kind<F, R_1, O_1, E_1, B_1>): Kind<F, R_1, O_1, E_1, Kind<T, TR_1, TO_1, TE_1, A_1>>;
};
//# sourceMappingURL=Traversable.d.ts.map