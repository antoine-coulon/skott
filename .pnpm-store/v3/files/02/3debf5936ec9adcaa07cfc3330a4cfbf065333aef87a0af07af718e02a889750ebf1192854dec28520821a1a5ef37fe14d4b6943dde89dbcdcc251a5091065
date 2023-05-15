"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = void 0;
var HSP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/Differ/HashSetPatch"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = HSP.HashSetPatchTypeId;
/**
 * Constructs an empty set patch.
 *
 * @since 1.0.0
 * @category constructors
 */
const empty = HSP.empty;
/**
 * Constructs a set patch from a new set of values.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const diff = HSP.diff;
/**
 * Combines two set patches to produce a new set patch that describes
 * applying their changes sequentially.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.diff = diff;
const combine = HSP.combine;
/**
 * Applies a set patch to a set of values to produce a new set of values
 * which represents the original set of values updated with the changes
 * described by this patch.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.combine = combine;
const patch = HSP.patch;
exports.patch = patch;
//# sourceMappingURL=HashSetPatch.js.map