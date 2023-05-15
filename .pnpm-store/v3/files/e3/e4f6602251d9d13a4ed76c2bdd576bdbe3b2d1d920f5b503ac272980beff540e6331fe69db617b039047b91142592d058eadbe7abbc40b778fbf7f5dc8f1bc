import { pipe } from "@effect/data/Function"
import type * as Cached from "@effect/io/Cached"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import * as _schedule from "@effect/io/internal_effect_untraced/schedule"
import * as scopedRef from "@effect/io/internal_effect_untraced/scopedRef"
import type * as Schedule from "@effect/io/Schedule"
import type * as Scope from "@effect/io/Scope"

/** @internal */
const CachedSymbolKey = "@effect/io/Cached"

/** @internal */
export const CachedTypeId: Cached.CachedTypeId = Symbol.for(
  CachedSymbolKey
) as Cached.CachedTypeId

/** @internal */
const cachedVariance = {
  _E: (_: never) => _,
  _A: (_: never) => _
}

/** @internal */
export const auto = Debug.methodWithTrace((trace) =>
  <R, E, A, R2, In, Out>(
    acquire: Effect.Effect<R, E, A>,
    policy: Schedule.Schedule<R2, In, Out>
  ): Effect.Effect<R | R2 | Scope.Scope, never, Cached.Cached<E, A>> =>
    core.tap(manual(acquire), (manual) =>
      fiberRuntime.acquireRelease(
        pipe(refresh(manual), _schedule.schedule_Effect(policy), core.interruptible, fiberRuntime.forkDaemon),
        core.interruptFiber
      )).traced(trace)
)

/** @internal */
export const manual = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    acquire: Effect.Effect<R, E, A>
  ): Effect.Effect<R | Scope.Scope, never, Cached.Cached<E, A>> =>
    core.flatMap(core.context<R>(), (env) =>
      pipe(
        scopedRef.fromAcquire(core.exit(acquire)),
        core.map((ref) => ({
          [CachedTypeId]: cachedVariance,
          scopedRef: ref,
          acquire: () => Debug.bodyWithTrace((trace) => core.provideContext(acquire, env).traced(trace))
        }))
      )).traced(trace)
)

/** @internal */
export const get = Debug.methodWithTrace((trace) =>
  <E, A>(self: Cached.Cached<E, A>): Effect.Effect<never, E, A> =>
    core.flatMap(scopedRef.get(self.scopedRef), core.done).traced(trace)
)

export const refresh = Debug.methodWithTrace((trace) =>
  <E, A>(self: Cached.Cached<E, A>): Effect.Effect<never, E, void> =>
    scopedRef.set(
      self.scopedRef,
      pipe(
        self.acquire(),
        core.map(core.exitSucceed)
      )
    ).traced(trace)
)
