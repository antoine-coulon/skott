"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union = exports.start = exports.max = exports.make = exports.lessThan = exports.isNonEmpty = exports.intersect = exports.fromIterable = exports.end = exports.empty = exports.IntervalsTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/schedule/intervals"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const IntervalsTypeId = internal.IntervalsTypeId;
/**
 * Creates a new `Intervals` from a `List` of `Interval`s.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.IntervalsTypeId = IntervalsTypeId;
const make = internal.make;
/**
 * Constructs an empty list of `Interval`s.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.make = make;
const empty = internal.empty;
/**
 * Constructs `Intervals` from the specified `Iterable<Interval>`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const fromIterable = internal.fromIterable;
/**
 * Computes the union of this `Intervals` and  that `Intervals`
 *
 * @since 1.0.0
 * @category mutations
 */
exports.fromIterable = fromIterable;
const union = internal.union;
/**
 * Produces the intersection of this `Intervals` and that `Intervals`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.union = union;
const intersect = internal.intersect;
/**
 * The start of the earliest interval in the specified `Intervals`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.intersect = intersect;
const start = internal.start;
/**
 * The end of the latest interval in the specified `Intervals`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.start = start;
const end = internal.end;
/**
 * Returns `true` if the start of this `Intervals` is before the start of that
 * `Intervals`, `false` otherwise.
 *
 * @since 1.0.0
 * @category ordering
 */
exports.end = end;
const lessThan = internal.lessThan;
/**
 * Returns `true` if this `Intervals` is non-empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.lessThan = lessThan;
const isNonEmpty = internal.isNonEmpty;
/**
 * Returns the maximum of the two `Intervals` (i.e. which has the latest start).
 *
 * @since 1.0.0
 * @category ordering
 */
exports.isNonEmpty = isNonEmpty;
const max = internal.max;
exports.max = max;
//# sourceMappingURL=Intervals.js.map