/**
 * @since 1.0.0
 */
import type * as Context from "@effect/data/Context"
import type * as Duration from "@effect/data/Duration"
import type * as Effect from "@effect/io/Effect"
import * as internal from "@effect/io/internal_effect_untraced/clock"
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices"

/**
 * @since 1.0.0
 * @category symbols
 */
export const ClockTypeId: unique symbol = internal.ClockTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type ClockTypeId = typeof ClockTypeId

/**
 * Represents a time-based cloock which provides functionality related to time
 * and scheduling.
 *
 * @since 1.0.0
 * @category models
 */
export interface Clock {
  readonly [ClockTypeId]: ClockTypeId
  /**
   * Unsafely returns the current time in milliseconds.
   */
  unsafeCurrentTimeMillis(): number
  /**
   * Returns the current time in milliseconds.
   */
  currentTimeMillis(): Effect.Effect<never, never, number>
  /**
   * Asynchronously sleeps for the specified duration.
   */
  sleep(duration: Duration.Duration): Effect.Effect<never, never, void>
}

/**
 * @since 1.0.0
 * @category models
 */
export type CancelToken = () => boolean

/**
 * @since 1.0.0
 * @category models
 */
export type Task = () => void

/**
 * @since 1.0.0
 * @category models
 */
export interface ClockScheduler {
  /**
   * Unsafely schedules the specified task for the specified duration.
   */
  readonly unsafeSchedule: (task: Task, duration: Duration.Duration) => CancelToken
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: (_: void) => Clock = internal.make

/**
 * @since 1.0.0
 * @category constructors
 */
export const sleep: (duration: Duration.Duration) => Effect.Effect<never, never, void> = defaultServices.sleep

/**
 * @since 1.0.0
 * @category constructors
 */
export const currentTimeMillis: (_: void) => Effect.Effect<never, never, number> = defaultServices.currentTimeMillis

/**
 * @since 1.0.0
 * @category constructors
 */
export const clockWith: <R, E, A>(f: (clock: Clock) => Effect.Effect<R, E, A>) => Effect.Effect<R, E, A> =
  defaultServices.clockWith

/**
 * @since 1.0.0
 * @category context
 */
export const Tag: Context.Tag<Clock> = internal.clockTag
