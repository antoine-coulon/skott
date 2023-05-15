/**
 * This module provides utility functions for working with arrays in TypeScript.
 *
 * @since 1.0.0
 */
import * as E from "@effect/data/Either";
import { dual, identity } from "@effect/data/Function";
import * as readonlyArray from "@effect/data/internal/ReadonlyArray";
import * as O from "@effect/data/Option";
import * as RR from "@effect/data/ReadonlyRecord";
import * as string from "@effect/data/String";
import * as applicative from "@effect/data/typeclass/Applicative";
import * as chainable from "@effect/data/typeclass/Chainable";
import * as covariant from "@effect/data/typeclass/Covariant";
import * as flatMap_ from "@effect/data/typeclass/FlatMap";
import * as foldable from "@effect/data/typeclass/Foldable";
import * as invariant from "@effect/data/typeclass/Invariant";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as of_ from "@effect/data/typeclass/Of";
import * as order from "@effect/data/typeclass/Order";
import * as semiApplicative from "@effect/data/typeclass/SemiApplicative";
import * as semigroup from "@effect/data/typeclass/Semigroup";
import * as semiProduct from "@effect/data/typeclass/SemiProduct";
import * as traversable from "@effect/data/typeclass/Traversable";
import * as traversableFilterable from "@effect/data/typeclass/TraversableFilterable";
/**
 * Builds a `NonEmptyArray` from an non-empty collection of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const make = (...elements) => elements;
/**
 * Return a `NonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to an integer >= 1.
 *
 * @example
 * import { makeBy } from '@effect/data/ReadonlyArray'
 *
 * assert.deepStrictEqual(makeBy(5, n => n * 2), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 1.0.0
 */
export const makeBy = (n, f) => {
  const max = Math.max(1, Math.floor(n));
  const out = [f(0)];
  for (let i = 1; i < max; i++) {
    out.push(f(i));
  }
  return out;
};
/**
 * Return a `NonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from '@effect/data/ReadonlyArray'
 *
 * assert.deepStrictEqual(range(1, 3), [1, 2, 3])
 *
 * @category constructors
 * @since 1.0.0
 */
export const range = (start, end) => start <= end ? makeBy(end - start + 1, i => start + i) : [start];
/**
 * Return a `NonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to an integer >= 1.
 *
 * @example
 * import { replicate } from '@effect/data/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate("a", 3), ["a", "a", "a"])
 *
 * @category constructors
 * @since 1.0.0
 */
export const replicate = /*#__PURE__*/dual(2, (a, n) => makeBy(n, () => a));
/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable = readonlyArray.fromIterable;
/**
 * Takes a record and returns an array of tuples containing its keys and values.
 *
 * @param self - The record to transform.
 *
 * @example
 * import { fromRecord } from "@effect/data/ReadonlyArray"
 *
 * const x = { a: 1, b: 2, c: 3 }
 * assert.deepStrictEqual(fromRecord(x), [["a", 1], ["b", 2], ["c", 3]])
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromRecord = RR.toEntries;
/**
 * @category conversions
 * @since 1.0.0
 */
export const fromOption = O.toArray;
/**
 * @category conversions
 * @since 1.0.0
 */
export const fromEither = E.toArray;
/**
 * @category pattern matching
 * @since 1.0.0
 */
export const match = /*#__PURE__*/dual(3, (self, onEmpty, onNonEmpty) => isNonEmptyReadonlyArray(self) ? onNonEmpty(self) : onEmpty());
/**
 * @category pattern matching
 * @since 1.0.0
 */
export const matchLeft = /*#__PURE__*/dual(3, (self, onEmpty, onNonEmpty) => isNonEmptyReadonlyArray(self) ? onNonEmpty(headNonEmpty(self), tailNonEmpty(self)) : onEmpty());
/**
 * @category pattern matching
 * @since 1.0.0
 */
export const matchRight = /*#__PURE__*/dual(3, (self, onEmpty, onNonEmpty) => isNonEmptyReadonlyArray(self) ? onNonEmpty(initNonEmpty(self), lastNonEmpty(self)) : onEmpty());
/**
 * Prepend an element to the front of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
export const prepend = /*#__PURE__*/dual(2, (self, head) => [head, ...self]);
/**
 * @since 1.0.0
 */
export const prependAll = /*#__PURE__*/dual(2, (self, that) => fromIterable(that).concat(fromIterable(self)));
/**
 * @since 1.0.0
 */
export const prependAllNonEmpty = /*#__PURE__*/dual(2, (self, that) => prependAll(self, that));
/**
 * Append an element to the end of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
export const append = /*#__PURE__*/dual(2, (self, last) => [...self, last]);
/**
 * @since 1.0.0
 */
