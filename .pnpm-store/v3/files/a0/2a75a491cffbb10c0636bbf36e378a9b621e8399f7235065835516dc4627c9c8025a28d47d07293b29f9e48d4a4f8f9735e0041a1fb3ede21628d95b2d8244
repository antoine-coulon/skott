import type { TypeLambda } from "@effect/data/HKT";
import * as contravariant from "@effect/data/typeclass/Contravariant";
import * as invariant from "@effect/data/typeclass/Invariant";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as product_ from "@effect/data/typeclass/Product";
import * as semigroup from "@effect/data/typeclass/Semigroup";
import type { Semigroup } from "@effect/data/typeclass/Semigroup";
import * as semiProduct from "@effect/data/typeclass/SemiProduct";
/**
 * @category models
 * @since 1.0.0
 */
export interface Predicate<A> {
    (a: A): boolean;
}
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface PredicateTypeLambda extends TypeLambda {
    readonly type: Predicate<this["Target"]>;
}
/**
 * @category models
 * @since 1.0.0
 */
export interface Refinement<A, B extends A> {
    (a: A): a is B;
}
/**
 * Given a `Predicate<A>` returns a `Predicate<B>`
 *
 * @param self - the `Predicate<A>` to be transformed to `Predicate<B>`.
 * @param f - a function to transform `B` to `A`.
 *
 * @example
 * import * as P from "@effect/data/Predicate"
 * import * as N from "@effect/data/Number"
 *
 * const minLength3 = P.contramap(N.greaterThan(2), (s: string) => s.length)
 *
 * assert.deepStrictEqual(minLength3("a"), false)
 * assert.deepStrictEqual(minLength3("aa"), false)
 * assert.deepStrictEqual(minLength3("aaa"), true)
 * assert.deepStrictEqual(minLength3("aaaa"), true)
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const contramap: {
    <B, A>(f: (b: B) => A): (self: Predicate<A>) => Predicate<B>;
    <A, B>(self: Predicate<A>, f: (b: B) => A): Predicate<B>;
};
/**
 * Tests if a value is a `string`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isString } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isString("a"), true)
 *
 * assert.deepStrictEqual(isString(1), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isString: (input: unknown) => input is string;
/**
 * Tests if a value is a `number`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isNumber } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isNumber(2), true)
 *
 * assert.deepStrictEqual(isNumber("2"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isNumber: (input: unknown) => input is number;
/**
 * Tests if a value is a `boolean`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isBoolean } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isBoolean(true), true)
 *
 * assert.deepStrictEqual(isBoolean("true"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isBoolean: (input: unknown) => input is boolean;
/**
 * Tests if a value is a `bigint`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isBigint } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isBigint(1n), true)
 *
 * assert.deepStrictEqual(isBigint(1), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isBigint: (input: unknown) => input is bigint;
/**
 * Tests if a value is a `symbol`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isSymbol } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isSymbol(Symbol.for("a")), true)
 *
 * assert.deepStrictEqual(isSymbol("a"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isSymbol: (input: unknown) => input is symbol;
/**
 * Tests if a value is a `function`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isFunction } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isFunction(isFunction), true)
 *
 * assert.deepStrictEqual(isFunction("function"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isFunction: (input: unknown) => input is Function;
/**
 * Tests if a value is `undefined`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isUndefined } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isUndefined(undefined), true)
 *
 * assert.deepStrictEqual(isUndefined(null), false)
 * assert.deepStrictEqual(isUndefined("undefined"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isUndefined: (input: unknown) => input is undefined;
/**
 * Tests if a value is not `undefined`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isNotUndefined } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isNotUndefined(null), true)
 * assert.deepStrictEqual(isNotUndefined("undefined"), true)
 *
 * assert.deepStrictEqual(isNotUndefined(undefined), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isNotUndefined: <A>(input: A) => input is Exclude<A, undefined>;
/**
 * Tests if a value is `undefined`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isNull } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isNull(null), true)
 *
 * assert.deepStrictEqual(isNull(undefined), false)
 * assert.deepStrictEqual(isNull("null"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isNull: (input: unknown) => input is null;
/**
 * Tests if a value is not `undefined`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isNotNull } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isNotNull(undefined), true)
 * assert.deepStrictEqual(isNotNull("null"), true)
 *
 * assert.deepStrictEqual(isNotNull(null), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isNotNull: <A>(input: A) => input is Exclude<A, null>;
/**
 * A guard that always fails.
 *
 * @param _ - The value to test.
 *
 * @example
 * import { isNever } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isNever(null), false)
 * assert.deepStrictEqual(isNever(undefined), false)
 * assert.deepStrictEqual(isNever({}), false)
 * assert.deepStrictEqual(isNever([]), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isNever: (input: unknown) => input is never;
/**
 * A guard that always succeeds.
 *
 * @param _ - The value to test.
 *
 * @example
 * import { isUnknown } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isUnknown(null), true)
 * assert.deepStrictEqual(isUnknown(undefined), true)
 *
 * assert.deepStrictEqual(isUnknown({}), true)
 * assert.deepStrictEqual(isUnknown([]), true)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isUnknown: (input: unknown) => input is unknown;
/**
 * Tests if a value is an `object`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isObject } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isObject({}), true)
 * assert.deepStrictEqual(isObject([]), true)
 *
 * assert.deepStrictEqual(isObject(null), false)
 * assert.deepStrictEqual(isObject(undefined), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isObject: (input: unknown) => input is object;
/**
 * A guard that succeeds when the input is `null` or `undefined`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isNullable } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isNullable(null), true)
 * assert.deepStrictEqual(isNullable(undefined), true)
 *
 * assert.deepStrictEqual(isNullable({}), false)
 * assert.deepStrictEqual(isNullable([]), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isNullable: <A>(input: A) => input is Extract<A, null | undefined>;
/**
 * A guard that succeeds when the input is not `null` or `undefined`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isNotNullable } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isNotNullable({}), true)
 * assert.deepStrictEqual(isNotNullable([]), true)
 *
 * assert.deepStrictEqual(isNotNullable(null), false)
 * assert.deepStrictEqual(isNotNullable(undefined), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isNotNullable: <A>(input: A) => input is NonNullable<A>;
/**
 * A guard that succeeds when the input is an `Error`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isError } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isError(new Error()), true)
 *
 * assert.deepStrictEqual(isError(null), false)
 * assert.deepStrictEqual(isError({}), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isError: (input: unknown) => input is Error;
/**
 * A guard that succeeds when the input is a `Date`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isDate } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isDate(new Date()), true)
 *
 * assert.deepStrictEqual(isDate(null), false)
 * assert.deepStrictEqual(isDate({}), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isDate: (input: unknown) => input is Date;
/**
 * A guard that succeeds when the input is a record.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isRecord } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isRecord({}), true)
 * assert.deepStrictEqual(isRecord({ a: 1 }), true)
 *
 * assert.deepStrictEqual(isRecord([]), false)
 * assert.deepStrictEqual(isRecord([1, 2, 3]), false)
 * assert.deepStrictEqual(isRecord(null), false)
 * assert.deepStrictEqual(isRecord(undefined), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isRecord: (input: unknown) => input is {
    [x: string]: unknown;
    [x: symbol]: unknown;
};
/**
 * A guard that succeeds when the input is a readonly record.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isReadonlyRecord } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isReadonlyRecord({}), true)
 * assert.deepStrictEqual(isReadonlyRecord({ a: 1 }), true)
 *
 * assert.deepStrictEqual(isReadonlyRecord([]), false)
 * assert.deepStrictEqual(isReadonlyRecord([1, 2, 3]), false)
 * assert.deepStrictEqual(isReadonlyRecord(null), false)
 * assert.deepStrictEqual(isReadonlyRecord(undefined), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isReadonlyRecord: (input: unknown) => input is {
    readonly [x: string | symbol]: unknown;
};
/**
 * @since 1.0.0
 */
