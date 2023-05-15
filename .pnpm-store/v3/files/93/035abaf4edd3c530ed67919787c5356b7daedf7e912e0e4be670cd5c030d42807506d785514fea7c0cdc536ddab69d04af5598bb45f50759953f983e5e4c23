var _a;
import * as MutableRef from "@effect/data/MutableRef";
import * as Option from "@effect/data/Option";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
/** @internal */
export const RefTypeId = /*#__PURE__*/Symbol.for("@effect/io/Ref");
/** @internal */
export const refVariance = {
  _A: _ => _
};
class RefImpl {
  constructor(ref) {
    this.ref = ref;
    this[_a] = refVariance;
  }
  modify(f) {
    return Debug.bodyWithTrace((trace, restore) => core.sync(() => {
      const current = MutableRef.get(this.ref);
      const [b, a] = restore(f)(current);
      if (current !== a) {
        MutableRef.set(a)(this.ref);
      }
      return b;
    }).traced(trace));
  }
}
_a = RefTypeId;
/** @internal */
export const unsafeMake = value => new RefImpl(MutableRef.make(value));
/** @internal */
export const make = /*#__PURE__*/Debug.methodWithTrace(trace => value => core.sync(() => unsafeMake(value)).traced(trace));
/** @internal */
export const get = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.modify(a => [a, a]).traced(trace));
/** @internal */
export const set = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => self.modify(() => [void 0, value]).traced(trace));
/** @internal */
export const getAndSet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => self.modify(a => [a, value]).traced(trace));
/** @internal */
export const getAndUpdate = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(a => [a, restore(f)(a)]).traced(trace));
/** @internal */
export const getAndUpdateSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => self.modify(value => {
  const option = restore(pf)(value);
  switch (option._tag) {
    case "None":
      {
        return [value, value];
      }
    case "Some":
      {
        return [value, option.value];
      }
  }
}).traced(trace));
/** @internal */
export const setAndGet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => self.modify(() => [value, value]).traced(trace));
/** @internal */
export const modify = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(restore(f)).traced(trace));
/** @internal */
export const modifySome = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, fallback, pf) => self.modify(value => {
  const option = restore(pf)(value);
  switch (option._tag) {
    case "None":
      {
        return [fallback, value];
      }
    case "Some":
      {
        return option.value;
      }
  }
}).traced(trace));
/** @internal */
export const update = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(a => [void 0, restore(f)(a)]).traced(trace));
/** @internal */
export const updateAndGet = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(a => {
  const result = restore(f)(a);
  return [result, result];
}).traced(trace));
/** @internal */
export const updateSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(a => [void 0, Option.match(() => a, b => b)(restore(f)(a))]).traced(trace));
/** @internal */
export const updateSomeAndGet = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => self.modify(value => {
  const option = restore(pf)(value);
  switch (option._tag) {
    case "None":
      {
        return [value, value];
      }
    case "Some":
      {
        return [option.value, option.value];
      }
  }
}).traced(trace));
/** @internal */
export const unsafeGet = self => MutableRef.get(self.ref);
//# sourceMappingURL=ref.mjs.map