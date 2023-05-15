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
var pipeable_1 = require("./pipeable");
var Reader_1 = require("./Reader");
var ReaderT_1 = require("./ReaderT");
var TA = require("./Task");
var T = ReaderT_1.getReaderM(TA.task);
/**
 * @since 2.3.0
 */
exports.URI = 'ReaderTask';
/**
 * @since 2.4.0
 */
function run(ma, r) {
    return ma(r)();
}
exports.run = run;
/**
 * @since 2.3.0
 */
exports.fromTask = T.fromM;
/**
 * @since 2.3.0
 */
exports.fromReader = T.fromReader;
/**
 * @since 2.3.0
 */
function fromIO(ma) {
    return exports.fromTask(TA.fromIO(ma));
}
exports.fromIO = fromIO;
/**
 * @since 2.3.0
 */
exports.of = T.of;
/**
 * @since 2.3.0
 */
function getSemigroup(S) {
    return Reader_1.getSemigroup(TA.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.3.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: exports.of(M.empty)
    };
}
exports.getMonoid = getMonoid;
/**
 * @since 2.3.0
 */
exports.ask = T.ask;
/**
 * @since 2.3.0
 */
exports.asks = T.asks;
/**
 * @since 2.3.0
 */
function local(f) {
    return function (ma) { return T.local(ma, f); };
}
exports.local = local;
/**
 * @since 2.4.0
 */
function fromIOK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIO(f.apply(void 0, a));
    };
}
exports.fromIOK = fromIOK;
/**
 * @since 2.4.0
 */
function chainIOK(f) {
    return chain(fromIOK(f));
}
exports.chainIOK = chainIOK;
/**
 * @since 2.4.0
 */
function fromTaskK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromTask(f.apply(void 0, a));
    };
}
exports.fromTaskK = fromTaskK;
/**
 * @since 2.4.0
 */
function chainTaskK(f) {
    return chain(fromTaskK(f));
}
exports.chainTaskK = chainTaskK;
/**
 * @since 2.3.0
 */
exports.readerTask = {
    URI: exports.URI,
    map: T.map,
    of: exports.of,
    ap: T.ap,
    chain: T.chain,
    fromIO: fromIO,
    fromTask: exports.fromTask
};
/**
 * Like `readerTask` but `ap` is sequential
 * @since 2.3.0
 */
exports.readerTaskSeq = __assign(__assign({}, exports.readerTask), { ap: function (mab, ma) { return T.chain(mab, function (f) { return T.map(ma, f); }); } });
var _a = pipeable_1.pipeable(exports.readerTask), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.flatten = flatten;
exports.map = map;
