/**
 * @since 1.0.0
 */
import type * as Data from "@effect/data/Data";
import type { Either } from "@effect/data/Either";
import type { LazyArg } from "@effect/data/Function";
import * as Gen from "@effect/data/Gen";
import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Predicate, Refinement } from "@effect/data/Predicate";
import type * as alternative from "@effect/data/typeclass/Alternative";
import * as applicative from "@effect/data/typeclass/Applicative";
import * as chainable from "@effect/data/typeclass/Chainable";
import type * as coproduct_ from "@effect/data/typeclass/Coproduct";
import * as covariant from "@effect/data/typeclass/Covariant";
import type { Equivalence } from "@effect/data/typeclass/Equivalence";
import * as filterable from "@effect/data/typeclass/Filterable";
import * as flatMap_ from "@effect/data/typeclass/FlatMap";
import * as foldable from "@effect/data/typeclass/Foldable";
import * as invariant from "@effect/data/typeclass/Invariant";
import type * as monad from "@effect/data/typeclass/Monad";
import type { Monoid } from "@effect/data/typeclass/Monoid";
import type { Order } from "@effect/data/typeclass/Order";
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
export type Option<A> = None | Some<A>;
/**
 * @category models
 * @since 1.0.0
 */
export interface None extends Data.Case {
    readonly _tag: "None";
}
/**
 * @category models
 * @since 1.0.0
 */
export interface Some<A> extends Data.Case {
    readonly _tag: "Some";
    readonly value: A;
}
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface OptionTypeLambda extends TypeLambda {
    readonly type: Option<this["Target"]>;
}
/**
 * Creates a new `Option` that represents the absence of a value.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const none: <A = never>() => Option<A>;
/**
 * Creates a new `Option` that wraps the given value.
 *
 * @param value - The value to wrap.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const some: <A>(value: A) => Option<A>;
/**
 * Tests if a value is a `Option`.
 *
 * @param input - The value to check.
 *
 * @example
 * import { some, none, isOption } from '@effect/data/Option'
 *
 * assert.deepStrictEqual(isOption(some(1)), true)
 * assert.deepStrictEqual(isOption(none()), true)
 * assert.deepStrictEqual(isOption({}), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isOption: (input: unknown) => input is Option<unknown>;
/**
 * Determine if a `Option` is a `None`.
 *
 * @param self - The `Option` to check.
 *
 * @example
 * import { some, none, isNone } from '@effect/data/Option'
 *
 * assert.deepStrictEqual(isNone(some(1)), false)
 * assert.deepStrictEqual(isNone(none()), true)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isNone: <A>(self: Option<A>) => self is None;
/**
 * Determine if a `Option` is a `Some`.
 *
 * @param self - The `Option` to check.
 *
 * @example
 * import { some, none, isSome } from '@effect/data/Option'
 *
 * assert.deepStrictEqual(isSome(some(1)), true)
 * assert.deepStrictEqual(isSome(none()), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isSome: <A>(self: Option<A>) => self is Some<A>;
/**
 * Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
 * function when passed the `Option`'s value.
 *
 * @param self - The `Option` to match
 * @param onNone - The value to be returned if the `Option` is `None`
 * @param onSome - The function to be called if the `Option` is `Some`, it will be passed the `Option`'s value and its result will be returned
 *
 * @example
 * import { some, none, match } from '@effect/data/Option'
 * import { pipe } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     none(),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category pattern matching
 * @since 1.0.0
 */
