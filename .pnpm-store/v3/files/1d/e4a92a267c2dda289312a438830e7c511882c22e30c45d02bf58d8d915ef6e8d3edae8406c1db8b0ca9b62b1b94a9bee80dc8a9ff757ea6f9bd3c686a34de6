/**
 * @since 2.0.0
 */
import { Bounded } from './Bounded'
import { Endomorphism } from './function'
import { ReadonlyRecord } from './ReadonlyRecord'
import { Semigroup } from './Semigroup'
/**
 * @since 2.0.0
 */
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
/**
 * Boolean monoid under conjunction
 * @since 2.0.0
 */
export declare const monoidAll: Monoid<boolean>
/**
 * Boolean monoid under disjunction
 * @since 2.0.0
 */
export declare const monoidAny: Monoid<boolean>
/**
 * Number monoid under addition
 * @since 2.0.0
 */
export declare const monoidSum: Monoid<number>
/**
 * Number monoid under multiplication
 * @since 2.0.0
 */
export declare const monoidProduct: Monoid<number>
/**
 * @since 2.0.0
 */
export declare const monoidString: Monoid<string>
/**
 * @since 2.0.0
 */
export declare const monoidVoid: Monoid<void>
/**
 * @since 2.0.0
 */
export declare function fold<A>(M: Monoid<A>): (as: ReadonlyArray<A>) => A
/**
 * Given a tuple of monoids returns a monoid for the tuple
 *
 * @example
 * import { getTupleMonoid, monoidString, monoidSum, monoidAll } from 'fp-ts/lib/Monoid'
 *
 * const M1 = getTupleMonoid(monoidString, monoidSum)
 * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
 * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.0.0
 */
export declare function getTupleMonoid<T extends ReadonlyArray<Monoid<any>>>(
  ...monoids: T
): Monoid<
  {
    [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never
  }
>
/**
 * @since 2.0.0
 */
export declare function getDualMonoid<A>(M: Monoid<A>): Monoid<A>
/**
 * @since 2.0.0
 */
export declare function getFunctionMonoid<M>(M: Monoid<M>): <A = never>() => Monoid<(a: A) => M>
/**
 * @since 2.0.0
 */
export declare function getEndomorphismMonoid<A = never>(): Monoid<Endomorphism<A>>
/**
 * @since 2.0.0
 */
export declare function getStructMonoid<O extends ReadonlyRecord<string, any>>(
  monoids: {
    [K in keyof O]: Monoid<O[K]>
  }
): Monoid<O>
/**
 * @since 2.0.0
 */
export declare function getMeetMonoid<A>(B: Bounded<A>): Monoid<A>
/**
 * @since 2.0.0
 */
export declare function getJoinMonoid<A>(B: Bounded<A>): Monoid<A>
