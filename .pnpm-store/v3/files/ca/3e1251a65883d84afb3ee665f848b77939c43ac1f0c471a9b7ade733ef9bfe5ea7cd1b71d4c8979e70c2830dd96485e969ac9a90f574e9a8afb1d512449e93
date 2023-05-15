"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.values = exports.union = exports.toggle = exports.some = exports.size = exports.remove = exports.reduce = exports.partition = exports.mutate = exports.map = exports.make = exports.isSubset = exports.isHashSet = exports.intersection = exports.has = exports.fromIterable = exports.forEach = exports.flatMap = exports.filter = exports.every = exports.endMutation = exports.empty = exports.difference = exports.beginMutation = exports.add = exports.HashSetTypeId = exports.HashSetImpl = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var HM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/HashMap"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const HashSetTypeId = /*#__PURE__*/Symbol.for("@effect/data/HashSet");
/** @internal */
exports.HashSetTypeId = HashSetTypeId;
class HashSetImpl {
  constructor(_keyMap) {
    this._keyMap = _keyMap;
    this._id = HashSetTypeId;
  }
  [Symbol.iterator]() {
    return HM.keys(this._keyMap);
  }
  [Hash.symbol]() {
    return Hash.combine(Hash.hash(this._keyMap))(Hash.hash("HashSet"));
  }
  [Equal.symbol](that) {
    if (isHashSet(that)) {
      return HM.size(this._keyMap) === HM.size(that._keyMap) && Equal.equals(this._keyMap, that._keyMap);
    }
    return false;
  }
  toString() {
    return `HashSet(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "HashSet",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
}
/** @internal */
exports.HashSetImpl = HashSetImpl;
const isHashSet = u => typeof u === "object" && u != null && "_id" in u && u["_id"] === HashSetTypeId;
/** @internal */
exports.isHashSet = isHashSet;
const empty = () => new HashSetImpl(HM.empty());
/** @internal */
exports.empty = empty;
const fromIterable = elements => {
  const set = beginMutation(empty());
  for (const value of elements) {
    add(set, value);
  }
  return endMutation(set);
};
/** @internal */
exports.fromIterable = fromIterable;
const make = (...elements) => {
  const set = beginMutation(empty());
  for (const value of elements) {
    add(set, value);
  }
  return endMutation(set);
};
/** @internal */
exports.make = make;
const has = /*#__PURE__*/Dual.dual(2, (self, value) => HM.has(self._keyMap, value));
/** @internal */
exports.has = has;
const some = /*#__PURE__*/Dual.dual(2, (self, f) => {
  let found = false;
  for (const value of self) {
    found = f(value);
    if (found) {
      break;
    }
  }
  return found;
});
/** @internal */
exports.some = some;
const every = /*#__PURE__*/Dual.dual(2, (self, f) => !some(self, a => !f(a)));
/** @internal */
exports.every = every;
const isSubset = /*#__PURE__*/Dual.dual(2, (self, that) => every(self, value => has(that, value)));
/** @internal */
exports.isSubset = isSubset;
const values = self => HM.keys(self._keyMap);
/** @internal */
exports.values = values;
const size = self => HM.size(self._keyMap);
/** @internal */
exports.size = size;
const beginMutation = self => new HashSetImpl(HM.beginMutation(self._keyMap));
/** @internal */
exports.beginMutation = beginMutation;
const endMutation = self => {
  ;
  self._keyMap._editable = false;
  return self;
};
/** @internal */
exports.endMutation = endMutation;
const mutate = /*#__PURE__*/Dual.dual(2, (self, f) => {
  const transient = beginMutation(self);
  f(transient);
  return endMutation(transient);
});
/** @internal */
exports.mutate = mutate;
const add = /*#__PURE__*/Dual.dual(2, (self, value) => self._keyMap._editable ? (HM.set(value, true)(self._keyMap), self) : new HashSetImpl(HM.set(value, true)(self._keyMap)));
/** @internal */
exports.add = add;
const remove = /*#__PURE__*/Dual.dual(2, (self, value) => self._keyMap._editable ? (HM.remove(value)(self._keyMap), self) : new HashSetImpl(HM.remove(value)(self._keyMap)));
/** @internal */
exports.remove = remove;
const difference = /*#__PURE__*/Dual.dual(2, (self, that) => mutate(self, set => {
  for (const value of that) {
    remove(set, value);
  }
}));
/** @internal */
exports.difference = difference;
const intersection = /*#__PURE__*/Dual.dual(2, (self, that) => mutate(empty(), set => {
  for (const value of that) {
    if (has(value)(self)) {
      add(value)(set);
    }
  }
}));
/** @internal */
exports.intersection = intersection;
const union = /*#__PURE__*/Dual.dual(2, (self, that) => mutate(empty(), set => {
  forEach(self, value => add(set, value));
  for (const value of that) {
    add(set, value);
  }
}));
/** @internal */
exports.union = union;
const toggle = /*#__PURE__*/Dual.dual(2, (self, value) => has(self, value) ? remove(self, value) : add(self, value));
/** @internal */
exports.toggle = toggle;
const map = /*#__PURE__*/Dual.dual(2, (self, f) => mutate(empty(), set => {
  forEach(self, a => {
    const b = f(a);
    if (!has(set, b)) {
      add(set, b);
    }
  });
}));
/** @internal */
exports.map = map;
const flatMap = /*#__PURE__*/Dual.dual(2, (self, f) => mutate(empty(), set => {
  forEach(self, a => {
    for (const b of f(a)) {
      if (!has(set, b)) {
        add(set, b);
      }
    }
  });
}));
/** @internal */
exports.flatMap = flatMap;
const forEach = /*#__PURE__*/Dual.dual(2, (self, f) => HM.forEachWithIndex(self._keyMap, (_, k) => f(k)));
/** @internal */
exports.forEach = forEach;
const reduce = /*#__PURE__*/Dual.dual(3, (self, zero, f) => HM.reduceWithIndex(self._keyMap, zero, (z, _, a) => f(z, a)));
/** @internal */
exports.reduce = reduce;
const filter = /*#__PURE__*/Dual.dual(2, (self, f) => {
  return mutate(empty(), set => {
    const iterator = values(self);
    let next;
    while (!(next = iterator.next()).done) {
      const value = next.value;
      if (f(value)) {
        add(set, value);
      }
    }
  });
});
/** @internal */
exports.filter = filter;
const partition = /*#__PURE__*/Dual.dual(2, (self, f) => {
  const iterator = values(self);
  let next;
  const right = beginMutation(empty());
  const left = beginMutation(empty());
  while (!(next = iterator.next()).done) {
    const value = next.value;
    if (f(value)) {
      add(right, value);
    } else {
      add(left, value);
    }
  }
  return [endMutation(left), endMutation(right)];
});
exports.partition = partition;
//# sourceMappingURL=HashSet.js.map