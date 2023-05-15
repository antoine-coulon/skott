/**
 * @since 1.0.0
 */
import type * as Data from "@effect/data/Data";
import type { LazyArg } from "@effect/data/Function";
import * as Gen from "@effect/data/Gen";
import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Option } from "@effect/data/Option";
import type { Predicate, Refinement } from "@effect/data/Predicate";
import * as applicative from "@effect/data/typeclass/Applicative";
import * as bicovariant from "@effect/data/typeclass/Bicovariant";
import * as chainable from "@effect/data/typeclass/Chainable";
import * as covariant from "@effect/data/typeclass/Covariant";
import type { Equivalence } from "@effect/data/typeclass/Equivalence";
import * as flatMap_ from "@effect/data/typeclass/FlatMap";
import * as foldable from "@effect/data/typeclass/Foldable";
import * as invariant from "@effect/data/typeclass/Invariant";
import type * as monad from "@effect/data/typeclass/Monad";
import type { Monoid } from "@effect/data/typeclass/Monoid";
import type * as pointed from "@effect/data/typeclass/Pointed";
import * as product_ from "@effect/data/typeclass/Product";
import type * as semiAlternative from "@effect/data/typeclass/SemiAlternative";
import * as semiApplicative from "@effect/data/typeclass/SemiApplicative";
import * as semiCoproduct from "@effect/data/typeclass/SemiCoproduct";
import type { Semigroup } from "@effect/data/typeclass/Semigroup";
import * as semiProduct from "@effect/data/typeclass/SemiProduct";
import * as traversable from "@effect/data/typeclass/Traversable";
/**
 * @category models
 * @since 1.0.0
 */
export type Either<E, A> = Left<E> | Right<A>;
/**
 * @category models
 * @since 1.0.0
 */
export interface Left<E> extends Data.Case {
    readonly _tag: "Left";
    readonly left: E;
}
/**
 * @category models
 * @since 1.0.0
 */
export interface Right<A> extends Data.Case {
    readonly _tag: "Right";
    readonly right: A;
}
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface EitherTypeLambda extends TypeLambda {
    readonly type: Either<this["Out1"], this["Target"]>;
}
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const right: <A>(a: A) => Either<never, A>;
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const left: <E>(e: E) => Either<E, never>;
/**
 * Tests if a value is a `Either`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isEither, left, right } from '@effect/data/Either'
 *
 * assert.deepStrictEqual(isEither(right(1)), true)
 * assert.deepStrictEqual(isEither(left("error")), true)
 * assert.deepStrictEqual(isEither({ right: 1 }), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isEither: (input: unknown) => input is Either<unknown, unknown>;
/**
 * Determine if a `Either` is a `Left`.
 *
 * @param self - The `Either` to check.
 *
 * @example
 * import { isLeft, left, right } from '@effect/data/Either'
 *
 * assert.deepStrictEqual(isLeft(right(1)), false)
 * assert.deepStrictEqual(isLeft(left("error")), true)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isLeft: <E, A>(self: Either<E, A>) => self is Left<E>;
/**
 * Determine if a `Either` is a `Right`.
 *
 * @param self - The `Either` to check.
 *
 * @example
 * import { isRight, left, right } from '@effect/data/Either'
 *
 * assert.deepStrictEqual(isRight(right(1)), true)
 * assert.deepStrictEqual(isRight(left("error")), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isRight: <E, A>(self: Either<E, A>) => self is Right<A>;
/**
 * Returns a `Refinement` from a `Either` returning function.
 * This function ensures that a `Refinement` definition is type-safe.
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const toRefinement: <A, E, B extends A>(f: (a: A) => Either<E, B>) => Refinement<A, B>;
/**
 * @category conversions
 * @since 1.0.0
 */
