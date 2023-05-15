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
import * as E from './Either';
import { getEitherM } from './EitherT';
import { pipeable } from './pipeable';
import { getSemigroup as getReaderSemigroup, reader } from './Reader';
import { getValidationM } from './ValidationT';
var T = getEitherM(reader);
/**
 * @since 2.0.0
 */
export var URI = 'ReaderEither';
/**
 * @since 2.0.0
 */
export var left = T.left;
/**
 * @since 2.0.0
 */
export var right = T.of;
/**
 * @since 2.0.0
 */
export var rightReader = T.rightM;
/**
 * @since 2.0.0
 */
export var leftReader = T.leftM;
/**
 * @since 2.0.0
 */
export function fold(onLeft, onRight) {
    return function (ma) { return T.fold(ma, onLeft, onRight); };
}
/**
 * @since 2.0.0
 */
export function getOrElse(onLeft) {
    return function (ma) { return T.getOrElse(ma, onLeft); };
}
/**
 * @since 2.0.0
 */
export function orElse(onLeft) {
    return function (ma) { return T.orElse(ma, onLeft); };
}
/**
 * @since 2.0.0
 */
export var swap = T.swap;
/**
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return getReaderSemigroup(E.getSemigroup(S));
}
/**
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return getReaderSemigroup(E.getApplySemigroup(S));
}
/**
 * @since 2.0.0
 */
export function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: right(M.empty)
    };
}
/**
 * @since 2.0.0
 */
export function ask() {
    return E.right;
}
/**
 * @since 2.0.0
 */
export function asks(f) {
    return function (r) { return E.right(f(r)); };
}
/**
 * @since 2.0.0
 */
export function local(f) {
    return function (ma) { return function (q) { return ma(f(q)); }; };
}
/**
 * @since 2.3.0
 */
export function getReaderValidation(S) {
    var T = getValidationM(S, reader);
    return __assign({ URI: URI, _E: undefined, throwError: readerEither.throwError, bimap: readerEither.bimap, mapLeft: readerEither.mapLeft }, T);
}
/**
 * @since 2.4.0
 */
export function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainEitherK(f) {
    return chain(fromEitherK(f));
}
/**
 * @since 2.0.0
 */
export var readerEither = {
    URI: URI,
    bimap: T.bimap,
    mapLeft: T.mapLeft,
    map: T.map,
    of: right,
    ap: T.ap,
    chain: T.chain,
    alt: T.alt,
    throwError: left
};
var _a = pipeable(readerEither), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, bimap = _a.bimap, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map, mapLeft = _a.mapLeft, fromEither = _a.fromEither, fromOption = _a.fromOption, fromPredicate = _a.fromPredicate, filterOrElse = _a.filterOrElse;
export { 
/**
 * @since 2.0.0
 */
alt, 
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
bimap, 
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
flatten, 
/**
 * @since 2.0.0
 */
map, 
/**
 * @since 2.0.0
 */
mapLeft, 
/**
 * @since 2.0.0
 */
fromEither, 
/**
 * @since 2.0.0
 */
fromOption, 
/**
 * @since 2.0.0
 */
fromPredicate, 
/**
 * @since 2.0.0
 */
filterOrElse };
