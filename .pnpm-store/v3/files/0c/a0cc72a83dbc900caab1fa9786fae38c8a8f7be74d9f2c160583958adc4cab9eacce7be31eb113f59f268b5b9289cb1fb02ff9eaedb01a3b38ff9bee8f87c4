/**
 * @since 1.0.0
 */
import * as core from "@effect/io/internal_effect_untraced/core";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
/**
 * @since 1.0.0
 * @category symbols
 */
export const ScopeTypeId = core.ScopeTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export const CloseableScopeTypeId = core.CloseableScopeTypeId;
/**
 * @since 1.0.0
 * @category context
 */
export const Tag = fiberRuntime.scopeTag;
/**
 * Adds a finalizer to this scope. The finalizer is guaranteed to be run when
 * the scope is closed.
 *
 * @since 1.0.0
 * @category mutations
 */
export const addFinalizer = core.scopeAddFinalizer;
/**
 * A simplified version of `addFinalizerWith` when the `finalizer` does not
 * depend on the `Exit` value that the scope is closed with.
 *
 * @since 1.0.0
 * @category mutations
 */
export const addFinalizerExit = core.scopeAddFinalizerExit;
/**
 * Closes a scope with the specified exit value, running all finalizers that
 * have been added to the scope.
 *
 * @since 1.0.0
 * @category destructors
 */
export const close = core.scopeClose;
/**
 * Extends the scope of an `Effect` workflow that needs a scope into this
 * scope by providing it to the workflow but not closing the scope when the
 * workflow completes execution. This allows extending a scoped value into a
 * larger scope.
 *
 * @since 1.0.0
 * @category mutations
 */
export const extend = fiberRuntime.scopeExtend;
/**
 * Forks a new scope that is a child of this scope. The child scope will
 * automatically be closed when this scope is closed.
 *
 * @since 1.0.0
 * @category mutations
 */
export const fork = core.scopeFork;
/**
 * Uses the scope by providing it to an `Effect` workflow that needs a scope,
 * guaranteeing that the scope is closed with the result of that workflow as
 * soon as the workflow completes execution, whether by success, failure, or
 * interruption.
 *
 * @since 1.0.0
 * @category destructors
 */
export const use = fiberRuntime.scopeUse;
/**
 * Creates a Scope where Finalizers will run according to the `ExecutionStrategy`.
 *
 * If an ExecutionStrategy is not provided `sequential` will be used.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = fiberRuntime.scopeMake;
//# sourceMappingURL=Scope.mjs.map