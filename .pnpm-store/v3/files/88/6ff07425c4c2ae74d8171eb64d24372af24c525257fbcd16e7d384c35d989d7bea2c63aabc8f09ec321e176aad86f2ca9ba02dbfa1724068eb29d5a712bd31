var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { identity } from './function';
import { isSome, none, some } from './Option';
import { fromCompare, getMonoid as getOrdMonoid, ordNumber } from './Ord';
import { pipeable } from './pipeable';
/**
 * @since 2.5.0
 */
export var URI = 'ReadonlyArray';
/**
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
export function fromArray(as) {
    var l = as.length;
    if (l === 0) {
        return empty;
    }
    var ras = Array(l);
    for (var i = 0; i < l; i++) {
        ras[i] = as[i];
    }
    return ras;
}
/**
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
export function toArray(ras) {
    var l = ras.length;
    var as = Array(l);
    for (var i = 0; i < l; i++) {
        as[i] = ras[i];
    }
    return as;
}
/**
 * @since 2.5.0
 */
export function getShow(S) {
    return {
        show: function (as) { return "[" + as.map(S.show).join(', ') + "]"; }
    };
}
var concat = function (x, y) {
    var lenx = x.length;
    if (lenx === 0) {
        return y;
    }
    var leny = y.length;
    if (leny === 0) {
        return x;
    }
    var r = Array(lenx + leny);
    for (var i = 0; i < lenx; i++) {
        r[i] = x[i];
    }
    for (var i = 0; i < leny; i++) {
        r[i + lenx] = y[i];
    }
    return r;
};
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/lib/ReadonlyArray'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export function getMonoid() {
    return {
        concat: concat,
        empty: empty
    };
}
/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import { eqString } from 'fp-ts/lib/Eq'
 * import { getEq } from 'fp-ts/lib/ReadonlyArray'
 *
 * const E = getEq(eqString)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @since 2.5.0
 */
export function getEq(E) {
    return {
        equals: function (xs, ys) { return xs === ys || (xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); })); }
    };
}
/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/lib/ReadonlyArray'
 * import { ordString } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @since 2.5.0
 */
export function getOrd(O) {
    return fromCompare(function (a, b) {
        var aLen = a.length;
        var bLen = b.length;
        var len = Math.min(aLen, bLen);
        for (var i = 0; i < len; i++) {
            var ordering = O.compare(a[i], b[i]);
            if (ordering !== 0) {
                return ordering;
            }
        }
        return ordNumber.compare(aLen, bLen);
    });
}
/**
 * An empty array
 *
 * @since 2.5.0
 */
export var empty = [];
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/lib/ReadonlyArray'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @since 2.5.0
 */
export function makeBy(n, f) {
    // tslint:disable-next-line: readonly-array
    var r = [];
    for (var i = 0; i < n; i++) {
        r.push(f(i));
    }
    return r;
}
/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @example
 * import { range } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @since 2.5.0
 */
export function range(start, end) {
    return makeBy(end - start + 1, function (i) { return start + i; });
}
/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @since 2.5.0
 */
export function replicate(n, a) {
    return makeBy(n, function () { return a; });
}
/**
 * Removes one level of nesting
 *
 * @example
 * import { flatten } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @since 2.5.0
 */
export function flatten(mma) {
    var rLen = 0;
    var len = mma.length;
    for (var i = 0; i < len; i++) {
        rLen += mma[i].length;
    }
    var r = Array(rLen);
    var start = 0;
    for (var i = 0; i < len; i++) {
        var arr = mma[i];
        var l = arr.length;
        for (var j = 0; j < l; j++) {
            r[j + start] = arr[j];
        }
        start += l;
    }
    return r;
}
/**
 * Break an array into its first element and remaining elements
 *
 * @example
 * import { foldLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @since 2.5.0
 */
export function foldLeft(onNil, onCons) {
    return function (as) { return (isEmpty(as) ? onNil() : onCons(as[0], as.slice(1))); };
}
/**
 * Break an array into its initial elements and the last element
 *
 * @since 2.5.0
 */
