"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipRight = exports.zipLeft = exports.zip = exports.withMinimumLogLevel = exports.test = exports.sync = exports.succeed = exports.stringLogger = exports.simple = exports.replace = exports.remove = exports.none = exports.minimumLogLevel = exports.map = exports.make = exports.logfmtLogger = exports.logFmt = exports.filterLogLevel = exports.defaultLogger = exports.contramap = exports.add = exports.LoggerTypeId = void 0;
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var circular = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/layer/circular"));
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/logger"));
var internalCircular = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/logger-circular"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const LoggerTypeId = internal.LoggerTypeId;
/**
 * @category constructors
 * @since 1.0.0
 */
exports.LoggerTypeId = LoggerTypeId;
const make = internal.makeLogger;
/**
 * @since 1.0.0
 * @category context
 */
exports.make = make;
const add = circular.addLogger;
/**
 * @since 1.0.0
 * @category mapping
 */
exports.add = add;
const contramap = internal.contramap;
/**
 * Returns a version of this logger that only logs messages when the log level
 * satisfies the specified predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.contramap = contramap;
const filterLogLevel = internal.filterLogLevel;
/**
 * @since 1.0.0
 * @category mapping
 */
exports.filterLogLevel = filterLogLevel;
const map = internal.map;
/**
 * A logger that does nothing in response to logging events.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.map = map;
const none = internal.none;
/**
 * @since 1.0.0
 * @category context
 */
exports.none = none;
const remove = circular.removeLogger;
/**
 * @since 1.0.0
 * @category context
 */
exports.remove = remove;
const replace = circular.replaceLogger;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.replace = replace;
const simple = internal.simple;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.simple = simple;
const succeed = internal.succeed;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.succeed = succeed;
const sync = internal.sync;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.sync = sync;
const test = internalCircular.test;
/**
 * @since 1.0.0
 * @category context
 */
exports.test = test;
const withMinimumLogLevel = circular.withMinimumLogLevel;
/**
 * Combines this logger with the specified logger to produce a new logger that
 * logs to both this logger and that logger.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.withMinimumLogLevel = withMinimumLogLevel;
const zip = internal.zip;
/**
 * @since 1.0.0
 * @category zipping
 */
exports.zip = zip;
const zipLeft = internal.zipLeft;
/**
 * @since 1.0.0
 * @category zipping
 */
exports.zipLeft = zipLeft;
const zipRight = internal.zipRight;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.zipRight = zipRight;
const defaultLogger = fiberRuntime.defaultLogger;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.defaultLogger = defaultLogger;
const logfmtLogger = internal.logfmtLogger;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.logfmtLogger = logfmtLogger;
const stringLogger = internal.stringLogger;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.stringLogger = stringLogger;
const logFmt = /*#__PURE__*/replace(fiberRuntime.defaultLogger, fiberRuntime.logFmtLogger);
/**
 * @since 1.0.0
 * @category context
 */
exports.logFmt = logFmt;
const minimumLogLevel = circular.minimumLogLevel;
exports.minimumLogLevel = minimumLogLevel;
//# sourceMappingURL=Logger.js.map