export const appendAll = /*#__PURE__*/dual(2, (self, that) => fromIterable(self).concat(fromIterable(that)));
/**
 * @since 1.0.0
 */
export const appendAllNonEmpty = /*#__PURE__*/dual(2, (self, that) => appendAll(self, that));
/**
 * Reduce an `Iterable` from the left, keeping all intermediate results instead of only the final result.
 *
 * @category folding
 * @since 1.0.0
 */
export const scan = /*#__PURE__*/dual(3, (self, b, f) => {
  const out = [b];
  let i = 0;
  for (const a of self) {
    out[i + 1] = f(out[i], a);
    i++;
  }
  return out;
});
/**
 * Reduce an `Iterable` from the right, keeping all intermediate results instead of only the final result.
 *
 * @category folding
 * @since 1.0.0
 */
export const scanRight = /*#__PURE__*/dual(3, (self, b, f) => {
  const input = fromIterable(self);
  const out = new Array(input.length + 1);
  out[input.length] = b;
  for (let i = input.length - 1; i >= 0; i--) {
    out[i] = f(out[i + 1], input[i]);
  }
  return out;
});
/**
 * Determine if an `Array` is empty narrowing down the type to `[]`.
 *
 * @param self - The `Array` to check.
 *
 * @example
 * import { isEmptyArray } from "@effect/data/ReadonlyArray"
 *
 * assert.deepStrictEqual(isEmptyArray([]), true);
 * assert.deepStrictEqual(isEmptyArray([1, 2, 3]), false);
 *
 * @category guards
 * @since 1.0.0
 */
export const isEmptyArray = self => self.length === 0;
/**
 * Determine if a `ReadonlyArray` is empty narrowing down the type to `readonly []`.
 *
 * @param self - The `ReadonlyArray` to check.
 *
 * @example
 * import { isEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
 *
 * assert.deepStrictEqual(isEmptyReadonlyArray([]), true);
 * assert.deepStrictEqual(isEmptyReadonlyArray([1, 2, 3]), false);
 *
 * @category guards
 * @since 1.0.0
 */
export const isEmptyReadonlyArray = isEmptyArray;
/**
 * Determine if an `Array` is non empty narrowing down the type to `NonEmptyArray`.
 *
 * An `Array` is considered to be a `NonEmptyArray` if it contains at least one element.
 *
 * @param self - The `Array` to check.
 *
 * @example
 * import { isNonEmptyArray } from "@effect/data/ReadonlyArray"
 *
 * assert.deepStrictEqual(isNonEmptyArray([]), false);
 * assert.deepStrictEqual(isNonEmptyArray([1, 2, 3]), true);
 *
 * @category guards
 * @since 1.0.0
 */
export const isNonEmptyArray = readonlyArray.isNonEmptyArray;
/**
 * Determine if a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray`.
 *
 * A `ReadonlyArray` is considered to be a `NonEmptyReadonlyArray` if it contains at least one element.
 *
 * @param self - The `ReadonlyArray` to check.
 *
 * @example
 * import { isNonEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
 *
 * assert.deepStrictEqual(isNonEmptyReadonlyArray([]), false);
 * assert.deepStrictEqual(isNonEmptyReadonlyArray([1, 2, 3]), true);
 *
 * @category guards
 * @since 1.0.0
 */
export const isNonEmptyReadonlyArray = readonlyArray.isNonEmptyArray;
/**
 * Return the number of elements in a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export const length = self => self.length;
const isOutOfBound = (i, as) => i < 0 || i >= as.length;
const clamp = (i, as) => Math.floor(Math.min(Math.max(0, i), as.length));
/**
 * This function provides a safe way to read a value at a particular index from a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export const get = /*#__PURE__*/dual(2, (self, index) => {
  const i = Math.floor(index);
  return isOutOfBound(i, self) ? O.none() : O.some(self[i]);
});
/**
 * Gets an element unsafely, will throw on out of bounds.
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeGet = /*#__PURE__*/dual(2, (self, index) => {
  const i = Math.floor(index);
  if (isOutOfBound(i, self)) {
    throw new Error(`Index ${i} out of bounds`);
  }
  return self[i];
});
/**
 * Return a tuple containing the first element, and a new `Array` of the remaining elements, if any.
 *
 * @category getters
 * @since 1.0.0
 */
export const unprepend = self => [headNonEmpty(self), tailNonEmpty(self)];
/**
 * Return a tuple containing a copy of the `NonEmptyReadonlyArray` without its last element, and that last element.
 *
 * @category getters
 * @since 1.0.0
 */
export const unappend = self => [initNonEmpty(self), lastNonEmpty(self)];
/**
 * Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const head = /*#__PURE__*/get(0);
