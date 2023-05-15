/**
 * @since 1.0.0
 */
import type { Either } from "@effect/data/Either"
import * as Equal from "@effect/data/Equal"
import * as Dual from "@effect/data/Function"
import { identity, pipe } from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"
import type { TypeLambda } from "@effect/data/HKT"
import type { NonEmptyIterable } from "@effect/data/NonEmpty"
import type { Option } from "@effect/data/Option"
import * as O from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import * as RA from "@effect/data/ReadonlyArray"
import type { Order } from "@effect/data/typeclass/Order"

const TypeId: unique symbol = Symbol.for("@effect/data/Chunk") as TypeId

/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId

/**
 * @category model
 * @since 1.0.0
 */
export interface NonEmptyChunk<A> extends Chunk<A>, NonEmptyIterable<A> {}

/**
 * @since 1.0.0
 * @category models
 */
export interface Chunk<A> extends Iterable<A>, Equal.Equal {
  readonly _id: TypeId

  readonly length: number

  /** @internal */
  right: Chunk<A>
  /** @internal */
  left: Chunk<A>
  /** @internal */
  backing: Backing<A>
  /** @internal */
  depth: number
}

/**
 * @since 1.0.0
 * @category type lambdas
 */
export interface ChunkTypeLambda extends TypeLambda {
  readonly type: Chunk<this["Target"]>
}

/** @internal */
type Backing<A> =
  | IArray<A>
  | IConcat<A>
  | ISingleton<A>
  | IEmpty

/** @internal */
interface IArray<A> {
  readonly _tag: "IArray"
  readonly array: ReadonlyArray<A>
}

/** @internal */
interface IConcat<A> {
  readonly _tag: "IConcat"
  readonly left: Chunk<A>
  readonly right: Chunk<A>
}

/** @internal */
interface ISingleton<A> {
  readonly _tag: "ISingleton"
  readonly a: A
}

/** @internal */
interface IEmpty {
  readonly _tag: "IEmpty"
}

/** @internal */
const emptyArray: ReadonlyArray<never> = []

/** @internal */
function copy<A>(
  src: ReadonlyArray<A>,
  srcPos: number,
  dest: Array<A>,
  destPos: number,
  len: number
) {
  for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
    dest[destPos + i - srcPos] = src[i]!
  }
  return dest
}

/** @internal */
class ChunkImpl<A> implements Chunk<A> {
  readonly _id: typeof TypeId = TypeId

  readonly length: number
  readonly depth: number
  readonly left: Chunk<A>
  readonly right: Chunk<A>

  constructor(readonly backing: Backing<A>) {
    switch (backing._tag) {
      case "IEmpty": {
        this.length = 0
        this.depth = 0
        this.left = this
        this.right = this
        break
      }
      case "IConcat": {
        this.length = backing.left.length + backing.right.length
        this.depth = 1 + Math.max(backing.left.depth, backing.right.depth)
        this.left = backing.left
        this.right = backing.right
        break
      }
      case "IArray": {
        this.length = backing.array.length
        this.depth = 0
        this.left = _empty
        this.right = _empty
        break
      }
      case "ISingleton": {
        this.length = 1
        this.depth = 0
        this.left = _empty
        this.right = _empty
        break
      }
    }
  }

  toString() {
    return `Chunk(${toReadonlyArray(this).map(String).join(", ")})`
  }

  toJSON() {
    return {
      _tag: "Chunk",
      values: toReadonlyArray(this)
    }
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON()
  }

  [Equal.symbol](that: unknown): boolean {
    if (isChunk(that) && this.length === that.length) {
      return toReadonlyArray(this).every((value, i) => Equal.equals(value, unsafeGet(that, i)))
    }
    return false
  }

  [Hash.symbol](): number {
    return Hash.array(toReadonlyArray(this))
  }

  [Symbol.iterator](): Iterator<A> {
    switch (this.backing._tag) {
      case "IArray": {
        return this.backing.array[Symbol.iterator]()
      }
      case "IEmpty": {
        return emptyArray[Symbol.iterator]()
      }
      default: {
        return toReadonlyArray(this)[Symbol.iterator]()
      }
    }
  }
}

/** @internal */
const copyToArray = <A>(self: Chunk<A>, array: Array<any>, initial: number): void => {
  switch (self.backing._tag) {
    case "IArray": {
      copy(self.backing.array, 0, array, initial, self.length)
      break
    }
    case "IConcat": {
      copyToArray(self.left, array, initial)
      copyToArray(self.right, array, initial + self.left.length)
      break
    }
    case "ISingleton": {
      array[initial] = self.backing.a
      break
    }
  }
}

/**
 * Checks if `u` is a `Chunk<unknown>`
 *
 * @since 1.0.0
 * @category constructors
 */
export const isChunk: {
  <A>(u: Iterable<A>): u is Chunk<A>
  (u: unknown): u is Chunk<unknown>
} = (u: unknown): u is Chunk<unknown> => typeof u === "object" && u != null && "_id" in u && u["_id"] === TypeId

const _empty = new ChunkImpl<never>({ _tag: "IEmpty" })

/**
 * @since 1.0.0
 * @category constructors
 */
export const empty: <A = never>() => Chunk<A> = () => _empty

/**
 * Converts from an `Iterable<A>`
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromIterable = <A>(self: Iterable<A>): Chunk<A> =>
  isChunk(self) ?
    self :
    new ChunkImpl({
      _tag: "IArray",
      array: Array.from(self)
    })

/**
 * Converts to a `ReadonlyArray<A>`
 *
 * @since 1.0.0
 * @category conversions
 */
export const toReadonlyArray = <A>(self: Chunk<A>): ReadonlyArray<A> => {
  switch (self.backing._tag) {
    case "IEmpty": {
      return emptyArray
    }
    case "IArray": {
      return self.backing.array
    }
    default: {
      const arr = new Array<A>(self.length)
      copyToArray(self, arr, 0)
      self.backing = {
        _tag: "IArray",
        array: arr
      }
      self.left = _empty
      self.right = _empty
      self.depth = 0
      return arr
    }
  }
}

/**
 * This function provides a safe way to read a value at a particular index from a `Chunk`.
 *
 * @since 1.0.0
 * @category elements
 */
export const get: {
  (index: number): <A>(self: Chunk<A>) => Option<A>
  <A>(self: Chunk<A>, index: number): Option<A>
} = Dual.dual<
  (index: number) => <A>(self: Chunk<A>) => Option<A>,
  <A>(self: Chunk<A>, index: number) => Option<A>
>(2, (self, index) => index < 0 || index >= self.length ? O.none() : O.some(unsafeGet(self, index)))

/**
 * Wraps an array into a chunk without copying, unsafe on mutable arrays
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeFromArray = <A>(self: ReadonlyArray<A>): Chunk<A> => new ChunkImpl({ _tag: "IArray", array: self })

/**
 * Gets an element unsafely, will throw on out of bounds
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeGet: {
  (index: number): <A>(self: Chunk<A>) => A
  <A>(self: Chunk<A>, index: number): A
} = Dual.dual<
  (index: number) => <A>(self: Chunk<A>) => A,
  <A>(self: Chunk<A>, index: number) => A
>(2, (self, index) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      throw new Error(`Index out of bounds`)
    }
    case "ISingleton": {
      if (index !== 0) {
        throw new Error(`Index out of bounds`)
      }
      return self.backing.a
    }
    case "IArray": {
      if (index >= self.length || index < 0) {
        throw new Error(`Index out of bounds`)
      }
      return self.backing.array[index]!
    }
    case "IConcat": {
      return index < self.left.length
        ? unsafeGet(self.left, index)
        : unsafeGet(self.right, index - self.left.length)
    }
  }
})

/**
 * Appends the value to the chunk
 *
 * @since 1.0.0
 * @category mutations
 */
