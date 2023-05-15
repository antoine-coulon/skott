import * as Chunk from "@effect/data/Chunk"
import * as Context from "@effect/data/Context"
import * as Duration from "@effect/data/Duration"
import * as Either from "@effect/data/Either"
import type { LazyArg } from "@effect/data/Function"
import { constFalse, constTrue, constVoid, identity, pipe } from "@effect/data/Function"
import * as HashMap from "@effect/data/HashMap"
import * as HashSet from "@effect/data/HashSet"
import * as Option from "@effect/data/Option"
import type { Predicate, Refinement } from "@effect/data/Predicate"
import type * as Cause from "@effect/io/Cause"
import * as Clock from "@effect/io/Clock"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import type * as Fiber from "@effect/io/Fiber"
import * as FiberId from "@effect/io/Fiber/Id"
import type * as FiberRef from "@effect/io/FiberRef"
import * as FiberRefs from "@effect/io/FiberRefs"
import type * as FiberRefsPatch from "@effect/io/FiberRefs/Patch"
import * as internalCause from "@effect/io/internal_effect_untraced/cause"
import { dieMessage, dieOnSync } from "@effect/io/internal_effect_untraced/clock"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as fiberRefsPatch from "@effect/io/internal_effect_untraced/fiberRefs/patch"
import * as metricLabel from "@effect/io/internal_effect_untraced/metric/label"
import * as SingleShotGen from "@effect/io/internal_effect_untraced/singleShotGen"
import * as LogLevel from "@effect/io/Logger/Level"
import * as LogSpan from "@effect/io/Logger/Span"
import type * as Metric from "@effect/io/Metric"
import type * as MetricLabel from "@effect/io/Metric/Label"
import * as Random from "@effect/io/Random"
import * as Ref from "@effect/io/Ref"

/* @internal */
export { dieMessage, dieOnSync } from "@effect/io/internal_effect_untraced/clock"

/* @internal */
export const absolve = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, Either.Either<E, A>>): Effect.Effect<R, E, A> =>
    absolveWith(self, identity).traced(trace)
)

/* @internal */
export const absolveWith = Debug.dualWithTrace<
  <A, E2, A2>(
    f: (a: A) => Either.Either<E2, A2>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E | E2, A2>,
  <R, E, E2, A, A2>(self: Effect.Effect<R, E, A>, f: (a: A) => Either.Either<E2, A2>) => Effect.Effect<R, E | E2, A2>
>(
  2,
  (trace, restore) =>
    (self, f) => pipe(self, core.flatMap((value) => pipe(value, restore(f), core.fromEither))).traced(trace)
)

/* @internal */
export const absorb = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, unknown, A> => absorbWith(self, identity).traced(trace)
)

/* @internal */
export const absorbWith = Debug.dualWithTrace<
  <E>(f: (error: E) => unknown) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, unknown, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, f: (error: E) => unknown) => Effect.Effect<R, unknown, A>
>(
  2,
  (trace, restore) =>
    (self, f) =>
      core.matchEffect(
        sandbox(self),
        (cause) => core.fail(pipe(cause, internalCause.squashWith(restore(f)))),
        core.succeed
      ).traced(trace)
)

/* @internal */
export const allowInterrupt = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, void> =>
    descriptorWith(
      (descriptor) =>
        HashSet.size(descriptor.interruptors) > 0 ?
          core.interrupt() :
          core.unit()
    ).traced(trace)
)

/* @internal */
export const asLeft = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, E, Either.Either<A, never>> =>
    pipe(self, core.map(Either.left)).traced(trace)
)

/* @internal */
export const asLeftError = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, Either.Either<E, never>, A> =>
    pipe(self, core.mapError(Either.left)).traced(trace)
)

/* @internal */
export const asRight = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, E, Either.Either<never, A>> =>
    pipe(self, core.map(Either.right)).traced(trace)
)

/* @internal */
export const asRightError = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, Either.Either<never, E>, A> =>
    pipe(self, core.mapError(Either.right)).traced(trace)
)

/* @internal */
export const asSome = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, E, Option.Option<A>> =>
    pipe(self, core.map(Option.some)).traced(trace)
)

/* @internal */
export const asSomeError = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, Option.Option<E>, A> =>
    pipe(self, core.mapError(Option.some)).traced(trace)
)

/* @internal */
export const asyncOption = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    register: (callback: (_: Effect.Effect<R, E, A>) => void) => Option.Option<Effect.Effect<R, E, A>>,
    blockingOn: FiberId.FiberId = FiberId.none
  ): Effect.Effect<R, E, A> =>
    core.asyncInterruptEither<R, E, A>(
      (cb) => {
        const option = restore(register)(cb)
        switch (option._tag) {
          case "None": {
            return Either.left(core.unit())
          }
          case "Some": {
            return Either.right(option.value)
          }
        }
      },
      blockingOn
    ).traced(trace)
)

/* @internal */
export const attempt = Debug.methodWithTrace((trace, restore) =>
  <A>(evaluate: LazyArg<A>): Effect.Effect<never, unknown, A> =>
    core.sync(() => {
      try {
        return restore(evaluate)()
      } catch (error) {
        throw core.makeEffectError(internalCause.fail(error))
      }
    }).traced(trace)
)

/* @internal */
export const _catch = Debug.dualWithTrace<
  <N extends keyof E, K extends E[N] & string, E, R1, E1, A1>(
    tag: N,
    k: K,
    f: (error: Extract<E, { [n in N]: K }>) => Effect.Effect<R1, E1, A1>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<
    R | R1,
    Exclude<E, { [n in N]: K }> | E1,
    A | A1
  >,
  <R, E, A, N extends keyof E, K extends E[N] & string, R1, E1, A1>(
    self: Effect.Effect<R, E, A>,
    tag: N,
    k: K,
    f: (error: Extract<E, { [n in N]: K }>) => Effect.Effect<R1, E1, A1>
  ) => Effect.Effect<R | R1, Exclude<E, { [n in N]: K }> | E1, A | A1>
>(
  // @ts-expect-error - probably a TS bug - infers to never because "DF does not extend (...args: any[]) => any)" but, of course, it does)
  4,
  (trace, restore) =>
    (self, tag, k, f) =>
      core.catchAll(self, (e) => {
        if (typeof e === "object" && e != null && tag in e && e[tag] === k) {
          return restore(f)(e as any)
        }
        return core.fail(e as any)
      }).traced(trace)
)

/* @internal */
export const catchAllDefect = Debug.dualWithTrace<
  <R2, E2, A2>(
    f: (defect: unknown) => Effect.Effect<R2, E2, A2>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A | A2>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    f: (defect: unknown) => Effect.Effect<R2, E2, A2>
  ) => Effect.Effect<R | R2, E | E2, A | A2>
>(2, (trace, restore) => (self, f) => catchSomeDefect(self, (defect) => Option.some(restore(f)(defect))).traced(trace))

/* @internal */
export const catchSomeCause = Debug.dualWithTrace<
  <E, R2, E2, A2>(
    f: (cause: Cause.Cause<E>) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A | A2>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    f: (cause: Cause.Cause<E>) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => Effect.Effect<R | R2, E | E2, A | A2>
>(
  2,
  (trace, restore) =>
    <R, E, A, R2, E2, A2>(
      self: Effect.Effect<R, E, A>,
      f: (cause: Cause.Cause<E>) => Option.Option<Effect.Effect<R2, E2, A2>>
    ) =>
      core.matchCauseEffect(
        self,
        (cause): Effect.Effect<R2, E | E2, A2> => {
          const option = restore(f)(cause)
          switch (option._tag) {
            case "None": {
              return core.failCause(cause)
            }
            case "Some": {
              return option.value
            }
          }
        },
        core.succeed
      ).traced(trace)
)

/* @internal */
export const catchSomeDefect = Debug.dualWithTrace<
  <R2, E2, A2>(
    pf: (defect: unknown) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A | A2>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    pf: (defect: unknown) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => Effect.Effect<R | R2, E | E2, A | A2>
>(
  2,
  (trace, restore) =>
    <R, E, A, R2, E2, A2>(self: Effect.Effect<R, E, A>, pf: (_: unknown) => Option.Option<Effect.Effect<R2, E2, A2>>) =>
      pipe(
        unrefineWith(self, restore(pf), core.fail),
        core.catchAll((s): Effect.Effect<R2, E | E2, A2> => s)
      ).traced(trace)
)

/* @internal */
export const catchTag = Debug.dualWithTrace<
  <K extends E["_tag"] & string, E extends { _tag: string }, R1, E1, A1>(
    k: K,
    f: (e: Extract<E, { _tag: K }>) => Effect.Effect<R1, E1, A1>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R1, Exclude<E, { _tag: K }> | E1, A | A1>,
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string, R1, E1, A1>(
    self: Effect.Effect<R, E, A>,
    k: K,
    f: (e: Extract<E, { _tag: K }>) => Effect.Effect<R1, E1, A1>
  ) => Effect.Effect<R | R1, Exclude<E, { _tag: K }> | E1, A | A1>
>(3, (trace, restore) =>
  (self, k, f) =>
    core.catchAll(self, (e) => {
      if ("_tag" in e && e["_tag"] === k) {
        return restore(f)(e as any)
      }
      return core.fail(e as any)
    }).traced(trace))

/** @internal */
export const catchTags: {
  <
    E extends { _tag: string },
    Cases extends {
      [K in E["_tag"]]+?: (error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>
    }
  >(
    cases: Cases
  ): <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<
    | R
    | {
      [K in keyof Cases]: Cases[K] extends ((...args: Array<any>) => Effect.Effect<infer R, any, any>) ? R : never
    }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
      [K in keyof Cases]: Cases[K] extends ((...args: Array<any>) => Effect.Effect<any, infer E, any>) ? E : never
    }[keyof Cases],
    | A
    | {
      [K in keyof Cases]: Cases[K] extends ((...args: Array<any>) => Effect.Effect<any, any, infer A>) ? A : never
    }[keyof Cases]
  >
  <
    R,
    E extends { _tag: string },
    A,
    Cases extends {
      [K in E["_tag"]]+?: (error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>
    }
  >(
    self: Effect.Effect<R, E, A>,
    cases: Cases
  ): Effect.Effect<
    | R
    | {
      [K in keyof Cases]: Cases[K] extends ((...args: Array<any>) => Effect.Effect<infer R, any, any>) ? R : never
    }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
      [K in keyof Cases]: Cases[K] extends ((...args: Array<any>) => Effect.Effect<any, infer E, any>) ? E : never
    }[keyof Cases],
    | A
    | {
      [K in keyof Cases]: Cases[K] extends ((...args: Array<any>) => Effect.Effect<any, any, infer A>) ? A : never
    }[keyof Cases]
  >
} = Debug.dualWithTrace(2, (trace, restore) =>
  (self, cases) =>
    core.catchAll(self, (e: any) => {
      const keys = Object.keys(cases)
      if ("_tag" in e && keys.includes(e["_tag"])) {
        return restore(cases[e["_tag"]])(e as any)
      }
      return core.fail(e as any)
    }).traced(trace))

/* @internal */
export const cause = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, Cause.Cause<E>> =>
    pipe(self, core.matchCause(identity, () => internalCause.empty)).traced(trace)
)

/* @internal */
export const clock = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, Clock.Clock> => clockWith(core.succeed).traced(trace)
)

/* @internal */
export const clockWith: <R, E, A>(f: (clock: Clock.Clock) => Effect.Effect<R, E, A>) => Effect.Effect<R, E, A> =
  Clock.clockWith

/* @internal */
export const collectAll = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    effects: Iterable<Effect.Effect<R, E, A>>
  ): Effect.Effect<R, E, Chunk.Chunk<A>> => core.forEach(effects, identity).traced(trace)
)

/* @internal */
export const collectAllDiscard = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    effects: Iterable<Effect.Effect<R, E, A>>
  ): Effect.Effect<R, E, void> => core.forEachDiscard(effects, identity).traced(trace)
)

/* @internal */
export const collectAllWith = Debug.dualWithTrace<
  <A, B>(
    pf: (a: A) => Option.Option<B>
  ) => <R, E>(elements: Iterable<Effect.Effect<R, E, A>>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <R, E, A, B>(
    elements: Iterable<Effect.Effect<R, E, A>>,
    pf: (a: A) => Option.Option<B>
  ) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(2, (trace, restore) => (elements, pf) => core.map(collectAll(elements), Chunk.filterMap(restore(pf))).traced(trace))

/* @internal */
export const collectAllWithEffect = Debug.dualWithTrace<
  <A, R, E, B>(
    f: (a: A) => Option.Option<Effect.Effect<R, E, B>>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <A, R, E, B>(
    elements: Iterable<A>,
    f: (a: A) => Option.Option<Effect.Effect<R, E, B>>
  ) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(2, (trace, restore) =>
  <A, R, E, B>(
    elements: Iterable<A>,
    f: (a: A) => Option.Option<Effect.Effect<R, E, B>>
  ) => {
    const array = Array.from(elements)
    // Break out early if there are no elements
    if (array.length === 0) {
      return core.succeed(Chunk.empty()).traced(trace)
    }
    // Break out early if there is only one element
    if (array.length === 1) {
      const option = restore(f)(array[0]!)
      switch (option._tag) {
        case "None": {
          return core.succeed(Chunk.empty()).traced(trace)
        }
        case "Some": {
          return core.map(option.value, Chunk.of).traced(trace)
        }
      }
    }
    // Otherwise create the intermediate result structure
    let result: Effect.Effect<R, E, Chunk.Chunk<B>> = core.succeed(Chunk.empty<B>())
    for (let i = array.length - 1; i >= 0; i--) {
      const option = restore(f)(array[i]!)
      if (option._tag === "Some") {
        result = core.zipWith(result, option.value, (list, b) => pipe(list, Chunk.prepend(b)))
      }
    }
    return core.map(result, Chunk.fromIterable).traced(trace)
  })

/* @internal */
export const collectAllSuccesses = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    as: Iterable<Effect.Effect<R, E, A>>
  ): Effect.Effect<R, never, Chunk.Chunk<A>> =>
    pipe(
      Array.from(as).map(core.exit),
      collectAllWith((exit) => (Exit.isSuccess(exit) ? Option.some(exit.i0) : Option.none()))
    ).traced(trace)
)

