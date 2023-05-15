"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = exports.updateWith = exports.update = exports.transform = exports.orElseResult = exports.make = exports.hashSet = exports.hashMap = exports.environment = exports.chunk = exports.DifferTypeId = void 0;
var ChunkPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ/ChunkPatch"));
var ContextPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ/ContextPatch"));
var HashMapPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ/HashMapPatch"));
var HashSetPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ/HashSetPatch"));
var OrPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ/OrPatch"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const DifferTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ");
/** @internal */
exports.DifferTypeId = DifferTypeId;
class DifferImpl {
  constructor(params) {
    this._id = DifferTypeId;
    this._P = Dual.identity;
    this._V = Dual.identity;
    this.empty = params.empty;
    this.diff = params.diff;
    this.combine = params.combine;
    this.patch = params.patch;
  }
}
/** @internal */
const make = params => new DifferImpl(params);
/** @internal */
exports.make = make;
const environment = () => make({
  empty: ContextPatch.empty(),
  combine: (first, second) => ContextPatch.combine(second)(first),
  diff: (oldValue, newValue) => ContextPatch.diff(oldValue, newValue),
  patch: (patch, oldValue) => ContextPatch.patch(oldValue)(patch)
});
/** @internal */
exports.environment = environment;
const chunk = differ => make({
  empty: ChunkPatch.empty(),
  combine: (first, second) => ChunkPatch.combine(second)(first),
  diff: (oldValue, newValue) => ChunkPatch.diff(oldValue, newValue, differ),
  patch: (patch, oldValue) => ChunkPatch.patch(oldValue, differ)(patch)
});
/** @internal */
exports.chunk = chunk;
const hashMap = differ => make({
  empty: HashMapPatch.empty(),
  combine: (first, second) => HashMapPatch.combine(second)(first),
  diff: (oldValue, newValue) => HashMapPatch.diff(oldValue, newValue, differ),
  patch: (patch, oldValue) => HashMapPatch.patch(oldValue, differ)(patch)
});
/** @internal */
exports.hashMap = hashMap;
const hashSet = () => make({
  empty: HashSetPatch.empty(),
  combine: (first, second) => HashSetPatch.combine(second)(first),
  diff: (oldValue, newValue) => HashSetPatch.diff(oldValue, newValue),
  patch: (patch, oldValue) => HashSetPatch.patch(oldValue)(patch)
});
/** @internal */
exports.hashSet = hashSet;
const orElseResult = /*#__PURE__*/Dual.dual(2, (self, that) => make({
  empty: OrPatch.empty(),
  combine: (first, second) => OrPatch.combine(second)(first),
  diff: (oldValue, newValue) => OrPatch.diff(oldValue, newValue, self, that),
  patch: (patch, oldValue) => OrPatch.patch(oldValue, self, that)(patch)
}));
/** @internal */
exports.orElseResult = orElseResult;
const transform = /*#__PURE__*/Dual.dual(3, (self, f, g) => make({
  empty: self.empty,
  combine: (first, second) => self.combine(first, second),
  diff: (oldValue, newValue) => self.diff(g(oldValue), g(newValue)),
  patch: (patch, oldValue) => f(self.patch(patch, g(oldValue)))
}));
/** @internal */
exports.transform = transform;
const update = () => updateWith((_, a) => a);
/** @internal */
exports.update = update;
const updateWith = f => make({
  empty: Dual.identity,
  combine: (first, second) => {
    if (first === Dual.identity) {
      return second;
    }
    if (second === Dual.identity) {
      return first;
    }
    return a => second(first(a));
  },
  diff: (oldValue, newValue) => {
    if (Equal.equals(oldValue, newValue)) {
      return Dual.identity;
    }
    return (0, Dual.constant)(newValue);
  },
  patch: (patch, oldValue) => f(oldValue, patch(oldValue))
});
/** @internal */
exports.updateWith = updateWith;
const zip = /*#__PURE__*/Dual.dual(2, (self, that) => make({
  empty: [self.empty, that.empty],
  combine: (first, second) => [self.combine(first[0], second[0]), that.combine(first[1], second[1])],
  diff: (oldValue, newValue) => [self.diff(oldValue[0], newValue[0]), that.diff(oldValue[1], newValue[1])],
  patch: (patch, oldValue) => [self.patch(patch[0], oldValue[0]), that.patch(patch[1], oldValue[1])]
}));
exports.zip = zip;
//# sourceMappingURL=Differ.js.map