export declare const match: {
    <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C): (self: Option<A>) => B | C;
    <A, B, C = B>(self: Option<A>, onNone: LazyArg<B>, onSome: (a: A) => C): B | C;
};
/**
 * Returns a type guard from a `Option` returning function.
 * This function ensures that a type guard definition is type-safe.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * const parsePositive = (n: number): O.Option<number> =>
 *   n > 0 ? O.some(n) : O.none()
 *
 * const isPositive = O.toRefinement(parsePositive)
 *
 * assert.deepStrictEqual(isPositive(1), true)
 * assert.deepStrictEqual(isPositive(-1), false)
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const toRefinement: <A, B extends A>(f: (a: A) => Option<B>) => (a: A) => a is B;
/**
 * Converts an `Iterable` of values into an `Option`. Returns the first value of the `Iterable` wrapped in a `Some`
 * if the `Iterable` is not empty, otherwise returns `None`.
 *
 * @param collection - The `Iterable` to be converted to an `Option`.
 *
 * @example
 * import { fromIterable, some, none } from '@effect/data/Option'
 *
 * assert.deepStrictEqual(fromIterable([1, 2, 3]), some(1))
 * assert.deepStrictEqual(fromIterable([]), none())
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const fromIterable: <A>(collection: Iterable<A>) => Option<A>;
/**
 * Converts a `Either` to an `Option` discarding the error.
 *
 * @param self - The `Either` to convert to an `Option`.
 *
 * @example
 * import * as O from "@effect/data/Option"
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(O.fromEither(E.right(1)), O.some(1))
 * assert.deepStrictEqual(O.fromEither(E.left('error message')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const fromEither: <E, A>(self: Either<E, A>) => Option<A>;
/**
 * Converts a `Either` to an `Option` discarding the error.
 *
 * Alias of {@link fromEither}.
 *
 * @example
 * import * as O from "@effect/data/Option"
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(O.getRight(E.right('ok')), O.some('ok'))
 * assert.deepStrictEqual(O.getRight(E.left('err')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const getRight: <E, A>(self: Either<E, A>) => Option<A>;
/**
 * Converts a `Either` to an `Option` discarding the value.
 *
 * @example
 * import * as O from "@effect/data/Option"
 * import * as E from "@effect/data/Either"
 *
 * assert.deepStrictEqual(O.getLeft(E.right("ok")), O.none())
 * assert.deepStrictEqual(O.getLeft(E.left("error")), O.some("error"))
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const getLeft: <E, A>(self: Either<E, A>) => Option<E>;
/**
 * Converts an `Option` to an `Either`, allowing you to provide a value to be used in the case of a `None`.
 *
 * @param self - the `Option` to convert.
 * @param onNone - a function that produces an error value when the `Option` is `None`.
 *
 * @example
 * import { pipe } from "@effect/data/Function"
 * import * as O from "@effect/data/Option"
 * import * as E from "@effect/data/Either"
 *
 * const onNone = () => 'error'
 * assert.deepStrictEqual(pipe(O.some(1), O.toEither(onNone)), E.right(1))
 * assert.deepStrictEqual(pipe(O.none(), O.toEither(onNone)), E.left('error'))
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const toEither: {
    <A, E>(self: Option<A>, onNone: () => E): Either<E, A>;
    <E>(onNone: () => E): <A>(self: Option<A>) => Either<E, A>;
};
/**
 * Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`
 *
 * @param self - The `Option` to get the value of.
 * @param onNone - Function that returns the default value to return if the `Option` is `None`.
 *
 * @example
 * import { some, none, getOrElse } from '@effect/data/Option'
 * import { pipe } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(pipe(some(1), getOrElse(() => 0)), 1)
 * assert.deepStrictEqual(pipe(none(), getOrElse(() => 0)), 0)
 *
 * @category getters
 * @since 1.0.0
 */
export declare const getOrElse: {
    <B>(onNone: LazyArg<B>): <A>(self: Option<A>) => B | A;
    <A, B>(self: Option<A>, onNone: LazyArg<B>): A | B;
};
/**
 * Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.
 *
 * @param self - The first `Option` to be checked.
 * @param that - The `Option` to return if `self` is `None`.
 *
 * @example
 * import * as O from "@effect/data/Option"
 * import { pipe } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none(),
 *     O.orElse(() => O.none())
 *   ),
 *   O.none()
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.orElse(() => O.none())
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none(),
 *     O.orElse(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.orElse(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 *
 * @category error handling
 * @since 1.0.0
 */
export declare const orElse: {
    <B>(that: LazyArg<Option<B>>): <A>(self: Option<A>) => Option<B | A>;
    <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<A | B>;
};
/**
 * Similar to `orElse`, but instead of returning a simple union, it returns an `Either` object,
 * which contains information about which of the two `Option`s has been chosen.
 *
 * This is useful when it's important to know whether the value was retrieved from the first `Option` or the second option.
 *
 * @param self - The first `Option` to be checked.
 * @param that - The second `Option` to be considered if the first `Option` is `None`.
 *
 * @category error handling
 * @since 1.0.0
 */
export declare const orElseEither: {
    <B>(that: LazyArg<Option<B>>): <A>(self: Option<A>) => Option<Either<A, B>>;
    <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<Either<A, B>>;
};
/**
 * Given an `Iterable` collection of `Option`s, returns the first `Some` found in the collection.
 *
 * @param collection - An iterable collection of `Option` to be searched.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.firstSomeOf([O.none(), O.some(1), O.some(2)]), O.some(1))
 *
 * @category error handling
 * @since 1.0.0
 */
export declare const firstSomeOf: <A>(collection: Iterable<Option<A>>) => Option<A>;
/**
 * Similar to `Promise.all` but operates on `Option`s.
 *
 * ```
 * Iterable<Option<A>> -> Option<A[]>
 * ```
 *
 * Flattens a collection of `Option`s into a single `Option` that contains a list of all the `Some` values.
 * If there is a `None` value in the collection, it returns `None` as the result.
 *
 * @param collection - An iterable collection of `Option`s to flatten.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.all([O.some(1), O.some(2), O.some(3)]), O.some([1, 2, 3]))
 * assert.deepStrictEqual(O.all([O.some(1), O.none(), O.some(3)]), O.none())
 *
 * @category combining
 * @since 1.0.0
 */
export declare const all: <A>(collection: Iterable<Option<A>>) => Option<A[]>;
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @param nullableValue - The nullable value to be converted to an `Option`.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.fromNullable(undefined), O.none())
 * assert.deepStrictEqual(O.fromNullable(null), O.none())
 * assert.deepStrictEqual(O.fromNullable(1), O.some(1))
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const fromNullable: <A>(nullableValue: A) => Option<NonNullable<A>>;
/**
 * This API is useful for lifting a function that returns `null` or `undefined` into the `Option` context.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * const parse = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const parseOption = O.liftNullable(parse)
 *
 * assert.deepStrictEqual(parseOption('1'), O.some(1))
 * assert.deepStrictEqual(parseOption('not a number'), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const liftNullable: <A extends readonly unknown[], B>(f: (...a: A) => B | null | undefined) => (...a: A) => Option<NonNullable<B>>;
/**
 * Returns the value of the `Option` if it is a `Some`, otherwise returns `null`.
 *
 * @param self - The `Option` to extract the value from.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.getOrNull(O.some(1)), 1)
 * assert.deepStrictEqual(O.getOrNull(O.none()), null)
 *
 * @category getters
 * @since 1.0.0
 */