export declare const fromIterable: {
    <E>(onEmpty: LazyArg<E>): <A>(collection: Iterable<A>) => Either<E, A>;
    <A, E>(collection: Iterable<A>, onEmpty: LazyArg<E>): Either<E, A>;
};
/**
 * Converts a `Either` to an `Option` discarding the error.
 *
 * @param self - The `Either` to convert to an `Option`.
 *
 * @example
 * import * as O from '@effect/data/Option'
 * import * as E from '@effect/data/Either'
 *
 * assert.deepStrictEqual(E.toOption(E.right(1)), O.some(1))
 * assert.deepStrictEqual(E.toOption(E.left('a')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const toOption: <E, A>(self: Either<E, A>) => Option<A>;
/**
 * Converts a `Either` to an `Option` discarding the error.
 *
 * Alias of {@link toOption}.
 *
 * @example
 * import * as O from '@effect/data/Option'
 * import * as E from '@effect/data/Either'
 *
 * assert.deepStrictEqual(E.getRight(E.right('ok')), O.some('ok'))
 * assert.deepStrictEqual(E.getRight(E.left('err')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const getRight: <E, A>(self: Either<E, A>) => Option<A>;
/**
 * Converts a `Either` to an `Option` discarding the value.
 *
 * @example
 * import * as O from '@effect/data/Option'
 * import * as E from '@effect/data/Either'
 *
 * assert.deepStrictEqual(E.getLeft(E.right('ok')), O.none())
 * assert.deepStrictEqual(E.getLeft(E.left('err')), O.some('err'))
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const getLeft: <E, A>(self: Either<E, A>) => Option<E>;
/**
 * @example
 * import * as E from '@effect/data/Either'
 * import * as O from '@effect/data/Option'
 *
 * assert.deepStrictEqual(E.fromOption(O.some(1), () => 'error'), E.right(1))
 * assert.deepStrictEqual(E.fromOption(O.none(), () => 'error'), E.left('error'))
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const fromOption: {
    <A, E>(fa: Option<A>, onNone: () => E): Either<E, A>;
    <E>(onNone: () => E): <A>(fa: Option<A>) => Either<E, A>;
};
/**
 * @category equivalence
 * @since 1.0.0
 */
export declare const getEquivalence: <E, A>(EE: Equivalence<E>, EA: Equivalence<A>) => Equivalence<Either<E, A>>;
/**
 * @category mapping
 * @since 1.0.0
 */
