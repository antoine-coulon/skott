/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk"
import type * as Either from "@effect/data/Either"
import type * as HashSet from "@effect/data/HashSet"
import type * as Option from "@effect/data/Option"
import type * as order from "@effect/data/typeclass/Order"
import type * as Cause from "@effect/io/Cause"
import type * as Effect from "@effect/io/Effect"
import type * as Exit from "@effect/io/Exit"
import type * as FiberId from "@effect/io/Fiber/Id"
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags"
import type * as FiberStatus from "@effect/io/Fiber/Status"
import type * as FiberRefs from "@effect/io/FiberRefs"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as circular from "@effect/io/internal_effect_untraced/effect/circular"
import * as internal from "@effect/io/internal_effect_untraced/fiber"
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import type * as Scope from "@effect/io/Scope"

/**
 * @since 1.0.0
 * @category symbols
 */
export const FiberTypeId: unique symbol = internal.FiberTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type FiberTypeId = typeof FiberTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export const RuntimeFiberTypeId: unique symbol = internal.RuntimeFiberTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type RuntimeFiberTypeId = typeof RuntimeFiberTypeId

/**
 * A fiber is a lightweight thread of execution that never consumes more than a
 * whole thread (but may consume much less, depending on contention and
 * asynchronicity). Fibers are spawned by forking effects, which run
 * concurrently with the parent effect.
 *
 * Fibers can be joined, yielding their result to other fibers, or interrupted,
 * which terminates the fiber, safely releasing all resources.
 *
 * @since 1.0.0
 * @category models
 */
export interface Fiber<E, A> extends Fiber.Variance<E, A> {
  /**
   * The identity of the fiber.
   */
  id(): FiberId.FiberId

  /**
   * Awaits the fiber, which suspends the awaiting fiber until the result of the
   * fiber has been determined.
   */
  await(): Effect.Effect<never, never, Exit.Exit<E, A>>

  /**
   * Retrieves the immediate children of the fiber.
   */
  children(): Effect.Effect<never, never, Chunk.Chunk<Fiber.Runtime<any, any>>>

  /**
   * Inherits values from all `FiberRef` instances into current fiber. This
   * will resume immediately.
   */
  inheritAll(): Effect.Effect<never, never, void>

  /**
   * Tentatively observes the fiber, but returns immediately if it is not
   * already done.
   */
  poll(): Effect.Effect<never, never, Option.Option<Exit.Exit<E, A>>>

  /**
   * In the background, interrupts the fiber as if interrupted from the
   * specified fiber. If the fiber has already exited, the returned effect will
   * resume immediately. Otherwise, the effect will resume when the fiber exits.
   */
  interruptAsFork(fiberId: FiberId.FiberId): Effect.Effect<never, never, void>
}

/**
 * A runtime fiber that is executing an effect. Runtime fibers have an
 * identity and a trace.
 *
 * @since 1.0.0
 * @category models
 */
export interface RuntimeFiber<E, A> extends Fiber<E, A>, Fiber.RuntimeVariance<E, A> {
  /**
   * The identity of the fiber.
   */
  id(): FiberId.Runtime

  /**
   * The status of the fiber.
   */
  status(): Effect.Effect<never, never, FiberStatus.FiberStatus>

  /**
   * Returns the current `RuntimeFlags` the fiber is running with.
   */
  runtimeFlags(): Effect.Effect<never, never, RuntimeFlags.RuntimeFlags>

  /**
   * Adds an observer to the list of observers.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeAddObserver(observer: (exit: Exit.Exit<E, A>) => void): void

  /**
   * Removes the specified observer from the list of observers that will be
   * notified when the fiber exits.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeRemoveObserver(observer: (exit: Exit.Exit<E, A>) => void): void

  /**
   * Retrieves all fiber refs of the fiber.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  unsafeGetFiberRefs(): FiberRefs.FiberRefs

  /**
   * Unsafely observes the fiber, but returns immediately if it is not
   * already done.
   */
  unsafePoll(): Exit.Exit<E, A> | null
}

