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
export var URI = 'Option';
/**
 * @since 2.0.0
 */
export var none = { _tag: 'None' };
/**
 * @since 2.0.0
 */
export function some(a) {
    return { _tag: 'Some', value: a };
}
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @since 2.0.0
 */
export function isSome(fa) {
    return fa._tag === 'Some';
}
/**
 * Returns `true` if the option is `None`, `false` otherwise
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @since 2.0.0
 */
export function isNone(fa) {
    return fa._tag === 'None';
}
/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, fold } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @since 2.0.0
 */
export function fold(onNone, onSome) {
    return function (ma) { return (isNone(ma) ? onNone() : onSome(ma.value)); };
}
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @since 2.0.0
 */
export function fromNullable(a) {
    return a == null ? none : some(a);
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNullable
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNullable
 *   ),
 *   null
 * )
 *
 * @since 2.0.0
 */
export function toNullable(ma) {
    return isNone(ma) ? null : ma.value;
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @since 2.0.0
 */
export function toUndefined(ma) {
    return isNone(ma) ? undefined : ma.value;
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @since 2.0.0
 */
export function getOrElse(onNone) {
    return function (ma) { return (isNone(ma) ? onNone() : ma.value); };
}
/**
 * Returns `true` if `ma` contains `a`
 *
 * @example
 * import { some, none, elem } from 'fp-ts/lib/Option'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.strictEqual(elem(eqNumber)(1, some(1)), true)
 * assert.strictEqual(elem(eqNumber)(2, some(1)), false)
 * assert.strictEqual(elem(eqNumber)(1, none), false)
 *
 * @since 2.0.0
 */
export function elem(E) {
    return function (a, ma) { return (isNone(ma) ? false : E.equals(a, ma.value)); };
}
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 2.0.0
 */
export function exists(predicate) {
    return function (ma) { return (isNone(ma) ? false : predicate(ma.value)); };
}
export function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? some(a) : none); };
}
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @since 2.0.0
 */
export function tryCatch(f) {
    try {
        return some(f());
    }
    catch (e) {
        return none;
    }
}
/**
 * Returns an `E` value if possible
 *
 * @since 2.0.0
 */
export function getLeft(ma) {
    return ma._tag === 'Right' ? none : some(ma.left);
}
/**
 * Returns an `A` value if possible
 *
 * @since 2.0.0
 */
export function getRight(ma) {
    return ma._tag === 'Left' ? none : some(ma.right);
}
/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * ```ts
 * import { some, none, getRefinement } from 'fp-ts/lib/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 * ```
 *
 * @since 2.0.0
 */
export function getRefinement(getOption) {
    return function (a) { return isSome(getOption(a)); };
}
/**
 * This is `chain` + `fromNullable`, useful when working with optional values
 *
 * @example
 * import { some, none, fromNullable, mapNullable } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * interface Employee {
 *   company?: {
 *     address?: {
 *       street?: {
 *         name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     mapNullable(company => company.address),
 *     mapNullable(address => address.street),
 *     mapNullable(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     mapNullable(company => company.address),
 *     mapNullable(address => address.street),
 *     mapNullable(street => street.name)
 *   ),
 *   none
 * )
 *
 * @since 2.0.0
 */
export function mapNullable(f) {
    return function (ma) { return (isNone(ma) ? none : fromNullable(f(ma.value))); };
}
/**
 * @since 2.0.0
 */
export function getShow(S) {
    return {
        show: function (ma) { return (isNone(ma) ? 'none' : "some(" + S.show(ma.value) + ")"); }
    };
}
/**
 * @example
 * import { none, some, getEq } from 'fp-ts/lib/Option'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @since 2.0.0
 */
export function getEq(E) {
    return {
        equals: function (x, y) { return x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value)); }
    };
}
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/lib/Option'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordNumber)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @since 2.0.0
 */
export function getOrd(O) {
    return {
        equals: getEq(O).equals,
        compare: function (x, y) { return (x === y ? 0 : isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1); }
    };
}
/**
 * `Apply` semigroup
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup(semigroupSum)
 * assert.deepStrictEqual(S.concat(none, none), none)
 * assert.deepStrictEqual(S.concat(some(1), none), none)
 * assert.deepStrictEqual(S.concat(none, some(1)), none)
 * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
 *
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (isSome(x) && isSome(y) ? some(S.concat(x.value, y.value)) : none); }
    };
}
/**
 * @since 2.0.0
 */
