var _a;
import * as HashSet from "@effect/data/HashSet";
import * as MutableHashMap from "@effect/data/MutableHashMap";
import * as Option from "@effect/data/Option";
import * as metricHook from "@effect/io/internal_effect_untraced/metric/hook";
import * as metricKeyType from "@effect/io/internal_effect_untraced/metric/keyType";
import * as metricPair from "@effect/io/internal_effect_untraced/metric/pair";
/** @internal */
const MetricRegistrySymbolKey = "@effect/io/Metric/Registry";
/** @internal */
export const MetricRegistryTypeId = /*#__PURE__*/Symbol.for(MetricRegistrySymbolKey);
/** @internal */
class MetricRegistryImpl {
  constructor() {
    this[_a] = MetricRegistryTypeId;
    this.map = MutableHashMap.empty();
  }
  snapshot() {
    const result = [];
    for (const [key, hook] of this.map) {
      result.push(metricPair.unsafeMake(key, hook.get()));
    }
    return HashSet.fromIterable(result);
  }
  get(key) {
    const hook = Option.getOrUndefined(MutableHashMap.get(key)(this.map));
    if (hook == null) {
      if (metricKeyType.isCounterKey(key.keyType)) {
        return this.getCounter(key);
      }
      if (metricKeyType.isGaugeKey(key.keyType)) {
        return this.getGauge(key);
      }
      if (metricKeyType.isFrequencyKey(key.keyType)) {
        return this.getFrequency(key);
      }
      if (metricKeyType.isHistogramKey(key.keyType)) {
        return this.getHistogram(key);
      }
      if (metricKeyType.isSummaryKey(key.keyType)) {
        return this.getSummary(key);
      }
      throw new Error("BUG: MetricRegistry.get - unknown MetricKeyType - please report an issue at https://github.com/Effect-TS/io/issues");
    } else {
      return hook;
    }
  }
  getCounter(key) {
    let value = Option.getOrUndefined(MutableHashMap.get(key)(this.map));
    if (value == null) {
      const counter = metricHook.counter(key);
      if (!MutableHashMap.has(key)(this.map)) {
        MutableHashMap.set(key, counter)(this.map);
      }
      value = counter;
    }
    return value;
  }
  getFrequency(key) {
    let value = Option.getOrUndefined(MutableHashMap.get(key)(this.map));
    if (value == null) {
      const frequency = metricHook.frequency(key);
      if (!MutableHashMap.has(key)(this.map)) {
        MutableHashMap.set(key, frequency)(this.map);
      }
      value = frequency;
    }
    return value;
  }
  getGauge(key) {
    let value = Option.getOrUndefined(MutableHashMap.get(key)(this.map));
    if (value == null) {
      const gauge = metricHook.gauge(key, 0);
      if (!MutableHashMap.has(key)(this.map)) {
        MutableHashMap.set(key, gauge)(this.map);
      }
      value = gauge;
    }
    return value;
  }
  getHistogram(key) {
    let value = Option.getOrUndefined(MutableHashMap.get(key)(this.map));
    if (value == null) {
      const histogram = metricHook.histogram(key);
      if (!MutableHashMap.has(key)(this.map)) {
        MutableHashMap.set(key, histogram)(this.map);
      }
      value = histogram;
    }
    return value;
  }
  getSummary(key) {
    let value = Option.getOrUndefined(MutableHashMap.get(key)(this.map));
    if (value == null) {
      const summary = metricHook.summary(key);
      if (!MutableHashMap.has(key)(this.map)) {
        MutableHashMap.set(key, summary)(this.map);
      }
      value = summary;
    }
    return value;
  }
}
_a = MetricRegistryTypeId;
/** @internal */
export const make = () => {
  return new MetricRegistryImpl();
};
//# sourceMappingURL=registry.mjs.map