import * as Chunk from "@effect/data/Chunk"
import * as Either from "@effect/data/Either"
import { dual, pipe } from "@effect/data/Function"
import * as HashSet from "@effect/data/HashSet"
import * as number from "@effect/data/Number"
import * as Option from "@effect/data/Option"
import * as order from "@effect/data/typeclass/Order"
import type * as Cause from "@effect/io/Cause"
import * as Clock from "@effect/io/Clock"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import type * as Fiber from "@effect/io/Fiber"
import * as FiberId from "@effect/io/Fiber/Id"
import * as FiberStatus from "@effect/io/Fiber/Status"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as fiberScope from "@effect/io/internal_effect_untraced/fiberScope"
import * as runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags"

/** @internal */
const FiberSymbolKey = "@effect/io/Fiber"

/** @internal */
export const FiberTypeId: Fiber.FiberTypeId = Symbol.for(
  FiberSymbolKey
) as Fiber.FiberTypeId

/** @internal */
export const fiberVariance = {
  _E: (_: never) => _,
  _A: (_: never) => _
}

/** @internal */
const RuntimeFiberSymbolKey = "@effect/io/Fiber"

/** @internal */
export const RuntimeFiberTypeId: Fiber.RuntimeFiberTypeId = Symbol.for(
  RuntimeFiberSymbolKey
) as Fiber.RuntimeFiberTypeId

/** @internal */
export const Order: order.Order<Fiber.RuntimeFiber<unknown, unknown>> = pipe(
  order.tuple<readonly [order.Order<number>, order.Order<number>]>(number.Order, number.Order),
  order.contramap((fiber: Fiber.RuntimeFiber<unknown, unknown>) =>
    [
      (fiber.id() as FiberId.Runtime).startTimeMillis,
      (fiber.id() as FiberId.Runtime).id
    ] as const
  )
)

/** @internal */
export const isFiber = (u: unknown): u is Fiber.Fiber<unknown, unknown> =>
  typeof u === "object" && u != null && FiberTypeId in u

/** @internal */
export const isRuntimeFiber = <E, A>(self: Fiber.Fiber<E, A>): self is Fiber.RuntimeFiber<E, A> =>
  RuntimeFiberTypeId in self

/** @internal */
export const _await = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.Fiber<E, A>): Effect.Effect<never, never, Exit.Exit<E, A>> => self.await().traced(trace)
)

/** @internal */
export const children = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.Fiber<E, A>): Effect.Effect<never, never, Chunk.Chunk<Fiber.RuntimeFiber<any, any>>> =>
    self.children().traced(trace)
)

/** @internal */
export const done = <E, A>(exit: Exit.Exit<E, A>): Fiber.Fiber<E, A> => ({
  [FiberTypeId]: fiberVariance,
  id: () => FiberId.none,
  await: Debug.methodWithTrace((trace) => () => core.succeed(exit).traced(trace)),
  children: Debug.methodWithTrace((trace) => () => core.succeed(Chunk.empty()).traced(trace)),
  inheritAll: Debug.methodWithTrace((trace) => () => core.unit().traced(trace)),
  poll: Debug.methodWithTrace((trace) => () => core.succeed(Option.some(exit)).traced(trace)),
  interruptAsFork: Debug.methodWithTrace((trace) => () => core.unit().traced(trace))
})

/** @internal */
export const dump = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.RuntimeFiber<E, A>): Effect.Effect<never, never, Fiber.Fiber.Dump> =>
    core.map(self.status(), (status) => ({ id: self.id(), status })).traced(trace)
)

/** @internal */
export const dumpAll = Debug.methodWithTrace((trace) =>
  (
    fibers: Iterable<Fiber.RuntimeFiber<unknown, unknown>>
  ): Effect.Effect<never, never, Chunk.Chunk<Fiber.Fiber.Dump>> => core.forEach(fibers, dump).traced(trace)
)

/** @internal */
export const fail = <E>(error: E): Fiber.Fiber<E, never> => {
  return done(Exit.fail(error))
}

/** @internal */
export const failCause = <E>(cause: Cause.Cause<E>): Fiber.Fiber<E, never> => {
  return done(Exit.failCause(cause))
}

