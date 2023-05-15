"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zero = exports.weeks = exports.times = exports.sumAll = exports.sum = exports.subtract = exports.seconds = exports.minutes = exports.min = exports.millis = exports.max = exports.lessThanOrEqualTo = exports.lessThan = exports.isDuration = exports.infinity = exports.hours = exports.greaterThanOrEqualTo = exports.greaterThan = exports.equals = exports.days = exports.clamp = exports.between = exports.SemigroupSum = exports.SemigroupMin = exports.SemigroupMax = exports.Order = exports.MonoidSum = exports.MonoidMin = exports.MonoidMax = exports.Equivalence = exports.Bounded = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = /*#__PURE__*/Symbol.for("@effect/data/Duration");
/** @internal */
class DurationImpl {
  constructor(millis) {
    this.millis = millis;
    this._id = TypeId;
  }
  [Hash.symbol]() {
    return Hash.hash(this.millis);
  }
  [Equal.symbol](that) {
    return isDuration(that) && this.millis === that.millis;
  }
}
/**
 * @since 1.0.0
 * @category guards
 */
const isDuration = u => typeof u === "object" && u != null && "_id" in u && u["_id"] === TypeId;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.isDuration = isDuration;
const zero = /*#__PURE__*/new DurationImpl(0);
/**
 * @since 1.0.0
 * @category constructors
 */
exports.zero = zero;
const infinity = /*#__PURE__*/new DurationImpl(Infinity);
/**
 * @since 1.0.0
 * @category constructors
 */
exports.infinity = infinity;
const millis = millis => new DurationImpl(millis);
/**
 * @since 1.0.0
 * @category constructors
 */
exports.millis = millis;
const seconds = seconds => new DurationImpl(seconds * 1000);
/**
 * @since 1.0.0
 * @category constructors
 */
exports.seconds = seconds;
const minutes = minutes => new DurationImpl(minutes * 60000);
/**
 * @since 1.0.0
 * @category constructors
 */
exports.minutes = minutes;
const hours = hours => new DurationImpl(hours * 3600000);
/**
 * @since 1.0.0
 * @category constructors
 */
exports.hours = hours;
const days = days => new DurationImpl(days * 86400000);
/**
 * @since 1.0.0
 * @category constructors
 */
exports.days = days;
const weeks = weeks => new DurationImpl(weeks * 604800000);
/**
 * @category instances
 * @since 1.0.0
 */
exports.weeks = weeks;
const Order = {
  compare: (self, that) => self.millis < that.millis ? -1 : self.millis > that.millis ? 1 : 0
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.Order = Order;
const Bounded = {
  compare: Order.compare,
  maxBound: infinity,
  minBound: zero
};
/**
 * Checks if a `Duration` is between a `minimum` and `maximum` value.
 *
 * @category predicates
 * @since 1.0.0
 */
exports.Bounded = Bounded;
const between = /*#__PURE__*/order.between(Order);
/**
 * @category instances
 * @since 1.0.0
 */
exports.between = between;
const Equivalence = (self, that) => self.millis === that.millis;
/**
 * @category utils
 * @since 1.0.0
 */
exports.Equivalence = Equivalence;
const min = /*#__PURE__*/order.min(Order);
/**
 * @category utils
 * @since 1.0.0
 */
exports.min = min;
const max = /*#__PURE__*/order.max(Order);
/**
 * @category utils
 * @since 1.0.0
 */
exports.max = max;
const clamp = /*#__PURE__*/order.clamp(Order);
/**
 * @since 1.0.0
 * @category math
 */
exports.clamp = clamp;
const times = /*#__PURE__*/Dual.dual(2, (self, times) => new DurationImpl(self.millis * times));
/**
 * @since 1.0.0
 * @category math
 */
exports.times = times;
const sum = /*#__PURE__*/Dual.dual(2, (self, that) => new DurationImpl(self.millis + that.millis));
/**
 * @category instances
 * @since 1.0.0
 */
exports.sum = sum;
const SemigroupSum = /*#__PURE__*/semigroup.make(sum);
/**
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupSum = SemigroupSum;
const MonoidSum = /*#__PURE__*/monoid.fromSemigroup(SemigroupSum, zero);
/**
 * @category instances
 * @since 1.0.0
 */
exports.MonoidSum = MonoidSum;
const SemigroupMax = /*#__PURE__*/semigroup.make(max);
/**
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupMax = SemigroupMax;
const MonoidMax = /*#__PURE__*/monoid.fromSemigroup(SemigroupMax, zero);
/**
 * @category instances
 * @since 1.0.0
 */
exports.MonoidMax = MonoidMax;
const SemigroupMin = /*#__PURE__*/semigroup.make(min);
/**
 * @category instances
 * @since 1.0.0
 */
exports.SemigroupMin = SemigroupMin;
const MonoidMin = /*#__PURE__*/monoid.fromSemigroup(SemigroupMin, infinity);
/**
 * @category math
 * @since 1.0.15
 */
exports.MonoidMin = MonoidMin;
const sumAll = MonoidSum.combineAll;
/**
 * @since 1.0.0
 * @category math
 */
exports.sumAll = sumAll;
const subtract = /*#__PURE__*/Dual.dual(2, (self, that) => new DurationImpl(self.millis - that.millis));
/**
 * @since 1.0.0
 * @category predicates
 */
exports.subtract = subtract;
const lessThan = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis < that.millis);
/**
 * @since 1.0.0
 * @category predicates
 */
exports.lessThan = lessThan;
const lessThanOrEqualTo = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis <= that.millis);
/**
 * @since 1.0.0
 * @category predicates
 */
exports.lessThanOrEqualTo = lessThanOrEqualTo;
const greaterThan = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis > that.millis);
/**
 * @since 1.0.0
 * @category predicates
 */
exports.greaterThan = greaterThan;
const greaterThanOrEqualTo = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis >= that.millis);
/**
 * @since 1.0.0
 * @category predicates
 */
exports.greaterThanOrEqualTo = greaterThanOrEqualTo;
const equals = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis === that.millis);
exports.equals = equals;
//# sourceMappingURL=Duration.js.map