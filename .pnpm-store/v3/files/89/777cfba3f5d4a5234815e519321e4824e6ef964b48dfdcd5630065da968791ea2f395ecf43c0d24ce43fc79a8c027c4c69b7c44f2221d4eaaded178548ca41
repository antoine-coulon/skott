import * as Chunk from "@effect/data/Chunk"
import * as Context from "@effect/data/Context"
import * as Differ from "@effect/data/Differ"
import * as ContextPatch from "@effect/data/Differ/ContextPatch"
import * as HashSetPatch from "@effect/data/Differ/HashSetPatch"
import * as Either from "@effect/data/Either"
import * as Equal from "@effect/data/Equal"
import type { LazyArg } from "@effect/data/Function"
import { dual, identity, pipe } from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"
import * as HashMap from "@effect/data/HashMap"
import * as HashSet from "@effect/data/HashSet"
import * as MutableRef from "@effect/data/MutableRef"
import * as Option from "@effect/data/Option"
import type { Predicate } from "@effect/data/Predicate"
import type * as Cause from "@effect/io/Cause"
import * as Debug from "@effect/io/Debug"
import type * as Deferred from "@effect/io/Deferred"
import type * as Effect from "@effect/io/Effect"
import type * as ExecutionStrategy from "@effect/io/ExecutionStrategy"
import type * as Exit from "@effect/io/Exit"
import type * as Fiber from "@effect/io/Fiber"
import * as FiberId from "@effect/io/Fiber/Id"
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags"
import * as RuntimeFlagsPatch from "@effect/io/Fiber/Runtime/Flags/Patch"
import type * as FiberStatus from "@effect/io/Fiber/Status"
import type * as FiberRef from "@effect/io/FiberRef"
import * as internalCause from "@effect/io/internal_effect_untraced/cause"
import * as deferred from "@effect/io/internal_effect_untraced/deferred"
import type * as FiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import type * as fiberScope from "@effect/io/internal_effect_untraced/fiberScope"
import * as DeferredOpCodes from "@effect/io/internal_effect_untraced/opCodes/deferred"
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/effect"
import * as _runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags"
import type * as LogLevel from "@effect/io/Logger/Level"
import type * as LogSpan from "@effect/io/Logger/Span"
import type * as MetricLabel from "@effect/io/Metric/Label"
import * as scheduler from "@effect/io/Scheduler"
import type * as Scheduler from "@effect/io/Scheduler"
import type * as Scope from "@effect/io/Scope"

// -----------------------------------------------------------------------------
// Effect
// -----------------------------------------------------------------------------

/** @internal */
const EffectErrorSymbolKey = "@effect/io/Effect/Error"

/** @internal */
export const EffectErrorTypeId = Symbol.for(EffectErrorSymbolKey)

/** @internal */
export type EffectErrorTypeId = typeof EffectErrorTypeId

/** @internal */
export interface EffectError<E> {
  readonly [EffectErrorTypeId]: EffectErrorTypeId
  readonly _tag: "EffectError"
  readonly cause: Cause.Cause<E>
}

/** @internal */
export const isEffectError = (u: unknown): u is EffectError<unknown> =>
  typeof u === "object" && u != null && EffectErrorTypeId in u

/** @internal */
export const makeEffectError = <E>(cause: Cause.Cause<E>): EffectError<E> => ({
  [EffectErrorTypeId]: EffectErrorTypeId,
  _tag: "EffectError",
  cause
})

/** @internal */
export const EffectTypeId: Effect.EffectTypeId = Symbol.for("@effect/io/Effect") as Effect.EffectTypeId

/** @internal */
export type Primitive =
  | Async
  | Commit
  | Failure
  | OnFailure
  | OnSuccess
  | OnSuccessAndFailure
  | Success
  | Sync
  | UpdateRuntimeFlags
  | While
  | WithRuntime
  | Yield
  | OpTraced

/** @internal */
export type Continuation =
  | OnSuccess
  | OnSuccessAndFailure
  | OnFailure
  | OpTraced
  | While
  | RevertFlags

/** @internal */
export class RevertFlags {
  readonly _tag = OpCodes.OP_REVERT_FLAGS
  constructor(readonly patch: RuntimeFlagsPatch.RuntimeFlagsPatch) {
  }
}

/** @internal */
class EffectPrimitive {
  public i0 = undefined
  public i1 = undefined
  public i2 = undefined
  public trace = undefined;
  [EffectTypeId] = effectVariance
  constructor(readonly _tag: Primitive["_tag"]) {}
  [Equal.symbol](this: {}, that: unknown) {
    return this === that
  }
  [Hash.symbol](this: {}) {
    return Hash.random(this)
  }
  traced(this: Effect.Effect<never, never, never>, trace: Debug.Trace): Effect.Effect<never, never, never> {
    if (trace) {
      const effect = new EffectPrimitive(OpCodes.OP_TRACED) as any
      effect.i0 = this
      effect.trace = trace
      return effect
    }
    return this
  }
}

/** @internal */
class EffectPrimitiveFailure {
  public i0 = undefined
  public i1 = undefined
  public i2 = undefined
  public trace = undefined;
  [EffectTypeId] = effectVariance
  constructor(readonly _tag: Primitive["_tag"]) {}
  [Equal.symbol](this: {}, that: unknown) {
    return this === that
  }
  [Hash.symbol](this: {}) {
    return Hash.random(this)
  }
  get cause() {
    return this.i0
  }
  traced(this: Effect.Effect<never, never, never>, trace: Debug.Trace): Effect.Effect<never, never, never> {
    if (trace) {
      const effect = new EffectPrimitive(OpCodes.OP_TRACED) as any
      effect.i0 = this
      effect.trace = trace
      return effect
    }
    return this
  }
}

/** @internal */
class EffectPrimitiveSuccess {
  public i0 = undefined
  public i1 = undefined
  public i2 = undefined
  public trace = undefined;
  [EffectTypeId] = effectVariance
  constructor(readonly _tag: Primitive["_tag"]) {}
  [Equal.symbol](this: {}, that: unknown) {
    return this === that
  }
  [Hash.symbol](this: {}) {
    return Hash.random(this)
  }
  get value() {
    return this.i0
  }
  traced(this: Effect.Effect<never, never, never>, trace: Debug.Trace): Effect.Effect<never, never, never> {
    if (trace) {
      const effect = new EffectPrimitive(OpCodes.OP_TRACED) as any
      effect.i0 = this
      effect.trace = trace
      return effect
    }
    return this
  }
}

/** @internal */
const effectVariance = {
  _R: (_: never) => _,
  _E: (_: never) => _,
  _A: (_: never) => _
}

/** @internal */
export type Op<Tag extends string, Body = {}> = Effect.Effect<never, never, never> & Body & {
  readonly _tag: Tag
}

/** @internal */
export interface Async extends
  Op<OpCodes.OP_ASYNC, {
    readonly i0: (resume: (effect: Primitive) => void) => void
    readonly i1: FiberId.FiberId
  }>
{}

/** @internal */
export interface Failure extends
  Op<OpCodes.OP_FAILURE, {
    readonly i0: Cause.Cause<unknown>
  }>
{}

export interface Commit extends
  Op<OpCodes.OP_COMMIT, {
    commit(): Effect.Effect<unknown, unknown, unknown>
  }>
{}

/** @internal */
export interface OnFailure extends
  Op<OpCodes.OP_ON_FAILURE, {
    readonly i0: Primitive
    readonly i1: (a: Cause.Cause<unknown>) => Primitive
  }>
{}

/** @internal */
export interface OnSuccess extends
  Op<OpCodes.OP_ON_SUCCESS, {
    readonly i0: Primitive
    readonly i1: (a: unknown) => Primitive
  }>
{}

/** @internal */
export interface OpTraced extends
  Op<OpCodes.OP_TRACED, {
    readonly i0: Primitive
    readonly trace: Debug.Trace
  }>
{}

/** @internal */
export interface OnSuccessAndFailure extends
  Op<OpCodes.OP_ON_SUCCESS_AND_FAILURE, {
    readonly i0: Primitive
    readonly i1: (a: Cause.Cause<unknown>) => Primitive
    readonly i2: (a: unknown) => Primitive
  }>
{}

/** @internal */
export interface Success extends
  Op<OpCodes.OP_SUCCESS, {
    readonly i0: unknown
  }>
{}

/** @internal */
export interface Sync extends
  Op<OpCodes.OP_SYNC, {
    readonly i0: LazyArg<unknown>
  }>
{}

/** @internal */
export interface UpdateRuntimeFlags extends
  Op<OpCodes.OP_UPDATE_RUNTIME_FLAGS, {
    readonly i0: RuntimeFlagsPatch.RuntimeFlagsPatch
    readonly i1?: (oldRuntimeFlags: RuntimeFlags.RuntimeFlags) => Primitive
  }>
{}

/** @internal */
export interface While extends
  Op<OpCodes.OP_WHILE, {
    readonly i0: () => boolean
    readonly i1: () => Primitive
    readonly i2: (a: unknown) => void
  }>
{}

/** @internal */
export interface WithRuntime extends
  Op<OpCodes.OP_WITH_RUNTIME, {
    readonly i0: (fiber: FiberRuntime.FiberRuntime<unknown, unknown>, status: FiberStatus.Running) => Primitive
  }>
{}

/** @internal */
export interface Yield extends Op<OpCodes.OP_YIELD> {}

/** @internal */
export const isEffect = (u: unknown): u is Effect.Effect<unknown, unknown, unknown> =>
  typeof u === "object" && u != null && EffectTypeId in u

/* @internal */
export const acquireUseRelease = Debug.dualWithTrace<
  <A, R2, E2, A2, R3, X>(
    use: (a: A) => Effect.Effect<R2, E2, A2>,
    release: (a: A, exit: Exit.Exit<E2, A2>) => Effect.Effect<R3, never, X>
  ) => <R, E>(acquire: Effect.Effect<R, E, A>) => Effect.Effect<R | R2 | R3, E | E2, A2>,
  <R, E, A, R2, E2, A2, R3, X>(
    acquire: Effect.Effect<R, E, A>,
    use: (a: A) => Effect.Effect<R2, E2, A2>,
    release: (a: A, exit: Exit.Exit<E2, A2>) => Effect.Effect<R3, never, X>
  ) => Effect.Effect<R | R2 | R3, E | E2, A2>
>(3, (trace, restoreTracing) =>
  (acquire, use, release) =>
    uninterruptibleMask((restore) =>
      pipe(
        acquire,
        flatMap((a) =>
          pipe(
            suspendSucceed(() => restore(restoreTracing(use)(a))),
            exit,
            flatMap((exit) =>
              pipe(
                suspendSucceed(() => restoreTracing(release)(a, exit)),
                matchCauseEffect(
                  (cause) => {
                    switch (exit._tag) {
                      case OpCodes.OP_FAILURE: {
                        return failCause(internalCause.parallel(exit.i0, cause))
                      }
                      case OpCodes.OP_SUCCESS: {
                        return failCause(cause)
                      }
                    }
                  },
                  () => exit
                )
              )
            )
          )
        )
      )
    ).traced(trace))

/* @internal */
export const as = Debug.dualWithTrace<
  <B>(value: B) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, B>,
  <R, E, A, B>(self: Effect.Effect<R, E, A>, value: B) => Effect.Effect<R, E, B>
>(2, (trace) => (self, value) => pipe(self, flatMap(() => succeed(value))).traced(trace))

/* @internal */
export const asUnit = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>) => pipe(self, as<void>(void 0)).traced(trace)
)

