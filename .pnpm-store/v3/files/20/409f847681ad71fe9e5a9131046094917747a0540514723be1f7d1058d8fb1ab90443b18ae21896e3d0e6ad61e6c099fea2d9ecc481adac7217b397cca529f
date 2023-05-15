/**
 * @since 2.5.0
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Predicate } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable1 } from './Witherable'
/**
 * @since 2.5.0
 */
export declare type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>
declare module './HKT' {
  interface URItoKind<A> {
    readonly ReadonlyRecord: ReadonlyRecord<string, A>
  }
}
/**
 * @since 2.5.0
 */
export declare const URI = 'ReadonlyRecord'
/**
 * @since 2.5.0
 */
export declare type URI = typeof URI
/**
 * @since 2.5.0
 */
export declare function fromRecord<K extends string, A>(r: Record<K, A>): ReadonlyRecord<K, A>
/**
 * @since 2.5.0
 */
export declare function toRecord<K extends string, A>(r: ReadonlyRecord<K, A>): Record<K, A>
/**
 * @since 2.5.0
 */
export declare function getShow<A>(S: Show<A>): Show<ReadonlyRecord<string, A>>
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.5.0
 */
export declare function size(r: ReadonlyRecord<string, unknown>): number
/**
 * Test whether a record is empty
 *
 * @since 2.5.0
 */
export declare function isEmpty(r: ReadonlyRecord<string, unknown>): boolean
/**
 * @since 2.5.0
 */
export declare function keys<K extends string>(r: ReadonlyRecord<K, unknown>): ReadonlyArray<K>
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/ReadonlyRecord'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.5.0
 */
export declare function collect<K extends string, A, B>(
  f: (k: K, a: A) => B
): (r: ReadonlyRecord<K, A>) => ReadonlyArray<B>
/**
 * @since 2.5.0
 */
export declare const toReadonlyArray: <K extends string, A>(r: ReadonlyRecord<K, A>) => ReadonlyArray<readonly [K, A]>
/**
 * Unfolds a record into a list of key/value pairs
 *
 * @since 2.5.0
 */
export declare function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => Kind<F, readonly [K, A]>
export declare function toUnfoldable<F>(
  U: Unfoldable<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => HKT<F, readonly [K, A]>
/**
 * Insert or replace a key/value pair in a record
 *
 * @since 2.5.0
 */
export declare function insertAt<K extends string, A>(
  k: K,
  a: A
): <KS extends string>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<KS | K, A>
/**
 * @since 2.5.0
 */
export declare function hasOwnProperty<K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K
/**
 * Delete a key and value from a map
 *
 * @since 2.5.0
 */
export declare function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A>
/**
 * @since 2.5.0
 */
export declare function updateAt<A>(
  k: string,
  a: A
): <K extends string>(r: ReadonlyRecord<K, A>) => Option<ReadonlyRecord<K, A>>
/**
 * @since 2.5.0
 */
export declare function modifyAt<A>(
  k: string,
  f: (a: A) => A
): <K extends string>(r: ReadonlyRecord<K, A>) => Option<ReadonlyRecord<K, A>>
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.5.0
 */
export declare function pop<K extends string>(
  k: K
): <KS extends string, A>(
  r: ReadonlyRecord<KS, A>
) => Option<readonly [A, ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A>]>
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.5.0
 */
export declare function isSubrecord<A>(
  E: Eq<A>
): (x: ReadonlyRecord<string, A>, y: ReadonlyRecord<string, A>) => boolean
/**
 * @since 2.5.0
 */
export declare function getEq<K extends string, A>(E: Eq<A>): Eq<ReadonlyRecord<K, A>>
/**
 * Returns a `Semigroup` instance for records given a `Semigroup` instance for their values
 *
 * @example
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 * import { getMonoid } from 'fp-ts/lib/ReadonlyRecord'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @since 2.5.0
 */
export declare function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
/**
 * Lookup the value for a key in a record
 *
 * @since 2.5.0
 */
export declare function lookup<A>(k: string, r: ReadonlyRecord<string, A>): Option<A>
/**
 * @since 2.5.0
 */
export declare const empty: ReadonlyRecord<string, never>
/**
 * Map a record passing the keys to the iterating function
 *
 * @since 2.5.0
 */
export declare function mapWithIndex<K extends string, A, B>(
  f: (k: K, a: A) => B
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
/**
 * Map a record passing the values to the iterating function
 *
 * @since 2.5.0
 */
export declare function map<A, B>(f: (a: A) => B): <K extends string>(fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
/**
 * @since 2.5.0
 */
export declare function reduceWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, b: B, a: A) => B
): (fa: ReadonlyRecord<K, A>) => B
/**
 * @since 2.5.0
 */
export declare function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
/**
 * @since 2.5.0
 */
export declare function reduceRightWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, a: A, b: B) => B
): (fa: ReadonlyRecord<K, A>) => B
/**
 * Create a record with one key/value pair
 *
 * @since 2.5.0
 */
export declare function singleton<K extends string, A>(k: K, a: A): ReadonlyRecord<K, A>
/**
 * @since 2.5.0
 */
