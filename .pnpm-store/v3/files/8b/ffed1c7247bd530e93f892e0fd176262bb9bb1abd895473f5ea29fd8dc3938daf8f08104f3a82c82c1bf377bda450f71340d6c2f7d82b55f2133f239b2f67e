/**
 * @since 1.0.0
 */
import type * as Option from "@effect/data/Option";
import type * as Effect from "@effect/io/Effect";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const RefTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type RefTypeId = typeof RefTypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface Ref<A> extends Ref.Variance<A> {
    modify<B>(f: (a: A) => readonly [B, A]): Effect.Effect<never, never, B>;
}
/**
 * @since 1.0.0
 * @category models
 */
export declare namespace Ref {
    interface Variance<A> {
        readonly [RefTypeId]: {
            readonly _A: (_: never) => A;
        };
    }
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <A>(value: A) => Effect.Effect<never, never, Ref<A>>;
/**
 * @since 1.0.0
 * @category getters
 */
export declare const get: <A>(self: Ref<A>) => Effect.Effect<never, never, A>;
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const getAndSet: {
    <A>(value: A): (self: Ref<A>) => Effect.Effect<never, never, A>;
    <A>(self: Ref<A>, value: A): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const getAndUpdate: {
    <A>(f: (a: A) => A): (self: Ref<A>) => Effect.Effect<never, never, A>;
    <A>(self: Ref<A>, f: (a: A) => A): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const getAndUpdateSome: {
    <A>(pf: (a: A) => Option.Option<A>): (self: Ref<A>) => Effect.Effect<never, never, A>;
    <A>(self: Ref<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const modify: {
    <A, B>(f: (a: A) => readonly [B, A]): (self: Ref<A>) => Effect.Effect<never, never, B>;
    <A, B>(self: Ref<A>, f: (a: A) => readonly [B, A]): Effect.Effect<never, never, B>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const modifySome: {
    <B, A>(fallback: B, pf: (a: A) => Option.Option<readonly [B, A]>): (self: Ref<A>) => Effect.Effect<never, never, B>;
    <A, B>(self: Ref<A>, fallback: B, pf: (a: A) => Option.Option<readonly [B, A]>): Effect.Effect<never, never, B>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const set: {
    <A>(value: A): (self: Ref<A>) => Effect.Effect<never, never, void>;
    <A>(self: Ref<A>, value: A): Effect.Effect<never, never, void>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const setAndGet: {
    <A>(value: A): (self: Ref<A>) => Effect.Effect<never, never, A>;
    <A>(self: Ref<A>, value: A): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const update: {
    <A>(f: (a: A) => A): (self: Ref<A>) => Effect.Effect<never, never, void>;
    <A>(self: Ref<A>, f: (a: A) => A): Effect.Effect<never, never, void>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const updateAndGet: {
    <A>(f: (a: A) => A): (self: Ref<A>) => Effect.Effect<never, never, A>;
    <A>(self: Ref<A>, f: (a: A) => A): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const updateSome: {
    <A>(f: (a: A) => Option.Option<A>): (self: Ref<A>) => Effect.Effect<never, never, void>;
    <A>(self: Ref<A>, f: (a: A) => Option.Option<A>): Effect.Effect<never, never, void>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const updateSomeAndGet: {
    <A>(pf: (a: A) => Option.Option<A>): (self: Ref<A>) => Effect.Effect<never, never, A>;
    <A>(self: Ref<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category unsafe
 */
export declare const unsafeMake: <A>(value: A) => Ref<A>;
//# sourceMappingURL=Ref.d.ts.map