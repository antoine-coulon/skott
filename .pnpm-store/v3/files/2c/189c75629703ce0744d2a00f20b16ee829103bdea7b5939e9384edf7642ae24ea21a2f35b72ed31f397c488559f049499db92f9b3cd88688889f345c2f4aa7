"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChainRec_1 = require("./ChainRec");
var function_1 = require("./function");
var pipeable_1 = require("./pipeable");
/**
 * @since 2.0.0
 */
exports.URI = 'Identity';
/**
 * @since 2.0.0
 */
exports.getShow = function_1.identity;
/**
 * @since 2.0.0
 */
exports.getEq = function_1.identity;
/**
 * @since 2.0.0
 */
exports.identity = {
    URI: exports.URI,
    map: function (ma, f) { return f(ma); },
    of: function_1.identity,
    ap: function (mab, ma) { return mab(ma); },
    chain: function (ma, f) { return f(ma); },
    reduce: function (fa, b, f) { return f(b, fa); },
    foldMap: function (_) { return function (fa, f) { return f(fa); }; },
    reduceRight: function (fa, b, f) { return f(fa, b); },
    traverse: function (F) { return function (ta, f) {
        return F.map(f(ta), function_1.identity);
    }; },
    sequence: function (F) { return function (ta) {
        return F.map(ta, function_1.identity);
    }; },
    alt: function_1.identity,
    extract: function_1.identity,
    extend: function (wa, f) { return f(wa); },
    chainRec: ChainRec_1.tailRec
};
var _a = pipeable_1.pipeable(exports.identity), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, duplicate = _a.duplicate, extend = _a.extend, flatten = _a.flatten, foldMap = _a.foldMap, map = _a.map, reduce = _a.reduce, reduceRight = _a.reduceRight;
exports.alt = alt;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.duplicate = duplicate;
exports.extend = extend;
exports.flatten = flatten;
exports.foldMap = foldMap;
exports.map = map;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
