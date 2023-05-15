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
var RTE = require("./ReaderTaskEither");
var StateT_1 = require("./StateT");
var T = StateT_1.getStateM(RTE.readerTaskEither);
/**
 * @since 2.0.0
 */
exports.URI = 'StateReaderTaskEither';
/* tslint:enable:readonly-array */
/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
function run(ma, s, r) {
    return ma(s)(r)();
}
exports.run = run;
/* tslint:enable:readonly-array */
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
exports.evalState = T.evalState;
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
exports.execState = T.execState;
/**
 * @since 2.0.0
 */
function left(e) {
    return exports.fromReaderTaskEither(RTE.left(e));
}
exports.left = left;
/**
 * @since 2.0.0
 */
exports.right = T.of;
/**
 * @since 2.0.0
 */
function rightTask(ma) {
    return exports.fromReaderTaskEither(RTE.rightTask(ma));
}
exports.rightTask = rightTask;
/**
 * @since 2.0.0
 */
function leftTask(me) {
    return exports.fromReaderTaskEither(RTE.leftTask(me));
}
exports.leftTask = leftTask;
/**
 * @since 2.0.0
 */
function fromTaskEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromTaskEither(ma));
}
exports.fromTaskEither = fromTaskEither;
/**
 * @since 2.0.0
 */
function rightReader(ma) {
    return exports.fromReaderTaskEither(RTE.rightReader(ma));
}
exports.rightReader = rightReader;
/**
 * @since 2.0.0
 */
function leftReader(me) {
    return exports.fromReaderTaskEither(RTE.leftReader(me));
}
exports.leftReader = leftReader;
/**
 * @since 2.0.0
 */
function fromIOEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromIOEither(ma));
}
exports.fromIOEither = fromIOEither;
/**
 * @since 2.0.0
 */
function fromReaderEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromReaderEither(ma));
}
exports.fromReaderEither = fromReaderEither;
/**
 * @since 2.0.0
 */
function rightIO(ma) {
    return exports.fromReaderTaskEither(RTE.rightIO(ma));
}
exports.rightIO = rightIO;
/**
 * @since 2.0.0
 */
function leftIO(me) {
    return exports.fromReaderTaskEither(RTE.leftIO(me));
}
exports.leftIO = leftIO;
/**
 * @since 2.0.0
 */
exports.rightState = T.fromState;
/**
 * @since 2.0.0
 */
function leftState(me) {
    return function (s) { return RTE.left(me(s)[0]); };
}
exports.leftState = leftState;
/**
 * @since 2.0.0
 */
exports.fromReaderTaskEither = T.fromM;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = T.get;
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = T.put;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = T.modify;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = T.gets;
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
 * @since 2.4.0
 */
function fromIOEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIOEither(f.apply(void 0, a));
    };
}
exports.fromIOEitherK = fromIOEitherK;
/**
 * @since 2.4.0
 */
function chainIOEitherK(f) {
    return chain(fromIOEitherK(f));
}
exports.chainIOEitherK = chainIOEitherK;
/**
 * @since 2.4.0
 */
function fromTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromTaskEither(f.apply(void 0, a));
    };
}
exports.fromTaskEitherK = fromTaskEitherK;
/**
 * @since 2.4.0
 */
function chainTaskEitherK(f) {
    return chain(fromTaskEitherK(f));
}
exports.chainTaskEitherK = chainTaskEitherK;
/**
 * @since 2.4.0
 */
function fromReaderTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromReaderTaskEither(f.apply(void 0, a));
    };
}
exports.fromReaderTaskEitherK = fromReaderTaskEitherK;
/**
 * @since 2.4.0
 */
function chainReaderTaskEitherK(f) {
    return chain(fromReaderTaskEitherK(f));
}
exports.chainReaderTaskEitherK = chainReaderTaskEitherK;
/**
 * @since 2.0.0
 */
exports.stateReaderTaskEither = {
    URI: exports.URI,
    map: T.map,
    of: exports.right,
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
exports.stateReaderTaskEitherSeq = __assign(__assign({}, exports.stateReaderTaskEither), { ap: function (mab, ma) { return exports.stateReaderTaskEither.chain(mab, function (f) { return exports.stateReaderTaskEither.map(ma, f); }); } });
var _a = pipeable_1.pipeable(exports.stateReaderTaskEither), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map, fromEither = _a.fromEither, fromOption = _a.fromOption, filterOrElse = _a.filterOrElse, fromPredicate = _a.fromPredicate;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.flatten = flatten;
exports.map = map;
exports.fromEither = fromEither;
exports.fromOption = fromOption;
exports.filterOrElse = filterOrElse;
exports.fromPredicate = fromPredicate;
