/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type { LazyArg } from "@effect/data/Function";
import type * as HashMap from "@effect/data/HashMap";
import type * as Option from "@effect/data/Option";
import type * as Cause from "@effect/io/Cause";
import type { Effect } from "@effect/io/Effect";
import type * as FiberId from "@effect/io/Fiber/Id";
import type * as FiberRefs from "@effect/io/FiberRefs";
import type * as Layer from "@effect/io/Layer";
import type * as LogLevel from "@effect/io/Logger/Level";
import type * as LogSpan from "@effect/io/Logger/Span";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const LoggerTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type LoggerTypeId = typeof LoggerTypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface Logger<Message, Output> extends Logger.Variance<Message, Output> {
    readonly log: (fiberId: FiberId.FiberId, logLevel: LogLevel.LogLevel, message: Message, cause: Cause.Cause<unknown>, context: FiberRefs.FiberRefs, spans: Chunk.Chunk<LogSpan.LogSpan>, annotations: HashMap.HashMap<string, string>) => Output;
}
/**
 * @since 1.0.0
 */
export declare namespace Logger {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<Message, Output> {
        readonly [LoggerTypeId]: {
            readonly _Message: (_: Message) => void;
            readonly _Output: (_: never) => Output;
        };
    }
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const make: <Message, Output>(log: (fiberId: FiberId.FiberId, logLevel: LogLevel.LogLevel, message: Message, cause: Cause.Cause<unknown>, context: FiberRefs.FiberRefs, spans: Chunk.Chunk<LogSpan.LogSpan>, annotations: HashMap.HashMap<string, string>) => Output) => Logger<Message, Output>;
/**
 * @since 1.0.0
 * @category context
 */
export declare const add: <B>(logger: Logger<string, B>) => Layer.Layer<never, never, never>;
/**
 * @since 1.0.0
 * @category mapping
 */
export declare const contramap: {
    <Message, Message2>(f: (message: Message2) => Message): <Output>(self: Logger<Message, Output>) => Logger<Message2, Output>;
    <Output, Message, Message2>(self: Logger<Message, Output>, f: (message: Message2) => Message): Logger<Message2, Output>;
};
/**
 * Returns a version of this logger that only logs messages when the log level
 * satisfies the specified predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
export declare const filterLogLevel: {
    (f: (logLevel: LogLevel.LogLevel) => boolean): <Message, Output>(self: Logger<Message, Output>) => Logger<Message, Option.Option<Output>>;
    <Message, Output>(self: Logger<Message, Output>, f: (logLevel: LogLevel.LogLevel) => boolean): Logger<Message, Option.Option<Output>>;
};
/**
 * @since 1.0.0
 * @category mapping
 */
export declare const map: {
    <Output, Output2>(f: (output: Output) => Output2): <Message>(self: Logger<Message, Output>) => Logger<Message, Output2>;
    <Message, Output, Output2>(self: Logger<Message, Output>, f: (output: Output) => Output2): Logger<Message, Output2>;
};
/**
 * A logger that does nothing in response to logging events.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const none: (_: void) => Logger<unknown, void>;
/**
 * @since 1.0.0
 * @category context
 */
export declare const remove: <A>(logger: Logger<string, A>) => Layer.Layer<never, never, never>;
/**
 * @since 1.0.0
 * @category context
 */
export declare const replace: {
    <B>(that: Logger<string, B>): <A>(self: Logger<string, A>) => Layer.Layer<never, never, never>;
    <A, B>(self: Logger<string, A>, that: Logger<string, B>): Layer.Layer<never, never, never>;
};
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const simple: <A, B>(log: (a: A) => B) => Logger<A, B>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const succeed: <A>(value: A) => Logger<unknown, A>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const sync: <A>(evaluate: LazyArg<A>) => Logger<unknown, A>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const test: {
    <Message>(input: Message): <Output>(self: Logger<Message, Output>) => Output;
    <Message, Output>(self: Logger<Message, Output>, input: Message): Output;
};
/**
 * @since 1.0.0
 * @category context
 */
export declare const withMinimumLogLevel: {
    (level: LogLevel.LogLevel): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>;
    <R, E, A>(self: Effect<R, E, A>, level: LogLevel.LogLevel): Effect<R, E, A>;
};
/**
 * Combines this logger with the specified logger to produce a new logger that
 * logs to both this logger and that logger.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zip: {
    <Message2, Output2>(that: Logger<Message2, Output2>): <Message, Output>(self: Logger<Message, Output>) => Logger<Message & Message2, readonly [Output, Output2]>;
    <Message, Output, Message2, Output2>(self: Logger<Message, Output>, that: Logger<Message2, Output2>): Logger<Message & Message2, readonly [Output, Output2]>;
};
/**
 * @since 1.0.0
 * @category zipping
 */
export declare const zipLeft: {
    <Message2, Output2>(that: Logger<Message2, Output2>): <Message, Output>(self: Logger<Message, Output>) => Logger<Message & Message2, Output>;
    <Message, Output, Message2, Output2>(self: Logger<Message, Output>, that: Logger<Message2, Output2>): Logger<Message & Message2, Output>;
};
/**
 * @since 1.0.0
 * @category zipping
 */
export declare const zipRight: {
    <Message2, Output2>(that: Logger<Message2, Output2>): <Message, Output>(self: Logger<Message, Output>) => Logger<Message & Message2, Output2>;
    <Message, Output, Message2, Output2>(self: Logger<Message, Output>, that: Logger<Message2, Output2>): Logger<Message & Message2, Output2>;
};
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const defaultLogger: Logger<string, void>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const logfmtLogger: Logger<string, string>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const stringLogger: Logger<string, string>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const logFmt: Layer.Layer<never, never, never>;
/**
 * @since 1.0.0
 * @category context
 */
export declare const minimumLogLevel: (level: LogLevel.LogLevel) => Layer.Layer<never, never, never>;
//# sourceMappingURL=Logger.d.ts.map