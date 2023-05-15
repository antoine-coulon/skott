"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windDown = exports.toSet = exports.runtimeMetrics = exports.renderPatch = exports.render = exports.patch = exports.opSupervision = exports.none = exports.make = exports.isEnabled = exports.isDisabled = exports.interruption = exports.interruptible = exports.enabledSet = exports.enableAll = exports.enable = exports.disabledSet = exports.disableAll = exports.disable = exports.differ = exports.diff = exports.cooperativeYielding = exports.allFlags = exports.WindDown = exports.RuntimeMetrics = exports.OpSupervision = exports.None = exports.Interruption = exports.CooperativeYielding = void 0;
var Differ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var runtimeFlagsPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlagsPatch"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const None = 0;
/** @internal */
exports.None = None;
const Interruption = 1 << 0;
/** @internal */
exports.Interruption = Interruption;
const OpSupervision = 1 << 1;
/** @internal */
exports.OpSupervision = OpSupervision;
const RuntimeMetrics = 1 << 2;
/** @internal */
exports.RuntimeMetrics = RuntimeMetrics;
const WindDown = 1 << 4;
/** @internal */
exports.WindDown = WindDown;
const CooperativeYielding = 1 << 5;
/** @internal */
exports.CooperativeYielding = CooperativeYielding;
const allFlags = [None, Interruption, OpSupervision, RuntimeMetrics, WindDown, CooperativeYielding];
/** @internal */
exports.allFlags = allFlags;
const cooperativeYielding = self => isEnabled(self, CooperativeYielding);
/** @internal */
exports.cooperativeYielding = cooperativeYielding;
const disable = /*#__PURE__*/(0, _Function.dual)(2, (self, flag) => self & ~flag);
/** @internal */
exports.disable = disable;
const disableAll = /*#__PURE__*/(0, _Function.dual)(2, (self, flags) => self & ~flags);
/** @internal */
exports.disableAll = disableAll;
const enable = /*#__PURE__*/(0, _Function.dual)(2, (self, flag) => self | flag);
/** @internal */
exports.enable = enable;
const enableAll = /*#__PURE__*/(0, _Function.dual)(2, (self, flags) => self | flags);
/** @internal */
exports.enableAll = enableAll;
const interruptible = self => interruption(self) && !windDown(self);
/** @internal */
exports.interruptible = interruptible;
const interruption = self => isEnabled(self, Interruption);
/** @internal */
exports.interruption = interruption;
const isDisabled = /*#__PURE__*/(0, _Function.dual)(2, (self, flag) => !isEnabled(self, flag));
/** @internal */
exports.isDisabled = isDisabled;
const isEnabled = /*#__PURE__*/(0, _Function.dual)(2, (self, flag) => (self & flag) !== 0);
/** @internal */
exports.isEnabled = isEnabled;
const make = (...flags) => flags.reduce((a, b) => a | b, 0);
/** @internal */
exports.make = make;
const none = /*#__PURE__*/make(None);
/** @internal */
exports.none = none;
const opSupervision = self => isEnabled(self, OpSupervision);
/** @internal */
exports.opSupervision = opSupervision;
const render = self => {
  const active = [];
  allFlags.forEach(flag => {
    if (isEnabled(self, flag)) {
      active.push(`${flag}`);
    }
  });
  return `RuntimeFlags(${active.join(", ")})`;
};
/** @internal */
exports.render = render;
const runtimeMetrics = self => isEnabled(self, RuntimeMetrics);
/** @internal */
exports.runtimeMetrics = runtimeMetrics;
const toSet = self => new Set(allFlags.filter(flag => isEnabled(self, flag)));
exports.toSet = toSet;
const windDown = self => isEnabled(self, WindDown);
// circular with RuntimeFlagsPatch
/** @internal */
exports.windDown = windDown;
const enabledSet = self => toSet(runtimeFlagsPatch.active(self) & runtimeFlagsPatch.enabled(self));
/** @internal */
exports.enabledSet = enabledSet;
const disabledSet = self => toSet(runtimeFlagsPatch.active(self) & ~runtimeFlagsPatch.enabled(self));
/** @internal */
exports.disabledSet = disabledSet;
const diff = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => runtimeFlagsPatch.make(self ^ that, that));
/** @internal */
exports.diff = diff;
const patch = /*#__PURE__*/(0, _Function.dual)(2, (self, patch) => self & (runtimeFlagsPatch.invert(runtimeFlagsPatch.active(patch)) | runtimeFlagsPatch.enabled(patch)) | runtimeFlagsPatch.active(patch) & runtimeFlagsPatch.enabled(patch));
/** @internal */
exports.patch = patch;
const renderFlag = a => `${allFlags.find(b => a === b)}`;
/** @internal */
const renderPatch = self => {
  const enabled = Array.from(enabledSet(self)).map(flag => renderFlag(flag)).join(", ");
  const disabled = Array.from(disabledSet(self)).map(flag => renderFlag(flag)).join(", ");
  return `RuntimeFlagsPatch(enabled = (${enabled}), disabled = (${disabled}))`;
};
/** @internal */
exports.renderPatch = renderPatch;
const differ = () => Differ.make({
  empty: runtimeFlagsPatch.empty,
  diff: (oldValue, newValue) => diff(oldValue, newValue),
  combine: (first, second) => runtimeFlagsPatch.andThen(second)(first),
  patch: (_patch, oldValue) => patch(oldValue, _patch)
});
exports.differ = differ;
//# sourceMappingURL=runtimeFlags.js.map