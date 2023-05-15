"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRefs/patch"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category constructors
 */
const empty = internal.empty;
/**
 * Constructs a patch that describes the changes between the specified
 * collections of `FiberRef`
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const diff = internal.diff;
/**
 * Combines this patch and the specified patch to create a new patch that
 * describes applying the changes from this patch and the specified patch
 * sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.diff = diff;
const combine = internal.combine;
/**
 * Applies the changes described by this patch to the specified collection
 * of `FiberRef` values.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.combine = combine;
const patch = internal.patch;
exports.patch = patch;
//# sourceMappingURL=Patch.js.map