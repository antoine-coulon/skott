import { pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as _ref from "@effect/io/internal_effect_untraced/ref"
import type * as Synchronized from "@effect/io/Ref/Synchronized"

/** @internal */
export const getAndUpdateEffect = Debug.dualWithTrace<
  <A, R, E>(f: (a: A) => Effect.Effect<R, E, A>) => (self: Synchronized.Synchronized<A>) => Effect.Effect<R, E, A>,
  <A, R, E>(self: Synchronized.Synchronized<A>, f: (a: A) => Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
>(2, (trace, restore) =>
  (self, f) =>
    self.modifyEffect(
      (value) => core.map(restore(f)(value), (result) => [value, result] as const)
    ).traced(trace))

/** @internal */
export const getAndUpdateSomeEffect = Debug.dualWithTrace<
  <A, R, E>(
    pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>
  ) => (self: Synchronized.Synchronized<A>) => Effect.Effect<R, E, A>,
  <A, R, E>(
    self: Synchronized.Synchronized<A>,
    pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>
  ) => Effect.Effect<R, E, A>
>(2, (trace, restore) =>
  (self, pf) =>
    self.modifyEffect((value) => {
      const result = restore(pf)(value)
      switch (result._tag) {
        case "None": {
          return core.succeed([value, value] as const)
        }
        case "Some": {
          return core.map(result.value, (newValue) => [value, newValue] as const)
        }
      }
    }).traced(trace))

/** @internal */
export const modify = Debug.dualWithTrace<
  <A, B>(f: (a: A) => readonly [B, A]) => (self: Synchronized.Synchronized<A>) => Effect.Effect<never, never, B>,
  <A, B>(self: Synchronized.Synchronized<A>, f: (a: A) => readonly [B, A]) => Effect.Effect<never, never, B>
>(2, (trace, restore) => (self, f) => self.modify(restore(f)).traced(trace))

/** @internal */
export const modifyEffect = Debug.dualWithTrace<
  <A, R, E, B>(
    f: (a: A) => Effect.Effect<R, E, readonly [B, A]>
  ) => (self: Synchronized.Synchronized<A>) => Effect.Effect<R, E, B>,
  <A, R, E, B>(
    self: Synchronized.Synchronized<A>,
    f: (a: A) => Effect.Effect<R, E, readonly [B, A]>
  ) => Effect.Effect<R, E, B>
>(2, (trace, restore) => (self, f) => self.modifyEffect(restore(f)).traced(trace))

/** @internal */
export const modifySomeEffect = Debug.dualWithTrace<
  <A, B, R, E>(
    fallback: B,
    pf: (a: A) => Option.Option<Effect.Effect<R, E, readonly [B, A]>>
  ) => (self: Synchronized.Synchronized<A>) => Effect.Effect<R, E, B>,
  <A, B, R, E>(
    self: Synchronized.Synchronized<A>,
    fallback: B,
    pf: (a: A) => Option.Option<Effect.Effect<R, E, readonly [B, A]>>
  ) => Effect.Effect<R, E, B>
>(3, (trace, restore) =>
  (self, fallback, pf) =>
    self.modifyEffect(
      (value) => pipe(restore(pf)(value), Option.getOrElse(() => core.succeed([fallback, value] as const)))
    ).traced(trace))

/** @internal */
export const updateEffect = Debug.dualWithTrace<
  <A, R, E>(f: (a: A) => Effect.Effect<R, E, A>) => (self: Synchronized.Synchronized<A>) => Effect.Effect<R, E, void>,
  <A, R, E>(self: Synchronized.Synchronized<A>, f: (a: A) => Effect.Effect<R, E, A>) => Effect.Effect<R, E, void>
>(2, (trace, restore) =>
  (self, f) =>
    self.modifyEffect((value) =>
      core.map(
        restore(f)(value),
        (result) => [undefined as void, result] as const
      )
    ).traced(trace))

/** @internal */
export const updateAndGetEffect = Debug.dualWithTrace<
  <A, R, E>(f: (a: A) => Effect.Effect<R, E, A>) => (self: Synchronized.Synchronized<A>) => Effect.Effect<R, E, A>,
  <A, R, E>(self: Synchronized.Synchronized<A>, f: (a: A) => Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
>(2, (trace, restore) =>
  (self, f) =>
    self.modifyEffect(
      (value) => core.map(restore(f)(value), (result) => [result, result] as const)
    ).traced(trace))

/** @internal */
export const updateSomeEffect = Debug.dualWithTrace<
  <A, R, E>(
    pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>
  ) => (self: Synchronized.Synchronized<A>) => Effect.Effect<R, E, void>,
  <A, R, E>(
    self: Synchronized.Synchronized<A>,
    pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>
  ) => Effect.Effect<R, E, void>
>(2, (trace, restore) =>
  (self, pf) =>
    self.modifyEffect((value) => {
      const result = restore(pf)(value)
      switch (result._tag) {
        case "None": {
          return core.succeed([void 0, value] as const)
        }
        case "Some": {
          return core.map(result.value, (a) => [void 0, a] as const)
        }
      }
    }).traced(trace))
