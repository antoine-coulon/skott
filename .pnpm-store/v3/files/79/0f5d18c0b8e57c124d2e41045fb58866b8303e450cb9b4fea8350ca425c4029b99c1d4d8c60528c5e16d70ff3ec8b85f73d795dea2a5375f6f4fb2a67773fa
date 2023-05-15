"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summary = exports.isSummaryKey = exports.isMetricKeyType = exports.isHistogramKey = exports.isGaugeKey = exports.isFrequencyKey = exports.isCounterKey = exports.histogram = exports.gauge = exports.frequency = exports.counter = exports.SummaryKeyTypeTypeId = exports.MetricKeyTypeTypeId = exports.HistogramKeyTypeTypeId = exports.HistogramKeyType = exports.GaugeKeyTypeTypeId = exports.FrequencyKeyTypeTypeId = exports.CounterKeyTypeTypeId = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
/** @internal */
const MetricKeyTypeSymbolKey = "@effect/io/Metric/KeyType";
/** @internal */
const MetricKeyTypeTypeId = /*#__PURE__*/Symbol.for(MetricKeyTypeSymbolKey);
/** @internal */
exports.MetricKeyTypeTypeId = MetricKeyTypeTypeId;
const CounterKeyTypeSymbolKey = "effect/io/Metric/KeyType/Counter";
/** @internal */
const CounterKeyTypeTypeId = /*#__PURE__*/Symbol.for(CounterKeyTypeSymbolKey);
/** @internal */
exports.CounterKeyTypeTypeId = CounterKeyTypeTypeId;
const FrequencyKeyTypeSymbolKey = "effect/io/Metric/KeyType/Frequency";
/** @internal */
const FrequencyKeyTypeTypeId = /*#__PURE__*/Symbol.for(FrequencyKeyTypeSymbolKey);
/** @internal */
exports.FrequencyKeyTypeTypeId = FrequencyKeyTypeTypeId;
const GaugeKeyTypeSymbolKey = "effect/io/Metric/KeyType/Gauge";
/** @internal */
const GaugeKeyTypeTypeId = /*#__PURE__*/Symbol.for(GaugeKeyTypeSymbolKey);
/** @internal */
exports.GaugeKeyTypeTypeId = GaugeKeyTypeTypeId;
const HistogramKeyTypeSymbolKey = "effect/io/Metric/KeyType/Histogram";
/** @internal */
const HistogramKeyTypeTypeId = /*#__PURE__*/Symbol.for(HistogramKeyTypeSymbolKey);
/** @internal */
exports.HistogramKeyTypeTypeId = HistogramKeyTypeTypeId;
const SummaryKeyTypeSymbolKey = "effect/io/Metric/KeyType/Summary";
/** @internal */
const SummaryKeyTypeTypeId = /*#__PURE__*/Symbol.for(SummaryKeyTypeSymbolKey);
/** @internal */
exports.SummaryKeyTypeTypeId = SummaryKeyTypeTypeId;
const metricKeyTypeVariance = {
  _In: _ => _,
  _Out: _ => _
};
/** @internal */
class CounterKeyType {
  constructor() {
    this[_a] = metricKeyTypeVariance;
    this[_b] = CounterKeyTypeTypeId;
  }
  [(_a = MetricKeyTypeTypeId, _b = CounterKeyTypeTypeId, Hash.symbol)]() {
    return Hash.hash(CounterKeyTypeSymbolKey);
  }
  [Equal.symbol](that) {
    return isCounterKey(that);
  }
}
/** @internal */
class FrequencyKeyType {
  constructor() {
    this[_c] = metricKeyTypeVariance;
    this[_d] = FrequencyKeyTypeTypeId;
  }
  [(_c = MetricKeyTypeTypeId, _d = FrequencyKeyTypeTypeId, Hash.symbol)]() {
    return Hash.hash(FrequencyKeyTypeSymbolKey);
  }
  [Equal.symbol](that) {
    return isFrequencyKey(that);
  }
}
/** @internal */
class GaugeKeyType {
  constructor() {
    this[_e] = metricKeyTypeVariance;
    this[_f] = GaugeKeyTypeTypeId;
  }
  [(_e = MetricKeyTypeTypeId, _f = GaugeKeyTypeTypeId, Hash.symbol)]() {
    return Hash.hash(GaugeKeyTypeSymbolKey);
  }
  [Equal.symbol](that) {
    return isGaugeKey(that);
  }
}
/**
 * @category model
 * @since 1.0.0
 */
