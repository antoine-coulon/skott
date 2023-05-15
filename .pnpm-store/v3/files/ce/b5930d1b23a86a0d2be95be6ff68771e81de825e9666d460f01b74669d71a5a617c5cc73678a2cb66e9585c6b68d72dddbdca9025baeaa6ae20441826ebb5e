"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeWithTTL = exports.make = exports.isPool = exports.invalidate = exports.get = exports.PoolTypeId = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var Effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Effect"));
var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Exit"));
var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber"));
var Queue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Queue"));
var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Ref"));
var Scope = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Scope"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const PoolSymbolKey = "@effect/io/Pool";
/** @internal */
const PoolTypeId = /*#__PURE__*/Symbol.for(PoolSymbolKey);
exports.PoolTypeId = PoolTypeId;
const poolVariance = {
  _E: _ => _,
  _A: _ => _
};
/**
 * A strategy that does nothing to shrink excess items. This is useful when
 * the minimum size of the pool is equal to its maximum size and so there is
 * nothing to do.
 */
class NoneStrategy {
  initial() {
    return Debug.bodyWithTrace(trace => Effect.unit().traced(trace));
  }
  track() {
    return Debug.bodyWithTrace(trace => Effect.unit().traced(trace));
  }
  run() {
    return Debug.bodyWithTrace(trace => Effect.unit().traced(trace));
  }
}
/**
 * A strategy that shrinks the pool down to its minimum size if items in the
 * pool have not been used for the specified duration.
 */
