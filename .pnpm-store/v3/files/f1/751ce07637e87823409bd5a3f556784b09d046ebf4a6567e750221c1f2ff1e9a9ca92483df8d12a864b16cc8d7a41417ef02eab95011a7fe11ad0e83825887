"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.empty = exports.dropWhile = exports.dropRight = exports.drop = exports.difference = exports.copy = exports.coproductMapKind = exports.contains = exports.composeK = exports.compact = exports.combineMapNonEmpty = exports.combineMap = exports.chunksOfNonEmpty = exports.chunksOf = exports.chopNonEmpty = exports.chop = exports.bindTo = exports.bind = exports.appendAllNonEmpty = exports.appendAll = exports.append = exports.ap = exports.andThenBind = exports.TraversableFilterable = exports.Traversable = exports.SemiProduct = exports.SemiApplicative = exports.Product = exports.Pointed = exports.Monad = exports.Invariant = exports.Foldable = exports.FlatMap = exports.Filterable = exports.Do = exports.Covariant = exports.Chainable = exports.Applicative = void 0;
exports.every = every;
exports.max = exports.matchRight = exports.matchLeft = exports.match = exports.mapNonEmpty = exports.map = exports.makeBy = exports.make = exports.liftPredicate = exports.liftOption = exports.liftNullable = exports.liftMonoid = exports.liftEither = exports.lift2 = exports.let = exports.length = exports.lefts = exports.lastNonEmpty = exports.last = exports.join = exports.isNonEmptyReadonlyArray = exports.isNonEmptyArray = exports.isEmptyReadonlyArray = exports.isEmptyArray = exports.intersperseNonEmpty = exports.intersperse = exports.intersection = exports.intercalateNonEmpty = exports.intercalate = exports.insertAt = exports.initNonEmpty = exports.init = exports.headNonEmpty = exports.head = exports.groupBy = exports.group = exports.getUnionSemigroup = exports.getUnionMonoid = exports.getSemigroup = exports.getOrder = exports.getMonoid = exports.getIntersectionSemigroup = exports.get = exports.fromRecord = exports.fromOption = exports.fromNullable = exports.fromIterable = exports.fromEither = exports.flattenNonEmpty = exports.flatten = exports.flatMapNullable = exports.flatMapNonEmpty = exports.flatMap = exports.flap = exports.findLastIndex = exports.findLast = exports.findFirstIndex = exports.findFirst = exports.filterMap = exports.filter = exports.extend = void 0;
exports.zipWith = exports.zipNonEmptyWith = exports.zipNonEmpty = exports.zip = exports.unzipNonEmpty = exports.unzip = exports.unsafeGet = exports.unprepend = exports.uniqNonEmpty = exports.uniq = exports.unionNonEmpty = exports.union = exports.unfold = exports.unappend = exports.tupled = exports.traverseTap = exports.traversePartitionMap = exports.traversePartition = exports.traverseNonEmpty = exports.traverseFilterMap = exports.traverseFilter = exports.traverse = exports.takeWhile = exports.takeRight = exports.take = exports.tailNonEmpty = exports.tail = exports.splitNonEmptyAt = exports.splitAt = exports.span = exports.sortNonEmpty = exports.sortByNonEmpty = exports.sortBy = exports.sort = exports.some = exports.setNonEmptyLast = exports.setNonEmptyHead = exports.sequenceNonEmpty = exports.sequence = exports.separate = exports.scanRight = exports.scan = exports.rotateNonEmpty = exports.rotate = exports.rights = exports.reverseNonEmpty = exports.reverse = exports.replicate = exports.replaceOption = exports.replace = exports.remove = exports.reduceRight = exports.reduceKind = exports.reduce = exports.range = exports.prependAllNonEmpty = exports.prependAll = exports.prepend = exports.partitionMap = exports.partition = exports.of = exports.modifyOption = exports.modifyNonEmptyLast = exports.modifyNonEmptyHead = exports.modify = exports.min = void 0;
var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var readonlyArray = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/ReadonlyArray"));
var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var RR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/ReadonlyRecord"));
var string = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/String"));
var applicative = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Applicative"));
var chainable = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Chainable"));
var covariant = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Covariant"));
var flatMap_ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/FlatMap"));
var foldable = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Foldable"));
var invariant = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Invariant"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var of_ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Of"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var semiApplicative = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/SemiApplicative"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
var semiProduct = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/SemiProduct"));
var traversable = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Traversable"));
var traversableFilterable = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/TraversableFilterable"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * This module provides utility functions for working with arrays in TypeScript.
 *
 * @since 1.0.0
 */

