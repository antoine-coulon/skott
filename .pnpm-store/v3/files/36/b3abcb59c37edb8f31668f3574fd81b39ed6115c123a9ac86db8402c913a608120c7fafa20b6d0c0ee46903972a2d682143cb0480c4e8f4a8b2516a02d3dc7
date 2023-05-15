/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk"
import type * as Context from "@effect/data/Context"
import type * as Duration from "@effect/data/Duration"
import type * as Either from "@effect/data/Either"
import type * as Equal from "@effect/data/Equal"
import type { LazyArg } from "@effect/data/Function"
import type * as HashMap from "@effect/data/HashMap"
import type * as HashSet from "@effect/data/HashSet"
import type * as Option from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import type * as Cause from "@effect/io/Cause"
import type * as Clock from "@effect/io/Clock"
import type { Config } from "@effect/io/Config"
import type { ConfigError } from "@effect/io/Config/Error"
import type { ConfigProvider } from "@effect/io/Config/Provider"
import type { Trace } from "@effect/io/Debug"
import type * as Deferred from "@effect/io/Deferred"
import type * as ExecutionStrategy from "@effect/io/ExecutionStrategy"
import type * as Exit from "@effect/io/Exit"
import type * as Fiber from "@effect/io/Fiber"
import type * as FiberId from "@effect/io/Fiber/Id"
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags"
import type * as RuntimeFlagsPatch from "@effect/io/Fiber/Runtime/Flags/Patch"
import type * as FiberRef from "@effect/io/FiberRef"
import type * as FiberRefs from "@effect/io/FiberRefs"
import type * as FiberRefsPatch from "@effect/io/FiberRefs/Patch"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices"
import * as effect from "@effect/io/internal_effect_untraced/effect"
import * as circular from "@effect/io/internal_effect_untraced/effect/circular"
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import * as layer from "@effect/io/internal_effect_untraced/layer"
import * as circularLayer from "@effect/io/internal_effect_untraced/layer/circular"
import * as _runtime from "@effect/io/internal_effect_untraced/runtime"
import * as _schedule from "@effect/io/internal_effect_untraced/schedule"
import type * as Layer from "@effect/io/Layer"
import type * as Metric from "@effect/io/Metric"
import type * as MetricLabel from "@effect/io/Metric/Label"
import type * as Random from "@effect/io/Random"
import type * as Ref from "@effect/io/Ref"
import type * as Runtime from "@effect/io/Runtime"
import type * as Schedule from "@effect/io/Schedule"
import type * as Scope from "@effect/io/Scope"
import type * as Supervisor from "@effect/io/Supervisor"

/**
 * @since 1.0.0
 */
export type MergeRecord<K, H> = {
  readonly [k in keyof K | keyof H]: k extends keyof K ? K[k]
    : k extends keyof H ? H[k]
    : never
} extends infer X ? X
  : never

/**
 * @since 1.0.0
 * @category symbols
 */
export const EffectTypeId: unique symbol = core.EffectTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type EffectTypeId = typeof EffectTypeId

/**
 * The `Effect` interface defines a value that lazily describes a workflow or job.
 * The workflow requires some context `R`, and may fail with an error of type `E`,
 * or succeed with a value of type `A`.
 *
 * `Effect` values model resourceful interaction with the outside world, including
 * synchronous, asynchronous, concurrent, and parallel interaction. They use a
 * fiber-based concurrency model, with built-in support for scheduling, fine-grained
 * interruption, structured concurrency, and high scalability.
 *
 * To run an `Effect` value, you need a `Runtime`, which is a type that is capable
 * of executing `Effect` values.
 *
 * @since 1.0.0
 * @category models
 */
export interface Effect<R, E, A> extends Effect.Variance<R, E, A>, Equal.Equal {
  traced(trace: Trace): Effect<R, E, A>
}

/**
 * @since 1.0.0
 */
export declare namespace Effect {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Variance<R, E, A> {
    readonly [EffectTypeId]: {
      readonly _R: (_: never) => R
      readonly _E: (_: never) => E
      readonly _A: (_: never) => A
    }
  }
  /**
   * @since 1.0.0
   * @category models
   */
  export type Unify<Ret extends Effect<any, any, any>> = Effect<
    Context<Ret>,
    Error<Ret>,
    Success<Ret>
  >
  /**
   * @since 1.0.0
   * @category type-level
   */
  export type Context<T extends Effect<any, any, any>> = [T] extends [Effect<infer _R, infer _E, infer _A>] ? _R : never
  /**
   * @since 1.0.0
   * @category type-level
   */
  export type Error<T extends Effect<any, any, any>> = [T] extends [Effect<infer _R, infer _E, infer _A>] ? _E : never
  /**
   * @since 1.0.0
   * @category type-level
   */
  export type Success<T extends Effect<any, any, any>> = [T] extends [Effect<infer _R, infer _E, infer _A>] ? _A : never
}

/**
 * This function returns `true` if the specified value is an `Effect` value,
 * `false` otherwise.
 *
 * This function can be useful for checking the type of a value before
 * attempting to operate on it as an `Effect` value. For example, you could
 * use `isEffect` to check the type of a value before using it as an
 * argument to a function that expects an `Effect` value.
 *
 * @param u - The value to check for being an `Effect` value.
 *
 * @returns `true` if the specified value is an `Effect` value, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isEffect: (u: unknown) => u is Effect<unknown, unknown, unknown> = core.isEffect

/**
 * This function adds a finalizer to the scope of the calling `Effect` value.
 * The finalizer is guaranteed to be run when the scope is closed, and it may
 * depend on the `Exit` value that the scope is closed with.
 *
 * @param finalizer - The finalizer to add to the scope of the calling
 * `Effect` value. This function must take an `Exit` value as its parameter,
 * and return a new `Effect` value.
 *
 * @returns A new `Effect` value that represents the addition of the finalizer
 * to the scope of the calling `Effect` value.
 *
 * @since 1.0.0
 * @category finalization
 */
export const addFinalizer: <R, X>(
  finalizer: (exit: Exit.Exit<unknown, unknown>) => Effect<R, never, X>
) => Effect<R | Scope.Scope, never, void> = fiberRuntime.addFinalizer

/**
 * This function submerges the error case of an `Either` value into an
 * `Effect` value. It is the inverse operation of `either`.
 *
 * If the `Either` value is a `Right` value, then the `Effect` value will
 * succeed with the value contained in the `Right`. If the `Either` value
 * is a `Left` value, then the `Effect` value will fail with the error
 * contained in the `Left`.
 *
 * @param self - The `Effect` value that contains an `Either` value as its
 * result.
 *
 * @returns A new `Effect` value that has the same context as the original
 * `Effect` value, but has the error case of the `Either` value submerged
 * into it.
 *
 * @since 1.0.0
 * @category error handling
 */
export const absolve: <R, E, A>(self: Effect<R, E, Either.Either<E, A>>) => Effect<R, E, A> = effect.absolve

/**
 * This function takes a mapping function f that maps over `Effect` value
 * and returns `Either` and returns a new function that submerges the error
 * case of an `Either` value into an `Effect` value.
 * It is the inverse operation of `either`.
 *
 * If the `Either` value is a `Right` value, then the `Effect` value will
 * succeed with the value contained in the `Right`. If the `Either` value
 * is a `Left` value, then the `Effect` value will fail with the error
 * contained in the `Left`.
 *
 * @param self - The `Effect` value that contains an `Either` value as its
 * result.
 *
 * @returns A new `Effect` value that has the same context as the original
 * `Effect` value, but has the error case of the `Either` value submerged
 * into it.
 *
 * @since 1.0.0
 * @category error handling
 */
export const absolveWith: {
  <A, E2, A2>(f: (a: A) => Either.Either<E2, A2>): <R, E>(self: Effect<R, E, A>) => Effect<R, E | E2, A2>
  <R, E, E2, A, A2>(self: Effect<R, E, A>, f: (a: A) => Either.Either<E2, A2>): Effect<R, E | E2, A2>
} = effect.absolveWith

/**
 * This function transforms an `Effect` value that may fail with a defect
 * into a new `Effect` value that may fail with an unknown error.
 *
 * The resulting `Effect` value will have the same context and success
 * type as the original `Effect` value, but it will have a more general
 * error type that allows it to fail with any type of error.
 *
 * @param self - The `Effect` value to transform.
 *
 * @returns A new `Effect` value that has the same context and success
 * type as the original `Effect` value, but a more general error type that
 * allows it to fail with any type of error.
 *
 * @since 1.0.0
 * @category error handling
 */
export const absorb: <R, E, A>(self: Effect<R, E, A>) => Effect<R, unknown, A> = effect.absorb

/**
 * This function takes a mapping function `f` and returns a new function
 * that transforms an `Effect` value that may fail with a defect into a new
 * `Effect` value that may fail with an unknown error.
 *
 * If the original `Effect` value fails with a known error, then the
 * mapping function `f` will be applied to the error to convert it to an
 * unknown structure.
 *
 * The resulting `Effect` value will have the same context and success
 * type as the original `Effect` value, but it will have a more general
 * error type that allows it to fail with any type of error.
 *
 * @param f - The mapping function to apply to known errors. This function
 * must take an error of type `E` and return an unknown structure.
 *
 * @returns A new function that transforms an `Effect` value that may fail
 * with a defect into a new `Effect` value that may fail with an unknown
 * error.
 *
 * @since 1.0.0
 * @category error handling
 */
export const absorbWith: {
  <E>(f: (error: E) => unknown): <R, A>(self: Effect<R, E, A>) => Effect<R, unknown, A>
  <R, E, A>(self: Effect<R, E, A>, f: (error: E) => unknown): Effect<R, unknown, A>
} = effect.absorbWith

/**
 * This function constructs a scoped resource from an `acquire` and `release`
 * `Effect` value.
 *
 * If the `acquire` `Effect` value successfully completes execution, then the
 * `release` `Effect` value will be added to the finalizers associated with the
 * scope of this `Effect` value, and it is guaranteed to be run when the scope
 * is closed.
 *
 * The `acquire` and `release` `Effect` values will be run uninterruptibly.
 * Additionally, the `release` `Effect` value may depend on the `Exit` value
 * specified when the scope is closed.
 *
 * @param acquire - The `Effect` value that acquires the resource.
 * @param release - The `Effect` value that releases the resource.
 *
 * @returns A new `Effect` value that represents the scoped resource.
 *
 * @since 1.0.0
 * @category constructors
 */
export const acquireRelease: <R, E, A, R2, X>(
  acquire: Effect<R, E, A>,
  release: (a: A, exit: Exit.Exit<unknown, unknown>) => Effect<R2, never, X>
) => Effect<Scope.Scope | R | R2, E, A> = fiberRuntime.acquireRelease

/**
 * This function is a variant of `acquireRelease` that allows the `acquire`
 * `Effect` value to be interruptible.
 *
 * Since the `acquire` `Effect` value could be interrupted after partially
 * acquiring resources, the `release` `Effect` value is not allowed to access
 * the resource produced by `acquire` and must independently determine what
 * finalization, if any, needs to be performed (e.g. by examining in memory
 * state).
 *
 * Additionally, the `release` `Effect` value may depend on the `Exit` value
 * specified when the scope is closed.
 *
 * @param acquire - The interruptible `Effect` value that acquires the
 * resource.
 * @param release - The `Effect` value that releases the resource. This function
 * must take an `Exit` value as its parameter, and return a new `Effect` value.
 *
 * @returns A new `Effect` value that represents the interruptible scoped
 * resource.
 *
 * @since 1.0.0
 * @category constructors
 */
export const acquireReleaseInterruptible: <R, E, A, R2, X>(
  acquire: Effect<R, E, A>,
  release: (exit: Exit.Exit<unknown, unknown>) => Effect<R2, never, X>
) => Effect<Scope.Scope | R | R2, E, A> = circular.acquireReleaseInterruptible

/**
 * This function is used to ensure that an `Effect` value that represents the
 * acquisition of a resource (for example, opening a file, launching a thread,
 * etc.) will not be interrupted, and that the resource will always be released
 * when the `Effect` value completes execution.
 *
 * `acquireUseRelease` does the following:
 *
 *   1. Ensures that the `Effect` value that acquires the resource will not be
 *      interrupted. Note that acquisition may still fail due to internal
 *      reasons (such as an uncaught exception).
 *   2. Ensures that the `release` `Effect` value will not be interrupted,
 *      and will be executed as long as the acquisition `Effect` value
 *      successfully acquires the resource.
 *
 * During the time period between the acquisition and release of the resource,
 * the `use` `Effect` value will be executed.
 *
 * If the `release` `Effect` value fails, then the entire `Effect` value will
 * fail, even if the `use` `Effect` value succeeds. If this fail-fast behavior
 * is not desired, errors produced by the `release` `Effect` value can be caught
 * and ignored.
 *
 * @param acquire - The `Effect` value that acquires the resource.
 * @param use - The `Effect` value that is executed between the acquisition
 * and release of the resource.
 * @param release - The `Effect` value that releases the resource.
 *
 * @returns A new `Effect` value that represents the acquisition, use, and
 * release of the resource.
 *
 * @since 1.0.0
 * @category constructors
 */
export const acquireUseRelease: {
  <A, R2, E2, A2, R3, X>(
    use: (a: A) => Effect<R2, E2, A2>,
    release: (a: A, exit: Exit.Exit<E2, A2>) => Effect<R3, never, X>
  ): <R, E>(acquire: Effect<R, E, A>) => Effect<R2 | R3 | R, E2 | E, A2>
  <R, E, A, R2, E2, A2, R3, X>(
    acquire: Effect<R, E, A>,
    use: (a: A) => Effect<R2, E2, A2>,
    release: (a: A, exit: Exit.Exit<E2, A2>) => Effect<R3, never, X>
  ): Effect<R | R2 | R3, E | E2, A2>
} = core.acquireUseRelease

/**
 * This function checks if any fibers are attempting to interrupt the current
 * fiber, and if so, performs self-interruption.
 *
 * Note that this allows for interruption to occur in uninterruptible regions.
 *
 * @returns A new `Effect` value that represents the check for interruption
 * and the potential self-interruption of the current fiber.
 *
 * @since 1.0.0
 * @category constructors
 */
export const allowInterrupt: (_: void) => Effect<never, never, void> = effect.allowInterrupt

/**
 * This function maps the success value of an `Effect` value to a specified
 * constant value.
 *
 * @param value - The constant value that the success value of the `Effect`
 * value will be mapped to.
 * @param self - The `Effect` value whose success value will be mapped to the
 * specified constant value.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to the specified constant value.
 *
 * @since 1.0.0
 * @category mapping
 */
export const as: {
  <B>(value: B): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, B>
  <R, E, A, B>(self: Effect<R, E, A>, value: B): Effect<R, E, B>
} = core.as

/**
 * This function maps the success value of an `Effect` value to a `Left` value
 * in an `Either` value.
 *
 * @param self - The `Effect` value whose success value will be mapped to a
 * `Left` value in an `Either` value.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to a `Left` value in an `Either`
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
export const asLeft: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, Either.Either<A, never>> = effect.asLeft

/**
 * This function maps the error value of an `Effect` value to a `Left` value
 * in an `Either` value.
 *
 * @param self - The `Effect` value whose error value will be mapped to a
 * `Left` value in an `Either` value.
 *
 * @returns A new `Effect` value that represents the mapping of the error
 * value of the original `Effect` value to a `Left` value in an `Either`
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
export const asLeftError: <R, E, A>(self: Effect<R, E, A>) => Effect<R, Either.Either<E, never>, A> = effect.asLeftError

/**
 * This function maps the success value of an `Effect` value to a `Right` value
 * in an `Either` value.
 *
 * @param self - The `Effect` value whose success value will be mapped to a
 * `Right` value in an `Either` value.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to a `Right` value in an `Either`
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
export const asRight: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, Either.Either<never, A>> = effect.asRight

/**
 * This function maps the error value of an `Effect` value to a `Right` value
 * in an `Either` value.
 *
 * @param self - The `Effect` value whose error value will be mapped to a
 * `Right` value in an `Either` value.
 *
 * @returns A new `Effect` value that represents the mapping of the error
 * value of the original `Effect` value to a `Right` value in an `Either`
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
export const asRightError: <R, E, A>(self: Effect<R, E, A>) => Effect<R, Either.Either<never, E>, A> =
  effect.asRightError

/**
 * This function maps the success value of an `Effect` value to a `Some` value
 * in an `Option` value. If the original `Effect` value fails, the returned
 * `Effect` value will also fail.
 *
 * @param self - The `Effect` value whose success value will be mapped to a
 * `Some` value in an `Option` value.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to a `Some` value in an `Option`
 * value. The returned `Effect` value may fail if the original `Effect` value
 * fails.
 *
 * @category mapping
 * @since 1.0.0
 */
export const asSome: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, Option.Option<A>> = effect.asSome

/**
 * This function maps the error value of an `Effect` value to a `Some` value
 * in an `Option` value. If the original `Effect` value succeeds, the returned
 * `Effect` value will also succeed.
 *
 * @param self - The `Effect` value whose error value will be mapped to a
 * `Some` value in an `Option` value.
 *
 * @returns A new `Effect` value that represents the mapping of the error
 * value of the original `Effect` value to a `Some` value in an `Option`
 * value. The returned `Effect` value may succeed if the original `Effect`
 * value succeeds.
 *
 * @category mapping
 * @since 1.0.0
 */
export const asSomeError: <R, E, A>(self: Effect<R, E, A>) => Effect<R, Option.Option<E>, A> = effect.asSomeError

/**
 * This function maps the success value of an `Effect` value to `void`. If the
 * original `Effect` value succeeds, the returned `Effect` value will also
 * succeed. If the original `Effect` value fails, the returned `Effect` value
 * will fail with the same error.
 *
 * @param self - The `Effect` value whose success value will be mapped to `void`.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to `void`.
 *
 * @since 1.0.0
 * @category mapping
 */
export const asUnit: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, void> = core.asUnit

/**
 * Imports an asynchronous side-effect into a pure `Effect` value. See
 * `asyncMaybe` for the more expressive variant of this function that can
 * return a value synchronously.
 *
 * The callback function `Effect<R, E, A> => void` must be called at most once.
 *
 * The `FiberId` of the fiber that may complete the async callback may be
 * provided to allow for better diagnostics.
 *
 * @since 1.0.0
 * @category constructors
 */
export const async: <R, E, A>(
  register: (callback: (_: Effect<R, E, A>) => void) => void,
  blockingOn?: FiberId.FiberId
) => Effect<R, E, A> = core.async

/**
 * Converts an asynchronous, callback-style API into an `Effect`, which will
 * be executed asynchronously.
 *
 * With this variant, the registration function may return a an `Effect`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const asyncEffect: <R, E, A, R2, E2, X>(
  register: (callback: (_: Effect<R, E, A>) => void) => Effect<R2, E2, X>
) => Effect<R | R2, E | E2, A> = _runtime.asyncEffect

/**
 * Imports an asynchronous effect into a pure `Effect` value, possibly returning
 * the value synchronously.
 *
 * If the register function returns a value synchronously, then the callback
 * function `Effect<R, E, A> => void` must not be called. Otherwise the callback
 * function must be called at most once.
 *
 * The `FiberId` of the fiber that may complete the async callback may be
 * provided to allow for better diagnostics.
 *
 * @since 1.0.0
 * @category constructors
 */
export const asyncOption: <R, E, A>(
  register: (callback: (_: Effect<R, E, A>) => void) => Option.Option<Effect<R, E, A>>,
  blockingOn?: FiberId.FiberId
) => Effect<R, E, A> = effect.asyncOption

/**
 * Imports an asynchronous side-effect into an effect. It has the option of
 * returning the value synchronously, which is useful in cases where it cannot
 * be determined if the effect is synchronous or asynchronous until the register
 * is actually executed. It also has the option of returning a canceler,
 * which will be used by the runtime to cancel the asynchronous effect if the fiber
 * executing the effect is interrupted.
 *
 * If the register function returns a value synchronously, then the callback
 * function `Effect<R, E, A> => void` must not be called. Otherwise the callback
 * function must be called at most once.
 *
 * The `FiberId` of the fiber that may complete the async callback may be
 * provided to allow for better diagnostics.
 *
 * @since 1.0.0
 * @category constructors
 */
