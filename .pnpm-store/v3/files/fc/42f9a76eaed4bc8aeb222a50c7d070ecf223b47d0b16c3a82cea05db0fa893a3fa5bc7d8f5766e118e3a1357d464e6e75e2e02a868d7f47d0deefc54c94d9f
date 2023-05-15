"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAll = exports.joinAs = exports.getOrDefault = exports.get = exports.forkAs = exports.fiberRefs = exports.delete_ = exports.FiberRefsSym = exports.FiberRefsImpl = void 0;
exports.unsafeMake = unsafeMake;
exports.updatedAs = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Arr = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/ReadonlyArray"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
function unsafeMake(fiberRefLocals) {
  return new FiberRefsImpl(fiberRefLocals);
}
/** @internal */
const FiberRefsSym = /*#__PURE__*/Symbol.for("@effect/io/FiberRefs");
/** @internal */
exports.FiberRefsSym = FiberRefsSym;
class FiberRefsImpl {
  constructor(locals) {
    this.locals = locals;
    this[_a] = FiberRefsSym;
  }
}
exports.FiberRefsImpl = FiberRefsImpl;
_a = FiberRefsSym;
/** @internal */
const findAncestor = (_ref, _parentStack, _childStack, _childModified = false) => {
  const ref = _ref;
  let parentStack = _parentStack;
  let childStack = _childStack;
  let childModified = _childModified;
  let ret = undefined;
  while (ret === undefined) {
    if (Arr.isNonEmptyReadonlyArray(parentStack) && Arr.isNonEmptyReadonlyArray(childStack)) {
      const parentFiberId = Arr.headNonEmpty(parentStack)[0];
      const parentAncestors = Arr.tailNonEmpty(parentStack);
      const childFiberId = Arr.headNonEmpty(childStack)[0];
      const childRefValue = Arr.headNonEmpty(childStack)[1];
      const childAncestors = Arr.tailNonEmpty(childStack);
      if (parentFiberId.startTimeMillis < childFiberId.startTimeMillis) {
        childStack = childAncestors;
        childModified = true;
      } else if (parentFiberId.startTimeMillis > childFiberId.startTimeMillis) {
        parentStack = parentAncestors;
      } else {
        if (parentFiberId.id < childFiberId.id) {
          childStack = childAncestors;
          childModified = true;
        } else if (parentFiberId.id > childFiberId.id) {
          parentStack = parentAncestors;
        } else {
          ret = [childRefValue, childModified];
        }
      }
    } else {
      ret = [ref.initial, true];
    }
  }
  return ret;
};
/** @internal */
const joinAs = /*#__PURE__*/(0, _Function.dual)(3, (self, fiberId, that) => {
  const parentFiberRefs = new Map(self.locals);
  for (const [fiberRef, childStack] of that.locals) {
    const childValue = Arr.headNonEmpty(childStack)[1];
    if (!Equal.equals(Arr.headNonEmpty(childStack)[0], fiberId)) {
      if (!parentFiberRefs.has(fiberRef)) {
        if (Equal.equals(childValue, fiberRef.initial)) {
          continue;
        }
        parentFiberRefs.set(fiberRef, [[fiberId, fiberRef.join(fiberRef.initial, childValue)]]);
        continue;
      }
      const parentStack = parentFiberRefs.get(fiberRef);
      const [ancestor, wasModified] = findAncestor(fiberRef, parentStack, childStack);
      if (wasModified) {
        const patch = fiberRef.diff(ancestor, childValue);
        const oldValue = Arr.headNonEmpty(parentStack)[1];
        const newValue = fiberRef.join(oldValue, fiberRef.patch(patch)(oldValue));
        if (!Equal.equals(oldValue, newValue)) {
          let newStack;
          const parentFiberId = Arr.headNonEmpty(parentStack)[0];
          if (Equal.equals(parentFiberId, fiberId)) {
            newStack = Arr.prepend([parentFiberId, newValue])(Arr.tailNonEmpty(parentStack));
          } else {
            newStack = Arr.prepend([fiberId, newValue])(parentStack);
          }
          parentFiberRefs.set(fiberRef, newStack);
        }
      }
    }
  }
  return new FiberRefsImpl(new Map(parentFiberRefs));
});
/** @internal */
exports.joinAs = joinAs;
const forkAs = /*#__PURE__*/(0, _Function.dual)(2, (self, childId) => {
  const map = new Map();
  for (const [fiberRef, stack] of self.locals.entries()) {
    const oldValue = Arr.headNonEmpty(stack)[1];
    const newValue = fiberRef.patch(fiberRef.fork)(oldValue);
    if (Equal.equals(oldValue, newValue)) {
      map.set(fiberRef, stack);
    } else {
      map.set(fiberRef, Arr.prepend([childId, newValue])(stack));
    }
  }
  return new FiberRefsImpl(map);
});
/** @internal */
exports.forkAs = forkAs;
const fiberRefs = self => HashSet.fromIterable(self.locals.keys());
/** @internal */
exports.fiberRefs = fiberRefs;
const setAll = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.forEachDiscard(fiberRefs(self), fiberRef => core.fiberRefSet(fiberRef, getOrDefault(self, fiberRef))).traced(trace));
/** @internal */
exports.setAll = setAll;
const delete_ = /*#__PURE__*/(0, _Function.dual)(2, (self, fiberRef) => {
  const locals = new Map(self.locals);
  locals.delete(fiberRef);
  return new FiberRefsImpl(locals);
});
/** @internal */
exports.delete_ = delete_;
const get = /*#__PURE__*/(0, _Function.dual)(2, (self, fiberRef) => {
  if (!self.locals.has(fiberRef)) {
    return Option.none();
  }
  return Option.some(Arr.headNonEmpty(self.locals.get(fiberRef))[1]);
});
/** @internal */
exports.get = get;
const getOrDefault = /*#__PURE__*/(0, _Function.dual)(2, (self, fiberRef) => Option.getOrElse(() => fiberRef.initial)(get(self, fiberRef)));
/** @internal */
exports.getOrDefault = getOrDefault;
const updatedAs = /*#__PURE__*/(0, _Function.dual)(4, (self, fiberId, fiberRef, value) => {
  const oldStack = self.locals.has(fiberRef) ? self.locals.get(fiberRef) : Arr.empty();
  let newStack;
  if (Arr.isEmptyReadonlyArray(oldStack)) {
    newStack = Arr.of([fiberId, value]);
  } else {
    const [currentId, currentValue] = Arr.headNonEmpty(oldStack);
    if (Equal.equals(currentId, fiberId)) {
      if (Equal.equals(currentValue, value)) {
        return self;
      } else {
        newStack = Arr.prepend([fiberId, value])(Arr.tailNonEmpty(oldStack));
      }
    } else {
      newStack = Arr.prepend([fiberId, value])(oldStack);
    }
  }
  const locals = new Map(self.locals);
  return new FiberRefsImpl(locals.set(fiberRef, newStack));
});
exports.updatedAs = updatedAs;
//# sourceMappingURL=fiberRefs.js.map