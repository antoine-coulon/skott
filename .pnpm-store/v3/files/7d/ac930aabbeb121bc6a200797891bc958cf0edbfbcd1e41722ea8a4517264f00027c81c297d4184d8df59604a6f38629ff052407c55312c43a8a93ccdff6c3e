/**
 * @since 1.0.0
 */
import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
import * as Option from "@effect/data/Option";
import * as RBT from "@effect/data/RedBlackTree";
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
export const isSortedMap = u => typeof u === "object" && u != null && "_id" in u && u["_id"] === TypeId;
/**
 * @since 1.0.0
 * @category constructors
 */
export const empty = ord => new SortedMapImpl(RBT.empty(ord));
/**
 * @since 1.0.0
 * @category constructors
 */
export const fromIterable = ord => iterable => new SortedMapImpl(RBT.fromIterable(ord)(iterable));
/**
 * @since 1.0.0
 * @category constructors
 */
export const make = ord => (...entries) => fromIterable(ord)(entries);
/**
 * @since 1.0.0
 * @category predicates
 */
export const isEmpty = self => size(self) === 0;
/**
 * @since 1.0.0
 * @category predicates
 */
export const isNonEmpty = self => size(self) > 0;
/**
 * @since 1.0.0
 * @category getters
 */
export const entries = self => self[Symbol.iterator]();
/**
 * @since 1.0.0
 * @category elements
 */
export const get = /*#__PURE__*/Dual.dual(2, (self, key) => RBT.findFirst(self.tree, key));
/**
 * Gets the `Order<K>` that the `SortedMap<K, V>` is using.
 *
 * @since 1.0.0
 * @category getters
 */
export const getOrder = self => RBT.getOrder(self.tree);
/**
 * @since 1.0.0
 * @category elements
 */
export const has = /*#__PURE__*/Dual.dual(2, (self, key) => Option.isSome(get(self, key)));
/**
 * @since 1.0.0
 * @category elements
 */
export const headOption = self => RBT.first(self.tree);
/**
 * @since 1.0.0
 * @category mapping
 */
export const map = /*#__PURE__*/Dual.dual(2, (self, f) => mapWithIndex(self, a => f(a)));
/**
 * @since 1.0.0
 * @category mapping
 */
export const mapWithIndex = /*#__PURE__*/Dual.dual(2, (self, f) => reduceWithIndex(self, empty(RBT.getOrder(self.tree)), (acc, v, k) => set(acc, k, f(v, k))));
/**
 * @since 1.0.0
 * @category getters
 */
export const keys = self => RBT.keys(self.tree);
/**
 * @since 1.0.0
 * @category folding
 */
export const reduce = /*#__PURE__*/Dual.dual(3, (self, zero, f) => RBT.reduce(self.tree, zero, f));
/**
 * @since 1.0.0
 * @category folding
 */
export const reduceWithIndex = /*#__PURE__*/Dual.dual(3, (self, zero, f) => RBT.reduceWithIndex(self.tree, zero, f));
/**
 * @since 1.0.0
 * @category elements
 */
export const remove = /*#__PURE__*/Dual.dual(2, (self, key) => new SortedMapImpl(RBT.removeFirst(self.tree, key)));
/**
 * @since 1.0.0
 * @category elements
 */
export const set = /*#__PURE__*/Dual.dual(3, (self, key, value) => RBT.has(self.tree, key) ? new SortedMapImpl(RBT.insert(RBT.removeFirst(self.tree, key), key, value)) : new SortedMapImpl(RBT.insert(self.tree, key, value)));
/**
 * @since 1.0.0
 * @category getters
 */
export const size = self => RBT.size(self.tree);
/**
 * @since 1.0.0
 * @category getters
 */
export const values = self => RBT.values(self.tree);
//# sourceMappingURL=SortedMap.mjs.map