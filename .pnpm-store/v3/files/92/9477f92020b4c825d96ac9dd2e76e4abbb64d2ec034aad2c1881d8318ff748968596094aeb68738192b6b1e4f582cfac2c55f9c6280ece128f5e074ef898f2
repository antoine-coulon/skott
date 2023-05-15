var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
/** @internal */
const MetricKeyTypeSymbolKey = "@effect/io/Metric/KeyType";
/** @internal */
export const MetricKeyTypeTypeId = /*#__PURE__*/Symbol.for(MetricKeyTypeSymbolKey);
/** @internal */
const CounterKeyTypeSymbolKey = "effect/io/Metric/KeyType/Counter";
/** @internal */
export const CounterKeyTypeTypeId = /*#__PURE__*/Symbol.for(CounterKeyTypeSymbolKey);
/** @internal */
const FrequencyKeyTypeSymbolKey = "effect/io/Metric/KeyType/Frequency";
/** @internal */
export const FrequencyKeyTypeTypeId = /*#__PURE__*/Symbol.for(FrequencyKeyTypeSymbolKey);
/** @internal */
const GaugeKeyTypeSymbolKey = "effect/io/Metric/KeyType/Gauge";
/** @internal */
export const GaugeKeyTypeTypeId = /*#__PURE__*/Symbol.for(GaugeKeyTypeSymbolKey);
/** @internal */
const HistogramKeyTypeSymbolKey = "effect/io/Metric/KeyType/Histogram";
/** @internal */
export const HistogramKeyTypeTypeId = /*#__PURE__*/Symbol.for(HistogramKeyTypeSymbolKey);
/** @internal */
const SummaryKeyTypeSymbolKey = "effect/io/Metric/KeyType/Summary";
/** @internal */
export const SummaryKeyTypeTypeId = /*#__PURE__*/Symbol.for(SummaryKeyTypeSymbolKey);
/** @internal */
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
export class HistogramKeyType {
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
export const counter = /*#__PURE__*/new CounterKeyType();
/**
 * @since 1.0.0
 * @category constructors
 */
export const frequency = /*#__PURE__*/new FrequencyKeyType();
/**
 * @since 1.0.0
 * @category constructors
 */
export const gauge = /*#__PURE__*/new GaugeKeyType();
/**
 * @since 1.0.0
 * @category constructors
 */
export const histogram = boundaries => {
  return new HistogramKeyType(boundaries);
};
/**
 * @since 1.0.0
 * @category constructors
 */
export const summary = (maxAge, maxSize, error, quantiles) => {
  return new SummaryKeyType(maxAge, maxSize, error, quantiles);
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isMetricKeyType = u => {
  return typeof u === "object" && u != null && MetricKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isCounterKey = u => {
  return typeof u === "object" && u != null && CounterKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isFrequencyKey = u => {
  return typeof u === "object" && u != null && FrequencyKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isGaugeKey = u => {
  return typeof u === "object" && u != null && GaugeKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isHistogramKey = u => {
  return typeof u === "object" && u != null && HistogramKeyTypeTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isSummaryKey = u => {
  return typeof u === "object" && u != null && SummaryKeyTypeTypeId in u;
};
//# sourceMappingURL=keyType.mjs.map