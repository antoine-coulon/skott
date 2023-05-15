import type * as MetricKey from "@effect/io/Metric/Key";
import type * as MetricKeyType from "@effect/io/Metric/KeyType";
import type * as MetricState from "@effect/io/Metric/State";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const MetricPairTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricPairTypeId = typeof MetricPairTypeId;
/**
 * @since 1.0.0
 * @category model
 */
export interface MetricPair<Type extends MetricKeyType.MetricKeyType<any, any>> extends MetricPair.Variance<Type> {
    readonly metricKey: MetricKey.MetricKey<Type>;
    readonly metricState: MetricState.MetricState<MetricKeyType.MetricKeyType.OutType<Type>>;
}
/**
 * @since 1.0.0
 */
export declare namespace MetricPair {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Untyped extends MetricPair<MetricKeyType.MetricKeyType<any, any>> {
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<Type extends MetricKeyType.MetricKeyType<any, any>> {
        readonly [MetricPairTypeId]: {
            readonly _Type: (_: never) => Type;
        };
    }
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <Type extends MetricKeyType.MetricKeyType<any, any>>(metricKey: MetricKey.MetricKey<Type>, metricState: MetricState.MetricState<MetricKeyType.MetricKeyType.OutType<Type>>) => MetricPair.Untyped;
/**
 * @since 1.0.0
 * @category unsafe
 */
export declare const unsafeMake: <Type extends MetricKeyType.MetricKeyType<any, any>>(metricKey: MetricKey.MetricKey<Type>, metricState: MetricState.MetricState.Untyped) => MetricPair.Untyped;
//# sourceMappingURL=Pair.d.ts.map