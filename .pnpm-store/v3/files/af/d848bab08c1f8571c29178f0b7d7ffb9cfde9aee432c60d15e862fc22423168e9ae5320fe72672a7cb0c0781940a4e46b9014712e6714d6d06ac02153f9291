import * as Context from "@effect/data/Context"
import * as Debug from "@effect/io/Debug"
import type * as DefaultServices from "@effect/io/DefaultServices"
import type * as Effect from "@effect/io/Effect"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices"

/** @internal */
export const LiveTypeId = Symbol.for("@effect/test/Live")

/** @internal */
export type LiveTypeId = typeof LiveTypeId

/**
 * The `Live` trait provides access to the "live" default Effect services from
 * within tests for workflows such as printing test results to the console or
 * timing out tests where it is necessary to access the real implementations of
 * these services.
 *
 * @internal
 */
export interface Live {
  readonly [LiveTypeId]: LiveTypeId
  provide<R, E, A>(effect: Effect.Effect<R, E, A>): Effect.Effect<R, E, A>
}

/** @internal */
export const Tag: Context.Tag<Live> = Context.Tag<Live>()

/** @internal */
class LiveImpl implements Live {
  readonly [LiveTypeId]: LiveTypeId = LiveTypeId
  constructor(readonly services: Context.Context<DefaultServices.DefaultServices>) {}
  provide<R, E, A>(effect: Effect.Effect<R, E, A>): Effect.Effect<R, E, A> {
    return Debug.bodyWithTrace((trace) =>
      core.fiberRefLocallyWith(
        defaultServices.currentServices,
        Context.merge(this.services)
      )(effect).traced(trace)
    )
  }
}

/** @internal */
export const make = (services: Context.Context<DefaultServices.DefaultServices>): Live => new LiveImpl(services)
