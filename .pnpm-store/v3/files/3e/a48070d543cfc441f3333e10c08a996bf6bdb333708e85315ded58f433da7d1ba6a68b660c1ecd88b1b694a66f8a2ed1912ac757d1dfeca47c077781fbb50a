import * as Chunk from "@effect/data/Chunk"
import { pipe } from "@effect/data/Function"
import * as MutableQueue from "@effect/data/MutableQueue"
import * as MutableRef from "@effect/data/MutableRef"
import type * as Option from "@effect/data/Option"
import * as ReadonlyArray from "@effect/data/ReadonlyArray"
import * as Debug from "@effect/io/Debug"
import type * as Deferred from "@effect/io/Deferred"
import type * as Effect from "@effect/io/Effect"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import type * as Queue from "@effect/io/Queue"

/** @internal */
const EnqueueSymbolKey = "@effect/io/Queue/Enqueue"

/** @internal */
export const EnqueueTypeId: Queue.EnqueueTypeId = Symbol.for(EnqueueSymbolKey) as Queue.EnqueueTypeId

/** @internal */
const DequeueSymbolKey = "@effect/io/Queue/Dequeue"

/** @internal */
export const DequeueTypeId: Queue.DequeueTypeId = Symbol.for(DequeueSymbolKey) as Queue.DequeueTypeId

/** @internal */
const QueueStrategySymbolKey = "@effect/io/Queue/Strategy"

/** @internal */
export const QueueStrategyTypeId: Queue.QueueStrategyTypeId = Symbol.for(
  QueueStrategySymbolKey
) as Queue.QueueStrategyTypeId

/** @internal */
const queueStrategyVariance = {
  _A: (_: never) => _
}

/** @internal */
export const enqueueVariance = {
  _In: (_: unknown) => _
}

/** @internal */
export const dequeueVariance = {
  _Out: (_: never) => _
}

/** @internal */
class QueueImpl<A> implements Queue.Queue<A> {
  readonly [EnqueueTypeId] = enqueueVariance
  readonly [DequeueTypeId] = dequeueVariance

  constructor(
    /** @internal */
    readonly queue: MutableQueue.MutableQueue<A>,
    /** @internal */
    readonly takers: MutableQueue.MutableQueue<Deferred.Deferred<never, A>>,
    /** @internal */
    readonly shutdownHook: Deferred.Deferred<never, void>,
    /** @internal */
    readonly shutdownFlag: MutableRef.MutableRef<boolean>,
    /** @internal */
    readonly strategy: Queue.Strategy<A>
  ) {
  }

  capacity(): number {
    return MutableQueue.capacity(this.queue)
  }

  size(): Effect.Effect<never, never, number> {
    return Debug.bodyWithTrace((trace) =>
      core.suspendSucceed(() =>
        MutableRef.get(this.shutdownFlag)
          ? core.interrupt()
          : core.succeed(
            MutableQueue.length(this.queue) -
              MutableQueue.length(this.takers) +
              this.strategy.surplusSize()
          )
      ).traced(trace)
    )
  }

  isEmpty(): Effect.Effect<never, never, boolean> {
    return Debug.bodyWithTrace((trace) =>
      core.map(
        this.size(),
        (size) => size <= 0
      ).traced(trace)
    )
  }

  isFull(): Effect.Effect<never, never, boolean> {
    return Debug.bodyWithTrace((trace) =>
      core.map(
        this.size(),
        (size) => size >= this.capacity()
      ).traced(trace)
    )
  }

  shutdown(): Effect.Effect<never, never, void> {
    return Debug.bodyWithTrace((trace) =>
      core.uninterruptible(
        core.withFiberRuntime<never, never, void>((state) => {
          pipe(this.shutdownFlag, MutableRef.set(true))
          return pipe(
            unsafePollAll(this.takers),
            fiberRuntime.forEachParDiscard((d) => core.deferredInterruptWith(d, state.id())),
            core.zipRight(this.strategy.shutdown()),
            core.whenEffect(core.deferredSucceed(this.shutdownHook, void 0)),
            core.asUnit
          )
        })
      ).traced(trace)
    )
  }

  isShutdown(): Effect.Effect<never, never, boolean> {
    return Debug.bodyWithTrace((trace) => core.sync(() => MutableRef.get(this.shutdownFlag)).traced(trace))
  }

