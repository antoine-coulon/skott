"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linear = exports.isMetricBoundaries = exports.fromChunk = exports.exponential = exports.MetricBoundariesTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const MetricBoundariesSymbolKey = "@effect/io/Metric/Boundaries";
/** @internal */
const MetricBoundariesTypeId = /*#__PURE__*/Symbol.for(MetricBoundariesSymbolKey);
/** @internal */
exports.MetricBoundariesTypeId = MetricBoundariesTypeId;
class MetricBoundariesImpl {
  constructor(values) {
    this.values = values;
    this[_a] = MetricBoundariesTypeId;
  }
  [(_a = MetricBoundariesTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.values))(Hash.hash(MetricBoundariesSymbolKey));
  }
  [Equal.symbol](u) {
    return isMetricBoundaries(u) && Equal.equals(this.values, u.values);
  }
}
/** @internal */
const isMetricBoundaries = u => {
  return typeof u === "object" && u != null && MetricBoundariesTypeId in u;
};
/** @internal */
exports.isMetricBoundaries = isMetricBoundaries;
const fromChunk = chunk => {
  const values = Chunk.dedupe(Chunk.concat(Chunk.of(Number.POSITIVE_INFINITY))(chunk));
  return new MetricBoundariesImpl(values);
};
/** @internal */
exports.fromChunk = fromChunk;
const linear = (start, width, count) => {
  return fromChunk(Chunk.map(i => start + i * width)(Chunk.range(0, count - 1)));
};
/** @internal */
exports.linear = linear;
const exponential = (start, factor, count) => {
  return fromChunk(Chunk.map(i => start * Math.pow(factor, i))(Chunk.range(0, count - 1)));
};
exports.exponential = exponential;
//# sourceMappingURL=boundaries.js.map