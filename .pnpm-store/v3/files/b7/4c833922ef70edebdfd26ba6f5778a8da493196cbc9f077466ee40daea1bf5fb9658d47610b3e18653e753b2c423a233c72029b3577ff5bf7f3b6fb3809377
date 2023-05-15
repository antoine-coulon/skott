"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taggedWithLabels = exports.taggedWithLabelSet = exports.tagged = exports.summary = exports.isMetricKey = exports.histogram = exports.gauge = exports.frequency = exports.counter = exports.MetricKeyTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/key"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const MetricKeyTypeId = internal.MetricKeyTypeId;
/**
 * @since 1.0.0
 * @category refinements
 */
exports.MetricKeyTypeId = MetricKeyTypeId;
const isMetricKey = internal.isMetricKey;
/**
 * Creates a metric key for a counter, with the specified name.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.isMetricKey = isMetricKey;
const counter = internal.counter;
/**
 * Creates a metric key for a categorical frequency table, with the specified
 * name.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.counter = counter;
const frequency = internal.frequency;
/**
 * Creates a metric key for a gauge, with the specified name.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.frequency = frequency;
const gauge = internal.gauge;
/**
 * Creates a metric key for a histogram, with the specified name and boundaries.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.gauge = gauge;
const histogram = internal.histogram;
/**
 * Creates a metric key for a summary, with the specified name, maxAge,
 * maxSize, error, and quantiles.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.histogram = histogram;
const summary = internal.summary;
/**
 * Returns a new `MetricKey` with the specified tag appended.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.summary = summary;
const tagged = internal.tagged;
/**
 * Returns a new `MetricKey` with the specified tags appended.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.tagged = tagged;
const taggedWithLabels = internal.taggedWithLabels;
/**
 * Returns a new `MetricKey` with the specified tags appended.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.taggedWithLabels = taggedWithLabels;
const taggedWithLabelSet = internal.taggedWithLabelSet;
exports.taggedWithLabelSet = taggedWithLabelSet;
//# sourceMappingURL=Key.js.map