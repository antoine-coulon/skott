"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeGet = exports.pick = exports.merge = exports.make = exports.isTag = exports.isContext = exports.getOption = exports.get = exports.empty = exports.add = exports.TagTypeId = exports.TagImpl = exports.ContextTypeId = exports.ContextImpl = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var G = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Global"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const TagTypeId = /*#__PURE__*/Symbol.for("@effect/data/Context/Tag");
/** @internal */
exports.TagTypeId = TagTypeId;
class TagImpl {
  constructor(id) {
    this._id = TagTypeId;
    this._S = _ => _;
    if (typeof id !== "undefined") {
      return G.globalValue(id, () => this);
    }
  }
}
/** @internal */
exports.TagImpl = TagImpl;
const ContextTypeId = /*#__PURE__*/Symbol.for("@effect/data/Context");
/** @internal */
exports.ContextTypeId = ContextTypeId;
class ContextImpl {
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
exports.ContextImpl = ContextImpl;
const isContext = u => typeof u === "object" && u !== null && "_id" in u && u["_id"] === ContextTypeId;
/** @internal */
exports.isContext = isContext;
const isTag = u => typeof u === "object" && u !== null && "_id" in u && u["_id"] === TagTypeId;
/** @internal */
exports.isTag = isTag;
const empty = () => new ContextImpl(new Map());
/** @internal */
exports.empty = empty;
const make = (tag, service) => new ContextImpl(new Map([[tag, service]]));
/** @internal */
exports.make = make;
const add = /*#__PURE__*/Dual.dual(3, (self, tag, service) => {
  const map = new Map(self.unsafeMap);
  map.set(tag, service);
  return new ContextImpl(map);
});
/** @internal */
exports.add = add;
const get = /*#__PURE__*/Dual.dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag)) {
    throw new Error("Service not found");
  }
  return self.unsafeMap.get(tag);
});
/** @internal */
exports.get = get;
const unsafeGet = /*#__PURE__*/Dual.dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag)) {
    throw new Error("Service not found");
  }
  return self.unsafeMap.get(tag);
});
/** @internal */
exports.unsafeGet = unsafeGet;
const getOption = /*#__PURE__*/Dual.dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag)) {
    return option.none();
  }
  return option.some(self.unsafeMap.get(tag));
});
/** @internal */
exports.getOption = getOption;
const merge = /*#__PURE__*/Dual.dual(2, (self, that) => {
  const map = new Map(self.unsafeMap);
  for (const [tag, s] of that.unsafeMap) {
    map.set(tag, s);
  }
  return new ContextImpl(map);
});
/** @internal */
exports.merge = merge;
const pick = (...tags) => self => {
  const tagSet = new Set(tags);
  const newEnv = new Map();
  for (const [tag, s] of self.unsafeMap.entries()) {
    if (tagSet.has(tag)) {
      newEnv.set(tag, s);
    }
  }
  return new ContextImpl(newEnv);
};
exports.pick = pick;
//# sourceMappingURL=Context.js.map