/**
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.
 *
 * ```ts
 * import { Either, left, right } from 'fp-ts/lib/Either'
 *
 * function parse(input: string): Either<Error, number> {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(new Error('not a number')) : right(n)
 * }
 * ```
 *
 * `Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
 * operations like `map`, `chain`, ... return the `Left` value unchanged:
 *
 * ```ts
 * import { map, left, right } from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * pipe(right(12), map(double)) // right(24)
 * pipe(left(23), map(double))  // left(23)
 * ```
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import { ChainRec2 } from './ChainRec'
import { Eq } from './Eq'
import { Extend2 } from './Extend'
import { Foldable2 } from './Foldable'
import { Lazy, Predicate } from './function'
import { Monad2, Monad2C } from './Monad'
import { MonadThrow2 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable2 } from './Traversable'
import { Witherable2C } from './Witherable'
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Either: Either<E, A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'Either'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}
/**
 * @since 2.0.0
 */
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
/**
 * @since 2.0.0
 */
export declare type Either<E, A> = Left<E> | Right<A>
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 2.0.0
 */
export declare function left<E = never, A = never>(e: E): Either<E, A>
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @since 2.0.0
 */
export declare function right<E = never, A = never>(a: A): Either<E, A>
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/lib/Either'
 *
 * const parse = fromNullable('nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @since 2.0.0
 */
export declare function fromNullable<E>(e: E): <A>(a: A) => Either<E, NonNullable<A>>
/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
export declare function toError(e: unknown): Error
/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @since 2.0.0
 */
export declare function tryCatch<E, A>(f: Lazy<A>, onError: (e: unknown) => E): Either<E, A>
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { fold, left, right } from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     fold(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     fold(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @since 2.0.0
 */
export declare function fold<E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B): (ma: Either<E, A>) => B
/**
 * @since 2.0.0
 */
export declare function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>>
/**
 * @since 2.0.0
 */
export declare function getEq<E, A>(EL: Eq<E>, EA: Eq<A>): Eq<Either<E, A>>
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 2.0.0
 */
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>>
/**
 * `Apply` semigroup
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 2.0.0
 */
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>>
/**
 * @since 2.0.0
 */
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<Either<E, A>>
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isLeft<E, A>(ma: Either<E, A>): ma is Left<E>
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isRight<E, A>(ma: Either<E, A>): ma is Right<A>
/**
 * @since 2.0.0
 */
export declare function swap<E, A>(ma: Either<E, A>): Either<A, E>
/**
 * @since 2.0.0
 */
export declare function orElse<E, A, M>(onLeft: (e: E) => Either<M, A>): (ma: Either<E, A>) => Either<M, A>
/**
 * @since 2.0.0
 */
export declare function getOrElse<E, A>(onLeft: (e: E) => A): (ma: Either<E, A>) => A
/**
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): <E>(a: A, ma: Either<E, A>) => boolean
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import { exists, left, right } from 'fp-ts/lib/Either'
 *
 * const gt2 = exists((n: number) => n > 2)
 *
 * assert.strictEqual(gt2(left('a')), false)
 * assert.strictEqual(gt2(right(1)), false)
 * assert.strictEqual(gt2(right(3)), true)
 *
 * @since 2.0.0
 */
export declare function exists<A>(predicate: Predicate<A>): <E>(ma: Either<E, A>) => boolean
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError, right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
 * assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @since 2.0.0
 */
export declare function parseJSON<E>(s: string, onError: (reason: unknown) => E): Either<E, unknown>
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import * as E from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * assert.deepStrictEqual(E.stringifyJSON({ a: 1 }, E.toError), E.right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(
 *   pipe(
 *     E.stringifyJSON(circular, E.toError),
 *     E.mapLeft(e => e.message.includes('Converting circular structure to JSON'))
 *   ),
 *   E.left(true)
 * )
 *
 * @since 2.0.0
 */
export declare function stringifyJSON<E>(u: unknown, onError: (reason: unknown) => E): Either<E, string>
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @since 2.0.0
 */
export declare function getWitherable<E>(M: Monoid<E>): Witherable2C<URI, E>
/**
 * @since 2.0.0
 */
export declare function getValidation<E>(S: Semigroup<E>): Monad2C<URI, E> & Alt2C<URI, E>
/**
 * @since 2.0.0
 */
export declare function getValidationSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<Either<E, A>>
/**
 * @since 2.0.0
 */
export declare function getValidationMonoid<E, A>(SE: Semigroup<E>, SA: Monoid<A>): Monoid<Either<E, A>>
/**
 * @since 2.0.0
 */
export declare const either: Monad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> &
  MonadThrow2<URI>
declare const alt: <E, A>(that: () => Either<E, A>) => (fa: Either<E, A>) => Either<E, A>,
  ap: <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B>,
  apFirst: <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, A>,
  apSecond: <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, B>,
  bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Either<E, A>) => Either<G, B>,
  chain: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B>,
  chainFirst: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, A>,
  duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>>,
  extend: <E, A, B>(f: (fa: Either<E, A>) => B) => (ma: Either<E, A>) => Either<E, B>,
  flatten: <E, A>(mma: Either<E, Either<E, A>>) => Either<E, A>,
  foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Either<E, A>) => M,
  map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B>,
  mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Either<E, A>) => Either<G, A>,
  reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B,
  reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B,
  fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => Either<E, A>,
  fromPredicate: {
    <E, A, B extends A>(refinement: import('./function').Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Either<E, B>
    <E_1, A_1>(predicate: Predicate<A_1>, onFalse: (a: A_1) => E_1): (a: A_1) => Either<E_1, A_1>
  },
  filterOrElse: {
    <E, A, B extends A>(refinement: import('./function').Refinement<A, B>, onFalse: (a: A) => E): (
      ma: Either<E, A>
    ) => Either<E, B>
    <E_1, A_1>(predicate: Predicate<A_1>, onFalse: (a: A_1) => E_1): (ma: Either<E_1, A_1>) => Either<E_1, A_1>
  }
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
  bimap,
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
  reduceRight,
  /**
   * @since 2.0.0
   */
  fromOption,
  /**
   * @since 2.0.0
   */
  fromPredicate,
  /**
   * @since 2.0.0
   */
  filterOrElse
}