/* @internal */
export const collectFirst = Debug.dualWithTrace<
  <R, E, A, B>(
    f: (a: A) => Effect.Effect<R, E, Option.Option<B>>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Option.Option<B>>,
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect.Effect<R, E, Option.Option<B>>
  ) => Effect.Effect<R, E, Option.Option<B>>
>(
  2,
  (trace, restore) =>
    (elements, f) =>
      core.suspendSucceed(() =>
        collectFirstLoop(
          restore,
          elements[Symbol.iterator](),
          restore(f)
        )
      ).traced(trace)
)

const collectFirstLoop = <R, E, A, B>(
  restore: Debug.Restore,
  iterator: Iterator<A, any, undefined>,
  f: (a: A) => Effect.Effect<R, E, Option.Option<B>>
): Effect.Effect<R, E, Option.Option<B>> => {
  const next = restore(() => iterator.next())()
  return next.done
    ? core.succeed(Option.none())
    : pipe(
      f(next.value),
      core.flatMap((option) => {
        switch (option._tag) {
          case "None": {
            return collectFirstLoop(restore, iterator, f)
          }
          case "Some": {
            return core.succeed(option)
          }
        }
      })
    )
}

/* @internal */
export const collectWhile = Debug.dualWithTrace<
  <A, R, E, B>(
    f: (a: A) => Option.Option<Effect.Effect<R, E, B>>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <A, R, E, B>(
    elements: Iterable<A>,
    f: (a: A) => Option.Option<Effect.Effect<R, E, B>>
  ) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(2, (trace, restore) =>
  <A, R, E, B>(
    elements: Iterable<A>,
    f: (a: A) => Option.Option<Effect.Effect<R, E, B>>
  ) => {
    const array = Array.from(elements)
    // Break out early if the input is empty
    if (array.length === 0) {
      return core.succeed(Chunk.empty()).traced(trace)
    }
    // Break out early if there is only one element in the list
    if (array.length === 1) {
      const option = restore(f)(array[0]!)
      switch (option._tag) {
        case "None": {
          return core.succeed(Chunk.empty()).traced(trace)
        }
        case "Some": {
          return core.map(option.value, Chunk.of).traced(trace)
        }
      }
    }
    // Otherwise setup our intermediate result
    let result: Effect.Effect<R, E, Chunk.Chunk<B>> = core.succeed(Chunk.empty())
    for (let i = array.length - 1; i >= 0; i--) {
      const option = restore(f)(array[i]!)
      switch (option._tag) {
        case "None": {
          return core.map(result, Chunk.fromIterable).traced(trace)
        }
        case "Some": {
          result = core.zipWith(result, option.value, (bs, b) => pipe(bs, Chunk.prepend(b)))
        }
      }
    }
    return core.map(result, Chunk.fromIterable).traced(trace)
  })

/* @internal */
export const cond = Debug.methodWithTrace((trace, restore) =>
  <E, A>(
    predicate: LazyArg<boolean>,
    result: LazyArg<A>,
    error: LazyArg<E>
  ): Effect.Effect<never, E, A> =>
    core.suspendSucceed(() =>
      restore(predicate)() ?
        core.sync(restore(result)) :
        core.failSync(restore(error))
    ).traced(trace)
)

/* @internal */
export const continueOrFail = Debug.dualWithTrace<
  <E1, A, A2>(
    error: LazyArg<E1>,
    pf: (a: A) => Option.Option<A2>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E | E1, A2>,
  <R, E, A, E1, A2>(
    self: Effect.Effect<R, E, A>,
    error: LazyArg<E1>,
    pf: (a: A) => Option.Option<A2>
  ) => Effect.Effect<R, E | E1, A2>
>(
  3,
  (trace, restore) =>
    (self, error, pf) =>
      continueOrFailEffect(self, error, (a) => Option.map(restore(pf)(a), core.succeed)).traced(trace)
)

/* @internal */
export const continueOrFailEffect = Debug.dualWithTrace<
  <E1, A, R2, E2, A2>(
    error: LazyArg<E1>,
    pf: (a: A) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E1 | E2, A2>,
  <R, E, A, E1, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    error: LazyArg<E1>,
    pf: (a: A) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => Effect.Effect<R | R2, E | E1 | E2, A2>
>(3, (trace, restore) =>
  <R, E, A, E1, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    error: LazyArg<E1>,
    pf: (a: A) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) =>
    core.flatMap(self, (value): Effect.Effect<R2, E1 | E2, A2> =>
      Option.getOrElse(restore(pf)(value), () => core.failSync(error))).traced(trace))

/* @internal */
export const delay = Debug.dualWithTrace<
  (duration: Duration.Duration) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, duration: Duration.Duration) => Effect.Effect<R, E, A>
>(2, (trace) => (self, duration) => core.zipRight(Clock.sleep(duration), self).traced(trace))

/* @internal */
export const descriptor = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, Fiber.Fiber.Descriptor> => descriptorWith(core.succeed).traced(trace)
)

/* @internal */
export const descriptorWith = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    f: (descriptor: Fiber.Fiber.Descriptor) => Effect.Effect<R, E, A>
  ): Effect.Effect<R, E, A> =>
    core.withFiberRuntime((state, status) =>
      restore(f)({
        id: state.id(),
        status,
        interruptors: internalCause.interruptors(state.getFiberRef(core.interruptedCause))
      })
    ).traced(trace) as Effect.Effect<R, E, A>
)

/* @internal */
export const diffFiberRefs = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    self: Effect.Effect<R, E, A>
  ): Effect.Effect<R, E, readonly [FiberRefsPatch.FiberRefsPatch, A]> =>
    pipe(self, summarized(getFiberRefs(), fiberRefsPatch.diff)).traced(trace)
)

/* @internal */
export const Do = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, {}> => core.succeed({}).traced(trace)
)

/* @internal */
export const bind = Debug.dualWithTrace<
  <N extends string, K, R2, E2, A>(
    tag: Exclude<N, keyof K>,
    f: (_: K) => Effect.Effect<R2, E2, A>
  ) => <R, E>(self: Effect.Effect<R, E, K>) => Effect.Effect<
    R | R2,
    E | E2,
    Effect.MergeRecord<K, { [k in N]: A }>
  >,
  <R, E, N extends string, K, R2, E2, A>(
    self: Effect.Effect<R, E, K>,
    tag: Exclude<N, keyof K>,
    f: (_: K) => Effect.Effect<R2, E2, A>
  ) => Effect.Effect<
    R | R2,
    E | E2,
    Effect.MergeRecord<K, { [k in N]: A }>
  >
>(3, (trace, restore) =>
  <R, E, N extends string, K, R2, E2, A>(
    self: Effect.Effect<R, E, K>,
    tag: Exclude<N, keyof K>,
    f: (_: K) => Effect.Effect<R2, E2, A>
  ) =>
    core.flatMap(self, (k) =>
      core.map(
        restore(f)(k),
        (a): Effect.MergeRecord<K, { [k in N]: A }> => ({ ...k, [tag]: a } as any)
      )).traced(trace))

/* @internal */
export const bindValue = Debug.dualWithTrace<
  <N extends string, K, A>(
    tag: Exclude<N, keyof K>,
    f: (_: K) => A
  ) => <R, E>(self: Effect.Effect<R, E, K>) => Effect.Effect<
    R,
    E,
    Effect.MergeRecord<K, { [k in N]: A }>
  >,
  <R, E, K, N extends string, A>(
    self: Effect.Effect<R, E, K>,
    tag: Exclude<N, keyof K>,
    f: (_: K) => A
  ) => Effect.Effect<
    R,
    E,
    Effect.MergeRecord<K, { [k in N]: A }>
  >
>(
  3,
  (trace, restore) =>
    <R, E, K, N extends string, A>(self: Effect.Effect<R, E, K>, tag: Exclude<N, keyof K>, f: (_: K) => A) =>
      core.map(
        self,
        (k): Effect.MergeRecord<K, { [k in N]: A }> => ({ ...k, [tag]: restore(f)(k) } as any)
      ).traced(trace)
)

/* @internal */
export const dropUntil = Debug.dualWithTrace<
  <A, R, E>(
    predicate: (a: A) => Effect.Effect<R, E, boolean>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<A>>,
  <A, R, E>(
    elements: Iterable<A>,
    predicate: (a: A) => Effect.Effect<R, E, boolean>
  ) => Effect.Effect<R, E, Chunk.Chunk<A>>
>(2, (trace, restore) =>
  <A, R, E>(
    elements: Iterable<A>,
    predicate: (a: A) => Effect.Effect<R, E, boolean>
  ) =>
    core.suspendSucceed(() => {
      const iterator = elements[Symbol.iterator]()
      const builder: Array<A> = []
      let next: IteratorResult<A, any>
      let dropping: Effect.Effect<R, E, boolean> = core.succeed(false)
      while ((next = iterator.next()) && !next.done) {
        const a = next.value
        dropping = core.flatMap(dropping, (bool) => {
          if (bool) {
            builder.push(a)
            return core.succeed(true)
          }
          return restore(predicate)(a)
        })
      }
      return core.map(dropping, () => Chunk.unsafeFromArray(builder))
    }).traced(trace))

/* @internal */
export const dropWhile = Debug.dualWithTrace<
  <R, E, A>(
    f: (a: A) => Effect.Effect<R, E, boolean>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<A>>,
  <R, E, A>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) => Effect.Effect<R, E, Chunk.Chunk<A>>
>(
  2,
  (trace, restore) =>
    <R, E, A>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) =>
      core.suspendSucceed(() => {
        const iterator = elements[Symbol.iterator]()
        const builder: Array<A> = []
        let next
        let dropping: Effect.Effect<R, E, boolean> = core.succeed(true)
        while ((next = iterator.next()) && !next.done) {
          const a = next.value
          dropping = core.flatMap(dropping, (d) =>
            core.map(d ? restore(f)(a) : core.succeed(false), (b) => {
              if (!b) {
                builder.push(a)
              }
              return b
            }))
        }
        return core.map(dropping, () => Chunk.unsafeFromArray(builder))
      }).traced(trace)
)

/* @internal */
export const contextWith = Debug.methodWithTrace((trace) =>
  <R, A>(f: (context: Context.Context<R>) => A): Effect.Effect<R, never, A> =>
    core.map(core.context<R>(), f).traced(trace)
)

/* @internal */
export const exists = Debug.dualWithTrace<
  <R, E, A>(f: (a: A) => Effect.Effect<R, E, boolean>) => (elements: Iterable<A>) => Effect.Effect<R, E, boolean>,
  <R, E, A>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) => Effect.Effect<R, E, boolean>
>(
  2,
  (trace, restore) =>
    (elements, f) =>
      core.suspendSucceed(() =>
        existsLoop(
          restore,
          elements[Symbol.iterator](),
          restore(f)
        )
      ).traced(trace)
)

const existsLoop = <R, E, A>(
  restore: Debug.Restore,
  iterator: Iterator<A>,
  f: (a: A) => Effect.Effect<R, E, boolean>
): Effect.Effect<R, E, boolean> => {
  const next = restore(() => iterator.next())()
  if (next.done) {
    return core.succeed(false)
  }
  return pipe(f(next.value), core.flatMap((b) => b ? core.succeed(b) : existsLoop(restore, iterator, f)))
}

/* @internal */
export const eventually = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, A> =>
    core.orElse(self, () => pipe(core.yieldNow(), core.flatMap(() => eventually(self)))).traced(trace)
)

/* @internal */
export const filter = Debug.dualWithTrace<
  <A, R, E>(
    f: (a: A) => Effect.Effect<R, E, boolean>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<A>>,
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) => Effect.Effect<R, E, Chunk.Chunk<A>>
>(
  2,
  (trace, restore) =>
    <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) =>
      core.suspendSucceed(() =>
        Array.from(elements).reduceRight(
          (effect, a) =>
            core.zipWith(
              effect,
              core.suspendSucceed(() => restore(f)(a)),
              (list, b) => b ? pipe(list, Chunk.prepend(a)) : list
            ),
          core.sync(() => Chunk.empty<A>()) as Effect.Effect<R, E, Chunk.Chunk<A>>
        )
      ).traced(trace)
)

/* @internal */
export const filterNot = Debug.dualWithTrace<
  <A, R, E>(
    f: (a: A) => Effect.Effect<R, E, boolean>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<A>>,
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) => Effect.Effect<R, E, Chunk.Chunk<A>>
>(
  2,
  (trace, restore) => (elements, f) => filter(elements, (a) => core.map(restore(f)(a), (b) => !b)).traced(trace)
)

