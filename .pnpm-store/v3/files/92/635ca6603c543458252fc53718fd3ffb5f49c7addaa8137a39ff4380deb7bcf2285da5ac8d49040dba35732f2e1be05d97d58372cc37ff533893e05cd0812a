/**
 * This module provides utility functions for working with records in TypeScript.
 *
 * @since 1.0.0
 */
import * as E from "@effect/data/Either";
import { dual, identity } from "@effect/data/Function";
import * as O from "@effect/data/Option";
import * as covariant from "@effect/data/typeclass/Covariant";
import * as invariant from "@effect/data/typeclass/Invariant";
import * as traversable from "@effect/data/typeclass/Traversable";
import * as traversableFilterable from "@effect/data/typeclass/TraversableFilterable";
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Creates a new, empty record.
 *
 * @category constructors
 * @since 1.0.0
 */
export const empty = () => ({});
// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Determine if a `Record` is empty.
 *
 * @param self - `Record` to test for emptiness.
 *
 * @example
 * import { isEmptyRecord } from "@effect/data/ReadonlyRecord"
 *
 * assert.deepStrictEqual(isEmptyRecord({}), true);
 * assert.deepStrictEqual(isEmptyRecord({ a: 3 }), false);
 *
 * @category guards
 * @since 1.0.0
 */
export const isEmptyRecord = self => {
  for (const k in self) {
    if (has(self, k)) {
      return false;
    }
  }
  return true;
};
/**
 * Determine if a `ReadonlyRecord` is empty.
 *
 * @param self - `ReadonlyRecord` to test for emptiness.
 *
 * @example
 * import { isEmptyReadonlyRecord } from "@effect/data/ReadonlyRecord"
 *
 * assert.deepStrictEqual(isEmptyReadonlyRecord({}), true);
 * assert.deepStrictEqual(isEmptyReadonlyRecord({ a: 3 }), false);
 *
 * @category guards
 * @since 1.0.0
 */
export const isEmptyReadonlyRecord = isEmptyRecord;
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * Takes an iterable and a projection function and returns a record.
 * The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.
 *
 * @param self - An iterable of values to be mapped to a record.
 * @param f - A projection function that maps values of the iterable to a tuple of a key and a value.
 *
 * @example
 * import { fromIterable } from '@effect/data/ReadonlyRecord'
 *
 * const input = [1, 2, 3, 4]
 *
 * assert.deepStrictEqual(
 *   fromIterable(input, a => [String(a), a * 2]),
 *   { '1': 2, '2': 4, '3': 6, '4': 8 }
 * )
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable = /*#__PURE__*/dual(2, (self, f) => {
  const out = {};
  for (const a of self) {
    const [k, b] = f(a);
    out[k] = b;
  }
  return out;
});
/**
 * Builds a record from an iterable of key-value pairs.
 *
 * If there are conflicting keys when using `fromEntries`, the last occurrence of the key/value pair will overwrite the
 * previous ones. So the resulting record will only have the value of the last occurrence of each key.
 *
 * @param self - The iterable of key-value pairs.
 *
 * @example
 * import { fromEntries } from '@effect/data/ReadonlyRecord'
 *
 * const input: Array<[string, number]> = [["a", 1], ["b", 2]]
 *
 * assert.deepStrictEqual(fromEntries(input), { a: 1, b: 2 })
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromEntries = /*#__PURE__*/fromIterable(identity);
/**
 * Transforms the values of a `ReadonlyRecord` into an `Array` with a custom mapping function.
 *
 * @param self - The `ReadonlyRecord` to transform.
 * @param f - The custom mapping function to apply to each key/value of the `ReadonlyRecord`.
 *
 * @example
 * import { collect } from "@effect/data/ReadonlyRecord"
 *
 * const x = { a: 1, b: 2, c: 3 }
 * assert.deepStrictEqual(collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]])
 *
 * @category conversions
 * @since 1.0.0
 */
export const collect = /*#__PURE__*/dual(2, (self, f) => {
  const out = [];
  for (const key of Object.keys(self)) {
    out.push(f(key, self[key]));
  }
  return out;
});
/**
 * Takes a record and returns an array of tuples containing its keys and values.
 *
 * @param self - The record to transform.
 *
 * @example
 * import { toEntries } from "@effect/data/ReadonlyRecord"
 *
 * const x = { a: 1, b: 2, c: 3 }
 * assert.deepStrictEqual(toEntries(x), [["a", 1], ["b", 2], ["c", 3]])
 *
 * @category conversions
 * @since 1.0.0
 */