export const asyncInterruptEither: <R, E, A>(
  register: (callback: (effect: Effect<R, E, A>) => void) => Either.Either<Effect<R, never, void>, Effect<R, E, A>>,
  blockingOn?: FiberId.FiberId
) => Effect<R, E, A> = core.asyncInterruptEither

/**
 * Imports an asynchronous side-effect into an effect allowing control of interruption.
 *
 * The `FiberId` of the fiber that may complete the async callback may be
 * provided to allow for better diagnostics.
 *
 * @since 1.0.0
 * @category constructors
 */
export const asyncInterrupt: <R, E, A>(
  register: (callback: (effect: Effect<R, E, A>) => void) => Effect<R, never, void>,
  blockingOn?: FiberId.FiberId
) => Effect<R, E, A> = core.asyncInterrupt

/**
 * Imports a synchronous side-effect into a pure `Effect` value, translating any
 * thrown exceptions into typed failed effects creating with `Effect.fail`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const attempt: <A>(evaluate: LazyArg<A>) => Effect<never, unknown, A> = effect.attempt

/**
 * Returns a new effect that will not succeed with its value before first
 * waiting for the end of all child fibers forked by the effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const awaitAllChildren: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A> = circular.awaitAllChildren

/**
 * Returns an effect that, if evaluated, will return the cached result of this
 * effect. Cached results will expire after `timeToLive` duration.
 *
 * @since 1.0.0
 * @category mutations
 */
export const cached: {
  (timeToLive: Duration.Duration): <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, Effect<never, E, A>>
  <R, E, A>(self: Effect<R, E, A>, timeToLive: Duration.Duration): Effect<R, never, Effect<never, E, A>>
} = circular.cached

/**
 * Returns an effect that, if evaluated, will return the cached result of this
 * effect. Cached results will expire after `timeToLive` duration. In
 * addition, returns an effect that can be used to invalidate the current
 * cached value before the `timeToLive` duration expires.
 *
 * @since 1.0.0
 * @category mutations
 */
export const cachedInvalidate: {
  (timeToLive: Duration.Duration): <R, E, A>(
    self: Effect<R, E, A>
  ) => Effect<R, never, readonly [Effect<never, E, A>, Effect<never, never, void>]>
  <R, E, A>(
    self: Effect<R, E, A>,
    timeToLive: Duration.Duration
  ): Effect<R, never, readonly [Effect<never, E, A>, Effect<never, never, void>]>
} = circular.cachedInvalidate