  awaitShutdown(): Effect.Effect<never, never, void> {
    return Debug.bodyWithTrace((trace) => core.deferredAwait(this.shutdownHook).traced(trace))
  }

  offer(value: A): Effect.Effect<never, never, boolean> {
    return Debug.bodyWithTrace((trace) =>
      core.suspendSucceed(() => {
        if (MutableRef.get(this.shutdownFlag)) {
          return core.interrupt()
        }
        let noRemaining: boolean
        if (MutableQueue.isEmpty(this.queue)) {
          const taker = pipe(
            this.takers,
            MutableQueue.poll(MutableQueue.EmptyMutableQueue)
          )
          if (taker !== MutableQueue.EmptyMutableQueue) {
            unsafeCompleteDeferred(taker, value)
            noRemaining = true
          } else {
            noRemaining = false
          }
        } else {
          noRemaining = false
        }
        if (noRemaining) {
          return core.succeed(true)
        }
        // Not enough takers, offer to the queue
        const succeeded = pipe(this.queue, MutableQueue.offer(value))
        unsafeCompleteTakers(this.strategy, this.queue, this.takers)
        return succeeded
          ? core.succeed(true)
          : this.strategy.handleSurplus([value], this.queue, this.takers, this.shutdownFlag)
      }).traced(trace)
    )
  }

  offerAll(iterable: Iterable<A>): Effect.Effect<never, never, boolean> {
    return Debug.bodyWithTrace((trace) =>
      core.suspendSucceed(() => {
        if (MutableRef.get(this.shutdownFlag)) {
          return core.interrupt()
        }
        const values = ReadonlyArray.fromIterable(iterable)
        const pTakers = MutableQueue.isEmpty(this.queue)
          ? ReadonlyArray.fromIterable(unsafePollN(this.takers, values.length))
          : ReadonlyArray.empty
        const [forTakers, remaining] = pipe(values, ReadonlyArray.splitAt(pTakers.length))
        for (let i = 0; i < pTakers.length; i++) {
          const taker = pTakers[i]
          const item = forTakers[i]
          unsafeCompleteDeferred(taker, item)
        }
        if (remaining.length === 0) {
          return core.succeed(true)
        }
        // Not enough takers, offer to the queue
        const surplus = unsafeOfferAll(this.queue, remaining)
        unsafeCompleteTakers(this.strategy, this.queue, this.takers)
        return Chunk.isEmpty(surplus)
          ? core.succeed(true)
          : this.strategy.handleSurplus(surplus, this.queue, this.takers, this.shutdownFlag)
      }).traced(trace)
    )
  }

  take(): Effect.Effect<never, never, A> {
    return Debug.bodyWithTrace((trace) =>
      core.withFiberRuntime<never, never, A>((state) => {
        if (MutableRef.get(this.shutdownFlag)) {
          return core.interrupt()
        }
        const item = pipe(this.queue, MutableQueue.poll(MutableQueue.EmptyMutableQueue))
        if (item !== MutableQueue.EmptyMutableQueue) {
          this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers)
          return core.succeed(item)
        } else {
          // Add the deferred to takers, then:
          // - Try to take again in case a value was added since
          // - Wait for the deferred to be completed
          // - Clean up resources in case of interruption
          const deferred = core.deferredUnsafeMake<never, A>(state.id())
          return pipe(
            core.suspendSucceed(() => {
              pipe(this.takers, MutableQueue.offer(deferred))
              unsafeCompleteTakers(this.strategy, this.queue, this.takers)
              return MutableRef.get(this.shutdownFlag) ?
                core.interrupt() :
                core.deferredAwait(deferred)
            }),
            core.onInterrupt(() => {
              return core.sync(() => unsafeRemove(this.takers, deferred))
            })
          )
        }
      }).traced(trace)
    )
  }

  takeAll(): Effect.Effect<never, never, Chunk.Chunk<A>> {
    return Debug.bodyWithTrace((trace) =>
      core.suspendSucceed(() => {
        return MutableRef.get(this.shutdownFlag)
          ? core.interrupt()
          : core.sync(() => {
            const values = unsafePollAll(this.queue)
            this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers)
            return Chunk.fromIterable(values)
          })
      }).traced(trace)
    )
  }

  takeUpTo(max: number): Effect.Effect<never, never, Chunk.Chunk<A>> {
    return Debug.bodyWithTrace((trace) =>
      core.suspendSucceed(() =>
        MutableRef.get(this.shutdownFlag)
          ? core.interrupt()
          : core.sync(() => {
            const values = unsafePollN(this.queue, max)
            this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers)
            return Chunk.fromIterable(values)
          })
      ).traced(trace)
    )
  }

  takeBetween(min: number, max: number): Effect.Effect<never, never, Chunk.Chunk<A>> {
    return Debug.bodyWithTrace((trace) =>
      core.suspendSucceed(() =>
        takeRemainderLoop(
          this,
          min,
          max,
          Chunk.empty()
        )
      ).traced(trace)
    )
  }
}

