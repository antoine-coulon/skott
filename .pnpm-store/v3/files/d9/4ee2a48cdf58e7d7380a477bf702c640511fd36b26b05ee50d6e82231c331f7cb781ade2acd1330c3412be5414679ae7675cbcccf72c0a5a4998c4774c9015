"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = exports.HashSetPatchTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const HashSetPatchTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ/HashSetPatch");
exports.HashSetPatchTypeId = HashSetPatchTypeId;
function variance(a) {
  return a;
}
class Empty {
  constructor() {
    this._tag = "Empty";
    this._Value = variance;
    this._id = HashSetPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`HashSetPatch(Empty)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id;
  }
}
class AndThen {
  constructor(first, second) {
    this.first = first;
    this.second = second;
    this._tag = "AndThen";
    this._Value = variance;
    this._id = HashSetPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`HashSetPatch(AndThen)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.first, that.first) && Equal.equals(this.second, that.second);
  }
}
class Add {
  constructor(value) {
    this.value = value;
    this._tag = "Add";
    this._Value = variance;
    this._id = HashSetPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`HashSetPatch(Add)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.value, that.value);
  }
}
class Remove {
  constructor(value) {
    this.value = value;
    this._tag = "Remove";
    this._Value = variance;
    this._id = HashSetPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`HashSetPatch(Remove)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.value, that.value);
  }
}
/** @internal */
const empty = () => new Empty();
/** @internal */
exports.empty = empty;
const diff = (oldValue, newValue) => {
  const [removed, patch] = HashSet.reduce([oldValue, empty()], ([set, patch], value) => {
    if (HashSet.has(value)(set)) {
      return [HashSet.remove(value)(set), patch];
    }
    return [set, combine(new Add(value))(patch)];
  })(newValue);
  return HashSet.reduce(patch, (patch, value) => combine(new Remove(value))(patch))(removed);
};
/** @internal */
exports.diff = diff;
const combine = /*#__PURE__*/Dual.dual(2, (self, that) => new AndThen(self, that));
/** @internal */
exports.combine = combine;
const patch = /*#__PURE__*/Dual.dual(2, (self, oldValue) => {
  let set = oldValue;
  let patches = Chunk.of(self);
  while (Chunk.isNonEmpty(patches)) {
    const head = Chunk.headNonEmpty(patches);
    const tail = Chunk.tailNonEmpty(patches);
    switch (head._tag) {
      case "Empty":
        {
          patches = tail;
          break;
        }
      case "AndThen":
        {
          patches = Chunk.prepend(head.first)(Chunk.prepend(head.second)(tail));
          break;
        }
      case "Add":
        {
          set = HashSet.add(head.value)(set);
          patches = tail;
          break;
        }
      case "Remove":
        {
          set = HashSet.remove(head.value)(set);
          patches = tail;
        }
    }
  }
  return set;
});
exports.patch = patch;
//# sourceMappingURL=HashSetPatch.js.map