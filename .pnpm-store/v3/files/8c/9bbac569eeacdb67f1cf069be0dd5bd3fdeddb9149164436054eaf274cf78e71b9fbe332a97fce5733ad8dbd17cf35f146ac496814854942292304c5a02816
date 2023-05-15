/**
 * @since 1.0.0
 */

import * as debug from "@effect/io/internal_effect_untraced/debug"

/**
 * @since 1.0.0
 * @category models
 */
export interface Debug {
  /**
   * Overrides the default log level filter for loggers such as console.
   */
  minumumLogLevel: "All" | "Fatal" | "Error" | "Warning" | "Info" | "Debug" | "Trace" | "None"
  /**
   * Sets a limit on how many stack traces should be rendered.
   */
  traceStackLimit: number
  /**
   * Enables tracing of execution and stack.
   */
  tracingEnabled: boolean
  /**
   * Used to extract a source location from an Error when rendering a stack
   */
  parseStack: (error: Error) => ReadonlyArray<Frame | undefined>
  /**
   * Used to filter a source location when rendering a stack
   */
  filterStackFrame: (frame: Frame) => boolean
}

/**
 * @since 1.0.0
 * @category models
 */
export interface SourceLocation extends Error {
  depth: number
  parsed?: Frame | undefined

  toFrame(): Frame | undefined
}

/**
 * @since 1.0.0
 * @category models
 */
export interface Frame {
  name?: string
  fileName: string
  line: number
  column: number
}

/**
 * @since 1.0.0
 * @category models
 */
export type Trace = SourceLocation | undefined

/**
 * @since 1.0.0
 * @category models
 */
export type Restore = <F extends (...args: Array<any>) => any>(f: F) => F

/**
 * @since 1.0.0
 * @category debug
 */
export const runtimeDebug: Debug = debug.runtimeDebug

const sourceLocationProto = Object.setPrototypeOf(
  {
    toFrame(this: SourceLocation) {
      if ("parsed" in this) {
        return this.parsed
      }
      const stack = runtimeDebug.parseStack(this)
      if (stack && stack.length >= 2 && stack[0] && stack[1]) {
        this.parsed = {
          ...stack[this.depth - 1]!,
          name: stack[this.depth - 2]?.name
        }
      } else {
        this.parsed = undefined
      }
      return this.parsed
    }
  },
  Error.prototype
)

/**
 * @since 1.0.0
 */
export const sourceLocation = (error: Error): SourceLocation => {
  ;(error as SourceLocation).depth = Error.stackTraceLimit
  Object.setPrototypeOf(error, sourceLocationProto)
  return (error as SourceLocation)
}

/**
 * @since 1.0.0
 */
export const bodyWithTrace = <A>(
  body: (
    trace: Trace,
    restore: Restore
  ) => A
) => {
  if (!runtimeDebug.tracingEnabled) {
    return body(void 0, debug.restoreOff)
  }
  runtimeDebug.tracingEnabled = false
  try {
    const limit = Error.stackTraceLimit
    Error.stackTraceLimit = 3
    const source = sourceLocation(new Error())
    Error.stackTraceLimit = limit
    return body(source as SourceLocation, debug.restoreOn)
  } finally {
    runtimeDebug.tracingEnabled = true
  }
}

/**
 * @since 1.0.0
 */
export const methodWithTrace = <A extends (...args: Array<any>) => any>(
  body: ((trace: Trace, restore: Restore) => A)
): A => {
  // @ts-expect-error
  return function() {
    if (!runtimeDebug.tracingEnabled) {
      // @ts-expect-error
      return body(void 0, debug.restoreOff).apply(this, arguments)
    }
    runtimeDebug.tracingEnabled = false
    try {
      const limit = Error.stackTraceLimit
      Error.stackTraceLimit = 2
      const error = sourceLocation(new Error())
      Error.stackTraceLimit = limit
      // @ts-expect-error
      return body(error, debug.restoreOn).apply(this, arguments)
    } finally {
      runtimeDebug.tracingEnabled = true
    }
  }
}

/**
 * @since 1.0.0
 */
