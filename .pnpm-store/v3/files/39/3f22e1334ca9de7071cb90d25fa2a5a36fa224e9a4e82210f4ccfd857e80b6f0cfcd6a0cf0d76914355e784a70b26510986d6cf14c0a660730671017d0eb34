var _a;
import * as Equal from "@effect/data/Equal";
import { dual } from "@effect/data/Function";
import * as HashSet from "@effect/data/HashSet";
import * as Option from "@effect/data/Option";
import * as Arr from "@effect/data/ReadonlyArray";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
/** @internal */
export function unsafeMake(fiberRefLocals) {
  return new FiberRefsImpl(fiberRefLocals);
}
/** @internal */
export const FiberRefsSym = /*#__PURE__*/Symbol.for("@effect/io/FiberRefs");
/** @internal */
export class FiberRefsImpl {
  constructor(locals) {
    this.locals = locals;
    this[_a] = FiberRefsSym;
  }
}
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
export const joinAs = /*#__PURE__*/dual(3, (self, fiberId, that) => {
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
export const forkAs = /*#__PURE__*/dual(2, (self, childId) => {
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
export const fiberRefs = self => HashSet.fromIterable(self.locals.keys());
/** @internal */
export const setAll = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.forEachDiscard(fiberRefs(self), fiberRef => core.fiberRefSet(fiberRef, getOrDefault(self, fiberRef))).traced(trace));
/** @internal */
export const delete_ = /*#__PURE__*/dual(2, (self, fiberRef) => {
  const locals = new Map(self.locals);
  locals.delete(fiberRef);
  return new FiberRefsImpl(locals);
});
/** @internal */
export const get = /*#__PURE__*/dual(2, (self, fiberRef) => {
  if (!self.locals.has(fiberRef)) {
    return Option.none();
  }
  return Option.some(Arr.headNonEmpty(self.locals.get(fiberRef))[1]);
});
/** @internal */
export const getOrDefault = /*#__PURE__*/dual(2, (self, fiberRef) => Option.getOrElse(() => fiberRef.initial)(get(self, fiberRef)));
/** @internal */
export const updatedAs = /*#__PURE__*/dual(4, (self, fiberId, fiberRef, value) => {
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
//# sourceMappingURL=fiberRefs.mjs.map