export declare const getOrNull: <A>(self: Option<A>) => A | null;
/**
 * Returns the value of the `Option` if it is a `Some`, otherwise returns `undefined`.
 *
 * @param self - The `Option` to extract the value from.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.getOrUndefined(O.some(1)), 1)
 * assert.deepStrictEqual(O.getOrUndefined(O.none()), undefined)
 *
 * @category getters
 * @since 1.0.0
 */
export declare const getOrUndefined: <A>(self: Option<A>) => A | undefined;
/**
 * A utility function that lifts a function that throws exceptions into a function that returns an `Option`.
 *
 * This function is useful for any function that might throw an exception, allowing the developer to handle
 * the exception in a more functional way.
 *
 * @param f - the function that can throw exceptions.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * const parse = O.liftThrowable(JSON.parse)
 *
 * assert.deepStrictEqual(parse("1"), O.some(1))
 * assert.deepStrictEqual(parse(""), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const liftThrowable: <A extends readonly unknown[], B>(f: (...a: A) => B) => (...a: A) => Option<B>;
/**
 * Extracts the value of an `Option` or throws if the `Option` is `None`.
 *
 * If a default error is sufficient for your use case and you don't need to configure the thrown error, see {@link getOrThrow}.
 *
 * @param self - The `Option` to extract the value from.
 * @param onNone - A function that will be called if the `Option` is `None`. It returns the error to be thrown.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(
 *   O.getOrThrowWith(O.some(1), () => new Error('Unexpected None')),
 *   1
 * )
 * assert.throws(() => O.getOrThrowWith(O.none(), () => new Error('Unexpected None')))
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const getOrThrowWith: {
    (onNone: () => unknown): <A>(self: Option<A>) => A;
    <A>(self: Option<A>, onNone: () => unknown): A;
};
/**
 * Extracts the value of an `Option` or throws if the `Option` is `None`.
 *
 * The thrown error is a default error. To configure the error thrown, see  {@link getOrThrowWith}.
 *
 * @param self - The `Option` to extract the value from.
 * @throws `Error("getOrThrow called on a None")`
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.getOrThrow(O.some(1)), 1)
 * assert.throws(() => O.getOrThrow(O.none()))
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const getOrThrow: <A>(self: Option<A>) => A;
/**
 * Maps the `Some` side of an `Option` value to a new `Option` value.
 *
 * @param self - An `Option` to map
 * @param f - The function to map over the value of the `Option`
 *
 * @category transforming
 * @since 1.0.0
 */
export declare const map: {
    <A, B>(f: (a: A) => B): (self: Option<A>) => Option<B>;
    <A, B>(self: Option<A>, f: (a: A) => B): Option<B>;
};
/**
 * @since 1.0.0
 */
export declare const Covariant: covariant.Covariant<OptionTypeLambda>;
/**
 * @since 1.0.0
 */
export declare const Invariant: invariant.Invariant<OptionTypeLambda>;
/**
 * @category transforming
 * @since 1.0.0
 */
export declare const flap: {
    <A, B>(a: A, self: Option<(a: A) => B>): Option<B>;
    <A, B>(self: Option<(a: A) => B>): (a: A) => Option<B>;
};
/**
 * Maps the `Some` value of this `Option` to the specified constant value.
 *
 * @category transforming
 * @since 1.0.0
 */
export declare const as: {
    <_, B>(self: Option<_>, b: B): Option<B>;
    <B>(b: B): <_>(self: Option<_>) => Option<B>;
};
/**
 * Maps the `Some` value of this `Option` to the `void` constant value.
 *
 * This is useful when the value of the `Option` is not needed, but the presence or absence of the value is important.
 *
 * @category transforming
 * @since 1.0.0
 */
export declare const asUnit: <_>(self: Option<_>) => Option<void>;
/**
 * @since 1.0.0
 */
export declare const unit: Option<void>;
/**
 * @since 1.0.0
 */
export declare const Pointed: pointed.Pointed<OptionTypeLambda>;
/**
 * Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.
 *
 * @category transforming
 * @since 1.0.0
 */
export declare const flatMap: {
    <A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>;
    <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>;
};
/**
 * Applies a provided function that returns an `Either` to the contents of an `Option`, flattening the result into another `Option`.
 *
 * @param self - The `Option` to apply the function to.
 * @param f - The function to be applied to the contents of the `Option`.
 *
 * @example
 * import * as O from "@effect/data/Option"
 * import * as E from "@effect/data/Either"
 * import { pipe } from "@effect/data/Function"
 *
 * const f = (n: number) => (n > 2 ? E.left('Too big') : E.right(n + 1))
 *
 * assert.deepStrictEqual(pipe(O.some(1), O.flatMapEither(f)), O.some(2))
 * assert.deepStrictEqual(pipe(O.some(3), O.flatMapEither(f)), O.none())
 *
 * @category transforming
 * @since 1.0.0
 */
