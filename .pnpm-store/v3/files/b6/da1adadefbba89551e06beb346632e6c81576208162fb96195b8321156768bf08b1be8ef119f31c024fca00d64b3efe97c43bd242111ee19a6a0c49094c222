"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeRunSyncExitOrFiberEffect = exports.unsafeRunSyncExitOrFiber = exports.unsafeRunSyncExitEffect = exports.unsafeRunSyncExit = exports.unsafeRunSyncEitherEffect = exports.unsafeRunSyncEither = exports.unsafeRunSyncEffect = exports.unsafeRunSync = exports.unsafeRunPromiseExitEffect = exports.unsafeRunPromiseExit = exports.unsafeRunPromiseEitherEffect = exports.unsafeRunPromiseEither = exports.unsafeRunPromiseEffect = exports.unsafeRunPromise = exports.unsafeRunEffect = exports.unsafeRunCallback = exports.unsafeForkEffect = exports.unsafeFork = exports.runtime = exports.make = exports.defaultRuntimeFlags = exports.defaultRuntime = exports.asyncEffect = exports.RuntimeImpl = exports.AsyncFiber = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Exit"));
var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber"));
var FiberId = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Id"));
var FiberRefs = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/FiberRefs"));
var CausePretty = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause-pretty"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var FiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var fiberScope = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberScope"));
var OpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/effect"));
var runtimeFlags = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlags"));
var _supervisor = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/supervisor"));
var _scheduler = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Scheduler"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const unsafeFork = runtime => Debug.methodWithTrace(trace => (self, scheduler) => {
  const fiberId = FiberId.unsafeMake();
  const effect = self.traced(trace);
  let fiberRefs = FiberRefs.updatedAs(runtime.fiberRefs, fiberId, core.currentContext, runtime.context);
  if (scheduler) {
    fiberRefs = FiberRefs.updatedAs(fiberRefs, fiberId, core.currentScheduler, scheduler);
  }
  const fiberRuntime = new FiberRuntime.FiberRuntime(fiberId, FiberRefs.forkAs(fiberRefs, fiberId), runtime.runtimeFlags);
  const supervisor = fiberRuntime.getSupervisor();
  if (supervisor !== _supervisor.none) {
    supervisor.onStart(runtime.context, effect, Option.none(), fiberRuntime);
    fiberRuntime.unsafeAddObserver(exit => supervisor.onEnd(exit, fiberRuntime));
  }
  fiberScope.globalScope.add(runtime.runtimeFlags, fiberRuntime);
  fiberRuntime.start(effect);
  return fiberRuntime;
});
/** @internal */
exports.unsafeFork = unsafeFork;
const unsafeRunCallback = runtime => Debug.methodWithTrace(trace => (effect, onExit) => {
  const fiberRuntime = unsafeFork(runtime)(effect.traced(trace));
  if (onExit) {
    fiberRuntime.unsafeAddObserver(exit => {
      onExit(exit);
    });
  }
  return (id, onExitInterrupt) => unsafeRunCallback(runtime)(Fiber.interruptAs(id ?? FiberId.none)(fiberRuntime), onExitInterrupt ? exit => {
    return onExitInterrupt(Exit.flatten(exit));
  } : void 0);
});
/** @internal */
exports.unsafeRunCallback = unsafeRunCallback;
const unsafeRunSyncExit = runtime => Debug.methodWithTrace(trace => effect => {
  const scheduler = new _scheduler.SyncScheduler("Sync");
  const fiberRuntime = unsafeFork(runtime)(effect.traced(trace), scheduler);
  scheduler.flush();
  const result = fiberRuntime.unsafePoll();
  if (result) {
    return result;
  }
  return Exit.die(new AsyncFiber(fiberRuntime));
});
/** @internal */
exports.unsafeRunSyncExit = unsafeRunSyncExit;
const unsafeRunSyncExitOrFiber = runtime => Debug.methodWithTrace(trace => effect => {
  const scheduler = new _scheduler.SyncScheduler("PreferSync");
  const fiberRuntime = unsafeFork(runtime)(effect.traced(trace), scheduler);
  scheduler.flush();
  const result = fiberRuntime.unsafePoll();
  if (result) {
    return Either.right(result);
  }
  return Either.left(fiberRuntime);
});
/** @internal */
exports.unsafeRunSyncExitOrFiber = unsafeRunSyncExitOrFiber;
class AsyncFiber {
  constructor(fiber) {
    this.fiber = fiber;
    this._tag = "AsyncFiber";
  }
  toString() {
    return `Fiber #${this.fiber.id().id} has suspended work asyncroniously`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
}
exports.AsyncFiber = AsyncFiber;
class FiberFailure extends Error {
  constructor(originalCause) {
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    super();
    this.originalCause = originalCause;
    this._tag = "FiberFailure";
    this._id = Symbol.for("@effect/io/Runtime/FiberFailure");
    Error.stackTraceLimit = limit;
    const pretty = CausePretty.prettyErrors(this.originalCause);
    if (pretty.length > 0) {
      this.name = pretty[0].message.split(":")[0];
      this.message = pretty[0].message.substring(this.name.length + 2);
      this.stack = pretty[0].stack;
    }
  }
  toString() {
    return CausePretty.pretty(this.originalCause);
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
}
/** @internal */
const unsafeRunSync = runtime => Debug.methodWithTrace(trace => effect => {
  const exit = unsafeRunSyncExit(runtime)(effect.traced(trace));
  if (exit._tag === OpCodes.OP_FAILURE) {
    throw new FiberFailure(exit.i0);
  }
  return exit.i0;
});
/** @internal */
exports.unsafeRunSync = unsafeRunSync;
const unsafeRunSyncEither = runtime => effect => Debug.untraced(() => unsafeRunSync(runtime)(core.either(effect)));
/** @internal */
exports.unsafeRunSyncEither = unsafeRunSyncEither;
const unsafeRunPromise = runtime => effect => {
  return new Promise((resolve, reject) => {
    unsafeRunCallback(runtime)(effect, exit => {
      switch (exit._tag) {
        case OpCodes.OP_SUCCESS:
          {
            resolve(exit.i0);
            break;
          }
        case OpCodes.OP_FAILURE:
          {
            reject(new FiberFailure(exit.i0));
            break;
          }
      }
    });
  });
};
/** @internal */
exports.unsafeRunPromise = unsafeRunPromise;
const unsafeRunPromiseExit = runtime => Debug.methodWithTrace(trace => effect => {
  return new Promise(resolve => {
    unsafeRunCallback(runtime)(effect.traced(trace), exit => {
      resolve(exit);
    });
  });
});
/** @internal */
exports.unsafeRunPromiseExit = unsafeRunPromiseExit;
const unsafeRunPromiseEither = runtime => effect => unsafeRunPromise(runtime)(core.either(effect));
/** @internal */
exports.unsafeRunPromiseEither = unsafeRunPromiseEither;
class RuntimeImpl {
  constructor(context, runtimeFlags, fiberRefs) {
    this.context = context;
    this.runtimeFlags = runtimeFlags;
    this.fiberRefs = fiberRefs;
  }
}
/** @internal */
exports.RuntimeImpl = RuntimeImpl;
const make = (context, runtimeFlags, fiberRefs) => new RuntimeImpl(context, runtimeFlags, fiberRefs);
/** @internal */
exports.make = make;
const runtime = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.withFiberRuntime((state, status) => core.succeed(new RuntimeImpl(state.getFiberRef(core.currentContext), status.runtimeFlags, state.unsafeGetFiberRefs()))).traced(trace));
/** @internal */
exports.runtime = runtime;
const defaultRuntimeFlags = /*#__PURE__*/runtimeFlags.make(runtimeFlags.Interruption, runtimeFlags.CooperativeYielding);
/** @internal */
exports.defaultRuntimeFlags = defaultRuntimeFlags;
const defaultRuntime = /*#__PURE__*/make( /*#__PURE__*/Context.empty(), defaultRuntimeFlags, /*#__PURE__*/FiberRefs.unsafeMake( /*#__PURE__*/new Map()));
/** @internal */
exports.defaultRuntime = defaultRuntime;
const unsafeRunEffect = /*#__PURE__*/unsafeRunCallback(defaultRuntime);
/** @internal */
exports.unsafeRunEffect = unsafeRunEffect;
const unsafeForkEffect = /*#__PURE__*/unsafeFork(defaultRuntime);
/** @internal */
exports.unsafeForkEffect = unsafeForkEffect;
const unsafeRunPromiseEffect = /*#__PURE__*/unsafeRunPromise(defaultRuntime);
/** @internal */
exports.unsafeRunPromiseEffect = unsafeRunPromiseEffect;
const unsafeRunPromiseEitherEffect = /*#__PURE__*/unsafeRunPromiseEither(defaultRuntime);
/** @internal */
exports.unsafeRunPromiseEitherEffect = unsafeRunPromiseEitherEffect;
const unsafeRunPromiseExitEffect = /*#__PURE__*/unsafeRunPromiseExit(defaultRuntime);
/** @internal */
exports.unsafeRunPromiseExitEffect = unsafeRunPromiseExitEffect;
const unsafeRunSyncEffect = /*#__PURE__*/unsafeRunSync(defaultRuntime);
/** @internal */
exports.unsafeRunSyncEffect = unsafeRunSyncEffect;
const unsafeRunSyncExitEffect = /*#__PURE__*/unsafeRunSyncExit(defaultRuntime);
/** @internal */
exports.unsafeRunSyncExitEffect = unsafeRunSyncExitEffect;
const unsafeRunSyncEitherEffect = /*#__PURE__*/unsafeRunSyncEither(defaultRuntime);
/** @internal */
exports.unsafeRunSyncEitherEffect = unsafeRunSyncEitherEffect;
const unsafeRunSyncExitOrFiberEffect = /*#__PURE__*/unsafeRunSyncExitOrFiber(defaultRuntime);
// circular with Effect
/** @internal */
exports.unsafeRunSyncExitOrFiberEffect = unsafeRunSyncExitOrFiberEffect;
const asyncEffect = /*#__PURE__*/Debug.methodWithTrace((trace, restoreTrace) => register => core.flatMap(core.deferredMake(), deferred => core.flatMap(runtime(), runtime => core.uninterruptibleMask(restore => core.zipRight(FiberRuntime.fork(restore(core.catchAllCause(restoreTrace(register)(cb => unsafeRunCallback(runtime)(core.intoDeferred(deferred)(cb))), cause => core.deferredFailCause(deferred, cause)))), restore(core.deferredAwait(deferred)))))).traced(trace));
exports.asyncEffect = asyncEffect;
//# sourceMappingURL=runtime.js.map