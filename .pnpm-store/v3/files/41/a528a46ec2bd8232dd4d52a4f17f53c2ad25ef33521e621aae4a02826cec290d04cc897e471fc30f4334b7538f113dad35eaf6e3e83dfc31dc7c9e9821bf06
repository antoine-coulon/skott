/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Context from "@effect/data/Context";
import type * as Differ from "@effect/data/Differ";
import type { LazyArg } from "@effect/data/Function";
import type * as HashMap from "@effect/data/HashMap";
import type * as HashSet from "@effect/data/HashSet";
import type * as Option from "@effect/data/Option";
import type * as Cause from "@effect/io/Cause";
import type * as Effect from "@effect/io/Effect";
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags";
import type * as Logger from "@effect/io/Logger";
import type * as LogLevel from "@effect/io/Logger/Level";
import type * as LogSpan from "@effect/io/Logger/Span";
import type * as MetricLabel from "@effect/io/Metric/Label";
import type * as Scheduler from "@effect/io/Scheduler";
import type * as Scope from "@effect/io/Scope";
import type * as Supervisor from "@effect/io/Supervisor";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const FiberRefTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type FiberRefTypeId = typeof FiberRefTypeId;
/**
 * @since 1.0.0
 * @category model
 */
export interface FiberRef<A> extends Variance<A> {
}
/**
 * @since 1.0.0
 * @category models
 */
