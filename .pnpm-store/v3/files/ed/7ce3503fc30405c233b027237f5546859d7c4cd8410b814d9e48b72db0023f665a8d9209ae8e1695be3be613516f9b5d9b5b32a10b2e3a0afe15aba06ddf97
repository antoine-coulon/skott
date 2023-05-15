import * as Equal from "@effect/data/Equal";
import { constNull, constUndefined, dual } from "@effect/data/Function";
import * as Gen from "@effect/data/Gen";
import * as either from "@effect/data/internal/Either";
import * as option from "@effect/data/internal/Option";
import * as N from "@effect/data/Number";
import * as applicative from "@effect/data/typeclass/Applicative";
import * as chainable from "@effect/data/typeclass/Chainable";
import * as covariant from "@effect/data/typeclass/Covariant";
import * as equivalence from "@effect/data/typeclass/Equivalence";
import * as filterable from "@effect/data/typeclass/Filterable";
import * as flatMap_ from "@effect/data/typeclass/FlatMap";
import * as foldable from "@effect/data/typeclass/Foldable";
import * as invariant from "@effect/data/typeclass/Invariant";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as of_ from "@effect/data/typeclass/Of";
import * as order from "@effect/data/typeclass/Order";
import * as product_ from "@effect/data/typeclass/Product";
import * as semiApplicative from "@effect/data/typeclass/SemiApplicative";
import * as semiCoproduct from "@effect/data/typeclass/SemiCoproduct";
import * as semigroup from "@effect/data/typeclass/Semigroup";
import * as semiProduct from "@effect/data/typeclass/SemiProduct";
import * as traversable from "@effect/data/typeclass/Traversable";
/**
 * Creates a new `Option` that represents the absence of a value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const none = () => option.none;
/**
 * Creates a new `Option` that wraps the given value.
 *
 * @param value - The value to wrap.
 *
 * @category constructors
 * @since 1.0.0
 */
export const some = option.some;
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
export const isOption = input => typeof input === "object" && input != null && "_tag" in input && (input["_tag"] === "None" || input["_tag"] === "Some") && Equal.isEqual(input);
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
export const isNone = option.isNone;
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
export const isSome = option.isSome;
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
export const match = /*#__PURE__*/dual(3, (self, onNone, onSome) => isNone(self) ? onNone() : onSome(self.value));
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
export const toRefinement = f => a => isSome(f(a));
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
export const fromIterable = collection => {
  for (const a of collection) {
    return some(a);
  }
  return none();
};
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
export const fromEither = either.getRight;
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
export const getRight = fromEither;
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
export const getLeft = either.getLeft;
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
export const toEither = either.fromOption;
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
export const getOrElse = /*#__PURE__*/dual(2, (self, onNone) => isNone(self) ? onNone() : self.value);
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
export const orElse = /*#__PURE__*/dual(2, (self, that) => isNone(self) ? that() : self);
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
export const orElseEither = /*#__PURE__*/dual(2, (self, that) => isNone(self) ? map(that(), either.right) : map(self, either.left));
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
export const firstSomeOf = collection => {
  let out = none();
  for (out of collection) {
    if (isSome(out)) {
      return out;
    }
  }
  return out;
};
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
export const all = collection => {
  const out = [];
  for (const o of collection) {
    if (isNone(o)) {
      return none();
    }
    out.push(o.value);
  }
  return some(out);
};
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
export const fromNullable = nullableValue => nullableValue == null ? none() : some(nullableValue);
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
export const liftNullable = f => (...a) => fromNullable(f(...a));
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
export const getOrNull = /*#__PURE__*/getOrElse(constNull);
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
export const getOrUndefined = /*#__PURE__*/getOrElse(constUndefined);
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
export const liftThrowable = f => (...a) => {
  try {
    return some(f(...a));
  } catch (e) {
    return none();
  }
};
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
export const getOrThrowWith = /*#__PURE__*/dual(2, (self, onNone) => {
  if (isSome(self)) {
    return self.value;
  }
  throw onNone();
});
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
export const getOrThrow = /*#__PURE__*/getOrThrowWith(() => new Error("getOrThrow called on a None"));
/**
 * Maps the `Some` side of an `Option` value to a new `Option` value.
 *
 * @param self - An `Option` to map
 * @param f - The function to map over the value of the `Option`
 *
 * @category transforming
 * @since 1.0.0
 */
export const map = /*#__PURE__*/dual(2, (self, f) => isNone(self) ? none() : some(f(self.value)));
const imap = /*#__PURE__*/covariant.imap(map);
/**
 * @since 1.0.0
 */
export const Covariant = {
  imap,
  map
};
/**
 * @since 1.0.0
 */
export const Invariant = {
  imap
};
/**
 * @category transforming
 * @since 1.0.0
 */
