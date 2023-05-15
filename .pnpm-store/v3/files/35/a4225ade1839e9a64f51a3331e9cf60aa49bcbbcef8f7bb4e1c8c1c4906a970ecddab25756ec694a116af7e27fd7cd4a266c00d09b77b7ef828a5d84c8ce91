import { tailRec } from './ChainRec';
import { identity as id } from './function';
import { pipeable } from './pipeable';
/**
 * @since 2.0.0
 */
export var URI = 'Identity';
/**
 * @since 2.0.0
 */
export var getShow = id;
/**
 * @since 2.0.0
 */
export var getEq = id;
/**
 * @since 2.0.0
 */
export var identity = {
    URI: URI,
    map: function (ma, f) { return f(ma); },
    of: id,
    ap: function (mab, ma) { return mab(ma); },
    chain: function (ma, f) { return f(ma); },
    reduce: function (fa, b, f) { return f(b, fa); },
    foldMap: function (_) { return function (fa, f) { return f(fa); }; },
    reduceRight: function (fa, b, f) { return f(fa, b); },
    traverse: function (F) { return function (ta, f) {
        return F.map(f(ta), id);
    }; },
    sequence: function (F) { return function (ta) {
        return F.map(ta, id);
    }; },
    alt: id,
    extract: id,
    extend: function (wa, f) { return f(wa); },
    chainRec: tailRec
};
var _a = pipeable(identity), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, duplicate = _a.duplicate, extend = _a.extend, flatten = _a.flatten, foldMap = _a.foldMap, map = _a.map, reduce = _a.reduce, reduceRight = _a.reduceRight;
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
chain, 
/**
 * @since 2.0.0
 */
chainFirst, 
/**
 * @since 2.0.0
 */
duplicate, 
/**
 * @since 2.0.0
 */
extend, 
/**
 * @since 2.0.0
 */
flatten, 
/**
 * @since 2.0.0
 */
foldMap, 
/**
 * @since 2.0.0
 */
map, 
/**
 * @since 2.0.0
 */
reduce, 
/**
 * @since 2.0.0
 */
reduceRight };