/**
 * @category getters
 * @since 1.0.0
 */
export const headNonEmpty = /*#__PURE__*/unsafeGet(0);
/**
 * Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const last = self => isNonEmptyReadonlyArray(self) ? O.some(lastNonEmpty(self)) : O.none();
/**
 * @category getters
 * @since 1.0.0
 */
export const lastNonEmpty = self => self[self.length - 1];
/**
 * Get all but the first element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const tail = self => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? O.some(tailNonEmpty(input)) : O.none();
};
/**
 * @category getters
 * @since 1.0.0
 */
export const tailNonEmpty = self => self.slice(1);
/**
 * Get all but the last element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const init = self => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? O.some(initNonEmpty(input)) : O.none();
};
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @category getters
 * @since 1.0.0
 */
export const initNonEmpty = self => self.slice(0, -1);
/**
 * Keep only a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const take = /*#__PURE__*/dual(2, (self, n) => {
  const input = fromIterable(self);
  return input.slice(0, clamp(n, input));
});
/**
 * Keep only a max number of elements from the end of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const takeRight = /*#__PURE__*/dual(2, (self, n) => {
  const input = fromIterable(self);
  const i = clamp(n, input);
  return i === 0 ? [] : input.slice(-i);
});
/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.
 *
 * @category getters
 * @since 1.0.0
 */
export const takeWhile = /*#__PURE__*/dual(2, (self, predicate) => {
  const out = [];
  for (const a of self) {
    if (!predicate(a)) {
      break;
    }
    out.push(a);
  }
  return out;
});
const spanIndex = (self, predicate) => {
  let i = 0;
  for (const a of self) {
    if (!predicate(a)) {
      break;
    }
    i++;
  }
  return i;
};
/**
 * Split an `Iterable` into two parts:
 *
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @category filtering
 * @since 1.0.0
 */
export const span = /*#__PURE__*/dual(2, (self, predicate) => splitAt(self, spanIndex(self, predicate)));
/**
 * Drop a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const drop = /*#__PURE__*/dual(2, (self, n) => {
  const input = fromIterable(self);
  return input.slice(clamp(n, input), input.length);
});
/**
 * Drop a max number of elements from the end of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const dropRight = /*#__PURE__*/dual(2, (self, n) => {
  const input = fromIterable(self);
  return input.slice(0, input.length - clamp(n, input));
});
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.
 *
 * @category getters
 * @since 1.0.0
 */
export const dropWhile = /*#__PURE__*/dual(2, (self, predicate) => fromIterable(self).slice(spanIndex(self, predicate)));
/**
 * Return the first index for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findFirstIndex = /*#__PURE__*/dual(2, (self, predicate) => {
  let i = 0;
  for (const a of self) {
    if (predicate(a)) {
      return O.some(i);
    }
    i++;
  }
  return O.none();
});
/**
 * Return the last index for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findLastIndex = /*#__PURE__*/dual(2, (self, predicate) => {
  const input = fromIterable(self);
  for (let i = input.length - 1; i >= 0; i--) {
    if (predicate(input[i])) {
      return O.some(i);
    }
  }
  return O.none();
});
/**
 * Find the first element for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findFirst = /*#__PURE__*/dual(2, (self, predicate) => {
  const input = fromIterable(self);
  for (let i = 0; i < input.length; i++) {
    if (predicate(input[i])) {
      return O.some(input[i]);
    }
  }
  return O.none();
});
/**
 * Find the last element for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findLast = /*#__PURE__*/dual(2, (self, predicate) => {
  const input = fromIterable(self);
  for (let i = input.length - 1; i >= 0; i--) {
    if (predicate(input[i])) {
      return O.some(input[i]);
    }
  }
  return O.none();
});
/**
 * Insert an element at the specified index, creating a new `NonEmptyArray`,
 * or return `None` if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const insertAt = /*#__PURE__*/dual(3, (self, i, b) => {
  const out = Array.from(self);
  //             v--- `= self.length` is ok, it means inserting in last position
  if (i < 0 || i > out.length) {
    return O.none();
  }
  out.splice(i, 0, b);
  return O.some(out);
});
/**
 * Change the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const replace = /*#__PURE__*/dual(3, (self, i, b) => modify(self, i, () => b));
/**
 * @since 1.0.0
 */