/* @internal */
export const async = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    register: (callback: (_: Effect.Effect<R, E, A>) => void) => void,
    blockingOn: FiberId.FiberId = FiberId.none
  ): Effect.Effect<R, E, A> => {
    const effect = new EffectPrimitive(OpCodes.OP_ASYNC) as any
    effect.i0 = register
    effect.i1 = blockingOn
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const asyncInterruptEither = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    register: (
      callback: (effect: Effect.Effect<R, E, A>) => void
    ) => Either.Either<Effect.Effect<R, never, void>, Effect.Effect<R, E, A>>,
    blockingOn: FiberId.FiberId = FiberId.none
  ): Effect.Effect<R, E, A> =>
    suspendSucceed(() => {
      let cancelerRef: Effect.Effect<R, never, void> = unit()
      return pipe(
        async<R, E, A>(
          (resume) => {
            const result = restore(register)(resume)
            if (Either.isRight(result)) {
              resume(result.right)
            } else {
              cancelerRef = result.left
            }
          },
          blockingOn
        ),
        onInterrupt(() => cancelerRef)
      )
    }).traced(trace)
)

/* @internal */
export const asyncInterrupt = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    register: (callback: (effect: Effect.Effect<R, E, A>) => void) => Effect.Effect<R, never, void>,
    blockingOn: FiberId.FiberId = FiberId.none
  ): Effect.Effect<R, E, A> =>
    suspendSucceed(() => {
      let cancelerRef: Effect.Effect<R, never, void> = unit()
      return pipe(
        async<R, E, A>(
          (resume) => {
            cancelerRef = restore(register)(resume)
          },
          blockingOn
        ),
        onInterrupt(() => cancelerRef)
      )
    }).traced(trace)
)

/* @internal */
export const catchAllCause = Debug.dualWithTrace<
  <E, R2, E2, A2>(
    f: (cause: Cause.Cause<E>) => Effect.Effect<R2, E2, A2>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R2 | R, E2, A2 | A>,
  <R, A, E, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    f: (cause: Cause.Cause<E>) => Effect.Effect<R2, E2, A2>
  ) => Effect.Effect<R2 | R, E2, A2 | A>
>(2, (trace, restore) =>
  (self, f) => {
    const effect = new EffectPrimitive(OpCodes.OP_ON_FAILURE) as any
    effect.i0 = self
    effect.i1 = restore(f)
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  })

/* @internal */
export const catchAll = Debug.dualWithTrace<
  <E, R2, E2, A2>(
    f: (e: E) => Effect.Effect<R2, E2, A2>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R2 | R, E2, A2 | A>,
  <R, A, E, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    f: (e: E) => Effect.Effect<R2, E2, A2>
  ) => Effect.Effect<R2 | R, E2, A2 | A>
>(2, (trace, restore) => (self, f) => pipe(self, matchEffect(restore(f), succeed)).traced(trace))

/**
 * @macro identity
 * @internal
 */
export const unified = <Args extends ReadonlyArray<any>, Ret extends Effect.Effect<any, any, any>>(
  f: (...args: Args) => Ret
) => (...args: Args): Effect.Effect.Unify<Ret> => f(...args)

/* @internal */
export const catchSome = Debug.dualWithTrace<
  <E, R2, E2, A2>(
    pf: (e: E) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R2 | R, E | E2, A2 | A>,
  <R, A, E, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    pf: (e: E) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => Effect.Effect<R2 | R, E | E2, A2 | A>
>(2, (trace, restore) =>
  (self, pf) =>
    pipe(
      self,
      matchCauseEffect(
        unified((cause) => {
          const either = internalCause.failureOrCause(cause)
          switch (either._tag) {
            case "Left": {
              return pipe(restore(pf)(either.left), Option.getOrElse(() => failCause(cause)))
            }
            case "Right": {
              return failCause(either.right)
            }
          }
        }),
        succeed
      )
    ).traced(trace))

/* @internal */
export const checkInterruptible = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(f: (isInterruptible: boolean) => Effect.Effect<R, E, A>): Effect.Effect<R, E, A> =>
    withFiberRuntime<R, E, A>(
      (_, status) => restore(f)(_runtimeFlags.interruption(status.runtimeFlags))
    ).traced(trace)
)

/* @internal */
export const die = Debug.methodWithTrace((trace) =>
  (defect: unknown): Effect.Effect<never, never, never> => failCause(internalCause.die(defect)).traced(trace)
)

/* @internal */
export const dieSync = Debug.methodWithTrace((trace, restore) =>
  (evaluate: LazyArg<unknown>): Effect.Effect<never, never, never> =>
    failCauseSync(() => internalCause.die(restore(evaluate)())).traced(trace)
)

/* @internal */
export const done = Debug.methodWithTrace((trace) =>
  <E, A>(exit: Exit.Exit<E, A>): Effect.Effect<never, E, A> => suspendSucceed(() => exit).traced(trace)
)

/* @internal */
export const either = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, Either.Either<E, A>> =>
    pipe(
      self,
      matchEffect(
        (e) => succeed(Either.left(e)),
        (a) => succeed(Either.right(a))
      )
    ).traced(trace)
)

/* @internal */
export const context = Debug.methodWithTrace((trace) =>
  <R>(): Effect.Effect<R, never, Context.Context<R>> =>
    suspendSucceed(
      () => fiberRefGet(currentContext) as Effect.Effect<never, never, Context.Context<R>>
    ).traced(trace)
)

/* @internal */
export const contextWithEffect = Debug.methodWithTrace((trace, restore) =>
  <R, R0, E, A>(
    f: (context: Context.Context<R0>) => Effect.Effect<R, E, A>
  ): Effect.Effect<R | R0, E, A> => pipe(context<R0>(), flatMap(restore(f))).traced(trace)
)

/* @internal */
export const exit = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, Exit.Exit<E, A>> =>
    pipe(
      self,
      matchCause(failCause, succeed)
    ).traced(trace) as Effect.Effect<R, never, Exit.Exit<E, A>>
)

/* @internal */
export const fail = Debug.methodWithTrace((trace) =>
  <E>(error: E): Effect.Effect<never, E, never> => failCause(internalCause.fail(error)).traced(trace)
)

/* @internal */
export const failSync = Debug.methodWithTrace((trace, restore) =>
  <E>(evaluate: LazyArg<E>): Effect.Effect<never, E, never> =>
    failCauseSync(() => internalCause.fail(restore(evaluate)())).traced(trace)
)

/* @internal */
export const failCause = Debug.methodWithTrace((trace) =>
  <E>(cause: Cause.Cause<E>): Effect.Effect<never, E, never> => {
    const effect = new EffectPrimitiveFailure(OpCodes.OP_FAILURE) as any
    effect.i0 = cause
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const failCauseSync = Debug.methodWithTrace((trace, restore) =>
  <E>(evaluate: LazyArg<Cause.Cause<E>>): Effect.Effect<never, E, never> =>
    flatMap(sync(restore(evaluate)), failCause).traced(trace)
)

/* @internal */
export const fiberId = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, FiberId.FiberId> =>
    withFiberRuntime<never, never, FiberId.FiberId>((state) => succeed(state.id())).traced(trace)
)

/* @internal */
export const fiberIdWith = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(f: (descriptor: FiberId.Runtime) => Effect.Effect<R, E, A>): Effect.Effect<R, E, A> =>
    withFiberRuntime<R, E, A>(
      (state) => restore(f)(state.id())
    ).traced(trace)
)

/* @internal */
export const flatMap = Debug.dualWithTrace<
  <A, R1, E1, B>(
    f: (a: A) => Effect.Effect<R1, E1, B>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R1 | R, E1 | E, B>,
  <R, E, A, R1, E1, B>(
    self: Effect.Effect<R, E, A>,
    f: (a: A) => Effect.Effect<R1, E1, B>
  ) => Effect.Effect<R1 | R, E1 | E, B>
>(2, (trace, restore) =>
  (self, f) => {
    const effect = new EffectPrimitive(OpCodes.OP_ON_SUCCESS) as any
    effect.i0 = self
    effect.i1 = restore(f)
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  })

/* @internal */
export const flatten = Debug.methodWithTrace((trace) =>
  <R, E, R1, E1, A>(self: Effect.Effect<R, E, Effect.Effect<R1, E1, A>>) => flatMap(self, identity).traced(trace)
)

/* @internal */
export const flip = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, A, E> =>
    pipe(self, matchEffect(succeed, fail)).traced(trace)
)

/* @internal */
export const matchCause = Debug.dualWithTrace<
  <E, A2, A, A3>(
    onFailure: (cause: Cause.Cause<E>) => A2,
    onSuccess: (a: A) => A3
  ) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, never, A2 | A3>,
  <R, E, A2, A, A3>(
    self: Effect.Effect<R, E, A>,
    onFailure: (cause: Cause.Cause<E>) => A2,
    onSuccess: (a: A) => A3
  ) => Effect.Effect<R, never, A2 | A3>
>(3, (trace, restore) =>
  (self, onFailure, onSuccess) =>
    pipe(
      self,
      matchCauseEffect(
        (cause) => succeed(restore(onFailure)(cause)),
        (a) => succeed(restore(onSuccess)(a))
      )
    ).traced(trace))

/* @internal */
export const matchCauseEffect = Debug.dualWithTrace<
  <E, A, R2, E2, A2, R3, E3, A3>(
    onFailure: (cause: Cause.Cause<E>) => Effect.Effect<R2, E2, A2>,
    onSuccess: (a: A) => Effect.Effect<R3, E3, A3>
  ) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R2 | R3 | R, E2 | E3, A2 | A3>,
  <R, E, A, R2, E2, A2, R3, E3, A3>(
    self: Effect.Effect<R, E, A>,
    onFailure: (cause: Cause.Cause<E>) => Effect.Effect<R2, E2, A2>,
    onSuccess: (a: A) => Effect.Effect<R3, E3, A3>
  ) => Effect.Effect<R2 | R3 | R, E2 | E3, A2 | A3>
>(3, (trace, restore) =>
  (self, onFailure, onSuccess) => {
    const effect = new EffectPrimitive(OpCodes.OP_ON_SUCCESS_AND_FAILURE) as any
    effect.i0 = self
    effect.i1 = restore(onFailure)
    effect.i2 = restore(onSuccess)
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  })

/* @internal */
export const matchEffect = Debug.dualWithTrace<
  <E, A, R2, E2, A2, R3, E3, A3>(
    onFailure: (e: E) => Effect.Effect<R2, E2, A2>,
    onSuccess: (a: A) => Effect.Effect<R3, E3, A3>
  ) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R2 | R3 | R, E2 | E3, A2 | A3>,
  <R, E, A, R2, E2, A2, R3, E3, A3>(
    self: Effect.Effect<R, E, A>,
    onFailure: (e: E) => Effect.Effect<R2, E2, A2>,
    onSuccess: (a: A) => Effect.Effect<R3, E3, A3>
  ) => Effect.Effect<R2 | R3 | R, E2 | E3, A2 | A3>
>(3, (trace, restore) =>
  (self, onFailure, onSuccess) =>
    matchCauseEffect(self, (cause) => {
      const failures = internalCause.failures(cause)
      const defects = internalCause.defects(cause)
      if (defects.length > 0) {
        return failCause(internalCause.electFailures(cause))
      }
      if (failures.length > 0) {
        return restore(onFailure)(Chunk.unsafeHead(failures))
      }
      return failCause(cause as Cause.Cause<never>)
    }, onSuccess).traced(trace))

