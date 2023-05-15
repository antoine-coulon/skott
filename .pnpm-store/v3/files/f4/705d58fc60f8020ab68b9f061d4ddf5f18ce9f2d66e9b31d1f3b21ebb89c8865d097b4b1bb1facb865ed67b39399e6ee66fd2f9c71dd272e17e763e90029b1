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
import { pipe, pipeable } from './pipeable';
import { getSemigroup as getReaderSemigroup } from './Reader';
import { getReaderM } from './ReaderT';
import { readerTask } from './ReaderTask';
import * as TE from './TaskEither';
import { getValidationM } from './ValidationT';
var T = getReaderM(TE.taskEither);
/**
 * @since 2.0.0
 */
export var URI = 'ReaderTaskEither';
/**
 * @since 2.0.0
 */
export function run(ma, r) {
    return ma(r)();
}
/**
 * @since 2.0.0
 */
export function left(e) {
    return fromTaskEither(TE.left(e));
}
/**
 * @since 2.0.0
 */
export var right = T.of;
/**
 * @since 2.0.0
 */
export function rightTask(ma) {
    return fromTaskEither(TE.rightTask(ma));
}
/**
 * @since 2.0.0
 */
export function leftTask(me) {
    return fromTaskEither(TE.leftTask(me));
}
/**
 * @since 2.0.0
 */
export var fromTaskEither = T.fromM;
/**
 * @since 2.0.0
 */
export var rightReader = T.fromReader;
/**
 * @since 2.5.0
 */
export function leftReaderTask(me) {
    return function (r) { return TE.leftTask(me(r)); };
}
/**
 * @since 2.5.0
 */
export function rightReaderTask(ma) {
    return function (r) { return TE.rightTask(ma(r)); };
}
/**
 * @since 2.0.0
 */
export function leftReader(me) {
    return function (r) { return TE.left(me(r)); };
}
/**
 * @since 2.0.0
 */
export function fromIOEither(ma) {
    return fromTaskEither(TE.fromIOEither(ma));
}
/**
 * @since 2.0.0
 */
export function fromReaderEither(ma) {
    return function (r) { return TE.fromEither(ma(r)); };
}
/**
 * @since 2.0.0
 */
export function rightIO(ma) {
    return fromTaskEither(TE.rightIO(ma));
}
/**
 * @since 2.0.0
 */
export function leftIO(me) {
    return fromTaskEither(TE.leftIO(me));
}
/**
 * @since 2.0.0
 */
export function fold(onLeft, onRight) {
    return function (ma) { return function (r) {
        return pipe(ma(r), TE.fold(function (e) { return onLeft(e)(r); }, function (a) { return onRight(a)(r); }));
    }; };
}
/**
 * @since 2.0.0
 */
export function getOrElse(onLeft) {
    return function (ma) { return function (r) { return TE.getOrElse(function (e) { return onLeft(e)(r); })(ma(r)); }; };
}
/**
 * @since 2.0.0
 */
export function orElse(onLeft) {
    return function (ma) { return function (r) { return TE.orElse(function (e) { return onLeft(e)(r); })(ma(r)); }; };
}
/**
 * @since 2.0.0
 */
export function swap(ma) {
    return function (e) { return TE.swap(ma(e)); };
}
/**
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return getReaderSemigroup(TE.getSemigroup(S));
}
/**
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return getReaderSemigroup(TE.getApplySemigroup(S));
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
export var ask = T.ask;
/**
 * @since 2.0.0
 */
export var asks = T.asks;
/**
 * @since 2.0.0
 */
export function local(f) {
    return function (ma) { return T.local(ma, f); };
}
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.4
 */
export function bracket(aquire, use, release) {
    return function (r) {
        return TE.bracket(aquire(r), function (a) { return use(a)(r); }, function (a, e) { return release(a, e)(r); });
    };
}
/**
 * @since 2.3.0
 */
export function getReaderTaskValidation(S) {
    var T = getValidationM(S, readerTask);
    return __assign({ URI: URI, _E: undefined, fromIO: readerTaskEither.fromIO, fromTask: readerTaskEither.fromTask, throwError: readerTaskEither.throwError, bimap: function (ma, f, g) { return function (e) { return TE.taskEither.bimap(ma(e), f, g); }; }, mapLeft: function (ma, f) { return function (e) { return TE.taskEither.mapLeft(ma(e), f); }; } }, T);
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
 * @since 2.4.0
 */
export function fromIOEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIOEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainIOEitherK(f) {
    return chain(fromIOEitherK(f));
}
/**
 * @since 2.4.0
 */
export function fromTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromTaskEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainTaskEitherK(f) {
    return chain(fromTaskEitherK(f));
}
/**
 * @since 2.0.0
 */
export var readerTaskEither = {
    URI: URI,
    map: T.map,
    of: right,
    ap: T.ap,
    chain: T.chain,
    alt: function (fx, fy) { return function (r) { return TE.taskEither.alt(fx(r), function () { return fy()(r); }); }; },
    bimap: function (ma, f, g) { return function (e) { return TE.taskEither.bimap(ma(e), f, g); }; },
    mapLeft: function (ma, f) { return function (e) { return TE.taskEither.mapLeft(ma(e), f); }; },
    fromIO: rightIO,
    fromTask: rightTask,
    throwError: left
};
/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export var readerTaskEitherSeq = __assign(__assign({}, readerTaskEither), { ap: function (mab, ma) { return T.chain(mab, function (f) { return T.map(ma, f); }); } });
var _a = pipeable(readerTaskEither), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, bimap = _a.bimap, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map, mapLeft = _a.mapLeft, fromOption = _a.fromOption, fromEither = _a.fromEither, fromPredicate = _a.fromPredicate, filterOrElse = _a.filterOrElse;
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
fromOption, 
/**
 * @since 2.0.0
 */
fromEither, 
/**
 * @since 2.0.0
 */
fromPredicate, 
/**
 * @since 2.0.0
 */
filterOrElse };
