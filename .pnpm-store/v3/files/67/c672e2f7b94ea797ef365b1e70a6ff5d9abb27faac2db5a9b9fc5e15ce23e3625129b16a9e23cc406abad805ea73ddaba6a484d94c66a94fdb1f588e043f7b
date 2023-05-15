/**
 * The `Ord` type class represents types which support comparisons with a _total order_.
 *
 * Instances should satisfy the laws of total orderings:
 *
 * 1. Reflexivity: `S.compare(a, a) <= 0`
 * 2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
 * 3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`
 *
 * @since 2.0.0
 */
import { monoidOrdering } from './Ordering';
import { pipeable } from './pipeable';
/**
 * @since 2.0.0
 */
export var URI = 'Ord';
// default compare for primitive types
var compare = function (x, y) {
    return x < y ? -1 : x > y ? 1 : 0;
};
function strictEqual(a, b) {
    return a === b;
}
/**
 * @since 2.0.0
 */
export var ordString = {
    equals: strictEqual,
    compare: compare
};
/**
 * @since 2.0.0
 */
export var ordNumber = {
    equals: strictEqual,
    compare: compare
};
/**
 * @since 2.0.0
 */
export var ordBoolean = {
    equals: strictEqual,
    compare: compare
};
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
export function lt(O) {
    return function (x, y) { return O.compare(x, y) === -1; };
}
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
export function gt(O) {
    return function (x, y) { return O.compare(x, y) === 1; };
}
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
export function leq(O) {
    return function (x, y) { return O.compare(x, y) !== 1; };
}
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
export function geq(O) {
    return function (x, y) { return O.compare(x, y) !== -1; };
}
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export function min(O) {
    return function (x, y) { return (O.compare(x, y) === 1 ? y : x); };
}
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export function max(O) {
    return function (x, y) { return (O.compare(x, y) === -1 ? y : x); };
}
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
export function clamp(O) {
    var minO = min(O);
    var maxO = max(O);
    return function (low, hi) { return function (x) { return maxO(minO(x, hi), low); }; };
}
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
export function between(O) {
    var lessThanO = lt(O);
    var greaterThanO = gt(O);
    return function (low, hi) { return function (x) { return (lessThanO(x, low) || greaterThanO(x, hi) ? false : true); }; };
}
/**
 * @since 2.0.0
 */
export function fromCompare(compare) {
    var optimizedCompare = function (x, y) { return (x === y ? 0 : compare(x, y)); };
    return {
        equals: function (x, y) { return optimizedCompare(x, y) === 0; },
        compare: optimizedCompare
    };
}
var S = {
    concat: function (x, y) { return fromCompare(function (a, b) { return monoidOrdering.concat(x.compare(a, b), y.compare(a, b)); }); }
};
/**
 * Use `getMonoid` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export function getSemigroup() {
    return S;
}
var M = {
    // tslint:disable-next-line: deprecation
    concat: getSemigroup().concat,
    empty: fromCompare(function () { return 0; })
};
/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/lib/Array'
 * import { contramap, getDualOrd, getMonoid, ordBoolean, ordNumber, ordString } from 'fp-ts/lib/Ord'
 * import { pipe } from 'fp-ts/lib/pipeable'
 * import { fold } from 'fp-ts/lib/Monoid'
 *
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 *   rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   ordString,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   ordNumber,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   ordBoolean,
 *   contramap((p: User) => p.rememberMe)
 * )
 *
 * const M = getMonoid<User>()
 *
 * const users: Array<User> = [
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
 * ]
 *
 * // sort by name, then by age, then by `rememberMe`
 * const O1 = fold(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = fold(M)([getDualOrd(byRememberMe), byName, byAge])
 * assert.deepStrictEqual(sort(O2)(users), [
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * @since 2.4.0
 */
export function getMonoid() {
    return M;
}
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 *
 * @example
 * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/lib/Ord'
 *
 * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @since 2.0.0
 */
export function getTupleOrd() {
    var ords = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
    }
    var len = ords.length;
    return fromCompare(function (x, y) {
        var i = 0;
        for (; i < len - 1; i++) {
            var r = ords[i].compare(x[i], y[i]);
            if (r !== 0) {
                return r;
            }
        }
        return ords[i].compare(x[i], y[i]);
    });
}
/**
 * @since 2.0.0
 */
export function getDualOrd(O) {
    return fromCompare(function (x, y) { return O.compare(y, x); });
}
/**
 * @since 2.0.0
 */
export var ord = {
    URI: URI,
    contramap: function (fa, f) { return fromCompare(function (x, y) { return fa.compare(f(x), f(y)); }); }
};
var contramap = pipeable(ord).contramap;
export { 
/**
 * @since 2.0.0
 */
contramap };
/**
 * @since 2.0.0
 */
export var ordDate = ord.contramap(ordNumber, function (date) { return date.valueOf(); });