export const toEntries = /*#__PURE__*/collect((key, value) => [key, value]);
/**
 * Takes a record and returns an array of tuples containing its keys and values.
 *
 * Alias of {@link toEntries}.
 *
 * @param self - The record to transform.
 *
 * @example
 * import { toArray } from "@effect/data/ReadonlyRecord"
 *
 * const x = { a: 1, b: 2, c: 3 }
 * assert.deepStrictEqual(toArray(x), [["a", 1], ["b", 2], ["c", 3]])
 *
 * @category conversions
 * @since 1.0.0
 */
export const toArray = toEntries;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Returns the number of key/value pairs in a `ReadonlyRecord`.
 *
 * @param self - A `ReadonlyRecord` to calculate the number of key/value pairs in.
 *
 * @example
 * import { size } from "@effect/data/ReadonlyRecord";
 *
 * assert.deepStrictEqual(size({ a: "a", b: 1, c: true }), 3);
 *
 * @since 1.0.0
 */
export const size = self => Object.keys(self).length;
/**
 * Check if a given `key` exists in a `ReadonlyRecord`.
 *
 * @param self - the `ReadonlyRecord` to look in.
 * @param key - the key to look for in the `ReadonlyRecord`.
 *
 * @example
 * import { has } from '@effect/data/ReadonlyRecord'
 *
 * assert.deepStrictEqual(has({ a: 1, b: 2 }, "a"), true);
 * assert.deepStrictEqual(has({ a: 1, b: 2 }, "c"), false);
 *
 * @since 1.0.0
 */
export const has = /*#__PURE__*/dual(2, (self, key) => Object.prototype.hasOwnProperty.call(self, key));
/**
 * Retrieve a value at a particular key from a `ReadonlyRecord`, returning it wrapped in an `Option`.
 *
 * @param self - The `ReadonlyRecord` to retrieve value from.
 * @param key - Key to retrieve from `ReadonlyRecord`.
 *
 * @example
 * import { get } from "@effect/data/ReadonlyRecord"
 * import { some, none } from "@effect/data/Option"
 *
 * const person = { name: "John Doe", age: 35 }
 *
 * assert.deepStrictEqual(get(person, "name"), some("John Doe"))
 * assert.deepStrictEqual(get(person, "email"), none())
 *
 * @since 1.0.0
 */
export const get = /*#__PURE__*/dual(2, (self, key) => has(self, key) ? O.some(self[key]) : O.none());
/**
 * Apply a function to the element at the specified key, creating a new record,
 * or return `None` if the key doesn't exist.
 *
 * @param self - The `ReadonlyRecord` to be updated.
 * @param key - The key of the element to modify.
 * @param f - The function to apply to the element.
 *
 * @example
 * import { modifyOption } from "@effect/data/ReadonlyRecord"
 * import { some, none } from "@effect/data/Option"
 *
 * const f = (x: number) => x * 2
 *
 * assert.deepStrictEqual(
 *  modifyOption({ a: 3 }, 'a', f),
 *  some({ a: 6 })
 * )
 * assert.deepStrictEqual(
 *  modifyOption({ a: 3 }, 'b', f),
 *  none()
 * )
 *
 * @since 1.0.0
 */
export const modifyOption = /*#__PURE__*/dual(3, (self, key, f) => {
  if (!has(self, key)) {
    return O.none();
  }
  const out = {
    ...self
  };
  out[key] = f(self[key]);
  return O.some(out);
});
/**
 * Replaces a value in the record with the new value passed as parameter.
 *
 * @param self - The `ReadonlyRecord` to be updated.
 * @param key - The key to search for in the record.
 * @param b - The new value to replace the existing value with.
 *
 * @example
 * import { replaceOption } from "@effect/data/ReadonlyRecord"
 * import { some, none } from "@effect/data/Option"
 *
 * assert.deepStrictEqual(
 *   replaceOption({ a: 1, b: 2, c: 3 }, 'a', 10),
 *   some({ a: 10, b: 2, c: 3 })
 * )
 * assert.deepStrictEqual(replaceOption({}, 'a', 10), none())
 *
 * @since 1.0.0
 */
export const replaceOption = /*#__PURE__*/dual(3, (self, key, b) => modifyOption(self, key, () => b));
/**
 * Removes a key from a `ReadonlyRecord` and returns a new `Record`
 *
 * @param self - the `ReadonlyRecord` to remove the key from.
 * @param key - the key to remove from the `ReadonlyRecord`.
 *
 * @example
 * import { remove } from '@effect/data/ReadonlyRecord'
 *
 * assert.deepStrictEqual(remove({ a: 1, b: 2 }, "a"), { b: 2 })
 *
 * @since 1.0.0
 */
