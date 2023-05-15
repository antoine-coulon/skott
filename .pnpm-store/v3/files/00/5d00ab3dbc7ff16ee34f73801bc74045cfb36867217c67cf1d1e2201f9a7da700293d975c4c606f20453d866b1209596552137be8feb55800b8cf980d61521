var _a;
import * as Equal from "@effect/data/Equal";
import { dual } from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
import * as HashSet from "@effect/data/HashSet";
import * as metricKeyType from "@effect/io/internal_effect_untraced/metric/keyType";
import * as metricLabel from "@effect/io/internal_effect_untraced/metric/label";
/** @internal */
const MetricKeySymbolKey = "@effect/io/Metric/Key";
/** @internal */
export const MetricKeyTypeId = /*#__PURE__*/Symbol.for(MetricKeySymbolKey);
/** @internal */
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
export const isMetricKey = u => {
  return typeof u === "object" && u != null && MetricKeyTypeId in u;
};
/** @internal */
export const counter = name => {
  return new MetricKeyImpl(name, metricKeyType.counter);
};
/** @internal */
export const frequency = name => {
  return new MetricKeyImpl(name, metricKeyType.frequency);
};
/** @internal */
export const gauge = name => {
  return new MetricKeyImpl(name, metricKeyType.gauge);
};
/** @internal */
export const histogram = (name, boundaries) => {
  return new MetricKeyImpl(name, metricKeyType.histogram(boundaries));
};
/** @internal */
export const summary = (name, maxAge, maxSize, error, quantiles) => {
  return new MetricKeyImpl(name, metricKeyType.summary(maxAge, maxSize, error, quantiles));
};
/** @internal */
export const tagged = /*#__PURE__*/dual(3, (self, key, value) => taggedWithLabelSet(self, HashSet.make(metricLabel.make(key, value))));
/** @internal */
export const taggedWithLabels = /*#__PURE__*/dual(2, (self, extraTags) => taggedWithLabelSet(self, HashSet.fromIterable(extraTags)));
/** @internal */
export const taggedWithLabelSet = /*#__PURE__*/dual(2, (self, extraTags) => HashSet.size(extraTags) === 0 ? self : new MetricKeyImpl(self.name, self.keyType, HashSet.union(extraTags)(self.tags)));
//# sourceMappingURL=key.mjs.map