export const append: {
  <A2>(a: A2): <A>(self: Chunk<A>) => Chunk<A2 | A>
  <A, A2>(self: Chunk<A>, a: A2): Chunk<A | A2>
} = Dual.dual<
  <A2>(a: A2) => <A>(self: Chunk<A>) => Chunk<A | A2>,
  <A, A2>(self: Chunk<A>, a: A2) => Chunk<A | A2>
>(2, (self, a) => concat(self, of(a)))

/**
 * Prepends the value to the chunk
 *
 * @since 1.0.0
 * @category mutations
 */
export const prepend: {
  <B>(elem: B): <A>(self: Chunk<A>) => Chunk<B | A>
  <A, B>(self: Chunk<A>, elem: B): Chunk<A | B>
} = Dual.dual<
  <B>(elem: B) => <A>(self: Chunk<A>) => Chunk<A | B>,
  <A, B>(self: Chunk<A>, elem: B) => Chunk<A | B>
>(2, (self, a) => concat(of(a), self))

/**
 * Takes the first up to `n` elements from the chunk
 *
 * @since 1.0.0
 * @category mutations
 */
export const take: {
  (n: number): <A>(self: Chunk<A>) => Chunk<A>
  <A>(self: Chunk<A>, n: number): Chunk<A>
} = Dual.dual<
  (n: number) => <A>(self: Chunk<A>) => Chunk<A>,
  <A>(self: Chunk<A>, n: number) => Chunk<A>
>(2, (self, n) => {
  if (n <= 0) {
    return _empty
  } else if (n >= self.length) {
    return self
  } else {
    return unsafeFromArray(RA.take(n)(toReadonlyArray(self)))
  }
})

/**
 * Drops the first up to `n` elements from the chunk
 *
 * @since 1.0.0
 * @category mutations
 */
export const drop: {
  (n: number): <A>(self: Chunk<A>) => Chunk<A>
  <A>(self: Chunk<A>, n: number): Chunk<A>
} = Dual.dual<
  (n: number) => <A>(self: Chunk<A>) => Chunk<A>,
  <A>(self: Chunk<A>, n: number) => Chunk<A>
>(2, (self, n) => {
  if (n <= 0) {
    return self
  } else if (n >= self.length) {
    return _empty
  } else {
    return unsafeFromArray(RA.drop(n)(toReadonlyArray(self)))
  }
})

/**
 * Drops the last `n` elements.
 *
 * @since 1.0.0
 * @category mutations
 */
export const dropRight: {
  (n: number): <A>(self: Chunk<A>) => Chunk<A>
  <A>(self: Chunk<A>, n: number): Chunk<A>
} = Dual.dual<
  (n: number) => <A>(self: Chunk<A>) => Chunk<A>,
  <A>(self: Chunk<A>, n: number) => Chunk<A>
>(2, (self, n) => take(self, Math.max(0, self.length - n)))

/**
 * Drops all elements so long as the predicate returns true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const dropWhile: {
  <A>(f: (a: A) => boolean): (self: Chunk<A>) => Chunk<A>
  <A>(self: Chunk<A>, f: (a: A) => boolean): Chunk<A>
} = Dual.dual<
  <A>(f: (a: A) => boolean) => (self: Chunk<A>) => Chunk<A>,
  <A>(self: Chunk<A>, f: (a: A) => boolean) => Chunk<A>
>(2, (self, f) => {
  const arr = toReadonlyArray(self)
  const len = arr.length
  let i = 0
  while (i < len && f(arr[i]!)) {
    i++
  }
  return pipe(self, drop(i))
})

/**
 * @category mutations
 * @since 1.0.0
 */
export const prependAllNonEmpty: {
  <B>(that: NonEmptyChunk<B>): <A>(self: Chunk<A>) => NonEmptyChunk<B | A>
  <B>(that: Chunk<B>): <A>(self: NonEmptyChunk<A>) => NonEmptyChunk<B | A>
  <A, B>(self: Chunk<A>, that: NonEmptyChunk<B>): NonEmptyChunk<A | B>
  <A, B>(self: NonEmptyChunk<A>, that: Chunk<B>): NonEmptyChunk<A | B>
} = Dual.dual<
  {
    <B>(that: NonEmptyChunk<B>): <A>(self: Chunk<A>) => NonEmptyChunk<A | B>
    <B>(that: Chunk<B>): <A>(self: NonEmptyChunk<A>) => NonEmptyChunk<A | B>
  },
  {
    <A, B>(self: Chunk<A>, that: NonEmptyChunk<B>): NonEmptyChunk<A | B>
    <A, B>(self: NonEmptyChunk<A>, that: Chunk<B>): NonEmptyChunk<A | B>
  }
>(2, (self, that) => concat(that, self) as any)

/**
 * Concatenates the two chunks
 *
 * @since 1.0.0
 * @category mutations
 */
export const concat: {
  <B>(that: Chunk<B>): <A>(self: Chunk<A>) => Chunk<B | A>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<A | B>
} = Dual.dual<
  <B>(that: Chunk<B>) => <A>(self: Chunk<A>) => Chunk<A | B>,
  <A, B>(self: Chunk<A>, that: Chunk<B>) => Chunk<A | B>
>(2, <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<A | B> => {
  if (self.backing._tag === "IEmpty") {
    return that
  }
  if (that.backing._tag === "IEmpty") {
    return self
  }
  const diff = that.depth - self.depth
  if (Math.abs(diff) <= 1) {
    return new ChunkImpl<A | B>({ _tag: "IConcat", left: self, right: that })
  } else if (diff < -1) {
    if (self.left.depth >= self.right.depth) {
      const nr = concat(that)(self.right)
      return new ChunkImpl({ _tag: "IConcat", left: self.left, right: nr })
    } else {
      const nrr = concat(that)(self.right.right)
      if (nrr.depth === self.depth - 3) {
        const nr = new ChunkImpl({ _tag: "IConcat", left: self.right.left, right: nrr })
        return new ChunkImpl({ _tag: "IConcat", left: self.left, right: nr })
      } else {
        const nl = new ChunkImpl({ _tag: "IConcat", left: self.left, right: self.right.left })
        return new ChunkImpl({ _tag: "IConcat", left: nl, right: nrr })
      }
    }
  } else {
    if (that.right.depth >= that.left.depth) {
      const nl = concat(that.left)(self)
      return new ChunkImpl({ _tag: "IConcat", left: nl, right: that.right })
    } else {
      const nll = concat(that.left.left)(self)
      if (nll.depth === that.depth - 3) {
        const nl = new ChunkImpl({ _tag: "IConcat", left: nll, right: that.left.right })
        return new ChunkImpl({ _tag: "IConcat", left: nl, right: that.right })
      } else {
        const nr = new ChunkImpl({ _tag: "IConcat", left: that.left.right, right: that.right })
        return new ChunkImpl({ _tag: "IConcat", left: nll, right: nr })
      }
    }
  }
})