/** @internal */
export const fromEffect = Debug.methodWithTrace((trace) =>
  <E, A>(effect: Effect.Effect<never, E, A>): Effect.Effect<never, never, Fiber.Fiber<E, A>> =>
    core.map(core.exit(effect), done).traced(trace)
)

/** @internal */
export const id = <E, A>(self: Fiber.Fiber<E, A>): FiberId.FiberId => {
  return self.id()
}

/** @internal */
export const inheritAll = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.Fiber<E, A>): Effect.Effect<never, never, void> => self.inheritAll().traced(trace)
)

/** @internal */
export const interrupted = (fiberId: FiberId.FiberId): Fiber.Fiber<never, never> => {
  return done(Exit.interrupt(fiberId))
}

/** @internal */
export const interruptAll = Debug.methodWithTrace((trace) =>
  (fibers: Iterable<Fiber.Fiber<any, any>>): Effect.Effect<never, never, void> =>
    core.flatMap(core.fiberId(), (fiberId) => pipe(fibers, interruptAllAs(fiberId))).traced(trace)
)

/** @internal */
export const interruptAllAs = Debug.dualWithTrace<
  (fiberId: FiberId.FiberId) => (fibers: Iterable<Fiber.Fiber<any, any>>) => Effect.Effect<never, never, void>,
  (fibers: Iterable<Fiber.Fiber<any, any>>, fiberId: FiberId.FiberId) => Effect.Effect<never, never, void>
>(2, (trace) =>
  (fibers, fiberId) =>
    pipe(
      core.forEachDiscard(fibers, interruptAsFork(fiberId)),
      core.zipRight(pipe(fibers, core.forEachDiscard(_await)))
    ).traced(trace))

/** @internal */
export const interruptAsFork = Debug.dualWithTrace<
  (fiberId: FiberId.FiberId) => <E, A>(self: Fiber.Fiber<E, A>) => Effect.Effect<never, never, void>,
  <E, A>(self: Fiber.Fiber<E, A>, fiberId: FiberId.FiberId) => Effect.Effect<never, never, void>
>(2, (trace) => (self, fiberId) => self.interruptAsFork(fiberId).traced(trace))

/** @internal */
export const join = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.Fiber<E, A>): Effect.Effect<never, E, A> =>
    core.zipLeft(core.flatten(self.await()), self.inheritAll()).traced(trace)
)

/** @internal */
export const map = Debug.untracedDual<
  <A, B>(f: (a: A) => B) => <E>(self: Fiber.Fiber<E, A>) => Fiber.Fiber<E, B>,
  <E, A, B>(self: Fiber.Fiber<E, A>, f: (a: A) => B) => Fiber.Fiber<E, B>
>(2, (restore) => (self, f) => mapEffect(self, (a) => core.sync(() => restore(f)(a))))

/** @internal */
export const mapEffect = Debug.untracedDual<
  <A, E2, A2>(f: (a: A) => Effect.Effect<never, E2, A2>) => <E>(self: Fiber.Fiber<E, A>) => Fiber.Fiber<E | E2, A2>,
  <E, A, E2, A2>(self: Fiber.Fiber<E, A>, f: (a: A) => Effect.Effect<never, E2, A2>) => Fiber.Fiber<E | E2, A2>
>(2, (restore) =>
  (self, f) => ({
    [FiberTypeId]: fiberVariance,
    id: () => self.id(),
    await: Debug.methodWithTrace((trace) => () => core.flatMap(self.await(), Exit.forEachEffect(f)).traced(trace)),
    children: Debug.methodWithTrace((trace) => () => self.children().traced(trace)),
    inheritAll: Debug.methodWithTrace((trace) => () => self.inheritAll().traced(trace)),
    poll: Debug.methodWithTrace((trace) =>
      () =>
        core.flatMap(self.poll(), (result) => {
          switch (result._tag) {
            case "None": {
              return core.succeed(Option.none())
            }
            case "Some": {
              return pipe(
                Exit.forEachEffect(result.value, restore(f)),
                core.map(Option.some)
              )
            }
          }
        }).traced(trace)
    ),
    interruptAsFork: Debug.methodWithTrace((trace) => (id) => self.interruptAsFork(id).traced(trace))
  }))