export const remove = /*#__PURE__*/dual(2, (self, key) => {
  const out = {
    ...self
  };
  delete out[key];
  return out;
});
/**
 * Retrieves the value of the property with the given `key` from a `ReadonlyRecord` and returns an `Option`
 * of a tuple with the value and the `ReadonlyRecord` with the removed property.
 * If the key is not present, returns `O.none`.
 *
 * @param self - The input `ReadonlyRecord`.
 * @param key - The key of the property to retrieve.
 *
 * @example
 * import { pop } from '@effect/data/ReadonlyRecord'
 * import { some, none } from '@effect/data/Option'
 *
 * assert.deepStrictEqual(pop({ a: 1, b: 2 }, "a"), some([1, { b: 2 }]))
 * assert.deepStrictEqual(pop({ a: 1, b: 2 }, "c"), none())
 *
 * @category record
 * @since 1.0.0
 */
export const pop = /*#__PURE__*/dual(2, (self, key) => has(self, key) ? O.some([self[key], remove(self, key)]) : O.none());
/**
 * Maps a `ReadonlyRecord` into another `Record` by applying a transformation function to each of its values.
 *
 * @param self - The `ReadonlyRecord` to be mapped.
 * @param f - A transformation function that will be applied to each of the values in the `ReadonlyRecord`.
 *
 * @example
 * import { map } from "@effect/data/ReadonlyRecord"
 *
 * const f = (n: number) => `-${n}`
 *
 * assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3", b: "-5" })
 *
 * const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`
 *
 * assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: "A-3", b: "B-5" })
 *
 * @since 1.0.0
 */
export const map = /*#__PURE__*/dual(2, (self, f) => {
  const out = {};
  for (const key of Object.keys(self)) {
    out[key] = f(self[key], key);
  }
  return out;
});
/**
 * Transforms a `ReadonlyRecord` into a `Record` by applying the function `f` to each key and value in the original `ReadonlyRecord`.
 * If the function returns `Some`, the key-value pair is included in the output `Record`.
 *
 * @param self - The input `ReadonlyRecord`.
 * @param f - The transformation function.
 *
 * @example
 * import { filterMap } from '@effect/data/ReadonlyRecord'
 * import { some, none } from '@effect/data/Option'
 *
 * const x = { a: 1, b: 2, c: 3 }
 * const f = (a: number, key: string) => a > 2 ? some(a * 2) : none()
 * assert.deepStrictEqual(filterMap(x, f), { c: 6 })
 *
 * @since 1.0.0
 */
export const filterMap = /*#__PURE__*/dual(2, (self, f) => {
  const out = {};
  for (const key of Object.keys(self)) {
    const o = f(self[key], key);
    if (O.isSome(o)) {
      out[key] = o.value;
    }
  }
  return out;
});
/**
 * Selects properties from a record whose values match the given predicate.
 *
 * @param self - The `ReadonlyRecord` to filter.
 * @param predicate - A function that returns a `boolean` value to determine if the entry should be included in the new record.
 *
 * @example
 * import { filter } from '@effect/data/ReadonlyRecord'
 *
 * const x = { a: 1, b: 2, c: 3, d: 4 }
 * assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
 *
 * @category filtering
 * @since 1.0.0
 */
export const filter = /*#__PURE__*/dual(2, (self, predicate) => {
  const out = {};
  for (const key of Object.keys(self)) {
    if (predicate(self[key], key)) {
      out[key] = self[key];
    }
  }
  return out;
});
/**
 * Given a `ReadonlyRecord` with `Option` values, returns a `Record` with only the `Some` values, with the same keys.
 *
 * @param self - A `ReadonlyRecord` with `Option` values.
 *
 * @example
 * import { compact } from '@effect/data/ReadonlyRecord'
 * import { some, none } from '@effect/data/Option'
 *
 * assert.deepStrictEqual(
 *   compact({ a: some(1), b: none(), c: some(2) }),
 *   { a: 1, c: 2 }
 * )
 *
 * @category filtering
 * @since 1.0.0
 */
