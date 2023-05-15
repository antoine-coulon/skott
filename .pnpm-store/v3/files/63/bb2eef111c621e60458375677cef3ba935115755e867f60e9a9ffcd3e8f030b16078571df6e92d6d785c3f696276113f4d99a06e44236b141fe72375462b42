import * as Equal from "@effect/data/Equal"
import * as Dual from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"
import type { HashMap } from "@effect/data/HashMap"
import type * as HS from "@effect/data/HashSet"
import * as HM from "@effect/data/internal/HashMap"
import type { Predicate, Refinement } from "@effect/data/Predicate"

/** @internal */
export const HashSetTypeId: HS.TypeId = Symbol.for("@effect/data/HashSet") as HS.TypeId

/** @internal */
export class HashSetImpl<A> implements HS.HashSet<A> {
  readonly _id: HS.TypeId = HashSetTypeId

  constructor(readonly _keyMap: HashMap<A, unknown>) {}

  [Symbol.iterator](): Iterator<A> {
    return HM.keys(this._keyMap)
  }

  [Hash.symbol](): number {
    return Hash.combine(Hash.hash(this._keyMap))(Hash.hash("HashSet"))
  }

  [Equal.symbol](that: unknown): boolean {
    if (isHashSet(that)) {
      return (
        HM.size(this._keyMap) === HM.size((that as HashSetImpl<A>)._keyMap) &&
        Equal.equals(this._keyMap, (that as HashSetImpl<A>)._keyMap)
      )
    }
    return false
  }

  toString() {
    return `HashSet(${Array.from(this).map(String).join(", ")})`
  }

  toJSON() {
    return {
      _tag: "HashSet",
      values: Array.from(this)
    }
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON()
  }
}

/** @internal */
export const isHashSet: {
  <A>(u: Iterable<A>): u is HS.HashSet<A>
  (u: unknown): u is HS.HashSet<unknown>
} = (u: unknown): u is HS.HashSet<unknown> =>
  typeof u === "object" && u != null && "_id" in u && u["_id"] === HashSetTypeId

/** @internal */
export const empty = <A = never>(): HS.HashSet<A> => new HashSetImpl(HM.empty<A, unknown>())

/** @internal */
export const fromIterable = <A>(elements: Iterable<A>): HS.HashSet<A> => {
  const set = beginMutation(empty<A>())
  for (const value of elements) {
    add(set, value)
  }
  return endMutation(set)
}

/** @internal */
export const make = <As extends ReadonlyArray<any>>(...elements: As): HS.HashSet<As[number]> => {
  const set = beginMutation(empty<As[number]>())
  for (const value of elements) {
    add(set, value)
  }
  return endMutation(set)
}

/** @internal */
export const has = Dual.dual<
  <A>(value: A) => (self: HS.HashSet<A>) => boolean,
  <A>(self: HS.HashSet<A>, value: A) => boolean
>(2, <A>(self: HS.HashSet<A>, value: A) => HM.has((self as HashSetImpl<A>)._keyMap, value))

/** @internal */
export const some = Dual.dual<
  <A>(f: Predicate<A>) => (self: HS.HashSet<A>) => boolean,
  <A>(self: HS.HashSet<A>, f: Predicate<A>) => boolean
>(2, (self, f) => {
  let found = false
  for (const value of self) {
    found = f(value)
    if (found) {
      break
    }
  }
  return found
})

/** @internal */
export const every = Dual.dual<
  <A>(f: Predicate<A>) => (self: HS.HashSet<A>) => boolean,
  <A>(self: HS.HashSet<A>, f: Predicate<A>) => boolean
>(2, (self, f) => !some(self, (a) => !f(a)))

/** @internal */
export const isSubset = Dual.dual<
  <A>(that: HS.HashSet<A>) => (self: HS.HashSet<A>) => boolean,
  <A>(self: HS.HashSet<A>, that: HS.HashSet<A>) => boolean
>(2, (self, that) => every(self, (value) => has(that, value)))

