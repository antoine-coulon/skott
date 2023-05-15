"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union = exports.size = exports.min = exports.max = exports.make = exports.lessThan = exports.isNonEmpty = exports.isEmpty = exports.intersect = exports.empty = exports.before = exports.after = exports.IntervalTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/schedule/interval"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const IntervalTypeId = internal.IntervalTypeId;
/**
 * Constructs a new interval from the two specified endpoints. If the start
 * endpoint greater than the end endpoint, then a zero size interval will be
 * returned.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.IntervalTypeId = IntervalTypeId;
const make = internal.make;
/**
 * An `Interval` of zero-width.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.make = make;
const empty = internal.empty;
/**
 * Returns `true` if this `Interval` is less than `that` interval, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category ordering
 */
exports.empty = empty;
const lessThan = internal.lessThan;
/**
 * Returns the minimum of two `Interval`s.
 *
 * @since 1.0.0
 * @category ordering
 */
exports.lessThan = lessThan;
const min = internal.min;
/**
 * Returns the maximum of two `Interval`s.
 *
 * @since 1.0.0
 * @category ordering
 */
exports.min = min;
const max = internal.max;
/**
 * Returns `true` if the specified `Interval` is empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category ordering
 */
exports.max = max;
const isEmpty = internal.isEmpty;
/**
 * Returns `true` if the specified `Interval` is non-empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category ordering
 */
exports.isEmpty = isEmpty;
const isNonEmpty = internal.isNonEmpty;
/**
 * Computes a new `Interval` which is the intersection of this `Interval` and
 * that `Interval`.
 *
 * @since 1.0.0
 * @category ordering
 */
exports.isNonEmpty = isNonEmpty;
const intersect = internal.intersect;
/**
 * Calculates the size of the `Interval` as the `Duration` from the start of the
 * interval to the end of the interval.
 *
 * @since 1.0.0
 * @category getters
 */
exports.intersect = intersect;
const size = internal.size;
/**
 * Computes a new `Interval` which is the union of this `Interval` and that
 * `Interval` as a `Some`, otherwise returns `None` if the two intervals cannot
 * form a union.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.size = size;
const union = internal.union;
/**
 * Construct an `Interval` that includes all time equal to and after the
 * specified start time.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.union = union;
const after = internal.after;
/**
 * Construct an `Interval` that includes all time equal to and before the
 * specified end time.
 *
 * @category constructors
 * @since 1.0.0
 */
exports.after = after;
const before = internal.before;
exports.before = before;
//# sourceMappingURL=Interval.js.map