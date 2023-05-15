/**
 * @since 1.0.0
 */
import * as Dual from "@effect/data/Function";
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
export const empty = () => new MutableListImpl();
/**
 * Creates a new `MutableList` from an `Iterable`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const from = iterable => {
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
export const make = (...elements) => from(elements);
/**
 * Returns `true` if the list contains zero elements, `false`, otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isEmpty = self => length(self) === 0;
/**
 * Returns the length of the list.
 *
 * @since 1.0.0
 * @category getters
 */
export const length = self => self._length;
/**
 * Returns the last element of the list, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
export const tail = self => self.tail === undefined ? undefined : self.tail.value;
/**
 * Returns the first element of the list, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
export const head = self => self.head === undefined ? undefined : self.head.value;
/**
 * Executes the specified function `f` for each element in the list.
 *
 * @since 1.0.0
 * @category traversing
 */
export const forEach = /*#__PURE__*/Dual.dual(2, (self, f) => {
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
export const reset = self => {
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
export const append = /*#__PURE__*/Dual.dual(2, (self, value) => {
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
export const shift = self => {
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
export const pop = self => {
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
export const prepend = /*#__PURE__*/Dual.dual(2, (self, value) => {
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
//# sourceMappingURL=MutableList.mjs.map