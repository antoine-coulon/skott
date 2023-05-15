"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refresh = exports.manual = exports.get = exports.auto = exports.CachedTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cached"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const CachedTypeId = internal.CachedTypeId;
/**
 * Creates a new `Cached` value that is automatically refreshed according to
 * the specified policy. Note that error retrying is not performed
 * automatically, so if you want to retry on errors, you should first apply
 * retry policies to the acquisition effect before passing it to this
 * constructor.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.CachedTypeId = CachedTypeId;
const auto = internal.auto;
/**
 * Retrieves the current value stored in the cache.
 *
 * @since 1.0.0
 * @category getters
 */
exports.auto = auto;
const get = internal.get;
/**
 * Creates a new `Cached` value that must be manually refreshed by calling
 * the refresh method. Note that error retrying is not performed
 * automatically, so if you want to retry on errors, you should first apply
 * retry policies to the acquisition effect before passing it to this
 * constructor.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.get = get;
const manual = internal.manual;
/**
 * Refreshes the cache. This method will not return until either the refresh
 * is successful, or the refresh operation fails.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.manual = manual;
const refresh = internal.refresh;
exports.refresh = refresh;
//# sourceMappingURL=Cached.js.map