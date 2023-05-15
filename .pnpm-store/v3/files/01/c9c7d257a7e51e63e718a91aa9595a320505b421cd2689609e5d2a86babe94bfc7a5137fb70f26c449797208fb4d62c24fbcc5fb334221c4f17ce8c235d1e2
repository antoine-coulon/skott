import type { TypeLambda } from "@effect/data/HKT";
import * as contravariant from "@effect/data/typeclass/Contravariant";
import type * as invariant from "@effect/data/typeclass/Invariant";
import type { Monoid } from "@effect/data/typeclass/Monoid";
import * as product_ from "@effect/data/typeclass/Product";
import type { Semigroup } from "@effect/data/typeclass/Semigroup";
import type * as semiProduct from "@effect/data/typeclass/SemiProduct";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Order<A> {
    readonly compare: (self: A, that: A) => -1 | 0 | 1;
}
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface OrderTypeLambda extends TypeLambda {
    readonly type: Order<this["Target"]>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const make: <A>(compare: (self: A, that: A) => -1 | 0 | 1) => Order<A>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const string: Order<string>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const number: Order<number>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const boolean: Order<boolean>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const bigint: Order<bigint>;
/**
 * @since 1.0.0
 */
export declare const reverse: <A>(O: Order<A>) => Order<A>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getSemigroup: <A>() => Semigroup<Order<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getMonoid: <A>() => Monoid<Order<A>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const contramap: {
    <B, A>(f: (b: B) => A): (self: Order<A>) => Order<B>;
    <A, B>(self: Order<A>, f: (b: B) => A): Order<B>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Contravariant: contravariant.Contravariant<OrderTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Invariant: invariant.Invariant<OrderTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiProduct: semiProduct.SemiProduct<OrderTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Product: product_.Product<OrderTypeLambda>;
/**
 * Similar to `Promise.all` but operates on `Order`s.
 *
 * ```
 * [Order<A>, Order<B>, ...] -> Order<[A, B, ...]>
 * ```
 *
 * This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
 * The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
 * It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
 * of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const tuple: <T extends ReadonlyArray<Order<any>>>(...elements: T) => Order<{
    [I in keyof T]: [T[I]] extends [Order<infer A>] ? A : never;
}>;
/**
 * This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
 * The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
 * If all elements are equal, the arrays are then compared based on their length.
 * It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const array: <A>(O: Order<A>) => Order<readonly A[]>;
/**
 * This function creates and returns a new `Order` for a struct of values based on the given `Order`s
 * for each property in the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const struct: <R extends {
    readonly [x: string]: Order<any>;
}>(fields: R) => Order<{
    [K in keyof R]: [R[K]] extends [Order<infer A>] ? A : never;
}>;
/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 1.0.0
 */
export declare const lessThan: <A>(O: Order<A>) => {
    (that: A): (self: A) => boolean;
    (self: A, that: A): boolean;
};
/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 1.0.0
 */
export declare const greaterThan: <A>(O: Order<A>) => {
    (that: A): (self: A) => boolean;
    (self: A, that: A): boolean;
};
/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 1.0.0
 */
export declare const lessThanOrEqualTo: <A>(O: Order<A>) => {
    (that: A): (self: A) => boolean;
    (self: A, that: A): boolean;
};
/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 1.0.0
 */
export declare const greaterThanOrEqualTo: <A>(O: Order<A>) => {
    (that: A): (self: A) => boolean;
    (self: A, that: A): boolean;
};
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export declare const min: <A>(O: Order<A>) => {
    (that: A): (self: A) => A;
    (self: A, that: A): A;
};
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export declare const max: <A>(O: Order<A>) => {
    (that: A): (self: A) => A;
    (self: A, that: A): A;
};
/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 1.0.0
 */
export declare const clamp: <A>(O: Order<A>) => {
    (minimum: A, maximum: A): (self: A) => A;
    (self: A, minimum: A, maximum: A): A;
};
/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 1.0.0
 */
export declare const between: <A>(O: Order<A>) => {
    (minimum: A, maximum: A): (self: A) => boolean;
    (self: A, minimum: A, maximum: A): boolean;
};
//# sourceMappingURL=Order.d.ts.map