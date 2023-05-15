/**
 * @since 1.0.0
 */
import { constFalse, constTrue, dual, isFunction as isFunction_ } from "@effect/data/Function";
import * as readonlyArray from "@effect/data/internal/ReadonlyArray";
import * as contravariant from "@effect/data/typeclass/Contravariant";
import * as invariant from "@effect/data/typeclass/Invariant";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as of_ from "@effect/data/typeclass/Of";
import * as product_ from "@effect/data/typeclass/Product";
import * as semigroup from "@effect/data/typeclass/Semigroup";
import * as semiProduct from "@effect/data/typeclass/SemiProduct";
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
export const contramap = /*#__PURE__*/dual(2, (self, f) => b => self(f(b)));
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
export const isString = input => typeof input === "string";
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
export const isNumber = input => typeof input === "number";
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
export const isBoolean = input => typeof input === "boolean";
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
export const isBigint = input => typeof input === "bigint";
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
export const isSymbol = input => typeof input === "symbol";
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
export const isFunction = isFunction_;
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
export const isUndefined = input => input === undefined;
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
export const isNotUndefined = input => input !== undefined;
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
export const isNull = input => input === null;
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
export const isNotNull = input => input !== null;
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
export const isNever = _ => false;
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
export const isUnknown = _ => true;
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
export const isObject = input => typeof input === "object" && input != null;
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
export const isNullable = input => input === null || input === undefined;
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
export const isNotNullable = input => input !== null && input !== undefined;
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
export const isError = input => input instanceof Error;
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
export const isDate = input => input instanceof Date;
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
export const isRecord = input => isObject(input) && !Array.isArray(input);
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
export const isReadonlyRecord = isRecord;
/**
 * @since 1.0.0
 */
export const compose = /*#__PURE__*/dual(2, (ab, bc) => a => ab(a) && bc(a));
const imap = /*#__PURE__*/contravariant.imap(contramap);
/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant = {
  imap,
  contramap
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant = {
  imap
};
/**
 * @since 1.0.0
 */
export const tupled = /*#__PURE__*/invariant.tupled(Invariant);
const of = _ => isUnknown;
const Of = {
  of
};
const product = (self, that) => ([a, b]) => self(a) && that(b);
const productAll = collection => {
  const predicates = readonlyArray.fromIterable(collection);
  return as => {
    const len = Math.min(as.length, predicates.length);
    for (let i = 0; i < len; i++) {
      if (predicates[i](as[i]) === false) {
        return false;
      }
    }
    return true;
  };
};
const productMany = (self, collection) => {
  const rest = productAll(collection);
  return ([head, ...tail]) => self(head) === false ? false : rest(tail);
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
 * @category instances
 * @since 1.0.0
 */
export const Product = {
  of,
  imap,
  product,
  productMany,
  productAll
};
/**
 * This function appends a predicate to a tuple-like predicate, allowing you to create a new predicate that includes
 * the original elements and the new one.
 *
 * @param self - The tuple-like predicate to append to.
 * @param that - The predicate to append.
 *
 * @since 1.0.0
 */
export const appendElement = /*#__PURE__*/semiProduct.appendElement(SemiProduct);
/**
 * Similar to `Promise.all` but operates on `Predicate`s.
 *
 * ```
 * [Predicate<A>, Predicate<B>, ...] -> Predicate<[A, B, ...]>
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
export const not = self => a => !self(a);
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
export const or = /*#__PURE__*/dual(2, (self, that) => a => self(a) || that(a));
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
export const and = /*#__PURE__*/dual(2, (self, that) => a => self(a) && that(a));
/**
 * @category combinators
 * @since 1.0.0
 */
export const xor = /*#__PURE__*/dual(2, (self, that) => a => self(a) !== that(a));
/**
 * @category combinators
 * @since 1.0.0
 */
export const eqv = /*#__PURE__*/dual(2, (self, that) => a => self(a) === that(a));
/**
 * @category combinators
 * @since 1.0.0
 */
export const implies = /*#__PURE__*/dual(2, (self, that) => a => self(a) ? that(a) : true);
/**
 * @category combinators
 * @since 1.0.0
 */
export const nor = /*#__PURE__*/dual(2, (self, that) => a => !(self(a) || that(a)));
/**
 * @category combinators
 * @since 1.0.0
 */
export const nand = /*#__PURE__*/dual(2, (self, that) => a => !(self(a) && that(a)));
/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroupEqv = () => semigroup.make(eqv);
/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoidEqv = () => monoid.fromSemigroup(getSemigroupEqv(), constTrue);
/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroupXor = () => semigroup.make(xor);
/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoidXor = () => monoid.fromSemigroup(getSemigroupXor(), constFalse);
/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroupSome = () => semigroup.make(or, (self, collection) => a => {
  if (self(a)) {
    return true;
  }
  for (const p of collection) {
    if (p(a)) {
      return true;
    }
  }
  return false;
});
/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoidSome = () => monoid.fromSemigroup(getSemigroupSome(), constFalse);
/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroupEvery = () => semigroup.make(and, (self, collection) => a => {
  if (!self(a)) {
    return false;
  }
  for (const p of collection) {
    if (!p(a)) {
      return false;
    }
  }
  return true;
});
/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoidEvery = () => monoid.fromSemigroup(getSemigroupEvery(), constTrue);
/**
 * @since 1.0.0
 */
export const every = collection => getMonoidEvery().combineAll(collection);
/**
 * @since 1.0.0
 */
export const some = collection => getMonoidSome().combineAll(collection);
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo = /*#__PURE__*/invariant.bindTo(Invariant);
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
//# sourceMappingURL=Predicate.mjs.map