/* @internal */
export const filterOrDie = Debug.dualWithTrace<
  {
    <A, B extends A>(
      f: Refinement<A, B>,
      defect: LazyArg<unknown>
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, B>
    <A>(
      f: Predicate<A>,
      defect: LazyArg<unknown>
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
  },
  {
    <R, E, A, B extends A>(
      self: Effect.Effect<R, E, A>,
      f: Refinement<A, B>,
      defect: LazyArg<unknown>
    ): Effect.Effect<R, E, B>
    <R, E, A>(
      self: Effect.Effect<R, E, A>,
      f: Predicate<A>,
      defect: LazyArg<unknown>
    ): Effect.Effect<R, E, A>
  }
>(
  3,
  (trace, restore) =>
    <R, E, A>(
      self: Effect.Effect<R, E, A>,
      f: Predicate<A>,
      defect: LazyArg<unknown>
    ): Effect.Effect<R, E, A> => filterOrElse(self, restore(f), () => core.dieSync(restore(defect))).traced(trace)
)

/* @internal */
export const filterOrDieMessage = Debug.dualWithTrace<
  {
    <A, B extends A>(
      f: Refinement<A, B>,
      message: string
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, B>
    <A>(
      f: Predicate<A>,
      message: string
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
  },
  {
    <R, E, A, B extends A>(
      self: Effect.Effect<R, E, A>,
      f: Refinement<A, B>,
      message: string
    ): Effect.Effect<R, E, B>
    <R, E, A>(
      self: Effect.Effect<R, E, A>,
      f: Predicate<A>,
      message: string
    ): Effect.Effect<R, E, A>
  }
>(3, (trace, restore) =>
  <R, E, A>(
    self: Effect.Effect<R, E, A>,
    f: Predicate<A>,
    message: string
  ): Effect.Effect<R, E, A> => filterOrElse(self, restore(f), () => dieMessage(message)).traced(trace))

/* @internal */
export const filterOrElse = Debug.dualWithTrace<
  {
    <A, B extends A, R2, E2, C>(
      f: Refinement<A, B>,
      orElse: LazyArg<Effect.Effect<R2, E2, C>>
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, B | C>
    <A, R2, E2, B>(
      f: Predicate<A>,
      orElse: LazyArg<Effect.Effect<R2, E2, B>>
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A | B>
  },
  {
    <R, E, A, B extends A, R2, E2, C>(
      self: Effect.Effect<R, E, A>,
      f: Refinement<A, B>,
      orElse: LazyArg<Effect.Effect<R2, E2, C>>
    ): Effect.Effect<R | R2, E | E2, B | C>
    <R, E, A, R2, E2, B>(
      self: Effect.Effect<R, E, A>,
      f: Predicate<A>,
      orElse: LazyArg<Effect.Effect<R2, E2, B>>
    ): Effect.Effect<R | R2, E | E2, A | B>
  }
>(3, (trace, restore) =>
  <R, E, A, R2, E2, B>(
    self: Effect.Effect<R, E, A>,
    f: Predicate<A>,
    orElse: LazyArg<Effect.Effect<R2, E2, B>>
  ): Effect.Effect<R | R2, E | E2, A | B> => filterOrElseWith(self, restore(f), orElse).traced(trace))

/* @internal */
export const filterOrElseWith = Debug.dualWithTrace<
  {
    <A, B extends A, R2, E2, C>(
      f: Refinement<A, B>,
      orElse: (a: A) => Effect.Effect<R2, E2, C>
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, B | C>
    <A, R2, E2, B>(
      f: Predicate<A>,
      orElse: (a: A) => Effect.Effect<R2, E2, B>
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A | B>
  },
  {
    <R, E, A, B extends A, R2, E2, C>(
      self: Effect.Effect<R, E, A>,
      f: Refinement<A, B>,
      orElse: (a: A) => Effect.Effect<R2, E2, C>
    ): Effect.Effect<R | R2, E | E2, B | C>
    <R, E, A, R2, E2, B>(
      self: Effect.Effect<R, E, A>,
      f: Predicate<A>,
      orElse: (a: A) => Effect.Effect<R2, E2, B>
    ): Effect.Effect<R | R2, E | E2, A | B>
  }
>(3, (trace, restore) =>
  <R, E, A, R2, E2, B>(
    self: Effect.Effect<R, E, A>,
    f: Predicate<A>,
    orElse: (a: A) => Effect.Effect<R2, E2, B>
  ): Effect.Effect<R | R2, E | E2, A | B> =>
    core.flatMap(self, (a) => restore(f)(a) ? core.succeed<A | B>(a) : restore(orElse)(a)).traced(trace))

/* @internal */
export const filterOrFail = Debug.dualWithTrace<
  {
    <A, B extends A, E2>(
      f: Refinement<A, B>,
      error: LazyArg<E2>
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E | E2, B>
    <A, E2>(
      f: Predicate<A>,
      error: LazyArg<E2>
    ): <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E | E2, A>
  },
  {
    <R, E, A, B extends A, E2>(
      self: Effect.Effect<R, E, A>,
      f: Refinement<A, B>,
      error: LazyArg<E2>
    ): Effect.Effect<R, E | E2, B>
    <R, E, A, E2>(
      self: Effect.Effect<R, E, A>,
      f: Predicate<A>,
      error: LazyArg<E2>
    ): Effect.Effect<R, E | E2, A>
  }
>(3, (trace, restore) =>
  <R, E, A, E2>(
    self: Effect.Effect<R, E, A>,
    f: Predicate<A>,
    error: LazyArg<E2>
  ): Effect.Effect<R, E | E2, A> => filterOrElse(self, restore(f), () => core.failSync(restore(error))).traced(trace))

/* @internal */
export const find = Debug.dualWithTrace<
  <A, R, E>(
    f: (a: A) => Effect.Effect<R, E, boolean>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Option.Option<A>>,
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) => Effect.Effect<R, E, Option.Option<A>>
>(2, (trace, restore) =>
  (elements, f) =>
    core.suspendSucceed(() => {
      const array = Array.from(elements)
      const iterator = array[Symbol.iterator]()
      const next = restore(() => iterator.next())()
      if (!next.done) {
        return findLoop(restore, iterator, restore(f), next.value)
      }
      return core.succeed(Option.none())
    }).traced(trace))

const findLoop = <A, R, E>(
  restore: Debug.Restore,
  iterator: Iterator<A>,
  f: (a: A) => Effect.Effect<R, E, boolean>,
  value: A
): Effect.Effect<R, E, Option.Option<A>> =>
  core.flatMap(f(value), (result) => {
    if (result) {
      return core.succeed(Option.some(value))
    }
    const next = restore(() => iterator.next())()
    if (!next.done) {
      return findLoop(restore, iterator, f, next.value)
    }
    return core.succeed(Option.none())
  })

/* @internal */
export const firstSuccessOf = Debug.methodWithTrace((trace) =>
  <R, E, A>(effects: Iterable<Effect.Effect<R, E, A>>): Effect.Effect<R, E, A> =>
    core.suspendSucceed(() => {
      const list = Chunk.fromIterable(effects)
      if (!Chunk.isNonEmpty(list)) {
        return core.dieSync(() => internalCause.IllegalArgumentException(`Received an empty collection of effects`))
      }
      return pipe(
        Chunk.tailNonEmpty(list),
        Chunk.reduce(Chunk.headNonEmpty(list), (left, right) => core.orElse(left, () => right))
      )
    }).traced(trace)
)

/* @internal */
export const flattenErrorOption = Debug.dualWithTrace<
  <E1>(fallback: E1) => <R, E, A>(self: Effect.Effect<R, Option.Option<E>, A>) => Effect.Effect<R, E | E1, A>,
  <R, E, A, E1>(self: Effect.Effect<R, Option.Option<E>, A>, fallback: E1) => Effect.Effect<R, E | E1, A>
>(2, (trace) => (self, fallback) => core.mapError(self, Option.getOrElse(() => fallback)).traced(trace))

/* @internal */
export const flipWith = Debug.dualWithTrace<
  <R, A, E, R2, A2, E2>(
    f: (effect: Effect.Effect<R, A, E>) => Effect.Effect<R2, A2, E2>
  ) => (self: Effect.Effect<R, E, A>) => Effect.Effect<R2, E2, A2>,
  <R, A, E, R2, A2, E2>(
    self: Effect.Effect<R, E, A>,
    f: (effect: Effect.Effect<R, A, E>) => Effect.Effect<R2, A2, E2>
  ) => Effect.Effect<R2, E2, A2>
>(2, (trace, restore) => (self, f) => core.flip(restore(f)(core.flip(self))).traced(trace))

/* @internal */
export const match = Debug.dualWithTrace<
  <E, A, A2, A3>(
    onFailure: (error: E) => A2,
    onSuccess: (value: A) => A3
  ) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, never, A2 | A3>,
  <R, E, A, A2, A3>(
    self: Effect.Effect<R, E, A>,
    onFailure: (error: E) => A2,
    onSuccess: (value: A) => A3
  ) => Effect.Effect<R, never, A2 | A3>
>(3, (trace, restore) =>
  (self, onFailure, onSuccess) =>
    core.matchEffect(
      self,
      (e) => core.succeed(restore(onFailure)(e)),
      (a) => core.succeed(restore(onSuccess)(a))
    ).traced(trace))

/* @internal */
export const forAll = Debug.dualWithTrace<
  <R, E, A>(f: (a: A) => Effect.Effect<R, E, boolean>) => (elements: Iterable<A>) => Effect.Effect<R, E, boolean>,
  <R, E, A>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) => Effect.Effect<R, E, boolean>
>(
  2,
  (trace, restore) =>
    (elements, f) =>
      core.suspendSucceed(() =>
        forAllLoop(
          restore,
          elements[Symbol.iterator](),
          restore(f)
        )
      ).traced(trace)
)

const forAllLoop = <R, E, A>(
  restore: Debug.Restore,
  iterator: Iterator<A>,
  f: (a: A) => Effect.Effect<R, E, boolean>
): Effect.Effect<R, E, boolean> => {
  const next = restore(() => iterator.next())()
  return next.done
    ? core.succeed(true)
    : pipe(
      f(next.value),
      core.flatMap((b) => b ? forAllLoop(restore, iterator, f) : core.succeed(b))
    )
}

/* @internal */
export const forEachEffect = Debug.dualWithTrace<
  <A, R1, E1, B>(
    f: (a: A) => Effect.Effect<R1, E1, B>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R1, E1, Option.Option<B>>,
  <R, E, A, R1, E1, B>(
    self: Effect.Effect<R, E, A>,
    f: (a: A) => Effect.Effect<R1, E1, B>
  ) => Effect.Effect<R | R1, E1, Option.Option<B>>
>(2, (trace, restore) =>
  (self, f) =>
    core.matchCauseEffect(
      self,
      () => core.succeed(Option.none()),
      (a) => core.map(restore(f)(a), Option.some)
    ).traced(trace))

/* @internal */
export const forEachOption = Debug.dualWithTrace<
  <R, E, A, B>(
    f: (a: A) => Effect.Effect<R, E, B>
  ) => (option: Option.Option<A>) => Effect.Effect<R, E, Option.Option<B>>,
  <R, E, A, B>(option: Option.Option<A>, f: (a: A) => Effect.Effect<R, E, B>) => Effect.Effect<R, E, Option.Option<B>>
>(2, (trace, restore) =>
  (option, f) => {
    switch (option._tag) {
      case "None": {
        return core.succeed(Option.none()).traced(trace)
      }
      case "Some": {
        return core.map(restore(f)(option.value), Option.some).traced(trace)
      }
    }
  })

/* @internal */
export const forEachWithIndex = Debug.dualWithTrace<
  <A, R, E, B>(
    f: (a: A, i: number) => Effect.Effect<R, E, B>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <A, R, E, B>(
    elements: Iterable<A>,
    f: (a: A, i: number) => Effect.Effect<R, E, B>
  ) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(
  2,
  (trace, restore) =>
    <A, R, E, B>(elements: Iterable<A>, f: (a: A, i: number) => Effect.Effect<R, E, B>) =>
      core.suspendSucceed(() => {
        let index = 0
        const acc: Array<B> = []
        return pipe(
          core.forEachDiscard(elements, (a) =>
            core.map(restore(f)(a, index), (b) => {
              acc.push(b)
              index++
            })),
          core.map(() => Chunk.unsafeFromArray(acc))
        )
      }).traced(trace)
)

/* @internal */
export const forever = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, E, never> => {
    const loop: Effect.Effect<R, E, never> = pipe(core.flatMap(self, () => core.yieldNow()), core.flatMap(() => loop))
    return loop.traced(trace)
  }
)

/* @internal */
export const fromEitherCause = Debug.methodWithTrace((trace) =>
  <E, A>(either: Either.Either<Cause.Cause<E>, A>): Effect.Effect<never, E, A> => {
    switch (either._tag) {
      case "Left": {
        return core.failCause(either.left).traced(trace)
      }
      case "Right": {
        return core.succeed(either.right).traced(trace)
      }
    }
  }
)

/** @internal */
class EffectGen {
  constructor(readonly value: Effect.Effect<any, any, any>) {
  }
  [Symbol.iterator]() {
    return new SingleShotGen.SingleShotGen(this)
  }
}

/**
 * Inspired by https://github.com/tusharmath/qio/pull/22 (revised)
  @internal */
export const gen: typeof Effect.gen = Debug.methodWithTrace((trace, restore) =>
  (f) =>
    core.suspendSucceed(() => {
      const iterator = restore(() => f((self) => new EffectGen(self) as any))()
      const state = restore(() => iterator.next())()
      const run = (
        state: IteratorYieldResult<any> | IteratorReturnResult<any>
      ): Effect.Effect<any, any, any> => (state.done ?
        core.succeed(state.value) :
        pipe(
          state.value.value as unknown as Effect.Effect<any, any, any>,
          core.flatMap((val: any) => run(restore(() => iterator.next(val))()))
        ))
      return run(state)
    }).traced(trace)
)

/* @internal */
export const getFiberRefs = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, FiberRefs.FiberRefs> =>
    core.withFiberRuntime<never, never, FiberRefs.FiberRefs>(
      (state) => core.succeed(state.unsafeGetFiberRefs())
    ).traced(trace)
)

/* @internal */
export const getOrFail = Debug.methodWithTrace((trace) =>
  <A>(option: Option.Option<A>): Effect.Effect<never, Cause.NoSuchElementException, A> =>
    pipe(option, getOrFailWith(() => internalCause.NoSuchElementException())).traced(trace)
)

/* @internal */
export const getOrFailDiscard = Debug.methodWithTrace((trace) =>
  <A>(option: Option.Option<A>): Effect.Effect<never, void, A> => getOrFailWith(option, constVoid).traced(trace)
)

/* @internal */
export const getOrFailWith = Debug.dualWithTrace<
  <E>(error: LazyArg<E>) => <A>(option: Option.Option<A>) => Effect.Effect<never, E, A>,
  <A, E>(option: Option.Option<A>, error: LazyArg<E>) => Effect.Effect<never, E, A>
>(2, (trace, restore) =>
  (option, error) => {
    switch (option._tag) {
      case "None": {
        return core.failSync(restore(error)).traced(trace)
      }
      case "Some": {
        return core.succeed(option.value).traced(trace)
      }
    }
  })

/* @internal */
export const head = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    self: Effect.Effect<R, E, Iterable<A>>
  ): Effect.Effect<R, Option.Option<E>, A> =>
    pipe(
      self,
      core.matchEffect(
        (e) => core.fail(Option.some(e)),
        (as) => {
          const iterator = restore(() => as[Symbol.iterator]())()
          const next = restore(() => iterator.next())()
          if (next.done) {
            return core.fail(Option.none())
          }
          return core.succeed(next.value)
        }
      )
    ).traced(trace)
)

/* @internal */
export const ignore = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, void> =>
    match(self, constVoid, constVoid).traced(trace)
)

/* @internal */
export const ignoreLogged = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, void> =>
    core.matchCauseEffect(
      self,
      (cause) =>
        logDebugCauseMessage(
          "An error was silently ignored because it is not anticipated to be useful",
          cause
        ),
      () => core.unit()
    ).traced(trace)
)

/* @internal */
export const inheritFiberRefs = Debug.methodWithTrace((trace) =>
  (childFiberRefs: FiberRefs.FiberRefs) =>
    updateFiberRefs((parentFiberId, parentFiberRefs) =>
      FiberRefs.joinAs(parentFiberRefs, parentFiberId, childFiberRefs)
    ).traced(trace)
)

/* @internal */
export const isFailure = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, boolean> =>
    match(self, constTrue, constFalse).traced(trace)
)

/* @internal */
export const isSuccess = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, boolean> =>
    match(self, constFalse, constTrue).traced(trace)
)

/* @internal */
export const iterate = Debug.methodWithTrace((trace, restore) =>
  <Z, R, E>(
    initial: Z,
    cont: (z: Z) => boolean,
    body: (z: Z) => Effect.Effect<R, E, Z>
  ): Effect.Effect<R, E, Z> =>
    core.suspendSucceed<R, E, Z>(() => {
      if (restore(cont)(initial)) {
        return core.flatMap(restore(body)(initial), (z2) => iterate(z2, restore(cont), restore(body)))
      }
      return core.succeed(initial)
    }).traced(trace)
)

/* @internal */
export const left = Debug.methodWithTrace((trace) =>
  <R, E, A, B>(self: Effect.Effect<R, E, Either.Either<A, B>>): Effect.Effect<R, Either.Either<E, B>, A> =>
    core.matchEffect(
      self,
      (e) => core.fail(Either.left(e)),
      (either) => {
        switch (either._tag) {
          case "Left": {
            return core.succeed(either.left)
          }
          case "Right": {
            return core.fail(Either.right(either.right))
          }
        }
      }
    ).traced(trace)
)

/* @internal */
export const leftWith = Debug.dualWithTrace<
  <R, E, B, A, R1, E1, B1, A1>(
    f: (effect: Effect.Effect<R, Either.Either<E, B>, A>) => Effect.Effect<R1, Either.Either<E1, B1>, A1>
  ) => (self: Effect.Effect<R, E, Either.Either<A, B>>) => Effect.Effect<R | R1, E | E1, Either.Either<A1, B1>>,
  <R, E, B, A, R1, E1, B1, A1>(
    self: Effect.Effect<R, E, Either.Either<A, B>>,
    f: (effect: Effect.Effect<R, Either.Either<E, B>, A>) => Effect.Effect<R1, Either.Either<E1, B1>, A1>
  ) => Effect.Effect<R | R1, E | E1, Either.Either<A1, B1>>
>(2, (trace, restore) => (self, f) => core.suspendSucceed(() => unleft(restore(f)(left(self)))).traced(trace))

/** @internal */
const someFatal = Option.some(LogLevel.Fatal)
/** @internal */
const someError = Option.some(LogLevel.Error)
/** @internal */
const someWarning = Option.some(LogLevel.Warning)
/** @internal */
const someTrace = Option.some(LogLevel.Trace)
/** @internal */
const someInfo = Option.some(LogLevel.Info)
/** @internal */
const someDebug = Option.some(LogLevel.Debug)

/* @internal */
export const log = Debug.methodWithTrace((trace) =>
  (message: string): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, internalCause.empty, Option.none())
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logDebug = Debug.methodWithTrace((trace) =>
  (message: string): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, internalCause.empty, someDebug)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logDebugCause = Debug.methodWithTrace((trace) =>
  <E>(cause: Cause.Cause<E>): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log("", cause, someDebug)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logDebugCauseMessage = Debug.methodWithTrace((trace) =>
  <E>(
    message: string,
    cause: Cause.Cause<E>
  ): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, cause, someDebug)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logError = Debug.methodWithTrace((trace) =>
  (message: string): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, internalCause.empty, someError)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logErrorCause = Debug.methodWithTrace((trace) =>
  <E>(cause: Cause.Cause<E>): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log("", cause, someError)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logErrorCauseMessage = Debug.methodWithTrace((trace) =>
  <E>(
    message: string,
    cause: Cause.Cause<E>
  ): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, cause, someError)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logFatal = Debug.methodWithTrace((trace) =>
  (message: string): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, internalCause.empty, someFatal)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logFatalCause = Debug.methodWithTrace((trace) =>
  <E>(cause: Cause.Cause<E>): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log("", cause, someFatal)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logFatalCauseMessage = Debug.methodWithTrace((trace) =>
  <E>(
    message: string,
    cause: Cause.Cause<E>
  ): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, cause, someFatal)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logInfo = Debug.methodWithTrace((trace) =>
  (message: string): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, internalCause.empty, someInfo)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logInfoCause = Debug.methodWithTrace((trace) =>
  <E>(cause: Cause.Cause<E>): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log("", cause, someInfo)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logInfoCauseMessage = Debug.methodWithTrace((trace) =>
  <E>(
    message: string,
    cause: Cause.Cause<E>
  ): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, cause, someInfo)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logWarning = Debug.methodWithTrace((trace) =>
  (message: string): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, internalCause.empty, someWarning)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logWarningCause = Debug.methodWithTrace((trace) =>
  <E>(cause: Cause.Cause<E>): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log("", cause, someWarning)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logWarningCauseMessage = Debug.methodWithTrace((trace) =>
  <E>(
    message: string,
    cause: Cause.Cause<E>
  ): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, cause, someWarning)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logTrace = Debug.methodWithTrace((trace) =>
  (message: string): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, internalCause.empty, someTrace)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logTraceCause = Debug.methodWithTrace((trace) =>
  <E>(cause: Cause.Cause<E>): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log("", cause, someTrace)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logTraceCauseMessage = Debug.methodWithTrace((trace) =>
  <E>(
    message: string,
    cause: Cause.Cause<E>
  ): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((fiberState) => {
      fiberState.log(message, cause, someTrace)
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const logSpan = Debug.dualWithTrace<
  (label: string) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, label: string) => Effect.Effect<R, E, A>
>(
  2,
  (trace) =>
    (effect, label) =>
      core.flatMap(
        core.fiberRefGet(core.currentLogSpan),
        (stack) =>
          core.flatMap(Clock.currentTimeMillis(), (now) =>
            core.suspendSucceed(() => {
              const logSpan = LogSpan.make(label, now)
              return core.fiberRefLocally(
                core.currentLogSpan,
                pipe(stack, Chunk.prepend(logSpan)) as Chunk.Chunk<LogSpan.LogSpan>
              )(effect)
            }))
      ).traced(trace)
)

/* @internal */
export const logAnnotate = Debug.dualWithTrace<
  (key: string, value: string) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, key: string, value: string) => Effect.Effect<R, E, A>
>(
  3,
  (trace) =>
    (effect, key, value) =>
      core.flatMap(core.fiberRefGet(core.currentLogAnnotations), (annotations) =>
        core.suspendSucceed(() =>
          pipe(
            effect,
            core.fiberRefLocally(core.currentLogAnnotations, pipe(annotations, HashMap.set(key, value)))
          )
        )).traced(trace)
)

/* @internal */
export const logAnnotations = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, HashMap.HashMap<string, string>> =>
    core.fiberRefGet(core.currentLogAnnotations).traced(trace)
)

/* @internal */
export const loop = Debug.methodWithTrace((trace, restore) =>
  <Z, R, E, A>(
    initial: Z,
    cont: (z: Z) => boolean,
    inc: (z: Z) => Z,
    body: (z: Z) => Effect.Effect<R, E, A>
  ): Effect.Effect<R, E, Chunk.Chunk<A>> =>
    loopInternal(initial, restore(cont), restore(inc), restore(body)).traced(trace)
)

const loopInternal = <Z, R, E, A>(
  initial: Z,
  cont: (z: Z) => boolean,
  inc: (z: Z) => Z,
  body: (z: Z) => Effect.Effect<R, E, A>
): Effect.Effect<R, E, Chunk.Chunk<A>> => {
  return core.suspendSucceed(() => {
    return cont(initial)
      ? core.flatMap(body(initial), (a) =>
        core.map(
          loopInternal(inc(initial), cont, inc, body),
          Chunk.prepend(a)
        ))
      : core.sync(() => Chunk.empty())
  })
}

/* @internal */
export const loopDiscard = Debug.methodWithTrace((trace, restore) =>
  <Z, R, E, X>(
    initial: Z,
    cont: (z: Z) => boolean,
    inc: (z: Z) => Z,
    body: (z: Z) => Effect.Effect<R, E, X>
  ): Effect.Effect<R, E, void> =>
    core.suspendSucceed(() =>
      restore(cont)(initial)
        ? core.flatMap(
          restore(body)(initial),
          () => loopDiscard(restore(inc)(initial), restore(cont), restore(inc), restore(body))
        )
        : core.unit()
    ).traced(trace)
)

/* @internal */
export const mapAccum = Debug.dualWithTrace<
  <A, B, R, E, Z>(
    zero: Z,
    f: (z: Z, a: A) => Effect.Effect<R, E, readonly [Z, B]>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, readonly [Z, Chunk.Chunk<B>]>,
  <A, B, R, E, Z>(
    elements: Iterable<A>,
    zero: Z,
    f: (z: Z, a: A) => Effect.Effect<R, E, readonly [Z, B]>
  ) => Effect.Effect<R, E, readonly [Z, Chunk.Chunk<B>]>
>(3, (trace, restore) =>
  <A, B, R, E, Z>(
    elements: Iterable<A>,
    zero: Z,
    f: (z: Z, a: A) => Effect.Effect<R, E, readonly [Z, B]>
  ) =>
    core.suspendSucceed(() => {
      const iterator = restore(() => elements[Symbol.iterator]())()
      const builder: Array<B> = []
      let result: Effect.Effect<R, E, Z> = core.succeed(zero)
      let next: IteratorResult<A, any>
      while (!(next = iterator.next()).done) {
        result = pipe(
          result,
          core.flatMap((state) =>
            pipe(
              restore(f)(state, next.value),
              core.map(([z, b]) => {
                builder.push(b)
                return z
              })
            )
          )
        )
      }
      return core.map(result, (z) => [z, Chunk.unsafeFromArray(builder)] as const)
    }).traced(trace))

/* @internal */
export const mapBoth = Debug.dualWithTrace<
  <E, A, E2, A2>(f: (e: E) => E2, g: (a: A) => A2) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E2, A2>,
  <R, E, A, E2, A2>(self: Effect.Effect<R, E, A>, f: (e: E) => E2, g: (a: A) => A2) => Effect.Effect<R, E2, A2>
>(3, (trace, restore) =>
  (self, f, g) =>
    core.matchEffect(
      self,
      (e) => core.failSync(() => restore(f)(e)),
      (a) => core.sync(() => restore(g)(a))
    ).traced(trace))

/* @internal */
export const mapErrorCause = Debug.dualWithTrace<
  <E, E2>(
    f: (cause: Cause.Cause<E>) => Cause.Cause<E2>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E2, A>,
  <R, E, A, E2>(self: Effect.Effect<R, E, A>, f: (cause: Cause.Cause<E>) => Cause.Cause<E2>) => Effect.Effect<R, E2, A>
>(
  2,
  (trace, restore) =>
    (self, f) => core.matchCauseEffect(self, (c) => core.failCauseSync(() => restore(f)(c)), core.succeed).traced(trace)
)

/* @internal */
export const mapTryCatch = Debug.dualWithTrace<
  <A, B, E1>(
    f: (a: A) => B,
    onThrow: (u: unknown) => E1
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E | E1, B>,
  <R, E, A, B, E1>(
    self: Effect.Effect<R, E, A>,
    f: (a: A) => B,
    onThrow: (u: unknown) => E1
  ) => Effect.Effect<R, E | E1, B>
>(3, (trace) => (self, f, onThrow) => core.flatMap(self, (a) => tryCatch(() => f(a), onThrow)).traced(trace))

/* @internal */
export const memoize = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    self: Effect.Effect<R, E, A>
  ): Effect.Effect<never, never, Effect.Effect<R, E, A>> =>
    pipe(
      core.deferredMake<E, readonly [FiberRefsPatch.FiberRefsPatch, A]>(),
      core.flatMap((deferred) =>
        pipe(
          diffFiberRefs(self),
          core.intoDeferred(deferred),
          once,
          core.map((complete) =>
            pipe(
              complete,
              core.zipRight(
                pipe(
                  core.deferredAwait(deferred),
                  core.flatMap(([patch, a]) => pipe(patchFiberRefs(patch), core.as(a)))
                )
              )
            )
          )
        )
      )
    ).traced(trace)
)

/* @internal */
export const merge = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, E | A> =>
    pipe(self, core.matchEffect((e) => core.succeed(e), core.succeed)).traced(trace)
)

/* @internal */
export const mergeAll = Debug.dualWithTrace<
  <Z, A>(zero: Z, f: (z: Z, a: A) => Z) => <R, E>(elements: Iterable<Effect.Effect<R, E, A>>) => Effect.Effect<R, E, Z>,
  <R, E, Z, A>(elements: Iterable<Effect.Effect<R, E, A>>, zero: Z, f: (z: Z, a: A) => Z) => Effect.Effect<R, E, Z>
>(
  3,
  (trace, restore) =>
    <R, E, Z, A>(elements: Iterable<Effect.Effect<R, E, A>>, zero: Z, f: (z: Z, a: A) => Z) =>
      Array.from(elements).reduce(
        (acc, a) => core.zipWith(acc, a, restore(f)),
        core.succeed(zero) as Effect.Effect<R, E, Z>
      ).traced(trace)
)

/* @internal */
export const negate = Debug.methodWithTrace((trace) =>
  <R, E>(self: Effect.Effect<R, E, boolean>): Effect.Effect<R, E, boolean> =>
    pipe(self, core.map((b) => !b)).traced(trace)
)

/* @internal */
export const none = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    self: Effect.Effect<R, E, Option.Option<A>>
  ): Effect.Effect<R, Option.Option<E>, void> =>
    pipe(
      self,
      core.matchEffect(
        (e) => core.fail(Option.some(e)),
        (option) => {
          switch (option._tag) {
            case "None": {
              return core.unit()
            }
            case "Some": {
              return core.fail(Option.none())
            }
          }
        }
      )
    ).traced(trace)
)

/* @internal */
export const noneOrFail = Debug.methodWithTrace((trace) =>
  <E>(option: Option.Option<E>): Effect.Effect<never, E, void> => core.flip(getOrFailDiscard(option)).traced(trace)
)

/* @internal */
export const noneOrFailWith = Debug.methodWithTrace((trace, restore) =>
  <E, A>(
    option: Option.Option<A>,
    f: (a: A) => E
  ): Effect.Effect<never, E, void> => pipe(core.flip(getOrFailDiscard(option)), core.mapError(restore(f))).traced(trace)
)

/* @internal */
export const once = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    self: Effect.Effect<R, E, A>
  ): Effect.Effect<never, never, Effect.Effect<R, E, void>> =>
    pipe(
      Ref.make(true),
      core.map((ref) => pipe(self, core.whenEffect(Ref.getAndSet(ref, false)), core.asUnit))
    ).traced(trace)
)

/* @internal */
export const option = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, Option.Option<A>> =>
    pipe(
      self,
      core.matchEffect(
        () => core.succeed(Option.none()),
        (a) => core.succeed(Option.some(a))
      )
    ).traced(trace)
)

/* @internal */
export const orElseEither = Debug.dualWithTrace<
  <R2, E2, A2>(
    that: LazyArg<Effect.Effect<R2, E2, A2>>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E2, Either.Either<A, A2>>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    that: LazyArg<Effect.Effect<R2, E2, A2>>
  ) => Effect.Effect<R | R2, E2, Either.Either<A, A2>>
>(2, (trace, restore) =>
  (self, that) =>
    core.tryOrElse(
      self,
      () => core.map(restore(that)(), Either.right),
      (a) => core.succeed(Either.left(a))
    ).traced(trace))

/* @internal */
export const orElseFail = Debug.dualWithTrace<
  <E2>(evaluate: LazyArg<E2>) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E2, A>,
  <R, E, A, E2>(self: Effect.Effect<R, E, A>, evaluate: LazyArg<E2>) => Effect.Effect<R, E2, A>
>(2, (trace, restore) => (self, evaluate) => core.orElse(self, () => core.failSync(restore(evaluate))).traced(trace))

/* @internal */
export const orElseOptional = Debug.dualWithTrace<
  <R, E, A, R2, E2, A2>(
    that: LazyArg<Effect.Effect<R2, Option.Option<E2>, A2>>
  ) => (
    self: Effect.Effect<R, Option.Option<E>, A>
  ) => Effect.Effect<R | R2, Option.Option<E | E2>, A | A2>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, Option.Option<E>, A>,
    that: LazyArg<Effect.Effect<R2, Option.Option<E2>, A2>>
  ) => Effect.Effect<R | R2, Option.Option<E | E2>, A | A2>
>(2, (trace, restore) =>
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, Option.Option<E>, A>,
    that: LazyArg<Effect.Effect<R2, Option.Option<E2>, A2>>
  ) =>
    core.catchAll(self, (option) => {
      switch (option._tag) {
        case "None": {
          return restore(that)()
        }
        case "Some": {
          return core.fail(Option.some<E | E2>(option.value))
        }
      }
    }).traced(trace))

/* @internal */
export const orElseSucceed = Debug.dualWithTrace<
  <A2>(evaluate: LazyArg<A2>) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A | A2>,
  <R, E, A, A2>(self: Effect.Effect<R, E, A>, evaluate: LazyArg<A2>) => Effect.Effect<R, E, A | A2>
>(2, (trace, restore) => (self, evaluate) => core.orElse(self, () => core.sync(restore(evaluate))).traced(trace))

/* @internal */
export const parallelErrors = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, Chunk.Chunk<E>, A> =>
    core.matchCauseEffect(self, (cause) => {
      const errors = Chunk.fromIterable(internalCause.failures(cause))
      return errors.length === 0
        ? core.failCause(cause as Cause.Cause<never>)
        : core.fail(errors)
    }, core.succeed)
      .traced(trace)
)

