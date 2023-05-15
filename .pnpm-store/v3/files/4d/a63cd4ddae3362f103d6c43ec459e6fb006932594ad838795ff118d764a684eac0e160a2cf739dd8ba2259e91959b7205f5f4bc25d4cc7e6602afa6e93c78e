/**
 * Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
 * (equivalently, double-negation is true).
 *
 * Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:
 *
 * - Excluded middle: `a ∨ ¬a = 1`
 *
 * Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".
 *
 * @since 2.0.0
 */
import { HeytingAlgebra } from './HeytingAlgebra'
/**
 * @since 2.0.0
 */
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}
/**
 * @since 2.0.0
 */
export declare const booleanAlgebraBoolean: BooleanAlgebra<boolean>
/**
 * @since 2.0.0
 */
export declare const booleanAlgebraVoid: BooleanAlgebra<void>
/**
 * @since 2.0.0
 */
export declare function getFunctionBooleanAlgebra<B>(B: BooleanAlgebra<B>): <A = never>() => BooleanAlgebra<(a: A) => B>
/**
 * Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.
 *
 * @since 2.0.0
 */
export declare function getDualBooleanAlgebra<A>(B: BooleanAlgebra<A>): BooleanAlgebra<A>
