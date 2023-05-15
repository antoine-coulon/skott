/**
 * @since 1.0.0
 */
import { pipe } from "@effect/data/Function"
import * as number from "@effect/data/Number"
import * as order from "@effect/data/typeclass/Order"
import * as debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import * as core from "@effect/io/internal_effect_untraced/core"

/**
 * A `LogLevel` represents the log level associated with an individual logging
 * operation. Log levels are used both to describe the granularity (or
 * importance) of individual log statements, as well as to enable tuning
 * verbosity of log output.
 *
 * @since 1.0.0
 * @category model
 * @property ordinal - The priority of the log message. Larger values indicate higher priority.
 * @property label - A label associated with the log level.
 * @property syslog -The syslog severity level of the log level.
 */
export type LogLevel = All | Fatal | Error | Warning | Info | Debug | Trace | None

/**
 * @since 1.0.0
 * @category model
 */
export interface All {
  readonly _tag: "All"
  readonly label: "ALL"
  readonly syslog: 0
  readonly ordinal: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface Fatal {
  readonly _tag: "Fatal"
  readonly label: "FATAL"
  readonly syslog: 2
  readonly ordinal: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface Error {
  readonly _tag: "Error"
  readonly label: "ERROR"
  readonly syslog: 3
  readonly ordinal: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface Warning {
  readonly _tag: "Warning"
  readonly label: "WARN"
  readonly syslog: 4
  readonly ordinal: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface Info {
  readonly _tag: "Info"
  readonly label: "INFO"
  readonly syslog: 6
  readonly ordinal: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface Debug {
  readonly _tag: "Debug"
  readonly label: "DEBUG"
  readonly syslog: 7
  readonly ordinal: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface Trace {
  readonly _tag: "Trace"
  readonly label: "TRACE"
  readonly syslog: 7
  readonly ordinal: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface None {
  readonly _tag: "None"
  readonly label: "OFF"
  readonly syslog: 7
  readonly ordinal: number
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const All: LogLevel = core.logLevelAll
/**
 * @since 1.0.0
 * @category constructors
 */
export const Fatal: LogLevel = core.logLevelFatal
/**
 * @since 1.0.0
 * @category constructors
 */
export const Error: LogLevel = core.logLevelError
/**
 * @since 1.0.0
 * @category constructors
 */
export const Warning: LogLevel = core.logLevelWarning
/**
 * @since 1.0.0
 * @category constructors
 */
export const Info: LogLevel = core.logLevelInfo
/**
 * @since 1.0.0
 * @category constructors
 */
export const Debug: LogLevel = core.logLevelDebug
/**
 * @since 1.0.0
 * @category constructors
 */
export const Trace: LogLevel = core.logLevelTrace
/**
 * @since 1.0.0
 * @category constructors
 */
export const None: LogLevel = core.logLevelNone

/**
 * Locally applies the specified `LogLevel` to an `Effect` workflow, reverting
 * to the previous `LogLevel` after the `Effect` workflow completes.
 *
 * @since 1.0.0
 * @category mutations
 */
export const locally: {
  (self: LogLevel): <R, E, B>(use: Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>
  <R, E, B>(use: Effect.Effect<R, E, B>, self: LogLevel): Effect.Effect<R, E, B>
} = debug.dualWithTrace<
  (self: LogLevel) => <R, E, B>(use: Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>,
  <R, E, B>(use: Effect.Effect<R, E, B>, self: LogLevel) => Effect.Effect<R, E, B>
>(2, (trace) => (use, self) => core.fiberRefLocally(use, core.currentLogLevel, self).traced(trace))

/**
 * @since 1.0.0
 * @category instances
 */
export const Order: order.Order<LogLevel> = pipe(
  number.Order,
  order.contramap((level: LogLevel) => level.ordinal)
)

/**
 * @since 1.0.0
 * @category ordering
 */
export const lessThan: {
  (that: LogLevel): (self: LogLevel) => boolean
  (self: LogLevel, that: LogLevel): boolean
} = order.lessThan(Order)

/**
 * @since 1.0.0
 * @category ordering
 */
export const lessThanEqual: {
  (that: LogLevel): (self: LogLevel) => boolean
  (self: LogLevel, that: LogLevel): boolean
} = order.lessThanOrEqualTo(Order)

/**
 * @since 1.0.0
 * @category ordering
 */
export const greaterThan: {
  (that: LogLevel): (self: LogLevel) => boolean
  (self: LogLevel, that: LogLevel): boolean
} = order.greaterThan(Order)

/**
 * @since 1.0.0
 * @category ordering
 */
export const greaterThanEqual: {
  (that: LogLevel): (self: LogLevel) => boolean
  (self: LogLevel, that: LogLevel): boolean
} = order.greaterThanOrEqualTo(Order)

/**
 * @since 1.0.0
 * @category conversions
 */
export const fromLiteral = (
  _: "All" | "Fatal" | "Error" | "Warning" | "Info" | "Debug" | "Trace" | "None"
): LogLevel => {
  switch (_) {
    case "All": {
      return All
    }
    case "Debug": {
      return Debug
    }
    case "Error": {
      return Error
    }
    case "Fatal": {
      return Fatal
    }
    case "Info": {
      return Info
    }
    case "Trace": {
      return Trace
    }
    case "None": {
      return None
    }
    case "Warning": {
      return Warning
    }
  }
}