/* @internal */
export const partition = Debug.dualWithTrace<
  <R, E, A, B>(
    f: (a: A) => Effect.Effect<R, E, B>
  ) => (elements: Iterable<A>) => Effect.Effect<R, never, readonly [Chunk.Chunk<E>, Chunk.Chunk<B>]>,
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect.Effect<R, E, B>
  ) => Effect.Effect<R, never, readonly [Chunk.Chunk<E>, Chunk.Chunk<B>]>
>(2, (trace, restore) =>
  (elements, f) =>
    pipe(
      core.forEach(elements, (a) => core.either(restore(f)(a))),
      core.map((chunk) => core.partitionMap(chunk, identity))
    ).traced(trace))

/* @internal */
export const patchFiberRefs = Debug.methodWithTrace((trace) =>
  (patch: FiberRefsPatch.FiberRefsPatch): Effect.Effect<never, never, void> =>
    updateFiberRefs((fiberId, fiberRefs) => pipe(patch, fiberRefsPatch.patch(fiberId, fiberRefs))).traced(trace)
)

/* @internal */
export const promise = Debug.methodWithTrace((trace, restore) =>
  <A>(evaluate: LazyArg<Promise<A>>): Effect.Effect<never, never, A> =>
    dieOnSync(core.async<never, never, A>((resolve) => {
      restore(evaluate)()
        .then((a) => resolve(core.exitSucceed(a)))
        .catch((e) => resolve(core.exitDie(e)))
    })).traced(trace)
)

