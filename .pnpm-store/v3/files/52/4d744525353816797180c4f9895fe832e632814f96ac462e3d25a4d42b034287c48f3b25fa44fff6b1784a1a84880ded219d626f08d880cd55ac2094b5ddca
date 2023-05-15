/**
 * @since 1.0.0
 */
import * as Dual from "@effect/data/Function";
import * as MutableHashMap from "@effect/data/MutableHashMap";
const TypeId = /*#__PURE__*/Symbol.for("@effect/data/MutableHashSet");
/** @internal */
class MutableHashSetImpl {
  constructor(keyMap) {
    this.keyMap = keyMap;
    this._id = TypeId;
    this._V = _ => _;
  }
  [Symbol.iterator]() {
    return Array.from(this.keyMap).map(([_]) => _)[Symbol.iterator]();
  }
  toString() {
    return `MutableHashSet(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "MutableHashSet",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
}
/**
 * @since 1.0.0
 * @category constructors
 */
export const empty = () => new MutableHashSetImpl(MutableHashMap.empty());
/**
 * @since 1.0.0
 * @category constructors
 */
export const fromIterable = keys => new MutableHashSetImpl(MutableHashMap.fromIterable(Array.from(keys).map(k => [k, true])));
/**
 * @since 1.0.0
 * @category constructors
 */
export const make = (...keys) => fromIterable(keys);
/**
 * @since 1.0.0
 * @category elements
 */
export const add = /*#__PURE__*/Dual.dual(2, (self, key) => (MutableHashMap.set(self.keyMap, key, true), self));
/**
 * @since 1.0.0
 * @category elements
 */
export const has = /*#__PURE__*/Dual.dual(2, (self, key) => MutableHashMap.has(self.keyMap, key));
/**
 * @since 1.0.0
 * @category elements
 */
export const remove = /*#__PURE__*/Dual.dual(2, (self, key) => (MutableHashMap.remove(self.keyMap, key), self));
/**
 * @since 1.0.0
 * @category elements
 */
export const size = self => MutableHashMap.size(self.keyMap);
//# sourceMappingURL=MutableHashSet.mjs.map