export const replaceOption = /*#__PURE__*/dual(3, (self, i, b) => modifyOption(self, i, () => b));
/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const modify = /*#__PURE__*/dual(3, (self, i, f) => O.getOrElse(modifyOption(self, i, f), () => Array.from(self)));
/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return `None` if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const modifyOption = /*#__PURE__*/dual(3, (self, i, f) => {
  const out = Array.from(self);
  if (isOutOfBound(i, out)) {
    return O.none();
  }
  const next = f(out[i]);
  // @ts-expect-error
  out[i] = next;
  return O.some(out);
});
/**
 * Delete the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const remove = /*#__PURE__*/dual(2, (self, i) => {
  const out = Array.from(self);
  if (isOutOfBound(i, out)) {
    return out;
  }
  out.splice(i, 1);
  return out;
});
/**
 * Reverse an `Iterable`, creating a new `Array`.
 *
 * @since 1.0.0
 */
export const reverse = self => Array.from(self).reverse();
/**
 * @since 1.0.0
 */
export const reverseNonEmpty = self => [lastNonEmpty(self), ...self.slice(0, -1).reverse()];
/**
 * Return all the `Right` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const rights = E.rights;
/**
 * Return all the `Left` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const lefts = E.lefts;
/**
 * Sort the elements of an `Iterable` in increasing order, creating a new `Array`.
 *
 * @category sorting
 * @since 1.0.0
 */
export const sort = /*#__PURE__*/dual(2, (self, O) => {
  const out = Array.from(self);
  out.sort(O.compare);
  return out;
});
/**
 * Sort the elements of a `NonEmptyReadonlyArray` in increasing order, creating a new `NonEmptyArray`.
 *
 * @category sorting
 * @since 1.0.0
 */
export const sortNonEmpty = /*#__PURE__*/dual(2, (self, O) => sort(O)(self));
/**
 * Sort the elements of an `Iterable` in increasing order, where elements are compared
 * using first `orders[0]`, then `orders[1]`, etc...
 *
 * @category sorting
 * @since 1.0.0
 */
export const sortBy = (...orders) => self => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? sortByNonEmpty(...orders)(input) : [];
};
/**
 * @category sorting
 * @since 1.0.0
 */
export const sortByNonEmpty = (...orders) => sortNonEmpty(order.getMonoid().combineAll(orders));
/**
 * Takes two `Iterable`s and returns an `Array` of corresponding pairs.
 * If one input `Iterable` is short, excess elements of the
 * longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
export const zip = /*#__PURE__*/dual(2, (self, that) => zipWith(self, that, (a, b) => [a, b]));
/**
 * Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
 * input `Iterable` is short, excess elements of the longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
export const zipWith = /*#__PURE__*/dual(3, (self, that, f) => {
  const as = fromIterable(self);
  const bs = fromIterable(that);
  return isNonEmptyReadonlyArray(as) && isNonEmptyReadonlyArray(bs) ? zipNonEmptyWith(bs, f)(as) : [];
});
/**
 * @since 1.0.0
 */
export const zipNonEmpty = /*#__PURE__*/dual(2, (self, that) => zipNonEmptyWith(self, that, (a, b) => [a, b]));
/**
 * @since 1.0.0
 */
export const zipNonEmptyWith = /*#__PURE__*/dual(3, (self, that, f) => {
  const cs = [f(headNonEmpty(self), headNonEmpty(that))];
  const len = Math.min(self.length, that.length);
  for (let i = 1; i < len; i++) {
    cs[i] = f(self[i], that[i]);
  }
  return cs;
});
/**
 * This function is the inverse of `zip`. Takes an `Iterable` of pairs and return two corresponding `Array`s.
 *
 * @since 1.0.0
 */
export const unzip = self => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? unzipNonEmpty(input) : [[], []];
};
/**
 * @since 1.0.0
 */
export const unzipNonEmpty = self => {
  const fa = [self[0][0]];
  const fb = [self[0][1]];
  for (let i = 1; i < self.length; i++) {
    fa[i] = self[i][0];
    fb[i] = self[i][1];
  }
  return [fa, fb];
};
/**
 * Places an element in between members of an `Iterable`
 *
 * @since 1.0.0
 */
export const intersperse = /*#__PURE__*/dual(2, (self, middle) => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? intersperseNonEmpty(input, middle) : [];
});
/**
 * Places an element in between members of a `NonEmptyReadonlyArray`
 *
 * @since 1.0.0
 */
export const intersperseNonEmpty = /*#__PURE__*/dual(2, (self, middle) => {
  const out = [headNonEmpty(self)];
  const tail = tailNonEmpty(self);
  for (let i = 0; i < tail.length; i++) {
    if (i < tail.length) {
      out.push(middle);
    }
    out.push(tail[i]);
  }
  return out;
});
/**
 * Apply a function to the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const modifyNonEmptyHead = /*#__PURE__*/dual(2, (self, f) => [f(headNonEmpty(self)), ...tailNonEmpty(self)]);
