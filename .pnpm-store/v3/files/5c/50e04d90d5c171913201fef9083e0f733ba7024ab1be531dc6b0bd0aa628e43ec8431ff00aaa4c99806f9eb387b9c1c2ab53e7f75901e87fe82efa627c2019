/**
 * @since 1.0.0
 */
import * as Dual from "@effect/data/Function"

const TypeId: unique symbol = Symbol.for("@effect/data/MutableList") as TypeId

/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category model
 */
export interface MutableList<A> extends Iterable<A> {
  readonly _id: TypeId

  /** @internal */
  head: LinkedListNode<A> | undefined
  /** @internal */
  tail: LinkedListNode<A> | undefined
}

/** @internal */
class MutableListImpl<A> implements MutableList<A> {
  readonly _id: TypeId = TypeId

  head: LinkedListNode<A> | undefined = undefined
  tail: LinkedListNode<A> | undefined = undefined
  _length = 0;

  [Symbol.iterator](): Iterator<A> {
    let done = false
    let head: LinkedListNode<A> | undefined = this.head
    return {
      next() {
        if (done) {
          return this.return!()
        }
        if (head == null) {
          done = true
          return this.return!()
        }
        const value = head.value
        head = head.next
        return { done, value }
      },
      return(value?: unknown) {
        if (!done) {
          done = true
        }
        return { done: true, value }
      }
    }
  }

  toString() {
    return `MutableList(${Array.from(this).map(String).join(", ")})`
  }

  toJSON() {
    return {
      _tag: "MutableList",
      values: Array.from(this)
    }
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON()
  }
}

/** @internal */
class LinkedListNode<T> {
  removed = false
  prev: LinkedListNode<T> | undefined = undefined
  next: LinkedListNode<T> | undefined = undefined
  constructor(readonly value: T) {}
}

/**
 * Creates an empty `MutableList`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const empty = <A>(): MutableList<A> => new MutableListImpl()

/**
 * Creates a new `MutableList` from an `Iterable`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const from = <A>(iterable: Iterable<A>): MutableList<A> => {
  const list: MutableList<A> = new MutableListImpl()
  for (const element of iterable) {
    append(list, element)
  }
  return list
}

/**
 * Creates a new `MutableList` from the specified elements.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = <A>(...elements: ReadonlyArray<A>): MutableList<A> => from(elements)

/**
 * Returns `true` if the list contains zero elements, `false`, otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isEmpty = <A>(self: MutableList<A>): boolean => length(self) === 0

/**
 * Returns the length of the list.
 *
 * @since 1.0.0
 * @category getters
 */
export const length = <A>(self: MutableList<A>): number => (self as MutableListImpl<A>)._length

/**
 * Returns the last element of the list, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
export const tail = <A>(self: MutableList<A>): A | undefined => self.tail === undefined ? undefined : self.tail.value

/**
 * Returns the first element of the list, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
export const head = <A>(self: MutableList<A>): A | undefined => self.head === undefined ? undefined : self.head.value

/**
 * Executes the specified function `f` for each element in the list.
 *
 * @since 1.0.0
 * @category traversing
 */
export const forEach: {
  <A>(f: (element: A) => void): (self: MutableList<A>) => void
  <A>(self: MutableList<A>, f: (element: A) => void): void
} = Dual.dual<
  <A>(f: (element: A) => void) => (self: MutableList<A>) => void,
  <A>(self: MutableList<A>, f: (element: A) => void) => void
>(2, (self, f) => {
  let current = self.head
  while (current !== undefined) {
    f(current.value)
    current = current.next
  }
})

/**
 * Removes all elements from the doubly-linked list.
 *
 * @since 1.0.0
 * @category mutations
 */
export const reset = <A>(self: MutableList<A>): MutableList<A> => {
  ;(self as MutableListImpl<A>)._length = 0
  self.head = undefined
  self.tail = undefined
  return self
}

/**
 * Appends the specified value to the end of the list.
 *
 * @since 1.0.0
 * @category mutations
 */
export const append: {
  <A>(value: A): (self: MutableList<A>) => MutableList<A>
  <A>(self: MutableList<A>, value: A): MutableList<A>
} = Dual.dual<
  <A>(value: A) => (self: MutableList<A>) => MutableList<A>,
  <A>(self: MutableList<A>, value: A) => MutableList<A>
>(2, <A>(self: MutableList<A>, value: A) => {
  const node = new LinkedListNode(value)
  if (self.head === undefined) {
    self.head = node
  }
  if (self.tail === undefined) {
    self.tail = node
  } else {
    self.tail.next = node
    node.prev = self.tail
    self.tail = node
  }
  ;(self as MutableListImpl<A>)._length += 1
  return self
})

/**
 * Removes the first value from the list and returns it, if it exists.
 *
 * @since 0.0.1
 * @category mutations
 */
export const shift = <A>(self: MutableList<A>): A | undefined => {
  const head = self.head
  if (head !== undefined) {
    remove(self, head)
    return head.value
  }
  return undefined
}

/**
 * Removes the last value from the list and returns it, if it exists.
 *
 * @since 0.0.1
 * @category mutations
 */
export const pop = <A>(self: MutableList<A>): A | undefined => {
  const tail = self.tail
  if (tail !== undefined) {
    remove(self, tail)
    return tail.value
  }
  return undefined
}

/**
 * Prepends the specified value to the beginning of the list.
 *
 * @since 1.0.0
 * @category mutations
 */
export const prepend: {
  <A>(value: A): (self: MutableList<A>) => MutableList<A>
  <A>(self: MutableList<A>, value: A): MutableList<A>
} = Dual.dual<
  <A>(value: A) => (self: MutableList<A>) => MutableList<A>,
  <A>(self: MutableList<A>, value: A) => MutableList<A>
>(2, <A>(self: MutableList<A>, value: A) => {
  const node = new LinkedListNode(value)
  node.next = self.head
  if (self.head !== undefined) {
    self.head.prev = node
  }
  self.head = node
  if (self.tail === undefined) {
    self.tail = node
  }
  ;(self as MutableListImpl<A>)._length += 1
  return self
})

const remove = <A>(self: MutableList<A>, node: LinkedListNode<A>): void => {
  if (node.removed) {
    return
  }
  node.removed = true
  if (node.prev !== undefined && node.next !== undefined) {
    node.prev.next = node.next
    node.next.prev = node.prev
  } else if (node.prev !== undefined) {
    self.tail = node.prev
    node.prev.next = undefined
  } else if (node.next !== undefined) {
    self.head = node.next
    node.next.prev = undefined
  } else {
    self.tail = undefined
    self.head = undefined
  }
  if ((self as MutableListImpl<A>)._length > 0) {
    ;(self as MutableListImpl<A>)._length -= 1
  }
}
