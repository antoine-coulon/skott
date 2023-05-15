"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = exports.MetricRegistryTypeId = void 0;
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var MutableHashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableHashMap"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var metricHook = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/hook"));
var metricKeyType = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/keyType"));
var metricPair = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/pair"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const MetricRegistrySymbolKey = "@effect/io/Metric/Registry";
/** @internal */
const MetricRegistryTypeId = /*#__PURE__*/Symbol.for(MetricRegistrySymbolKey);
/** @internal */
exports.MetricRegistryTypeId = MetricRegistryTypeId;
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
const make = () => {
  return new MetricRegistryImpl();
};
exports.make = make;
//# sourceMappingURL=registry.js.map