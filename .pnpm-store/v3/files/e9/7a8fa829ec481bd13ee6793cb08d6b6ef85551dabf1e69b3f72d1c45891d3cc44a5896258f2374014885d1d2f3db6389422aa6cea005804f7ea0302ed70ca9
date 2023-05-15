import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import * as G from "@effect/data/Global";
import * as Hash from "@effect/data/Hash";
import * as option from "@effect/data/Option";
/** @internal */
export const TagTypeId = /*#__PURE__*/Symbol.for("@effect/data/Context/Tag");
/** @internal */
export class TagImpl {
  constructor(id) {
    this._id = TagTypeId;
    this._S = _ => _;
    if (typeof id !== "undefined") {
      return G.globalValue(id, () => this);
    }
  }
}
/** @internal */
export const ContextTypeId = /*#__PURE__*/Symbol.for("@effect/data/Context");
/** @internal */
export class ContextImpl {
  [Equal.symbol](that) {
    if (isContext(that)) {
      if (this.unsafeMap.size === that.unsafeMap.size) {
        for (const k of this.unsafeMap.keys()) {
          if (!that.unsafeMap.has(k) || !Equal.equals(this.unsafeMap.get(k), that.unsafeMap.get(k))) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }
  [Hash.symbol]() {
    return Hash.number(this.unsafeMap.size);
  }
  constructor(unsafeMap) {
    this.unsafeMap = unsafeMap;
    this._id = ContextTypeId;
    this._S = _ => _;
  }
}
/** @internal */
export const isContext = u => typeof u === "object" && u !== null && "_id" in u && u["_id"] === ContextTypeId;
/** @internal */
export const isTag = u => typeof u === "object" && u !== null && "_id" in u && u["_id"] === TagTypeId;
/** @internal */
export const empty = () => new ContextImpl(new Map());
/** @internal */
export const make = (tag, service) => new ContextImpl(new Map([[tag, service]]));
/** @internal */
export const add = /*#__PURE__*/Dual.dual(3, (self, tag, service) => {
  const map = new Map(self.unsafeMap);
  map.set(tag, service);
  return new ContextImpl(map);
});
/** @internal */
export const get = /*#__PURE__*/Dual.dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag)) {
    throw new Error("Service not found");
  }
  return self.unsafeMap.get(tag);
});
/** @internal */
export const unsafeGet = /*#__PURE__*/Dual.dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag)) {
    throw new Error("Service not found");
  }
  return self.unsafeMap.get(tag);
});
/** @internal */
export const getOption = /*#__PURE__*/Dual.dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag)) {
    return option.none();
  }
  return option.some(self.unsafeMap.get(tag));
});
/** @internal */
export const merge = /*#__PURE__*/Dual.dual(2, (self, that) => {
  const map = new Map(self.unsafeMap);
  for (const [tag, s] of that.unsafeMap) {
    map.set(tag, s);
  }
  return new ContextImpl(map);
});
/** @internal */
export const pick = (...tags) => self => {
  const tagSet = new Set(tags);
  const newEnv = new Map();
  for (const [tag, s] of self.unsafeMap.entries()) {
    if (tagSet.has(tag)) {
      newEnv.set(tag, s);
    }
  }
  return new ContextImpl(newEnv);
};
//# sourceMappingURL=Context.mjs.map