/**
 * Change the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const setNonEmptyHead = /*#__PURE__*/dual(2, (self, b) => modifyNonEmptyHead(self, () => b));
/**
 * Apply a function to the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const modifyNonEmptyLast = /*#__PURE__*/dual(2, (self, f) => append(initNonEmpty(self), f(lastNonEmpty(self))));
/**
 * Change the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const setNonEmptyLast = /*#__PURE__*/dual(2, (self, b) => modifyNonEmptyLast(self, () => b));
/**
 * Rotate an `Iterable` by `n` steps.
 *
 * @since 1.0.0
 */
export const rotate = /*#__PURE__*/dual(2, (self, n) => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? rotateNonEmpty(input, n) : [];
});
/**
 * Rotate a `NonEmptyReadonlyArray` by `n` steps.
 *
 * @since 1.0.0
 */
export const rotateNonEmpty = /*#__PURE__*/dual(2, (self, n) => {
  const len = self.length;
  const m = Math.round(n) % len;
  if (isOutOfBound(Math.abs(m), self) || m === 0) {
    return copy(self);
  }
  if (m < 0) {
    const [f, s] = splitNonEmptyAt(self, -m);
    return appendAllNonEmpty(s, f);
  } else {
    return rotateNonEmpty(self, m - len);
  }
});
/**
 * Returns a function that checks if a `ReadonlyArray` contains a given value using a provided `equivalence` function.
 *
 * @category predicates
 * @since 1.0.0
 */
export const contains = isEquivalent => dual(2, (self, a) => {
  for (const i of self) {
    if (isEquivalent(a, i)) {
      return true;
    }
  }
  return false;
});
/**
 * Remove duplicates from am `Iterable`, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 */
export const uniq = /*#__PURE__*/dual(2, (self, isEquivalent) => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? uniqNonEmpty(isEquivalent)(input) : [];
});
/**
 * Remove duplicates from a `NonEmptyReadonlyArray`, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 */
export const uniqNonEmpty = /*#__PURE__*/dual(2, (self, isEquivalent) => {
  const out = [headNonEmpty(self)];
  const rest = tailNonEmpty(self);
  for (const a of rest) {
    if (out.every(o => !isEquivalent(a, o))) {
      out.push(a);
    }
  }
  return out;
});
/**
 * A useful recursion pattern for processing an `Iterable` to produce a new `Array`, often used for "chopping" up the input
 * `Iterable`. Typically chop is called with some function that will consume an initial prefix of the `Iterable` and produce a
 * value and the rest of the `Array`.
 *
 * @since 1.0.0
 */
export const chop = /*#__PURE__*/dual(2, (self, f) => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? chopNonEmpty(input, f) : [];
});
/**
 * A useful recursion pattern for processing a `NonEmptyReadonlyArray` to produce a new `NonEmptyReadonlyArray`, often used for "chopping" up the input
 * `NonEmptyReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `NonEmptyReadonlyArray` and produce a
 * value and the tail of the `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const chopNonEmpty = /*#__PURE__*/dual(2, (self, f) => {
  const [b, rest] = f(self);
  const out = [b];
  let next = rest;
  while (readonlyArray.isNonEmptyArray(next)) {
    const [b, rest] = f(next);
    out.push(b);
    next = rest;
  }
  return out;
});
/**
 * Splits an `Iterable` into two pieces, the first piece has max `n` elements.
 *
 * @category getters
 * @since 1.0.0
 */
export const splitAt = /*#__PURE__*/dual(2, (self, n) => {
  const input = Array.from(self);
  return n >= 1 && isNonEmptyReadonlyArray(input) ? splitNonEmptyAt(input, n) : isEmptyReadonlyArray(input) ? [input, []] : [[], input];
});
/**
 * @since 1.0.0
 */
export const copy = self => self.slice();
/**
 * Splits a `NonEmptyReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category getters
 * @since 1.0.0
 */
export const splitNonEmptyAt = /*#__PURE__*/dual(2, (self, n) => {
  const m = Math.max(1, n);
  return m >= self.length ? [copy(self), []] : [prepend(self.slice(1, m), headNonEmpty(self)), self.slice(m)];
});
/**
 * Splits an `Iterable` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `Iterable`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `self`.
 *
 * @category getters
 * @since 1.0.0
 */
export const chunksOf = /*#__PURE__*/dual(2, (self, n) => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? chunksOfNonEmpty(input, n) : [];
});
/**
 * Splits a `NonEmptyReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `NonEmptyReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export const chunksOfNonEmpty = /*#__PURE__*/dual(2, (self, n) => chopNonEmpty(self, splitNonEmptyAt(n)));
/**
 * Group equal, consecutive elements of a `NonEmptyReadonlyArray` into `NonEmptyArray`s.
 *
 * @category grouping
 * @since 1.0.0
 */
