import * as semiCoproduct from "@effect/data/typeclass/SemiCoproduct";
/**
 * @since 1.0.0
 */
export const getMonoid = F => () => ({
  ...semiCoproduct.getSemigroup(F)(),
  empty: F.zero(),
  combineAll: F.coproductAll
});
//# sourceMappingURL=Coproduct.mjs.map