export interface Variance<A> {
    readonly [FiberRefTypeId]: {
        readonly _A: (_: never) => A;
    };
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <A>(initial: A, fork?: (a: A) => A, join?: (left: A, right: A) => A) => Effect.Effect<Scope.Scope, never, FiberRef<A>>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const makeWith: <Value>(ref: LazyArg<FiberRef<Value>>) => Effect.Effect<Scope.Scope, never, FiberRef<Value>>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const makeContext: <A>(initial: Context.Context<A>) => Effect.Effect<Scope.Scope, never, FiberRef<Context.Context<A>>>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const makeRuntimeFlags: (initial: RuntimeFlags.RuntimeFlags) => Effect.Effect<Scope.Scope, never, FiberRef<RuntimeFlags.RuntimeFlags>>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const unsafeMake: <Value>(initial: Value, fork?: (a: Value) => Value, join?: (left: Value, right: Value) => Value) => FiberRef<Value>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const unsafeMakeHashSet: <A>(initial: HashSet.HashSet<A>) => FiberRef<HashSet.HashSet<A>>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const unsafeMakeContext: <A>(initial: Context.Context<A>) => FiberRef<Context.Context<A>>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const unsafeMakeSupervisor: (initial: Supervisor.Supervisor<any>) => FiberRef<Supervisor.Supervisor<any>>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const unsafeMakePatch: <Value, Patch>(initial: Value, differ: Differ.Differ<Value, Patch>, fork: Patch, join?: (oldV: Value, newV: Value) => Value) => FiberRef<Value>;
/**
 * @since 1.0.0
 * @category getters
 */
export declare const get: <A>(self: FiberRef<A>) => Effect.Effect<never, never, A>;
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const getAndSet: {
    <A>(value: A): (self: FiberRef<A>) => Effect.Effect<never, never, A>;
    <A>(self: FiberRef<A>, value: A): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const getAndUpdate: {
    <A>(f: (a: A) => A): (self: FiberRef<A>) => Effect.Effect<never, never, A>;
    <A>(self: FiberRef<A>, f: (a: A) => A): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const getAndUpdateSome: {
    <A>(pf: (a: A) => Option.Option<A>): (self: FiberRef<A>) => Effect.Effect<never, never, A>;
    <A>(self: FiberRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const getWith: {
    <A, R, E, B>(f: (a: A) => Effect.Effect<R, E, B>): (self: FiberRef<A>) => Effect.Effect<R, E, B>;
    <A, R, E, B>(self: FiberRef<A>, f: (a: A) => Effect.Effect<R, E, B>): Effect.Effect<R, E, B>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const set: {
    <A>(value: A): (self: FiberRef<A>) => Effect.Effect<never, never, void>;
    <A>(self: FiberRef<A>, value: A): Effect.Effect<never, never, void>;
};
declare const _delete: <A>(self: FiberRef<A>) => Effect.Effect<never, never, void>;
export { 
/**
 * @since 1.0.0
 * @category mutations
 */
_delete as delete };
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const reset: <A>(self: FiberRef<A>) => Effect.Effect<never, never, void>;
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const modify: {
    <A, B>(f: (a: A) => readonly [B, A]): (self: FiberRef<A>) => Effect.Effect<never, never, B>;
    <A, B>(self: FiberRef<A>, f: (a: A) => readonly [B, A]): Effect.Effect<never, never, B>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const modifySome: <A, B>(self: FiberRef<A>, def: B, f: (a: A) => Option.Option<readonly [B, A]>) => Effect.Effect<never, never, B>;
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const update: {
    <A>(f: (a: A) => A): (self: FiberRef<A>) => Effect.Effect<never, never, void>;
    <A>(self: FiberRef<A>, f: (a: A) => A): Effect.Effect<never, never, void>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const updateSome: {
    <A>(pf: (a: A) => Option.Option<A>): (self: FiberRef<A>) => Effect.Effect<never, never, void>;
    <A>(self: FiberRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, void>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const updateAndGet: {
    <A>(f: (a: A) => A): (self: FiberRef<A>) => Effect.Effect<never, never, A>;
    <A>(self: FiberRef<A>, f: (a: A) => A): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const updateSomeAndGet: {
    <A>(pf: (a: A) => Option.Option<A>): (self: FiberRef<A>) => Effect.Effect<never, never, A>;
    <A>(self: FiberRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<never, never, A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const locally: {
    <A>(self: FiberRef<A>, value: A): <R, E, B>(use: Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>;
    <R, E, B, A>(use: Effect.Effect<R, E, B>, self: FiberRef<A>, value: A): Effect.Effect<R, E, B>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const locallyWith: {
    <A>(self: FiberRef<A>, f: (a: A) => A): <R, E, B>(use: Effect.Effect<R, E, B>) => Effect.Effect<R, E, B>;
    <R, E, B, A>(use: Effect.Effect<R, E, B>, self: FiberRef<A>, f: (a: A) => A): Effect.Effect<R, E, B>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const locallyScoped: {
    <A>(value: A): (self: FiberRef<A>) => Effect.Effect<Scope.Scope, never, void>;
    <A>(self: FiberRef<A>, value: A): Effect.Effect<Scope.Scope, never, void>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const locallyScopedWith: {
    <A>(f: (a: A) => A): (self: FiberRef<A>) => Effect.Effect<Scope.Scope, never, void>;
    <A>(self: FiberRef<A>, f: (a: A) => A): Effect.Effect<Scope.Scope, never, void>;
};
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentContext: FiberRef<Context.Context<never>>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentLogAnnotations: FiberRef<HashMap.HashMap<string, string>>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentLoggers: FiberRef<HashSet.HashSet<Logger.Logger<string, any>>>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentLogLevel: FiberRef<LogLevel.LogLevel>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentMinimumLogLevel: FiberRef<LogLevel.LogLevel>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentLogSpan: FiberRef<Chunk.Chunk<LogSpan.LogSpan>>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentRuntimeFlags: FiberRef<RuntimeFlags.RuntimeFlags>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentParallelism: FiberRef<Option.Option<number>>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentScheduler: FiberRef<Scheduler.Scheduler>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentSupervisor: FiberRef<Supervisor.Supervisor<any>>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const currentTags: FiberRef<HashSet.HashSet<MetricLabel.MetricLabel>>;
/**
 * @since 1.0.0
 * @category fiberRefs
 */
export declare const interruptedCause: FiberRef<Cause.Cause<never>>;
//# sourceMappingURL=FiberRef.d.ts.map