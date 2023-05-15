"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = exports.lift2 = exports.getSemigroup = exports.ap = exports.andThenDiscard = exports.andThen = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * Lift a `Semigroup` into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @category lifting
 * @since 1.0.0
 */
const getSemigroup = F => S => semigroup.make((self, that) => F.map(F.product(self, that), ([a1, a2]) => S.combine(a1, a2)), (self, collection) => F.map(F.productMany(self, collection), ([head, ...tail]) => S.combineMany(head, tail)));
/**
 * Zips two `F` values together using a provided function, returning a new `F` of the result.
 *
 * @param self - The left-hand side of the zip operation
 * @param that - The right-hand side of the zip operation
 * @param f - The function used to combine the values of the two `Option`s
 *
 * @since 1.0.0
 */
exports.getSemigroup = getSemigroup;
const zipWith = F => (0, _Function.dual)(3, (self, that, f) => F.map(F.product(self, that), ([a, b]) => f(a, b)));
/**
 * @since 1.0.0
 */
exports.zipWith = zipWith;
const ap = F => (0, _Function.dual)(2, (self, that) => zipWith(F)(self, that, (f, a) => f(a)));
/**
 * @since 1.0.0
 */
exports.ap = ap;
const andThenDiscard = F => (0, _Function.dual)(2, (self, that) => zipWith(F)(self, that, _Function.identity));
/**
 * @since 1.0.0
 */
exports.andThenDiscard = andThenDiscard;
const andThen = F => (0, _Function.dual)(2, (self, that) => zipWith(F)(self, that, _Function.SK));
/**
 * Lifts a binary function into `F`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
exports.andThen = andThen;
const lift2 = F => f => (0, _Function.dual)(2, (self, that) => zipWith(F)(self, that, f));
exports.lift2 = lift2;
//# sourceMappingURL=SemiApplicative.js.map