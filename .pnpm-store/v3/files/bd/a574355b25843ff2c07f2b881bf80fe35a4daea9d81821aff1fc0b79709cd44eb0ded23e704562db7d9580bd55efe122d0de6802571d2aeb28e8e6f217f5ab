"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locally = exports.lessThanEqual = exports.lessThan = exports.greaterThanEqual = exports.greaterThan = exports.fromLiteral = exports.Warning = exports.Trace = exports.Order = exports.None = exports.Info = exports.Fatal = exports.Error = exports.Debug = exports.All = void 0;
var number = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Number"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 * @category constructors
 */
const All = core.logLevelAll;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.All = All;
const Fatal = core.logLevelFatal;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.Fatal = Fatal;
const Error = core.logLevelError;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.Error = Error;
const Warning = core.logLevelWarning;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.Warning = Warning;
const Info = core.logLevelInfo;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.Info = Info;
const Debug = core.logLevelDebug;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.Debug = Debug;
const Trace = core.logLevelTrace;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.Trace = Trace;
const None = core.logLevelNone;
/**
 * Locally applies the specified `LogLevel` to an `Effect` workflow, reverting
 * to the previous `LogLevel` after the `Effect` workflow completes.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.None = None;
const locally = /*#__PURE__*/debug.dualWithTrace(2, trace => (use, self) => core.fiberRefLocally(use, core.currentLogLevel, self).traced(trace));
/**
 * @since 1.0.0
 * @category instances
 */
exports.locally = locally;
const Order = /*#__PURE__*/order.contramap(level => level.ordinal)(number.Order);
/**
 * @since 1.0.0
 * @category ordering
 */
exports.Order = Order;
const lessThan = /*#__PURE__*/order.lessThan(Order);
/**
 * @since 1.0.0
 * @category ordering
 */
exports.lessThan = lessThan;
const lessThanEqual = /*#__PURE__*/order.lessThanOrEqualTo(Order);
/**
 * @since 1.0.0
 * @category ordering
 */
exports.lessThanEqual = lessThanEqual;
const greaterThan = /*#__PURE__*/order.greaterThan(Order);
/**
 * @since 1.0.0
 * @category ordering
 */
exports.greaterThan = greaterThan;
const greaterThanEqual = /*#__PURE__*/order.greaterThanOrEqualTo(Order);
/**
 * @since 1.0.0
 * @category conversions
 */
exports.greaterThanEqual = greaterThanEqual;
const fromLiteral = _ => {
  switch (_) {
    case "All":
      {
        return All;
      }
    case "Debug":
      {
        return Debug;
      }
    case "Error":
      {
        return Error;
      }
    case "Fatal":
      {
        return Fatal;
      }
    case "Info":
      {
        return Info;
      }
    case "Trace":
      {
        return Trace;
      }
    case "None":
      {
        return None;
      }
    case "Warning":
      {
        return Warning;
      }
  }
};
exports.fromLiteral = fromLiteral;
//# sourceMappingURL=Level.js.map