/**
 * @since 1.0.0
 */
import type * as Context from "@effect/data/Context";
import type * as Effect from "@effect/io/Effect";
import type * as ExecutionStrategy from "@effect/io/ExecutionStrategy";
import type * as Exit from "@effect/io/Exit";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const ScopeTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type ScopeTypeId = typeof ScopeTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const CloseableScopeTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type CloseableScopeTypeId = typeof CloseableScopeTypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface Scope {
    readonly [ScopeTypeId]: ScopeTypeId;
}
/**
 * @since 1.0.0
 * @category models
 */
export interface CloseableScope extends Scope {
    readonly [CloseableScopeTypeId]: CloseableScopeTypeId;
}
/**
 * @since 1.0.0
 * @category context
 */
export declare const Tag: Context.Tag<Scope>;
/**
 * @since 1.0.0
 */
export declare namespace Scope {
    /**
     * @since 1.0.0
     * @category model
     */
    type Finalizer = (exit: Exit.Exit<unknown, unknown>) => Effect.Effect<never, never, void>;
    /**
     * @since 1.0.0
     * @category model
     */
    type Closeable = CloseableScope;
}
/**
 * Adds a finalizer to this scope. The finalizer is guaranteed to be run when
 * the scope is closed.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const addFinalizer: (self: Scope, finalizer: Effect.Effect<never, never, unknown>) => Effect.Effect<never, never, void>;
/**
 * A simplified version of `addFinalizerWith` when the `finalizer` does not
 * depend on the `Exit` value that the scope is closed with.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const addFinalizerExit: (self: Scope, finalizer: Scope.Finalizer) => Effect.Effect<never, never, void>;
/**
 * Closes a scope with the specified exit value, running all finalizers that
 * have been added to the scope.
 *
 * @since 1.0.0
 * @category destructors
 */
export declare const close: (self: CloseableScope, exit: Exit.Exit<unknown, unknown>) => Effect.Effect<never, never, void>;
/**
 * Extends the scope of an `Effect` workflow that needs a scope into this
 * scope by providing it to the workflow but not closing the scope when the
 * workflow completes execution. This allows extending a scoped value into a
 * larger scope.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const extend: {
    (scope: Scope): <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<Exclude<R, Scope>, E, A>;
    <R, E, A>(effect: Effect.Effect<R, E, A>, scope: Scope): Effect.Effect<Exclude<R, Scope>, E, A>;
};
/**
 * Forks a new scope that is a child of this scope. The child scope will
 * automatically be closed when this scope is closed.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const fork: (self: Scope, strategy: ExecutionStrategy.ExecutionStrategy) => Effect.Effect<never, never, CloseableScope>;
/**
 * Uses the scope by providing it to an `Effect` workflow that needs a scope,
 * guaranteeing that the scope is closed with the result of that workflow as
 * soon as the workflow completes execution, whether by success, failure, or
 * interruption.
 *
 * @since 1.0.0
 * @category destructors
 */
export declare const use: {
    (scope: CloseableScope): <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<Exclude<R, Scope>, E, A>;
    <R, E, A>(effect: Effect.Effect<R, E, A>, scope: CloseableScope): Effect.Effect<Exclude<R, Scope>, E, A>;
};
/**
 * Creates a Scope where Finalizers will run according to the `ExecutionStrategy`.
 *
 * If an ExecutionStrategy is not provided `sequential` will be used.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: (executionStrategy?: ExecutionStrategy.ExecutionStrategy) => Effect.Effect<never, never, CloseableScope>;
//# sourceMappingURL=Scope.d.ts.map