/* @internal */
export const promiseInterrupt = Debug.methodWithTrace((trace, restore) =>
  <A>(evaluate: (signal: AbortSignal) => Promise<A>): Effect.Effect<never, never, A> =>
    dieOnSync(core.asyncInterruptEither<never, never, A>((resolve) => {
      const controller = new AbortController()
      restore(evaluate)(controller.signal)
        .then((a) => resolve(core.exitSucceed(a)))
        .catch((e) => resolve(core.exitDie(e)))
      return Either.left(core.sync(() => controller.abort()))
    })).traced(trace)
)

/* @internal */
export const provideService = Debug.dualWithTrace<
  <T extends Context.Tag<any>>(
    tag: T,
    service: Context.Tag.Service<T>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<Exclude<R, Context.Tag.Service<T>>, E, A>,
  <R, E, A, T extends Context.Tag<any>>(
    self: Effect.Effect<R, E, A>,
    tag: T,
    service: Context.Tag.Service<T>
  ) => Effect.Effect<Exclude<R, Context.Tag.Service<T>>, E, A>
>(3, (trace) => (self, tag, service) => provideServiceEffect(self, tag, core.succeed(service)).traced(trace))

/* @internal */
export const provideServiceEffect = Debug.dualWithTrace<
  <T extends Context.Tag<any>, R1, E1>(
    tag: T,
    effect: Effect.Effect<R1, E1, Context.Tag.Service<T>>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R1 | Exclude<R, Context.Tag.Service<T>>, E | E1, A>,
  <R, E, A, T extends Context.Tag<any>, R1, E1>(
    self: Effect.Effect<R, E, A>,
    tag: T,
    effect: Effect.Effect<R1, E1, Context.Tag.Service<T>>
  ) => Effect.Effect<R1 | Exclude<R, Context.Tag.Service<T>>, E | E1, A>
>(
  3,
  (trace) =>
    <R, E, A, T extends Context.Tag<any>, R1, E1>(
      self: Effect.Effect<R, E, A>,
      tag: T,
      effect: Effect.Effect<R1, E1, Context.Tag.Service<T>>
    ) =>
      core.contextWithEffect((env: Context.Context<R1 | Exclude<R, Context.Tag.Service<T>>>) =>
        core.flatMap(effect, (service) =>
          core.provideContext(self, pipe(env, Context.add(tag, service)) as Context.Context<R | R1>))
      ).traced(trace)
)

/* @internal */
export const random = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, Random.Random> => randomWith(core.succeed).traced(trace)
)

/* @internal */
export const randomWith: <R, E, A>(f: (random: Random.Random) => Effect.Effect<R, E, A>) => Effect.Effect<R, E, A> =
  Random.randomWith

/* @internal */
export const reduce = Debug.dualWithTrace<
  <Z, A, R, E>(zero: Z, f: (z: Z, a: A) => Effect.Effect<R, E, Z>) => (elements: Iterable<A>) => Effect.Effect<R, E, Z>,
  <Z, A, R, E>(elements: Iterable<A>, zero: Z, f: (z: Z, a: A) => Effect.Effect<R, E, Z>) => Effect.Effect<R, E, Z>
>(
  3,
  (trace, restore) =>
    <Z, A, R, E>(elements: Iterable<A>, zero: Z, f: (z: Z, a: A) => Effect.Effect<R, E, Z>) =>
      Array.from(elements).reduce(
        (acc, el) => core.flatMap(acc, (a) => restore(f)(a, el)),
        core.succeed(zero) as Effect.Effect<R, E, Z>
      ).traced(trace)
)

/* @internal */
export const reduceAll = Debug.dualWithTrace<
  <R, E, A>(
    zero: Effect.Effect<R, E, A>,
    f: (acc: A, a: A) => A
  ) => (elements: Iterable<Effect.Effect<R, E, A>>) => Effect.Effect<R, E, A>,
  <R, E, A>(
    elements: Iterable<Effect.Effect<R, E, A>>,
    zero: Effect.Effect<R, E, A>,
    f: (acc: A, a: A) => A
  ) => Effect.Effect<R, E, A>
>(
  3,
  (trace, restore) =>
    (elements, zero, f) => Array.from(elements).reduce((acc, a) => core.zipWith(acc, a, restore(f)), zero).traced(trace)
)

/* @internal */
export const reduceRight = Debug.dualWithTrace<
  <A, Z, R, E>(zero: Z, f: (a: A, z: Z) => Effect.Effect<R, E, Z>) => (elements: Iterable<A>) => Effect.Effect<R, E, Z>,
  <A, Z, R, E>(elements: Iterable<A>, zero: Z, f: (a: A, z: Z) => Effect.Effect<R, E, Z>) => Effect.Effect<R, E, Z>
>(
  3,
  (trace, restore) =>
    <A, Z, R, E>(elements: Iterable<A>, zero: Z, f: (a: A, z: Z) => Effect.Effect<R, E, Z>) =>
      Array.from(elements).reduceRight(
        (acc, el) => core.flatMap(acc, (a) => restore(f)(el, a)),
        core.succeed(zero) as Effect.Effect<R, E, Z>
      ).traced(trace)
)

/* @internal */
export const reduceWhile = Debug.dualWithTrace<
  <A, R, E, Z>(
    zero: Z,
    predicate: Predicate<Z>,
    f: (s: Z, a: A) => Effect.Effect<R, E, Z>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Z>,
  <A, R, E, Z>(
    elements: Iterable<A>,
    zero: Z,
    predicate: Predicate<Z>,
    f: (s: Z, a: A) => Effect.Effect<R, E, Z>
  ) => Effect.Effect<R, E, Z>
>(
  4,
  (trace, restore) =>
    <A, R, E, Z>(
      elements: Iterable<A>,
      zero: Z,
      predicate: Predicate<Z>,
      f: (s: Z, a: A) => Effect.Effect<R, E, Z>
    ) =>
      core.flatMap(
        core.sync(restore(() => elements[Symbol.iterator]())),
        (iterator) => reduceWhileLoop(restore, iterator, zero, restore(predicate), restore(f))
      ).traced(trace)
)

const reduceWhileLoop = <A, R, E, Z>(
  restore: Debug.Restore,
  iterator: Iterator<A>,
  state: Z,
  predicate: Predicate<Z>,
  f: (s: Z, a: A) => Effect.Effect<R, E, Z>
): Effect.Effect<R, E, Z> => {
  const next = restore(() => iterator.next())()
  if (!next.done && predicate(state)) {
    return core.flatMap(
      f(state, next.value),
      (nextState) => reduceWhileLoop(restore, iterator, nextState, predicate, f)
    )
  }
  return core.succeed(state)
}

/* @internal */
export const refineOrDie = Debug.dualWithTrace<
  <E, E1>(pf: (e: E) => Option.Option<E1>) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E1, A>,
  <R, E, A, E1>(self: Effect.Effect<R, E, A>, pf: (e: E) => Option.Option<E1>) => Effect.Effect<R, E1, A>
>(2, (trace) => (self, pf) => refineOrDieWith(self, pf, identity).traced(trace))

/* @internal */
export const refineOrDieWith = Debug.dualWithTrace<
  <E, E1>(
    pf: (e: E) => Option.Option<E1>,
    f: (e: E) => unknown
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E1, A>,
  <R, E, A, E1>(
    self: Effect.Effect<R, E, A>,
    pf: (e: E) => Option.Option<E1>,
    f: (e: E) => unknown
  ) => Effect.Effect<R, E1, A>
>(3, (trace, restore) =>
  (self, pf, f) =>
    core.catchAll(self, (e) => {
      const option = restore(pf)(e)
      switch (option._tag) {
        case "None": {
          return core.die(restore(f)(e))
        }
        case "Some": {
          return core.fail(option.value)
        }
      }
    }).traced(trace))

/* @internal */
export const refineTagOrDie = Debug.dualWithTrace<
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string>(
    k: K
  ) => (self: Effect.Effect<R, E, A>) => Effect.Effect<R, Extract<E, { _tag: K }>, A>,
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string>(
    self: Effect.Effect<R, E, A>,
    k: K
  ) => Effect.Effect<R, Extract<E, { _tag: K }>, A>
>(2, (trace) => (self, k) => refineTagOrDieWith(self, k, identity).traced(trace))

/* @internal */
export const refineTagOrDieWith = Debug.dualWithTrace<
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string>(
    k: K,
    f: (e: Exclude<E, { _tag: K }>) => unknown
  ) => (self: Effect.Effect<R, E, A>) => Effect.Effect<R, Extract<E, { _tag: K }>, A>,
  <R, E extends { _tag: string }, A, K extends E["_tag"] & string>(
    self: Effect.Effect<R, E, A>,
    k: K,
    f: (e: Exclude<E, { _tag: K }>) => unknown
  ) => Effect.Effect<R, Extract<E, { _tag: K }>, A>
>(3, (trace, restore) =>
  (self, k, f) =>
    core.catchAll(self, (e) => {
      if ("_tag" in e && e["_tag"] === k) {
        return core.fail(e as any)
      }
      return core.die(restore(f)(e as any))
    }).traced(trace))

/* @internal */
export const reject = Debug.dualWithTrace<
  <A, E1>(pf: (a: A) => Option.Option<E1>) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E | E1, A>,
  <R, E, A, E1>(self: Effect.Effect<R, E, A>, pf: (a: A) => Option.Option<E1>) => Effect.Effect<R, E | E1, A>
>(2, (trace, restore) =>
  (self, pf) =>
    rejectEffect(
      self,
      (a) => pipe(restore(pf)(a), Option.map(core.fail))
    ).traced(trace))

/* @internal */
export const rejectEffect = Debug.dualWithTrace<
  <A, R1, E1>(
    pf: (a: A) => Option.Option<Effect.Effect<R1, E1, E1>>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R1, E | E1, A>,
  <R, E, A, R1, E1>(
    self: Effect.Effect<R, E, A>,
    pf: (a: A) => Option.Option<Effect.Effect<R1, E1, E1>>
  ) => Effect.Effect<R | R1, E | E1, A>
>(2, (trace, restore) =>
  (self, pf) =>
    core.flatMap(self, (a) => {
      const option = restore(pf)(a)
      switch (option._tag) {
        case "None": {
          return core.succeed(a)
        }
        case "Some": {
          return pipe(option.value, core.flatMap(core.fail))
        }
      }
    }).traced(trace))

/* @internal */
export const repeatN = Debug.dualWithTrace<
  (n: number) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, n: number) => Effect.Effect<R, E, A>
>(2, (trace) => (self, n) => core.suspendSucceed(() => repeatNLoop(self, n)).traced(trace))

/* @internal */
const repeatNLoop = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>, n: number): Effect.Effect<R, E, A> =>
    core.flatMap(self, (a) =>
      n <= 0 ?
        core.succeed(a) :
        core.zipRight(core.yieldNow(), repeatNLoop(self, n - 1))).traced(trace)
)

/* @internal */
export const replicate = (n: number) => {
  return <R, E, A>(self: Effect.Effect<R, E, A>): Chunk.Chunk<Effect.Effect<R, E, A>> => {
    return Chunk.unsafeFromArray(Array.from({ length: n }, () => self))
  }
}

/* @internal */
export const replicateEffect = Debug.dualWithTrace<
  (n: number) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, Chunk.Chunk<A>>,
  <R, E, A>(self: Effect.Effect<R, E, A>, n: number) => Effect.Effect<R, E, Chunk.Chunk<A>>
>(2, (trace) => (self, n) => collectAll(replicate(n)(self)).traced(trace))

/* @internal */
export const replicateEffectDiscard = Debug.dualWithTrace<
  (n: number) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, void>,
  <R, E, A>(self: Effect.Effect<R, E, A>, n: number) => Effect.Effect<R, E, void>
>(2, (trace) => (self, n) => collectAllDiscard(replicate(n)(self)).traced(trace))

/* @internal */
export const resurrect = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, unknown, A> =>
    unrefineWith(self, Option.some, identity).traced(trace)
)