/**
 * Compares the two chunks of equal length using the specified function
 *
 * @since 1.0.0
 * @category elements
 */
export const correspondsTo: {
  <A, B>(that: Chunk<B>, f: (a: A, b: B) => boolean): (self: Chunk<A>) => boolean
  <A, B>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => boolean): boolean
} = Dual.dual<
  <A, B>(that: Chunk<B>, f: (a: A, b: B) => boolean) => (self: Chunk<A>) => boolean,
  <A, B>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => boolean) => boolean
>(3, (self, that, f) => {
  if (self.length !== that.length) {
    return false
  }
  const selfArray = toReadonlyArray(self)
  const thatArray = toReadonlyArray(that)
  return selfArray.every((v, i) => f(v, thatArray[i]))
})

/**
 * Returns a filtered and mapped subset of the elements.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterMap: {
  <A, B>(f: (a: A) => Option<B>): (self: Iterable<A>) => Chunk<B>
  <A, B>(self: Iterable<A>, f: (a: A) => Option<B>): Chunk<B>
} = Dual.dual<
  <A, B>(f: (a: A) => Option<B>) => (self: Iterable<A>) => Chunk<B>,
  <A, B>(self: Iterable<A>, f: (a: A) => Option<B>) => Chunk<B>
>(2, (self, f) => unsafeFromArray(RA.filterMap(f)(self)))

/**
 * Returns a filtered and mapped subset of the elements.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (self: Chunk<C>) => Chunk<B>
  <B extends A, A = B>(predicate: Predicate<A>): (self: Chunk<B>) => Chunk<B>
  <C extends A, B extends A, A = C>(self: Chunk<C>, refinement: Refinement<A, B>): Chunk<B>
  <B extends A, A = B>(self: Chunk<B>, predicate: Predicate<A>): Chunk<B>
} = Dual.dual<
  {
    <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (self: Chunk<C>) => Chunk<B>
    <B extends A, A = B>(predicate: Predicate<A>): (self: Chunk<B>) => Chunk<B>
  },
  {
    <C extends A, B extends A, A = C>(self: Chunk<C>, refinement: Refinement<A, B>): Chunk<B>
    <B extends A, A = B>(self: Chunk<B>, predicate: Predicate<A>): Chunk<B>
  }
>(
  2,
  <B extends A, A = B>(self: Chunk<B>, predicate: Predicate<A>) =>
    unsafeFromArray(RA.filterMap(O.liftPredicate(predicate))(self))
)

/**
 * Returns a filtered and mapped subset of the elements.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterMapWithIndex: {
  <A, B>(f: (a: A, i: number) => Option<B>): (self: Iterable<A>) => Chunk<B>
  <A, B>(self: Iterable<A>, f: (a: A, i: number) => Option<B>): Chunk<B>
} = Dual.dual<
  <A, B>(f: (a: A, i: number) => Option<B>) => (self: Iterable<A>) => Chunk<B>,
  <A, B>(self: Iterable<A>, f: (a: A, i: number) => Option<B>) => Chunk<B>
>(2, (self, f) => unsafeFromArray(RA.filterMap(f)(self)))

/**
 * Transforms all elements of the chunk for as long as the specified function returns some value
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterMapWhile: {
  <A, B>(f: (a: A) => Option<B>): (self: Iterable<A>) => Chunk<B>
  <A, B>(self: Iterable<A>, f: (a: A) => Option<B>): Chunk<B>
} = Dual.dual<
  <A, B>(f: (a: A) => Option<B>) => (self: Iterable<A>) => Chunk<B>,
  <A, B>(self: Iterable<A>, f: (a: A) => Option<B>) => Chunk<B>
>(2, <A, B>(self: Iterable<A>, f: (a: A) => Option<B>) => {
  const res: Array<B> = []
  for (const a of self) {
    const b = f(a)
    if (O.isSome(b)) {
      res.push(b.value)
    } else {
      break
    }
  }
  return unsafeFromArray(res)
})

/**
 * Tests whether a value is a member of a `Chunk<A>`.
 *
 * @since 1.0.0
 * @category elements
 */
export const elem: {
  <B>(b: B): <A>(self: Chunk<A>) => boolean
  <A, B>(self: Chunk<A>, b: B): boolean
} = Dual.dual<
  <B>(b: B) => <A>(self: Chunk<A>) => boolean,
  <A, B>(self: Chunk<A>, b: B) => boolean
>(2, (self, b) => pipe(toReadonlyArray(self), RA.contains(Equal.equivalence())(b)))

/**
 * Filter out optional values
 *
 * @since 1.0.0
 * @category filtering
 */
export const compact = <A>(self: Iterable<Option<A>>): Chunk<A> => filterMap(self, identity)

/**
 * Deduplicates adjacent elements that are identical.
 *
 * @since 1.0.0
 * @category filtering
 */
export const dedupeAdjacent = <A>(self: Chunk<A>): Chunk<A> => {
  const builder: Array<A> = []
  let lastA: O.Option<A> = O.none()
  for (const a of self) {
    if (O.isNone(lastA) || !Equal.equals(a, lastA.value)) {
      builder.push(a)
      lastA = O.some(a)
    }
  }
  return unsafeFromArray(builder)
}

/**
 * Check if a predicate holds true for any `Chunk` member.
 *
 * @since 1.0.0
 * @category elements
 */
export const some: {
  <A>(f: Predicate<A>): (self: Chunk<A>) => boolean
  <A>(self: Chunk<A>, f: Predicate<A>): boolean
} = Dual.dual<
  <A>(f: Predicate<A>) => (self: Chunk<A>) => boolean,
  <A>(self: Chunk<A>, f: Predicate<A>) => boolean
>(2, (self, f) => toReadonlyArray(self).findIndex((v) => f(v)) !== -1)

/**
 * Check if a predicate holds true for every `Chunk` member.
 *
 * @since 1.0.0
 * @category elements
 */
export const every: {
  <A>(f: Predicate<A>): (self: Chunk<A>) => boolean
  <A>(self: Chunk<A>, f: Predicate<A>): boolean
} = Dual.dual<
  <A>(f: Predicate<A>) => (self: Chunk<A>) => boolean,
  <A>(self: Chunk<A>, f: Predicate<A>) => boolean
>(2, (self, f) => toReadonlyArray(self).every((v) => f(v)))

/**
 * Find the first element which satisfies a predicate (or a refinement) function.
 *
 * @since 1.0.0
 * @category elements
 */
export const findFirst: {
  <A, B extends A>(refinement: Refinement<A, B>): (self: Chunk<A>) => Option<B>
  <A>(predicate: Predicate<A>): (self: Chunk<A>) => Option<A>
  <A, B extends A>(self: Chunk<A>, refinement: Refinement<A, B>): Option<B>
  <A>(self: Chunk<A>, predicate: Predicate<A>): Option<A>
} = Dual.dual<
  {
    <A, B extends A>(refinement: Refinement<A, B>): (self: Chunk<A>) => Option<B>
    <A>(predicate: Predicate<A>): (self: Chunk<A>) => Option<A>
  },
  {
    <A, B extends A>(self: Chunk<A>, refinement: Refinement<A, B>): Option<B>
    <A>(self: Chunk<A>, predicate: Predicate<A>): Option<A>
  }
