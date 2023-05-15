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
/**
 * @since 2.0.0
 */
export var URI = 'Task';
/**
 * @since 2.0.0
 */
export var never = function () { return new Promise(function (_) { return undefined; }); };
/**
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return x().then(function (rx) { return y().then(function (ry) { return S.concat(rx, ry); }); }); }; }
    };
}
/**
 * @since 2.0.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: task.of(M.empty)
    };
}
/**
 * Note: uses `Promise.race` internally
 *
 * @since 2.0.0
 */
export function getRaceMonoid() {
    return {
        concat: function (x, y) { return function () { return Promise.race([x(), y()]); }; },
        empty: never
    };
}
/**
 * @since 2.0.0
 */
export function delay(millis) {
    return function (ma) { return function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                // tslint:disable-next-line: no-floating-promises
                ma().then(resolve);
            }, millis);
        });
    }; };
}
/**
 * @since 2.0.0
 */
export function fromIO(ma) {
    return function () { return Promise.resolve(ma()); };
}
var identity = function (a) { return a; };
/**
 * @since 2.0.0
 */
export function of(a) {
    return function () { return Promise.resolve(a); };
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
 * @since 2.0.0
 */
export var task = {
    URI: URI,
    map: function (ma, f) { return function () { return ma().then(f); }; },
    of: of,
    ap: function (mab, ma) { return function () { return Promise.all([mab(), ma()]).then(function (_a) {
        var f = _a[0], a = _a[1];
        return f(a);
    }); }; },
    chain: function (ma, f) { return function () { return ma().then(function (a) { return f(a)(); }); }; },
    fromIO: fromIO,
    fromTask: identity
};
/**
 * Like `Task` but `ap` is sequential
 *
 * @since 2.0.0
 */
export var taskSeq = __assign(__assign({}, task), { ap: function (mab, ma) { return function () { return mab().then(function (f) { return ma().then(function (a) { return f(a); }); }); }; } });
var _a = pipeable(task), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map;
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
flatten, 
/**
 * @since 2.0.0
 */
map };