/* @internal */
export const right = Debug.methodWithTrace((trace) =>
  <R, E, A, B>(
    self: Effect.Effect<R, E, Either.Either<A, B>>
  ): Effect.Effect<R, Either.Either<A, E>, B> =>
    core.matchEffect(
      self,
      (e) => core.fail(Either.right(e)),
      (either) => {
        switch (either._tag) {
          case "Left": {
            return core.fail(Either.left(either.left))
          }
          case "Right": {
            return core.succeed(either.right)
          }
        }
      }
    ).traced(trace)
)

/* @internal */
export const rightWith = Debug.dualWithTrace<
  <R, E, A, A1, B, B1, R1, E1>(
    f: (effect: Effect.Effect<R, Either.Either<A, E>, B>) => Effect.Effect<R1, Either.Either<A1, E1>, B1>
  ) => (self: Effect.Effect<R, E, Either.Either<A, B>>) => Effect.Effect<R | R1, E | E1, Either.Either<A1, B1>>,
  <R, E, A, A1, B, B1, R1, E1>(
    self: Effect.Effect<R, E, Either.Either<A, B>>,
    f: (effect: Effect.Effect<R, Either.Either<A, E>, B>) => Effect.Effect<R1, Either.Either<A1, E1>, B1>
  ) => Effect.Effect<R | R1, E | E1, Either.Either<A1, B1>>
>(2, (trace, restore) => (self, f) => core.suspendSucceed(() => unright(restore(f)(right(self)))).traced(trace))

/* @internal */
export const sandbox = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, Cause.Cause<E>, A> =>
    core.matchCauseEffect(self, core.fail, core.succeed).traced(trace)
)

/* @internal */
export const setFiberRefs = Debug.methodWithTrace((trace) =>
  (fiberRefs: FiberRefs.FiberRefs): Effect.Effect<never, never, void> =>
    core.suspendSucceed(() => FiberRefs.setAll(fiberRefs)).traced(trace)
)

/* @internal */
export const sleep: (duration: Duration.Duration) => Effect.Effect<never, never, void> = Clock.sleep

/* @internal */
export const someOrElse = Debug.dualWithTrace<
  <B>(orElse: LazyArg<B>) => <R, E, A>(self: Effect.Effect<R, E, Option.Option<A>>) => Effect.Effect<R, E, A | B>,
  <R, E, A, B>(self: Effect.Effect<R, E, Option.Option<A>>, orElse: LazyArg<B>) => Effect.Effect<R, E, A | B>
>(2, (trace, restore) =>
  (self, orElse) =>
    core.map(self, (option) => {
      switch (option._tag) {
        case "None": {
          return restore(orElse)()
        }
        case "Some": {
          return option.value
        }
      }
    }).traced(trace))

/* @internal */
export const someOrElseEffect = Debug.dualWithTrace<
  <R2, E2, A2>(
    orElse: LazyArg<Effect.Effect<R2, E2, A2>>
  ) => <R, E, A>(self: Effect.Effect<R, E, Option.Option<A>>) => Effect.Effect<R | R2, E | E2, A | A2>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, Option.Option<A>>,
    orElse: LazyArg<Effect.Effect<R2, E2, A2>>
  ) => Effect.Effect<R | R2, E | E2, A | A2>
>(
  2,
  (trace, restore) =>
    <R, E, A, R2, E2, A2>(self: Effect.Effect<R, E, Option.Option<A>>, orElse: LazyArg<Effect.Effect<R2, E2, A2>>) =>
      core.flatMap(
        self as Effect.Effect<R, E, Option.Option<A | A2>>,
        (option) => pipe(option, Option.map(core.succeed), Option.getOrElse(() => restore(orElse)()))
      ).traced(trace)
)

/* @internal */
export const someOrFail = Debug.dualWithTrace<
  <E2>(orFail: LazyArg<E2>) => <R, E, A>(self: Effect.Effect<R, E, Option.Option<A>>) => Effect.Effect<R, E | E2, A>,
  <R, E, A, E2>(self: Effect.Effect<R, E, Option.Option<A>>, orFail: LazyArg<E2>) => Effect.Effect<R, E | E2, A>
>(2, (trace, restore) =>
  (self, orFail) =>
    core.flatMap(self, (option) => {
      switch (option._tag) {
        case "None": {
          return core.flatMap(core.sync(restore(orFail)), core.fail)
        }
        case "Some": {
          return core.succeed(option.value)
        }
      }
    }).traced(trace))

/* @internal */
export const someOrFailException = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    self: Effect.Effect<R, E, Option.Option<A>>
  ): Effect.Effect<R, E | Cause.NoSuchElementException, A> =>
    someOrFail(self, () => internalCause.NoSuchElementException()).traced(trace)
)

/* @internal */
export const succeedLeft = Debug.methodWithTrace((trace) =>
  <A>(value: A): Effect.Effect<never, never, Either.Either<A, never>> => core.succeed(Either.left(value)).traced(trace)
)

/* @internal */
export const succeedNone = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, Option.Option<never>> => core.succeed(Option.none()).traced(trace)
)

/* @internal */
export const succeedRight = Debug.methodWithTrace((trace) =>
  <A>(value: A): Effect.Effect<never, never, Either.Either<never, A>> => core.succeed(Either.right(value)).traced(trace)
)

/* @internal */
export const succeedSome = Debug.methodWithTrace((trace) =>
  <A>(value: A): Effect.Effect<never, never, Option.Option<A>> => core.succeed(Option.some(value)).traced(trace)
)

/* @internal */
export const summarized = Debug.dualWithTrace<
  <R2, E2, B, C>(
    summary: Effect.Effect<R2, E2, B>,
    f: (start: B, end: B) => C
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, readonly [C, A]>,
  <R, E, A, R2, E2, B, C>(
    self: Effect.Effect<R, E, A>,
    summary: Effect.Effect<R2, E2, B>,
    f: (start: B, end: B) => C
  ) => Effect.Effect<R | R2, E | E2, readonly [C, A]>
>(
  3,
  (trace, restore) =>
    (self, summary, f) =>
      core.flatMap(
        summary,
        (start) => core.flatMap(self, (value) => core.map(summary, (end) => [restore(f)(start, end), value] as const))
      ).traced(trace)
)

/* @internal */
export const suspend = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(
    evaluate: LazyArg<Effect.Effect<R, E, A>>
  ): Effect.Effect<R, unknown, A> => core.flatMap(attempt(restore(evaluate)), identity).traced(trace)
)

