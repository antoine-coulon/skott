"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traversePartitionMap = exports.traversePartition = exports.traverseFilterMap = exports.traverseFilter = void 0;
var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var filterable = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Filterable"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Returns a default binary `traversePartitionMap` implementation.
 *
 * @since 1.0.0
 */
const traversePartitionMap = T => F => (self, f) => F.map(T.traverse(F)(self, f), filterable.separate(T));
/**
 * Returns a default binary `traverseFilterMap` implementation.
 *
 * @since 1.0.0
 */
exports.traversePartitionMap = traversePartitionMap;
const traverseFilterMap = T => F => (self, f) => F.map(T.traverse(F)(self, f), filterable.compact(T));
/**
 * @since 1.0.0
 */
exports.traverseFilterMap = traverseFilterMap;
const traverseFilter = T => F => (0, _Function.dual)(2, (self, predicate) => T.traverseFilterMap(F)(self, b => F.map(predicate(b), keep => keep ? O.some(b) : O.none())));
/**
 * @since 1.0.0
 */
exports.traverseFilter = traverseFilter;
const traversePartition = T => F => (0, _Function.dual)(2, (self, predicate) => T.traversePartitionMap(F)(self, b => F.map(predicate(b), keep => keep ? E.right(b) : E.left(b))));
exports.traversePartition = traversePartition;
//# sourceMappingURL=TraversableFilterable.js.map