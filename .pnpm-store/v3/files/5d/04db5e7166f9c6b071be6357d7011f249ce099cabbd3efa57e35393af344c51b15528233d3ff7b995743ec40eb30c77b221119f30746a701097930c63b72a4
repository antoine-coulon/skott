/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk"
import type * as Equal from "@effect/data/Equal"
import * as internal from "@effect/io/internal_effect_untraced/metric/boundaries"

/**
 * @since 1.0.0
 * @category symbols
 */
export const MetricBoundariesTypeId: unique symbol = internal.MetricBoundariesTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricBoundariesTypeId = typeof MetricBoundariesTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface MetricBoundaries extends Equal.Equal {
  readonly [MetricBoundariesTypeId]: MetricBoundariesTypeId
  readonly values: Chunk.Chunk<number>
}

/**
 * @since 1.0.0
 * @category refinements
 */
export const isMetricBoundaries: (u: unknown) => u is MetricBoundaries = internal.isMetricBoundaries

/**
 * @since 1.0.0
 * @category constructors
 */
export const fromChunk: (chunk: Chunk.Chunk<number>) => MetricBoundaries = internal.fromChunk

/**
 * A helper method to create histogram bucket boundaries for a histogram
 * with linear increasing values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const linear: (start: number, width: number, count: number) => MetricBoundaries = internal.linear

/**
 * A helper method to create histogram bucket boundaries for a histogram
 * with exponentially increasing values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const exponential: (start: number, factor: number, count: number) => MetricBoundaries = internal.exponential