export const group = /*#__PURE__*/dual(2, (self, isEquivalent) => chopNonEmpty(self, as => {
  const h = headNonEmpty(as);
  const out = [h];
  let i = 1;
  for (; i < as.length; i++) {
    const a = as[i];
    if (isEquivalent(a, h)) {
      out.push(a);
    } else {
      break;
    }
  }
  return [out, as.slice(i)];
}));
/**
 * Splits an `Iterable` into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @category grouping
 * @since 1.0.0
 */
export const groupBy = /*#__PURE__*/dual(2, (self, f) => {
  const out = {};
  for (const a of self) {
    const k = f(a);
    if (Object.prototype.hasOwnProperty.call(out, k)) {
      out[k].push(a);
    } else {
      out[k] = [a];
    }
  }
  return out;
});
/**
 * @since 1.0.0
 */
export const union = isEquivalent => dual(2, (self, that) => {
  const a = Array.from(self);
  const b = Array.from(that);
  return isNonEmptyReadonlyArray(a) && isNonEmptyReadonlyArray(b) ? unionNonEmpty(isEquivalent)(a, b) : isNonEmptyReadonlyArray(a) ? a : b;
});
/**
 * @since 1.0.0
 */
export const unionNonEmpty = isEquivalent => dual(2, (self, that) => uniqNonEmpty(isEquivalent)(appendAllNonEmpty(self, that)));
/**
 * Creates an `Array` of unique values that are included in all given `Iterable`s.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
export const intersection = isEquivalent => {
  const has = contains(isEquivalent);
  return dual(2, (self, that) => fromIterable(self).filter(a => has(that, a)));
};
/**
 * Creates a `Array` of values not included in the other given `Iterable`.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
export const difference = isEquivalent => {
  const has = contains(isEquivalent);
  return dual(2, (self, that) => fromIterable(self).filter(a => !has(that, a)));
};
/**
 * @category constructors
 * @since 1.0.0
 */
export const empty = () => [];
/**
 * Constructs a new `NonEmptyArray<A>` from the specified value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const of = a => [a];
const Of = {
  of
};
/**
 * @category mapping
 * @since 1.0.0
 */
export const map = /*#__PURE__*/dual(2, (self, f) => self.map(f));
/**
 * @category mapping
 * @since 1.0.0
 */
