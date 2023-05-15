/**
 * @since 1.0.0
 */
import * as HM from "@effect/data/internal/HashMap";
import * as _keySet from "@effect/data/internal/HashMap/keySet";
const TypeId = HM.HashMapTypeId;
/**
 * @since 1.0.0
 * @category refinements
 */
export const isHashMap = HM.isHashMap;
/**
 * Creates a new `HashMap`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const empty = HM.empty;
/**
 * Constructs a new `HashMap` from an array of key/value pairs.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = HM.make;
/**
 * Constructs a new `HashMap` from an iterable of key/value pairs.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fromIterable = HM.fromIterable;
/**
 * Checks if the `HashMap` contains any entries.
 *
 * @since 1.0.0
 * @category elements
 */
export const isEmpty = HM.isEmpty;
/**
 * Safely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @since 1.0.0
 * @category elements
 */
export const get = HM.get;
/**
 * Lookup the value for the specified key in the `HashMap` using a custom hash.
 *
 * @since 1.0.0
 * @category elements
 */
export const getHash = HM.getHash;
/**
 * Unsafely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeGet = HM.unsafeGet;
/**
 * Checks if the specified key has an entry in the `HashMap`.
 *
 * @since 1.0.0
 * @category elements
 */
export const has = HM.has;
/**
 * Checks if the specified key has an entry in the `HashMap` using a custom
 * hash.
 *
 * @since 1.0.0
 * @category elements
 */
export const hasHash = HM.hasHash;
/**
 * Sets the specified key to the specified value using the internal hashing
 * function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const set = HM.set;
/**
 * Returns an `IterableIterator` of the keys within the `HashMap`.
 *
 * @since 1.0.0
 * @category getters
 */
export const keys = HM.keys;
/**
 * Returns a `HashSet` of keys within the `HashMap`.
 *
 * @since 1.0.0
 * @category getter
 */
export const keySet = _keySet.keySet;
/**
 * Returns an `IterableIterator` of the values within the `HashMap`.
 *
 * @since 1.0.0
 * @category getters
 */
export const values = HM.values;
/**
 * Returns the number of entries within the `HashMap`.
 *
 * @since 1.0.0
 * @category getters
 */
export const size = HM.size;
/**
 * Marks the `HashMap` as mutable.
 *
 * @since 1.0.0
 * @category mutations
 */
export const beginMutation = HM.beginMutation;
/**
 * Marks the `HashMap` as immutable.
 *
 * @since 1.0.0
 * @category mutations
 */
export const endMutation = HM.endMutation;
/**
 * Mutates the `HashMap` within the context of the provided function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const mutate = HM.mutate;
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
export const modifyAt = HM.modifyAt;
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
export const modifyHash = HM.modifyHash;
/**
 * Updates the value of the specified key within the `HashMap` if it exists.
 *
 * @since 1.0.0
 * @category mutations
 */
export const modify = HM.modify;
/**
 * Performs a union of this `HashMap` and that `HashMap`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const union = HM.union;
/**
 * Remove the entry for the specified key in the `HashMap` using the internal
 * hashing function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const remove = HM.remove;
/**
 * Removes all entries in the `HashMap` which have the specified keys.
 *
 * @since 1.0.0
 * @category mutations
 */
export const removeMany = HM.removeMany;
/**
 * Maps over the values of the `HashMap` using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const map = HM.map;
/**
 * Maps over the entries of the `HashMap` using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapWithIndex = HM.mapWithIndex;
/**
 * Chains over the values of the `HashMap` using the specified function.
 *
 * **NOTE**: the hash and equal of both maps have to be the same.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const flatMap = HM.flatMap;
/**
 * Chains over the entries of the `HashMap` using the specified function.
 *
 * **NOTE**: the hash and equal of both maps have to be the same.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const flatMapWithIndex = HM.flatMapWithIndex;
/**
 * Applies the specified function to the values of the `HashMap`.
 *
 * @since 1.0.0
 * @category traversing
 */
export const forEach = HM.forEach;
/**
 * Applies the specified function to the entries of the `HashMap`.
 *
 * @since 1.0.0
 * @category traversing
 */
export const forEachWithIndex = HM.forEachWithIndex;
/**
 * Reduces the specified state over the values of the `HashMap`.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduce = HM.reduce;
/**
 * Reduces the specified state over the entries of the `HashMap`.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceWithIndex = HM.reduceWithIndex;
/**
 * Filters entries out of a `HashMap` using the specified predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filter = HM.filter;
/**
 * Filters entries out of a `HashMap` using the specified predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterWithIndex = HM.filterWithIndex;
/**
 * Filters out `None` values from a `HashMap` of `Options`s.
 *
 * @since 1.0.0
 * @category filtering
 */
export const compact = HM.compact;
/**
 * Maps over the values of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterMap = HM.filterMap;
/**
 * Maps over the entries of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterMapWithIndex = HM.filterMapWithIndex;
//# sourceMappingURL=HashMap.mjs.map