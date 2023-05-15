import * as Context from "@effect/data/Context";
import { globalValue } from "@effect/data/Global";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as effect from "@effect/io/internal_effect_untraced/effect";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as _layer from "@effect/io/internal_effect_untraced/layer";
import * as _schedule from "@effect/io/internal_effect_untraced/schedule";
import * as scopedRef from "@effect/io/internal_effect_untraced/scopedRef";
/** @internal */
const ReloadableSymbolKey = "@effect/io/Reloadable";
/** @internal */
export const ReloadableTypeId = /*#__PURE__*/Symbol.for(ReloadableSymbolKey);
/** @internal */
const reloadableVariance = {
  _A: _ => _
};
/** @internal */
export const auto = (tag, layer, policy) => _layer.scoped(reloadableTag(tag), core.tap(reloadable => fiberRuntime.acquireRelease(fiberRuntime.forkDaemon(_schedule.schedule_Effect(policy)(effect.ignoreLogged(reloadable.reload()))), core.interruptFiber))(core.map(Context.unsafeGet(reloadableTag(tag)))(_layer.build(manual(tag, layer)))));
/** @internal */
export const autoFromConfig = (tag, layer, scheduleFromConfig) => _layer.scoped(reloadableTag(tag), core.flatMap(env => core.map(Context.unsafeGet(reloadableTag(tag)))(_layer.build(auto(tag, layer, scheduleFromConfig(env)))))(core.context()));
/** @internal */
export const get = /*#__PURE__*/Debug.methodWithTrace(trace => tag => core.serviceWithEffect(reloadableTag(tag), reloadable => scopedRef.get(reloadable.scopedRef)).traced(trace));
/** @internal */
export const manual = (tag, layer) => _layer.scoped(reloadableTag(tag), core.flatMap(env => core.map(ref => ({
  [ReloadableTypeId]: reloadableVariance,
  scopedRef: ref,
  reload: () => Debug.bodyWithTrace(trace => core.provideContext(env)(scopedRef.set(ref, core.map(Context.unsafeGet(tag))(_layer.build(layer)))).traced(trace))
}))(scopedRef.fromAcquire(core.map(Context.unsafeGet(tag))(_layer.build(layer)))))(core.context()));
/** @internal */
const tagMap = /*#__PURE__*/globalValue( /*#__PURE__*/Symbol.for("@effect/io/Reloadable/tagMap"), () => new WeakMap([]));
/** @internal */
export const reloadableTag = tag => {
  if (tagMap.has(tag)) {
    return tagMap.get(tag);
  }
  const newTag = Context.Tag();
  tagMap.set(tag, newTag);
  return newTag;
};
/** @internal */
export const reload = /*#__PURE__*/Debug.methodWithTrace(trace => tag => core.serviceWithEffect(reloadableTag(tag), reloadable => reloadable.reload()).traced(trace));
/** @internal */
export const reloadFork = /*#__PURE__*/Debug.methodWithTrace(trace => tag => core.serviceWithEffect(reloadableTag(tag), reloadable => core.asUnit(fiberRuntime.forkDaemon(effect.ignoreLogged(reloadable.reload()))).traced(trace)));
//# sourceMappingURL=reloadable.mjs.map