"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suspended = exports.running = exports.isSuspended = exports.isRunning = exports.isFiberStatus = exports.isDone = exports.done = exports.OP_SUSPENDED = exports.OP_RUNNING = exports.OP_DONE = exports.FiberStatusTypeId = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b, _c;
const FiberStatusSymbolKey = "@effect/io/Fiber/Status";
/** @internal */
const FiberStatusTypeId = /*#__PURE__*/Symbol.for(FiberStatusSymbolKey);
/** @internal */
exports.FiberStatusTypeId = FiberStatusTypeId;
const OP_DONE = "Done";
/** @internal */
exports.OP_DONE = OP_DONE;
const OP_RUNNING = "Running";
/** @internal */
exports.OP_RUNNING = OP_RUNNING;
const OP_SUSPENDED = "Suspended";
/** @internal */
exports.OP_SUSPENDED = OP_SUSPENDED;
class Done {
  constructor() {
    this[_a] = FiberStatusTypeId;
    this._tag = OP_DONE;
  }
  [(_a = FiberStatusTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this._tag))(Hash.hash(FiberStatusSymbolKey));
  }
  [Equal.symbol](that) {
    return isFiberStatus(that) && that._tag === OP_DONE;
  }
}
/** @internal */
class Running {
  constructor(runtimeFlags) {
    this.runtimeFlags = runtimeFlags;
    this[_b] = FiberStatusTypeId;
    this._tag = OP_RUNNING;
  }
  [(_b = FiberStatusTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.runtimeFlags))(Hash.combine(Hash.hash(this._tag))(Hash.hash(FiberStatusSymbolKey)));
  }
  [Equal.symbol](that) {
    return isFiberStatus(that) && that._tag === OP_RUNNING && this.runtimeFlags === that.runtimeFlags;
  }
}
/** @internal */
class Suspended {
  constructor(runtimeFlags, blockingOn) {
    this.runtimeFlags = runtimeFlags;
    this.blockingOn = blockingOn;
    this[_c] = FiberStatusTypeId;
    this._tag = OP_SUSPENDED;
  }
  [(_c = FiberStatusTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.blockingOn))(Hash.combine(Hash.hash(this.runtimeFlags))(Hash.combine(Hash.hash(this._tag))(Hash.hash(FiberStatusSymbolKey))));
  }
  [Equal.symbol](that) {
    return isFiberStatus(that) && that._tag === OP_SUSPENDED && this.runtimeFlags === that.runtimeFlags && Equal.equals(this.blockingOn, that.blockingOn);
  }
}
/** @internal */
const done = /*#__PURE__*/new Done();
/** @internal */
exports.done = done;
const running = runtimeFlags => new Running(runtimeFlags);
/** @internal */
exports.running = running;
const suspended = (runtimeFlags, blockingOn) => new Suspended(runtimeFlags, blockingOn);
/** @internal */
exports.suspended = suspended;
const isFiberStatus = u => typeof u === "object" && u != null && FiberStatusTypeId in u;
/** @internal */
exports.isFiberStatus = isFiberStatus;
const isDone = self => self._tag === OP_DONE;
/** @internal */
exports.isDone = isDone;
const isRunning = self => self._tag === OP_RUNNING;
/** @internal */
exports.isRunning = isRunning;
const isSuspended = self => self._tag === OP_SUSPENDED;
exports.isSuspended = isSuspended;
//# sourceMappingURL=fiberStatus.js.map