import * as order from "@effect/data/typeclass/Order";
import type * as Effect from "@effect/io/Effect";
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
export type LogLevel = All | Fatal | Error | Warning | Info | Debug | Trace | None;
/**
 * @since 1.0.0
 * @category model
 */
export interface All {
    readonly _tag: "All";
    readonly label: "ALL";
    readonly syslog: 0;
    readonly ordinal: number;
}
/**
 * @since 1.0.0
 * @category model
 */
export interface Fatal {
    readonly _tag: "Fatal";
    readonly label: "FATAL";
    readonly syslog: 2;
    readonly ordinal: number;
}
/**
 * @since 1.0.0
 * @category model
 */
export interface Error {
    readonly _tag: "Error";
    readonly label: "ERROR";
    readonly syslog: 3;
    readonly ordinal: number;
}
/**
 * @since 1.0.0
 * @category model
 */
export interface Warning {
    readonly _tag: "Warning";
    readonly label: "WARN";
    readonly syslog: 4;
    readonly ordinal: number;
}
/**
 * @since 1.0.0
 * @category model
 */
export interface Info {
    readonly _tag: "Info";
    readonly label: "INFO";
    readonly syslog: 6;
    readonly ordinal: number;
}
/**
 * @since 1.0.0
 * @category model
 */
export interface Debug {
    readonly _tag: "Debug";
    readonly label: "DEBUG";
    readonly syslog: 7;
    readonly ordinal: number;
}
/**
 * @since 1.0.0
 * @category model
 */
export interface Trace {
    readonly _tag: "Trace";
    readonly label: "TRACE";
    readonly syslog: 7;
    readonly ordinal: number;
}
/**
 * @since 1.0.0
 * @category model
 */
export interface None {
    readonly _tag: "None";
    readonly label: "OFF";
    readonly syslog: 7;
    readonly ordinal: number;
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const All: LogLevel;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const Fatal: LogLevel;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const Error: LogLevel;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const Warning: LogLevel;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const Info: LogLevel;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const Debug: LogLevel;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const Trace: LogLevel;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const None: LogLevel;
/**
 * Locally applies the specified `LogLevel` to an `Effect` workflow, reverting
 * to the previous `LogLevel` after the `Effect` workflow completes.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const locally: {
    (self: LogLevel): <R, E, B>(use: Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>;
    <R, E, B>(use: Effect.Effect<R, E, B>, self: LogLevel): Effect.Effect<R, E, B>;
};
/**
 * @since 1.0.0
 * @category instances
 */
export declare const Order: order.Order<LogLevel>;
/**
 * @since 1.0.0
 * @category ordering
 */
export declare const lessThan: {
    (that: LogLevel): (self: LogLevel) => boolean;
    (self: LogLevel, that: LogLevel): boolean;
};
/**
 * @since 1.0.0
 * @category ordering
 */
export declare const lessThanEqual: {
    (that: LogLevel): (self: LogLevel) => boolean;
    (self: LogLevel, that: LogLevel): boolean;
};
/**
 * @since 1.0.0
 * @category ordering
 */
export declare const greaterThan: {
    (that: LogLevel): (self: LogLevel) => boolean;
    (self: LogLevel, that: LogLevel): boolean;
};
/**
 * @since 1.0.0
 * @category ordering
 */
export declare const greaterThanEqual: {
    (that: LogLevel): (self: LogLevel) => boolean;
    (self: LogLevel, that: LogLevel): boolean;
};
/**
 * @since 1.0.0
 * @category conversions
 */
export declare const fromLiteral: (_: "All" | "Fatal" | "Error" | "Warning" | "Info" | "Debug" | "Trace" | "None") => LogLevel;
//# sourceMappingURL=Level.d.ts.map