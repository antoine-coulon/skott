import * as monoid from "@effect/data/typeclass/Monoid";
import * as semiApplicative from "@effect/data/typeclass/SemiApplicative";
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
export const getMonoid = F => M => monoid.fromSemigroup(semiApplicative.getSemigroup(F)(M), F.of(M.empty));
//# sourceMappingURL=Applicative.mjs.map