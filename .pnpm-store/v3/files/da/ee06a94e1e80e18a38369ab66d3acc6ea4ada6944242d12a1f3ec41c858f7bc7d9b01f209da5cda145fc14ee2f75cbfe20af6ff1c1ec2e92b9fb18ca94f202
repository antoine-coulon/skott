import type * as Chunk from "@effect/data/Chunk";
import type * as Duration from "@effect/data/Duration";
import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
import type * as MetricBoundaries from "@effect/io/Metric/Boundaries";
import type * as MetricKeyType from "@effect/io/Metric/KeyType";
/**
 * @category model
 * @since 1.0.0
 */
export declare class HistogramKeyType implements MetricKeyType.MetricKeyType.Histogram {
    readonly boundaries: MetricBoundaries.MetricBoundaries;
    readonly [MetricKeyTypeTypeId]: {
        _In: (_: unknown) => unknown;
        _Out: (_: never) => never;
    };
    readonly [HistogramKeyTypeTypeId]: MetricKeyType.HistogramKeyTypeTypeId;
    constructor(boundaries: MetricBoundaries.MetricBoundaries);
    [Hash.symbol](): number;
    [Equal.symbol](that: unknown): boolean;
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const counter: MetricKeyType.MetricKeyType.Counter;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const frequency: MetricKeyType.MetricKeyType.Frequency;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const gauge: MetricKeyType.MetricKeyType.Gauge;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const histogram: (boundaries: MetricBoundaries.MetricBoundaries) => MetricKeyType.MetricKeyType.Histogram;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const summary: (maxAge: Duration.Duration, maxSize: number, error: number, quantiles: Chunk.Chunk<number>) => MetricKeyType.MetricKeyType.Summary;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isMetricKeyType: (u: unknown) => u is MetricKeyType.MetricKeyType<unknown, unknown>;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isCounterKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Counter;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isFrequencyKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Frequency;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isGaugeKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Gauge;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isHistogramKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Histogram;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isSummaryKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Summary;
//# sourceMappingURL=keyType.d.ts.map