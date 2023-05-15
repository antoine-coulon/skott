"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.values = exports.unsafeGet = exports.union = exports.size = exports.set = exports.removeMany = exports.remove = exports.reduceWithIndex = exports.reduce = exports.mutate = exports.modifyHash = exports.modifyAt = exports.modify = exports.mapWithIndex = exports.map = exports.make = exports.keys = exports.keySet = exports.isHashMap = exports.isEmpty = exports.hasHash = exports.has = exports.getHash = exports.get = exports.fromIterable = exports.forEachWithIndex = exports.forEach = exports.flatMapWithIndex = exports.flatMap = exports.filterWithIndex = exports.filterMapWithIndex = exports.filterMap = exports.filter = exports.endMutation = exports.empty = exports.compact = exports.beginMutation = void 0;
var HM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/HashMap"));
var _keySet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/HashMap/keySet"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = HM.HashMapTypeId;
/**
 * @since 1.0.0
 * @category refinements
 */
const isHashMap = HM.isHashMap;
/**
 * Creates a new `HashMap`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.isHashMap = isHashMap;
const empty = HM.empty;
/**
 * Constructs a new `HashMap` from an array of key/value pairs.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const make = HM.make;
/**
 * Constructs a new `HashMap` from an iterable of key/value pairs.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.make = make;
const fromIterable = HM.fromIterable;
/**
 * Checks if the `HashMap` contains any entries.
 *
 * @since 1.0.0
 * @category elements
 */
exports.fromIterable = fromIterable;
const isEmpty = HM.isEmpty;
/**
 * Safely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @since 1.0.0
 * @category elements
 */
exports.isEmpty = isEmpty;
const get = HM.get;
/**
 * Lookup the value for the specified key in the `HashMap` using a custom hash.
 *
 * @since 1.0.0
 * @category elements
 */
exports.get = get;
const getHash = HM.getHash;
/**
 * Unsafely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.getHash = getHash;
const unsafeGet = HM.unsafeGet;
/**
 * Checks if the specified key has an entry in the `HashMap`.
 *
 * @since 1.0.0
 * @category elements
 */
exports.unsafeGet = unsafeGet;
const has = HM.has;
/**
 * Checks if the specified key has an entry in the `HashMap` using a custom
 * hash.
 *
 * @since 1.0.0
 * @category elements
 */
exports.has = has;
const hasHash = HM.hasHash;
/**
 * Sets the specified key to the specified value using the internal hashing
 * function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.hasHash = hasHash;
const set = HM.set;
/**
 * Returns an `IterableIterator` of the keys within the `HashMap`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.set = set;
const keys = HM.keys;
/**
 * Returns a `HashSet` of keys within the `HashMap`.
 *
 * @since 1.0.0
 * @category getter
 */
exports.keys = keys;
const keySet = _keySet.keySet;
/**
 * Returns an `IterableIterator` of the values within the `HashMap`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.keySet = keySet;
const values = HM.values;
/**
 * Returns the number of entries within the `HashMap`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.values = values;
const size = HM.size;
/**
 * Marks the `HashMap` as mutable.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.size = size;
const beginMutation = HM.beginMutation;
/**
 * Marks the `HashMap` as immutable.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.beginMutation = beginMutation;
const endMutation = HM.endMutation;
/**
 * Mutates the `HashMap` within the context of the provided function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.endMutation = endMutation;
const mutate = HM.mutate;
/**
 * Set or remove the specified key in the `HashMap` using the specified
 * update function. The value of the specified key will be computed using the
 * provided hash.
 *
 * The update function will be invoked with the current value of the key if it
 * exists, or `None` if no such value exists.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.mutate = mutate;
const modifyAt = HM.modifyAt;
/**
 * Alter the value of the specified key in the `HashMap` using the specified
 * update function. The value of the specified key will be computed using the
 * provided hash.
 *
 * The update function will be invoked with the current value of the key if it
 * exists, or `None` if no such value exists.
 *
 * This function will always either update or insert a value into the `HashMap`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.modifyAt = modifyAt;
const modifyHash = HM.modifyHash;
/**
 * Updates the value of the specified key within the `HashMap` if it exists.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.modifyHash = modifyHash;
const modify = HM.modify;
/**
 * Performs a union of this `HashMap` and that `HashMap`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.modify = modify;
const union = HM.union;
/**
 * Remove the entry for the specified key in the `HashMap` using the internal
 * hashing function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.union = union;
const remove = HM.remove;
/**
 * Removes all entries in the `HashMap` which have the specified keys.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.remove = remove;
const removeMany = HM.removeMany;
/**
 * Maps over the values of the `HashMap` using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.removeMany = removeMany;
const map = HM.map;
/**
 * Maps over the entries of the `HashMap` using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.map = map;
const mapWithIndex = HM.mapWithIndex;
/**
 * Chains over the values of the `HashMap` using the specified function.
 *
 * **NOTE**: the hash and equal of both maps have to be the same.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.mapWithIndex = mapWithIndex;
const flatMap = HM.flatMap;
/**
 * Chains over the entries of the `HashMap` using the specified function.
 *
 * **NOTE**: the hash and equal of both maps have to be the same.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.flatMap = flatMap;
const flatMapWithIndex = HM.flatMapWithIndex;
/**
 * Applies the specified function to the values of the `HashMap`.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.flatMapWithIndex = flatMapWithIndex;
const forEach = HM.forEach;
/**
 * Applies the specified function to the entries of the `HashMap`.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.forEach = forEach;
const forEachWithIndex = HM.forEachWithIndex;
/**
 * Reduces the specified state over the values of the `HashMap`.
 *
 * @since 1.0.0
 * @category folding
 */
exports.forEachWithIndex = forEachWithIndex;
const reduce = HM.reduce;
/**
 * Reduces the specified state over the entries of the `HashMap`.
 *
 * @since 1.0.0
 * @category folding
 */
exports.reduce = reduce;
const reduceWithIndex = HM.reduceWithIndex;
/**
 * Filters entries out of a `HashMap` using the specified predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.reduceWithIndex = reduceWithIndex;
const filter = HM.filter;
/**
 * Filters entries out of a `HashMap` using the specified predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filter = filter;
const filterWithIndex = HM.filterWithIndex;
/**
 * Filters out `None` values from a `HashMap` of `Options`s.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filterWithIndex = filterWithIndex;
const compact = HM.compact;
/**
 * Maps over the values of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.compact = compact;
const filterMap = HM.filterMap;
/**
 * Maps over the entries of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filterMap = filterMap;
const filterMapWithIndex = HM.filterMapWithIndex;
exports.filterMapWithIndex = filterMapWithIndex;
//# sourceMappingURL=HashMap.js.map