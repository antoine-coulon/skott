"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.separate = exports.partitionMapComposition = exports.partition = exports.filterMapComposition = exports.filter = exports.compact = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/Either"));
var option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/Option"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Returns a default binary `partitionMap` composition.
 *
 * @since 1.0.0
 */
const partitionMapComposition = (F, G) => (self, f) => {
  const filterMap = filterMapComposition(F, G);
  return [filterMap(self, a => either.getLeft(f(a))), filterMap(self, a => either.getRight(f(a)))];
};
/**
 * Returns a default binary `filterMap` composition.
 *
 * @since 1.0.0
 */
exports.partitionMapComposition = partitionMapComposition;
const filterMapComposition = (F, G) => (self, f) => F.map(self, G.filterMap(f));
/**
 * @since 1.0.0
 */
exports.filterMapComposition = filterMapComposition;
const compact = F => F.filterMap(_Function.identity);
/**
 * @since 1.0.0
 */
exports.compact = compact;
const separate = F => F.partitionMap(_Function.identity);
/**
 * @since 1.0.0
 */
exports.separate = separate;
const filter = Filterable => (0, _Function.dual)(2, (self, predicate) => Filterable.filterMap(self, b => predicate(b) ? option.some(b) : option.none));
/**
 * @since 1.0.0
 */
exports.filter = filter;
const partition = F => (0, _Function.dual)(2, (self, predicate) => F.partitionMap(self, b => predicate(b) ? either.right(b) : either.left(b)));
exports.partition = partition;
//# sourceMappingURL=Filterable.js.map