>(2, <A>(self: Chunk<A>, predicate: Predicate<A>) => RA.findFirst(predicate)(toReadonlyArray(self)))

/**
 * Find the first index for which a predicate holds
 *
 * @since 1.0.0
 * @category elements
 */
export const findFirstIndex: {
  <A>(f: Predicate<A>): (self: Chunk<A>) => Option<number>
  <A>(self: Chunk<A>, f: Predicate<A>): Option<number>
} = Dual.dual<
  <A>(f: Predicate<A>) => (self: Chunk<A>) => Option<number>,
  <A>(self: Chunk<A>, f: Predicate<A>) => Option<number>
>(2, (self, f) => RA.findFirstIndex(f)(toReadonlyArray(self)))

/**
 * Find the first index for which a predicate holds
 *
 * @since 1.0.0
 * @category elements
 */
export const findLastIndex: {
  <A>(f: Predicate<A>): (self: Chunk<A>) => Option<number>
  <A>(self: Chunk<A>, f: Predicate<A>): Option<number>
} = Dual.dual<
  <A>(f: Predicate<A>) => (self: Chunk<A>) => Option<number>,
  <A>(self: Chunk<A>, f: Predicate<A>) => Option<number>
>(2, (self, f) => RA.findLastIndex(f)(toReadonlyArray(self)))

/**
 * Find the last element which satisfies a predicate function
 *
 * @since 1.0.0
 * @category elements
 */
export const findLast: {
  <A, B extends A>(f: Refinement<A, B>): (self: Chunk<A>) => Option<B>
  <A>(f: Predicate<A>): (self: Chunk<A>) => Option<A>
  <A, B extends A>(self: Chunk<A>, f: Refinement<A, B>): Option<B>
  <A>(self: Chunk<A>, f: Predicate<A>): Option<A>
} = Dual.dual<
  {
    <A, B extends A>(f: Refinement<A, B>): (self: Chunk<A>) => Option<B>
    <A>(f: Predicate<A>): (self: Chunk<A>) => Option<A>
  },
  {
    <A, B extends A>(self: Chunk<A>, f: Refinement<A, B>): Option<B>
    <A>(self: Chunk<A>, f: Predicate<A>): Option<A>
  }
>(2, <A>(self: Chunk<A>, f: Predicate<A>) => RA.findLast(f)(toReadonlyArray(self)))

/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const flatMap: {
  <A, B>(f: (a: A) => Chunk<B>): (self: Chunk<A>) => Chunk<B>
  <A, B>(self: Chunk<A>, f: (a: A) => Chunk<B>): Chunk<B>
} = Dual.dual<
  <A, B>(f: (a: A) => Chunk<B>) => (self: Chunk<A>) => Chunk<B>,
  <A, B>(self: Chunk<A>, f: (a: A) => Chunk<B>) => Chunk<B>
>(2, <A, B>(self: Chunk<A>, f: (a: A) => Chunk<B>) => {
  if (self.backing._tag === "ISingleton") {
    return f(self.backing.a)
  }
  let r: Chunk<B> = _empty
  for (const k of self) {
    r = concat(f(k))(r)
  }
  return r
})

/**
 * Flattens a chunk of chunks into a single chunk by concatenating all chunks.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const flatten: <A>(self: Chunk<Chunk<A>>) => Chunk<A> = flatMap(identity)

/**
 * Iterate over the chunk applying `f`.
 *
 * @since 1.0.0
 * @category elements
 */
export const forEach: {
  <A>(f: (a: A) => void): (self: Chunk<A>) => void
  <A>(self: Chunk<A>, f: (a: A) => void): void
} = Dual.dual<
  <A>(f: (a: A) => void) => (self: Chunk<A>) => void,
  <A>(self: Chunk<A>, f: (a: A) => void) => void
>(2, (self, f) =>
  self.backing._tag === "ISingleton" ?
    f(self.backing.a) :
    toReadonlyArray(self).forEach(f))

/**
 * Groups elements in chunks of up to `n` elements.
 *
 * @since 1.0.0
 * @category elements
 */
export const chunksOf: {
  (n: number): <A>(self: Chunk<A>) => Chunk<Chunk<A>>
  <A>(self: Chunk<A>, n: number): Chunk<Chunk<A>>
} = Dual.dual<
  (n: number) => <A>(self: Chunk<A>) => Chunk<Chunk<A>>,
  <A>(self: Chunk<A>, n: number) => Chunk<Chunk<A>>
>(2, <A>(self: Chunk<A>, n: number) => {
  const gr: Array<Chunk<A>> = []
  let current: Array<A> = []
  toReadonlyArray(self).forEach((a) => {
    current.push(a)
    if (current.length >= n) {
      gr.push(unsafeFromArray(current))
      current = []
    }
  })
  if (current.length > 0) {
    gr.push(unsafeFromArray(current))
  }
  return unsafeFromArray(gr)
})

/**
 * Returns the first element of this chunk if it exists.
 *
 * @since 1.0.0
 * @category elements
 */
export const head: <A>(self: Chunk<A>) => Option<A> = get(0)

/**
 * Creates a Chunk of unique values that are included in all given Chunks.
 *
 * The order and references of result values are determined by the Chunk.
 *
 * @since 1.0.0
 * @category elements
 */
export const intersection: {
  <A>(that: Chunk<A>): <B>(self: Chunk<B>) => Chunk<A & B>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<A & B>
} = Dual.dual<
  <A>(that: Chunk<A>) => <B>(self: Chunk<B>) => Chunk<A & B>,
  <A, B>(self: Chunk<A>, that: Chunk<B>) => Chunk<A & B>
>(2, (self, that) =>
  pipe(
    toReadonlyArray(self),
    RA.intersection(Equal.equivalence<any>())(toReadonlyArray(that)),
    unsafeFromArray
  ))

/**
 * Determines if the chunk is empty.
 *
 * @since 1.0.0
 * @category elements
 */
export const isEmpty = <A>(self: Chunk<A>): boolean => self.length === 0

/**
 * Determines if the chunk is not empty.
 *
 * @since 1.0.0
 * @category elements
 */
export const isNonEmpty = <A>(self: Chunk<A>): self is NonEmptyChunk<A> => self.length > 0

