"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.values = exports.size = exports.set = exports.remove = exports.reduceWithIndex = exports.reduce = exports.mapWithIndex = exports.map = exports.make = exports.keys = exports.isSortedMap = exports.isNonEmpty = exports.isEmpty = exports.headOption = exports.has = exports.getOrder = exports.get = exports.fromIterable = exports.entries = exports.empty = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var RBT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/RedBlackTree"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = /*#__PURE__*/Symbol.for("@effect/data/SortedMap");
/** @internal */
class SortedMapImpl {
  constructor(tree) {
    this.tree = tree;
    this._id = TypeId;
  }
  [Hash.symbol]() {
    return Hash.combine(Hash.hash("@effect/data/SortedMap"))(Hash.hash(this.tree));
  }
  [Equal.symbol](that) {
    return isSortedMap(that) && Equal.equals(this.tree, that.tree);
  }
  [Symbol.iterator]() {
    return this.tree[Symbol.iterator]();
  }
  toString() {
    return `SortedMap(${Array.from(this).map(([k, v]) => `[${String(k)}, ${String(v)}]`).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "SortedMap",
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
const isSortedMap = u => typeof u === "object" && u != null && "_id" in u && u["_id"] === TypeId;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.isSortedMap = isSortedMap;
const empty = ord => new SortedMapImpl(RBT.empty(ord));
/**
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const fromIterable = ord => iterable => new SortedMapImpl(RBT.fromIterable(ord)(iterable));
/**
 * @since 1.0.0
 * @category constructors
 */
exports.fromIterable = fromIterable;
const make = ord => (...entries) => fromIterable(ord)(entries);
/**
 * @since 1.0.0
 * @category predicates
 */
exports.make = make;
const isEmpty = self => size(self) === 0;
/**
 * @since 1.0.0
 * @category predicates
 */
exports.isEmpty = isEmpty;
const isNonEmpty = self => size(self) > 0;
/**
 * @since 1.0.0
 * @category getters
 */
exports.isNonEmpty = isNonEmpty;
const entries = self => self[Symbol.iterator]();
/**
 * @since 1.0.0
 * @category elements
 */
exports.entries = entries;
const get = /*#__PURE__*/Dual.dual(2, (self, key) => RBT.findFirst(self.tree, key));
/**
 * Gets the `Order<K>` that the `SortedMap<K, V>` is using.
 *
 * @since 1.0.0
 * @category getters
 */
exports.get = get;
const getOrder = self => RBT.getOrder(self.tree);
/**
 * @since 1.0.0
 * @category elements
 */
exports.getOrder = getOrder;
const has = /*#__PURE__*/Dual.dual(2, (self, key) => Option.isSome(get(self, key)));
/**
 * @since 1.0.0
 * @category elements
 */
exports.has = has;
const headOption = self => RBT.first(self.tree);
/**
 * @since 1.0.0
 * @category mapping
 */
exports.headOption = headOption;
const map = /*#__PURE__*/Dual.dual(2, (self, f) => mapWithIndex(self, a => f(a)));
/**
 * @since 1.0.0
 * @category mapping
 */
exports.map = map;
const mapWithIndex = /*#__PURE__*/Dual.dual(2, (self, f) => reduceWithIndex(self, empty(RBT.getOrder(self.tree)), (acc, v, k) => set(acc, k, f(v, k))));
/**
 * @since 1.0.0
 * @category getters
 */
exports.mapWithIndex = mapWithIndex;
const keys = self => RBT.keys(self.tree);
/**
 * @since 1.0.0
 * @category folding
 */
exports.keys = keys;
const reduce = /*#__PURE__*/Dual.dual(3, (self, zero, f) => RBT.reduce(self.tree, zero, f));
/**
 * @since 1.0.0
 * @category folding
 */
exports.reduce = reduce;
const reduceWithIndex = /*#__PURE__*/Dual.dual(3, (self, zero, f) => RBT.reduceWithIndex(self.tree, zero, f));
/**
 * @since 1.0.0
 * @category elements
 */
exports.reduceWithIndex = reduceWithIndex;
const remove = /*#__PURE__*/Dual.dual(2, (self, key) => new SortedMapImpl(RBT.removeFirst(self.tree, key)));
/**
 * @since 1.0.0
 * @category elements
 */
exports.remove = remove;
const set = /*#__PURE__*/Dual.dual(3, (self, key, value) => RBT.has(self.tree, key) ? new SortedMapImpl(RBT.insert(RBT.removeFirst(self.tree, key), key, value)) : new SortedMapImpl(RBT.insert(self.tree, key, value)));
/**
 * @since 1.0.0
 * @category getters
 */
exports.set = set;
const size = self => RBT.size(self.tree);
/**
 * @since 1.0.0
 * @category getters
 */
exports.size = size;
const values = self => RBT.values(self.tree);
exports.values = values;
//# sourceMappingURL=SortedMap.js.map