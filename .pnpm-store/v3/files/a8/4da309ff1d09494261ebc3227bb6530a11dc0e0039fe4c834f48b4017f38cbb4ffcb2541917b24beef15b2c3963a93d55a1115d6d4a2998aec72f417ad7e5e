"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequential = exports.parallelN = exports.parallel = exports.match = exports.isSequential = exports.isParallelN = exports.isParallel = exports.OP_SEQUENTIAL = exports.OP_PARALLEL_N = exports.OP_PARALLEL = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/** @internal */
const OP_SEQUENTIAL = "Sequential";
/** @internal */
exports.OP_SEQUENTIAL = OP_SEQUENTIAL;
const OP_PARALLEL = "Parallel";
/** @internal */
exports.OP_PARALLEL = OP_PARALLEL;
const OP_PARALLEL_N = "ParallelN";
/** @internal */
exports.OP_PARALLEL_N = OP_PARALLEL_N;
const sequential = {
  _tag: OP_SEQUENTIAL
};
/** @internal */
exports.sequential = sequential;
const parallel = {
  _tag: OP_PARALLEL
};
/** @internal */
exports.parallel = parallel;
const parallelN = parallelism => {
  return {
    _tag: OP_PARALLEL_N,
    parallelism
  };
};
/** @internal */
exports.parallelN = parallelN;
const isSequential = self => {
  return self._tag === OP_SEQUENTIAL;
};
/** @internal */
exports.isSequential = isSequential;
const isParallel = self => {
  return self._tag === OP_PARALLEL;
};
/** @internal */
exports.isParallel = isParallel;
const isParallelN = self => {
  return self._tag === OP_PARALLEL_N;
};
/** @internal */
exports.isParallelN = isParallelN;
const match = /*#__PURE__*/(0, _Function.dual)(4, (self, onSequential, onParallel, onParallelN) => {
  switch (self._tag) {
    case OP_SEQUENTIAL:
      {
        return onSequential();
      }
    case OP_PARALLEL:
      {
        return onParallel();
      }
    case OP_PARALLEL_N:
      {
        return onParallelN(self.parallelism);
      }
  }
});
exports.match = match;
//# sourceMappingURL=executionStrategy.js.map