/**
 * @since 1.0.0
 */

import type { Chunk } from "@effect/data/Chunk"
import type { Differ } from "@effect/data/Differ"
import type { Equal } from "@effect/data/Equal"
import * as CP from "@effect/data/internal/Differ/ChunkPatch"

const TypeId: unique symbol = CP.ChunkPatchTypeId as TypeId

/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId

/**
 * A patch which describes updates to a chunk of values.
 *
 * @since 1.0.0
 * @category models
 */
export interface ChunkPatch<Value, Patch> extends Equal {
  readonly _id: TypeId
  readonly _Value: (_: Value) => Value
  readonly _Patch: (_: Patch) => Patch
}

/**
 * Constructs an empty chunk patch.
 *
 * @since 1.0.0
 * @category constructors
 */
export const empty: <Value, Patch>() => ChunkPatch<Value, Patch> = CP.empty

/**
 * Constructs a chunk patch from a new and old chunk of values and a differ
 * for the values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const diff: <Value, Patch>(
  oldValue: Chunk<Value>,
  newValue: Chunk<Value>,
  differ: Differ<Value, Patch>
) => ChunkPatch<Value, Patch> = CP.diff

/**
 * Combines two chunk patches to produce a new chunk patch that describes
 * applying their changes sequentially.
 *
 * @since 1.0.0
 * @category mutations
 */
export const combine: {
  <Value, Patch>(that: ChunkPatch<Value, Patch>): (self: ChunkPatch<Value, Patch>) => ChunkPatch<Value, Patch>
  <Value, Patch>(self: ChunkPatch<Value, Patch>, that: ChunkPatch<Value, Patch>): ChunkPatch<Value, Patch>
} = CP.combine

/**
 * Applies a chunk patch to a chunk of values to produce a new chunk of
 * values which represents the original chunk of values updated with the
 * changes described by this patch.
 *
 * @since 1.0.0
 * @category destructors
 */
export const patch: {
  <Value, Patch>(oldValue: Chunk<Value>, differ: Differ<Value, Patch>): (self: ChunkPatch<Value, Patch>) => Chunk<Value>
  <Value, Patch>(self: ChunkPatch<Value, Patch>, oldValue: Chunk<Value>, differ: Differ<Value, Patch>): Chunk<Value>
} = CP.patch