const _catch: {
  <N extends keyof E, K extends E[N] & string, E, R1, E1, A1>(
    tag: N,
    k: K,
    f: (error: Extract<E, { [n in N]: K }>) => Effect<R1, E1, A1>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R1 | R, E1 | Exclude<E, { [n in N]: K }>, A1 | A>
  <R, E, A, N extends keyof E, K extends E[N] & string, R1, E1, A1>(
    self: Effect<R, E, A>,
    tag: N,
    k: K,
    f: (error: Extract<E, { [n in N]: K }>) => Effect<R1, E1, A1>
  ): Effect<R | R1, E1 | Exclude<E, { [n in N]: K }>, A | A1>
} = effect._catch

export {
  /**
   * Recovers from specified error.
   *
   * @since 1.0.0
   * @category error handling
   */
  _catch as catch
}

/**
 * Recovers from all recoverable errors.
 *
 * **Note**: that `Effect.catchAll` will not recover from unrecoverable defects. To
 * recover from both recoverable and unrecoverable errors use
 * `Effect.catchAllCause`.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchAll: {
  <E, R2, E2, A2>(f: (e: E) => Effect<R2, E2, A2>): <R, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2, A2 | A>
  <R, A, E, R2, E2, A2>(self: Effect<R, E, A>, f: (e: E) => Effect<R2, E2, A2>): Effect<R | R2, E2, A | A2>
} = core.catchAll

/**
 * Recovers from both recoverable and unrecoverable errors.
 *
 * See `absorb`, `sandbox`, `mapErrorCause` for other functions that can
 * recover from defects.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchAllCause: {
  <E, R2, E2, A2>(
    f: (cause: Cause.Cause<E>) => Effect<R2, E2, A2>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2, A2 | A>
  <R, A, E, R2, E2, A2>(
    self: Effect<R, E, A>,
    f: (cause: Cause.Cause<E>) => Effect<R2, E2, A2>
  ): Effect<R | R2, E2, A | A2>
} = core.catchAllCause

/**
 * Recovers from all defects with provided function.
 *
 * **WARNING**: There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchAllDefect: {
  <R2, E2, A2>(
    f: (defect: unknown) => Effect<R2, E2, A2>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A2 | A>
  <R, E, A, R2, E2, A2>(
    self: Effect<R, E, A>,
    f: (defect: unknown) => Effect<R2, E2, A2>
  ): Effect<R | R2, E | E2, A | A2>
} = effect.catchAllDefect

/**
 * Recovers from some or all of the error cases.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchSome: {
  <E, R2, E2, A2>(
    pf: (e: E) => Option.Option<Effect<R2, E2, A2>>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R2 | R, E | E2, A2 | A>
  <R, A, E, R2, E2, A2>(
    self: Effect<R, E, A>,
    pf: (e: E) => Option.Option<Effect<R2, E2, A2>>
  ): Effect<R | R2, E | E2, A | A2>
} = core.catchSome

/**
 * Recovers from some or all of the error cases with provided cause.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchSomeCause: {
  <E, R2, E2, A2>(
    f: (cause: Cause.Cause<E>) => Option.Option<Effect<R2, E2, A2>>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R2 | R, E | E2, A2 | A>
  <R, E, A, R2, E2, A2>(
    self: Effect<R, E, A>,
    f: (cause: Cause.Cause<E>) => Option.Option<Effect<R2, E2, A2>>
  ): Effect<R | R2, E | E2, A | A2>
} = effect.catchSomeCause

/**
 * Recovers from some or all of the defects with provided partial function.
 *
 * **WARNING**: There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchSomeDefect: {
  <R2, E2, A2>(
    pf: (defect: unknown) => Option.Option<Effect<R2, E2, A2>>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A2 | A>
  <R, E, A, R2, E2, A2>(
    self: Effect<R, E, A>,
    pf: (defect: unknown) => Option.Option<Effect<R2, E2, A2>>
  ): Effect<R | R2, E | E2, A | A2>
} = effect.catchSomeDefect

/**
 * Recovers from the specified tagged error.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchTag: {
  <K extends E["_tag"] & string, E extends { _tag: string }, R1, E1, A1>(
    k: K,
    f: (e: Extract<E, { _tag: K }>) => Effect<R1, E1, A1>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R1 | R, E1 | Exclude<E, { _tag: K }>, A1 | A>
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string, R1, E1, A1>(
    self: Effect<R, E, A>,
    k: K,
    f: (e: Extract<E, { _tag: K }>) => Effect<R1, E1, A1>
  ): Effect<R | R1, E1 | Exclude<E, { _tag: K }>, A | A1>
} = effect.catchTag

/**
 * Recovers from the specified tagged errors.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchTags: {
  <
    E extends { _tag: string },
    Cases extends { [K in E["_tag"]]+?: ((error: Extract<E, { _tag: K }>) => Effect<any, any, any>) | undefined }
  >(
    cases: Cases
  ): <R, A>(
    self: Effect<R, E, A>
  ) => Effect<
    | R
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect<infer R, any, any> ? R : never
    }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect<any, infer E, any> ? E : never
    }[keyof Cases],
    | A
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect<any, any, infer A> ? A : never
    }[keyof Cases]
  >
  <
    R,
    E extends { _tag: string },
    A,
    Cases extends { [K in E["_tag"]]+?: ((error: Extract<E, { _tag: K }>) => Effect<any, any, any>) | undefined }
  >(
    self: Effect<R, E, A>,
    cases: Cases
  ): Effect<
    | R
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect<infer R, any, any> ? R : never
    }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect<any, infer E, any> ? E : never
    }[keyof Cases],
    | A
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect<any, any, infer A> ? A : never
    }[keyof Cases]
  >
} = effect.catchTags

/**
 * Returns an effect that succeeds with the cause of failure of this effect,
 * or `Cause.empty` if the effect did succeed.
 *
 * @since 1.0.0
 * @category error handling
 */
export const cause: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, Cause.Cause<E>> = effect.cause

/**
 * Checks the interrupt status, and produces the effect returned by the
 * specified callback.
 *
 * @since 1.0.0
 * @category constructors
 */
export const checkInterruptible: <R, E, A>(f: (isInterruptible: boolean) => Effect<R, E, A>) => Effect<R, E, A> =
  core.checkInterruptible

/**
 * Retreives the `Clock` service from the context
 *
 * @since 1.0.0
 * @category context
 */
export const clock: (_: void) => Effect<never, never, Clock.Clock> = effect.clock

/**
 * Retreives the `Clock` service from the context and provides it to the
 * specified effectful function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const clockWith: <R, E, A>(f: (clock: Clock.Clock) => Effect<R, E, A>) => Effect<R, E, A> = effect.clockWith

/**
 * Uses the default config provider to load the specified config, or fail with
 * an error of type Config.Error.
 *
 * @since 1.0.0
 * @category config
 */
export const config: <A>(config: Config<A>) => Effect<never, ConfigError, A> = defaultServices.config

/**
 * Retrieves the default config provider, and passes it to the specified
 * function, which may return an effect that uses the provider to perform some
 * work or compute some value.
 *
 * @since 1.0.0
 * @category config
 */
export const configProviderWith: <R, E, A>(f: (configProvider: ConfigProvider) => Effect<R, E, A>) => Effect<R, E, A> =
  defaultServices.configProviderWith

/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collect: {
  <A, R, E, B>(f: (a: A) => Effect<R, Option.Option<E>, B>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>
  <A, R, E, B>(elements: Iterable<A>, f: (a: A) => Effect<R, Option.Option<E>, B>): Effect<R, E, Chunk.Chunk<B>>
} = fiberRuntime.collect

/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAll: <R, E, A>(effects: Iterable<Effect<R, E, A>>) => Effect<R, E, Chunk.Chunk<A>> =
  effect.collectAll

/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllParDiscard`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllDiscard: <R, E, A>(effects: Iterable<Effect<R, E, A>>) => Effect<R, E, void> =
  effect.collectAllDiscard

/**
 * Evaluate each effect in the structure in parallel, and collect the results.
 * For a sequential version, see `collectAll`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllPar: <R, E, A>(effects: Iterable<Effect<R, E, A>>) => Effect<R, E, Chunk.Chunk<A>> =
  fiberRuntime.collectAllPar

/**
 * Evaluate each effect in the structure in parallel, and discard the results.
 * For a sequential version, see `collectAllDiscard`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllParDiscard: <R, E, A>(effects: Iterable<Effect<R, E, A>>) => Effect<R, E, void> =
  fiberRuntime.collectAllParDiscard

/**
 * Evaluate each effect in the structure with `collectAll`, and collect the
 * results with given partial function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllWith: {
  <A, B>(pf: (a: A) => Option.Option<B>): <R, E>(elements: Iterable<Effect<R, E, A>>) => Effect<R, E, Chunk.Chunk<B>>
  <R, E, A, B>(elements: Iterable<Effect<R, E, A>>, pf: (a: A) => Option.Option<B>): Effect<R, E, Chunk.Chunk<B>>
} = effect.collectAllWith

/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllWithPar: {
  <A, B>(pf: (a: A) => Option.Option<B>): <R, E>(elements: Iterable<Effect<R, E, A>>) => Effect<R, E, Chunk.Chunk<B>>
  <R, E, A, B>(elements: Iterable<Effect<R, E, A>>, pf: (a: A) => Option.Option<B>): Effect<R, E, Chunk.Chunk<B>>
} = fiberRuntime.collectAllWithPar

/**
 * Returns a filtered, mapped subset of the elements of the iterable based on a
 * partial function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllWithEffect: {
  <A, R, E, B>(f: (a: A) => Option.Option<Effect<R, E, B>>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>
  <A, R, E, B>(elements: Iterable<A>, f: (a: A) => Option.Option<Effect<R, E, B>>): Effect<R, E, Chunk.Chunk<B>>
} = effect.collectAllWithEffect

/**
 * Evaluate and run each effect in the structure and collect the results,
 * discarding results from failed effects.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllSuccesses: <R, E, A>(as: Iterable<Effect<R, E, A>>) => Effect<R, never, Chunk.Chunk<A>> =
  effect.collectAllSuccesses

/**
 * Evaluate and run each effect in the structure in parallel and collect the
 * results, discarding results from failed effects.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllSuccessesPar: <R, E, A>(
  elements: Iterable<Effect<R, E, A>>
) => Effect<R, never, Chunk.Chunk<A>> = fiberRuntime.collectAllSuccessesPar

/**
 * Collects the first element of the `Collection<A>` for which the effectual
 * function `f` returns `Some`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectFirst: {
  <R, E, A, B>(f: (a: A) => Effect<R, E, Option.Option<B>>): (elements: Iterable<A>) => Effect<R, E, Option.Option<B>>
  <R, E, A, B>(elements: Iterable<A>, f: (a: A) => Effect<R, E, Option.Option<B>>): Effect<R, E, Option.Option<B>>
} = effect.collectFirst

/**
 * Evaluate each effect in the structure in parallel, collecting the successful
 * values and discarding the empty cases.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectPar: {
  <A, R, E, B>(f: (a: A) => Effect<R, Option.Option<E>, B>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>
  <A, R, E, B>(elements: Iterable<A>, f: (a: A) => Effect<R, Option.Option<E>, B>): Effect<R, E, Chunk.Chunk<B>>
} = fiberRuntime.collectPar

/**
 * Transforms all elements of the chunk for as long as the specified partial
 * function is defined.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectWhile: {
  <A, R, E, B>(f: (a: A) => Option.Option<Effect<R, E, B>>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>
  <A, R, E, B>(elements: Iterable<A>, f: (a: A) => Option.Option<Effect<R, E, B>>): Effect<R, E, Chunk.Chunk<B>>
} = effect.collectWhile

/**
 * Evaluate the predicate, return the given `A` as success if predicate returns
 * true, and the given `E` as error otherwise
 *
 * For effectful conditionals, see `ifEffect`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const cond: <E, A>(
  predicate: LazyArg<boolean>,
  result: LazyArg<A>,
  error: LazyArg<E>
) => Effect<never, E, A> = effect.cond

/**
 * @since 1.0.0
 * @category context
 */
export const context: <R>() => Effect<R, never, Context.Context<R>> = core.context

/**
 * Accesses the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const contextWith: <R, A>(f: (context: Context.Context<R>) => A) => Effect<R, never, A> = effect.contextWith

/**
 * Effectually accesses the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const contextWithEffect: <R, R0, E, A>(
  f: (context: Context.Context<R0>) => Effect<R, E, A>
) => Effect<R | R0, E, A> = core.contextWithEffect

/**
 * Fail with the specifed `error` if the supplied partial function does not
 * match, otherwise continue with the returned value.
 *
 * @since 1.0.0
 * @category error handling
 */
export const continueOrFail: {
  <E1, A, A2>(
    error: LazyArg<E1>,
    pf: (a: A) => Option.Option<A2>
  ): <R, E>(self: Effect<R, E, A>) => Effect<R, E1 | E, A2>
  <R, E, A, E1, A2>(self: Effect<R, E, A>, error: LazyArg<E1>, pf: (a: A) => Option.Option<A2>): Effect<R, E | E1, A2>
} = effect.continueOrFail

/**
 * Fail with the specifed `error` if the supplied partial function does not
 * match, otherwise continue with the returned value.
 *
 * @since 1.0.0
 * @category error handling
 */
export const continueOrFailEffect: {
  <E1, A, R2, E2, A2>(
    error: LazyArg<E1>,
    pf: (a: A) => Option.Option<Effect<R2, E2, A2>>
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E1 | E2 | E, A2>
  <R, E, A, E1, R2, E2, A2>(
    self: Effect<R, E, A>,
    error: LazyArg<E1>,
    pf: (a: A) => Option.Option<Effect<R2, E2, A2>>
  ): Effect<R | R2, E | E1 | E2, A2>
} = effect.continueOrFailEffect

/**
 * Provides some of the context required to run this effect,
 * leaving the remainder `R0`.
 *
 * @since 1.0.0
 * @category context
 */
export const contramapContext: {
  <R0, R>(f: (context: Context.Context<R0>) => Context.Context<R>): <E, A>(self: Effect<R, E, A>) => Effect<R0, E, A>
  <R0, R, E, A>(self: Effect<R, E, A>, f: (context: Context.Context<R0>) => Context.Context<R>): Effect<R0, E, A>
} = core.contramapContext

/**
 * Returns a new workflow that will not supervise any fibers forked by this
 * workflow.
 *
 * @since 1.0.0
 * @category supervision
 */
export const daemonChildren: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A> = fiberRuntime.daemonChildren

/**
 * Returns an effect that is delayed from this effect by the specified
 * `Duration`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const delay: {
  (duration: Duration.Duration): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, duration: Duration.Duration): Effect<R, E, A>
} = effect.delay

/**
 * Constructs an effect with information about the current `Fiber`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const descriptor: (_: void) => Effect<never, never, Fiber.Fiber.Descriptor> = effect.descriptor

/**
 * Constructs an effect based on information about the current `Fiber`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const descriptorWith: <R, E, A>(f: (descriptor: Fiber.Fiber.Descriptor) => Effect<R, E, A>) => Effect<R, E, A> =
  effect.descriptorWith

/**
 * @since 1.0.0
 * @category constructors
 */
export const die: (defect: unknown) => Effect<never, never, never> = core.die

/**
 * Returns an effect that dies with a `RuntimeException` having the specified
 * text message. This method can be used for terminating a fiber because a
 * defect has been detected in the code.
 *
 * @since 1.0.0
 * @category constructors
 */
export const dieMessage: (message: string) => Effect<never, never, never> = effect.dieMessage

/**
 * @since 1.0.0
 * @category constructors
 */
export const dieSync: (evaluate: LazyArg<unknown>) => Effect<never, never, never> = core.dieSync

/**
 * Returns an effect whose interruption will be disconnected from the
 * fiber's own interruption, being performed in the background without
 * slowing down the fiber's interruption.
 *
 * This method is useful to create "fast interrupting" effects. For
 * example, if you call this on a bracketed effect, then even if the
 * effect is "stuck" in acquire or release, its interruption will return
 * immediately, while the acquire / release are performed in the
 * background.
 *
 * See timeout and race for other applications.
 *
 * @since 1.0.0
 * @category interruption
 */
export const disconnect: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A> = circular.disconnect

/**
 * Returns a new workflow that executes this one and captures the changes in
 * `FiberRef` values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const diffFiberRefs: <R, E, A>(
  self: Effect<R, E, A>
) => Effect<R, E, readonly [FiberRefsPatch.FiberRefsPatch, A]> = effect.diffFiberRefs

/**
 * Binds an effectful value in a `do` scope
 *
 * @since 1.0.0
 * @category do notation
 */
export const bind: {
  <N extends string, K, R2, E2, A>(
    tag: Exclude<N, keyof K>,
    f: (_: K) => Effect<R2, E2, A>
  ): <R, E>(self: Effect<R, E, K>) => Effect<R2 | R, E2 | E, MergeRecord<K, { [k in N]: A }>>
  <R, E, N extends string, K, R2, E2, A>(
    self: Effect<R, E, K>,
    tag: Exclude<N, keyof K>,
    f: (_: K) => Effect<R2, E2, A>
  ): Effect<R | R2, E | E2, MergeRecord<K, { [k in N]: A }>>
} = effect.bind

/**
 * Like bind for values
 *
 * @since 1.0.0
 * @category do notation
 */
export const bindValue: {
  <N extends string, K, A>(
    tag: Exclude<N, keyof K>,
    f: (_: K) => A
  ): <R, E>(self: Effect<R, E, K>) => Effect<R, E, MergeRecord<K, { [k in N]: A }>>
  <R, E, K, N extends string, A>(
    self: Effect<R, E, K>,
    tag: Exclude<N, keyof K>,
    f: (_: K) => A
  ): Effect<R, E, MergeRecord<K, { [k in N]: A }>>
} = effect.bindValue

/**
 * @since 1.0.0
 * @category do notation
 */
export const Do: (_: void) => Effect<never, never, {}> = effect.Do

/**
 * @since 1.0.0
 * @category constructors
 */
export const done: <E, A>(exit: Exit.Exit<E, A>) => Effect<never, E, A> = core.done

/**
 * Drops all elements until the effectful predicate returns true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const dropUntil: {
  <A, R, E>(predicate: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<A>>
  <A, R, E>(elements: Iterable<A>, predicate: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>
} = effect.dropUntil

/**
 * Drops all elements so long as the predicate returns true.
 *
 * @since 1.0.0
 * @category constructors
 */
export const dropWhile: {
  <R, E, A>(f: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<A>>
  <R, E, A>(elements: Iterable<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>
} = effect.dropWhile

/**
 * Returns an effect whose failure and success have been lifted into an
 * `Either`. The resulting effect cannot fail, because the failure case has
 * been exposed as part of the `Either` success case.
 *
 * This method is useful for recovering from effects that may fail.
 *
 * The error parameter of the returned `Effect` is `never`, since it is
 * guaranteed the effect does not model failure.
 *
 * @since 1.0.0
 * @category conversions
 */
export const either: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, Either.Either<E, A>> = core.either

/**
 * Returns an effect that, if this effect _starts_ execution, then the
 * specified `finalizer` is guaranteed to be executed, whether this effect
 * succeeds, fails, or is interrupted.
 *
 * For use cases that need access to the effect's result, see `onExit`.
 *
 * Finalizers offer very powerful guarantees, but they are low-level, and
 * should generally not be used for releasing resources. For higher-level
 * logic built on `ensuring`, see the `acquireRelease` family of methods.
 *
 * @since 1.0.0
 * @category finalization
 */
export const ensuring: {
  <R1, X>(finalizer: Effect<R1, never, X>): <R, E, A>(self: Effect<R, E, A>) => Effect<R1 | R, E, A>
  <R, E, A, R1, X>(self: Effect<R, E, A>, finalizer: Effect<R1, never, X>): Effect<R | R1, E, A>
} = circular.ensuring

/**
 * Acts on the children of this fiber (collected into a single fiber),
 * guaranteeing the specified callback will be invoked, whether or not this
 * effect succeeds.
 *
 * @since 1.0.0
 * @category finalization
 */
export const ensuringChild: {
  <R2, X>(
    f: (fiber: Fiber.Fiber<any, Chunk.Chunk<unknown>>) => Effect<R2, never, X>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E, A>
  <R, E, A, R2, X>(
    self: Effect<R, E, A>,
    f: (fiber: Fiber.Fiber<any, Chunk.Chunk<unknown>>) => Effect<R2, never, X>
  ): Effect<R | R2, E, A>
} = circular.ensuringChild

/**
 * Acts on the children of this fiber, guaranteeing the specified callback
 * will be invoked, whether or not this effect succeeds.
 *
 * @since 1.0.0
 * @category finalization
 */
export const ensuringChildren: {
  <R1, X>(
    children: (fibers: Chunk.Chunk<Fiber.RuntimeFiber<any, any>>) => Effect<R1, never, X>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R1 | R, E, A>
  <R, E, A, R1, X>(
    self: Effect<R, E, A>,
    children: (fibers: Chunk.Chunk<Fiber.RuntimeFiber<any, any>>) => Effect<R1, never, X>
  ): Effect<R | R1, E, A>
} = circular.ensuringChildren

/**
 * Returns an effect that ignores errors and runs repeatedly until it
 * eventually succeeds.
 *
 * @since 1.0.0
 * @category mutations
 */
export const eventually: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, A> = effect.eventually

/**
 * Determines whether any element of the `Iterable<A>` satisfies the effectual
 * predicate `f`, working sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
export const exists: {
  <R, E, A>(f: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, boolean>
  <R, E, A>(elements: Iterable<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, boolean>
} = effect.exists

/**
 * Determines whether any element of the `Iterable<A>` satisfies the effectual
 * predicate `f`, working in parallel. Interrupts all effects on any failure or
 * finding an element that satisfies the predicate.
 *
 * @since 1.0.0
 * @category constructors
 */
export const existsPar: {
  <R, E, A>(f: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, boolean>
  <R, E, A>(elements: Iterable<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, boolean>
} = fiberRuntime.existsPar

/**
 * @since 1.0.0
 * @category utilities
 */
export const exit: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, Exit.Exit<E, A>> = core.exit

/**
 * @since 1.0.0
 * @category constructors
 */
export const fail: <E>(error: E) => Effect<never, E, never> = core.fail

/**
 * @since 1.0.0
 * @category constructors
 */
export const failSync: <E>(evaluate: LazyArg<E>) => Effect<never, E, never> = core.failSync

/**
 * @since 1.0.0
 * @category constructors
 */
export const failCause: <E>(cause: Cause.Cause<E>) => Effect<never, E, never> = core.failCause

/**
 * @since 1.0.0
 * @category constructors
 */
export const failCauseSync: <E>(evaluate: LazyArg<Cause.Cause<E>>) => Effect<never, E, never> = core.failCauseSync

/**
 * @since 1.0.0
 * @category utilities
 */
export const fiberId: (_: void) => Effect<never, never, FiberId.FiberId> = core.fiberId

/**
 * @since 1.0.0
 * @category constructors
 */
export const fiberIdWith: <R, E, A>(f: (descriptor: FiberId.Runtime) => Effect<R, E, A>) => Effect<R, E, A> =
  core.fiberIdWith

/**
 * Filters the collection using the specified effectful predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filter: {
  <A, R, E>(f: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<A>>
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>
} = effect.filter

/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterPar: {
  <A, R, E>(f: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<A>>
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>
} = fiberRuntime.filterPar

/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterNot: {
  <A, R, E>(f: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<A>>
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>
} = effect.filterNot

/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterNotPar: {
  <A, R, E>(f: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<A>>
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>
} = fiberRuntime.filterNotPar

/**
 * Filter the specified effect with the provided function, dying with specified
 * defect if the predicate fails.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrDie: {
  <A, B extends A>(f: Refinement<A, B>, defect: LazyArg<unknown>): <R, E>(self: Effect<R, E, A>) => Effect<R, E, B>
  <A>(f: Predicate<A>, defect: LazyArg<unknown>): <R, E>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A, B extends A>(self: Effect<R, E, A>, f: Refinement<A, B>, defect: LazyArg<unknown>): Effect<R, E, B>
  <R, E, A>(self: Effect<R, E, A>, f: Predicate<A>, defect: LazyArg<unknown>): Effect<R, E, A>
} = effect.filterOrDie

/**
 * Filter the specified effect with the provided function, dying with specified
 * message if the predicate fails.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrDieMessage: {
  <A, B extends A>(f: Refinement<A, B>, message: string): <R, E>(self: Effect<R, E, A>) => Effect<R, E, B>
  <A>(f: Predicate<A>, message: string): <R, E>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A, B extends A>(self: Effect<R, E, A>, f: Refinement<A, B>, message: string): Effect<R, E, B>
  <R, E, A>(self: Effect<R, E, A>, f: Predicate<A>, message: string): Effect<R, E, A>
} = effect.filterOrDieMessage

/**
 * Filters the specified effect with the provided function returning the value
 * of the effect if it is successful, otherwise returns the value of `orElse`.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrElse: {
  <A, B extends A, R2, E2, C>(
    f: Refinement<A, B>,
    orElse: LazyArg<Effect<R2, E2, C>>
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, B | C>
  <A, R2, E2, B>(
    f: Predicate<A>,
    orElse: LazyArg<Effect<R2, E2, B>>
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A | B>
  <R, E, A, B extends A, R2, E2, C>(
    self: Effect<R, E, A>,
    f: Refinement<A, B>,
    orElse: LazyArg<Effect<R2, E2, C>>
  ): Effect<R | R2, E | E2, B | C>
  <R, E, A, R2, E2, B>(
    self: Effect<R, E, A>,
    f: Predicate<A>,
    orElse: LazyArg<Effect<R2, E2, B>>
  ): Effect<R | R2, E | E2, A | B>
} = effect.filterOrElse

/**
 * Filters the specified effect with the provided function returning the value
 * of the effect if it is successful, otherwise returns the value of `orElse`.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrElseWith: {
  <A, B extends A, R2, E2, C>(
    f: Refinement<A, B>,
    orElse: (a: A) => Effect<R2, E2, C>
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, B | C>
  <A, R2, E2, B>(
    f: Predicate<A>,
    orElse: (a: A) => Effect<R2, E2, B>
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A | B>
  <R, E, A, B extends A, R2, E2, C>(
    self: Effect<R, E, A>,
    f: Refinement<A, B>,
    orElse: (a: A) => Effect<R2, E2, C>
  ): Effect<R | R2, E | E2, B | C>
  <R, E, A, R2, E2, B>(
    self: Effect<R, E, A>,
    f: Predicate<A>,
    orElse: (a: A) => Effect<R2, E2, B>
  ): Effect<R | R2, E | E2, A | B>
} = effect.filterOrElseWith

/**
 * Filter the specified effect with the provided function, failing with specified
 * error if the predicate fails.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrFail: {
  <A, B extends A, E2>(f: Refinement<A, B>, error: LazyArg<E2>): <R, E>(self: Effect<R, E, A>) => Effect<R, E2 | E, B>
  <A, E2>(f: Predicate<A>, error: LazyArg<E2>): <R, E>(self: Effect<R, E, A>) => Effect<R, E2 | E, A>
  <R, E, A, B extends A, E2>(self: Effect<R, E, A>, f: Refinement<A, B>, error: LazyArg<E2>): Effect<R, E | E2, B>
  <R, E, A, E2>(self: Effect<R, E, A>, f: Predicate<A>, error: LazyArg<E2>): Effect<R, E | E2, A>
} = effect.filterOrFail

/**
 * Returns the first element that satisfies the effectful predicate.
 *
 * @since 1.0.0
 * @category elements
 */
export const find: {
  <A, R, E>(f: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, Option.Option<A>>
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, Option.Option<A>>
} = effect.find

/**
 * This function takes an iterable of `Effect` values and returns a new
 * `Effect` value that represents the first `Effect` value in the iterable
 * that succeeds. If all of the `Effect` values in the iterable fail, then
 * the resulting `Effect` value will fail as well.
 *
 * This function is sequential, meaning that the `Effect` values in the
 * iterable will be executed in sequence, and the first one that succeeds
 * will determine the outcome of the resulting `Effect` value.
 *
 * @param effects - The iterable of `Effect` values to evaluate.
 *
 * @returns A new `Effect` value that represents the first successful
 * `Effect` value in the iterable, or a failed `Effect` value if all of the
 * `Effect` values in the iterable fail.
 *
 * @since 1.0.0
 * @category elements
 */
export const firstSuccessOf: <R, E, A>(effects: Iterable<Effect<R, E, A>>) => Effect<R, E, A> = effect.firstSuccessOf

/**
 * This function is a pipeable operator that maps over an `Effect` value,
 * flattening the result of the mapping function into a new `Effect` value.
 *
 * @param f - The mapping function to apply to the `Effect` value.
 * This function must return another `Effect` value.
 *
 * @returns A new `Effect` value that is the result of flattening the
 * mapped `Effect` value.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const flatMap: {
  <A, R1, E1, B>(f: (a: A) => Effect<R1, E1, B>): <R, E>(self: Effect<R, E, A>) => Effect<R1 | R, E1 | E, B>
  <R, E, A, R1, E1, B>(self: Effect<R, E, A>, f: (a: A) => Effect<R1, E1, B>): Effect<R | R1, E | E1, B>
} = core.flatMap

/**
 * @since 1.0.0
 * @category sequencing
 */
export const flatten: <R, E, R1, E1, A>(self: Effect<R, E, Effect<R1, E1, A>>) => Effect<R | R1, E | E1, A> =
  core.flatten

/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const flattenErrorOption: {
  <E1>(fallback: E1): <R, E, A>(self: Effect<R, Option.Option<E>, A>) => Effect<R, E1 | E, A>
  <R, E, A, E1>(self: Effect<R, Option.Option<E>, A>, fallback: E1): Effect<R, E | E1, A>
} = effect.flattenErrorOption

/**
 * Returns an effect that swaps the error/success cases. This allows you to
 * use all methods on the error channel, possibly before flipping back.
 *
 * @since 1.0.0
 * @category mutations
 */
export const flip: <R, E, A>(self: Effect<R, E, A>) => Effect<R, A, E> = core.flip

/**
 * Swaps the error/value parameters, applies the function `f` and flips the
 * parameters back
 *
 * @since 1.0.0
 * @category mutations
 */
export const flipWith: {
  <R, A, E, R2, A2, E2>(
    f: (effect: Effect<R, A, E>) => Effect<R2, A2, E2>
  ): (self: Effect<R, E, A>) => Effect<R2, E2, A2>
  <R, A, E, R2, A2, E2>(
    self: Effect<R, E, A>,
    f: (effect: Effect<R, A, E>) => Effect<R2, A2, E2>
  ): Effect<R2, E2, A2>
} = effect.flipWith

/**
 * Determines whether all elements of the `Collection<A>` satisfies the effectual
 * predicate `f`.
 *
 * @since 1.0.0
 * @category elements
 */
export const forAll: {
  <R, E, A>(f: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, boolean>
  <R, E, A>(elements: Iterable<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, boolean>
} = effect.forAll

/**
 * @since 1.0.0
 * @category constructors
 */
export const forEach: {
  <A, R, E, B>(f: (a: A) => Effect<R, E, B>): (self: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>
  <A, R, E, B>(self: Iterable<A>, f: (a: A) => Effect<R, E, B>): Effect<R, E, Chunk.Chunk<B>>
} = core.forEach

/**
 * @since 1.0.0
 * @category constructors
 */
export const forEachDiscard: {
  <A, R, E, B>(f: (a: A) => Effect<R, E, B>): (self: Iterable<A>) => Effect<R, E, void>
  <A, R, E, B>(self: Iterable<A>, f: (a: A) => Effect<R, E, B>): Effect<R, E, void>
} = core.forEachDiscard

/**
 * Returns a new effect that will pass the success value of this effect to the
 * provided callback. If this effect fails, then the failure will be ignored.
 *
 * @since 1.0.0
 * @category elements
 */
export const forEachEffect: {
  <A, R1, E1, B>(f: (a: A) => Effect<R1, E1, B>): <R, E>(self: Effect<R, E, A>) => Effect<R1 | R, E1, Option.Option<B>>
  <R, E, A, R1, E1, B>(self: Effect<R, E, A>, f: (a: A) => Effect<R1, E1, B>): Effect<R | R1, E1, Option.Option<B>>
} = effect.forEachEffect

/**
 * Applies the function `f` to each element of the `Collection<A>` and returns
 * the result in a new `Chunk<B>` using the specified execution strategy.
 *
 * @since 1.0.0
 * @category constructors
 */
export const forEachExec: {
  <R, E, A, B>(
    f: (a: A) => Effect<R, E, B>,
    strategy: ExecutionStrategy.ExecutionStrategy
  ): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect<R, E, B>,
    strategy: ExecutionStrategy.ExecutionStrategy
  ): Effect<R, E, Chunk.Chunk<B>>
} = fiberRuntime.forEachExec

/**
 * Applies the function `f` if the argument is non-empty and returns the
 * results in a new `Option<B>`.
 *
 * @since 1.0.0
 * @category elements
 */
export const forEachOption: {
  <R, E, A, B>(f: (a: A) => Effect<R, E, B>): (option: Option.Option<A>) => Effect<R, E, Option.Option<B>>
  <R, E, A, B>(option: Option.Option<A>, f: (a: A) => Effect<R, E, B>): Effect<R, E, Option.Option<B>>
} = effect.forEachOption

/**
 * Same as `forEach`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @since 1.0.0
 * @category traversing
 */
export const forEachWithIndex: {
  <A, R, E, B>(f: (a: A, i: number) => Effect<R, E, B>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>
  <A, R, E, B>(elements: Iterable<A>, f: (a: A, i: number) => Effect<R, E, B>): Effect<R, E, Chunk.Chunk<B>>
} = effect.forEachWithIndex

/**
 * @since 1.0.0
 * @category constructors
 */
export const forEachPar: {
  <A, R, E, B>(f: (a: A) => Effect<R, E, B>): (self: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>
  <A, R, E, B>(self: Iterable<A>, f: (a: A) => Effect<R, E, B>): Effect<R, E, Chunk.Chunk<B>>
} = fiberRuntime.forEachPar

/**
 * @since 1.0.0
 * @category constructors
 */
export const forEachParDiscard: {
  <A, R, E, _>(f: (a: A) => Effect<R, E, _>): (self: Iterable<A>) => Effect<R, E, void>
  <A, R, E, _>(self: Iterable<A>, f: (a: A) => Effect<R, E, _>): Effect<R, E, void>
} = fiberRuntime.forEachParDiscard

/**
 * Same as `forEachPar`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @since 1.0.0
 * @category constructors
 */
export const forEachParWithIndex: {
  <R, E, A, B>(f: (a: A, i: number) => Effect<R, E, B>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>
  <R, E, A, B>(elements: Iterable<A>, f: (a: A, i: number) => Effect<R, E, B>): Effect<R, E, Chunk.Chunk<B>>
} = fiberRuntime.forEachParWithIndex

/**
 * Repeats this effect forever (until the first error).
 *
 * @since 1.0.0
 * @category mutations
 */
export const forever: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, never> = effect.forever

/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin executing
 * the effect.
 *
 * You can use the `fork` method whenever you want to execute an effect in a
 * new fiber, concurrently and without "blocking" the fiber executing other
 * effects. Using fibers can be tricky, so instead of using this method
 * directly, consider other higher-level methods, such as `raceWith`,
 * `zipPar`, and so forth.
 *
 * The fiber returned by this method has methods to interrupt the fiber and to
 * wait for it to finish executing the effect. See `Fiber` for more
 * information.
 *
 * Whenever you use this method to launch a new fiber, the new fiber is
 * attached to the parent fiber's scope. This means when the parent fiber
 * terminates, the child fiber will be terminated as well, ensuring that no
 * fibers leak. This behavior is called "auto supervision", and if this
 * behavior is not desired, you may use the `forkDaemon` or `forkIn` methods.
 *
 * @since 1.0.0
 * @category supervision
 */
export const fork: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, Fiber.RuntimeFiber<E, A>> = fiberRuntime.fork

/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkDaemon: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, Fiber.RuntimeFiber<E, A>> =
  fiberRuntime.forkDaemon

/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces a list of their results, in order.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkAll: <R, E, A>(
  effects: Iterable<Effect<R, E, A>>
) => Effect<R, never, Fiber.Fiber<E, Chunk.Chunk<A>>> = circular.forkAll

/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces unit. This version is faster than `forkAll`
 * in cases where the results of the forked fibers are not needed.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkAllDiscard: <R, E, A>(effects: Iterable<Effect<R, E, A>>) => Effect<R, never, void> =
  fiberRuntime.forkAllDiscard

/**
 * Forks the effect in the specified scope. The fiber will be interrupted
 * when the scope is closed.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkIn: {
  (scope: Scope.Scope): <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, Fiber.RuntimeFiber<E, A>>
  <R, E, A>(self: Effect<R, E, A>, scope: Scope.Scope): Effect<R, never, Fiber.RuntimeFiber<E, A>>
} = circular.forkIn

/**
 * Forks the fiber in a `Scope`, interrupting it when the scope is closed.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkScoped: <R, E, A>(self: Effect<R, E, A>) => Effect<Scope.Scope | R, never, Fiber.RuntimeFiber<E, A>> =
  circular.forkScoped

/**
 * Like fork but handles an error with the provided handler.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkWithErrorHandler: {
  <E, X>(
    handler: (e: E) => Effect<never, never, X>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R, never, Fiber.RuntimeFiber<E, A>>
  <R, E, A, X>(
    self: Effect<R, E, A>,
    handler: (e: E) => Effect<never, never, X>
  ): Effect<R, never, Fiber.RuntimeFiber<E, A>>
} = fiberRuntime.forkWithErrorHandler

/**
 * Lifts an `Either<E, A>` into an `Effect<never, E, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromEither: <E, A>(either: Either.Either<E, A>) => Effect<never, E, A> = core.fromEither

/**
 * Lifts an `Either<Cause<E>, A>` into an `Effect<never, E, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromEitherCause: <E, A>(either: Either.Either<Cause.Cause<E>, A>) => Effect<never, E, A> =
  effect.fromEitherCause

/**
 * Creates an `Effect` value that represents the exit value of the specified
 * fiber.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromFiber: <E, A>(fiber: Fiber.Fiber<E, A>) => Effect<never, E, A> = circular.fromFiber

/**
 * Creates an `Effect` value that represents the exit value of the specified
 * fiber.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromFiberEffect: <R, E, A>(fiber: Effect<R, E, Fiber.Fiber<E, A>>) => Effect<R, E, A> =
  circular.fromFiberEffect

/**
 * Lifts an `Option` into an `Effect` but preserves the error as an option in
 * the error channel, making it easier to compose in some scenarios.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromOption: <A>(option: Option.Option<A>) => Effect<never, Option.Option<never>, A> = core.fromOption

/**
 * @category models
 * @since 1.0.0
 */
export interface EffectGen<R, E, A> {
  readonly _R: () => R
  readonly _E: () => E
  readonly _A: () => A
  readonly value: Effect<R, E, A>

  [Symbol.iterator](): Generator<EffectGen<R, E, A>, A>
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const gen: <Eff extends EffectGen<any, any, any>, AEff>(
  f: (resume: <R, E, A>(self: Effect<R, E, A>) => EffectGen<R, E, A>) => Generator<Eff, AEff, any>
) => Effect<
  [Eff] extends [never] ? never : [Eff] extends [EffectGen<infer R, any, any>] ? R : never,
  [Eff] extends [never] ? never : [Eff] extends [EffectGen<any, infer E, any>] ? E : never,
  AEff
> = effect.gen

/**
 * Returns a collection of all `FiberRef` values for the fiber running this
 * effect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const getFiberRefs: (_: void) => Effect<never, never, FiberRefs.FiberRefs> = effect.getFiberRefs

/**
 * Lifts an `Option` into an `Effect`, if the option is not defined it fails
 * with `NoSuchElementException`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const getOrFail: <A>(option: Option.Option<A>) => Effect<never, Cause.NoSuchElementException, A> =
  effect.getOrFail

/**
 * Lifts an `Option` into a `IO`, if the option is not defined it fails with
 * `void`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const getOrFailDiscard: <A>(option: Option.Option<A>) => Effect<never, void, A> = effect.getOrFailDiscard

/**
 * Lifts an `Maybe` into an `Effect`. If the option is not defined, fail with
 * the specified `e` value.
 *
 * @since 1.0.0
 * @category conversions
 */
export const getOrFailWith: {
  <E>(error: LazyArg<E>): <A>(option: Option.Option<A>) => Effect<never, E, A>
  <A, E>(option: Option.Option<A>, error: LazyArg<E>): Effect<never, E, A>
} = effect.getOrFailWith

/**
 * Returns a successful effect with the head of the collection if the collection
 * is non-empty, or fails with the error `None` if the collection is empty.
 *
 * @since 1.0.0
 * @category mutations
 */
export const head: <R, E, A>(self: Effect<R, E, Iterable<A>>) => Effect<R, Option.Option<E>, A> = effect.head

/**
 * Runs `onTrue` if the result of `self` is `true` and `onFalse` otherwise.
 *
 * @since 1.0.0
 * @category constructors
 */
export const ifEffect: {
  <R1, R2, E1, E2, A, A1>(
    onTrue: Effect<R1, E1, A>,
    onFalse: Effect<R2, E2, A1>
  ): <R, E>(self: Effect<R, E, boolean>) => Effect<R1 | R2 | R, E1 | E2 | E, A | A1>
  <R, E, R1, R2, E1, E2, A, A1>(
    self: Effect<R, E, boolean>,
    onTrue: Effect<R1, E1, A>,
    onFalse: Effect<R2, E2, A1>
  ): Effect<R | R1 | R2, E | E1 | E2, A | A1>
} = core.ifEffect

/**
 * Returns a new effect that ignores the success or failure of this effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const ignore: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, void> = effect.ignore

/**
 * Returns a new effect that ignores the success or failure of this effect,
 * but which also logs failures at the Debug level, just in case the failure
 * turns out to be important.
 *
 * @since 1.0.0
 * @category mutations
 */
export const ignoreLogged: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, void> = effect.ignoreLogged

/**
 * Inherits values from all `FiberRef` instances into current fiber.
 *
 * @since 1.0.0
 * @category constructors
 */
export const inheritFiberRefs: (childFiberRefs: FiberRefs.FiberRefs) => Effect<never, never, void> =
  effect.inheritFiberRefs

/**
 * @since 1.0.0
 * @category interruption
 */
export const interrupt: (_: void) => Effect<never, never, never> = core.interrupt

/**
 * @since 1.0.0
 * @category interruption
 */
export const interruptWith: (fiberId: FiberId.FiberId) => Effect<never, never, never> = core.interruptWith

/**
 * @since 1.0.0
 * @category interruption
 */
export const interruptible: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A> = core.interruptible

/**
 * @since 1.0.0
 * @category interruption
 */
export const interruptibleMask: <R, E, A>(
  f: (restore: <RX, EX, AX>(effect: Effect<RX, EX, AX>) => Effect<RX, EX, AX>) => Effect<R, E, A>
) => Effect<R, E, A> = core.interruptibleMask

/**
 * @since 1.0.0
 * @category utilities
 */
export const intoDeferred: {
  <E, A>(deferred: Deferred.Deferred<E, A>): <R>(self: Effect<R, E, A>) => Effect<R, never, boolean>
  <R, E, A>(self: Effect<R, E, A>, deferred: Deferred.Deferred<E, A>): Effect<R, never, boolean>
} = core.intoDeferred

/**
 * Returns `true` if this effect is a failure, `false` otherwise.
 *
 * @since 1.0.0
 * @category getter
 */
export const isFailure: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, boolean> = effect.isFailure

/**
 * Returns `true` if this effect is a success, `false` otherwise.
 *
 * @since 1.0.0
 * @category getter
 */
export const isSuccess: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, boolean> = effect.isSuccess

/**
 * Iterates with the specified effectual function. The moral equivalent of:
 *
 * ```ts
 * let s = initial
 *
 * while (cont(s)) {
 *   s = body(s)
 * }
 *
 * return s
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
export const iterate: <Z, R, E>(
  initial: Z,
  cont: (z: Z) => boolean,
  body: (z: Z) => Effect<R, E, Z>
) => Effect<R, E, Z> = effect.iterate

/**
 * "Zooms in" on the value in the `Left` side of an `Either`, moving the
 * possibility that the value is a `Right` to the error channel.
 *
 * @since 1.0.0
 * @category mutations
 */
export const left: <R, E, A, B>(self: Effect<R, E, Either.Either<A, B>>) => Effect<R, Either.Either<E, B>, A> =
  effect.left

/**
 * Performs the specified operation while "zoomed in" on the `Left` case of an
 * `Either`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const leftWith: {
  <R, E, B, A, R1, E1, B1, A1>(
    f: (effect: Effect<R, Either.Either<E, B>, A>) => Effect<R1, Either.Either<E1, B1>, A1>
  ): (self: Effect<R, E, Either.Either<A, B>>) => Effect<R | R1, E | E1, Either.Either<A1, B1>>
  <R, E, B, A, R1, E1, B1, A1>(
    self: Effect<R, E, Either.Either<A, B>>,
    f: (effect: Effect<R, Either.Either<E, B>, A>) => Effect<R1, Either.Either<E1, B1>, A1>
  ): Effect<R | R1, E | E1, Either.Either<A1, B1>>
} = effect.leftWith

/**
 * Logs the specified message at the current log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const log: (message: string) => Effect<never, never, void> = effect.log

/**
 * Logs the specified message at the debug log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logDebug: (message: string) => Effect<never, never, void> = effect.logDebug

/**
 * Logs the specified cause at the debug log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logDebugCause: <E>(cause: Cause.Cause<E>) => Effect<never, never, void> = effect.logDebugCause

/**
 * Logs the specified message and cause at the debug log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logDebugCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Effect<never, never, void> =
  effect.logDebugCauseMessage

/**
 * Logs the specified message at the error log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logError: (message: string) => Effect<never, never, void> = effect.logError

/**
 * Logs the specified cause at the error log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logErrorCause: <E>(cause: Cause.Cause<E>) => Effect<never, never, void> = effect.logErrorCause

/**
 * Logs the specified message and cause at the error log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logErrorCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Effect<never, never, void> =
  effect.logErrorCauseMessage

/**
 * Logs the specified message at the fatal log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logFatal: (message: string) => Effect<never, never, void> = effect.logFatal

/**
 * Logs the specified cause at the fatal log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logFatalCause: <E>(cause: Cause.Cause<E>) => Effect<never, never, void> = effect.logFatalCause

/**
 * Logs the specified message and cause at the fatal log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logFatalCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Effect<never, never, void> =
  effect.logFatalCauseMessage

/**
 * Logs the specified message at the informational log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logInfo: (message: string) => Effect<never, never, void> = effect.logInfo

/**
 * Logs the specified cause at the informational log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logInfoCause: <E>(cause: Cause.Cause<E>) => Effect<never, never, void> = effect.logInfoCause

/**
 * Logs the specified message and cause at the informational log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logInfoCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Effect<never, never, void> =
  effect.logInfoCauseMessage

/**
 * Logs the specified message at the warning log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logWarning: (message: string) => Effect<never, never, void> = effect.logWarning

/**
 * Logs the specified cause at the warning log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logWarningCause: <E>(cause: Cause.Cause<E>) => Effect<never, never, void> = effect.logWarningCause

/**
 * Logs the specified message and cause at the warning log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logWarningCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Effect<never, never, void> =
  effect.logWarningCauseMessage

/**
 * Logs the specified message at the trace log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logTrace: (message: string) => Effect<never, never, void> = effect.logTrace

/**
 * Logs the specified cause at the trace log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logTraceCause: <E>(cause: Cause.Cause<E>) => Effect<never, never, void> = effect.logTraceCause

/**
 * Logs the specified message and cause at the trace log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logTraceCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Effect<never, never, void> =
  effect.logTraceCauseMessage

/**
 * Adjusts the label for the current logging span.
 *
 * @since 1.0.0
 * @category logging
 */
export const logSpan: {
  (label: string): <R, E, A>(effect: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(effect: Effect<R, E, A>, label: string): Effect<R, E, A>
} = effect.logSpan

/**
 * Annotates each log in this effect with the specified log annotation.
 *
 * @since 1.0.0
 * @category logging
 */
export const logAnnotate: {
  (key: string, value: string): <R, E, A>(effect: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(effect: Effect<R, E, A>, key: string, value: string): Effect<R, E, A>
} = effect.logAnnotate

/**
 * Retrieves the log annotations associated with the current scope.
 *
 * @since 1.0.0
 * @category logging
 */
export const logAnnotations: (_: void) => Effect<never, never, HashMap.HashMap<string, string>> = effect.logAnnotations

/**
 * Loops with the specified effectual function, collecting the results into a
 * list. The moral equivalent of:
 *
 * ```ts
 * let s  = initial
 * let as = [] as readonly A[]
 *
 * while (cont(s)) {
 *   as = [body(s), ...as]
 *   s  = inc(s)
 * }
 *
 * A.reverse(as)
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
export const loop: <Z, R, E, A>(
  initial: Z,
  cont: (z: Z) => boolean,
  inc: (z: Z) => Z,
  body: (z: Z) => Effect<R, E, A>
) => Effect<R, E, Chunk.Chunk<A>> = effect.loop

/**
 * Loops with the specified effectual function purely for its effects. The
 * moral equivalent of:
 *
 * ```ts
 * let s = initial
 *
 * while (cont(s)) {
 *   body(s)
 *   s = inc(s)
 * }
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
export const loopDiscard: <Z, R, E, X>(
  initial: Z,
  cont: (z: Z) => boolean,
  inc: (z: Z) => Z,
  body: (z: Z) => Effect<R, E, X>
) => Effect<R, E, void> = effect.loopDiscard

/**
 * @since 1.0.0
 * @category mapping
 */
export const map: {
  <A, B>(f: (a: A) => B): <R, E>(self: Effect<R, E, A>) => Effect<R, E, B>
  <R, E, A, B>(self: Effect<R, E, A>, f: (a: A) => B): Effect<R, E, B>
} = core.map

/**
 * Statefully and effectfully maps over the elements of this chunk to produce
 * new elements.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapAccum: {
  <A, B, R, E, Z>(
    zero: Z,
    f: (z: Z, a: A) => Effect<R, E, readonly [Z, B]>
  ): (elements: Iterable<A>) => Effect<R, E, readonly [Z, Chunk.Chunk<B>]>
  <A, B, R, E, Z>(
    elements: Iterable<A>,
    zero: Z,
    f: (z: Z, a: A) => Effect<R, E, readonly [Z, B]>
  ): Effect<R, E, readonly [Z, Chunk.Chunk<B>]>
} = effect.mapAccum

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapBoth: {
  <E, A, E2, A2>(f: (e: E) => E2, g: (a: A) => A2): <R>(self: Effect<R, E, A>) => Effect<R, E2, A2>
  <R, E, A, E2, A2>(self: Effect<R, E, A>, f: (e: E) => E2, g: (a: A) => A2): Effect<R, E2, A2>
} = effect.mapBoth

/**
 * Returns an effect with its error channel mapped using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapError: {
  <E, E2>(f: (e: E) => E2): <R, A>(self: Effect<R, E, A>) => Effect<R, E2, A>
  <R, A, E, E2>(self: Effect<R, E, A>, f: (e: E) => E2): Effect<R, E2, A>
} = core.mapError

/**
 * Returns an effect with its full cause of failure mapped using the specified
 * function. This can be used to transform errors while preserving the
 * original structure of `Cause`.
 *
 * See `absorb`, `sandbox`, `catchAllCause` for other functions for dealing
 * with defects.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapErrorCause: {
  <E, E2>(f: (cause: Cause.Cause<E>) => Cause.Cause<E2>): <R, A>(self: Effect<R, E, A>) => Effect<R, E2, A>
  <R, E, A, E2>(self: Effect<R, E, A>, f: (cause: Cause.Cause<E>) => Cause.Cause<E2>): Effect<R, E2, A>
} = effect.mapErrorCause

/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapTryCatch: {
  <A, B, E1>(f: (a: A) => B, onThrow: (u: unknown) => E1): <R, E>(self: Effect<R, E, A>) => Effect<R, E1 | E, B>
  <R, E, A, B, E1>(self: Effect<R, E, A>, f: (a: A) => B, onThrow: (u: unknown) => E1): Effect<R, E | E1, B>
} = effect.mapTryCatch

/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `match`.
 *
 * @since 1.0.0
 * @category folding
 */
export const match: {
  <E, A, A2, A3>(
    onFailure: (error: E) => A2,
    onSuccess: (value: A) => A3
  ): <R>(self: Effect<R, E, A>) => Effect<R, never, A2 | A3>
  <R, E, A, A2, A3>(
    self: Effect<R, E, A>,
    onFailure: (error: E) => A2,
    onSuccess: (value: A) => A3
  ): Effect<R, never, A2 | A3>
} = effect.match

/**
 * @since 1.0.0
 * @category error handling
 */
export const matchCause: {
  <E, A2, A, A3>(
    onFailure: (cause: Cause.Cause<E>) => A2,
    onSuccess: (a: A) => A3
  ): <R>(self: Effect<R, E, A>) => Effect<R, never, A2 | A3>
  <R, E, A2, A, A3>(
    self: Effect<R, E, A>,
    onFailure: (cause: Cause.Cause<E>) => A2,
    onSuccess: (a: A) => A3
  ): Effect<R, never, A2 | A3>
} = core.matchCause

/**
 * @since 1.0.0
 * @category error handling
 */
export const matchCauseEffect: {
  <E, A, R2, E2, A2, R3, E3, A3>(
    onFailure: (cause: Cause.Cause<E>) => Effect<R2, E2, A2>,
    onSuccess: (a: A) => Effect<R3, E3, A3>
  ): <R>(self: Effect<R, E, A>) => Effect<R2 | R3 | R, E2 | E3, A2 | A3>
  <R, E, A, R2, E2, A2, R3, E3, A3>(
    self: Effect<R, E, A>,
    onFailure: (cause: Cause.Cause<E>) => Effect<R2, E2, A2>,
    onSuccess: (a: A) => Effect<R3, E3, A3>
  ): Effect<R | R2 | R3, E2 | E3, A2 | A3>
} = core.matchCauseEffect

/**
 * @since 1.0.0
 * @category error handling
 */
export const matchEffect: {
  <E, A, R2, E2, A2, R3, E3, A3>(
    onFailure: (e: E) => Effect<R2, E2, A2>,
    onSuccess: (a: A) => Effect<R3, E3, A3>
  ): <R>(self: Effect<R, E, A>) => Effect<R2 | R3 | R, E2 | E3, A2 | A3>
  <R, E, A, R2, E2, A2, R3, E3, A3>(
    self: Effect<R, E, A>,
    onFailure: (e: E) => Effect<R2, E2, A2>,
    onSuccess: (a: A) => Effect<R3, E3, A3>
  ): Effect<R | R2 | R3, E2 | E3, A2 | A3>
} = core.matchEffect

/**
 * Returns an effect that, if evaluated, will return the lazily computed
 * result of this effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const memoize: <R, E, A>(self: Effect<R, E, A>) => Effect<never, never, Effect<R, E, A>> = effect.memoize

/**
 * Returns a memoized version of the specified effectual function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const memoizeFunction: <R, E, A, B>(
  f: (a: A) => Effect<R, E, B>
) => Effect<never, never, (a: A) => Effect<R, E, B>> = circular.memoizeFunction

/**
 * Returns a new effect where the error channel has been merged into the
 * success channel to their common combined type.
 *
 * @since 1.0.0
 * @category mutations
 */
export const merge: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, E | A> = effect.merge

/**
 * Merges an `Iterable<Effect<R, E, A>>` to a single effect, working
 * sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
export const mergeAll: {
  <Z, A>(zero: Z, f: (z: Z, a: A) => Z): <R, E>(elements: Iterable<Effect<R, E, A>>) => Effect<R, E, Z>
  <R, E, Z, A>(elements: Iterable<Effect<R, E, A>>, zero: Z, f: (z: Z, a: A) => Z): Effect<R, E, Z>
} = effect.mergeAll

/**
 * Merges an `Iterable<Effect<R, E, A>>` to a single effect, working in
 * parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @since 1.0.0
 * @category constructors
 */
export const mergeAllPar: {
  <R, E, A, Z>(elements: Iterable<Effect<R, E, A>>, zero: Z, f: (z: Z, a: A) => Z): Effect<R, E, Z>
  <Z, A>(zero: Z, f: (z: Z, a: A) => Z): <R, E>(elements: Iterable<Effect<R, E, A>>) => Effect<R, E, Z>
} = fiberRuntime.mergeAllPar

/**
 * Returns a new effect where boolean value of this effect is negated.
 *
 * @since 1.0.0
 * @category mapping
 */
export const negate: <R, E>(self: Effect<R, E, boolean>) => Effect<R, E, boolean> = effect.negate

/**
 * Returns a effect that will never produce anything. The moral equivalent of
 * `while(true) {}`, only without the wasted CPU cycles.
 *
 * @since 1.0.0
 * @category constructors
 */
export const never: (_: void) => Effect<never, never, never> = core.never

/**
 * Requires the option produced by this value to be `None`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const none: <R, E, A>(self: Effect<R, E, Option.Option<A>>) => Effect<R, Option.Option<E>, void> = effect.none

/**
 * Lifts an `Option` into a `Effect`. If the option is empty it succeeds with
 * `void`. If the option is defined it fails with the content.
 *
 * @since 1.0.0
 * @category constructors
 */
export const noneOrFail: <E>(option: Option.Option<E>) => Effect<never, E, void> = effect.noneOrFail

/**
 * Lifts an `Option` into a `Effect`. If the option is empty it succeeds with
 * `undefined`. If the option is defined it fails with an error computed by
 * the specified function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const noneOrFailWith: <E, A>(option: Option.Option<A>, f: (a: A) => E) => Effect<never, E, void> =
  effect.noneOrFailWith

/**
 * @since 1.0.0
 * @category mutations
 */
export const onDone: {
  <E, A, R1, X1, R2, X2>(
    onError: (e: E) => Effect<R1, never, X1>,
    onSuccess: (a: A) => Effect<R2, never, X2>
  ): <R>(self: Effect<R, E, A>) => Effect<R1 | R2 | R, never, void>
  <R, E, A, R1, X1, R2, X2>(
    self: Effect<R, E, A>,
    onError: (e: E) => Effect<R1, never, X1>,
    onSuccess: (a: A) => Effect<R2, never, X2>
  ): Effect<R | R1 | R2, never, void>
} = fiberRuntime.onDone

/**
 * @since 1.0.0
 * @category mutations
 */
export const onDoneCause: {
  <E, A, R1, X1, R2, X2>(
    onCause: (cause: Cause.Cause<E>) => Effect<R1, never, X1>,
    onSuccess: (a: A) => Effect<R2, never, X2>
  ): <R>(self: Effect<R, E, A>) => Effect<R1 | R2 | R, never, void>
  <R, E, A, R1, X1, R2, X2>(
    self: Effect<R, E, A>,
    onCause: (cause: Cause.Cause<E>) => Effect<R1, never, X1>,
    onSuccess: (a: A) => Effect<R2, never, X2>
  ): Effect<R | R1 | R2, never, void>
} = fiberRuntime.onDoneCause

/**
 * Runs the specified effect if this effect fails, providing the error to the
 * effect if it exists. The provided effect will not be interrupted.
 *
 * @since 1.0.0
 * @category mutations
 */
export const onError: {
  <E, R2, X>(
    cleanup: (cause: Cause.Cause<E>) => Effect<R2, never, X>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R2 | R, E, A>
  <R, A, E, R2, X>(
    self: Effect<R, E, A>,
    cleanup: (cause: Cause.Cause<E>) => Effect<R2, never, X>
  ): Effect<R | R2, E, A>
} = core.onError

/**
 * Ensures that a cleanup functions runs, whether this effect succeeds, fails,
 * or is interrupted.
 *
 * @category finalization
 * @since 1.0.0
 */
export const onExit: {
  <E, A, R2, X>(
    cleanup: (exit: Exit.Exit<E, A>) => Effect<R2, never, X>
  ): <R>(self: Effect<R, E, A>) => Effect<R2 | R, E, A>
  <R, E, A, R2, X>(
    self: Effect<R, E, A>,
    cleanup: (exit: Exit.Exit<E, A>) => Effect<R2, never, X>
  ): Effect<R | R2, E, A>
} = core.onExit

/**
 * @since 1.0.0
 * @category finalization
 */
export const onInterrupt: {
  <R2, X>(
    cleanup: (interruptors: HashSet.HashSet<FiberId.FiberId>) => Effect<R2, never, X>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E, A>
  <R, E, A, R2, X>(
    self: Effect<R, E, A>,
    cleanup: (interruptors: HashSet.HashSet<FiberId.FiberId>) => Effect<R2, never, X>
  ): Effect<R | R2, E, A>
} = core.onInterrupt

/**
 * Returns an effect that will be executed at most once, even if it is
 * evaluated multiple times.
 *
 * @since 1.0.0
 * @category mutations
 */
export const once: <R, E, A>(self: Effect<R, E, A>) => Effect<never, never, Effect<R, E, void>> = effect.once

/**
 * Executes this effect, skipping the error but returning optionally the
 * success.
 *
 * @since 1.0.0
 * @category mutations
 */
export const option: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, Option.Option<A>> = effect.option

/**
 * Translates effect failure into death of the fiber, making all failures
 * unchecked and not a part of the type of the effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orDie: <R, E, A>(self: Effect<R, E, A>) => Effect<R, never, A> = core.orDie

/**
 * Keeps none of the errors, and terminates the fiber with them, using the
 * specified function to convert the `E` into a `Throwable`.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orDieWith: {
  <E>(f: (error: E) => unknown): <R, A>(self: Effect<R, E, A>) => Effect<R, never, A>
  <R, E, A>(self: Effect<R, E, A>, f: (error: E) => unknown): Effect<R, never, A>
} = core.orDieWith

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElse: {
  <R2, E2, A2>(that: LazyArg<Effect<R2, E2, A2>>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2, A2 | A>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: LazyArg<Effect<R2, E2, A2>>): Effect<R | R2, E2, A | A2>
} = core.orElse

/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElseEither: {
  <R2, E2, A2>(
    that: LazyArg<Effect<R2, E2, A2>>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2, Either.Either<A, A2>>
  <R, E, A, R2, E2, A2>(
    self: Effect<R, E, A>,
    that: LazyArg<Effect<R2, E2, A2>>
  ): Effect<R | R2, E2, Either.Either<A, A2>>
} = effect.orElseEither

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * fails with the specified error.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElseFail: {
  <E2>(evaluate: LazyArg<E2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E2, A>
  <R, E, A, E2>(self: Effect<R, E, A>, evaluate: LazyArg<E2>): Effect<R, E2, A>
} = effect.orElseFail

/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElseOptional: {
  <R, E, A, R2, E2, A2>(
    that: LazyArg<Effect<R2, Option.Option<E2>, A2>>
  ): (self: Effect<R, Option.Option<E>, A>) => Effect<R | R2, Option.Option<E | E2>, A | A2>
  <R, E, A, R2, E2, A2>(
    self: Effect<R, Option.Option<E>, A>,
    that: LazyArg<Effect<R2, Option.Option<E2>, A2>>
  ): Effect<R | R2, Option.Option<E | E2>, A | A2>
} = effect.orElseOptional

/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElseSucceed: {
  <A2>(evaluate: LazyArg<A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A2 | A>
  <R, E, A, A2>(self: Effect<R, E, A>, evaluate: LazyArg<A2>): Effect<R, E, A | A2>
} = effect.orElseSucceed

/**
 * Exposes all parallel errors in a single call.
 *
 * @since 1.0.0
 * @category mutations
 */
export const parallelErrors: <R, E, A>(self: Effect<R, E, A>) => Effect<R, Chunk.Chunk<E>, A> = effect.parallelErrors

/**
 * @since 1.0.0
 * @category mutations
 */
export const parallelFinalizers: <R, E, A>(self: Effect<R, E, A>) => Effect<Scope.Scope | R, E, A> =
  fiberRuntime.parallelFinalizers

/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in a tupled fashion.
 *
 * @since 1.0.0
 * @category constructors
 */
export const partition: {
  <R, E, A, B>(
    f: (a: A) => Effect<R, E, B>
  ): (elements: Iterable<A>) => Effect<R, never, readonly [Chunk.Chunk<E>, Chunk.Chunk<B>]>
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect<R, E, B>
  ): Effect<R, never, readonly [Chunk.Chunk<E>, Chunk.Chunk<B>]>
} = effect.partition

/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as a
 * tuple.
 *
 * @since 1.0.0
 * @category constructors
 */
export const partitionPar: {
  <R, E, A, B>(
    f: (a: A) => Effect<R, E, B>
  ): (elements: Iterable<A>) => Effect<R, never, readonly [Chunk.Chunk<E>, Chunk.Chunk<B>]>
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect<R, E, B>
  ): Effect<R, never, readonly [Chunk.Chunk<E>, Chunk.Chunk<B>]>
} = fiberRuntime.partitionPar

/**
 * Applies the specified changes to the `FiberRef` values for the fiber
 * running this workflow.
 *
 * @since 1.0.0
 * @category mutations
 */
export const patchFiberRefs: (patch: FiberRefsPatch.FiberRefsPatch) => Effect<never, never, void> =
  effect.patchFiberRefs

/**
 * Like `tryPromise` but produces a defect in case of errors.
 *
 * @since 1.0.0
 * @category constructors
 */
export const promise: <A>(evaluate: LazyArg<Promise<A>>) => Effect<never, never, A> = effect.promise

/**
 * Like `promise` but allows for interruption via AbortSignal
 *
 * @since 1.0.0
 * @category constructors
 */
export const promiseInterrupt: <A>(evaluate: (signal: AbortSignal) => Promise<A>) => Effect<never, never, A> =
  effect.promiseInterrupt

/**
 * Provides the effect with its required context, which eliminates its
 * dependency on `R`.
 *
 * @since 1.0.0
 * @category context
 */
export const provideContext: {
  <R>(context: Context.Context<R>): <E, A>(self: Effect<R, E, A>) => Effect<never, E, A>
  <R, E, A>(self: Effect<R, E, A>, context: Context.Context<R>): Effect<never, E, A>
} = core.provideContext

/**
 * Provides a layer to the effect, which translates it to another level.
 *
 * @since 1.0.0
 * @category context
 */
export const provideLayer: {
  <R0, E2, R>(layer: Layer.Layer<R0, E2, R>): <E, A>(self: Effect<R, E, A>) => Effect<R0, E2 | E, A>
  <R, E, A, R0, E2>(self: Effect<R, E, A>, layer: Layer.Layer<R0, E2, R>): Effect<R0, E | E2, A>
} = layer.provideLayer

/**
 * Provides the effect with the single service it requires. If the effect
 * requires more than one service use `provideContext` instead.
 *
 * @since 1.0.0
 * @category context
 */
export const provideService: {
  <T extends Context.Tag<any>>(
    tag: T,
    service: Context.Tag.Service<T>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<Exclude<R, Context.Tag.Service<T>>, E, A>
  <R, E, A, T extends Context.Tag<any>>(
    self: Effect<R, E, A>,
    tag: T,
    service: Context.Tag.Service<T>
  ): Effect<Exclude<R, Context.Tag.Service<T>>, E, A>
} = effect.provideService

/**
 * Provides the effect with the single service it requires. If the effect
 * requires more than one service use `provideContext` instead.
 *
 * @since 1.0.0
 * @category context
 */
export const provideServiceEffect: {
  <T extends Context.Tag<any>, R1, E1>(
    tag: T,
    effect: Effect<R1, E1, Context.Tag.Service<T>>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R1 | Exclude<R, Context.Tag.Service<T>>, E1 | E, A>
  <R, E, A, T extends Context.Tag<any>, R1, E1>(
    self: Effect<R, E, A>,
    tag: T,
    effect: Effect<R1, E1, Context.Tag.Service<T>>
  ): Effect<R1 | Exclude<R, Context.Tag.Service<T>>, E | E1, A>
} = effect.provideServiceEffect

/**
 * Splits the context into two parts, providing one part using the
 * specified layer and leaving the remainder `R0`.
 *
 * @since 1.0.0
 * @category context
 */
export const provideSomeLayer: {
  <R2, E2, A2>(
    layer: Layer.Layer<R2, E2, A2>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | Exclude<R, A2>, E2 | E, A>
  <R, E, A, R2, E2, A2>(
    self: Effect<R, E, A>,
    layer: Layer.Layer<R2, E2, A2>
  ): Effect<R2 | Exclude<R, A2>, E | E2, A>
} = layer.provideSomeLayer

/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * Note that both effects are disconnected before being raced. This means that
 * interruption of the loser will always be performed in the background. If this
 * behavior is not desired, you can use `Effect.raceWith`, which will not
 * disconnect or interrupt losers.
 *
 * @since 1.0.0
 * @category mutations
 */
export const race: {
  <R2, E2, A2>(that: Effect<R2, E2, A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A2 | A>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>): Effect<R | R2, E | E2, A | A2>
} = circular.race

/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value. Losers of
 * the race will be interrupted immediately
 *
 * @since 1.0.0
 * @category mutations
 */
export const raceAll: <R, E, A>(effects: Iterable<Effect<R, E, A>>) => Effect<R, E, A> = fiberRuntime.raceAll

/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * @since 1.0.0
 * @category mutations
 */
export const raceAwait: {
  <R2, E2, A2>(that: Effect<R2, E2, A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A2 | A>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>): Effect<R | R2, E | E2, A | A2>
} = circular.raceAwait

/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to succeed. If neither effect succeeds, then the
 * composed effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 *
 * @since 1.0.0
 * @category mutations
 */
export const raceEither: {
  <R2, E2, A2>(
    that: Effect<R2, E2, A2>
  ): <R, E, A>(
    self: Effect<R, E, A>
  ) => Effect<R2 | R, E2 | E, Either.Either<A, A2>>
  <R, E, A, R2, E2, A2>(
    self: Effect<R, E, A>,
    that: Effect<R2, E2, A2>
  ): Effect<R | R2, E | E2, Either.Either<A, A2>>
} = circular.raceEither

/**
 * Forks this effect and the specified effect into their own fibers, and races
 * them, calling one of two specified callbacks depending on which fiber wins
 * the race. This method does not interrupt, join, or otherwise do anything
 * with the fibers. It can be considered a low-level building block for
 * higher-level operators like `race`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const raceFibersWith: {
  <E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(
    that: Effect<R1, E1, A1>,
    selfWins: (winner: Fiber.RuntimeFiber<E, A>, loser: Fiber.RuntimeFiber<E1, A1>) => Effect<R2, E2, A2>,
    thatWins: (winner: Fiber.RuntimeFiber<E1, A1>, loser: Fiber.RuntimeFiber<E, A>) => Effect<R3, E3, A3>
  ): <R>(self: Effect<R, E, A>) => Effect<R1 | R2 | R3 | R, E2 | E3, A2 | A3>
  <R, E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(
    self: Effect<R, E, A>,
    that: Effect<R1, E1, A1>,
    selfWins: (winner: Fiber.RuntimeFiber<E, A>, loser: Fiber.RuntimeFiber<E1, A1>) => Effect<R2, E2, A2>,
    thatWins: (winner: Fiber.RuntimeFiber<E1, A1>, loser: Fiber.RuntimeFiber<E, A>) => Effect<R3, E3, A3>
  ): Effect<R | R1 | R2 | R3, E2 | E3, A2 | A3>
} = circular.raceFibersWith

/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to complete, whether by success or failure. If
 * neither effect completes, then the composed effect will not complete.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired, then instead of performing `l raceFirst r`, perform
 * `l.disconnect raceFirst r.disconnect`, which disconnects left and right
 * interrupt signal, allowing a fast return, with interruption performed
 * in the background.
 *
 * @since 1.0.0
 * @category mutations
 */
export const raceFirst: {
  <R2, E2, A2>(that: Effect<R2, E2, A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A2 | A>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>): Effect<R | R2, E | E2, A | A2>
} = circular.raceFirst

/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 *
 * @since 1.0.0
 * @category mutations
 */
export const raceWith: {
  <E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(
    that: Effect<R1, E1, A1>,
    leftDone: (exit: Exit.Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>,
    rightDone: (exit: Exit.Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>
  ): <R>(self: Effect<R, E, A>) => Effect<R1 | R2 | R3 | R, E2 | E3, A2 | A3>
  <R, E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(
    self: Effect<R, E, A>,
    that: Effect<R1, E1, A1>,
    leftDone: (exit: Exit.Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>,
    rightDone: (exit: Exit.Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>
  ): Effect<R | R1 | R2 | R3, E2 | E3, A2 | A3>
} = circular.raceWith

/**
 * Retreives the `Random` service from the context.
 *
 * @since 1.0.0
 * @category constructors
 */
export const random: (_: void) => Effect<never, never, Random.Random> = effect.random

/**
 * Retreives the `Random` service from the context and uses it to run the
 * specified workflow.
 *
 * @since 1.0.0
 * @category constructors
 */
export const randomWith: <R, E, A>(f: (random: Random.Random) => Effect<R, E, A>) => Effect<R, E, A> = effect.randomWith

/**
 * Folds an `Iterable<A>` using an effectual function f, working sequentially
 * from left to right.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduce: {
  <Z, A, R, E>(zero: Z, f: (z: Z, a: A) => Effect<R, E, Z>): (elements: Iterable<A>) => Effect<R, E, Z>
  <Z, A, R, E>(elements: Iterable<A>, zero: Z, f: (z: Z, a: A) => Effect<R, E, Z>): Effect<R, E, Z>
} = effect.reduce

/**
 * Reduces an `Iterable<Effect<R, E, A>>` to a single effect, working
 * sequentially.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceAll: {
  <R, E, A>(zero: Effect<R, E, A>, f: (acc: A, a: A) => A): (elements: Iterable<Effect<R, E, A>>) => Effect<R, E, A>
  <R, E, A>(elements: Iterable<Effect<R, E, A>>, zero: Effect<R, E, A>, f: (acc: A, a: A) => A): Effect<R, E, A>
} = effect.reduceAll

/**
 * Reduces an `Iterable<Effect<R, E, A>>` to a single effect, working in
 * parallel.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceAllPar: {
  <R, E, A>(zero: Effect<R, E, A>, f: (acc: A, a: A) => A): (elements: Iterable<Effect<R, E, A>>) => Effect<R, E, A>
  <R, E, A>(elements: Iterable<Effect<R, E, A>>, zero: Effect<R, E, A>, f: (acc: A, a: A) => A): Effect<R, E, A>
} = fiberRuntime.reduceAllPar

/**
 * Folds an `Iterable<A>` using an effectual function f, working sequentially from left to right.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceRight: {
  <A, Z, R, E>(zero: Z, f: (a: A, z: Z) => Effect<R, E, Z>): (elements: Iterable<A>) => Effect<R, E, Z>
  <A, Z, R, E>(elements: Iterable<A>, zero: Z, f: (a: A, z: Z) => Effect<R, E, Z>): Effect<R, E, Z>
} = effect.reduceRight

/**
 * Folds over the elements in this chunk from the left, stopping the fold early
 * when the predicate is not satisfied.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceWhile: {
  <A, R, E, Z>(
    zero: Z,
    predicate: Predicate<Z>,
    f: (s: Z, a: A) => Effect<R, E, Z>
  ): (elements: Iterable<A>) => Effect<R, E, Z>
  <A, R, E, Z>(
    elements: Iterable<A>,
    zero: Z,
    predicate: Predicate<Z>,
    f: (s: Z, a: A) => Effect<R, E, Z>
  ): Effect<R, E, Z>
} = effect.reduceWhile

/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 * @since 1.0.0
 * @category mutations
 */
export const refineOrDie: {
  <E, E1>(pf: (e: E) => Option.Option<E1>): <R, A>(self: Effect<R, E, A>) => Effect<R, E1, A>
  <R, E, A, E1>(self: Effect<R, E, A>, pf: (e: E) => Option.Option<E1>): Effect<R, E1, A>
} = effect.refineOrDie

/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a defect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const refineOrDieWith: {
  <E, E1>(pf: (e: E) => Option.Option<E1>, f: (e: E) => unknown): <R, A>(self: Effect<R, E, A>) => Effect<R, E1, A>
  <R, E, A, E1>(self: Effect<R, E, A>, pf: (e: E) => Option.Option<E1>, f: (e: E) => unknown): Effect<R, E1, A>
} = effect.refineOrDieWith

/**
 * Keeps only the error matching the specified tag, and terminates the fiber
 * with the rest
 *
 * @since 1.0.0
 * @category mutations
 */
export const refineTagOrDie: {
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string>(
    k: K
  ): (self: Effect<R, E, A>) => Effect<R, Extract<E, { _tag: K }>, A>
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string>(
    self: Effect<R, E, A>,
    k: K
  ): Effect<R, Extract<E, { _tag: K }>, A>
} = effect.refineTagOrDie

/**
 * Keeps only the error matching the specified tag, and terminates the fiber
 * with the rest, using the specified function to convert the `E` into a defect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const refineTagOrDieWith: {
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string>(
    k: K,
    f: (e: Exclude<E, { _tag: K }>) => unknown
  ): (self: Effect<R, E, A>) => Effect<R, Extract<E, { _tag: K }>, A>
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string>(
    self: Effect<R, E, A>,
    k: K,
    f: (e: Exclude<E, { _tag: K }>) => unknown
  ): Effect<R, Extract<E, { _tag: K }>, A>
} = effect.refineTagOrDieWith

/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 *
 * @since 1.0.0
 * @category mutations
 */
export const reject: {
  <A, E1>(pf: (a: A) => Option.Option<E1>): <R, E>(self: Effect<R, E, A>) => Effect<R, E1 | E, A>
  <R, E, A, E1>(self: Effect<R, E, A>, pf: (a: A) => Option.Option<E1>): Effect<R, E | E1, A>
} = effect.reject

/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 *
 * @since 1.0.0
 * @category mutations
 */
export const rejectEffect: {
  <A, R1, E1>(
    pf: (a: A) => Option.Option<Effect<R1, E1, E1>>
  ): <R, E>(
    self: Effect<R, E, A>
  ) => Effect<R1 | R, E1 | E, A>
  <R, E, A, R1, E1>(
    self: Effect<R, E, A>,
    pf: (a: A) => Option.Option<Effect<R1, E1, E1>>
  ): Effect<R | R1, E | E1, A>
} = effect.rejectEffect

/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure. Scheduled recurrences are in addition
 * to the first execution, so that `io.repeat(Schedule.once)` yields an effect
 * that executes `io`, and then if that succeeds, executes `io` an additional
 * time.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeat: {
  <R1, A, B>(schedule: Schedule.Schedule<R1, A, B>): <R, E>(self: Effect<R, E, A>) => Effect<R1 | R, E, B>
  <R, E, A, R1, B>(self: Effect<R, E, A>, schedule: Schedule.Schedule<R1, A, B>): Effect<R | R1, E, B>
} = _schedule.repeat_Effect

/**
 * Returns a new effect that repeats this effect the specified number of times
 * or until the first failure. Repeats are in addition to the first execution,
 * so that `io.repeatN(1)` yields an effect that executes `io`, and then if
 * that succeeds, executes `io` an additional time.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatN: {
  (n: number): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, n: number): Effect<R, E, A>
} = effect.repeatN

/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value and
 * schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `pipe(effect, Effect.repeat(Schedule.once()))` yields an effect that executes
 * `effect`, and then if that succeeds, executes `effect` an additional time.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatOrElse: {
  <R2, A, B, E, R3, E2>(
    schedule: Schedule.Schedule<R2, A, B>,
    orElse: (error: E, option: Option.Option<B>) => Effect<R3, E2, B>
  ): <R>(self: Effect<R, E, A>) => Effect<R2 | R3 | R, E2, B>
  <R, E, A, R2, B, R3, E2>(
    self: Effect<R, E, A>,
    schedule: Schedule.Schedule<R2, A, B>,
    orElse: (error: E, option: Option.Option<B>) => Effect<R3, E2, B>
  ): Effect<R | R2 | R3, E2, B>
} = _schedule.repeatOrElse_Effect

/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value and
 * schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `pipe(effect, Effect.repeat(Schedule.once()))` yields an effect that executes
 * `effect`, and then if that succeeds, executes `effect` an additional time.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatOrElseEither: {
  <R2, A, B, E, R3, E2, C>(
    schedule: Schedule.Schedule<R2, A, B>,
    orElse: (error: E, option: Option.Option<B>) => Effect<R3, E2, C>
  ): <R>(self: Effect<R, E, A>) => Effect<R2 | R3 | R, E2, Either.Either<C, B>>
  <R, E, A, R2, B, R3, E2, C>(
    self: Effect<R, E, A>,
    schedule: Schedule.Schedule<R2, A, B>,
    orElse: (error: E, option: Option.Option<B>) => Effect<R3, E2, C>
  ): Effect<R | R2 | R3, E2, Either.Either<C, B>>
} = _schedule.repeatOrElseEither_Effect

/**
 * Repeats this effect until its value satisfies the specified predicate or
 * until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatUntil: {
  <A>(f: Predicate<A>): <R, E>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, f: Predicate<A>): Effect<R, E, A>
} = _schedule.repeatUntil_Effect

/**
 * Repeats this effect until its value satisfies the specified effectful
 * predicate or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatUntilEffect: {
  <A, R2>(f: (a: A) => Effect<R2, never, boolean>): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E, A>
  <R, E, A, R2>(self: Effect<R, E, A>, f: (a: A) => Effect<R2, never, boolean>): Effect<R | R2, E, A>
} = _schedule.repeatUntilEffect_Effect

/**
 * Repeats this effect until its value is equal to the specified value or
 * until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatUntilEquals: {
  <A>(value: A): <R, E>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, value: A): Effect<R, E, A>
} = _schedule.repeatUntilEquals_Effect

/**
 * Repeats this effect while its value satisfies the specified effectful
 * predicate or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatWhile: {
  <A>(f: Predicate<A>): <R, E>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, f: Predicate<A>): Effect<R, E, A>
} = _schedule.repeatWhile_Effect

/**
 * Repeats this effect while its value satisfies the specified effectful
 * predicate or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatWhileEffect: {
  <R1, A>(f: (a: A) => Effect<R1, never, boolean>): <R, E>(self: Effect<R, E, A>) => Effect<R1 | R, E, A>
  <R, E, R1, A>(self: Effect<R, E, A>, f: (a: A) => Effect<R1, never, boolean>): Effect<R | R1, E, A>
} = _schedule.repeatWhileEffect_Effect

/**
 * Repeats this effect for as long as its value is equal to the specified
 * value or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatWhileEquals: {
  <A>(value: A): <R, E>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, value: A): Effect<R, E, A>
} = _schedule.repeatWhileEquals_Effect

/**
 * Retries with the specified retry policy. Retries are done following the
 * failure of the original `io` (up to a fixed maximum with `once` or `recurs`
 * for example), so that that `io.retry(Schedule.once)` means "execute `io`
 * and in case of failure, try again once".
 *
 * @since 1.0.0
 * @category mutations
 */
export const retry: {
  <R1, E, B>(policy: Schedule.Schedule<R1, E, B>): <R, A>(self: Effect<R, E, A>) => Effect<R1 | R, E, A>
  <R, E, A, R1, B>(self: Effect<R, E, A>, policy: Schedule.Schedule<R1, E, B>): Effect<R | R1, E, A>
} = _schedule.retry_Effect

/**
 * Retries this effect the specified number of times.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryN: {
  (n: number): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, n: number): Effect<R, E, A>
} = _schedule.retryN_Effect

/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryOrElse: {
  <R1, E extends E3, A1, R2, E2, A2, E3>(
    policy: Schedule.Schedule<R1, E3, A1>,
    orElse: (e: E, out: A1) => Effect<R2, E2, A2>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R1 | R2 | R, E | E2, A2 | A>
  <R, E extends E3, A, R1, A1, R2, E2, A2, E3>(
    self: Effect<R, E, A>,
    policy: Schedule.Schedule<R1, E3, A1>,
    orElse: (e: E, out: A1) => Effect<R2, E2, A2>
  ): Effect<R | R1 | R2, E | E2, A | A2>
} = _schedule.retryOrElse_Effect

/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryOrElseEither: {
  <R1, E extends E3, A1, R2, E2, A2, E3>(
    policy: Schedule.Schedule<R1, E3, A1>,
    orElse: (e: E, out: A1) => Effect<R2, E2, A2>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R1 | R2 | R, E | E2, Either.Either<A2, A>>
  <R, A, E extends E3, R1, A1, R2, E2, A2, E3>(
    self: Effect<R, E, A>,
    policy: Schedule.Schedule<R1, E3, A1>,
    orElse: (e: E, out: A1) => Effect<R2, E2, A2>
  ): Effect<R | R1 | R2, E | E2, Either.Either<A2, A>>
} = _schedule.retryOrElseEither_Effect

/**
 * Retries this effect until its error satisfies the specified predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryUntil: {
  <E>(f: Predicate<E>): <R, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, f: Predicate<E>): Effect<R, E, A>
} = _schedule.retryUntil_Effect

/**
 * Retries this effect until its error satisfies the specified effectful
 * predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryUntilEffect: {
  <R1, E>(f: (e: E) => Effect<R1, never, boolean>): <R, A>(self: Effect<R, E, A>) => Effect<R1 | R, E, A>
  <R, E, A, R1>(self: Effect<R, E, A>, f: (e: E) => Effect<R1, never, boolean>): Effect<R | R1, E, A>
} = _schedule.retryUntilEffect_Effect

/**
 * Retries this effect until its error is equal to the specified error.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryUntilEquals: {
  <E>(e: E): <R, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, e: E): Effect<R, E, A>
} = _schedule.retryUntilEquals_Effect

/**
 * Retries this effect while its error satisfies the specified predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryWhile: {
  <E>(f: Predicate<E>): <R, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, f: Predicate<E>): Effect<R, E, A>
} = _schedule.retryWhile_Effect

/**
 * Retries this effect while its error satisfies the specified effectful
 * predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryWhileEffect: {
  <R1, E>(f: (e: E) => Effect<R1, never, boolean>): <R, A>(self: Effect<R, E, A>) => Effect<R1 | R, E, A>
  <R, E, A, R1>(self: Effect<R, E, A>, f: (e: E) => Effect<R1, never, boolean>): Effect<R | R1, E, A>
} = _schedule.retryWhileEffect_Effect

/**
 * Retries this effect for as long as its error is equal to the specified
 * error.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryWhileEquals: {
  <E>(e: E): <R, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, e: E): Effect<R, E, A>
} = _schedule.retryWhileEquals_Effect

/**
 * Replicates the given effect `n` times.
 *
 * @since 1.0.0
 * @category mutations
 */
export const replicate: (n: number) => <R, E, A>(self: Effect<R, E, A>) => Chunk.Chunk<Effect<R, E, A>> =
  effect.replicate

/**
 * Performs this effect the specified number of times and collects the
 * results.
 *
 * @since 1.0.0
 * @category mutations
 */
export const replicateEffect: {
  (n: number): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, Chunk.Chunk<A>>
  <R, E, A>(self: Effect<R, E, A>, n: number): Effect<R, E, Chunk.Chunk<A>>
} = effect.replicateEffect

/**
 * Performs this effect the specified number of times, discarding the results.
 *
 * @since 1.0.0
 * @category mutations
 */
export const replicateEffectDiscard: {
  (n: number): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, void>
  <R, E, A>(self: Effect<R, E, A>, n: number): Effect<R, E, void>
} = effect.replicateEffectDiscard

/**
 * Unearth the unchecked failure of the effect (opposite of `orDie`).
 *
 * @since 1.0.0
 * @category mutations
 */
export const resurrect: <R, E, A>(self: Effect<R, E, A>) => Effect<R, unknown, A> = effect.resurrect

/**
 * "Zooms in" on the value in the `Right` side of an `Either`, moving the
 * possibility that the value is a `Left` to the error channel.
 *
 * @since 1.0.0
 * @category getters
 */
export const right: <R, E, A, B>(self: Effect<R, E, Either.Either<A, B>>) => Effect<R, Either.Either<A, E>, B> =
  effect.right

/**
 * Performs the specified operation while "zoomed in" on the `Right` case of an
 * `Either`.
 *
 * @since 1.0.0
 * @category getters
 */
export const rightWith: {
  <R, E, A, A1, B, B1, R1, E1>(
    f: (effect: Effect<R, Either.Either<A, E>, B>) => Effect<R1, Either.Either<A1, E1>, B1>
  ): (self: Effect<R, E, Either.Either<A, B>>) => Effect<R | R1, E | E1, Either.Either<A1, B1>>
  <R, E, A, A1, B, B1, R1, E1>(
    self: Effect<R, E, Either.Either<A, B>>,
    f: (effect: Effect<R, Either.Either<A, E>, B>) => Effect<R1, Either.Either<A1, E1>, B1>
  ): Effect<R | R1, E | E1, Either.Either<A1, B1>>
} = effect.rightWith

/**
 * Returns an effect that accesses the runtime, which can be used to
 * (unsafely) execute tasks. This is useful for integration with legacy code
 * that must call back into Effect code.
 *
 * @since 1.0.0
 * @category constructors
 */
export const runtime: <R>() => Effect<R, never, Runtime.Runtime<R>> = _runtime.runtime

/**
 * Retrieves an effect that succeeds with the current runtime flags, which
 * govern behavior and features of the runtime system.
 *
 * @since 1.0.0
 * @category constructors
 */
export const runtimeFlags: (_: void) => Effect<never, never, RuntimeFlags.RuntimeFlags> = core.runtimeFlags

/**
 * Exposes the full `Cause` of failure for the specified effect.
 *
 * @since 1.0.0
 * @category error handling
 */
export const sandbox: <R, E, A>(self: Effect<R, E, A>) => Effect<R, Cause.Cause<E>, A> = effect.sandbox

/**
 * Runs this effect according to the specified schedule.
 *
 * See `scheduleFrom` for a variant that allows the schedule's decision to
 * depend on the result of this effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const schedule: {
  <R2, Out>(schedule: Schedule.Schedule<R2, any, Out>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E, Out>
  <R, E, A, R2, Out>(self: Effect<R, E, A>, schedule: Schedule.Schedule<R2, any, Out>): Effect<R | R2, E, Out>
} = _schedule.schedule_Effect

/**
 * Runs this effect according to the specified schedule in a new fiber
 * attached to the current scope.
 *
 * @since 1.0.0
 * @category mutations
 */
export const scheduleForked: {
  <R2, Out>(
    schedule: Schedule.Schedule<R2, unknown, Out>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<Scope.Scope | R2 | R, never, Fiber.RuntimeFiber<E, Out>>
  <R, E, A, R2, Out>(
    self: Effect<R, E, A>,
    schedule: Schedule.Schedule<R2, unknown, Out>
  ): Effect<Scope.Scope | R | R2, never, Fiber.RuntimeFiber<E, Out>>
} = circular.scheduleForked

/**
 * Runs this effect according to the specified schedule starting from the
 * specified input value.
 *
 * @since 1.0.0
 * @category mutations
 */
export const scheduleFrom: {
  <R2, In, Out>(
    initial: In,
    schedule: Schedule.Schedule<R2, In, Out>
  ): <R, E>(self: Effect<R, E, In>) => Effect<R2 | R, E, Out>
  <R, E, In, R2, Out>(
    self: Effect<R, E, In>,
    initial: In,
    schedule: Schedule.Schedule<R2, In, Out>
  ): Effect<R | R2, E, Out>
} = _schedule.scheduleFrom_Effect

/**
 * @since 1.0.0
 * @category context
 */
export const scope: (_: void) => Effect<Scope.Scope, never, Scope.Scope> = fiberRuntime.scope

/**
 * Accesses the current scope and uses it to perform the specified effect.
 *
 * @since 1.0.0
 * @category scoping
 */
export const scopeWith: <R, E, A>(f: (scope: Scope.Scope) => Effect<R, E, A>) => Effect<R | Scope.Scope, E, A> =
  fiberRuntime.scopeWith

/**
 * Scopes all resources uses in this workflow to the lifetime of the workflow,
 * ensuring that their finalizers are run as soon as this workflow completes
 * execution, whether by success, failure, or interruption.
 *
 * @since 1.0.0
 * @category context
 */
export const scoped: <R, E, A>(effect: Effect<R, E, A>) => Effect<Exclude<R, Scope.Scope>, E, A> =
  fiberRuntime.scopedEffect

/**
 * Returns a new scoped workflow that runs finalizers added to the scope of
 * this workflow sequentially in the reverse of the order in which they were
 * added. Note that finalizers are run sequentially by default so this only
 * has meaning if used within a scope where finalizers are being run in
 * parallel.
 *
 * @since 1.0.0
 * @category mutations
 */
export const sequentialFinalizers: <R, E, A>(self: Effect<R, E, A>) => Effect<R | Scope.Scope, E, A> =
  fiberRuntime.sequentialFinalizers

/**
 * Extracts the specified service from the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const service: <T>(tag: Context.Tag<T>) => Effect<T, never, T> = core.service

/**
 * Accesses the specified service in the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const serviceWith: <T extends Context.Tag<any>, A>(
  tag: T,
  f: (a: Context.Tag.Service<T>) => A
) => Effect<Context.Tag.Service<T>, never, A> = core.serviceWith

/**
 * Effectfully accesses the specified service in the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const serviceWithEffect: <T extends Context.Tag<any>, R, E, A>(
  tag: T,
  f: (a: Context.Tag.Service<T>) => Effect<R, E, A>
) => Effect<R | Context.Tag.Service<T>, E, A> = core.serviceWithEffect

/**
 * Sets the current `ConfigProvider`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const setConfigProvider: (configProvider: ConfigProvider) => Layer.Layer<never, never, never> =
  circularLayer.setConfigProvider

/**
 * Sets the `FiberRef` values for the fiber running this effect to the values
 * in the specified collection of `FiberRef` values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const setFiberRefs: (fiberRefs: FiberRefs.FiberRefs) => Effect<never, never, void> = effect.setFiberRefs

/**
 * Returns an effect that suspends for the specified duration. This method is
 * asynchronous, and does not actually block the fiber executing the effect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const sleep: (duration: Duration.Duration) => Effect<never, never, void> = effect.sleep

/**
 * Converts an option on values into an option on errors.
 *
 * @since 1.0.0
 * @category mutations
 */
export const some: <R, E, A>(self: Effect<R, E, Option.Option<A>>) => Effect<R, Option.Option<E>, A> = fiberRuntime.some

/**
 * Extracts the optional value, or returns the given 'orElse'.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someOrElse: {
  <B>(orElse: LazyArg<B>): <R, E, A>(self: Effect<R, E, Option.Option<A>>) => Effect<R, E, B | A>
  <R, E, A, B>(self: Effect<R, E, Option.Option<A>>, orElse: LazyArg<B>): Effect<R, E, A | B>
} = effect.someOrElse

/**
 * Extracts the optional value, or executes the given 'orElse' effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someOrElseEffect: {
  <R2, E2, A2>(
    orElse: LazyArg<Effect<R2, E2, A2>>
  ): <R, E, A>(self: Effect<R, E, Option.Option<A>>) => Effect<R2 | R, E2 | E, A2 | A>
  <R, E, A, R2, E2, A2>(
    self: Effect<R, E, Option.Option<A>>,
    orElse: LazyArg<Effect<R2, E2, A2>>
  ): Effect<R | R2, E | E2, A | A2>
} = effect.someOrElseEffect

/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someOrFail: {
  <E2>(orFail: LazyArg<E2>): <R, E, A>(self: Effect<R, E, Option.Option<A>>) => Effect<R, E2 | E, A>
  <R, E, A, E2>(self: Effect<R, E, Option.Option<A>>, orFail: LazyArg<E2>): Effect<R, E | E2, A>
} = effect.someOrFail

/**
 * Extracts the optional value, or fails with a `NoSuchElementException`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someOrFailException: <R, E, A>(
  self: Effect<R, E, Option.Option<A>>
) => Effect<R, Cause.NoSuchElementException | E, A> = effect.someOrFailException

/**
 * Perfoms the specified operation while "zoomed in" on the `Some` case of an
 * `Option`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someWith: {
  <R, E, A, R1, E1, A1>(
    f: (effect: Effect<R, Option.Option<E>, A>) => Effect<R1, Option.Option<E1>, A1>
  ): (self: Effect<R, E, Option.Option<A>>) => Effect<R | R1, E | E1, Option.Option<A1>>
  <R, E, A, R1, E1, A1>(
    self: Effect<R, E, Option.Option<A>>,
    f: (effect: Effect<R, Option.Option<E>, A>) => Effect<R1, Option.Option<E1>, A1>
  ): Effect<R | R1, E | E1, Option.Option<A1>>
} = fiberRuntime.someWith

/**
 * @since 1.0.0
 * @category constructors
 */
export const succeed: <A>(value: A) => Effect<never, never, A> = core.succeed

/**
 * Returns an effect which succeeds with the value wrapped in a `Left`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeedLeft: <A>(value: A) => Effect<never, never, Either.Either<A, never>> = effect.succeedLeft

/**
 * Returns an effect which succeeds with `None`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeedNone: (_: void) => Effect<never, never, Option.Option<never>> = effect.succeedNone

/**
 * Returns an effect which succeeds with the value wrapped in a `Right`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeedRight: <A>(value: A) => Effect<never, never, Either.Either<never, A>> = effect.succeedRight

/**
 * Returns an effect which succeeds with the value wrapped in a `Some`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeedSome: <A>(value: A) => Effect<never, never, Option.Option<A>> = effect.succeedSome

/**
 * Summarizes a effect by computing some value before and after execution, and
 * then combining the values to produce a summary, together with the result of
 * execution.
 *
 * @since 1.0.0
 * @category mutations
 */
export const summarized: {
  <R2, E2, B, C>(
    summary: Effect<R2, E2, B>,
    f: (start: B, end: B) => C
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, readonly [C, A]>
  <R, E, A, R2, E2, B, C>(
    self: Effect<R, E, A>,
    summary: Effect<R2, E2, B>,
    f: (start: B, end: B) => C
  ): Effect<R | R2, E | E2, readonly [C, A]>
} = effect.summarized

/**
 * Returns an effect with the behavior of this one, but where all child fibers
 * forked in the effect are reported to the specified supervisor.
 *
 * @since 1.0.0
 * @category mutations
 */
export const supervised: {
  <X>(supervisor: Supervisor.Supervisor<X>): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A, X>(self: Effect<R, E, A>, supervisor: Supervisor.Supervisor<X>): Effect<R, E, A>
} = circular.supervised

/**
 * Returns a lazily constructed effect, whose construction may itself require
 * effects. When no context is required (i.e., when `R == unknown`) it is
 * conceptually equivalent to `flatten(succeed(io))`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const suspend: <R, E, A>(evaluate: LazyArg<Effect<R, E, A>>) => Effect<R, unknown, A> = effect.suspend

/**
 * @since 1.0.0
 * @category constructors
 */
export const suspendSucceed: <R, E, A>(effect: LazyArg<Effect<R, E, A>>) => Effect<R, E, A> = core.suspendSucceed

/**
 * @since 1.0.0
 * @category constructors
 */
export const sync: <A>(evaluate: LazyArg<A>) => Effect<never, never, A> = core.sync

/**
 * Takes all elements so long as the effectual predicate returns true.
 *
 * @since 1.0.0
 * @category constructors
 */
export const takeWhile: {
  <R, E, A>(predicate: (a: A) => Effect<R, E, boolean>): (elements: Iterable<A>) => Effect<R, E, Chunk.Chunk<A>>
  <R, E, A>(elements: Iterable<A>, predicate: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>
} = effect.takeWhile

/**
 * Tags each metric in this effect with the specific tag.
 *
 * @since 1.0.0
 * @category mutations
 */
export const tagged: {
  (key: string, value: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, key: string, value: string): Effect<R, E, A>
} = effect.tagged

/**
 * Tags each metric in this effect with the specific tag.
 *
 * @since 1.0.0
 * @category mutations
 */
export const taggedWithLabels: {
  (labels: Iterable<MetricLabel.MetricLabel>): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, labels: Iterable<MetricLabel.MetricLabel>): Effect<R, E, A>
} = effect.taggedWithLabels

/**
 * Tags each metric in this effect with the specific tag.
 *
 * @since 1.0.0
 * @category mutations
 */
export const taggedWithLabelSet: {
  (labels: HashSet.HashSet<MetricLabel.MetricLabel>): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, labels: HashSet.HashSet<MetricLabel.MetricLabel>): Effect<R, E, A>
} = effect.taggedWithLabelSet

/**
 * Tags each metric in a scope with a the specific tag.
 *
 * @since 1.0.0
 * @category constructors
 */
export const taggedScoped: (key: string, value: string) => Effect<Scope.Scope, never, void> = fiberRuntime.taggedScoped

/**
 * Tags each metric in a scope with a the specific tag.
 *
 * @since 1.0.0
 * @category constructors
 */
export const taggedScopedWithLabels: (
  labels: ReadonlyArray<MetricLabel.MetricLabel>
) => Effect<Scope.Scope, never, void> = fiberRuntime.taggedScopedWithLabels

/**
 * Tags each metric in a scope with a the specific tag.
 *
 * @since 1.0.0
 * @category constructors
 */
export const taggedScopedWithLabelSet: (
  labels: HashSet.HashSet<MetricLabel.MetricLabel>
) => Effect<Scope.Scope, never, void> = fiberRuntime.taggedScopedWithLabelSet

/**
 * Retrieves the metric tags associated with the current scope.
 *
 * @since 1.0.0
 * @category getters
 */
export const tags: (_: void) => Effect<never, never, HashSet.HashSet<MetricLabel.MetricLabel>> = core.tags

/**
 * @since 1.0.0
 * @category sequencing
 */
export const tap: {
  <A, R2, E2, _>(f: (a: A) => Effect<R2, E2, _>): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A>
  <R, E, A, R2, E2, _>(self: Effect<R, E, A>, f: (a: A) => Effect<R2, E2, _>): Effect<R | R2, E | E2, A>
} = core.tap

/**
 * Returns an effect that effectfully "peeks" at the failure or success of
 * this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapBoth: {
  <E, A, R2, E2, X, R3, E3, X1>(
    f: (e: E) => Effect<R2, E2, X>,
    g: (a: A) => Effect<R3, E3, X1>
  ): <R>(self: Effect<R, E, A>) => Effect<R2 | R3 | R, E | E2 | E3, A>
  <R, E, A, R2, E2, X, R3, E3, X1>(
    self: Effect<R, E, A>,
    f: (e: E) => Effect<R2, E2, X>,
    g: (a: A) => Effect<R3, E3, X1>
  ): Effect<R | R2 | R3, E | E2 | E3, A>
} = effect.tapBoth

/**
 * Returns an effect that effectually "peeks" at the defect of this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapDefect: {
  <R2, E2, X>(
    f: (cause: Cause.Cause<never>) => Effect<R2, E2, X>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A>
  <R, E, A, R2, E2, X>(
    self: Effect<R, E, A>,
    f: (cause: Cause.Cause<never>) => Effect<R2, E2, X>
  ): Effect<R | R2, E | E2, A>
} = effect.tapDefect

/**
 * Returns an effect that effectfully "peeks" at the result of this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapEither: {
  <E, A, R2, E2, X>(
    f: (either: Either.Either<E, A>) => Effect<R2, E2, X>
  ): <R>(self: Effect<R, E, A>) => Effect<R2 | R, E | E2, A>
  <R, E, A, R2, E2, X>(
    self: Effect<R, E, A>,
    f: (either: Either.Either<E, A>) => Effect<R2, E2, X>
  ): Effect<R | R2, E | E2, A>
} = effect.tapEither

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapError: {
  <E, R2, E2, X>(f: (e: E) => Effect<R2, E2, X>): <R, A>(self: Effect<R, E, A>) => Effect<R2 | R, E | E2, A>
  <R, E, A, R2, E2, X>(self: Effect<R, E, A>, f: (e: E) => Effect<R2, E2, X>): Effect<R | R2, E | E2, A>
} = effect.tapError

/**
 * Returns an effect that effectually "peeks" at the cause of the failure of
 * this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapErrorCause: {
  <E, R2, E2, X>(
    f: (cause: Cause.Cause<E>) => Effect<R2, E2, X>
  ): <R, A>(self: Effect<R, E, A>) => Effect<R2 | R, E | E2, A>
  <R, E, A, R2, E2, X>(
    self: Effect<R, E, A>,
    f: (cause: Cause.Cause<E>) => Effect<R2, E2, X>
  ): Effect<R | R2, E | E2, A>
} = effect.tapErrorCause

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 * If the partial function isn't defined at the input, the result is
 * equivalent to the original effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapSome: {
  <A, R1, E1, X>(
    pf: (a: A) => Option.Option<Effect<R1, E1, X>>
  ): <R, E>(
    self: Effect<R, E, A>
  ) => Effect<R1 | R, E1 | E, A>
  <R, E, A, R1, E1, X>(
    self: Effect<R, E, A>,
    pf: (a: A) => Option.Option<Effect<R1, E1, X>>
  ): Effect<R | R1, E | E1, A>
} = effect.tapSome

/**
 * Returns a new effect that executes this one and times the execution.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timed: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, readonly [Duration.Duration, A]> = effect.timed

/**
 * A more powerful variation of `timed` that allows specifying the clock.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timedWith: {
  <R1, E1>(
    milliseconds: Effect<R1, E1, number>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R1 | R, E1 | E, readonly [Duration.Duration, A]>
  <R, E, A, R1, E1>(
    self: Effect<R, E, A>,
    milliseconds: Effect<R1, E1, number>
  ): Effect<R | R1, E | E1, readonly [Duration.Duration, A]>
} = effect.timedWith

/**
 * Returns an effect that will timeout this effect, returning `None` if the
 * timeout elapses before the effect has produced a value; and returning
 * `Some` of the produced value otherwise.
 *
 * If the timeout elapses without producing a value, the running effect will
 * be safely interrupted.
 *
 * WARNING: The effect returned by this method will not itself return until
 * the underlying effect is actually interrupted. This leads to more
 * predictable resource utilization. If early return is desired, then instead
 * of using `effect.timeout(d)`, use `effect.disconnect.timeout(d)`, which
 * first disconnects the effect's interruption signal before performing the
 * timeout, resulting in earliest possible return, before an underlying effect
 * has been successfully interrupted.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timeout: {
  (duration: Duration.Duration): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, Option.Option<A>>
  <R, E, A>(self: Effect<R, E, A>, duration: Duration.Duration): Effect<R, E, Option.Option<A>>
} = circular.timeout

/**
 * The same as `timeout`, but instead of producing a `None` in the event of
 * timeout, it will produce the specified error.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timeoutFail: {
  <E1>(evaluate: LazyArg<E1>, duration: Duration.Duration): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E1 | E, A>
  <R, E, A, E1>(self: Effect<R, E, A>, evaluate: LazyArg<E1>, duration: Duration.Duration): Effect<R, E | E1, A>
} = circular.timeoutFail

/**
 * The same as `timeout`, but instead of producing a `None` in the event of
 * timeout, it will produce the specified failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timeoutFailCause: {
  <E1>(
    evaluate: LazyArg<Cause.Cause<E1>>,
    duration: Duration.Duration
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E1 | E, A>
  <R, E, A, E1>(
    self: Effect<R, E, A>,
    evaluate: LazyArg<Cause.Cause<E1>>,
    duration: Duration.Duration
  ): Effect<R, E | E1, A>
} = circular.timeoutFailCause

/**
 * Returns an effect that will timeout this effect, returning either the
 * default value if the timeout elapses before the effect has produced a
 * value or returning the result of applying the function `f` to the
 * success value of the effect.
 *
 * If the timeout elapses without producing a value, the running effect will
 * be safely interrupted.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timeoutTo: {
  <A, B, B1>(
    def: B1,
    f: (a: A) => B,
    duration: Duration.Duration
  ): <R, E>(
    self: Effect<R, E, A>
  ) => Effect<R, E, B | B1>
  <R, E, A, B, B1>(
    self: Effect<R, E, A>,
    def: B1,
    f: (a: A) => B,
    duration: Duration.Duration
  ): Effect<R, E, B | B1>
} = circular.timeoutTo

/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayer: {
  <A>(tag: Context.Tag<A>): <R, E>(self: Effect<R, E, A>) => Layer.Layer<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, tag: Context.Tag<A>): Layer.Layer<R, E, A>
} = layer.toLayer

/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayerContext: <R, E, A>(effect: Effect<R, E, Context.Context<A>>) => Layer.Layer<R, E, A> =
  layer.fromEffectContext

/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayerDiscard: <R, E, _>(effect: Effect<R, E, _>) => Layer.Layer<R, E, never> = layer.fromEffectDiscard

/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayerScopedDiscard: <R, E, _>(
  effect: Effect<R, E, _>
) => Layer.Layer<Exclude<R, Scope.Scope>, E, never> = layer.scopedDiscard

/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayerScoped: {
  <A>(tag: Context.Tag<A>): <R, E>(self: Effect<R, E, A>) => Layer.Layer<Exclude<R, Scope.Scope>, E, A>
  <R, E, A>(self: Effect<R, E, A>, tag: Context.Tag<A>): Layer.Layer<Exclude<R, Scope.Scope>, E, A>
} = layer.toLayerScoped

/**
 * Transplants specified effects so that when those effects fork other
 * effects, the forked effects will be governed by the scope of the fiber that
 * executes this effect.
 *
 * This can be used to "graft" deep grandchildren onto a higher-level scope,
 * effectively extending their lifespans into the parent scope.
 *
 * @since 1.0.0
 * @category mutations
 */
export const transplant: <R, E, A>(
  f: (grafter: <R2, E2, A2>(effect: Effect<R2, E2, A2>) => Effect<R2, E2, A2>) => Effect<R, E, A>
) => Effect<R, E, A> = core.transplant

/**
 * Imports a synchronous side-effect into a pure value, translating any
 * thrown exceptions into typed failed effects.
 *
 * @since 1.0.0
 * @category constructors
 */
export const tryCatch: <E, A>(attempt: LazyArg<A>, onThrow: (u: unknown) => E) => Effect<never, E, A> = effect.tryCatch

/**
 * Create an `Effect` that when executed will construct `promise` and wait for
 * its result, errors will be handled using `onReject`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const tryCatchPromise: <E, A>(
  evaluate: LazyArg<Promise<A>>,
  onReject: (reason: unknown) => E
) => Effect<never, E, A> = effect.tryCatchPromise

/**
 * Like `tryCatchPromise` but allows for interruption via AbortSignal
 *
 * @since 1.0.0
 * @category constructors
 */
export const tryCatchPromiseInterrupt: <E, A>(
  evaluate: (signal: AbortSignal) => Promise<A>,
  onReject: (reason: unknown) => E
) => Effect<never, E, A> = effect.tryCatchPromiseInterrupt

/**
 * Executed `that` in case `self` fails with a `Cause` that doesn't contain
 * defects, executes `success` in case of successes
 *
 * @since 1.0.0
 * @category alternatives
 */
export const tryOrElse: {
  <R2, E2, A2, A, R3, E3, A3>(
    that: LazyArg<Effect<R2, E2, A2>>,
    onSuccess: (a: A) => Effect<R3, E3, A3>
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R3 | R, E2 | E3, A2 | A3>
  <R, E, A, R2, E2, A2, R3, E3, A3>(
    self: Effect<R, E, A>,
    that: LazyArg<Effect<R2, E2, A2>>,
    onSuccess: (a: A) => Effect<R3, E3, A3>
  ): Effect<R | R2 | R3, E2 | E3, A2 | A3>
} = core.tryOrElse

/**
 * Create an `Effect` that when executed will construct `promise` and wait for
 * its result, errors will produce failure as `unknown`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const tryPromise: <A>(evaluate: LazyArg<Promise<A>>) => Effect<never, unknown, A> = effect.tryPromise

/**
 * Like `tryPromise` but allows for interruption via AbortSignal
 *
 * @since 1.0.0
 * @category constructors
 */
export const tryPromiseInterrupt: <A>(evaluate: (signal: AbortSignal) => Promise<A>) => Effect<never, unknown, A> =
  effect.tryPromiseInterrupt

/**
 * Runs all the provided effects in sequence respecting the structure provided in input.
 *
 * Supports multiple arguments, a single argument tuple / array or record / struct.
 *
 * @since 1.0.0
 * @category constructors
 */
export const all: {
  <R, E, A, T extends ReadonlyArray<Effect<any, any, any>>>(
    self: Effect<R, E, A>,
    ...args: T
  ): Effect<
    R | T["length"] extends 0 ? never
      : [T[number]] extends [{ [EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    E | T["length"] extends 0 ? never
      : [T[number]] extends [{ [EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    readonly [
      A,
      ...(T["length"] extends 0 ? []
        : Readonly<{ [K in keyof T]: [T[K]] extends [Effect<any, any, infer A>] ? A : never }>)
    ]
  >
  <T extends ReadonlyArray<Effect<any, any, any>>>(
    args: [...T]
  ): Effect<
    T[number] extends never ? never
      : [T[number]] extends [{ [EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    T[number] extends never ? never
      : [T[number]] extends [{ [EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    T[number] extends never ? []
      : Readonly<{ [K in keyof T]: [T[K]] extends [Effect<any, any, infer A>] ? A : never }>
  >
  <T extends Readonly<{ [K: string]: Effect<any, any, any> }>>(
    args: T
  ): Effect<
    keyof T extends never ? never
      : [T[keyof T]] extends [{ [EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    keyof T extends never ? never
      : [T[keyof T]] extends [{ [EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    Readonly<{ [K in keyof T]: [T[K]] extends [Effect<any, any, infer A>] ? A : never }>
  >
} = effect.all

/**
 * Runs all the provided effects in parallel respecting the structure provided in input.
 *
 * Supports multiple arguments, a single argument tuple / array or record / struct.
 *
 * @since 1.0.0
 * @category constructors
 */
export const allPar: {
  <R, E, A, T extends ReadonlyArray<Effect<any, any, any>>>(
    self: Effect<R, E, A>,
    ...args: T
  ): Effect<
    R | T["length"] extends 0 ? never
      : [T[number]] extends [{ [EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    E | T["length"] extends 0 ? never
      : [T[number]] extends [{ [EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    readonly [
      A,
      ...(T["length"] extends 0 ? []
        : Readonly<{ [K in keyof T]: [T[K]] extends [Effect<any, any, infer A>] ? A : never }>)
    ]
  >
  <T extends ReadonlyArray<Effect<any, any, any>>>(
    args: [...T]
  ): Effect<
    T[number] extends never ? never
      : [T[number]] extends [{ [EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    T[number] extends never ? never
      : [T[number]] extends [{ [EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    T[number] extends never ? []
      : Readonly<{ [K in keyof T]: [T[K]] extends [Effect<any, any, infer A>] ? A : never }>
  >
  <T extends Readonly<{ [K: string]: Effect<any, any, any> }>>(
    args: T
  ): Effect<
    keyof T extends never ? never
      : [T[keyof T]] extends [{ [EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    keyof T extends never ? never
      : [T[keyof T]] extends [{ [EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    Readonly<{ [K in keyof T]: [T[K]] extends [Effect<any, any, infer A>] ? A : never }>
  >
} = fiberRuntime.allPar

/**
 * Used to unify functions that would otherwise return `Effect<A, B, C> | Effect<D, E, F>`
 *
 * @category utilities
 * @since 1.0.0
 */
export const unified: <Args extends ReadonlyArray<any>, Ret extends Effect<any, any, any>>(
  f: (...args: Args) => Ret
) => (...args: Args) => Effect.Unify<Ret> = core.unified

/**
 * When this effect succeeds with a cause, then this method returns a new
 * effect that either fails with the cause that this effect succeeded with, or
 * succeeds with unit, depending on whether the cause is empty.
 *
 * This operation is the opposite of `cause`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const uncause: <R, E>(self: Effect<R, never, Cause.Cause<E>>) => Effect<R, E, void> = effect.uncause

/**
 * Constructs a `Chunk` by repeatedly applying the effectual function `f` as
 * long as it returns `Some`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const unfold: <A, R, E, S>(
  s: S,
  f: (s: S) => Effect<R, E, Option.Option<readonly [A, S]>>
) => Effect<R, E, Chunk.Chunk<A>> = effect.unfold

/**
 * @since 1.0.0
 * @category interruption
 */
export const uninterruptible: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A> = core.uninterruptible

/**
 * @since 1.0.0
 * @category interruption
 */
export const uninterruptibleMask: <R, E, A>(
  f: (restore: <RX, EX, AX>(effect: Effect<RX, EX, AX>) => Effect<RX, EX, AX>) => Effect<R, E, A>
) => Effect<R, E, A> = core.uninterruptibleMask

/**
 * @since 1.0.0
 * @category constructors
 */
export const unit: (_: void) => Effect<never, never, void> = core.unit

/**
 * Converts a `Effect<R, Either<E, B>, A>` into a `Effect<R, E, Either<A, B>>`.
 * The inverse of `left`.
 *
 * @since 1.0.0
 * @category getters
 */
export const unleft: <R, E, B, A>(self: Effect<R, Either.Either<E, B>, A>) => Effect<R, E, Either.Either<A, B>> =
  effect.unleft

/**
 * The moral equivalent of `if (!p) exp`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unless: {
  (predicate: LazyArg<boolean>): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, Option.Option<A>>
  <R, E, A>(self: Effect<R, E, A>, predicate: LazyArg<boolean>): Effect<R, E, Option.Option<A>>
} = effect.unless

/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unlessEffect: {
  <R2, E2>(
    predicate: Effect<R2, E2, boolean>
  ): <R, E, A>(
    self: Effect<R, E, A>
  ) => Effect<R2 | R, E2 | E, Option.Option<A>>
  <R, E, A, R2, E2>(
    self: Effect<R, E, A>,
    predicate: Effect<R2, E2, boolean>
  ): Effect<R | R2, E | E2, Option.Option<A>>
} = effect.unlessEffect

/**
 * Takes some fiber failures and converts them into errors.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unrefine: {
  <E1>(pf: (u: unknown) => Option.Option<E1>): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E1 | E, A>
  <R, E, A, E1>(self: Effect<R, E, A>, pf: (u: unknown) => Option.Option<E1>): Effect<R, E | E1, A>
} = effect.unrefine

/**
 * Takes some fiber failures and converts them into errors, using the specified
 * function to convert the `E` into an `E1 | E2`.
 *
 * @since 1.0.0
 * @category error handling
 */
export const unrefineWith: {
  <E, E1, E2>(
    pf: (u: unknown) => Option.Option<E1>,
    f: (e: E) => E2
  ): <R, A>(self: Effect<R, E, A>) => Effect<R, E1 | E2, A>
  <R, E, A, E1, E2>(
    self: Effect<R, E, A>,
    pf: (u: unknown) => Option.Option<E1>,
    f: (e: E) => E2
  ): Effect<R, E1 | E2, A>
} = effect.unrefineWith

/**
 * Converts a `Effect<R, Either<B, E>, A>` into a `Effect<R, E, Either<B, A>>`.
 * The inverse of `right`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unright: <R, B, E, A>(self: Effect<R, Either.Either<B, E>, A>) => Effect<R, E, Either.Either<B, A>> =
  effect.unright

/**
 * @category locking
 * @since 1.0.0
 */
export interface Permit {
  readonly index: number
}

/**
 * @category locking
 * @since 1.0.0
 */
export interface Semaphore {
  readonly withPermits: (permits: number) => <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  readonly take: (permits: number) => Effect<never, never, number>
  readonly release: (permits: number) => Effect<never, never, void>
}

/**
 * Unsafely creates a new Semaphore
 *
 * @since 1.0.0
 * @category locking
 */
export const unsafeMakeSemaphore: (permits: number) => Semaphore = circular.unsafeMakeSemaphore

/**
 * Creates a new Semaphore
 *
 * @since 1.0.0
 * @category locking
 */
export const makeSemaphore: (permits: number) => Effect<never, never, Semaphore> = circular.makeSemaphore

/**
 * @since 1.0.0
 * @category execution
 */
export const runFork: <E, A>(effect: Effect<never, E, A>) => Fiber.RuntimeFiber<E, A> = _runtime.unsafeForkEffect

/**
 * @since 1.0.0
 * @category execution
 */
export const runCallback: <E, A>(
  effect: Effect<never, E, A>,
  onExit?: (exit: Exit.Exit<E, A>) => void
) => Runtime.Cancel<E, A> = _runtime.unsafeRunEffect

/**
 * @since 1.0.0
 * @category execution
 */
export const runPromiseEither: <E, A>(effect: Effect<never, E, A>) => Promise<Either.Either<E, A>> =
  _runtime.unsafeRunPromiseEitherEffect

/**
 * Runs an `Effect` workflow, returning a `Promise` which resolves with the
 * result of the workflow or rejects with an error.
 *
 * @since 1.0.0
 * @category execution
 */
export const runPromise: <E, A>(effect: Effect<never, E, A>) => Promise<A> = _runtime.unsafeRunPromiseEffect

/**
 * Runs an `Effect` workflow, returning a `Promise` which resolves with the
 * `Exit` value of the workflow.
 *
 * @since 1.0.0
 * @category execution
 */
export const runPromiseExit: <E, A>(effect: Effect<never, E, A>) => Promise<Exit.Exit<E, A>> =
  _runtime.unsafeRunPromiseExitEffect

/**
 * @since 1.0.0
 * @category execution
 */
export const runSync: <E, A>(effect: Effect<never, E, A>) => A = _runtime.unsafeRunSyncEffect

/**
 * @since 1.0.0
 * @category execution
 */
export const runSyncExit: <E, A>(effect: Effect<never, E, A>) => Exit.Exit<E, A> = _runtime.unsafeRunSyncExitEffect

/**
 * @since 1.0.0
 * @category execution
 */
export const runSyncExitOrFiber: <E, A>(
  effect: Effect<never, E, A>
) => Either.Either<Fiber.Fiber<E, A>, Exit.Exit<E, A>> = _runtime.unsafeRunSyncExitOrFiberEffect

/**
 * @since 1.0.0
 * @category execution
 */
export const runSyncEither: <E, A>(effect: Effect<never, E, A>) => Either.Either<E, A> =
  _runtime.unsafeRunSyncEitherEffect

/**
 * The inverse operation `sandbox(effect)`
 *
 * Terminates with exceptions on the `Left` side of the `Either` error, if it
 * exists. Otherwise extracts the contained `Effect< R, E, A>`
 *
 * @since 1.0.0
 * @category mutations
 */
export const unsandbox: <R, E, A>(self: Effect<R, Cause.Cause<E>, A>) => Effect<R, E, A> = effect.unsandbox

/**
 * Scopes all resources acquired by `resource` to the lifetime of `use`
 * without effecting the scope of any resources acquired by `use`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const using: {
  <A, R2, E2, A2>(
    use: (a: A) => Effect<R2, E2, A2>
  ): <R, E>(self: Effect<Scope.Scope | R, E, A>) => Effect<R2 | R, E2 | E, A2>
  <R, E, A, R2, E2, A2>(
    self: Effect<Scope.Scope | R, E, A>,
    use: (a: A) => Effect<R2, E2, A2>
  ): Effect<R | R2, E | E2, A2>
} = fiberRuntime.using

/**
 * Converts an option on errors into an option on values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unsome: <R, E, A>(self: Effect<R, Option.Option<E>, A>) => Effect<R, E, Option.Option<A>> =
  fiberRuntime.unsome

/**
 * Updates the `FiberRef` values for the fiber running this effect using the
 * specified function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const updateFiberRefs: (
  f: (fiberId: FiberId.Runtime, fiberRefs: FiberRefs.FiberRefs) => FiberRefs.FiberRefs
) => Effect<never, never, void> = effect.updateFiberRefs

/**
 * @since 1.0.0
 * @category runtime
 */
export const updateRuntimeFlags: (patch: RuntimeFlagsPatch.RuntimeFlagsPatch) => Effect<never, never, void> =
  core.updateRuntimeFlags

/**
 * Updates the service with the required service entry.
 *
 * @since 1.0.0
 * @category context
 */
export const updateService: {
  <T extends Context.Tag<any>>(
    tag: T,
    f: (service: Context.Tag.Service<T>) => Context.Tag.Service<T>
  ): <R, E, A>(self: Effect<R, E, A>) => Effect<Context.Tag.Service<T> | R, E, A>
  <R, E, A, T extends Context.Tag<any>>(
    self: Effect<R, E, A>,
    tag: T,
    f: (service: Context.Tag.Service<T>) => Context.Tag.Service<T>
  ): Effect<R | Context.Tag.Service<T>, E, A>
} = effect.updateService

/**
 * Sequentially zips the this result with the specified result. Combines both
 * `Cause`s when both effects fail.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validate: {
  <R2, E2, B>(that: Effect<R2, E2, B>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, readonly [A, B]>
  <R, E, A, R2, E2, B>(self: Effect<R, E, A>, that: Effect<R2, E2, B>): Effect<R | R2, E | E2, readonly [A, B]>
} = effect.validate

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel. Combines both Cause<E1>` when both effects fail.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validatePar: {
  <R1, E1, B>(that: Effect<R1, E1, B>): <R, E, A>(self: Effect<R, E, A>) => Effect<R1 | R, E1 | E, readonly [A, B]>
  <R, E, A, R1, E1, B>(self: Effect<R, E, A>, that: Effect<R1, E1, B>): Effect<R | R1, E | E1, readonly [A, B]>
} = circular.validatePar

/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost. To retain all information please use `partition`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateAll: {
  <R, E, A, B>(f: (a: A) => Effect<R, E, B>): (elements: Iterable<A>) => Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>
  <R, E, A, B>(elements: Iterable<A>, f: (a: A) => Effect<R, E, B>): Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>
} = effect.validateAll

/**
 * Feeds elements of type `A` to `f `and accumulates, in parallel, all errors
 * in error channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost. To retain all information please use [[partitionPar]].
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateAllPar: {
  <R, E, A, B>(f: (a: A) => Effect<R, E, B>): (elements: Iterable<A>) => Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>
  <R, E, A, B>(elements: Iterable<A>, f: (a: A) => Effect<R, E, B>): Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>
} = fiberRuntime.validateAllPar

/**
 * Feeds elements of type `A` to `f` and accumulates all errors, discarding
 * the successes.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateAllDiscard: {
  <R, E, A, X>(f: (a: A) => Effect<R, E, X>): (elements: Iterable<A>) => Effect<R, Chunk.Chunk<E>, void>
  <R, E, A, X>(elements: Iterable<A>, f: (a: A) => Effect<R, E, X>): Effect<R, Chunk.Chunk<E>, void>
} = effect.validateAllDiscard

/**
 * Feeds elements of type `A` to `f` in parallel and accumulates all errors,
 * discarding the successes.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateAllParDiscard: {
  <R, E, A, B>(f: (a: A) => Effect<R, E, B>): (elements: Iterable<A>) => Effect<R, Chunk.Chunk<E>, void>
  <R, E, A, B>(elements: Iterable<A>, f: (a: A) => Effect<R, E, B>): Effect<R, Chunk.Chunk<E>, void>
} = fiberRuntime.validateAllParDiscard

/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateFirst: {
  <R, E, A, B>(f: (a: A) => Effect<R, E, B>): (elements: Iterable<A>) => Effect<R, Chunk.Chunk<E>, B>
  <R, E, A, B>(elements: Iterable<A>, f: (a: A) => Effect<R, E, B>): Effect<R, Chunk.Chunk<E>, B>
} = effect.validateFirst

/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateFirstPar: {
  <R, E, A, B>(f: (a: A) => Effect<R, E, B>): (elements: Iterable<A>) => Effect<R, Chunk.Chunk<E>, B>
  <R, E, A, B>(elements: Iterable<A>, f: (a: A) => Effect<R, E, B>): Effect<R, Chunk.Chunk<E>, B>
} = fiberRuntime.validateFirstPar

/**
 * Sequentially zips this effect with the specified effect using the specified
 * combiner function. Combines the causes in case both effect fail.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateWith: {
  <A, R2, E2, B, C>(
    that: Effect<R2, E2, B>,
    f: (a: A, b: B) => C
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, C>
  <R, E, A, R2, E2, B, C>(
    self: Effect<R, E, A>,
    that: Effect<R2, E2, B>,
    f: (a: A, b: B) => C
  ): Effect<R | R2, E | E2, C>
} = effect.validateWith

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, combining their results with the specified `f` function. If
 * both sides fail, then the cause will be combined.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateWithPar: {
  <A, R1, E1, B, C>(
    that: Effect<R1, E1, B>,
    f: (a: A, b: B) => C
  ): <R, E>(self: Effect<R, E, A>) => Effect<R1 | R, E1 | E, C>
  <R, E, A, R1, E1, B, C>(
    self: Effect<R, E, A>,
    that: Effect<R1, E1, B>,
    f: (a: A, b: B) => C
  ): Effect<R | R1, E | E1, C>
} = circular.validateWithPar

/**
 * @since 1.0.0
 * @category constructors
 */
export const whileLoop: <R, E, A>(
  check: LazyArg<boolean>,
  body: LazyArg<Effect<R, E, A>>,
  process: (a: A) => void
) => Effect<R, E, void> = core.whileLoop

/**
 * The moral equivalent of `if (p) exp`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const when: {
  (predicate: LazyArg<boolean>): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, Option.Option<A>>
  <R, E, A>(self: Effect<R, E, A>, predicate: LazyArg<boolean>): Effect<R, E, Option.Option<A>>
} = effect.when

/**
 * Runs an effect when the supplied partial function matches for the given
 * value, otherwise does nothing.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whenCase: <R, E, A, B>(
  evaluate: LazyArg<A>,
  pf: (a: A) => Option.Option<Effect<R, E, B>>
) => Effect<R, E, Option.Option<B>> = effect.whenCase

/**
 * Runs an effect when the supplied partial function matches for the given
 * value, otherwise does nothing.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whenCaseEffect: {
  <A, R2, E2, A2>(
    pf: (a: A) => Option.Option<Effect<R2, E2, A2>>
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, Option.Option<A2>>
  <R, E, A, R2, E2, A2>(
    self: Effect<R, E, A>,
    pf: (a: A) => Option.Option<Effect<R2, E2, A2>>
  ): Effect<R | R2, E | E2, Option.Option<A2>>
} = effect.whenCaseEffect

/**
 * @since 1.0.0
 * @category constructors
 */
export const whenEffect: {
  <R, E>(
    predicate: Effect<R, E, boolean>
  ): <R2, E2, A>(
    effect: Effect<R2, E2, A>
  ) => Effect<R | R2, E | E2, Option.Option<A>>
  <R, E, A, R2, E2>(
    self: Effect<R2, E2, A>,
    predicate: Effect<R, E, boolean>
  ): Effect<R | R2, E | E2, Option.Option<A>>
} = core.whenEffect

/**
 * Executes this workflow when value of the specified `FiberRef` satisfies the
 * predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whenFiberRef: {
  <S>(
    fiberRef: FiberRef.FiberRef<S>,
    predicate: Predicate<S>
  ): <R, E, A>(
    self: Effect<R, E, A>
  ) => Effect<R, E, readonly [S, Option.Option<A>]>
  <R, E, A, S>(
    self: Effect<R, E, A>,
    fiberRef: FiberRef.FiberRef<S>,
    predicate: Predicate<S>
  ): Effect<R, E, readonly [S, Option.Option<A>]>
} = effect.whenFiberRef

/**
 * Executes this workflow when the value of the `Ref` satisfies the predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whenRef: {
  <S>(
    ref: Ref.Ref<S>,
    predicate: Predicate<S>
  ): <R, E, A>(
    self: Effect<R, E, A>
  ) => Effect<R, E, readonly [S, Option.Option<A>]>
  <R, E, A, S>(
    self: Effect<R, E, A>,
    ref: Ref.Ref<S>,
    predicate: Predicate<S>
  ): Effect<R, E, readonly [S, Option.Option<A>]>
} = effect.whenRef

/**
 * Executes the specified workflow with the specified implementation of the
 * clock service.
 *
 * @since 1.0.0
 * @category mutations
 */
export const withClock: {
  <A extends Clock.Clock>(value: A): <R, E, A>(effect: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A extends Clock.Clock>(effect: Effect<R, E, A>, value: A): Effect<R, E, A>
} = defaultServices.withClock

/**
 * Sets the implementation of the clock service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @since 1.0.0
 * @category constructors
 */
export const withClockScoped: <A extends Clock.Clock>(value: A) => Effect<Scope.Scope, never, void> =
  fiberRuntime.withClockScoped

/**
 * Executes the specified workflow with the specified configuration provider.
 *
 * @since 1.0.0
 * @category config
 */
export const withConfigProvider: {
  (value: ConfigProvider): <R, E, A>(effect: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(effect: Effect<R, E, A>, value: ConfigProvider): Effect<R, E, A>
} = defaultServices.withConfigProvider

/**
 * Sets the configuration provider to the specified value and restores it to its original value
 * when the scope is closed.
 *
 * @since 1.0.0
 * @category config
 */
export const withConfigProviderScoped: (value: ConfigProvider) => Effect<Scope.Scope, never, void> =
  fiberRuntime.withConfigProviderScoped

/**
 * Returns a new scoped workflow that returns the result of this workflow as
 * well as a finalizer that can be run to close the scope of this workflow.
 *
 * @since 1.0.0
 * @category mutations
 */
export const withEarlyRelease: <R, E, A>(
  self: Effect<R, E, A>
) => Effect<Scope.Scope | R, E, readonly [Effect<never, never, void>, A]> = fiberRuntime.withEarlyRelease

/**
 * @since 1.0.0
 * @category mutations
 */
export const withMetric: {
  <Type, In, Out>(metric: Metric.Metric<Type, In, Out>): <R, E, A extends In>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A extends In, Type, In, Out>(self: Effect<R, E, A>, metric: Metric.Metric<Type, In, Out>): Effect<R, E, A>
} = effect.withMetric

/**
 * @since 1.0.0
 * @category concurrency
 */
export const withParallelism: {
  (parallelism: number): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, parallelism: number): Effect<R, E, A>
} = core.withParallelism

/**
 * Runs the specified effect with an unbounded maximum number of fibers for
 * parallel operations.
 *
 * @since 1.0.0
 * @category aspects
 */
export const withParallelismUnbounded: <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A> =
  core.withParallelismUnbounded

/**
 * @since 1.0.0
 * @category runtime
 */
export const withRuntimeFlags: {
  (update: RuntimeFlagsPatch.RuntimeFlagsPatch): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, update: RuntimeFlagsPatch.RuntimeFlagsPatch): Effect<R, E, A>
} = core.withRuntimeFlags

/**
 * @since 1.0.0
 * @category runtime
 */
export const withRuntimeFlagsScoped: (update: RuntimeFlagsPatch.RuntimeFlagsPatch) => Effect<Scope.Scope, never, void> =
  fiberRuntime.withRuntimeFlagsScoped

/**
 * @since 1.0.0
 * @category constructors
 */
export const yieldNow: () => Effect<never, never, void> = core.yieldNow

/**
 * @since 1.0.0
 * @category products
 */
export const zip: {
  <R2, E2, A2>(that: Effect<R2, E2, A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, readonly [A, A2]>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>): Effect<R | R2, E | E2, readonly [A, A2]>
} = core.zip

/**
 * @since 1.0.0
 * @category products
 */
export const zipLeft: {
  <R2, E2, A2>(that: Effect<R2, E2, A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>): Effect<R | R2, E | E2, A>
} = core.zipLeft

/**
 * @since 1.0.0
 * @category products
 */
export const zipRight: {
  <R2, E2, A2>(that: Effect<R2, E2, A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A2>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>): Effect<R | R2, E | E2, A2>
} = core.zipRight

/**
 * @since 1.0.0
 * @category products
 */
export const zipWith: {
  <R2, E2, A2, A, B>(
    that: Effect<R2, E2, A2>,
    f: (a: A, b: A2) => B
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, B>
  <R, E, R2, E2, A2, A, B>(
    self: Effect<R, E, A>,
    that: Effect<R2, E2, A2>,
    f: (a: A, b: A2) => B
  ): Effect<R | R2, E | E2, B>
} = core.zipWith

/**
 * Zips this effect and that effect in parallel.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipPar: {
  <R2, E2, A2>(that: Effect<R2, E2, A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, readonly [A, A2]>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>): Effect<R | R2, E | E2, readonly [A, A2]>
} = circular.zipPar

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of that effect. If either side fails,
 * then the other side will be interrupted.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipParLeft: {
  <R2, E2, A2>(that: Effect<R2, E2, A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>): Effect<R | R2, E | E2, A>
} = circular.zipParLeft

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of the provided effect. If either side fails,
 * then the other side will be interrupted.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipParRight: {
  <R2, E2, A2>(that: Effect<R2, E2, A2>): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, A2>
  <R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: Effect<R2, E2, A2>): Effect<R | R2, E | E2, A2>
} = circular.zipParRight

/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipWithPar: {
  <R2, E2, A2, A, B>(
    that: Effect<R2, E2, A2>,
    f: (a: A, b: A2) => B
  ): <R, E>(self: Effect<R, E, A>) => Effect<R2 | R, E2 | E, B>
  <R, E, A, R2, E2, A2, B>(
    self: Effect<R, E, A>,
    that: Effect<R2, E2, A2>,
    f: (a: A, b: A2) => B
  ): Effect<R | R2, E | E2, B>
} = circular.zipWithPar