/**
 * @since 1.0.0
 */
export declare namespace Fiber {
  /**
   * @since 1.0.0
   * @category models
   */
  export type Runtime<E, A> = RuntimeFiber<E, A>

  /**
   * @since 1.0.0
   * @category models
   */
  export interface Variance<E, A> {
    readonly [FiberTypeId]: {
      readonly _E: (_: never) => E
      readonly _A: (_: never) => A
    }
  }

  export interface RuntimeVariance<E, A> {
    readonly [RuntimeFiberTypeId]: {
      readonly _E: (_: never) => E
      readonly _A: (_: never) => A
    }
  }

  /**
   * @since 1.0.0
   * @category models
   */
  export interface Dump {
    /**
     * The fiber's unique identifier.
     */
    readonly id: FiberId.Runtime
    /**
     * The status of the fiber.
     */
    readonly status: FiberStatus.FiberStatus
  }

  /**
   * A record containing information about a `Fiber`.
   *
   * @since 1.0.0
   * @category models
   */
  export interface Descriptor {
    /**
     * The fiber's unique identifier.
     */
    readonly id: FiberId.FiberId
    /**
     * The status of the fiber.
     */
    readonly status: FiberStatus.FiberStatus
    /**
     * The set of fibers attempting to interrupt the fiber or its ancestors.
     */
    readonly interruptors: HashSet.HashSet<FiberId.FiberId>
  }
}

/**
 * @since 1.0.0
 * @category instances
 */
export const Order: order.Order<RuntimeFiber<unknown, unknown>> = internal.Order

/**
 * Returns `true` if the specified value is a `Fiber`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isFiber: (u: unknown) => u is Fiber<unknown, unknown> = internal.isFiber

/**
 * Returns `true` if the specified `Fiber` is a `RuntimeFiber`, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isRuntimeFiber: <E, A>(self: Fiber<E, A>) => self is RuntimeFiber<E, A> = internal.isRuntimeFiber

/**
 * The identity of the fiber.
 *
 * @since 1.0.0
 * @category getters
 */
export const id: <E, A>(self: Fiber<E, A>) => FiberId.FiberId = internal.id

const _await: <E, A>(self: Fiber<E, A>) => Effect.Effect<never, never, Exit.Exit<E, A>> = internal._await
export {
  /**
   * Awaits the fiber, which suspends the awaiting fiber until the result of the
   * fiber has been determined.
   *
   * @since 1.0.0
   * @category getters
   */
  _await as await
}

/**
 * Awaits on all fibers to be completed, successfully or not.
 *
 * @since 1.0.0
 * @category destructors
 */
export const awaitAll: (fibers: Iterable<Fiber<any, any>>) => Effect.Effect<never, never, void> =
  fiberRuntime.fiberAwaitAll

/**
 * Retrieves the immediate children of the fiber.
 *
 * @since 1.0.0
 * @category getters
 */
export const children: <E, A>(self: Fiber<E, A>) => Effect.Effect<never, never, Chunk.Chunk<RuntimeFiber<any, any>>> =
  internal.children

/**
 * Collects all fibers into a single fiber producing an in-order list of the
 * results.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAll: <E, A>(fibers: Iterable<Fiber<E, A>>) => Fiber<E, Chunk.Chunk<A>> =
  fiberRuntime.fiberCollectAll

/**
 * A fiber that is done with the specified `Exit` value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const done: <E, A>(exit: Exit.Exit<E, A>) => Fiber<E, A> = internal.done

/**
 * @since 1.0.0
 * @category destructors
 */
export const dump: <E, A>(self: RuntimeFiber<E, A>) => Effect.Effect<never, never, Fiber.Dump> = internal.dump

/**
 * @since 1.0.0
 * @category destructors
 */
export const dumpAll: (
  fibers: Iterable<RuntimeFiber<unknown, unknown>>
) => Effect.Effect<never, never, Chunk.Chunk<Fiber.Dump>> = internal.dumpAll

