"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runSyncExitOrFiber = exports.runSyncExit = exports.runSyncEither = exports.runSync = exports.runPromiseExit = exports.runPromiseEither = exports.runPromise = exports.runFork = exports.runCallback = exports.make = exports.defaultRuntimeFlags = exports.defaultRuntime = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtime"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Executes the effect using the provided Scheduler or using the global
 * Scheduler if not provided
 *
 * @since 1.0.0
 * @category execution
 */
const runFork = internal.unsafeFork;
/**
 * Executes the effect synchronously returning the exit.
 *
 * This method is effectful and should only be invoked at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
exports.runFork = runFork;
const runSyncExit = internal.unsafeRunSyncExit;
/**
 * Executes the effect synchronously returning the exit or the fiber if async.
 *
 * This method is effectful and should only be invoked at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
exports.runSyncExit = runSyncExit;
const runSyncExitOrFiber = internal.unsafeRunSyncExitOrFiber;
/**
 * Executes the effect synchronously throwing in case of errors or async boundaries.
 *
 * This method is effectful and should only be invoked at the edges of your
 * program.
 *
 * @since 1.0.0
 * @category execution
 */
exports.runSyncExitOrFiber = runSyncExitOrFiber;
const runSync = internal.unsafeRunSync;
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
exports.runSync = runSync;
const runCallback = internal.unsafeRunCallback;
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
exports.runCallback = runCallback;
const runSyncEither = internal.unsafeRunSyncEither;
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
exports.runSyncEither = runSyncEither;
const runPromise = internal.unsafeRunPromise;
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
exports.runPromise = runPromise;
const runPromiseExit = internal.unsafeRunPromiseExit;
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
exports.runPromiseExit = runPromiseExit;
const runPromiseEither = internal.unsafeRunPromiseEither;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.runPromiseEither = runPromiseEither;
const defaultRuntime = internal.defaultRuntime;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.defaultRuntime = defaultRuntime;
const defaultRuntimeFlags = internal.defaultRuntimeFlags;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.defaultRuntimeFlags = defaultRuntimeFlags;
const make = internal.make;
exports.make = make;
//# sourceMappingURL=Runtime.js.map