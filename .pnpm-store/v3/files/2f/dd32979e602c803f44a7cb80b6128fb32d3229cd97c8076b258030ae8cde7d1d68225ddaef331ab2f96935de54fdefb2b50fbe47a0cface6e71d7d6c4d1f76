"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = exports.withNow = exports.withConstantInput = exports.value = exports.update = exports.unsafeSnapshot = exports.trackSuccessWith = exports.trackSuccess = exports.trackErrorWith = exports.trackError = exports.trackDurationWith = exports.trackDuration = exports.trackDefectWith = exports.trackDefect = exports.trackAll = exports.timerWithBoundaries = exports.timer = exports.taggedWithLabelsInput = exports.taggedWithLabels = exports.tagged = exports.sync = exports.summaryTimestamp = exports.summary = exports.succeed = exports.snapshot = exports.set = exports.mapType = exports.map = exports.make = exports.incrementBy = exports.increment = exports.histogram = exports.globalMetricRegistry = exports.gauge = exports.fromMetricKey = exports.frequency = exports.counter = exports.contramap = exports.MetricTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const MetricTypeId = internal.MetricTypeId;
/**
 * @since 1.0.0
 * @category globals
 */
exports.MetricTypeId = MetricTypeId;
const globalMetricRegistry = internal.globalMetricRegistry;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.globalMetricRegistry = globalMetricRegistry;
const make = internal.make;
/**
 * Returns a new metric that is powered by this one, but which accepts updates
 * of the specified new type, which must be transformable to the input type of
 * this metric.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.make = make;
const contramap = internal.contramap;
/**
 * A counter, which can be incremented by numbers.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.contramap = contramap;
const counter = internal.counter;
/**
 * A string histogram metric, which keeps track of the counts of different
 * strings.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.counter = counter;
const frequency = internal.frequency;
/**
 * Returns a new metric that is powered by this one, but which accepts updates
 * of any type, and translates them to updates with the specified constant
 * update value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.frequency = frequency;
const withConstantInput = internal.withConstantInput;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.withConstantInput = withConstantInput;
const fromMetricKey = internal.fromMetricKey;
/**
 * A gauge, which can be set to a value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromMetricKey = fromMetricKey;
const gauge = internal.gauge;
/**
 * A numeric histogram metric, which keeps track of the count of numbers that
 * fall in bins with the specified boundaries.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.gauge = gauge;
const histogram = internal.histogram;
/**
 * @since 1.0.0
 * @category aspects
 */
exports.histogram = histogram;
const increment = internal.increment;
/**
 * @since 1.0.0
 * @category aspects
 */
exports.increment = increment;
const incrementBy = internal.incrementBy;
/**
 * Returns a new metric that is powered by this one, but which outputs a new
 * state type, determined by transforming the state type of this metric by the
 * specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.incrementBy = incrementBy;
const map = internal.map;
/**
 * @since 1.0.0
 * @category mapping
 */
exports.map = map;
const mapType = internal.mapType;
/**
 * @since 1.0.0
 * @category aspects
 */
exports.mapType = mapType;
const set = internal.set;
/**
 * Captures a snapshot of all metrics recorded by the application.
 *
 * @since 1.0.0
 * @category getters
 */
exports.set = set;
const snapshot = internal.snapshot;
/**
 * Creates a metric that ignores input and produces constant output.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.snapshot = snapshot;
const succeed = internal.succeed;
/**
 * Creates a metric that ignores input and produces constant output.
 *
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
const summary = internal.summary;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.summary = summary;
const summaryTimestamp = internal.summaryTimestamp;
/**
 * Returns a new metric, which is identical in every way to this one, except
 * the specified tags have been added to the tags of this metric.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.summaryTimestamp = summaryTimestamp;
const tagged = internal.tagged;
/**
 * Returns a new metric, which is identical in every way to this one, except
 * dynamic tags are added based on the update values. Note that the metric
 * returned by this method does not return any useful information, due to the
 * dynamic nature of the added tags.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.tagged = tagged;
const taggedWithLabelsInput = internal.taggedWithLabelsInput;
/**
 * Returns a new metric, which is identical in every way to this one, except
 * the specified tags have been added to the tags of this metric.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.taggedWithLabelsInput = taggedWithLabelsInput;
const taggedWithLabels = internal.taggedWithLabels;
/**
 * Creates a timer metric, based on a histogram, which keeps track of
 * durations in milliseconds. The unit of time will automatically be added to
 * the metric as a tag (i.e. `"time_unit: milliseconds"`).
 *
 * @since 1.0.0
 * @category constructors
 */
