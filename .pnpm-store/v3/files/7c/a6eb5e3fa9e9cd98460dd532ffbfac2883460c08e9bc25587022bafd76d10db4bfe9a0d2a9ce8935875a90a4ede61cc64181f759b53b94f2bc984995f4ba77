/**
 * @since 1.0.0
 */

/**
 * This file is ported from
 *
 * Scala (https://www.scala-lang.org)
 *
 * Copyright EPFL and Lightbend, Inc.
 *
 * Licensed under Apache License 2.0
 * (http://www.apache.org/licenses/LICENSE-2.0).
 */
import * as Chunk from "@effect/data/Chunk"
import * as Either from "@effect/data/Either"
import * as Equal from "@effect/data/Equal"
import * as Dual from "@effect/data/Function"
import { identity, unsafeCoerce } from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"
import * as Option from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"

const ListSymbolKey = "@effect/data/List"

/**
 * @since 1.0.0
 * @category symbol
 */
export const ListTypeId: unique symbol = Symbol.for(ListSymbolKey)

/**
 * @since 1.0.0
 * @category symbol
 */
export type ListTypeId = typeof ListTypeId

/**
 * Represents an immutable linked list of elements of type `A`.
 *
 * A `List` is optimal for last-in-first-out (LIFO), stack-like access patterns.
 * If you need another access pattern, for example, random access or FIFO,
 * consider using a collection more suited for that other than `List`.
 *
 * @since 1.0.0
 * @category models
 */
export type List<A> = Cons<A> | Nil<A>

/**
 * @since 1.0.0
 * @category models
 */
export interface Cons<A> extends List.Variance<A>, Iterable<A>, Equal.Equal {
  readonly _tag: "Cons"
  readonly head: A
  readonly tail: List<A>
}

/**
 * @since 1.0.0
 * @category models
 */
export interface Nil<A> extends List.Variance<A>, Iterable<A>, Equal.Equal {
  readonly _tag: "Nil"
}

type ConsNS<A> = Cons<A>
type NilNS<A> = Nil<A>

/**
 * @since 1.0.0
 */
export declare namespace List {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Variance<A> {
    readonly [ListTypeId]: {
      readonly _A: (_: never) => A
    }
  }

  /**
   * @since 1.0.0
   * @category models
   */
  export type Cons<A> = ConsNS<A>

  /**
   * @since 1.0.0
   * @category models
   */
  export type Nil<A> = NilNS<A>
}

const listVariance = {
  _A: (_: never) => _
}

