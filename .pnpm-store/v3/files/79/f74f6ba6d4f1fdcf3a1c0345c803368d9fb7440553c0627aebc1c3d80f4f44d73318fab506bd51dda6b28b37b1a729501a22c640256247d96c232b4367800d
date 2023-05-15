import * as Context from "@effect/data/Context"
import * as Either from "@effect/data/Either"
import { pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import type * as Cause from "@effect/io/Cause"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Fiber from "@effect/io/Fiber"
import * as FiberId from "@effect/io/Fiber/Id"
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags"
import type * as FiberRef from "@effect/io/FiberRef"
import * as FiberRefs from "@effect/io/FiberRefs"
import * as CausePretty from "@effect/io/internal_effect_untraced/cause-pretty"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as FiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import * as fiberScope from "@effect/io/internal_effect_untraced/fiberScope"
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/effect"
import * as runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags"
import * as _supervisor from "@effect/io/internal_effect_untraced/supervisor"
import type * as Runtime from "@effect/io/Runtime"
import * as _scheduler from "@effect/io/Scheduler"
import type * as Scheduler from "@effect/io/Scheduler"

/** @internal */
export const unsafeFork = <R>(runtime: Runtime.Runtime<R>) =>
  Debug.methodWithTrace((trace) =>
    <E, A>(self: Effect.Effect<R, E, A>, scheduler?: Scheduler.Scheduler | undefined): Fiber.RuntimeFiber<E, A> => {
      const fiberId = FiberId.unsafeMake()
      const effect = self.traced(trace)

      let fiberRefs = FiberRefs.updatedAs(
        runtime.fiberRefs,
        fiberId,
        core.currentContext,
        runtime.context as Context.Context<never>
      )

      if (scheduler) {
        fiberRefs = FiberRefs.updatedAs(
          fiberRefs,
          fiberId,
          core.currentScheduler,
          scheduler
        )
      }

      const fiberRuntime: FiberRuntime.FiberRuntime<E, A> = new FiberRuntime.FiberRuntime<E, A>(
        fiberId,
        FiberRefs.forkAs(fiberRefs, fiberId),
        runtime.runtimeFlags
      )

      const supervisor = fiberRuntime.getSupervisor()

      if (supervisor !== _supervisor.none) {
        supervisor.onStart(runtime.context, effect, Option.none(), fiberRuntime)

        fiberRuntime.unsafeAddObserver((exit) => supervisor.onEnd(exit, fiberRuntime))
      }

      fiberScope.globalScope.add(runtime.runtimeFlags, fiberRuntime)

      fiberRuntime.start(effect)

      return fiberRuntime
    }
  )

/** @internal */
export const unsafeRunCallback = <R>(runtime: Runtime.Runtime<R>) =>
  Debug.methodWithTrace((trace) =>
    <E, A>(
      effect: Effect.Effect<R, E, A>,
      onExit?: (exit: Exit.Exit<E, A>) => void
    ): ((fiberId?: FiberId.FiberId, onExit?: (exit: Exit.Exit<E, A>) => void) => void) => {
      const fiberRuntime = unsafeFork(runtime)(effect.traced(trace))

      if (onExit) {
        fiberRuntime.unsafeAddObserver((exit) => {
          onExit(exit)
        })
      }

      return (id, onExitInterrupt) =>
        unsafeRunCallback(runtime)(
          pipe(fiberRuntime, Fiber.interruptAs(id ?? FiberId.none)),
          onExitInterrupt ?
            (exit) => {
              return onExitInterrupt(Exit.flatten(exit))
            } :
            void 0
        )
    }
  )

/** @internal */
export const unsafeRunSyncExit = <R>(runtime: Runtime.Runtime<R>) =>
  Debug.methodWithTrace((trace) =>
    <E, A>(effect: Effect.Effect<R, E, A>): Exit.Exit<E, A> => {
      const scheduler = new _scheduler.SyncScheduler("Sync")

      const fiberRuntime = unsafeFork(runtime)(effect.traced(trace), scheduler)

      scheduler.flush()

      const result = fiberRuntime.unsafePoll()

      if (result) {
        return result
      }

      return Exit.die(new AsyncFiber(fiberRuntime))
    }
  )

/** @internal */
export const unsafeRunSyncExitOrFiber = <R>(runtime: Runtime.Runtime<R>) =>
  Debug.methodWithTrace((trace) =>
    <E, A>(effect: Effect.Effect<R, E, A>): Either.Either<Fiber.Fiber<E, A>, Exit.Exit<E, A>> => {
      const scheduler = new _scheduler.SyncScheduler("PreferSync")

      const fiberRuntime = unsafeFork(runtime)(effect.traced(trace), scheduler)

      scheduler.flush()

      const result = fiberRuntime.unsafePoll()

      if (result) {
        return Either.right(result)
      }

      return Either.left(fiberRuntime)
    }
  )

/** @internal */
export class AsyncFiber<E, A> implements Runtime.AsyncFiber<E, A> {
  readonly _tag = "AsyncFiber"
  constructor(readonly fiber: Fiber.RuntimeFiber<E, A>) {}
  toString() {
    return `Fiber #${this.fiber.id().id} has suspended work asyncroniously`
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString()
  }
}

class FiberFailure extends Error {
  readonly _tag = "FiberFailure"
  readonly _id = Symbol.for("@effect/io/Runtime/FiberFailure")
  constructor(readonly originalCause: Cause.Cause<unknown>) {
    const limit = Error.stackTraceLimit
    Error.stackTraceLimit = 0
    super()
    Error.stackTraceLimit = limit
    const pretty = CausePretty.prettyErrors(this.originalCause)
    if (pretty.length > 0) {
      this.name = pretty[0].message.split(":")[0]
      this.message = pretty[0].message.substring(this.name.length + 2)
      this.stack = pretty[0].stack
    }
  }
  toString() {
    return CausePretty.pretty(this.originalCause)
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString()
  }
}

/** @internal */
export const unsafeRunSync = <R>(runtime: Runtime.Runtime<R>) =>
  Debug.methodWithTrace((trace) =>
    <E, A>(effect: Effect.Effect<R, E, A>): A => {
      const exit = unsafeRunSyncExit(runtime)(effect.traced(trace))
      if (exit._tag === OpCodes.OP_FAILURE) {
        throw new FiberFailure(exit.i0)
      }
      return exit.i0
    }
  )

/** @internal */
export const unsafeRunSyncEither = <R>(runtime: Runtime.Runtime<R>) =>
  <E, A>(effect: Effect.Effect<R, E, A>): Either.Either<E, A> =>
    Debug.untraced(() => unsafeRunSync(runtime)(core.either(effect)))

/** @internal */
export const unsafeRunPromise = <R>(runtime: Runtime.Runtime<R>) =>
  <E, A>(effect: Effect.Effect<R, E, A>): Promise<A> => {
    return new Promise((resolve, reject) => {
      unsafeRunCallback(runtime)(effect, (exit) => {
        switch (exit._tag) {
          case OpCodes.OP_SUCCESS: {
            resolve(exit.i0)
            break
          }
          case OpCodes.OP_FAILURE: {
            reject(new FiberFailure(exit.i0))
            break
          }
        }
      })
    })
  }

/** @internal */
export const unsafeRunPromiseExit = <R>(runtime: Runtime.Runtime<R>) =>
  Debug.methodWithTrace((trace) =>
    <E, A>(effect: Effect.Effect<R, E, A>): Promise<Exit.Exit<E, A>> => {
      return new Promise((resolve) => {
        unsafeRunCallback(runtime)(effect.traced(trace), (exit) => {
          resolve(exit)
        })
      })
    }
  )

/** @internal */
export const unsafeRunPromiseEither = <R>(runtime: Runtime.Runtime<R>) =>
  <E, A>(effect: Effect.Effect<R, E, A>): Promise<Either.Either<E, A>> => unsafeRunPromise(runtime)(core.either(effect))

/** @internal */
export class RuntimeImpl<R> implements Runtime.Runtime<R> {
  constructor(
    readonly context: Context.Context<R>,
    readonly runtimeFlags: RuntimeFlags.RuntimeFlags,
    readonly fiberRefs: FiberRefs.FiberRefs
  ) {}
}

/** @internal */
export const make = <R>(
  context: Context.Context<R>,
  runtimeFlags: RuntimeFlags.RuntimeFlags,
  fiberRefs: FiberRefs.FiberRefs
): Runtime.Runtime<R> => new RuntimeImpl(context, runtimeFlags, fiberRefs)

/** @internal */
export const runtime = Debug.methodWithTrace((trace) =>
  <R>(): Effect.Effect<R, never, Runtime.Runtime<R>> =>
    core.withFiberRuntime<R, never, RuntimeImpl<R>>((state, status) =>
      core.succeed(
        new RuntimeImpl<R>(
          state.getFiberRef(core.currentContext as unknown as FiberRef.FiberRef<Context.Context<R>>),
          status.runtimeFlags,
          state.unsafeGetFiberRefs()
        )
      )
    ).traced(trace)
)

/** @internal */
export const defaultRuntimeFlags: RuntimeFlags.RuntimeFlags = runtimeFlags.make(
  runtimeFlags.Interruption,
  runtimeFlags.CooperativeYielding
)

/** @internal */
export const defaultRuntime = make(
  Context.empty(),
  defaultRuntimeFlags,
  FiberRefs.unsafeMake(new Map())
)

/** @internal */
export const unsafeRunEffect = unsafeRunCallback(defaultRuntime)

/** @internal */
export const unsafeForkEffect = unsafeFork(defaultRuntime)

/** @internal */
export const unsafeRunPromiseEffect = unsafeRunPromise(defaultRuntime)

/** @internal */
export const unsafeRunPromiseEitherEffect = unsafeRunPromiseEither(defaultRuntime)

/** @internal */
export const unsafeRunPromiseExitEffect = unsafeRunPromiseExit(defaultRuntime)

/** @internal */
export const unsafeRunSyncEffect = unsafeRunSync(defaultRuntime)

/** @internal */
export const unsafeRunSyncExitEffect = unsafeRunSyncExit(defaultRuntime)

/** @internal */
export const unsafeRunSyncEitherEffect = unsafeRunSyncEither(defaultRuntime)

/** @internal */
export const unsafeRunSyncExitOrFiberEffect = unsafeRunSyncExitOrFiber(defaultRuntime)

// circular with Effect

/** @internal */
export const asyncEffect = Debug.methodWithTrace((trace, restoreTrace) =>
  <R, E, A, R2, E2, X>(
    register: (callback: (_: Effect.Effect<R, E, A>) => void) => Effect.Effect<R2, E2, X>
  ): Effect.Effect<R | R2, E | E2, A> =>
    core.flatMap(core.deferredMake<E | E2, A>(), (deferred) =>
      core.flatMap(runtime<R | R2>(), (runtime) =>
        core.uninterruptibleMask((restore) =>
          core.zipRight(
            FiberRuntime.fork(restore(
              core.catchAllCause(
                restoreTrace(register)((cb) =>
                  unsafeRunCallback(runtime)(pipe(cb, core.intoDeferred(deferred)))
                ),
                (cause) => core.deferredFailCause(deferred, cause)
              )
            )),
            restore(core.deferredAwait(deferred))
          )
        ))).traced(trace)
)
