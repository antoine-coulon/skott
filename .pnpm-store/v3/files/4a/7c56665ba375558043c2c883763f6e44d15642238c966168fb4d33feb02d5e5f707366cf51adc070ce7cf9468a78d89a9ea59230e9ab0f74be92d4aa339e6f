import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Covariant } from "@effect/data/typeclass/Covariant";
import type { Invariant } from "@effect/data/typeclass/Invariant";
import type { SemiApplicative } from "@effect/data/typeclass/SemiApplicative";
/**
 * @category type class
 * @since 1.0.0
 */
export interface SemiProduct<F extends TypeLambda> extends Invariant<F> {
    readonly product: <R1, O1, E1, A, R2, O2, E2, B>(self: Kind<F, R1, O1, E1, A>, that: Kind<F, R2, O2, E2, B>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, [A, B]>;
    readonly productMany: <R, O, E, A>(self: Kind<F, R, O, E, A>, collection: Iterable<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, [A, ...Array<A>]>;
}
/**
 * Returns a default `productMany` implementation.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const productMany: <F extends TypeLambda>(map: {
    <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>;
    <R_1, O_1, E_1, A_1, B_1>(self: Kind<F, R_1, O_1, E_1, A_1>, f: (a: A_1) => B_1): Kind<F, R_1, O_1, E_1, B_1>;
}, product: <R1, O1, E1, A_2, R2, O2, E2, B_2>(self: Kind<F, R1, O1, E1, A_2>, that: Kind<F, R2, O2, E2, B_2>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, [A_2, B_2]>) => <R_2, O_2, E_2, A_3>(self: Kind<F, R_2, O_2, E_2, A_3>, collection: Iterable<Kind<F, R_2, O_2, E_2, A_3>>) => Kind<F, R_2, O_2, E_2, [A_3, ...A_3[]]>;
/**
 * Returns a default `product` composition.
 *
 * @since 1.0.0
 */
export declare const productComposition: <F extends TypeLambda, G extends TypeLambda>(F: SemiApplicative<F>, G: SemiProduct<G>) => <FR1, FO1, FE1, GR1, GO1, GE1, A, FR2, FO2, FE2, GR2, GO2, GE2, B>(self: Kind<F, FR1, FO1, FE1, Kind<G, GR1, GO1, GE1, A>>, that: Kind<F, FR2, FO2, FE2, Kind<G, GR2, GO2, GE2, B>>) => Kind<F, FR1 & FR2, FO1 | FO2, FE1 | FE2, Kind<G, GR1 & GR2, GO1 | GO2, GE1 | GE2, [A, B]>>;
/**
 * Returns a default `productMany` composition.
 *
 * @since 1.0.0
 */
export declare const productManyComposition: <F extends TypeLambda, G extends TypeLambda>(F: SemiApplicative<F>, G: SemiProduct<G>) => <FR, FO, FE, GR, GO, GE, A>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>, collection: Iterable<Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>>) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, [A, ...A[]]>>;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const andThenBind: <F extends TypeLambda>(F: SemiProduct<F>) => {
    <N extends string, A extends object, R2, O2, E2, B>(name: Exclude<N, keyof A>, that: Kind<F, R2, O2, E2, B>): <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>;
    <R1_1, O1_1, E1_1, A_1 extends object, N_1 extends string, R2_1, O2_1, E2_1, B_1>(self: Kind<F, R1_1, O1_1, E1_1, A_1>, name: Exclude<N_1, keyof A_1>, that: Kind<F, R2_1, O2_1, E2_1, B_1>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, { [K_1 in N_1 | keyof A_1]: K_1 extends keyof A_1 ? A_1[K_1] : B_1; }>;
};
/**
 * Appends an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export declare const appendElement: <F extends TypeLambda>(F: SemiProduct<F>) => {
    <R2, O2, E2, B>(that: Kind<F, R2, O2, E2, B>): <R1, O1, E1, A extends readonly any[]>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, [...A, B]>;
    <R1_1, O1_1, E1_1, A_1 extends readonly any[], R2_1, O2_1, E2_1, B_1>(self: Kind<F, R1_1, O1_1, E1_1, A_1>, that: Kind<F, R2_1, O2_1, E2_1, B_1>): Kind<F, R1_1 & R2_1, O1_1 | O2_1, E1_1 | E2_1, [...A_1, B_1]>;
};
/**
 * @since 1.0.0
 */
export declare const nonEmptyTuple: <F extends TypeLambda>(F: SemiProduct<F>) => <T extends readonly [Kind<F, any, any, any, any>, ...Kind<F, any, any, any, any>[]]>(...elements: T) => Kind<F, [T[number]] extends [Kind<F, infer R, any, any, any>] ? R : never, [T[number]] extends [Kind<F, any, infer O, any, any>] ? O : never, [T[number]] extends [Kind<F, any, any, infer E, any>] ? E : never, { [I in keyof T]: [T[I]] extends [Kind<F, any, any, any, infer A>] ? A : never; }>;
type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R;
/**
 * @since 1.0.0
 */
export declare const nonEmptyStruct: <F extends TypeLambda>(F: SemiProduct<F>) => <R extends {
    readonly [x: string]: Kind<F, any, any, any, any>;
}>(fields: EnforceNonEmptyRecord<R> & {
    readonly [x: string]: Kind<F, any, any, any, any>;
}) => Kind<F, [R[keyof R]] extends [Kind<F, infer R_1, any, any, any>] ? R_1 : never, [R[keyof R]] extends [Kind<F, any, infer O, any, any>] ? O : never, [R[keyof R]] extends [Kind<F, any, any, infer E, any>] ? E : never, { [K in keyof R]: [R[K]] extends [Kind<F, any, any, any, infer A>] ? A : never; }>;
export {};
//# sourceMappingURL=SemiProduct.d.ts.map