/** @internal */
export const values = <A>(self: HS.HashSet<A>): IterableIterator<A> => HM.keys((self as HashSetImpl<A>)._keyMap)

/** @internal */
export const size = <A>(self: HS.HashSet<A>): number => HM.size((self as HashSetImpl<A>)._keyMap)

/** @internal */
export const beginMutation = <A>(self: HS.HashSet<A>): HS.HashSet<A> =>
  new HashSetImpl(HM.beginMutation((self as HashSetImpl<A>)._keyMap))

/** @internal */
export const endMutation = <A>(self: HS.HashSet<A>): HS.HashSet<A> => {
  ;((self as HashSetImpl<A>)._keyMap as HM.HashMapImpl<A, unknown>)._editable = false
  return self
}

/** @internal */
export const mutate = Dual.dual<
  <A>(f: (set: HS.HashSet<A>) => void) => (self: HS.HashSet<A>) => HS.HashSet<A>,
  <A>(self: HS.HashSet<A>, f: (set: HS.HashSet<A>) => void) => HS.HashSet<A>
>(2, (self, f) => {
  const transient = beginMutation(self)
  f(transient)
  return endMutation(transient)
})

/** @internal */
export const add = Dual.dual<
  <A>(value: A) => (self: HS.HashSet<A>) => HS.HashSet<A>,
  <A>(self: HS.HashSet<A>, value: A) => HS.HashSet<A>
>(
  2,
  <A>(self: HS.HashSet<A>, value: A) =>
    ((self as HashSetImpl<A>)._keyMap as HM.HashMapImpl<A, unknown>)._editable
      ? (HM.set(value as A, true as unknown)((self as HashSetImpl<A>)._keyMap), self)
      : new HashSetImpl(HM.set(value as A, true as unknown)((self as HashSetImpl<A>)._keyMap))
)

/** @internal */
export const remove = Dual.dual<
  <A>(value: A) => (self: HS.HashSet<A>) => HS.HashSet<A>,
  <A>(self: HS.HashSet<A>, value: A) => HS.HashSet<A>
>(
  2,
  <A>(self: HS.HashSet<A>, value: A) =>
    (((self as HashSetImpl<A>)._keyMap) as HM.HashMapImpl<A, unknown>)._editable
      ? (HM.remove(value)((self as HashSetImpl<A>)._keyMap), self)
      : new HashSetImpl(HM.remove(value)((self as HashSetImpl<A>)._keyMap))
)

/** @internal */
export const difference = Dual.dual<
  <A>(that: Iterable<A>) => (self: HS.HashSet<A>) => HS.HashSet<A>,
  <A>(self: HS.HashSet<A>, that: Iterable<A>) => HS.HashSet<A>
>(2, (self, that) =>
  mutate(self, (set) => {
    for (const value of that) {
      remove(set, value)
    }
  }))

/** @internal */
export const intersection = Dual.dual<
  <A>(that: Iterable<A>) => (self: HS.HashSet<A>) => HS.HashSet<A>,
  <A>(self: HS.HashSet<A>, that: Iterable<A>) => HS.HashSet<A>
>(2, (self, that) =>
  mutate(empty(), (set) => {
    for (const value of that) {
      if (has(value)(self)) {
        add(value)(set)
      }
    }
  }))

/** @internal */
export const union = Dual.dual<
  <A>(that: Iterable<A>) => (self: HS.HashSet<A>) => HS.HashSet<A>,
  <A>(self: HS.HashSet<A>, that: Iterable<A>) => HS.HashSet<A>
>(2, (self, that) =>
  mutate(empty(), (set) => {
    forEach(self, (value) => add(set, value))
    for (const value of that) {
      add(set, value)
    }
  }))

/** @internal */
export const toggle = Dual.dual<
  <A>(value: A) => (self: HS.HashSet<A>) => HS.HashSet<A>,
  <A>(self: HS.HashSet<A>, value: A) => HS.HashSet<A>
>(2, (self, value) => has(self, value) ? remove(self, value) : add(self, value))

