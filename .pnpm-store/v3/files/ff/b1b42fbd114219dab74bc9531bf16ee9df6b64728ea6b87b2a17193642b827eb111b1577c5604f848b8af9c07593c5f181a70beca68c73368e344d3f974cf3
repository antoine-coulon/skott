/**
 * @since 1.0.0
 */
import type { LazyArg } from "@effect/data/Function";
import type * as MetricKey from "@effect/io/Metric/Key";
import type * as MetricState from "@effect/io/Metric/State";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const MetricHookTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricHookTypeId = typeof MetricHookTypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface MetricHook<In, Out> extends MetricHook.Variance<In, Out> {
    readonly get: () => Out;
    readonly update: (input: In) => void;
}
/**
 * @since 1.0.0
 */
export declare namespace MetricHook {
    /**
     * @since 1.0.0
     * @category models
     */
    type Root = MetricHook<any, MetricState.MetricState.Untyped>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Untyped = MetricHook<any, any>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Counter = MetricHook<number, MetricState.MetricState.Counter>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Gauge = MetricHook<number, MetricState.MetricState.Gauge>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Frequency = MetricHook<string, MetricState.MetricState.Frequency>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Histogram = MetricHook<number, MetricState.MetricState.Histogram>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Summary = MetricHook<readonly [number, number], MetricState.MetricState.Summary>;
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<In, Out> {
        readonly [MetricHookTypeId]: {
            readonly _In: (_: In) => void;
            readonly _Out: (_: never) => Out;
        };
    }
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <In, Out>(get: LazyArg<Out>, update: (input: In) => void) => MetricHook<In, Out>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const counter: (_key: MetricKey.MetricKey.Counter) => MetricHook.Counter;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const frequency: (_key: MetricKey.MetricKey.Frequency) => MetricHook.Frequency;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const gauge: (_key: MetricKey.MetricKey.Gauge, startAt: number) => MetricHook.Gauge;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const histogram: (key: MetricKey.MetricKey.Histogram) => MetricHook.Histogram;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const summary: (key: MetricKey.MetricKey.Summary) => MetricHook.Summary;
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const onUpdate: {
    <In, Out>(f: (input: In) => void): (self: MetricHook<In, Out>) => MetricHook<In, Out>;
    <In, Out>(self: MetricHook<In, Out>, f: (input: In) => void): MetricHook<In, Out>;
};
//# sourceMappingURL=Hook.d.ts.map