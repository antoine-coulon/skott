/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk"
import type { LazyArg } from "@effect/data/Function"
import type * as HashMap from "@effect/data/HashMap"
import type * as Option from "@effect/data/Option"
import type * as Cause from "@effect/io/Cause"
import type { Effect } from "@effect/io/Effect"
import type * as FiberId from "@effect/io/Fiber/Id"
import type * as FiberRefs from "@effect/io/FiberRefs"
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import * as circular from "@effect/io/internal_effect_untraced/layer/circular"
import * as internal from "@effect/io/internal_effect_untraced/logger"
import * as internalCircular from "@effect/io/internal_effect_untraced/logger-circular"
import type * as Layer from "@effect/io/Layer"
import type * as LogLevel from "@effect/io/Logger/Level"
import type * as LogSpan from "@effect/io/Logger/Span"

/**
 * @since 1.0.0
 * @category symbols
 */
export const LoggerTypeId: unique symbol = internal.LoggerTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type LoggerTypeId = typeof LoggerTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface Logger<Message, Output> extends Logger.Variance<Message, Output> {
  readonly log: (
    fiberId: FiberId.FiberId,
    logLevel: LogLevel.LogLevel,
    message: Message,
    cause: Cause.Cause<unknown>,
    context: FiberRefs.FiberRefs,
    spans: Chunk.Chunk<LogSpan.LogSpan>,
    annotations: HashMap.HashMap<string, string>
  ) => Output
}

/**
 * @since 1.0.0
 */
export declare namespace Logger {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Variance<Message, Output> {
    readonly [LoggerTypeId]: {
      readonly _Message: (_: Message) => void
      readonly _Output: (_: never) => Output
    }
  }
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make: <Message, Output>(
  log: (
    fiberId: FiberId.FiberId,
    logLevel: LogLevel.LogLevel,
    message: Message,
    cause: Cause.Cause<unknown>,
    context: FiberRefs.FiberRefs,
    spans: Chunk.Chunk<LogSpan.LogSpan>,
    annotations: HashMap.HashMap<string, string>
  ) => Output
) => Logger<Message, Output> = internal.makeLogger

/**
 * @since 1.0.0
 * @category context
 */
export const add: <B>(logger: Logger<string, B>) => Layer.Layer<never, never, never> = circular.addLogger

/**
 * @since 1.0.0
 * @category mapping
 */
export const contramap: {
  <Message, Message2>(
    f: (message: Message2) => Message
  ): <Output>(self: Logger<Message, Output>) => Logger<Message2, Output>
  <Output, Message, Message2>(
    self: Logger<Message, Output>,
    f: (message: Message2) => Message
  ): Logger<Message2, Output>
} = internal.contramap

/**
 * Returns a version of this logger that only logs messages when the log level
 * satisfies the specified predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterLogLevel: {
  (
    f: (logLevel: LogLevel.LogLevel) => boolean
  ): <Message, Output>(self: Logger<Message, Output>) => Logger<Message, Option.Option<Output>>
  <Message, Output>(
    self: Logger<Message, Output>,
    f: (logLevel: LogLevel.LogLevel) => boolean
  ): Logger<Message, Option.Option<Output>>
} = internal.filterLogLevel

/**
 * @since 1.0.0
 * @category mapping
 */
export const map: {
  <Output, Output2>(
    f: (output: Output) => Output2
  ): <Message>(self: Logger<Message, Output>) => Logger<Message, Output2>
  <Message, Output, Output2>(
    self: Logger<Message, Output>,
    f: (output: Output) => Output2
  ): Logger<Message, Output2>
} = internal.map

/**
 * A logger that does nothing in response to logging events.
 *
 * @since 1.0.0
 * @category constructors
 */
export const none: (_: void) => Logger<unknown, void> = internal.none

/**
 * @since 1.0.0
 * @category context
 */
export const remove: <A>(logger: Logger<string, A>) => Layer.Layer<never, never, never> = circular.removeLogger

/**
 * @since 1.0.0
 * @category context
 */
export const replace: {
  <B>(that: Logger<string, B>): <A>(self: Logger<string, A>) => Layer.Layer<never, never, never>
  <A, B>(self: Logger<string, A>, that: Logger<string, B>): Layer.Layer<never, never, never>
} = circular.replaceLogger

/**
 * @since 1.0.0
 * @category constructors
 */
export const simple: <A, B>(log: (a: A) => B) => Logger<A, B> = internal.simple

/**
 * @since 1.0.0
 * @category constructors
 */
export const succeed: <A>(value: A) => Logger<unknown, A> = internal.succeed

/**
 * @since 1.0.0
 * @category constructors
 */
export const sync: <A>(evaluate: LazyArg<A>) => Logger<unknown, A> = internal.sync

/**
 * @since 1.0.0
 * @category constructors
 */
export const test: {
  <Message>(input: Message): <Output>(self: Logger<Message, Output>) => Output
  <Message, Output>(self: Logger<Message, Output>, input: Message): Output
} = internalCircular.test

/**
 * @since 1.0.0
 * @category context
 */
export const withMinimumLogLevel: {
  (level: LogLevel.LogLevel): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  <R, E, A>(self: Effect<R, E, A>, level: LogLevel.LogLevel): Effect<R, E, A>
} = circular.withMinimumLogLevel

/**
 * Combines this logger with the specified logger to produce a new logger that
 * logs to both this logger and that logger.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zip: {
  <Message2, Output2>(
    that: Logger<Message2, Output2>
  ): <Message, Output>(self: Logger<Message, Output>) => Logger<Message & Message2, readonly [Output, Output2]>
  <Message, Output, Message2, Output2>(
    self: Logger<Message, Output>,
    that: Logger<Message2, Output2>
  ): Logger<Message & Message2, readonly [Output, Output2]>
} = internal.zip

/**
 * @since 1.0.0
 * @category zipping
 */
export const zipLeft: {
  <Message2, Output2>(
    that: Logger<Message2, Output2>
  ): <Message, Output>(self: Logger<Message, Output>) => Logger<Message & Message2, Output>
  <Message, Output, Message2, Output2>(
    self: Logger<Message, Output>,
    that: Logger<Message2, Output2>
  ): Logger<Message & Message2, Output>
} = internal.zipLeft

/**
 * @since 1.0.0
 * @category zipping
 */
export const zipRight: {
  <Message2, Output2>(
    that: Logger<Message2, Output2>
  ): <Message, Output>(self: Logger<Message, Output>) => Logger<Message & Message2, Output2>
  <Message, Output, Message2, Output2>(
    self: Logger<Message, Output>,
    that: Logger<Message2, Output2>
  ): Logger<Message & Message2, Output2>
} = internal.zipRight

/**
 * @since 1.0.0
 * @category constructors
 */
export const defaultLogger: Logger<string, void> = fiberRuntime.defaultLogger

/**
 * @since 1.0.0
 * @category constructors
 */
export const logfmtLogger: Logger<string, string> = internal.logfmtLogger

/**
 * @since 1.0.0
 * @category constructors
 */
export const stringLogger: Logger<string, string> = internal.stringLogger

/**
 * @since 1.0.0
 * @category constructors
 */
export const logFmt: Layer.Layer<never, never, never> = replace(fiberRuntime.defaultLogger, fiberRuntime.logFmtLogger)

/**
 * @since 1.0.0
 * @category context
 */
export const minimumLogLevel: (level: LogLevel.LogLevel) => Layer.Layer<never, never, never> = circular.minimumLogLevel
