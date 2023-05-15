import type { TypeLambda } from "@effect/data/HKT";
import type * as invariant from "@effect/data/typeclass/Invariant";
import type { Order } from "@effect/data/typeclass/Order";
import * as product_ from "@effect/data/typeclass/Product";
import type * as semiProduct from "@effect/data/typeclass/SemiProduct";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Semigroup<A> {
    readonly combine: (self: A, that: A) => A;
    readonly combineMany: (self: A, collection: Iterable<A>) => A;
}
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface SemigroupTypeLambda extends TypeLambda {
    readonly type: Semigroup<this["Target"]>;
}
/**
 * @param combineMany - Useful when `combineMany` can be optimised
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const make: <A>(combine: (self: A, that: A) => A, combineMany?: (self: A, collection: Iterable<A>) => A) => Semigroup<A>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const string: Semigroup<string>;
/**
 * `number` semigroup under addition.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const numberSum: Semigroup<number>;
/**
 * `number` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const numberMultiply: Semigroup<number>;
/**
 * `bigint` semigroup under addition.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const bigintSum: Semigroup<bigint>;
/**
 * `bigint` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const bigintMultiply: Semigroup<bigint>;
/**
 * `boolean` semigroup under conjunction.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const booleanEvery: Semigroup<boolean>;
/**
 * `boolean` semigroup under disjunction.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const booleanSome: Semigroup<boolean>;
/**
 * `boolean` semigroup under exclusive disjunction.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const booleanXor: Semigroup<boolean>;
/**
 * `boolean` semigroup under equivalence.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const booleanEqv: Semigroup<boolean>;
/**
 * `Semigroup` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const min: <A>(O: Order<A>) => Semigroup<A>;
/**
 * `Semigroup` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const max: <A>(O: Order<A>) => Semigroup<A>;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const constant: <A>(a: A) => Semigroup<A>;
/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 1.0.0
 */
export declare const reverse: <A>(S: Semigroup<A>) => Semigroup<A>;
/**
 * @since 1.0.0
 */
export declare const intercalate: {
    <A>(separator: A): (S: Semigroup<A>) => Semigroup<A>;
    <A>(S: Semigroup<A>, separator: A): Semigroup<A>;
};
/**
 * Always return the first argument.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const first: <A = never>() => Semigroup<A>;
/**
 * Always return the last argument.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const last: <A = never>() => Semigroup<A>;
/**
 * @since 1.0.0
 */
export declare const imap: {
    <A, B>(to: (a: A) => B, from: (b: B) => A): (self: Semigroup<A>) => Semigroup<B>;
    <A, B>(self: Semigroup<A>, to: (a: A) => B, from: (b: B) => A): Semigroup<B>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Invariant: invariant.Invariant<SemigroupTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiProduct: semiProduct.SemiProduct<SemigroupTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Product: product_.Product<SemigroupTypeLambda>;
/**
 * Similar to `Promise.all` but operates on `Semigroup`s.
 *
 * ```
 * [Semigroup<A>, Semigroup<B>, ...] -> Semigroup<[A, B, ...]>
 * ```
 *
 * This function creates and returns a new `Semigroup` for a tuple of values based on the given `Semigroup`s for each element in the tuple.
 * The returned `Semigroup` combines two tuples of the same type by applying the corresponding `Semigroup` passed as arguments to each element in the tuple.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const tuple: <T extends ReadonlyArray<Semigroup<any>>>(...elements: T) => Semigroup<{
    readonly [I in keyof T]: [T[I]] extends [Semigroup<infer A>] ? A : never;
}>;
/**
 * Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.
 * The returned `Semigroup` combines two arrays by concatenating them.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const array: <A>() => Semigroup<readonly A[]>;
/**
 * This function creates and returns a new `Semigroup` for a struct of values based on the given `Semigroup`s for each property in the struct.
 * The returned `Semigroup` combines two structs of the same type by applying the corresponding `Semigroup` passed as arguments to each property in the struct.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const struct: <R extends {
    readonly [x: string]: Semigroup<any>;
}>(fields: R) => Semigroup<{
    readonly [K in keyof R]: [R[K]] extends [Semigroup<infer A>] ? A : never;
}>;
//# sourceMappingURL=Semigroup.d.ts.map