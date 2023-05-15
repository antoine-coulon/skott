import * as Context from "@effect/data/Context"
import type * as Duration from "@effect/data/Duration"
import * as Equal from "@effect/data/Equal"
import { pipe } from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"
import * as HashSet from "@effect/data/HashSet"
import type * as Clock from "@effect/io/Clock"
import * as Debug from "@effect/io/Debug"
import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Fiber from "@effect/io/Fiber"
import type * as Pool from "@effect/io/Pool"
import * as Queue from "@effect/io/Queue"
import * as Ref from "@effect/io/Ref"
import * as Scope from "@effect/io/Scope"

/** @internal */
const PoolSymbolKey = "@effect/io/Pool"

/** @internal */
export const PoolTypeId: Pool.PoolTypeId = Symbol.for(
  PoolSymbolKey
) as Pool.PoolTypeId

const poolVariance = {
  _E: (_: never) => _,
  _A: (_: never) => _
}

interface PoolState {
  readonly size: number
  readonly free: number
}

interface Attempted<E, A> {
  readonly result: Exit.Exit<E, A>
  readonly finalizer: Effect.Effect<never, never, unknown>
}

/**
 * A `Strategy` describes the protocol for how a pool whose excess items are
 * not being used should shrink down to the minimum pool size.
 */
interface Strategy<S, R, E, A> {
  /**
   * Describes how the initial state of the strategy should be allocated.
   */
  initial(): Effect.Effect<R, never, S>
  /**
   * Describes how the state of the strategy should be updated when an item is
   * added to the pool or returned to the pool.
   */
  track(state: S, attempted: Exit.Exit<E, A>): Effect.Effect<never, never, void>
  /**
   * Describes how excess items that are not being used should shrink down.
   */
  run(
    state: S,
    getExcess: Effect.Effect<never, never, number>,
    shrink: Effect.Effect<never, never, void>
  ): Effect.Effect<never, never, void>
}

/**
 * A strategy that does nothing to shrink excess items. This is useful when
 * the minimum size of the pool is equal to its maximum size and so there is
 * nothing to do.
 */
class NoneStrategy implements Strategy<unknown, never, never, never> {
  initial(): Effect.Effect<never, never, void> {
    return Debug.bodyWithTrace((trace) => Effect.unit().traced(trace))
  }
  track(): Effect.Effect<never, never, void> {
    return Debug.bodyWithTrace((trace) => Effect.unit().traced(trace))
  }
  run(): Effect.Effect<never, never, void> {
    return Debug.bodyWithTrace((trace) => Effect.unit().traced(trace))
  }
}

/**
 * A strategy that shrinks the pool down to its minimum size if items in the
 * pool have not been used for the specified duration.
 */
class TimeToLiveStrategy implements Strategy<readonly [Clock.Clock, Ref.Ref<number>], never, never, never> {
  constructor(readonly timeToLive: Duration.Duration) {}
  initial(): Effect.Effect<never, never, readonly [Clock.Clock, Ref.Ref<number>]> {
    return Debug.bodyWithTrace((trace) =>
      Effect.flatMap(Effect.clock(), (clock) =>
        Effect.flatMap(clock.currentTimeMillis(), (now) =>
          Effect.map(
            Ref.make(now),
            (ref) => [clock, ref] as const
          ))).traced(trace)
    )
  }
  track(state: readonly [Clock.Clock, Ref.Ref<number>]): Effect.Effect<never, never, void> {
    return Debug.bodyWithTrace((trace) =>
      Effect.asUnit(Effect.flatMap(
        state[0].currentTimeMillis(),
        (now) => Ref.set(state[1], now)
      )).traced(trace)
    )
  }
  run(
    state: readonly [Clock.Clock, Ref.Ref<number>],
    getExcess: Effect.Effect<never, never, number>,
    shrink: Effect.Effect<never, never, void>
  ): Effect.Effect<never, never, void> {
    return Debug.bodyWithTrace((trace) =>
      Effect.flatMap(getExcess, (excess) =>
        excess <= 0
          ? Effect.zipRight(
            state[0].sleep(this.timeToLive),
            this.run(state, getExcess, shrink)
          )
          : pipe(
            Effect.zipWith(
              Ref.get(state[1]),
              state[0].currentTimeMillis(),
              (start, end) => end - start
            ),
            Effect.flatMap((duration) => {
              if (duration >= this.timeToLive.millis) {
                return Effect.zipRight(shrink, this.run(state, getExcess, shrink))
              } else {
                return Effect.zipRight(state[0].sleep(this.timeToLive), this.run(state, getExcess, shrink))
              }
            })
          )).traced(trace)
    )
  }
}

