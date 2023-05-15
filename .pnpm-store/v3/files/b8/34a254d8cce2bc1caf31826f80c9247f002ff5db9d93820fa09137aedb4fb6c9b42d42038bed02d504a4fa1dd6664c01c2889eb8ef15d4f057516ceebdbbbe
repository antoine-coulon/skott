"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = exports.HashMapPatchTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var HashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashMap"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const HashMapPatchTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ/HashMapPatch");
exports.HashMapPatchTypeId = HashMapPatchTypeId;
function variance(a) {
  return a;
}
class Empty {
  constructor() {
    this._tag = "Empty";
    this._Key = variance;
    this._Value = variance;
    this._Patch = variance;
    this._id = HashMapPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`HashMapPatch(Empty)`);
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
    this._Key = variance;
    this._Value = variance;
    this._Patch = variance;
    this._id = HashMapPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`HashMapPatch(AndThen)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.first, that.first) && Equal.equals(this.second, that.second);
  }
}
class Add {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this._tag = "Add";
    this._Key = variance;
    this._Value = variance;
    this._Patch = variance;
    this._id = HashMapPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`HashMapPatch(Add)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.key, that.key) && Equal.equals(this.value, that.value);
  }
}
class Remove {
  constructor(key) {
    this.key = key;
    this._tag = "Remove";
    this._Key = variance;
    this._Value = variance;
    this._Patch = variance;
    this._id = HashMapPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`HashMapPatch(Remove)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.key, that.key);
  }
}
class Update {
  constructor(key, patch) {
    this.key = key;
    this.patch = patch;
    this._tag = "Update";
    this._Key = variance;
    this._Value = variance;
    this._Patch = variance;
    this._id = HashMapPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`HashMapPatch(Update)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.key, that.key) && Equal.equals(this.patch, that.patch);
  }
}
/** @internal */
const empty = () => new Empty();
/** @internal */
exports.empty = empty;
const diff = (oldValue, newValue, differ) => {
  const [removed, patch] = HashMap.reduceWithIndex([oldValue, empty()], ([map, patch], newValue, key) => {
    const option = HashMap.get(key)(map);
    switch (option._tag) {
      case "Some":
        {
          const valuePatch = differ.diff(option.value, newValue);
          if (Equal.equals(valuePatch, differ.empty)) {
            return [HashMap.remove(key)(map), patch];
          }
          return [HashMap.remove(key)(map), combine(new Update(key, valuePatch))(patch)];
        }
      case "None":
        {
          return [map, combine(new Add(key, newValue))(patch)];
        }
    }
  })(newValue);
  return HashMap.reduceWithIndex(patch, (patch, _, key) => combine(new Remove(key))(patch))(removed);
};
/** @internal */
exports.diff = diff;
const combine = /*#__PURE__*/Dual.dual(2, (self, that) => new AndThen(self, that));
/** @internal */
exports.combine = combine;
const patch = /*#__PURE__*/Dual.dual(3, (self, oldValue, differ) => {
  let map = oldValue;
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
          map = HashMap.set(head.key, head.value)(map);
          patches = tail;
          break;
        }
      case "Remove":
        {
          map = HashMap.remove(head.key)(map);
          patches = tail;
          break;
        }
      case "Update":
        {
          const option = HashMap.get(head.key)(map);
          if (option._tag === "Some") {
            map = HashMap.set(head.key, differ.patch(head.patch, option.value))(map);
          }
          patches = tail;
          break;
        }
    }
  }
  return map;
});
exports.patch = patch;
//# sourceMappingURL=HashMapPatch.js.map