/**
 * Builds a `NonEmptyArray` from an non-empty collection of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
const make = (...elements) => elements;
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
exports.make = make;
const makeBy = (n, f) => {
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
exports.makeBy = makeBy;
const range = (start, end) => start <= end ? makeBy(end - start + 1, i => start + i) : [start];
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
exports.range = range;
const replicate = /*#__PURE__*/(0, _Function.dual)(2, (a, n) => makeBy(n, () => a));
/**
 * @category conversions
 * @since 1.0.0
 */
exports.replicate = replicate;
const fromIterable = readonlyArray.fromIterable;
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
exports.fromIterable = fromIterable;
const fromRecord = RR.toEntries;
/**
 * @category conversions
 * @since 1.0.0
 */
exports.fromRecord = fromRecord;
const fromOption = O.toArray;
/**
 * @category conversions
 * @since 1.0.0
 */
exports.fromOption = fromOption;
const fromEither = E.toArray;
/**
 * @category pattern matching
 * @since 1.0.0
 */
exports.fromEither = fromEither;
const match = /*#__PURE__*/(0, _Function.dual)(3, (self, onEmpty, onNonEmpty) => isNonEmptyReadonlyArray(self) ? onNonEmpty(self) : onEmpty());
/**
 * @category pattern matching
 * @since 1.0.0
 */
exports.match = match;
const matchLeft = /*#__PURE__*/(0, _Function.dual)(3, (self, onEmpty, onNonEmpty) => isNonEmptyReadonlyArray(self) ? onNonEmpty(headNonEmpty(self), tailNonEmpty(self)) : onEmpty());
/**
 * @category pattern matching
 * @since 1.0.0
 */
exports.matchLeft = matchLeft;
const matchRight = /*#__PURE__*/(0, _Function.dual)(3, (self, onEmpty, onNonEmpty) => isNonEmptyReadonlyArray(self) ? onNonEmpty(initNonEmpty(self), lastNonEmpty(self)) : onEmpty());
/**
 * Prepend an element to the front of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
exports.matchRight = matchRight;
const prepend = /*#__PURE__*/(0, _Function.dual)(2, (self, head) => [head, ...self]);
/**
 * @since 1.0.0
 */
exports.prepend = prepend;
const prependAll = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => fromIterable(that).concat(fromIterable(self)));
/**
 * @since 1.0.0
 */
exports.prependAll = prependAll;
const prependAllNonEmpty = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => prependAll(self, that));
/**
 * Append an element to the end of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
exports.prependAllNonEmpty = prependAllNonEmpty;
const append = /*#__PURE__*/(0, _Function.dual)(2, (self, last) => [...self, last]);
/**
 * @since 1.0.0
 */
exports.append = append;
const appendAll = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => fromIterable(self).concat(fromIterable(that)));
/**
 * @since 1.0.0
 */
exports.appendAll = appendAll;
const appendAllNonEmpty = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => appendAll(self, that));
/**
 * Reduce an `Iterable` from the left, keeping all intermediate results instead of only the final result.
 *
 * @category folding
 * @since 1.0.0
 */
