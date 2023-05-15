import * as Context from "@effect/data/Context";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as effect from "@effect/io/internal_effect_untraced/effect";
import * as circular from "@effect/io/internal_effect_untraced/effect/circular";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as ref from "@effect/io/internal_effect_untraced/ref";
import * as synchronized from "@effect/io/internal_effect_untraced/synchronizedRef";
/** @internal */
const ScopedRefSymbolKey = "@effect/io/ScopedRef";
/** @internal */
export const ScopedRefTypeId = /*#__PURE__*/Symbol.for(ScopedRefSymbolKey);
/** @internal */
const scopedRefVariance = {
  _A: _ => _
};
/** @internal  */
const close = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(ref.get(self.ref), tuple => tuple[0].close(core.exitUnit())).traced(trace));
/** @internal */
export const fromAcquire = /*#__PURE__*/Debug.methodWithTrace(trace => acquire => core.uninterruptibleMask(restore => core.flatMap(newScope => core.flatMap(value => core.flatMap(ref => {
  const scopedRef = {
    [ScopedRefTypeId]: scopedRefVariance,
    ref
  };
  return core.as(scopedRef)(fiberRuntime.addFinalizer(() => close(scopedRef)));
})(circular.makeSynchronized([newScope, value])))(core.onError(cause => newScope.close(core.exitFail(cause)))(restore(core.contramapContext(Context.add(fiberRuntime.scopeTag, newScope))(acquire)))))(fiberRuntime.scopeMake())).traced(trace));
/** @internal */
export const get = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(tuple => tuple[1])(ref.get(self.ref)).traced(trace));
/** @internal */
export const make = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => fromAcquire(core.sync(restore(evaluate))).traced(trace));
/** @internal */
export const set = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, acquire) => core.flatten(synchronized.modifyEffect(self.ref, ([oldScope, value]) => core.uninterruptibleMask(restore => core.flatMap(newScope => core.flatMap(core.exitMatch(cause => core.as([core.failCause(cause), [oldScope, value]])(effect.ignore(newScope.close(core.exitUnit()))), value => core.as([core.unit(), [newScope, value]])(effect.ignore(oldScope.close(core.exitUnit())))))(core.exit(restore(core.contramapContext(Context.add(fiberRuntime.scopeTag, newScope))(acquire)))))(fiberRuntime.scopeMake())))).traced(trace));
//# sourceMappingURL=scopedRef.mjs.map