"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = exports.zipRight = exports.zipLeft = exports.zip = exports.unsafeRoots = exports.unit = exports.succeed = exports.status = exports.scoped = exports.roots = exports.pretty = exports.poll = exports.orElseEither = exports.orElse = exports.never = exports.match = exports.mapFiber = exports.mapEffect = exports.map = exports.joinAll = exports.join = exports.isRuntimeFiber = exports.isFiber = exports.interrupted = exports.interruptFork = exports.interruptAsFork = exports.interruptAs = exports.interruptAllAs = exports.interruptAll = exports.interrupt = exports.inheritAll = exports.id = exports.getCurrentFiber = exports.fromEffect = exports.failCause = exports.fail = exports.dumpAll = exports.dump = exports.done = exports.collectAll = exports.children = exports.awaitAll = exports.await = exports.RuntimeFiberTypeId = exports.Order = exports.FiberTypeId = void 0;
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var circular = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect/circular"));
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiber"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const FiberTypeId = internal.FiberTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.FiberTypeId = FiberTypeId;
const RuntimeFiberTypeId = internal.RuntimeFiberTypeId;
/**
 * @since 1.0.0
 * @category instances
 */
exports.RuntimeFiberTypeId = RuntimeFiberTypeId;
const Order = internal.Order;
/**
 * Returns `true` if the specified value is a `Fiber`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.Order = Order;
const isFiber = internal.isFiber;
/**
 * Returns `true` if the specified `Fiber` is a `RuntimeFiber`, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isFiber = isFiber;
const isRuntimeFiber = internal.isRuntimeFiber;
/**
 * The identity of the fiber.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isRuntimeFiber = isRuntimeFiber;
const id = internal.id;
exports.id = id;
const _await = internal._await;
exports.await = _await;
/**
 * Awaits on all fibers to be completed, successfully or not.
 *
 * @since 1.0.0
 * @category destructors
 */
const awaitAll = fiberRuntime.fiberAwaitAll;
/**
 * Retrieves the immediate children of the fiber.
 *
 * @since 1.0.0
 * @category getters
 */
exports.awaitAll = awaitAll;
const children = internal.children;
/**
 * Collects all fibers into a single fiber producing an in-order list of the
 * results.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.children = children;
const collectAll = fiberRuntime.fiberCollectAll;
/**
 * A fiber that is done with the specified `Exit` value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAll = collectAll;
const done = internal.done;
/**
 * @since 1.0.0
 * @category destructors
 */
exports.done = done;
const dump = internal.dump;
/**
 * @since 1.0.0
 * @category destructors
 */
exports.dump = dump;
const dumpAll = internal.dumpAll;
/**
 * A fiber that has already failed with the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.dumpAll = dumpAll;
const fail = internal.fail;
/**
 * Creates a `Fiber` that has already failed with the specified cause.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fail = fail;
const failCause = internal.failCause;
/**
 * Lifts an `Effect` into a `Fiber`.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.failCause = failCause;
const fromEffect = internal.fromEffect;
/**
 * Gets the current fiber if one is running.
 *
 * @since 1.0.0
 * @category utilities
 */
exports.fromEffect = fromEffect;
const getCurrentFiber = internal.getCurrentFiber;
/**
 * Inherits values from all `FiberRef` instances into current fiber. This
 * will resume immediately.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.getCurrentFiber = getCurrentFiber;
const inheritAll = internal.inheritAll;
/**
 * Interrupts the fiber from whichever fiber is calling this method. If the
 * fiber has already exited, the returned effect will resume immediately.
 * Otherwise, the effect will resume when the fiber exits.
 *
 * @since 1.0.0
 * @category interruption
 */
exports.inheritAll = inheritAll;
const interrupt = core.interruptFiber;
/**
 * Constructrs a `Fiber` that is already interrupted.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.interrupt = interrupt;
const interrupted = internal.interrupted;
/**
 * Interrupts the fiber as if interrupted from the specified fiber. If the
 * fiber has already exited, the returned effect will resume immediately.
 * Otherwise, the effect will resume when the fiber exits.
 *
 * @since 1.0.0
 * @category interruption
 */
exports.interrupted = interrupted;
const interruptAs = core.interruptAsFiber;
/**
 * Interrupts the fiber as if interrupted from the specified fiber. If the
 * fiber has already exited, the returned effect will resume immediately.
 * Otherwise, the effect will resume when the fiber exits.
 *
 * @since 1.0.0
 * @category interruption
 */
