import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as _schedule from "@effect/io/internal_effect_untraced/schedule";
import * as scopedRef from "@effect/io/internal_effect_untraced/scopedRef";
/** @internal */
const CachedSymbolKey = "@effect/io/Cached";
/** @internal */
export const CachedTypeId = /*#__PURE__*/Symbol.for(CachedSymbolKey);
/** @internal */
const cachedVariance = {
  _E: _ => _,
  _A: _ => _
};
/** @internal */
export const auto = /*#__PURE__*/Debug.methodWithTrace(trace => (acquire, policy) => core.tap(manual(acquire), manual => fiberRuntime.acquireRelease(fiberRuntime.forkDaemon(core.interruptible(_schedule.schedule_Effect(policy)(refresh(manual)))), core.interruptFiber)).traced(trace));
/** @internal */
export const manual = /*#__PURE__*/Debug.methodWithTrace(trace => acquire => core.flatMap(core.context(), env => core.map(ref => ({
  [CachedTypeId]: cachedVariance,
  scopedRef: ref,
  acquire: () => Debug.bodyWithTrace(trace => core.provideContext(acquire, env).traced(trace))
}))(scopedRef.fromAcquire(core.exit(acquire)))).traced(trace));
/** @internal */
export const get = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(scopedRef.get(self.scopedRef), core.done).traced(trace));
export const refresh = /*#__PURE__*/Debug.methodWithTrace(trace => self => scopedRef.set(self.scopedRef, core.map(core.exitSucceed)(self.acquire())).traced(trace));
//# sourceMappingURL=cached.mjs.map