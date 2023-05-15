"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeMake = exports.unsafeDone = exports.sync = exports.succeed = exports.poll = exports.makeAs = exports.make = exports.isDone = exports.interruptWith = exports.interrupt = exports.failSync = exports.failCauseSync = exports.failCause = exports.fail = exports.done = exports.dieSync = exports.die = exports.completeWith = exports.complete = exports.await = exports.DeferredTypeId = void 0;
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/deferred"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const DeferredTypeId = internal.DeferredTypeId;
/**
 * Creates a new `Deferred`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.DeferredTypeId = DeferredTypeId;
const make = core.deferredMake;
/**
 * Creates a new `Deferred` from the specified `FiberId`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.make = make;
const makeAs = core.deferredMakeAs;
exports.makeAs = makeAs;
const _await = core.deferredAwait;
exports.await = _await;
/**
 * Completes the deferred with the result of the specified effect. If the
 * deferred has already been completed, the method will produce false.
 *
 * Note that `Deferred.completeWith` will be much faster, so consider using
 * that if you do not need to memoize the result of the specified effect.
 *
 * @since 1.0.0
 * @category mutations
 */
const complete = core.deferredComplete;
/**
 * Completes the deferred with the result of the specified effect. If the
 * deferred has already been completed, the method will produce false.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.complete = complete;
const completeWith = core.deferredCompleteWith;
/**
 * Exits the `Deferred` with the specified `Exit` value, which will be
 * propagated to all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.completeWith = completeWith;
const done = core.deferredDone;
/**
 * Fails the `Deferred` with the specified error, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.done = done;
const fail = core.deferredFail;
/**
 * Fails the `Deferred` with the specified error, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.fail = fail;
const failSync = core.deferredFailSync;
/**
 * Fails the `Deferred` with the specified `Cause`, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.failSync = failSync;
const failCause = core.deferredFailCause;
/**
 * Fails the `Deferred` with the specified `Cause`, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.failCause = failCause;
const failCauseSync = core.deferredFailCauseSync;
/**
 * Kills the `Deferred` with the specified defect, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.failCauseSync = failCauseSync;
const die = core.deferredDie;
/**
 * Kills the `Deferred` with the specified defect, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.die = die;
const dieSync = core.deferredDieSync;
/**
 * Completes the `Deferred` with interruption. This will interrupt all fibers
 * waiting on the value of the `Deferred` with the `FiberId` of the fiber
 * calling this method.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.dieSync = dieSync;
const interrupt = core.deferredInterrupt;
/**
 * Completes the `Deferred` with interruption. This will interrupt all fibers
 * waiting on the value of the `Deferred` with the specified `FiberId`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.interrupt = interrupt;
const interruptWith = core.deferredInterruptWith;
/**
 * Returns `true` if this `Deferred` has already been completed with a value or
 * an error, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.interruptWith = interruptWith;
const isDone = core.deferredIsDone;
/**
 * Returns a `Some<Effect<R, E, A>>` from the `Deferred` if this `Deferred` has
 * already been completed, `None` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isDone = isDone;
const poll = core.deferredPoll;
/**
 * Completes the `Deferred` with the specified value.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.poll = poll;
const succeed = core.deferredSucceed;
/**
 * Completes the `Deferred` with the specified lazily evaluated value.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.succeed = succeed;
const sync = core.deferredSync;
/**
 * Unsafely creates a new `Deferred` from the specified `FiberId`.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.sync = sync;
const unsafeMake = core.deferredUnsafeMake;
/**
 * Unsafely exits the `Deferred` with the specified `Exit` value, which will be
 * propagated to all fibers waiting on the value of the `Deferred`.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.unsafeMake = unsafeMake;
const unsafeDone = core.deferredUnsafeDone;
exports.unsafeDone = unsafeDone;
//# sourceMappingURL=Deferred.js.map