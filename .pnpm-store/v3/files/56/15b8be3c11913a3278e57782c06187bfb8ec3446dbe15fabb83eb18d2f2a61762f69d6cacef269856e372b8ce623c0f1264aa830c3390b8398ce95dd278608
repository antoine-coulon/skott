/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Duration from "@effect/data/Duration";
import type * as Equal from "@effect/data/Equal";
import type * as HashSet from "@effect/data/HashSet";
import type * as MetricBoundaries from "@effect/io/Metric/Boundaries";
import type * as MetricKeyType from "@effect/io/Metric/KeyType";
import type * as MetricLabel from "@effect/io/Metric/Label";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const MetricKeyTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricKeyTypeId = typeof MetricKeyTypeId;
/**
 * A `MetricKey` is a unique key associated with each metric. The key is based
 * on a combination of the metric type, the name and tags associated with the
 * metric, and any other information to describe a metric, such as the
 * boundaries of a histogram. In this way, it is impossible to ever create
 * different metrics with conflicting keys.
 *
 * @since 1.0.0
 * @category models
 */
export interface MetricKey<Type extends MetricKeyType.MetricKeyType<any, any>> extends MetricKey.Variance<Type>, Equal.Equal {
    readonly name: string;
    readonly keyType: Type;
    readonly tags: HashSet.HashSet<MetricLabel.MetricLabel>;
}
/**
 * @since 1.0.0
 */
export declare namespace MetricKey {
    /**
     * @since 1.0.0
     * @category models
     */
    type Untyped = MetricKey<any>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Counter = MetricKey<MetricKeyType.MetricKeyType.Counter>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Gauge = MetricKey<MetricKeyType.MetricKeyType.Gauge>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Frequency = MetricKey<MetricKeyType.MetricKeyType.Frequency>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Histogram = MetricKey<MetricKeyType.MetricKeyType.Histogram>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Summary = MetricKey<MetricKeyType.MetricKeyType.Summary>;
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<Type> {
        readonly [MetricKeyTypeId]: {
            _Type: (_: never) => Type;
        };
    }
}
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isMetricKey: (u: unknown) => u is MetricKey<MetricKeyType.MetricKeyType<unknown, unknown>>;
/**
 * Creates a metric key for a counter, with the specified name.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const counter: (name: string) => MetricKey.Counter;
/**
 * Creates a metric key for a categorical frequency table, with the specified
 * name.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const frequency: (name: string) => MetricKey.Frequency;
/**
 * Creates a metric key for a gauge, with the specified name.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const gauge: (name: string) => MetricKey.Gauge;
/**
 * Creates a metric key for a histogram, with the specified name and boundaries.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const histogram: (name: string, boundaries: MetricBoundaries.MetricBoundaries) => MetricKey.Histogram;
/**
 * Creates a metric key for a summary, with the specified name, maxAge,
 * maxSize, error, and quantiles.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const summary: (name: string, maxAge: Duration.Duration, maxSize: number, error: number, quantiles: Chunk.Chunk<number>) => MetricKey.Summary;
/**
 * Returns a new `MetricKey` with the specified tag appended.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const tagged: {
    (key: string, value: string): <Type extends MetricKeyType.MetricKeyType<any, any>>(self: MetricKey<Type>) => MetricKey<Type>;
    <Type extends MetricKeyType.MetricKeyType<any, any>>(self: MetricKey<Type>, key: string, value: string): MetricKey<Type>;
};
/**
 * Returns a new `MetricKey` with the specified tags appended.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const taggedWithLabels: {
    (extraTags: Iterable<MetricLabel.MetricLabel>): <Type extends MetricKeyType.MetricKeyType<any, any>>(self: MetricKey<Type>) => MetricKey<Type>;
    <Type extends MetricKeyType.MetricKeyType<any, any>>(self: MetricKey<Type>, extraTags: Iterable<MetricLabel.MetricLabel>): MetricKey<Type>;
};
/**
 * Returns a new `MetricKey` with the specified tags appended.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const taggedWithLabelSet: {
    (extraTags: HashSet.HashSet<MetricLabel.MetricLabel>): <Type extends MetricKeyType.MetricKeyType<any, any>>(self: MetricKey<Type>) => MetricKey<Type>;
    <Type extends MetricKeyType.MetricKeyType<any, any>>(self: MetricKey<Type>, extraTags: HashSet.HashSet<MetricLabel.MetricLabel>): MetricKey<Type>;
};
//# sourceMappingURL=Key.d.ts.map