export function getApplyMonoid(M) {
    return __assign(__assign({}, getApplySemigroup(M)), { empty: some(M.empty) });
}
/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @since 2.0.0
 */
export function getFirstMonoid() {
    return {
        concat: function (x, y) { return (isNone(x) ? y : x); },
        empty: none
    };
}
/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @since 2.0.0
 */
export function getLastMonoid() {
    return {
        concat: function (x, y) { return (isNone(y) ? x : y); },
        empty: none
    };
}
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(a) | some(a)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @since 2.0.0
 */
export function getMonoid(S) {
    return {
        concat: function (x, y) { return (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value))); },
        empty: none
    };
}
var defaultSeparate = { left: none, right: none };
var identity = function (a) { return a; };
/**
 * @since 2.0.0
 */
export var option = {
    URI: URI,
    map: function (ma, f) { return (isNone(ma) ? none : some(f(ma.value))); },
    of: some,
    ap: function (mab, ma) { return (isNone(mab) ? none : isNone(ma) ? none : some(mab.value(ma.value))); },
    chain: function (ma, f) { return (isNone(ma) ? none : f(ma.value)); },
    reduce: function (fa, b, f) { return (isNone(fa) ? b : f(b, fa.value)); },
    foldMap: function (M) { return function (fa, f) { return (isNone(fa) ? M.empty : f(fa.value)); }; },
    reduceRight: function (fa, b, f) { return (isNone(fa) ? b : f(fa.value, b)); },
    traverse: function (F) { return function (ta, f) {
        return isNone(ta) ? F.of(none) : F.map(f(ta.value), some);
    }; },
    sequence: function (F) { return function (ta) {
        return isNone(ta) ? F.of(none) : F.map(ta.value, some);
    }; },
    zero: function () { return none; },
    alt: function (ma, f) { return (isNone(ma) ? f() : ma); },
    extend: function (wa, f) { return (isNone(wa) ? none : some(f(wa))); },
    compact: function (ma) { return option.chain(ma, identity); },
    separate: function (ma) {
        var o = option.map(ma, function (e) { return ({
            left: getLeft(e),
            right: getRight(e)
        }); });
        return isNone(o) ? defaultSeparate : o.value;
    },
    filter: function (fa, predicate) {
        return isNone(fa) ? none : predicate(fa.value) ? fa : none;
    },
    filterMap: function (ma, f) { return (isNone(ma) ? none : f(ma.value)); },
    partition: function (fa, predicate) {
        return {
            left: option.filter(fa, function (a) { return !predicate(a); }),
            right: option.filter(fa, predicate)
        };
    },
    partitionMap: function (fa, f) { return option.separate(option.map(fa, f)); },
    wither: function (F) { return function (fa, f) {
        return isNone(fa) ? F.of(none) : f(fa.value);
    }; },
    wilt: function (F) { return function (fa, f) {
        var o = option.map(fa, function (a) {
            return F.map(f(a), function (e) { return ({
                left: getLeft(e),
                right: getRight(e)
            }); });
        });
        return isNone(o)
            ? F.of({
                left: none,
                right: none
            })
            : o.value;
    }; },
    throwError: function () { return none; }
};
var _a = pipeable(option), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, duplicate = _a.duplicate, extend = _a.extend, filter = _a.filter, filterMap = _a.filterMap, flatten = _a.flatten, foldMap = _a.foldMap, map = _a.map, partition = _a.partition, partitionMap = _a.partitionMap, reduce = _a.reduce, reduceRight = _a.reduceRight, compact = _a.compact, separate = _a.separate, fromEither = _a.fromEither;
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
chain, 
/**
 * @since 2.0.0
 */
chainFirst, 
/**
 * @since 2.0.0
 */
duplicate, 
/**
 * @since 2.0.0
 */
extend, 
/**
 * @since 2.0.0
 */
filter, 
/**
 * @since 2.0.0
 */
filterMap, 
/**
 * @since 2.0.0
 */
flatten, 
/**
 * @since 2.0.0
 */
foldMap, 
/**
 * @since 2.0.0
 */
map, 
/**
 * @since 2.0.0
 */
partition, 
/**
 * @since 2.0.0
 */
partitionMap, 
/**
 * @since 2.0.0
 */
reduce, 
/**
 * @since 2.0.0
 */
reduceRight, 
/**
 * @since 2.0.0
 */
compact, 
/**
 * @since 2.0.0
 */
separate, 
/**
 * @since 2.0.0
 */
fromEither };
