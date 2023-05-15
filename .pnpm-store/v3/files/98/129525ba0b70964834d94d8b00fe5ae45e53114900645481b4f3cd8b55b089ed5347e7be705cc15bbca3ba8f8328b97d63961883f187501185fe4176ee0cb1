import { dual } from "@effect/data/Function";
import * as HashSet from "@effect/data/HashSet";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as layer from "@effect/io/internal_effect_untraced/layer";
import * as runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags";
import * as runtimeFlagsPatch from "@effect/io/internal_effect_untraced/runtimeFlagsPatch";
import * as _supervisor from "@effect/io/internal_effect_untraced/supervisor";
// circular with Logger
/** @internal */
export const minimumLogLevel = /*#__PURE__*/Debug.untracedMethod(() => level => layer.scopedDiscard(fiberRuntime.fiberRefLocallyScoped(fiberRuntime.currentMinimumLogLevel, level)));
/** @internal */
export const withMinimumLogLevel = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, level) => core.fiberRefLocally(fiberRuntime.currentMinimumLogLevel, level)(self).traced(trace));
/** @internal */
export const addLogger = /*#__PURE__*/Debug.methodWithTrace(trace => logger => layer.scopedDiscard(fiberRuntime.fiberRefLocallyScopedWith(fiberRuntime.currentLoggers, HashSet.add(logger)).traced(trace)));
/** @internal */
export const removeLogger = /*#__PURE__*/Debug.untracedMethod(() => logger => layer.scopedDiscard(fiberRuntime.fiberRefLocallyScopedWith(fiberRuntime.currentLoggers, HashSet.remove(logger))));
/** @internal */
export const replaceLogger = /*#__PURE__*/dual(2, (self, that) => layer.flatMap(removeLogger(self), () => addLogger(that)));
/** @internal */
export const addSupervisor = /*#__PURE__*/Debug.untracedMethod(() => supervisor => layer.scopedDiscard(fiberRuntime.fiberRefLocallyScopedWith(fiberRuntime.currentSupervisor, current => new _supervisor.Zip(current, supervisor))));
/** @internal */
export const enableCooperativeYielding = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.CooperativeYielding))));
/** @internal */
export const enableInterruption = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.Interruption))));
/** @internal */
export const enableOpSupervision = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.OpSupervision))));
/** @internal */
export const enableRuntimeMetrics = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.RuntimeMetrics))));
/** @internal */
export const enableWindDown = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.WindDown))));
/** @internal */
export const disableCooperativeYielding = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.CooperativeYielding))));
/** @internal */
export const disableInterruption = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.Interruption))));
/** @internal */
export const disableOpSupervision = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.OpSupervision))));
/** @internal */
export const disableRuntimeMetrics = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.RuntimeMetrics))));
/** @internal */
export const disableWindDown = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.WindDown))));
/** @internal */
export const setConfigProvider = /*#__PURE__*/Debug.untracedMethod(() => configProvider => layer.scopedDiscard(fiberRuntime.withConfigProviderScoped(configProvider)));
//# sourceMappingURL=circular.mjs.map