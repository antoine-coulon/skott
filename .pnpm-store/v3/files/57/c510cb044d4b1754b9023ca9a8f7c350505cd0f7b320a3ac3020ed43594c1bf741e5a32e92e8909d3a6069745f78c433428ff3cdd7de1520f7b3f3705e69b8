"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverse = exports.number = exports.min = exports.max = exports.clamp = exports.between = void 0;
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * `Monoid` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
const min = B => monoid.fromSemigroup(semigroup.min(B), B.maxBound);
/**
 * `Monoid` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
exports.min = min;
const max = B => monoid.fromSemigroup(semigroup.max(B), B.minBound);
/**
 * @category instances
 * @since 1.0.0
 */
exports.max = max;
const number = {
  compare: order.number.compare,
  maxBound: Infinity,
  minBound: -Infinity
};
/**
 * Checks if a value is between the lower and upper limit of a bound.
 *
 * @category predicates
 * @since 1.0.0
 */
exports.number = number;
const between = B => order.between(B)(B.minBound, B.maxBound);
/**
 * Clamp a value between `minBound` and `maxBound` values.
 *
 * @category utils
 * @since 1.0.0
 */
exports.between = between;
const clamp = B => order.clamp(B)(B.minBound, B.maxBound);
/**
 * Reverses the `Order` of a `Bounded` and flips `maxBound` and `minBound` values.
 *
 * @category utils
 * @since 1.0.0
 */
exports.clamp = clamp;
const reverse = B => ({
  ...order.reverse(B),
  minBound: B.maxBound,
  maxBound: B.minBound
});
exports.reverse = reverse;
//# sourceMappingURL=Bounded.js.map