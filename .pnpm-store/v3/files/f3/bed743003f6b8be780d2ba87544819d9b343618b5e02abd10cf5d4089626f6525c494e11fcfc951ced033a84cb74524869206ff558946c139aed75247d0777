import * as Chunk from "@effect/data/Chunk";
import * as E from "@effect/data/Either";
import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
/** @internal */
export const OrPatchTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ/OrPatch");
function variance(a) {
  return a;
}
/** @internal */
export class Empty {
  constructor() {
    this._tag = "Empty";
    this._Value = variance;
    this._Value2 = variance;
    this._Patch = variance;
    this._Patch2 = variance;
    this._id = OrPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`OrPatch(Empty)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id;
  }
}
/** @internal */
export class AndThen {
  constructor(first, second) {
    this.first = first;
    this.second = second;
    this._tag = "AndThen";
    this._Value = variance;
    this._Value2 = variance;
    this._Patch = variance;
    this._Patch2 = variance;
    this._id = OrPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`OrPatch(AndThen)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.first, that.first) && Equal.equals(this.second, that.second);
  }
}
/** @internal */
export class SetLeft {
  constructor(value) {
    this.value = value;
    this._tag = "SetLeft";
    this._Value = variance;
    this._Value2 = variance;
    this._Patch = variance;
    this._Patch2 = variance;
    this._id = OrPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`OrPatch(SetLeft)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.value, that.value);
  }
}
/** @internal */
export class SetRight {
  constructor(value) {
    this.value = value;
    this._tag = "SetRight";
    this._Value = variance;
    this._Value2 = variance;
    this._Patch = variance;
    this._Patch2 = variance;
    this._id = OrPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`OrPatch(SetRight)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.value, that.value);
  }
}
/** @internal */
export class UpdateLeft {
  constructor(patch) {
    this.patch = patch;
    this._tag = "UpdateLeft";
    this._Value = variance;
    this._Value2 = variance;
    this._Patch = variance;
    this._Patch2 = variance;
    this._id = OrPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`OrPatch(UpdateLeft)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.patch, that.patch);
  }
}
/** @internal */
export class UpdateRight {
  constructor(patch) {
    this.patch = patch;
    this._tag = "UpdateRight";
    this._Value = variance;
    this._Value2 = variance;
    this._Patch = variance;
    this._Patch2 = variance;
    this._id = OrPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`OrPatch(UpdateRight)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.patch, that.patch);
  }
}
/** @internal */
export const empty = () => new Empty();
/** @internal */
export const diff = (oldValue, newValue, left, right) => {
  switch (oldValue._tag) {
    case "Left":
      {
        switch (newValue._tag) {
          case "Left":
            {
              const valuePatch = left.diff(oldValue.left, newValue.left);
              if (Equal.equals(valuePatch, left.empty)) {
                return new Empty();
              }
              return new UpdateLeft(valuePatch);
            }
          case "Right":
            {
              return new SetRight(newValue.right);
            }
        }
      }
    case "Right":
      {
        switch (newValue._tag) {
          case "Left":
            {
              return new SetLeft(newValue.left);
            }
          case "Right":
            {
              const valuePatch = right.diff(oldValue.right, newValue.right);
              if (Equal.equals(valuePatch, right.empty)) {
                return new Empty();
              }
              return new UpdateRight(valuePatch);
            }
        }
      }
  }
};
/** @internal */
export const combine = /*#__PURE__*/Dual.dual(2, (self, that) => new AndThen(self, that));
/** @internal */
export const patch = /*#__PURE__*/Dual.dual(4, (self, oldValue, left, right) => {
  let patches = Chunk.of(self);
  let result = oldValue;
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
      case "UpdateLeft":
        {
          if (result._tag === "Left") {
            result = E.left(left.patch(head.patch, result.left));
          }
          patches = tail;
          break;
        }
      case "UpdateRight":
        {
          if (result._tag === "Right") {
            result = E.right(right.patch(head.patch, result.right));
          }
          patches = tail;
          break;
        }
      case "SetLeft":
        {
          result = E.left(head.value);
          patches = tail;
          break;
        }
      case "SetRight":
        {
          result = E.right(head.value);
          patches = tail;
          break;
        }
    }
  }
  return result;
});
//# sourceMappingURL=OrPatch.mjs.map