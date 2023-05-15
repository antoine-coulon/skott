"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = void 0;
var CP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/Differ/ChunkPatch"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = CP.ChunkPatchTypeId;
/**
 * Constructs an empty chunk patch.
 *
 * @since 1.0.0
 * @category constructors
 */
const empty = CP.empty;
/**
 * Constructs a chunk patch from a new and old chunk of values and a differ
 * for the values.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const diff = CP.diff;
/**
 * Combines two chunk patches to produce a new chunk patch that describes
 * applying their changes sequentially.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.diff = diff;
const combine = CP.combine;
/**
 * Applies a chunk patch to a chunk of values to produce a new chunk of
 * values which represents the original chunk of values updated with the
 * changes described by this patch.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.combine = combine;
const patch = CP.patch;
exports.patch = patch;
//# sourceMappingURL=ChunkPatch.js.map