export const flap = /*#__PURE__*/covariant.flap(Covariant);
/**
 * Maps the `Some` value of this `Option` to the specified constant value.
 *
 * @category transforming
 * @since 1.0.0
 */
export const as = /*#__PURE__*/covariant.as(Covariant);
/**
 * Maps the `Some` value of this `Option` to the `void` constant value.
 *
 * This is useful when the value of the `Option` is not needed, but the presence or absence of the value is important.
 *
 * @category transforming
 * @since 1.0.0
 */
export const asUnit = /*#__PURE__*/covariant.asUnit(Covariant);
const of = some;
const Of = {
  of
};
/**
 * @since 1.0.0
 */
export const unit = /*#__PURE__*/of_.unit(Of);
/**
 * @since 1.0.0
 */
export const Pointed = {
  of,
  imap,
  map
};
/**
 * Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.
 *
 * @category transforming
 * @since 1.0.0
 */
export const flatMap = /*#__PURE__*/dual(2, (self, f) => isNone(self) ? none() : f(self.value));
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
export const flatMapEither = /*#__PURE__*/dual(2, (self, f) => flatMap(self, liftEither(f)));
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
export const flatMapNullable = /*#__PURE__*/dual(2, (self, f) => isNone(self) ? none() : fromNullable(f(self.value)));
/**
 * @since 1.0.0
 */
export const FlatMap = {
  flatMap
};
/**
 * @category transforming
 * @since 1.0.0
 */
export const flatten = /*#__PURE__*/flatMap_.flatten(FlatMap);
/**
 * @category transforming
 * @since 1.0.0
 */
export const andThen = /*#__PURE__*/flatMap_.andThen(FlatMap);
/**
 * @category transforming
 * @since 1.0.0
 */
export const composeK = /*#__PURE__*/flatMap_.composeK(FlatMap);
/**
 * @since 1.0.0
 */
export const Chainable = {
  imap,
  map,
  flatMap
};
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
export const andThenDiscard = /*#__PURE__*/chainable.andThenDiscard(Chainable);
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
export const tap = /*#__PURE__*/chainable.tap(Chainable);
/**
 * Useful for debugging purposes, the `onSome` callback is called with the value of `self` if it is a `Some`.
 *
 * @param self - the `Option` to inspect
 * @param onSome - callback function that is called with the value of `self` if it is a `Some`
 *
 * @category debugging
 * @since 1.0.0
 */
export const inspectSome = /*#__PURE__*/dual(2, (self, onSome) => {
  if (isSome(self)) {
    onSome(self.value);
  }
  return self;
});
/**
 * Useful for debugging purposes, the `onNone` callback is is called if `self` is a `None`.
 *
 * @param self - the `Option` to inspect
 * @param onNone - callback function that is is called if `self` is a `None`
 *
 * @category debugging
 * @since 1.0.0
 */
export const inspectNone = /*#__PURE__*/dual(2, (self, onNone) => {
  if (isNone(self)) {
    onNone();
  }
  return self;
});
/**
 * @since 1.0.0
 */
export const Monad = {
  imap,
  of,
  map,
  flatMap
};
const product = (self, that) => isSome(self) && isSome(that) ? some([self.value, that.value]) : none();
const productMany = (self, collection) => {
  if (isNone(self)) {
    return none();
  }
  const out = [self.value];
  for (const o of collection) {
    if (isNone(o)) {
      return none();
    }
    out.push(o.value);
  }
  return some(out);
};
/**
 * @since 1.0.0
 */
export const SemiProduct = {
  imap,
  product,
  productMany
};
/**
 * @since 1.0.0
 */
export const Product = {
  of,
  imap,
  product,
  productMany,
  productAll: all
};
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
export const tuple = /*#__PURE__*/product_.tuple(Product);
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
export const struct = /*#__PURE__*/product_.struct(Product);
/**
 * @since 1.0.0
 */
export const SemiApplicative = {
  imap,
  map,
  product,
  productMany
};
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
export const getOptionalMonoid = Semigroup => monoid.fromSemigroup(semigroup.make((self, that) => isNone(self) ? that : isNone(that) ? self : some(Semigroup.combine(self.value, that.value))), none());
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
export const zipWith = /*#__PURE__*/semiApplicative.zipWith(SemiApplicative);
/**
 * @category combining
 * @since 1.0.0
 */
export const ap = /*#__PURE__*/semiApplicative.ap(SemiApplicative);
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
export const getFailureSemigroup = /*#__PURE__*/semiApplicative.getSemigroup(SemiApplicative);
/**
 * @since 1.0.0
 */
export const Applicative = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll: all
};
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
export const getFailureMonoid = /*#__PURE__*/applicative.getMonoid(Applicative);
const coproduct = (self, that) => isSome(self) ? self : that;
const coproductMany = (self, collection) => isSome(self) ? self : firstSomeOf(collection);
/**
 * @since 1.0.0
 */
