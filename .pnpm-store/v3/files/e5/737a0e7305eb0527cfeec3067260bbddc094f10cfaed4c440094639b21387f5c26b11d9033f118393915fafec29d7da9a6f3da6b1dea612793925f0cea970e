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
export interface Equivalence<A> {
    (self: A, that: A): boolean;
}
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface EquivalenceTypeLambda extends TypeLambda {
    readonly type: Equivalence<this["Target"]>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const make: <A>(isEquivalent: (self: A, that: A) => boolean) => Equivalence<A>;
/**
 * Return an `Equivalence` that uses strict equality (===) to compare values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const strict: <A>() => Equivalence<A>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const string: Equivalence<string>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const number: Equivalence<number>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const boolean: Equivalence<boolean>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const bigint: Equivalence<bigint>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const symbol: Equivalence<symbol>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getSemigroup: <A>() => Semigroup<Equivalence<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getMonoid: <A>() => Monoid<Equivalence<A>>;
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const contramap: {
    <B, A>(f: (b: B) => A): (self: Equivalence<A>) => Equivalence<B>;
    <A, B>(self: Equivalence<A>, f: (b: B) => A): Equivalence<B>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Contravariant: contravariant.Contravariant<EquivalenceTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Invariant: invariant.Invariant<EquivalenceTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiProduct: semiProduct.SemiProduct<EquivalenceTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Product: product_.Product<EquivalenceTypeLambda>;
/**
 * Similar to `Promise.all` but operates on `Equivalence`s.
 *
 * ```
 * [Equivalence<A>, Equivalence<B>, ...] -> Equivalence<[A, B, ...]>
 * ```
 *
 * Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
 * by applying each `Equivalence` to the corresponding element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const tuple: <T extends ReadonlyArray<Equivalence<any>>>(...predicates: T) => Equivalence<Readonly<{
    [I in keyof T]: [T[I]] extends [Equivalence<infer A>] ? A : never;
}>>;
/**
 * Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
 * by applying each `Equivalence` to the corresponding property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const struct: <R extends Record<string, Equivalence<any>>>(predicates: R) => Equivalence<{
    readonly [K in keyof R]: [R[K]] extends [Equivalence<infer A>] ? A : never;
}>;
//# sourceMappingURL=Equivalence.d.ts.map