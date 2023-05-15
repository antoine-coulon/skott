"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refresh = exports.manual = exports.get = exports.auto = exports.CachedTypeId = void 0;
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var _schedule = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/schedule"));
var scopedRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/scopedRef"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const CachedSymbolKey = "@effect/io/Cached";
/** @internal */
const CachedTypeId = /*#__PURE__*/Symbol.for(CachedSymbolKey);
/** @internal */
exports.CachedTypeId = CachedTypeId;
const cachedVariance = {
  _E: _ => _,
  _A: _ => _
};
/** @internal */
const auto = /*#__PURE__*/Debug.methodWithTrace(trace => (acquire, policy) => core.tap(manual(acquire), manual => fiberRuntime.acquireRelease(fiberRuntime.forkDaemon(core.interruptible(_schedule.schedule_Effect(policy)(refresh(manual)))), core.interruptFiber)).traced(trace));
/** @internal */
exports.auto = auto;
const manual = /*#__PURE__*/Debug.methodWithTrace(trace => acquire => core.flatMap(core.context(), env => core.map(ref => ({
  [CachedTypeId]: cachedVariance,
  scopedRef: ref,
  acquire: () => Debug.bodyWithTrace(trace => core.provideContext(acquire, env).traced(trace))
}))(scopedRef.fromAcquire(core.exit(acquire)))).traced(trace));
/** @internal */
exports.manual = manual;
const get = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(scopedRef.get(self.scopedRef), core.done).traced(trace));
exports.get = get;
const refresh = /*#__PURE__*/Debug.methodWithTrace(trace => self => scopedRef.set(self.scopedRef, core.map(core.exitSucceed)(self.acquire())).traced(trace));
exports.refresh = refresh;
//# sourceMappingURL=cached.js.map