/**
 * @since 1.0.0
 */
import * as Equal from "@effect/data/Equal"
import * as Dual from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"
import type * as bounded from "@effect/data/typeclass/Bounded"
import type * as equivalence from "@effect/data/typeclass/Equivalence"
import * as monoid from "@effect/data/typeclass/Monoid"
import * as order from "@effect/data/typeclass/Order"
import * as semigroup from "@effect/data/typeclass/Semigroup"

const TypeId: unique symbol = Symbol.for("@effect/data/Duration")

/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface Duration {
  readonly _id: TypeId
  readonly millis: number
}

/** @internal */
class DurationImpl implements Equal.Equal {
  readonly _id: TypeId = TypeId
  constructor(readonly millis: number) {}
  [Hash.symbol](): number {
    return Hash.hash(this.millis)
  }
  [Equal.symbol](that: unknown): boolean {
    return isDuration(that) && this.millis === that.millis
  }
}

/**
 * @since 1.0.0
 * @category guards
 */
export const isDuration = (u: unknown): u is Duration =>
  typeof u === "object" && u != null && "_id" in u && u["_id"] === TypeId

/**
 * @since 1.0.0
 * @category constructors
 */
export const zero: Duration = new DurationImpl(0)

/**
 * @since 1.0.0
 * @category constructors
 */
export const infinity: Duration = new DurationImpl(Infinity)

/**
 * @since 1.0.0
 * @category constructors
 */
export const millis = (millis: number): Duration => new DurationImpl(millis)

/**
 * @since 1.0.0
 * @category constructors
 */
export const seconds = (seconds: number): Duration => new DurationImpl(seconds * 1000)

/**
 * @since 1.0.0
 * @category constructors
 */
export const minutes = (minutes: number): Duration => new DurationImpl(minutes * 60_000)

/**
 * @since 1.0.0
 * @category constructors
 */
export const hours = (hours: number): Duration => new DurationImpl(hours * 3_600_000)

/**
 * @since 1.0.0
 * @category constructors
 */
export const days = (days: number): Duration => new DurationImpl(days * 86_400_000)

/**
 * @since 1.0.0
 * @category constructors
 */
export const weeks = (weeks: number): Duration => new DurationImpl(weeks * 604_800_000)

/**
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<Duration> = {
  compare: (self, that) => (self.millis < that.millis ? -1 : self.millis > that.millis ? 1 : 0)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Bounded: bounded.Bounded<Duration> = {
  compare: Order.compare,
  maxBound: infinity,
  minBound: zero
}

/**
 * Checks if a `Duration` is between a `minimum` and `maximum` value.
 *
 * @category predicates
 * @since 1.0.0
 */
export const between: {
  (minimum: Duration, maximum: Duration): (self: Duration) => boolean
  (self: Duration, minimum: Duration, maximum: Duration): boolean
} = order.between(Order)

/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence: equivalence.Equivalence<Duration> = (self, that) => self.millis === that.millis

/**
 * @category utils
 * @since 1.0.0
 */
export const min: {
  (that: Duration): (self: Duration) => Duration
  (self: Duration, that: Duration): Duration
} = order.min(Order)

/**
 * @category utils
 * @since 1.0.0
 */
export const max: {
  (that: Duration): (self: Duration) => Duration
  (self: Duration, that: Duration): Duration
} = order.max(Order)

/**
 * @category utils
 * @since 1.0.0
 */
export const clamp: {
  (minimum: Duration, maximum: Duration): (self: Duration) => Duration
  (self: Duration, minimum: Duration, maximum: Duration): Duration
} = order.clamp(Order)

/**
 * @since 1.0.0
 * @category math
 */
export const times: {
  (times: number): (self: Duration) => Duration
  (self: Duration, times: number): Duration
} = Dual.dual<
  (times: number) => (self: Duration) => Duration,
  (self: Duration, times: number) => Duration
>(2, (self, times) => new DurationImpl(self.millis * times))

/**
 * @since 1.0.0
 * @category math
 */
export const sum: {
  (that: Duration): (self: Duration) => Duration
  (self: Duration, that: Duration): Duration
} = Dual.dual<
  (that: Duration) => (self: Duration) => Duration,
  (self: Duration, that: Duration) => Duration
>(2, (self, that) => new DurationImpl(self.millis + that.millis))

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupSum: semigroup.Semigroup<Duration> = semigroup.make(sum)

/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidSum: monoid.Monoid<Duration> = monoid.fromSemigroup(SemigroupSum, zero)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMax: semigroup.Semigroup<Duration> = semigroup.make(max)

/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMax: monoid.Monoid<Duration> = monoid.fromSemigroup(SemigroupMax, zero)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMin: semigroup.Semigroup<Duration> = semigroup.make(min)

/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMin: monoid.Monoid<Duration> = monoid.fromSemigroup(SemigroupMin, infinity)

/**
 * @category math
 * @since 1.0.15
 */
export const sumAll: (collection: Iterable<Duration>) => Duration = MonoidSum.combineAll

/**
 * @since 1.0.0
 * @category math
 */
export const subtract: {
  (that: Duration): (self: Duration) => Duration
  (self: Duration, that: Duration): Duration
} = Dual.dual<
  (that: Duration) => (self: Duration) => Duration,
  (self: Duration, that: Duration) => Duration
>(2, (self, that) => new DurationImpl(self.millis - that.millis))

/**
 * @since 1.0.0
 * @category predicates
 */
export const lessThan: {
  (that: Duration): (self: Duration) => boolean
  (self: Duration, that: Duration): boolean
} = Dual.dual<
  (that: Duration) => (self: Duration) => boolean,
  (self: Duration, that: Duration) => boolean
>(2, (self, that) => self.millis < that.millis)

/**
 * @since 1.0.0
 * @category predicates
 */
export const lessThanOrEqualTo: {
  (self: Duration, that: Duration): boolean
  (that: Duration): (self: Duration) => boolean
} = Dual.dual<
  (that: Duration) => (self: Duration) => boolean,
  (self: Duration, that: Duration) => boolean
>(2, (self, that) => self.millis <= that.millis)

/**
 * @since 1.0.0
 * @category predicates
 */
export const greaterThan: {
  (that: Duration): (self: Duration) => boolean
  (self: Duration, that: Duration): boolean
} = Dual.dual<
  (that: Duration) => (self: Duration) => boolean,
  (self: Duration, that: Duration) => boolean
>(2, (self, that) => self.millis > that.millis)

/**
 * @since 1.0.0
 * @category predicates
 */
export const greaterThanOrEqualTo: {
  (self: Duration, that: Duration): boolean
  (that: Duration): (self: Duration) => boolean
} = Dual.dual<
  (that: Duration) => (self: Duration) => boolean,
  (self: Duration, that: Duration) => boolean
>(2, (self, that) => self.millis >= that.millis)

/**
 * @since 1.0.0
 * @category predicates
 */
export const equals: {
  (that: Duration): (self: Duration) => boolean
  (self: Duration, that: Duration): boolean
} = Dual.dual<
  (that: Duration) => (self: Duration) => boolean,
  (self: Duration, that: Duration) => boolean
>(2, (self, that) => self.millis === that.millis)
