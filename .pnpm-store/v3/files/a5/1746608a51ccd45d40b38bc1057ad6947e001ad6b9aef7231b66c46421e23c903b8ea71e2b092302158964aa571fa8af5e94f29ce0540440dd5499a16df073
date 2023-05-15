"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = exports.make = exports.fork = exports.extend = exports.close = exports.addFinalizerExit = exports.addFinalizer = exports.Tag = exports.ScopeTypeId = exports.CloseableScopeTypeId = void 0;
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 * @category symbols
 */
const ScopeTypeId = core.ScopeTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.ScopeTypeId = ScopeTypeId;
const CloseableScopeTypeId = core.CloseableScopeTypeId;
/**
 * @since 1.0.0
 * @category context
 */
exports.CloseableScopeTypeId = CloseableScopeTypeId;
const Tag = fiberRuntime.scopeTag;
/**
 * Adds a finalizer to this scope. The finalizer is guaranteed to be run when
 * the scope is closed.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.Tag = Tag;
const addFinalizer = core.scopeAddFinalizer;
/**
 * A simplified version of `addFinalizerWith` when the `finalizer` does not
 * depend on the `Exit` value that the scope is closed with.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.addFinalizer = addFinalizer;
const addFinalizerExit = core.scopeAddFinalizerExit;
/**
 * Closes a scope with the specified exit value, running all finalizers that
 * have been added to the scope.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.addFinalizerExit = addFinalizerExit;
const close = core.scopeClose;
/**
 * Extends the scope of an `Effect` workflow that needs a scope into this
 * scope by providing it to the workflow but not closing the scope when the
 * workflow completes execution. This allows extending a scoped value into a
 * larger scope.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.close = close;
const extend = fiberRuntime.scopeExtend;
/**
 * Forks a new scope that is a child of this scope. The child scope will
 * automatically be closed when this scope is closed.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.extend = extend;
const fork = core.scopeFork;
/**
 * Uses the scope by providing it to an `Effect` workflow that needs a scope,
 * guaranteeing that the scope is closed with the result of that workflow as
 * soon as the workflow completes execution, whether by success, failure, or
 * interruption.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.fork = fork;
const use = fiberRuntime.scopeUse;
/**
 * Creates a Scope where Finalizers will run according to the `ExecutionStrategy`.
 *
 * If an ExecutionStrategy is not provided `sequential` will be used.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.use = use;
const make = fiberRuntime.scopeMake;
exports.make = make;
//# sourceMappingURL=Scope.js.map