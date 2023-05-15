"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipRight = exports.zipLeft = exports.zip = exports.sync = exports.succeed = exports.stringLogger = exports.simple = exports.none = exports.map = exports.makeLogger = exports.logfmtLogger = exports.filterLogLevel = exports.contramap = exports.LoggerTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var HashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashMap"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var Pretty = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause-pretty"));
var _fiberId = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberId"));
var LogSpan = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Logger/Span"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const LoggerSymbolKey = "@effect/io/Logger";
/** @internal */
const LoggerTypeId = /*#__PURE__*/Symbol.for(LoggerSymbolKey);
/** @internal */
exports.LoggerTypeId = LoggerTypeId;
const loggerVariance = {
  _Message: _ => _,
  _Output: _ => _
};
/** @internal */
const makeLogger = log => ({
  [LoggerTypeId]: loggerVariance,
  log
});
/** @internal */
exports.makeLogger = makeLogger;
const stringLogger = /*#__PURE__*/makeLogger((fiberId, logLevel, message, cause, _context, spans, annotations) => {
  const now = new Date();
  const nowMillis = now.getTime();
  const outputArray = [`timestamp=${now.toISOString()}`, `level=${logLevel.label}`, `fiber=${_fiberId.threadName(fiberId)}`];
  let output = outputArray.join(" ");
  if (message.length > 0) {
    output = output + " message=";
    output = appendQuoted(message, output);
  }
  if (cause != null && cause != Cause.empty) {
    output = output + " cause=";
    output = appendQuoted(Pretty.pretty(cause), output);
  }
  if (Chunk.isNonEmpty(spans)) {
    output = output + " ";
    let first = true;
    for (const span of spans) {
      if (first) {
        first = false;
      } else {
        output = output + " ";
      }
      output = output + LogSpan.render(nowMillis)(span);
    }
  }
  if (HashMap.size(annotations) > 0) {
    output = output + " ";
    let first = true;
    for (const [key, value] of annotations) {
      if (first) {
        first = false;
      } else {
        output = output + " ";
      }
      output = output + filterKeyName(key);
      output = output + "=";
      output = appendQuoted(value, output);
    }
  }
  return output;
});
/** @internal */
exports.stringLogger = stringLogger;
const escapeDoubleQuotes = str => `"${str.replace(/\\([\s\S])|(")/g, "\\$1$2")}"`;
const textOnly = /^[^\s"=]+$/;
/** @internal */
const appendQuoted = (label, output) => output + (label.match(textOnly) ? label : escapeDoubleQuotes(label));
/** @internal */
const logfmtLogger = /*#__PURE__*/makeLogger((fiberId, logLevel, message, cause, _context, spans, annotations) => {
  const now = new Date();
  const nowMillis = now.getTime();
  const outputArray = [`timestamp=${now.toISOString()}`, `level=${logLevel.label}`, `fiber=${_fiberId.threadName(fiberId)}`];
  let output = outputArray.join(" ");
  if (message.length > 0) {
    output = output + " message=";
    output = appendQuotedLogfmt(message, output);
  }
  if (cause != null && cause != Cause.empty) {
    output = output + " cause=";
    output = appendQuotedLogfmt(Pretty.pretty(cause), output);
  }
  if (Chunk.isNonEmpty(spans)) {
    output = output + " ";
    let first = true;
    for (const span of spans) {
      if (first) {
        first = false;
      } else {
        output = output + " ";
      }
      output = output + renderLogSpanLogfmt(nowMillis)(span);
    }
  }
  if (HashMap.size(annotations) > 0) {
    output = output + " ";
    let first = true;
    for (const [key, value] of annotations) {
      if (first) {
        first = false;
      } else {
        output = output + " ";
      }
      output = output + filterKeyName(key);
      output = output + "=";
      output = appendQuotedLogfmt(value, output);
    }
  }
  return output;
});
/** @internal */
exports.logfmtLogger = logfmtLogger;
const filterKeyName = key => key.replace(/[\s="]/g, "_");
/** @internal */
const escapeDoubleQuotesLogfmt = str => JSON.stringify(str);
/** @internal */
const appendQuotedLogfmt = (label, output) => output + (label.match(textOnly) ? label : escapeDoubleQuotesLogfmt(label));
/** @internal */
const renderLogSpanLogfmt = now => self => {
  const label = filterKeyName(self.label);
  return `${label}=${now - self.startTime}ms`;
};
/** @internal */
const contramap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => self.log(fiberId, logLevel, restore(f)(message), cause, context, spans, annotations)));
/** @internal */
exports.contramap = contramap;
const filterLogLevel = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => restore(f)(logLevel) ? Option.some(self.log(fiberId, logLevel, message, cause, context, spans, annotations)) : Option.none()));
/** @internal */
exports.filterLogLevel = filterLogLevel;
const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => restore(f)(self.log(fiberId, logLevel, message, cause, context, spans, annotations))));
/** @internal */
exports.map = map;
const none = () => ({
  [LoggerTypeId]: loggerVariance,
  log: _Function.constVoid
});
/** @internal */
exports.none = none;
const simple = log => ({
  [LoggerTypeId]: loggerVariance,
  log: (_fiberId, _logLevel, message, _cause, _context, _spans, _annotations) => {
    return log(message);
  }
});
/** @internal */
exports.simple = simple;
const succeed = value => {
  return simple(() => value);
};
/** @internal */
exports.succeed = succeed;
const sync = evaluate => {
  return simple(evaluate);
};
/** @internal */
exports.sync = sync;
const zip = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => [self.log(fiberId, logLevel, message, cause, context, spans, annotations), that.log(fiberId, logLevel, message, cause, context, spans, annotations)]));
/** @internal */
exports.zip = zip;
const zipLeft = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => map(zip(self, that), tuple => tuple[0]));
/** @internal */
exports.zipLeft = zipLeft;
const zipRight = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => map(zip(self, that), tuple => tuple[1]));
exports.zipRight = zipRight;
//# sourceMappingURL=logger.js.map