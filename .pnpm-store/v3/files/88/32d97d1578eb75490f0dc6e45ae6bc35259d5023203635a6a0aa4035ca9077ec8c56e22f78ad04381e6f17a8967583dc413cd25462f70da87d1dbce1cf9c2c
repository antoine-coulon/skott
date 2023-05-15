"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tuple = exports.symbol = exports.struct = exports.string = exports.strict = exports.number = exports.make = exports.getSemigroup = exports.getMonoid = exports.contramap = exports.boolean = exports.bigint = exports.SemiProduct = exports.Product = exports.Invariant = exports.Contravariant = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var readonlyArray = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/ReadonlyArray"));
var contravariant = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Contravariant"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var product_ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Product"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * This module provides an implementation of the `Equivalence` type class, which defines a binary relation
 * that is reflexive, symmetric, and transitive. In other words, it defines a notion of equivalence between values of a certain type.
 * These properties are also known in mathematics as an "equivalence relation".
 *
 * @since 1.0.0
 */

/**
 * @category constructors
 * @since 1.0.0
 */
const make = isEquivalent => (self, that) => self === that || isEquivalent(self, that);
exports.make = make;
const isStrictEquivalent = (x, y) => x === y;
/**
 * Return an `Equivalence` that uses strict equality (===) to compare values.
 *
 * @since 1.0.0
 * @category constructors
 */
const strict = () => isStrictEquivalent;
/**
 * @category instances
 * @since 1.0.0
 */
exports.strict = strict;
const string = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
exports.string = string;
const number = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
exports.number = number;
const boolean = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
exports.boolean = boolean;
const bigint = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
exports.bigint = bigint;
const symbol = /*#__PURE__*/strict();
/**
 * @category instances
 * @since 1.0.0
 */
exports.symbol = symbol;
const getSemigroup = () => semigroup.make((self, that) => make((x, y) => self(x, y) && that(x, y)), (self, collection) => make((x, y) => {
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
exports.getSemigroup = getSemigroup;
const isAlwaysEquivalent = (_x, _y) => true;
/**
 * @category instances
 * @since 1.0.0
 */
const getMonoid = () => monoid.fromSemigroup(getSemigroup(), isAlwaysEquivalent);
/**
 * @category combinators
 * @since 1.0.0
 */
exports.getMonoid = getMonoid;
const contramap = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => make((x, y) => self(f(x), f(y))));
exports.contramap = contramap;
const imap = /*#__PURE__*/contravariant.imap(contramap);
/**
 * @category instances
 * @since 1.0.0
 */
const Contravariant = {
  imap,
  contramap
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.Contravariant = Contravariant;
const Invariant = {
  imap
};
exports.Invariant = Invariant;
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
const SemiProduct = {
  imap,
  product,
  productMany
};
exports.SemiProduct = SemiProduct;
const of = () => isAlwaysEquivalent;
/**
 * @category instances
 * @since 1.0.0
 */
const Product = {
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
exports.Product = Product;
const tuple = /*#__PURE__*/product_.tuple(Product);
/**
 * Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
 * by applying each `Equivalence` to the corresponding property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
exports.tuple = tuple;
const struct = /*#__PURE__*/product_.struct(Product);
exports.struct = struct;
//# sourceMappingURL=Equivalence.js.map