exports.interruptAs = interruptAs;
const interruptAsFork = internal.interruptAsFork;
/**
 * Interrupts all fibers, awaiting their interruption.
 *
 * @since 1.0.0
 * @category interruption
 */
exports.interruptAsFork = interruptAsFork;
const interruptAll = internal.interruptAll;
/**
 * Interrupts all fibers as by the specified fiber, awaiting their
 * interruption.
 *
 * @since 1.0.0
 * @category interruption
 */
exports.interruptAll = interruptAll;
const interruptAllAs = internal.interruptAllAs;
/**
 * Interrupts the fiber from whichever fiber is calling this method. The
 * interruption will happen in a separate daemon fiber, and the returned
 * effect will always resume immediately without waiting.
 *
 * @since 1.0.0
 * @category interruption
 */
exports.interruptAllAs = interruptAllAs;
const interruptFork = fiberRuntime.fiberInterruptFork;
/**
 * Joins the fiber, which suspends the joining fiber until the result of the
 * fiber has been determined. Attempting to join a fiber that has erred will
 * result in a catchable error. Joining an interrupted fiber will result in an
 * "inner interruption" of this fiber, unlike interruption triggered by
 * another fiber, "inner interruption" can be caught and recovered.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.interruptFork = interruptFork;
const join = internal.join;
/**
 * Joins all fibers, awaiting their _successful_ completion. Attempting to
 * join a fiber that has erred will result in a catchable error, _if_ that
 * error does not result from interruption.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.join = join;
const joinAll = fiberRuntime.fiberJoinAll;
/**
 * Maps over the value the Fiber computes.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.joinAll = joinAll;
const map = internal.map;
/**
 * Effectually maps over the value the fiber computes.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.map = map;
const mapEffect = internal.mapEffect;
/**
 * Passes the success of this fiber to the specified callback, and continues
 * with the fiber that it returns.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.mapEffect = mapEffect;
const mapFiber = internal.mapFiber;
/**
 * Folds over the `Fiber` or `RuntimeFiber`.
 *
 * @since 1.0.0
 * @category folding
 */
exports.mapFiber = mapFiber;
const match = internal.match;
/**
 * A fiber that never fails or succeeds.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.match = match;
const never = internal.never;
/**
 * Returns a fiber that prefers `this` fiber, but falls back to the `that` one
 * when `this` one fails. Interrupting the returned fiber will interrupt both
 * fibers, sequentially, from left to right.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.never = never;
const orElse = internal.orElse;
/**
 * Returns a fiber that prefers `this` fiber, but falls back to the `that` one
 * when `this` one fails. Interrupting the returned fiber will interrupt both
 * fibers, sequentially, from left to right.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.orElse = orElse;
const orElseEither = internal.orElseEither;
/**
 * Tentatively observes the fiber, but returns immediately if it is not
 * already done.
 *
 * @since 1.0.0
 * @category getters
 */
exports.orElseEither = orElseEither;
const poll = internal.poll;
/**
 * Pretty-prints a `RuntimeFiber`.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.poll = poll;
const pretty = internal.pretty;
/**
 * Returns a chunk containing all root fibers.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.pretty = pretty;
const roots = internal.roots;
/**
 * Returns a chunk containing all root fibers.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.roots = roots;
const unsafeRoots = internal.unsafeRoots;
/**
 * Converts this fiber into a scoped effect. The fiber is interrupted when the
 * scope is closed.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.unsafeRoots = unsafeRoots;
const scoped = fiberRuntime.fiberScoped;
/**
 * Returns the `FiberStatus` of a `RuntimeFiber`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.scoped = scoped;
const status = internal.status;
/**
 * Returns a fiber that has already succeeded with the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.status = status;
const succeed = internal.succeed;
/**
 * A fiber that has already succeeded with unit.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.succeed = succeed;
const unit = internal.unit;
/**
 * Zips this fiber and the specified fiber together, producing a tuple of
 * their output.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.unit = unit;
const zip = circular.zipFiber;
/**
 * Same as `zip` but discards the output of that `Fiber`.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zip = zip;
const zipLeft = circular.zipLeftFiber;
/**
 * Same as `zip` but discards the output of this `Fiber`.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipLeft = zipLeft;
const zipRight = circular.zipRightFiber;
/**
 * Zips this fiber with the specified fiber, combining their results using the
 * specified combiner function. Both joins and interruptions are performed in
 * sequential order from left to right.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipRight = zipRight;
const zipWith = circular.zipWithFiber;
exports.zipWith = zipWith;
//# sourceMappingURL=Fiber.js.map