/** @internal */
const takeRemainderLoop = <A>(
  self: Queue.Dequeue<A>,
  min: number,
  max: number,
  acc: Chunk.Chunk<A>
): Effect.Effect<never, never, Chunk.Chunk<A>> => {
  if (max < min) {
    return core.succeed(acc)
  }
  return pipe(
    takeUpTo(self, max),
    core.flatMap((bs) => {
      const remaining = min - bs.length
      if (remaining === 1) {
        return pipe(
          take(self),
          core.map((b) => pipe(acc, Chunk.concat(bs), Chunk.append(b)))
        )
      }
      if (remaining > 1) {
        return pipe(
          take(self),
          core.flatMap((b) =>
            takeRemainderLoop(
              self,
              remaining - 1,
              max - bs.length - 1,
              pipe(acc, Chunk.concat(bs), Chunk.append(b))
            )
          )
        )
      }
      return core.succeed(pipe(acc, Chunk.concat(bs)))
    })
  )
}

/** @internal */
export const isQueue = (u: unknown): u is Queue.Queue<unknown> => {
  return isEnqueue(u) && isDequeue(u)
}

/** @internal */
export const isEnqueue = (u: unknown): u is Queue.Enqueue<unknown> => {
  return typeof u === "object" && u != null && EnqueueTypeId in u
}

/** @internal */
export const isDequeue = (u: unknown): u is Queue.Dequeue<unknown> => {
  return typeof u === "object" && u != null && DequeueTypeId in u
}

/** @internal */
export const bounded = Debug.methodWithTrace((trace) =>
  <A>(requestedCapacity: number): Effect.Effect<never, never, Queue.Queue<A>> =>
    pipe(
      core.sync(() => MutableQueue.bounded<A>(requestedCapacity)),
      core.flatMap((queue) => make(queue, backPressureStrategy()))
    ).traced(trace)
)

/** @internal */
export const dropping = Debug.methodWithTrace((trace) =>
  <A>(requestedCapacity: number): Effect.Effect<never, never, Queue.Queue<A>> =>
    pipe(
      core.sync(() => MutableQueue.bounded<A>(requestedCapacity)),
      core.flatMap((queue) => make(queue, droppingStrategy()))
    ).traced(trace)
)

/** @internal */
export const sliding = Debug.methodWithTrace((trace) =>
  <A>(requestedCapacity: number): Effect.Effect<never, never, Queue.Queue<A>> =>
    pipe(
      core.sync(() => MutableQueue.bounded<A>(requestedCapacity)),
      core.flatMap((queue) => make(queue, slidingStrategy()))
    ).traced(trace)
)

/** @internal */
export const unbounded = Debug.methodWithTrace((trace) =>
  <A>(): Effect.Effect<never, never, Queue.Queue<A>> =>
    pipe(
      core.sync(() => MutableQueue.unbounded<A>()),
      core.flatMap((queue) => make(queue, droppingStrategy()))
    ).traced(trace)
)

/** @internal */
const unsafeMake = <A>(
  queue: MutableQueue.MutableQueue<A>,
  takers: MutableQueue.MutableQueue<Deferred.Deferred<never, A>>,
  shutdownHook: Deferred.Deferred<never, void>,
  shutdownFlag: MutableRef.MutableRef<boolean>,
  strategy: Queue.Strategy<A>
): Queue.Queue<A> => {
  return new QueueImpl(queue, takers, shutdownHook, shutdownFlag, strategy)
}

/** @internal */
const make = Debug.methodWithTrace((trace) =>
  <A>(
    queue: MutableQueue.MutableQueue<A>,
    strategy: Queue.Strategy<A>
  ): Effect.Effect<never, never, Queue.Queue<A>> =>
    pipe(
      core.deferredMake<never, void>(),
      core.map((deferred) =>
        unsafeMake(
          queue,
          MutableQueue.unbounded(),
          deferred,
          MutableRef.make(false),
          strategy
        )
      )
    ).traced(trace)
)

