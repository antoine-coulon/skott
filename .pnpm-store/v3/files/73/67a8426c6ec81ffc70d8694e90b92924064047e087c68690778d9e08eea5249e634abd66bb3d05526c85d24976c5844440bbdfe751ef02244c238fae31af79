/**
 * @since 1.0.0
 */
import type * as HashSet from "@effect/data/HashSet";
import type * as MetricHook from "@effect/io/Metric/Hook";
import type * as MetricKey from "@effect/io/Metric/Key";
import type * as MetricKeyType from "@effect/io/Metric/KeyType";
import type * as MetricPair from "@effect/io/Metric/Pair";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const MetricRegistryTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricRegistryTypeId = typeof MetricRegistryTypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface MetricRegistry {
    readonly [MetricRegistryTypeId]: MetricRegistryTypeId;
    snapshot(): HashSet.HashSet<MetricPair.MetricPair.Untyped>;
    get<Type extends MetricKeyType.MetricKeyType<any, any>>(key: MetricKey.MetricKey<Type>): MetricHook.MetricHook<MetricKeyType.MetricKeyType.InType<typeof key["keyType"]>, MetricKeyType.MetricKeyType.OutType<typeof key["keyType"]>>;
    getCounter(key: MetricKey.MetricKey.Counter): MetricHook.MetricHook.Counter;
    getFrequency(key: MetricKey.MetricKey.Frequency): MetricHook.MetricHook.Frequency;
    getGauge(key: MetricKey.MetricKey.Gauge): MetricHook.MetricHook.Gauge;
    getHistogram(key: MetricKey.MetricKey.Histogram): MetricHook.MetricHook.Histogram;
    getSummary(key: MetricKey.MetricKey.Summary): MetricHook.MetricHook.Summary;
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const make: (_: void) => MetricRegistry;
//# sourceMappingURL=Registry.d.ts.map