export const mapNonEmpty = map;
const imap = /*#__PURE__*/covariant.imap(map);
/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant = {
  imap,
  map
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant = {
  imap
};
/**
 * @category mapping
 * @since 1.0.0
 */
export const tupled = /*#__PURE__*/invariant.tupled(Invariant);
/**
 * @category mapping
 * @since 1.0.0
 */
export const flap = /*#__PURE__*/covariant.flap(Covariant);
/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed = {
  of,
  imap,
  map
};
/**
 * @category combining
 * @since 1.0.0
 */
export const flatMap = /*#__PURE__*/dual(2, (self, f) => {
  if (isEmptyReadonlyArray(self)) {
    return [];
  }
  const out = [];
  for (let i = 0; i < self.length; i++) {
    out.push(...f(self[i], i));
  }
  return out;
});
/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapNonEmpty = flatMap;
/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap = {
  flatMap
};
/**
 * @category combining
 * @since 1.0.0
 */
export const flatten = /*#__PURE__*/flatMap_.flatten(FlatMap);
/**
 * @category combining
 * @since 1.0.0
 */
export const flattenNonEmpty = /*#__PURE__*/flatMapNonEmpty(identity);
/**
 * @since 1.0.0
 */
export const composeK = /*#__PURE__*/flatMap_.composeK(FlatMap);
/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable = {
  imap,
  map,
  flatMap
};
/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap = /*#__PURE__*/dual(2, (self, f) => {
  const as = fromIterable(self);
  const out = [];
  for (let i = 0; i < as.length; i++) {
    const o = f(as[i], i);
    if (O.isSome(o)) {
      out.push(o.value);
    }
  }
  return out;
});
/**
 * @category filtering
 * @since 1.0.0
 */
export const partitionMap = /*#__PURE__*/dual(2, (self, f) => {
  const left = [];
  const right = [];
  const as = fromIterable(self);
  for (let i = 0; i < as.length; i++) {
    const e = f(as[i], i);
    if (E.isLeft(e)) {
      left.push(e.left);
    } else {
      right.push(e.right);
    }
  }
  return [left, right];
});
/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable = {
  partitionMap,
  filterMap
};
/**
 * @category filtering
 * @since 1.0.0
 */
export const compact = /*#__PURE__*/filterMap(identity);
/**
 * @category filtering
 * @since 1.0.0
 */
export const filter = /*#__PURE__*/dual(2, (self, predicate) => {
  const as = fromIterable(self);
  const out = [];
  for (let i = 0; i < as.length; i++) {
    if (predicate(as[i], i)) {
      out.push(as[i]);
    }
  }
  return out;
});
/**
 * @category filtering
 * @since 1.0.0
 */
export const partition = /*#__PURE__*/dual(2, (self, predicate) => {
  const left = [];
  const right = [];
  const as = fromIterable(self);
  for (let i = 0; i < as.length; i++) {
    if (predicate(as[i], i)) {
      right.push(as[i]);
    } else {
      left.push(as[i]);
    }
  }
  return [left, right];
});
/**
 * @category filtering
 * @since 1.0.0
 */
export const separate = /*#__PURE__*/partitionMap(identity);
/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseNonEmpty = F => dual(2, (self, f) => {
  const [head, ...tail] = mapNonEmpty(self, f);
  return F.productMany(head, tail);
});
/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = F => dual(2, (self, f) => F.productAll(fromIterable(self).map(f)));
/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence = F => traverse(F)(identity);
/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable = {
  traverse: traverse
};
/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap = /*#__PURE__*/traversable.traverseTap(Traversable);
/**
 * @category traversing
 * @since 1.0.0
 */
export const sequenceNonEmpty = F => traverseNonEmpty(F)(identity);
const product = (self, that) => {
  if (isEmptyReadonlyArray(self) || isEmptyReadonlyArray(that)) {
    return empty();
  }
  const out = [];
  for (let i = 0; i < self.length; i++) {
    for (let j = 0; j < that.length; j++) {
      out.push([self[i], that[j]]);
    }
  }
  return out;
};
const productMany = /*#__PURE__*/semiProduct.productMany(map, product);
/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct = {
  imap,
  product,
  productMany
};
/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative = {
  imap,
  map,
  product,
  productMany
};
/**
 * @since 1.0.0
 */
export const ap = /*#__PURE__*/semiApplicative.ap(SemiApplicative);
/**
 * Lifts a binary function into `ReadonlyArray`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2 = /*#__PURE__*/semiApplicative.lift2(SemiApplicative);
/**
 * @category instances
 * @since 1.0.0
 */
export const Product = {
  of,
  imap,
  product,
  productMany,
  productAll: collection => {
    const arrays = fromIterable(collection);
    return isEmptyReadonlyArray(arrays) ? empty() : SemiProduct.productMany(arrays[0], arrays.slice(1));
  }
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll: Product.productAll
};
/**
 * @category lifting
 * @since 1.0.0
 */
export const liftMonoid = /*#__PURE__*/applicative.getMonoid(Applicative);
/**
 * @category instances
 * @since 1.0.0
 */
export const Monad = {
  imap,
  of,
  map,
  flatMap
};
/**
 * @category folding
 * @since 1.0.0
 */
export const reduce = /*#__PURE__*/dual(3, (self, b, f) => fromIterable(self).reduce((b, a, i) => f(b, a, i), b));
/**
 * @category folding
 * @since 1.0.0
 */
export const reduceRight = /*#__PURE__*/dual(3, (self, b, f) => fromIterable(self).reduceRight((b, a, i) => f(b, a, i), b));
/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable = {
  reduce
};
/**
 * @category folding
 * @since 1.0.0
 */
export const combineMap = Monoid => dual(2, (self, f) => fromIterable(self).reduce((m, a, i) => Monoid.combine(m, f(a, i)), Monoid.empty));
/**
 * @category folding
 * @since 1.0.0
 */
export const combineMapNonEmpty = S => dual(2, (self, f) => tailNonEmpty(self).reduce((s, a, i) => S.combine(s, f(a, i + 1)), f(headNonEmpty(self), 0)));
/**
 * @category folding
 * @since 1.0.0
 */
export const reduceKind = /*#__PURE__*/foldable.reduceKind(Foldable);
/**
 * @category folding
 * @since 1.0.0
 */
export const coproductMapKind = /*#__PURE__*/foldable.coproductMapKind(Foldable);
/**
 * @category filtering
 * @since 1.0.0
 */
export const traversePartitionMap = F => dual(2, (self, f) => {
  return F.map(traverse(F)(self, f), separate);
});
/**
 * @category filtering
 * @since 1.0.0
 */
export const traverseFilterMap = F => dual(2, (self, f) => {
  return F.map(traverse(F)(self, f), compact);
});
/**
 * @category instances
 * @since 1.0.0
 */
export const TraversableFilterable = {
  traversePartitionMap: traversePartitionMap,
  traverseFilterMap: traverseFilterMap
};
/**
 * Filter values inside a context.
 *
 * @since 1.0.0
 */
export const traverseFilter = /*#__PURE__*/traversableFilterable.traverseFilter(TraversableFilterable);
/**
 * @since 1.0.0
 */
export const traversePartition = /*#__PURE__*/traversableFilterable.traversePartition(TraversableFilterable);
/**
 * @category lifting
 * @since 1.0.0
 */
export const liftPredicate = predicate => b => predicate(b) ? [b] : [];
/**
 * @category lifting
 * @since 1.0.0
 */
export const liftOption = f => (...a) => fromOption(f(...a));
/**
 * @category conversions
 * @since 1.0.0
 */
export const fromNullable = a => a == null ? empty() : [a];
/**
 * @category lifting
 * @since 1.0.0
 */
export const liftNullable = f => (...a) => fromNullable(f(...a));
/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapNullable = /*#__PURE__*/dual(2, (self, f) => isNonEmptyReadonlyArray(self) ? fromNullable(f(headNonEmpty(self))) : empty());
/**
 * @category lifting
 * @since 1.0.0
 */
export const liftEither = f => (...a) => {
  const e = f(...a);
  return E.isLeft(e) ? [] : [e.right];
};
export function every(predicate) {
  return self => self.every(predicate);
}
/**
 * Check if a predicate holds true for some `ReadonlyArray` member.
 *
 * @category predicates
 * @since 1.0.0
 */
export const some = predicate => self => self.some(predicate);
/**
 * Fold an `Iterable`, accumulating values in some `Monoid`, combining adjacent elements
 * using the specified separator.
 *
 * @since 1.0.0
 */
export const intercalate = M => dual(2, (self, middle) => {
  const as = fromIterable(self);
  return isNonEmptyReadonlyArray(as) ? intercalateNonEmpty(M)(as, middle) : M.empty;
});
/**
 * Places an element in between members of a `NonEmptyReadonlyArray`, then folds the results using the provided `Semigroup`.
 *
 * @since 1.0.0
 */
export const intercalateNonEmpty = S => dual(2, (self, middle) => semigroup.intercalate(S, middle).combineMany(headNonEmpty(self), tailNonEmpty(self)));
/**
 * @since 1.0.0
 */
export const join = /*#__PURE__*/intercalate(string.Monoid);
/**
 * @since 1.0.0
 */
export const extend = /*#__PURE__*/dual(2, (self, f) => self.map((_, i, as) => f(as.slice(i))));
/**
 * @since 1.0.0
 */
export const min = /*#__PURE__*/dual(2, (self, O) => {
  const S = semigroup.min(O);
  return self.reduce(S.combine);
});
/**
 * @since 1.0.0
 */
export const max = /*#__PURE__*/dual(2, (self, O) => {
  const S = semigroup.max(O);
  return self.reduce(S.combine);
});
/**
 * @category constructors
 * @since 1.0.0
 */
export const unfold = (b, f) => {
  const out = [];
  let next = b;
  let o;
  while (O.isSome(o = f(next))) {
    const [a, b] = o.value;
    out.push(a);
    next = b;
  }
  return out;
};
/**
 * @category instances
 * @since 1.0.0
 */
export const getUnionSemigroup = isEquivalent => semigroup.make(union(isEquivalent));
/**
 * @category instances
 * @since 1.0.0
 */
export const getUnionMonoid = isEquivalent => {
  const S = getUnionSemigroup(isEquivalent);
  return {
    combine: S.combine,
    combineMany: S.combineMany,
    combineAll: collection => S.combineMany([], collection),
    empty: []
  };
};
/**
 * @category instances
 * @since 1.0.0
 */
export const getIntersectionSemigroup = isEquivalent => semigroup.make(intersection(isEquivalent));
/**
 * Returns a `Semigroup` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = semigroup.array;
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = monoid.array;
/**
 * This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
 * The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
 * If all elements are equal, the arrays are then compared based on their length.
 * It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
 *
 * @category lifting
 * @since 1.0.0
 */
export const getOrder = order.array;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo = /*#__PURE__*/invariant.bindTo(Invariant);
const let_ = /*#__PURE__*/covariant.let(Covariant);
export {
/**
 * @category do notation
 * @since 1.0.0
 */
let_ as let };
/**
 * @category do notation
 * @since 1.0.0
 */
export const Do = /*#__PURE__*/of_.Do(Of);
/**
 * @category do notation
 * @since 1.0.0
 */
export const bind = /*#__PURE__*/chainable.bind(Chainable);
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind = /*#__PURE__*/semiProduct.andThenBind(SemiProduct);
//# sourceMappingURL=ReadonlyArray.mjs.map