/* @internal */
export const tagged = Debug.dualWithTrace<
  (key: string, value: string) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, key: string, value: string) => Effect.Effect<R, E, A>
>(3, (trace) => (self, key, value) => taggedWithLabels(self, [metricLabel.make(key, value)]).traced(trace))

/* @internal */
export const taggedWithLabels = Debug.dualWithTrace<
  (labels: Iterable<MetricLabel.MetricLabel>) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, labels: Iterable<MetricLabel.MetricLabel>) => Effect.Effect<R, E, A>
>(2, (trace) => (self, labels) => taggedWithLabelSet(self, HashSet.fromIterable(labels)).traced(trace))

/* @internal */
export const taggedWithLabelSet = Debug.dualWithTrace<
  (labels: HashSet.HashSet<MetricLabel.MetricLabel>) => <R, E, A>(
    self: Effect.Effect<R, E, A>
  ) => Effect.Effect<R, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, labels: HashSet.HashSet<MetricLabel.MetricLabel>) => Effect.Effect<R, E, A>
>(2, (trace) =>
  (self, labels) =>
    pipe(
      self,
      core.fiberRefLocallyWith(core.currentTags, (set) => pipe(set, HashSet.union(labels)))
    ).traced(trace))

/* @internal */
export const takeWhile = Debug.dualWithTrace<
  <R, E, A>(
    predicate: (a: A) => Effect.Effect<R, E, boolean>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<A>>,
  <R, E, A>(
    elements: Iterable<A>,
    predicate: (a: A) => Effect.Effect<R, E, boolean>
  ) => Effect.Effect<R, E, Chunk.Chunk<A>>
>(
  2,
  (trace, restore) =>
    <R, E, A>(elements: Iterable<A>, predicate: (a: A) => Effect.Effect<R, E, boolean>) =>
      core.suspendSucceed(() => {
        const iterator = elements[Symbol.iterator]()
        const builder: Array<A> = []
        let next: IteratorResult<A, any>
        let taking: Effect.Effect<R, E, boolean> = core.succeed(true)
        while ((next = iterator.next()) && !next.done) {
          const a = next.value
          taking = core.flatMap(taking, (taking) =>
            pipe(
              taking ? restore(predicate)(a) : core.succeed(false),
              core.map((bool) => {
                if (bool) {
                  builder.push(a)
                }
                return bool
              })
            ))
        }
        return core.map(taking, () => Chunk.unsafeFromArray(builder))
      }).traced(trace)
)

/* @internal */
export const tapBoth = Debug.dualWithTrace<
  <E, A, R2, E2, X, R3, E3, X1>(
    f: (e: E) => Effect.Effect<R2, E2, X>,
    g: (a: A) => Effect.Effect<R3, E3, X1>
  ) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2 | R3, E | E2 | E3, A>,
  <R, E, A, R2, E2, X, R3, E3, X1>(
    self: Effect.Effect<R, E, A>,
    f: (e: E) => Effect.Effect<R2, E2, X>,
    g: (a: A) => Effect.Effect<R3, E3, X1>
  ) => Effect.Effect<R | R2 | R3, E | E2 | E3, A>
>(3, (trace, restore) =>
  (self, f, g) =>
    core.matchCauseEffect(
      self,
      (cause) => {
        const either = internalCause.failureOrCause(cause)
        switch (either._tag) {
          case "Left": {
            return core.zipRight(restore(f)(either.left), core.failCause(cause))
          }
          case "Right": {
            return core.failCause(cause)
          }
        }
      },
      (a) => core.as(restore(g)(a), a)
    ).traced(trace))

/* @internal */
export const tapDefect = Debug.dualWithTrace<
  <R2, E2, X>(
    f: (cause: Cause.Cause<never>) => Effect.Effect<R2, E2, X>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A>,
  <R, E, A, R2, E2, X>(
    self: Effect.Effect<R, E, A>,
    f: (cause: Cause.Cause<never>) => Effect.Effect<R2, E2, X>
  ) => Effect.Effect<R | R2, E | E2, A>
>(2, (trace, restore) =>
  (self, f) =>
    core.catchAllCause(self, (cause) =>
      pipe(
        internalCause.keepDefects(cause),
        Option.match(
          () => core.failCause(cause),
          (a) => core.zipRight(restore(f)(a), core.failCause(cause))
        )
      )).traced(trace))

/* @internal */
export const tapEither = Debug.dualWithTrace<
  <E, A, R2, E2, X>(
    f: (either: Either.Either<E, A>) => Effect.Effect<R2, E2, X>
  ) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A>,
  <R, E, A, R2, E2, X>(
    self: Effect.Effect<R, E, A>,
    f: (either: Either.Either<E, A>) => Effect.Effect<R2, E2, X>
  ) => Effect.Effect<R | R2, E | E2, A>
>(2, (trace, restore) =>
  (self, f) =>
    core.matchCauseEffect(
      self,
      (cause) => {
        const either = internalCause.failureOrCause(cause)
        switch (either._tag) {
          case "Left": {
            return core.zipRight(restore(f)(either), core.failCause(cause))
          }
          case "Right": {
            return core.failCause(cause)
          }
        }
      },
      (a) => core.as(restore(f)(Either.right(a)), a)
    ).traced(trace))

/* @internal */
export const tapError = Debug.dualWithTrace<
  <E, R2, E2, X>(
    f: (e: E) => Effect.Effect<R2, E2, X>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A>,
  <R, E, A, R2, E2, X>(
    self: Effect.Effect<R, E, A>,
    f: (e: E) => Effect.Effect<R2, E2, X>
  ) => Effect.Effect<R | R2, E | E2, A>
>(2, (trace, restore) =>
  (self, f) =>
    core.matchCauseEffect(
      self,
      (cause) => {
        const either = internalCause.failureOrCause(cause)
        switch (either._tag) {
          case "Left": {
            return core.zipRight(restore(f)(either.left), core.failCause(cause))
          }
          case "Right": {
            return core.failCause(cause)
          }
        }
      },
      core.succeed
    ).traced(trace))

/* @internal */
export const tapErrorCause = Debug.dualWithTrace<
  <E, R2, E2, X>(
    f: (cause: Cause.Cause<E>) => Effect.Effect<R2, E2, X>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A>,
  <R, E, A, R2, E2, X>(
    self: Effect.Effect<R, E, A>,
    f: (cause: Cause.Cause<E>) => Effect.Effect<R2, E2, X>
  ) => Effect.Effect<R | R2, E | E2, A>
>(2, (trace, restore) =>
  (self, f) =>
    core.matchCauseEffect(
      self,
      (cause) => core.zipRight(restore(f)(cause), core.failCause(cause)),
      core.succeed
    ).traced(trace))

/* @internal */
export const tapSome = Debug.dualWithTrace<
  <A, R1, E1, X>(
    pf: (a: A) => Option.Option<Effect.Effect<R1, E1, X>>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R1, E | E1, A>,
  <R, E, A, R1, E1, X>(
    self: Effect.Effect<R, E, A>,
    pf: (a: A) => Option.Option<Effect.Effect<R1, E1, X>>
  ) => Effect.Effect<R | R1, E | E1, A>
>(2, (trace, restore) =>
  (self, pf) =>
    core.tap(self, (a) =>
      pipe(
        restore(pf)(a),
        Option.map(core.asUnit),
        Option.getOrElse(() => core.unit())
      )).traced(trace))

/* @internal */
export const timed = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    self: Effect.Effect<R, E, A>
  ): Effect.Effect<R, E, readonly [Duration.Duration, A]> => timedWith(self, Clock.currentTimeMillis()).traced(trace)
)

/* @internal */
export const timedWith = Debug.dualWithTrace<
  <R1, E1>(
    milliseconds: Effect.Effect<R1, E1, number>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R1, E | E1, readonly [Duration.Duration, A]>,
  <R, E, A, R1, E1>(
    self: Effect.Effect<R, E, A>,
    milliseconds: Effect.Effect<R1, E1, number>
  ) => Effect.Effect<R | R1, E | E1, readonly [Duration.Duration, A]>
>(
  2,
  (trace) =>
    (self, milliseconds) => summarized(self, milliseconds, (start, end) => Duration.millis(end - start)).traced(trace)
)

/* @internal */
export const tryCatch = Debug.methodWithTrace((trace, restore) =>
  <E, A>(
    attempt: LazyArg<A>,
    onThrow: (u: unknown) => E
  ): Effect.Effect<never, E, A> =>
    core.sync(() => {
      try {
        return restore(attempt)()
      } catch (error) {
        throw core.makeEffectError(internalCause.fail(restore(onThrow)(error)))
      }
    }).traced(trace)
)

/* @internal */
export const tryCatchPromise = Debug.methodWithTrace((trace, restore) =>
  <E, A>(
    evaluate: LazyArg<Promise<A>>,
    onReject: (reason: unknown) => E
  ): Effect.Effect<never, E, A> =>
    dieOnSync(core.flatMap(tryCatch(restore(evaluate), restore(onReject)), (promise) =>
      core.async<never, E, A>((resolve) => {
        promise
          .then((a) => resolve(core.exitSucceed(a)))
          .catch((e) => resolve(core.exitFail(restore(onReject)(e))))
      }))).traced(trace)
)

/* @internal */
export const tryCatchPromiseInterrupt = Debug.methodWithTrace((trace, restore) =>
  <E, A>(
    evaluate: (signal: AbortSignal) => Promise<A>,
    onReject: (reason: unknown) => E
  ): Effect.Effect<never, E, A> =>
    dieOnSync(core.suspendSucceed(() => {
      const controller = new AbortController()
      return pipe(
        tryCatch(() => restore(evaluate)(controller.signal), restore(onReject)),
        core.flatMap((promise) =>
          core.async<never, E, A>((resolve) => {
            promise
              .then((a) => resolve(core.exitSucceed(a)))
              .catch((e) => resolve(core.exitFail(restore(onReject)(e))))
          })
        )
      )
    })).traced(trace)
)

/* @internal */
export const tryPromise = Debug.methodWithTrace((trace, restore) =>
  <A>(evaluate: LazyArg<Promise<A>>): Effect.Effect<never, unknown, A> =>
    dieOnSync(core.flatMap(restore(attempt)(evaluate), (promise) =>
      core.async<never, unknown, A>((resolve) => {
        promise
          .then((a) => resolve(core.exitSucceed(a)))
          .catch((e) => resolve(core.exitFail(e)))
      }))).traced(trace)
)

/* @internal */
export const tryPromiseInterrupt = Debug.methodWithTrace((trace, restore) =>
  <A>(evaluate: (signal: AbortSignal) => Promise<A>): Effect.Effect<never, unknown, A> =>
    dieOnSync(core.flatMap(
      attempt(() => {
        const controller = new AbortController()
        return [controller, restore(evaluate)(controller.signal)] as const
      }),
      ([controller, promise]) =>
        core.asyncInterruptEither<never, unknown, A>((resolve) => {
          promise
            .then((a) => resolve(core.exitSucceed(a)))
            .catch((e) => resolve(core.exitFail(e)))
          return Either.left(core.sync(() => controller.abort()))
        })
    )).traced(trace)
)

/* @internal */
export const all = Debug.methodWithTrace((trace): {
  <R, E, A, T extends ReadonlyArray<Effect.Effect<any, any, any>>>(
    self: Effect.Effect<R, E, A>,
    ...args: T
  ): Effect.Effect<
    R | T["length"] extends 0 ? never
      : [T[number]] extends [{ [Effect.EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    E | T["length"] extends 0 ? never
      : [T[number]] extends [{ [Effect.EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    readonly [
      A,
      ...(T["length"] extends 0 ? []
        : Readonly<{ [K in keyof T]: [T[K]] extends [Effect.Effect<any, any, infer A>] ? A : never }>)
    ]
  >
  <T extends ReadonlyArray<Effect.Effect<any, any, any>>>(
    args: [...T]
  ): Effect.Effect<
    T[number] extends never ? never
      : [T[number]] extends [{ [Effect.EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    T[number] extends never ? never
      : [T[number]] extends [{ [Effect.EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    T[number] extends never ? []
      : Readonly<{ [K in keyof T]: [T[K]] extends [Effect.Effect<any, any, infer A>] ? A : never }>
  >
  <T extends Readonly<{ [K: string]: Effect.Effect<any, any, any> }>>(
    args: T
  ): Effect.Effect<
    keyof T extends never ? never
      : [T[keyof T]] extends [{ [Effect.EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    keyof T extends never ? never
      : [T[keyof T]] extends [{ [Effect.EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    Readonly<{ [K in keyof T]: [T[K]] extends [Effect.Effect<any, any, infer A>] ? A : never }>
  >
} =>
  function() {
    if (arguments.length === 1) {
      if (core.isEffect(arguments[0])) {
        return core.map(arguments[0], (x) => [x])
      } else if (Array.isArray(arguments[0])) {
        return core.map(collectAll(arguments[0]), Chunk.toReadonlyArray).traced(trace)
      } else {
        return pipe(
          core.forEach(
            Object.entries(arguments[0] as Readonly<{ [K: string]: Effect.Effect<any, any, any> }>),
            ([_, e]) => core.map(e, (a) => [_, a] as const)
          ),
          core.map((values) => {
            const res = {}
            for (const [k, v] of values) {
              res[k] = v
            }
            return res
          })
        ).traced(trace) as any
      }
    }
    return core.map(collectAll(arguments), Chunk.toReadonlyArray).traced(trace)
  }
)

/* @internal */
export const uncause = Debug.methodWithTrace((trace) =>
  <R, E>(
    self: Effect.Effect<R, never, Cause.Cause<E>>
  ): Effect.Effect<R, E, void> =>
    core.flatMap(self, (cause) =>
      internalCause.isEmpty(cause) ?
        core.unit() :
        core.failCause(cause)).traced(trace)
)

/* @internal */
export const unfold = Debug.methodWithTrace((trace, restore) =>
  <A, R, E, S>(
    s: S,
    f: (s: S) => Effect.Effect<R, E, Option.Option<readonly [A, S]>>
  ): Effect.Effect<R, E, Chunk.Chunk<A>> =>
    core.map(unfoldLoop(s, restore(f), Chunk.empty()), Chunk.reverse).traced(trace)
)

/* @internal */
const unfoldLoop = <A, R, E, S>(
  s: S,
  f: (s: S) => Effect.Effect<R, E, Option.Option<readonly [A, S]>>,
  builder: Chunk.Chunk<A>
): Effect.Effect<R, E, Chunk.Chunk<A>> =>
  core.flatMap(f(s), (option) => {
    if (Option.isSome(option)) {
      return unfoldLoop(option.value[1], f, pipe(builder, Chunk.prepend(option.value[0])))
    } else {
      return core.succeed(builder)
    }
  })

/* @internal */
export const unleft = Debug.methodWithTrace((trace) =>
  <R, E, B, A>(self: Effect.Effect<R, Either.Either<E, B>, A>): Effect.Effect<R, E, Either.Either<A, B>> =>
    core.matchEffect(
      self,
      (either) => {
        switch (either._tag) {
          case "Left": {
            return core.fail(either.left)
          }
          case "Right": {
            return core.succeed(either)
          }
        }
      },
      (a) => core.succeed(Either.left(a))
    ).traced(trace)
)

/* @internal */
export const unless = Debug.dualWithTrace<
  (predicate: LazyArg<boolean>) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, Option.Option<A>>,
  <R, E, A>(self: Effect.Effect<R, E, A>, predicate: LazyArg<boolean>) => Effect.Effect<R, E, Option.Option<A>>
>(2, (trace, restore) =>
  (self, predicate) =>
    core.suspendSucceed(() =>
      restore(predicate)() ?
        succeedNone() :
        asSome(self)
    ).traced(trace))

/* @internal */
export const unlessEffect = Debug.dualWithTrace<
  <R2, E2>(
    predicate: Effect.Effect<R2, E2, boolean>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, Option.Option<A>>,
  <R, E, A, R2, E2>(
    self: Effect.Effect<R, E, A>,
    predicate: Effect.Effect<R2, E2, boolean>
  ) => Effect.Effect<R | R2, E | E2, Option.Option<A>>
>(2, (trace) => (self, predicate) => core.flatMap(predicate, (b) => (b ? succeedNone() : asSome(self))).traced(trace))

/* @internal */
export const unrefine = Debug.dualWithTrace<
  <E1>(pf: (u: unknown) => Option.Option<E1>) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E | E1, A>,
  <R, E, A, E1>(self: Effect.Effect<R, E, A>, pf: (u: unknown) => Option.Option<E1>) => Effect.Effect<R, E | E1, A>
>(2, (trace, restore) => (self, pf) => unrefineWith(self, restore(pf), identity).traced(trace))

/* @internal */
export const unrefineWith = Debug.dualWithTrace<
  <E, E1, E2>(
    pf: (u: unknown) => Option.Option<E1>,
    f: (e: E) => E2
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E1 | E2, A>,
  <R, E, A, E1, E2>(
    self: Effect.Effect<R, E, A>,
    pf: (u: unknown) => Option.Option<E1>,
    f: (e: E) => E2
  ) => Effect.Effect<R, E1 | E2, A>
>(3, (trace, restore) =>
  <R, E, A, E1, E2>(
    self: Effect.Effect<R, E, A>,
    pf: (u: unknown) => Option.Option<E1>,
    f: (e: E) => E2
  ) =>
    core.catchAllCause(
      self,
      (cause): Effect.Effect<R, E1 | E2, A> => {
        const option = pipe(
          cause,
          internalCause.find((cause) =>
            internalCause.isDieType(cause) ?
              restore(pf)(cause.defect) :
              Option.none()
          )
        )
        switch (option._tag) {
          case "None": {
            return core.failCause(pipe(cause, internalCause.map(restore(f))))
          }
          case "Some": {
            return core.fail(option.value)
          }
        }
      }
    ).traced(trace))

/* @internal */
export const unright = Debug.methodWithTrace((trace) =>
  <R, B, E, A>(
    self: Effect.Effect<R, Either.Either<B, E>, A>
  ): Effect.Effect<R, E, Either.Either<B, A>> =>
    core.matchEffect(
      self,
      (either) => {
        switch (either._tag) {
          case "Left": {
            return core.succeed(Either.left(either.left))
          }
          case "Right": {
            return core.fail(either.right)
          }
        }
      },
      (a) => core.succeed(Either.right(a))
    ).traced(trace)
)

/* @internal */
export const unsandbox = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, Cause.Cause<E>, A>) => mapErrorCause(self, internalCause.flatten).traced(trace)
)

/* @internal */
export const updateFiberRefs = Debug.methodWithTrace((trace, restore) =>
  (
    f: (fiberId: FiberId.Runtime, fiberRefs: FiberRefs.FiberRefs) => FiberRefs.FiberRefs
  ): Effect.Effect<never, never, void> =>
    core.withFiberRuntime<never, never, void>((state) => {
      state.setFiberRefs(restore(f)(state.id(), state.unsafeGetFiberRefs()))
      return core.unit()
    }).traced(trace)
)

/* @internal */
export const updateService = Debug.dualWithTrace<
  <T extends Context.Tag<any>>(
    tag: T,
    f: (service: Context.Tag.Service<T>) => Context.Tag.Service<T>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | Context.Tag.Service<T>, E, A>,
  <R, E, A, T extends Context.Tag<any>>(
    self: Effect.Effect<R, E, A>,
    tag: T,
    f: (service: Context.Tag.Service<T>) => Context.Tag.Service<T>
  ) => Effect.Effect<R | Context.Tag.Service<T>, E, A>
>(3, (trace, restore) =>
  <R, E, A, T extends Context.Tag<any>>(
    self: Effect.Effect<R, E, A>,
    tag: T,
    f: (service: Context.Tag.Service<T>) => Context.Tag.Service<T>
  ) =>
    core.contramapContext(self, (context) =>
      pipe(
        context,
        Context.add(tag, restore(f)(Context.unsafeGet(context, tag)))
      )).traced(trace) as Effect.Effect<R | Context.Tag.Service<T>, E, A>)

/* @internal */
export const validate = Debug.dualWithTrace<
  <R2, E2, B>(
    that: Effect.Effect<R2, E2, B>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, readonly [A, B]>,
  <R, E, A, R2, E2, B>(
    self: Effect.Effect<R, E, A>,
    that: Effect.Effect<R2, E2, B>
  ) => Effect.Effect<R | R2, E | E2, readonly [A, B]>
>(2, (trace) => (self, that) => validateWith(self, that, (a, b) => [a, b] as const).traced(trace))

/* @internal */
export const validateAll = Debug.dualWithTrace<
  <R, E, A, B>(
    f: (a: A) => Effect.Effect<R, E, B>
  ) => (elements: Iterable<A>) => Effect.Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>,
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect.Effect<R, E, B>
  ) => Effect.Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>
>(2, (trace, restore) =>
  (elements, f) =>
    core.flatMap(partition(elements, restore(f)), ([es, bs]) =>
      Chunk.isEmpty(es)
        ? core.succeed(bs)
        : core.fail(es)).traced(trace))

/* @internal */
export const validateAllDiscard = Debug.dualWithTrace<
  <R, E, A, X>(
    f: (a: A) => Effect.Effect<R, E, X>
  ) => (elements: Iterable<A>) => Effect.Effect<R, Chunk.Chunk<E>, void>,
  <R, E, A, X>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, X>) => Effect.Effect<R, Chunk.Chunk<E>, void>
>(2, (trace, restore) =>
  (elements, f) =>
    core.flatMap(partition(elements, restore(f)), ([es, _]) =>
      Chunk.isEmpty(es) ?
        core.unit() :
        core.fail(es)).traced(trace))

/* @internal */
export const validateFirst = Debug.dualWithTrace<
  <R, E, A, B>(f: (a: A) => Effect.Effect<R, E, B>) => (elements: Iterable<A>) => Effect.Effect<R, Chunk.Chunk<E>, B>,
  <R, E, A, B>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, B>) => Effect.Effect<R, Chunk.Chunk<E>, B>
>(
  2,
  (trace, restore) => (elements, f) => core.flip(core.forEach(elements, (a) => core.flip(restore(f)(a)))).traced(trace)
)

/* @internal */
export const validateWith = Debug.dualWithTrace<
  <A, R2, E2, B, C>(
    that: Effect.Effect<R2, E2, B>,
    f: (a: A, b: B) => C
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, C>,
  <R, E, A, R2, E2, B, C>(
    self: Effect.Effect<R, E, A>,
    that: Effect.Effect<R2, E2, B>,
    f: (a: A, b: B) => C
  ) => Effect.Effect<R | R2, E | E2, C>
>(3, (trace, restore) =>
  (self, that, f) =>
    core.flatten(core.zipWith(
      core.exit(self),
      core.exit(that),
      (ea, eb) => pipe(ea, core.exitZipWith(eb, restore(f), (ca, cb) => internalCause.sequential(ca, cb)))
    )).traced(trace))

/* @internal */
export const when = Debug.dualWithTrace<
  (predicate: LazyArg<boolean>) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, Option.Option<A>>,
  <R, E, A>(self: Effect.Effect<R, E, A>, predicate: LazyArg<boolean>) => Effect.Effect<R, E, Option.Option<A>>
>(2, (trace, restore) =>
  (self, predicate) =>
    core.suspendSucceed(() =>
      restore(predicate)() ?
        core.map(self, Option.some) :
        core.succeed(Option.none())
    ).traced(trace))

/* @internal */
export const whenCase = Debug.methodWithTrace((trace, restore) =>
  <R, E, A, B>(
    evaluate: LazyArg<A>,
    pf: (a: A) => Option.Option<Effect.Effect<R, E, B>>
  ): Effect.Effect<R, E, Option.Option<B>> =>
    core.flatMap(core.sync(restore(evaluate)), (a) =>
      pipe(
        restore(pf)(a),
        Option.map(asSome),
        Option.getOrElse(() => succeedNone())
      )).traced(trace)
)

/* @internal */
export const whenCaseEffect = Debug.dualWithTrace<
  <A, R2, E2, A2>(
    pf: (a: A) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => <R, E>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, Option.Option<A2>>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    pf: (a: A) => Option.Option<Effect.Effect<R2, E2, A2>>
  ) => Effect.Effect<R | R2, E | E2, Option.Option<A2>>
>(2, (trace, restore) => (self, pf) => core.flatMap(self, (a) => whenCase(() => a, restore(pf))).traced(trace))

/* @internal */
export const whenFiberRef = Debug.dualWithTrace<
  <S>(
    fiberRef: FiberRef.FiberRef<S>,
    predicate: Predicate<S>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, readonly [S, Option.Option<A>]>,
  <R, E, A, S>(
    self: Effect.Effect<R, E, A>,
    fiberRef: FiberRef.FiberRef<S>,
    predicate: Predicate<S>
  ) => Effect.Effect<R, E, readonly [S, Option.Option<A>]>
>(
  3,
  (trace, restore) =>
    <R, E, A, S>(self: Effect.Effect<R, E, A>, fiberRef: FiberRef.FiberRef<S>, predicate: Predicate<S>) =>
      core.flatMap(core.fiberRefGet(fiberRef), (s) =>
        restore(predicate)(s) ?
          core.map(self, (a) => [s, Option.some(a)] as const) :
          core.succeed<readonly [S, Option.Option<A>]>([s, Option.none()])).traced(trace)
)

/* @internal */
export const whenRef = Debug.dualWithTrace<
  <S>(
    ref: Ref.Ref<S>,
    predicate: Predicate<S>
  ) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, readonly [S, Option.Option<A>]>,
  <R, E, A, S>(
    self: Effect.Effect<R, E, A>,
    ref: Ref.Ref<S>,
    predicate: Predicate<S>
  ) => Effect.Effect<R, E, readonly [S, Option.Option<A>]>
>(
  3,
  (trace, restore) =>
    <R, E, A, S>(self: Effect.Effect<R, E, A>, ref: Ref.Ref<S>, predicate: Predicate<S>) =>
      core.flatMap(Ref.get(ref), (s) =>
        restore(predicate)(s) ?
          core.map(self, (a) => [s, Option.some(a)] as const) :
          core.succeed<readonly [S, Option.Option<A>]>([s, Option.none()])).traced(trace)
)

/* @internal */
export const withMetric = Debug.dualWithTrace<
  <Type, In, Out>(
    metric: Metric.Metric<Type, In, Out>
  ) => <R, E, A extends In>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A extends In, Type, In, Out>(
    self: Effect.Effect<R, E, A>,
    metric: Metric.Metric<Type, In, Out>
  ) => Effect.Effect<R, E, A>
>(2, (trace) => (self, metric) => metric(self).traced(trace))
