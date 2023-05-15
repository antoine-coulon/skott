"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.values = exports.union = exports.toggle = exports.some = exports.size = exports.remove = exports.reduce = exports.partition = exports.mutate = exports.map = exports.make = exports.isSubset = exports.isHashSet = exports.intersection = exports.has = exports.fromIterable = exports.forEach = exports.flatMap = exports.filter = exports.every = exports.endMutation = exports.empty = exports.difference = exports.beginMutation = exports.add = void 0;
var HS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/HashSet"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = HS.HashSetTypeId;
/**
 * @since 1.0.0
 * @category refinements
 */
const isHashSet = HS.isHashSet;
/**
 * Creates an empty `HashSet`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.isHashSet = isHashSet;
const empty = HS.empty;
/**
 * Construct a new `HashSet` from a `Collection` of values
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const fromIterable = HS.fromIterable;
/**
 * Construct a new `HashSet` from a variable number of values.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromIterable = fromIterable;
const make = HS.make;
/**
 * Checks if the specified value exists in the `HashSet`.
 *
 * @since 1.0.0
 * @category elements
 */
exports.make = make;
const has = HS.has;
/**
 * Returns `true` if any value in the `HashSet` matches the specified predicate.
 *
 * @since 1.0.0
 * @category elements
 */
exports.has = has;
const some = HS.some;
/**
 * Returns `true` only if all values in the `HashSet` match the specified
 * predicate.
 *
 * @since 1.0.0
 * @category elements
 */
exports.some = some;
const every = HS.every;
/**
 * Returns `true` if and only if every element in the this `HashSet` is an
 * element of the second set,
 *
 * **NOTE**: the hash and equal of both sets must be the same.
 *
 * @since 1.0.0
 * @category elements
 */
exports.every = every;
const isSubset = HS.isSubset;
/**
 * Returns an `IterableIterator` of the values in the `HashSet`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isSubset = isSubset;
const values = HS.values;
/**
 * Calculates the number of values in the `HashSet`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.values = values;
const size = HS.size;
/**
 * Marks the `HashSet` as mutable.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.size = size;
const beginMutation = HS.beginMutation;
/**
 * Marks the `HashSet` as immutable.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.beginMutation = beginMutation;
const endMutation = HS.endMutation;
/**
 * Mutates the `HashSet` within the context of the provided function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.endMutation = endMutation;
const mutate = HS.mutate;
/**
 * Adds a value to the `HashSet`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.mutate = mutate;
const add = HS.add;
/**
 * Removes a value from the `HashSet`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.add = add;
const remove = HS.remove;
/**
 * Computes the set difference between this `HashSet` and the specified
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.remove = remove;
const difference = HS.difference;
/**
 * Returns a `HashSet` of values which are present in both this set and that
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.difference = difference;
const intersection = HS.intersection;
/**
 * Computes the set union `(`self` + `that`)` between this `HashSet` and the
 * specified `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.intersection = intersection;
const union = HS.union;
/**
 * Checks if a value is present in the `HashSet`. If it is present, the value
 * will be removed from the `HashSet`, otherwise the value will be added to the
 * `HashSet`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.union = union;
const toggle = HS.toggle;
/**
 * Maps over the values of the `HashSet` using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.toggle = toggle;
const map = HS.map;
/**
 * Chains over the values of the `HashSet` using the specified function.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.map = map;
const flatMap = HS.flatMap;
/**
 * Applies the specified function to the values of the `HashSet`.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.flatMap = flatMap;
const forEach = HS.forEach;
/**
 * Reduces the specified state over the values of the `HashSet`.
 *
 * @since 1.0.0
 * @category folding
 */
exports.forEach = forEach;
const reduce = HS.reduce;
/**
 * Filters values out of a `HashSet` using the specified predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.reduce = reduce;
const filter = HS.filter;
/**
 * Partition the values of a `HashSet` using the specified predicate.
 *
 * If a value matches the predicate, it will be placed into the `HashSet` on the
 * right side of the resulting `Tuple`, otherwise the value will be placed into
 * the left side.
 *
 * @since 1.0.0
 * @category partitioning
 */
exports.filter = filter;
const partition = HS.partition;
exports.partition = partition;
//# sourceMappingURL=HashSet.js.map