/* @internal */
export const forEach = Debug.dualWithTrace<
  <A, R, E, B>(f: (a: A) => Effect.Effect<R, E, B>) => (self: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <A, R, E, B>(self: Iterable<A>, f: (a: A) => Effect.Effect<R, E, B>) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(2, (trace, restore) =>
  (self, f) =>
    suspendSucceed(() => {
      const arr = Array.from(self)
      const ret = new Array(arr.length)
      let i = 0
      return pipe(
        whileLoop(
          () => i < arr.length,
          () => restore(f)(arr[i]),
          (b) => {
            ret[i++] = b
          }
        ),
        as(Chunk.unsafeFromArray(ret))
      )
    }).traced(trace))

/* @internal */
export const forEachDiscard = Debug.dualWithTrace<
  <A, R, E, B>(f: (a: A) => Effect.Effect<R, E, B>) => (self: Iterable<A>) => Effect.Effect<R, E, void>,
  <A, R, E, B>(self: Iterable<A>, f: (a: A) => Effect.Effect<R, E, B>) => Effect.Effect<R, E, void>
>(2, (trace, restore) =>
  (self, f) =>
    suspendSucceed(() => {
      const arr = Array.from(self)
      let i = 0

      return whileLoop(
        () => i < arr.length,
        () => restore(f)(arr[i++]),
        () => {
          //
        }
      )
    }).traced(trace))

/* @internal */
export const fromOption = Debug.methodWithTrace((trace) =>
  <A>(option: Option.Option<A>): Effect.Effect<never, Option.Option<never>, A> => {
    switch (option._tag) {
      case "None": {
        return fail(Option.none()).traced(trace)
      }
      case "Some": {
        return succeed(option.value).traced(trace)
      }
    }
  }
)

/* @internal */
export const fromEither = Debug.methodWithTrace((trace) =>
  <E, A>(either: Either.Either<E, A>): Effect.Effect<never, E, A> => {
    switch (either._tag) {
      case "Left": {
        return fail(either.left).traced(trace)
      }
      case "Right": {
        return succeed(either.right).traced(trace)
      }
    }
  }
)

/* @internal */
export const ifEffect = Debug.dualWithTrace<
  <R1, R2, E1, E2, A, A1>(
    onTrue: Effect.Effect<R1, E1, A>,
    onFalse: Effect.Effect<R2, E2, A1>
  ) => <R, E>(
    self: Effect.Effect<R, E, boolean>
  ) => Effect.Effect<R1 | R2 | R, E1 | E2 | E, A | A1>,
  <R, E, R1, R2, E1, E2, A, A1>(
    self: Effect.Effect<R, E, boolean>,
    onTrue: Effect.Effect<R1, E1, A>,
    onFalse: Effect.Effect<R2, E2, A1>
  ) => Effect.Effect<R1 | R2 | R, E1 | E2 | E, A | A1>
>(3, (trace) =>
  (self, onTrue, onFalse) =>
    pipe(
      self,
      flatMap(unified((b) => (b ? onTrue : onFalse)))
    ).traced(trace))

/* @internal */
export const interrupt = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, never> => pipe(fiberId(), flatMap((fiberId) => interruptWith(fiberId))).traced(trace)
)

/* @internal */
export const interruptWith = Debug.methodWithTrace((trace) =>
  (fiberId: FiberId.FiberId): Effect.Effect<never, never, never> =>
    failCause(internalCause.interrupt(fiberId)).traced(trace)
)

/* @internal */
export const interruptible = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, E, A> => {
    const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS) as any
    effect.i0 = RuntimeFlagsPatch.enable(_runtimeFlags.Interruption)
    effect.i1 = () => self
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const interruptibleMask = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    f: (restore: <RX, EX, AX>(effect: Effect.Effect<RX, EX, AX>) => Effect.Effect<RX, EX, AX>) => Effect.Effect<R, E, A>
  ): Effect.Effect<R, E, A> => {
    const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS) as any
    effect.i0 = RuntimeFlagsPatch.enable(_runtimeFlags.Interruption)
    effect.i1 = (oldFlags: RuntimeFlags.RuntimeFlags) =>
      _runtimeFlags.interruption(oldFlags)
        ? restore(f)(interruptible)
        : restore(f)(uninterruptible)
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const intoDeferred = Debug.dualWithTrace<
  <E, A>(deferred: Deferred.Deferred<E, A>) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, never, boolean>,
  <R, E, A>(self: Effect.Effect<R, E, A>, deferred: Deferred.Deferred<E, A>) => Effect.Effect<R, never, boolean>
>(2, (trace) =>
  (self, deferred) =>
    uninterruptibleMask((restore) =>
      pipe(
        restore(self),
        exit,
        flatMap((exit) => deferredDone(deferred, exit))
      )
    ).traced(trace))

/* @internal */
export const map = Debug.dualWithTrace<
  <A, B>(f: (a: A) => B) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, B>,
  <R, E, A, B>(self: Effect.Effect<R, E, A>, f: (a: A) => B) => Effect.Effect<R, E, B>
>(2, (trace, restore) => (self, f) => pipe(self, flatMap((a) => sync(() => restore(f)(a)))).traced(trace))

/* @internal */
export const mapError = Debug.dualWithTrace<
  <E, E2>(f: (e: E) => E2) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E2, A>,
  <R, A, E, E2>(self: Effect.Effect<R, E, A>, f: (e: E) => E2) => Effect.Effect<R, E2, A>
>(2, (trace, restore) =>
  (self, f) =>
    matchCauseEffect(self, (cause) => {
      const either = internalCause.failureOrCause(cause)
      switch (either._tag) {
        case "Left": {
          return failSync(() => restore(f)(either.left))
        }
        case "Right": {
          return failCause(either.right)
        }
      }
    }, succeed).traced(trace))

/* @internal */
export const never = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, never> =>
    asyncInterruptEither<never, never, never>(() => {
      const interval = setInterval(() => {
        //
      }, 2 ** 31 - 1)
      return Either.left(sync(() => clearInterval(interval)))
    }).traced(trace)
)

/* @internal */
export const onError = Debug.dualWithTrace<
  <E, R2, X>(
    cleanup: (cause: Cause.Cause<E>) => Effect.Effect<R2, never, X>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R2 | R, E, A>,
  <R, A, E, R2, X>(
    self: Effect.Effect<R, E, A>,
    cleanup: (cause: Cause.Cause<E>) => Effect.Effect<R2, never, X>
  ) => Effect.Effect<R2 | R, E, A>
>(2, (trace, restore) =>
  (self, cleanup) =>
    onExit(
      self,
      unified((exit) =>
        exitIsSuccess(exit) ?
          unit() :
          restore(cleanup)(exit.i0)
      )
    ).traced(trace))

/* @internal */
export const onExit = Debug.dualWithTrace<
  <E, A, R2, X>(
    cleanup: (exit: Exit.Exit<E, A>) => Effect.Effect<R2, never, X>
  ) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R2 | R, E, A>,
  <R, E, A, R2, X>(
    self: Effect.Effect<R, E, A>,
    cleanup: (exit: Exit.Exit<E, A>) => Effect.Effect<R2, never, X>
  ) => Effect.Effect<R2 | R, E, A>
>(
  2,
  (trace, restoreTrace) =>
    (self, cleanup) =>
      uninterruptibleMask((restore) =>
        matchCauseEffect(restore(self), (cause1) => {
          const result = exitFailCause(cause1)
          return pipe(
            restoreTrace(cleanup)(result),
            matchCauseEffect(
              (cause2) => exitFailCause(internalCause.sequential(cause1, cause2)),
              () => result
            )
          )
        }, (success) => {
          const result = exitSucceed(success)
          return pipe(restoreTrace(cleanup)(result), zipRight(result))
        })
      ).traced(trace)
)

/* @internal */
export const onInterrupt = Debug.dualWithTrace<
  <R2, X>(
    cleanup: (interruptors: HashSet.HashSet<FiberId.FiberId>) => Effect.Effect<R2, never, X>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R2 | R, E, A>,
  <R, E, A, R2, X>(
    self: Effect.Effect<R, E, A>,
    cleanup: (interruptors: HashSet.HashSet<FiberId.FiberId>) => Effect.Effect<R2, never, X>
  ) => Effect.Effect<R2 | R, E, A>
>(2, (trace, restore) =>
  (self, cleanup) =>
    onExit(
      self,
      exitMatch(
        (cause) =>
          internalCause.isInterruptedOnly(cause) ?
            asUnit(restore(cleanup)(internalCause.interruptors(cause))) :
            unit(),
        () => unit()
      )
    ).traced(trace))

/* @internal */
export const orElse = Debug.dualWithTrace<
  <R2, E2, A2>(
    that: LazyArg<Effect.Effect<R2, E2, A2>>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E2, A | A2>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    that: LazyArg<Effect.Effect<R2, E2, A2>>
  ) => Effect.Effect<R | R2, E2, A | A2>
>(2, (trace, restore) => (self, that) => pipe(self, tryOrElse(restore(that), succeed)).traced(trace))

/* @internal */
export const orDie = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, A> => orDieWith(self, identity).traced(trace)
)

/* @internal */
export const orDieWith = Debug.dualWithTrace<
  <E>(f: (error: E) => unknown) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, never, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, f: (error: E) => unknown) => Effect.Effect<R, never, A>
>(2, (trace, restore) => (self, f) => pipe(self, matchEffect((e) => die(restore(f)(e)), succeed)).traced(trace))

/* @internal */
export const partitionMap = <A, A1, A2>(
  elements: Iterable<A>,
  f: (a: A) => Either.Either<A1, A2>
): readonly [Chunk.Chunk<A1>, Chunk.Chunk<A2>] =>
  Array.from(elements).reduceRight(
    ([lefts, rights], current) => {
      const either = f(current)
      switch (either._tag) {
        case "Left": {
          return [pipe(lefts, Chunk.prepend(either.left)), rights] as const
        }
        case "Right": {
          return [lefts, pipe(rights, Chunk.prepend(either.right))] as const
        }
      }
    },
    [Chunk.empty<A1>(), Chunk.empty<A2>()] as const
  )

/* @internal */
export const provideContext = Debug.dualWithTrace<
  <R>(context: Context.Context<R>) => <E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<never, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, context: Context.Context<R>) => Effect.Effect<never, E, A>
>(
  2,
  (trace) =>
    <R, E, A>(self: Effect.Effect<R, E, A>, context: Context.Context<R>) =>
      pipe(self as Effect.Effect<never, E, A>, fiberRefLocally(currentContext, context)).traced(trace)
)

/* @internal */
export const contramapContext = Debug.dualWithTrace<
  <R0, R>(
    f: (context: Context.Context<R0>) => Context.Context<R>
  ) => <E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R0, E, A>,
  <R0, R, E, A>(
    self: Effect.Effect<R, E, A>,
    f: (context: Context.Context<R0>) => Context.Context<R>
  ) => Effect.Effect<R0, E, A>
>(
  2,
  (trace, restore) =>
    <R0, R, E, A>(
      self: Effect.Effect<R, E, A>,
      f: (context: Context.Context<R0>) => Context.Context<R>
    ) =>
      contextWithEffect((context: Context.Context<R0>) => pipe(self, provideContext(restore(f)(context)))).traced(trace)
)

/* @internal */
export const runtimeFlags = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, RuntimeFlags.RuntimeFlags> =>
    withFiberRuntime<never, never, RuntimeFlags.RuntimeFlags>((_, status) => succeed(status.runtimeFlags))
      .traced(trace)
)

/* @internal */
export const service = Debug.methodWithTrace((trace) =>
  <T>(tag: Context.Tag<T>): Effect.Effect<T, never, T> => serviceWithEffect(tag, succeed).traced(trace)
)

