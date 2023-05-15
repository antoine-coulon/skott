import * as internal from "@effect/io/internal_effect_untraced/runtime";
/**
 * Executes the effect using the provided Scheduler or using the global
 * Scheduler if not provided
 *
 * @since 1.0.0
 * @category execution
 */
export const runFork = internal.unsafeFork;
/**
 * Executes the effect synchronously returning the exit.
 *
 * This method is effectful and should only be invoked at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
export const runSyncExit = internal.unsafeRunSyncExit;
/**
 * Executes the effect synchronously returning the exit or the fiber if async.
 *
 * This method is effectful and should only be invoked at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
export const runSyncExitOrFiber = internal.unsafeRunSyncExitOrFiber;
/**
 * Executes the effect synchronously throwing in case of errors or async boundaries.
 *
 * This method is effectful and should only be invoked at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
export const runSync = internal.unsafeRunSync;
/**
 * Executes the effect asynchronously, eventually passing the exit value to
 * the specified callback.
 *
 * This method is effectful and should only be invoked at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
export const runCallback = internal.unsafeRunCallback;
/**
 * Executes the effect synchronously returning either the result or a failure.
 *
 * Throwing in case of defects and interruptions.
 *
 * This method is effectful and should only be invoked at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
export const runSyncEither = internal.unsafeRunSyncEither;
/**
 * Runs the `Effect`, returning a JavaScript `Promise` that will be resolved
 * with the value of the effect once the effect has been executed, or will be
 * rejected with the first error or exception throw by the effect.
 *
 * This method is effectful and should only be used at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
export const runPromise = internal.unsafeRunPromise;
/**
 * Runs the `Effect`, returning a JavaScript `Promise` that will be resolved
 * with the `Exit` state of the effect once the effect has been executed.
 *
 * This method is effectful and should only be used at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
export const runPromiseExit = internal.unsafeRunPromiseExit;
/**
 * Runs the `Effect`, returning a JavaScript `Promise` that will be resolved
 * with the either a success or a failure. The promise will be rejected in case
 * of defects and interruption.
 *
 * This method is effectful and should only be used at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
export const runPromiseEither = internal.unsafeRunPromiseEither;
/**
 * @since 1.0.0
 * @category constructors
 */
export const defaultRuntime = internal.defaultRuntime;
/**
 * @since 1.0.0
 * @category constructors
 */
export const defaultRuntimeFlags = internal.defaultRuntimeFlags;
/**
 * @since 1.0.0
 * @category constructors
 */
export const make = internal.make;
//# sourceMappingURL=Runtime.mjs.map