/**
 * Folds over the elements in this chunk from the left.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduce: {
  <A, B>(b: B, f: (s: B, a: A) => B): (self: Chunk<A>) => B
  <A, B>(self: Chunk<A>, b: B, f: (s: B, a: A) => B): B
} = Dual.dual<
  <A, B>(b: B, f: (s: B, a: A) => B) => (self: Chunk<A>) => B,
  <A, B>(self: Chunk<A>, b: B, f: (s: B, a: A) => B) => B
>(3, (self, b, f) => pipe(toReadonlyArray(self), RA.reduce(b, f)))

/**
 * Folds over the elements in this chunk from the left.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceWithIndex: {
  <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Chunk<A>) => B
  <A, B>(self: Chunk<A>, b: B, f: (b: B, a: A, i: number) => B): B
} = Dual.dual<
  <B, A>(b: B, f: (b: B, a: A, i: number) => B) => (self: Chunk<A>) => B,
  <A, B>(self: Chunk<A>, b: B, f: (b: B, a: A, i: number) => B) => B
>(3, (self, b, f) => pipe(toReadonlyArray(self), RA.reduce(b, f)))

/**
 * Folds over the elements in this chunk from the right.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceRight: {
  <B, A>(b: B, f: (b: B, a: A) => B): (self: Chunk<A>) => B
  <A, B>(self: Chunk<A>, b: B, f: (b: B, a: A) => B): B
} = Dual.dual<
  <B, A>(b: B, f: (b: B, a: A) => B) => (self: Chunk<A>) => B,
  <A, B>(self: Chunk<A>, b: B, f: (b: B, a: A) => B) => B
>(3, (self, b, f) => pipe(toReadonlyArray(self), RA.reduceRight(b, (b, a) => f(b, a))))

/**
 * Folds over the elements in this chunk from the right.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceRightWithIndex: {
  <B, A>(b: B, f: (b: B, a: A, i: number) => B): (self: Chunk<A>) => B
  <A, B>(self: Chunk<A>, b: B, f: (b: B, a: A, i: number) => B): B
} = Dual.dual<
  <B, A>(b: B, f: (b: B, a: A, i: number) => B) => (self: Chunk<A>) => B,
  <A, B>(self: Chunk<A>, b: B, f: (b: B, a: A, i: number) => B) => B
>(3, (self, b, f) => pipe(toReadonlyArray(self), RA.reduceRight(b, f)))

/**
 * Joins the elements together with "sep" in the middle.
 *
 * @since 1.0.0
 * @category folding
 */
export const join: {
  (sep: string): (self: Chunk<string>) => string
  (self: Chunk<string>, sep: string): string
} = Dual.dual<
  (sep: string) => (self: Chunk<string>) => string,
  (self: Chunk<string>, sep: string) => string
>(2, (self, sep) => reduce(self, "", (s, a) => (s.length > 0 ? `${s}${sep}${a}` : a)))

/**
 * Returns the last element of this chunk if it exists.
 *
 * @since 1.0.0
 * @category elements
 */
export const last = <A>(self: Chunk<A>): Option<A> => get(self, self.length - 1)

/**
 * Builds a `NonEmptyChunk` from an non-empty collection of elements.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = <As extends readonly [any, ...ReadonlyArray<any>]>(
  ...as: As
): NonEmptyChunk<As[number]> => unsafeFromArray(as) as any

/**
 * Builds a `NonEmptyChunk` from a single element.
 *
 * @since 1.0.0
 * @category constructors
 */
export const of = <A>(a: A): NonEmptyChunk<A> => new ChunkImpl({ _tag: "ISingleton", a }) as any

/**
 * Return a Chunk of length n with element i initialized with f(i).
 *
 * **Note**. `n` is normalized to an integer >= 1.
 *
 * @since 1.0.0
 * @category constructors
 */
export const makeBy: {
  <A>(f: (i: number) => A): (n: number) => NonEmptyChunk<A>
  <A>(n: number, f: (i: number) => A): NonEmptyChunk<A>
} = Dual.dual<
  <A>(f: (i: number) => A) => (n: number) => NonEmptyChunk<A>,
  <A>(n: number, f: (i: number) => A) => NonEmptyChunk<A>
>(2, (n, f) => make(...RA.makeBy(n, f)))

/**
 * Returns an effect whose success is mapped by the specified f function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const map: {
  <A, B>(f: (a: A) => B): (self: Chunk<A>) => Chunk<B>
  <A, B>(self: Chunk<A>, f: (a: A) => B): Chunk<B>
} = Dual.dual<
  <A, B>(f: (a: A) => B) => (self: Chunk<A>) => Chunk<B>,
  <A, B>(self: Chunk<A>, f: (a: A) => B) => Chunk<B>
>(2, (self, f) =>
  self.backing._tag === "ISingleton" ?
    of(f(self.backing.a)) :
    unsafeFromArray(RA.map(f)(toReadonlyArray(self))))

/**
 * Returns an effect whose success is mapped by the specified f function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapWithIndex: {
  <A, B>(f: (a: A, i: number) => B): (self: Chunk<A>) => Chunk<B>
  <A, B>(self: Chunk<A>, f: (a: A, i: number) => B): Chunk<B>
} = Dual.dual<
  <A, B>(f: (a: A, i: number) => B) => (self: Chunk<A>) => Chunk<B>,
  <A, B>(self: Chunk<A>, f: (a: A, i: number) => B) => Chunk<B>
>(2, (self, f) =>
  self.backing._tag === "ISingleton" ?
    of(f(self.backing.a, 0)) :
    unsafeFromArray(pipe(toReadonlyArray(self), RA.map(f))))

/**
 * Statefully maps over the chunk, producing new elements of type `B`.
 *
 * @since 1.0.0
 * @category folding
 */
export const mapAccum: {
  <S, A, B>(s: S, f: (s: S, a: A) => readonly [S, B]): (self: Chunk<A>) => readonly [S, Chunk<B>]
  <S, A, B>(self: Chunk<A>, s: S, f: (s: S, a: A) => readonly [S, B]): readonly [S, Chunk<B>]
} = Dual.dual<
  <S, A, B>(s: S, f: (s: S, a: A) => readonly [S, B]) => (self: Chunk<A>) => readonly [S, Chunk<B>],
  <S, A, B>(self: Chunk<A>, s: S, f: (s: S, a: A) => readonly [S, B]) => readonly [S, Chunk<B>]
>(3, <S, A, B>(self: Chunk<A>, s: S, f: (s: S, a: A) => readonly [S, B]) => {
  let s1 = s
  const res: Array<B> = []
  for (const a of toReadonlyArray(self)) {
    const r = f(s1, a)
    s1 = r[0]
    res.push(r[1])
  }
  return [s1, unsafeFromArray(res)]
})

/**
 * Separate elements based on a predicate that also exposes the index of the element.
 *
 * @category filtering
 * @since 1.0.0
 */
export const partitionWithIndex: {
  <C extends A, B extends A, A = C>(
    refinement: (a: A, i: number) => a is B
  ): (self: Chunk<C>) => readonly [Chunk<C>, Chunk<B>]
  <B extends A, A = B>(predicate: (a: A, i: number) => boolean): (self: Chunk<B>) => readonly [Chunk<B>, Chunk<B>]
  <C extends A, B extends A, A = C>(
    self: Chunk<C>,
    refinement: (a: A, i: number) => a is B
  ): readonly [Chunk<C>, Chunk<B>]
  <B extends A, A = B>(self: Chunk<B>, predicate: (a: A, i: number) => boolean): readonly [Chunk<B>, Chunk<B>]
} = Dual.dual<
  {
    <C extends A, B extends A, A = C>(refinement: (a: A, i: number) => a is B): (
      self: Chunk<C>
    ) => readonly [Chunk<C>, Chunk<B>]
    <B extends A, A = B>(predicate: (a: A, i: number) => boolean): (
      self: Chunk<B>
    ) => readonly [Chunk<B>, Chunk<B>]
  },
  {
    <C extends A, B extends A, A = C>(
      self: Chunk<C>,
      refinement: (a: A, i: number) => a is B
    ): readonly [Chunk<C>, Chunk<B>]
    <B extends A, A = B>(
      self: Chunk<B>,
      predicate: (a: A, i: number) => boolean
    ): readonly [Chunk<B>, Chunk<B>]
  }
