"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettyErrors = exports.pretty = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// -----------------------------------------------------------------------------
// Pretty Printing
// -----------------------------------------------------------------------------
/** @internal */
const renderToString = u => {
  if (typeof u === "object" && u != null && "toString" in u && typeof u["toString"] === "function" && u["toString"] !== Object.prototype.toString) {
    return u["toString"]();
  }
  if (typeof u === "string") {
    return `Error: ${u}`;
  }
  if (typeof u === "object" && u !== null) {
    if ("message" in u && typeof u["message"] === "string") {
      const raw = JSON.parse(JSON.stringify(u));
      const keys = new Set(Object.keys(raw));
      keys.delete("name");
      keys.delete("message");
      keys.delete("_tag");
      if (keys.size === 0) {
        return `${"name" in u && typeof u.name === "string" ? u.name : "Error"}${"_tag" in u && typeof u["_tag"] === "string" ? `(${u._tag})` : ``}: ${u.message}`;
      }
    }
  }
  return `Error: ${JSON.stringify(u)}`;
};
const renderTraces = chunk => {
  const ret = [];
  for (const s of chunk) {
    const r = s?.toFrame();
    if (r) {
      if (Debug.runtimeDebug.filterStackFrame(r)) {
        ret.push(renderFrame(r));
      }
    }
  }
  return ret;
};
/** @internal */
const renderStack = span => {
  if (Option.isNone(span)) {
    return [];
  }
  if (span.value.stack.length > 0) {
    return renderTraces(span.value.stack);
  }
  return [];
};
/** @internal */
const renderFail = (error, errorStack, stack) => {
  return [new RenderError(stack._tag === "Some" ? stack.value.seq : 0, error, errorStack ? errorStack + "\r\n" + renderStack(stack).join("\r\n") : renderStack(stack).join("\r\n"))];
};
/** @internal */
const renderError = error => {
  if (error.stack) {
    const stack = Debug.runtimeDebug.parseStack(error);
    const traces = [];
    for (const frame of stack) {
      if (frame) {
        if (Debug.runtimeDebug.filterStackFrame(frame)) {
          traces.push(renderFrame(frame));
        } else {
          break;
        }
      }
    }
    return [renderToString(error), traces.join("\r\n")];
  }
  return [String(error), void 0];
};
/** @internal */
const defaultErrorToLines = error => {
  if (error instanceof Error) {
    return renderError(error);
  }
  return [renderToString(error), void 0];
};
class RenderError {
  constructor(seq, message, stack) {
    this.seq = seq;
    this.message = message;
    this.stack = stack;
  }
}
class RenderErrorTmp {
  constructor(message, errorSack, fiberStack) {
    this.message = message;
    this.errorSack = errorSack;
    this.fiberStack = fiberStack;
  }
}
/** @internal */
const pretty = cause => {
  if (internal.isInterruptedOnly(cause)) {
    return "All fibers interrupted without errors.";
  }
  const errors = prettyErrors(cause);
  const final = Array.from(errors).sort((a, b) => a.seq === b.seq ? 0 : a.seq > b.seq ? 1 : -1).map(e => {
    let message = e.message;
    if (e.stack && e.stack.length > 0) {
      message += `\r\n${e.stack}`;
    }
    return message;
  }).join("\r\n\r\n");
  if (!final.includes("\r\n")) {
    return final;
  }
  return `\r\n${final}\r\n`;
};
/** @internal */
exports.pretty = pretty;
const prettyErrors = cause => internal.reduceWithContext(cause, void 0, {
  emptyCase: () => [],
  dieCase: (_, err) => {
    const rendered = defaultErrorToLines(err);
    return [{
      message: rendered[0],
      errorSack: rendered[1],
      fiberStack: Option.none()
    }];
  },
  failCase: (_, err) => {
    const rendered = defaultErrorToLines(err);
    return [{
      message: rendered[0],
      errorSack: rendered[1],
      fiberStack: Option.none()
    }];
  },
  interruptCase: () => [],
  parallelCase: (_, l, r) => [...l, ...r],
  sequentialCase: (_, l, r) => [...l, ...r],
  annotatedCase: (_, v, parent) => internal.isStackAnnotation(parent) ? v.map(r => ({
    message: r.message,
    errorSack: r.errorSack,
    fiberStack: Option.orElse(() => Option.some(parent))(Option.map(r.fiberStack, annotation => new internal.StackAnnotation(annotation.stack.length < Debug.runtimeDebug.traceStackLimit && parent.stack.length > 0 && (annotation.stack.length > 0 && Chunk.unsafeLast(parent.stack) !== Chunk.unsafeLast(annotation.stack) || annotation.stack.length === 0) ? Chunk.take(Debug.runtimeDebug.traceStackLimit)(Chunk.dedupeAdjacent(Chunk.concat(parent.stack)(annotation.stack))) : annotation.stack, annotation.seq)))
  })) : v
}).flatMap(r => renderFail(r.message, r.errorSack, r.fiberStack));
exports.prettyErrors = prettyErrors;
function renderFrame(r) {
  if (r) {
    if (r.name) {
      return `    at ${r.name} (${r.fileName}:${r.line}:${r.column})`;
    }
    return `    at ${r.fileName}:${r.line}:${r.column}`;
  }
  return `    at <unknown>`;
}
//# sourceMappingURL=cause-pretty.js.map