/* @internal */
export const serviceWith = Debug.methodWithTrace((trace, restore) =>
  <T extends Context.Tag<any>, A>(
    tag: T,
    f: (a: Context.Tag.Service<T>) => A
  ): Effect.Effect<Context.Tag.Service<T>, never, A> =>
    serviceWithEffect(tag, (a) => sync(() => restore(f)(a))).traced(trace)
)

/* @internal */
export const serviceWithEffect = Debug.methodWithTrace((trace, restore) =>
  <T extends Context.Tag<any>, R, E, A>(
    tag: T,
    f: (a: Context.Tag.Service<T>) => Effect.Effect<R, E, A>
  ): Effect.Effect<R | Context.Tag.Service<T>, E, A> =>
    suspendSucceed(() =>
      pipe(
        fiberRefGet(currentContext),
        flatMap((env) => restore(f)(pipe(env, Context.unsafeGet(tag))))
      )
    ).traced(trace)
)

/* @internal */
export const succeed = Debug.methodWithTrace((trace) =>
  <A>(value: A): Effect.Effect<never, never, A> => {
    const effect = new EffectPrimitiveSuccess(OpCodes.OP_SUCCESS) as any
    effect.i0 = value
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const suspendSucceed = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    effect: LazyArg<Effect.Effect<R, E, A>>
  ): Effect.Effect<R, E, A> =>
    pipe(
      sync(restore(effect)),
      flatMap(identity)
    ).traced(trace)
)

/* @internal */
export const sync = Debug.methodWithTrace((trace, restore) =>
  <A>(evaluate: LazyArg<A>): Effect.Effect<never, never, A> => {
    const effect = new EffectPrimitive(OpCodes.OP_SYNC) as any
    effect.i0 = restore(evaluate)
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const tags = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, HashSet.HashSet<MetricLabel.MetricLabel>> => fiberRefGet(currentTags).traced(trace)
)

/* @internal */
export const tap = Debug.dualWithTrace<
  <A, R2, E2, _>(
    f: (a: A) => Effect.Effect<R2, E2, _>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A>,
  <R, E, A, R2, E2, _>(
    self: Effect.Effect<R, E, A>,
    f: (a: A) => Effect.Effect<R2, E2, _>
  ) => Effect.Effect<R | R2, E | E2, A>
>(2, (trace, restore) => (self, f) => pipe(self, flatMap((a) => pipe(restore(f)(a), as(a)))).traced(trace))

/* @internal */
export const transplant = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    f: (grafter: <R2, E2, A2>(effect: Effect.Effect<R2, E2, A2>) => Effect.Effect<R2, E2, A2>) => Effect.Effect<R, E, A>
  ): Effect.Effect<R, E, A> =>
    withFiberRuntime<R, E, A>((state) => {
      const scopeOverride = state.getFiberRef(forkScopeOverride)
      const scope = pipe(scopeOverride, Option.getOrElse(() => state.scope()))
      return restore(f)(fiberRefLocally(forkScopeOverride, Option.some(scope)))
    }).traced(trace)
)

/* @internal */
export const tryOrElse = Debug.dualWithTrace<
  <R2, E2, A2, A, R3, E3, A3>(
    that: LazyArg<Effect.Effect<R2, E2, A2>>,
    onSuccess: (a: A) => Effect.Effect<R3, E3, A3>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2 | R3, E2 | E3, A2 | A3>,
  <R, E, A, R2, E2, A2, R3, E3, A3>(
    self: Effect.Effect<R, E, A>,
    that: LazyArg<Effect.Effect<R2, E2, A2>>,
    onSuccess: (a: A) => Effect.Effect<R3, E3, A3>
  ) => Effect.Effect<R | R2 | R3, E2 | E3, A2 | A3>
>(3, (trace, restore) =>
  (self, that, onSuccess) =>
    matchCauseEffect(
      self,
      (cause) => {
        const defects = internalCause.defects(cause)
        if (defects.length > 0) {
          return failCause(Option.getOrThrow(internalCause.keepDefectsAndElectFailures(cause)))
        }
        return restore(that)()
      },
      restore(onSuccess)
    ).traced(trace))

/* @internal */
export const uninterruptible = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, E, A> => {
    const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS) as any
    effect.i0 = RuntimeFlagsPatch.disable(_runtimeFlags.Interruption)
    effect.i1 = () => self
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const uninterruptibleMask = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    f: (restore: <RX, EX, AX>(effect: Effect.Effect<RX, EX, AX>) => Effect.Effect<RX, EX, AX>) => Effect.Effect<R, E, A>
  ): Effect.Effect<R, E, A> => {
    const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS) as any
    effect.i0 = RuntimeFlagsPatch.disable(_runtimeFlags.Interruption)
    effect.i1 = (oldFlags: RuntimeFlags.RuntimeFlags) =>
      _runtimeFlags.interruption(oldFlags)
        ? restore(f)(interruptible)
        : restore(f)(uninterruptible)

    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const unit = Debug.methodWithTrace((trace) =>
  (_: void): Effect.Effect<never, never, void> => succeed(void 0).traced(trace)
)

/* @internal */
export const updateRuntimeFlags = Debug.methodWithTrace((trace) =>
  (patch: RuntimeFlagsPatch.RuntimeFlagsPatch): Effect.Effect<never, never, void> => {
    const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS) as any
    effect.i0 = patch
    effect.i1 = void 0
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const whenEffect = Debug.dualWithTrace<
  <R, E>(
    predicate: Effect.Effect<R, E, boolean>
  ) => <R2, E2, A>(
    effect: Effect.Effect<R2, E2, A>
  ) => Effect.Effect<R | R2, E | E2, Option.Option<A>>,
  <R, E, A, R2, E2>(
    self: Effect.Effect<R2, E2, A>,
    predicate: Effect.Effect<R, E, boolean>
  ) => Effect.Effect<R | R2, E | E2, Option.Option<A>>
>(2, (trace) =>
  (self, predicate) =>
    pipe(
      predicate,
      flatMap((b) => {
        if (b) {
          return pipe(self, map(Option.some))
        }
        return succeed(Option.none())
      })
    ).traced(trace))

/* @internal */
export const whileLoop = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    check: LazyArg<boolean>,
    body: LazyArg<Effect.Effect<R, E, A>>,
    process: (a: A) => void
  ): Effect.Effect<R, E, void> => {
    const effect = new EffectPrimitive(OpCodes.OP_WHILE) as any
    effect.i0 = restore(check)
    effect.i1 = restore(body)
    effect.i2 = restore(process)
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const withFiberRuntime = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    withRuntime: (fiber: FiberRuntime.FiberRuntime<E, A>, status: FiberStatus.Running) => Effect.Effect<R, E, A>
  ): Effect.Effect<R, E, A> => {
    const effect = new EffectPrimitive(OpCodes.OP_WITH_RUNTIME) as any
    effect.i0 = restore(withRuntime)
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const withParallelism = Debug.dualWithTrace<
  (parallelism: number) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, parallelism: number) => Effect.Effect<R, E, A>
>(2, (trace) =>
  (self, parallelism) =>
    suspendSucceed(
      () => fiberRefLocally(currentParallelism, Option.some(parallelism))(self)
    ).traced(trace))

/* @internal */
export const withParallelismUnbounded = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>) =>
    suspendSucceed(
      () => fiberRefLocally(currentParallelism, Option.none() as Option.Option<number>)(self)
    ).traced(trace)
)

/* @internal */
export const withRuntimeFlags = Debug.dualWithTrace<
  (update: RuntimeFlagsPatch.RuntimeFlagsPatch) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, update: RuntimeFlagsPatch.RuntimeFlagsPatch) => Effect.Effect<R, E, A>
>(2, (trace) =>
  (self, update) => {
    const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS) as any
    effect.i0 = update
    effect.i1 = () => self
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  })

/* @internal */
export const yieldNow = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, void> => {
    const effect = new EffectPrimitive(OpCodes.OP_YIELD) as any
    if (trace) {
      return effect.traced(trace)
    }
    return effect
  }
)

/* @internal */
export const zip = Debug.dualWithTrace<
  <R2, E2, A2>(
    that: Effect.Effect<R2, E2, A2>
  ) => <R, E, A>(
    self: Effect.Effect<R, E, A>
  ) => Effect.Effect<R | R2, E | E2, readonly [A, A2]>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    that: Effect.Effect<R2, E2, A2>
  ) => Effect.Effect<R | R2, E | E2, readonly [A, A2]>
>(2, (trace) => (self, that) => flatMap(self, (a) => map(that, (b) => [a, b] as const)).traced(trace))

/* @internal */
export const zipFlatten = Debug.dualWithTrace<
  <R2, E2, A2>(
    that: Effect.Effect<R2, E2, A2>
  ) => <R, E, A extends ReadonlyArray<any>>(
    self: Effect.Effect<R, E, A>
  ) => Effect.Effect<R | R2, E | E2, readonly [...A, A2]>,
  <R, E, A extends ReadonlyArray<any>, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    that: Effect.Effect<R2, E2, A2>
  ) => Effect.Effect<R | R2, E | E2, readonly [...A, A2]>
>(2, (trace) => (self, that) => flatMap(self, (a) => map(that, (b) => [...a, b] as const)).traced(trace))

/* @internal */
export const zipLeft = Debug.dualWithTrace<
  <R2, E2, A2>(
    that: Effect.Effect<R2, E2, A2>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    that: Effect.Effect<R2, E2, A2>
  ) => Effect.Effect<R | R2, E | E2, A>
>(2, (trace) => (self, that) => flatMap(self, (a) => as(that, a)).traced(trace))

/* @internal */
export const zipRight = Debug.dualWithTrace<
  <R2, E2, A2>(
    that: Effect.Effect<R2, E2, A2>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A2>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    that: Effect.Effect<R2, E2, A2>
  ) => Effect.Effect<R | R2, E | E2, A2>
>(2, (trace) => (self, that) => flatMap(self, () => that).traced(trace))

/* @internal */
export const zipWith = Debug.dualWithTrace<
  <R2, E2, A2, A, B>(
    that: Effect.Effect<R2, E2, A2>,
    f: (a: A, b: A2) => B
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, B>,
  <R, E, R2, E2, A2, A, B>(
    self: Effect.Effect<R, E, A>,
    that: Effect.Effect<R2, E2, A2>,
    f: (a: A, b: A2) => B
  ) => Effect.Effect<R | R2, E | E2, B>
>(3, (trace, restore) => (self, that, f) => flatMap(self, (a) => map(that, (b) => restore(f)(a, b))).traced(trace))

// -----------------------------------------------------------------------------
// Fiber
// -----------------------------------------------------------------------------

/* @internal */
export const interruptFiber = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.Fiber<E, A>): Effect.Effect<never, never, Exit.Exit<E, A>> =>
    pipe(
      fiberId(),
      flatMap((fiberId) => pipe(self, interruptAsFiber(fiberId)))
    ).traced(trace)
)

/* @internal */
export const interruptAsFiber = Debug.dualWithTrace<
  (fiberId: FiberId.FiberId) => <E, A>(self: Fiber.Fiber<E, A>) => Effect.Effect<never, never, Exit.Exit<E, A>>,
  <E, A>(self: Fiber.Fiber<E, A>, fiberId: FiberId.FiberId) => Effect.Effect<never, never, Exit.Exit<E, A>>
>(2, (trace) => (self, fiberId) => pipe(self.interruptAsFork(fiberId), flatMap(() => self.await())).traced(trace))