export declare function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind<F, B>
) => (ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
/**
 * @since 2.5.0
 */
export declare function traverse<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export declare function traverse<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <R, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export declare function traverse<F extends URIS2>(
  F: Applicative2<F>
): <E, A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export declare function traverse<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export declare function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export declare function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
/**
 * @since 2.5.0
 */
export declare function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export declare function sequence<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export declare function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export declare function sequence<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export declare function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind<F, A>>) => Kind<F, ReadonlyRecord<K, A>>
export declare function sequence<F>(
  F: Applicative<F>
): <K extends string, A>(ta: ReadonlyRecord<K, HKT<F, A>>) => HKT<F, ReadonlyRecord<K, A>>
/**
 * @since 2.5.0
 */
export declare function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>
/**
 * @since 2.5.0
 */
export declare function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export declare function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>
/**
 * @since 2.5.0
 */
export declare function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
/**
 * @since 2.5.0
 */
export declare function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export declare function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, A>
/**
 * Create a record from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @since 2.5.0
 */
export declare function fromFoldable<F extends URIS3, A>(
  M: Magma<A>,
  F: Foldable3<F>
): <K extends string, R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => ReadonlyRecord<K, A>
export declare function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <K extends string, E>(fka: Kind2<F, E, readonly [K, A]>) => ReadonlyRecord<K, A>
export declare function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): <K extends string>(fka: Kind<F, readonly [K, A]>) => ReadonlyRecord<K, A>
export declare function fromFoldable<F, A>(
  M: Magma<A>,
  F: Foldable<F>
): <K extends string>(fka: HKT<F, readonly [K, A]>) => ReadonlyRecord<K, A>
/**
 * Create a record from a foldable collection using the specified functions to
 *
 * - map to key/value pairs
 * - combine values for duplicate keys.
 *
 * @example
 * import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
 * import { readonlyArray, zip } from 'fp-ts/lib/ReadonlyArray'
 * import { identity } from 'fp-ts/lib/function'
 * import { ReadonlyRecord, fromFoldableMap } from 'fp-ts/lib/ReadonlyRecord'
 *
 * // like lodash `zipObject` or ramda `zipObj`
 * export const zipObject = <K extends string, A>(keys: ReadonlyArray<K>, values: ReadonlyArray<A>): ReadonlyRecord<K, A> =>
 *   fromFoldableMap(getLastSemigroup<A>(), readonlyArray)(zip(keys, values), identity)
 *
 * assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })
 *
 * // build a record from a field
 * interface User {
 *   id: string
 *   name: string
 * }
 *
 * const users: ReadonlyArray<User> = [
 *   { id: 'id1', name: 'name1' },
 *   { id: 'id2', name: 'name2' },
 *   { id: 'id1', name: 'name3' }
 * ]
 *
 * assert.deepStrictEqual(fromFoldableMap(getLastSemigroup<User>(), readonlyArray)(users, user => [user.id, user]), {
 *   id1: { id: 'id1', name: 'name3' },
 *   id2: { id: 'id2', name: 'name2' }
 * })
 *
 * @since 2.5.0
 */
export declare function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <R, E, A, K extends string>(fa: Kind3<F, R, E, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export declare function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <E, A, K extends string>(fa: Kind2<F, E, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export declare function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A, K extends string>(fa: Kind<F, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export declare function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: Foldable<F>
): <A, K extends string>(fa: HKT<F, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
/**
 * @since 2.5.0
 */
export declare function every<A>(predicate: Predicate<A>): (r: ReadonlyRecord<string, A>) => boolean
/**
 * @since 2.5.0
 */
export declare function some<A>(predicate: (a: A) => boolean): (r: ReadonlyRecord<string, A>) => boolean
/**
 * @since 2.5.0
 */
export declare function elem<A>(E: Eq<A>): (a: A, fa: ReadonlyRecord<string, A>) => boolean
/**
 * @since 2.5.0
 */
export declare const readonlyRecord: FunctorWithIndex1<URI, string> &
  Foldable1<URI> &
  TraversableWithIndex1<URI, string> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, string> &
  Witherable1<URI> &
  FoldableWithIndex1<URI, string>
declare const filter: {
    <A, B extends A>(refinement: import('./function').Refinement<A, B>): (
      fa: Readonly<Record<string, A>>
    ) => Readonly<Record<string, B>>
    <A_1>(predicate: Predicate<A_1>): (fa: Readonly<Record<string, A_1>>) => Readonly<Record<string, A_1>>
  },
  filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>,
  foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Readonly<Record<string, A>>) => M,
  partition: {
    <A, B extends A>(refinement: import('./function').Refinement<A, B>): (
      fa: Readonly<Record<string, A>>
    ) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>
    <A_1>(predicate: Predicate<A_1>): (
      fa: Readonly<Record<string, A_1>>
    ) => Separated<Readonly<Record<string, A_1>>, Readonly<Record<string, A_1>>>
  },
  partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, B>>, Readonly<Record<string, C>>>,
  reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Readonly<Record<string, A>>) => B,
  reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Readonly<Record<string, A>>) => B,
  compact: <A>(fa: Readonly<Record<string, Option<A>>>) => Readonly<Record<string, A>>,
  separate: <A, B>(
    fa: Readonly<Record<string, Either<A, B>>>
  ) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>
export {
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
  foldMap,
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
  reduce,
  /**
   * @since 2.5.0
   */
  reduceRight,
  /**
   * @since 2.5.0
   */
  compact,
  /**
   * @since 2.5.0
   */
  separate
}
