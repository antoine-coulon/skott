/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.5.0
 */
import { Alt1 } from './Alt'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Predicate, Refinement } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { Monad1 } from './Monad'
import { Option } from './Option'
import { Ord } from './Ord'
import { ReadonlyRecord } from './ReadonlyRecord'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { TraversableWithIndex1 } from './TraversableWithIndex'
declare module './HKT' {
  interface URItoKind<A> {
    readonly ReadonlyNonEmptyArray: ReadonlyNonEmptyArray<A>
  }
}
/**
 * @since 2.5.0
 */
export declare const URI = 'ReadonlyNonEmptyArray'
/**
 * @since 2.5.0
 */
export declare type URI = typeof URI
/**
 * @since 2.5.0
 */
export interface ReadonlyNonEmptyArray<A> extends ReadonlyArray<A> {
  readonly 0: A
}
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export declare const cons: <A>(head: A, tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export declare const snoc: <A>(init: ReadonlyArray<A>, end: A) => ReadonlyNonEmptyArray<A>
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @since 2.5.0
 */
export declare function fromReadonlyArray<A>(as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>>
/**
 * @since 2.5.0
 */
export declare function fromArray<A>(as: Array<A>): Option<ReadonlyNonEmptyArray<A>>
/**
 * @since 2.5.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<ReadonlyNonEmptyArray<A>>
/**
 * @since 2.5.0
 */
export declare function head<A>(nea: ReadonlyNonEmptyArray<A>): A
/**
 * @since 2.5.0
 */
export declare function tail<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A>
/**
 * @since 2.5.0
 */
export declare const reverse: <A>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
/**
 * @since 2.5.0
 */
export declare function min<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A
/**
 * @since 2.5.0
 */
export declare function max<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @since 2.5.0
 */
export declare function getSemigroup<A = never>(): Semigroup<ReadonlyNonEmptyArray<A>>
/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.5.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<ReadonlyNonEmptyArray<A>>
/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @since 2.5.0
 */
export declare function group<A>(
  E: Eq<A>
): {
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  (as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.5.0
 */
export declare function groupSort<A>(O: Ord<A>): (as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>>
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.5.0
 */
export declare function groupBy<A>(
  f: (a: A) => string
): (as: ReadonlyArray<A>) => ReadonlyRecord<string, ReadonlyNonEmptyArray<A>>
/**
 * @since 2.5.0
 */
export declare function last<A>(nea: ReadonlyNonEmptyArray<A>): A
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
export declare function init<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A>
/**
 * @since 2.5.0
 */
export declare function sort<A>(O: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
/**
 * @since 2.5.0
 */
export declare function insertAt<A>(
  i: number,
  a: A
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
/**
 * @since 2.5.0
 */
export declare function updateAt<A>(
  i: number,
  a: A
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
/**
 * @since 2.5.0
 */
export declare function modifyAt<A>(
  i: number,
  f: (a: A) => A
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
/**
 * @since 2.5.0
 */
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
export declare function filter<A>(
  predicate: Predicate<A>
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
/**
 * @since 2.5.0
 */
export declare function filterWithIndex<A>(
  predicate: (i: number, a: A) => boolean
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
/**
 * @since 2.5.0
 */
export declare const of: <A>(a: A) => ReadonlyNonEmptyArray<A>
/**
 * @since 2.5.0
 */
export declare function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>
export declare function concat<A>(fx: ReadonlyNonEmptyArray<A>, fy: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
/**
 * @since 2.5.0
 */
export declare function fold<A>(S: Semigroup<A>): (fa: ReadonlyNonEmptyArray<A>) => A
/**
 * @since 2.5.0
 */
export declare const readonlyNonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI>
declare const ap: <A>(
    fa: ReadonlyNonEmptyArray<A>
  ) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>,
  apFirst: <B>(fb: ReadonlyNonEmptyArray<B>) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>,
  apSecond: <B>(fb: ReadonlyNonEmptyArray<B>) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>,
  chain: <A, B>(f: (a: A) => ReadonlyNonEmptyArray<B>) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>,
  chainFirst: <A, B>(
    f: (a: A) => ReadonlyNonEmptyArray<B>
  ) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>,
  duplicate: <A>(ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>,
  extend: <A, B>(f: (fa: ReadonlyNonEmptyArray<A>) => B) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>,
  flatten: <A>(mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => ReadonlyNonEmptyArray<A>,
  map: <A, B>(f: (a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>,
  mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>,
  reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B,
  reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B,
  reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B,
  reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
declare const foldMapWithIndex: <S>(
  S: Semigroup<S>
) => <A>(f: (i: number, a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
declare const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
export {
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
  flatten,
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
  reduceWithIndex
}
