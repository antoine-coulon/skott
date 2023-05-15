"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.untracedMethod = exports.untracedDual = exports.untraced = exports.traced = exports.sourceLocation = exports.runtimeDebug = exports.pipeableWithTrace = exports.methodWithTrace = exports.dualWithTrace = exports.bodyWithTrace = void 0;
var debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/debug"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 * @category debug
 */
const runtimeDebug = debug.runtimeDebug;
exports.runtimeDebug = runtimeDebug;
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
const sourceLocation = error => {
  ;
  error.depth = Error.stackTraceLimit;
  Object.setPrototypeOf(error, sourceLocationProto);
  return error;
};
/**
 * @since 1.0.0
 */
exports.sourceLocation = sourceLocation;
const bodyWithTrace = body => {
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
exports.bodyWithTrace = bodyWithTrace;
const methodWithTrace = body => {
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
exports.methodWithTrace = methodWithTrace;
const pipeableWithTrace = body => {
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
exports.pipeableWithTrace = pipeableWithTrace;
const dualWithTrace = (dfLen, body) => {
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
exports.dualWithTrace = dualWithTrace;
const untraced = body => {
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
exports.untraced = untraced;
const untracedDual = (dfLen, body) => {
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
exports.untracedDual = untracedDual;
const untracedMethod = body => {
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
exports.untracedMethod = untracedMethod;
const traced = body => {
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
exports.traced = traced;
//# sourceMappingURL=Debug.js.map