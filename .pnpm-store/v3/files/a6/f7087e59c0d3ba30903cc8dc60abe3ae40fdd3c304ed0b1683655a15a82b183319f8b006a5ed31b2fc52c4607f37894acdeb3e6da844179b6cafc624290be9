"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.pending = exports.isStart = exports.isPending = exports.isDone = exports.done = exports.OP_SUSPENDED_WARNING_DATA_START = exports.OP_SUSPENDED_WARNING_DATA_PENDING = exports.OP_SUSPENDED_WARNING_DATA_DONE = void 0;
/** @internal */
const OP_SUSPENDED_WARNING_DATA_START = "Start";
/** @internal */
exports.OP_SUSPENDED_WARNING_DATA_START = OP_SUSPENDED_WARNING_DATA_START;
const OP_SUSPENDED_WARNING_DATA_PENDING = "Pending";
/** @internal */
exports.OP_SUSPENDED_WARNING_DATA_PENDING = OP_SUSPENDED_WARNING_DATA_PENDING;
const OP_SUSPENDED_WARNING_DATA_DONE = "Done";
/**
 * State indicating that a test has not adjusted the clock.
 *
 * @internal
 */
exports.OP_SUSPENDED_WARNING_DATA_DONE = OP_SUSPENDED_WARNING_DATA_DONE;
const start = {
  _tag: OP_SUSPENDED_WARNING_DATA_START
};
/**
 * State indicating that a test has adjusted the clock but a fiber is still
 * running with a reference to the fiber that will display the warning
 * message.
 *
 * @internal
 */
exports.start = start;
const pending = fiber => {
  return {
    _tag: OP_SUSPENDED_WARNING_DATA_PENDING,
    fiber
  };
};
/**
 * State indicating that the warning message has already been displayed.
 *
 * @internal
 */
exports.pending = pending;
const done = {
  _tag: OP_SUSPENDED_WARNING_DATA_DONE
};
/** @internal */
exports.done = done;
const isStart = self => {
  return self._tag === OP_SUSPENDED_WARNING_DATA_START;
};
/** @internal */
exports.isStart = isStart;
const isPending = self => {
  return self._tag === OP_SUSPENDED_WARNING_DATA_PENDING;
};
/** @internal */
exports.isPending = isPending;
const isDone = self => {
  return self._tag === OP_SUSPENDED_WARNING_DATA_DONE;
};
exports.isDone = isDone;
//# sourceMappingURL=suspendedWarningData.js.map