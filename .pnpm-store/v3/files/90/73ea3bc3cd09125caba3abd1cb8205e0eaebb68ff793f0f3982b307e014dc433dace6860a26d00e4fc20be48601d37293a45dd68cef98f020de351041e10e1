import * as Chunk from "@effect/data/Chunk"
import type { LazyArg } from "@effect/data/Function"
import { constVoid, dual, pipe } from "@effect/data/Function"
import * as HashMap from "@effect/data/HashMap"
import * as Option from "@effect/data/Option"
import type * as CauseExt from "@effect/io/Cause"
import * as Debug from "@effect/io/Debug"
import type * as FiberId from "@effect/io/Fiber/Id"
import type * as FiberRefs from "@effect/io/FiberRefs"
import * as Cause from "@effect/io/internal_effect_untraced/cause"
import * as Pretty from "@effect/io/internal_effect_untraced/cause-pretty"
import * as _fiberId from "@effect/io/internal_effect_untraced/fiberId"
import type * as Logger from "@effect/io/Logger"
import type * as LogLevel from "@effect/io/Logger/Level"
import * as LogSpan from "@effect/io/Logger/Span"

/** @internal */
const LoggerSymbolKey = "@effect/io/Logger"

/** @internal */
export const LoggerTypeId: Logger.LoggerTypeId = Symbol.for(
  LoggerSymbolKey
) as Logger.LoggerTypeId

/** @internal */
const loggerVariance = {
  _Message: (_: unknown) => _,
  _Output: (_: never) => _
}

/** @internal */
export const makeLogger = <Message, Output>(
  log: (
    fiberId: FiberId.FiberId,
    logLevel: LogLevel.LogLevel,
    message: Message,
    cause: CauseExt.Cause<unknown>,
    context: FiberRefs.FiberRefs,
    spans: Chunk.Chunk<LogSpan.LogSpan>,
    annotations: HashMap.HashMap<string, string>
  ) => Output
): Logger.Logger<Message, Output> => ({
  [LoggerTypeId]: loggerVariance,
  log
})

/** @internal */
export const stringLogger: Logger.Logger<string, string> = makeLogger<string, string>(
  (fiberId, logLevel, message, cause, _context, spans, annotations) => {
    const now = new Date()
    const nowMillis = now.getTime()

    const outputArray = [
      `timestamp=${now.toISOString()}`,
      `level=${logLevel.label}`,
      `fiber=${_fiberId.threadName(fiberId)}`
    ]

    let output = outputArray.join(" ")

    if (message.length > 0) {
      output = output + " message="
      output = appendQuoted(message, output)
    }

    if (cause != null && cause != Cause.empty) {
      output = output + " cause="
      output = appendQuoted(Pretty.pretty(cause), output)
    }

    if (Chunk.isNonEmpty(spans)) {
      output = output + " "

      let first = true
      for (const span of spans) {
        if (first) {
          first = false
        } else {
          output = output + " "
        }
        output = output + pipe(span, LogSpan.render(nowMillis))
      }
    }

    if (pipe(annotations, HashMap.size) > 0) {
      output = output + " "

      let first = true
      for (const [key, value] of annotations) {
        if (first) {
          first = false
        } else {
          output = output + " "
        }
        output = output + filterKeyName(key)
        output = output + "="
        output = appendQuoted(value, output)
      }
    }

    return output
  }
)

/** @internal */
const escapeDoubleQuotes = (str: string) => `"${str.replace(/\\([\s\S])|(")/g, "\\$1$2")}"`