/** @internal */
export const capacity = <A>(self: Queue.Dequeue<A> | Queue.Enqueue<A>): number => {
  return self.capacity()
}

/** @internal */
export const size = Debug.methodWithTrace((trace) =>
  <A>(self: Queue.Dequeue<A> | Queue.Enqueue<A>): Effect.Effect<never, never, number> => self.size().traced(trace)
)

/** @internal */
export const isFull = Debug.methodWithTrace((trace) =>
  <A>(self: Queue.Dequeue<A> | Queue.Enqueue<A>): Effect.Effect<never, never, boolean> => self.isFull().traced(trace)
)

/** @internal */
export const isEmpty = Debug.methodWithTrace((trace) =>
  <A>(self: Queue.Dequeue<A> | Queue.Enqueue<A>): Effect.Effect<never, never, boolean> => self.isEmpty().traced(trace)
)

/** @internal */
export const isShutdown = Debug.methodWithTrace((trace) =>
  <A>(self: Queue.Dequeue<A> | Queue.Enqueue<A>): Effect.Effect<never, never, boolean> =>
    self.isShutdown().traced(trace)
)

/** @internal */
export const awaitShutdown = Debug.methodWithTrace((trace) =>
  <A>(self: Queue.Dequeue<A> | Queue.Enqueue<A>): Effect.Effect<never, never, void> =>
    self.awaitShutdown().traced(trace)
)

/** @internal */
export const shutdown = Debug.methodWithTrace((trace) =>
  <A>(self: Queue.Dequeue<A> | Queue.Enqueue<A>): Effect.Effect<never, never, void> => self.shutdown().traced(trace)
)

/** @internal */
export const offer = Debug.dualWithTrace<
  <A>(value: A) => (self: Queue.Enqueue<A>) => Effect.Effect<never, never, boolean>,
  <A>(self: Queue.Enqueue<A>, value: A) => Effect.Effect<never, never, boolean>
>(2, (trace) => (self, value) => self.offer(value).traced(trace))

/** @internal */
export const offerAll = Debug.dualWithTrace<
  <A>(
    iterable: Iterable<A>
  ) => (self: Queue.Enqueue<A>) => (self: Queue.Enqueue<A>) => Effect.Effect<never, never, boolean>,
  <A>(
    self: Queue.Enqueue<A>,
    iterable: Iterable<A>
  ) => Effect.Effect<never, never, boolean>
>(2, (trace) => (self, iterable) => self.offerAll(iterable).traced(trace))

/** @internal */
export const poll = Debug.methodWithTrace((trace) =>
  <A>(self: Queue.Dequeue<A>): Effect.Effect<never, never, Option.Option<A>> =>
    pipe(self.takeUpTo(1), core.map(Chunk.head)).traced(trace)
)

/** @internal */
export const take = Debug.methodWithTrace((trace) =>
  <A>(self: Queue.Dequeue<A>): Effect.Effect<never, never, A> => self.take().traced(trace)
)

/** @internal */
export const takeAll = Debug.methodWithTrace((trace) =>
  <A>(self: Queue.Dequeue<A>): Effect.Effect<never, never, Chunk.Chunk<A>> => self.takeAll().traced(trace)
)

/** @internal */
export const takeUpTo = Debug.dualWithTrace<
  (max: number) => <A>(self: Queue.Dequeue<A>) => Effect.Effect<never, never, Chunk.Chunk<A>>,
  <A>(self: Queue.Dequeue<A>, max: number) => Effect.Effect<never, never, Chunk.Chunk<A>>
>(2, (trace) => (self, max) => self.takeUpTo(max).traced(trace))

/** @internal */
export const takeBetween = Debug.dualWithTrace<
  (min: number, max: number) => <A>(self: Queue.Dequeue<A>) => Effect.Effect<never, never, Chunk.Chunk<A>>,
  <A>(self: Queue.Dequeue<A>, min: number, max: number) => Effect.Effect<never, never, Chunk.Chunk<A>>
>(3, (trace) => (self, min, max) => self.takeBetween(min, max).traced(trace))

/** @internal */
export const takeN = Debug.dualWithTrace<
  (n: number) => <A>(self: Queue.Dequeue<A>) => Effect.Effect<never, never, Chunk.Chunk<A>>,
  <A>(self: Queue.Dequeue<A>, n: number) => Effect.Effect<never, never, Chunk.Chunk<A>>
