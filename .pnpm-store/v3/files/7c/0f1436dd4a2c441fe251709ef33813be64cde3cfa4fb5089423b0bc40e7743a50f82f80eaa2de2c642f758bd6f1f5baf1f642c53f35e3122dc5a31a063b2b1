"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summary = exports.isSummaryState = exports.isMetricState = exports.isHistogramState = exports.isGaugeState = exports.isFrequencyState = exports.isCounterState = exports.histogram = exports.gauge = exports.frequency = exports.counter = exports.SummaryStateTypeId = exports.SummaryState = exports.MetricStateTypeId = exports.HistogramStateTypeId = exports.HistogramState = exports.GaugeStateTypeId = exports.FrequencyStateTypeId = exports.CounterStateTypeId = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
/** @internal */
const MetricStateSymbolKey = "@effect/io/Metric/State";
/** @internal */
const MetricStateTypeId = /*#__PURE__*/Symbol.for(MetricStateSymbolKey);
/** @internal */
exports.MetricStateTypeId = MetricStateTypeId;
const CounterStateSymbolKey = "effect/io/Metric/State/Counter";
/** @internal */
const CounterStateTypeId = /*#__PURE__*/Symbol.for(CounterStateSymbolKey);
/** @internal */
exports.CounterStateTypeId = CounterStateTypeId;
const FrequencyStateSymbolKey = "effect/io/Metric/State/Frequency";
/** @internal */
const FrequencyStateTypeId = /*#__PURE__*/Symbol.for(FrequencyStateSymbolKey);
/** @internal */
exports.FrequencyStateTypeId = FrequencyStateTypeId;
const GaugeStateSymbolKey = "effect/io/Metric/State/Gauge";
/** @internal */
const GaugeStateTypeId = /*#__PURE__*/Symbol.for(GaugeStateSymbolKey);
/** @internal */
exports.GaugeStateTypeId = GaugeStateTypeId;
const HistogramStateSymbolKey = "effect/io/Metric/State/Histogram";
/** @internal */
const HistogramStateTypeId = /*#__PURE__*/Symbol.for(HistogramStateSymbolKey);
/** @internal */
exports.HistogramStateTypeId = HistogramStateTypeId;
const SummaryStateSymbolKey = "effect/io/Metric/State/Summary";
/** @internal */
const SummaryStateTypeId = /*#__PURE__*/Symbol.for(SummaryStateSymbolKey);
/** @internal */
exports.SummaryStateTypeId = SummaryStateTypeId;
const metricStateVariance = {
  _A: _ => _
};
/** @internal */
class CounterState {
  constructor(count) {
    this.count = count;
    this[_a] = metricStateVariance;
    this[_b] = CounterStateTypeId;
  }
  [(_a = MetricStateTypeId, _b = CounterStateTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.count))(Hash.hash(CounterStateSymbolKey));
  }
  [Equal.symbol](that) {
    return isCounterState(that) && this.count === that.count;
  }
}
/** @internal */
class FrequencyState {
  constructor(occurrences) {
    this.occurrences = occurrences;
    this[_c] = metricStateVariance;
    this[_d] = FrequencyStateTypeId;
  }
  [(_c = MetricStateTypeId, _d = FrequencyStateTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.occurrences))(Hash.hash(FrequencyStateSymbolKey));
  }
  [Equal.symbol](that) {
    return isFrequencyState(that) && Equal.equals(this.occurrences, that.occurrences);
  }
}
/** @internal */
class GaugeState {
  constructor(value) {
    this.value = value;
    this[_e] = metricStateVariance;
    this[_f] = GaugeStateTypeId;
  }
  [(_e = MetricStateTypeId, _f = GaugeStateTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.value))(Hash.hash(GaugeStateSymbolKey));
  }
  [Equal.symbol](u) {
    return isGaugeState(u) && this.value === u.value;
  }
}
/** @internal */
class HistogramState {
  constructor(buckets, count, min, max, sum) {
    this.buckets = buckets;
    this.count = count;
    this.min = min;
    this.max = max;
    this.sum = sum;
    this[_g] = metricStateVariance;
    this[_h] = HistogramStateTypeId;
  }
  [(_g = MetricStateTypeId, _h = HistogramStateTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.sum))(Hash.combine(Hash.hash(this.max))(Hash.combine(Hash.hash(this.min))(Hash.combine(Hash.hash(this.count))(Hash.combine(Hash.hash(this.buckets))(Hash.hash(HistogramStateSymbolKey))))));
  }
  [Equal.symbol](that) {
    return isHistogramState(that) && Equal.equals(this.buckets, that.buckets) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
}
/** @internal */
exports.HistogramState = HistogramState;
class SummaryState {
  constructor(error, quantiles, count, min, max, sum) {
    this.error = error;
    this.quantiles = quantiles;
    this.count = count;
    this.min = min;
    this.max = max;
    this.sum = sum;
    this[_j] = metricStateVariance;
    this[_k] = SummaryStateTypeId;
  }
  [(_j = MetricStateTypeId, _k = SummaryStateTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.sum))(Hash.combine(Hash.hash(this.max))(Hash.combine(Hash.hash(this.min))(Hash.combine(Hash.hash(this.count))(Hash.combine(Hash.hash(this.quantiles))(Hash.combine(Hash.hash(this.error))(Hash.hash(SummaryStateSymbolKey)))))));
  }
  [Equal.symbol](that) {
    return isSummaryState(that) && this.error === that.error && Equal.equals(this.quantiles, that.quantiles) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
}
/** @internal */
exports.SummaryState = SummaryState;
const counter = count => {
  return new CounterState(count);
};
/** @internal */
exports.counter = counter;
const frequency = occurrences => {
  return new FrequencyState(occurrences);
};
/** @internal */
exports.frequency = frequency;
const gauge = value => {
  return new GaugeState(value);
};
/** @internal */
exports.gauge = gauge;
const histogram = (buckets, count, min, max, sum) => {
  return new HistogramState(buckets, count, min, max, sum);
};
/** @internal */
exports.histogram = histogram;
const summary = (error, quantiles, count, min, max, sum) => {
  return new SummaryState(error, quantiles, count, min, max, sum);
};
/** @internal */
exports.summary = summary;
const isMetricState = u => {
  return typeof u === "object" && u != null && MetricStateTypeId in u;
};
/** @internal */
exports.isMetricState = isMetricState;
const isCounterState = u => {
  return typeof u === "object" && u != null && CounterStateTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.isCounterState = isCounterState;
const isFrequencyState = u => {
  return typeof u === "object" && u != null && FrequencyStateTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.isFrequencyState = isFrequencyState;
const isGaugeState = u => {
  return typeof u === "object" && u != null && GaugeStateTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.isGaugeState = isGaugeState;
const isHistogramState = u => {
  return typeof u === "object" && u != null && HistogramStateTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.isHistogramState = isHistogramState;
const isSummaryState = u => {
  return typeof u === "object" && u != null && SummaryStateTypeId in u;
};
exports.isSummaryState = isSummaryState;
//# sourceMappingURL=state.js.map