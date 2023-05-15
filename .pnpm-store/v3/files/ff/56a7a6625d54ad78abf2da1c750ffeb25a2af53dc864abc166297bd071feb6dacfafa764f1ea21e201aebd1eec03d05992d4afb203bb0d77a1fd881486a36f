"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = void 0;
var CP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/Differ/ContextPatch"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = CP.ContextPatchTypeId;
/**
 * An empty patch which returns the environment unchanged.
 *
 * @since 1.0.0
 * @category constructors
 */
const empty = CP.empty;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const diff = CP.diff;
/**
 * Combines two patches to produce a new patch that describes applying the
 * updates from this patch and then the updates from the specified patch.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.diff = diff;
const combine = CP.combine;
/**
 * Applies a `Patch` to the specified `Context` to produce a new patched
 * `Context`.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.combine = combine;
const patch = CP.patch;
exports.patch = patch;
//# sourceMappingURL=ContextPatch.js.map