"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var E = require("./Either");
var EitherT_1 = require("./EitherT");
var pipeable_1 = require("./pipeable");
var Reader_1 = require("./Reader");
var ValidationT_1 = require("./ValidationT");
var T = EitherT_1.getEitherM(Reader_1.reader);
/**
 * @since 2.0.0
 */
exports.URI = 'ReaderEither';
/**
 * @since 2.0.0
 */
exports.left = T.left;
/**
 * @since 2.0.0
 */
exports.right = T.of;
/**
 * @since 2.0.0
 */
exports.rightReader = T.rightM;
/**
 * @since 2.0.0
 */
exports.leftReader = T.leftM;
/**
 * @since 2.0.0
 */
function fold(onLeft, onRight) {
    return function (ma) { return T.fold(ma, onLeft, onRight); };
}
exports.fold = fold;
/**
 * @since 2.0.0
 */
function getOrElse(onLeft) {
    return function (ma) { return T.getOrElse(ma, onLeft); };
}
exports.getOrElse = getOrElse;
/**
 * @since 2.0.0
 */
function orElse(onLeft) {
    return function (ma) { return T.orElse(ma, onLeft); };
}
exports.orElse = orElse;
/**
 * @since 2.0.0
 */
exports.swap = T.swap;
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return Reader_1.getSemigroup(E.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return Reader_1.getSemigroup(E.getApplySemigroup(S));
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: exports.right(M.empty)
    };
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * @since 2.0.0
 */
function ask() {
    return E.right;
}
exports.ask = ask;
/**
 * @since 2.0.0
 */
function asks(f) {
    return function (r) { return E.right(f(r)); };
}
exports.asks = asks;
/**
 * @since 2.0.0
 */
function local(f) {
    return function (ma) { return function (q) { return ma(f(q)); }; };
}
exports.local = local;
/**
 * @since 2.3.0
 */
function getReaderValidation(S) {
    var T = ValidationT_1.getValidationM(S, Reader_1.reader);
    return __assign({ URI: exports.URI, _E: undefined, throwError: exports.readerEither.throwError, bimap: exports.readerEither.bimap, mapLeft: exports.readerEither.mapLeft }, T);
}
exports.getReaderValidation = getReaderValidation;
/**
 * @since 2.4.0
 */
function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromEither(f.apply(void 0, a));
    };
}
exports.fromEitherK = fromEitherK;
/**
 * @since 2.4.0
 */
function chainEitherK(f) {
    return chain(fromEitherK(f));
}
exports.chainEitherK = chainEitherK;
/**
 * @since 2.0.0
 */
exports.readerEither = {
    URI: exports.URI,
    bimap: T.bimap,
    mapLeft: T.mapLeft,
    map: T.map,
    of: exports.right,
    ap: T.ap,
    chain: T.chain,
    alt: T.alt,
    throwError: exports.left
};
var _a = pipeable_1.pipeable(exports.readerEither), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, bimap = _a.bimap, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map, mapLeft = _a.mapLeft, fromEither = _a.fromEither, fromOption = _a.fromOption, fromPredicate = _a.fromPredicate, filterOrElse = _a.filterOrElse;
exports.alt = alt;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.bimap = bimap;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.flatten = flatten;
exports.map = map;
exports.mapLeft = mapLeft;
exports.fromEither = fromEither;
exports.fromOption = fromOption;
exports.fromPredicate = fromPredicate;
exports.filterOrElse = filterOrElse;