// -----------------------------------------------------------------------------
// LogLevel
// -----------------------------------------------------------------------------

/** @internal */
export const logLevelAll: LogLevel.LogLevel = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER
}

/** @internal */
export const logLevelFatal: LogLevel.LogLevel = {
  _tag: "Fatal",
  syslog: 2,
  label: "FATAL",
  ordinal: 50000
}

/** @internal */
export const logLevelError: LogLevel.LogLevel = {
  _tag: "Error",
  syslog: 3,
  label: "ERROR",
  ordinal: 40000
}

/** @internal */
export const logLevelWarning: LogLevel.LogLevel = {
  _tag: "Warning",
  syslog: 4,
  label: "WARN",
  ordinal: 30000
}

/** @internal */
export const logLevelInfo: LogLevel.LogLevel = {
  _tag: "Info",
  syslog: 6,
  label: "INFO",
  ordinal: 20000
}

/** @internal */
export const logLevelDebug: LogLevel.LogLevel = {
  _tag: "Debug",
  syslog: 7,
  label: "DEBUG",
  ordinal: 10000
}

/** @internal */
export const logLevelTrace: LogLevel.LogLevel = {
  _tag: "Trace",
  syslog: 7,
  label: "TRACE",
  ordinal: 0
}

/** @internal */
export const logLevelNone: LogLevel.LogLevel = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER
}

// -----------------------------------------------------------------------------
// FiberRef
// -----------------------------------------------------------------------------

/** @internal */
const FiberRefSymbolKey = "@effect/io/FiberRef"

/** @internal */
export const FiberRefTypeId: FiberRef.FiberRefTypeId = Symbol.for(
  FiberRefSymbolKey
) as FiberRef.FiberRefTypeId

/** @internal */
const fiberRefVariance = {
  _A: (_: never) => _
}

/* @internal */
export const fiberRefGet = Debug.methodWithTrace((trace) =>
  <A>(self: FiberRef.FiberRef<A>): Effect.Effect<never, never, A> =>
    fiberRefModify(self, (a) => [a, a] as const).traced(trace)
)

/* @internal */
export const fiberRefGetAndSet = Debug.dualWithTrace<
  <A>(value: A) => (self: FiberRef.FiberRef<A>) => Effect.Effect<never, never, A>,
  <A>(self: FiberRef.FiberRef<A>, value: A) => Effect.Effect<never, never, A>
>(2, (trace) => (self, value) => fiberRefModify(self, (v) => [v, value] as const).traced(trace))

/* @internal */
export const fiberRefGetAndUpdate = Debug.dualWithTrace<
  <A>(f: (a: A) => A) => (self: FiberRef.FiberRef<A>) => Effect.Effect<never, never, A>,
  <A>(self: FiberRef.FiberRef<A>, f: (a: A) => A) => Effect.Effect<never, never, A>
>(2, (trace, restore) => (self, f) => fiberRefModify(self, (v) => [v, restore(f)(v)] as const).traced(trace))

/* @internal */
export const fiberRefGetAndUpdateSome = Debug.dualWithTrace<
  <A>(
    pf: (a: A) => Option.Option<A>
  ) => (self: FiberRef.FiberRef<A>) => Effect.Effect<never, never, A>,
  <A>(
    self: FiberRef.FiberRef<A>,
    pf: (a: A) => Option.Option<A>
  ) => Effect.Effect<never, never, A>
>(
  2,
  (trace, restore) =>
    (self, pf) => fiberRefModify(self, (v) => [v, Option.getOrElse(restore(pf)(v), () => v)] as const).traced(trace)
)

