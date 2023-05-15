"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = exports.globalClockScheduler = exports.dieOnSync = exports.dieMessage = exports.clockTag = exports.MAX_TIMER_MILLIS = exports.ClockTypeId = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var internalCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const ClockSymbolKey = "@effect/io/Clock";
/** @internal */
const ClockTypeId = /*#__PURE__*/Symbol.for(ClockSymbolKey);
/** @internal */
exports.ClockTypeId = ClockTypeId;
const clockTag = /*#__PURE__*/Context.Tag(ClockTypeId);
/** @internal */
exports.clockTag = clockTag;
const MAX_TIMER_MILLIS = 2 ** 31 - 1;
/** @internal */
exports.MAX_TIMER_MILLIS = MAX_TIMER_MILLIS;
const globalClockScheduler = {
  unsafeSchedule(task, duration) {
    // If the duration is greater than the value allowable by the JS timer
    // functions, treat the value as an infinite duration
    if (duration.millis > MAX_TIMER_MILLIS) {
      return _Function.constFalse;
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
exports.globalClockScheduler = globalClockScheduler;
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
const make = () => new ClockImpl();
//
// Circular with effect
//
/* @internal */
exports.make = make;
const dieMessage = /*#__PURE__*/Debug.methodWithTrace(trace => message => core.failCauseSync(() => internalCause.die(internalCause.RuntimeException(message))).traced(trace));
/* @internal */
exports.dieMessage = dieMessage;
const dieOnSync = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.withFiberRuntime(runtime => {
  const scheduler = runtime.getFiberRef(core.currentScheduler);
  if (scheduler.executionMode === "Sync") {
    return dieMessage("effect is forbidden to run in Sync mode");
  }
  return self;
}).traced(trace));
exports.dieOnSync = dieOnSync;
//# sourceMappingURL=clock.js.map