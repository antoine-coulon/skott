/**
 * @since 1.0.0
 */
import { dual, identity } from "@effect/data/Function";
import * as readonlyArray from "@effect/data/internal/ReadonlyArray";
import * as chainable from "@effect/data/typeclass/Chainable";
import * as covariant from "@effect/data/typeclass/Covariant";
import * as invariant from "@effect/data/typeclass/Invariant";
import * as of_ from "@effect/data/typeclass/Of";
import * as semiProduct from "@effect/data/typeclass/SemiProduct";
const map = /*#__PURE__*/dual(2, (self, f) => f(self));
const imap = /*#__PURE__*/covariant.imap(map);
/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant = {
  imap,
  map
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant = {
  imap
};
const of = identity;
/**
 * @category instances
 * @since 1.0.0
 */
export const Of = {
  of
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed = {
  of,
  imap,
  map
};
const flatMap = /*#__PURE__*/dual(2, (self, f) => f(self));
/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap = {
  flatMap
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable = {
  imap,
  map,
  flatMap
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Monad = {
  imap,
  of,
  map,
  flatMap
};
const product = (self, that) => [self, that];
const productMany = (self, collection) => [self, ...collection];
/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct = {
  imap,
  product,
  productMany
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Product = {
  of,
  imap,
  product,
  productMany,
  productAll: readonlyArray.fromIterable
};
/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative = {
  imap,
  map,
  product,
  productMany
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll: readonlyArray.fromIterable
};
/**
 * @category instances
 * @since 1.0.0
 */
export const getSemiCoproduct = S => ({
  imap,
  coproduct: dual(2, S.combine),
  coproductMany: dual(2, S.combineMany)
});
/**
 * @category instances
 * @since 1.0.0
 */
export const getSemiAlternative = S => ({
  ...getSemiCoproduct(S),
  map
});
/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable = {
  reduce: /*#__PURE__*/dual(3, (self, b, f) => f(b, self))
};
const traverse = F => dual(2, (self, f) => f(self));
/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable = {
  traverse
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo = /*#__PURE__*/invariant.bindTo(Invariant);
const let_ = /*#__PURE__*/covariant.let(Covariant);
export {
/**
 * @category do notation
 * @since 1.0.0
 */
let_ as let };
/**
 * @category do notation
 * @since 1.0.0
 */
export const Do = /*#__PURE__*/of_.Do(Of);
/**
 * @category do notation
 * @since 1.0.0
 */
export const bind = /*#__PURE__*/chainable.bind(Chainable);
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind = /*#__PURE__*/semiProduct.andThenBind(SemiProduct);
//# sourceMappingURL=Identity.mjs.map