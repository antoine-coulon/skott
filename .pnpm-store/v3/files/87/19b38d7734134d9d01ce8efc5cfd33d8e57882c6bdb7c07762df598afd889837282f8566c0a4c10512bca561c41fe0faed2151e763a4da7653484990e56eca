/**
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function";
import { fromIterable } from "@effect/data/internal/ReadonlyArray";
import * as readonlyArray from "@effect/data/internal/ReadonlyArray";
import * as product_ from "@effect/data/typeclass/Product";
/**
 * @param combineMany - Useful when `combineMany` can be optimised
 *
 * @category constructors
 * @since 1.0.0
 */
export const make = (combine, combineMany = (self, collection) => fromIterable(collection).reduce(combine, self)) => ({
  combine,
  combineMany
});
/**
 * @category instances
 * @since 1.0.0
 */
export const string = /*#__PURE__*/make((self, that) => self + that);
/**
 * `number` semigroup under addition.
 *
 * @category instances
 * @since 1.0.0
 */
export const numberSum = /*#__PURE__*/make((self, that) => self + that);
/**
 * `number` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
export const numberMultiply = /*#__PURE__*/make((self, that) => self * that, (self, collection) => {
  if (self === 0) {
    return 0;
  }
  let out = self;
  for (const n of collection) {
    if (n === 0) {
      return 0;
    }
    out = out * n;
  }
  return out;
});
/**
 * `bigint` semigroup under addition.
 *
 * @category instances
 * @since 1.0.0
 */
export const bigintSum = /*#__PURE__*/make((self, that) => self + that);
/**
 * `bigint` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
export const bigintMultiply = /*#__PURE__*/make((self, that) => self * that, (self, collection) => {
  if (self === 0n) {
    return 0n;
  }
  let out = self;
  for (const n of collection) {
    if (n === 0n) {
      return 0n;
    }
    out = out * n;
  }
  return out;
});
/**
 * `boolean` semigroup under conjunction.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanEvery = /*#__PURE__*/make((self, that) => self && that, (self, collection) => {
  if (self === false) {
    return false;
  }
  for (const b of collection) {
    if (b === false) {
      return false;
    }
  }
  return true;
});
/**
 * `boolean` semigroup under disjunction.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanSome = /*#__PURE__*/make((self, that) => self || that, (self, collection) => {
  if (self === true) {
    return true;
  }
  for (const b of collection) {
    if (b === true) {
      return true;
    }
  }
  return false;
});
/**
 * `boolean` semigroup under exclusive disjunction.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanXor = /*#__PURE__*/make((self, that) => self !== that);
/**
 * `boolean` semigroup under equivalence.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanEqv = /*#__PURE__*/make((self, that) => self === that);
/**
 * `Semigroup` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const min = O => make((self, that) => O.compare(self, that) === -1 ? self : that);
/**
 * `Semigroup` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const max = O => make((self, that) => O.compare(self, that) === 1 ? self : that);
/**
 * @category constructors
 * @since 1.0.0
 */
export const constant = a => make(() => a, () => a);
/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 1.0.0
 */
export const reverse = S => make((self, that) => S.combine(that, self), (self, collection) => {
  const reversed = Array.from(collection).reverse();
  return reversed.length > 0 ? S.combine(S.combineMany(reversed[0], reversed.slice(1)), self) : self;
});
/**
 * @since 1.0.0
 */
export const intercalate = /*#__PURE__*/dual(2, (S, separator) => make((self, that) => S.combineMany(self, [separator, that])));
/**
 * Always return the first argument.
 *
 * @category instances
 * @since 1.0.0
 */
export const first = () => make(a => a, a => a);
/**
 * Always return the last argument.
 *
 * @category instances
 * @since 1.0.0
 */
export const last = () => make((_, second) => second, (self, collection) => {
  let a = self;
  // eslint-disable-next-line no-empty
  for (a of collection) {}
  return a;
});
/**
 * @since 1.0.0
 */
export const imap = /*#__PURE__*/dual(3, (S, to, from) => make((self, that) => to(S.combine(from(self), from(that))), (self, collection) => to(S.combineMany(from(self), fromIterable(collection).map(from)))));
/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant = {
  imap
};
const product = (self, that) => make(([xa, xb], [ya, yb]) => [self.combine(xa, ya), that.combine(xb, yb)]);
const productAll = collection => {
  const semigroups = readonlyArray.fromIterable(collection);
  return make((x, y) => {
    const len = Math.min(x.length, y.length, semigroups.length);
    const out = [];
    for (let i = 0; i < len; i++) {
      out.push(semigroups[i].combine(x[i], y[i]));
    }
    return out;
  });
};
const productMany = (self, collection) => {
  const semigroup = productAll(collection);
  return make((x, y) => [self.combine(x[0], y[0]), ...semigroup.combine(x.slice(1), y.slice(1))]);
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
const of = constant;
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
 * Similar to `Promise.all` but operates on `Semigroup`s.
 *
 * ```
 * [Semigroup<A>, Semigroup<B>, ...] -> Semigroup<[A, B, ...]>
 * ```
 *
 * This function creates and returns a new `Semigroup` for a tuple of values based on the given `Semigroup`s for each element in the tuple.
 * The returned `Semigroup` combines two tuples of the same type by applying the corresponding `Semigroup` passed as arguments to each element in the tuple.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple = /*#__PURE__*/product_.tuple(Product);
/**
 * Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.
 * The returned `Semigroup` combines two arrays by concatenating them.
 *
 * @category combinators
 * @since 1.0.0
 */
export const array = () => make((self, that) => self.concat(that));
/**
 * This function creates and returns a new `Semigroup` for a struct of values based on the given `Semigroup`s for each property in the struct.
 * The returned `Semigroup` combines two structs of the same type by applying the corresponding `Semigroup` passed as arguments to each property in the struct.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export const struct = /*#__PURE__*/product_.struct(Product);
//# sourceMappingURL=Semigroup.mjs.map