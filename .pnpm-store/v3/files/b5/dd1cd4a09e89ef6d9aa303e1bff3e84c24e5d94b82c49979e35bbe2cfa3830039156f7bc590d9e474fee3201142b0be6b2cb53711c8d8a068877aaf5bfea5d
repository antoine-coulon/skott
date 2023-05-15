"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = exports.retry = exports.pollAndUpdate = exports.poll = exports.make = exports.launch = exports.collectAll = exports.PollingMetricTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/polling"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const PollingMetricTypeId = internal.PollingMetricTypeId;
/**
 * Constructs a new polling metric from a metric and poll effect.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.PollingMetricTypeId = PollingMetricTypeId;
const make = internal.make;
/**
 * Collects all of the polling metrics into a single polling metric, which
 * polls for, updates, and produces the outputs of all individual metrics.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.make = make;
const collectAll = internal.collectAll;
/**
 * Returns an effect that will launch the polling metric in a background
 * fiber, using the specified schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.collectAll = collectAll;
const launch = internal.launch;
/**
 * An effect that polls a value that may be fed to the metric.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.launch = launch;
const poll = internal.poll;
/**
 * An effect that polls for a value and uses the value to update the metric.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.poll = poll;
const pollAndUpdate = internal.pollAndUpdate;
/**
 * Returns a new polling metric whose poll function will be retried with the
 * specified retry policy.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.pollAndUpdate = pollAndUpdate;
const retry = internal.retry;
/**
 * Zips this polling metric with the specified polling metric.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retry = retry;
const zip = internal.zip;
exports.zip = zip;
//# sourceMappingURL=Polling.js.map