"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xor = exports.some = exports.or = exports.not = exports.nor = exports.nand = exports.match = exports.isBoolean = exports.implies = exports.every = exports.eqv = exports.and = exports.SemigroupXor = exports.SemigroupSome = exports.SemigroupEvery = exports.SemigroupEqv = exports.Order = exports.MonoidXor = exports.MonoidSome = exports.MonoidEvery = exports.MonoidEqv = exports.Equivalence = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var predicate = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Predicate"));
var equivalence = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Equivalence"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Tests if a value is a `boolean`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isBoolean } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(isBoolean(true), true)
 * assert.deepStrictEqual(isBoolean("true"), false)
 *
 * @category guards
 * @since 1.0.0
 */
const isBoolean = predicate.isBoolean;
/**
 * This function returns the result of either of the given functions depending on the value of the boolean parameter.
 * It is useful when you have to run one of two functions depending on the boolean value.
 *
 * @param value - the boolean value that decides which function will be executed.
 * @param onFalse - a lazy evaluation function that will be executed when the `value` is `false`.
 * @param onTrue - a lazy evaluation function that will be executed when the `value` is `true`.
 *
 * @example
 * import * as B from "@effect/data/Boolean"
 *
 * assert.deepStrictEqual(
 *  B.match(true, () => "It's false!", () => "It's true!"),
 *  "It's true!"
 * )
 *
 * @category pattern matching
 * @since 1.0.0
 */
exports.isBoolean = isBoolean;
const match = /*#__PURE__*/(0, _Function.dual)(3, (value, onFalse, onTrue) => value ? onTrue() : onFalse());
/**
 * @category instances
 * @since 1.0.0
 */
exports.match = match;
const Equivalence = equivalence.boolean;
/**
 * @category instances
 * @since 1.0.0
 */
exports.Equivalence = Equivalence;
const Order = order.boolean;
/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import { SemigroupEvery } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(SemigroupEvery.combine(true, true), true)
 * assert.deepStrictEqual(SemigroupEvery.combine(true, false), false)
 * assert.deepStrictEqual(SemigroupEvery.combine(false, true), false)
 * assert.deepStrictEqual(SemigroupEvery.combine(false, false), false)
 *
 * @category instances
 * @since 1.0.0
 */
exports.Order = Order;
const SemigroupEvery = semigroup.booleanEvery;
/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupSome } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(SemigroupSome.combine(true, true), true)
 * assert.deepStrictEqual(SemigroupSome.combine(true, false), true)
 * assert.deepStrictEqual(SemigroupSome.combine(false, true), true)
 * assert.deepStrictEqual(SemigroupSome.combine(false, false), false)
 *
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupEvery = SemigroupEvery;
const SemigroupSome = semigroup.booleanSome;
/**
 * `boolean` semigroup under exclusive disjunction.
 *
 * @example
 * import { SemigroupXor } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(SemigroupXor.combine(true, true), false)
 * assert.deepStrictEqual(SemigroupXor.combine(true, false), true)
 * assert.deepStrictEqual(SemigroupXor.combine(false, true), true)
 * assert.deepStrictEqual(SemigroupXor.combine(false, false), false)
 *
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupSome = SemigroupSome;
const SemigroupXor = semigroup.booleanXor;
/**
 * `boolean` semigroup under equivalence.
 *
 * @example
 * import { SemigroupEqv } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(SemigroupEqv.combine(true, true), true)
 * assert.deepStrictEqual(SemigroupEqv.combine(true, false), false)
 * assert.deepStrictEqual(SemigroupEqv.combine(false, true), false)
 * assert.deepStrictEqual(SemigroupEqv.combine(false, false), true)
 *
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupXor = SemigroupXor;
const SemigroupEqv = semigroup.booleanEqv;
/**
 * `boolean` monoid under conjunction, see also {@link SemigroupEvery}.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupEqv = SemigroupEqv;
const MonoidEvery = monoid.booleanEvery;
/**
 * `boolean` monoid under disjunction, see also {@link SemigroupSome}.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
exports.MonoidEvery = MonoidEvery;
const MonoidSome = monoid.booleanSome;
/**
 * `boolean` monoid under exclusive disjunction, see also {@link SemigroupXor}.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
exports.MonoidSome = MonoidSome;
const MonoidXor = monoid.booleanXor;
/**
 * `boolean` monoid under equivalence.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
exports.MonoidXor = MonoidXor;
const MonoidEqv = monoid.booleanEqv;
/**
 * Negates the given boolean: `!self`
 *
 * @example
 * import { not } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(not(true), false)
 * assert.deepStrictEqual(not(false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
exports.MonoidEqv = MonoidEqv;
const not = self => !self;
/**
 * Combines two boolean using AND: `self && that`.
 *
 * @example
 * import { and } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(and(true, true), true)
 * assert.deepStrictEqual(and(true, false), false)
 * assert.deepStrictEqual(and(false, true), false)
 * assert.deepStrictEqual(and(false, false), false)
 *
 * @category combinators
 * @since 1.0.0
 */
