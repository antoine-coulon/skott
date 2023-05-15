import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import { identity } from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
import { fromBitmap, hashFragment, toBitmap } from "@effect/data/internal/HashMap/bitwise";
import { SIZE } from "@effect/data/internal/HashMap/config";
import * as Node from "@effect/data/internal/HashMap/node";
import * as Option from "@effect/data/Option";
/** @internal */
export const HashMapTypeId = /*#__PURE__*/Symbol.for("@effect/data/HashMap");
/** @internal */
export class HashMapImpl {
  constructor(_editable, _edit, _root, _size) {
    this._editable = _editable;
    this._edit = _edit;
    this._root = _root;
    this._size = _size;
    this._id = HashMapTypeId;
  }
  [Symbol.iterator]() {
    return new HashMapIterator(this, (k, v) => [k, v]);
  }
  [Hash.symbol]() {
    let hash = Hash.hash("HashMap");
    for (const item of this) {
      hash ^= Hash.combine(Hash.hash(item[0]))(Hash.hash(item[1]));
    }
    return hash;
  }
  [Equal.symbol](that) {
    if (isHashMap(that)) {
      if (that._size !== this._size) {
        return false;
      }
      for (const item of this) {
        const elem = getHash(item[0], Hash.hash(item[0]))(that);
        if (Option.isNone(elem)) {
          return false;
        } else {
          if (!Equal.equals(item[1], elem.value)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
  toString() {
    return `HashMap(${Array.from(this).map(([k, v]) => `[${String(k)}, ${String(v)}]`).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "HashMap",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
}
class HashMapIterator {
  constructor(map, f) {
    this.map = map;
    this.f = f;
    this.v = visitLazy(this.map._root, this.f, undefined);
  }
  next() {
    if (Option.isNone(this.v)) {
      return {
        done: true,
        value: undefined
      };
    }
    const v0 = this.v.value;
    this.v = applyCont(v0.cont);
    return {
      done: false,
      value: v0.value
    };
  }
  [Symbol.iterator]() {
    return new HashMapIterator(this.map, this.f);
  }
}
const applyCont = cont => cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : Option.none();
const visitLazy = (node, f, cont = undefined) => {
  switch (node._tag) {
    case "LeafNode":
      {
        if (Option.isSome(node.value)) {
          return Option.some({
            value: f(node.key, node.value.value),
            cont
          });
        }
        return applyCont(cont);
      }
    case "CollisionNode":
    case "ArrayNode":
    case "IndexedNode":
      {
        const children = node.children;
        return visitLazyChildren(children.length, children, 0, f, cont);
      }
    default:
      {
        return applyCont(cont);
      }
  }
};
const visitLazyChildren = (len, children, i, f, cont) => {
  while (i < len) {
    const child = children[i++];
    if (child && !Node.isEmptyNode(child)) {
      return visitLazy(child, f, [len, children, i, f, cont]);
    }
  }
  return applyCont(cont);
};
/** @internal */
export const empty = () => new HashMapImpl(false, 0, new Node.EmptyNode(), 0);
/** @internal */
export const make = (...entries) => fromIterable(entries);
/** @internal */
export const fromIterable = entries => {
  const map = beginMutation(empty());
  for (const entry of entries) {
    set(entry[0], entry[1])(map);
  }
  return endMutation(map);
};
/** @internal */
export const isHashMap = u => typeof u === "object" && u != null && "_id" in u && u["_id"] === HashMapTypeId;
/** @internal */
export const isEmpty = self => self && Node.isEmptyNode(self._root);
/** @internal */
export const get = /*#__PURE__*/Dual.dual(2, (self, key) => getHash(self, key, Hash.hash(key)));
/** @internal */
export const getHash = /*#__PURE__*/Dual.dual(3, (self, key, hash) => {
  let node = self._root;
  let shift = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    switch (node._tag) {
      case "LeafNode":
        {
          return Equal.equals(key, node.key) ? node.value : Option.none();
        }
      case "CollisionNode":
        {
          if (hash === node.hash) {
            const children = node.children;
            for (let i = 0, len = children.length; i < len; ++i) {
              const child = children[i];
              if ("key" in child && Equal.equals(key, child.key)) {
                return child.value;
              }
            }
          }
          return Option.none();
        }
      case "IndexedNode":
        {
          const frag = hashFragment(shift, hash);
          const bit = toBitmap(frag);
          if (node.mask & bit) {
            node = node.children[fromBitmap(node.mask, bit)];
            shift += SIZE;
            break;
          }
          return Option.none();
        }
      case "ArrayNode":
        {
          node = node.children[hashFragment(shift, hash)];
          if (node) {
            shift += SIZE;
            break;
          }
          return Option.none();
        }
      default:
        return Option.none();
    }
  }
});
/** @internal */
export const unsafeGet = /*#__PURE__*/Dual.dual(2, (self, key) => {
  const element = getHash(self, key, Hash.hash(key));
  if (Option.isNone(element)) {
    throw new Error("Error: Expected map to contain key");
  }
  return element.value;
});
/** @internal */
export const has = /*#__PURE__*/Dual.dual(2, (self, key) => Option.isSome(getHash(self, key, Hash.hash(key))));
/** @internal */
export const hasHash = /*#__PURE__*/Dual.dual(3, (self, key, hash) => Option.isSome(getHash(self, key, hash)));
/** @internal */
export const set = /*#__PURE__*/Dual.dual(3, (self, key, value) => modifyAt(self, key, () => Option.some(value)));
/** @internal */
export const setTree = /*#__PURE__*/Dual.dual(3, (self, newRoot, newSize) => {
  if (self._editable) {
    ;
    self._root = newRoot;
    self._size = newSize;
    return self;
  }
  return newRoot === self._root ? self : new HashMapImpl(self._editable, self._edit, newRoot, newSize);
});
/** @internal */
export const keys = self => new HashMapIterator(self, key => key);
/** @internal */
export const values = self => new HashMapIterator(self, (_, value) => value);
/** @internal */
export const size = self => self._size;
/** @internal */
export const beginMutation = self => new HashMapImpl(true, self._edit + 1, self._root, self._size);
/** @internal */
export const endMutation = self => {
  ;
  self._editable = false;
  return self;
};
/** @internal */
export const mutate = /*#__PURE__*/Dual.dual(2, (self, f) => {
  const transient = beginMutation(self);
  f(transient);
  return endMutation(transient);
});
/** @internal */
export const modifyAt = /*#__PURE__*/Dual.dual(3, (self, key, f) => modifyHash(self, key, Hash.hash(key), f));
/** @internal */
export const modifyHash = /*#__PURE__*/Dual.dual(4, (self, key, hash, f) => {
  const size = {
    value: self._size
  };
  const newRoot = self._root.modify(self._editable ? self._edit : NaN, 0, f, hash, key, size);
  return setTree(newRoot, size.value)(self);
});
/** @internal */
export const modify = /*#__PURE__*/Dual.dual(3, (self, key, f) => modifyAt(self, key, Option.map(f)));
/** @internal */
export const union = /*#__PURE__*/Dual.dual(2, (self, that) => {
  const result = beginMutation(self);
  forEachWithIndex(that, (v, k) => set(result, k, v));
  return endMutation(result);
});
/** @internal */
export const remove = /*#__PURE__*/Dual.dual(2, (self, key) => modifyAt(self, key, Option.none));
/** @internal */
export const removeMany = /*#__PURE__*/Dual.dual(2, (self, keys) => mutate(self, map => {
  for (const key of keys) {
    remove(key)(map);
  }
}));
/** @internal */
export const map = /*#__PURE__*/Dual.dual(2, (self, f) => mapWithIndex(self, v => f(v)));
/**
 * Maps over the entries of the `HashMap` using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapWithIndex = /*#__PURE__*/Dual.dual(2, (self, f) => reduceWithIndex(self, empty(), (map, value, key) => set(map, key, f(value, key))));
/** @internal */
export const flatMap = /*#__PURE__*/Dual.dual(2, (self, f) => flatMapWithIndex(self, v => f(v)));
/** @internal */
export const flatMapWithIndex = /*#__PURE__*/Dual.dual(2, (self, f) => reduceWithIndex(self, empty(), (zero, value, key) => mutate(zero, map => forEachWithIndex(f(value, key), (value, key) => set(map, key, value)))));
/** @internal */
export const forEach = /*#__PURE__*/Dual.dual(2, (self, f) => forEachWithIndex(self, value => f(value)));
/** @internal */
export const forEachWithIndex = /*#__PURE__*/Dual.dual(2, (self, f) => reduceWithIndex(self, void 0, (_, value, key) => f(value, key)));
/** @internal */
export const reduce = /*#__PURE__*/Dual.dual(3, (self, z, f) => reduceWithIndex(self, z, (acc, v) => f(acc, v)));
/** @internal */
export const reduceWithIndex = /*#__PURE__*/Dual.dual(3, (self, zero, f) => {
  const root = self._root;
  if (root._tag === "LeafNode") {
    return Option.isSome(root.value) ? f(zero, root.value.value, root.key) : zero;
  }
  if (root._tag === "EmptyNode") {
    return zero;
  }
  const toVisit = [root.children];
  let children;
  while (children = toVisit.pop()) {
    for (let i = 0, len = children.length; i < len;) {
      const child = children[i++];
      if (child && !Node.isEmptyNode(child)) {
        if (child._tag === "LeafNode") {
          if (Option.isSome(child.value)) {
            zero = f(zero, child.value.value, child.key);
          }
        } else {
          toVisit.push(child.children);
        }
      }
    }
  }
  return zero;
});
/** @internal */
export const filter = /*#__PURE__*/Dual.dual(2, (self, f) => filterWithIndex(self, f));
/** @internal */
export const filterWithIndex = /*#__PURE__*/Dual.dual(2, (self, f) => mutate(empty(), map => {
  for (const [k, a] of self) {
    if (f(a, k)) {
      set(map, k, a);
    }
  }
}));
/** @internal */
export const compact = self => filterMap(self, identity);
/** @internal */
export const filterMap = /*#__PURE__*/Dual.dual(2, (self, f) => filterMapWithIndex(self, f));
/** @internal */
export const filterMapWithIndex = /*#__PURE__*/Dual.dual(2, (self, f) => mutate(empty(), map => {
  for (const [k, a] of self) {
    const option = f(a, k);
    if (Option.isSome(option)) {
      set(map, k, option.value);
    }
  }
}));
//# sourceMappingURL=HashMap.mjs.map