>(2, (trace) => (self, n) => self.takeBetween(n, n).traced(trace))

// -----------------------------------------------------------------------------
// Strategy
// -----------------------------------------------------------------------------

/** @internal */
export const backPressureStrategy = <A>(): Queue.Strategy<A> => {
  return new BackPressureStrategy()
}

/** @internal */
export const droppingStrategy = <A>(): Queue.Strategy<A> => {
  return new DroppingStrategy()
}

/** @internal */
export const slidingStrategy = <A>(): Queue.Strategy<A> => {
  return new SlidingStrategy()
}

/** @internal */
class BackPressureStrategy<A> implements Queue.Strategy<A> {
  readonly [QueueStrategyTypeId] = queueStrategyVariance

  readonly putters = MutableQueue.unbounded<readonly [A, Deferred.Deferred<never, boolean>, boolean]>()

  surplusSize(): number {
    return MutableQueue.length(this.putters)
  }

  shutdown(): Effect.Effect<never, never, void> {
    return pipe(
      core.fiberId(),
      core.flatMap((fiberId) =>
        pipe(
          core.sync(() => unsafePollAll(this.putters)),
          core.flatMap(fiberRuntime.forEachParDiscard(([_, deferred, isLastItem]) =>
            isLastItem ? pipe(core.deferredInterruptWith(deferred, fiberId), core.asUnit) : core.unit()
          ))
        )
      )
    )
  }

  handleSurplus(
    iterable: Iterable<A>,
    queue: MutableQueue.MutableQueue<A>,
    takers: MutableQueue.MutableQueue<Deferred.Deferred<never, A>>,
    isShutdown: MutableRef.MutableRef<boolean>
  ): Effect.Effect<never, never, boolean> {
    return core.withFiberRuntime<never, never, boolean>((state) => {
      const deferred = core.deferredUnsafeMake<never, boolean>(state.id())
      return pipe(
        core.suspendSucceed(() => {
          this.unsafeOffer(iterable, deferred)
          this.unsafeOnQueueEmptySpace(queue, takers)
          unsafeCompleteTakers(this, queue, takers)
          return MutableRef.get(isShutdown) ? core.interrupt() : core.deferredAwait(deferred)
        }),
        core.onInterrupt(() => core.sync(() => this.unsafeRemove(deferred)))
      )
    })
  }

  unsafeOnQueueEmptySpace(
    queue: MutableQueue.MutableQueue<A>,
    takers: MutableQueue.MutableQueue<Deferred.Deferred<never, A>>
  ): void {
    let keepPolling = true
    while (keepPolling && !MutableQueue.isFull(queue)) {
      const putter = pipe(this.putters, MutableQueue.poll(MutableQueue.EmptyMutableQueue))
      if (putter === MutableQueue.EmptyMutableQueue) {
        keepPolling = false
      } else {
        const offered = pipe(queue, MutableQueue.offer(putter[0]))
        if (offered && putter[2]) {
          unsafeCompleteDeferred(putter[1], true)
        } else if (!offered) {
          unsafeOfferAll(this.putters, pipe(unsafePollAll(this.putters), Chunk.prepend(putter)))
        }
        unsafeCompleteTakers(this, queue, takers)
      }
    }
  }

  unsafeOffer(iterable: Iterable<A>, deferred: Deferred.Deferred<never, boolean>): void {
    const iterator = iterable[Symbol.iterator]()
    let next: IteratorResult<A> = iterator.next()
    if (!next.done) {
      // eslint-disable-next-line no-constant-condition
      while (1) {
        const value = next.value
        next = iterator.next()
        if (next.done) {
          pipe(this.putters, MutableQueue.offer([value, deferred, true as boolean] as const))
          break
        }
        pipe(this.putters, MutableQueue.offer([value, deferred, false as boolean] as const))
      }
    }
  }

  unsafeRemove(deferred: Deferred.Deferred<never, boolean>): void {
    unsafeOfferAll(
      this.putters,
      pipe(unsafePollAll(this.putters), Chunk.filter(([, _]) => _ !== deferred))
    )
  }
}

/** @internal */
class DroppingStrategy<A> implements Queue.Strategy<A> {
  readonly [QueueStrategyTypeId] = queueStrategyVariance

  surplusSize(): number {
    return 0
  }

  shutdown(): Effect.Effect<never, never, void> {
    return core.unit()
  }