export declare const flatMapEither: {
    <A, E, B>(f: (a: A) => Either<E, B>): (self: Option<A>) => Option<B>;
    <A, E, B>(self: Option<A>, f: (a: A) => Either<E, B>): Option<B>;
};
/**
 * This is `flatMap` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, flatMapNullable } from '@effect/data/Option'
 * import { pipe } from "@effect/data/Function"
 *
 * interface Employee {
 *   company?: {
 *     address?: {
 *       street?: {
 *         name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     some(employee1),
 *     flatMapNullable(employee => employee.company?.address?.street?.name),
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     some(employee2),
 *     flatMapNullable(employee => employee.company?.address?.street?.name),
 *   ),
 *   none()
 * )
 *
 * @category transforming
 * @since 1.0.0
 */
export declare const flatMapNullable: {
    <A, B>(f: (a: A) => B | null | undefined): (self: Option<A>) => Option<NonNullable<B>>;
    <A, B>(self: Option<A>, f: (a: A) => B | null | undefined): Option<NonNullable<B>>;
};
/**
 * @since 1.0.0
 */
export declare const FlatMap: flatMap_.FlatMap<OptionTypeLambda>;
/**
 * @category transforming
 * @since 1.0.0
 */
export declare const flatten: <A>(self: Option<Option<A>>) => Option<A>;
/**
 * @category transforming
 * @since 1.0.0
 */
export declare const andThen: {
    <_, B>(self: Option<_>, that: Option<B>): Option<B>;
    <B>(that: Option<B>): <_>(self: Option<_>) => Option<B>;
};
/**
 * @category transforming
 * @since 1.0.0
 */
export declare const composeK: {
    <A, B, C>(afb: (a: A) => Option<B>, bfc: (b: B) => Option<C>): (a: A) => Option<C>;
    <B, C>(bfc: (b: B) => Option<C>): <A>(afb: (a: A) => Option<B>) => (a: A) => Option<C>;
};
/**
 * @since 1.0.0
 */
export declare const Chainable: chainable.Chainable<OptionTypeLambda>;
/**
 * Sequences the specified `that` `Option` but ignores its value.
 *
 * It is useful when we want to chain multiple operations, but only care about the result of `self`.
 *
 * @param that - The `Option` that will be ignored in the chain and discarded
 * @param self - The `Option` we care about
 *
 * @category transforming
 * @since 1.0.0
 */
export declare const andThenDiscard: {
    <A, _>(self: Option<A>, that: Option<_>): Option<A>;
    <_>(that: Option<_>): <A>(self: Option<A>) => Option<A>;
};
/**
 * Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
 * unless `f` returns `None`, in which case it returns `None`.
 *
 * This function is useful for performing additional computations on the value of the input `Option` without affecting its value.
 *
 * @param f - Function to apply to the value of the `Option` if it is `Some`
 * @param self - The `Option` to apply the function to
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * const getInteger = (n: number) => Number.isInteger(n) ? O.some(n) : O.none()
 *
 * assert.deepStrictEqual(O.tap(O.none(), getInteger), O.none())
 * assert.deepStrictEqual(O.tap(O.some(1), getInteger), O.some(1))
 * assert.deepStrictEqual(O.tap(O.some(1.14), getInteger), O.none())
 *
 * @category transforming
 * @since 1.0.0
 */
export declare const tap: {
    <A, _>(self: Option<A>, f: (a: A) => Option<_>): Option<A>;
    <A, _>(f: (a: A) => Option<_>): (self: Option<A>) => Option<A>;
};
/**
 * Useful for debugging purposes, the `onSome` callback is called with the value of `self` if it is a `Some`.
 *
 * @param self - the `Option` to inspect
 * @param onSome - callback function that is called with the value of `self` if it is a `Some`
 *
 * @category debugging
 * @since 1.0.0
 */
export declare const inspectSome: {
    <A>(onSome: (a: A) => void): (self: Option<A>) => Option<A>;
    <A>(self: Option<A>, onSome: (a: A) => void): Option<A>;
};
/**
 * Useful for debugging purposes, the `onNone` callback is is called if `self` is a `None`.
 *
 * @param self - the `Option` to inspect
 * @param onNone - callback function that is is called if `self` is a `None`
 *
 * @category debugging
 * @since 1.0.0
 */
export declare const inspectNone: {
    (onNone: () => void): <A>(self: Option<A>) => Option<A>;
    <A>(self: Option<A>, onNone: () => void): Option<A>;
};
/**
 * @since 1.0.0
 */
export declare const Monad: monad.Monad<OptionTypeLambda>;
/**
 * @since 1.0.0
 */
export declare const SemiProduct: semiProduct.SemiProduct<OptionTypeLambda>;
/**
 * @since 1.0.0
 */
export declare const Product: product_.Product<OptionTypeLambda>;
/**
 * Similar to `Promise.all` but operates on `Option`s.
 *
 * ```
 * [Option<A>, Option<B>, ...] -> Option<[A, B, ...]>
 * ```
 *
 * Takes a tuple of `Option`s and returns an `Option` of a tuple of values.
 *
 * @param elements - the tuple of `Option`s to be sequenced.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.tuple(O.some(1), O.some("hello")), O.some([1, "hello"]))
 * assert.deepStrictEqual(O.tuple(O.some(1), O.none()), O.none())
 *
 * @category combining
 * @since 1.0.0
 */