export declare const compose: {
    <A, B extends A, C extends B>(bc: Refinement<B, C>): (ab: Refinement<A, B>) => Refinement<A, C>;
    <A, B extends A, C extends B>(ab: Refinement<A, B>, bc: Refinement<B, C>): Refinement<A, C>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Contravariant: contravariant.Contravariant<PredicateTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Invariant: invariant.Invariant<PredicateTypeLambda>;
/**
 * @since 1.0.0
 */
export declare const tupled: <A>(self: Predicate<A>) => Predicate<readonly [A]>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiProduct: semiProduct.SemiProduct<PredicateTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Product: product_.Product<PredicateTypeLambda>;
/**
 * This function appends a predicate to a tuple-like predicate, allowing you to create a new predicate that includes
 * the original elements and the new one.
 *
 * @param self - The tuple-like predicate to append to.
 * @param that - The predicate to append.
 *
 * @since 1.0.0
 */
export declare const appendElement: {
    <A extends ReadonlyArray<any>, B>(self: Predicate<A>, that: Predicate<B>): Predicate<readonly [...A, B]>;
    <B>(that: Predicate<B>): <A extends ReadonlyArray<any>>(self: Predicate<A>) => Predicate<readonly [...A, B]>;
};
/**
 * Similar to `Promise.all` but operates on `Predicate`s.
 *
 * ```
 * [Predicate<A>, Predicate<B>, ...] -> Predicate<[A, B, ...]>
 * ```
 *
 * @since 1.0.0
 */
export declare const tuple: <T extends ReadonlyArray<Predicate<any>>>(...predicates: T) => Predicate<Readonly<{
    [I in keyof T]: [T[I]] extends [Predicate<infer A>] ? A : never;
}>>;
/**
 * @since 1.0.0
 */
export declare const struct: <R extends Record<string, Predicate<any>>>(predicates: R) => Predicate<{
    readonly [K in keyof R]: [R[K]] extends [Predicate<infer A>] ? A : never;
}>;
/**
 * Negates the result of a given predicate.
 *
 * @param self - A predicate.
 *
 * @example
 * import * as P from "@effect/data/Predicate"
 * import * as N from "@effect/data/Number"
 *
 * const isPositive = P.not(N.lessThan(0))
 *
 * assert.deepStrictEqual(isPositive(-1), false)
 * assert.deepStrictEqual(isPositive(0), true)
 * assert.deepStrictEqual(isPositive(1), true)
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const not: <A>(self: Predicate<A>) => Predicate<A>;
/**
 * Combines two predicates into a new predicate that returns `true` if at least one of the predicates returns `true`.
 *
 * @param self - A predicate.
 * @param that - A predicate.
 *
 * @example
 * import * as P from "@effect/data/Predicate"
 * import * as N from "@effect/data/Number"
 *
 * const nonZero = P.or(N.lessThan(0), N.greaterThan(0))
 *
 * assert.deepStrictEqual(nonZero(-1), true)
 * assert.deepStrictEqual(nonZero(0), false)
 * assert.deepStrictEqual(nonZero(1), true)
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const or: {
    <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
    <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
};
/**
 * Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.
 *
 * @param self - A predicate.
 * @param that - A predicate.
 *
 * @example
 * import * as P from "@effect/data/Predicate"
 *
 * const minLength = (n: number) => (s: string) => s.length >= n
 * const maxLength = (n: number) => (s: string) => s.length <= n
 *
 * const length = (n: number) => P.and(minLength(n), maxLength(n))
 *
 * assert.deepStrictEqual(length(2)("aa"), true)
 * assert.deepStrictEqual(length(2)("a"), false)
 * assert.deepStrictEqual(length(2)("aaa"), false)
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const and: {
    <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
    <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
};
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const xor: {
    <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
    <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
};
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const eqv: {
    <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
    <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
};
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const implies: {
    <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
    <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
};
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const nor: {
    <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
    <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
};
/**
 * @category combinators
 * @since 1.0.0
 */
export declare const nand: {
    <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>;
    <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getSemigroupEqv: <A>() => semigroup.Semigroup<Predicate<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getMonoidEqv: <A>() => monoid.Monoid<Predicate<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getSemigroupXor: <A>() => semigroup.Semigroup<Predicate<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getMonoidXor: <A>() => monoid.Monoid<Predicate<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getSemigroupSome: <A>() => semigroup.Semigroup<Predicate<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getMonoidSome: <A>() => monoid.Monoid<Predicate<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getSemigroupEvery: <A>() => semigroup.Semigroup<Predicate<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getMonoidEvery: <A>() => monoid.Monoid<Predicate<A>>;
/**
 * @since 1.0.0
 */
export declare const every: <A>(collection: Iterable<Predicate<A>>) => Predicate<A>;
/**
 * @since 1.0.0
 */
export declare const some: <A>(collection: Iterable<Predicate<A>>) => Predicate<A>;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bindTo: {
    <N extends string>(name: N): <A>(self: Predicate<A>) => Predicate<{
        readonly [K in N]: A;
    }>;
    <A, N extends string>(self: Predicate<A>, name: N): Predicate<{
        readonly [K in N]: A;
    }>;
};
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const Do: Predicate<{}>;
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export declare const andThenBind: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, that: Predicate<B>): (self: Predicate<A>) => Predicate<{
        readonly [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: Predicate<A>, name: Exclude<N, keyof A>, that: Predicate<B>): Predicate<{
        readonly [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
//# sourceMappingURL=Predicate.d.ts.map