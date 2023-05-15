/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Equal from "@effect/data/Equal";
import type * as HashMap from "@effect/data/HashMap";
import type * as Option from "@effect/data/Option";
import type * as MetricKeyType from "@effect/io/Metric/KeyType";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const MetricStateTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricStateTypeId = typeof MetricStateTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const CounterStateTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type CounterStateTypeId = typeof CounterStateTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const FrequencyStateTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type FrequencyStateTypeId = typeof FrequencyStateTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const GaugeStateTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type GaugeStateTypeId = typeof GaugeStateTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const HistogramStateTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type HistogramStateTypeId = typeof HistogramStateTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const SummaryStateTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type SummaryStateTypeId = typeof SummaryStateTypeId;
/**
 * A `MetricState` describes the state of a metric. The type parameter of a
 * metric state corresponds to the type of the metric key (`MetricStateType`).
 * This phantom type parameter is used to tie keys to their expected states.
 *
 * @since 1.0.0
 * @category models
 */
export interface MetricState<A> extends MetricState.Variance<A>, Equal.Equal {
}
/**
 * @since 1.0.0
 */
export declare namespace MetricState {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Untyped extends MetricState<any> {
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface Counter extends MetricState<MetricKeyType.MetricKeyType.Counter> {
        readonly [CounterStateTypeId]: CounterStateTypeId;
        readonly count: number;
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface Frequency extends MetricState<MetricKeyType.MetricKeyType.Frequency> {
        readonly [FrequencyStateTypeId]: FrequencyStateTypeId;
        readonly occurrences: HashMap.HashMap<string, number>;
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface Gauge extends MetricState<MetricKeyType.MetricKeyType.Gauge> {
        readonly [GaugeStateTypeId]: GaugeStateTypeId;
        readonly value: number;
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface Histogram extends MetricState<MetricKeyType.MetricKeyType.Histogram> {
        readonly [HistogramStateTypeId]: HistogramStateTypeId;
        readonly buckets: Chunk.Chunk<readonly [number, number]>;
        readonly count: number;
        readonly min: number;
        readonly max: number;
        readonly sum: number;
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface Summary extends MetricState<MetricKeyType.MetricKeyType.Summary> {
        readonly [SummaryStateTypeId]: SummaryStateTypeId;
        readonly error: number;
        readonly quantiles: Chunk.Chunk<readonly [number, Option.Option<number>]>;
        readonly count: number;
        readonly min: number;
        readonly max: number;
        readonly sum: number;
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<A> {
        readonly [MetricStateTypeId]: {
            readonly _A: (_: A) => void;
        };
    }
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const counter: (count: number) => MetricState.Counter;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const frequency: (occurrences: HashMap.HashMap<string, number>) => MetricState.Frequency;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const gauge: (value: number) => MetricState.Gauge;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const histogram: (buckets: Chunk.Chunk<readonly [number, number]>, count: number, min: number, max: number, sum: number) => MetricState.Histogram;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const summary: (error: number, quantiles: Chunk.Chunk<readonly [number, Option.Option<number>]>, count: number, min: number, max: number, sum: number) => MetricState.Summary;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isMetricState: (u: unknown) => u is MetricState.Counter;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isCounterState: (u: unknown) => u is MetricState.Counter;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isFrequencyState: (u: unknown) => u is MetricState.Frequency;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isGaugeState: (u: unknown) => u is MetricState.Gauge;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isHistogramState: (u: unknown) => u is MetricState.Histogram;
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isSummaryState: (u: unknown) => u is MetricState.Summary;
//# sourceMappingURL=State.d.ts.map