"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pipeable_1 = require("./pipeable");
var RR = require("./ReadonlyRecord");
/**
 * @since 2.0.0
 */
exports.URI = 'Record';
/**
 * @since 2.0.0
 */
exports.getShow = RR.getShow;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
exports.size = RR.size;
/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
exports.isEmpty = RR.isEmpty;
/**
 * @since 2.0.0
 */
exports.keys = RR.keys;
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/Record'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.0.0
 */
exports.collect = RR.collect;
/**
 * @since 2.0.0
 */
exports.toArray = RR.toReadonlyArray;
function toUnfoldable(U) {
    return RR.toUnfoldable(U);
}
exports.toUnfoldable = toUnfoldable;
function insertAt(k, a) {
    return RR.insertAt(k, a);
}
exports.insertAt = insertAt;
/**
 * @since 2.0.0
 */
exports.hasOwnProperty = RR.hasOwnProperty;
function deleteAt(k) {
    return RR.deleteAt(k);
}
exports.deleteAt = deleteAt;
/**
 * @since 2.0.0
 */
exports.updateAt = RR.updateAt;
/**
 * @since 2.0.0
 */
exports.modifyAt = RR.modifyAt;
function pop(k) {
    return RR.pop(k);
}
exports.pop = pop;
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
exports.isSubrecord = RR.isSubrecord;
function getEq(E) {
    return RR.getEq(E);
}
exports.getEq = getEq;
function getMonoid(S) {
    return RR.getMonoid(S);
}
exports.getMonoid = getMonoid;
/**
 * Lookup the value for a key in a record
 *
 * @since 2.0.0
 */
exports.lookup = RR.lookup;
/**
 * @since 2.0.0
 */
exports.empty = {};
function mapWithIndex(f) {
    return RR.mapWithIndex(f);
}
exports.mapWithIndex = mapWithIndex;
function map(f) {
    return RR.map(f);
}
exports.map = map;
function reduceWithIndex(b, f) {
    return RR.reduceWithIndex(b, f);
}
exports.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(M) {
    return RR.foldMapWithIndex(M);
}
exports.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex(b, f) {
    return RR.reduceRightWithIndex(b, f);
}
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
exports.singleton = RR.singleton;
function traverseWithIndex(F) {
    return RR.traverseWithIndex(F);
}
exports.traverseWithIndex = traverseWithIndex;
function traverse(F) {
    return RR.traverse(F);
}
exports.traverse = traverse;
function sequence(F) {
    return RR.sequence(F);
}
exports.sequence = sequence;
function partitionMapWithIndex(f) {
    return RR.partitionMapWithIndex(f);
}
exports.partitionMapWithIndex = partitionMapWithIndex;
function partitionWithIndex(predicateWithIndex) {
    return RR.partitionWithIndex(predicateWithIndex);
}
exports.partitionWithIndex = partitionWithIndex;
function filterMapWithIndex(f) {
    return RR.filterMapWithIndex(f);
}
exports.filterMapWithIndex = filterMapWithIndex;
function filterWithIndex(predicateWithIndex) {
    return RR.filterWithIndex(predicateWithIndex);
}
exports.filterWithIndex = filterWithIndex;
function fromFoldable(M, F) {
    return RR.fromFoldable(M, F);
}
exports.fromFoldable = fromFoldable;
function fromFoldableMap(M, F) {
    return RR.fromFoldableMap(M, F);
}
exports.fromFoldableMap = fromFoldableMap;
/**
 * @since 2.0.0
 */
exports.every = RR.every;
/**
 * @since 2.0.0
 */
exports.some = RR.some;
/**
 * @since 2.0.0
 */
exports.elem = RR.elem;
/**
 * @since 2.0.0
 */
exports.record = {
    URI: exports.URI,
    map: RR.readonlyRecord.map,
    reduce: RR.readonlyRecord.reduce,
    foldMap: RR.readonlyRecord.foldMap,
    reduceRight: RR.readonlyRecord.reduceRight,
    traverse: RR.readonlyRecord.traverse,
    sequence: sequence,
    compact: RR.readonlyRecord.compact,
    separate: RR.readonlyRecord.separate,
    filter: RR.readonlyRecord.filter,
    filterMap: RR.readonlyRecord.filterMap,
    partition: RR.readonlyRecord.partition,
    partitionMap: RR.readonlyRecord.partitionMap,
    wither: RR.readonlyRecord.wither,
    wilt: RR.readonlyRecord.wilt,
    mapWithIndex: RR.readonlyRecord.mapWithIndex,
    reduceWithIndex: RR.readonlyRecord.reduceWithIndex,
    foldMapWithIndex: RR.readonlyRecord.foldMapWithIndex,
    reduceRightWithIndex: RR.readonlyRecord.reduceRightWithIndex,
    traverseWithIndex: RR.readonlyRecord.traverseWithIndex,
    partitionMapWithIndex: RR.readonlyRecord.partitionMapWithIndex,
    partitionWithIndex: RR.readonlyRecord.partitionWithIndex,
    filterMapWithIndex: RR.readonlyRecord.filterMapWithIndex,
    filterWithIndex: RR.readonlyRecord.filterWithIndex
};
var _a = pipeable_1.pipeable(exports.record), filter = _a.filter, filterMap = _a.filterMap, foldMap = _a.foldMap, partition = _a.partition, partitionMap = _a.partitionMap, reduce = _a.reduce, reduceRight = _a.reduceRight, compact = _a.compact, separate = _a.separate;
exports.filter = filter;
exports.filterMap = filterMap;
exports.foldMap = foldMap;
exports.partition = partition;
exports.partitionMap = partitionMap;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.compact = compact;
exports.separate = separate;
