/**
 * @since 1.0.0
 */
import * as Equal from "@effect/data/Equal";
import { constNull, constUndefined, dual, identity } from "@effect/data/Function";
import * as Gen from "@effect/data/Gen";
import * as either from "@effect/data/internal/Either";
import * as option from "@effect/data/internal/Option";
import * as N from "@effect/data/Number";
import * as applicative from "@effect/data/typeclass/Applicative";
import * as bicovariant from "@effect/data/typeclass/Bicovariant";
import * as chainable from "@effect/data/typeclass/Chainable";
import * as covariant from "@effect/data/typeclass/Covariant";
import * as equivalence from "@effect/data/typeclass/Equivalence";
import * as flatMap_ from "@effect/data/typeclass/FlatMap";
import * as foldable from "@effect/data/typeclass/Foldable";
import * as invariant from "@effect/data/typeclass/Invariant";
import * as of_ from "@effect/data/typeclass/Of";
import * as product_ from "@effect/data/typeclass/Product";
import * as semiApplicative from "@effect/data/typeclass/SemiApplicative";
import * as semiCoproduct from "@effect/data/typeclass/SemiCoproduct";
import * as semigroup from "@effect/data/typeclass/Semigroup";
import * as semiProduct from "@effect/data/typeclass/SemiProduct";
import * as traversable from "@effect/data/typeclass/Traversable";
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 1.0.0
 */
export const right = either.right;
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 1.0.0
 */
export const left = either.left;
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
export const isEither = input => typeof input === "object" && input != null && "_tag" in input && (input["_tag"] === "Left" || input["_tag"] === "Right") && Equal.isEqual(input);
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
export const isLeft = either.isLeft;
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
export const isRight = either.isRight;
/**
 * Returns a `Refinement` from a `Either` returning function.
 * This function ensures that a `Refinement` definition is type-safe.
 *
 * @category conversions
 * @since 1.0.0
 */
export const toRefinement = f => a => isRight(f(a));
/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable = /*#__PURE__*/dual(2, (collection, onEmpty) => {
  for (const a of collection) {
    return right(a);
  }
  return left(onEmpty());
});
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
export const toOption = either.getRight;
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
export const getRight = toOption;
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
export const getLeft = either.getLeft;
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
export const fromOption = either.fromOption;
/**
 * @category equivalence
 * @since 1.0.0
 */
export const getEquivalence = (EE, EA) => equivalence.make((x, y) => x === y || (isLeft(x) ? isLeft(y) && EE(x.left, y.left) : isRight(y) && EA(x.right, y.right)));
/**
 * @category mapping
 * @since 1.0.0
 */
export const bimap = /*#__PURE__*/dual(3, (self, f, g) => isLeft(self) ? left(f(self.left)) : right(g(self.right)));
/**
 * @category instances
 * @since 1.0.0
 */
export const Bicovariant = {
  bimap
};
/**
 * Maps the `Left` side of an `Either` value to a new `Either` value.
 *
 * @param self - The input `Either` value to map.
 * @param f - A transformation function to apply to the `Left` value of the input `Either`.
 *
 * @category error handling
 * @since 1.0.0
 */
export const mapLeft = /*#__PURE__*/bicovariant.mapLeft(Bicovariant);
/**
 * Maps the `Right` side of an `Either` value to a new `Either` value.
 *
 * @param self - An `Either` to map
 * @param f - The function to map over the value of the `Either`
 *
 * @category mapping
 * @since 1.0.0
 */
