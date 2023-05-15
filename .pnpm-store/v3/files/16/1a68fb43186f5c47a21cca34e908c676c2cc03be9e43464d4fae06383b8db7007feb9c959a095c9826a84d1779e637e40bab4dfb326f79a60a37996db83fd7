import * as Context from "@effect/data/Context"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import type * as FiberRef from "@effect/io/FiberRef"
import * as core from "@effect/io/internal_effect_untraced/core"

/** @internal */
export const SizedTypeId = Symbol.for("@effect/test/Sized")

/** @internal */
export type SizedTypeId = typeof SizedTypeId

/** @internal */
export interface Sized {
  readonly [SizedTypeId]: SizedTypeId
  /** @internal */
  readonly fiberRef: FiberRef.FiberRef<number>
  size(): Effect.Effect<never, never, number>
  withSize(size: number): <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
}

/** @internal */
export const Tag: Context.Tag<Sized> = Context.Tag(SizedTypeId)

/** @internal */
class SizedImpl implements Sized {
  readonly [SizedTypeId]: SizedTypeId = SizedTypeId
  constructor(readonly fiberRef: FiberRef.FiberRef<number>) {}
  size(): Effect.Effect<never, never, number> {
    return Debug.bodyWithTrace((trace) => core.fiberRefGet(this.fiberRef).traced(trace))
  }
  withSize(size: number) {
    return Debug.bodyWithTrace((trace) =>
      <R, E, A>(effect: Effect.Effect<R, E, A>): Effect.Effect<R, E, A> =>
        Debug.untraced(() => core.fiberRefLocally(this.fiberRef, size)(effect).traced(trace))
    )
  }
}

/** @internal */
export const make = (size: number): Sized => new SizedImpl(core.fiberRefUnsafeMake(size))

/** @internal */
export const fromFiberRef = (fiberRef: FiberRef.FiberRef<number>): Sized => new SizedImpl(fiberRef)
