/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.0.0
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
import * as RNEA from './ReadonlyNonEmptyArray'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { TraversableWithIndex1 } from './TraversableWithIndex'
declare module './HKT' {
  interface URItoKind<A> {
    readonly NonEmptyArray: NonEmptyArray<A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'NonEmptyArray'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  0: A
}
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export declare const cons: <A>(head: A, tail: Array<A>) => NonEmptyArray<A>
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export declare const snoc: <A>(init: Array<A>, end: A) => NonEmptyArray<A>
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @since 2.0.0
 */
export declare const fromArray: <A>(as: Array<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const head: <A>(nea: NonEmptyArray<A>) => A
/**
 * @since 2.0.0
 */
export declare const tail: <A>(nea: NonEmptyArray<A>) => Array<A>
/**
 * @since 2.0.0
 */
export declare const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const min: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
/**
 * @since 2.0.0
 */
export declare const max: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @since 2.0.0
 */
export declare const getSemigroup: <A = never>() => Semigroup<NonEmptyArray<A>>
/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/NonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.0.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>>
/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @since 2.0.0
 */
export declare function group<A>(
  E: Eq<A>
): {
  (as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  (as: Array<A>): Array<NonEmptyArray<A>>
}
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.0.0
 */
export declare const groupSort: <A>(O: Ord<A>) => (as: Array<A>) => Array<NonEmptyArray<A>>
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.0.0
 */
export declare const groupBy: <A>(f: (a: A) => string) => (as: Array<A>) => Record<string, NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const last: <A>(nea: NonEmptyArray<A>) => A
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.2.0
 */
export declare const init: <A>(nea: NonEmptyArray<A>) => Array<A>
/**
 * @since 2.0.0
 */
export declare const sort: <A>(O: Ord<A>) => (nea: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const insertAt: <A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const updateAt: <A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const modifyAt: <A>(i: number, f: (a: A) => A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare function copy<A>(nea: NonEmptyArray<A>): NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export declare function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const of: <A>(a: A) => NonEmptyArray<A>
/**
 * @since 2.2.0
 */
export declare function concat<A>(fx: Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>
export declare function concat<A>(fx: NonEmptyArray<A>, fy: Array<A>): NonEmptyArray<A>
/**
 * @since 2.5.0
 */
export declare const fold: <A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A
/**
 * @since 2.0.0
 */
export declare const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI>
declare const ap: <A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>,
  apFirst: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A>,
  apSecond: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B>,
  chain: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>,
  chainFirst: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<A>,
  duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>,
  extend: <A, B>(f: (fa: NonEmptyArray<A>) => B) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>,
  flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>,
  map: <A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>,
  mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>,
  reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B,
  reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B,
  reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B,
  reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
declare const foldMapWithIndex: <S>(
  S: Semigroup<S>
) => <A>(f: (i: number, a: A) => S) => (fa: RNEA.ReadonlyNonEmptyArray<A>) => S
declare const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: RNEA.ReadonlyNonEmptyArray<A>) => S
export {
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
  flatten,
  /**
   * @since 2.0.0
   */
  foldMap,
  /**
   * @since 2.0.0
   */
  foldMapWithIndex,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  mapWithIndex,
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
  reduceRightWithIndex,
  /**
   * @since 2.0.0
   */
  reduceWithIndex
}
