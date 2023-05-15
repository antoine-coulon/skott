"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pick = exports.omit = exports.getSemigroup = exports.getOrder = exports.getMonoid = exports.getEquivalence = void 0;
var equivalence = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Equivalence"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * This module provides utility functions for working with structs in TypeScript.
 *
 * @since 1.0.0
 */

/**
 * Create a new object by picking properties of an existing object.
 *
 * @example
 * import { pick } from "@effect/data/Struct"
 * import { pipe } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(pipe({ a: "a", b: 1, c: true }, pick("a", "b")), { a: "a", b: 1 })
 *
 * @since 1.0.0
 */
const pick = (...keys) => s => {
  const out = {};
  for (const k of keys) {
    out[k] = s[k];
  }
  return out;
};
/**
 * Create a new object by omitting properties of an existing object.
 *
 * @example
 * import { omit } from "@effect/data/Struct"
 * import { pipe } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(pipe({ a: "a", b: 1, c: true }, omit("c")), { a: "a", b: 1 })
 *
 * @since 1.0.0
 */
exports.pick = pick;
const omit = (...keys) => s => {
  const out = {
    ...s
  };
  for (const k of keys) {
    delete out[k];
  }
  return out;
};
/**
 * Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
 * by applying each `Equivalence` to the corresponding property of the struct.
 *
 * Alias of {@link equivalence.struct}.
 *
 * @example
 * import { getEquivalence } from "@effect/data/Struct"
 * import * as S from "@effect/data/String"
 * import * as N from "@effect/data/Number"
 *
 * const PersonEquivalence = getEquivalence({
 *   name: S.Equivalence,
 *   age: N.Equivalence
 * })
 *
 * assert.deepStrictEqual(
 *   PersonEquivalence({ name: "John", age: 25 }, { name: "John", age: 25 }),
 *   true
 * )
 * assert.deepStrictEqual(
 *   PersonEquivalence({ name: "John", age: 25 }, { name: "John", age: 40 }),
 *   false
 * )
 *
 * @category combinators
 * @since 1.0.0
 */
exports.omit = omit;
const getEquivalence = equivalence.struct;
/**
 * This function creates and returns a new `Order` for a struct of values based on the given `Order`s
 * for each property in the struct.
 *
 * Alias of {@link order.struct}.
 *
 * @category combinators
 * @since 1.0.0
 */
exports.getEquivalence = getEquivalence;
const getOrder = order.struct;
/**
 * This function creates and returns a new `Semigroup` for a struct of values based on the given `Semigroup`s for each property in the struct.
 * The returned `Semigroup` combines two structs of the same type by applying the corresponding `Semigroup` passed as arguments to each property in the struct.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * See also {@link getMonoid}.
 *
 * @example
 * import { getSemigroup } from "@effect/data/Struct"
 * import * as Semigroup from "@effect/data/typeclass/Semigroup"
 * import * as O from "@effect/data/Option"
 *
 * const PersonSemigroup = getSemigroup({
 *   name: Semigroup.last<string>(),
 *   age: O.getOptionalMonoid(Semigroup.last<number>())
 * })
 *
 * assert.deepStrictEqual(
 *   PersonSemigroup.combine({ name: "John", age: O.none() }, { name: "John", age: O.some(25) }),
 *   { name: "John", age: O.some(25) }
 * )
 * assert.deepStrictEqual(
 *   PersonSemigroup.combine({ name: "John", age: O.some(25) }, { name: "John", age: O.none() }),
 *   { name: "John", age: O.some(25) }
 * )
 *
 * @category combinators
 * @since 1.0.0
 */
exports.getOrder = getOrder;
const getSemigroup = semigroup.struct;
/**
 * This function creates and returns a new `Monoid` for a struct of values based on the given `Monoid`s for each property in the struct.
 * The returned `Monoid` combines two structs of the same type by applying the corresponding `Monoid` passed as arguments to each property in the struct.
 *
 * The `empty` value of the returned `Monoid` is a struct where each property is the `empty` value of the corresponding `Monoid` in the input `monoids` object.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * See also {@link getSemigroup}.
 *
 * @category combinators
 * @since 1.0.0
 */
exports.getSemigroup = getSemigroup;
const getMonoid = monoid.struct;
exports.getMonoid = getMonoid;
//# sourceMappingURL=Struct.js.map