class HistogramKeyType {
  constructor(boundaries) {
    this.boundaries = boundaries;
    this[_g] = metricKeyTypeVariance;
    this[_h] = HistogramKeyTypeTypeId;
  }
  [(_g = MetricKeyTypeTypeId, _h = HistogramKeyTypeTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.boundaries))(Hash.hash(HistogramKeyTypeSymbolKey));
  }
  [Equal.symbol](that) {
    return isHistogramKey(that) && Equal.equals(this.boundaries, that.boundaries);
  }
}
/** @internal */
exports.HistogramKeyType = HistogramKeyType;
class SummaryKeyType {
  constructor(maxAge, maxSize, error, quantiles) {
    this.maxAge = maxAge;
    this.maxSize = maxSize;
    this.error = error;
    this.quantiles = quantiles;
    this[_j] = metricKeyTypeVariance;
    this[_k] = SummaryKeyTypeTypeId;
  }
  [(_j = MetricKeyTypeTypeId, _k = SummaryKeyTypeTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.quantiles))(Hash.combine(Hash.hash(this.error))(Hash.combine(Hash.hash(this.maxSize))(Hash.combine(Hash.hash(this.maxAge))(Hash.hash(SummaryKeyTypeSymbolKey)))));
  }
  [Equal.symbol](that) {
    return isSummaryKey(that) && Equal.equals(this.maxAge, that.maxAge) && this.maxSize === that.maxSize && this.error === that.error && Equal.equals(this.quantiles, that.quantiles);
  }
}
/**
 * @since 1.0.0
 * @category constructors
 */
const counter = /*#__PURE__*/new CounterKeyType();
/**
 * @since 1.0.0
 * @category constructors
 */
exports.counter = counter;
const frequency = /*#__PURE__*/new FrequencyKeyType();
/**
 * @since 1.0.0
 * @category constructors
 */
exports.frequency = frequency;
const gauge = /*#__PURE__*/new GaugeKeyType();
/**
 * @since 1.0.0
 * @category constructors
 */
exports.gauge = gauge;
const histogram = boundaries => {
  return new HistogramKeyType(boundaries);
};
/**
 * @since 1.0.0
 * @category constructors
 */
exports.histogram = histogram;
const summary = (maxAge, maxSize, error, quantiles) => {
  return new SummaryKeyType(maxAge, maxSize, error, quantiles);
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.summary = summary;
const isMetricKeyType = u => {
  return typeof u === "object" && u != null && MetricKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.isMetricKeyType = isMetricKeyType;
const isCounterKey = u => {
  return typeof u === "object" && u != null && CounterKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.isCounterKey = isCounterKey;
const isFrequencyKey = u => {
  return typeof u === "object" && u != null && FrequencyKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.isFrequencyKey = isFrequencyKey;
const isGaugeKey = u => {
  return typeof u === "object" && u != null && GaugeKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.isGaugeKey = isGaugeKey;
const isHistogramKey = u => {
  return typeof u === "object" && u != null && HistogramKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
exports.isHistogramKey = isHistogramKey;
const isSummaryKey = u => {
  return typeof u === "object" && u != null && SummaryKeyTypeTypeId in u;
};
exports.isSummaryKey = isSummaryKey;
//# sourceMappingURL=keyType.js.map