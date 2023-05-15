import * as Chunk from "@effect/data/Chunk";
import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
/** @internal */
export const ChunkPatchTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ/ChunkPatch");
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
export const empty = () => new Empty();
/** @internal */
export const diff = (oldValue, newValue, differ) => {
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
export const combine = /*#__PURE__*/Dual.dual(2, (self, that) => new AndThen(self, that));
/** @internal */
export const patch = /*#__PURE__*/Dual.dual(3, (self, oldValue, differ) => {
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
//# sourceMappingURL=ChunkPatch.mjs.map