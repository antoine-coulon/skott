/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * @since 1.0.0
 */
import type { Either } from "@effect/data/Either";
import type { Kind, TypeClass, TypeLambda } from "@effect/data/HKT";
import type { Option } from "@effect/data/Option";
import type { Covariant } from "@effect/data/typeclass/Covariant";
/**
 * @category models
 * @since 1.0.0
 */
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
    readonly partitionMap: {
        <A, B, C>(f: (a: A) => Either<B, C>): <R, O, E>(self: Kind<F, R, O, E, A>) => [Kind<F, R, O, E, B>, Kind<F, R, O, E, C>];
        <R, O, E, A, B, C>(self: Kind<F, R, O, E, A>, f: (a: A) => Either<B, C>): [Kind<F, R, O, E, B>, Kind<F, R, O, E, C>];
    };
    readonly filterMap: {
        <A, B>(f: (a: A) => Option<B>): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>;
        <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => Option<B>): Kind<F, R, O, E, B>;
    };
}
/**
 * Returns a default binary `partitionMap` composition.
 *
 * @since 1.0.0
 */
export declare const partitionMapComposition: <F extends TypeLambda, G extends TypeLambda>(F: Covariant<F>, G: Filterable<G>) => <FR, FO, FE, GR, GO, GE, A, B, C>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>, f: (a: A) => Either<B, C>) => [Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>, Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, C>>];
/**
 * Returns a default binary `filterMap` composition.
 *
 * @since 1.0.0
 */
export declare const filterMapComposition: <F extends TypeLambda, G extends TypeLambda>(F: Covariant<F>, G: Filterable<G>) => <FR, FO, FE, GR, GO, GE, A, B>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>, f: (a: A) => Option<B>) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>;
/**
 * @since 1.0.0
 */
export declare const compact: <F extends TypeLambda>(F: Filterable<F>) => <R, O, E, A>(self: Kind<F, R, O, E, Option<A>>) => Kind<F, R, O, E, A>;
/**
 * @since 1.0.0
 */
export declare const separate: <F extends TypeLambda>(F: Filterable<F>) => <R, O, E, A, B>(self: Kind<F, R, O, E, Either<A, B>>) => [Kind<F, R, O, E, A>, Kind<F, R, O, E, B>];
/**
 * @since 1.0.0
 */
export declare const filter: <F extends TypeLambda>(F: Filterable<F>) => {
    <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): <R, O, E>(self: Kind<F, R, O, E, C>) => Kind<F, R, O, E, B>;
    <B extends A, A = B>(predicate: (a: A) => boolean): <R, O, E>(self: Kind<F, R, O, E, B>) => Kind<F, R, O, E, B>;
    <R, O, E, C extends A, B extends A, A = C>(self: Kind<F, R, O, E, C>, refinement: (a: A) => a is B): Kind<F, R, O, E, B>;
    <R, O, E, B extends A, A = B>(self: Kind<F, R, O, E, B>, predicate: (a: A) => boolean): Kind<F, R, O, E, B>;
};
/**
 * @since 1.0.0
 */
export declare const partition: <F extends TypeLambda>(F: Filterable<F>) => {
    <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): <R, O, E>(self: Kind<F, R, O, E, C>) => [Kind<F, R, O, E, C>, Kind<F, R, O, E, B>];
    <B_1 extends A_1, A_1 = B_1>(predicate: (a: A_1) => boolean): <R_1, O_1, E_1>(self: Kind<F, R_1, O_1, E_1, B_1>) => [Kind<F, R_1, O_1, E_1, B_1>, Kind<F, R_1, O_1, E_1, B_1>];
    <R_2, O_2, E_2, C_1 extends A_2, B_2 extends A_2, A_2 = C_1>(self: Kind<F, R_2, O_2, E_2, C_1>, refinement: (a: A_2) => a is B_2): [Kind<F, R_2, O_2, E_2, C_1>, Kind<F, R_2, O_2, E_2, B_2>];
    <R_3, O_3, E_3, B_3 extends A_3, A_3 = B_3>(self: Kind<F, R_3, O_3, E_3, B_3>, predicate: (a: A_3) => boolean): [Kind<F, R_3, O_3, E_3, B_3>, Kind<F, R_3, O_3, E_3, B_3>];
};
//# sourceMappingURL=Filterable.d.ts.map