/** @internal */
export const mapFiber = Debug.dualWithTrace<
  <E, E2, A, B>(
    f: (a: A) => Fiber.Fiber<E2, B>
  ) => (self: Fiber.Fiber<E, A>) => Effect.Effect<never, never, Fiber.Fiber<E | E2, B>>,
  <E, A, E2, B>(
    self: Fiber.Fiber<E, A>,
    f: (a: A) => Fiber.Fiber<E2, B>
  ) => Effect.Effect<never, never, Fiber.Fiber<E | E2, B>>
>(2, (trace, restore) =>
  <E, A, E2, B>(
    self: Fiber.Fiber<E, A>,
    f: (a: A) => Fiber.Fiber<E2, B>
  ) =>
    core.map(
      self.await(),
      Exit.match(
        (cause): Fiber.Fiber<E | E2, B> => failCause(cause),
        (a) => restore(f)(a)
      )
    ).traced(trace))

/** @internal */
export const match = Debug.untracedDual<
  <E, A, Z>(
    onFiber: (fiber: Fiber.Fiber<E, A>) => Z,
    onRuntimeFiber: (fiber: Fiber.RuntimeFiber<E, A>) => Z
  ) => (self: Fiber.Fiber<E, A>) => Z,
  <E, A, Z>(
    self: Fiber.Fiber<E, A>,
    onFiber: (fiber: Fiber.Fiber<E, A>) => Z,
    onRuntimeFiber: (fiber: Fiber.RuntimeFiber<E, A>) => Z
  ) => Z
>(3, (restore) =>
  (self, onFiber, onRuntimeFiber) => {
    if (isRuntimeFiber(self)) {
      return restore(onRuntimeFiber)(self)
    }
    return restore(onFiber)(self)
  })

/** @internal */
export const never = (): Fiber.Fiber<never, never> => ({
  [FiberTypeId]: fiberVariance,
  id: () => FiberId.none,
  await: Debug.methodWithTrace((trace) => () => core.never().traced(trace)),
  children: Debug.methodWithTrace((trace) => () => core.succeed(Chunk.empty()).traced(trace)),
  inheritAll: Debug.methodWithTrace((trace) => () => core.never().traced(trace)),
  poll: Debug.methodWithTrace((trace) => () => core.succeed(Option.none()).traced(trace)),
  interruptAsFork: Debug.methodWithTrace((trace) => () => core.never().traced(trace))
})

/** @internal */
export const orElse = dual<
  <E2, A2>(that: Fiber.Fiber<E2, A2>) => <E, A>(self: Fiber.Fiber<E, A>) => Fiber.Fiber<E | E2, A | A2>,
  <E, A, E2, A2>(self: Fiber.Fiber<E, A>, that: Fiber.Fiber<E2, A2>) => Fiber.Fiber<E | E2, A | A2>
>(2, (self, that) => ({
  [FiberTypeId]: fiberVariance,
  id: () => FiberId.getOrElse(self.id(), that.id()),
  await: Debug.methodWithTrace((trace) =>
    () =>
      core.zipWith(
        self.await(),
        that.await(),
        (exit1, exit2) => (Exit.isSuccess(exit1) ? exit1 : exit2)
      ).traced(trace)
  ),
  children: Debug.methodWithTrace((trace) => () => self.children().traced(trace)),
  inheritAll: Debug.methodWithTrace((trace) => () => core.zipRight(that.inheritAll(), self.inheritAll()).traced(trace)),
  poll: Debug.methodWithTrace((trace) =>
    () =>
      core.zipWith(
        self.poll(),
        that.poll(),
        (option1, option2) => {
          switch (option1._tag) {
            case "None": {
              return Option.none()
            }
            case "Some": {
              return Exit.isSuccess(option1.value) ? option1 : option2
            }
          }
        }
      ).traced(trace)
  ),
  interruptAsFork: Debug.methodWithTrace((trace) =>
    (id) =>
      pipe(
        core.interruptAsFiber(self, id),
        core.zipRight(pipe(that, core.interruptAsFiber(id))),
        core.asUnit
      ).traced(trace)
  )
}))