class PoolImpl<E, A> implements Pool.Pool<E, A> {
  readonly [PoolTypeId] = poolVariance
  constructor(
    readonly creator: Effect.Effect<Scope.Scope, E, A>,
    readonly min: number,
    readonly max: number,
    readonly isShuttingDown: Ref.Ref<boolean>,
    readonly state: Ref.Ref<PoolState>,
    readonly items: Queue.Queue<Attempted<E, A>>,
    readonly invalidated: Ref.Ref<HashSet.HashSet<A>>,
    readonly track: (exit: Exit.Exit<E, A>) => Effect.Effect<never, never, unknown>
  ) {}

  [Hash.symbol](): number {
    return pipe(
      Hash.hash(this.creator),
      Hash.combine(Hash.number(this.min)),
      Hash.combine(Hash.number(this.max)),
      Hash.combine(Hash.hash(this.isShuttingDown)),
      Hash.combine(Hash.hash(this.state)),
      Hash.combine(Hash.hash(this.items)),
      Hash.combine(Hash.hash(this.invalidated)),
      Hash.combine(Hash.hash(this.track))
    )
  }

  [Equal.symbol](that: unknown): boolean {
    return isPool(that) &&
      Equal.equals(this.creator, (that as PoolImpl<E, A>).creator) &&
      this.min === (that as PoolImpl<E, A>).min &&
      this.max === (that as PoolImpl<E, A>).max &&
      Equal.equals(this.isShuttingDown, (that as PoolImpl<E, A>).isShuttingDown) &&
      Equal.equals(this.state, (that as PoolImpl<E, A>).state) &&
      Equal.equals(this.items, (that as PoolImpl<E, A>).items) &&
      Equal.equals(this.invalidated, (that as PoolImpl<E, A>).invalidated) &&
      Equal.equals(this.track, (that as PoolImpl<E, A>).track)
  }

  get(): Effect.Effect<Scope.Scope, E, A> {
    return Debug.bodyWithTrace((trace) => {
      const acquire = (): Effect.Effect<never, never, Attempted<E, A>> =>
        Effect.flatMap(Ref.get(this.isShuttingDown), (down) =>
          down
            ? Effect.interrupt()
            : Effect.flatten(Ref.modify(this.state, (state) => {
              if (state.free > 0 || state.size >= this.max) {
                return [
                  Effect.flatMap(
                    Queue.take(this.items),
                    (attempted) =>
                      Exit.match(
                        attempted.result,
                        () => Effect.succeed(attempted),
                        (item) =>
                          Effect.flatMap(
                            Ref.get(this.invalidated),
                            (set) => {
                              if (pipe(set, HashSet.has(item))) {
                                return Effect.flatMap(finalizeInvalid(this, attempted), acquire)
                              }
                              return Effect.succeed(attempted)
                            }
                          )
                      )
                  ),
                  { ...state, free: state.free - 1 }
                ] as const
              }
              if (state.size >= 0) {
                return [
                  Effect.flatMap(allocate(this), acquire),
                  { size: state.size + 1, free: state.free + 1 }
                ] as const
              }
              return [Effect.interrupt(), state] as const
            })))

      const release = (attempted: Attempted<E, A>): Effect.Effect<never, never, unknown> =>
        Exit.match(
          attempted.result,
          () =>
            Effect.flatten(Ref.modify(this.state, (state) => {
              if (state.size <= this.min) {
                return [allocate(this), { ...state, free: state.free + 1 }] as const
              }
              return [Effect.unit(), { ...state, size: state.size - 1 }] as const
            })),
          (item) =>
            Effect.flatMap(Ref.get(this.invalidated), (set) => {
              if (pipe(set, HashSet.has(item))) {
                return finalizeInvalid(this, attempted)
              }
              return pipe(
                Ref.update(this.state, (state) => ({ ...state, free: state.free + 1 })),
                Effect.zipRight(Queue.offer(this.items, attempted)),
                Effect.zipRight(this.track(attempted.result)),
                Effect.zipRight(Effect.whenEffect(getAndShutdown(this), Ref.get(this.isShuttingDown)))
              )
            })
        )

      return pipe(
        Effect.acquireRelease(acquire(), release),
        Effect.withEarlyRelease,
        Effect.disconnect,
        Effect.flatMap(([release, attempted]) =>
          pipe(
            Effect.when(release, () => isFailure(attempted)),
            Effect.zipRight(toEffect(attempted))
          )
        )
      ).traced(trace)
    })
  }

