"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = exports.UpdateService = exports.RemoveService = exports.Empty = exports.ContextPatchTypeId = exports.AndThen = exports.AddService = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var _Context = /*#__PURE__*/require("@effect/data/internal/Context");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const ContextPatchTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ/ContextPatch");
exports.ContextPatchTypeId = ContextPatchTypeId;
function variance(a) {
  return a;
}
/** @internal */
class Empty {
  constructor() {
    this._tag = "Empty";
    this._Input = variance;
    this._Output = variance;
    this._id = ContextPatchTypeId;
  }
  [Hash.symbol]() {
    return Hash.string(`ContextPatch(Empty)`);
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
    this._id = ContextPatchTypeId;
    this._Input = variance;
    this._Output = variance;
  }
  [Hash.symbol]() {
    return Hash.string(`ContextPatch(AndThen)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.first, that.first) && Equal.equals(this.second, that.second);
  }
}
/** @internal */
exports.AndThen = AndThen;
class AddService {
  constructor(tag, service) {
    this.tag = tag;
    this.service = service;
    this._tag = "AddService";
    this._id = ContextPatchTypeId;
    this._Input = variance;
    this._Output = variance;
  }
  [Hash.symbol]() {
    return Hash.string(`ContextPatch(AddService)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.tag, that.tag) && Equal.equals(this.service, that.service);
  }
}
/** @internal */
exports.AddService = AddService;
class RemoveService {
  constructor(tag) {
    this.tag = tag;
    this._tag = "RemoveService";
    this._id = ContextPatchTypeId;
    this._Input = variance;
    this._Output = variance;
  }
  [Hash.symbol]() {
    return Hash.string(`ContextPatch(RemoveService)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.tag, that.tag);
  }
}
/** @internal */
exports.RemoveService = RemoveService;
class UpdateService {
  constructor(tag, update) {
    this.tag = tag;
    this.update = update;
    this._tag = "UpdateService";
    this._id = ContextPatchTypeId;
    this._Input = variance;
    this._Output = variance;
  }
  [Hash.symbol]() {
    return Hash.string(`ContextPatch(AndThen)`);
  }
  [Equal.symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && Equal.equals(this.tag, that.tag) && Equal.equals(this.update, that.update);
  }
}
/** @internal */
exports.UpdateService = UpdateService;
const empty = () => new Empty();
/** @internal */
exports.empty = empty;
const diff = (oldValue, newValue) => {
  const missingServices = new Map(oldValue.unsafeMap);
  let patch = empty();
  for (const [tag, newService] of newValue.unsafeMap.entries()) {
    if (missingServices.has(tag)) {
      const old = missingServices.get(tag);
      missingServices.delete(tag);
      if (!Equal.equals(old, newService)) {
        patch = combine(new UpdateService(tag, () => newService))(patch);
      }
    } else {
      missingServices.delete(tag);
      patch = combine(new AddService(tag, newService))(patch);
    }
  }
  for (const [tag] of missingServices.entries()) {
    patch = combine(new RemoveService(tag))(patch);
  }
  return patch;
};
/** @internal */
exports.diff = diff;
const combine = /*#__PURE__*/Dual.dual(2, (self, that) => new AndThen(self, that));
/** @internal */
exports.combine = combine;
const patch = /*#__PURE__*/Dual.dual(2, (self, context) => {
  let wasServiceUpdated = false;
  let patches = Chunk.of(self);
  const updatedContext = new Map(context.unsafeMap);
  while (Chunk.isNonEmpty(patches)) {
    const head = Chunk.headNonEmpty(patches);
    const tail = Chunk.tailNonEmpty(patches);
    switch (head._tag) {
      case "Empty":
        {
          patches = tail;
          break;
        }
      case "AddService":
        {
          updatedContext.set(head.tag, head.service);
          patches = tail;
          break;
        }
      case "AndThen":
        {
          patches = Chunk.prepend(Chunk.prepend(tail, head.second), head.first);
          break;
        }
      case "RemoveService":
        {
          updatedContext.delete(head.tag);
          patches = tail;
          break;
        }
      case "UpdateService":
        {
          updatedContext.set(head.tag, head.update(updatedContext.get(head.tag)));
          wasServiceUpdated = true;
          patches = tail;
          break;
        }
    }
  }
  if (!wasServiceUpdated) {
    return new _Context.ContextImpl(updatedContext);
  }
  const map = new Map();
  for (const [tag] of context.unsafeMap) {
    if (updatedContext.has(tag)) {
      map.set(tag, updatedContext.get(tag));
      updatedContext.delete(tag);
    }
  }
  for (const [tag, s] of updatedContext) {
    map.set(tag, s);
  }
  return new _Context.ContextImpl(map);
});
exports.patch = patch;
//# sourceMappingURL=ContextPatch.js.map