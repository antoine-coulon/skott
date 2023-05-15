"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yieldNow = exports.stateful = exports.resume = exports.interruptSignal = exports.OP_YIELD_NOW = exports.OP_STATEFUL = exports.OP_RESUME = exports.OP_INTERRUPT_SIGNAL = void 0;
/** @internal */
const OP_INTERRUPT_SIGNAL = "InterruptSignal";
/** @internal */
exports.OP_INTERRUPT_SIGNAL = OP_INTERRUPT_SIGNAL;
const OP_STATEFUL = "Stateful";
/** @internal */
exports.OP_STATEFUL = OP_STATEFUL;
const OP_RESUME = "Resume";
/** @internal */
exports.OP_RESUME = OP_RESUME;
const OP_YIELD_NOW = "YieldNow";
/** @internal */
exports.OP_YIELD_NOW = OP_YIELD_NOW;
const interruptSignal = cause => ({
  _tag: OP_INTERRUPT_SIGNAL,
  cause
});
/** @internal */
exports.interruptSignal = interruptSignal;
const stateful = onFiber => ({
  _tag: OP_STATEFUL,
  onFiber
});
/** @internal */
exports.stateful = stateful;
const resume = effect => ({
  _tag: OP_RESUME,
  effect
});
/** @internal */
exports.resume = resume;
const yieldNow = () => ({
  _tag: OP_YIELD_NOW
});
exports.yieldNow = yieldNow;
//# sourceMappingURL=fiberMessage.js.map