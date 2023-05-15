"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E = require("./Either");
var function_1 = require("./function");
var Identity_1 = require("./Identity");
var ReaderT_1 = require("./ReaderT");
var pipeable_1 = require("./pipeable");
var T = ReaderT_1.getReaderM(Identity_1.identity);
/**
 * @since 2.0.0
 */
exports.URI = 'Reader';
/**
 * Reads the current context
 *
 * @since 2.0.0
 */
exports.ask = T.ask;
/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
exports.asks = T.asks;
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.0.0
 */
function local(f) {
    return function (ma) { return T.local(ma, f); };
}
exports.local = local;
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function (e) { return S.concat(x(e), y(e)); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: function () { return M.empty; }
    };
}
exports.getMonoid = getMonoid;
/**
 * @since 2.0.0
 */
exports.of = T.of;
/**
 * @since 2.0.0
 */
exports.reader = {
    URI: exports.URI,
    map: function (ma, f) { return function (e) { return f(ma(e)); }; },
    of: exports.of,
    ap: T.ap,
    chain: T.chain,
    promap: function (mbc, f, g) { return function (a) { return g(mbc(f(a))); }; },
    compose: function (ab, la) { return function (l) { return ab(la(l)); }; },
    id: function () { return function_1.identity; },
    first: function (pab) { return function (_a) {
        var a = _a[0], c = _a[1];
        return [pab(a), c];
    }; },
    second: function (pbc) { return function (_a) {
        var a = _a[0], b = _a[1];
        return [a, pbc(b)];
    }; },
    left: function (pab) {
        return E.fold(function (a) { return E.left(pab(a)); }, E.right);
    },
    right: function (pbc) {
        return E.fold(E.left, function (b) { return E.right(pbc(b)); });
    }
};
var _a = pipeable_1.pipeable(exports.reader), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, compose = _a.compose, flatten = _a.flatten, map = _a.map, promap = _a.promap;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.compose = compose;
exports.flatten = flatten;
exports.map = map;
exports.promap = promap;