/**
 * A fiber that has already failed with the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fail: <E>(error: E) => Fiber<E, never> = internal.fail

/**
 * Creates a `Fiber` that has already failed with the specified cause.
 *
 * @since 1.0.0
 * @category constructors
 */
export const failCause: <E>(cause: Cause.Cause<E>) => Fiber<E, never> = internal.failCause

/**
 * Lifts an `Effect` into a `Fiber`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromEffect: <E, A>(effect: Effect.Effect<never, E, A>) => Effect.Effect<never, never, Fiber<E, A>> =
  internal.fromEffect

/**
 * Gets the current fiber if one is running.
 *
 * @since 1.0.0
 * @category utilities
 */
export const getCurrentFiber: () => Option.Option<RuntimeFiber<any, any>> = internal.getCurrentFiber

/**
 * Inherits values from all `FiberRef` instances into current fiber. This
 * will resume immediately.
 *
 * @since 1.0.0
 * @category destructors
 */
export const inheritAll: <E, A>(self: Fiber<E, A>) => Effect.Effect<never, never, void> = internal.inheritAll

/**
 * Interrupts the fiber from whichever fiber is calling this method. If the
 * fiber has already exited, the returned effect will resume immediately.
 * Otherwise, the effect will resume when the fiber exits.
 *
 * @since 1.0.0
 * @category interruption
 */
export const interrupt: <E, A>(self: Fiber<E, A>) => Effect.Effect<never, never, Exit.Exit<E, A>> = core.interruptFiber

/**
 * Constructrs a `Fiber` that is already interrupted.
 *
 * @since 1.0.0
 * @category constructors
 */
export const interrupted: (fiberId: FiberId.FiberId) => Fiber<never, never> = internal.interrupted

/**
 * Interrupts the fiber as if interrupted from the specified fiber. If the
 * fiber has already exited, the returned effect will resume immediately.
 * Otherwise, the effect will resume when the fiber exits.
 *
 * @since 1.0.0
 * @category interruption
 */
export const interruptAs: {
  (fiberId: FiberId.FiberId): <E, A>(self: Fiber<E, A>) => Effect.Effect<never, never, Exit.Exit<E, A>>
  <E, A>(self: Fiber<E, A>, fiberId: FiberId.FiberId): Effect.Effect<never, never, Exit.Exit<E, A>>
} = core.interruptAsFiber

/**
 * Interrupts the fiber as if interrupted from the specified fiber. If the
 * fiber has already exited, the returned effect will resume immediately.
 * Otherwise, the effect will resume when the fiber exits.
 *
 * @since 1.0.0
 * @category interruption
 */
export const interruptAsFork: {
  (fiberId: FiberId.FiberId): <E, A>(self: Fiber<E, A>) => Effect.Effect<never, never, void>
  <E, A>(self: Fiber<E, A>, fiberId: FiberId.FiberId): Effect.Effect<never, never, void>
} = internal.interruptAsFork

/**
 * Interrupts all fibers, awaiting their interruption.
 *
 * @since 1.0.0
 * @category interruption
 */
export const interruptAll: (fibers: Iterable<Fiber<any, any>>) => Effect.Effect<never, never, void> =
  internal.interruptAll

/**
 * Interrupts all fibers as by the specified fiber, awaiting their
 * interruption.
 *
 * @since 1.0.0
 * @category interruption
 */
export const interruptAllAs: {
  (fiberId: FiberId.FiberId): (fibers: Iterable<Fiber<any, any>>) => Effect.Effect<never, never, void>
  (fibers: Iterable<Fiber<any, any>>, fiberId: FiberId.FiberId): Effect.Effect<never, never, void>
} = internal.interruptAllAs

/**
 * Interrupts the fiber from whichever fiber is calling this method. The
 * interruption will happen in a separate daemon fiber, and the returned
 * effect will always resume immediately without waiting.
 *
 * @since 1.0.0
 * @category interruption
 */
