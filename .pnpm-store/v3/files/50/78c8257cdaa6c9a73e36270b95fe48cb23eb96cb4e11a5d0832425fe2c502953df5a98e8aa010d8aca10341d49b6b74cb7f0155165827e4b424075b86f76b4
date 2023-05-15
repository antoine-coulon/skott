"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tuple = exports.struct = exports.string = exports.reverse = exports.numberSum = exports.numberMultiply = exports.min = exports.max = exports.make = exports.last = exports.intercalate = exports.imap = exports.first = exports.constant = exports.booleanXor = exports.booleanSome = exports.booleanEvery = exports.booleanEqv = exports.bigintSum = exports.bigintMultiply = exports.array = exports.SemiProduct = exports.Product = exports.Invariant = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var readonlyArray = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/ReadonlyArray"));
var product_ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Product"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * @param combineMany - Useful when `combineMany` can be optimised
 *
 * @category constructors
 * @since 1.0.0
 */
const make = (combine, combineMany = (self, collection) => (0, readonlyArray.fromIterable)(collection).reduce(combine, self)) => ({
  combine,
  combineMany
});
/**
 * @category instances
 * @since 1.0.0
 */
exports.make = make;
const string = /*#__PURE__*/make((self, that) => self + that);
/**
 * `number` semigroup under addition.
 *
 * @category instances
 * @since 1.0.0
 */
exports.string = string;
const numberSum = /*#__PURE__*/make((self, that) => self + that);
/**
 * `number` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
exports.numberSum = numberSum;
const numberMultiply = /*#__PURE__*/make((self, that) => self * that, (self, collection) => {
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
exports.numberMultiply = numberMultiply;
const bigintSum = /*#__PURE__*/make((self, that) => self + that);
/**
 * `bigint` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
exports.bigintSum = bigintSum;
const bigintMultiply = /*#__PURE__*/make((self, that) => self * that, (self, collection) => {
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
exports.bigintMultiply = bigintMultiply;
const booleanEvery = /*#__PURE__*/make((self, that) => self && that, (self, collection) => {
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
exports.booleanEvery = booleanEvery;
const booleanSome = /*#__PURE__*/make((self, that) => self || that, (self, collection) => {
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
exports.booleanSome = booleanSome;
const booleanXor = /*#__PURE__*/make((self, that) => self !== that);
/**
 * `boolean` semigroup under equivalence.
 *
 * @category instances
 * @since 1.0.0
 */
exports.booleanXor = booleanXor;
const booleanEqv = /*#__PURE__*/make((self, that) => self === that);
/**
 * `Semigroup` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
exports.booleanEqv = booleanEqv;
const min = O => make((self, that) => O.compare(self, that) === -1 ? self : that);
/**
 * `Semigroup` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
exports.min = min;
const max = O => make((self, that) => O.compare(self, that) === 1 ? self : that);
/**
 * @category constructors
 * @since 1.0.0
 */
exports.max = max;
const constant = a => make(() => a, () => a);
/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 1.0.0
 */
exports.constant = constant;
const reverse = S => make((self, that) => S.combine(that, self), (self, collection) => {
  const reversed = Array.from(collection).reverse();
  return reversed.length > 0 ? S.combine(S.combineMany(reversed[0], reversed.slice(1)), self) : self;
});
/**
 * @since 1.0.0
 */
exports.reverse = reverse;
const intercalate = /*#__PURE__*/(0, _Function.dual)(2, (S, separator) => make((self, that) => S.combineMany(self, [separator, that])));
/**
 * Always return the first argument.
 *
 * @category instances
 * @since 1.0.0
 */
exports.intercalate = intercalate;
const first = () => make(a => a, a => a);
/**
 * Always return the last argument.
 *
 * @category instances
 * @since 1.0.0
 */
exports.first = first;
const last = () => make((_, second) => second, (self, collection) => {
  let a = self;
  // eslint-disable-next-line no-empty
  for (a of collection) {}
  return a;
});
/**
 * @since 1.0.0
 */
exports.last = last;
const imap = /*#__PURE__*/(0, _Function.dual)(3, (S, to, from) => make((self, that) => to(S.combine(from(self), from(that))), (self, collection) => to(S.combineMany(from(self), (0, readonlyArray.fromIterable)(collection).map(from)))));
/**
 * @category instances
 * @since 1.0.0
 */
exports.imap = imap;
const Invariant = {
  imap
};
exports.Invariant = Invariant;
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
const SemiProduct = {
  imap,
  product,
  productMany
};
exports.SemiProduct = SemiProduct;
const of = constant;
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
exports.Product = Product;
const tuple = /*#__PURE__*/product_.tuple(Product);
/**
 * Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.
 * The returned `Semigroup` combines two arrays by concatenating them.
 *
 * @category combinators
 * @since 1.0.0
 */
exports.tuple = tuple;
const array = () => make((self, that) => self.concat(that));
/**
 * This function creates and returns a new `Semigroup` for a struct of values based on the given `Semigroup`s for each property in the struct.
 * The returned `Semigroup` combines two structs of the same type by applying the corresponding `Semigroup` passed as arguments to each property in the struct.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
exports.array = array;
const struct = /*#__PURE__*/product_.struct(Product);
exports.struct = struct;
//# sourceMappingURL=Semigroup.js.map