"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeMake = exports.toSet = exports.toOption = exports.threadName = exports.runtime = exports.none = exports.make = exports.isRuntime = exports.isNone = exports.isFiberId = exports.isComposite = exports.ids = exports.getOrElse = exports.composite = exports.combineAll = exports.combine = exports.FiberIdTypeId = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var _Global = /*#__PURE__*/require("@effect/data/Global");
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var MutableRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b, _c;
/** @internal */
const FiberIdSymbolKey = "@effect/io/Fiber/Id";
/** @internal */
const FiberIdTypeId = /*#__PURE__*/Symbol.for(FiberIdSymbolKey);
/** @internal */
exports.FiberIdTypeId = FiberIdTypeId;
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
const none = /*#__PURE__*/new None();
/** @internal */
exports.none = none;
const runtime = (id, startTimeMillis) => {
  return new Runtime(id, startTimeMillis);
};
/** @internal */
exports.runtime = runtime;
const composite = (left, right) => {
  return new Composite(left, right);
};
/** @internal */
exports.composite = composite;
const isFiberId = self => {
  return typeof self === "object" && self != null && FiberIdTypeId in self;
};
/** @internal */
exports.isFiberId = isFiberId;
const isNone = self => {
  return self._tag === OP_NONE || HashSet.every(id => isNone(id))(toSet(self));
};
/** @internal */
exports.isNone = isNone;
const isRuntime = self => {
  return self._tag === OP_RUNTIME;
};
/** @internal */
exports.isRuntime = isRuntime;
const isComposite = self => {
  return self._tag === OP_COMPOSITE;
};
/** @internal */
exports.isComposite = isComposite;
const combine = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => {
  if (self._tag === OP_NONE) {
    return that;
  }
  if (that._tag === OP_NONE) {
    return self;
  }
  return new Composite(self, that);
});
/** @internal */
exports.combine = combine;
const combineAll = fiberIds => {
  return HashSet.reduce(none, (a, b) => combine(b)(a))(fiberIds);
};
/** @internal */
exports.combineAll = combineAll;
const getOrElse = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => isNone(self) ? that : self);
/** @internal */
exports.getOrElse = getOrElse;
const ids = self => {
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
exports.ids = ids;
const _fiberCounter = /*#__PURE__*/(0, _Global.globalValue)( /*#__PURE__*/Symbol.for("@effect/io/Fiber/Id/_fiberCounter"), () => MutableRef.make(0));
/** @internal */
const make = (id, startTimeSeconds) => {
  return new Runtime(id, startTimeSeconds);
};
/** @internal */
exports.make = make;
const threadName = self => {
  const identifiers = Array.from(ids(self)).map(n => `#${n}`).join(",");
  return identifiers;
};
/** @internal */
exports.threadName = threadName;
const toOption = self => {
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
exports.toOption = toOption;
const toSet = self => {
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
exports.toSet = toSet;
const unsafeMake = () => {
  const id = MutableRef.get(_fiberCounter);
  MutableRef.set(id + 1)(_fiberCounter);
  return new Runtime(id, new Date().getTime());
};
exports.unsafeMake = unsafeMake;
//# sourceMappingURL=fiberId.js.map