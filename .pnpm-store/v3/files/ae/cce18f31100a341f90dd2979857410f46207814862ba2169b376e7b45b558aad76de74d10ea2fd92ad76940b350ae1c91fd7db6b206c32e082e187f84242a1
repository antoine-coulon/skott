/**
 * @since 1.0.0
 */
import type * as Duration from "@effect/data/Duration";
import type * as Option from "@effect/data/Option";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const IntervalTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type IntervalTypeId = typeof IntervalTypeId;
/**
 * An `Interval` represents an interval of time. Intervals can encompass all
 * time, or no time at all.
 *
 * @since 1.0.0
 * @category models
 */
export interface Interval {
    readonly [IntervalTypeId]: IntervalTypeId;
    readonly startMillis: number;
    readonly endMillis: number;
}
/**
 * Constructs a new interval from the two specified endpoints. If the start
 * endpoint greater than the end endpoint, then a zero size interval will be
 * returned.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: (startMillis: number, endMillis: number) => Interval;
/**
 * An `Interval` of zero-width.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: Interval;
/**
 * Returns `true` if this `Interval` is less than `that` interval, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category ordering
 */
export declare const lessThan: {
    (that: Interval): (self: Interval) => boolean;
    (self: Interval, that: Interval): boolean;
};
/**
 * Returns the minimum of two `Interval`s.
 *
 * @since 1.0.0
 * @category ordering
 */
export declare const min: {
    (that: Interval): (self: Interval) => Interval;
    (self: Interval, that: Interval): Interval;
};
/**
 * Returns the maximum of two `Interval`s.
 *
 * @since 1.0.0
 * @category ordering
 */
export declare const max: {
    (that: Interval): (self: Interval) => Interval;
    (self: Interval, that: Interval): Interval;
};
/**
 * Returns `true` if the specified `Interval` is empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category ordering
 */
export declare const isEmpty: (self: Interval) => boolean;
/**
 * Returns `true` if the specified `Interval` is non-empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category ordering
 */
export declare const isNonEmpty: (self: Interval) => boolean;
/**
 * Computes a new `Interval` which is the intersection of this `Interval` and
 * that `Interval`.
 *
 * @since 1.0.0
 * @category ordering
 */
export declare const intersect: {
    (that: Interval): (self: Interval) => Interval;
    (self: Interval, that: Interval): Interval;
};
/**
 * Calculates the size of the `Interval` as the `Duration` from the start of the
 * interval to the end of the interval.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const size: (self: Interval) => Duration.Duration;
/**
 * Computes a new `Interval` which is the union of this `Interval` and that
 * `Interval` as a `Some`, otherwise returns `None` if the two intervals cannot
 * form a union.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const union: {
    (that: Interval): (self: Interval) => Option.Option<Interval>;
    (self: Interval, that: Interval): Option.Option<Interval>;
};
/**
 * Construct an `Interval` that includes all time equal to and after the
 * specified start time.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const after: (startMilliseconds: number) => Interval;
/**
 * Construct an `Interval` that includes all time equal to and before the
 * specified end time.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const before: (endMilliseconds: number) => Interval;
//# sourceMappingURL=Interval.d.ts.map