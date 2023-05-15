/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk"
import type * as Context from "@effect/data/Context"
import type * as Differ from "@effect/data/Differ"
import type { LazyArg } from "@effect/data/Function"
import type * as HashMap from "@effect/data/HashMap"
import type * as HashSet from "@effect/data/HashSet"
import type * as Option from "@effect/data/Option"
import type * as Cause from "@effect/io/Cause"
import type * as Effect from "@effect/io/Effect"
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import type * as Logger from "@effect/io/Logger"
import type * as LogLevel from "@effect/io/Logger/Level"
import type * as LogSpan from "@effect/io/Logger/Span"
import type * as MetricLabel from "@effect/io/Metric/Label"
import type * as Scheduler from "@effect/io/Scheduler"
import type * as Scope from "@effect/io/Scope"
import type * as Supervisor from "@effect/io/Supervisor"

/**
 * @since 1.0.0
 * @category symbols
 */
export const FiberRefTypeId: unique symbol = core.FiberRefTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type FiberRefTypeId = typeof FiberRefTypeId

/**
 * @since 1.0.0
 * @category model
 */
export interface FiberRef<A> extends Variance<A> {
  /** @internal */
  readonly initial: A
  /** @internal */
  readonly diff: (oldValue: A, newValue: A) => unknown
  /** @internal */
  readonly combine: (first: unknown, second: unknown) => unknown
  /** @internal */
  readonly patch: (patch: unknown) => (oldValue: A) => A
  /** @internal */
  readonly fork: unknown
  /** @internal */
  readonly join: (oldValue: A, newValue: A) => A
}

/**
 * @since 1.0.0
 * @category models
 */