/* @internal */
export const fiberRefGetWith = Debug.dualWithTrace<
  <A, R, E, B>(f: (a: A) => Effect.Effect<R, E, B>) => (self: FiberRef.FiberRef<A>) => Effect.Effect<R, E, B>,
  <A, R, E, B>(self: FiberRef.FiberRef<A>, f: (a: A) => Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>
>(2, (trace, restore) => (self, f) => flatMap(fiberRefGet(self), restore(f)).traced(trace))

/* @internal */
export const fiberRefSet = Debug.dualWithTrace<
  <A>(value: A) => (self: FiberRef.FiberRef<A>) => Effect.Effect<never, never, void>,
  <A>(self: FiberRef.FiberRef<A>, value: A) => Effect.Effect<never, never, void>
>(2, (trace) => (self, value) => fiberRefModify(self, () => [void 0, value] as const).traced(trace))

/* @internal */
export const fiberRefDelete = Debug.methodWithTrace((trace) =>
  <A>(self: FiberRef.FiberRef<A>): Effect.Effect<never, never, void> =>
    withFiberRuntime<never, never, void>((state) => {
      state.unsafeDeleteFiberRef(self)
      return unit()
    }).traced(trace)
)

/* @internal */
export const fiberRefReset = Debug.methodWithTrace((trace) =>
  <A>(self: FiberRef.FiberRef<A>): Effect.Effect<never, never, void> => fiberRefSet(self, self.initial).traced(trace)
)

/* @internal */
export const fiberRefModify = Debug.dualWithTrace<
  <A, B>(f: (a: A) => readonly [B, A]) => (self: FiberRef.FiberRef<A>) => Effect.Effect<never, never, B>,
  <A, B>(self: FiberRef.FiberRef<A>, f: (a: A) => readonly [B, A]) => Effect.Effect<never, never, B>
>(2, (trace, restore) =>
  <A, B>(
    self: FiberRef.FiberRef<A>,
    f: (a: A) => readonly [B, A]
  ): Effect.Effect<never, never, B> =>
    withFiberRuntime<never, never, B>((state) => {
      const [b, a] = restore(f)(state.getFiberRef(self) as A)
      state.setFiberRef(self, a)
      return succeed(b)
    }).traced(trace))

/* @internal */
export const fiberRefModifySome = Debug.methodWithTrace((trace, restore) =>
  <A, B>(
    self: FiberRef.FiberRef<A>,
    def: B,
    f: (a: A) => Option.Option<readonly [B, A]>
  ): Effect.Effect<never, never, B> =>
    fiberRefModify(self, (v) => Option.getOrElse(restore(f)(v), () => [def, v] as const)).traced(trace)
)

/* @internal */
export const fiberRefUpdate = Debug.dualWithTrace<
  <A>(f: (a: A) => A) => (self: FiberRef.FiberRef<A>) => Effect.Effect<never, never, void>,
  <A>(self: FiberRef.FiberRef<A>, f: (a: A) => A) => Effect.Effect<never, never, void>
>(2, (trace, restore) => (self, f) => fiberRefModify(self, (v) => [void 0, restore(f)(v)] as const).traced(trace))

/* @internal */
export const fiberRefUpdateSome = Debug.dualWithTrace<
  <A>(pf: (a: A) => Option.Option<A>) => (self: FiberRef.FiberRef<A>) => Effect.Effect<never, never, void>,
  <A>(self: FiberRef.FiberRef<A>, pf: (a: A) => Option.Option<A>) => Effect.Effect<never, never, void>
>(
  2,
  (trace, restore) =>
    (self, pf) =>
      fiberRefModify(self, (v) => [void 0, Option.getOrElse(restore(pf)(v), () => v)] as const).traced(trace)
)

/* @internal */
export const fiberRefUpdateAndGet = Debug.dualWithTrace<
  <A>(f: (a: A) => A) => (self: FiberRef.FiberRef<A>) => Effect.Effect<never, never, A>,
  <A>(self: FiberRef.FiberRef<A>, f: (a: A) => A) => Effect.Effect<never, never, A>
>(2, (trace, restore) =>
  (self, f) =>
    fiberRefModify(self, (v) => {
      const result = restore(f)(v)
      return [result, result] as const
    }).traced(trace))

/* @internal */
export const fiberRefUpdateSomeAndGet = Debug.dualWithTrace<
  <A>(pf: (a: A) => Option.Option<A>) => (self: FiberRef.FiberRef<A>) => Effect.Effect<never, never, A>,
  <A>(self: FiberRef.FiberRef<A>, pf: (a: A) => Option.Option<A>) => Effect.Effect<never, never, A>
>(2, (trace, restore) =>
  (self, pf) =>
    fiberRefModify(self, (v) => {
      const result = pipe(restore(pf)(v), Option.getOrElse(() => v))
      return [result, result] as const
    }).traced(trace))

/* @internal */
export const fiberRefLocally = Debug.dualWithTrace<
  <A>(self: FiberRef.FiberRef<A>, value: A) => <R, E, B>(use: Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>,
  <R, E, B, A>(use: Effect.Effect<R, E, B>, self: FiberRef.FiberRef<A>, value: A) => Effect.Effect<R, E, B>
>(3, (trace) =>
  (use, self, value) =>
    acquireUseRelease(
      zipLeft(fiberRefGet(self), fiberRefSet(self, value)),
      () => use,
      (oldValue) => fiberRefSet(self, oldValue)
    ).traced(trace))

/* @internal */
export const fiberRefLocallyWith = Debug.dualWithTrace<
  <A>(self: FiberRef.FiberRef<A>, f: (a: A) => A) => <R, E, B>(use: Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>,
  <R, E, B, A>(use: Effect.Effect<R, E, B>, self: FiberRef.FiberRef<A>, f: (a: A) => A) => Effect.Effect<R, E, B>
>(
  3,
  (trace, restore) =>
    (use, self, f) => fiberRefGetWith(self, (a) => pipe(use, fiberRefLocally(self, restore(f)(a)))).traced(trace)
)

/** @internal */
export const fiberRefUnsafeMake = <Value>(
  initial: Value,
  fork: (a: Value) => Value = identity,
  join: (left: Value, right: Value) => Value = (_, a) => a
): FiberRef.FiberRef<Value> =>
  fiberRefUnsafeMakePatch(
    initial,
    Differ.update(),
    fork,
    join
  )

/** @internal */
export const fiberRefUnsafeMakeHashSet = <A>(
  initial: HashSet.HashSet<A>
): FiberRef.FiberRef<HashSet.HashSet<A>> =>
  fiberRefUnsafeMakePatch(
    initial,
    Differ.hashSet(),
    HashSetPatch.empty()
  )

/** @internal */
export const fiberRefUnsafeMakeContext = <A>(
  initial: Context.Context<A>
): FiberRef.FiberRef<Context.Context<A>> =>
  fiberRefUnsafeMakePatch(
    initial,
    Differ.environment(),
    ContextPatch.empty()
  )

/** @internal */
export const fiberRefUnsafeMakePatch = <Value, Patch>(
  initial: Value,
  differ: Differ.Differ<Value, Patch>,
  fork: Patch,
  join: (oldV: Value, newV: Value) => Value = (_, n) => n
): FiberRef.FiberRef<Value> => ({
  [FiberRefTypeId]: fiberRefVariance,
  initial,
  diff: (oldValue, newValue) => pipe(differ, Differ.diff(oldValue, newValue)),
  combine: (first, second) => pipe(differ, Differ.combine(first as Patch, second as Patch)),
  patch: (patch) => (oldValue) => pipe(differ, Differ.patch(patch as Patch, oldValue)),
  fork,
  join
})

/** @internal */
export const fiberRefUnsafeMakeRuntimeFlags = (
  initial: RuntimeFlags.RuntimeFlags
): FiberRef.FiberRef<RuntimeFlags.RuntimeFlags> =>
  fiberRefUnsafeMakePatch(
    initial,
    _runtimeFlags.differ(),
    RuntimeFlagsPatch.empty
  )

/** @internal */
export const currentContext: FiberRef.FiberRef<Context.Context<never>> = fiberRefUnsafeMakeContext(
  Context.empty()
)

/** @internal */
export const currentLogAnnotations: FiberRef.FiberRef<HashMap.HashMap<string, string>> = fiberRefUnsafeMake(
  HashMap.empty()
)

/** @internal */
export const currentLogLevel: FiberRef.FiberRef<LogLevel.LogLevel> = fiberRefUnsafeMake<LogLevel.LogLevel>(
  logLevelInfo
)

/** @internal */
export const currentLogSpan: FiberRef.FiberRef<Chunk.Chunk<LogSpan.LogSpan>> = fiberRefUnsafeMake(
  Chunk.empty<LogSpan.LogSpan>()
)

/** @internal */
export const currentScheduler: FiberRef.FiberRef<Scheduler.Scheduler> = fiberRefUnsafeMake(scheduler.defaultScheduler)

/** @internal */
export const currentParallelism: FiberRef.FiberRef<Option.Option<number>> = fiberRefUnsafeMake<Option.Option<number>>(
  Option.none()
)

/** @internal */
export const currentTags: FiberRef.FiberRef<HashSet.HashSet<MetricLabel.MetricLabel>> = fiberRefUnsafeMakeHashSet(
  HashSet.empty()
)

/** @internal */
export const forkScopeOverride: FiberRef.FiberRef<Option.Option<fiberScope.FiberScope>> = fiberRefUnsafeMake(
  Option.none(),
  () => Option.none() as Option.Option<fiberScope.FiberScope>,
  (parent, _) => parent
)

/** @internal */
export const interruptedCause: FiberRef.FiberRef<Cause.Cause<never>> = fiberRefUnsafeMake(
  internalCause.empty,
  () => internalCause.empty,
  (parent, _) => parent
)

// -----------------------------------------------------------------------------
// Scope
// -----------------------------------------------------------------------------

/** @internal */
export const ScopeTypeId: Scope.ScopeTypeId = Symbol.for("@effect/io/Scope") as Scope.ScopeTypeId

/** @internal */
export const CloseableScopeTypeId: Scope.CloseableScopeTypeId = Symbol.for(
  "@effect/io/CloseableScope"
) as Scope.CloseableScopeTypeId

/* @internal */
export const scopeAddFinalizer = Debug.methodWithTrace((trace) =>
  (self: Scope.Scope, finalizer: Effect.Effect<never, never, unknown>): Effect.Effect<never, never, void> =>
    self.addFinalizer(() => asUnit(finalizer)).traced(trace)
)

/* @internal */
export const scopeAddFinalizerExit = Debug.methodWithTrace((trace, restore) =>
  (self: Scope.Scope, finalizer: Scope.Scope.Finalizer): Effect.Effect<never, never, void> =>
    self.addFinalizer(restore(finalizer)).traced(trace)
)

/* @internal */
export const scopeClose = Debug.methodWithTrace((trace) =>
  (self: Scope.Scope.Closeable, exit: Exit.Exit<unknown, unknown>): Effect.Effect<never, never, void> =>
    self.close(exit).traced(trace)
)

/* @internal */
export const scopeFork = Debug.methodWithTrace((trace) =>
  (
    self: Scope.Scope,
    strategy: ExecutionStrategy.ExecutionStrategy
  ): Effect.Effect<never, never, Scope.Scope.Closeable> => self.fork(strategy).traced(trace)
)

// -----------------------------------------------------------------------------
// ReleaseMap
// -----------------------------------------------------------------------------

/** @internal */
export type ReleaseMapState = {
  _tag: "Exited"
  nextKey: number
  exit: Exit.Exit<unknown, unknown>
  update: (finalizer: Scope.Scope.Finalizer) => Scope.Scope.Finalizer
} | {
  _tag: "Running"
  nextKey: number
  finalizers: Map<number, Scope.Scope.Finalizer>
  update: (finalizer: Scope.Scope.Finalizer) => Scope.Scope.Finalizer
}

/** @internal */
export interface ReleaseMap {
  state: ReleaseMapState
}

/* @internal */
export const releaseMapAdd = Debug.dualWithTrace<
  (finalizer: Scope.Scope.Finalizer) => (self: ReleaseMap) => Effect.Effect<never, never, Scope.Scope.Finalizer>,
  (self: ReleaseMap, finalizer: Scope.Scope.Finalizer) => Effect.Effect<never, never, Scope.Scope.Finalizer>
>(2, (trace, restore) =>
  (self, finalizer) =>
    pipe(
      self,
      releaseMapAddIfOpen(restore(finalizer)),
      map(Option.match(
        (): Scope.Scope.Finalizer => () => unit(),
        (key): Scope.Scope.Finalizer => (exit) => releaseMapRelease(key, exit)(self)
      ))
    ).traced(trace))

/* @internal */
export const releaseMapRelease = Debug.dualWithTrace<
  (key: number, exit: Exit.Exit<unknown, unknown>) => (self: ReleaseMap) => Effect.Effect<never, never, void>,
  (self: ReleaseMap, key: number, exit: Exit.Exit<unknown, unknown>) => Effect.Effect<never, never, void>
>(3, (trace) =>
  (self, key, exit) =>
    suspendSucceed(() => {
      switch (self.state._tag) {
        case "Exited": {
          return unit()
        }
        case "Running": {
          const finalizer = self.state.finalizers.get(key)
          self.state.finalizers.delete(key)
          if (finalizer != null) {
            return self.state.update(finalizer)(exit)
          }
          return unit()
        }
      }
    }).traced(trace))

/* @internal */
export const releaseMapAddIfOpen = Debug.dualWithTrace<
  (finalizer: Scope.Scope.Finalizer) => (self: ReleaseMap) => Effect.Effect<never, never, Option.Option<number>>,
  (self: ReleaseMap, finalizer: Scope.Scope.Finalizer) => Effect.Effect<never, never, Option.Option<number>>
>(2, (trace, restore) =>
  (self, finalizer) =>
    suspendSucceed(() => {
      switch (self.state._tag) {
        case "Exited": {
          self.state.nextKey += 1
          return pipe(restore(finalizer)(self.state.exit), as(Option.none()))
        }
        case "Running": {
          const key = self.state.nextKey
          self.state.finalizers.set(key, finalizer)
          self.state.nextKey += 1
          return succeed(Option.some(key))
        }
      }
    }).traced(trace))

/* @internal */
export const releaseMapGet = Debug.dualWithTrace<
  (key: number) => (self: ReleaseMap) => Effect.Effect<never, never, Option.Option<Scope.Scope.Finalizer>>,
  (self: ReleaseMap, key: number) => Effect.Effect<never, never, Option.Option<Scope.Scope.Finalizer>>
>(
  2,
  (trace) =>
    (self, key) =>
      sync((): Option.Option<Scope.Scope.Finalizer> =>
        self.state._tag === "Running" ? Option.fromNullable(self.state.finalizers.get(key)) : Option.none()
      ).traced(trace)
)

/* @internal */
export const releaseMapReplace = Debug.dualWithTrace<
  (
    key: number,
    finalizer: Scope.Scope.Finalizer
  ) => (self: ReleaseMap) => Effect.Effect<never, never, Option.Option<Scope.Scope.Finalizer>>,
  (
    self: ReleaseMap,
    key: number,
    finalizer: Scope.Scope.Finalizer
  ) => Effect.Effect<never, never, Option.Option<Scope.Scope.Finalizer>>
>(
  3,
  (trace, restore) =>
    (self, key, finalizer) =>
      suspendSucceed(() => {
        switch (self.state._tag) {
          case "Exited": {
            return as(Option.none())(restore(finalizer)(self.state.exit))
          }
          case "Running": {
            const fin = Option.fromNullable(self.state.finalizers.get(key))
            self.state.finalizers.set(key, restore(finalizer))
            return succeed(fin)
          }
        }
      }).traced(trace)
)

/* @internal */
export const releaseMapRemove = Debug.dualWithTrace<
  (key: number) => (self: ReleaseMap) => Effect.Effect<never, never, Option.Option<Scope.Scope.Finalizer>>,
  (self: ReleaseMap, key: number) => Effect.Effect<never, never, Option.Option<Scope.Scope.Finalizer>>
>(2, (trace) =>
  (self, key) =>
    sync(() => {
      if (self.state._tag === "Exited") {
        return Option.none()
      }
      const fin = Option.fromNullable(self.state.finalizers.get(key))
      self.state.finalizers.delete(key)
      return fin
    }).traced(trace))

/* @internal */
export const releaseMapMake = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, ReleaseMap> =>
    sync((): ReleaseMap => ({
      state: {
        _tag: "Running",
        nextKey: 0,
        finalizers: new Map(),
        update: identity
      }
    })).traced(trace)
)

// -----------------------------------------------------------------------------
// Exit
// -----------------------------------------------------------------------------

/** @internal */
export const exitIsExit = (u: unknown): u is Exit.Exit<unknown, unknown> =>
  isEffect(u) && "_tag" in u && (u._tag === "Success" || u._tag === "Failure")

/** @internal */
export const exitIsFailure = <E, A>(self: Exit.Exit<E, A>): self is Exit.Failure<E> => self._tag === "Failure"

/** @internal */
export const exitIsSuccess = <E, A>(self: Exit.Exit<E, A>): self is Exit.Success<A> => self._tag === "Success"

/** @internal */
export const exitIsInterrupted = <E, A>(self: Exit.Exit<E, A>): boolean => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return internalCause.isInterrupted(self.i0)
    }
    case OpCodes.OP_SUCCESS: {
      return false
    }
  }
}

/** @internal */
export const exitAs = dual<
  <A2>(value: A2) => <E, A>(self: Exit.Exit<E, A>) => Exit.Exit<E, A2>,
  <E, A, A2>(self: Exit.Exit<E, A>, value: A2) => Exit.Exit<E, A2>
>(2, <E, A, A2>(self: Exit.Exit<E, A>, value: A2) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return self as Exit.Exit<E, A2>
    }
    case OpCodes.OP_SUCCESS: {
      return exitSucceed(value) as Exit.Exit<E, A2>
    }
  }
})

/** @internal */
export const exitAsUnit = <E, A>(self: Exit.Exit<E, A>): Exit.Exit<E, void> =>
  exitAs(self, void 0) as Exit.Exit<E, void>

/** @internal */
export const exitCauseOption = <E, A>(self: Exit.Exit<E, A>): Option.Option<Cause.Cause<E>> => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return Option.some(self.i0)
    }
    case OpCodes.OP_SUCCESS: {
      return Option.none()
    }
  }
}

/** @internal */
export const exitCollectAll = <E, A>(
  exits: Iterable<Exit.Exit<E, A>>
): Option.Option<Exit.Exit<E, Chunk.Chunk<A>>> => exitCollectAllInternal(exits, internalCause.sequential)

/** @internal */
export const exitCollectAllPar = <E, A>(
  exits: Iterable<Exit.Exit<E, A>>
): Option.Option<Exit.Exit<E, Chunk.Chunk<A>>> => exitCollectAllInternal(exits, internalCause.parallel)

/** @internal */
export const exitDie = (defect: unknown): Exit.Exit<never, never> =>
  exitFailCause(internalCause.die(defect)) as Exit.Exit<never, never>

/** @internal */
export const exitExists = dual<
  <A>(predicate: Predicate<A>) => <E>(self: Exit.Exit<E, A>) => boolean,
  <E, A>(self: Exit.Exit<E, A>, predicate: Predicate<A>) => boolean
>(2, (self, predicate) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return false
    }
    case OpCodes.OP_SUCCESS: {
      return predicate(self.i0)
    }
  }
})

