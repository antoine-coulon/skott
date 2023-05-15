/**
 * @since 1.0.0
 */
import * as Chunk from "@effect/data/Chunk"
import * as Dual from "@effect/data/Function"
import * as MutableList from "@effect/data/MutableList"

const TypeId: unique symbol = Symbol.for("@effect/data/MutableQueue") as TypeId

/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category symbol
 */
export const EmptyMutableQueue = Symbol.for("@effect/data/mutable/MutableQueue/Empty")

/**
 * @since 1.0.0
 * @category model
 */
export interface MutableQueue<A> extends Iterable<A> {
  readonly _id: TypeId

  /** @internal */
  queue: MutableList.MutableList<A>
  /** @internal */
  capacity: number | undefined
}

/**
 * @since 1.0.0
 */
export declare namespace MutableQueue {
  export type Empty = typeof EmptyMutableQueue
}

/** @internal */
class MutableQueueImpl<A> implements MutableQueue<A> {
  readonly _tag = "Bounded"
  readonly _id: TypeId = TypeId

  queue: MutableList.MutableList<A> = MutableList.empty()

  constructor(readonly capacity: number | undefined = undefined) {}

  [Symbol.iterator](): Iterator<A> {
    return Array.from(this.queue)[Symbol.iterator]()
  }

  toString() {
    return `MutableQueue(${Array.from(this).map(String).join(", ")})`
  }

  toJSON() {
    return {
      _tag: "MutableQueue",
      values: Array.from(this)
    }
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON()
  }
}

/**
 * Creates a new bounded `MutableQueue`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const bounded = <A>(capacity: number): MutableQueue<A> => new MutableQueueImpl(capacity)

/**
 * Creates a new unbounded `MutableQueue`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const unbounded = <A>(): MutableQueue<A> => new MutableQueueImpl()

/**
 * Returns the current number of elements in the queue.
 *
 * @since 1.0.0
 * @category getters
 */
export const length = <A>(self: MutableQueue<A>): number => MutableList.length(self.queue)

/**
 * Returns `true` if the queue is empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isEmpty = <A>(self: MutableQueue<A>): boolean => MutableList.isEmpty(self.queue)

/**
 * Returns `true` if the queue is full, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isFull = <A>(self: MutableQueue<A>): boolean =>
  self.capacity === undefined ? false : MutableList.length(self.queue) === self.capacity

/**
 * The **maximum** number of elements that a queue can hold.
 *
 * **Note**: unbounded queues can still implement this interface with
 * `capacity = Infinity`.
 *
 * @since 1.0.0
 * @category getters
 */
export const capacity = <A>(self: MutableQueue<A>): number => self.capacity === undefined ? Infinity : self.capacity

/**
 * Offers an element to the queue.
 *
 * Returns whether the enqueue was successful or not.
 *
 * @since 1.0.0
 * @category mutations
 */
export const offer: {
  <A>(self: MutableQueue<A>, value: A): boolean
  <A>(value: A): (self: MutableQueue<A>) => boolean
} = Dual.dual<
  <A>(value: A) => (self: MutableQueue<A>) => boolean,
  <A>(self: MutableQueue<A>, value: A) => boolean
>(2, <A>(self: MutableQueue<A>, value: A) => {
  const queueLength = MutableList.length((self as MutableQueueImpl<A>).queue)
  if (self.capacity !== undefined && queueLength === self.capacity) {
    return false
  }
  MutableList.append(value)(self.queue)
  return true
})

/**
 * Enqueues a collection of values into the queue.
 *
 * Returns a `List` of the values that were **not** able to be enqueued.
 *
 * @since 1.0.0
 * @category mutations
 */
export const offerAll: {
  <A>(values: Iterable<A>): (self: MutableQueue<A>) => Chunk.Chunk<A>
  <A>(self: MutableQueue<A>, values: Iterable<A>): Chunk.Chunk<A>
} = Dual.dual<
  <A>(values: Iterable<A>) => (self: MutableQueue<A>) => Chunk.Chunk<A>,
  <A>(self: MutableQueue<A>, values: Iterable<A>) => Chunk.Chunk<A>
>(2, <A>(self: MutableQueue<A>, values: Iterable<A>) => {
  const iterator = values[Symbol.iterator]()
  let next: IteratorResult<A> | undefined
  let remainder = Chunk.empty<A>()
  let offering = true
  while (offering && (next = iterator.next()) && !next.done) {
    offering = offer(next.value)(self)
  }
  while (next != null && !next.done) {
    remainder = Chunk.prepend<A>(next.value)(remainder)
    next = iterator.next()
  }
  return Chunk.reverse(remainder)
})

/**
 * Dequeues an element from the queue.
 *
 * Returns either an element from the queue, or the `def` param.
 *
 * **Note**: if there is no meaningful default for your type, you can always
 * use `poll(MutableQueue.EmptyMutableQueue)`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const poll: {
  <D>(def: D): <A>(self: MutableQueue<A>) => D | A
  <A, D>(self: MutableQueue<A>, def: D): A | D
} = Dual.dual<
  <D>(def: D) => <A>(self: MutableQueue<A>) => A | D,
  <A, D>(self: MutableQueue<A>, def: D) => A | D
>(2, (self, def) => {
  if (MutableList.isEmpty(self.queue)) {
    return def
  }
  return MutableList.shift(self.queue)!
})

/**
 * Dequeues up to `n` elements from the queue.
 *
 * Returns a `List` of up to `n` elements.
 *
 * @since 1.0.0
 * @category mutations
 */
export const pollUpTo: {
  (n: number): <A>(self: MutableQueue<A>) => Chunk.Chunk<A>
  <A>(self: MutableQueue<A>, n: number): Chunk.Chunk<A>
} = Dual.dual<
  (n: number) => <A>(self: MutableQueue<A>) => Chunk.Chunk<A>,
  <A>(self: MutableQueue<A>, n: number) => Chunk.Chunk<A>
>(2, <A>(self: MutableQueue<A>, n: number) => {
  let result = Chunk.empty<A>()
  let count = 0
  while (count < n) {
    const element = poll(EmptyMutableQueue)(self)
    if (element === EmptyMutableQueue) {
      break
    }
    result = Chunk.prepend(element)(result)
    count += 1
  }
  return Chunk.reverse(result)
})
