/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Equal from "@effect/data/Equal";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const MetricBoundariesTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type MetricBoundariesTypeId = typeof MetricBoundariesTypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface MetricBoundaries extends Equal.Equal {
    readonly [MetricBoundariesTypeId]: MetricBoundariesTypeId;
    readonly values: Chunk.Chunk<number>;
}
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isMetricBoundaries: (u: unknown) => u is MetricBoundaries;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const fromChunk: (chunk: Chunk.Chunk<number>) => MetricBoundaries;
/**
 * A helper method to create histogram bucket boundaries for a histogram
 * with linear increasing values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const linear: (start: number, width: number, count: number) => MetricBoundaries;
/**
 * A helper method to create histogram bucket boundaries for a histogram
 * with exponentially increasing values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const exponential: (start: number, factor: number, count: number) => MetricBoundaries;
//# sourceMappingURL=Boundaries.d.ts.map