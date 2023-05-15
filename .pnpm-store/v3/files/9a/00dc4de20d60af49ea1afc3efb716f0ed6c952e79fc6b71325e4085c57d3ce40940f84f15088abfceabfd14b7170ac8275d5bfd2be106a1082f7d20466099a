/**
 * @since 1.0.0
 */
import type * as Option from "@effect/data/Option"
import type * as Effect from "@effect/io/Effect"
import * as circular from "@effect/io/internal_effect_untraced/effect/circular"
import * as ref from "@effect/io/internal_effect_untraced/ref"
import * as internal from "@effect/io/internal_effect_untraced/synchronizedRef"
import type * as Ref from "@effect/io/Ref"

/**
 * @since 1.0.0
 * @category symbols
 */
export const SynchronizedTypeId: unique symbol = circular.SynchronizedTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type SynchronizedTypeId = typeof SynchronizedTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface Synchronized<A> extends Synchronized.Variance<A>, Ref.Ref<A> {
  modifyEffect<R, E, B>(f: (a: A) => Effect.Effect<R, E, readonly [B, A]>): Effect.Effect<R, E, B>
}

/**
 * @since 1.0.0
 */
export declare namespace Synchronized {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Variance<A> {
    readonly [SynchronizedTypeId]: {
      readonly _A: (_: never) => A
    }
  }
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: <A>(value: A) => Effect.Effect<never, never, Synchronized<A>> = circular.makeSynchronized

/**
 * @since 1.0.0
 * @category getters
 */
export const get: <A>(self: Synchronized<A>) => Effect.Effect<never, never, A> = ref.get

/**
 * @since 1.0.0
 * @category mutations
 */
export const getAndSet: {
  <A>(value: A): (self: Ref.Ref<A>) => Effect.Effect<never, never, A>
  <A>(self: Ref.Ref<A>, value: A): Effect.Effect<never, never, A>
} = ref.getAndSet

/**
 * @since 1.0.0
 * @category mutations
 */
export const getAndUpdate: {
  <A>(f: (a: A) => A): (self: Ref.Ref<A>) => Effect.Effect<never, never, A>
  <A>(self: Ref.Ref<A>, f: (a: A) => A): Effect.Effect<never, never, A>
} = ref.getAndUpdate

/**
 * @since 1.0.0
 * @category mutations
 */
export const getAndUpdateEffect: {
  <A, R, E>(f: (a: A) => Effect.Effect<R, E, A>): (self: Synchronized<A>) => Effect.Effect<R, E, A>
  <A, R, E>(self: Synchronized<A>, f: (a: A) => Effect.Effect<R, E, A>): Effect.Effect<R, E, A>
} = internal.getAndUpdateEffect

/**
 * @since 1.0.0
 * @category mutations
 */
export const getAndUpdateSome: {
  <A>(pf: (a: A) => Option.Option<A>): (self: Ref.Ref<A>) => Effect.Effect<never, never, A>
  <A>(self: Ref.Ref<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, A>
} = ref.getAndUpdateSome

/**
 * @since 1.0.0
 * @category mutations
 */
export const getAndUpdateSomeEffect: {
  <A, R, E>(pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>): (self: Synchronized<A>) => Effect.Effect<R, E, A>
  <A, R, E>(self: Synchronized<A>, pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>): Effect.Effect<R, E, A>
} = internal.getAndUpdateSomeEffect

/**
 * @since 1.0.0
 * @category mutations
 */
export const modify: {
  <A, B>(f: (a: A) => readonly [B, A]): (self: Synchronized<A>) => Effect.Effect<never, never, B>
  <A, B>(self: Synchronized<A>, f: (a: A) => readonly [B, A]): Effect.Effect<never, never, B>
} = internal.modify

/**
 * @since 1.0.0
 * @category mutations
 */
export const modifyEffect: {
  <A, R, E, B>(f: (a: A) => Effect.Effect<R, E, readonly [B, A]>): (self: Synchronized<A>) => Effect.Effect<R, E, B>
  <A, R, E, B>(self: Synchronized<A>, f: (a: A) => Effect.Effect<R, E, readonly [B, A]>): Effect.Effect<R, E, B>
} = internal.modifyEffect

/**
 * @since 1.0.0
 * @category mutations
 */
export const modifySome: {
  <B, A>(
    fallback: B,
    pf: (a: A) => Option.Option<readonly [B, A]>
  ): (self: Ref.Ref<A>) => Effect.Effect<never, never, B>
  <A, B>(
    self: Ref.Ref<A>,
    fallback: B,
    pf: (a: A) => Option.Option<readonly [B, A]>
  ): Effect.Effect<never, never, B>
} = ref.modifySome

/**
 * @since 1.0.0
 * @category mutations
 */
export const modifySomeEffect: {
  <A, B, R, E>(
    fallback: B,
    pf: (a: A) => Option.Option<Effect.Effect<R, E, readonly [B, A]>>
  ): (self: Synchronized<A>) => Effect.Effect<R, E, B>
  <A, B, R, E>(
    self: Synchronized<A>,
    fallback: B,
    pf: (a: A) => Option.Option<Effect.Effect<R, E, readonly [B, A]>>
  ): Effect.Effect<R, E, B>
} = internal.modifySomeEffect

/**
 * @since 1.0.0
 * @category mutations
 */
export const set: {
  <A>(value: A): (self: Ref.Ref<A>) => Effect.Effect<never, never, void>
  <A>(self: Ref.Ref<A>, value: A): Effect.Effect<never, never, void>
} = ref.set

/**
 * @since 1.0.0
 * @category mutations
 */
export const setAndGet: {
  <A>(value: A): (self: Ref.Ref<A>) => Effect.Effect<never, never, A>
  <A>(self: Ref.Ref<A>, value: A): Effect.Effect<never, never, A>
} = ref.setAndGet

/**
 * @since 1.0.0
 * @category mutations
 */
export const update: {
  <A>(f: (a: A) => A): (self: Ref.Ref<A>) => Effect.Effect<never, never, void>
  <A>(self: Ref.Ref<A>, f: (a: A) => A): Effect.Effect<never, never, void>
} = ref.update

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateEffect: {
  <A, R, E>(f: (a: A) => Effect.Effect<R, E, A>): (self: Synchronized<A>) => Effect.Effect<R, E, void>
  <A, R, E>(self: Synchronized<A>, f: (a: A) => Effect.Effect<R, E, A>): Effect.Effect<R, E, void>
} = internal.updateEffect

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateAndGet: {
  <A>(f: (a: A) => A): (self: Ref.Ref<A>) => Effect.Effect<never, never, A>
  <A>(self: Ref.Ref<A>, f: (a: A) => A): Effect.Effect<never, never, A>
} = ref.updateAndGet

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateAndGetEffect: {
  <A, R, E>(f: (a: A) => Effect.Effect<R, E, A>): (self: Synchronized<A>) => Effect.Effect<R, E, A>
  <A, R, E>(self: Synchronized<A>, f: (a: A) => Effect.Effect<R, E, A>): Effect.Effect<R, E, A>
} = internal.updateAndGetEffect

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateSome: {
  <A>(f: (a: A) => Option.Option<A>): (self: Ref.Ref<A>) => Effect.Effect<never, never, void>
  <A>(self: Ref.Ref<A>, f: (a: A) => Option.Option<A>): Effect.Effect<never, never, void>
} = ref.updateSome

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateSomeEffect: {
  <A, R, E>(pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>): (self: Synchronized<A>) => Effect.Effect<R, E, void>
  <A, R, E>(self: Synchronized<A>, pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>): Effect.Effect<R, E, void>
} = internal.updateSomeEffect

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateSomeAndGet: {
  <A>(pf: (a: A) => Option.Option<A>): (self: Ref.Ref<A>) => Effect.Effect<never, never, A>
  <A>(self: Ref.Ref<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, A>
} = ref.updateSomeAndGet

/**
 * @since 1.0.0
 * @category mutations
 */
export const updateSomeAndGetEffect: {
  <A, R, E>(pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>): (self: Synchronized<A>) => Effect.Effect<R, E, A>
  <A, R, E>(self: Synchronized<A>, pf: (a: A) => Option.Option<Effect.Effect<R, E, A>>): Effect.Effect<R, E, A>
} = circular.updateSomeAndGetEffectSynchronized

/**
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeMake: <A>(value: A) => Synchronized<A> = circular.unsafeMakeSynchronized
