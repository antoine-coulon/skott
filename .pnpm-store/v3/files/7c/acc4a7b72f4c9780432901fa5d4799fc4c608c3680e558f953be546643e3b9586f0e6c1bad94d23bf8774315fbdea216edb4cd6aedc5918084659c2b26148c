"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSomeAndGet = exports.updateSome = exports.updateAndGet = exports.update = exports.unsafeMake = exports.unsafeGet = exports.setAndGet = exports.set = exports.refVariance = exports.modifySome = exports.modify = exports.make = exports.getAndUpdateSome = exports.getAndUpdate = exports.getAndSet = exports.get = exports.RefTypeId = void 0;
var MutableRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const RefTypeId = /*#__PURE__*/Symbol.for("@effect/io/Ref");
/** @internal */
exports.RefTypeId = RefTypeId;
const refVariance = {
  _A: _ => _
};
exports.refVariance = refVariance;
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
const unsafeMake = value => new RefImpl(MutableRef.make(value));
/** @internal */
exports.unsafeMake = unsafeMake;
const make = /*#__PURE__*/Debug.methodWithTrace(trace => value => core.sync(() => unsafeMake(value)).traced(trace));
/** @internal */
exports.make = make;
const get = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.modify(a => [a, a]).traced(trace));
/** @internal */
exports.get = get;
const set = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => self.modify(() => [void 0, value]).traced(trace));
/** @internal */
exports.set = set;
const getAndSet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => self.modify(a => [a, value]).traced(trace));
/** @internal */
exports.getAndSet = getAndSet;
const getAndUpdate = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(a => [a, restore(f)(a)]).traced(trace));
/** @internal */
exports.getAndUpdate = getAndUpdate;
const getAndUpdateSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => self.modify(value => {
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
exports.getAndUpdateSome = getAndUpdateSome;
const setAndGet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => self.modify(() => [value, value]).traced(trace));
/** @internal */
exports.setAndGet = setAndGet;
const modify = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(restore(f)).traced(trace));
/** @internal */
exports.modify = modify;
const modifySome = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, fallback, pf) => self.modify(value => {
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
exports.modifySome = modifySome;
const update = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(a => [void 0, restore(f)(a)]).traced(trace));
/** @internal */
exports.update = update;
const updateAndGet = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(a => {
  const result = restore(f)(a);
  return [result, result];
}).traced(trace));
/** @internal */
exports.updateAndGet = updateAndGet;
const updateSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(a => [void 0, Option.match(() => a, b => b)(restore(f)(a))]).traced(trace));
/** @internal */
exports.updateSome = updateSome;
const updateSomeAndGet = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => self.modify(value => {
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
exports.updateSomeAndGet = updateSomeAndGet;
const unsafeGet = self => MutableRef.get(self.ref);
exports.unsafeGet = unsafeGet;
//# sourceMappingURL=ref.js.map