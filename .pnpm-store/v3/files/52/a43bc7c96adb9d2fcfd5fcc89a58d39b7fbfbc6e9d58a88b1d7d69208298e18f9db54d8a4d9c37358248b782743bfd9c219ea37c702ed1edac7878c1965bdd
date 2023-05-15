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
import * as RTE from './ReaderTaskEither';
import { getStateM } from './StateT';
var T = getStateM(RTE.readerTaskEither);
/**
 * @since 2.0.0
 */
export var URI = 'StateReaderTaskEither';
/* tslint:enable:readonly-array */
/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export function run(ma, s, r) {
    return ma(s)(r)();
}
/* tslint:enable:readonly-array */
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
export var evalState = T.evalState;
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
export var execState = T.execState;
/**
 * @since 2.0.0
 */
export function left(e) {
    return fromReaderTaskEither(RTE.left(e));
}
/**
 * @since 2.0.0
 */
export var right = T.of;
/**
 * @since 2.0.0
 */
export function rightTask(ma) {
    return fromReaderTaskEither(RTE.rightTask(ma));
}
/**
 * @since 2.0.0
 */
export function leftTask(me) {
    return fromReaderTaskEither(RTE.leftTask(me));
}
/**
 * @since 2.0.0
 */
export function fromTaskEither(ma) {
    return fromReaderTaskEither(RTE.fromTaskEither(ma));
}
/**
 * @since 2.0.0
 */
export function rightReader(ma) {
    return fromReaderTaskEither(RTE.rightReader(ma));
}
/**
 * @since 2.0.0
 */
export function leftReader(me) {
    return fromReaderTaskEither(RTE.leftReader(me));
}
/**
 * @since 2.0.0
 */
export function fromIOEither(ma) {
    return fromReaderTaskEither(RTE.fromIOEither(ma));
}
/**
 * @since 2.0.0
 */
export function fromReaderEither(ma) {
    return fromReaderTaskEither(RTE.fromReaderEither(ma));
}
/**
 * @since 2.0.0
 */
export function rightIO(ma) {
    return fromReaderTaskEither(RTE.rightIO(ma));
}
/**
 * @since 2.0.0
 */
export function leftIO(me) {
    return fromReaderTaskEither(RTE.leftIO(me));
}
/**
 * @since 2.0.0
 */
export var rightState = T.fromState;
/**
 * @since 2.0.0
 */
export function leftState(me) {
    return function (s) { return RTE.left(me(s)[0]); };
}
/**
 * @since 2.0.0
 */
export var fromReaderTaskEither = T.fromM;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export var get = T.get;
/**
 * Set the state
 *
 * @since 2.0.0
 */
export var put = T.put;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export var modify = T.modify;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export var gets = T.gets;
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
 * @since 2.4.0
 */
export function fromReaderTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromReaderTaskEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainReaderTaskEitherK(f) {
    return chain(fromReaderTaskEitherK(f));
}
/**
 * @since 2.0.0
 */
export var stateReaderTaskEither = {
    URI: URI,
    map: T.map,
    of: right,
    ap: T.ap,
    chain: T.chain,
    bimap: function (fea, f, g) { return function (s) { return RTE.readerTaskEither.bimap(fea(s), f, function (_a) {
        var a = _a[0], s = _a[1];
        return [g(a), s];
    }); }; },
    mapLeft: function (fea, f) { return function (s) { return RTE.readerTaskEither.mapLeft(fea(s), f); }; },
    alt: function (fx, fy) { return function (s) { return RTE.readerTaskEither.alt(fx(s), function () { return fy()(s); }); }; },
    fromIO: rightIO,
    fromTask: rightTask,
    throwError: left
};
/**
 * Like `stateReaderTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export var stateReaderTaskEitherSeq = __assign(__assign({}, stateReaderTaskEither), { ap: function (mab, ma) { return stateReaderTaskEither.chain(mab, function (f) { return stateReaderTaskEither.map(ma, f); }); } });
var _a = pipeable(stateReaderTaskEither), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map, fromEither = _a.fromEither, fromOption = _a.fromOption, filterOrElse = _a.filterOrElse, fromPredicate = _a.fromPredicate;
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
map, 
/**
 * @since 2.0.0
 */
fromEither, 
/**
 * @since 2.0.0
 */
fromOption, 
/**
 * @since 2.4.4
 */
fromPredicate, 
/**
 * @since 2.4.4
 */
filterOrElse };