>(2, <B extends A, A = B>(self: Chunk<B>, f: (a: A, i: number) => boolean) =>
  pipe(
    toReadonlyArray(self),
    RA.partition(f),
    ([l, r]) => [unsafeFromArray(l), unsafeFromArray(r)] as const
  ))

/**
 * Separate elements based on a predicate.
 *
 * @category filtering
 * @since 1.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (self: Chunk<C>) => readonly [Chunk<C>, Chunk<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (self: Chunk<B>) => readonly [Chunk<B>, Chunk<B>]
  <C extends A, B extends A, A = C>(self: Chunk<C>, refinement: Refinement<A, B>): readonly [Chunk<C>, Chunk<B>]
  <B extends A, A = B>(self: Chunk<B>, predicate: Predicate<A>): readonly [Chunk<B>, Chunk<B>]
} = Dual.dual<
  {
    <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
      self: Chunk<C>
    ) => readonly [Chunk<C>, Chunk<B>]
    <B extends A, A = B>(
      predicate: Predicate<A>
    ): (self: Chunk<B>) => readonly [Chunk<B>, Chunk<B>]
  },
  {
    <C extends A, B extends A, A = C>(
      self: Chunk<C>,
      refinement: Refinement<A, B>
    ): readonly [Chunk<C>, Chunk<B>]
    <B extends A, A = B>(
      self: Chunk<B>,
      predicate: Predicate<A>
    ): readonly [Chunk<B>, Chunk<B>]
  }
>(2, <B extends A, A = B>(self: Chunk<B>, predicate: Predicate<A>) =>
  pipe(
    toReadonlyArray(self),
    RA.partition(predicate),
    ([l, r]) => [unsafeFromArray(l), unsafeFromArray(r)] as const
  ))

/**
 * Partitions the elements of this chunk into two chunks using f.
 *
 * @category filtering
 * @since 1.0.0
 */
export const partitionMap: {
  <A, B, C>(f: (a: A) => Either<B, C>): (self: Chunk<A>) => readonly [Chunk<B>, Chunk<C>]
  <A, B, C>(self: Chunk<A>, f: (a: A) => Either<B, C>): readonly [Chunk<B>, Chunk<C>]
} = Dual.dual<
  <A, B, C>(f: (a: A) => Either<B, C>) => (self: Chunk<A>) => readonly [Chunk<B>, Chunk<C>],
  <A, B, C>(self: Chunk<A>, f: (a: A) => Either<B, C>) => readonly [Chunk<B>, Chunk<C>]
>(2, (self, f) =>
  pipe(
    self,
    toReadonlyArray,
    RA.partitionMap(f),
    ([l, r]) => [unsafeFromArray(l), unsafeFromArray(r)]
  ))

/**
 * Partitions the elements of this chunk into two chunks.
 *
 * @category filtering
 * @since 1.0.0
 */
export const separate = <A, B>(self: Chunk<Either<A, B>>): readonly [Chunk<A>, Chunk<B>] =>
  pipe(
    self,
    toReadonlyArray,
    RA.separate,
    ([l, r]) => [unsafeFromArray(l), unsafeFromArray(r)]
  )

/**
 * Create a non empty `Chunk` containing a range of integers, including both endpoints.
 *
 * @category constructors
 * @since 1.0.0
 */
export const range = (start: number, end: number): NonEmptyChunk<number> =>
  start <= end ? makeBy(end - start + 1, (i) => start + i) : of(start)

/**
 * Reverse a Chunk, creating a new Chunk.
 *
 * @since 1.0.0
 * @category elements
 */
export const reverse = <A>(self: Chunk<A>): Chunk<A> => unsafeFromArray(RA.reverse(toReadonlyArray(self)))

/**
 * Retireves the size of the chunk
 *
 * @since 1.0.0
 * @category elements
 */
export const size = <A>(self: Chunk<A>): number => self.length

/**
 * Sort the elements of a Chunk in increasing order, creating a new Chunk.
 *
 * @since 1.0.0
 * @category elements
 */
export const sort: {
  <B>(O: Order<B>): <A extends B>(self: Chunk<A>) => Chunk<A>
  <A extends B, B>(self: Chunk<A>, O: Order<B>): Chunk<A>
} = Dual.dual<
  <B>(O: Order<B>) => <A extends B>(self: Chunk<A>) => Chunk<A>,
  <A extends B, B>(self: Chunk<A>, O: Order<B>) => Chunk<A>
>(2, (self, O) => pipe(toReadonlyArray(self), RA.sort(O), unsafeFromArray))

/**
 *  Returns two splits of this chunk at the specified index.
 *
 * @since 1.0.0
 * @category elements
 */
export const splitAt: {
  (n: number): <A>(self: Chunk<A>) => readonly [Chunk<A>, Chunk<A>]
  <A>(self: Chunk<A>, n: number): readonly [Chunk<A>, Chunk<A>]
} = Dual.dual<
  (n: number) => <A>(self: Chunk<A>) => readonly [Chunk<A>, Chunk<A>],
  <A>(self: Chunk<A>, n: number) => readonly [Chunk<A>, Chunk<A>]
>(2, (self, n) => [take(n)(self), drop(n)(self)])

/**
 * Splits this chunk into `n` equally sized chunks.
 *
 * @since 1.0.0
 * @category elements
 */
export const split: {
  (n: number): <A>(self: Chunk<A>) => Chunk<Chunk<A>>
  <A>(self: Chunk<A>, n: number): Chunk<Chunk<A>>
} = Dual.dual<
  (n: number) => <A>(self: Chunk<A>) => Chunk<Chunk<A>>,
  <A>(self: Chunk<A>, n: number) => Chunk<Chunk<A>>
>(2, <A>(self: Chunk<A>, n: number) => {
  const length = self.length
  const k = Math.floor(n)
  const quotient = Math.floor(length / k)
  const remainder = length % k
  const chunks: Array<Chunk<A>> = []
  let i = 0
  let chunk: Array<A> = []
  toReadonlyArray(self).forEach((a) => {
    chunk.push(a)
    if (
      (i <= remainder && chunk.length > quotient) ||
      (i > remainder && chunk.length >= quotient)
    ) {
      chunks.push(unsafeFromArray(chunk))
      chunk = []
    }
    i++
  })
  if (chunk.length > 0) {
    chunks.push(unsafeFromArray(chunk))
  }
  return unsafeFromArray(chunks)
})

/**
 * Splits this chunk on the first element that matches this predicate.
 *
 * @since 1.0.0
 * @category elements
 */
export const splitWhere: {
  <A>(f: Predicate<A>): (self: Chunk<A>) => readonly [Chunk<A>, Chunk<A>]
  <A>(self: Chunk<A>, f: Predicate<A>): readonly [Chunk<A>, Chunk<A>]
} = Dual.dual<
  <A>(f: Predicate<A>) => (self: Chunk<A>) => readonly [Chunk<A>, Chunk<A>],
  <A>(self: Chunk<A>, f: Predicate<A>) => readonly [Chunk<A>, Chunk<A>]