  invalidate(item: A): Effect.Effect<never, never, void> {
    return Debug.bodyWithTrace((trace) =>
      Ref.update(
        this.invalidated,
        HashSet.add(item)
      ).traced(trace)
    )
  }
}

const allocate = <E, A>(self: PoolImpl<E, A>): Effect.Effect<never, never, unknown> =>
  Effect.uninterruptibleMask((restore) =>
    Effect.flatMap(Scope.make(), (scope) =>
      Effect.flatMap(
        Effect.exit(restore(Scope.extend(self.creator, scope))),
        (exit) =>
          Effect.flatMap(
            Effect.succeed<Attempted<E, A>>({
              result: exit as Exit.Exit<E, A>,
              finalizer: Scope.close(scope, Exit.succeed(void 0))
            }),
            (attempted) =>
              pipe(
                Queue.offer(self.items, attempted),
                Effect.zipRight(self.track(attempted.result)),
                Effect.zipRight(Effect.whenEffect(getAndShutdown(self), Ref.get(self.isShuttingDown))),
                Effect.as(attempted)
              )
          )
      ))
  )

/**
 * Returns the number of items in the pool in excess of the minimum size.
 */
const excess = <E, A>(self: PoolImpl<E, A>): Effect.Effect<never, never, number> =>
  Effect.map(
    Ref.get(self.state),
    (state) => state.size - Math.min(self.min, state.free)
  )

const finalizeInvalid = <E, A>(
  self: PoolImpl<E, A>,
  attempted: Attempted<E, A>
): Effect.Effect<never, never, unknown> =>
  pipe(
    forEach(attempted, (a) => Ref.update(self.invalidated, HashSet.remove(a))),
    Effect.zipRight(attempted.finalizer),
    Effect.zipRight(
      Effect.flatten(Ref.modify(self.state, (state) => {
        if (state.size <= self.min) {
          return [allocate(self), { ...state, free: state.free + 1 }] as const
        }
        return [Effect.unit(), { ...state, size: state.size - 1 }] as const
      }))
    )
  )

/**
 * Gets items from the pool and shuts them down as long as there are items
 * free, signalling shutdown of the pool if the pool is empty.
 */
const getAndShutdown = <E, A>(self: PoolImpl<E, A>): Effect.Effect<never, never, void> =>
  Effect.flatten(Ref.modify(self.state, (state) => {
    if (state.free > 0) {
      return [
        Effect.matchCauseEffect(
          Queue.take(self.items),
          () => Effect.unit(),
          (attempted) =>
            pipe(
              forEach(attempted, (a) => Ref.update(self.invalidated, HashSet.remove(a))),
              Effect.zipRight(attempted.finalizer),
              Effect.zipRight(Ref.update(self.state, (state) => ({ ...state, size: state.size - 1 }))),
              Effect.flatMap(() => getAndShutdown(self))
            )
        ),
        { ...state, free: state.free - 1 }
      ] as const
    }
    if (state.size > 0) {
      return [Effect.unit(), state] as const
    }
    return [Queue.shutdown(self.items), { ...state, size: state.size - 1 }] as const
  }))

/**
 * Begins pre-allocating pool entries based on minimum pool size.
 */
const initialize = <E, A>(self: PoolImpl<E, A>): Effect.Effect<never, never, void> =>
  Effect.replicateEffectDiscard(
    Effect.uninterruptibleMask((restore) =>
      Effect.flatten(Ref.modify(self.state, (state) => {
        if (state.size < self.min && state.size >= 0) {
          return [
            Effect.flatMap(Scope.make(), (scope) =>
              Effect.flatMap(Effect.exit(restore(Scope.extend(self.creator, scope))), (exit) =>
                Effect.flatMap(
                  Effect.succeed<Attempted<E, A>>({
                    result: exit as Exit.Exit<E, A>,
                    finalizer: Scope.close(scope, Exit.succeed(void 0))
                  }),
                  (attempted) =>
                    pipe(
                      Queue.offer(self.items, attempted),
                      Effect.zipRight(self.track(attempted.result)),
                      Effect.zipRight(Effect.whenEffect(getAndShutdown(self), Ref.get(self.isShuttingDown))),
                      Effect.as(attempted)
                    )
                ))),
            { size: state.size + 1, free: state.free + 1 }
          ] as const
        }
        return [Effect.unit(), state] as const
      }))
    ),
    self.min
  )

/**
 * Shrinks the pool down, but never to less than the minimum size.
 */
