/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Monoid } from "@effect/data/typeclass/Monoid";
import type { Product } from "@effect/data/typeclass/Product";
import type { SemiApplicative } from "@effect/data/typeclass/SemiApplicative";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Applicative<F extends TypeLambda> extends SemiApplicative<F>, Product<F> {
}
/**
 * Lift a `Monoid` into `F`, combining the inner values using the provided `Monoid`:
 *
 * - `combine` is provided by {@link semiApplicative.getSemigroup}.
 * - `empty` is `F.of(M.empty)`
 *
 * @param F - The `Applicative` instance for `F`.
 * @param M - The `Monoid` instance for `A`.
 *
 * @since 1.0.0
 */
export declare const getMonoid: <F extends TypeLambda>(F: Applicative<F>) => <A, R, O, E>(M: Monoid<A>) => Monoid<Kind<F, R, O, E, A>>;
//# sourceMappingURL=Applicative.d.ts.map