/** @internal */
export const map = Dual.dual<
  <A, B>(f: (a: A) => B) => (self: HS.HashSet<A>) => HS.HashSet<B>,
  <A, B>(self: HS.HashSet<A>, f: (a: A) => B) => HS.HashSet<B>
>(2, (self, f) =>
  mutate(empty(), (set) => {
    forEach(self, (a) => {
      const b = f(a)
      if (!has(set, b)) {
        add(set, b)
      }
    })
  }))

/** @internal */
export const flatMap = Dual.dual<
  <A, B>(f: (a: A) => Iterable<B>) => (self: HS.HashSet<A>) => HS.HashSet<B>,
  <A, B>(self: HS.HashSet<A>, f: (a: A) => Iterable<B>) => HS.HashSet<B>
>(2, (self, f) =>
  mutate(empty(), (set) => {
    forEach(self, (a) => {
      for (const b of f(a)) {
        if (!has(set, b)) {
          add(set, b)
        }
      }
    })
  }))

/** @internal */
export const forEach = Dual.dual<
  <A>(f: (value: A) => void) => (self: HS.HashSet<A>) => void,
  <A>(self: HS.HashSet<A>, f: (value: A) => void) => void
>(2, <A>(self: HS.HashSet<A>, f: (value: A) => void) =>
  HM.forEachWithIndex(
    (self as HashSetImpl<A>)._keyMap,
    (_, k) => f(k)
  ))

/** @internal */
export const reduce = Dual.dual<
  <A, Z>(zero: Z, f: (accumulator: Z, value: A) => Z) => (self: HS.HashSet<A>) => Z,
  <A, Z>(self: HS.HashSet<A>, zero: Z, f: (accumulator: Z, value: A) => Z) => Z
>(3, <A, Z>(self: HS.HashSet<A>, zero: Z, f: (accumulator: Z, value: A) => Z) =>
  HM.reduceWithIndex(
    (self as HashSetImpl<A>)._keyMap,
    zero,
    (z, _, a) => f(z, a)
  ))

/** @internal */
export const filter = Dual.dual<
  {
    <A, B extends A>(f: Refinement<A, B>): (self: HS.HashSet<A>) => HS.HashSet<B>
    <A>(f: Predicate<A>): (self: HS.HashSet<A>) => HS.HashSet<A>
  },
  {
    <A, B extends A>(self: HS.HashSet<A>, f: Refinement<A, B>): HS.HashSet<B>
    <A>(self: HS.HashSet<A>, f: Predicate<A>): HS.HashSet<A>
  }
>(2, <A>(self: HS.HashSet<A>, f: Predicate<A>) => {
  return mutate(empty(), (set) => {
    const iterator = values(self)
    let next: IteratorResult<A, any>
    while (!(next = iterator.next()).done) {
      const value = next.value
      if (f(value)) {
        add(set, value)
      }
    }
  })
})

/** @internal */
export const partition = Dual.dual<
  {
    <A, B extends A>(
      f: Refinement<A, B>
    ): (self: HS.HashSet<A>) => readonly [HS.HashSet<A>, HS.HashSet<B>]
    <A>(
      f: Predicate<A>
    ): (self: HS.HashSet<A>) => readonly [HS.HashSet<A>, HS.HashSet<A>]
  },
  {
    <A, B extends A>(
      self: HS.HashSet<A>,
      f: Refinement<A, B>
    ): readonly [HS.HashSet<A>, HS.HashSet<B>]
    <A>(
      self: HS.HashSet<A>,
      f: Predicate<A>
    ): readonly [HS.HashSet<A>, HS.HashSet<A>]
  }
>(2, <A>(self: HS.HashSet<A>, f: Predicate<A>) => {
  const iterator = values(self)
  let next: IteratorResult<A, any>
  const right = beginMutation(empty<A>())
  const left = beginMutation(empty<A>())
  while (!(next = iterator.next()).done) {
    const value = next.value
    if (f(value)) {
      add(right, value)
    } else {
      add(left, value)
    }
  }
  return [endMutation(left), endMutation(right)] as const
})
