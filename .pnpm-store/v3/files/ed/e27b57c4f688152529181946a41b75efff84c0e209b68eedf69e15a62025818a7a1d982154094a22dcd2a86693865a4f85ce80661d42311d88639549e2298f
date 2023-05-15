"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xor = exports.tupled = exports.tuple = exports.struct = exports.some = exports.or = exports.not = exports.nor = exports.nand = exports.isUnknown = exports.isUndefined = exports.isSymbol = exports.isString = exports.isRecord = exports.isReadonlyRecord = exports.isObject = exports.isNumber = exports.isNullable = exports.isNull = exports.isNotUndefined = exports.isNotNullable = exports.isNotNull = exports.isNever = exports.isFunction = exports.isError = exports.isDate = exports.isBoolean = exports.isBigint = exports.implies = exports.getSemigroupXor = exports.getSemigroupSome = exports.getSemigroupEvery = exports.getSemigroupEqv = exports.getMonoidXor = exports.getMonoidSome = exports.getMonoidEvery = exports.getMonoidEqv = exports.every = exports.eqv = exports.contramap = exports.compose = exports.bindTo = exports.appendElement = exports.andThenBind = exports.and = exports.SemiProduct = exports.Product = exports.Invariant = exports.Do = exports.Contravariant = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var readonlyArray = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/ReadonlyArray"));
var contravariant = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Contravariant"));
var invariant = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Invariant"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var of_ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Of"));
var product_ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Product"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
var semiProduct = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/SemiProduct"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

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
const contramap = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => b => self(f(b)));
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
exports.contramap = contramap;
const isString = input => typeof input === "string";
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
exports.isString = isString;
const isNumber = input => typeof input === "number";
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
exports.isNumber = isNumber;
const isBoolean = input => typeof input === "boolean";
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
exports.isBoolean = isBoolean;
const isBigint = input => typeof input === "bigint";
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
exports.isBigint = isBigint;
const isSymbol = input => typeof input === "symbol";
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
exports.isSymbol = isSymbol;
const isFunction = _Function.isFunction;
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
exports.isFunction = isFunction;
const isUndefined = input => input === undefined;
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
exports.isUndefined = isUndefined;
const isNotUndefined = input => input !== undefined;
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
exports.isNotUndefined = isNotUndefined;
const isNull = input => input === null;
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
exports.isNull = isNull;
const isNotNull = input => input !== null;
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
exports.isNotNull = isNotNull;
const isNever = _ => false;
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
exports.isNever = isNever;
const isUnknown = _ => true;
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
exports.isUnknown = isUnknown;
const isObject = input => typeof input === "object" && input != null;
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
exports.isObject = isObject;
const isNullable = input => input === null || input === undefined;
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
exports.isNullable = isNullable;
const isNotNullable = input => input !== null && input !== undefined;
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
exports.isNotNullable = isNotNullable;
const isError = input => input instanceof Error;
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
exports.isError = isError;
const isDate = input => input instanceof Date;
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
exports.isDate = isDate;
const isRecord = input => isObject(input) && !Array.isArray(input);
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
exports.isRecord = isRecord;
const isReadonlyRecord = isRecord;
/**
 * @since 1.0.0
 */
exports.isReadonlyRecord = isReadonlyRecord;
const compose = /*#__PURE__*/(0, _Function.dual)(2, (ab, bc) => a => ab(a) && bc(a));
exports.compose = compose;
const imap = /*#__PURE__*/contravariant.imap(contramap);
/**
 * @category instances
 * @since 1.0.0
 */
const Contravariant = {
  imap,
  contramap
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.Contravariant = Contravariant;
const Invariant = {
  imap
};
/**
 * @since 1.0.0
 */
exports.Invariant = Invariant;
const tupled = /*#__PURE__*/invariant.tupled(Invariant);
exports.tupled = tupled;
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
const SemiProduct = {
  imap,
  product,
  productMany
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.SemiProduct = SemiProduct;
const Product = {
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
exports.Product = Product;
const appendElement = /*#__PURE__*/semiProduct.appendElement(SemiProduct);
/**
 * Similar to `Promise.all` but operates on `Predicate`s.
 *
 * ```
 * [Predicate<A>, Predicate<B>, ...] -> Predicate<[A, B, ...]>
 * ```
 *
 * @since 1.0.0
 */
exports.appendElement = appendElement;
const tuple = /*#__PURE__*/product_.tuple(Product);
/**
 * @since 1.0.0
 */
exports.tuple = tuple;
const struct = /*#__PURE__*/product_.struct(Product);
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
exports.struct = struct;
const not = self => a => !self(a);
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
exports.not = not;
const or = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => a => self(a) || that(a));
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
exports.or = or;
const and = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => a => self(a) && that(a));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.and = and;
const xor = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => a => self(a) !== that(a));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.xor = xor;
const eqv = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => a => self(a) === that(a));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.eqv = eqv;
const implies = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => a => self(a) ? that(a) : true);
/**
 * @category combinators
 * @since 1.0.0
 */
exports.implies = implies;
const nor = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => a => !(self(a) || that(a)));
/**
 * @category combinators
 * @since 1.0.0
 */
exports.nor = nor;
const nand = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => a => !(self(a) && that(a)));
/**
 * @category instances
 * @since 1.0.0
 */
exports.nand = nand;
const getSemigroupEqv = () => semigroup.make(eqv);
/**
 * @category instances
 * @since 1.0.0
 */
exports.getSemigroupEqv = getSemigroupEqv;
const getMonoidEqv = () => monoid.fromSemigroup(getSemigroupEqv(), _Function.constTrue);
/**
 * @category instances
 * @since 1.0.0
 */
exports.getMonoidEqv = getMonoidEqv;
const getSemigroupXor = () => semigroup.make(xor);
/**
 * @category instances
 * @since 1.0.0
 */
exports.getSemigroupXor = getSemigroupXor;
const getMonoidXor = () => monoid.fromSemigroup(getSemigroupXor(), _Function.constFalse);
/**
 * @category instances
 * @since 1.0.0
 */
exports.getMonoidXor = getMonoidXor;
const getSemigroupSome = () => semigroup.make(or, (self, collection) => a => {
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
exports.getSemigroupSome = getSemigroupSome;
const getMonoidSome = () => monoid.fromSemigroup(getSemigroupSome(), _Function.constFalse);
/**
 * @category instances
 * @since 1.0.0
 */
exports.getMonoidSome = getMonoidSome;
const getSemigroupEvery = () => semigroup.make(and, (self, collection) => a => {
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
exports.getSemigroupEvery = getSemigroupEvery;
const getMonoidEvery = () => monoid.fromSemigroup(getSemigroupEvery(), _Function.constTrue);
/**
 * @since 1.0.0
 */
exports.getMonoidEvery = getMonoidEvery;
const every = collection => getMonoidEvery().combineAll(collection);
/**
 * @since 1.0.0
 */
exports.every = every;
const some = collection => getMonoidSome().combineAll(collection);
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 1.0.0
 */
exports.some = some;
const bindTo = /*#__PURE__*/invariant.bindTo(Invariant);
/**
 * @category do notation
 * @since 1.0.0
 */
exports.bindTo = bindTo;
const Do = /*#__PURE__*/of_.Do(Of);
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
exports.Do = Do;
const andThenBind = /*#__PURE__*/semiProduct.andThenBind(SemiProduct);
exports.andThenBind = andThenBind;
//# sourceMappingURL=Predicate.js.map