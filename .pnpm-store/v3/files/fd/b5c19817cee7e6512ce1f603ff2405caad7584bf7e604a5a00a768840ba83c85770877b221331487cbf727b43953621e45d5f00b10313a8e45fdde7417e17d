/**
 * @since 1.0.0
 */
import * as internal from "@effect/io/internal_effect_untraced/metric/pair"
import type * as MetricKey from "@effect/io/Metric/Key"
import type * as MetricKeyType from "@effect/io/Metric/KeyType"
import type * as MetricState from "@effect/io/Metric/State"

/**
 * @since 1.0.0
 * @category symbols
 */
export const MetricPairTypeId: unique symbol = internal.MetricPairTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricPairTypeId = typeof MetricPairTypeId

/**
 * @since 1.0.0
 * @category model
 */
export interface MetricPair<Type extends MetricKeyType.MetricKeyType<any, any>> extends MetricPair.Variance<Type> {
  readonly metricKey: MetricKey.MetricKey<Type>
  readonly metricState: MetricState.MetricState<MetricKeyType.MetricKeyType.OutType<Type>>
}

/**
 * @since 1.0.0
 */
export declare namespace MetricPair {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Untyped extends MetricPair<MetricKeyType.MetricKeyType<any, any>> {}

  /**
   * @since 1.0.0
   * @category models
   */
  export interface Variance<Type extends MetricKeyType.MetricKeyType<any, any>> {
    readonly [MetricPairTypeId]: {
      readonly _Type: (_: never) => Type
    }
  }
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: <Type extends MetricKeyType.MetricKeyType<any, any>>(
  metricKey: MetricKey.MetricKey<Type>,
  metricState: MetricState.MetricState<MetricKeyType.MetricKeyType.OutType<Type>>
) => MetricPair.Untyped = internal.make

/**
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeMake: <Type extends MetricKeyType.MetricKeyType<any, any>>(
  metricKey: MetricKey.MetricKey<Type>,
  metricState: MetricState.MetricState.Untyped
) => MetricPair.Untyped = internal.unsafeMake
