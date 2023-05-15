"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RS = require("./ReadonlySet");
/**
 * @since 2.0.0
 */
exports.getShow = RS.getShow;
/**
 * @since 2.0.0
 */
exports.empty = new Set();
/**
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
exports.toArray = RS.toReadonlyArray;
/**
 * @since 2.0.0
 */
exports.getEq = RS.getEq;
/**
 * @since 2.0.0
 */
exports.some = RS.some;
/**
 * Projects a Set through a function
 *
 * @since 2.0.0
 */
exports.map = RS.map;
/**
 * @since 2.0.0
 */
exports.every = RS.every;
/**
 * @since 2.0.0
 */
exports.chain = RS.chain;
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.0.0
 */
exports.subset = RS.isSubset;
function filter(predicate) {
    return RS.filter(predicate);
}
exports.filter = filter;
function partition(predicate) {
    return RS.partition(predicate);
}
exports.partition = partition;
/**
 * Test if a value is a member of a set
 *
 * @since 2.0.0
 */
exports.elem = RS.elem;
/**
 * Form the union of two sets
 *
 * @since 2.0.0
 */
exports.union = RS.union;
/**
 * The set of elements which are in both the first and second set
 *
 * @since 2.0.0
 */
exports.intersection = RS.intersection;
/**
 * @since 2.0.0
 */
exports.partitionMap = RS.partitionMap;
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
exports.difference = RS.difference;
/**
 * @since 2.0.0
 */
exports.getUnionMonoid = RS.getUnionMonoid;
/**
 * @since 2.0.0
 */
exports.getIntersectionSemigroup = RS.getIntersectionSemigroup;
/**
 * @since 2.0.0
 */
exports.reduce = RS.reduce;
/**
 * @since 2.0.0
 */
exports.foldMap = RS.foldMap;
/**
 * Create a set with one element
 *
 * @since 2.0.0
 */
exports.singleton = RS.singleton;
/**
 * Insert a value into a set
 *
 * @since 2.0.0
 */
exports.insert = RS.insert;
/**
 * Delete a value from a set
 *
 * @since 2.0.0
 */
exports.remove = RS.remove;
/**
 * Checks an element is a member of a set;
 * If yes, removes the value from the set
 * If no, inserts the value to the set
 *
 * @since 2.5.0
 */
function toggle(E) {
    var elemE = exports.elem(E);
    var removeE = exports.remove(E);
    var insertE = exports.insert(E);
    return function (a) { return function (set) { return (elemE(a, set) ? removeE : insertE)(a)(set); }; };
}
exports.toggle = toggle;
/**
 * Create a set from an array
 *
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
exports.fromArray = RS.fromArray;
/**
 * @since 2.0.0
 */
exports.compact = RS.compact;
/**
 * @since 2.0.0
 */
exports.separate = RS.separate;
/**
 * @since 2.0.0
 */
exports.filterMap = RS.filterMap;