export interface Variance<A> {
  readonly [FiberRefTypeId]: {
    readonly _A: (_: never) => A
  }
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: <A>(
  initial: A,
  fork?: (a: A) => A,
  join?: (left: A, right: A) => A
) => Effect.Effect<Scope.Scope, never, FiberRef<A>> = fiberRuntime.fiberRefMake

/**
 * @since 1.0.0
 * @category constructors
 */
export const makeWith: <Value>(ref: LazyArg<FiberRef<Value>>) => Effect.Effect<Scope.Scope, never, FiberRef<Value>> =
  fiberRuntime.fiberRefMakeWith

/**
 * @since 1.0.0
 * @category constructors
 */
export const makeContext: <A>(
  initial: Context.Context<A>
) => Effect.Effect<Scope.Scope, never, FiberRef<Context.Context<A>>> = fiberRuntime.fiberRefMakeContext

/**
 * @since 1.0.0
 * @category constructors
 */
export const makeRuntimeFlags: (
  initial: RuntimeFlags.RuntimeFlags
) => Effect.Effect<Scope.Scope, never, FiberRef<RuntimeFlags.RuntimeFlags>> = fiberRuntime.fiberRefMakeRuntimeFlags

/**
 * @since 1.0.0
 * @category constructors
 */
export const unsafeMake: <Value>(
  initial: Value,
  fork?: (a: Value) => Value,
  join?: (left: Value, right: Value) => Value
) => FiberRef<Value> = core.fiberRefUnsafeMake

/**
 * @since 1.0.0
 * @category constructors
 */
export const unsafeMakeHashSet: <A>(initial: HashSet.HashSet<A>) => FiberRef<HashSet.HashSet<A>> =
  core.fiberRefUnsafeMakeHashSet

/**
 * @since 1.0.0
 * @category constructors
 */
export const unsafeMakeContext: <A>(initial: Context.Context<A>) => FiberRef<Context.Context<A>> =
  core.fiberRefUnsafeMakeContext

/**
 * @since 1.0.0
 * @category constructors
 */
export const unsafeMakeSupervisor: (initial: Supervisor.Supervisor<any>) => FiberRef<Supervisor.Supervisor<any>> =
  fiberRuntime.fiberRefUnsafeMakeSupervisor

/**
 * @since 1.0.0
 * @category constructors
 */
export const unsafeMakePatch: <Value, Patch>(
  initial: Value,
  differ: Differ.Differ<Value, Patch>,
  fork: Patch,
  join?: (oldV: Value, newV: Value) => Value
) => FiberRef<Value> = core.fiberRefUnsafeMakePatch

/**
 * @since 1.0.0
 * @category getters
 */
export const get: <A>(self: FiberRef<A>) => Effect.Effect<never, never, A> = core.fiberRefGet

/**
 * @since 1.0.0
 * @category mutations
 */
export const getAndSet: {
  <A>(value: A): (self: FiberRef<A>) => Effect.Effect<never, never, A>
  <A>(self: FiberRef<A>, value: A): Effect.Effect<never, never, A>
} = core.fiberRefGetAndSet

/**
 * @since 1.0.0
 * @category mutations
 */
export const getAndUpdate: {
  <A>(f: (a: A) => A): (self: FiberRef<A>) => Effect.Effect<never, never, A>
  <A>(self: FiberRef<A>, f: (a: A) => A): Effect.Effect<never, never, A>
} = core.fiberRefGetAndUpdate

/**
 * @since 1.0.0
 * @category mutations
 */
export const getAndUpdateSome: {
  <A>(pf: (a: A) => Option.Option<A>): (self: FiberRef<A>) => Effect.Effect<never, never, A>
  <A>(self: FiberRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, A>
} = core.fiberRefGetAndUpdateSome

/**
 * @since 1.0.0
 * @category mutations
 */
export const getWith: {
  <A, R, E, B>(f: (a: A) => Effect.Effect<R, E, B>): (self: FiberRef<A>) => Effect.Effect<R, E, B>
  <A, R, E, B>(self: FiberRef<A>, f: (a: A) => Effect.Effect<R, E, B>): Effect.Effect<R, E, B>
} = core.fiberRefGetWith

/**
 * @since 1.0.0
 * @category mutations
 */
export const set: {
  <A>(value: A): (self: FiberRef<A>) => Effect.Effect<never, never, void>
  <A>(self: FiberRef<A>, value: A): Effect.Effect<never, never, void>
} = core.fiberRefSet

const _delete: <A>(self: FiberRef<A>) => Effect.Effect<never, never, void> = core.fiberRefDelete

export {
  /**
   * @since 1.0.0
   * @category mutations
   */
  _delete as delete
}

/**
 * @since 1.0.0
 * @category mutations
 */
export const reset: <A>(self: FiberRef<A>) => Effect.Effect<never, never, void> = core.fiberRefReset

/**
 * @since 1.0.0
 * @category mutations
 */
export const modify: {
  <A, B>(f: (a: A) => readonly [B, A]): (self: FiberRef<A>) => Effect.Effect<never, never, B>
  <A, B>(self: FiberRef<A>, f: (a: A) => readonly [B, A]): Effect.Effect<never, never, B>
} = core.fiberRefModify

/**
 * @since 1.0.0
 * @category mutations
 */
export const modifySome: <A, B>(
  self: FiberRef<A>,
  def: B,
  f: (a: A) => Option.Option<readonly [B, A]>
) => Effect.Effect<never, never, B> = core.fiberRefModifySome

/**
 * @since 1.0.0
 * @category mutations
 */
export const update: {
  <A>(f: (a: A) => A): (self: FiberRef<A>) => Effect.Effect<never, never, void>
  <A>(self: FiberRef<A>, f: (a: A) => A): Effect.Effect<never, never, void>
} = core.fiberRefUpdate

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateSome: {
  <A>(pf: (a: A) => Option.Option<A>): (self: FiberRef<A>) => Effect.Effect<never, never, void>
  <A>(self: FiberRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, void>
} = core.fiberRefUpdateSome

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateAndGet: {
  <A>(f: (a: A) => A): (self: FiberRef<A>) => Effect.Effect<never, never, A>
  <A>(self: FiberRef<A>, f: (a: A) => A): Effect.Effect<never, never, A>
} = core.fiberRefUpdateAndGet

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateSomeAndGet: {
  <A>(pf: (a: A) => Option.Option<A>): (self: FiberRef<A>) => Effect.Effect<never, never, A>
  <A>(self: FiberRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, A>
} = core.fiberRefUpdateSomeAndGet

/**
 * @since 1.0.0
 * @category mutations
 */
export const locally: {
  <A>(self: FiberRef<A>, value: A): <R, E, B>(use: Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>
  <R, E, B, A>(use: Effect.Effect<R, E, B>, self: FiberRef<A>, value: A): Effect.Effect<R, E, B>
} = core.fiberRefLocally

/**
 * @since 1.0.0
 * @category mutations
 */
export const locallyWith: {
  <A>(self: FiberRef<A>, f: (a: A) => A): <R, E, B>(use: Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>
  <R, E, B, A>(use: Effect.Effect<R, E, B>, self: FiberRef<A>, f: (a: A) => A): Effect.Effect<R, E, B>
} = core.fiberRefLocallyWith

/**
 * @since 1.0.0
 * @category mutations
 */
export const locallyScoped: {
  <A>(value: A): (self: FiberRef<A>) => Effect.Effect<Scope.Scope, never, void>
  <A>(self: FiberRef<A>, value: A): Effect.Effect<Scope.Scope, never, void>
} = fiberRuntime.fiberRefLocallyScoped

/**
 * @since 1.0.0
 * @category mutations
 */
export const locallyScopedWith: {
  <A>(f: (a: A) => A): (self: FiberRef<A>) => Effect.Effect<Scope.Scope, never, void>
  <A>(self: FiberRef<A>, f: (a: A) => A): Effect.Effect<Scope.Scope, never, void>
} = fiberRuntime.fiberRefLocallyScopedWith

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentContext: FiberRef<Context.Context<never>> = core.currentContext

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentLogAnnotations: FiberRef<HashMap.HashMap<string, string>> = core.currentLogAnnotations

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentLoggers: FiberRef<HashSet.HashSet<Logger.Logger<string, any>>> = fiberRuntime.currentLoggers

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentLogLevel: FiberRef<LogLevel.LogLevel> = core.currentLogLevel

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentMinimumLogLevel: FiberRef<LogLevel.LogLevel> = fiberRuntime.currentMinimumLogLevel

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentLogSpan: FiberRef<Chunk.Chunk<LogSpan.LogSpan>> = core.currentLogSpan

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentRuntimeFlags: FiberRef<RuntimeFlags.RuntimeFlags> = fiberRuntime.currentRuntimeFlags

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentParallelism: FiberRef<Option.Option<number>> = core.currentParallelism

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentScheduler: FiberRef<Scheduler.Scheduler> = core.currentScheduler

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentSupervisor: FiberRef<Supervisor.Supervisor<any>> = fiberRuntime.currentSupervisor

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentTags: FiberRef<HashSet.HashSet<MetricLabel.MetricLabel>> = core.currentTags

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const interruptedCause: FiberRef<Cause.Cause<never>> = core.interruptedCause
