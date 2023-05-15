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
import * as E from './Either';
import { getEitherM } from './EitherT';
import { getFilterableComposition } from './Filterable';
import { pipeable } from './pipeable';
import { getSemigroup as getTaskSemigroup, task } from './Task';
import { getValidationM } from './ValidationT';
var T = getEitherM(task);
/**
 * @since 2.0.0
 */
export var URI = 'TaskEither';
/**
 * @since 2.0.0
 */
export var left = T.left;
/**
 * @since 2.0.0
 */
export var right = T.of;
/**
 * @since 2.0.0
 */
export function rightIO(ma) {
    return rightTask(task.fromIO(ma));
}
/**
 * @since 2.0.0
 */
export function leftIO(me) {
    return leftTask(task.fromIO(me));
}
/**
 * @since 2.0.0
 */
export var rightTask = T.rightM;
/**
 * @since 2.0.0
 */
export var leftTask = T.leftM;
/**
 * @since 2.0.0
 */
export var fromIOEither = task.fromIO;
/**
 * @since 2.0.0
 */
export function fold(onLeft, onRight) {
    return function (ma) { return T.fold(ma, onLeft, onRight); };
}
/**
 * @since 2.0.0
 */
export function getOrElse(onLeft) {
    return function (ma) { return T.getOrElse(ma, onLeft); };
}
/**
 * @since 2.0.0
 */
export function orElse(onLeft) {
    return function (ma) { return T.orElse(ma, onLeft); };
}
/**
 * @since 2.0.0
 */
export var swap = T.swap;
/**
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return getTaskSemigroup(E.getSemigroup(S));
}
/**
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return getTaskSemigroup(E.getApplySemigroup(S));
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
export function tryCatch(f, onRejected) {
    return function () { return f().then(E.right, function (reason) { return E.left(onRejected(reason)); }); };
}
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export function bracket(acquire, use, release) {
    return T.chain(acquire, function (a) {
        return T.chain(task.map(use(a), E.right), function (e) {
            return T.chain(release(a, e), function () { return (E.isLeft(e) ? T.left(e.left) : T.of(e.right)); });
        });
    });
}
export function taskify(f) {
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
/**
 * @since 2.0.0
 */
export function getTaskValidation(S) {
    var T = getValidationM(S, task);
    return __assign({ URI: URI, _E: undefined, throwError: taskEither.throwError, bimap: taskEither.bimap, mapLeft: taskEither.mapLeft, fromIO: taskEither.fromIO, fromTask: taskEither.fromTask }, T);
}
/**
 * @since 2.1.0
 */
export function getFilterable(M) {
    var F = E.getWitherable(M);
    return __assign({ URI: URI, _E: undefined }, getFilterableComposition(task, F));
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
 * Converts a function returning a `Promise` to one returning a `TaskEither`.
 *
 * @since 2.5.0
 */
export function tryCatchK(f, onRejected) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch(function () { return f.apply(void 0, a); }, onRejected);
    };
}
/**
 * @since 2.0.0
 */
export var taskEither = {
    URI: URI,
    bimap: T.bimap,
    mapLeft: T.mapLeft,
    map: T.map,
    of: T.of,
    ap: T.ap,
    chain: T.chain,
    alt: T.alt,
    fromIO: rightIO,
    fromTask: rightTask,
    throwError: left
};
/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @since 2.0.0
 */
export var taskEitherSeq = __assign(__assign({}, taskEither), { ap: function (mab, ma) { return T.chain(mab, function (f) { return T.map(ma, f); }); } });
var _a = pipeable(taskEither), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, bimap = _a.bimap, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map, mapLeft = _a.mapLeft, fromEither = _a.fromEither, fromOption = _a.fromOption, fromPredicate = _a.fromPredicate, filterOrElse = _a.filterOrElse;
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
fromEither, 
/**
 * @since 2.0.0
 */
fromOption, 
/**
 * @since 2.0.0
 */
fromPredicate, 
/**
 * @since 2.0.0
 */
filterOrElse };
