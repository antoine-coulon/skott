"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tail = exports.shift = exports.reset = exports.prepend = exports.pop = exports.make = exports.length = exports.isEmpty = exports.head = exports.from = exports.forEach = exports.empty = exports.append = void 0;
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = /*#__PURE__*/Symbol.for("@effect/data/MutableList");
/** @internal */
class MutableListImpl {
  constructor() {
    this._id = TypeId;
    this.head = undefined;
    this.tail = undefined;
    this._length = 0;
  }
  [Symbol.iterator]() {
    let done = false;
    let head = this.head;
    return {
      next() {
        if (done) {
          return this.return();
        }
        if (head == null) {
          done = true;
          return this.return();
        }
        const value = head.value;
        head = head.next;
        return {
          done,
          value
        };
      },
      return(value) {
        if (!done) {
          done = true;
        }
        return {
          done: true,
          value
        };
      }
    };
  }
  toString() {
    return `MutableList(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "MutableList",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
}
/** @internal */
class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.removed = false;
    this.prev = undefined;
    this.next = undefined;
  }
}
/**
 * Creates an empty `MutableList`.
 *
 * @since 1.0.0
 * @category constructors
 */
const empty = () => new MutableListImpl();
/**
 * Creates a new `MutableList` from an `Iterable`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const from = iterable => {
  const list = new MutableListImpl();
  for (const element of iterable) {
    append(list, element);
  }
  return list;
};
/**
 * Creates a new `MutableList` from the specified elements.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.from = from;
const make = (...elements) => from(elements);
/**
 * Returns `true` if the list contains zero elements, `false`, otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.make = make;
const isEmpty = self => length(self) === 0;
/**
 * Returns the length of the list.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isEmpty = isEmpty;
const length = self => self._length;
/**
 * Returns the last element of the list, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
exports.length = length;
const tail = self => self.tail === undefined ? undefined : self.tail.value;
/**
 * Returns the first element of the list, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
exports.tail = tail;
const head = self => self.head === undefined ? undefined : self.head.value;
/**
 * Executes the specified function `f` for each element in the list.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.head = head;
const forEach = /*#__PURE__*/Dual.dual(2, (self, f) => {
  let current = self.head;
  while (current !== undefined) {
    f(current.value);
    current = current.next;
  }
});
/**
 * Removes all elements from the doubly-linked list.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.forEach = forEach;
const reset = self => {
  ;
  self._length = 0;
  self.head = undefined;
  self.tail = undefined;
  return self;
};
/**
 * Appends the specified value to the end of the list.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.reset = reset;
const append = /*#__PURE__*/Dual.dual(2, (self, value) => {
  const node = new LinkedListNode(value);
  if (self.head === undefined) {
    self.head = node;
  }
  if (self.tail === undefined) {
    self.tail = node;
  } else {
    self.tail.next = node;
    node.prev = self.tail;
    self.tail = node;
  }
  ;
  self._length += 1;
  return self;
});
/**
 * Removes the first value from the list and returns it, if it exists.
 *
 * @since 0.0.1
 * @category mutations
 */
exports.append = append;
const shift = self => {
  const head = self.head;
  if (head !== undefined) {
    remove(self, head);
    return head.value;
  }
  return undefined;
};
/**
 * Removes the last value from the list and returns it, if it exists.
 *
 * @since 0.0.1
 * @category mutations
 */
exports.shift = shift;
const pop = self => {
  const tail = self.tail;
  if (tail !== undefined) {
    remove(self, tail);
    return tail.value;
  }
  return undefined;
};
/**
 * Prepends the specified value to the beginning of the list.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.pop = pop;
const prepend = /*#__PURE__*/Dual.dual(2, (self, value) => {
  const node = new LinkedListNode(value);
  node.next = self.head;
  if (self.head !== undefined) {
    self.head.prev = node;
  }
  self.head = node;
  if (self.tail === undefined) {
    self.tail = node;
  }
  ;
  self._length += 1;
  return self;
});
exports.prepend = prepend;
const remove = (self, node) => {
  if (node.removed) {
    return;
  }
  node.removed = true;
  if (node.prev !== undefined && node.next !== undefined) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  } else if (node.prev !== undefined) {
    self.tail = node.prev;
    node.prev.next = undefined;
  } else if (node.next !== undefined) {
    self.head = node.next;
    node.next.prev = undefined;
  } else {
    self.tail = undefined;
    self.head = undefined;
  }
  if (self._length > 0) {
    ;
    self._length -= 1;
  }
};
//# sourceMappingURL=MutableList.js.map