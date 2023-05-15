var _a, _b, _c;
import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
const FiberStatusSymbolKey = "@effect/io/Fiber/Status";
/** @internal */
export const FiberStatusTypeId = /*#__PURE__*/Symbol.for(FiberStatusSymbolKey);
/** @internal */
export const OP_DONE = "Done";
/** @internal */
export const OP_RUNNING = "Running";
/** @internal */
export const OP_SUSPENDED = "Suspended";
/** @internal */
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
export const done = /*#__PURE__*/new Done();
/** @internal */
export const running = runtimeFlags => new Running(runtimeFlags);
/** @internal */
export const suspended = (runtimeFlags, blockingOn) => new Suspended(runtimeFlags, blockingOn);
/** @internal */
export const isFiberStatus = u => typeof u === "object" && u != null && FiberStatusTypeId in u;
/** @internal */
export const isDone = self => self._tag === OP_DONE;
/** @internal */
export const isRunning = self => self._tag === OP_RUNNING;
/** @internal */
export const isSuspended = self => self._tag === OP_SUSPENDED;
//# sourceMappingURL=fiberStatus.mjs.map