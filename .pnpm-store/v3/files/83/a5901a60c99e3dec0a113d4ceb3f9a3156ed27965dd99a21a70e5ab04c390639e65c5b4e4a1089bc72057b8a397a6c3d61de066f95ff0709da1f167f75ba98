import type * as bounded from "@effect/data/typeclass/Bounded";
import type * as equivalence from "@effect/data/typeclass/Equivalence";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as order from "@effect/data/typeclass/Order";
import * as semigroup from "@effect/data/typeclass/Semigroup";
declare const TypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface Duration {
    readonly _id: TypeId;
    readonly millis: number;
}
/**
 * @since 1.0.0
 * @category guards
 */
export declare const isDuration: (u: unknown) => u is Duration;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const zero: Duration;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const infinity: Duration;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const millis: (millis: number) => Duration;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const seconds: (seconds: number) => Duration;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const minutes: (minutes: number) => Duration;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const hours: (hours: number) => Duration;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const days: (days: number) => Duration;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const weeks: (weeks: number) => Duration;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Order: order.Order<Duration>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Bounded: bounded.Bounded<Duration>;
/**
 * Checks if a `Duration` is between a `minimum` and `maximum` value.
 *
 * @category predicates
 * @since 1.0.0
 */
export declare const between: {
    (minimum: Duration, maximum: Duration): (self: Duration) => boolean;
    (self: Duration, minimum: Duration, maximum: Duration): boolean;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Equivalence: equivalence.Equivalence<Duration>;
/**
 * @category utils
 * @since 1.0.0
 */
export declare const min: {
    (that: Duration): (self: Duration) => Duration;
    (self: Duration, that: Duration): Duration;
};
/**
 * @category utils
 * @since 1.0.0
 */
export declare const max: {
    (that: Duration): (self: Duration) => Duration;
    (self: Duration, that: Duration): Duration;
};
/**
 * @category utils
 * @since 1.0.0
 */
export declare const clamp: {
    (minimum: Duration, maximum: Duration): (self: Duration) => Duration;
    (self: Duration, minimum: Duration, maximum: Duration): Duration;
};
/**
 * @since 1.0.0
 * @category math
 */
export declare const times: {
    (times: number): (self: Duration) => Duration;
    (self: Duration, times: number): Duration;
};
/**
 * @since 1.0.0
 * @category math
 */
export declare const sum: {
    (that: Duration): (self: Duration) => Duration;
    (self: Duration, that: Duration): Duration;
};
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemigroupSum: semigroup.Semigroup<Duration>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const MonoidSum: monoid.Monoid<Duration>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemigroupMax: semigroup.Semigroup<Duration>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const MonoidMax: monoid.Monoid<Duration>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemigroupMin: semigroup.Semigroup<Duration>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const MonoidMin: monoid.Monoid<Duration>;
/**
 * @category math
 * @since 1.0.15
 */
export declare const sumAll: (collection: Iterable<Duration>) => Duration;
/**
 * @since 1.0.0
 * @category math
 */
export declare const subtract: {
    (that: Duration): (self: Duration) => Duration;
    (self: Duration, that: Duration): Duration;
};
/**
 * @since 1.0.0
 * @category predicates
 */
export declare const lessThan: {
    (that: Duration): (self: Duration) => boolean;
    (self: Duration, that: Duration): boolean;
};
/**
 * @since 1.0.0
 * @category predicates
 */
export declare const lessThanOrEqualTo: {
    (self: Duration, that: Duration): boolean;
    (that: Duration): (self: Duration) => boolean;
};
/**
 * @since 1.0.0
 * @category predicates
 */
export declare const greaterThan: {
    (that: Duration): (self: Duration) => boolean;
    (self: Duration, that: Duration): boolean;
};
/**
 * @since 1.0.0
 * @category predicates
 */
export declare const greaterThanOrEqualTo: {
    (self: Duration, that: Duration): boolean;
    (that: Duration): (self: Duration) => boolean;
};
/**
 * @since 1.0.0
 * @category predicates
 */
export declare const equals: {
    (that: Duration): (self: Duration) => boolean;
    (self: Duration, that: Duration): boolean;
};
export {};
//# sourceMappingURL=Duration.d.ts.map