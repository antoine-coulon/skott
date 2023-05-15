import * as Chunk from "@effect/data/Chunk";
import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
import { ContextImpl } from "@effect/data/internal/Context";
/** @internal */
export const ContextPatchTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ/ContextPatch");
function variance(a) {
  return a;
}
/** @internal */
export class Empty {
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
export class AndThen {
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
export class AddService {
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
export class RemoveService {
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
export class UpdateService {
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
export const empty = () => new Empty();
/** @internal */
export const diff = (oldValue, newValue) => {
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
export const combine = /*#__PURE__*/Dual.dual(2, (self, that) => new AndThen(self, that));
/** @internal */
export const patch = /*#__PURE__*/Dual.dual(2, (self, context) => {
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
    return new ContextImpl(updatedContext);
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
  return new ContextImpl(map);
});
//# sourceMappingURL=ContextPatch.mjs.map