>(2, (self, f) => {
  let i = 0
  for (const a of toReadonlyArray(self)) {
    if (f(a)) {
      break
    } else {
      i++
    }
  }
  return splitAt(i)(self)
})

/**
 * Returns every elements after the first.
 *
 * @since 1.0.0
 * @category elements
 */
export const tail = <A>(self: Chunk<A>): Option<Chunk<A>> => self.length > 0 ? O.some(drop(1)(self)) : O.none()

/**
 * Takes the last `n` elements.
 *
 * @since 1.0.0
 * @category elements
 */
export const takeRight: {
  (n: number): <A>(self: Chunk<A>) => Chunk<A>
  <A>(self: Chunk<A>, n: number): Chunk<A>
} = Dual.dual<
  (n: number) => <A>(self: Chunk<A>) => Chunk<A>,
  <A>(self: Chunk<A>, n: number) => Chunk<A>
>(2, (self, n) => drop(self, self.length - n))

/**
 * Takes all elements so long as the predicate returns true.
 *
 * @since 1.0.0
 * @category elements
 */
export const takeWhile: {
  <A>(f: Predicate<A>): (self: Chunk<A>) => Chunk<A>
  <A>(self: Chunk<A>, f: Predicate<A>): Chunk<A>
} = Dual.dual<
  <A>(f: Predicate<A>) => (self: Chunk<A>) => Chunk<A>,
  <A>(self: Chunk<A>, f: Predicate<A>) => Chunk<A>
>(2, <A>(self: Chunk<A>, f: Predicate<A>) => {
  const res: Array<A> = []
  for (const a of toReadonlyArray(self)) {
    if (f(a)) {
      res.push(a)
    } else {
      break
    }
  }
  return unsafeFromArray(res)
})

/**
 * Constructs a `Chunk` by repeatedly applying the function `f` as long as it * returns `Some`.
 *
 * @since 1.0.0
 * @category elements
 */
export const unfold = <A, S>(s: S, f: (s: S) => Option<readonly [A, S]>): Chunk<A> => {
  const builder: Array<A> = []
  let cont = true
  let s1 = s
  while (cont) {
    const x = f(s1)
    if (O.isSome(x)) {
      s1 = x.value[1]
      builder.push(x.value[0])
    } else {
      cont = false
    }
  }
  return unsafeFromArray(builder)
}

/**
 * Creates a Chunks of unique values, in order, from all given Chunks.
 *
 * @since 1.0.0
 * @category elements
 */
export const union: {
  <A>(that: Chunk<A>): <B>(self: Chunk<B>) => Chunk<A | B>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<A | B>
} = Dual.dual<
  <A>(that: Chunk<A>) => <B>(self: Chunk<B>) => Chunk<A | B>,
  <A, B>(self: Chunk<A>, that: Chunk<B>) => Chunk<A | B>
>(2, <A, B>(self: Chunk<A>, that: Chunk<B>) =>
  unsafeFromArray(
    RA.union(Equal.equivalence<A | B>())(toReadonlyArray(that))(toReadonlyArray(self))
  ))

/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 * @category elements
 */
export const dedupe = <A>(self: Chunk<A>): Chunk<A> =>
  unsafeFromArray(RA.uniq(Equal.equivalence<A>())(toReadonlyArray(self)))

/**
 * Returns the first element of this chunk.
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeHead = <A>(self: Chunk<A>): A => unsafeGet(0)(self)

/**
 * Returns the last element of this chunk.
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeLast = <A>(self: Chunk<A>): A => unsafeGet(self.length - 1)(self)

/**
 * Takes an array of pairs and return two corresponding arrays.
 *
 * Note: The function is reverse of `zip`.
 *
 * @since 1.0.0
 * @category elements
 */
export const unzip = <A, B>(as: Chunk<readonly [A, B]>): readonly [Chunk<A>, Chunk<B>] => {
  const fa: Array<A> = []
  const fb: Array<B> = []
  toReadonlyArray(as).forEach(([a, b]) => {
    fa.push(a)
    fb.push(b)
  })
  return [unsafeFromArray(fa), unsafeFromArray(fb)]
}

/**
 * Zips this chunk pointwise with the specified chunk.
 *
 * @since 1.0.0
 * @category elements
 */
export const zip: {
  <B>(that: Chunk<B>): <A>(self: Chunk<A>) => Chunk<readonly [A, B]>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<readonly [A, B]>
} = Dual.dual<
  <B>(that: Chunk<B>) => <A>(self: Chunk<A>) => Chunk<readonly [A, B]>,
  <A, B>(self: Chunk<A>, that: Chunk<B>) => Chunk<readonly [A, B]>
>(2, (self, that) => zipWith(self, that, (a, b) => [a, b]))

/**
 * Zips this chunk pointwise with the specified chunk using the specified combiner.
 *
 * @since 1.0.0
 * @category elements
 */
export const zipWith: {
  <A, B, C>(that: Chunk<B>, f: (a: A, b: B) => C): (self: Chunk<A>) => Chunk<C>
  <A, B, C>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => C): Chunk<C>
} = Dual.dual<
  <A, B, C>(that: Chunk<B>, f: (a: A, b: B) => C) => (self: Chunk<A>) => Chunk<C>,
  <A, B, C>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => C) => Chunk<C>
>(3, (self, that, f) => {
  const selfA = toReadonlyArray(self)
  const thatA = toReadonlyArray(that)
  return pipe(selfA, RA.zipWith(thatA, f), unsafeFromArray)
})

/**
 * Zips this chunk pointwise with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 *
 * @since 1.0.0
 * @category elements
 */
export const zipAll: {
  <B>(that: Chunk<B>): <A>(self: Chunk<A>) => Chunk<readonly [Option<A>, Option<B>]>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<readonly [Option<A>, Option<B>]>
} = Dual.dual<
  <B>(that: Chunk<B>) => <A>(self: Chunk<A>) => Chunk<readonly [Option<A>, Option<B>]>,
  <A, B>(self: Chunk<A>, that: Chunk<B>) => Chunk<readonly [Option<A>, Option<B>]>
>(2, (self, that) =>
  zipAllWith(
    self,
    that,
    (a, b) => [O.some(a), O.some(b)],
    (a) => [O.some(a), O.none()],
    (b) => [O.none(), O.some(b)]
  ))

/**
 * Zips with chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk combined using the specified function
 * `both`. If one chunk is shorter than the other uses the specified
 * function `left` or `right` to map the element that does exist to the
 * result type.
 *
 * @since 1.0.0
 * @category elements
 */
export const zipAllWith: {
  <A, B, C, D, E>(
    that: Chunk<B>,
    f: (a: A, b: B) => C,
    left: (a: A) => D,
    right: (b: B) => E
  ): (self: Chunk<A>) => Chunk<C | D | E>
  <A, B, C, D, E>(
    self: Chunk<A>,
    that: Chunk<B>,
    f: (a: A, b: B) => C,
    left: (a: A) => D,
    right: (b: B) => E
  ): Chunk<C | D | E>
} = Dual.dual<
  <A, B, C, D, E>(
    that: Chunk<B>,
    f: (a: A, b: B) => C,
    left: (a: A) => D,
    right: (b: B) => E
  ) => (self: Chunk<A>) => Chunk<C | D | E>,
  <A, B, C, D, E>(
    self: Chunk<A>,
    that: Chunk<B>,
    f: (a: A, b: B) => C,
    left: (a: A) => D,
    right: (b: B) => E
  ) => Chunk<C | D | E>
