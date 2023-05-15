"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDone = exports.isContinue = exports.done = exports.continueWith = exports._continue = exports.OP_DONE = exports.OP_CONTINUE = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Intervals = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Schedule/Intervals"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const OP_CONTINUE = "Continue";
/** @internal */
exports.OP_CONTINUE = OP_CONTINUE;
const OP_DONE = "Done";
/** @internal */
exports.OP_DONE = OP_DONE;
const _continue = intervals => {
  return {
    _tag: OP_CONTINUE,
    intervals
  };
};
/** @internal */
exports._continue = _continue;
const continueWith = interval => {
  return {
    _tag: OP_CONTINUE,
    intervals: Intervals.make(Chunk.of(interval))
  };
};
/** @internal */
exports.continueWith = continueWith;
const done = {
  _tag: OP_DONE
};
/** @internal */
exports.done = done;
const isContinue = self => {
  return self._tag === OP_CONTINUE;
};
/** @internal */
exports.isContinue = isContinue;
const isDone = self => {
  return self._tag === OP_DONE;
};
exports.isDone = isDone;
//# sourceMappingURL=decision.js.map