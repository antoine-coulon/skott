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
import { pipeable } from './pipeable';
import { getSemigroup as getReaderSemigroup } from './Reader';
import { getReaderM } from './ReaderT';
import * as TA from './Task';
var T = getReaderM(TA.task);
/**
 * @since 2.3.0
 */
export var URI = 'ReaderTask';
/**
 * @since 2.4.0
 */
export function run(ma, r) {
    return ma(r)();
}
/**
 * @since 2.3.0
 */
export var fromTask = T.fromM;
/**
 * @since 2.3.0
 */
export var fromReader = T.fromReader;
/**
 * @since 2.3.0
 */
export function fromIO(ma) {
    return fromTask(TA.fromIO(ma));
}
/**
 * @since 2.3.0
 */
export var of = T.of;
/**
 * @since 2.3.0
 */
export function getSemigroup(S) {
    return getReaderSemigroup(TA.getSemigroup(S));
}
/**
 * @since 2.3.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: of(M.empty)
    };
}
/**
 * @since 2.3.0
 */
export var ask = T.ask;
/**
 * @since 2.3.0
 */
export var asks = T.asks;
/**
 * @since 2.3.0
 */
export function local(f) {
    return function (ma) { return T.local(ma, f); };
}
/**
 * @since 2.4.0
 */
export function fromIOK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIO(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainIOK(f) {
    return chain(fromIOK(f));
}
/**
 * @since 2.4.0
 */
export function fromTaskK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromTask(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainTaskK(f) {
    return chain(fromTaskK(f));
}
/**
 * @since 2.3.0
 */
export var readerTask = {
    URI: URI,
    map: T.map,
    of: of,
    ap: T.ap,
    chain: T.chain,
    fromIO: fromIO,
    fromTask: fromTask
};
/**
 * Like `readerTask` but `ap` is sequential
 * @since 2.3.0
 */
export var readerTaskSeq = __assign(__assign({}, readerTask), { ap: function (mab, ma) { return T.chain(mab, function (f) { return T.map(ma, f); }); } });
var _a = pipeable(readerTask), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map;
export { 
/**
 * @since 2.3.0
 */
ap, 
/**
 * @since 2.3.0
 */
apFirst, 
/**
 * @since 2.3.0
 */
apSecond, 
/**
 * @since 2.3.0
 */
chain, 
/**
 * @since 2.3.0
 */
chainFirst, 
/**
 * @since 2.3.0
 */
flatten, 
/**
 * @since 2.3.0
 */
map };