>(5, <A, B, C, D, E>(
  self: Chunk<A>,
  that: Chunk<B>,
  f: (a: A, b: B) => C,
  left: (a: A) => D,
  right: (b: B) => E
) => {
  const length = Math.max(self.length, that.length)
  if (length === 0) {
    return _empty
  }
  const leftarr = toReadonlyArray(self)
  const rightArr = toReadonlyArray(that)
  let i = 0
  let j = 0
  let k = 0
  const leftLength = leftarr.length
  const rightLength = rightArr.length
  const builder: Array<C | D | E> = new Array(length)
  while (i < length) {
    if (j < leftLength && k < rightLength) {
      builder[i] = f(leftarr![j]!, rightArr![k]!)
      i++
      j++
      k++
    } else if (j < leftLength) {
      builder[i] = left(leftarr![j]!)
      i++
      j++
    } else if (k < rightLength) {
      builder[i] = right(rightArr![k]!)
      i++
      k++
    }
  }
  return unsafeFromArray(builder)
})

/**
 * Zips this chunk crosswise with the specified chunk using the specified combiner.
 *
 * @since 1.0.0
 * @category elements
 */
export const crossWith: {
  <A, B, C>(that: Chunk<B>, f: (a: A, b: B) => C): (self: Chunk<A>) => Chunk<C>
  <A, B, C>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => C): Chunk<C>
} = Dual.dual<
  <A, B, C>(that: Chunk<B>, f: (a: A, b: B) => C) => (self: Chunk<A>) => Chunk<C>,
  <A, B, C>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => C) => Chunk<C>
>(3, (self, that, f) => flatMap(self, (a) => pipe(that, map((b) => f(a, b)))))

/**
 * Zips this chunk crosswise with the specified chunk.
 *
 * @since 1.0.0
 * @category elements
 */
export const cross: {
  <B>(that: Chunk<B>): <A>(self: Chunk<A>) => Chunk<readonly [A, B]>
  <A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<readonly [A, B]>
} = Dual.dual<
  <B>(that: Chunk<B>) => <A>(self: Chunk<A>) => Chunk<readonly [A, B]>,
  <A, B>(self: Chunk<A>, that: Chunk<B>) => Chunk<readonly [A, B]>
>(2, (self, that) => crossWith(self, that, (a, b) => [a, b]))

/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 *
 * @category elements
 * @since 1.0.0
 */
export const zipWithIndex = <A>(self: Chunk<A>): Chunk<readonly [A, number]> => zipWithIndexOffset(0)(self)

/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 *
 * @category elements
 * @since 1.0.0
 */
export const zipWithIndexOffset: {
  (offset: number): <A>(self: Chunk<A>) => Chunk<[A, number]>
  <A>(self: Chunk<A>, offset: number): Chunk<[A, number]>
} = Dual.dual<
  (offset: number) => <A>(self: Chunk<A>) => Chunk<[A, number]>,
  <A>(self: Chunk<A>, offset: number) => Chunk<[A, number]>
>(2, <A>(self: Chunk<A>, offset: number) => {
  const iterator = self[Symbol.iterator]()
  let next: IteratorResult<A>
  let i = offset
  const builder: Array<[A, number]> = []
  while (!(next = iterator.next()).done) {
    builder.push([next.value, i])
    i = i + 1
  }
  return unsafeFromArray(builder)
})

/**
 * Delete the element at the specified index, creating a new `Chunk`,
 * or returning the input if the index is out of bounds.
 *
 * @category mutations
 * @since 1.0.0
 */
export const remove: {
  (i: number): <A>(self: Chunk<A>) => Chunk<A>
  <A>(self: Chunk<A>, i: number): Chunk<A>
} = Dual.dual<
  (i: number) => <A>(self: Chunk<A>) => Chunk<A>,
  <A>(self: Chunk<A>, i: number) => Chunk<A>
>(2, (self, i) => pipe(self, toReadonlyArray, RA.remove(i), unsafeFromArray))

/**
 * Change the element at the specified index, creating a new `Chunk`,
 * or returning the input if the index is out of bounds.
 *
 * @category mutations
 * @since 1.0.0
 */
export const replace: {
  <B>(i: number, b: B): <A>(self: Chunk<A>) => Chunk<B | A>
  <A, B>(self: Chunk<A>, i: number, b: B): Chunk<B | A>
} = Dual.dual<
  <B>(i: number, b: B) => <A>(self: Chunk<A>) => Chunk<B | A>,
  <A, B>(self: Chunk<A>, i: number, b: B) => Chunk<B | A>
>(3, (self, i, b) => modify(self, i, () => b))

/**
 * @category mutations
 * @since 1.0.0
 */
export const replaceOption: {
  <B>(i: number, b: B): <A>(self: Chunk<A>) => Option<Chunk<B | A>>
  <A, B>(self: Chunk<A>, i: number, b: B): Option<Chunk<B | A>>
} = Dual.dual<
  <B>(i: number, b: B) => <A>(self: Chunk<A>) => Option<Chunk<B | A>>,
  <A, B>(self: Chunk<A>, i: number, b: B) => Option<Chunk<B | A>>
>(3, (self, i, b) => modifyOption(self, i, () => b))

/**
 * Apply a function to the element at the specified index, creating a new `Chunk`,
 * or returning the input if the index is out of bounds.
 *
 * @category mutations
 * @since 1.0.0
 */
export const modify: {
  <A, B>(i: number, f: (a: A) => B): (self: Chunk<A>) => Chunk<A | B>
  <A, B>(self: Chunk<A>, i: number, f: (a: A) => B): Chunk<A | B>
} = Dual.dual<
  <A, B>(i: number, f: (a: A) => B) => (self: Chunk<A>) => Chunk<A | B>,
  <A, B>(self: Chunk<A>, i: number, f: (a: A) => B) => Chunk<A | B>
>(3, (self, i, f) => pipe(modifyOption(self, i, f), O.getOrElse(() => self)))

/**
 * @category mutations
 * @since 1.0.0
 */
export const modifyOption: {
  <A, B>(i: number, f: (a: A) => B): (self: Chunk<A>) => Option<Chunk<A | B>>
  <A, B>(self: Chunk<A>, i: number, f: (a: A) => B): Option<Chunk<A | B>>
} = Dual.dual<
  <A, B>(i: number, f: (a: A) => B) => (self: Chunk<A>) => Option<Chunk<A | B>>,
  <A, B>(self: Chunk<A>, i: number, f: (a: A) => B) => Option<Chunk<A | B>>
>(3, (self, i, f) => pipe(self, toReadonlyArray, RA.modifyOption(i, f), O.map(unsafeFromArray)))

/**
 * Returns the first element of this non empty chunk.
 *
 * @since 1.0.0
 * @category elements
 */
export const headNonEmpty: <A>(self: NonEmptyChunk<A>) => A = unsafeHead

/**
 * Returns every elements after the first.
 *
 * @since 1.0.0
 * @category elements
 */
export const tailNonEmpty = <A>(self: NonEmptyChunk<A>): Chunk<A> => drop(self, 1)
