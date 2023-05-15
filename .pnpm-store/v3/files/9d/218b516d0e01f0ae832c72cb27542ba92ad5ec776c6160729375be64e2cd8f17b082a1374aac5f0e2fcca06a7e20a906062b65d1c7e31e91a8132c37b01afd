var _a;
import * as Context from "@effect/data/Context";
import * as Either from "@effect/data/Either";
import { constFalse } from "@effect/data/Function";
import * as Debug from "@effect/io/Debug";
import * as internalCause from "@effect/io/internal_effect_untraced/cause";
import * as core from "@effect/io/internal_effect_untraced/core";
/** @internal */
const ClockSymbolKey = "@effect/io/Clock";
/** @internal */
export const ClockTypeId = /*#__PURE__*/Symbol.for(ClockSymbolKey);
/** @internal */
export const clockTag = /*#__PURE__*/Context.Tag(ClockTypeId);
/** @internal */
export const MAX_TIMER_MILLIS = 2 ** 31 - 1;
/** @internal */
export const globalClockScheduler = {
  unsafeSchedule(task, duration) {
    // If the duration is greater than the value allowable by the JS timer
    // functions, treat the value as an infinite duration
    if (duration.millis > MAX_TIMER_MILLIS) {
      return constFalse;
    }
    let completed = false;
    const handle = setTimeout(() => {
      completed = true;
      task();
    }, duration.millis);
    return () => {
      clearTimeout(handle);
      return !completed;
    };
  }
};
/** @internal */
class ClockImpl {
  constructor() {
    this[_a] = ClockTypeId;
  }
  unsafeCurrentTimeMillis() {
    return new Date().getTime();
  }
  currentTimeMillis() {
    return Debug.bodyWithTrace(trace => core.sync(() => this.unsafeCurrentTimeMillis()).traced(trace));
  }
  scheduler() {
    return Debug.bodyWithTrace(trace => core.succeed(globalClockScheduler).traced(trace));
  }
  sleep(duration) {
    return Debug.bodyWithTrace(trace => dieOnSync(core.asyncInterruptEither(cb => {
      const canceler = globalClockScheduler.unsafeSchedule(() => cb(core.unit()), duration);
      return Either.left(core.asUnit(core.sync(canceler)));
    })).traced(trace));
  }
}
_a = ClockTypeId;
/** @internal */
export const make = () => new ClockImpl();
//
// Circular with effect
//
/* @internal */
export const dieMessage = /*#__PURE__*/Debug.methodWithTrace(trace => message => core.failCauseSync(() => internalCause.die(internalCause.RuntimeException(message))).traced(trace));
/* @internal */
export const dieOnSync = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.withFiberRuntime(runtime => {
  const scheduler = runtime.getFiberRef(core.currentScheduler);
  if (scheduler.executionMode === "Sync") {
    return dieMessage("effect is forbidden to run in Sync mode");
  }
  return self;
}).traced(trace));
//# sourceMappingURL=clock.mjs.map