export const interruptFork: <E, A>(self: Fiber<E, A>) => Effect.Effect<never, never, void> =
  fiberRuntime.fiberInterruptFork

/**
 * Joins the fiber, which suspends the joining fiber until the result of the
 * fiber has been determined. Attempting to join a fiber that has erred will
 * result in a catchable error. Joining an interrupted fiber will result in an
 * "inner interruption" of this fiber, unlike interruption triggered by
 * another fiber, "inner interruption" can be caught and recovered.
 *
 * @since 1.0.0
 * @category destructors
 */
export const join: <E, A>(self: Fiber<E, A>) => Effect.Effect<never, E, A> = internal.join

/**
 * Joins all fibers, awaiting their _successful_ completion. Attempting to
 * join a fiber that has erred will result in a catchable error, _if_ that
 * error does not result from interruption.
 *
 * @since 1.0.0
 * @category destructors
 */
export const joinAll: <E, A>(fibers: Iterable<Fiber<E, A>>) => Effect.Effect<never, E, void> = fiberRuntime.fiberJoinAll

/**
 * Maps over the value the Fiber computes.
 *
 * @since 1.0.0
 * @category mapping
 */
export const map: {
  <A, B>(f: (a: A) => B): <E>(self: Fiber<E, A>) => Fiber<E, B>
  <E, A, B>(self: Fiber<E, A>, f: (a: A) => B): Fiber<E, B>
} = internal.map

/**
 * Effectually maps over the value the fiber computes.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapEffect: {
  <A, E2, A2>(f: (a: A) => Effect.Effect<never, E2, A2>): <E>(self: Fiber<E, A>) => Fiber<E2 | E, A2>
  <E, A, E2, A2>(self: Fiber<E, A>, f: (a: A) => Effect.Effect<never, E2, A2>): Fiber<E | E2, A2>
} = internal.mapEffect

/**
 * Passes the success of this fiber to the specified callback, and continues
 * with the fiber that it returns.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapFiber: {
  <E, E2, A, B>(f: (a: A) => Fiber<E2, B>): (self: Fiber<E, A>) => Effect.Effect<never, never, Fiber<E | E2, B>>
  <E, A, E2, B>(self: Fiber<E, A>, f: (a: A) => Fiber<E2, B>): Effect.Effect<never, never, Fiber<E | E2, B>>
} = internal.mapFiber

/**
 * Folds over the `Fiber` or `RuntimeFiber`.
 *
 * @since 1.0.0
 * @category folding
 */
export const match: {
  <E, A, Z>(
    onFiber: (fiber: Fiber<E, A>) => Z,
    onRuntimeFiber: (fiber: RuntimeFiber<E, A>) => Z
  ): (self: Fiber<E, A>) => Z
  <E, A, Z>(
    self: Fiber<E, A>,
    onFiber: (fiber: Fiber<E, A>) => Z,
    onRuntimeFiber: (fiber: RuntimeFiber<E, A>) => Z
  ): Z
} = internal.match

/**
 * A fiber that never fails or succeeds.
 *
 * @since 1.0.0
 * @category constructors
 */
export const never: (_: void) => Fiber<never, never> = internal.never

/**
 * Returns a fiber that prefers `this` fiber, but falls back to the `that` one
 * when `this` one fails. Interrupting the returned fiber will interrupt both
 * fibers, sequentially, from left to right.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElse: {
  <E2, A2>(that: Fiber<E2, A2>): <E, A>(self: Fiber<E, A>) => Fiber<E2 | E, A2 | A>
  <E, A, E2, A2>(self: Fiber<E, A>, that: Fiber<E2, A2>): Fiber<E | E2, A | A2>
} = internal.orElse

/**
 * Returns a fiber that prefers `this` fiber, but falls back to the `that` one
 * when `this` one fails. Interrupting the returned fiber will interrupt both
 * fibers, sequentially, from left to right.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElseEither: {
  <E2, A2>(that: Fiber<E2, A2>): <E, A>(self: Fiber<E, A>) => Fiber<E2 | E, Either.Either<A, A2>>
  <E, A, E2, A2>(self: Fiber<E, A>, that: Fiber<E2, A2>): Fiber<E | E2, Either.Either<A, A2>>
} = internal.orElseEither

/**
 * Tentatively observes the fiber, but returns immediately if it is not
 * already done.
 *
 * @since 1.0.0
 * @category getters
 */