export declare const tuple: <T extends ReadonlyArray<Option<any>>>(...elements: T) => Option<{
    [I in keyof T]: [T[I]] extends [Option<infer A>] ? A : never;
}>;
/**
 * Takes a struct of `Option`s and returns an `Option` of a struct of values.
 *
 * @param fields - the struct of `Option`s to be sequenced.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.struct({ a: O.some(1), b: O.some("hello") }), O.some({ a: 1, b: "hello" }))
 * assert.deepStrictEqual(O.struct({ a: O.some(1), b: O.none() }), O.none())
 *
 * @category combining
 * @since 1.0.0
 */
export declare const struct: <R extends Record<string, Option<any>>>(fields: R) => Option<{
    [K in keyof R]: [R[K]] extends [Option<infer A>] ? A : never;
}>;
/**
 * @since 1.0.0
 */
export declare const SemiApplicative: semiApplicative.SemiApplicative<OptionTypeLambda>;
/**
 * Monoid that models the combination of values that may be absent, elements that are `None` are ignored
 * while elements that are `Some` are combined using the provided `Semigroup`.
 *
 * The `empty` value is `none()`.
 *
 * @param Semigroup - The `Semigroup` used to combine two values of type `A`.
 *
 * @example
 * import * as O from "@effect/data/Option"
 * import * as N from '@effect/data/Number'
 * import { pipe } from "@effect/data/Function"
 *
 * const M = O.getOptionalMonoid(N.SemigroupSum)
 *
 * assert.deepStrictEqual(M.combine(O.none(), O.none()), O.none())
 * assert.deepStrictEqual(M.combine(O.some(1), O.none()), O.some(1))
 * assert.deepStrictEqual(M.combine(O.none(), O.some(1)), O.some(1))
 * assert.deepStrictEqual(M.combine(O.some(1), O.some(2)), O.some(3))
 *
 * @since 1.0.0
 */
export declare const getOptionalMonoid: <A>(Semigroup: Semigroup<A>) => Monoid<Option<A>>;
/**
 * Zips two `Option` values together using a provided function, returning a new `Option` of the result.
 *
 * @param self - The left-hand side of the zip operation
 * @param that - The right-hand side of the zip operation
 * @param f - The function used to combine the values of the two `Option`s
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * type Complex = [number, number]
 *
 * const complex = (real: number, imaginary: number): Complex => [real, imaginary]
 *
 * assert.deepStrictEqual(O.zipWith(O.none(), O.none(), complex), O.none())
 * assert.deepStrictEqual(O.zipWith(O.some(1), O.none(), complex), O.none())
 * assert.deepStrictEqual(O.zipWith(O.none(), O.some(1), complex), O.none())
 * assert.deepStrictEqual(O.zipWith(O.some(1), O.some(2), complex), O.some([1, 2]))
 *
 * assert.deepStrictEqual(O.zipWith(O.some(1), complex)(O.some(2)), O.some([2, 1]))
 *
 * @category combining
 * @since 1.0.0
 */
export declare const zipWith: {
    <A, B, C>(self: Option<A>, that: Option<B>, f: (a: A, b: B) => C): Option<C>;
    <B, A, C>(that: Option<B>, f: (a: A, b: B) => C): (self: Option<A>) => Option<C>;
};
/**
 * @category combining
 * @since 1.0.0
 */
export declare const ap: {
    <A, B>(self: Option<(a: A) => B>, that: Option<A>): Option<B>;
    <A>(that: Option<A>): <B>(self: Option<(a: A) => B>) => Option<B>;
};
/**
 * Semigroup that models the combination of computations that can fail, if at least one element is `None`
 * then the resulting combination is `None`, otherwise if all elements are `Some` then the resulting combination
 * is the combination of the wrapped elements using the provided `Semigroup`.
 *
 * See also `getFailureMonoid` if you need a `Monoid` instead of a `Semigroup`.
 *
 * @category combining
 * @since 1.0.0
 */
export declare const getFailureSemigroup: <A>(S: Semigroup<A>) => Semigroup<Option<A>>;
/**
 * @since 1.0.0
 */
export declare const Applicative: applicative.Applicative<OptionTypeLambda>;
/**
 * Monoid that models the combination of computations that can fail, if at least one element is `None`
 * then the resulting combination is `None`, otherwise if all elements are `Some` then the resulting combination
 * is the combination of the wrapped elements using the provided `Monoid`.
 *
 * The `empty` value is `some(M.empty)`.
 *
 * See also `getFailureSemigroup` if you need a `Semigroup` instead of a `Monoid`.
 *
 * @category combining
 * @since 1.0.0
 */
export declare const getFailureMonoid: <A>(M: Monoid<A>) => Monoid<Option<A>>;
/**
 * @since 1.0.0
 */
export declare const SemiCoproduct: semiCoproduct.SemiCoproduct<OptionTypeLambda>;
/**
 * Semigroup returning the first `Some` value encountered.
 *
 * @category combining
 * @since 1.0.0
 */