export function foldRight(onNil, onCons) {
    return function (as) { return (isEmpty(as) ? onNil() : onCons(as.slice(0, as.length - 1), as[as.length - 1])); };
}
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * ```ts
 * import { scanLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 * ```
 *
 * @since 2.5.0
 */
export function scanLeft(b, f) {
    return function (as) {
        var l = as.length;
        // tslint:disable-next-line: readonly-array
        var r = new Array(l + 1);
        r[0] = b;
        for (var i = 0; i < l; i++) {
            r[i + 1] = f(r[i], as[i]);
        }
        return r;
    };
}
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @since 2.5.0
 */
export function scanRight(b, f) {
    return function (as) {
        var l = as.length;
        // tslint:disable-next-line: readonly-array
        var r = new Array(l + 1);
        r[l] = b;
        for (var i = l - 1; i >= 0; i--) {
            r[i] = f(as[i], r[i + 1]);
        }
        return r;
    };
}
/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 2.5.0
 */
export function isEmpty(as) {
    return as.length === 0;
}
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`
 *
 * @since 2.5.0
 */
export function isNonEmpty(as) {
    return as.length > 0;
}
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
export function isOutOfBound(i, as) {
    return i < 0 || i >= as.length;
}
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { lookup } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(lookup(1, [1, 2, 3]), some(2))
 * assert.deepStrictEqual(lookup(3, [1, 2, 3]), none)
 *
 * @since 2.5.0
 */
export function lookup(i, as) {
    return isOutOfBound(i, as) ? none : some(as[i]);
}
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(cons(0, [1, 2, 3]), [0, 1, 2, 3])
 *
 * @since 2.5.0
 */
export function cons(head, tail) {
    var len = tail.length;
    var r = Array(len + 1);
    for (var i = 0; i < len; i++) {
        r[i + 1] = tail[i];
    }
    r[0] = head;
    return r;
}
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export function snoc(init, end) {
    var len = init.length;
    var r = Array(len + 1);
    for (var i = 0; i < len; i++) {
        r[i] = init[i];
    }
    r[len] = end;
    return r;
}
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.5.0
 */
export function head(as) {
    return isEmpty(as) ? none : some(as[0]);
}
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.5.0
 */
export function last(as) {
    return lookup(as.length - 1, as);
}
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.5.0
 */
export function tail(as) {
    return isEmpty(as) ? none : some(as.slice(1));
}
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.5.0
 */
export function init(as) {
    var len = as.length;
    return len === 0 ? none : some(as.slice(0, len - 1));
}
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
 *
 * @since 2.5.0
 */
export function takeLeft(n) {
    return function (as) { return as.slice(0, n); };
}
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeRight } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
 *
 * @since 2.5.0
 */
export function takeRight(n) {
    return function (as) { return (n === 0 ? empty : as.slice(-n)); };
}
export function takeLeftWhile(predicate) {
    return function (as) {
        var i = spanIndexUncurry(as, predicate);
        var init = Array(i);
        for (var j = 0; j < i; j++) {
            init[j] = as[j];
        }
        return init;
    };
}
var spanIndexUncurry = function (as, predicate) {
    var l = as.length;
    var i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
export function spanLeft(predicate) {
    return function (as) {
        var i = spanIndexUncurry(as, predicate);
        var init = Array(i);
        for (var j = 0; j < i; j++) {
            init[j] = as[j];
        }
        var l = as.length;
        var rest = Array(l - i);
        for (var j = i; j < l; j++) {
            rest[j - i] = as[j];
        }
        return { init: init, rest: rest };
    };
}
/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { dropLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
 *
 * @since 2.5.0
 */
export function dropLeft(n) {
    return function (as) { return as.slice(n, as.length); };
}
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropRight } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @since 2.5.0
 */
export function dropRight(n) {
    return function (as) { return as.slice(0, as.length - n); };
}
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropLeftWhile } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 *
 * @since 2.5.0
 */
export function dropLeftWhile(predicate) {
    return function (as) {
        var i = spanIndexUncurry(as, predicate);
        var l = as.length;
        var rest = Array(l - i);
        for (var j = i; j < l; j++) {
            rest[j - i] = as[j];
        }
        return rest;
    };
}
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
export function findIndex(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = 0; i < len; i++) {
            if (predicate(as[i])) {
                return some(i);
            }
        }
        return none;
    };
}
export function findFirst(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = 0; i < len; i++) {
            if (predicate(as[i])) {
                return some(as[i]);
            }
        }
        return none;
    };
}
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 2.5.0
 */
export function findFirstMap(f) {
    return function (as) {
        var len = as.length;
        for (var i = 0; i < len; i++) {
            var v = f(as[i]);
            if (isSome(v)) {
                return v;
            }
        }
        return none;
    };
}
export function findLast(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = len - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return some(as[i]);
            }
        }
        return none;
    };
}
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 2.5.0
 */
export function findLastMap(f) {
    return function (as) {
        var len = as.length;
        for (var i = len - 1; i >= 0; i--) {
            var v = f(as[i]);
            if (isSome(v)) {
                return v;
            }
        }
        return none;
    };
}
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.5.0
 */
export function findLastIndex(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = len - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return some(i);
            }
        }
        return none;
    };
}
/**
 * @since 2.5.0
 */
export function unsafeInsertAt(i, a, as) {
    // tslint:disable-next-line: readonly-array
    var xs = __spreadArrays(as);
    xs.splice(i, 0, a);
    return xs;
}
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/lib/ReadonlyArray'
 * import { some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.5.0
 */
export function insertAt(i, a) {
    return function (as) { return (i < 0 || i > as.length ? none : some(unsafeInsertAt(i, a, as))); };
}
/**
 * @since 2.5.0
 */
export function unsafeUpdateAt(i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        // tslint:disable-next-line: readonly-array
        var xs = __spreadArrays(as);
        xs[i] = a;
        return xs;
    }
}
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.5.0
 */
export function updateAt(i, a) {
    return function (as) { return (isOutOfBound(i, as) ? none : some(unsafeUpdateAt(i, a, as))); };
}
/**
 * @since 2.5.0
 */
export function unsafeDeleteAt(i, as) {
    // tslint:disable-next-line: readonly-array
    var xs = __spreadArrays(as);
    xs.splice(i, 1);
    return xs;
}
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.5.0
 */
export function deleteAt(i) {
    return function (as) { return (isOutOfBound(i, as) ? none : some(unsafeDeleteAt(i, as))); };
}
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.5.0
 */
export function modifyAt(i, f) {
    return function (as) { return (isOutOfBound(i, as) ? none : some(unsafeUpdateAt(i, f(as[i]), as))); };
}
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @since 2.5.0
 */
export function reverse(as) {
    return __spreadArrays(as).reverse();
}
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/lib/ReadonlyArray'
 * import { right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @since 2.5.0
 */
export function rights(as) {
    // tslint:disable-next-line: readonly-array
    var r = [];
    var len = as.length;
    for (var i = 0; i < len; i++) {
        var a = as[i];
        if (a._tag === 'Right') {
            r.push(a.right);
        }
    }
    return r;
}
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/lib/ReadonlyArray'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 2.5.0
 */
export function lefts(as) {
    // tslint:disable-next-line: readonly-array
    var r = [];
    var len = as.length;
    for (var i = 0; i < len; i++) {
        var a = as[i];
        if (a._tag === 'Left') {
            r.push(a.left);
        }
    }
    return r;
}
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/lib/ReadonlyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @since 2.5.0
 */
export function sort(O) {
    return function (as) { return __spreadArrays(as).sort(O.compare); };
}
export function zipWith(fa, fb, f) {
    // tslint:disable-next-line: readonly-array
    var fc = [];
    var len = Math.min(fa.length, fb.length);
    for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
}
export function zip(fa, fb) {
    return zipWith(fa, fb, function (a, b) { return [a, b]; });
}
export function unzip(as) {
    // tslint:disable-next-line: readonly-array
    var fa = [];
    // tslint:disable-next-line: readonly-array
    var fb = [];
    for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
    }
    return [fa, fb];
}
/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @since 2.5.0
 */
export function rotate(n) {
    return function (as) {
        var len = as.length;
        if (n === 0 || len <= 1 || len === Math.abs(n)) {
            return as;
        }
        else if (n < 0) {
            return rotate(len + n)(as);
        }
        else {
            return as.slice(-n).concat(as.slice(0, len - n));
        }
    };
}
/**
 * Test if a value is a member of an array. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `ReadonlyArray<A>`.
 *
 * @example
 * import { elem } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.strictEqual(elem(eqNumber)(1, [1, 2, 3]), true)
 * assert.strictEqual(elem(eqNumber)(4, [1, 2, 3]), false)
 *
 * @since 2.5.0
 */
export function elem(E) {
    return function (a, as) {
        var predicate = function (element) { return E.equals(element, a); };
        var i = 0;
        var len = as.length;
        for (; i < len; i++) {
            if (predicate(as[i])) {
                return true;
            }
        }
        return false;
    };
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
 *
 * @since 2.5.0
 */
export function uniq(E) {
    var elemS = elem(E);
    return function (as) {
        // tslint:disable-next-line: readonly-array
        var r = [];
        var len = as.length;
        var i = 0;
        for (; i < len; i++) {
            var a = as[i];
            if (!elemS(a, r)) {
                r.push(a);
            }
        }
        return len === r.length ? as : r;
    };
}
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/lib/ReadonlyArray'
 * import { ord, ordString, ordNumber } from 'fp-ts/lib/Ord'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = ord.contramap(ordString, (p: Person) => p.name)
 * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @since 2.5.0
 */
export function sortBy(ords) {
    var M = getOrdMonoid();
    return sort(ords.reduce(M.concat, M.empty));
}
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq, eqNumber } from 'fp-ts/lib/Eq'
 * import { chop, spanLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return chop(as => {
 *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @since 2.5.0
 */
export function chop(f) {
    return function (as) {
        // tslint:disable-next-line: readonly-array
        var result = [];
        var cs = as;
        while (isNonEmpty(cs)) {
            var _a = f(cs), b = _a[0], c = _a[1];
            result.push(b);
            cs = c;
        }
        return result;
    };
}
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.5.0
 */
export function splitAt(n) {
    return function (as) { return [as.slice(0, n), as.slice(n)]; };
}
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 *
 * @since 2.5.0
 */
export function chunksOf(n) {
    return function (as) { return (as.length === 0 ? empty : isOutOfBound(n - 1, as) ? [as] : chop(splitAt(n))(as)); };
}
export function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    var go = function (scope, input) {
        if (input.length === 0) {
            return g.apply(void 0, scope) ? [f.apply(void 0, scope)] : empty;
        }
        else {
            return readonlyArray.chain(input[0], function (x) { return go(snoc(scope, x), input.slice(1)); });
        }
    };
    return go(empty, input);
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons
 *
 * @example
 * import { union } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(union(eqNumber)([1, 2], [2, 3]), [1, 2, 3])
 *
 * @since 2.5.0
 */
export function union(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        return concat(xs, ys.filter(function (a) { return !elemE(a, xs); }));
    };
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { intersection } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(intersection(eqNumber)([1, 2], [2, 3]), [2])
 *
 * @since 2.5.0
 */
export function intersection(E) {
    var elemE = elem(E);
    return function (xs, ys) { return xs.filter(function (a) { return elemE(a, ys); }); };
}
/**
 * Creates an array of array values not included in the other given array using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { difference } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(difference(eqNumber)([1, 2], [2, 3]), [1])
 *
 * @since 2.5.0
 */
export function difference(E) {
    var elemE = elem(E);
    return function (xs, ys) { return xs.filter(function (a) { return !elemE(a, ys); }); };
}
/**
 * @since 2.5.0
 */
export var of = function (a) { return [a]; };
/**
 * @since 2.5.0
 */
export var readonlyArray = {
    URI: URI,
    map: function (fa, f) { return fa.map(function (a) { return f(a); }); },
    mapWithIndex: function (fa, f) { return fa.map(function (a, i) { return f(i, a); }); },
    compact: function (as) { return readonlyArray.filterMap(as, identity); },
    separate: function (fa) {
        // tslint:disable-next-line: readonly-array
        var left = [];
        // tslint:disable-next-line: readonly-array
        var right = [];
        for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
            var e = fa_1[_i];
            if (e._tag === 'Left') {
                left.push(e.left);
            }
            else {
                right.push(e.right);
            }
        }
        return {
            left: left,
            right: right
        };
    },
    filter: function (as, predicate) {
        return as.filter(predicate);
    },
    filterMap: function (as, f) { return readonlyArray.filterMapWithIndex(as, function (_, a) { return f(a); }); },
    partition: function (fa, predicate) {
        return readonlyArray.partitionWithIndex(fa, function (_, a) { return predicate(a); });
    },
    partitionMap: function (fa, f) { return readonlyArray.partitionMapWithIndex(fa, function (_, a) { return f(a); }); },
    of: of,
    ap: function (fab, fa) { return flatten(readonlyArray.map(fab, function (f) { return readonlyArray.map(fa, f); })); },
    chain: function (fa, f) {
        var resLen = 0;
        var l = fa.length;
        var temp = new Array(l);
        for (var i = 0; i < l; i++) {
            var e = fa[i];
            var arr = f(e);
            resLen += arr.length;
            temp[i] = arr;
        }
        var r = Array(resLen);
        var start = 0;
        for (var i = 0; i < l; i++) {
            var arr = temp[i];
            var l_1 = arr.length;
            for (var j = 0; j < l_1; j++) {
                r[j + start] = arr[j];
            }
            start += l_1;
        }
        return r;
    },
    reduce: function (fa, b, f) { return readonlyArray.reduceWithIndex(fa, b, function (_, b, a) { return f(b, a); }); },
    foldMap: function (M) {
        var foldMapWithIndexM = readonlyArray.foldMapWithIndex(M);
        return function (fa, f) { return foldMapWithIndexM(fa, function (_, a) { return f(a); }); };
    },
    reduceRight: function (fa, b, f) { return readonlyArray.reduceRightWithIndex(fa, b, function (_, a, b) { return f(a, b); }); },
    unfold: function (b, f) {
        // tslint:disable-next-line: readonly-array
        var ret = [];
        var bb = b;
        while (true) {
            var mt = f(bb);
            if (isSome(mt)) {
                var _a = mt.value, a = _a[0], b_1 = _a[1];
                ret.push(a);
                bb = b_1;
            }
            else {
                break;
            }
        }
        return ret;
    },
    traverse: function (F) {
        var traverseWithIndexF = readonlyArray.traverseWithIndex(F);
        return function (ta, f) { return traverseWithIndexF(ta, function (_, a) { return f(a); }); };
    },
    sequence: function (F) { return function (ta) {
        return readonlyArray.reduce(ta, F.of(readonlyArray.zero()), function (fas, fa) {
            return F.ap(F.map(fas, function (as) { return function (a) { return snoc(as, a); }; }), fa);
        });
    }; },
    zero: function () { return empty; },
    alt: function (fx, f) { return concat(fx, f()); },
    extend: function (fa, f) { return fa.map(function (_, i, as) { return f(as.slice(i)); }); },
    wither: function (F) {
        var traverseF = readonlyArray.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), readonlyArray.compact); };
    },
    wilt: function (F) {
        var traverseF = readonlyArray.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), readonlyArray.separate); };
    },
    reduceWithIndex: function (fa, b, f) {
        var l = fa.length;
        var r = b;
        for (var i = 0; i < l; i++) {
            r = f(i, r, fa[i]);
        }
        return r;
    },
    foldMapWithIndex: function (M) { return function (fa, f) { return fa.reduce(function (b, a, i) { return M.concat(b, f(i, a)); }, M.empty); }; },
    reduceRightWithIndex: function (fa, b, f) { return fa.reduceRight(function (b, a, i) { return f(i, a, b); }, b); },
    traverseWithIndex: function (F) { return function (ta, f) {
        return readonlyArray.reduceWithIndex(ta, F.of(readonlyArray.zero()), function (i, fbs, a) {
            return F.ap(F.map(fbs, function (bs) { return function (b) { return snoc(bs, b); }; }), f(i, a));
        });
    }; },
    partitionMapWithIndex: function (fa, f) {
        // tslint:disable-next-line: readonly-array
        var left = [];
        // tslint:disable-next-line: readonly-array
        var right = [];
        for (var i = 0; i < fa.length; i++) {
            var e = f(i, fa[i]);
            if (e._tag === 'Left') {
                left.push(e.left);
            }
            else {
                right.push(e.right);
            }
        }
        return {
            left: left,
            right: right
        };
    },
    partitionWithIndex: function (fa, predicateWithIndex) {
        // tslint:disable-next-line: readonly-array
        var left = [];
        // tslint:disable-next-line: readonly-array
        var right = [];
        for (var i = 0; i < fa.length; i++) {
            var a = fa[i];
            if (predicateWithIndex(i, a)) {
                right.push(a);
            }
            else {
                left.push(a);
            }
        }
        return {
            left: left,
            right: right
        };
    },
    filterMapWithIndex: function (fa, f) {
        // tslint:disable-next-line: readonly-array
        var result = [];
        for (var i = 0; i < fa.length; i++) {
            var optionB = f(i, fa[i]);
            if (isSome(optionB)) {
                result.push(optionB.value);
            }
        }
        return result;
    },
    filterWithIndex: function (fa, predicateWithIndex) {
        return fa.filter(function (a, i) { return predicateWithIndex(i, a); });
    }
};
var _a = pipeable(readonlyArray), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, duplicate = _a.duplicate, extend = _a.extend, filter = _a.filter, filterMap = _a.filterMap, filterMapWithIndex = _a.filterMapWithIndex, filterWithIndex = _a.filterWithIndex, foldMap = _a.foldMap, foldMapWithIndex = _a.foldMapWithIndex, map = _a.map, mapWithIndex = _a.mapWithIndex, partition = _a.partition, partitionMap = _a.partitionMap, partitionMapWithIndex = _a.partitionMapWithIndex, partitionWithIndex = _a.partitionWithIndex, reduce = _a.reduce, reduceRight = _a.reduceRight, reduceRightWithIndex = _a.reduceRightWithIndex, reduceWithIndex = _a.reduceWithIndex, compact = _a.compact, separate = _a.separate;
export { 
/**
 * @since 2.5.0
 */
alt, 
/**
 * @since 2.5.0
 */
ap, 
/**
 * @since 2.5.0
 */
apFirst, 
/**
 * @since 2.5.0
 */
apSecond, 
/**
 * @since 2.5.0
 */
chain, 
/**
 * @since 2.5.0
 */
chainFirst, 
/**
 * @since 2.5.0
 */
duplicate, 
/**
 * @since 2.5.0
 */
extend, 
/**
 * @since 2.5.0
 */
filter, 
/**
 * @since 2.5.0
 */
filterMap, 
/**
 * @since 2.5.0
 */
filterMapWithIndex, 
/**
 * @since 2.5.0
 */
filterWithIndex, 
/**
 * @since 2.5.0
 */
foldMap, 
/**
 * @since 2.5.0
 */
foldMapWithIndex, 
/**
 * @since 2.5.0
 */
map, 
/**
 * @since 2.5.0
 */
mapWithIndex, 
/**
 * @since 2.5.0
 */
partition, 
/**
 * @since 2.5.0
 */
partitionMap, 
/**
 * @since 2.5.0
 */
partitionMapWithIndex, 
/**
 * @since 2.5.0
 */
partitionWithIndex, 
/**
 * @since 2.5.0
 */
reduce, 
/**
 * @since 2.5.0
 */
reduceRight, 
/**
 * @since 2.5.0
 */
reduceRightWithIndex, 
/**
 * @since 2.5.0
 */
reduceWithIndex, 
/**
 * @since 2.5.0
 */
compact, 
/**
 * @since 2.5.0
 */
separate };
