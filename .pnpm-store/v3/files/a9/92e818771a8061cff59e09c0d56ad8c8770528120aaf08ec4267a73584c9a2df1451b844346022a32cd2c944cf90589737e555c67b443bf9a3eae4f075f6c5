/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Effect from "@effect/io/Effect";
import type * as Fiber from "@effect/io/Fiber";
import type * as Metric from "@effect/io/Metric";
import type * as Schedule from "@effect/io/Schedule";
import type * as Scope from "@effect/io/Scope";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const PollingMetricTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type PollingMetricTypeId = typeof PollingMetricTypeId;
/**
 * A `PollingMetric` is a combination of a metric and an effect that polls for
 * updates to the metric.
 *
 * @since 1.0.0
 * @category models
 */
export interface PollingMetric<Type, In, R, E, Out> {
    readonly [PollingMetricTypeId]: PollingMetricTypeId;
    /**
     * The metric that this `PollingMetric` polls to update.
     */
    readonly metric: Metric.Metric<Type, In, Out>;
    /**
     * An effect that polls a value that may be fed to the metric.
     */
    poll(): Effect.Effect<R, E, In>;
}
/**
 * Constructs a new polling metric from a metric and poll effect.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <Type, In, Out, R, E>(metric: Metric.Metric<Type, In, Out>, poll: Effect.Effect<R, E, In>) => PollingMetric<Type, In, R, E, Out>;
/**
 * Collects all of the polling metrics into a single polling metric, which
 * polls for, updates, and produces the outputs of all individual metrics.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const collectAll: <R, E, Out>(iterable: Iterable<PollingMetric<any, any, R, E, Out>>) => PollingMetric<Chunk.Chunk<any>, Chunk.Chunk<any>, R, E, Chunk.Chunk<Out>>;
/**
 * Returns an effect that will launch the polling metric in a background
 * fiber, using the specified schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const launch: {
    <R2, A2>(schedule: Schedule.Schedule<R2, unknown, A2>): <Type, In, R, E, Out>(self: PollingMetric<Type, In, R, E, Out>) => Effect.Effect<R2 | R | Scope.Scope, never, Fiber.Fiber<E, A2>>;
    <Type, In, R, E, Out, R2, A2>(self: PollingMetric<Type, In, R, E, Out>, schedule: Schedule.Schedule<R2, unknown, A2>): Effect.Effect<Scope.Scope | R | R2, never, Fiber.Fiber<E, A2>>;
};
/**
 * An effect that polls a value that may be fed to the metric.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const poll: <Type, In, R, E, Out>(self: PollingMetric<Type, In, R, E, Out>) => Effect.Effect<R, E, In>;
/**
 * An effect that polls for a value and uses the value to update the metric.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const pollAndUpdate: <Type, In, R, E, Out>(self: PollingMetric<Type, In, R, E, Out>) => Effect.Effect<R, E, void>;
/**
 * Returns a new polling metric whose poll function will be retried with the
 * specified retry policy.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const retry: {
    <R2, E, _>(policy: Schedule.Schedule<R2, E, _>): <Type, In, R, Out>(self: PollingMetric<Type, In, R, E, Out>) => PollingMetric<Type, In, R2 | R, E, Out>;
    <Type, In, R, Out, R2, E, _>(self: PollingMetric<Type, In, R, E, Out>, policy: Schedule.Schedule<R2, E, _>): PollingMetric<Type, In, R | R2, E, Out>;
};
/**
 * Zips this polling metric with the specified polling metric.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const zip: {
    <Type2, In2, R2, E2, Out2>(that: PollingMetric<Type2, In2, R2, E2, Out2>): <Type, In, R, E, Out>(self: PollingMetric<Type, In, R, E, Out>) => PollingMetric<readonly [Type, Type2], readonly [In, In2], R2 | R, E2 | E, readonly [Out, Out2]>;
    <Type, In, R, E, Out, Type2, In2, R2, E2, Out2>(self: PollingMetric<Type, In, R, E, Out>, that: PollingMetric<Type2, In2, R2, E2, Out2>): PollingMetric<readonly [Type, Type2], readonly [In, In2], R | R2, E | E2, readonly [Out, Out2]>;
};
//# sourceMappingURL=Polling.d.ts.map