class TimeToLiveStrategy {
  constructor(timeToLive) {
    this.timeToLive = timeToLive;
  }
  initial() {
    return Debug.bodyWithTrace(trace => Effect.flatMap(Effect.clock(), clock => Effect.flatMap(clock.currentTimeMillis(), now => Effect.map(Ref.make(now), ref => [clock, ref]))).traced(trace));
  }
  track(state) {
    return Debug.bodyWithTrace(trace => Effect.asUnit(Effect.flatMap(state[0].currentTimeMillis(), now => Ref.set(state[1], now))).traced(trace));
  }
  run(state, getExcess, shrink) {
    return Debug.bodyWithTrace(trace => Effect.flatMap(getExcess, excess => excess <= 0 ? Effect.zipRight(state[0].sleep(this.timeToLive), this.run(state, getExcess, shrink)) : Effect.flatMap(duration => {
      if (duration >= this.timeToLive.millis) {
        return Effect.zipRight(shrink, this.run(state, getExcess, shrink));
      } else {
        return Effect.zipRight(state[0].sleep(this.timeToLive), this.run(state, getExcess, shrink));
      }
    })(Effect.zipWith(Ref.get(state[1]), state[0].currentTimeMillis(), (start, end) => end - start))).traced(trace));
  }
}
class PoolImpl {
  constructor(creator, min, max, isShuttingDown, state, items, invalidated, track) {
    this.creator = creator;
    this.min = min;
    this.max = max;
    this.isShuttingDown = isShuttingDown;
    this.state = state;
    this.items = items;
    this.invalidated = invalidated;
    this.track = track;
    this[_a] = poolVariance;
  }
  [(_a = PoolTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.track))(Hash.combine(Hash.hash(this.invalidated))(Hash.combine(Hash.hash(this.items))(Hash.combine(Hash.hash(this.state))(Hash.combine(Hash.hash(this.isShuttingDown))(Hash.combine(Hash.number(this.max))(Hash.combine(Hash.number(this.min))(Hash.hash(this.creator))))))));
  }
  [Equal.symbol](that) {
    return isPool(that) && Equal.equals(this.creator, that.creator) && this.min === that.min && this.max === that.max && Equal.equals(this.isShuttingDown, that.isShuttingDown) && Equal.equals(this.state, that.state) && Equal.equals(this.items, that.items) && Equal.equals(this.invalidated, that.invalidated) && Equal.equals(this.track, that.track);
  }
  get() {
    return Debug.bodyWithTrace(trace => {
      const acquire = () => Effect.flatMap(Ref.get(this.isShuttingDown), down => down ? Effect.interrupt() : Effect.flatten(Ref.modify(this.state, state => {
        if (state.free > 0 || state.size >= this.max) {
          return [Effect.flatMap(Queue.take(this.items), attempted => Exit.match(attempted.result, () => Effect.succeed(attempted), item => Effect.flatMap(Ref.get(this.invalidated), set => {
            if (HashSet.has(item)(set)) {
              return Effect.flatMap(finalizeInvalid(this, attempted), acquire);
            }
            return Effect.succeed(attempted);
          }))), {
            ...state,
            free: state.free - 1
          }];
        }
        if (state.size >= 0) {
          return [Effect.flatMap(allocate(this), acquire), {
            size: state.size + 1,
            free: state.free + 1
          }];
        }
        return [Effect.interrupt(), state];
      })));
      const release = attempted => Exit.match(attempted.result, () => Effect.flatten(Ref.modify(this.state, state => {
        if (state.size <= this.min) {
          return [allocate(this), {
            ...state,
            free: state.free + 1
          }];
        }
        return [Effect.unit(), {
          ...state,
          size: state.size - 1
        }];
      })), item => Effect.flatMap(Ref.get(this.invalidated), set => {
        if (HashSet.has(item)(set)) {
          return finalizeInvalid(this, attempted);
        }
        return Effect.zipRight(Effect.whenEffect(getAndShutdown(this), Ref.get(this.isShuttingDown)))(Effect.zipRight(this.track(attempted.result))(Effect.zipRight(Queue.offer(this.items, attempted))(Ref.update(this.state, state => ({
          ...state,
          free: state.free + 1
        })))));
      }));
      return Effect.flatMap(([release, attempted]) => Effect.zipRight(toEffect(attempted))(Effect.when(release, () => isFailure(attempted))))(Effect.disconnect(Effect.withEarlyRelease(Effect.acquireRelease(acquire(), release)))).traced(trace);
    });
  }
  invalidate(item) {
    return Debug.bodyWithTrace(trace => Ref.update(this.invalidated, HashSet.add(item)).traced(trace));
  }
}
const allocate = self => Effect.uninterruptibleMask(restore => Effect.flatMap(Scope.make(), scope => Effect.flatMap(Effect.exit(restore(Scope.extend(self.creator, scope))), exit => Effect.flatMap(Effect.succeed({
  result: exit,
  finalizer: Scope.close(scope, Exit.succeed(void 0))
}), attempted => Effect.as(attempted)(Effect.zipRight(Effect.whenEffect(getAndShutdown(self), Ref.get(self.isShuttingDown)))(Effect.zipRight(self.track(attempted.result))(Queue.offer(self.items, attempted))))))));
/**
 * Returns the number of items in the pool in excess of the minimum size.
 */
const excess = self => Effect.map(Ref.get(self.state), state => state.size - Math.min(self.min, state.free));
const finalizeInvalid = (self, attempted) => Effect.zipRight(Effect.flatten(Ref.modify(self.state, state => {
  if (state.size <= self.min) {
    return [allocate(self), {
      ...state,
      free: state.free + 1
    }];
  }
  return [Effect.unit(), {
    ...state,
    size: state.size - 1
  }];
})))(Effect.zipRight(attempted.finalizer)(forEach(attempted, a => Ref.update(self.invalidated, HashSet.remove(a)))));
/**
 * Gets items from the pool and shuts them down as long as there are items
 * free, signalling shutdown of the pool if the pool is empty.
 */
const getAndShutdown = self => Effect.flatten(Ref.modify(self.state, state => {
  if (state.free > 0) {
    return [Effect.matchCauseEffect(Queue.take(self.items), () => Effect.unit(), attempted => Effect.flatMap(() => getAndShutdown(self))(Effect.zipRight(Ref.update(self.state, state => ({
      ...state,
      size: state.size - 1
    })))(Effect.zipRight(attempted.finalizer)(forEach(attempted, a => Ref.update(self.invalidated, HashSet.remove(a))))))), {
      ...state,
      free: state.free - 1
    }];
  }
  if (state.size > 0) {
    return [Effect.unit(), state];
  }
  return [Queue.shutdown(self.items), {
    ...state,
    size: state.size - 1
  }];
}));
/**
 * Begins pre-allocating pool entries based on minimum pool size.
 */
