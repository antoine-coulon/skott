/**
 * @since 1.0.0
 */
import * as debug from "@effect/io/internal_effect_untraced/debug";
/**
 * @since 1.0.0
 * @category debug
 */
export const runtimeDebug = debug.runtimeDebug;
const sourceLocationProto = /*#__PURE__*/Object.setPrototypeOf({
  toFrame() {
    if ("parsed" in this) {
      return this.parsed;
    }
    const stack = runtimeDebug.parseStack(this);
    if (stack && stack.length >= 2 && stack[0] && stack[1]) {
      this.parsed = {
        ...stack[this.depth - 1],
        name: stack[this.depth - 2]?.name
      };
    } else {
      this.parsed = undefined;
    }
    return this.parsed;
  }
}, Error.prototype);
/**
 * @since 1.0.0
 */
export const sourceLocation = error => {
  ;
  error.depth = Error.stackTraceLimit;
  Object.setPrototypeOf(error, sourceLocationProto);
  return error;
};
/**
 * @since 1.0.0
 */
export const bodyWithTrace = body => {
  if (!runtimeDebug.tracingEnabled) {
    return body(void 0, debug.restoreOff);
  }
  runtimeDebug.tracingEnabled = false;
  try {
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 3;
    const source = sourceLocation(new Error());
    Error.stackTraceLimit = limit;
    return body(source, debug.restoreOn);
  } finally {
    runtimeDebug.tracingEnabled = true;
  }
};
/**
 * @since 1.0.0
 */
export const methodWithTrace = body => {
  // @ts-expect-error
  return function () {
    if (!runtimeDebug.tracingEnabled) {
      // @ts-expect-error
      return body(void 0, debug.restoreOff).apply(this, arguments);
    }
    runtimeDebug.tracingEnabled = false;
    try {
      const limit = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      const error = sourceLocation(new Error());
      Error.stackTraceLimit = limit;
      // @ts-expect-error
      return body(error, debug.restoreOn).apply(this, arguments);
    } finally {
      runtimeDebug.tracingEnabled = true;
    }
  };
};
/**
 * @since 1.0.0
 */
export const pipeableWithTrace = body => {
  // @ts-expect-error
  return function () {
    if (!runtimeDebug.tracingEnabled) {
      const a = body(void 0, debug.restoreOff);
      // @ts-expect-error
      return self => untraced(() => a.apply(this, arguments)(self));
    }
    runtimeDebug.tracingEnabled = false;
    try {
      const limit = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      const source = sourceLocation(new Error());
      Error.stackTraceLimit = limit;
      const f = body(source, debug.restoreOn);
      // @ts-expect-error
      return self => untraced(() => f.apply(this, arguments)(self));
    } finally {
      runtimeDebug.tracingEnabled = true;
    }
  };
};
/**
 * @since 1.0.0
 */
export const dualWithTrace = (dfLen, body) => {
  const isDataFirst = typeof dfLen === "number" ? args => args.length === dfLen : dfLen;
  return function () {
    if (!runtimeDebug.tracingEnabled) {
      const f = body(void 0, debug.restoreOff);
      if (isDataFirst(arguments)) {
        // @ts-expect-error
        return untraced(() => f.apply(this, arguments));
      }
      return self => untraced(() => f(self, ...arguments));
    }
    runtimeDebug.tracingEnabled = false;
    try {
      const limit = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      const source = sourceLocation(new Error());
      Error.stackTraceLimit = limit;
      const f = body(source, debug.restoreOn);
      if (isDataFirst(arguments)) {
        // @ts-expect-error
        return untraced(() => f.apply(this, arguments));
      }
      return self => untraced(() => f(self, ...arguments));
    } finally {
      runtimeDebug.tracingEnabled = true;
    }
  };
};
/**
 * @since 1.0.0
 */
export const untraced = body => {
  if (!runtimeDebug.tracingEnabled) {
    return body(debug.restoreOff);
  }
  runtimeDebug.tracingEnabled = false;
  try {
    return body(debug.restoreOn);
  } finally {
    runtimeDebug.tracingEnabled = true;
  }
};
/**
 * @since 1.0.0
 */
export const untracedDual = (dfLen, body) => {
  // @ts-expect-error
  return function () {
    if (!runtimeDebug.tracingEnabled) {
      const f = body(debug.restoreOff);
      if (arguments.length === dfLen) {
        // @ts-expect-error
        return untraced(() => f.apply(this, arguments));
      }
      return self => untraced(() => f(self, ...arguments));
    }
    runtimeDebug.tracingEnabled = false;
    try {
      const f = body(debug.restoreOn);
      if (arguments.length === dfLen) {
        // @ts-expect-error
        return untraced(() => f.apply(this, arguments));
      }
      return self => untraced(() => f(self, ...arguments));
    } finally {
      runtimeDebug.tracingEnabled = true;
    }
  };
};
/**
 * @since 1.0.0
 */
export const untracedMethod = body => {
  // @ts-expect-error
  return function () {
    if (!runtimeDebug.tracingEnabled) {
      // @ts-expect-error
      return untraced(() => body(debug.restoreOff).apply(this, arguments));
    }
    runtimeDebug.tracingEnabled = false;
    try {
      // @ts-expect-error
      return untraced(() => body(debug.restoreOn).apply(this, arguments));
    } finally {
      runtimeDebug.tracingEnabled = true;
    }
  };
};
/**
 * @since 1.0.0
 */
export const traced = body => {
  if (runtimeDebug.tracingEnabled) {
    return body(debug.restoreOn);
  }
  runtimeDebug.tracingEnabled = true;
  try {
    return body(debug.restoreOff);
  } finally {
    runtimeDebug.tracingEnabled = false;
  }
};
//# sourceMappingURL=Debug.mjs.map