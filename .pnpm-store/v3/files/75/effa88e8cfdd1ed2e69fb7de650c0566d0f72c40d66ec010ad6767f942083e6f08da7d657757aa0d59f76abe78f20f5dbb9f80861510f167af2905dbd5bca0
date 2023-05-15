/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Of } from "@effect/data/typeclass/Of";
import type { SemiProduct } from "@effect/data/typeclass/SemiProduct";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Product<F extends TypeLambda> extends SemiProduct<F>, Of<F> {
    readonly productAll: <R, O, E, A>(collection: Iterable<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Array<A>>;
}
/**
 * @since 1.0.0
 */
export declare const tuple: <F extends TypeLambda>(F: Product<F>) => <T extends readonly Kind<F, any, any, any, any>[]>(...elements: T) => Kind<F, [T[number]] extends [Kind<F, infer R, any, any, any>] ? R : never, [T[number]] extends [Kind<F, any, infer O, any, any>] ? O : never, [T[number]] extends [Kind<F, any, any, infer E, any>] ? E : never, { [I in keyof T]: [T[I]] extends [Kind<F, any, any, any, infer A>] ? A : never; }>;
/**
 * @since 1.0.0
 */
export declare const struct: <F extends TypeLambda>(F: Product<F>) => <R extends {
    readonly [x: string]: Kind<F, any, any, any, any>;
}>(fields: R) => Kind<F, [R[keyof R]] extends [Kind<F, infer R_1, any, any, any>] ? R_1 : never, [R[keyof R]] extends [Kind<F, any, infer O, any, any>] ? O : never, [R[keyof R]] extends [Kind<F, any, any, infer E, any>] ? E : never, { [K in keyof R]: [R[K]] extends [Kind<F, any, any, any, infer A>] ? A : never; }>;
//# sourceMappingURL=Product.d.ts.map