exports.not = not;
const and = /*#__PURE__*/(0, _Function.dual)(2, semigroup.booleanEvery.combine);
/**
 * Combines two boolean using NAND: `!(self && that)`.
 *
 * @example
 * import { nand } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(nand(true, true), false)
 * assert.deepStrictEqual(nand(true, false), true)
 * assert.deepStrictEqual(nand(false, true), true)
 * assert.deepStrictEqual(nand(false, false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
exports.and = and;
const nand = /*#__PURE__*/(0, _Function.dual)(2, /*#__PURE__*/(0, _Function.flow)(semigroup.booleanEvery.combine, not));
/**
 * Combines two boolean using OR: `self || that`.
 *
 * @example
 * import { or } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(or(true, true), true)
 * assert.deepStrictEqual(or(true, false), true)
 * assert.deepStrictEqual(or(false, true), true)
 * assert.deepStrictEqual(or(false, false), false)
 *
 * @category combinators
 * @since 1.0.0
 */
exports.nand = nand;
const or = /*#__PURE__*/(0, _Function.dual)(2, semigroup.booleanSome.combine);
/**
 * Combines two booleans using NOR: `!(self || that)`.
 *
 * @example
 * import { nor } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(nor(true, true), false)
 * assert.deepStrictEqual(nor(true, false), false)
 * assert.deepStrictEqual(nor(false, true), false)
 * assert.deepStrictEqual(nor(false, false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
exports.or = or;
const nor = /*#__PURE__*/(0, _Function.dual)(2, /*#__PURE__*/(0, _Function.flow)(semigroup.booleanSome.combine, not));
/**
 * Combines two booleans using XOR: `(!self && that) || (self && !that)`.
 *
 * @example
 * import { xor } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(xor(true, true), false)
 * assert.deepStrictEqual(xor(true, false), true)
 * assert.deepStrictEqual(xor(false, true), true)
 * assert.deepStrictEqual(xor(false, false), false)
 *
 * @category combinators
 * @since 1.0.0
 */
exports.nor = nor;
const xor = /*#__PURE__*/(0, _Function.dual)(2, semigroup.booleanXor.combine);
/**
 * Combines two booleans using EQV (aka XNOR): `!xor(self, that)`.
 *
 * @example
 * import { eqv } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(eqv(true, true), true)
 * assert.deepStrictEqual(eqv(true, false), false)
 * assert.deepStrictEqual(eqv(false, true), false)
 * assert.deepStrictEqual(eqv(false, false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
exports.xor = xor;
const eqv = /*#__PURE__*/(0, _Function.dual)(2, semigroup.booleanEqv.combine);
/**
 * Combines two booleans using an implication: `(!self || that)`.
 *
 * @example
 * import { implies } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(implies(true, true), true)
 * assert.deepStrictEqual(implies(true, false), false)
 * assert.deepStrictEqual(implies(false, true), true)
 * assert.deepStrictEqual(implies(false, false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
exports.eqv = eqv;
const implies = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => self ? that : true);
/**
 * This utility function is used to check if all the elements in a collection of boolean values are `true`.
 *
 * @param collection - An iterable collection of booleans.
 *
 * @example
 * import { every } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(every([true, true, true]), true)
 * assert.deepStrictEqual(every([true, false, true]), false)
 *
 * @since 1.0.0
 */
exports.implies = implies;
const every = MonoidEvery.combineAll;
/**
 * This utility function is used to check if at least one of the elements in a collection of boolean values is `true`.
 *
 * @param collection - An iterable collection of booleans.
 *
 * @example
 * import { some } from '@effect/data/Boolean'
 *
 * assert.deepStrictEqual(some([true, false, true]), true)
 * assert.deepStrictEqual(some([false, false, false]), false)
 *
 * @since 1.0.0
 */
exports.every = every;
const some = MonoidSome.combineAll;
exports.some = some;
//# sourceMappingURL=Boolean.js.map