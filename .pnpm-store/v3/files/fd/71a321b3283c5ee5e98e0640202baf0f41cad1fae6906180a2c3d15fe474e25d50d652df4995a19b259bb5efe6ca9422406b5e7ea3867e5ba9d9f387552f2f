/**
 * Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs
 *
 * @since 2.0.0
 */
import { Ring } from './Ring'
import { Eq } from './Eq'
/**
 * @since 2.0.0
 */
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}
/**
 * @since 2.0.0
 */
export declare const fieldNumber: Field<number>
/**
 * The *greatest common divisor* of two values
 *
 * @since 2.0.0
 */
export declare function gcd<A>(E: Eq<A>, field: Field<A>): (x: A, y: A) => A
/**
 * The *least common multiple* of two values
 *
 * @since 2.0.0
 */
export declare function lcm<A>(E: Eq<A>, F: Field<A>): (x: A, y: A) => A
