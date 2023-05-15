/**
 * @since 1.0.0
 */
import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
import * as RBT from "@effect/data/RedBlackTree";
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
export const isSortedSet = u => typeof u === "object" && u != null && "_id" in u && u["_id"] === TypeId;
/**
 * @since 1.0.0
 * @category constructors
 */
export const empty = O => new SortedSetImpl(RBT.empty(O));
/**
 * @since 1.0.0
 * @category constructors
 */
export const fromIterable = ord => iterable => new SortedSetImpl(RBT.fromIterable(ord)(Array.from(iterable).map(k => [k, true])));
/**
 * @since 1.0.0
 * @category constructors
 */
export const make = ord => (...entries) => fromIterable(ord)(entries);
/**
 * @since 1.0.0
 * @category elements
 */
export const add = /*#__PURE__*/Dual.dual(2, (self, value) => RBT.has(self.keyTree, value) ? self : new SortedSetImpl(RBT.insert(self.keyTree, value, true)));
/**
 * @since 1.0.0
 * @category mutations
 */
export const difference = /*#__PURE__*/Dual.dual(2, (self, that) => {
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
export const every = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
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
export const filter = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
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
export const flatMap = /*#__PURE__*/Dual.dual(3, (self, O, f) => {
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
export const forEach = /*#__PURE__*/Dual.dual(2, (self, f) => RBT.forEach(self.keyTree, f));
/**
 * @since 1.0.0
 * @category elements
 */
export const has = /*#__PURE__*/Dual.dual(2, (self, value) => RBT.has(self.keyTree, value));
/**
 * @since 1.0.0
 * @category mutations
 */
export const intersection = /*#__PURE__*/Dual.dual(2, (self, that) => {
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
export const isSubset = /*#__PURE__*/Dual.dual(2, (self, that) => every(self, a => has(that, a)));
/**
 * @since 1.0.0
 * @category mapping
 */
export const map = /*#__PURE__*/Dual.dual(3, (self, O, f) => {
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
export const partition = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
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
export const remove = /*#__PURE__*/Dual.dual(2, (self, value) => new SortedSetImpl(RBT.removeFirst(self.keyTree, value)));
/**
 * @since 1.0.0
 * @category getters
 */
export const size = self => RBT.size(self.keyTree);
/**
 * @since 1.0.0
 * @category elements
 */
export const some = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
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
export const toggle = /*#__PURE__*/Dual.dual(2, (self, value) => has(self, value) ? remove(self, value) : add(self, value));
/**
 * @since 1.0.0
 * @category mutations
 */
export const union = /*#__PURE__*/Dual.dual(2, (self, that) => {
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
export const values = self => RBT.keys(self.keyTree);
//# sourceMappingURL=SortedSet.mjs.map