export declare const bimap: {
    <E1, E2, A, B>(f: (e: E1) => E2, g: (a: A) => B): (self: Either<E1, A>) => Either<E2, B>;
    <E1, A, E2, B>(self: Either<E1, A>, f: (e: E1) => E2, g: (a: A) => B): Either<E2, B>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Bicovariant: bicovariant.Bicovariant<EitherTypeLambda>;
/**
 * Maps the `Left` side of an `Either` value to a new `Either` value.
 *
 * @param self - The input `Either` value to map.
 * @param f - A transformation function to apply to the `Left` value of the input `Either`.
 *
 * @category error handling
 * @since 1.0.0
 */
export declare const mapLeft: {
    <E, G>(f: (e: E) => G): <A>(self: Either<E, A>) => Either<G, A>;
    <E, A, G>(self: Either<E, A>, f: (e: E) => G): Either<G, A>;
};
/**
 * Maps the `Right` side of an `Either` value to a new `Either` value.
 *
 * @param self - An `Either` to map
 * @param f - The function to map over the value of the `Either`
 *
 * @category mapping
 * @since 1.0.0
 */
export declare const map: {
    <A, B>(f: (a: A) => B): <E>(self: Either<E, A>) => Either<E, B>;
    <E, A, B>(self: Either<E, A>, f: (a: A) => B): Either<E, B>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Covariant: covariant.Covariant<EitherTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Invariant: invariant.Invariant<EitherTypeLambda>;
/**
 * @category mapping
 * @since 1.0.0
 */
export declare const flap: {
    <A, E, B>(a: A, self: Either<E, (a: A) => B>): Either<E, B>;
    <E, A, B>(self: Either<E, (a: A) => B>): (a: A) => Either<E, B>;
};
/**
 * Maps the `Right` value of this `Either` to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export declare const as: {
    <E, _, B>(self: Either<E, _>, b: B): Either<E, B>;
    <B>(b: B): <E, _>(self: Either<E, _>) => Either<E, B>;
};
/**
 * Maps the `Right` value of this `Either` to the `void` constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export declare const asUnit: <E, _>(self: Either<E, _>) => Either<E, void>;
/**
 * @since 1.0.0
 */
export declare const unit: Either<never, void>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Pointed: pointed.Pointed<EitherTypeLambda>;
/**
 * @category combining
 * @since 1.0.0
 */
export declare const flatMap: {
    <A, E2, B>(f: (a: A) => Either<E2, B>): <E1>(self: Either<E1, A>) => Either<E1 | E2, B>;
    <E1, A, E2, B>(self: Either<E1, A>, f: (a: A) => Either<E2, B>): Either<E1 | E2, B>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const FlatMap: flatMap_.FlatMap<EitherTypeLambda>;
/**
 * @since 1.0.0
 */
export declare const flatten: <E1, E2, A>(self: Either<E1, Either<E2, A>>) => Either<E1 | E2, A>;
/**
 * @since 1.0.0
 */
export declare const andThen: {
    <E1, _, E2, B>(self: Either<E1, _>, that: Either<E2, B>): Either<E1 | E2, B>;
    <E2, B>(that: Either<E2, B>): <E1, _>(self: Either<E1, _>) => Either<E2 | E1, B>;
};
/**
 * @since 1.0.0
 */
export declare const composeK: {
    <A, E1, B, E2, C>(afb: (a: A) => Either<E1, B>, bfc: (b: B) => Either<E2, C>): (a: A) => Either<E1 | E2, C>;
    <B, E2, C>(bfc: (b: B) => Either<E2, C>): <A, E1>(afb: (a: A) => Either<E1, B>) => (a: A) => Either<E2 | E1, C>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Chainable: chainable.Chainable<EitherTypeLambda>;
/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combining
 * @since 1.0.0
 */
export declare const andThenDiscard: {
    <E1, A, E2, _>(self: Either<E1, A>, that: Either<E2, _>): Either<E1 | E2, A>;
    <E2, _>(that: Either<E2, _>): <E1, A>(self: Either<E1, A>) => Either<E2 | E1, A>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Monad: monad.Monad<EitherTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiProduct: semiProduct.SemiProduct<EitherTypeLambda>;
/**
 * Similar to `Promise.all` but operates on `Either`s.
 *
 * ```
 * Iterable<Either<E, A>> -> Either<E, A[]>
 * ```
 *
 * Flattens a collection of `Either`s into a single `Either` that contains a list of all the `Right` values.
 * If there is a `Left` value in the collection, it returns the first `Left` found as the result.
 *
 * @param collection - An iterable collection of `Either`s to flatten.
 *
 * @example
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(E.all([E.right(1), E.right(2), E.right(3)]), E.right([1, 2, 3]))
 * assert.deepStrictEqual(E.all([E.right(1), E.left("error"), E.right(3)]), E.left("error"))
 *
 * @category combining
 * @since 1.0.0
 */
export declare const all: <E, A>(collection: Iterable<Either<E, A>>) => Either<E, A[]>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Product: product_.Product<EitherTypeLambda>;
/**
 * Similar to `Promise.all` but operates on `Either`s.
 *
 * ```
 * [Either<E1, A>, Either<E1, B>, ...] -> Either<E1 \| E2 \| ..., [A, B, ...]>
 * ```
 *
 * @since 1.0.0
 */
export declare const tuple: <T extends ReadonlyArray<Either<any, any>>>(...elements: T) => Either<[
    T[number]
] extends [Either<infer E, any>] ? E : never, {
    [I in keyof T]: [T[I]] extends [Either<any, infer A>] ? A : never;
}>;
/**
 * @since 1.0.0
 */
export declare const struct: <R extends Record<string, Either<any, any>>>(fields: R) => Either<[
    R[keyof R]
] extends [Either<infer E, any>] ? E : never, {
    [K in keyof R]: [R[K]] extends [Either<any, infer A>] ? A : never;
}>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiApplicative: semiApplicative.SemiApplicative<EitherTypeLambda>;
/**
 * Lifts a binary function into `Either`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => {
    <E1, E2>(self: Either<E1, A>, that: Either<E2, B>): Either<E1 | E2, C>;
    <E2>(that: Either<E2, B>): <E1>(self: Either<E1, A>) => Either<E2 | E1, C>;
};
/**
 * @category combining
 * @since 1.0.0
 */
export declare const zipWith: {
    <E1, A, E2, B, C>(self: Either<E1, A>, that: Either<E2, B>, f: (a: A, b: B) => C): Either<E1 | E2, C>;
    <E2, B, A, C>(that: Either<E2, B>, f: (a: A, b: B) => C): <E1>(self: Either<E1, A>) => Either<E2 | E1, C>;
};
/**
 * @since 1.0.0
 */
export declare const ap: {
    <E1, A, B, E2>(self: Either<E1, (a: A) => B>, that: Either<E2, A>): Either<E1 | E2, B>;
    <E2, A>(that: Either<E2, A>): <E1, B>(self: Either<E1, (a: A) => B>) => Either<E2 | E1, B>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Applicative: applicative.Applicative<EitherTypeLambda>;
/**
 * `Semigroup` returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are combined using the provided `Semigroup`.
 *
 * ```
 * | self       | that       | combine(self, that)     |
 * | ---------- | ---------- | ----------------------- |
 * | left(e1)   | left(e2)   | left(e1)                |
 * | left(e1)   | right(a2)  | left(e1)                |
 * | right(a1)  | left(e2)   | left(e2)                |
 * | right(a1)  | right(a2)  | right(combine(a1, a2))  |
 * ```
 *
 * @category combining
 * @since 1.0.0
 */
export declare const getFirstLeftSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Either<E, A>>;
/**
 * `Monoid` returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are combined using the provided `Monoid`.
 *
 * - `combine` is provided by {@link getFirstLeftSemigroup}.
 * - `empty` is `right(M.empty)`
 *
 * @category combining
 * @since 1.0.0
 */
export declare const getFirstLeftMonoid: <A, E>(M: Monoid<A>) => Monoid<Either<E, A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiCoproduct: semiCoproduct.SemiCoproduct<EitherTypeLambda>;
/**
 * @category error handling
 * @since 1.0.0
 */
export declare const firstRightOf: {
    <E, A>(collection: Iterable<Either<E, A>>): (self: Either<E, A>) => Either<E, A>;
    <E, A>(self: Either<E, A>, collection: Iterable<Either<E, A>>): Either<E, A>;
};
/**
 * Semigroup returning the left-most `Right` value.
 *
 * ```
 * | self       | that       | combine(self, that) |
 * | ---------- | ---------- | ------------------- |
 * | left(e1)   | left(e2)   | left(e2)            |
 * | left(e1)   | right(a2)  | right(a2)           |
 * | right(a1)  | left(e2)   | right(a1)           |
 * | right(a1)  | right(a2)  | right(a1)           |
 * ```
 *
 * @category combining
 * @since 1.0.0
 */
export declare const getFirstRightSemigroup: <E, A>() => Semigroup<Either<E, A>>;
/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import * as E from '@effect/data/Either'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(
 *   E.getOrElse(E.right(1), () => 0),
 *   1
 * )
 * assert.deepStrictEqual(
 *   E.getOrElse(E.left('error'), () => 0),
 *   0
 * )
 *
 * @category getters
 * @since 1.0.0
 */
export declare const getOrElse: {
    <E, B>(onLeft: (e: E) => B): <A>(self: Either<E, A>) => B | A;
    <E, A, B>(self: Either<E, A>, onLeft: (e: E) => B): A | B;
};
/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export declare const orElse: {
    <E1, E2, B>(that: (e1: E1) => Either<E2, B>): <A>(self: Either<E1, A>) => Either<E2, A | B>;
    <E1, A, E2, B>(self: Either<E1, A>, that: (e1: E1) => Either<E2, B>): Either<E2, A | B>;
};
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export declare const orElseEither: {
    <E1, E2, B>(that: (e1: E1) => Either<E2, B>): <A>(self: Either<E1, A>) => Either<E2, Either<A, B>>;
    <E1, A, E2, B>(self: Either<E1, A>, that: (e1: E1) => Either<E2, B>): Either<E2, Either<A, B>>;
};
/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * fails with the specified error.
 *
 * @category error handling
 * @since 1.0.0
 */
export declare const orElseFail: {
    <E2>(onLeft: LazyArg<E2>): <E1, A>(self: Either<E1, A>) => Either<E2, A>;
    <E1, A, E2>(self: Either<E1, A>, onLeft: LazyArg<E2>): Either<E2, A>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiAlternative: semiAlternative.SemiAlternative<EitherTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Foldable: foldable.Foldable<EitherTypeLambda>;
/**
 * Transforms an `Either` into an `Array`.
 * If the input is `Left`, an empty array is returned.
 * If the input is `Right`, the value is wrapped in an array.
 *
 * @param self - The `Either` to convert to an array.
 *
 * @example
 * import { right, left, toArray } from '@effect/data/Either'
 *
 * assert.deepStrictEqual(toArray(right(1)), [1])
 * assert.deepStrictEqual(toArray(left("error")), [])
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const toArray: <E, A>(self: Either<E, A>) => Array<A>;
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import * as E from '@effect/data/Either'
 * import { pipe } from '@effect/data/Function'
 *
 * const onLeft  = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`
 *
 * const onRight = (value: number): string => `Ok: ${value}`
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.match(onLeft , onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left(['error 1', 'error 2']),
 *     E.match(onLeft , onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category pattern matching
 * @since 1.0.0
 */
export declare const match: {
    <E, B, A, C = B>(onLeft: (e: E) => B, onRight: (a: A) => C): (self: Either<E, A>) => B | C;
    <E, A, B, C = B>(self: Either<E, A>, onLeft: (e: E) => B, onRight: (a: A) => C): B | C;
};
/**
 * Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import * as E from '@effect/data/Either'
 *
 * const parse = E.fromNullable(() => 'nullable')
 *
 * assert.deepStrictEqual(parse(1), E.right(1))
 * assert.deepStrictEqual(parse(null), E.left('nullable'))
 *
 * @category interop
 * @since 1.0.0
 */
export declare const fromNullable: {
    <A, E>(onNullable: (a: A) => E): (a: A) => Either<E, NonNullable<A>>;
    <A, E>(a: A, onNullable: (a: A) => E): Either<E, NonNullable<A>>;
};
/**
 * @category interop
 * @since 1.0.0
 */
export declare const liftNullable: <A extends readonly unknown[], B, E>(f: (...a: A) => B | null | undefined, onNullable: (...a: A) => E) => (...a: A) => Either<E, NonNullable<B>>;
/**
 * @category interop
 * @since 1.0.0
 */
export declare const merge: <E, A>(self: Either<E, A>) => E | A;
/**
 * @category combining
 * @since 1.0.0
 */
export declare const flatMapNullable: {
    <A, B, E2>(f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): <E1>(self: Either<E1, A>) => Either<E1 | E2, NonNullable<B>>;
    <E1, A, B, E2>(self: Either<E1, A>, f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): Either<E1 | E2, NonNullable<B>>;
};
/**
 * Extracts the value of an `Either` or throws if the `Either` is `Left`.
 *
 * If a default error is sufficient for your use case and you don't need to configure the thrown error, see {@link getOrThrow}.
 *
 * @param self - The `Either` to extract the value from.
 * @param onLeft - A function that will be called if the `Either` is `Left`. It returns the error to be thrown.
 *
 * @example
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(
 *   E.getOrThrowWith(E.right(1), () => new Error('Unexpected Left')),
 *   1
 * )
 * assert.throws(() => E.getOrThrowWith(E.left("error"), () => new Error('Unexpected Left')))
 *
 * @category interop
 * @since 1.0.0
 */
export declare const getOrThrowWith: {
    <E>(onLeft: (e: E) => unknown): <A>(self: Either<E, A>) => A;
    <E, A>(self: Either<E, A>, onLeft: (e: E) => unknown): A;
};
/**
 * Extracts the value of an `Either` or throws if the `Either` is `Left`.
 *
 * The thrown error is a default error. To configure the error thrown, see  {@link getOrThrowWith}.
 *
 * @param self - The `Either` to extract the value from.
 * @throws `Error("getOrThrow called on a Left")`
 *
 * @example
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(E.getOrThrow(E.right(1)), 1)
 * assert.throws(() => E.getOrThrow(E.left("error")))
 *
 * @category interop
 * @since 1.0.0
 */
export declare const getOrThrow: <E, A>(self: Either<E, A>) => A;
/**
 * Lifts a function that may throw to one returning a `Either`.
 *
 * @category interop
 * @since 1.0.0
 */
export declare const liftThrowable: <A extends readonly unknown[], B, E>(f: (...a: A) => B, onThrow: (error: unknown) => E) => (...a: A) => Either<E, B>;
/**
 * @since 1.0.0
 */
export declare const reverse: <E, A>(self: Either<E, A>) => Either<A, E>;
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const filter: {
    <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E2>): <E1>(self: Either<E1, C>) => Either<E1 | E2, B>;
    <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: LazyArg<E2>): <E1>(self: Either<E1, B>) => Either<E1 | E2, B>;
    <E1, C extends A, B extends A, E2, A = C>(self: Either<E1, C>, refinement: Refinement<A, B>, onFalse: LazyArg<E2>): Either<E1 | E2, B>;
    <E1, B extends A, E2, A = B>(self: Either<E1, B>, predicate: Predicate<A>, onFalse: LazyArg<E2>): Either<E1 | E2, B>;
};
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const filterMap: {
    <A, B, E2>(f: (a: A) => Option<B>, onNone: LazyArg<E2>): <E1>(self: Either<E1, A>) => Either<E1 | E2, B>;
    <E1, A, B, E2>(self: Either<E1, A>, f: (a: A) => Option<B>, onNone: LazyArg<E2>): Either<E1 | E2, B>;
};
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const compact: {
    <E2>(onNone: LazyArg<E2>): <E1, A>(self: Either<E1, Option<A>>) => Either<E1 | E2, A>;
    <E1, A, E2>(self: Either<E1, Option<A>>, onNone: LazyArg<E2>): Either<E1 | E2, A>;
};
/**
 * @category traversing
 * @since 1.0.0
 */
export declare const traverse: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TE>(self: Either<TE, A>) => Kind<F, R, O, E, Either<TE, B>>;
    <TE_1, A_1, R_1, O_1, E_1, B_1>(self: Either<TE_1, A_1>, f: (a: A_1) => Kind<F, R_1, O_1, E_1, B_1>): Kind<F, R_1, O_1, E_1, Either<TE_1, B_1>>;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Traversable: traversable.Traversable<EitherTypeLambda>;
/**
 * @category traversing
 * @since 1.0.0
 */
export declare const sequence: <F extends TypeLambda>(F: applicative.Applicative<F>) => <TE, R, O, E, A>(self: Either<TE, Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Either<TE, A>>;
/**
 * @category traversing
 * @since 1.0.0
 */
export declare const traverseTap: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <TE, A, R, O, E, B>(self: Either<TE, A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Either<TE, A>>;
    <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TE>(self: Either<TE, A>) => Kind<F, R, O, E, Either<TE, A>>;
};
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 1.0.0
 */
export declare const tap: {
    <E1, A, E2, _>(self: Either<E1, A>, f: (a: A) => Either<E2, _>): Either<E1 | E2, A>;
    <A, E2, _>(f: (a: A) => Either<E2, _>): <E1>(self: Either<E1, A>) => Either<E2 | E1, A>;
};
/**
 * @category debugging
 * @since 1.0.0
 */
export declare const inspectRight: {
    <A>(onRight: (a: A) => void): <E>(self: Either<E, A>) => Either<E, A>;
    <E, A>(self: Either<E, A>, onRight: (a: A) => void): Either<E, A>;
};
/**
 * @category debugging
 * @since 1.0.0
 */
export declare const inspectLeft: {
    <E>(onLeft: (e: E) => void): <A>(self: Either<E, A>) => Either<E, A>;
    <E, A>(self: Either<E, A>, onLeft: (e: E) => void): Either<E, A>;
};
/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export declare const tapError: {
    <E1, E2, _>(onLeft: (e: E1) => Either<E2, _>): <A>(self: Either<E1, A>) => Either<E1 | E2, A>;
    <E1, A, E2, _>(self: Either<E1, A>, onLeft: (e: E1) => Either<E2, _>): Either<E1 | E2, A>;
};
/**
 * @category getters
 * @since 1.0.0
 */
export declare const getOrNull: <E, A>(self: Either<E, A>) => A | null;
/**
 * @category getters
 * @since 1.0.0
 */
export declare const getOrUndefined: <E, A>(self: Either<E, A>) => A | undefined;
/**
 * @example
 * import { liftPredicate, left, right } from '@effect/data/Either'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     liftPredicate((n) => n > 0, () => 'error')
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     liftPredicate((n) => n > 0, () => 'error')
 *   ),
 *   left('error')
 * )
 *
 * @category lifting
 * @since 1.0.0
 */
export declare const liftPredicate: {
    <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => Either<E, B>;
    <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => Either<E, B>;
};
/**
 * @category lifting
 * @since 1.0.0
 */
export declare const liftOption: <A extends readonly unknown[], B, E>(f: (...a: A) => Option<B>, onNone: (...a: A) => E) => (...a: A) => Either<E, B>;
/**
 * @category combining
 * @since 1.0.0
 */
export declare const flatMapOption: {
    <A, B, E2>(f: (a: A) => Option<B>, onNone: (a: A) => E2): <E1>(self: Either<E1, A>) => Either<E1 | E2, B>;
    <E1, A, B, E2>(self: Either<E1, A>, f: (a: A) => Option<B>, onNone: (a: A) => E2): Either<E1 | E2, B>;
};
/**
 * Returns a function that checks if an `Either` contains a given value using a provided `equivalence` function.
 *
 * @since 1.0.0
 */
export declare const contains: <A>(isEquivalent: (self: A, that: A) => boolean) => {
    (a: A): <E>(self: Either<E, A>) => boolean;
    <E_1>(self: Either<E_1, A>, a: A): boolean;
};
/**
 * Returns `false` if `Left` or returns the Either of the application of the given predicate to the `Right` value.
 *
 * @example
 * import * as E from '@effect/data/Either'
 *
 * const f = E.exists((n: number) => n > 2)
 *
 * assert.deepStrictEqual(f(E.left('a')), false)
 * assert.deepStrictEqual(f(E.right(1)), false)
 * assert.deepStrictEqual(f(E.right(3)), true)
 *
 * @since 1.0.0
 */
export declare const exists: {
    <A>(predicate: Predicate<A>): <E>(self: Either<E, A>) => boolean;
    <E, A>(self: Either<E, A>, predicate: Predicate<A>): boolean;
};
/**
 * Semigroup that models the combination of values that may be absent, elements that are `Left` are ignored
 * while elements that are `Right` are combined using the provided `Semigroup`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const getOptionalSemigroup: <E, A>(S: Semigroup<A>) => Semigroup<Either<E, A>>;
/**
 * @category math
 * @since 1.0.0
 */
export declare const sum: {
    <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>;
    <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>;
};
/**
 * @category math
 * @since 1.0.0
 */
export declare const multiply: {
    <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>;
    <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>;
};
/**
 * @category math
 * @since 1.0.0
 */
export declare const subtract: {
    <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>;
    <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>;
};
/**
 * @category math
 * @since 1.0.0
 */
export declare const divide: {
    <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>;
    <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>;
};
/**
 * Return all the `Right` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const rights: <E, A>(self: Iterable<Either<E, A>>) => A[];
/**
 * Return all the `Left` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export declare const lefts: <E, A>(self: Iterable<Either<E, A>>) => E[];
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const tupled: <E, A>(self: Either<E, A>) => Either<E, [A]>;
/**
 * Appends an element to the end of a tuple.
 *
 * @category do notation
 * @since 1.0.0
 */
export declare const appendElement: {
    <E1, A extends ReadonlyArray<any>, E2, B>(self: Either<E1, A>, that: Either<E2, B>): Either<E1 | E2, [...A, B]>;
    <E2, B>(that: Either<E2, B>): <E1, A extends ReadonlyArray<any>>(self: Either<E1, A>) => Either<E2 | E1, [...A, B]>;
};
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bindTo: {
    <N extends string>(name: N): <E, A>(self: Either<E, A>) => Either<E, {
        [K in N]: A;
    }>;
    <E, A, N extends string>(self: Either<E, A>, name: N): Either<E, {
        [K in N]: A;
    }>;
};
declare const let_: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): <E>(self: Either<E, A>) => Either<E, {
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <E, A extends object, N extends string, B>(self: Either<E, A>, name: Exclude<N, keyof A>, f: (a: A) => B): Either<E, {
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
export { 
/**
 * @category do notation
 * @since 1.0.0
 */
let_ as let };
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const Do: Either<never, {}>;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bind: {
    <N extends string, A extends object, E2, B>(name: Exclude<N, keyof A>, f: (a: A) => Either<E2, B>): <E1>(self: Either<E1, A>) => Either<E2 | E1, {
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <E1, A extends object, N extends string, E2, B>(self: Either<E1, A>, name: Exclude<N, keyof A>, f: (a: A) => Either<E2, B>): Either<E1 | E2, {
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
/**
 * Extends the `Either` value with the value of another `Either` type.
 *
 * If both `Either` instances are `Left`, then the result will be the first `Left`.
 *
 * @param self - The original `Either` value.
 * @param name - The name of the property that will be added to the original `Either` type.
 * @param that - The `Either` value that will be added to the original `Either` type.
 *
 * @example
 * import * as E from '@effect/data/Either'
 * import { pipe } from '@effect/data/Function'
 *
 * const result = pipe(
 *   E.Do,
 *   E.bind("a", () => E.left("e1")),
 *   E.andThenBind("b", E.left("e2"))
 * )
 *
 * assert.deepStrictEqual(result, E.left("e1"))
 *
 * @category do notation
 * @since 1.0.0
 */
export declare const andThenBind: {
    <N extends string, A extends object, E2, B>(name: Exclude<N, keyof A>, that: Either<E2, B>): <E1>(self: Either<E1, A>) => Either<E2 | E1, {
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <E1, A extends object, N extends string, E2, B>(self: Either<E1, A>, name: Exclude<N, keyof A>, that: Either<E2, B>): Either<E1 | E2, {
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
/**
 * The `gen` API is a helper function that provides a generator interface for the `Either` monad instance.
 * It can be used to easily create complex `Either` computations in a readable and concise manner.
 *
 * @example
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(
 *   E.gen(function*($) {
 *     const a = yield* $(E.right(1))
 *     const b = yield* $(E.right(2))
 *     return a + b
 *   }),
 *   E.right(3)
 * )
 *
 * @since 1.0.0
 * @category generators
 */
export declare const gen: Gen.Gen<EitherTypeLambda, Gen.Adapter<EitherTypeLambda>>;
//# sourceMappingURL=Either.d.ts.map