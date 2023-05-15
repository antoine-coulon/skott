import * as RS from './ReadonlySet';
/**
 * @since 2.0.0
 */
export var getShow = RS.getShow;
/**
 * @since 2.0.0
 */
export var empty = new Set();
/**
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
export var toArray = RS.toReadonlyArray;
/**
 * @since 2.0.0
 */
export var getEq = RS.getEq;
/**
 * @since 2.0.0
 */
export var some = RS.some;
/**
 * Projects a Set through a function
 *
 * @since 2.0.0
 */
export var map = RS.map;
/**
 * @since 2.0.0
 */
export var every = RS.every;
/**
 * @since 2.0.0
 */
export var chain = RS.chain;
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.0.0
 */
export var subset = RS.isSubset;
export function filter(predicate) {
    return RS.filter(predicate);
}
export function partition(predicate) {
    return RS.partition(predicate);
}
/**
 * Test if a value is a member of a set
 *
 * @since 2.0.0
 */
export var elem = RS.elem;
/**
 * Form the union of two sets
 *
 * @since 2.0.0
 */
export var union = RS.union;
/**
 * The set of elements which are in both the first and second set
 *
 * @since 2.0.0
 */
export var intersection = RS.intersection;
/**
 * @since 2.0.0
 */
export var partitionMap = RS.partitionMap;
/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference } from 'fp-ts/lib/Set'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(difference(eqNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
 *
 *
 * @since 2.0.0
 */
export var difference = RS.difference;
/**
 * @since 2.0.0
 */
export var getUnionMonoid = RS.getUnionMonoid;
/**
 * @since 2.0.0
 */
export var getIntersectionSemigroup = RS.getIntersectionSemigroup;
/**
 * @since 2.0.0
 */
export var reduce = RS.reduce;
/**
 * @since 2.0.0
 */
export var foldMap = RS.foldMap;
/**
 * Create a set with one element
 *
 * @since 2.0.0
 */
export var singleton = RS.singleton;
/**
 * Insert a value into a set
 *
 * @since 2.0.0
 */
export var insert = RS.insert;
/**
 * Delete a value from a set
 *
 * @since 2.0.0
 */
export var remove = RS.remove;
/**
 * Checks an element is a member of a set;
 * If yes, removes the value from the set
 * If no, inserts the value to the set
 *
 * @since 2.5.0
 */
export function toggle(E) {
    var elemE = elem(E);
    var removeE = remove(E);
    var insertE = insert(E);
    return function (a) { return function (set) { return (elemE(a, set) ? removeE : insertE)(a)(set); }; };
}
/**
 * Create a set from an array
 *
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
export var fromArray = RS.fromArray;
/**
 * @since 2.0.0
 */
export var compact = RS.compact;
/**
 * @since 2.0.0
 */
export var separate = RS.separate;
/**
 * @since 2.0.0
 */
export var filterMap = RS.filterMap;