export const poll: <E, A>(self: Fiber<E, A>) => Effect.Effect<never, never, Option.Option<Exit.Exit<E, A>>> =
  internal.poll

/**
 * Pretty-prints a `RuntimeFiber`.
 *
 * @since 1.0.0
 * @category destructors
 */
export const pretty: <E, A>(self: RuntimeFiber<E, A>) => Effect.Effect<never, never, string> = internal.pretty

/**
 * Returns a chunk containing all root fibers.
 *
 * @since 1.0.0
 * @category constructors
 */
export const roots: (_: void) => Effect.Effect<never, never, Chunk.Chunk<RuntimeFiber<any, any>>> = internal.roots

/**
 * Returns a chunk containing all root fibers.
 *
 * @since 1.0.0
 * @category constructors
 */
export const unsafeRoots: (_: void) => Chunk.Chunk<RuntimeFiber<any, any>> = internal.unsafeRoots

/**
 * Converts this fiber into a scoped effect. The fiber is interrupted when the
 * scope is closed.
 *
 * @since 1.0.0
 * @category destructors
 */
export const scoped: <E, A>(self: Fiber<E, A>) => Effect.Effect<Scope.Scope, never, Fiber<E, A>> =
  fiberRuntime.fiberScoped

/**
 * Returns the `FiberStatus` of a `RuntimeFiber`.
 *
 * @since 1.0.0
 * @category getters
 */
export const status: <E, A>(self: RuntimeFiber<E, A>) => Effect.Effect<never, never, FiberStatus.FiberStatus> =
  internal.status

/**
 * Returns a fiber that has already succeeded with the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeed: <A>(value: A) => Fiber<never, A> = internal.succeed

/**
 * A fiber that has already succeeded with unit.
 *
 * @since 1.0.0
 * @category constructors
 */
export const unit: (_: void) => Fiber<never, void> = internal.unit

/**
 * Zips this fiber and the specified fiber together, producing a tuple of
 * their output.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zip: {
  <E2, A2>(that: Fiber<E2, A2>): <E, A>(self: Fiber<E, A>) => Fiber<E2 | E, readonly [A, A2]>
  <E, A, E2, A2>(self: Fiber<E, A>, that: Fiber<E2, A2>): Fiber<E | E2, readonly [A, A2]>
} = circular.zipFiber

/**
 * Same as `zip` but discards the output of that `Fiber`.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipLeft: {
  <E2, A2>(that: Fiber<E2, A2>): <E, A>(self: Fiber<E, A>) => Fiber<E2 | E, A>
  <E, A, E2, A2>(self: Fiber<E, A>, that: Fiber<E2, A2>): Fiber<E | E2, A>
} = circular.zipLeftFiber

/**
 * Same as `zip` but discards the output of this `Fiber`.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipRight: {
  <E2, A2>(that: Fiber<E2, A2>): <E, A>(self: Fiber<E, A>) => Fiber<E2 | E, A2>
  <E, A, E2, A2>(self: Fiber<E, A>, that: Fiber<E2, A2>): Fiber<E | E2, A2>
} = circular.zipRightFiber

/**
 * Zips this fiber with the specified fiber, combining their results using the
 * specified combiner function. Both joins and interruptions are performed in
 * sequential order from left to right.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipWith: {
  <E2, A, B, C>(that: Fiber<E2, B>, f: (a: A, b: B) => C): <E>(self: Fiber<E, A>) => Fiber<E2 | E, C>
  <E, A, E2, B, C>(self: Fiber<E, A>, that: Fiber<E2, B>, f: (a: A, b: B) => C): Fiber<E | E2, C>
} = circular.zipWithFiber
