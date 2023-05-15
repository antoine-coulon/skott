"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.values = exports.union = exports.toggle = exports.some = exports.size = exports.remove = exports.partition = exports.map = exports.make = exports.isSubset = exports.isSortedSet = exports.intersection = exports.has = exports.fromIterable = exports.forEach = exports.flatMap = exports.filter = exports.every = exports.empty = exports.difference = exports.add = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var RBT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/RedBlackTree"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = /*#__PURE__*/Symbol.for("@effect/data/SortedSet");
/** @internal */
class SortedSetImpl {
  constructor(keyTree) {
    this.keyTree = keyTree;
    this._id = TypeId;
  }
  [Hash.symbol]() {
    return Hash.combine(Hash.hash("@effect/data/SortedSet"))(Hash.hash(this.keyTree));
  }
  [Equal.symbol](that) {
    return isSortedSet(that) && Equal.equals(this.keyTree, that.keyTree);
  }
  [Symbol.iterator]() {
    return RBT.keys(this.keyTree);
  }
  toString() {
    return `SortedSet(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "SortedSet",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
}
/**
 * @since 1.0.0
 * @category refinements
 */
const isSortedSet = u => typeof u === "object" && u != null && "_id" in u && u["_id"] === TypeId;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.isSortedSet = isSortedSet;
const empty = O => new SortedSetImpl(RBT.empty(O));
/**
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const fromIterable = ord => iterable => new SortedSetImpl(RBT.fromIterable(ord)(Array.from(iterable).map(k => [k, true])));
/**
 * @since 1.0.0
 * @category constructors
 */
exports.fromIterable = fromIterable;
const make = ord => (...entries) => fromIterable(ord)(entries);
/**
 * @since 1.0.0
 * @category elements
 */
exports.make = make;
const add = /*#__PURE__*/Dual.dual(2, (self, value) => RBT.has(self.keyTree, value) ? self : new SortedSetImpl(RBT.insert(self.keyTree, value, true)));
/**
 * @since 1.0.0
 * @category mutations
 */
exports.add = add;
const difference = /*#__PURE__*/Dual.dual(2, (self, that) => {
  let out = self;
  for (const value of that) {
    out = remove(out, value);
  }
  return out;
});
/**
 * @since 1.0.0
 * @category elements
 */
exports.difference = difference;
const every = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
  for (const value of self) {
    if (!predicate(value)) {
      return false;
    }
  }
  return true;
});
/**
 * @since 1.0.0
 * @category filtering
 */
exports.every = every;
const filter = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
  const ord = RBT.getOrder(self.keyTree);
  let out = empty(ord);
  for (const value of self) {
    if (predicate(value)) {
      out = add(out, value);
    }
  }
  return out;
});
/**
 * @since 1.0.0
 * @category sequencing
 */
exports.filter = filter;
const flatMap = /*#__PURE__*/Dual.dual(3, (self, O, f) => {
  let out = empty(O);
  forEach(self, a => {
    for (const b of f(a)) {
      out = add(out, b);
    }
  });
  return out;
});
/**
 * @since 1.0.0
 * @category traversing
 */
exports.flatMap = flatMap;
const forEach = /*#__PURE__*/Dual.dual(2, (self, f) => RBT.forEach(self.keyTree, f));
/**
 * @since 1.0.0
 * @category elements
 */
exports.forEach = forEach;
const has = /*#__PURE__*/Dual.dual(2, (self, value) => RBT.has(self.keyTree, value));
/**
 * @since 1.0.0
 * @category mutations
 */
exports.has = has;
const intersection = /*#__PURE__*/Dual.dual(2, (self, that) => {
  const ord = RBT.getOrder(self.keyTree);
  let out = empty(ord);
  for (const value of that) {
    if (has(self, value)) {
      out = add(out, value);
    }
  }
  return out;
});
/**
 * @since 1.0.0
 * @category elements
 */
exports.intersection = intersection;
const isSubset = /*#__PURE__*/Dual.dual(2, (self, that) => every(self, a => has(that, a)));
/**
 * @since 1.0.0
 * @category mapping
 */
exports.isSubset = isSubset;
const map = /*#__PURE__*/Dual.dual(3, (self, O, f) => {
  let out = empty(O);
  forEach(self, a => {
    const b = f(a);
    if (!has(out, b)) {
      out = add(out, b);
    }
  });
  return out;
});
/**
 * @since 1.0.0
 * @category filtering
 */
exports.map = map;
const partition = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
  const ord = RBT.getOrder(self.keyTree);
  let right = empty(ord);
  let left = empty(ord);
  for (const value of self) {
    if (predicate(value)) {
      right = add(right, value);
    } else {
      left = add(left, value);
    }
  }
  return [left, right];
});
/**
 * @since 1.0.0
 * @category elements
 */
exports.partition = partition;
const remove = /*#__PURE__*/Dual.dual(2, (self, value) => new SortedSetImpl(RBT.removeFirst(self.keyTree, value)));
/**
 * @since 1.0.0
 * @category getters
 */
exports.remove = remove;
const size = self => RBT.size(self.keyTree);
/**
 * @since 1.0.0
 * @category elements
 */
exports.size = size;
const some = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
  for (const value of self) {
    if (predicate(value)) {
      return true;
    }
  }
  return false;
});
/**
 * @since 1.0.0
 * @category elements
 */
exports.some = some;
const toggle = /*#__PURE__*/Dual.dual(2, (self, value) => has(self, value) ? remove(self, value) : add(self, value));
/**
 * @since 1.0.0
 * @category mutations
 */
exports.toggle = toggle;
const union = /*#__PURE__*/Dual.dual(2, (self, that) => {
  const ord = RBT.getOrder(self.keyTree);
  let out = empty(ord);
  for (const value of self) {
    out = add(value)(out);
  }
  for (const value of that) {
    out = add(value)(out);
  }
  return out;
});
/**
 * @since 1.0.0
 * @category getters
 */
exports.union = union;
const values = self => RBT.keys(self.keyTree);
exports.values = values;
//# sourceMappingURL=SortedSet.js.map