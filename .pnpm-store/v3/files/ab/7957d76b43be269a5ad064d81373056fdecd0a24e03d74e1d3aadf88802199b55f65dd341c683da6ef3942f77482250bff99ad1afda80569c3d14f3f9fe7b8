"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pipeable_1 = require("./pipeable");
var RT = require("./ReadonlyTuple");
/**
 * @since 2.0.0
 */
exports.URI = 'Tuple';
/**
 * @since 2.0.0
 */
exports.fst = RT.fst;
/**
 * @since 2.0.0
 */
exports.snd = RT.snd;
/**
 * @since 2.0.0
 */
exports.swap = RT.swap;
/**
 * @since 2.0.0
 */
exports.getApply = RT.getApply;
/**
 * @since 2.0.0
 */
exports.getApplicative = RT.getApplicative;
/**
 * @since 2.0.0
 */
exports.getChain = RT.getChain;
/**
 * @since 2.0.0
 */
exports.getMonad = RT.getMonad;
/**
 * @since 2.0.0
 */
exports.getChainRec = RT.getChainRec;
/**
 * @since 2.0.0
 */
exports.tuple = {
    URI: exports.URI,
    compose: RT.readonlyTuple.compose,
    map: RT.readonlyTuple.map,
    bimap: RT.readonlyTuple.bimap,
    mapLeft: RT.readonlyTuple.mapLeft,
    extract: exports.fst,
    extend: RT.readonlyTuple.extend,
    reduce: RT.readonlyTuple.reduce,
    foldMap: RT.readonlyTuple.foldMap,
    reduceRight: RT.readonlyTuple.reduceRight,
    traverse: RT.readonlyTuple.traverse,
    sequence: RT.readonlyTuple.sequence
};
var _a = pipeable_1.pipeable(exports.tuple), bimap = _a.bimap, compose = _a.compose, duplicate = _a.duplicate, extend = _a.extend, foldMap = _a.foldMap, map = _a.map, mapLeft = _a.mapLeft, reduce = _a.reduce, reduceRight = _a.reduceRight;
exports.bimap = bimap;
exports.compose = compose;
exports.duplicate = duplicate;
exports.extend = extend;
exports.foldMap = foldMap;
exports.map = map;
exports.mapLeft = mapLeft;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
