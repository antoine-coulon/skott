"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatedAs = exports.unsafeMake = exports.setAll = exports.joinAs = exports.getOrDefault = exports.get = exports.forkAs = exports.fiberRefs = exports.delete = exports.FiberRefsSym = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRefs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const FiberRefsSym = internal.FiberRefsSym;
exports.FiberRefsSym = FiberRefsSym;
const delete_ = internal.delete_;
exports.delete = delete_;
/**
 * Returns a set of each `FiberRef` in this collection.
 *
 * @since 1.0.0
 * @category getters
 */
const fiberRefs = internal.fiberRefs;
/**
 * Forks this collection of fiber refs as the specified child fiber id. This
 * will potentially modify the value of the fiber refs, as determined by the
 * individual fiber refs that make up the collection.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.fiberRefs = fiberRefs;
const forkAs = internal.forkAs;
/**
 * Gets the value of the specified `FiberRef` in this collection of `FiberRef`
 * values if it exists or `None` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.forkAs = forkAs;
const get = internal.get;
/**
 * Gets the value of the specified `FiberRef` in this collection of `FiberRef`
 * values if it exists or the `initial` value of the `FiberRef` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.get = get;
const getOrDefault = internal.getOrDefault;
/**
 * Joins this collection of fiber refs to the specified collection, as the
 * specified fiber id. This will perform diffing and merging to ensure
 * preservation of maximum information from both child and parent refs.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.getOrDefault = getOrDefault;
const joinAs = internal.joinAs;
/**
 * Set each ref to either its value or its default.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.joinAs = joinAs;
const setAll = internal.setAll;
/**
 * Updates the value of the specified `FiberRef` using the provided `FiberId`
 *
 * @since 1.0.0
 * @category mutations
 */
exports.setAll = setAll;
const updatedAs = internal.updatedAs;
/**
 * Note: it will not copy the provided Map, make sure to provide a fresh one.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.updatedAs = updatedAs;
const unsafeMake = internal.unsafeMake;
exports.unsafeMake = unsafeMake;
//# sourceMappingURL=FiberRefs.js.map