/** @internal */
export const exitFail = <E>(error: E): Exit.Exit<E, never> =>
  exitFailCause(internalCause.fail(error)) as Exit.Exit<E, never>

/** @internal */
export const exitFailCause = <E>(cause: Cause.Cause<E>): Exit.Exit<E, never> => {
  const effect = new EffectPrimitiveFailure(OpCodes.OP_FAILURE) as any
  effect.i0 = cause
  return effect
}

/** @internal */
export const exitFlatMap = dual<
  <A, E2, A2>(f: (a: A) => Exit.Exit<E2, A2>) => <E>(self: Exit.Exit<E, A>) => Exit.Exit<E | E2, A2>,
  <E, A, E2, A2>(self: Exit.Exit<E, A>, f: (a: A) => Exit.Exit<E2, A2>) => Exit.Exit<E | E2, A2>
>(2, <E, A, E2, A2>(self: Exit.Exit<E, A>, f: (a: A) => Exit.Exit<E2, A2>) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return self as Exit.Exit<E | E2, A2>
    }
    case OpCodes.OP_SUCCESS: {
      return f(self.i0) as Exit.Exit<E | E2, A2>
    }
  }
})

/** @internal */
export const exitFlatMapEffect = Debug.dualWithTrace<
  <E, A, R, E2, A2>(
    f: (a: A) => Effect.Effect<R, E2, Exit.Exit<E, A2>>
  ) => (self: Exit.Exit<E, A>) => Effect.Effect<R, E2, Exit.Exit<E, A2>>,
  <E, A, R, E2, A2>(
    self: Exit.Exit<E, A>,
    f: (a: A) => Effect.Effect<R, E2, Exit.Exit<E, A2>>
  ) => Effect.Effect<R, E2, Exit.Exit<E, A2>>
>(2, (trace, restore) =>
  (self, f) => {
    switch (self._tag) {
      case OpCodes.OP_FAILURE: {
        return succeed(self).traced(trace)
      }
      case OpCodes.OP_SUCCESS: {
        return restore(f)(self.i0).traced(trace)
      }
    }
  })

/** @internal */
export const exitFlatten = <E, E1, A>(
  self: Exit.Exit<E, Exit.Exit<E1, A>>
): Exit.Exit<E | E1, A> => pipe(self, exitFlatMap(identity)) as Exit.Exit<E | E1, A>

/** @internal */
export const exitForEachEffect = Debug.dualWithTrace<
  <A, R, E2, B>(
    f: (a: A) => Effect.Effect<R, E2, B>
  ) => <E>(self: Exit.Exit<E, A>) => Effect.Effect<R, never, Exit.Exit<E | E2, B>>,
  <E, A, R, E2, B>(
    self: Exit.Exit<E, A>,
    f: (a: A) => Effect.Effect<R, E2, B>
  ) => Effect.Effect<R, never, Exit.Exit<E | E2, B>>
>(2, (trace, restore) =>
  (self, f) => {
    switch (self._tag) {
      case OpCodes.OP_FAILURE: {
        return succeed(exitFailCause(self.i0)).traced(trace)
      }
      case OpCodes.OP_SUCCESS: {
        return exit(restore(f)(self.i0)).traced(trace)
      }
    }
  })

/** @internal */
export const exitFromEither = <E, A>(either: Either.Either<E, A>): Exit.Exit<E, A> => {
  switch (either._tag) {
    case "Left": {
      return exitFail(either.left) as Exit.Exit<E, A>
    }
    case "Right": {
      return exitSucceed(either.right) as Exit.Exit<E, A>
    }
  }
}

/** @internal */
export const exitFromOption = <A>(option: Option.Option<A>): Exit.Exit<void, A> => {
  switch (option._tag) {
    case "None": {
      return exitFail(void 0) as Exit.Exit<void, A>
    }
    case "Some": {
      return exitSucceed(option.value) as Exit.Exit<void, A>
    }
  }
}

/** @internal */
export const exitGetOrElse = dual<
  <E, A>(orElse: (cause: Cause.Cause<E>) => A) => (self: Exit.Exit<E, A>) => A,
  <E, A>(self: Exit.Exit<E, A>, orElse: (cause: Cause.Cause<E>) => A) => A
>(2, (self, orElse) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return orElse(self.i0)
    }
    case OpCodes.OP_SUCCESS: {
      return self.i0
    }
  }
})

/** @internal */
export const exitInterrupt = (fiberId: FiberId.FiberId): Exit.Exit<never, never> =>
  exitFailCause(internalCause.interrupt(fiberId)) as Exit.Exit<never, never>

/** @internal */
export const exitMap = dual<
  <A, B>(f: (a: A) => B) => <E>(self: Exit.Exit<E, A>) => Exit.Exit<E, B>,
  <E, A, B>(self: Exit.Exit<E, A>, f: (a: A) => B) => Exit.Exit<E, B>
>(2, <E, A, B>(self: Exit.Exit<E, A>, f: (a: A) => B) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return self as Exit.Exit<E, B>
    }
    case OpCodes.OP_SUCCESS: {
      return exitSucceed(f(self.i0)) as Exit.Exit<E, B>
    }
  }
})

/** @internal */
export const exitMapBoth = dual<
  <E, A, E2, A2>(
    onFailure: (e: E) => E2,
    onSuccess: (a: A) => A2
  ) => (self: Exit.Exit<E, A>) => Exit.Exit<E2, A2>,
  <E, A, E2, A2>(
    self: Exit.Exit<E, A>,
    onFailure: (e: E) => E2,
    onSuccess: (a: A) => A2
  ) => Exit.Exit<E2, A2>
>(3, <E, A, E2, A2>(self: Exit.Exit<E, A>, onFailure: (e: E) => E2, onSuccess: (a: A) => A2) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return exitFailCause(pipe(self.i0, internalCause.map(onFailure))) as Exit.Exit<E2, A2>
    }
    case OpCodes.OP_SUCCESS: {
      return exitSucceed(onSuccess(self.i0)) as Exit.Exit<E2, A2>
    }
  }
})

/** @internal */
export const exitMapError = dual<
  <E, E2>(f: (e: E) => E2) => <A>(self: Exit.Exit<E, A>) => Exit.Exit<E2, A>,
  <E, A, E2>(self: Exit.Exit<E, A>, f: (e: E) => E2) => Exit.Exit<E2, A>
>(2, <E, A, E2>(self: Exit.Exit<E, A>, f: (e: E) => E2) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return exitFailCause(pipe(self.i0, internalCause.map(f))) as Exit.Exit<E2, A>
    }
    case OpCodes.OP_SUCCESS: {
      return self as Exit.Exit<E2, A>
    }
  }
})

/** @internal */
export const exitMapErrorCause = dual<
  <E, E2>(f: (cause: Cause.Cause<E>) => Cause.Cause<E2>) => <A>(self: Exit.Exit<E, A>) => Exit.Exit<E2, A>,
  <E, A, E2>(self: Exit.Exit<E, A>, f: (cause: Cause.Cause<E>) => Cause.Cause<E2>) => Exit.Exit<E2, A>
>(2, <E, A, E2>(self: Exit.Exit<E, A>, f: (cause: Cause.Cause<E>) => Cause.Cause<E2>) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return exitFailCause(f(self.i0)) as Exit.Exit<E2, A>
    }
    case OpCodes.OP_SUCCESS: {
      return self as Exit.Exit<E2, A>
    }
  }
})

/** @internal */
export const exitMatch = dual<
  <E, A, Z>(onFailure: (cause: Cause.Cause<E>) => Z, onSuccess: (a: A) => Z) => (self: Exit.Exit<E, A>) => Z,
  <E, A, Z>(self: Exit.Exit<E, A>, onFailure: (cause: Cause.Cause<E>) => Z, onSuccess: (a: A) => Z) => Z
>(3, (self, onFailure, onSuccess) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return onFailure(self.i0)
    }
    case OpCodes.OP_SUCCESS: {
      return onSuccess(self.i0)
    }
  }
})

/** @internal */
export const exitMatchEffect = dual<
  <E, A, R, E2, A2, R2, E3, A3>(
    onFailure: (cause: Cause.Cause<E>) => Effect.Effect<R, E2, A2>,
    onSuccess: (a: A) => Effect.Effect<R2, E3, A3>
  ) => (self: Exit.Exit<E, A>) => Effect.Effect<R | R2, E3 | E3, A3 | A3>,
  <E, A, R, E2, A2, R2, E3, A3>(
    self: Exit.Exit<E, A>,
    onFailure: (cause: Cause.Cause<E>) => Effect.Effect<R, E2, A2>,
    onSuccess: (a: A) => Effect.Effect<R2, E3, A3>
  ) => Effect.Effect<R | R2, E2 | E3, A2 | A3>
>(3, (self, onFailure, onSuccess) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      return onFailure(self.i0)
    }
    case OpCodes.OP_SUCCESS: {
      return onSuccess(self.i0)
    }
  }
})

/** @internal */
export const exitSucceed = <A>(value: A): Exit.Exit<never, A> => {
  const effect = new EffectPrimitiveSuccess(OpCodes.OP_SUCCESS) as any
  effect.i0 = value
  return effect
}

/** @internal */
export const exitUnannotate = <E, A>(exit: Exit.Exit<E, A>): Exit.Exit<E, A> =>
  exitIsSuccess(exit) ? exit : exitFailCause(internalCause.unannotate(exit.i0))

/** @internal */
export const exitUnit: (_: void) => Exit.Exit<never, void> = () => exitSucceed(void 0)

/** @internal */
export const exitZip = dual<
  <E2, A2>(that: Exit.Exit<E2, A2>) => <E, A>(self: Exit.Exit<E, A>) => Exit.Exit<E | E2, readonly [A, A2]>,
  <E, A, E2, A2>(self: Exit.Exit<E, A>, that: Exit.Exit<E2, A2>) => Exit.Exit<E | E2, readonly [A, A2]>
>(2, (self, that) => exitZipWith(self, that, (a, a2) => [a, a2] as const, internalCause.sequential))

/** @internal */
export const exitZipLeft = dual<
  <E2, A2>(that: Exit.Exit<E2, A2>) => <E, A>(self: Exit.Exit<E, A>) => Exit.Exit<E | E2, A>,
  <E, A, E2, A2>(self: Exit.Exit<E, A>, that: Exit.Exit<E2, A2>) => Exit.Exit<E | E2, A>
>(2, (self, that) => exitZipWith(self, that, (a, _) => a, internalCause.sequential))

/** @internal */
export const exitZipRight = dual<
  <E2, A2>(that: Exit.Exit<E2, A2>) => <E, A>(self: Exit.Exit<E, A>) => Exit.Exit<E | E2, A2>,
  <E, A, E2, A2>(self: Exit.Exit<E, A>, that: Exit.Exit<E2, A2>) => Exit.Exit<E | E2, A2>
>(2, (self, that) => exitZipWith(self, that, (_, a2) => a2, internalCause.sequential))

/** @internal */
export const exitZipPar = dual<
  <E2, A2>(that: Exit.Exit<E2, A2>) => <E, A>(self: Exit.Exit<E, A>) => Exit.Exit<E | E2, readonly [A, A2]>,
  <E, A, E2, A2>(self: Exit.Exit<E, A>, that: Exit.Exit<E2, A2>) => Exit.Exit<E | E2, readonly [A, A2]>
>(2, (self, that) => exitZipWith(self, that, (a, a2) => [a, a2] as const, internalCause.parallel))

