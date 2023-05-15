import * as E from './Either';
import { identity as id } from './function';
import { identity } from './Identity';
import { getReaderM } from './ReaderT';
import { pipeable } from './pipeable';
var T = getReaderM(identity);
/**
 * @since 2.0.0
 */
export var URI = 'Reader';
/**
 * Reads the current context
 *
 * @since 2.0.0
 */
export var ask = T.ask;
/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
export var asks = T.asks;
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.0.0
 */
export function local(f) {
    return function (ma) { return T.local(ma, f); };
}
/**
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return {
        concat: function (x, y) { return function (e) { return S.concat(x(e), y(e)); }; }
    };
}
/**
 * @since 2.0.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: function () { return M.empty; }
    };
}
/**
 * @since 2.0.0
 */
export var of = T.of;
/**
 * @since 2.0.0
 */
export var reader = {
    URI: URI,
    map: function (ma, f) { return function (e) { return f(ma(e)); }; },
    of: of,
    ap: T.ap,
    chain: T.chain,
    promap: function (mbc, f, g) { return function (a) { return g(mbc(f(a))); }; },
    compose: function (ab, la) { return function (l) { return ab(la(l)); }; },
    id: function () { return id; },
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
var _a = pipeable(reader), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, compose = _a.compose, flatten = _a.flatten, map = _a.map, promap = _a.promap;
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
compose, 
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
promap };
