"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSomeAndGet = exports.updateSome = exports.updateAndGet = exports.update = exports.unsafeMakeSupervisor = exports.unsafeMakePatch = exports.unsafeMakeHashSet = exports.unsafeMakeContext = exports.unsafeMake = exports.set = exports.reset = exports.modifySome = exports.modify = exports.makeWith = exports.makeRuntimeFlags = exports.makeContext = exports.make = exports.locallyWith = exports.locallyScopedWith = exports.locallyScoped = exports.locally = exports.interruptedCause = exports.getWith = exports.getAndUpdateSome = exports.getAndUpdate = exports.getAndSet = exports.get = exports.delete = exports.currentTags = exports.currentSupervisor = exports.currentScheduler = exports.currentRuntimeFlags = exports.currentParallelism = exports.currentMinimumLogLevel = exports.currentLoggers = exports.currentLogSpan = exports.currentLogLevel = exports.currentLogAnnotations = exports.currentContext = exports.FiberRefTypeId = void 0;
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const FiberRefTypeId = core.FiberRefTypeId;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.FiberRefTypeId = FiberRefTypeId;
const make = fiberRuntime.fiberRefMake;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.make = make;
const makeWith = fiberRuntime.fiberRefMakeWith;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.makeWith = makeWith;
const makeContext = fiberRuntime.fiberRefMakeContext;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.makeContext = makeContext;
const makeRuntimeFlags = fiberRuntime.fiberRefMakeRuntimeFlags;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.makeRuntimeFlags = makeRuntimeFlags;
const unsafeMake = core.fiberRefUnsafeMake;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.unsafeMake = unsafeMake;
const unsafeMakeHashSet = core.fiberRefUnsafeMakeHashSet;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.unsafeMakeHashSet = unsafeMakeHashSet;
const unsafeMakeContext = core.fiberRefUnsafeMakeContext;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.unsafeMakeContext = unsafeMakeContext;
const unsafeMakeSupervisor = fiberRuntime.fiberRefUnsafeMakeSupervisor;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.unsafeMakeSupervisor = unsafeMakeSupervisor;
const unsafeMakePatch = core.fiberRefUnsafeMakePatch;
/**
 * @since 1.0.0
 * @category getters
 */
exports.unsafeMakePatch = unsafeMakePatch;
const get = core.fiberRefGet;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.get = get;
const getAndSet = core.fiberRefGetAndSet;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.getAndSet = getAndSet;
const getAndUpdate = core.fiberRefGetAndUpdate;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.getAndUpdate = getAndUpdate;
const getAndUpdateSome = core.fiberRefGetAndUpdateSome;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.getAndUpdateSome = getAndUpdateSome;
const getWith = core.fiberRefGetWith;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.getWith = getWith;
const set = core.fiberRefSet;
exports.set = set;
const _delete = core.fiberRefDelete;
exports.delete = _delete;
/**
 * @since 1.0.0
 * @category mutations
 */
const reset = core.fiberRefReset;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.reset = reset;
const modify = core.fiberRefModify;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.modify = modify;
const modifySome = core.fiberRefModifySome;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.modifySome = modifySome;
const update = core.fiberRefUpdate;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.update = update;
const updateSome = core.fiberRefUpdateSome;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.updateSome = updateSome;
const updateAndGet = core.fiberRefUpdateAndGet;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.updateAndGet = updateAndGet;
const updateSomeAndGet = core.fiberRefUpdateSomeAndGet;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.updateSomeAndGet = updateSomeAndGet;
const locally = core.fiberRefLocally;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.locally = locally;
const locallyWith = core.fiberRefLocallyWith;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.locallyWith = locallyWith;
const locallyScoped = fiberRuntime.fiberRefLocallyScoped;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.locallyScoped = locallyScoped;
const locallyScopedWith = fiberRuntime.fiberRefLocallyScopedWith;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.locallyScopedWith = locallyScopedWith;
const currentContext = core.currentContext;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentContext = currentContext;
const currentLogAnnotations = core.currentLogAnnotations;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentLogAnnotations = currentLogAnnotations;
const currentLoggers = fiberRuntime.currentLoggers;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentLoggers = currentLoggers;
const currentLogLevel = core.currentLogLevel;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentLogLevel = currentLogLevel;
const currentMinimumLogLevel = fiberRuntime.currentMinimumLogLevel;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentMinimumLogLevel = currentMinimumLogLevel;
const currentLogSpan = core.currentLogSpan;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentLogSpan = currentLogSpan;
const currentRuntimeFlags = fiberRuntime.currentRuntimeFlags;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentRuntimeFlags = currentRuntimeFlags;
const currentParallelism = core.currentParallelism;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentParallelism = currentParallelism;
const currentScheduler = core.currentScheduler;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentScheduler = currentScheduler;
const currentSupervisor = fiberRuntime.currentSupervisor;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentSupervisor = currentSupervisor;
const currentTags = core.currentTags;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
exports.currentTags = currentTags;
const interruptedCause = core.interruptedCause;
exports.interruptedCause = interruptedCause;
//# sourceMappingURL=FiberRef.js.map