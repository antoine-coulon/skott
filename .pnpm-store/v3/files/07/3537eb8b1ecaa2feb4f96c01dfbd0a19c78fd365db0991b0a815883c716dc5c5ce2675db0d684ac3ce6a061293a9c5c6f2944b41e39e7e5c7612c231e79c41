"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tuple = exports.swap = exports.mapSecond = exports.mapFirst = exports.getSemigroup = exports.getSecond = exports.getOrder = exports.getMonoid = exports.getFirst = exports.getEquivalence = exports.bimap = exports.appendElement = exports.Bicovariant = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var bicovariant = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Bicovariant"));
var equivalence = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Equivalence"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * This module provides utility functions for working with tuples in TypeScript.
 *
 * @since 1.0.0
 */

/**
 * Constructs a new tuple from the provided values.
 *
 * @param elements - The list of elements to create the tuple from.
 *
 * @example
 * import { tuple } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(tuple(1, 'hello', true), [1, 'hello', true])
 *
 * @category constructors
 * @since 1.0.0
 */
const tuple = (...elements) => elements;
/**
 * Return the first element of a tuple.
 *
 * @param self - A tuple of length `2`.
 *
 * @example
 * import { getFirst } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(getFirst(["hello", 42]), "hello")
 *
 * @category getters
 * @since 1.0.0
 */
exports.tuple = tuple;
const getFirst = self => self[0];
/**
 * Return the second element of a tuple.
 *
 * @param self - A tuple of length `2`.
 *
 * @example
 * import { getSecond } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(getSecond(["hello", 42]), 42)
 *
 * @category getters
 * @since 1.0.0
 */
exports.getFirst = getFirst;
const getSecond = self => self[1];
/**
 * Transforms both elements of a tuple using the given functions.
 *
 * @param self - A tuple of length `2`.
 * @param f - The function to transform the first element of the tuple.
 * @param g - The function to transform the second element of the tuple.
 *
 * @example
 * import { bimap } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(
 *   bimap(["hello", 42], s => s.toUpperCase(), n => n.toString()),
 *   ["HELLO", "42"]
 * )
 *
 * @category mapping
 * @since 1.0.0
 */
exports.getSecond = getSecond;
const bimap = /*#__PURE__*/(0, _Function.dual)(3, (self, f, g) => [f(self[0]), g(self[1])]);
/**
 * @category instances
 * @since 1.0.0
 */
exports.bimap = bimap;
const Bicovariant = {
  bimap
};
/**
 * Transforms the first component of a tuple using a given function.
 *
 * @param self - A tuple of length `2`.
 * @param f - The function to transform the first element of the tuple.
 *
 * @example
 * import { mapFirst } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(
 *   mapFirst(["hello", 42], s => s.toUpperCase()),
 *   ["HELLO", 42]
 * )
 *
 * @category mapping
 * @since 1.0.0
 */
exports.Bicovariant = Bicovariant;
const mapFirst = /*#__PURE__*/bicovariant.mapLeft(Bicovariant);
/**
 * Transforms the second component of a tuple using a given function.
 *
 * @param self - A tuple of length `2`.
 * @param f - The function to transform the second element of the tuple.
 *
 * @example
 * import { mapSecond } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(
 *   mapSecond(["hello", 42], n => n.toString()),
 *   ["hello", "42"]
 * )
 *
 * @category mapping
 * @since 1.0.0
 */
exports.mapFirst = mapFirst;
const mapSecond = /*#__PURE__*/bicovariant.map(Bicovariant);
/**
 * Swaps the two elements of a tuple.
 *
 * @param self - A tuple of length `2`.
 *
 * @example
 * import { swap } from "@effect/data/Tuple"
 *
 * assert.deepStrictEqual(swap(["hello", 42]), [42, "hello"])
 *
 * @since 1.0.0
 */
exports.mapSecond = mapSecond;
const swap = self => [self[1], self[0]];
/**
 * Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
 * by applying each `Equivalence` to the corresponding element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
exports.swap = swap;
const getEquivalence = equivalence.tuple;
/**
 * This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
 * The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
 * It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
 * of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
exports.getEquivalence = getEquivalence;
const getOrder = order.tuple;
/**
 * This function creates and returns a new `Semigroup` for a tuple of values based on the given `Semigroup`s for each element in the tuple.
 * The returned `Semigroup` combines two tuples of the same type by applying the corresponding `Semigroup` passed as arguments to each element in the tuple.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
exports.getOrder = getOrder;
const getSemigroup = semigroup.tuple;
/**
 * This function creates and returns a new `Monoid` for a tuple of values based on the given `Monoid`s for each element in the tuple.
 * The returned `Monoid` combines two tuples of the same type by applying the corresponding `Monoid` passed as arguments to each element in the tuple.
 *
 * The `empty` value of the returned `Monoid` is the tuple of `empty` values of the input `Monoid`s.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
exports.getSemigroup = getSemigroup;
const getMonoid = monoid.tuple;
/**
 * Appends an element to the end of a tuple.
 *
 * @since 1.0.0
 */
exports.getMonoid = getMonoid;
const appendElement = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => [...self, that]);
/*

  TODO:

  - at
  - swap

*/
exports.appendElement = appendElement;
//# sourceMappingURL=Tuple.js.map