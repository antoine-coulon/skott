import type { Kind, TypeClass, TypeLambda } from "@effect/data/HKT";
/**
 * @category type class
 * @since 1.0.0
 */
export interface FlatMap<F extends TypeLambda> extends TypeClass<F> {
    readonly flatMap: {
        <A, R2, O2, E2, B>(f: (a: A) => Kind<F, R2, O2, E2, B>): <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B>;
        <R1, O1, E1, A, R2, O2, E2, B>(self: Kind<F, R1, O1, E1, A>, f: (a: A) => Kind<F, R2, O2, E2, B>): Kind<F, R1 & R2, O1 | O2, E1 | E2, B>;
    };
}
/**
 * @since 1.0.0
 */
export declare const flatten: <F extends TypeLambda>(F: FlatMap<F>) => <R2, O2, E2, R1, O1, E1, A>(self: Kind<F, R2, O2, E2, Kind<F, R1, O1, E1, A>>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, A>;
/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @since 1.0.0
 */
export declare const andThen: <F extends TypeLambda>(F: FlatMap<F>) => {
    <R2, O2, E2, B>(that: Kind<F, R2, O2, E2, B>): <R1, O1, E1, _>(self: Kind<F, R1, O1, E1, _>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, B>;
    <R1_1, O1_1, E1_1, __1, R2_1, O2_1, E2_1, B_1>(self: Kind<F, R1_1, O1_1, E1_1, __1>, that: Kind<F, R2_1, O2_1, E2_1, B_1>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, B_1>;
};
/**
 * @since 1.0.0
 */
export declare const composeK: <F extends TypeLambda>(F: FlatMap<F>) => {
    <B, R2, O2, E2, C>(bfc: (b: B) => Kind<F, R2, O2, E2, C>): <A, R1, O1, E1>(afb: (a: A) => Kind<F, R1, O1, E1, B>) => (a: A) => Kind<F, R1 & R2, O2 | O1, E2 | E1, C>;
    <A_1, R1_1, O1_1, E1_1, B_1, R2_1, O2_1, E2_1, C_1>(afb: (a: A_1) => Kind<F, R1_1, O1_1, E1_1, B_1>, bfc: (b: B_1) => Kind<F, R2_1, O2_1, E2_1, C_1>): (a: A_1) => Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, C_1>;
};
//# sourceMappingURL=FlatMap.d.ts.map