  handleSurplus(
    _iterable: Iterable<A>,
    _queue: MutableQueue.MutableQueue<A>,
    _takers: MutableQueue.MutableQueue<Deferred.Deferred<never, A>>,
    _isShutdown: MutableRef.MutableRef<boolean>
  ): Effect.Effect<never, never, boolean> {
    return core.succeed(false)
  }

  unsafeOnQueueEmptySpace(
    _queue: MutableQueue.MutableQueue<A>,
    _takers: MutableQueue.MutableQueue<Deferred.Deferred<never, A>>
  ): void {
    //
  }
}

/** @internal */
class SlidingStrategy<A> implements Queue.Strategy<A> {
  readonly [QueueStrategyTypeId] = queueStrategyVariance

  surplusSize(): number {
    return 0
  }

  shutdown(): Effect.Effect<never, never, void> {
    return core.unit()
  }

  handleSurplus(
    iterable: Iterable<A>,
    queue: MutableQueue.MutableQueue<A>,
    takers: MutableQueue.MutableQueue<Deferred.Deferred<never, A>>,
    _isShutdown: MutableRef.MutableRef<boolean>
  ): Effect.Effect<never, never, boolean> {
    return core.sync(() => {
      this.unsafeOffer(queue, iterable)
      unsafeCompleteTakers(this, queue, takers)
      return true
    })
  }

  unsafeOnQueueEmptySpace(
    _queue: MutableQueue.MutableQueue<A>,
    _takers: MutableQueue.MutableQueue<Deferred.Deferred<never, A>>
  ): void {
    //
  }

  unsafeOffer(queue: MutableQueue.MutableQueue<A>, iterable: Iterable<A>): void {
    const iterator = iterable[Symbol.iterator]()
    let next: IteratorResult<A>
    let offering = true
    while (!(next = iterator.next()).done && offering) {
      if (MutableQueue.capacity(queue) === 0) {
        return
      }
      // Poll 1 and retry
      pipe(queue, MutableQueue.poll(MutableQueue.EmptyMutableQueue))
      offering = pipe(queue, MutableQueue.offer(next.value))
    }
  }
}

/** @internal */
const unsafeCompleteDeferred = <A>(deferred: Deferred.Deferred<never, A>, a: A): void => {
  return core.deferredUnsafeDone(deferred, core.succeed(a))
}

/** @internal */
const unsafeOfferAll = <A>(queue: MutableQueue.MutableQueue<A>, as: Iterable<A>): Chunk.Chunk<A> => {
  return pipe(queue, MutableQueue.offerAll(as))
}

/** @internal */
const unsafePollAll = <A>(queue: MutableQueue.MutableQueue<A>): Chunk.Chunk<A> => {
  return pipe(queue, MutableQueue.pollUpTo(Number.POSITIVE_INFINITY))
}

/** @internal */
const unsafePollN = <A>(queue: MutableQueue.MutableQueue<A>, max: number): Chunk.Chunk<A> => {
  return pipe(queue, MutableQueue.pollUpTo(max))
}

/** @internal */
export const unsafeRemove = <A>(queue: MutableQueue.MutableQueue<A>, a: A): void => {
  unsafeOfferAll(
    queue,
    pipe(unsafePollAll(queue), Chunk.filter((b) => a !== b))
  )
}

/** @internal */
export const unsafeCompleteTakers = <A>(
  strategy: Queue.Strategy<A>,
  queue: MutableQueue.MutableQueue<A>,
  takers: MutableQueue.MutableQueue<Deferred.Deferred<never, A>>
): void => {
  // Check both a taker and an item are in the queue, starting with the taker
  let keepPolling = true
  while (keepPolling && !MutableQueue.isEmpty(queue)) {
    const taker = pipe(takers, MutableQueue.poll(MutableQueue.EmptyMutableQueue))
    if (taker !== MutableQueue.EmptyMutableQueue) {
      const element = pipe(queue, MutableQueue.poll(MutableQueue.EmptyMutableQueue))
      if (element !== MutableQueue.EmptyMutableQueue) {
        unsafeCompleteDeferred(taker, element)
        strategy.unsafeOnQueueEmptySpace(queue, takers)
      } else {
        unsafeOfferAll(takers, pipe(unsafePollAll(takers), Chunk.prepend(taker)))
      }
      keepPolling = true
    } else {
      keepPolling = false
    }
  }
}
