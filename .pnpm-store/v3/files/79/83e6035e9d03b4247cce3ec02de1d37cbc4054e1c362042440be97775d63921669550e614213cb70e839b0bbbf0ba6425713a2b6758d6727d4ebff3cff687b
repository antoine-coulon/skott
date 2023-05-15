import type * as Chunk from "@effect/data/Chunk"
import type * as Deferred from "@effect/io/Deferred"

/**
 * `Data` represents the state of the `TestClock`, including the clock time.
 *
 * @internal
 */
export interface Data {
  readonly instant: number
  readonly sleeps: Chunk.Chunk<readonly [number, Deferred.Deferred<never, void>]>
}

/** @internal */
export const make = (
  instant: number,
  sleeps: Chunk.Chunk<readonly [number, Deferred.Deferred<never, void>]>
): Data => ({
  instant,
  sleeps
})