export const compact = /*#__PURE__*/filterMap(identity);
/**
 * Partitions the elements of a `ReadonlyRecord` into two groups: those that match a predicate, and those that don't.
 *
 * @param self - The `ReadonlyRecord` to partition.
 * @param f - The predicate function to apply to each element.
 *
 * @example
 * import { partitionMap } from '@effect/data/ReadonlyRecord'
 * import { left, right } from '@effect/data/Either'
 *
 * const x = { a: 1, b: 2, c: 3 }
 * const f = (n: number) => (n % 2 === 0 ? right(n) : left(n))
 * assert.deepStrictEqual(partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2}])
 *
 * @category filtering
 * @since 1.0.0
 */
export const partitionMap = /*#__PURE__*/dual(2, (self, f) => {
  const left = {};
  const right = {};
  for (const key of Object.keys(self)) {
    const e = f(self[key], key);
    if (E.isLeft(e)) {
      left[key] = e.left;
    } else {
      right[key] = e.right;
    }
  }
  return [left, right];
});
/**
 * Partitions a `ReadonlyRecord` of `Either` values into two separate records,
 * one with the `Left` values and one with the `Right` values.
 *
 * @param self - the `ReadonlyRecord` to partition.
 *
 * @example
 * import { separate } from '@effect/data/ReadonlyRecord'
 * import { left, right } from '@effect/data/Either'
 *
 * assert.deepStrictEqual(
 *   separate({ a: left("e"), b: right(1) }),
 *   [{ a: "e" }, { b: 1 }]
 * )
 *
 * @category filtering
 * @since 1.0.0
 */
export const separate = /*#__PURE__*/partitionMap(identity);
/**
 * Partitions a `ReadonlyRecord` into two separate `Record`s based on the result of a predicate function.
 *
 * @param self - The input `ReadonlyRecord` to partition.
 * @param predicate - The partitioning function to determine the partitioning of each value of the `ReadonlyRecord`.
 *
 * @example
 * import { partition } from '@effect/data/ReadonlyRecord'
 *
 * assert.deepStrictEqual(
 *   partition({ a: 1, b: 3 }, (n) => n > 2),
 *   [{ a: 1 }, { b: 3 }]
 * )
 *
 * @category filtering
 * @since 1.0.0
 */
export const partition = /*#__PURE__*/dual(2, (self, predicate) => {
  const left = {};
  const right = {};
  for (const key of Object.keys(self)) {
    if (predicate(self[key], key)) {
      right[key] = self[key];
    } else {
      left[key] = self[key];
    }
  }
  return [left, right];
});
/**
 * Maps each entry of a `ReadonlyRecord` to an effect and collects the results into a new record.
 *
 * @param F - an {@link applicative.Applicative Applicative} instance.
 * @param self - a `ReadonlyRecord` to map over.
 * @param f - the mapping function, which maps an entry `a` and its corresponding `key` to an effect.
 *
 * @example
 * import { traverse } from '@effect/data/ReadonlyRecord'
 * import { some, none, Applicative } from '@effect/data/Option'
 *
 * assert.deepStrictEqual(
 *   traverse(Applicative)({ a: 1, b: 2 }, (n: number) => (n <= 2 ? some(n) : none())),
 *   some({ a: 1, b: 2 })
 * )
 * assert.deepStrictEqual(
 *   traverse(Applicative)({ a: 1, b: 2 }, (n: number) => (n >= 2 ? some(n) : none())),
 *   none()
 * )
 *
 * @category traversing
 * @since 1.0.0
 */
export const traverse = F => dual(2, (self, f) => F.map(F.productAll(Object.entries(self).map(([key, a]) => F.map(f(a, key), b => [key, b]))), Object.fromEntries));
/**
 * Transforms a `ReadonlyRecord` of `Kind` values into a `Kind` of `Record` values.
 *
 * @param F - an {@link applicative.Applicative Applicative} instance.
 * @param self - the `ReadonlyRecord` of `Kind` values.
 *
 * @example
 * import * as RR from '@effect/data/ReadonlyRecord'
 * import { some, none, Applicative } from '@effect/data/Option'
 *
 * const sequence = RR.sequence(Applicative)
 *
 * assert.deepStrictEqual(sequence({ a: some(1), b: some(2) }), some({ a: 1, b: 2 }))
 * assert.deepStrictEqual(sequence({ a: none(), b: some(2) }), none())
 *
 * @category traversing
 * @since 1.0.0
 */
export const sequence = F => traverse(F)(identity);
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
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as = /*#__PURE__*/covariant.as(Covariant);
/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable = {
  partitionMap,
  filterMap
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable = {
  traverse
};
/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap = /*#__PURE__*/traversable.traverseTap(Traversable);
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
  traversePartitionMap,
  traverseFilterMap
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
//# sourceMappingURL=ReadonlyRecord.mjs.map