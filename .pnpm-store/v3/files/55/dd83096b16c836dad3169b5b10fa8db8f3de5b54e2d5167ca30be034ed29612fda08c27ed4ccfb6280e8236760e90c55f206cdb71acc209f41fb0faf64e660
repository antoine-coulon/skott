/**
 * @since 2.0.0
 */
import { identity } from './function';
import { max, min } from './Ord';
/**
 * @since 2.0.0
 */
export function fold(S) {
    return function (a, as) { return as.reduce(S.concat, a); };
}
/**
 * @since 2.0.0
 */
export function getFirstSemigroup() {
    return { concat: identity };
}
/**
 * @since 2.0.0
 */
export function getLastSemigroup() {
    return { concat: function (_, y) { return y; } };
}
/**
 * Given a tuple of semigroups returns a semigroup for the tuple
 *
 * @example
 * import { getTupleSemigroup, semigroupString, semigroupSum, semigroupAll } from 'fp-ts/lib/Semigroup'
 *
 * const S1 = getTupleSemigroup(semigroupString, semigroupSum)
 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const S2 = getTupleSemigroup(semigroupString, semigroupSum, semigroupAll)
 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.0.0
 */
export function getTupleSemigroup() {
    var semigroups = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        semigroups[_i] = arguments[_i];
    }
    return {
        concat: function (x, y) { return semigroups.map(function (s, i) { return s.concat(x[i], y[i]); }); }
    };
}
/**
 * @since 2.0.0
 */
export function getDualSemigroup(S) {
    return {
        concat: function (x, y) { return S.concat(y, x); }
    };
}
/**
 * @since 2.0.0
 */
export function getFunctionSemigroup(S) {
    return function () { return ({
        concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
    }); };
}
/**
 * @since 2.0.0
 */
export function getStructSemigroup(semigroups) {
    return {
        concat: function (x, y) {
            var r = {};
            for (var _i = 0, _a = Object.keys(semigroups); _i < _a.length; _i++) {
                var key = _a[_i];
                r[key] = semigroups[key].concat(x[key], y[key]);
            }
            return r;
        }
    };
}
/**
 * @since 2.0.0
 */
export function getMeetSemigroup(O) {
    return {
        concat: min(O)
    };
}
/**
 * @since 2.0.0
 */
export function getJoinSemigroup(O) {
    return {
        concat: max(O)
    };
}
/**
 * Returns a `Semigroup` instance for objects preserving their type
 *
 * @example
 * import { getObjectSemigroup } from 'fp-ts/lib/Semigroup'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const S = getObjectSemigroup<Person>()
 * assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
 *
 * @since 2.0.0
 */
export function getObjectSemigroup() {
    return {
        concat: function (x, y) { return Object.assign({}, x, y); }
    };
}
/**
 * Boolean semigroup under conjunction
 * @since 2.0.0
 */
export var semigroupAll = {
    concat: function (x, y) { return x && y; }
};
/**
 * Boolean semigroup under disjunction
 * @since 2.0.0
 */
export var semigroupAny = {
    concat: function (x, y) { return x || y; }
};
/**
 * Number `Semigroup` under addition
 * @since 2.0.0
 */
export var semigroupSum = {
    concat: function (x, y) { return x + y; }
};
/**
 * Number `Semigroup` under multiplication
 * @since 2.0.0
 */
export var semigroupProduct = {
    concat: function (x, y) { return x * y; }
};
/**
 * @since 2.0.0
 */
export var semigroupString = {
    concat: function (x, y) { return x + y; }
};
/**
 * @since 2.0.0
 */
export var semigroupVoid = {
    concat: function () { return undefined; }
};
/**
 * You can glue items between and stay associative
 *
 * @example
 * import { getIntercalateSemigroup, semigroupString } from 'fp-ts/lib/Semigroup'
 *
 * const S = getIntercalateSemigroup(' ')(semigroupString)
 *
 * assert.strictEqual(S.concat('a', 'b'), 'a b')
 * assert.strictEqual(S.concat(S.concat('a', 'b'), 'c'), S.concat('a', S.concat('b', 'c')))
 *
 * @since 2.5.0
 */
export function getIntercalateSemigroup(a) {
    return function (S) { return ({
        concat: function (x, y) { return S.concat(x, S.concat(a, y)); }
    }); };
}
