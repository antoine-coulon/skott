/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk"
import type * as Duration from "@effect/data/Duration"
import type * as Equal from "@effect/data/Equal"
import type * as HashSet from "@effect/data/HashSet"
import * as internal from "@effect/io/internal_effect_untraced/metric/key"
import type * as MetricBoundaries from "@effect/io/Metric/Boundaries"
import type * as MetricKeyType from "@effect/io/Metric/KeyType"
import type * as MetricLabel from "@effect/io/Metric/Label"

/**
 * @since 1.0.0
 * @category symbols
 */
export const MetricKeyTypeId: unique symbol = internal.MetricKeyTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricKeyTypeId = typeof MetricKeyTypeId

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
export interface MetricKey<Type extends MetricKeyType.MetricKeyType<any, any>>
  extends MetricKey.Variance<Type>, Equal.Equal
{
  readonly name: string
  readonly keyType: Type
  readonly tags: HashSet.HashSet<MetricLabel.MetricLabel>
}

/**
 * @since 1.0.0
 */
export declare namespace MetricKey {
  /**
   * @since 1.0.0
   * @category models
   */
  export type Untyped = MetricKey<any>

  /**
   * @since 1.0.0
   * @category models
   */
  export type Counter = MetricKey<MetricKeyType.MetricKeyType.Counter>

  /**
   * @since 1.0.0
   * @category models
   */
  export type Gauge = MetricKey<MetricKeyType.MetricKeyType.Gauge>

  /**
   * @since 1.0.0
   * @category models
   */
  export type Frequency = MetricKey<MetricKeyType.MetricKeyType.Frequency>

  /**
   * @since 1.0.0
   * @category models
   */
  export type Histogram = MetricKey<MetricKeyType.MetricKeyType.Histogram>

  /**
   * @since 1.0.0
   * @category models
   */
  export type Summary = MetricKey<MetricKeyType.MetricKeyType.Summary>

  /**
   * @since 1.0.0
   * @category models
   */
  export interface Variance<Type> {
    readonly [MetricKeyTypeId]: {
      _Type: (_: never) => Type
    }
  }
}

/**
 * @since 1.0.0
 * @category refinements
 */
export const isMetricKey: (u: unknown) => u is MetricKey<MetricKeyType.MetricKeyType<unknown, unknown>> =
  internal.isMetricKey

/**
 * Creates a metric key for a counter, with the specified name.
 *
 * @since 1.0.0
 * @category constructors
 */
export const counter: (name: string) => MetricKey.Counter = internal.counter

/**
 * Creates a metric key for a categorical frequency table, with the specified
 * name.
 *
 * @since 1.0.0
 * @category constructors
 */
export const frequency: (name: string) => MetricKey.Frequency = internal.frequency

/**
 * Creates a metric key for a gauge, with the specified name.
 *
 * @since 1.0.0
 * @category constructors
 */
export const gauge: (name: string) => MetricKey.Gauge = internal.gauge

/**
 * Creates a metric key for a histogram, with the specified name and boundaries.
 *
 * @since 1.0.0
 * @category constructors
 */
export const histogram: (name: string, boundaries: MetricBoundaries.MetricBoundaries) => MetricKey.Histogram =
  internal.histogram

/**
 * Creates a metric key for a summary, with the specified name, maxAge,
 * maxSize, error, and quantiles.
 *
 * @since 1.0.0
 * @category constructors
 */
export const summary: (
  name: string,
  maxAge: Duration.Duration,
  maxSize: number,
  error: number,
  quantiles: Chunk.Chunk<number>
) => MetricKey.Summary = internal.summary

/**
 * Returns a new `MetricKey` with the specified tag appended.
 *
 * @since 1.0.0
 * @category constructors
 */
export const tagged: {
  (
    key: string,
    value: string
  ): <Type extends MetricKeyType.MetricKeyType<any, any>>(self: MetricKey<Type>) => MetricKey<Type>
  <Type extends MetricKeyType.MetricKeyType<any, any>>(
    self: MetricKey<Type>,
    key: string,
    value: string
  ): MetricKey<Type>
} = internal.tagged

/**
 * Returns a new `MetricKey` with the specified tags appended.
 *
 * @since 1.0.0
 * @category constructors
 */
export const taggedWithLabels: {
  (
    extraTags: Iterable<MetricLabel.MetricLabel>
  ): <Type extends MetricKeyType.MetricKeyType<any, any>>(self: MetricKey<Type>) => MetricKey<Type>
  <Type extends MetricKeyType.MetricKeyType<any, any>>(
    self: MetricKey<Type>,
    extraTags: Iterable<MetricLabel.MetricLabel>
  ): MetricKey<Type>
} = internal.taggedWithLabels

/**
 * Returns a new `MetricKey` with the specified tags appended.
 *
 * @since 1.0.0
 * @category constructors
 */
export const taggedWithLabelSet: {
  (
    extraTags: HashSet.HashSet<MetricLabel.MetricLabel>
  ): <Type extends MetricKeyType.MetricKeyType<any, any>>(self: MetricKey<Type>) => MetricKey<Type>
  <Type extends MetricKeyType.MetricKeyType<any, any>>(
    self: MetricKey<Type>,
    extraTags: HashSet.HashSet<MetricLabel.MetricLabel>
  ): MetricKey<Type>
} = internal.taggedWithLabelSet
