"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = require("./Option");
var pipeable_1 = require("./pipeable");
var RA = require("./ReadonlyArray");
var Semigroup_1 = require("./Semigroup");
/**
 * @since 2.5.0
 */
exports.URI = 'ReadonlyNonEmptyArray';
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
exports.cons = RA.cons;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
exports.snoc = RA.snoc;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @since 2.5.0
 */
function fromReadonlyArray(as) {
    return RA.isNonEmpty(as) ? Option_1.some(as) : Option_1.none;
}
exports.fromReadonlyArray = fromReadonlyArray;
/**
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
function fromArray(as) {
    return fromReadonlyArray(RA.fromArray(as));
}
exports.fromArray = fromArray;
/**
 * @since 2.5.0
 */
exports.getShow = RA.getShow;
/**
 * @since 2.5.0
 */
function head(nea) {
    return nea[0];
}
exports.head = head;
/**
 * @since 2.5.0
 */
function tail(nea) {
    return nea.slice(1);
}
exports.tail = tail;
/**
 * @since 2.5.0
 */
exports.reverse = RA.reverse;
/**
 * @since 2.5.0
 */
function min(ord) {
    var S = Semigroup_1.getMeetSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.min = min;
/**
 * @since 2.5.0
 */
function max(ord) {
    var S = Semigroup_1.getJoinSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.max = max;
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @since 2.5.0
 */
function getSemigroup() {
    return {
        concat: concat
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.5.0
 */
exports.getEq = RA.getEq;
function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return RA.empty;
        }
        // tslint:disable-next-line: readonly-array
        var r = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var x = as[i];
            if (E.equals(x, head)) {
                nea.push(x);
            }
            else {
                r.push(nea);
                head = x;
                nea = [head];
            }
        }
        r.push(nea);
        return r;
    };
}
exports.group = group;
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.5.0
 */
function groupSort(O) {
    var sortO = RA.sort(O);
    var groupO = group(O);
    return function (as) { return groupO(sortO(as)); };
}
exports.groupSort = groupSort;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.5.0
 */
function groupBy(f) {
    return function (as) {
        var r = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            var k = f(a);
            if (r.hasOwnProperty(k)) {
                r[k].push(a);
            }
            else {
                r[k] = [a];
            }
        }
        return r;
    };
}
exports.groupBy = groupBy;
/**
 * @since 2.5.0
 */
function last(nea) {
    return nea[nea.length - 1];
}
exports.last = last;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
function init(nea) {
    return nea.slice(0, -1);
}
exports.init = init;
/**
 * @since 2.5.0
 */
function sort(O) {
    return RA.sort(O);
}
exports.sort = sort;
/**
 * @since 2.5.0
 */
function insertAt(i, a) {
    return RA.insertAt(i, a);
}
exports.insertAt = insertAt;
/**
 * @since 2.5.0
 */
function updateAt(i, a) {
    return RA.updateAt(i, a);
}
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function modifyAt(i, f) {
    return RA.modifyAt(i, f);
}
exports.modifyAt = modifyAt;
function filter(predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
}
exports.filter = filter;
/**
 * @since 2.5.0
 */
function filterWithIndex(predicate) {
    return function (nea) { return fromReadonlyArray(nea.filter(function (a, i) { return predicate(i, a); })); };
}
exports.filterWithIndex = filterWithIndex;
/**
 * @since 2.5.0
 */
exports.of = RA.of;
function concat(fx, fy) {
    return fx.concat(fy);
}
exports.concat = concat;
/**
 * @since 2.5.0
 */
function fold(S) {
    return function (fa) { return fa.reduce(S.concat); };
}
exports.fold = fold;
/**
 * @since 2.5.0
 */
exports.readonlyNonEmptyArray = {
    URI: exports.URI,
    map: RA.readonlyArray.map,
    mapWithIndex: RA.readonlyArray.mapWithIndex,
    of: exports.of,
    ap: RA.readonlyArray.ap,
    chain: RA.readonlyArray.chain,
    extend: RA.readonlyArray.extend,
    extract: head,
    reduce: RA.readonlyArray.reduce,
    foldMap: RA.readonlyArray.foldMap,
    reduceRight: RA.readonlyArray.reduceRight,
    traverse: RA.readonlyArray.traverse,
    sequence: RA.readonlyArray.sequence,
    reduceWithIndex: RA.readonlyArray.reduceWithIndex,
    foldMapWithIndex: RA.readonlyArray.foldMapWithIndex,
    reduceRightWithIndex: RA.readonlyArray.reduceRightWithIndex,
    traverseWithIndex: RA.readonlyArray.traverseWithIndex,
    alt: function (fx, fy) { return concat(fx, fy()); }
};
var _a = pipeable_1.pipeable(exports.readonlyNonEmptyArray), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, duplicate = _a.duplicate, extend = _a.extend, flatten = _a.flatten, map = _a.map, mapWithIndex = _a.mapWithIndex, reduce = _a.reduce, reduceRight = _a.reduceRight, reduceRightWithIndex = _a.reduceRightWithIndex, reduceWithIndex = _a.reduceWithIndex;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.duplicate = duplicate;
exports.extend = extend;
exports.flatten = flatten;
exports.map = map;
exports.mapWithIndex = mapWithIndex;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reduceRightWithIndex = reduceRightWithIndex;
exports.reduceWithIndex = reduceWithIndex;
var foldMapWithIndex = function (S) { return function (f) { return function (fa) {
    return fa.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, fa[0]));
}; }; };
exports.foldMapWithIndex = foldMapWithIndex;
var foldMap = function (S) { return function (f) { return function (fa) {
    return fa.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(fa[0]));
}; }; };
exports.foldMap = foldMap;
