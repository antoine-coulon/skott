"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.make = exports.get = exports.fromAcquire = exports.ScopedRefTypeId = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect"));
var circular = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect/circular"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/ref"));
var synchronized = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/synchronizedRef"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const ScopedRefSymbolKey = "@effect/io/ScopedRef";
/** @internal */
const ScopedRefTypeId = /*#__PURE__*/Symbol.for(ScopedRefSymbolKey);
/** @internal */
exports.ScopedRefTypeId = ScopedRefTypeId;
const scopedRefVariance = {
  _A: _ => _
};
/** @internal  */
const close = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(ref.get(self.ref), tuple => tuple[0].close(core.exitUnit())).traced(trace));
/** @internal */
const fromAcquire = /*#__PURE__*/Debug.methodWithTrace(trace => acquire => core.uninterruptibleMask(restore => core.flatMap(newScope => core.flatMap(value => core.flatMap(ref => {
  const scopedRef = {
    [ScopedRefTypeId]: scopedRefVariance,
    ref
  };
  return core.as(scopedRef)(fiberRuntime.addFinalizer(() => close(scopedRef)));
})(circular.makeSynchronized([newScope, value])))(core.onError(cause => newScope.close(core.exitFail(cause)))(restore(core.contramapContext(Context.add(fiberRuntime.scopeTag, newScope))(acquire)))))(fiberRuntime.scopeMake())).traced(trace));
/** @internal */
exports.fromAcquire = fromAcquire;
const get = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(tuple => tuple[1])(ref.get(self.ref)).traced(trace));
/** @internal */
exports.get = get;
const make = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => fromAcquire(core.sync(restore(evaluate))).traced(trace));
/** @internal */
exports.make = make;
const set = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, acquire) => core.flatten(synchronized.modifyEffect(self.ref, ([oldScope, value]) => core.uninterruptibleMask(restore => core.flatMap(newScope => core.flatMap(core.exitMatch(cause => core.as([core.failCause(cause), [oldScope, value]])(effect.ignore(newScope.close(core.exitUnit()))), value => core.as([core.unit(), [newScope, value]])(effect.ignore(oldScope.close(core.exitUnit())))))(core.exit(restore(core.contramapContext(Context.add(fiberRuntime.scopeTag, newScope))(acquire)))))(fiberRuntime.scopeMake())))).traced(trace));
exports.set = set;
//# sourceMappingURL=scopedRef.js.map