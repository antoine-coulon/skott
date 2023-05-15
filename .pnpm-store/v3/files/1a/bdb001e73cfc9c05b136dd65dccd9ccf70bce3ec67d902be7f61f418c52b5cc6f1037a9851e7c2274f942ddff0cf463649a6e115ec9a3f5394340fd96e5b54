/**
 * This module provides an implementation of the `Equivalence` type class, which defines a binary relation
 * that is reflexive, symmetric, and transitive. In other words, it defines a notion of equivalence between values of a certain type.
 * These properties are also known in mathematics as an "equivalence relation".
 *
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function";
import * as readonlyArray from "@effect/data/internal/ReadonlyArray";
import * as contravariant from "@effect/data/typeclass/Contravariant";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as product_ from "@effect/data/typeclass/Product";
import * as semigroup from "@effect/data/typeclass/Semigroup";
/**
 * @category constructors
 * @since 1.0.0
 */
export const make = isEquivalent => (self, that) => self === that || isEquivalent(self, that);
const isStrictEquivalent = (x, y) => x === y;
/**
 * Return an `Equivalence` that uses strict equality (===) to compare values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const strict = () => isStrictEquivalent;
/**
 * @category instances
 * @since 1.0.0
 */
export const string = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
export const number = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
export const boolean = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
export const bigint = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
export const symbol = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = () => semigroup.make((self, that) => make((x, y) => self(x, y) && that(x, y)), (self, collection) => make((x, y) => {
  if (!self(x, y)) {
    return false;
  }
  for (const equivalence of collection) {
    if (!equivalence(x, y)) {
      return false;
    }
  }
  return true;
}));
const isAlwaysEquivalent = (_x, _y) => true;
/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = () => monoid.fromSemigroup(getSemigroup(), isAlwaysEquivalent);
/**
 * @category combinators
 * @since 1.0.0
 */
export const contramap = /*#__PURE__*/dual(2, (self, f) => make((x, y) => self(f(x), f(y))));
const imap = /*#__PURE__*/contravariant.imap(contramap);
/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant = {
  imap,
  contramap
};
/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant = {
  imap
};
const product = (self, that) => make(([xa, xb], [ya, yb]) => self(xa, ya) && that(xb, yb));
const productAll = collection => {
  const equivalences = readonlyArray.fromIterable(collection);
  return make((x, y) => {
    const len = Math.min(x.length, y.length, equivalences.length);
    for (let i = 0; i < len; i++) {
      if (!equivalences[i](x[i], y[i])) {
        return false;
      }
    }
    return true;
  });
};
const productMany = (self, collection) => {
  const equivalence = productAll(collection);
  return make((x, y) => !self(x[0], y[0]) ? false : equivalence(x.slice(1), y.slice(1)));
};
/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct = {
  imap,
  product,
  productMany
};
const of = () => isAlwaysEquivalent;
/**
 * @category instances
 * @since 1.0.0
 */
export const Product = {
  of,
  imap,
  product,
  productMany,
  productAll
};
/**
 * Similar to `Promise.all` but operates on `Equivalence`s.
 *
 * ```
 * [Equivalence<A>, Equivalence<B>, ...] -> Equivalence<[A, B, ...]>
 * ```
 *
 * Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
 * by applying each `Equivalence` to the corresponding element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple = /*#__PURE__*/product_.tuple(Product);
/**
 * Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
 * by applying each `Equivalence` to the corresponding property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export const struct = /*#__PURE__*/product_.struct(Product);
//# sourceMappingURL=Equivalence.mjs.map