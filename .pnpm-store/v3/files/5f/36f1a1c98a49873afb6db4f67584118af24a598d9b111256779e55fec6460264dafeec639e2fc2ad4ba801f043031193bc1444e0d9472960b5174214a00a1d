/**
 * The `Ord` type class represents types which support comparisons with a _total order_.
 *
 * Instances should satisfy the laws of total orderings:
 *
 * 1. Reflexivity: `S.compare(a, a) <= 0`
 * 2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
 * 3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`
 *
 * @since 2.0.0
 */
import { Ordering } from './Ordering'
import { Semigroup } from './Semigroup'
import { Eq } from './Eq'
import { Contravariant1 } from './Contravariant'
import { Monoid } from './Monoid'
declare module './HKT' {
  interface URItoKind<A> {
    readonly Ord: Ord<A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'Ord'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}
/**
 * @since 2.0.0
 */
export declare const ordString: Ord<string>
/**
 * @since 2.0.0
 */
export declare const ordNumber: Ord<number>
/**
 * @since 2.0.0
 */
export declare const ordBoolean: Ord<boolean>
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
export declare function lt<A>(O: Ord<A>): (x: A, y: A) => boolean
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
export declare function gt<A>(O: Ord<A>): (x: A, y: A) => boolean
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
export declare function leq<A>(O: Ord<A>): (x: A, y: A) => boolean
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
export declare function geq<A>(O: Ord<A>): (x: A, y: A) => boolean
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export declare function min<A>(O: Ord<A>): (x: A, y: A) => A
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export declare function max<A>(O: Ord<A>): (x: A, y: A) => A
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
export declare function clamp<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => A
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
export declare function between<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => boolean
/**
 * @since 2.0.0
 */
export declare function fromCompare<A>(compare: (x: A, y: A) => Ordering): Ord<A>
/**
 * Use `getMonoid` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export declare function getSemigroup<A = never>(): Semigroup<Ord<A>>
/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/lib/Array'
 * import { contramap, getDualOrd, getMonoid, ordBoolean, ordNumber, ordString } from 'fp-ts/lib/Ord'
 * import { pipe } from 'fp-ts/lib/pipeable'
 * import { fold } from 'fp-ts/lib/Monoid'
 *
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 *   rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   ordString,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   ordNumber,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   ordBoolean,
 *   contramap((p: User) => p.rememberMe)
 * )
 *
 * const M = getMonoid<User>()
 *
 * const users: Array<User> = [
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
 * ]
 *
 * // sort by name, then by age, then by `rememberMe`
 * const O1 = fold(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = fold(M)([getDualOrd(byRememberMe), byName, byAge])
 * assert.deepStrictEqual(sort(O2)(users), [
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * @since 2.4.0
 */
export declare function getMonoid<A = never>(): Monoid<Ord<A>>
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 *
 * @example
 * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/lib/Ord'
 *
 * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @since 2.0.0
 */
export declare function getTupleOrd<T extends ReadonlyArray<Ord<any>>>(
  ...ords: T
): Ord<
  {
    [K in keyof T]: T[K] extends Ord<infer A> ? A : never
  }
>
/**
 * @since 2.0.0
 */
export declare function getDualOrd<A>(O: Ord<A>): Ord<A>
/**
 * @since 2.0.0
 */
export declare const ord: Contravariant1<URI>
declare const contramap: <A, B>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B>
export {
  /**
   * @since 2.0.0
   */
  contramap
}
/**
 * @since 2.0.0
 */
export declare const ordDate: Ord<Date>
