import { Bifunctor2 } from './Bifunctor'
import { Either, Left, Right } from './Either'
import { Eq } from './Eq'
import { Foldable2 } from './Foldable'
import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable2 } from './Traversable'
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly These: These<E, A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'These'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly left: E
  readonly right: A
}
/**
 * @since 2.0.0
 */
export declare type These<E, A> = Either<E, A> | Both<E, A>
/**
 * @since 2.0.0
 */
export declare function left<E = never, A = never>(left: E): These<E, A>
/**
 * @since 2.0.0
 */
export declare function right<E = never, A = never>(right: A): These<E, A>
/**
 * @since 2.0.0
 */
export declare function both<E, A>(left: E, right: A): These<E, A>
/**
 * @since 2.0.0
 */
export declare function fold<E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
): (fa: These<E, A>) => B
/**
 * @since 2.4.0
 */
export declare const swap: <E, A>(fa: These<E, A>) => These<A, E>
/**
 * @since 2.0.0
 */
export declare function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<These<E, A>>
/**
 * @since 2.0.0
 */
export declare function getEq<E, A>(EE: Eq<E>, EA: Eq<A>): Eq<These<E, A>>
/**
 * @since 2.0.0
 */
export declare function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<These<E, A>>
/**
 * @since 2.0.0
 */
export declare function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E>
/**
 * @example
 * import { toTuple, left, right, both } from 'fp-ts/lib/These'
 *
 * assert.deepStrictEqual(toTuple('a', 1)(left('b')), ['b', 1])
 * assert.deepStrictEqual(toTuple('a', 1)(right(2)), ['a', 2])
 * assert.deepStrictEqual(toTuple('a', 1)(both('b', 2)), ['b', 2])
 *
 * @since 2.0.0
 */
export declare function toTuple<E, A>(e: E, a: A): (fa: These<E, A>) => [E, A]
/**
 * Returns an `E` value if possible
 *
 * @example
 * import { getLeft, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
 *
 * @since 2.0.0
 */
export declare function getLeft<E, A>(fa: These<E, A>): Option<E>
/**
 * Returns an `A` value if possible
 *
 * @example
 * import { getRight, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRight(left('a')), none)
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(both('a', 1)), some(1))
 *
 * @since 2.0.0
 */
export declare function getRight<E, A>(fa: These<E, A>): Option<A>
/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isLeft<E, A>(fa: These<E, A>): fa is Left<E>
/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isRight<E, A>(fa: These<E, A>): fa is Right<A>
/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isBoth<E, A>(fa: These<E, A>): fa is Both<E, A>
/**
 * @example
 * import { leftOrBoth, left, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(leftOrBoth('a')(none), left('a'))
 * assert.deepStrictEqual(leftOrBoth('a')(some(1)), both('a', 1))
 *
 * @since 2.0.0
 */
export declare function leftOrBoth<E>(e: E): <A>(ma: Option<A>) => These<E, A>
/**
 * @example
 * import { rightOrBoth, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(rightOrBoth(1)(none), right(1))
 * assert.deepStrictEqual(rightOrBoth(1)(some('a')), both('a', 1))
 *
 * @since 2.0.0
 */
export declare function rightOrBoth<A>(a: A): <E>(me: Option<E>) => These<E, A>
/**
 * Returns the `E` value if and only if the value is constructed with `Left`
 *
 * @example
 * import { getLeftOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
 * assert.deepStrictEqual(getLeftOnly(right(1)), none)
 * assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
 *
 * @since 2.0.0
 */
export declare function getLeftOnly<E, A>(fa: These<E, A>): Option<E>
/**
 * Returns the `A` value if and only if the value is constructed with `Right`
 *
 * @example
 * import { getRightOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRightOnly(left('a')), none)
 * assert.deepStrictEqual(getRightOnly(right(1)), some(1))
 * assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
 *
 *
 * @since 2.0.0
 */
export declare function getRightOnly<E, A>(fa: These<E, A>): Option<A>
/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @since 2.0.0
 */
export declare function fromOptions<E, A>(fe: Option<E>, fa: Option<A>): Option<These<E, A>>
/**
 * @since 2.0.0
 */
export declare const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI>
declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: These<E, A>) => These<G, B>,
  foldMap: <M>(M: import('./Monoid').Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: These<E, A>) => M,
  map: <A, B>(f: (a: A) => B) => <E>(fa: These<E, A>) => These<E, B>,
  mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: These<E, A>) => These<G, A>,
  reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: These<E, A>) => B,
  reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: These<E, A>) => B
export {
  /**
   * @since 2.0.0
   */
  bimap,
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
  mapLeft,
  /**
   * @since 2.0.0
   */
  reduce,
  /**
   * @since 2.0.0
   */
  reduceRight
}
