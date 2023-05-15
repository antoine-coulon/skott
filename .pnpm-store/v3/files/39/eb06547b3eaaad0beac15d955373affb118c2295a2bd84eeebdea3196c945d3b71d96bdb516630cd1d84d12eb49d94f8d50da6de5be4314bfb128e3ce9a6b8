"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taggedWithLabels = exports.taggedWithLabelSet = exports.tagged = exports.summary = exports.isMetricKey = exports.histogram = exports.gauge = exports.frequency = exports.counter = exports.MetricKeyTypeId = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var metricKeyType = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/keyType"));
var metricLabel = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/label"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const MetricKeySymbolKey = "@effect/io/Metric/Key";
/** @internal */
const MetricKeyTypeId = /*#__PURE__*/Symbol.for(MetricKeySymbolKey);
/** @internal */
exports.MetricKeyTypeId = MetricKeyTypeId;
const metricKeyVariance = {
  _Type: _ => _
};
/** @internal */
class MetricKeyImpl {
  constructor(name, keyType, tags = HashSet.empty()) {
    this.name = name;
    this.keyType = keyType;
    this.tags = tags;
    this[_a] = metricKeyVariance;
  }
  [(_a = MetricKeyTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.tags))(Hash.combine(Hash.hash(this.keyType))(Hash.hash(this.name)));
  }
  [Equal.symbol](u) {
    return isMetricKey(u) && this.name === u.name && Equal.equals(this.keyType, u.keyType) && Equal.equals(this.tags, u.tags);
  }
}
/** @internal */
const isMetricKey = u => {
  return typeof u === "object" && u != null && MetricKeyTypeId in u;
};
/** @internal */
exports.isMetricKey = isMetricKey;
const counter = name => {
  return new MetricKeyImpl(name, metricKeyType.counter);
};
/** @internal */
exports.counter = counter;
const frequency = name => {
  return new MetricKeyImpl(name, metricKeyType.frequency);
};
/** @internal */
exports.frequency = frequency;
const gauge = name => {
  return new MetricKeyImpl(name, metricKeyType.gauge);
};
/** @internal */
exports.gauge = gauge;
const histogram = (name, boundaries) => {
  return new MetricKeyImpl(name, metricKeyType.histogram(boundaries));
};
/** @internal */
exports.histogram = histogram;
const summary = (name, maxAge, maxSize, error, quantiles) => {
  return new MetricKeyImpl(name, metricKeyType.summary(maxAge, maxSize, error, quantiles));
};
/** @internal */
exports.summary = summary;
const tagged = /*#__PURE__*/(0, _Function.dual)(3, (self, key, value) => taggedWithLabelSet(self, HashSet.make(metricLabel.make(key, value))));
/** @internal */
exports.tagged = tagged;
const taggedWithLabels = /*#__PURE__*/(0, _Function.dual)(2, (self, extraTags) => taggedWithLabelSet(self, HashSet.fromIterable(extraTags)));
/** @internal */
exports.taggedWithLabels = taggedWithLabels;
const taggedWithLabelSet = /*#__PURE__*/(0, _Function.dual)(2, (self, extraTags) => HashSet.size(extraTags) === 0 ? self : new MetricKeyImpl(self.name, self.keyType, HashSet.union(extraTags)(self.tags)));
exports.taggedWithLabelSet = taggedWithLabelSet;
//# sourceMappingURL=key.js.map