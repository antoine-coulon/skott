import * as Chunk from "@effect/data/Chunk";
import { constVoid, dual } from "@effect/data/Function";
import * as HashMap from "@effect/data/HashMap";
import * as Option from "@effect/data/Option";
import * as Debug from "@effect/io/Debug";
import * as Cause from "@effect/io/internal_effect_untraced/cause";
import * as Pretty from "@effect/io/internal_effect_untraced/cause-pretty";
import * as _fiberId from "@effect/io/internal_effect_untraced/fiberId";
import * as LogSpan from "@effect/io/Logger/Span";
/** @internal */
const LoggerSymbolKey = "@effect/io/Logger";
/** @internal */
export const LoggerTypeId = /*#__PURE__*/Symbol.for(LoggerSymbolKey);
/** @internal */
const loggerVariance = {
  _Message: _ => _,
  _Output: _ => _
};
/** @internal */
export const makeLogger = log => ({
  [LoggerTypeId]: loggerVariance,
  log
});
/** @internal */
export const stringLogger = /*#__PURE__*/makeLogger((fiberId, logLevel, message, cause, _context, spans, annotations) => {
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
const escapeDoubleQuotes = str => `"${str.replace(/\\([\s\S])|(")/g, "\\$1$2")}"`;
const textOnly = /^[^\s"=]+$/;
/** @internal */
const appendQuoted = (label, output) => output + (label.match(textOnly) ? label : escapeDoubleQuotes(label));
/** @internal */
export const logfmtLogger = /*#__PURE__*/makeLogger((fiberId, logLevel, message, cause, _context, spans, annotations) => {
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
export const contramap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => self.log(fiberId, logLevel, restore(f)(message), cause, context, spans, annotations)));
/** @internal */
export const filterLogLevel = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => restore(f)(logLevel) ? Option.some(self.log(fiberId, logLevel, message, cause, context, spans, annotations)) : Option.none()));
/** @internal */
export const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => restore(f)(self.log(fiberId, logLevel, message, cause, context, spans, annotations))));
/** @internal */
export const none = () => ({
  [LoggerTypeId]: loggerVariance,
  log: constVoid
});
/** @internal */
export const simple = log => ({
  [LoggerTypeId]: loggerVariance,
  log: (_fiberId, _logLevel, message, _cause, _context, _spans, _annotations) => {
    return log(message);
  }
});
/** @internal */
export const succeed = value => {
  return simple(() => value);
};
/** @internal */
export const sync = evaluate => {
  return simple(evaluate);
};
/** @internal */
export const zip = /*#__PURE__*/dual(2, (self, that) => makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => [self.log(fiberId, logLevel, message, cause, context, spans, annotations), that.log(fiberId, logLevel, message, cause, context, spans, annotations)]));
/** @internal */
export const zipLeft = /*#__PURE__*/dual(2, (self, that) => map(zip(self, that), tuple => tuple[0]));
/** @internal */
export const zipRight = /*#__PURE__*/dual(2, (self, that) => map(zip(self, that), tuple => tuple[1]));
//# sourceMappingURL=logger.mjs.map