exports.appendAllNonEmpty = appendAllNonEmpty;
const scan = /*#__PURE__*/(0, _Function.dual)(3, (self, b, f) => {
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
exports.scan = scan;
const scanRight = /*#__PURE__*/(0, _Function.dual)(3, (self, b, f) => {
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
exports.scanRight = scanRight;
const isEmptyArray = self => self.length === 0;
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
exports.isEmptyArray = isEmptyArray;
const isEmptyReadonlyArray = isEmptyArray;
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
exports.isEmptyReadonlyArray = isEmptyReadonlyArray;
const isNonEmptyArray = readonlyArray.isNonEmptyArray;
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
exports.isNonEmptyArray = isNonEmptyArray;
const isNonEmptyReadonlyArray = readonlyArray.isNonEmptyArray;
/**
 * Return the number of elements in a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
exports.isNonEmptyReadonlyArray = isNonEmptyReadonlyArray;
const length = self => self.length;
exports.length = length;
const isOutOfBound = (i, as) => i < 0 || i >= as.length;
const clamp = (i, as) => Math.floor(Math.min(Math.max(0, i), as.length));
/**
 * This function provides a safe way to read a value at a particular index from a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
const get = /*#__PURE__*/(0, _Function.dual)(2, (self, index) => {
  const i = Math.floor(index);
  return isOutOfBound(i, self) ? O.none() : O.some(self[i]);
});
/**
 * Gets an element unsafely, will throw on out of bounds.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.get = get;
const unsafeGet = /*#__PURE__*/(0, _Function.dual)(2, (self, index) => {
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
exports.unsafeGet = unsafeGet;
const unprepend = self => [headNonEmpty(self), tailNonEmpty(self)];
/**
 * Return a tuple containing a copy of the `NonEmptyReadonlyArray` without its last element, and that last element.
 *
 * @category getters
 * @since 1.0.0
 */
exports.unprepend = unprepend;
const unappend = self => [initNonEmpty(self), lastNonEmpty(self)];
/**
 * Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
exports.unappend = unappend;
const head = /*#__PURE__*/get(0);
/**
 * @category getters
 * @since 1.0.0
 */
exports.head = head;
const headNonEmpty = /*#__PURE__*/unsafeGet(0);
/**
 * Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
exports.headNonEmpty = headNonEmpty;
const last = self => isNonEmptyReadonlyArray(self) ? O.some(lastNonEmpty(self)) : O.none();
/**
 * @category getters
 * @since 1.0.0
 */
exports.last = last;
const lastNonEmpty = self => self[self.length - 1];
/**
 * Get all but the first element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
exports.lastNonEmpty = lastNonEmpty;
const tail = self => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? O.some(tailNonEmpty(input)) : O.none();
};
/**
 * @category getters
 * @since 1.0.0
 */
exports.tail = tail;
const tailNonEmpty = self => self.slice(1);
/**
 * Get all but the last element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
exports.tailNonEmpty = tailNonEmpty;
const init = self => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? O.some(initNonEmpty(input)) : O.none();
};
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @category getters
 * @since 1.0.0
 */
exports.init = init;
const initNonEmpty = self => self.slice(0, -1);
/**
 * Keep only a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
exports.initNonEmpty = initNonEmpty;
const take = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => {
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
exports.take = take;
const takeRight = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => {
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
exports.takeRight = takeRight;
const takeWhile = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => {
  const out = [];
  for (const a of self) {
    if (!predicate(a)) {
      break;
    }
    out.push(a);
  }
  return out;
});
exports.takeWhile = takeWhile;
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
const span = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => splitAt(self, spanIndex(self, predicate)));
/**
 * Drop a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
exports.span = span;
const drop = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => {
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
exports.drop = drop;
const dropRight = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => {
  const input = fromIterable(self);
  return input.slice(0, input.length - clamp(n, input));
});
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.
 *
 * @category getters
 * @since 1.0.0
 */
exports.dropRight = dropRight;
const dropWhile = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => fromIterable(self).slice(spanIndex(self, predicate)));
/**
 * Return the first index for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
exports.dropWhile = dropWhile;
const findFirstIndex = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => {
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
exports.findFirstIndex = findFirstIndex;
const findLastIndex = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => {
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
exports.findLastIndex = findLastIndex;
const findFirst = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => {
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
exports.findFirst = findFirst;
const findLast = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => {
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
exports.findLast = findLast;
const insertAt = /*#__PURE__*/(0, _Function.dual)(3, (self, i, b) => {
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
exports.insertAt = insertAt;
const replace = /*#__PURE__*/(0, _Function.dual)(3, (self, i, b) => modify(self, i, () => b));
/**
 * @since 1.0.0
 */
exports.replace = replace;
const replaceOption = /*#__PURE__*/(0, _Function.dual)(3, (self, i, b) => modifyOption(self, i, () => b));
/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
exports.replaceOption = replaceOption;
const modify = /*#__PURE__*/(0, _Function.dual)(3, (self, i, f) => O.getOrElse(modifyOption(self, i, f), () => Array.from(self)));
/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return `None` if the index is out of bounds.
 *
 * @since 1.0.0
 */
exports.modify = modify;
const modifyOption = /*#__PURE__*/(0, _Function.dual)(3, (self, i, f) => {
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
exports.modifyOption = modifyOption;
const remove = /*#__PURE__*/(0, _Function.dual)(2, (self, i) => {
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
exports.remove = remove;
const reverse = self => Array.from(self).reverse();
/**
 * @since 1.0.0
 */
exports.reverse = reverse;
const reverseNonEmpty = self => [lastNonEmpty(self), ...self.slice(0, -1).reverse()];
/**
 * Return all the `Right` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
exports.reverseNonEmpty = reverseNonEmpty;
const rights = E.rights;
/**
 * Return all the `Left` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
exports.rights = rights;
const lefts = E.lefts;
/**
 * Sort the elements of an `Iterable` in increasing order, creating a new `Array`.
 *
 * @category sorting
 * @since 1.0.0
 */
exports.lefts = lefts;
const sort = /*#__PURE__*/(0, _Function.dual)(2, (self, O) => {
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
exports.sort = sort;
const sortNonEmpty = /*#__PURE__*/(0, _Function.dual)(2, (self, O) => sort(O)(self));
/**
 * Sort the elements of an `Iterable` in increasing order, where elements are compared
 * using first `orders[0]`, then `orders[1]`, etc...
 *
 * @category sorting
 * @since 1.0.0
 */
exports.sortNonEmpty = sortNonEmpty;
const sortBy = (...orders) => self => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? sortByNonEmpty(...orders)(input) : [];
};
/**
 * @category sorting
 * @since 1.0.0
 */
exports.sortBy = sortBy;
const sortByNonEmpty = (...orders) => sortNonEmpty(order.getMonoid().combineAll(orders));
/**
 * Takes two `Iterable`s and returns an `Array` of corresponding pairs.
 * If one input `Iterable` is short, excess elements of the
 * longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
exports.sortByNonEmpty = sortByNonEmpty;
const zip = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => zipWith(self, that, (a, b) => [a, b]));
/**
 * Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
 * input `Iterable` is short, excess elements of the longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
exports.zip = zip;
const zipWith = /*#__PURE__*/(0, _Function.dual)(3, (self, that, f) => {
  const as = fromIterable(self);
  const bs = fromIterable(that);
  return isNonEmptyReadonlyArray(as) && isNonEmptyReadonlyArray(bs) ? zipNonEmptyWith(bs, f)(as) : [];
});
/**
 * @since 1.0.0
 */
exports.zipWith = zipWith;
const zipNonEmpty = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => zipNonEmptyWith(self, that, (a, b) => [a, b]));
/**
 * @since 1.0.0
 */
exports.zipNonEmpty = zipNonEmpty;
const zipNonEmptyWith = /*#__PURE__*/(0, _Function.dual)(3, (self, that, f) => {
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
exports.zipNonEmptyWith = zipNonEmptyWith;
const unzip = self => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? unzipNonEmpty(input) : [[], []];
};
/**
 * @since 1.0.0
 */
exports.unzip = unzip;
const unzipNonEmpty = self => {
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
exports.unzipNonEmpty = unzipNonEmpty;
const intersperse = /*#__PURE__*/(0, _Function.dual)(2, (self, middle) => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? intersperseNonEmpty(input, middle) : [];
});
/**
 * Places an element in between members of a `NonEmptyReadonlyArray`
 *
 * @since 1.0.0
 */
exports.intersperse = intersperse;
const intersperseNonEmpty = /*#__PURE__*/(0, _Function.dual)(2, (self, middle) => {
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
exports.intersperseNonEmpty = intersperseNonEmpty;
const modifyNonEmptyHead = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => [f(headNonEmpty(self)), ...tailNonEmpty(self)]);
/**
 * Change the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
exports.modifyNonEmptyHead = modifyNonEmptyHead;
const setNonEmptyHead = /*#__PURE__*/(0, _Function.dual)(2, (self, b) => modifyNonEmptyHead(self, () => b));
/**
 * Apply a function to the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
exports.setNonEmptyHead = setNonEmptyHead;
const modifyNonEmptyLast = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => append(initNonEmpty(self), f(lastNonEmpty(self))));
/**
 * Change the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
exports.modifyNonEmptyLast = modifyNonEmptyLast;
const setNonEmptyLast = /*#__PURE__*/(0, _Function.dual)(2, (self, b) => modifyNonEmptyLast(self, () => b));
/**
 * Rotate an `Iterable` by `n` steps.
 *
 * @since 1.0.0
 */
exports.setNonEmptyLast = setNonEmptyLast;
const rotate = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? rotateNonEmpty(input, n) : [];
});
/**
 * Rotate a `NonEmptyReadonlyArray` by `n` steps.
 *
 * @since 1.0.0
 */
exports.rotate = rotate;
const rotateNonEmpty = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => {
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
exports.rotateNonEmpty = rotateNonEmpty;
const contains = isEquivalent => (0, _Function.dual)(2, (self, a) => {
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
exports.contains = contains;
const uniq = /*#__PURE__*/(0, _Function.dual)(2, (self, isEquivalent) => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? uniqNonEmpty(isEquivalent)(input) : [];
});
/**
 * Remove duplicates from a `NonEmptyReadonlyArray`, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 */
exports.uniq = uniq;
const uniqNonEmpty = /*#__PURE__*/(0, _Function.dual)(2, (self, isEquivalent) => {
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
exports.uniqNonEmpty = uniqNonEmpty;
const chop = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
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
exports.chop = chop;
const chopNonEmpty = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
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
exports.chopNonEmpty = chopNonEmpty;
const splitAt = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => {
  const input = Array.from(self);
  return n >= 1 && isNonEmptyReadonlyArray(input) ? splitNonEmptyAt(input, n) : isEmptyReadonlyArray(input) ? [input, []] : [[], input];
});
/**
 * @since 1.0.0
 */
exports.splitAt = splitAt;
const copy = self => self.slice();
/**
 * Splits a `NonEmptyReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category getters
 * @since 1.0.0
 */
exports.copy = copy;
const splitNonEmptyAt = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => {
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
exports.splitNonEmptyAt = splitNonEmptyAt;
const chunksOf = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => {
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
exports.chunksOf = chunksOf;
const chunksOfNonEmpty = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => chopNonEmpty(self, splitNonEmptyAt(n)));
/**
 * Group equal, consecutive elements of a `NonEmptyReadonlyArray` into `NonEmptyArray`s.
 *
 * @category grouping
 * @since 1.0.0
 */
exports.chunksOfNonEmpty = chunksOfNonEmpty;
const group = /*#__PURE__*/(0, _Function.dual)(2, (self, isEquivalent) => chopNonEmpty(self, as => {
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
exports.group = group;
const groupBy = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
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
exports.groupBy = groupBy;
const union = isEquivalent => (0, _Function.dual)(2, (self, that) => {
  const a = Array.from(self);
  const b = Array.from(that);
  return isNonEmptyReadonlyArray(a) && isNonEmptyReadonlyArray(b) ? unionNonEmpty(isEquivalent)(a, b) : isNonEmptyReadonlyArray(a) ? a : b;
});
/**
 * @since 1.0.0
 */
exports.union = union;
const unionNonEmpty = isEquivalent => (0, _Function.dual)(2, (self, that) => uniqNonEmpty(isEquivalent)(appendAllNonEmpty(self, that)));
/**
 * Creates an `Array` of unique values that are included in all given `Iterable`s.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
exports.unionNonEmpty = unionNonEmpty;
const intersection = isEquivalent => {
  const has = contains(isEquivalent);
  return (0, _Function.dual)(2, (self, that) => fromIterable(self).filter(a => has(that, a)));
};
/**
 * Creates a `Array` of values not included in the other given `Iterable`.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
exports.intersection = intersection;
const difference = isEquivalent => {
  const has = contains(isEquivalent);
  return (0, _Function.dual)(2, (self, that) => fromIterable(self).filter(a => !has(that, a)));
};
/**
 * @category constructors
 * @since 1.0.0
 */
exports.difference = difference;
const empty = () => [];
/**
 * Constructs a new `NonEmptyArray<A>` from the specified value.
 *
 * @category constructors
 * @since 1.0.0
 */
exports.empty = empty;
const of = a => [a];
exports.of = of;
const Of = {
  of
};
/**
 * @category mapping
 * @since 1.0.0
 */
const map = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => self.map(f));
/**
 * @category mapping
 * @since 1.0.0
 */
exports.map = map;
const mapNonEmpty = map;
exports.mapNonEmpty = mapNonEmpty;
const imap = /*#__PURE__*/covariant.imap(map);
/**
 * @category instances
 * @since 1.0.0
 */
const Covariant = {
  imap,
  map
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.Covariant = Covariant;
const Invariant = {
  imap
};
/**
 * @category mapping
 * @since 1.0.0
 */
exports.Invariant = Invariant;
const tupled = /*#__PURE__*/invariant.tupled(Invariant);
/**
 * @category mapping
 * @since 1.0.0
 */
exports.tupled = tupled;
const flap = /*#__PURE__*/covariant.flap(Covariant);
/**
 * @category instances
 * @since 1.0.0
 */
exports.flap = flap;
const Pointed = {
  of,
  imap,
  map
};
/**
 * @category combining
 * @since 1.0.0
 */
exports.Pointed = Pointed;
const flatMap = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
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
exports.flatMap = flatMap;
const flatMapNonEmpty = flatMap;
/**
 * @category instances
 * @since 1.0.0
 */
exports.flatMapNonEmpty = flatMapNonEmpty;
const FlatMap = {
  flatMap
};
/**
 * @category combining
 * @since 1.0.0
 */
exports.FlatMap = FlatMap;
const flatten = /*#__PURE__*/flatMap_.flatten(FlatMap);
/**
 * @category combining
 * @since 1.0.0
 */
exports.flatten = flatten;
const flattenNonEmpty = /*#__PURE__*/flatMapNonEmpty(_Function.identity);
/**
 * @since 1.0.0
 */
exports.flattenNonEmpty = flattenNonEmpty;
const composeK = /*#__PURE__*/flatMap_.composeK(FlatMap);
/**
 * @category instances
 * @since 1.0.0
 */
exports.composeK = composeK;
const Chainable = {
  imap,
  map,
  flatMap
};
/**
 * @category filtering
 * @since 1.0.0
 */
exports.Chainable = Chainable;
const filterMap = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
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
exports.filterMap = filterMap;
const partitionMap = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
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
exports.partitionMap = partitionMap;
const Filterable = {
  partitionMap,
  filterMap
};
/**
 * @category filtering
 * @since 1.0.0
 */
exports.Filterable = Filterable;
const compact = /*#__PURE__*/filterMap(_Function.identity);
/**
 * @category filtering
 * @since 1.0.0
 */
exports.compact = compact;
const filter = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => {
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
exports.filter = filter;
const partition = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => {
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
exports.partition = partition;
const separate = /*#__PURE__*/partitionMap(_Function.identity);
/**
 * @category traversing
 * @since 1.0.0
 */
exports.separate = separate;
const traverseNonEmpty = F => (0, _Function.dual)(2, (self, f) => {
  const [head, ...tail] = mapNonEmpty(self, f);
  return F.productMany(head, tail);
});
/**
 * @category traversing
 * @since 1.0.0
 */
exports.traverseNonEmpty = traverseNonEmpty;
const traverse = F => (0, _Function.dual)(2, (self, f) => F.productAll(fromIterable(self).map(f)));
/**
 * @category traversing
 * @since 1.0.0
 */
exports.traverse = traverse;
const sequence = F => traverse(F)(_Function.identity);
/**
 * @category instances
 * @since 1.0.0
 */
exports.sequence = sequence;
const Traversable = {
  traverse: traverse
};
/**
 * @category traversing
 * @since 1.0.0
 */
exports.Traversable = Traversable;
const traverseTap = /*#__PURE__*/traversable.traverseTap(Traversable);
/**
 * @category traversing
 * @since 1.0.0
 */
exports.traverseTap = traverseTap;
const sequenceNonEmpty = F => traverseNonEmpty(F)(_Function.identity);
exports.sequenceNonEmpty = sequenceNonEmpty;
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
const SemiProduct = {
  imap,
  product,
  productMany
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.SemiProduct = SemiProduct;
const SemiApplicative = {
  imap,
  map,
  product,
  productMany
};
/**
 * @since 1.0.0
 */
exports.SemiApplicative = SemiApplicative;
const ap = /*#__PURE__*/semiApplicative.ap(SemiApplicative);
/**
 * Lifts a binary function into `ReadonlyArray`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
exports.ap = ap;
const lift2 = /*#__PURE__*/semiApplicative.lift2(SemiApplicative);
/**
 * @category instances
 * @since 1.0.0
 */
exports.lift2 = lift2;
const Product = {
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
exports.Product = Product;
const Applicative = {
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
exports.Applicative = Applicative;
const liftMonoid = /*#__PURE__*/applicative.getMonoid(Applicative);
/**
 * @category instances
 * @since 1.0.0
 */
exports.liftMonoid = liftMonoid;
const Monad = {
  imap,
  of,
  map,
  flatMap
};
/**
 * @category folding
 * @since 1.0.0
 */
exports.Monad = Monad;
const reduce = /*#__PURE__*/(0, _Function.dual)(3, (self, b, f) => fromIterable(self).reduce((b, a, i) => f(b, a, i), b));
/**
 * @category folding
 * @since 1.0.0
 */
exports.reduce = reduce;
const reduceRight = /*#__PURE__*/(0, _Function.dual)(3, (self, b, f) => fromIterable(self).reduceRight((b, a, i) => f(b, a, i), b));
/**
 * @category instances
 * @since 1.0.0
 */
exports.reduceRight = reduceRight;
const Foldable = {
  reduce
};
/**
 * @category folding
 * @since 1.0.0
 */
exports.Foldable = Foldable;
const combineMap = Monoid => (0, _Function.dual)(2, (self, f) => fromIterable(self).reduce((m, a, i) => Monoid.combine(m, f(a, i)), Monoid.empty));
/**
 * @category folding
 * @since 1.0.0
 */
exports.combineMap = combineMap;
const combineMapNonEmpty = S => (0, _Function.dual)(2, (self, f) => tailNonEmpty(self).reduce((s, a, i) => S.combine(s, f(a, i + 1)), f(headNonEmpty(self), 0)));
/**
 * @category folding
 * @since 1.0.0
 */
exports.combineMapNonEmpty = combineMapNonEmpty;
const reduceKind = /*#__PURE__*/foldable.reduceKind(Foldable);
/**
 * @category folding
 * @since 1.0.0
 */
exports.reduceKind = reduceKind;
const coproductMapKind = /*#__PURE__*/foldable.coproductMapKind(Foldable);
/**
 * @category filtering
 * @since 1.0.0
 */
exports.coproductMapKind = coproductMapKind;
const traversePartitionMap = F => (0, _Function.dual)(2, (self, f) => {
  return F.map(traverse(F)(self, f), separate);
});
/**
 * @category filtering
 * @since 1.0.0
 */
exports.traversePartitionMap = traversePartitionMap;
const traverseFilterMap = F => (0, _Function.dual)(2, (self, f) => {
  return F.map(traverse(F)(self, f), compact);
});
/**
 * @category instances
 * @since 1.0.0
 */
exports.traverseFilterMap = traverseFilterMap;
const TraversableFilterable = {
  traversePartitionMap: traversePartitionMap,
  traverseFilterMap: traverseFilterMap
};
/**
 * Filter values inside a context.
 *
 * @since 1.0.0
 */
exports.TraversableFilterable = TraversableFilterable;
const traverseFilter = /*#__PURE__*/traversableFilterable.traverseFilter(TraversableFilterable);
/**
 * @since 1.0.0
 */
exports.traverseFilter = traverseFilter;
const traversePartition = /*#__PURE__*/traversableFilterable.traversePartition(TraversableFilterable);
/**
 * @category lifting
 * @since 1.0.0
 */
exports.traversePartition = traversePartition;
const liftPredicate = predicate => b => predicate(b) ? [b] : [];
/**
 * @category lifting
 * @since 1.0.0
 */
exports.liftPredicate = liftPredicate;
const liftOption = f => (...a) => fromOption(f(...a));
/**
 * @category conversions
 * @since 1.0.0
 */
exports.liftOption = liftOption;
const fromNullable = a => a == null ? empty() : [a];
/**
 * @category lifting
 * @since 1.0.0
 */
exports.fromNullable = fromNullable;
const liftNullable = f => (...a) => fromNullable(f(...a));
/**
 * @category combining
 * @since 1.0.0
 */
exports.liftNullable = liftNullable;
const flatMapNullable = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => isNonEmptyReadonlyArray(self) ? fromNullable(f(headNonEmpty(self))) : empty());
/**
 * @category lifting
 * @since 1.0.0
 */
exports.flatMapNullable = flatMapNullable;
const liftEither = f => (...a) => {
  const e = f(...a);
  return E.isLeft(e) ? [] : [e.right];
};
exports.liftEither = liftEither;
function every(predicate) {
  return self => self.every(predicate);
}
/**
 * Check if a predicate holds true for some `ReadonlyArray` member.
 *
 * @category predicates
 * @since 1.0.0
 */
const some = predicate => self => self.some(predicate);
/**
 * Fold an `Iterable`, accumulating values in some `Monoid`, combining adjacent elements
 * using the specified separator.
 *
 * @since 1.0.0
 */
exports.some = some;
const intercalate = M => (0, _Function.dual)(2, (self, middle) => {
  const as = fromIterable(self);
  return isNonEmptyReadonlyArray(as) ? intercalateNonEmpty(M)(as, middle) : M.empty;
});
/**
 * Places an element in between members of a `NonEmptyReadonlyArray`, then folds the results using the provided `Semigroup`.
 *
 * @since 1.0.0
 */
exports.intercalate = intercalate;
const intercalateNonEmpty = S => (0, _Function.dual)(2, (self, middle) => semigroup.intercalate(S, middle).combineMany(headNonEmpty(self), tailNonEmpty(self)));
/**
 * @since 1.0.0
 */
exports.intercalateNonEmpty = intercalateNonEmpty;
const join = /*#__PURE__*/intercalate(string.Monoid);
/**
 * @since 1.0.0
 */
exports.join = join;
const extend = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => self.map((_, i, as) => f(as.slice(i))));
/**
 * @since 1.0.0
 */
exports.extend = extend;
const min = /*#__PURE__*/(0, _Function.dual)(2, (self, O) => {
  const S = semigroup.min(O);
  return self.reduce(S.combine);
});
/**
 * @since 1.0.0
 */
exports.min = min;
const max = /*#__PURE__*/(0, _Function.dual)(2, (self, O) => {
  const S = semigroup.max(O);
  return self.reduce(S.combine);
});
/**
 * @category constructors
 * @since 1.0.0
 */
exports.max = max;
const unfold = (b, f) => {
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
exports.unfold = unfold;
const getUnionSemigroup = isEquivalent => semigroup.make(union(isEquivalent));
/**
 * @category instances
 * @since 1.0.0
 */
exports.getUnionSemigroup = getUnionSemigroup;
const getUnionMonoid = isEquivalent => {
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
exports.getUnionMonoid = getUnionMonoid;
const getIntersectionSemigroup = isEquivalent => semigroup.make(intersection(isEquivalent));
/**
 * Returns a `Semigroup` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
exports.getIntersectionSemigroup = getIntersectionSemigroup;
const getSemigroup = semigroup.array;
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
exports.getSemigroup = getSemigroup;
const getMonoid = monoid.array;
/**
 * This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
 * The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
 * If all elements are equal, the arrays are then compared based on their length.
 * It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
 *
 * @category lifting
 * @since 1.0.0
 */
exports.getMonoid = getMonoid;
const getOrder = order.array;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 1.0.0
 */
exports.getOrder = getOrder;
const bindTo = /*#__PURE__*/invariant.bindTo(Invariant);
exports.bindTo = bindTo;
const let_ = /*#__PURE__*/covariant.let(Covariant);
exports.let = let_;
/**
 * @category do notation
 * @since 1.0.0
 */
const Do = /*#__PURE__*/of_.Do(Of);
/**
 * @category do notation
 * @since 1.0.0
 */
exports.Do = Do;
const bind = /*#__PURE__*/chainable.bind(Chainable);
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
exports.bind = bind;
const andThenBind = /*#__PURE__*/semiProduct.andThenBind(SemiProduct);
exports.andThenBind = andThenBind;
//# sourceMappingURL=ReadonlyArray.js.map