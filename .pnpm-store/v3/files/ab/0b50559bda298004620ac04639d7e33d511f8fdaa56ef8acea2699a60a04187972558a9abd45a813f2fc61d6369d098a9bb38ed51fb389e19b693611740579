import * as Chunk from "@effect/data/Chunk";
import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
import * as HashSet from "@effect/data/HashSet";
/** @internal */
export const HashSetPatchTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ/HashSetPatch");
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
export const empty = () => new Empty();
/** @internal */
export const diff = (oldValue, newValue) => {
  const [removed, patch] = HashSet.reduce([oldValue, empty()], ([set, patch], value) => {
    if (HashSet.has(value)(set)) {
      return [HashSet.remove(value)(set), patch];
    }
    return [set, combine(new Add(value))(patch)];
  })(newValue);
  return HashSet.reduce(patch, (patch, value) => combine(new Remove(value))(patch))(removed);
};
/** @internal */
export const combine = /*#__PURE__*/Dual.dual(2, (self, that) => new AndThen(self, that));
/** @internal */
export const patch = /*#__PURE__*/Dual.dual(2, (self, oldValue) => {
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
//# sourceMappingURL=HashSetPatch.mjs.map