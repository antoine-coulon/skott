"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonoid = void 0;
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var semiApplicative = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/SemiApplicative"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Lift a `Monoid` into `F`, combining the inner values using the provided `Monoid`:
 *
 * - `combine` is provided by {@link semiApplicative.getSemigroup}.
 * - `empty` is `F.of(M.empty)`
 *
 * @param F - The `Applicative` instance for `F`.
 * @param M - The `Monoid` instance for `A`.
 *
 * @since 1.0.0
 */
const getMonoid = F => M => monoid.fromSemigroup(semiApplicative.getSemigroup(F)(M), F.of(M.empty));
exports.getMonoid = getMonoid;
//# sourceMappingURL=Applicative.js.map