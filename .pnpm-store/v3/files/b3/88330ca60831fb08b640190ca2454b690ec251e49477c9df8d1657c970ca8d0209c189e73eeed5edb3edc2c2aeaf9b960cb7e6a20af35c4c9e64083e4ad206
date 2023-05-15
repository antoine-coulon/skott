"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = exports.UpdateRight = exports.UpdateLeft = exports.SetRight = exports.SetLeft = exports.OrPatchTypeId = exports.Empty = exports.AndThen = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const OrPatchTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ/OrPatch");
exports.OrPatchTypeId = OrPatchTypeId;
function variance(a) {
  return a;
}
/** @internal */
class Empty {
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
exports.Empty = Empty;
class AndThen {
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
exports.AndThen = AndThen;
class SetLeft {
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
exports.SetLeft = SetLeft;
class SetRight {
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
exports.SetRight = SetRight;
class UpdateLeft {
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
exports.UpdateLeft = UpdateLeft;
class UpdateRight {
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
exports.UpdateRight = UpdateRight;
const empty = () => new Empty();
/** @internal */
exports.empty = empty;
const diff = (oldValue, newValue, left, right) => {
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
exports.diff = diff;
const combine = /*#__PURE__*/Dual.dual(2, (self, that) => new AndThen(self, that));
/** @internal */
exports.combine = combine;
const patch = /*#__PURE__*/Dual.dual(4, (self, oldValue, left, right) => {
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
exports.patch = patch;
//# sourceMappingURL=OrPatch.js.map