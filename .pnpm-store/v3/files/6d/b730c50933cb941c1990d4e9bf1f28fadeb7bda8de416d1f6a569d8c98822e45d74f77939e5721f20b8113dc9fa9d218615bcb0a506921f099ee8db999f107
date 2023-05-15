/**
 * @since 1.0.0
 */

import * as number from "@effect/data/Number";
import * as order from "@effect/data/typeclass/Order";
import * as debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
/**
 * @since 1.0.0
 * @category constructors
 */
export const All = core.logLevelAll;
/**
 * @since 1.0.0
 * @category constructors
 */
export const Fatal = core.logLevelFatal;
/**
 * @since 1.0.0
 * @category constructors
 */
export const Error = core.logLevelError;
/**
 * @since 1.0.0
 * @category constructors
 */
export const Warning = core.logLevelWarning;
/**
 * @since 1.0.0
 * @category constructors
 */
export const Info = core.logLevelInfo;
/**
 * @since 1.0.0
 * @category constructors
 */
export const Debug = core.logLevelDebug;
/**
 * @since 1.0.0
 * @category constructors
 */
export const Trace = core.logLevelTrace;
/**
 * @since 1.0.0
 * @category constructors
 */
export const None = core.logLevelNone;
/**
 * Locally applies the specified `LogLevel` to an `Effect` workflow, reverting
 * to the previous `LogLevel` after the `Effect` workflow completes.
 *
 * @since 1.0.0
 * @category mutations
 */
export const locally = /*#__PURE__*/debug.dualWithTrace(2, trace => (use, self) => core.fiberRefLocally(use, core.currentLogLevel, self).traced(trace));
/**
 * @since 1.0.0
 * @category instances
 */
export const Order = /*#__PURE__*/order.contramap(level => level.ordinal)(number.Order);
/**
 * @since 1.0.0
 * @category ordering
 */
export const lessThan = /*#__PURE__*/order.lessThan(Order);
/**
 * @since 1.0.0
 * @category ordering
 */
export const lessThanEqual = /*#__PURE__*/order.lessThanOrEqualTo(Order);
/**
 * @since 1.0.0
 * @category ordering
 */
export const greaterThan = /*#__PURE__*/order.greaterThan(Order);
/**
 * @since 1.0.0
 * @category ordering
 */
export const greaterThanEqual = /*#__PURE__*/order.greaterThanOrEqualTo(Order);
/**
 * @since 1.0.0
 * @category conversions
 */
export const fromLiteral = _ => {
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
//# sourceMappingURL=Level.mjs.map