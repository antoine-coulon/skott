"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withMinimumLogLevel = exports.setConfigProvider = exports.replaceLogger = exports.removeLogger = exports.minimumLogLevel = exports.enableWindDown = exports.enableRuntimeMetrics = exports.enableOpSupervision = exports.enableInterruption = exports.enableCooperativeYielding = exports.disableWindDown = exports.disableRuntimeMetrics = exports.disableOpSupervision = exports.disableInterruption = exports.disableCooperativeYielding = exports.addSupervisor = exports.addLogger = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var layer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/layer"));
var runtimeFlags = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlags"));
var runtimeFlagsPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlagsPatch"));
var _supervisor = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/supervisor"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// circular with Logger
/** @internal */
const minimumLogLevel = /*#__PURE__*/Debug.untracedMethod(() => level => layer.scopedDiscard(fiberRuntime.fiberRefLocallyScoped(fiberRuntime.currentMinimumLogLevel, level)));
/** @internal */
exports.minimumLogLevel = minimumLogLevel;
const withMinimumLogLevel = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, level) => core.fiberRefLocally(fiberRuntime.currentMinimumLogLevel, level)(self).traced(trace));
/** @internal */
exports.withMinimumLogLevel = withMinimumLogLevel;
const addLogger = /*#__PURE__*/Debug.methodWithTrace(trace => logger => layer.scopedDiscard(fiberRuntime.fiberRefLocallyScopedWith(fiberRuntime.currentLoggers, HashSet.add(logger)).traced(trace)));
/** @internal */
exports.addLogger = addLogger;
const removeLogger = /*#__PURE__*/Debug.untracedMethod(() => logger => layer.scopedDiscard(fiberRuntime.fiberRefLocallyScopedWith(fiberRuntime.currentLoggers, HashSet.remove(logger))));
/** @internal */
exports.removeLogger = removeLogger;
const replaceLogger = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => layer.flatMap(removeLogger(self), () => addLogger(that)));
/** @internal */
exports.replaceLogger = replaceLogger;
const addSupervisor = /*#__PURE__*/Debug.untracedMethod(() => supervisor => layer.scopedDiscard(fiberRuntime.fiberRefLocallyScopedWith(fiberRuntime.currentSupervisor, current => new _supervisor.Zip(current, supervisor))));
/** @internal */
exports.addSupervisor = addSupervisor;
const enableCooperativeYielding = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.CooperativeYielding))));
/** @internal */
exports.enableCooperativeYielding = enableCooperativeYielding;
const enableInterruption = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.Interruption))));
/** @internal */
exports.enableInterruption = enableInterruption;
const enableOpSupervision = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.OpSupervision))));
/** @internal */
exports.enableOpSupervision = enableOpSupervision;
const enableRuntimeMetrics = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.RuntimeMetrics))));
/** @internal */
exports.enableRuntimeMetrics = enableRuntimeMetrics;
const enableWindDown = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.enable(runtimeFlags.WindDown))));
/** @internal */
exports.enableWindDown = enableWindDown;
const disableCooperativeYielding = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.CooperativeYielding))));
/** @internal */
exports.disableCooperativeYielding = disableCooperativeYielding;
const disableInterruption = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.Interruption))));
/** @internal */
exports.disableInterruption = disableInterruption;
const disableOpSupervision = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.OpSupervision))));
/** @internal */
exports.disableOpSupervision = disableOpSupervision;
const disableRuntimeMetrics = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.RuntimeMetrics))));
/** @internal */
exports.disableRuntimeMetrics = disableRuntimeMetrics;
const disableWindDown = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scopedDiscard(fiberRuntime.withRuntimeFlagsScoped(runtimeFlagsPatch.disable(runtimeFlags.WindDown))));
/** @internal */
exports.disableWindDown = disableWindDown;
const setConfigProvider = /*#__PURE__*/Debug.untracedMethod(() => configProvider => layer.scopedDiscard(fiberRuntime.withConfigProviderScoped(configProvider)));
exports.setConfigProvider = setConfigProvider;
//# sourceMappingURL=circular.js.map