var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
/** @internal */
const MetricStateSymbolKey = "@effect/io/Metric/State";
/** @internal */
export const MetricStateTypeId = /*#__PURE__*/Symbol.for(MetricStateSymbolKey);
/** @internal */
const CounterStateSymbolKey = "effect/io/Metric/State/Counter";
/** @internal */
export const CounterStateTypeId = /*#__PURE__*/Symbol.for(CounterStateSymbolKey);
/** @internal */
const FrequencyStateSymbolKey = "effect/io/Metric/State/Frequency";
/** @internal */
export const FrequencyStateTypeId = /*#__PURE__*/Symbol.for(FrequencyStateSymbolKey);
/** @internal */
const GaugeStateSymbolKey = "effect/io/Metric/State/Gauge";
/** @internal */
export const GaugeStateTypeId = /*#__PURE__*/Symbol.for(GaugeStateSymbolKey);
/** @internal */
const HistogramStateSymbolKey = "effect/io/Metric/State/Histogram";
/** @internal */
export const HistogramStateTypeId = /*#__PURE__*/Symbol.for(HistogramStateSymbolKey);
/** @internal */
const SummaryStateSymbolKey = "effect/io/Metric/State/Summary";
/** @internal */
export const SummaryStateTypeId = /*#__PURE__*/Symbol.for(SummaryStateSymbolKey);
/** @internal */
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
export class HistogramState {
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
export class SummaryState {
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
export const counter = count => {
  return new CounterState(count);
};
/** @internal */
export const frequency = occurrences => {
  return new FrequencyState(occurrences);
};
/** @internal */
export const gauge = value => {
  return new GaugeState(value);
};
/** @internal */
export const histogram = (buckets, count, min, max, sum) => {
  return new HistogramState(buckets, count, min, max, sum);
};
/** @internal */
export const summary = (error, quantiles, count, min, max, sum) => {
  return new SummaryState(error, quantiles, count, min, max, sum);
};
/** @internal */
export const isMetricState = u => {
  return typeof u === "object" && u != null && MetricStateTypeId in u;
};
/** @internal */
export const isCounterState = u => {
  return typeof u === "object" && u != null && CounterStateTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isFrequencyState = u => {
  return typeof u === "object" && u != null && FrequencyStateTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isGaugeState = u => {
  return typeof u === "object" && u != null && GaugeStateTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isHistogramState = u => {
  return typeof u === "object" && u != null && HistogramStateTypeId in u;
};
/**
 * @since 1.0.0
 * @category refinements
 */
export const isSummaryState = u => {
  return typeof u === "object" && u != null && SummaryStateTypeId in u;
};
//# sourceMappingURL=state.mjs.map