"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSizedWithTTLBy = exports.makeSizedWithTTL = exports.makeSizedWith = exports.makeSized = exports.invalidate = exports.get = exports.KeyedPoolTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/keyedPool"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const KeyedPoolTypeId = internal.KeyedPoolTypeId;
/**
 * Makes a new pool of the specified fixed size. The pool is returned in a
 * `Scope`, which governs the lifetime of the pool. When the pool is shutdown
 * because the `Scope` is closed, the individual items allocated by the pool
 * will be released in some unspecified order.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.KeyedPoolTypeId = KeyedPoolTypeId;
const makeSized = internal.makeSized;
/**
 * Makes a new pool of the specified fixed size. The pool is returned in a
 * `Scope`, which governs the lifetime of the pool. When the pool is shutdown
 * because the `Scope` is closed, the individual items allocated by the pool
 * will be released in some unspecified order.
 *
 * The size of the underlying pools can be configured per key.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.makeSized = makeSized;
const makeSizedWith = internal.makeSizedWith;
/**
 * Makes a new pool with the specified minimum and maximum sizes and time to
 * live before a pool whose excess items are not being used will be shrunk
 * down to the minimum size. The pool is returned in a `Scope`, which governs
 * the lifetime of the pool. When the pool is shutdown because the `Scope` is
 * used, the individual items allocated by the pool will be released in some
 * unspecified order.
 *
 * The size of the underlying pools can be configured per key.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.makeSizedWith = makeSizedWith;
const makeSizedWithTTL = internal.makeSizedWithTTL;
/**
 * Makes a new pool with the specified minimum and maximum sizes and time to
 * live before a pool whose excess items are not being used will be shrunk
 * down to the minimum size. The pool is returned in a `Scope`, which governs
 * the lifetime of the pool. When the pool is shutdown because the `Scope` is
 * used, the individual items allocated by the pool will be released in some
 * unspecified order.
 *
 * The size of the underlying pools can be configured per key.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.makeSizedWithTTL = makeSizedWithTTL;
const makeSizedWithTTLBy = internal.makeSizedWithTTLBy;
/**
 * Retrieves an item from the pool belonging to the given key in a scoped
 * effect. Note that if acquisition fails, then the returned effect will fail
 * for that same reason. Retrying a failed acquisition attempt will repeat the
 * acquisition attempt.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.makeSizedWithTTLBy = makeSizedWithTTLBy;
const get = internal.get;
/**
 * Invalidates the specified item. This will cause the pool to eventually
 * reallocate the item, although this reallocation may occur lazily rather
 * than eagerly.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.get = get;
const invalidate = internal.invalidate;
exports.invalidate = invalidate;
//# sourceMappingURL=KeyedPool.js.map