export const map = /*#__PURE__*/dual(2, (self, f) => isRight(self) ? right(f(self.right)) : self);
const imap = /*#__PURE__*/covariant.imap(map);
/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant = {
  imap,
  map
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant = {
  imap
};
/**
 * @category mapping
 * @since 1.0.0
 */
export const flap = /*#__PURE__*/covariant.flap(Covariant);
/**
 * Maps the `Right` value of this `Either` to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as = /*#__PURE__*/covariant.as(Covariant);
/**
 * Maps the `Right` value of this `Either` to the `void` constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const asUnit = /*#__PURE__*/covariant.asUnit(Covariant);
const of = right;
const Of = {
  of
};
/**
 * @since 1.0.0
 */
export const unit = /*#__PURE__*/of_.unit(Of);
/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed = {
  of,
  imap,
  map
};
/**
 * @category combining
 * @since 1.0.0
 */
export const flatMap = /*#__PURE__*/dual(2, (self, f) => isLeft(self) ? self : f(self.right));
/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap = {
  flatMap
};
/**
 * @since 1.0.0
 */
export const flatten = /*#__PURE__*/flatMap_.flatten(FlatMap);
/**
 * @since 1.0.0
 */
export const andThen = /*#__PURE__*/flatMap_.andThen(FlatMap);
/**
 * @since 1.0.0
 */
export const composeK = /*#__PURE__*/flatMap_.composeK(FlatMap);
/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable = {
  imap,
  map,
  flatMap
};
/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combining
 * @since 1.0.0
 */
export const andThenDiscard = /*#__PURE__*/chainable.andThenDiscard(Chainable);
/**
 * @category instances
 * @since 1.0.0
 */
export const Monad = {
  imap,
  of,
  map,
  flatMap
};
const product = (self, that) => isRight(self) ? isRight(that) ? right([self.right, that.right]) : that : self;
const productMany = (self, collection) => {
  if (isLeft(self)) {
    return self;
  }
  const out = [self.right];
  for (const e of collection) {
    if (isLeft(e)) {
      return e;
    }
    out.push(e.right);
  }
  return right(out);
};
/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct = {
  imap,
  product,
  productMany
};
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
export const all = collection => {
  const out = [];
  for (const e of collection) {
    if (isLeft(e)) {
      return e;
    }
    out.push(e.right);
  }
  return right(out);
};
/**
 * @category instances
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
 * Similar to `Promise.all` but operates on `Either`s.
 *
 * ```
 * [Either<E1, A>, Either<E1, B>, ...] -> Either<E1 \| E2 \| ..., [A, B, ...]>
 * ```
 *
 * @since 1.0.0
 */
export const tuple = /*#__PURE__*/product_.tuple(Product);
/**
 * @since 1.0.0
 */
export const struct = /*#__PURE__*/product_.struct(Product);
/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative = {
  imap,
  map,
  product,
  productMany
};
/**
 * Lifts a binary function into `Either`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2 = /*#__PURE__*/semiApplicative.lift2(SemiApplicative);
/**
 * @category combining
 * @since 1.0.0
 */
export const zipWith = /*#__PURE__*/semiApplicative.zipWith(SemiApplicative);
/**
 * @since 1.0.0
 */
export const ap = /*#__PURE__*/semiApplicative.ap(SemiApplicative);
/**
 * @category instances
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
export const getFirstLeftSemigroup = /*#__PURE__*/semiApplicative.getSemigroup(SemiApplicative);
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
export const getFirstLeftMonoid = /*#__PURE__*/applicative.getMonoid(Applicative);
const coproduct = (self, that) => isRight(self) ? self : that;
const coproductMany = (self, collection) => {
  let out = self;
  if (isRight(out)) {
    return out;
  }
  for (out of collection) {
    if (isRight(out)) {
      return out;
    }
  }
  return out;
};
/**
 * @category instances
 * @since 1.0.0
 */
export const SemiCoproduct = {
  imap,
  coproduct,
  coproductMany
};
/**
 * @category error handling
 * @since 1.0.0
 */
export const firstRightOf = /*#__PURE__*/dual(2, coproductMany);
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
export const getFirstRightSemigroup = /*#__PURE__*/semiCoproduct.getSemigroup(SemiCoproduct);
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
export const getOrElse = /*#__PURE__*/dual(2, (self, onLeft) => isLeft(self) ? onLeft(self.left) : self.right);
/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElse = /*#__PURE__*/dual(2, (self, that) => isLeft(self) ? that(self.left) : self);
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseEither = /*#__PURE__*/dual(2, (self, that) => isLeft(self) ? map(that(self.left), right) : map(self, left));
/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * fails with the specified error.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseFail = /*#__PURE__*/dual(2, (self, onLeft) => orElse(self, () => left(onLeft())));
/**
 * @category instances
 * @since 1.0.0
 */
export const SemiAlternative = {
  map,
  imap,
  coproduct,
  coproductMany: firstRightOf
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable = {
  reduce: /*#__PURE__*/dual(3, (self, b, f) => isLeft(self) ? b : f(b, self.right))
};
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
export const toArray = /*#__PURE__*/foldable.toArray(Foldable);
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
export const match = /*#__PURE__*/dual(3, (self, onLeft, onRight) => isLeft(self) ? onLeft(self.left) : onRight(self.right));
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
export const fromNullable = /*#__PURE__*/dual(2, (a, onNullable) => a == null ? left(onNullable(a)) : right(a));
/**
 * @category interop
 * @since 1.0.0
 */
export const liftNullable = (f, onNullable) => (...a) => fromNullable(f(...a), () => onNullable(...a));
/**
 * @category interop
 * @since 1.0.0
 */
export const merge = /*#__PURE__*/match(identity, identity);
/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapNullable = /*#__PURE__*/dual(3, (self, f, onNullable) => flatMap(self, liftNullable(f, onNullable)));
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
export const getOrThrowWith = /*#__PURE__*/dual(2, (self, onLeft) => {
  if (isRight(self)) {
    return self.right;
  }
  throw onLeft(self.left);
});
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
export const getOrThrow = /*#__PURE__*/getOrThrowWith(() => new Error("getOrThrow called on a Left"));
/**
 * Lifts a function that may throw to one returning a `Either`.
 *
 * @category interop
 * @since 1.0.0
 */
export const liftThrowable = (f, onThrow) => (...a) => {
  try {
    return right(f(...a));
  } catch (e) {
    return left(onThrow(e));
  }
};
/**
 * @since 1.0.0
 */
export const reverse = self => isLeft(self) ? right(self.left) : left(self.right);
/**
 * @category filtering
 * @since 1.0.0
 */
export const filter = /*#__PURE__*/dual(3, (self, predicate, onFalse) => isLeft(self) ? self : predicate(self.right) ? self : left(onFalse()));
/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap = /*#__PURE__*/dual(3, (self, f, onNone) => flatMap(self, a => {
  const ob = f(a);
  return option.isNone(ob) ? left(onNone()) : right(ob.value);
}));
/**
 * @category filtering
 * @since 1.0.0
 */
export const compact = /*#__PURE__*/dual(2, (self, onNone) => filterMap(self, identity, onNone));
/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = F => dual(2, (self, f) => isLeft(self) ? F.of(self) : F.map(f(self.right), right));
/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable = {
  traverse
};
/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence = /*#__PURE__*/traversable.sequence(Traversable);
/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap = /*#__PURE__*/traversable.traverseTap(Traversable);
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tap = /*#__PURE__*/chainable.tap(Chainable);
/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectRight = /*#__PURE__*/dual(2, (self, onRight) => {
  if (isRight(self)) {
    onRight(self.right);
  }
  return self;
});
/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectLeft = /*#__PURE__*/dual(2, (self, onLeft) => {
  if (isLeft(self)) {
    onLeft(self.left);
  }
  return self;
});
/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const tapError = /*#__PURE__*/dual(2, (self, onLeft) => {
  if (isRight(self)) {
    return self;
  }
  const out = onLeft(self.left);
  return isLeft(out) ? out : self;
});
/**
 * @category getters
 * @since 1.0.0
 */
export const getOrNull = /*#__PURE__*/getOrElse(constNull);
/**
 * @category getters
 * @since 1.0.0
 */
export const getOrUndefined = /*#__PURE__*/getOrElse(constUndefined);
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
export const liftPredicate = (predicate, onFalse) => b => predicate(b) ? right(b) : left(onFalse(b));
/**
 * @category lifting
 * @since 1.0.0
 */
export const liftOption = (f, onNone) => (...a) => fromOption(() => onNone(...a))(f(...a));
/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapOption = /*#__PURE__*/dual(3, (self, f, onNone) => flatMap(self, liftOption(f, onNone)));
/**
 * Returns a function that checks if an `Either` contains a given value using a provided `equivalence` function.
 *
 * @since 1.0.0
 */
export const contains = isEquivalent => dual(2, (self, a) => isLeft(self) ? false : isEquivalent(self.right, a));
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
export const exists = /*#__PURE__*/dual(2, (self, predicate) => isLeft(self) ? false : predicate(self.right));
/**
 * Semigroup that models the combination of values that may be absent, elements that are `Left` are ignored
 * while elements that are `Right` are combined using the provided `Semigroup`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getOptionalSemigroup = S => semigroup.make((x, y) => isLeft(y) ? x : isLeft(x) ? y : right(S.combine(x.right, y.right)));
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
 * Return all the `Right` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const rights = self => {
  const out = [];
  for (const a of self) {
    if (isRight(a)) {
      out.push(a.right);
    }
  }
  return out;
};
/**
 * Return all the `Left` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const lefts = self => {
  const out = [];
  for (const a of self) {
    if (isLeft(a)) {
      out.push(a.left);
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
 * Appends an element to the end of a tuple.
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
export const Do = /*#__PURE__*/of_.Do(Of);
/**
 * @category do notation
 * @since 1.0.0
 */
export const bind = /*#__PURE__*/chainable.bind(Chainable);
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
export const andThenBind = /*#__PURE__*/semiProduct.andThenBind(SemiProduct);
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
export const gen = /*#__PURE__*/Gen.singleShot(Monad)( /*#__PURE__*/Gen.adapter());
//# sourceMappingURL=Either.mjs.map