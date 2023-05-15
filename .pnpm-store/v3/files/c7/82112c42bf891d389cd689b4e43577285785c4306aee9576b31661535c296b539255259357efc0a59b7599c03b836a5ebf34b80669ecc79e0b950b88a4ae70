import * as Context from "@effect/data/Context"
import type { LazyArg } from "@effect/data/Function"
import { pipe } from "@effect/data/Function"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as effect from "@effect/io/internal_effect_untraced/effect"
import * as circular from "@effect/io/internal_effect_untraced/effect/circular"
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import * as ref from "@effect/io/internal_effect_untraced/ref"
import * as synchronized from "@effect/io/internal_effect_untraced/synchronizedRef"
import type * as Scope from "@effect/io/Scope"
import type * as ScopedRef from "@effect/io/ScopedRef"

/** @internal */
const ScopedRefSymbolKey = "@effect/io/ScopedRef"

/** @internal */
export const ScopedRefTypeId: ScopedRef.ScopedRefTypeId = Symbol.for(
  ScopedRefSymbolKey
) as ScopedRef.ScopedRefTypeId

/** @internal */
const scopedRefVariance = {
  _A: (_: never) => _
}

/** @internal  */
const close = Debug.methodWithTrace((trace) =>
  <A>(self: ScopedRef.ScopedRef<A>): Effect.Effect<never, never, void> =>
    core.flatMap(ref.get(self.ref), (tuple) => tuple[0].close(core.exitUnit())).traced(trace)
)

/** @internal */
export const fromAcquire = Debug.methodWithTrace((trace) =>
  <R, E, A>(acquire: Effect.Effect<R, E, A>): Effect.Effect<R | Scope.Scope, E, ScopedRef.ScopedRef<A>> =>
    core.uninterruptibleMask((restore) =>
      pipe(
        fiberRuntime.scopeMake(),
        core.flatMap((newScope) =>
          pipe(
            restore(
              pipe(
                acquire,
                core.contramapContext<R, Scope.Scope | R>(Context.add(fiberRuntime.scopeTag, newScope))
              )
            ),
            core.onError((cause) => newScope.close(core.exitFail(cause))),
            core.flatMap((value) =>
              pipe(
                circular.makeSynchronized([newScope, value] as const),
                core.flatMap((ref) => {
                  const scopedRef: ScopedRef.ScopedRef<A> = {
                    [ScopedRefTypeId]: scopedRefVariance,
                    ref
                  }
                  return pipe(
                    fiberRuntime.addFinalizer<R | Scope.Scope, void>(() => close(scopedRef)),
                    core.as(scopedRef)
                  )
                })
              )
            )
          )
        )
      )
    ).traced(trace)
)

/** @internal */
export const get = Debug.methodWithTrace((trace) =>
  <A>(self: ScopedRef.ScopedRef<A>): Effect.Effect<never, never, A> =>
    pipe(ref.get(self.ref), core.map((tuple) => tuple[1])).traced(trace)
)

/** @internal */
export const make = Debug.methodWithTrace((trace, restore) =>
  <A>(evaluate: LazyArg<A>): Effect.Effect<Scope.Scope, never, ScopedRef.ScopedRef<A>> =>
    fromAcquire(core.sync(restore(evaluate))).traced(trace)
)

/** @internal */
export const set = Debug.dualWithTrace<
  <A, R, E>(
    acquire: Effect.Effect<R, E, A>
  ) => (self: ScopedRef.ScopedRef<A>) => Effect.Effect<Exclude<R, Scope.Scope>, E, void>,
  <A, R, E>(
    self: ScopedRef.ScopedRef<A>,
    acquire: Effect.Effect<R, E, A>
  ) => Effect.Effect<Exclude<R, Scope.Scope>, E, void>
>(2, (trace) =>
  <A, R, E>(
    self: ScopedRef.ScopedRef<A>,
    acquire: Effect.Effect<R, E, A>
  ) =>
    core.flatten(
      synchronized.modifyEffect(self.ref, ([oldScope, value]) =>
        core.uninterruptibleMask((restore) =>
          pipe(
            fiberRuntime.scopeMake(),
            core.flatMap((newScope) =>
              pipe(
                restore(
                  pipe(
                    acquire,
                    core.contramapContext<Exclude<R, Scope.Scope>, R>(
                      Context.add(fiberRuntime.scopeTag, newScope) as any
                    )
                  )
                ),
                core.exit,
                core.flatMap(
                  core.exitMatch(
                    (cause) =>
                      pipe(
                        newScope.close(core.exitUnit()),
                        effect.ignore,
                        core.as(
                          [
                            core.failCause(cause) as unknown as Effect.Effect<never, never, void>,
                            [oldScope, value] as const
                          ] as const
                        )
                      ),
                    (value) =>
                      pipe(
                        oldScope.close(core.exitUnit()),
                        effect.ignore,
                        core.as([core.unit(), [newScope, value] as const] as const)
                      )
                  )
                )
              )
            )
          )
        ))
    ).traced(trace))