exports.taggedWithLabels = taggedWithLabels;
const timer = internal.timer;
/**
 * Creates a timer metric, based on a histogram created from the provided
 * boundaries, which keeps track of durations in milliseconds. The unit of time
 * will automatically be added to the metric as a tag (i.e.
 * `"time_unit: milliseconds"`).
 *
 * @since 1.0.0
 * @category constructors
 */
exports.timer = timer;
const timerWithBoundaries = internal.timerWithBoundaries;
/**
 * Returns an aspect that will update this metric with the specified constant
 * value every time the aspect is applied to an effect, regardless of whether
 * that effect fails or succeeds.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.timerWithBoundaries = timerWithBoundaries;
const trackAll = internal.trackAll;
/**
 * Returns an aspect that will update this metric with the defects of the
 * effects that it is applied to.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.trackAll = trackAll;
const trackDefect = internal.trackDefect;
/**
 * Returns an aspect that will update this metric with the result of applying
 * the specified function to the defect throwables of the effects that the
 * aspect is applied to.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.trackDefect = trackDefect;
const trackDefectWith = internal.trackDefectWith;
/**
 * Returns an aspect that will update this metric with the duration that the
 * effect takes to execute. To call this method, the input type of the metric
 * must be `Duration`.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.trackDefectWith = trackDefectWith;
const trackDuration = internal.trackDuration;
/**
 * Returns an aspect that will update this metric with the duration that the
 * effect takes to execute. To call this method, you must supply a function
 * that can convert the `Duration` to the input type of this metric.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.trackDuration = trackDuration;
const trackDurationWith = internal.trackDurationWith;
/**
 * Returns an aspect that will update this metric with the failure value of
 * the effects that it is applied to.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.trackDurationWith = trackDurationWith;
const trackError = internal.trackError;
/**
 * Returns an aspect that will update this metric with the result of applying
 * the specified function to the error value of the effects that the aspect is
 * applied to.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.trackError = trackError;
const trackErrorWith = internal.trackErrorWith;
/**
 * Returns an aspect that will update this metric with the success value of
 * the effects that it is applied to.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.trackErrorWith = trackErrorWith;
const trackSuccess = internal.trackSuccess;
/**
 * Returns an aspect that will update this metric with the result of applying
 * the specified function to the success value of the effects that the aspect is
 * applied to.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.trackSuccess = trackSuccess;
const trackSuccessWith = internal.trackSuccessWith;
/**
 * Updates the metric with the specified update message. For example, if the
 * metric were a counter, the update would increment the method by the
 * provided amount.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.trackSuccessWith = trackSuccessWith;
const update = internal.update;
/**
 * Retrieves a snapshot of the value of the metric at this moment in time.
 *
 * @since 1.0.0
 * @category getters
 */
exports.update = update;
const value = internal.value;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.value = value;
const withNow = internal.withNow;
/**
 * @since 1.0.0
 * @category zipping
 */
exports.withNow = withNow;
const zip = internal.zip;
/**
 * Unsafely captures a snapshot of all metrics recorded by the application.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.zip = zip;
const unsafeSnapshot = internal.unsafeSnapshot;
exports.unsafeSnapshot = unsafeSnapshot;
//# sourceMappingURL=Metric.js.map