/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@effect/data/HKT";
import type { Monoid } from "@effect/data/typeclass/Monoid";
import type { Order } from "@effect/data/typeclass/Order";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Bounded<A> extends Order<A> {
    readonly maxBound: A;
    readonly minBound: A;
}
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface BoundedTypeLambda extends TypeLambda {
    readonly type: Bounded<this["Target"]>;
}
/**
 * `Monoid` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const min: <A>(B: Bounded<A>) => Monoid<A>;
/**
 * `Monoid` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const max: <A>(B: Bounded<A>) => Monoid<A>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const number: Bounded<number>;
/**
 * Checks if a value is between the lower and upper limit of a bound.
 *
 * @category predicates
 * @since 1.0.0
 */
export declare const between: <A>(B: Bounded<A>) => (a: A) => boolean;
/**
 * Clamp a value between `minBound` and `maxBound` values.
 *
 * @category utils
 * @since 1.0.0
 */
export declare const clamp: <A>(B: Bounded<A>) => (a: A) => A;
/**
 * Reverses the `Order` of a `Bounded` and flips `maxBound` and `minBound` values.
 *
 * @category utils
 * @since 1.0.0
 */
export declare const reverse: <A>(B: Bounded<A>) => Bounded<A>;
//# sourceMappingURL=Bounded.d.ts.map