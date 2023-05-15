/**
 * @since 1.0.0
 */
import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as order from "@effect/data/typeclass/Order";
import * as semigroup from "@effect/data/typeclass/Semigroup";
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
export const isDuration = u => typeof u === "object" && u != null && "_id" in u && u["_id"] === TypeId;
/**
 * @since 1.0.0
 * @category constructors
 */
export const zero = /*#__PURE__*/new DurationImpl(0);
/**
 * @since 1.0.0
 * @category constructors
 */
export const infinity = /*#__PURE__*/new DurationImpl(Infinity);
/**
 * @since 1.0.0
 * @category constructors
 */
export const millis = millis => new DurationImpl(millis);
/**
 * @since 1.0.0
 * @category constructors
 */
export const seconds = seconds => new DurationImpl(seconds * 1000);
/**
 * @since 1.0.0
 * @category constructors
 */
export const minutes = minutes => new DurationImpl(minutes * 60000);
/**
 * @since 1.0.0
 * @category constructors
 */
export const hours = hours => new DurationImpl(hours * 3600000);
/**
 * @since 1.0.0
 * @category constructors
 */
export const days = days => new DurationImpl(days * 86400000);
/**
 * @since 1.0.0
 * @category constructors
 */
export const weeks = weeks => new DurationImpl(weeks * 604800000);
/**
 * @category instances
 * @since 1.0.0
 */
export const Order = {
  compare: (self, that) => self.millis < that.millis ? -1 : self.millis > that.millis ? 1 : 0
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Bounded = {
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
export const between = /*#__PURE__*/order.between(Order);
/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence = (self, that) => self.millis === that.millis;
/**
 * @category utils
 * @since 1.0.0
 */
export const min = /*#__PURE__*/order.min(Order);
/**
 * @category utils
 * @since 1.0.0
 */
export const max = /*#__PURE__*/order.max(Order);
/**
 * @category utils
 * @since 1.0.0
 */
export const clamp = /*#__PURE__*/order.clamp(Order);
/**
 * @since 1.0.0
 * @category math
 */
export const times = /*#__PURE__*/Dual.dual(2, (self, times) => new DurationImpl(self.millis * times));
/**
 * @since 1.0.0
 * @category math
 */
export const sum = /*#__PURE__*/Dual.dual(2, (self, that) => new DurationImpl(self.millis + that.millis));
/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupSum = /*#__PURE__*/semigroup.make(sum);
/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidSum = /*#__PURE__*/monoid.fromSemigroup(SemigroupSum, zero);
/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMax = /*#__PURE__*/semigroup.make(max);
/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMax = /*#__PURE__*/monoid.fromSemigroup(SemigroupMax, zero);
/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMin = /*#__PURE__*/semigroup.make(min);
/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMin = /*#__PURE__*/monoid.fromSemigroup(SemigroupMin, infinity);
/**
 * @category math
 * @since 1.0.15
 */
export const sumAll = MonoidSum.combineAll;
/**
 * @since 1.0.0
 * @category math
 */
export const subtract = /*#__PURE__*/Dual.dual(2, (self, that) => new DurationImpl(self.millis - that.millis));
/**
 * @since 1.0.0
 * @category predicates
 */
export const lessThan = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis < that.millis);
/**
 * @since 1.0.0
 * @category predicates
 */
export const lessThanOrEqualTo = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis <= that.millis);
/**
 * @since 1.0.0
 * @category predicates
 */
export const greaterThan = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis > that.millis);
/**
 * @since 1.0.0
 * @category predicates
 */
export const greaterThanOrEqualTo = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis >= that.millis);
/**
 * @since 1.0.0
 * @category predicates
 */
export const equals = /*#__PURE__*/Dual.dual(2, (self, that) => self.millis === that.millis);
//# sourceMappingURL=Duration.mjs.map