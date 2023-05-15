var _a;
import * as Chunk from "@effect/data/Chunk";
import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
/** @internal */
const MetricBoundariesSymbolKey = "@effect/io/Metric/Boundaries";
/** @internal */
export const MetricBoundariesTypeId = /*#__PURE__*/Symbol.for(MetricBoundariesSymbolKey);
/** @internal */
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
export const isMetricBoundaries = u => {
  return typeof u === "object" && u != null && MetricBoundariesTypeId in u;
};
/** @internal */
export const fromChunk = chunk => {
  const values = Chunk.dedupe(Chunk.concat(Chunk.of(Number.POSITIVE_INFINITY))(chunk));
  return new MetricBoundariesImpl(values);
};
/** @internal */
export const linear = (start, width, count) => {
  return fromChunk(Chunk.map(i => start + i * width)(Chunk.range(0, count - 1)));
};
/** @internal */
export const exponential = (start, factor, count) => {
  return fromChunk(Chunk.map(i => start * Math.pow(factor, i))(Chunk.range(0, count - 1)));
};
//# sourceMappingURL=boundaries.mjs.map