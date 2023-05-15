"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = exports.ChunkPatchTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const ChunkPatchTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ/ChunkPatch");
exports.ChunkPatchTypeId = ChunkPatchTypeId;
function variance(a) {
  return a;
}
class Empty {
  constructor() {
    this._tag = "Empty";
    this._Value = variance;
    this._Patch = variance;
    this._id = ChunkPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`ChunkPatch(Empty)`);
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
    this._Patch = variance;
    this._id = ChunkPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`ChunkPatch(AndThen)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.first, that.first) && Equal.equals(this.second, that.second);
  }
}
class Append {
  constructor(values) {
    this.values = values;
    this._tag = "Append";
    this._Value = variance;
    this._Patch = variance;
    this._id = ChunkPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`ChunkPatch(Append)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.values, that.values);
  }
}
class Slice {
  constructor(from, until) {
    this.from = from;
    this.until = until;
    this._tag = "Slice";
    this._Value = variance;
    this._Patch = variance;
    this._id = ChunkPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`ChunkPatch(Slice)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.from, that.from) && Equal.equals(this.until, that.until);
  }
}
class Update {
  constructor(index, patch) {
    this.index = index;
    this.patch = patch;
    this._tag = "Update";
    this._Value = variance;
    this._Patch = variance;
    this._id = ChunkPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`ChunkPatch(AndThen)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.index, that.index) && Equal.equals(this.patch, that.patch);
  }
}
/** @internal */
const empty = () => new Empty();
/** @internal */
exports.empty = empty;
const diff = (oldValue, newValue, differ) => {
  let i = 0;
  let patch = empty();
  while (i < oldValue.length && i < newValue.length) {
    const oldElement = Chunk.unsafeGet(i)(oldValue);
    const newElement = Chunk.unsafeGet(i)(newValue);
    const valuePatch = differ.diff(oldElement, newElement);
    if (!Equal.equals(valuePatch, differ.empty)) {
      patch = combine(new Update(i, valuePatch))(patch);
    }
    i = i + 1;
  }
  if (i < oldValue.length) {
    patch = combine(new Slice(0, i))(patch);
  }
  if (i < newValue.length) {
    patch = combine(new Append(Chunk.drop(i)(newValue)))(patch);
  }
  return patch;
};
/** @internal */
exports.diff = diff;
const combine = /*#__PURE__*/Dual.dual(2, (self, that) => new AndThen(self, that));
/** @internal */
exports.combine = combine;
const patch = /*#__PURE__*/Dual.dual(3, (self, oldValue, differ) => {
  let chunk = oldValue;
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
      case "Append":
        {
          chunk = Chunk.concat(head.values)(chunk);
          patches = tail;
          break;
        }
      case "Slice":
        {
          const array = Chunk.toReadonlyArray(chunk);
          chunk = Chunk.unsafeFromArray(array.slice(head.from, head.until));
          patches = tail;
          break;
        }
      case "Update":
        {
          const array = Chunk.toReadonlyArray(chunk);
          array[head.index] = differ.patch(head.patch, array[head.index]);
          chunk = Chunk.unsafeFromArray(array);
          patches = tail;
          break;
        }
    }
  }
  return chunk;
});
exports.patch = patch;
//# sourceMappingURL=ChunkPatch.js.map