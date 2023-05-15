var _a;
import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
/** @internal */
const MetricLabelSymbolKey = "@effect/io/Metric/Label";
/** @internal */
export const MetricLabelTypeId = /*#__PURE__*/Symbol.for(MetricLabelSymbolKey);
/** @internal */
class MetricLabelImpl {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this[_a] = MetricLabelTypeId;
  }
  [(_a = MetricLabelTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.value))(Hash.combine(Hash.hash(this.key))(Hash.hash(MetricLabelSymbolKey)));
  }
  [Equal.symbol](that) {
    return isMetricLabel(that) && this.key === that.key && this.value === that.value;
  }
}
/** @internal */
export const make = (key, value) => {
  return new MetricLabelImpl(key, value);
};
/** @internal */
export const isMetricLabel = u => {
  return typeof u === "object" && u != null && MetricLabelTypeId in u;
};
//# sourceMappingURL=label.mjs.map