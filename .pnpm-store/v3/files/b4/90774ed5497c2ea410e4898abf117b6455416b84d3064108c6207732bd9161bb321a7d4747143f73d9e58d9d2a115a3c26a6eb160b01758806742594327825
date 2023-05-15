import * as Chunk from "@effect/data/Chunk"
import * as Context from "@effect/data/Context"
import { pipe } from "@effect/data/Function"
import * as PCGRandom from "@effect/data/Random"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import * as core from "@effect/io/internal_effect_untraced/core"
import type * as Random from "@effect/io/Random"

/** @internal */
const RandomSymbolKey = "@effect/io/Random"

/** @internal */
export const RandomTypeId: Random.RandomTypeId = Symbol.for(
  RandomSymbolKey
) as Random.RandomTypeId

/** @internal */
export const randomTag: Context.Tag<Random.Random> = Context.Tag(RandomTypeId)
/** @internal */
class RandomImpl implements Random.Random {
  readonly [RandomTypeId]: Random.RandomTypeId = RandomTypeId

  readonly PRNG: PCGRandom.PCGRandom

  constructor(readonly seed: number) {
    this.PRNG = new PCGRandom.PCGRandom(seed)
  }

  next(): Effect.Effect<never, never, number> {
    return Debug.bodyWithTrace((trace) => core.sync(() => this.PRNG.number()).traced(trace))
  }

  nextBoolean(): Effect.Effect<never, never, boolean> {
    return Debug.bodyWithTrace((trace) => core.map(this.next(), (n) => n > 0.5).traced(trace))
  }

  nextInt(): Effect.Effect<never, never, number> {
    return Debug.bodyWithTrace((trace) => core.sync(() => this.PRNG.integer(Number.MAX_SAFE_INTEGER)).traced(trace))
  }

  nextRange(min: number, max: number): Effect.Effect<never, never, number> {
    return Debug.bodyWithTrace((trace) => core.map(this.next(), (n) => (max - min) * n + min).traced(trace))
  }

  nextIntBetween(min: number, max: number): Effect.Effect<never, never, number> {
    return Debug.bodyWithTrace((trace) => core.sync(() => this.PRNG.integer(1 + max - min) + min).traced(trace))
  }

  shuffle<A>(elements: Iterable<A>): Effect.Effect<never, never, Chunk.Chunk<A>> {
    return Debug.bodyWithTrace((trace) => shuffleWith(elements, (n) => this.nextIntBetween(0, n)).traced(trace))
  }
}

const shuffleWith = <A>(
  elements: Iterable<A>,
  nextIntBounded: (n: number) => Effect.Effect<never, never, number>
): Effect.Effect<never, never, Chunk.Chunk<A>> => {
  return core.suspendSucceed(() =>
    pipe(
      core.sync(() => Array.from(elements)),
      core.flatMap((buffer) => {
        const numbers: Array<number> = []
        for (let i = buffer.length; i >= 2; i = i - 1) {
          numbers.push(i)
        }
        return pipe(
          numbers,
          core.forEachDiscard((n) =>
            pipe(
              nextIntBounded(n),
              core.map((k) => swap(buffer, n - 1, k))
            )
          ),
          core.as(Chunk.fromIterable(buffer))
        )
      })
    )
  )
}

const swap = <A>(buffer: Array<A>, index1: number, index2: number): Array<A> => {
  const tmp = buffer[index1]!
  buffer[index1] = buffer[index2]!
  buffer[index2] = tmp
  return buffer
}

export const make = (seed: number): Random.Random => new RandomImpl(seed)