export const SemiCoproduct = {
  imap,
  coproduct,
  coproductMany
};
/**
 * Semigroup returning the first `Some` value encountered.
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstSomeSemigroup = /*#__PURE__*/semiCoproduct.getSemigroup(SemiCoproduct);
/**
 * @since 1.0.0
 */
export const Coproduct = {
  imap,
  coproduct,
  coproductMany,
  zero: none,
  coproductAll: firstSomeOf
};
/**
 * @since 1.0.0
 */
export const SemiAlternative = {
  map,
  imap,
  coproduct,
  coproductMany
};
/**
 * @since 1.0.0
 */
export const Alternative = {
  map,
  imap,
  coproduct,
  coproductMany,
  coproductAll: firstSomeOf,
  zero: none
};
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
export const reduceCompact = /*#__PURE__*/dual(3, (self, b, f) => {
  let out = b;
  for (const oa of self) {
    if (isSome(oa)) {
      out = f(out, oa.value);
    }
  }
  return out;
});
/**
 * @since 1.0.0
 */
export const Foldable = {
  reduce: /*#__PURE__*/dual(3, (self, b, f) => isNone(self) ? b : f(b, self.value))
};
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
export const toArray = /*#__PURE__*/foldable.toArray(Foldable);
/**
 * @category filtering
 * @since 1.0.0
 */
export const partitionMap = /*#__PURE__*/dual(2, (self, f) => {
  if (isNone(self)) {
    return [none(), none()];
  }
  const e = f(self.value);
  return either.isLeft(e) ? [some(e.left), none()] : [none(), some(e.right)];
});
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
export const filterMap = /*#__PURE__*/dual(2, (self, f) => isNone(self) ? none() : f(self.value));
/**
 * @since 1.0.0
 */
export const Filterable = {
  partitionMap,
  filterMap
};
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
export const filter = /*#__PURE__*/filterable.filter(Filterable);
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
export const traverse = F => dual(2, (self, f) => isNone(self) ? F.of(none()) : F.map(f(self.value), some));
/**
 * @since 1.0.0
 */
export const Traversable = {
  traverse
};
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
export const sequence = /*#__PURE__*/traversable.sequence(Traversable);
/**
 * @category combining
 * @since 1.0.0
 */
export const traverseTap = /*#__PURE__*/traversable.traverseTap(Traversable);
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
export const getEquivalence = E => equivalence.make((x, y) => x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E(x.value, y.value)));
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
export const getOrder = O => order.make((self, that) => isSome(self) ? isSome(that) ? O.compare(self.value, that.value) : 1 : -1);
/**
 * Lifts a binary function into `Option`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2 = /*#__PURE__*/semiApplicative.lift2(SemiApplicative);
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
export const liftPredicate = predicate => b => predicate(b) ? some(b) : none();
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
export const liftEither = f => (...a) => fromEither(f(...a));
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
export const contains = isEquivalent => dual(2, (self, a) => isNone(self) ? false : isEquivalent(self.value, a));
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
export const exists = /*#__PURE__*/dual(2, (self, predicate) => isNone(self) ? false : predicate(self.value));
// -------------------------------------------------------------------------------------
// math
// -------------------------------------------------------------------------------------
/**
 * @category math
 * @since 1.0.0
 */
export const sum = /*#__PURE__*/lift2(N.sum);
/**
 * @category math
 * @since 1.0.0
 */
export const multiply = /*#__PURE__*/lift2(N.multiply);
/**
 * @category math
 * @since 1.0.0
 */
export const subtract = /*#__PURE__*/lift2(N.subtract);
/**
 * @category math
 * @since 1.0.0
 */
export const divide = /*#__PURE__*/lift2(N.divide);
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
export const sumCompact = self => {
  let out = 0;
  for (const oa of self) {
    if (isSome(oa)) {
      out += oa.value;
    }
  }
  return out;
};
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
export const multiplyCompact = self => {
  let out = 1;
  for (const oa of self) {
    if (isSome(oa)) {
      const a = oa.value;
      if (a === 0) {
        return 0;
      }
      out *= a;
    }
  }
  return out;
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 1.0.0
 */
export const tupled = /*#__PURE__*/invariant.tupled(Invariant);
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
export const appendElement = /*#__PURE__*/semiProduct.appendElement(SemiProduct);
/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo = /*#__PURE__*/invariant.bindTo(Invariant);
const let_ = /*#__PURE__*/covariant.let(Covariant);
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
export const bind = /*#__PURE__*/chainable.bind(Chainable);
/**
 * @category do notation
 * @since 1.0.0
 */
export const Do = /*#__PURE__*/of_.Do(Of);
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind = /*#__PURE__*/semiProduct.andThenBind(SemiProduct);
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
export const gen = /*#__PURE__*/Gen.singleShot(Monad)( /*#__PURE__*/Gen.adapter());
//# sourceMappingURL=Option.mjs.map