class ConsImpl<A> implements List.Cons<A> {
  readonly _tag = "Cons"
  readonly [ListTypeId] = listVariance
  constructor(readonly head: A, public tail: List<A>) {}
  toString() {
    return `List.Cons(${toReadonlyArray(this).map(String).join(", ")})`
  }
  toJSON() {
    return {
      _tag: "List.Cons",
      values: toReadonlyArray(this)
    }
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON()
  }
  [Equal.symbol](that: unknown): boolean {
    return isList(that) &&
      this._tag === that._tag &&
      equalsWith(this, that, Equal.equals)
  }
  [Hash.symbol](): number {
    return Hash.string(ListSymbolKey)
  }
  [Symbol.iterator](): Iterator<A> {
    let done = false
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self: List<A> = this
    return {
      next() {
        if (done) {
          return this.return!()
        }
        if (self._tag === "Nil") {
          done = true
          return this.return!()
        }
        const value: A = self.head
        self = self.tail
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
}

class NilImpl<A> implements List.Nil<A> {
  readonly _tag = "Nil"
  readonly [ListTypeId] = listVariance
  toString() {
    return `List.Nil`
  }
  toJSON() {
    return {
      _tag: "List.Nil"
    }
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON()
  }
  [Hash.symbol](): number {
    return Hash.array(Array.from(this))
  }
  [Equal.symbol](that: unknown): boolean {
    return isList(that) && this._tag === that._tag
  }
  [Symbol.iterator](): Iterator<A> {
    return {
      next() {
        return { done: true, value: undefined }
      }
    }
  }
}

/**
 * Returns `true` if the specified value is a `List`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isList: {
  <A>(u: Iterable<A>): u is List<A>
  (u: unknown): u is List<unknown>
} = (u: unknown): u is List<unknown> => typeof u === "object" && u != null && ListTypeId in u

/**
 * Returns `true` if the specified value is a `List.Nil<A>`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isNil = <A>(self: List<A>): self is Nil<A> => self._tag === "Nil"

/**
 * Returns `true` if the specified value is a `List.Cons<A>`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isCons = <A>(self: List<A>): self is Cons<A> => self._tag === "Cons"

/**
 * Returns the number of elements contained in the specified `List`
 *
 * @since 1.0.0
 * @category getters
 */
export const length = <A>(self: List<A>): number => {
  let these = self
  let len = 0
  while (!isNil(these)) {
    len += 1
    these = these.tail
  }
  return len
}

/**
 * Returns `true` if the two lists are equal according to the provided function,
 * `false` otherwise.
 *
 * @since 1.0.0
 * @category combinators
 */
export const equalsWith: {
  <A, B>(that: List<B>, f: (a: A, b: B) => boolean): (self: List<A>) => boolean
  <A, B>(self: List<A>, that: List<B>, f: (a: A, b: B) => boolean): boolean
} = Dual.dual<
  <A, B>(that: List<B>, f: (a: A, b: B) => boolean) => (self: List<A>) => boolean,
  <A, B>(self: List<A>, that: List<B>, f: (a: A, b: B) => boolean) => boolean
>(3, <A, B>(self: List<A>, that: List<B>, f: (a: A, b: B) => boolean) => {
  if ((self as List<A | B>) === that) {
    return true
  }
  if (length(self) !== length(that)) {
    return false
  }
  const selfIterator = self[Symbol.iterator]()
  const thatIterator = that[Symbol.iterator]()
  let nextSelf: IteratorResult<A>
  let nextThat: IteratorResult<B>
  while (
    !(nextSelf = selfIterator.next()).done &&
    !(nextThat = thatIterator.next()).done
  ) {
    if (!f(nextSelf.value, nextThat.value)) {
      return false
    }
  }
  return true
})

const _Nil = new NilImpl<never>()

/**
 * Constructs a new `List.Nil<A>`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const nil = <A = never>(): List.Nil<A> => _Nil

/**
 * Constructs a new `List.Cons<A>` from the specified `head` and `tail` values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const cons = <A>(head: A, tail: List<A>): List.Cons<A> => new ConsImpl(head, tail)

/**
 * Constructs a new empty `List<A>`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const empty = <A = never>(): List<A> => _Nil

/**
 * Constructs a new `List<A>` from the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const of = <A>(value: A): List<A> => new ConsImpl(value, _Nil)

/**
 * Constructs a new `List<A>` from the specified `Iterable<A>`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fromIterable = <A>(prefix: Iterable<A>): List<A> => {
  const iterator = prefix[Symbol.iterator]()
  let next: IteratorResult<A>
  if ((next = iterator.next()) && !next.done) {
    const result = new ConsImpl(next.value, _Nil)
    let curr = result
    while ((next = iterator.next()) && !next.done) {
      const temp = new ConsImpl(next.value, _Nil)
      curr.tail = temp
      curr = temp
    }
    return result
  } else {
    return _Nil
  }
}

/**
 * Constructs a new `List<A>` from the specified values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = <Elements extends readonly [any, ...Array<any>]>(
  ...elements: Elements
): List<Elements[number]> => fromIterable(elements)

/**
 * Removes all `None` values from the specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
export const compact = <A>(self: Iterable<Option.Option<A>>): List<A> => filterMap(self, identity)

/**
 * Concatentates the specified lists together.
 *
 * @since 1.0.0
 * @category combinators
 */
export const concat: {
  <B>(that: List<B>): <A>(self: List<A>) => List<A | B>
  <A, B>(self: List<A>, that: List<B>): List<A | B>
} = Dual.dual<
  <B>(that: List<B>) => <A>(self: List<A>) => List<A | B>,
  <A, B>(self: List<A>, that: List<B>) => List<A | B>
>(2, (self, that) => prependAll(that, self))

/**
 * Drops the first `n` elements from the specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
export const drop: {
  (n: number): <A>(self: List<A>) => List<A>
  <A>(self: List<A>, n: number): List<A>
} = Dual.dual<
  (n: number) => <A>(self: List<A>) => List<A>,
  <A>(self: List<A>, n: number) => List<A>
>(2, (self, n) => {
  if (n <= 0) {
    return self
  }
  if (n >= length(self)) {
    return _Nil
  }
  let these = self
  let i = 0
  while (!isNil(these) && i < n) {
    these = these.tail
    i += 1
  }
  return these
})

/**
 * Returns `true` if all elements of the specified list satisfy the specified
 * predicate, `false` otherwise.
 *
 * @since 1.0.0
 * @category combinators
 */
export const every: {
  <A>(predicate: Predicate<A>): (self: List<A>) => boolean
  <A>(self: List<A>, predicate: Predicate<A>): boolean
} = Dual.dual<
  <A>(predicate: Predicate<A>) => (self: List<A>) => boolean,
  <A>(self: List<A>, predicate: Predicate<A>) => boolean
>(2, (self, predicate) => {
  for (const a of self) {
    if (!predicate(a)) {
      return false
    }
  }
  return true
})

/**
 * Filters a list using the specified predicate.
 *
 * @since 1.0.0
 * @category combinators
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: List<A>) => List<B>
  <A>(predicate: Predicate<A>): (self: List<A>) => List<A>
  <A, B extends A>(self: List<A>, refinement: Refinement<A, B>): List<B>
  <A>(self: List<A>, predicate: Predicate<A>): List<A>
} = Dual.dual<{
  <A, B extends A>(refinement: Refinement<A, B>): (self: List<A>) => List<B>
  <A>(predicate: Predicate<A>): (self: List<A>) => List<A>
}, {
  <A, B extends A>(self: List<A>, refinement: Refinement<A, B>): List<B>
  <A>(self: List<A>, predicate: Predicate<A>): List<A>
}>(2, <A>(self: List<A>, predicate: Predicate<A>) => noneIn(self, predicate, false))

/**
 * Filters and maps a list using the specified partial function. The resulting
 * list may be smaller than the input list due to the possibility of the partial
 * function not being defined for some elements.
 *
 * @since 1.0.0
 * @category combinators
 */
export const filterMap: {
  <A, B>(pf: (a: A) => Option.Option<B>): (self: Iterable<A>) => List<B>
  <A, B>(self: Iterable<A>, pf: (a: A) => Option.Option<B>): List<B>
} = Dual.dual<
  <A, B>(pf: (a: A) => Option.Option<B>) => (self: Iterable<A>) => List<B>,
  <A, B>(self: Iterable<A>, pf: (a: A) => Option.Option<B>) => List<B>
>(2, <A, B>(self: Iterable<A>, pf: (a: A) => Option.Option<B>) => {
  const bs: Array<B> = []
  for (const a of self) {
    const oa = pf(a)
    if (Option.isSome(oa)) {
      bs.push(oa.value)
    }
  }
  return fromIterable(bs)
})

/**
 * Returns the first element of the specified list that satisfies the specified
 * predicate, or `None` if no such element exists.
 *
 * @since 1.0.0
 * @category combinators
 */
export const findFirst: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: List<A>) => Option.Option<B>
  <A>(predicate: Predicate<A>): (self: List<A>) => Option.Option<A>
  <A, B extends A>(self: List<A>, refinement: Refinement<A, B>): Option.Option<B>
  <A>(self: List<A>, predicate: Predicate<A>): Option.Option<A>
} = Dual.dual<
  {
    <A, B extends A>(refinement: Refinement<A, B>): (self: List<A>) => Option.Option<B>
    <A>(predicate: Predicate<A>): (self: List<A>) => Option.Option<A>
  },
  {
    <A, B extends A>(self: List<A>, refinement: Refinement<A, B>): Option.Option<B>
    <A>(self: List<A>, predicate: Predicate<A>): Option.Option<A>
  }
>(2, <A>(self: List<A>, predicate: Predicate<A>) => {
  let these = self
  while (!isNil(these)) {
    if (predicate(these.head)) {
      return Option.some(these.head)
    }
    these = these.tail
  }
  return Option.none()
})

/**
 * Flat maps a list using the specified function.
 *
 * @since 1.0.0
 * @category combinators
 */
export const flatMap: {
  <A, B>(f: (a: A) => List<B>): (self: List<A>) => List<B>
  <A, B>(self: List<A>, f: (a: A) => List<B>): List<B>
} = Dual.dual<
  <A, B>(f: (a: A) => List<B>) => (self: List<A>) => List<B>,
  <A, B>(self: List<A>, f: (a: A) => List<B>) => List<B>
>(2, <A, B>(self: List<A>, f: (a: A) => List<B>) => {
  let rest = self
  let head: ConsImpl<B> | undefined = undefined
  let tail: ConsImpl<B> | undefined = undefined
  while (!isNil(rest)) {
    let bs = f(rest.head)
    while (!isNil(bs)) {
      const next = new ConsImpl(bs.head, _Nil)
      if (tail === undefined) {
        head = next
      } else {
        tail.tail = next
      }
      tail = next
      bs = bs.tail
    }
    rest = rest.tail
  }
  if (head === undefined) {
    return _Nil
  }
  return head
})

/**
 * Applies the specified function to each element of the list.
 *
 * @since 1.0.0
 * @category combinators
 */
export const forEach: {
  <A, B>(f: (a: A) => B): (self: List<A>) => void
  <A, B>(self: List<A>, f: (a: A) => B): void
} = Dual.dual<
  <A, B>(f: (a: A) => B) => (self: List<A>) => void,
  <A, B>(self: List<A>, f: (a: A) => B) => void
>(2, (self, f) => {
  let these = self
  while (!isNil(these)) {
    f(these.head)
    these = these.tail
  }
})

/**
 * Returns the first element of the specified list, or `None` if the list is
 * empty.
 *
 * @since 1.0.0
 * @category getters
 */
export const head = <A>(self: List<A>): Option.Option<A> => isNil(self) ? Option.none() : Option.some(self.head)

/**
 * Returns the last element of the specified list, or `None` if the list is
 * empty.
 *
 * @since 1.0.0
 * @category getters
 */
export const last = <A>(self: List<A>): Option.Option<A> => isNil(self) ? Option.none() : Option.some(unsafeLast(self)!)

/**
 * Applies the specified mapping function to each element of the list.
 *
 * @since 1.0.0
 * @category combinators
 */
export const map: {
  <A, B>(f: (a: A) => B): (self: List<A>) => List<B>
  <A, B>(self: List<A>, f: (a: A) => B): List<B>
} = Dual.dual<
  <A, B>(f: (a: A) => B) => (self: List<A>) => List<B>,
  <A, B>(self: List<A>, f: (a: A) => B) => List<B>
>(2, <A, B>(self: List<A>, f: (a: A) => B) => {
  if (isNil(self)) {
    return self as unknown as List<B>
  } else {
    const head = new ConsImpl(f(self.head), _Nil)
    let nextHead = head
    let rest = self.tail
    while (!isNil(rest)) {
      const next = new ConsImpl(f(rest.head), _Nil)
      nextHead.tail = next
      nextHead = next
      rest = rest.tail
    }
    return head
  }
})

/**
 * Partition a list into two lists, where the first list contains all elements
 * that did not satisfy the specified predicate, and the second list contains
 * all elements that did satisfy the specified predicate.
 *
 * @since 1.0.0
 * @category combinators
 */
export const partition: {
  <A>(predicate: Predicate<A>): (self: List<A>) => readonly [List<A>, List<A>]
  <A>(self: List<A>, predicate: Predicate<A>): readonly [List<A>, List<A>]
} = Dual.dual<
  <A>(predicate: Predicate<A>) => (self: List<A>) => readonly [List<A>, List<A>],
  <A>(self: List<A>, predicate: Predicate<A>) => readonly [List<A>, List<A>]
>(2, <A>(self: List<A>, predicate: Predicate<A>) => {
  const left: Array<A> = []
  const right: Array<A> = []
  for (const a of self) {
    if (predicate(a)) {
      right.push(a)
    } else {
      left.push(a)
    }
  }
  return [fromIterable(left), fromIterable(right)]
})

/**
 * Partition a list into two lists, where the first list contains all elements
 * for which the specified function returned a `Left`, and the second list
 * contains all elements for which the specified function returned a `Right`.
 *
 * @since 1.0.0
 * @category combinators
 */
export const partitionMap: {
  <A, B, C>(f: (a: A) => Either.Either<B, C>): (self: List<A>) => readonly [List<B>, List<C>]
  <A, B, C>(self: List<A>, f: (a: A) => Either.Either<B, C>): readonly [List<B>, List<C>]
} = Dual.dual<
  <A, B, C>(f: (a: A) => Either.Either<B, C>) => (self: List<A>) => readonly [List<B>, List<C>],
  <A, B, C>(self: List<A>, f: (a: A) => Either.Either<B, C>) => readonly [List<B>, List<C>]
>(2, <A, B, C>(self: List<A>, f: (a: A) => Either.Either<B, C>) => {
  const left: Array<B> = []
  const right: Array<C> = []
  for (const a of self) {
    const e = f(a)
    if (Either.isLeft(e)) {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return [fromIterable(left), fromIterable(right)]
})

/**
 * Prepends the specified element to the beginning of the list.
 *
 * @since 1.0.0
 * @category combinators
 */
export const prepend: {
  <B>(element: B): <A>(self: List<A>) => Cons<A | B>
  <A, B>(self: List<A>, element: B): Cons<A | B>
} = Dual.dual<
  <B>(element: B) => <A>(self: List<A>) => Cons<A | B>,
  <A, B>(self: List<A>, element: B) => Cons<A | B>
>(2, <A, B>(self: List<A>, element: B) => cons<A | B>(element, self))

/**
 * Prepends the specified prefix list to the beginning of the specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
export const prependAll: {
  <B>(prefix: List<B>): <A>(self: List<A>) => List<A | B>
  <A, B>(self: List<A>, prefix: List<B>): List<A | B>
} = Dual.dual<
  <B>(prefix: List<B>) => <A>(self: List<A>) => List<A | B>,
  <A, B>(self: List<A>, prefix: List<B>) => List<A | B>
>(2, <A, B>(self: List<A>, prefix: List<B>) => {
  if (isNil(self)) {
    return prefix
  } else if (isNil(prefix)) {
    return self
  } else {
    const result = new ConsImpl<A | B>(prefix.head, self)
    let curr = result
    let that = prefix.tail
    while (!isNil(that)) {
      const temp = new ConsImpl<A | B>(that.head, self)
      curr.tail = temp
      curr = temp
      that = that.tail
    }
    return result
  }
})

/**
 * Prepends the specified prefix list (in reverse order) to the beginning of the
 * specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
export const prependAllReversed: {
  <B>(prefix: List<B>): <A>(self: List<A>) => List<A | B>
  <A, B>(self: List<A>, prefix: List<B>): List<A | B>
} = Dual.dual<
  <B>(prefix: List<B>) => <A>(self: List<A>) => List<A | B>,
  <A, B>(self: List<A>, prefix: List<B>) => List<A | B>
>(2, <A, B>(self: List<A>, prefix: List<B>) => {
  let these: List<A | B> = self
  let pres = prefix
  while (isCons(pres)) {
    these = new ConsImpl(pres.head, these)
    pres = pres.tail
  }
  return these
})

/**
 * Folds over the elements of the list using the specified function, using the
 * specified initial value.
 *
 * @since 1.0.0
 * @category combinators
 */
export const reduce: {
  <Z, A>(zero: Z, f: (b: Z, a: A) => Z): (self: List<A>) => Z
  <A, Z>(self: List<A>, zero: Z, f: (b: Z, a: A) => Z): Z
} = Dual.dual<
  <Z, A>(zero: Z, f: (b: Z, a: A) => Z) => (self: List<A>) => Z,
  <A, Z>(self: List<A>, zero: Z, f: (b: Z, a: A) => Z) => Z
>(3, (self, zero, f) => {
  let acc = zero
  let these = self
  while (!isNil(these)) {
    acc = f(acc, these.head)
    these = these.tail
  }
  return acc
})

/**
 * Folds over the elements of the list using the specified function, beginning
 * with the last element of the list, using the specified initial value.
 *
 * @since 1.0.0
 * @category combinators
 */
export const reduceRight: {
  <Z, A>(zero: Z, f: (accumulator: Z, value: A) => Z): (self: List<A>) => Z
  <Z, A>(self: List<A>, zero: Z, f: (accumulator: Z, value: A) => Z): Z
} = Dual.dual<
  <Z, A>(zero: Z, f: (accumulator: Z, value: A) => Z) => (self: List<A>) => Z,
  <Z, A>(self: List<A>, zero: Z, f: (accumulator: Z, value: A) => Z) => Z
>(3, (self, zero, f) => {
  let acc = zero
  let these = reverse(self)
  while (!isNil(these)) {
    acc = f(acc, these.head)
    these = these.tail
  }
  return acc
})

/**
 * Returns a new list with the elements of the specified list in reverse order.
 *
 * @since 1.0.0
 * @category combinators
 */
export const reverse = <A>(self: List<A>): List<A> => {
  let result = empty<A>()
  let these = self
  while (!isNil(these)) {
    result = prepend(result, these.head)
    these = these.tail
  }
  return result
}

/**
 * Returns `true` if any element of the specified list satisfies the specified
 * predicate, `false` otherwise.
 *
 * @since 1.0.0
 * @category combinators
 */
export const some: {
  <A>(predicate: Predicate<A>): (self: List<A>) => boolean
  <A>(self: List<A>, predicate: Predicate<A>): boolean
} = Dual.dual<
  <A>(predicate: Predicate<A>) => (self: List<A>) => boolean,
  <A>(self: List<A>, predicate: Predicate<A>) => boolean
>(2, (self, predicate) => {
  let these = self
  while (!isNil(these)) {
    if (predicate(these.head)) {
      return true
    }
    these = these.tail
  }
  return false
})

/**
 * Splits the specified list into two lists at the specified index.
 *
 * @since 1.0.0
 * @category combinators
 */
export const splitAt: {
  (n: number): <A>(self: List<A>) => readonly [List<A>, List<A>]
  <A>(self: List<A>, n: number): readonly [List<A>, List<A>]
} = Dual.dual<
  (n: number) => <A>(self: List<A>) => readonly [List<A>, List<A>],
  <A>(self: List<A>, n: number) => readonly [List<A>, List<A>]
>(2, (self, n) => [take(self, n), drop(self, n)])

/**
 * Returns the tail of the specified list, or `None` if the list is empty.
 *
 * @since 1.0.0
 * @category getters
 */
export const tail = <A>(self: List<A>): Option.Option<List<A>> => isNil(self) ? Option.none() : Option.some(self.tail)

/**
 * Takes the specified number of elements from the beginning of the specified
 * list.
 *
 * @since 1.0.0
 * @category combinators
 */
export const take: {
  (n: number): <A>(self: List<A>) => List<A>
  <A>(self: List<A>, n: number): List<A>
} = Dual.dual<
  (n: number) => <A>(self: List<A>) => List<A>,
  <A>(self: List<A>, n: number) => List<A>
>(2, (self, n) => {
  if (n <= 0) {
    return _Nil
  }
  if (n >= length(self)) {
    return self
  }
  let these = make(unsafeHead(self))
  let current = unsafeTail(self)!
  for (let i = 1; i < n; i++) {
    these = new ConsImpl(unsafeHead(current), these)
    current = unsafeTail(current!)
  }
  return reverse(these)
})

/**
 * Converts the specified list to a `Chunk`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toChunk = <A>(self: List<A>): Chunk.Chunk<A> => Chunk.fromIterable(self)

/**
 * Converts the specified list to a `ReadonlyArray`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toReadonlyArray = <A>(self: List<A>): ReadonlyArray<A> => Array.from(self)

/**
 * Unsafely returns the first element of the specified `List`.
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeHead = <A>(self: List<A>): A => {
  if (isNil(self)) {
    throw new Error("Error: Expected List to be non-empty")
  }
  return self.head
}

/**
 * Unsafely returns the last element of the specified `List`.
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeLast = <A>(self: List<A>): A => {
  if (isNil(self)) {
    throw new Error("Error: Expected List to be non-empty")
  }
  let these = self
  let scout = self.tail
  while (!isNil(scout)) {
    these = scout
    scout = scout.tail
  }
  return these.head
}

/**
 * Unsafely returns the tail of the specified `List`.
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeTail = <A>(self: List<A>): List<A> => {
  if (isNil(self)) {
    throw new Error("Error: Expected List to be non-empty")
  }
  return self.tail
}

const noneIn = <A>(
  self: List<A>,
  predicate: Predicate<A>,
  isFlipped: boolean
): List<A> => {
  /* eslint-disable no-constant-condition */
  while (true) {
    if (isNil(self)) {
      return _Nil
    } else {
      if (predicate(self.head) !== isFlipped) {
        return allIn(self, self.tail, predicate, isFlipped)
      } else {
        self = self.tail
      }
    }
  }
}

const allIn = <A>(
  self: List<A>,
  remaining: List<A>,
  predicate: Predicate<A>,
  isFlipped: boolean
): List<A> => {
  /* eslint-disable no-constant-condition */
  while (true) {
    if (isNil(remaining)) {
      return self
    } else {
      if (predicate(remaining.head) !== isFlipped) {
        remaining = remaining.tail
      } else {
        return partialFill(self, remaining, predicate, isFlipped)
      }
    }
  }
}

const partialFill = <A>(
  self: List<A>,
  firstMiss: List<A>,
  predicate: Predicate<A>,
  isFlipped: boolean
): List<A> => {
  const newHead = new ConsImpl<A>(unsafeHead(self)!, _Nil)
  let toProcess = unsafeTail(self)! as List.Cons<A>
  let currentLast = newHead
  while (!(toProcess === firstMiss)) {
    const newElem = new ConsImpl(unsafeHead(toProcess)!, _Nil)
    currentLast.tail = newElem
    currentLast = unsafeCoerce(newElem)
    toProcess = unsafeCoerce(toProcess.tail)
  }
  let next = firstMiss.tail
  let nextToCopy: List.Cons<A> = unsafeCoerce(next)
  while (!isNil(next)) {
    const head = unsafeHead(next)!
    if (predicate(head) !== isFlipped) {
      next = next.tail
    } else {
      while (!(nextToCopy === next)) {
        const newElem = new ConsImpl(unsafeHead(nextToCopy)!, _Nil)
        currentLast.tail = newElem
        currentLast = newElem
        nextToCopy = unsafeCoerce(nextToCopy.tail)
      }
      nextToCopy = unsafeCoerce(next.tail)
      next = next.tail
    }
  }
  if (!isNil(nextToCopy)) {
    currentLast.tail = nextToCopy
  }
  return newHead
}