export const pipeableWithTrace = <A extends (...args: Array<any>) => any>(
  body: ((trace: Trace, restore: Restore) => A)
): A => {
  // @ts-expect-error
  return function() {
    if (!runtimeDebug.tracingEnabled) {
      const a = body(void 0, debug.restoreOff)
      // @ts-expect-error
      return ((self: any) => untraced(() => a.apply(this, arguments)(self))) as any
    }
    runtimeDebug.tracingEnabled = false
    try {
      const limit = Error.stackTraceLimit
      Error.stackTraceLimit = 2
      const source = sourceLocation(new Error())
      Error.stackTraceLimit = limit
      const f = body(source, debug.restoreOn)
      // @ts-expect-error
      return ((self: any) => untraced(() => f.apply(this, arguments)(self))) as any
    } finally {
      runtimeDebug.tracingEnabled = true
    }
  }
}

/**
 * @since 1.0.0
 */
export const dualWithTrace: {
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    dfLen: Parameters<DataFirst>["length"],
    body: (trace: Trace, restore: Restore) => DataFirst
  ): DataLast & DataFirst
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    isDataFirst: (args: IArguments) => boolean,
    body: (trace: Trace, restore: Restore) => DataFirst
  ): DataLast & DataFirst
} = (dfLen, body) => {
  const isDataFirst: (args: IArguments) => boolean = typeof dfLen === "number" ?
    ((args) => args.length === dfLen) :
    dfLen
  return function() {
    if (!runtimeDebug.tracingEnabled) {
      const f = body(void 0, debug.restoreOff)
      if (isDataFirst(arguments)) {
        // @ts-expect-error
        return untraced(() => f.apply(this, arguments))
      }
      return ((self: any) => untraced(() => f(self, ...arguments))) as any
    }
    runtimeDebug.tracingEnabled = false
    try {
      const limit = Error.stackTraceLimit
      Error.stackTraceLimit = 2
      const source = sourceLocation(new Error())
      Error.stackTraceLimit = limit
      const f = body(source, debug.restoreOn)
      if (isDataFirst(arguments)) {
        // @ts-expect-error
        return untraced(() => f.apply(this, arguments))
      }
      return ((self: any) => untraced(() => f(self, ...arguments))) as any
    } finally {
      runtimeDebug.tracingEnabled = true
    }
  }
}

/**
 * @since 1.0.0
 */
export const untraced = <A>(
  body: (restore: Restore) => A
) => {
  if (!runtimeDebug.tracingEnabled) {
    return body(debug.restoreOff)
  }
  runtimeDebug.tracingEnabled = false
  try {
    return body(debug.restoreOn)
  } finally {
    runtimeDebug.tracingEnabled = true
  }
}

/**
 * @since 1.0.0
 */
export const untracedDual = <
  DataLast extends (...args: Array<any>) => any,
  DataFirst extends (...args: Array<any>) => any
>(
  dfLen: Parameters<DataFirst>["length"],
  body: ((restore: Restore) => DataFirst)
): DataLast & DataFirst => {
  // @ts-expect-error
  return function() {
    if (!runtimeDebug.tracingEnabled) {
      const f = body(debug.restoreOff)
      if (arguments.length === dfLen) {
        // @ts-expect-error
        return untraced(() => f.apply(this, arguments))
      }
      return ((self: any) => untraced(() => f(self, ...arguments))) as any
    }
    runtimeDebug.tracingEnabled = false
    try {
      const f = body(debug.restoreOn)
      if (arguments.length === dfLen) {
        // @ts-expect-error
        return untraced(() => f.apply(this, arguments))
      }
      return ((self: any) => untraced(() => f(self, ...arguments))) as any
    } finally {
      runtimeDebug.tracingEnabled = true
    }
  }
}

/**
 * @since 1.0.0
 */
export const untracedMethod = <A extends (...args: Array<any>) => any>(
  body: ((restore: Restore) => A)
): A => {
  // @ts-expect-error
  return function() {
    if (!runtimeDebug.tracingEnabled) {
      // @ts-expect-error
      return untraced(() => body(debug.restoreOff).apply(this, arguments))
    }
    runtimeDebug.tracingEnabled = false
    try {
      // @ts-expect-error
      return untraced(() => body(debug.restoreOn).apply(this, arguments))
    } finally {
      runtimeDebug.tracingEnabled = true
    }
  }
}

/**
 * @since 1.0.0
 */
export const traced = <A>(
  body: (restore: Restore) => A
) => {
  if (runtimeDebug.tracingEnabled) {
    return body(debug.restoreOn)
  }
  runtimeDebug.tracingEnabled = true
  try {
    return body(debug.restoreOff)
  } finally {
    runtimeDebug.tracingEnabled = false
  }
}
