import { identity } from './function';
import { fold as foldSemigroup, getDualSemigroup, getFunctionSemigroup, getJoinSemigroup, getMeetSemigroup, getStructSemigroup, getTupleSemigroup, semigroupAll, semigroupAny, semigroupProduct, semigroupString, semigroupSum, semigroupVoid } from './Semigroup';
/**
 * Boolean monoid under conjunction
 * @since 2.0.0
 */
export var monoidAll = {
    concat: semigroupAll.concat,
    empty: true
};
/**
 * Boolean monoid under disjunction
 * @since 2.0.0
 */
export var monoidAny = {
    concat: semigroupAny.concat,
    empty: false
};
/**
 * Number monoid under addition
 * @since 2.0.0
 */
export var monoidSum = {
    concat: semigroupSum.concat,
    empty: 0
};
/**
 * Number monoid under multiplication
 * @since 2.0.0
 */
export var monoidProduct = {
    concat: semigroupProduct.concat,
    empty: 1
};
/**
 * @since 2.0.0
 */
export var monoidString = {
    concat: semigroupString.concat,
    empty: ''
};
/**
 * @since 2.0.0
 */
export var monoidVoid = {
    concat: semigroupVoid.concat,
    empty: undefined
};
/**
 * @since 2.0.0
 */
export function fold(M) {
    var foldM = foldSemigroup(M);
    return function (as) { return foldM(M.empty, as); };
}
/**
 * Given a tuple of monoids returns a monoid for the tuple
 *
 * @example
 * import { getTupleMonoid, monoidString, monoidSum, monoidAll } from 'fp-ts/lib/Monoid'
 *
 * const M1 = getTupleMonoid(monoidString, monoidSum)
 * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
 * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.0.0
 */
export function getTupleMonoid() {
    var monoids = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        monoids[_i] = arguments[_i];
    }
    return {
        concat: getTupleSemigroup.apply(void 0, monoids).concat,
        empty: monoids.map(function (m) { return m.empty; })
    };
}
/**
 * @since 2.0.0
 */
export function getDualMonoid(M) {
    return {
        concat: getDualSemigroup(M).concat,
        empty: M.empty
    };
}
/**
 * @since 2.0.0
 */
export function getFunctionMonoid(M) {
    return function () { return ({
        concat: getFunctionSemigroup(M)().concat,
        empty: function () { return M.empty; }
    }); };
}
/**
 * @since 2.0.0
 */
export function getEndomorphismMonoid() {
    return {
        concat: function (x, y) { return function (a) { return x(y(a)); }; },
        empty: identity
    };
}
/**
 * @since 2.0.0
 */
export function getStructMonoid(monoids) {
    var empty = {};
    for (var _i = 0, _a = Object.keys(monoids); _i < _a.length; _i++) {
        var key = _a[_i];
        empty[key] = monoids[key].empty;
    }
    return {
        concat: getStructSemigroup(monoids).concat,
        empty: empty
    };
}
/**
 * @since 2.0.0
 */
export function getMeetMonoid(B) {
    return {
        concat: getMeetSemigroup(B).concat,
        empty: B.top
    };
}
/**
 * @since 2.0.0
 */
export function getJoinMonoid(B) {
    return {
        concat: getJoinSemigroup(B).concat,
        empty: B.bottom
    };
}