export declare const getFirstSomeSemigroup: <A>() => Semigroup<Option<A>>;
/**
 * @since 1.0.0
 */
export declare const Coproduct: coproduct_.Coproduct<OptionTypeLambda>;
/**
 * @since 1.0.0
 */
export declare const SemiAlternative: semiAlternative.SemiAlternative<OptionTypeLambda>;
/**
 * @since 1.0.0
 */
export declare const Alternative: alternative.Alternative<OptionTypeLambda>;
/**
 * Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.
 *
 * @param self - The Iterable of `Option<A>` to be reduced.
 * @param b - The initial value of the accumulator.
 * @param f - The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.
 *
 * @example
 * import { some, none, reduceCompact } from '@effect/data/Option'
 * import { pipe } from "@effect/data/Function"
 *
 * const iterable = [some(1), none(), some(2), none()]
 * assert.deepStrictEqual(pipe(iterable, reduceCompact(0, (b, a) => b + a)), 3)
 *
 * @category folding
 * @since 1.0.0
 */
export declare const reduceCompact: {
    <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<Option<A>>) => B;
    <A, B>(self: Iterable<Option<A>>, b: B, f: (b: B, a: A) => B): B;
};
/**
 * @since 1.0.0
 */
export declare const Foldable: foldable.Foldable<OptionTypeLambda>;
/**
 * Transforms an `Option` into an `Array`.
 * If the input is `None`, an empty array is returned.
 * If the input is `Some`, the value is wrapped in an array.
 *
 * @param self - The `Option` to convert to an array.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.toArray(O.some(1)), [1])
 * assert.deepStrictEqual(O.toArray(O.none()), [])
 *
 * @category conversions
 * @since 1.0.0
 */
export declare const toArray: <A>(self: Option<A>) => Array<A>;
/**
 * @category filtering
 * @since 1.0.0
 */
export declare const partitionMap: {
    <A, B, C>(f: (a: A) => Either<B, C>): (self: Option<A>) => [Option<B>, Option<C>];
    <A, B, C>(self: Option<A>, f: (a: A) => Either<B, C>): [Option<B>, Option<C>];
};
/**
 * Maps over the value of an `Option` and filters out `None`s.
 *
 * Useful when in addition to filtering you also want to change the type of the `Option`.
 *
 * @param self - The `Option` to map over.
 * @param f - A function to apply to the value of the `Option`.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * const evenNumber = (n: number) => n % 2 === 0 ? O.some(n) : O.none()
 *
 * assert.deepStrictEqual(O.filterMap(O.none(), evenNumber), O.none())
 * assert.deepStrictEqual(O.filterMap(O.some(3), evenNumber), O.none())
 * assert.deepStrictEqual(O.filterMap(O.some(2), evenNumber), O.some(2))
 *
 * @category filtering
 * @since 1.0.0
 */
export declare const filterMap: {
    <A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>;
    <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>;
};
/**
 * @since 1.0.0
 */
export declare const Filterable: filterable.Filterable<OptionTypeLambda>;
/**
 * Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.
 *
 * If you need to change the type of the `Option` in addition to filtering, see `filterMap`.
 *
 * @param predicate - A predicate function to apply to the `Option` value.
 * @param fb - The `Option` to filter.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * // predicate
 * const isEven = (n: number) => n % 2 === 0
 *
 * assert.deepStrictEqual(O.filter(O.none(), isEven), O.none())
 * assert.deepStrictEqual(O.filter(O.some(3), isEven), O.none())
 * assert.deepStrictEqual(O.filter(O.some(2), isEven), O.some(2))
 *
 * // refinement
 * const isNumber = (v: unknown): v is number => typeof v === "number"
 *
 * assert.deepStrictEqual(O.filter(O.none(), isNumber), O.none())
 * assert.deepStrictEqual(O.filter(O.some('hello'), isNumber), O.none())
 * assert.deepStrictEqual(O.filter(O.some(2), isNumber), O.some(2))
 *
 * @category filtering
 * @since 1.0.0
 */
export declare const filter: {
    <C extends A, B extends A, A = C>(self: Option<C>, refinement: (a: A) => a is B): Option<B>;
    <B extends A, A = B>(self: Option<B>, predicate: (a: A) => boolean): Option<B>;
    <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): (self: Option<C>) => Option<B>;
    <B extends A, A = B>(predicate: (a: A) => boolean): (self: Option<B>) => Option<B>;
};
/**
 * Applies an `Option` value to an effectful function that returns an `F` value.
 *
 * @param F - {@link applicative.Applicative} instance
 * @param self - The `Option` value.
 * @param f - An effectful function that returns an `F` value.
 *
 * @example
 * import * as O from "@effect/data/Option"
 * import * as E from "@effect/data/Either"
 *
 * const traverse = O.traverse(E.Applicative)
 * const f = (n: number) => n >= 0 ? E.right(1) : E.left("negative")
 *
 * assert.deepStrictEqual(traverse(O.some(1), f), E.right(O.some(1)))
 * assert.deepStrictEqual(traverse(O.some(-1), f), E.left("negative"))
 * assert.deepStrictEqual(traverse(O.none(), f), E.right(O.none()))
 *
 * @category combining
 * @since 1.0.0
 */
