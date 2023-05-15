/**
 * `TraversableFilterable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
 *
 * @since 1.0.0
 */
import type { Either } from "@effect/data/Either";
import type { Kind, TypeClass, TypeLambda } from "@effect/data/HKT";
import type { Option } from "@effect/data/Option";
import type { TraversableFilterable } from "@effect/data/ReadonlyArray";
import type { Applicative } from "@effect/data/typeclass/Applicative";
import type { Covariant } from "@effect/data/typeclass/Covariant";
import * as filterable from "@effect/data/typeclass/Filterable";
import type { Filterable } from "@effect/data/typeclass/Filterable";
import type { Traversable } from "@effect/data/typeclass/Traversable";
/**
 * @category models
 * @since 1.0.0
 */
export interface TraversableFilterable<T extends TypeLambda> extends TypeClass<T> {
    readonly traversePartitionMap: <F extends TypeLambda>(F: Applicative<F>) => {
        <A, R, O, E, B, C>(f: (a: A) => Kind<F, R, O, E, Either<B, C>>): <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, [Kind<T, TR, TO, TE, B>, Kind<T, TR, TO, TE, C>]>;
        <TR, TO, TE, A, R, O, E, B, C>(self: Kind<T, TR, TO, TE, A>, f: (a: A) => Kind<F, R, O, E, Either<B, C>>): Kind<F, R, O, E, [Kind<T, TR, TO, TE, B>, Kind<T, TR, TO, TE, C>]>;
    };
    readonly traverseFilterMap: <F extends TypeLambda>(F: Applicative<F>) => {
        <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, Option<B>>): <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>;
        <TR, TO, TE, A, R, O, E, B>(self: Kind<T, TR, TO, TE, A>, f: (a: A) => Kind<F, R, O, E, Option<B>>): Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>;
    };
}
/**
 * Returns a default binary `traversePartitionMap` implementation.
 *
 * @since 1.0.0
 */
export declare const traversePartitionMap: <T extends TypeLambda>(T: Traversable<T> & Covariant<T> & filterable.Filterable<T>) => <F extends TypeLambda>(F: Applicative<F>) => <TR, TO, TE, A, R, O, E, B, C>(self: Kind<T, TR, TO, TE, A>, f: (a: A) => Kind<F, R, O, E, Either<B, C>>) => Kind<F, R, O, E, [Kind<T, TR, TO, TE, B>, Kind<T, TR, TO, TE, C>]>;
/**
 * Returns a default binary `traverseFilterMap` implementation.
 *
 * @since 1.0.0
 */
export declare const traverseFilterMap: <T extends TypeLambda>(T: Traversable<T> & filterable.Filterable<T>) => <F extends TypeLambda>(F: Applicative<F>) => <TR, TO, TE, A, R, O, E, B>(self: Kind<T, TR, TO, TE, A>, f: (a: A) => Kind<F, R, O, E, Option<B>>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>;
/**
 * @since 1.0.0
 */
export declare const traverseFilter: <T extends TypeLambda>(T: TraversableFilterable<T>) => <F extends TypeLambda>(F: Applicative<F>) => {
    <B extends A, R, O, E, A = B>(predicate: (a: A) => Kind<F, R, O, E, boolean>): <TR, TO, TE>(self: Kind<T, TR, TO, TE, B>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>;
    <TR_1, TO_1, TE_1, B_1 extends A_1, R_1, O_1, E_1, A_1 = B_1>(self: Kind<T, TR_1, TO_1, TE_1, B_1>, predicate: (a: A_1) => Kind<F, R_1, O_1, E_1, boolean>): Kind<F, R_1, O_1, E_1, Kind<T, TR_1, TO_1, TE_1, B_1>>;
};
/**
 * @since 1.0.0
 */
export declare const traversePartition: <T extends TypeLambda>(T: TraversableFilterable<T>) => <F extends TypeLambda>(F: Applicative<F>) => {
    <B extends A, R, O, E, A = B>(predicate: (a: A) => Kind<F, R, O, E, boolean>): <TR, TO, TE>(self: Kind<T, TR, TO, TE, B>) => Kind<F, R, O, E, [Kind<T, TR, TO, TE, B>, Kind<T, TR, TO, TE, B>]>;
    <TR_1, TO_1, TE_1, B_1 extends A_1, R_1, O_1, E_1, A_1 = B_1>(self: Kind<T, TR_1, TO_1, TE_1, B_1>, predicate: (a: A_1) => Kind<F, R_1, O_1, E_1, boolean>): Kind<F, R_1, O_1, E_1, [Kind<T, TR_1, TO_1, TE_1, B_1>, Kind<T, TR_1, TO_1, TE_1, B_1>]>;
};
//# sourceMappingURL=TraversableFilterable.d.ts.map