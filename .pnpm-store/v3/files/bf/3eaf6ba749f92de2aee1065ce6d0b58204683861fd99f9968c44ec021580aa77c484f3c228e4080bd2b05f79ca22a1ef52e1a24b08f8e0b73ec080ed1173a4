import * as Context from "@effect/data/Context";
import * as Either from "@effect/data/Either";
import * as Option from "@effect/data/Option";
import * as Debug from "@effect/io/Debug";
import * as Exit from "@effect/io/Exit";
import * as Fiber from "@effect/io/Fiber";
import * as FiberId from "@effect/io/Fiber/Id";
import * as FiberRefs from "@effect/io/FiberRefs";
import * as CausePretty from "@effect/io/internal_effect_untraced/cause-pretty";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as FiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as fiberScope from "@effect/io/internal_effect_untraced/fiberScope";
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/effect";
import * as runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags";
import * as _supervisor from "@effect/io/internal_effect_untraced/supervisor";
import * as _scheduler from "@effect/io/Scheduler";
/** @internal */
export const unsafeFork = runtime => Debug.methodWithTrace(trace => (self, scheduler) => {
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
export const unsafeRunCallback = runtime => Debug.methodWithTrace(trace => (effect, onExit) => {
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
export const unsafeRunSyncExit = runtime => Debug.methodWithTrace(trace => effect => {
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
export const unsafeRunSyncExitOrFiber = runtime => Debug.methodWithTrace(trace => effect => {
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
export class AsyncFiber {
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
export const unsafeRunSync = runtime => Debug.methodWithTrace(trace => effect => {
  const exit = unsafeRunSyncExit(runtime)(effect.traced(trace));
  if (exit._tag === OpCodes.OP_FAILURE) {
    throw new FiberFailure(exit.i0);
  }
  return exit.i0;
});
/** @internal */
export const unsafeRunSyncEither = runtime => effect => Debug.untraced(() => unsafeRunSync(runtime)(core.either(effect)));
/** @internal */
export const unsafeRunPromise = runtime => effect => {
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
export const unsafeRunPromiseExit = runtime => Debug.methodWithTrace(trace => effect => {
  return new Promise(resolve => {
    unsafeRunCallback(runtime)(effect.traced(trace), exit => {
      resolve(exit);
    });
  });
});
/** @internal */
export const unsafeRunPromiseEither = runtime => effect => unsafeRunPromise(runtime)(core.either(effect));
/** @internal */
export class RuntimeImpl {
  constructor(context, runtimeFlags, fiberRefs) {
    this.context = context;
    this.runtimeFlags = runtimeFlags;
    this.fiberRefs = fiberRefs;
  }
}
/** @internal */
export const make = (context, runtimeFlags, fiberRefs) => new RuntimeImpl(context, runtimeFlags, fiberRefs);
/** @internal */
export const runtime = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.withFiberRuntime((state, status) => core.succeed(new RuntimeImpl(state.getFiberRef(core.currentContext), status.runtimeFlags, state.unsafeGetFiberRefs()))).traced(trace));
/** @internal */
export const defaultRuntimeFlags = /*#__PURE__*/runtimeFlags.make(runtimeFlags.Interruption, runtimeFlags.CooperativeYielding);
/** @internal */
export const defaultRuntime = /*#__PURE__*/make( /*#__PURE__*/Context.empty(), defaultRuntimeFlags, /*#__PURE__*/FiberRefs.unsafeMake( /*#__PURE__*/new Map()));
/** @internal */
export const unsafeRunEffect = /*#__PURE__*/unsafeRunCallback(defaultRuntime);
/** @internal */
export const unsafeForkEffect = /*#__PURE__*/unsafeFork(defaultRuntime);
/** @internal */
export const unsafeRunPromiseEffect = /*#__PURE__*/unsafeRunPromise(defaultRuntime);
/** @internal */
export const unsafeRunPromiseEitherEffect = /*#__PURE__*/unsafeRunPromiseEither(defaultRuntime);
/** @internal */
export const unsafeRunPromiseExitEffect = /*#__PURE__*/unsafeRunPromiseExit(defaultRuntime);
/** @internal */
export const unsafeRunSyncEffect = /*#__PURE__*/unsafeRunSync(defaultRuntime);
/** @internal */
export const unsafeRunSyncExitEffect = /*#__PURE__*/unsafeRunSyncExit(defaultRuntime);
/** @internal */
export const unsafeRunSyncEitherEffect = /*#__PURE__*/unsafeRunSyncEither(defaultRuntime);
/** @internal */
export const unsafeRunSyncExitOrFiberEffect = /*#__PURE__*/unsafeRunSyncExitOrFiber(defaultRuntime);
// circular with Effect
/** @internal */
export const asyncEffect = /*#__PURE__*/Debug.methodWithTrace((trace, restoreTrace) => register => core.flatMap(core.deferredMake(), deferred => core.flatMap(runtime(), runtime => core.uninterruptibleMask(restore => core.zipRight(FiberRuntime.fork(restore(core.catchAllCause(restoreTrace(register)(cb => unsafeRunCallback(runtime)(core.intoDeferred(deferred)(cb))), cause => core.deferredFailCause(deferred, cause)))), restore(core.deferredAwait(deferred)))))).traced(trace));
//# sourceMappingURL=runtime.mjs.map