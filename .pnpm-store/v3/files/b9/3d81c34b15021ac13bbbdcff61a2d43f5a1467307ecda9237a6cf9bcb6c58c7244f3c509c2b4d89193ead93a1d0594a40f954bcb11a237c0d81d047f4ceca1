"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequential = exports.parallelN = exports.parallel = exports.match = exports.isSequential = exports.isParallelN = exports.isParallel = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/executionStrategy"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Execute effects sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
const sequential = internal.sequential;
/**
 * Execute effects in parallel.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.sequential = sequential;
const parallel = internal.parallel;
/**
 * Execute effects in parallel, up to the specified number of concurrent fibers.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.parallel = parallel;
const parallelN = internal.parallelN;
/**
 * Returns `true` if the specified `ExecutionStrategy` is an instance of
 * `Sequential`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.parallelN = parallelN;
const isSequential = internal.isSequential;
/**
 * Returns `true` if the specified `ExecutionStrategy` is an instance of
 * `Sequential`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isSequential = isSequential;
const isParallel = internal.isParallel;
/**
 * Returns `true` if the specified `ExecutionStrategy` is an instance of
 * `Sequential`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isParallel = isParallel;
const isParallelN = internal.isParallelN;
/**
 * Folds over the specified `ExecutionStrategy` using the provided case
 * functions.
 *
 * @since 1.0.0
 * @category folding
 */
exports.isParallelN = isParallelN;
const match = internal.match;
exports.match = match;
//# sourceMappingURL=ExecutionStrategy.js.map