/** @internal */
export const exitZipParLeft = dual<
  <E2, A2>(that: Exit.Exit<E2, A2>) => <E, A>(self: Exit.Exit<E, A>) => Exit.Exit<E | E2, A>,
  <E, A, E2, A2>(self: Exit.Exit<E, A>, that: Exit.Exit<E2, A2>) => Exit.Exit<E | E2, A>
>(2, (self, that) => exitZipWith(self, that, (a, _) => a, internalCause.parallel))

/** @internal */
export const exitZipParRight = dual<
  <E2, A2>(that: Exit.Exit<E2, A2>) => <E, A>(self: Exit.Exit<E, A>) => Exit.Exit<E | E2, A2>,
  <E, A, E2, A2>(self: Exit.Exit<E, A>, that: Exit.Exit<E2, A2>) => Exit.Exit<E | E2, A2>
>(2, (self, that) => exitZipWith(self, that, (_, a2) => a2, internalCause.parallel))

/** @internal */
export const exitZipWith = dual<
  <E, E2, A, B, C>(
    that: Exit.Exit<E2, B>,
    f: (a: A, b: B) => C,
    g: (cause: Cause.Cause<E>, cause2: Cause.Cause<E2>) => Cause.Cause<E | E2>
  ) => (self: Exit.Exit<E, A>) => Exit.Exit<E | E2, C>,
  <E, E2, A, B, C>(
    self: Exit.Exit<E, A>,
    that: Exit.Exit<E2, B>,
    f: (a: A, b: B) => C,
    g: (cause: Cause.Cause<E>, cause2: Cause.Cause<E2>) => Cause.Cause<E | E2>
  ) => Exit.Exit<E | E2, C>
>(4, <E, E2, A, B, C>(
  self: Exit.Exit<E, A>,
  that: Exit.Exit<E2, B>,
  f: (a: A, b: B) => C,
  g: (cause: Cause.Cause<E>, cause2: Cause.Cause<E2>) => Cause.Cause<E | E2>
) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE: {
      switch (that._tag) {
        case OpCodes.OP_SUCCESS: {
          return self as Exit.Exit<E | E2, C>
        }
        case OpCodes.OP_FAILURE: {
          return exitFailCause(g(self.i0, that.i0)) as Exit.Exit<E | E2, C>
        }
      }
    }
    case OpCodes.OP_SUCCESS: {
      switch (that._tag) {
        case OpCodes.OP_SUCCESS: {
          return exitSucceed(f(self.i0, that.i0)) as Exit.Exit<E | E2, C>
        }
        case OpCodes.OP_FAILURE: {
          return that as Exit.Exit<E | E2, C>
        }
      }
    }
  }
})

const exitCollectAllInternal = <E, A>(
  exits: Iterable<Exit.Exit<E, A>>,
  combineCauses: (causeA: Cause.Cause<E>, causeB: Cause.Cause<E>) => Cause.Cause<E>
): Option.Option<Exit.Exit<E, Chunk.Chunk<A>>> => {
  const list = Chunk.fromIterable(exits)
  if (!Chunk.isNonEmpty(list)) {
    return Option.none()
  }
  return pipe(
    Chunk.tailNonEmpty(list),
    Chunk.reduce(
      pipe(Chunk.headNonEmpty(list), exitMap<A, Chunk.Chunk<A>>(Chunk.of)),
      (accumulator, current) =>
        pipe(
          accumulator,
          exitZipWith(
            current,
            (list, value) => pipe(list, Chunk.prepend(value)),
            combineCauses
          )
        )
    ),
    exitMap(Chunk.reverse),
    Option.some
  )
}

// -----------------------------------------------------------------------------
// Deferred
// -----------------------------------------------------------------------------

/** @internal */
export const deferredUnsafeMake = <E, A>(fiberId: FiberId.FiberId): Deferred.Deferred<E, A> => ({
  [deferred.DeferredTypeId]: deferred.deferredVariance,
  state: MutableRef.make(deferred.pending([])),
  blockingOn: fiberId
})

/* @internal */
export const deferredMake = Debug.methodWithTrace((trace) =>
  <E, A>(): Effect.Effect<never, never, Deferred.Deferred<E, A>> =>
    pipe(fiberId(), flatMap((id) => deferredMakeAs<E, A>(id))).traced(trace)
)

/* @internal */
export const deferredMakeAs = Debug.methodWithTrace((trace) =>
  <E, A>(fiberId: FiberId.FiberId): Effect.Effect<never, never, Deferred.Deferred<E, A>> =>
    sync(() => deferredUnsafeMake<E, A>(fiberId)).traced(trace)
)

/* @internal */
export const deferredAwait = Debug.methodWithTrace((trace) =>
  <E, A>(self: Deferred.Deferred<E, A>): Effect.Effect<never, E, A> =>
    asyncInterruptEither<never, E, A>((k) => {
      const state = MutableRef.get(self.state)
      switch (state._tag) {
        case DeferredOpCodes.OP_STATE_DONE: {
          return Either.right(state.effect)
        }
        case DeferredOpCodes.OP_STATE_PENDING: {
          pipe(
            self.state,
            MutableRef.set(deferred.pending([k, ...state.joiners]))
          )
          return Either.left(deferredInterruptJoiner(self, k))
        }
      }
    }, self.blockingOn).traced(trace)
)

/* @internal */
export const deferredComplete = Debug.dualWithTrace<
  <E, A>(effect: Effect.Effect<never, E, A>) => (self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, effect: Effect.Effect<never, E, A>) => Effect.Effect<never, never, boolean>
>(2, (trace) => (self, effect) => intoDeferred(effect, self).traced(trace))

/* @internal */
export const deferredCompleteWith = Debug.dualWithTrace<
  <E, A>(effect: Effect.Effect<never, E, A>) => (self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, effect: Effect.Effect<never, E, A>) => Effect.Effect<never, never, boolean>
>(2, (trace) =>
  (self, effect) =>
    sync(() => {
      const state = MutableRef.get(self.state)
      switch (state._tag) {
        case DeferredOpCodes.OP_STATE_DONE: {
          return false
        }
        case DeferredOpCodes.OP_STATE_PENDING: {
          pipe(self.state, MutableRef.set(deferred.done(effect)))
          for (let i = 0; i < state.joiners.length; i++) {
            state.joiners[i](effect)
          }
          return true
        }
      }
    }).traced(trace))

/* @internal */
export const deferredDone = Debug.dualWithTrace<
  <E, A>(exit: Exit.Exit<E, A>) => (self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, exit: Exit.Exit<E, A>) => Effect.Effect<never, never, boolean>
>(2, (trace) => (self, exit) => deferredCompleteWith(self, done(exit)).traced(trace))

/* @internal */
export const deferredFail = Debug.dualWithTrace<
  <E>(error: E) => <A>(self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, error: E) => Effect.Effect<never, never, boolean>
>(2, (trace) => (self, error) => deferredCompleteWith(self, fail(error)).traced(trace))

/* @internal */
export const deferredFailSync = Debug.dualWithTrace<
  <E>(evaluate: LazyArg<E>) => <A>(self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, evaluate: LazyArg<E>) => Effect.Effect<never, never, boolean>
>(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, failSync(restore(evaluate))).traced(trace))

/* @internal */
export const deferredFailCause = Debug.dualWithTrace<
  <E>(cause: Cause.Cause<E>) => <A>(self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, cause: Cause.Cause<E>) => Effect.Effect<never, never, boolean>
>(2, (trace) => (self, cause) => deferredCompleteWith(self, failCause(cause)).traced(trace))

/* @internal */
export const deferredFailCauseSync = Debug.dualWithTrace<
  <E>(evaluate: LazyArg<Cause.Cause<E>>) => <A>(self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, evaluate: LazyArg<Cause.Cause<E>>) => Effect.Effect<never, never, boolean>
>(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, failCauseSync(restore(evaluate))).traced(trace))

/* @internal */
export const deferredDie = Debug.dualWithTrace<
  (defect: unknown) => <E, A>(self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, defect: unknown) => Effect.Effect<never, never, boolean>
>(2, (trace) => (self, defect) => deferredCompleteWith(self, die(defect)).traced(trace))

/* @internal */
export const deferredDieSync = Debug.dualWithTrace<
  (evaluate: LazyArg<unknown>) => <E, A>(self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, evaluate: LazyArg<unknown>) => Effect.Effect<never, never, boolean>
>(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, dieSync(restore(evaluate))).traced(trace))

/* @internal */
export const deferredInterrupt = Debug.methodWithTrace((trace) =>
  <E, A>(self: Deferred.Deferred<E, A>): Effect.Effect<never, never, boolean> =>
    pipe(
      fiberId(),
      flatMap((fiberId) => deferredCompleteWith(self, interruptWith(fiberId)))
    ).traced(trace)
)

/* @internal */
export const deferredInterruptWith = Debug.dualWithTrace<
  (fiberId: FiberId.FiberId) => <E, A>(self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, fiberId: FiberId.FiberId) => Effect.Effect<never, never, boolean>
>(2, (trace) => (self, fiberId) => deferredCompleteWith(self, interruptWith(fiberId)).traced(trace))

/* @internal */
export const deferredIsDone = Debug.methodWithTrace((trace) =>
  <E, A>(self: Deferred.Deferred<E, A>): Effect.Effect<never, never, boolean> =>
    sync(() => MutableRef.get(self.state)._tag === DeferredOpCodes.OP_STATE_DONE).traced(trace)
)

/* @internal */
export const deferredPoll = Debug.methodWithTrace((trace) =>
  <E, A>(
    self: Deferred.Deferred<E, A>
  ): Effect.Effect<never, never, Option.Option<Effect.Effect<never, E, A>>> =>
    sync(() => {
      const state = MutableRef.get(self.state)
      switch (state._tag) {
        case DeferredOpCodes.OP_STATE_DONE: {
          return Option.some(state.effect)
        }
        case DeferredOpCodes.OP_STATE_PENDING: {
          return Option.none()
        }
      }
    }).traced(trace)
)

/* @internal */
export const deferredSucceed = Debug.dualWithTrace<
  <A>(value: A) => <E>(self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, value: A) => Effect.Effect<never, never, boolean>
>(2, (trace) => (self, value) => deferredCompleteWith(self, succeed(value)).traced(trace))

/* @internal */
export const deferredSync = Debug.dualWithTrace<
  <A>(evaluate: LazyArg<A>) => <E>(self: Deferred.Deferred<E, A>) => Effect.Effect<never, never, boolean>,
  <E, A>(self: Deferred.Deferred<E, A>, evaluate: LazyArg<A>) => Effect.Effect<never, never, boolean>
>(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, sync(restore(evaluate))).traced(trace))

/** @internal */
export const deferredUnsafeDone = <E, A>(self: Deferred.Deferred<E, A>, effect: Effect.Effect<never, E, A>): void => {
  const state = MutableRef.get(self.state)
  if (state._tag === DeferredOpCodes.OP_STATE_PENDING) {
    pipe(self.state, MutableRef.set(deferred.done(effect)))
    for (let i = state.joiners.length - 1; i >= 0; i--) {
      state.joiners[i](effect)
    }
  }
}

const deferredInterruptJoiner = <E, A>(
  self: Deferred.Deferred<E, A>,
  joiner: (effect: Effect.Effect<never, E, A>) => void
): Effect.Effect<never, never, void> =>
  sync(() => {
    const state = MutableRef.get(self.state)
    if (state._tag === DeferredOpCodes.OP_STATE_PENDING) {
      pipe(
        self.state,
        MutableRef.set(deferred.pending(state.joiners.filter((j) => j !== joiner)))
      )
    }
  })
