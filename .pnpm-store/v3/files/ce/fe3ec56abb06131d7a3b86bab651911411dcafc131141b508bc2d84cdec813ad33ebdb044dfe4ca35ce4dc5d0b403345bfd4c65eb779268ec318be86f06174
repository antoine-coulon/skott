import { dual } from "@effect/data/Function";
/** @internal */
export const OP_SEQUENTIAL = "Sequential";
/** @internal */
export const OP_PARALLEL = "Parallel";
/** @internal */
export const OP_PARALLEL_N = "ParallelN";
/** @internal */
export const sequential = {
  _tag: OP_SEQUENTIAL
};
/** @internal */
export const parallel = {
  _tag: OP_PARALLEL
};
/** @internal */
export const parallelN = parallelism => {
  return {
    _tag: OP_PARALLEL_N,
    parallelism
  };
};
/** @internal */
export const isSequential = self => {
  return self._tag === OP_SEQUENTIAL;
};
/** @internal */
export const isParallel = self => {
  return self._tag === OP_PARALLEL;
};
/** @internal */
export const isParallelN = self => {
  return self._tag === OP_PARALLEL_N;
};
/** @internal */
export const match = /*#__PURE__*/dual(4, (self, onSequential, onParallel, onParallelN) => {
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
//# sourceMappingURL=executionStrategy.mjs.map