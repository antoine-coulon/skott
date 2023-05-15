/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Duration from "@effect/data/Duration";
import type * as Equal from "@effect/data/Equal";
import type * as MetricBoundaries from "@effect/io/Metric/Boundaries";
import type * as MetricState from "@effect/io/Metric/State";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const MetricKeyTypeTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricKeyTypeTypeId = typeof MetricKeyTypeTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const CounterKeyTypeTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type CounterKeyTypeTypeId = typeof CounterKeyTypeTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const FrequencyKeyTypeTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type FrequencyKeyTypeTypeId = typeof FrequencyKeyTypeTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const GaugeKeyTypeTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type GaugeKeyTypeTypeId = typeof GaugeKeyTypeTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const HistogramKeyTypeTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type HistogramKeyTypeTypeId = typeof HistogramKeyTypeTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const SummaryKeyTypeTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type SummaryKeyTypeTypeId = typeof SummaryKeyTypeTypeId;
/**
 * @since 1.0.0
 * @category modelz
 */
export interface MetricKeyType<In, Out> extends MetricKeyType.Variance<In, Out>, Equal.Equal {
}
/**
 * @since 1.0.0
 */
export declare namespace MetricKeyType {
    /**
     * @since 1.0.0
     * @category models
     */
    type Untyped = MetricKeyType<any, any>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Counter = MetricKeyType<number, MetricState.MetricState.Counter> & {
        readonly [CounterKeyTypeTypeId]: CounterKeyTypeTypeId;
    };
    /**
     * @since 1.0.0
     * @category models
     */
    type Frequency = MetricKeyType<string, MetricState.MetricState.Frequency> & {
        readonly [FrequencyKeyTypeTypeId]: FrequencyKeyTypeTypeId;
    };
    /**
     * @since 1.0.0
     * @category models
     */
    type Gauge = MetricKeyType<number, MetricState.MetricState.Gauge> & {
        readonly [GaugeKeyTypeTypeId]: GaugeKeyTypeTypeId;
    };
    /**
     * @since 1.0.0
     * @category models
     */
    type Histogram = MetricKeyType<number, MetricState.MetricState.Histogram> & {
        readonly [HistogramKeyTypeTypeId]: HistogramKeyTypeTypeId;
        readonly boundaries: MetricBoundaries.MetricBoundaries;
    };
    /**
     * @since 1.0.0
     * @category models
     */
    type Summary = MetricKeyType<readonly [number, number], MetricState.MetricState.Summary> & {
        readonly [SummaryKeyTypeTypeId]: SummaryKeyTypeTypeId;
        readonly maxAge: Duration.Duration;
        readonly maxSize: number;
        readonly error: number;
        readonly quantiles: Chunk.Chunk<number>;
    };
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<In, Out> {
        readonly [MetricKeyTypeTypeId]: {
            readonly _In: (_: In) => void;
            readonly _Out: (_: never) => Out;
        };
    }
    /**
     * @since 1.0.0
     * @category models
     */
    type InType<Type extends MetricKeyType<any, any>> = [Type] extends [
        {
            readonly [MetricKeyTypeTypeId]: {
                readonly _In: (_: infer In) => void;
            };
        }
    ] ? In : never;
    /**
     * @since 1.0.0
     * @category models
     */
    type OutType<Type extends MetricKeyType<any, any>> = [Type] extends [
        {
            readonly [MetricKeyTypeTypeId]: {
                readonly _Out: (_: never) => infer Out;
            };
        }
    ] ? Out : never;
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const counter: MetricKeyType.Counter;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const frequency: MetricKeyType.Frequency;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const gauge: MetricKeyType.Gauge;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const histogram: (boundaries: MetricBoundaries.MetricBoundaries) => MetricKeyType.Histogram;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const summary: (maxAge: Duration.Duration, maxSize: number, error: number, quantiles: Chunk.Chunk<number>) => MetricKeyType.Summary;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isMetricKeyType: (u: unknown) => u is MetricKeyType<unknown, unknown>;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isCounterKey: (u: unknown) => u is MetricKeyType.Counter;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isFrequencyKey: (u: unknown) => u is MetricKeyType.Frequency;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isGaugeKey: (u: unknown) => u is MetricKeyType.Gauge;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isHistogramKey: (u: unknown) => u is MetricKeyType.Histogram;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isSummaryKey: (u: unknown) => u is MetricKeyType.Summary;
//# sourceMappingURL=KeyType.d.ts.map