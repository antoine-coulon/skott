"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeMake = exports.make = exports.MetricPairTypeId = void 0;
/** @internal */
const MetricPairSymbolKey = "@effect/io/Metric/Pair";
/** @internal */
const MetricPairTypeId = /*#__PURE__*/Symbol.for(MetricPairSymbolKey);
/** @internal */
exports.MetricPairTypeId = MetricPairTypeId;
const metricPairVariance = {
  _Type: _ => _
};
/** @internal */
const make = (metricKey, metricState) => {
  return {
    [MetricPairTypeId]: metricPairVariance,
    metricKey,
    metricState
  };
};
/** @internal */
exports.make = make;
const unsafeMake = (metricKey, metricState) => {
  return {
    [MetricPairTypeId]: metricPairVariance,
    metricKey,
    metricState
  };
};
exports.unsafeMake = unsafeMake;
//# sourceMappingURL=pair.js.map