const initialize = self => Effect.replicateEffectDiscard(Effect.uninterruptibleMask(restore => Effect.flatten(Ref.modify(self.state, state => {
  if (state.size < self.min && state.size >= 0) {
    return [Effect.flatMap(Scope.make(), scope => Effect.flatMap(Effect.exit(restore(Scope.extend(self.creator, scope))), exit => Effect.flatMap(Effect.succeed({
      result: exit,
      finalizer: Scope.close(scope, Exit.succeed(void 0))
    }), attempted => Effect.as(attempted)(Effect.zipRight(Effect.whenEffect(getAndShutdown(self), Ref.get(self.isShuttingDown)))(Effect.zipRight(self.track(attempted.result))(Queue.offer(self.items, attempted))))))), {
      size: state.size + 1,
      free: state.free + 1
    }];
  }
  return [Effect.unit(), state];
}))), self.min);
/**
 * Shrinks the pool down, but never to less than the minimum size.
 */
const shrink = self => Effect.uninterruptible(Effect.flatten(Ref.modify(self.state, state => {
  if (state.size > self.min && state.free > 0) {
    return [Effect.flatMap(attempted => Effect.zipRight(Ref.update(self.state, state => ({
      ...state,
      size: state.size - 1
    })))(Effect.zipRight(attempted.finalizer)(forEach(attempted, a => Ref.update(self.invalidated, HashSet.remove(a))))))(Queue.take(self.items)), {
      ...state,
      free: state.free - 1
    }];
  }
  return [Effect.unit(), state];
})));
const shutdown = self => Effect.flatten(Ref.modify(self.isShuttingDown, down => down ? [Queue.awaitShutdown(self.items), true] : [Effect.zipRight(getAndShutdown(self), Queue.awaitShutdown(self.items)), true]));
const isFailure = self => Exit.isFailure(self.result);
const forEach = (self, f) => Exit.match(self.result, () => Effect.unit(), f);
const toEffect = self => Effect.done(self.result);
/**
 * A more powerful variant of `make` that allows specifying a `Strategy` that
 * describes how a pool whose excess items are not being used will be shrunk
 * down to the minimum size.
 */
const makeWith = /*#__PURE__*/Debug.methodWithTrace(trace => (get, min, max, strategy) => Effect.uninterruptibleMask(restore => Effect.flatMap(([context, down, state, items, inv, initial]) => {
  const pool = new PoolImpl(Effect.contramapContext(get, old => Context.merge(old)(context)), min, max, down, state, items, inv, exit => strategy.track(initial, exit));
  return Effect.as(pool)(Effect.flatMap(fiber => Effect.flatMap(Effect.forkDaemon(restore(strategy.run(initial, excess(pool), shrink(pool)))), shrink => Effect.addFinalizer(() => Effect.zipRight(Fiber.interrupt(shrink))(Effect.zipRight(Fiber.interrupt(fiber))(shutdown(pool))))))(Effect.forkDaemon(restore(initialize(pool)))));
})(Effect.all(Effect.context(), Ref.make(false), Ref.make({
  size: 0,
  free: 0
}), Queue.bounded(max), Ref.make(HashSet.empty()), strategy.initial()))).traced(trace));
/** @internal */
const isPool = u => typeof u === "object" && u != null && PoolTypeId in u;
/** @internal */
exports.isPool = isPool;
const make = /*#__PURE__*/Debug.methodWithTrace(trace => (get, size) => makeWith(get, size, size, new NoneStrategy()).traced(trace));
/** @internal */
exports.make = make;
const makeWithTTL = /*#__PURE__*/Debug.methodWithTrace(trace => (get, min, max, timeToLive) => makeWith(get, min, max, new TimeToLiveStrategy(timeToLive)).traced(trace));
/** @internal */
exports.makeWithTTL = makeWithTTL;
const get = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.get().traced(trace));
/** @internal */
exports.get = get;
const invalidate = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => self.invalidate(value).traced(trace));
exports.invalidate = invalidate;
//# sourceMappingURL=pool.js.map