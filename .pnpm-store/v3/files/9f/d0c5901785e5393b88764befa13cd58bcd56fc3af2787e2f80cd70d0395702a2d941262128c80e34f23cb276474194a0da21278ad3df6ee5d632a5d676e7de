/**
 * @since 1.0.0
 */
import type { Bounded } from "@effect/data/typeclass/Bounded";
import type { Semigroup } from "@effect/data/typeclass/Semigroup";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Monoid<A> extends Semigroup<A> {
    readonly empty: A;
    readonly combineAll: (collection: Iterable<A>) => A;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const fromSemigroup: <A>(S: Semigroup<A>, empty: A) => Monoid<A>;
/**
 * Get a monoid where `combine` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `maxBound` value.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const min: <A>(B: Bounded<A>) => Monoid<A>;
/**
 * Get a monoid where `combine` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `minimum` value.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const max: <A>(B: Bounded<A>) => Monoid<A>;
/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `combine`.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const reverse: <A>(M: Monoid<A>) => Monoid<A>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const string: Monoid<string>;
/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const numberSum: Monoid<number>;
/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const numberMultiply: Monoid<number>;
/**
 * `number` monoid under addition.
 *
 * The `bigint` value is `0n`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const bigintSum: Monoid<bigint>;
/**
 * `bigint` monoid under multiplication.
 *
 * The `empty` value is `1n`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const bigintMultiply: Monoid<bigint>;
/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const booleanEvery: Monoid<boolean>;
/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const booleanSome: Monoid<boolean>;
/**
 * `boolean` monoid under exclusive disjunction.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const booleanXor: Monoid<boolean>;
/**
 * `boolean` monoid under equivalence.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const booleanEqv: Monoid<boolean>;
/**
 * Similar to `Promise.all` but operates on `Monoid`s.
 *
 * ```
 * [Monoid<A>, Monoid<B>, ...] -> Monoid<[A, B, ...]>
 * ```
 *
 * This function creates and returns a new `Monoid` for a tuple of values based on the given `Monoid`s for each element in the tuple.
 * The returned `Monoid` combines two tuples of the same type by applying the corresponding `Monoid` passed as arguments to each element in the tuple.
 *
 * The `empty` value of the returned `Monoid` is the tuple of `empty` values of the input `Monoid`s.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const tuple: <T extends readonly Monoid<any>[]>(...elements: T) => Monoid<{ readonly [I in keyof T]: [T[I]] extends [Monoid<infer A>] ? A : never; }>;
/**
 * Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.
 *
 * The `empty` value is the empty array.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const array: <A>() => Monoid<readonly A[]>;
/**
 * This function creates and returns a new `Monoid` for a struct of values based on the given `Monoid`s for each property in the struct.
 * The returned `Monoid` combines two structs of the same type by applying the corresponding `Monoid` passed as arguments to each property in the struct.
 *
 * The `empty` value of the returned `Monoid` is a struct where each property is the `empty` value of the corresponding `Monoid` in the input `monoids` object.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const struct: <R extends {
    readonly [x: string]: Monoid<any>;
}>(fields: R) => Monoid<{ readonly [K in keyof R]: [R[K]] extends [Monoid<infer A>] ? A : never; }>;
//# sourceMappingURL=Monoid.d.ts.map