/** @internal */
export const orElseEither = dual<
  <E2, A2>(that: Fiber.Fiber<E2, A2>) => <E, A>(self: Fiber.Fiber<E, A>) => Fiber.Fiber<E | E2, Either.Either<A, A2>>,
  <E, A, E2, A2>(self: Fiber.Fiber<E, A>, that: Fiber.Fiber<E2, A2>) => Fiber.Fiber<E | E2, Either.Either<A, A2>>
>(2, (self, that) => orElse(map(self, Either.left), map(that, Either.right)))

/** @internal */
export const poll = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.Fiber<E, A>): Effect.Effect<never, never, Option.Option<Exit.Exit<E, A>>> =>
    self.poll().traced(trace)
)

// forked from https://github.com/sindresorhus/parse-ms/blob/4da2ffbdba02c6e288c08236695bdece0adca173/index.js
// MIT License
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
/** @internal */
const parseMs = (milliseconds: number) => {
  const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil
  return {
    days: roundTowardsZero(milliseconds / 86400000),
    hours: roundTowardsZero(milliseconds / 3600000) % 24,
    minutes: roundTowardsZero(milliseconds / 60000) % 60,
    seconds: roundTowardsZero(milliseconds / 1000) % 60,
    milliseconds: roundTowardsZero(milliseconds) % 1000,
    microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
    nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000
  }
}

/** @internal */
const renderStatus = (status: FiberStatus.FiberStatus): string => {
  if (FiberStatus.isDone(status)) {
    return "Done"
  }
  if (FiberStatus.isRunning(status)) {
    return "Running"
  }

  const isInterruptible = runtimeFlags.interruptible(status.runtimeFlags) ?
    "interruptible" :
    "uninterruptible"
  return `Suspended(${isInterruptible})`
}

/** @internal */
export const pretty = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.RuntimeFiber<E, A>): Effect.Effect<never, never, string> =>
    core.flatMap(Clock.currentTimeMillis(), (now) =>
      core.map(dump(self), (dump) => {
        const time = now - dump.id.startTimeMillis
        const { days, hours, milliseconds, minutes, seconds } = parseMs(time)
        const lifeMsg = (days === 0 ? "" : `${days}d`) +
          (days === 0 && hours === 0 ? "" : `${hours}h`) +
          (days === 0 && hours === 0 && minutes === 0 ? "" : `${minutes}m`) +
          (days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? "" : `${seconds}s`) +
          `${milliseconds}ms`
        const waitMsg = FiberStatus.isSuspended(dump.status) ?
          (() => {
            const ids = FiberId.ids(dump.status.blockingOn)
            return HashSet.size(ids) > 0
              ? `waiting on ` + Array.from(ids).map((id) => `${id}`).join(", ")
              : ""
          })() :
          ""
        const statusMsg = renderStatus(dump.status)
        return `[Fiber](#${dump.id.id}) (${lifeMsg}) ${waitMsg}\n   Status: ${statusMsg}`
      })).traced(trace)
)

/** @internal */
export const roots = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, Chunk.Chunk<Fiber.RuntimeFiber<any, any>>> => core.sync(unsafeRoots).traced(trace)
)

/** @internal */
export const unsafeRoots = (): Chunk.Chunk<Fiber.RuntimeFiber<any, any>> => {
  return Chunk.fromIterable(fiberScope.globalScope.roots)
}

/** @internal */
export const status = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.RuntimeFiber<E, A>): Effect.Effect<never, never, FiberStatus.FiberStatus> =>
    self.status().traced(trace)
)

/** @internal */
export const succeed = <A>(value: A): Fiber.Fiber<never, A> => {
  return done(Exit.succeed(value))
}

/** @internal */
export const unit = (): Fiber.Fiber<never, void> => succeed(void 0)

/** @internal */
export const currentFiberURI = "@effect/io/Fiber/Current"

/** @internal */
export const getCurrentFiber = (): Option.Option<Fiber.RuntimeFiber<any, any>> =>
  Option.fromNullable(global[currentFiberURI])
