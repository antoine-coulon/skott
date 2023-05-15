import * as Differ from "@effect/data/Differ";
import { dual } from "@effect/data/Function";
import * as runtimeFlagsPatch from "@effect/io/internal_effect_untraced/runtimeFlagsPatch";
/** @internal */
export const None = 0;
/** @internal */
export const Interruption = 1 << 0;
/** @internal */
export const OpSupervision = 1 << 1;
/** @internal */
export const RuntimeMetrics = 1 << 2;
/** @internal */
export const WindDown = 1 << 4;
/** @internal */
export const CooperativeYielding = 1 << 5;
/** @internal */
export const allFlags = [None, Interruption, OpSupervision, RuntimeMetrics, WindDown, CooperativeYielding];
/** @internal */
export const cooperativeYielding = self => isEnabled(self, CooperativeYielding);
/** @internal */
export const disable = /*#__PURE__*/dual(2, (self, flag) => self & ~flag);
/** @internal */
export const disableAll = /*#__PURE__*/dual(2, (self, flags) => self & ~flags);
/** @internal */
export const enable = /*#__PURE__*/dual(2, (self, flag) => self | flag);
/** @internal */
export const enableAll = /*#__PURE__*/dual(2, (self, flags) => self | flags);
/** @internal */
export const interruptible = self => interruption(self) && !windDown(self);
/** @internal */
export const interruption = self => isEnabled(self, Interruption);
/** @internal */
export const isDisabled = /*#__PURE__*/dual(2, (self, flag) => !isEnabled(self, flag));
/** @internal */
export const isEnabled = /*#__PURE__*/dual(2, (self, flag) => (self & flag) !== 0);
/** @internal */
export const make = (...flags) => flags.reduce((a, b) => a | b, 0);
/** @internal */
export const none = /*#__PURE__*/make(None);
/** @internal */
export const opSupervision = self => isEnabled(self, OpSupervision);
/** @internal */
export const render = self => {
  const active = [];
  allFlags.forEach(flag => {
    if (isEnabled(self, flag)) {
      active.push(`${flag}`);
    }
  });
  return `RuntimeFlags(${active.join(", ")})`;
};
/** @internal */
export const runtimeMetrics = self => isEnabled(self, RuntimeMetrics);
/** @internal */
export const toSet = self => new Set(allFlags.filter(flag => isEnabled(self, flag)));
export const windDown = self => isEnabled(self, WindDown);
// circular with RuntimeFlagsPatch
/** @internal */
export const enabledSet = self => toSet(runtimeFlagsPatch.active(self) & runtimeFlagsPatch.enabled(self));
/** @internal */
export const disabledSet = self => toSet(runtimeFlagsPatch.active(self) & ~runtimeFlagsPatch.enabled(self));
/** @internal */
export const diff = /*#__PURE__*/dual(2, (self, that) => runtimeFlagsPatch.make(self ^ that, that));
/** @internal */
export const patch = /*#__PURE__*/dual(2, (self, patch) => self & (runtimeFlagsPatch.invert(runtimeFlagsPatch.active(patch)) | runtimeFlagsPatch.enabled(patch)) | runtimeFlagsPatch.active(patch) & runtimeFlagsPatch.enabled(patch));
/** @internal */
const renderFlag = a => `${allFlags.find(b => a === b)}`;
/** @internal */
export const renderPatch = self => {
  const enabled = Array.from(enabledSet(self)).map(flag => renderFlag(flag)).join(", ");
  const disabled = Array.from(disabledSet(self)).map(flag => renderFlag(flag)).join(", ");
  return `RuntimeFlagsPatch(enabled = (${enabled}), disabled = (${disabled}))`;
};
/** @internal */
export const differ = () => Differ.make({
  empty: runtimeFlagsPatch.empty,
  diff: (oldValue, newValue) => diff(oldValue, newValue),
  combine: (first, second) => runtimeFlagsPatch.andThen(second)(first),
  patch: (_patch, oldValue) => patch(oldValue, _patch)
});
//# sourceMappingURL=runtimeFlags.mjs.map