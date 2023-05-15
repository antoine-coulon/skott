"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Eq_1 = require("./Eq");
var Option_1 = require("./Option");
var pipeable_1 = require("./pipeable");
/**
 * @since 2.0.0
 */
exports.URI = 'These';
/**
 * @since 2.0.0
 */
function left(left) {
    return { _tag: 'Left', left: left };
}
exports.left = left;
/**
 * @since 2.0.0
 */
function right(right) {
    return { _tag: 'Right', right: right };
}
exports.right = right;
/**
 * @since 2.0.0
 */
function both(left, right) {
    return { _tag: 'Both', left: left, right: right };
}
exports.both = both;
/**
 * @since 2.0.0
 */
function fold(onLeft, onRight, onBoth) {
    return function (fa) {
        switch (fa._tag) {
            case 'Left':
                return onLeft(fa.left);
            case 'Right':
                return onRight(fa.right);
            case 'Both':
                return onBoth(fa.left, fa.right);
        }
    };
}
exports.fold = fold;
/**
 * @since 2.4.0
 */
exports.swap = fold(right, left, function (e, a) { return both(a, e); });
/**
 * @since 2.0.0
 */
function getShow(SE, SA) {
    return {
        show: fold(function (l) { return "left(" + SE.show(l) + ")"; }, function (a) { return "right(" + SA.show(a) + ")"; }, function (l, a) { return "both(" + SE.show(l) + ", " + SA.show(a) + ")"; })
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
function getEq(EE, EA) {
    return Eq_1.fromEquals(function (x, y) {
        return isLeft(x)
            ? isLeft(y) && EE.equals(x.left, y.left)
            : isRight(x)
                ? isRight(y) && EA.equals(x.right, y.right)
                : isBoth(y) && EE.equals(x.left, y.left) && EA.equals(x.right, y.right);
    });
}
exports.getEq = getEq;
/**
 * @since 2.0.0
 */
function getSemigroup(SE, SA) {
    return {
        concat: function (x, y) {
            return isLeft(x)
                ? isLeft(y)
                    ? left(SE.concat(x.left, y.left))
                    : isRight(y)
                        ? both(x.left, y.right)
                        : both(SE.concat(x.left, y.left), y.right)
                : isRight(x)
                    ? isLeft(y)
                        ? both(y.left, x.right)
                        : isRight(y)
                            ? right(SA.concat(x.right, y.right))
                            : both(y.left, SA.concat(x.right, y.right))
                    : isLeft(y)
                        ? both(SE.concat(x.left, y.left), x.right)
                        : isRight(y)
                            ? both(x.left, SA.concat(x.right, y.right))
                            : both(SE.concat(x.left, y.left), SA.concat(x.right, y.right));
        }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonad(S) {
    var chain = function (ma, f) {
        if (isLeft(ma)) {
            return ma;
        }
        if (isRight(ma)) {
            return f(ma.right);
        }
        var fb = f(ma.right);
        return isLeft(fb)
            ? left(S.concat(ma.left, fb.left))
            : isRight(fb)
                ? both(ma.left, fb.right)
                : both(S.concat(ma.left, fb.left), fb.right);
    };
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.these.map,
        of: right,
        ap: function (mab, ma) { return chain(mab, function (f) { return exports.these.map(ma, f); }); },
        chain: chain
    };
}
exports.getMonad = getMonad;
/* tslint:disable:readonly-array */
/**
 * @example
 * import { toTuple, left, right, both } from 'fp-ts/lib/These'
 *
 * assert.deepStrictEqual(toTuple('a', 1)(left('b')), ['b', 1])
 * assert.deepStrictEqual(toTuple('a', 1)(right(2)), ['a', 2])
 * assert.deepStrictEqual(toTuple('a', 1)(both('b', 2)), ['b', 2])
 *
 * @since 2.0.0
 */
function toTuple(e, a) {
    return function (fa) { return (isLeft(fa) ? [fa.left, a] : isRight(fa) ? [e, fa.right] : [fa.left, fa.right]); };
}
exports.toTuple = toTuple;
/* tslint:enable:readonly-array */
/**
 * Returns an `E` value if possible
 *
 * @example
 * import { getLeft, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
 *
 * @since 2.0.0
 */
function getLeft(fa) {
    return isLeft(fa) ? Option_1.some(fa.left) : isRight(fa) ? Option_1.none : Option_1.some(fa.left);
}
exports.getLeft = getLeft;
/**
 * Returns an `A` value if possible
 *
 * @example
 * import { getRight, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRight(left('a')), none)
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(both('a', 1)), some(1))
 *
 * @since 2.0.0
 */
function getRight(fa) {
    return isLeft(fa) ? Option_1.none : isRight(fa) ? Option_1.some(fa.right) : Option_1.some(fa.right);
}
exports.getRight = getRight;
/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
function isLeft(fa) {
    return fa._tag === 'Left';
}
exports.isLeft = isLeft;
/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
function isRight(fa) {
    return fa._tag === 'Right';
}
exports.isRight = isRight;
/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @since 2.0.0
 */
function isBoth(fa) {
    return fa._tag === 'Both';
}
exports.isBoth = isBoth;
/**
 * @example
 * import { leftOrBoth, left, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(leftOrBoth('a')(none), left('a'))
 * assert.deepStrictEqual(leftOrBoth('a')(some(1)), both('a', 1))
 *
 * @since 2.0.0
 */
function leftOrBoth(e) {
    return function (ma) { return (Option_1.isNone(ma) ? left(e) : both(e, ma.value)); };
}
exports.leftOrBoth = leftOrBoth;
/**
 * @example
 * import { rightOrBoth, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(rightOrBoth(1)(none), right(1))
 * assert.deepStrictEqual(rightOrBoth(1)(some('a')), both('a', 1))
 *
 * @since 2.0.0
 */
function rightOrBoth(a) {
    return function (me) { return (Option_1.isNone(me) ? right(a) : both(me.value, a)); };
}
exports.rightOrBoth = rightOrBoth;
/**
 * Returns the `E` value if and only if the value is constructed with `Left`
 *
 * @example
 * import { getLeftOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
 * assert.deepStrictEqual(getLeftOnly(right(1)), none)
 * assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
 *
 * @since 2.0.0
 */
function getLeftOnly(fa) {
    return isLeft(fa) ? Option_1.some(fa.left) : Option_1.none;
}
exports.getLeftOnly = getLeftOnly;
/**
 * Returns the `A` value if and only if the value is constructed with `Right`
 *
 * @example
 * import { getRightOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRightOnly(left('a')), none)
 * assert.deepStrictEqual(getRightOnly(right(1)), some(1))
 * assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
 *
 *
 * @since 2.0.0
 */
function getRightOnly(fa) {
    return isRight(fa) ? Option_1.some(fa.right) : Option_1.none;
}
exports.getRightOnly = getRightOnly;
/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @since 2.0.0
 */
function fromOptions(fe, fa) {
    return Option_1.isNone(fe)
        ? Option_1.isNone(fa)
            ? Option_1.none
            : Option_1.some(right(fa.value))
        : Option_1.isNone(fa)
            ? Option_1.some(left(fe.value))
            : Option_1.some(both(fe.value, fa.value));
}
exports.fromOptions = fromOptions;
/**
 * @since 2.0.0
 */
exports.these = {
    URI: exports.URI,
    map: function (fa, f) { return (isLeft(fa) ? fa : isRight(fa) ? right(f(fa.right)) : both(fa.left, f(fa.right))); },
    bimap: function (fea, f, g) {
        return isLeft(fea) ? left(f(fea.left)) : isRight(fea) ? right(g(fea.right)) : both(f(fea.left), g(fea.right));
    },
    mapLeft: function (fea, f) { return (isLeft(fea) ? left(f(fea.left)) : isBoth(fea) ? both(f(fea.left), fea.right) : fea); },
    reduce: function (fa, b, f) { return (isLeft(fa) ? b : isRight(fa) ? f(b, fa.right) : f(b, fa.right)); },
    foldMap: function (M) { return function (fa, f) { return (isLeft(fa) ? M.empty : isRight(fa) ? f(fa.right) : f(fa.right)); }; },
    reduceRight: function (fa, b, f) { return (isLeft(fa) ? b : isRight(fa) ? f(fa.right, b) : f(fa.right, b)); },
    traverse: function (F) { return function (ta, f) {
        return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(f(ta.right), right) : F.map(f(ta.right), function (b) { return both(ta.left, b); });
    }; },
    sequence: function (F) { return function (ta) {
        return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(ta.right, right) : F.map(ta.right, function (b) { return both(ta.left, b); });
    }; }
};
var _a = pipeable_1.pipeable(exports.these), bimap = _a.bimap, foldMap = _a.foldMap, map = _a.map, mapLeft = _a.mapLeft, reduce = _a.reduce, reduceRight = _a.reduceRight;
exports.bimap = bimap;
exports.foldMap = foldMap;
exports.map = map;
exports.mapLeft = mapLeft;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