const shrink = <E, A>(self: PoolImpl<E, A>): Effect.Effect<never, never, void> =>
  Effect.uninterruptible(
    Effect.flatten(Ref.modify(self.state, (state) => {
      if (state.size > self.min && state.free > 0) {
        return [
          pipe(
            Queue.take(self.items),
            Effect.flatMap((attempted) =>
              pipe(
                forEach(attempted, (a) => Ref.update(self.invalidated, HashSet.remove(a))),
                Effect.zipRight(attempted.finalizer),
                Effect.zipRight(Ref.update(self.state, (state) => ({ ...state, size: state.size - 1 })))
              )
            )
          ),
          { ...state, free: state.free - 1 }
        ] as const
      }
      return [Effect.unit(), state] as const
    }))
  )

const shutdown = <E, A>(self: PoolImpl<E, A>): Effect.Effect<never, never, void> =>
  Effect.flatten(Ref.modify(self.isShuttingDown, (down) =>
    down
      ? [Queue.awaitShutdown(self.items), true] as const
      : [Effect.zipRight(getAndShutdown(self), Queue.awaitShutdown(self.items)), true]))

const isFailure = <E, A>(self: Attempted<E, A>): boolean => Exit.isFailure(self.result)

const forEach = <E, A, R, E2>(
  self: Attempted<E, A>,
  f: (a: A) => Effect.Effect<R, E2, unknown>
): Effect.Effect<R, E2, unknown> => Exit.match(self.result, () => Effect.unit(), f)

const toEffect = <E, A>(self: Attempted<E, A>): Effect.Effect<never, E, A> => Effect.done(self.result)

/**
 * A more powerful variant of `make` that allows specifying a `Strategy` that
 * describes how a pool whose excess items are not being used will be shrunk
 * down to the minimum size.
 */
const makeWith = Debug.methodWithTrace((trace) =>
  <R, E, A, S, R2>(
    get: Effect.Effect<R, E, A>,
    min: number,
    max: number,
    strategy: Strategy<S, R2, E, A>
  ): Effect.Effect<R | R2 | Scope.Scope, never, Pool.Pool<E, A>> =>
    Effect.uninterruptibleMask((restore) =>
      pipe(
        Effect.all(
          Effect.context<R>(),
          Ref.make(false),
          Ref.make<PoolState>({ size: 0, free: 0 }),
          Queue.bounded<Attempted<E, A>>(max),
          Ref.make(HashSet.empty<A>()),
          strategy.initial()
        ),
        Effect.flatMap(([context, down, state, items, inv, initial]) => {
          const pool = new PoolImpl<E, A>(
            Effect.contramapContext(get, (old) => Context.merge(old)(context)),
            min,
            max,
            down,
            state,
            items,
            inv,
            (exit) => strategy.track(initial, exit)
          )
          return pipe(
            Effect.forkDaemon(restore(initialize(pool))),
            Effect.flatMap((fiber) =>
              Effect.flatMap(
                Effect.forkDaemon(restore(strategy.run(initial, excess(pool), shrink(pool)))),
                (shrink) =>
                  Effect.addFinalizer(() =>
                    pipe(
                      shutdown(pool),
                      Effect.zipRight(Fiber.interrupt(fiber)),
                      Effect.zipRight(Fiber.interrupt(shrink))
                    )
                  )
              )
            ),
            Effect.as<Pool.Pool<E, A>>(pool)
          )
        })
      )
    ).traced(trace)
)

/** @internal */
export const isPool = (u: unknown): u is Pool.Pool<unknown, unknown> =>
  typeof u === "object" && u != null && PoolTypeId in u

/** @internal */
export const make = Debug.methodWithTrace((trace) =>
  <R, E, A>(get: Effect.Effect<R, E, A>, size: number): Effect.Effect<R | Scope.Scope, never, Pool.Pool<E, A>> =>
    makeWith(get, size, size, new NoneStrategy()).traced(trace)
)

/** @internal */
export const makeWithTTL = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    get: Effect.Effect<R, E, A>,
    min: number,
    max: number,
    timeToLive: Duration.Duration
  ): Effect.Effect<R | Scope.Scope, never, Pool.Pool<E, A>> =>
    makeWith(get, min, max, new TimeToLiveStrategy(timeToLive)).traced(trace)
)

/** @internal */
export const get = Debug.methodWithTrace((trace) =>
  <E, A>(self: Pool.Pool<E, A>): Effect.Effect<Scope.Scope, E, A> => self.get().traced(trace)
)

/** @internal */
export const invalidate = Debug.dualWithTrace<
  <A>(value: A) => <E>(self: Pool.Pool<E, A>) => Effect.Effect<Scope.Scope, never, void>,
  <E, A>(self: Pool.Pool<E, A>, value: A) => Effect.Effect<Scope.Scope, never, void>
>(2, (trace) => (self, value) => self.invalidate(value).traced(trace))