export declare const traverse: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): (self: Option<A>) => Kind<F, R, O, E, Option<B>>;
    <A_1, R_1, O_1, E_1, B_1>(self: Option<A_1>, f: (a: A_1) => Kind<F, R_1, O_1, E_1, B_1>): Kind<F, R_1, O_1, E_1, Option<B_1>>;
};
/**
 * @since 1.0.0
 */
export declare const Traversable: traversable.Traversable<OptionTypeLambda>;
/**
 * Combines an `Option` of an `F`-structure to an `F`-structure of an `Option` with the same inner type.
 *
 * @param F - {@link applicative.Applicative} instance
 * @param self - `Option` of Kind `F`
 *
 * @example
 * import * as O from "@effect/data/Option"
 * import * as E from "@effect/data/Either"
 *
 * const sequence = O.sequence(E.Applicative)
 *
 * assert.deepStrictEqual(sequence(O.some(E.right(1))), E.right(O.some(1)))
 * assert.deepStrictEqual(sequence(O.some(E.left("error"))), E.left("error"))
 * assert.deepStrictEqual(sequence(O.none()), E.right(O.none()))
 *
 * @category combining
 * @since 1.0.0
 */
export declare const sequence: <F extends TypeLambda>(F: applicative.Applicative<F>) => <R, O, E, A>(self: Option<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Option<A>>;
/**
 * @category combining
 * @since 1.0.0
 */
export declare const traverseTap: <F extends TypeLambda>(F: applicative.Applicative<F>) => {
    <A, R, O, E, B>(self: Option<A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Option<A>>;
    <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): (self: Option<A>) => Kind<F, R, O, E, Option<A>>;
};
/**
 * @example
 * import { none, some, getEquivalence } from '@effect/data/Option'
 * import * as N from '@effect/data/Number'
 *
 * const isEquivalent = getEquivalence(N.Equivalence)
 * assert.deepStrictEqual(isEquivalent(none(), none()), true)
 * assert.deepStrictEqual(isEquivalent(none(), some(1)), false)
 * assert.deepStrictEqual(isEquivalent(some(1), none()), false)
 * assert.deepStrictEqual(isEquivalent(some(1), some(2)), false)
 * assert.deepStrictEqual(isEquivalent(some(1), some(1)), true)
 *
 * @category equivalence
 * @since 1.0.0
 */
export declare const getEquivalence: <A>(E: Equivalence<A>) => Equivalence<Option<A>>;
/**
 * The `Order` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Order` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 * @example
 * import { none, some, getOrder } from '@effect/data/Option'
 * import * as N from '@effect/data/Number'
 * import { pipe } from "@effect/data/Function"
 *
 * const O = getOrder(N.Order)
 * assert.deepStrictEqual(O.compare(none(), none()), 0)
 * assert.deepStrictEqual(O.compare(none(), some(1)), -1)
 * assert.deepStrictEqual(O.compare(some(1), none()), 1)
 * assert.deepStrictEqual(O.compare(some(1), some(2)), -1)
 * assert.deepStrictEqual(O.compare(some(1), some(1)), 0)
 *
 * @category sorting
 * @since 1.0.0
 */
export declare const getOrder: <A>(O: Order<A>) => Order<Option<A>>;
/**
 * Lifts a binary function into `Option`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => {
    (self: Option<A>, that: Option<B>): Option<C>;
    (that: Option<B>): (self: Option<A>) => Option<C>;
};
/**
 * Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
 * if the predicate returns `false`.
 *
 * @param predicate - A `Predicate` function that takes in a value of type `A` and returns a boolean.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * const getOption = O.liftPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(getOption(-1), O.none())
 * assert.deepStrictEqual(getOption(1), O.some(1))
 *
 * @category lifting
 * @since 1.0.0
 */
export declare const liftPredicate: {
    <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => Option<B>;
    <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Option<B>;
};
/**
 * Lifts an `Either` function to an `Option` function.
 *
 * @param f - Any variadic function that returns an `Either`.
 *
 * @example
 * import * as O from "@effect/data/Option"
 * import * as E from "@effect/data/Either"
 *
 * const parse = (s: string) =>
 *   isNaN(+s) ? E.left(`Error: ${s} is not a number`) : E.right(+s)
 *
 * const parseNumber = O.liftEither(parse)
 *
 * assert.deepEqual(parseNumber('12'), O.some(12))
 * assert.deepEqual(parseNumber('not a number'), O.none())
 *
 * @category lifting
 * @since 1.0.0
 */
export declare const liftEither: <A extends readonly unknown[], E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => Option<B>;
/**
 * Returns a function that checks if an `Option` contains a given value using a provided `Equivalence` instance.
 *
 * @param equivalent - An `Equivalence` instance to compare values of the `Option`.
 * @param self - The `Option` to apply the comparison to.
 * @param a - The value to compare against the `Option`.
 *
 * @example
 * import { some, none, contains } from '@effect/data/Option'
 * import { Equivalence } from '@effect/data/Number'
 * import { pipe } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(pipe(some(2), contains(Equivalence)(2)), true)
 * assert.deepStrictEqual(pipe(some(1), contains(Equivalence)(2)), false)
 * assert.deepStrictEqual(pipe(none(), contains(Equivalence)(2)), false)
 *
 * @since 1.0.0
 */
export declare const contains: <A>(isEquivalent: (self: A, that: A) => boolean) => {
    (a: A): (self: Option<A>) => boolean;
    (self: Option<A>, a: A): boolean;
};
/**
 * Check if a value in an `Option` type meets a certain predicate.
 *
 * @param self - The `Option` to check.
 * @param predicate - The condition to check.
 *
 * @example
 * import { some, none, exists } from '@effect/data/Option'
 * import { pipe } from "@effect/data/Function"
 *
 * const isEven = (n: number) => n % 2 === 0
 *
 * assert.deepStrictEqual(pipe(some(2), exists(isEven)), true)
 * assert.deepStrictEqual(pipe(some(1), exists(isEven)), false)
 * assert.deepStrictEqual(pipe(none(), exists(isEven)), false)
 *
 * @since 1.0.0
 */
export declare const exists: {
    <A>(predicate: Predicate<A>): (self: Option<A>) => boolean;
    <A>(self: Option<A>, predicate: Predicate<A>): boolean;
};
/**
 * @category math
 * @since 1.0.0
 */
export declare const sum: {
    (self: Option<number>, that: Option<number>): Option<number>;
    (that: Option<number>): (self: Option<number>) => Option<number>;
};
/**
 * @category math
 * @since 1.0.0
 */
export declare const multiply: {
    (self: Option<number>, that: Option<number>): Option<number>;
    (that: Option<number>): (self: Option<number>) => Option<number>;
};
/**
 * @category math
 * @since 1.0.0
 */
export declare const subtract: {
    (self: Option<number>, that: Option<number>): Option<number>;
    (that: Option<number>): (self: Option<number>) => Option<number>;
};
/**
 * @category math
 * @since 1.0.0
 */
export declare const divide: {
    (self: Option<number>, that: Option<number>): Option<number>;
    (that: Option<number>): (self: Option<number>) => Option<number>;
};
/**
 * Sum all numbers in an iterable of `Option<number>` ignoring the `None` values.
 *
 * @param self - The iterable of `Option<number>` to be summed.
 *
 * @example
 * import { sumCompact, some, none } from '@effect/data/Option'
 *
 * const iterable = [some(2), none(), some(3), none()]
 * assert.deepStrictEqual(sumCompact(iterable), 5)
 *
 * @category math
 * @since 1.0.0
 */
export declare const sumCompact: (self: Iterable<Option<number>>) => number;
/**
 * Multiply all numbers in an iterable of `Option<number>` ignoring the `None` values.
 *
 * @param self - The iterable of `Option<number>` to be multiplied.
 *
 * @example
 * import { multiplyCompact, some, none } from '@effect/data/Option'
 *
 * const iterable = [some(2), none(), some(3), none()]
 * assert.deepStrictEqual(multiplyCompact(iterable), 6)
 *
 * @category math
 * @since 1.0.0
 */
export declare const multiplyCompact: (self: Iterable<Option<number>>) => number;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const tupled: <A>(self: Option<A>) => Option<[A]>;
/**
 * Appends an element to the end of a tuple wrapped in an `Option` type.
 *
 * @param self - The option of a tuple to which an element needs to be added.
 * @param that - The element which needs to be added to the tuple.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(O.appendElement(O.some([1, 2]), O.some(3)), O.some([1, 2, 3]))
 * assert.deepStrictEqual(O.appendElement(O.some([1, 2]), O.none()), O.none())
 *
 * @category do notation
 * @since 1.0.0
 */
export declare const appendElement: {
    <A extends ReadonlyArray<any>, B>(self: Option<A>, that: Option<B>): Option<[...A, B]>;
    <B>(that: Option<B>): <A extends ReadonlyArray<any>>(self: Option<A>) => Option<[...A, B]>;
};
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bindTo: {
    <N extends string>(name: N): <A>(self: Option<A>) => Option<{
        [K in N]: A;
    }>;
    <A, N extends string>(self: Option<A>, name: N): Option<{
        [K in N]: A;
    }>;
};
declare const let_: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): (self: Option<A>) => Option<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: Option<A>, name: Exclude<N, keyof A>, f: (a: A) => B): Option<{
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
export declare const bind: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => Option<B>): (self: Option<A>) => Option<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: Option<A>, name: Exclude<N, keyof A>, f: (a: A) => Option<B>): Option<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const Do: Option<{}>;
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export declare const andThenBind: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, that: Option<B>): (self: Option<A>) => Option<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: Option<A>, name: Exclude<N, keyof A>, that: Option<B>): Option<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
/**
 * The `gen` API is a helper function that provides a generator interface for the `Option` monad instance.
 * It can be used to easily create complex `Option` computations in a readable and concise manner.
 *
 * @example
 * import * as O from "@effect/data/Option"
 *
 * assert.deepStrictEqual(
 *   O.gen(function*($) {
 *     const a = yield* $(O.some(1))
 *     const b = yield* $(O.some(2))
 *     return a + b
 *   }),
 *   O.some(3)
 * )
 *
 * @since 1.0.0
 * @category generators
 */
export declare const gen: Gen.Gen<OptionTypeLambda, Gen.Adapter<OptionTypeLambda>>;
//# sourceMappingURL=Option.d.ts.map