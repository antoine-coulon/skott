/**
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
export const make = compare => ({
  compare: (self, that) => self === that ? 0 : compare(self, that)
});
/**
 * @category instances
 * @since 1.0.0
 */
export const string = /*#__PURE__*/make((self, that) => self < that ? -1 : 1);
/**
 * @category instances
 * @since 1.0.0
 */
export const number = /*#__PURE__*/make((self, that) => self < that ? -1 : 1);
/**
 * @category instances
 * @since 1.0.0
 */
export const boolean = /*#__PURE__*/make((self, that) => self < that ? -1 : 1);
/**
 * @category instances
 * @since 1.0.0
 */
export const bigint = /*#__PURE__*/make((self, that) => self < that ? -1 : 1);
/**
 * @since 1.0.0
 */
export const reverse = O => make((self, that) => O.compare(that, self));
/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = () => semigroup.make((O1, O2) => make((self, that) => {
  const out = O1.compare(self, that);
  if (out !== 0) {
    return out;
  }
  return O2.compare(self, that);
}), (self, collection) => make((a1, a2) => {
  let out = self.compare(a1, a2);
  if (out !== 0) {
    return out;
  }
  for (const O of collection) {
    out = O.compare(a1, a2);
    if (out !== 0) {
      return out;
    }
  }
  return out;
}));
const empty = /*#__PURE__*/make(() => 0);
/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = () => monoid.fromSemigroup(getSemigroup(), empty);
/**
 * @category combinators
 * @since 1.0.0
 */
export const contramap = /*#__PURE__*/dual(2, (self, f) => make((b1, b2) => self.compare(f(b1), f(b2))));
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
const product = (self, that) => make(([xa, xb], [ya, yb]) => {
  const o = self.compare(xa, ya);
  return o !== 0 ? o : that.compare(xb, yb);
});
const productAll = collection => {
  const orders = readonlyArray.fromIterable(collection);
  return make((x, y) => {
    const len = Math.min(x.length, y.length, orders.length);
    for (let i = 0; i < len; i++) {
      const o = orders[i].compare(x[i], y[i]);
      if (o !== 0) {
        return o;
      }
    }
    return 0;
  });
};
const productMany = (self, collection) => {
  const order = productAll(collection);
  return make((x, y) => {
    const o = self.compare(x[0], y[0]);
    return o !== 0 ? o : order.compare(x.slice(1), y.slice(1));
  });
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
const of = () => empty;
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
 * Similar to `Promise.all` but operates on `Order`s.
 *
 * ```
 * [Order<A>, Order<B>, ...] -> Order<[A, B, ...]>
 * ```
 *
 * This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
 * The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
 * It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
 * of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple = /*#__PURE__*/product_.tuple(Product);
/**
 * This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
 * The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
 * If all elements are equal, the arrays are then compared based on their length.
 * It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
 *
 * @category combinators
 * @since 1.0.0
 */
export const array = O => make((self, that) => {
  const aLen = self.length;
  const bLen = that.length;
  const len = Math.min(aLen, bLen);
  for (let i = 0; i < len; i++) {
    const o = O.compare(self[i], that[i]);
    if (o !== 0) {
      return o;
    }
  }
  return number.compare(aLen, bLen);
});
/**
 * This function creates and returns a new `Order` for a struct of values based on the given `Order`s
 * for each property in the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export const struct = /*#__PURE__*/product_.struct(Product);
/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lessThan = O => dual(2, (self, that) => O.compare(self, that) === -1);
/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThan = O => dual(2, (self, that) => O.compare(self, that) === 1);
/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lessThanOrEqualTo = O => dual(2, (self, that) => O.compare(self, that) !== 1);
/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = O => dual(2, (self, that) => O.compare(self, that) !== -1);
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const min = O => dual(2, (self, that) => self === that || O.compare(self, that) < 1 ? self : that);
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const max = O => dual(2, (self, that) => self === that || O.compare(self, that) > -1 ? self : that);
/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 1.0.0
 */
export const clamp = O => dual(3, (self, minimum, maximum) => min(O)(maximum, max(O)(minimum, self)));
/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 1.0.0
 */
export const between = O => dual(3, (self, minimum, maximum) => !lessThan(O)(self, minimum) && !greaterThan(O)(self, maximum));
//# sourceMappingURL=Order.mjs.map