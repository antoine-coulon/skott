var _a, _b, _c;
import * as Equal from "@effect/data/Equal";
import { dual } from "@effect/data/Function";
import { globalValue } from "@effect/data/Global";
import * as Hash from "@effect/data/Hash";
import * as HashSet from "@effect/data/HashSet";
import * as MutableRef from "@effect/data/MutableRef";
import * as Option from "@effect/data/Option";
/** @internal */
const FiberIdSymbolKey = "@effect/io/Fiber/Id";
/** @internal */
export const FiberIdTypeId = /*#__PURE__*/Symbol.for(FiberIdSymbolKey);
/** @internal */
const OP_NONE = "None";
/** @internal */
const OP_RUNTIME = "Runtime";
/** @internal */
const OP_COMPOSITE = "Composite";
/** @internal */
class None {
  constructor() {
    this[_a] = FiberIdTypeId;
    this._tag = OP_NONE;
  }
  [(_a = FiberIdTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this._tag))(Hash.hash(FiberIdSymbolKey));
  }
  [Equal.symbol](that) {
    return isFiberId(that) && that._tag === OP_NONE;
  }
}
/** @internal */
class Runtime {
  constructor(id, startTimeMillis) {
    this.id = id;
    this.startTimeMillis = startTimeMillis;
    this[_b] = FiberIdTypeId;
    this._tag = OP_RUNTIME;
  }
  [(_b = FiberIdTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.startTimeMillis))(Hash.combine(Hash.hash(this.id))(Hash.combine(Hash.hash(this._tag))(Hash.hash(FiberIdSymbolKey))));
  }
  [Equal.symbol](that) {
    return isFiberId(that) && that._tag === OP_RUNTIME && this.id === that.id && this.startTimeMillis === that.startTimeMillis;
  }
}
/** @internal */
class Composite {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this[_c] = FiberIdTypeId;
    this._tag = OP_COMPOSITE;
  }
  [(_c = FiberIdTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.right))(Hash.combine(Hash.hash(this.left))(Hash.combine(Hash.hash(this._tag))(Hash.hash(FiberIdSymbolKey))));
  }
  [Equal.symbol](that) {
    return isFiberId(that) && that._tag === OP_COMPOSITE && Equal.equals(this.left, that.left) && Equal.equals(this.right, that.right);
  }
}
/** @internal */
export const none = /*#__PURE__*/new None();
/** @internal */
export const runtime = (id, startTimeMillis) => {
  return new Runtime(id, startTimeMillis);
};
/** @internal */
export const composite = (left, right) => {
  return new Composite(left, right);
};
/** @internal */
export const isFiberId = self => {
  return typeof self === "object" && self != null && FiberIdTypeId in self;
};
/** @internal */
export const isNone = self => {
  return self._tag === OP_NONE || HashSet.every(id => isNone(id))(toSet(self));
};
/** @internal */
export const isRuntime = self => {
  return self._tag === OP_RUNTIME;
};
/** @internal */
export const isComposite = self => {
  return self._tag === OP_COMPOSITE;
};
/** @internal */
export const combine = /*#__PURE__*/dual(2, (self, that) => {
  if (self._tag === OP_NONE) {
    return that;
  }
  if (that._tag === OP_NONE) {
    return self;
  }
  return new Composite(self, that);
});
/** @internal */
export const combineAll = fiberIds => {
  return HashSet.reduce(none, (a, b) => combine(b)(a))(fiberIds);
};
/** @internal */
export const getOrElse = /*#__PURE__*/dual(2, (self, that) => isNone(self) ? that : self);
/** @internal */
export const ids = self => {
  switch (self._tag) {
    case OP_NONE:
      {
        return HashSet.empty();
      }
    case OP_RUNTIME:
      {
        return HashSet.make(self.id);
      }
    case OP_COMPOSITE:
      {
        return HashSet.union(ids(self.right))(ids(self.left));
      }
  }
};
const _fiberCounter = /*#__PURE__*/globalValue( /*#__PURE__*/Symbol.for("@effect/io/Fiber/Id/_fiberCounter"), () => MutableRef.make(0));
/** @internal */
export const make = (id, startTimeSeconds) => {
  return new Runtime(id, startTimeSeconds);
};
/** @internal */
export const threadName = self => {
  const identifiers = Array.from(ids(self)).map(n => `#${n}`).join(",");
  return identifiers;
};
/** @internal */
export const toOption = self => {
  const fiberIds = toSet(self);
  if (HashSet.size(fiberIds) === 0) {
    return Option.none();
  }
  let first = true;
  let acc;
  for (const fiberId of fiberIds) {
    if (first) {
      acc = fiberId;
      first = false;
    } else {
      // @ts-expect-error
      acc = combine(fiberId)(acc);
    }
  }
  // @ts-expect-error
  return Option.some(acc);
};
/** @internal */
export const toSet = self => {
  switch (self._tag) {
    case OP_NONE:
      {
        return HashSet.empty();
      }
    case OP_RUNTIME:
      {
        return HashSet.make(self);
      }
    case OP_COMPOSITE:
      {
        return HashSet.union(toSet(self.right))(toSet(self.left));
      }
  }
};
/** @internal */
export const unsafeMake = () => {
  const id = MutableRef.get(_fiberCounter);
  MutableRef.set(id + 1)(_fiberCounter);
  return new Runtime(id, new Date().getTime());
};
//# sourceMappingURL=fiberId.mjs.map