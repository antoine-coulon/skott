"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverse = exports.match = exports.Semigroup = exports.Monoid = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Inverts the ordering of the input `Ordering`.
 *
 * @param o - The input `Ordering`.
 *
 * @example
 * import { reverse } from "@effect/data/Ordering"
 *
 * assert.deepStrictEqual(reverse(1), -1)
 * assert.deepStrictEqual(reverse(-1), 1)
 * assert.deepStrictEqual(reverse(0), 0)
 *
 * @since 1.0.0
 */
const reverse = o => o === -1 ? 1 : o === 1 ? -1 : 0;
/**
 * Depending on the `Ordering` parameter given to it, returns a value produced by one of the 3 functions provided as parameters.
 *
 * @param self - The `Ordering` parameter to match against.
 * @param onLessThan - A function that will be called if the `Ordering` parameter is `-1`.
 * @param onEqual - A function that will be called if the `Ordering` parameter is `0`.
 * @param onGreaterThan - A function that will be called if the `Ordering` parameter is `1`.
 *
 * @example
 * import { match } from "@effect/data/Ordering"
 * import { constant } from "@effect/data/Function"
 *
 * const toMessage = match(
 *   constant('less than'),
 *   constant('equal'),
 *   constant('greater than')
 * )
 *
 * assert.deepStrictEqual(toMessage(-1), "less than")
 * assert.deepStrictEqual(toMessage(0), "equal")
 * assert.deepStrictEqual(toMessage(1), "greater than")
 *
 * @category pattern matching
 * @since 1.0.0
 */
exports.reverse = reverse;
const match = /*#__PURE__*/(0, _Function.dual)(4, (self, onLessThan, onEqual, onGreaterThan) => self === -1 ? onLessThan() : self === 0 ? onEqual() : onGreaterThan());
/**
 * `Semigroup` instance for `Ordering`, returns the left-most non-zero `Ordering`.
 *
 * @example
 * import { Semigroup } from "@effect/data/Ordering"
 *
 * assert.deepStrictEqual(Semigroup.combine(0, -1), -1)
 * assert.deepStrictEqual(Semigroup.combine(0, 1), 1)
 * assert.deepStrictEqual(Semigroup.combine(1, -1), 1)
 *
 * @category instances
 * @since 1.0.0
 */
exports.match = match;
const Semigroup = /*#__PURE__*/semigroup.make((self, that) => self !== 0 ? self : that, (self, collection) => {
  let ordering = self;
  if (ordering !== 0) {
    return ordering;
  }
  for (ordering of collection) {
    if (ordering !== 0) {
      return ordering;
    }
  }
  return ordering;
});
/**
 * `Monoid` instance for `Ordering`, returns the left-most non-zero `Ordering`.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { Monoid } from "@effect/data/Ordering"
 *
 * assert.deepStrictEqual(Monoid.combine(Monoid.empty, -1), -1)
 * assert.deepStrictEqual(Monoid.combine(Monoid.empty, 1), 1)
 * assert.deepStrictEqual(Monoid.combine(1, -1), 1)
 *
 * @category instances
 * @since 1.0.0
 */
exports.Semigroup = Semigroup;
const Monoid = /*#__PURE__*/monoid.fromSemigroup(Semigroup, 0);
exports.Monoid = Monoid;
//# sourceMappingURL=Ordering.js.map