/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@effect/data/HKT"
import type { Monoid } from "@effect/data/typeclass/Monoid"
import type { SemiCoproduct } from "@effect/data/typeclass/SemiCoproduct"
import * as semiCoproduct from "@effect/data/typeclass/SemiCoproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Coproduct<F extends TypeLambda> extends SemiCoproduct<F> {
  readonly zero: <A>() => Kind<F, unknown, never, never, A>

  readonly coproductAll: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, A>
}

/**
 * @since 1.0.0
 */
export const getMonoid = <F extends TypeLambda>(F: Coproduct<F>) =>
  <R, O, E, A>(): Monoid<
    Kind<F, R, O, E, A>
  > => ({
    ...semiCoproduct.getSemigroup(F)(),
    empty: F.zero(),
    combineAll: F.coproductAll
  })
