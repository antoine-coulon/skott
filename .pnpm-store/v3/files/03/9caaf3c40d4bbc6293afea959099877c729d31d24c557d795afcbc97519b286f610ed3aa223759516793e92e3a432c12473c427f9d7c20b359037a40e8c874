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
var E = require("./Either");
var EitherT_1 = require("./EitherT");
var Filterable_1 = require("./Filterable");
var pipeable_1 = require("./pipeable");
var Task_1 = require("./Task");
var ValidationT_1 = require("./ValidationT");
var T = EitherT_1.getEitherM(Task_1.task);
/**
 * @since 2.0.0
 */
exports.URI = 'TaskEither';
/**
 * @since 2.0.0
 */
exports.left = T.left;
/**
 * @since 2.0.0
 */
exports.right = T.of;
/**
 * @since 2.0.0
 */
function rightIO(ma) {
    return exports.rightTask(Task_1.task.fromIO(ma));
}
exports.rightIO = rightIO;
/**
 * @since 2.0.0
 */
function leftIO(me) {
    return exports.leftTask(Task_1.task.fromIO(me));
}
exports.leftIO = leftIO;
/**
 * @since 2.0.0
 */
exports.rightTask = T.rightM;
/**
 * @since 2.0.0
 */
exports.leftTask = T.leftM;
/**
 * @since 2.0.0
 */
exports.fromIOEither = Task_1.task.fromIO;
/**
 * @since 2.0.0
 */
function fold(onLeft, onRight) {
    return function (ma) { return T.fold(ma, onLeft, onRight); };
}
exports.fold = fold;
/**
 * @since 2.0.0
 */
function getOrElse(onLeft) {
    return function (ma) { return T.getOrElse(ma, onLeft); };
}
exports.getOrElse = getOrElse;
/**
 * @since 2.0.0
 */
function orElse(onLeft) {
    return function (ma) { return T.orElse(ma, onLeft); };
}
exports.orElse = orElse;
/**
 * @since 2.0.0
 */
exports.swap = T.swap;
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return Task_1.getSemigroup(E.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return Task_1.getSemigroup(E.getApplySemigroup(S));
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: exports.right(M.empty)
    };
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * @example
 * import { left, right } from 'fp-ts/lib/Either'
 * import { tryCatch } from 'fp-ts/lib/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1), String)().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'), String)().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @since 2.0.0
 */
function tryCatch(f, onRejected) {
    return function () { return f().then(E.right, function (reason) { return E.left(onRejected(reason)); }); };
}
exports.tryCatch = tryCatch;
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
function bracket(acquire, use, release) {
    return T.chain(acquire, function (a) {
        return T.chain(Task_1.task.map(use(a), E.right), function (e) {
            return T.chain(release(a, e), function () { return (E.isLeft(e) ? T.left(e.left) : T.of(e.right)); });
        });
    });
}
exports.bracket = bracket;
function taskify(f) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function () {
            return new Promise(function (resolve) {
                var cbResolver = function (e, r) { return (e != null ? resolve(E.left(e)) : resolve(E.right(r))); };
                f.apply(null, args.concat(cbResolver));
            });
        };
    };
}
exports.taskify = taskify;
/**
 * @since 2.0.0
 */
function getTaskValidation(S) {
    var T = ValidationT_1.getValidationM(S, Task_1.task);
    return __assign({ URI: exports.URI, _E: undefined, throwError: exports.taskEither.throwError, bimap: exports.taskEither.bimap, mapLeft: exports.taskEither.mapLeft, fromIO: exports.taskEither.fromIO, fromTask: exports.taskEither.fromTask }, T);
}
exports.getTaskValidation = getTaskValidation;
/**
 * @since 2.1.0
 */
function getFilterable(M) {
    var F = E.getWitherable(M);
    return __assign({ URI: exports.URI, _E: undefined }, Filterable_1.getFilterableComposition(Task_1.task, F));
}
exports.getFilterable = getFilterable;
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
        return exports.fromIOEither(f.apply(void 0, a));
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
 * Converts a function returning a `Promise` to one returning a `TaskEither`.
 *
 * @since 2.5.0
 */
function tryCatchK(f, onRejected) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch(function () { return f.apply(void 0, a); }, onRejected);
    };
}
exports.tryCatchK = tryCatchK;
/**
 * @since 2.0.0
 */
exports.taskEither = {
    URI: exports.URI,
    bimap: T.bimap,
    mapLeft: T.mapLeft,
    map: T.map,
    of: T.of,
    ap: T.ap,
    chain: T.chain,
    alt: T.alt,
    fromIO: rightIO,
    fromTask: exports.rightTask,
    throwError: exports.left
};
/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @since 2.0.0
 */
exports.taskEitherSeq = __assign(__assign({}, exports.taskEither), { ap: function (mab, ma) { return T.chain(mab, function (f) { return T.map(ma, f); }); } });
var _a = pipeable_1.pipeable(exports.taskEither), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, bimap = _a.bimap, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map, mapLeft = _a.mapLeft, fromEither = _a.fromEither, fromOption = _a.fromOption, fromPredicate = _a.fromPredicate, filterOrElse = _a.filterOrElse;
exports.alt = alt;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.bimap = bimap;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.flatten = flatten;
exports.map = map;
exports.mapLeft = mapLeft;
exports.fromEither = fromEither;
exports.fromOption = fromOption;
exports.fromPredicate = fromPredicate;
exports.filterOrElse = filterOrElse;
