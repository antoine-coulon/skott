import { pipeable } from './pipeable';
import * as RNEA from './ReadonlyNonEmptyArray';
/**
 * @since 2.0.0
 */
export var URI = 'NonEmptyArray';
/* tslint:enable:readonly-keyword */
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export var cons = RNEA.cons;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export var snoc = RNEA.snoc;
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @since 2.0.0
 */
export var fromArray = RNEA.fromArray;
/**
 * @since 2.0.0
 */
export var getShow = RNEA.getShow;
/**
 * @since 2.0.0
 */
export var head = RNEA.head;
/**
 * @since 2.0.0
 */
export var tail = RNEA.tail;
/**
 * @since 2.0.0
 */
export var reverse = RNEA.reverse;
/**
 * @since 2.0.0
 */
export var min = RNEA.min;
/**
 * @since 2.0.0
 */
export var max = RNEA.max;
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @since 2.0.0
 */
export var getSemigroup = RNEA.getSemigroup;
/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/NonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.0.0
 */
export var getEq = RNEA.getEq;
export function group(E) {
    return RNEA.group(E);
}
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.0.0
 */
export var groupSort = RNEA.groupSort;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.0.0
 */
export var groupBy = RNEA.groupBy;
/**
 * @since 2.0.0
 */
export var last = RNEA.last;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.2.0
 */
export var init = RNEA.init;
/**
 * @since 2.0.0
 */
export var sort = RNEA.sort;
/**
 * @since 2.0.0
 */
export var insertAt = RNEA.insertAt;
/**
 * @since 2.0.0
 */
export var updateAt = RNEA.updateAt;
/**
 * @since 2.0.0
 */
export var modifyAt = RNEA.modifyAt;
/**
 * @since 2.0.0
 */
export function copy(nea) {
    var l = nea.length;
    var as = Array(l);
    for (var i = 0; i < l; i++) {
        as[i] = nea[i];
    }
    return as;
}
export function filter(predicate) {
    return RNEA.filter(predicate);
}
/**
 * @since 2.0.0
 */
export var filterWithIndex = RNEA.filterWithIndex;
/**
 * @since 2.0.0
 */
export var of = RNEA.of;
export function concat(fx, fy) {
    return RNEA.concat(fx, fy);
}
/**
 * @since 2.5.0
 */
export var fold = RNEA.fold;
/**
 * @since 2.0.0
 */
export var nonEmptyArray = {
    URI: URI,
    map: RNEA.readonlyNonEmptyArray.map,
    mapWithIndex: RNEA.readonlyNonEmptyArray.mapWithIndex,
    of: of,
    ap: RNEA.readonlyNonEmptyArray.ap,
    chain: RNEA.readonlyNonEmptyArray.chain,
    extend: RNEA.readonlyNonEmptyArray.extend,
    extract: head,
    reduce: RNEA.readonlyNonEmptyArray.reduce,
    foldMap: RNEA.readonlyNonEmptyArray.foldMap,
    reduceRight: RNEA.readonlyNonEmptyArray.reduceRight,
    traverse: RNEA.readonlyNonEmptyArray.traverse,
    sequence: RNEA.readonlyNonEmptyArray.sequence,
    reduceWithIndex: RNEA.readonlyNonEmptyArray.reduceWithIndex,
    foldMapWithIndex: RNEA.readonlyNonEmptyArray.foldMapWithIndex,
    reduceRightWithIndex: RNEA.readonlyNonEmptyArray.reduceRightWithIndex,
    traverseWithIndex: RNEA.readonlyNonEmptyArray.traverseWithIndex,
    alt: RNEA.readonlyNonEmptyArray.alt
};
var _a = pipeable(nonEmptyArray), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, duplicate = _a.duplicate, extend = _a.extend, flatten = _a.flatten, map = _a.map, mapWithIndex = _a.mapWithIndex, reduce = _a.reduce, reduceRight = _a.reduceRight, reduceRightWithIndex = _a.reduceRightWithIndex, reduceWithIndex = _a.reduceWithIndex;
var foldMapWithIndex = RNEA.foldMapWithIndex;
var foldMap = RNEA.foldMap;
export { 
/**
 * @since 2.0.0
 */
ap, 
/**
 * @since 2.0.0
 */
apFirst, 
/**
 * @since 2.0.0
 */
apSecond, 
/**
 * @since 2.0.0
 */
chain, 
/**
 * @since 2.0.0
 */
chainFirst, 
/**
 * @since 2.0.0
 */
duplicate, 
/**
 * @since 2.0.0
 */
extend, 
/**
 * @since 2.0.0
 */
flatten, 
/**
 * @since 2.0.0
 */
foldMap, 
/**
 * @since 2.0.0
 */
foldMapWithIndex, 
/**
 * @since 2.0.0
 */
map, 
/**
 * @since 2.0.0
 */
mapWithIndex, 
/**
 * @since 2.0.0
 */
reduce, 
/**
 * @since 2.0.0
 */
reduceRight, 
/**
 * @since 2.0.0
 */
reduceRightWithIndex, 
/**
 * @since 2.0.0
 */
reduceWithIndex };