const textOnly = /^[^\s"=]+$/

/** @internal */
const appendQuoted = (label: string, output: string): string =>
  output + (label.match(textOnly) ? label : escapeDoubleQuotes(label))

/** @internal */
export const logfmtLogger = makeLogger<string, string>(
  (fiberId, logLevel, message, cause, _context, spans, annotations) => {
    const now = new Date()
    const nowMillis = now.getTime()

    const outputArray = [
      `timestamp=${now.toISOString()}`,
      `level=${logLevel.label}`,
      `fiber=${_fiberId.threadName(fiberId)}`
    ]

    let output = outputArray.join(" ")

    if (message.length > 0) {
      output = output + " message="
      output = appendQuotedLogfmt(message, output)
    }

    if (cause != null && cause != Cause.empty) {
      output = output + " cause="
      output = appendQuotedLogfmt(Pretty.pretty(cause), output)
    }

    if (Chunk.isNonEmpty(spans)) {
      output = output + " "

      let first = true
      for (const span of spans) {
        if (first) {
          first = false
        } else {
          output = output + " "
        }
        output = output + pipe(span, renderLogSpanLogfmt(nowMillis))
      }
    }

    if (pipe(annotations, HashMap.size) > 0) {
      output = output + " "

      let first = true
      for (const [key, value] of annotations) {
        if (first) {
          first = false
        } else {
          output = output + " "
        }
        output = output + filterKeyName(key)
        output = output + "="
        output = appendQuotedLogfmt(value, output)
      }
    }

    return output
  }
)

/** @internal */
const filterKeyName = (key: string) => key.replace(/[\s="]/g, "_")

/** @internal */
const escapeDoubleQuotesLogfmt = (str: string) => JSON.stringify(str)

/** @internal */
const appendQuotedLogfmt = (label: string, output: string): string =>
  output + (label.match(textOnly) ? label : escapeDoubleQuotesLogfmt(label))

/** @internal */
const renderLogSpanLogfmt = (now: number) =>
  (self: LogSpan.LogSpan): string => {
    const label = filterKeyName(self.label)
    return `${label}=${now - self.startTime}ms`
  }

/** @internal */
export const contramap = Debug.untracedDual<
  <Message, Message2>(
    f: (message: Message2) => Message
  ) => <Output>(self: Logger.Logger<Message, Output>) => Logger.Logger<Message2, Output>,
  <Output, Message, Message2>(
    self: Logger.Logger<Message, Output>,
    f: (message: Message2) => Message
  ) => Logger.Logger<Message2, Output>
>(2, (restore) =>
  (self, f) =>
    makeLogger(
      (fiberId, logLevel, message, cause, context, spans, annotations) =>
        self.log(fiberId, logLevel, restore(f)(message), cause, context, spans, annotations)
    ))

/** @internal */
export const filterLogLevel = Debug.untracedDual<
  (
    f: (logLevel: LogLevel.LogLevel) => boolean
  ) => <Message, Output>(self: Logger.Logger<Message, Output>) => Logger.Logger<Message, Option.Option<Output>>,
  <Message, Output>(
    self: Logger.Logger<Message, Output>,
    f: (logLevel: LogLevel.LogLevel) => boolean
  ) => Logger.Logger<Message, Option.Option<Output>>
>(2, (restore) =>
  (self, f) =>
    makeLogger(
      (fiberId, logLevel, message, cause, context, spans, annotations) =>
        restore(f)(logLevel)
          ? Option.some(
            self.log(
              fiberId,
              logLevel,
              message,
              cause,
              context,
              spans,
              annotations
            )
          )
          : Option.none()
    ))

/** @internal */
export const map = Debug.untracedDual<
  <Output, Output2>(
    f: (output: Output) => Output2
  ) => <Message>(self: Logger.Logger<Message, Output>) => Logger.Logger<Message, Output2>,
  <Message, Output, Output2>(
    self: Logger.Logger<Message, Output>,
    f: (output: Output) => Output2
  ) => Logger.Logger<Message, Output2>
>(2, (restore) =>
  (self, f) =>
    makeLogger(
      (fiberId, logLevel, message, cause, context, spans, annotations) =>
        restore(f)(self.log(fiberId, logLevel, message, cause, context, spans, annotations))
    ))

/** @internal */
export const none = (): Logger.Logger<unknown, void> => ({
  [LoggerTypeId]: loggerVariance,
  log: constVoid
})

/** @internal */
export const simple = <A, B>(log: (a: A) => B): Logger.Logger<A, B> => ({
  [LoggerTypeId]: loggerVariance,
  log: (_fiberId, _logLevel, message, _cause, _context, _spans, _annotations) => {
    return log(message)
  }
})

/** @internal */
export const succeed = <A>(value: A): Logger.Logger<unknown, A> => {
  return simple(() => value)
}

/** @internal */
export const sync = <A>(evaluate: LazyArg<A>): Logger.Logger<unknown, A> => {
  return simple(evaluate)
}

/** @internal */
export const zip = dual<
  <Message2, Output2>(
    that: Logger.Logger<Message2, Output2>
  ) => <Message, Output>(
    self: Logger.Logger<Message, Output>
  ) => Logger.Logger<Message & Message2, readonly [Output, Output2]>,
  <Message, Output, Message2, Output2>(
    self: Logger.Logger<Message, Output>,
    that: Logger.Logger<Message2, Output2>
  ) => Logger.Logger<Message & Message2, readonly [Output, Output2]>
>(2, (self, that) =>
  makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) =>
    [
      self.log(fiberId, logLevel, message, cause, context, spans, annotations),
      that.log(fiberId, logLevel, message, cause, context, spans, annotations)
    ] as const
  ))

/** @internal */
export const zipLeft = dual<
  <Message2, Output2>(
    that: Logger.Logger<Message2, Output2>
  ) => <Message, Output>(
    self: Logger.Logger<Message, Output>
  ) => Logger.Logger<Message & Message2, Output>,
  <Message, Output, Message2, Output2>(
    self: Logger.Logger<Message, Output>,
    that: Logger.Logger<Message2, Output2>
  ) => Logger.Logger<Message & Message2, Output>
>(2, (self, that) => map(zip(self, that), (tuple) => tuple[0]))

/** @internal */
export const zipRight = dual<
  <Message2, Output2>(
    that: Logger.Logger<Message2, Output2>
  ) => <Message, Output>(
    self: Logger.Logger<Message, Output>
  ) => Logger.Logger<Message & Message2, Output2>,
  <Message, Output, Message2, Output2>(
    self: Logger.Logger<Message, Output>,
    that: Logger.Logger<Message2, Output2>
  ) => Logger.Logger<Message & Message2, Output2>
>(2, (self, that) => map(zip(self, that), (tuple) => tuple[1]))
