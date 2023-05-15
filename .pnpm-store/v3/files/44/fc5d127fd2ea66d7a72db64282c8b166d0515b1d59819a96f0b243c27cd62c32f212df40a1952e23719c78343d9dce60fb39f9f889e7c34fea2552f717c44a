import type * as Deferred from "@effect/io/Deferred"
import type * as Effect from "@effect/io/Effect"
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/deferred"

/** @internal */
const DeferredSymbolKey = "@effect/io/Deferred"

/** @internal */
export const DeferredTypeId: Deferred.DeferredTypeId = Symbol.for(
  DeferredSymbolKey
) as Deferred.DeferredTypeId

/** @internal */
export const deferredVariance = {
  _E: (_: never) => _,
  _A: (_: never) => _
}

/** @internal */
export type State<E, A> = Pending<E, A> | Done<E, A>

/** @internal */
export interface Pending<E, A> {
  readonly _tag: OpCodes.OP_STATE_PENDING
  readonly joiners: Array<(effect: Effect.Effect<never, E, A>) => void>
}

/** @internal */
export interface Done<E, A> {
  readonly _tag: OpCodes.OP_STATE_DONE
  readonly effect: Effect.Effect<never, E, A>
}

/** @internal */
export const pending = <E, A>(
  joiners: Array<(effect: Effect.Effect<never, E, A>) => void>
): State<E, A> => {
  return { _tag: OpCodes.OP_STATE_PENDING, joiners }
}

/** @internal */
export const done = <E, A>(effect: Effect.Effect<never, E, A>): State<E, A> => {
  return { _tag: OpCodes.OP_STATE_DONE, effect }
}
