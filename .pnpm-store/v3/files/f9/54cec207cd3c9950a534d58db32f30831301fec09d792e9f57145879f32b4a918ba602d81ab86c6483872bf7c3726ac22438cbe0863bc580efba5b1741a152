"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.let = exports.getSemiCoproduct = exports.getSemiAlternative = exports.bindTo = exports.bind = exports.andThenBind = exports.Traversable = exports.SemiProduct = exports.SemiApplicative = exports.Product = exports.Pointed = exports.Of = exports.Monad = exports.Invariant = exports.Foldable = exports.FlatMap = exports.Do = exports.Covariant = exports.Chainable = exports.Applicative = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var readonlyArray = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/ReadonlyArray"));
var chainable = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Chainable"));
var covariant = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Covariant"));
var invariant = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Invariant"));
var of_ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Of"));
var semiProduct = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/SemiProduct"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const map = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => f(self));
const imap = /*#__PURE__*/covariant.imap(map);
/**
 * @category instances
 * @since 1.0.0
 */
const Covariant = {
  imap,
  map
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.Covariant = Covariant;
const Invariant = {
  imap
};
exports.Invariant = Invariant;
const of = _Function.identity;
/**
 * @category instances
 * @since 1.0.0
 */
const Of = {
  of
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.Of = Of;
const Pointed = {
  of,
  imap,
  map
};
exports.Pointed = Pointed;
const flatMap = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => f(self));
/**
 * @category instances
 * @since 1.0.0
 */
const FlatMap = {
  flatMap
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.FlatMap = FlatMap;
const Chainable = {
  imap,
  map,
  flatMap
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.Chainable = Chainable;
const Monad = {
  imap,
  of,
  map,
  flatMap
};
exports.Monad = Monad;
const product = (self, that) => [self, that];
const productMany = (self, collection) => [self, ...collection];
/**
 * @category instances
 * @since 1.0.0
 */
const SemiProduct = {
  imap,
  product,
  productMany
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.SemiProduct = SemiProduct;
const Product = {
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
exports.Product = Product;
const SemiApplicative = {
  imap,
  map,
  product,
  productMany
};
/**
 * @category instances
 * @since 1.0.0
 */
exports.SemiApplicative = SemiApplicative;
const Applicative = {
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
exports.Applicative = Applicative;
const getSemiCoproduct = S => ({
  imap,
  coproduct: (0, _Function.dual)(2, S.combine),
  coproductMany: (0, _Function.dual)(2, S.combineMany)
});
/**
 * @category instances
 * @since 1.0.0
 */
exports.getSemiCoproduct = getSemiCoproduct;
const getSemiAlternative = S => ({
  ...getSemiCoproduct(S),
  map
});
/**
 * @category instances
 * @since 1.0.0
 */
exports.getSemiAlternative = getSemiAlternative;
const Foldable = {
  reduce: /*#__PURE__*/(0, _Function.dual)(3, (self, b, f) => f(b, self))
};
exports.Foldable = Foldable;
const traverse = F => (0, _Function.dual)(2, (self, f) => f(self));
/**
 * @category instances
 * @since 1.0.0
 */
const Traversable = {
  traverse
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 1.0.0
 */
exports.Traversable = Traversable;
const bindTo = /*#__PURE__*/invariant.bindTo(Invariant);
exports.bindTo = bindTo;
const let_ = /*#__PURE__*/covariant.let(Covariant);
exports.let = let_;
/**
 * @category do notation
 * @since 1.0.0
 */
const Do = /*#__PURE__*/of_.Do(Of);
/**
 * @category do notation
 * @since 1.0.0
 */
exports.Do = Do;
const bind = /*#__PURE__*/chainable.bind(Chainable);
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
exports.bind = bind;
const andThenBind = /*#__PURE__*/semiProduct.andThenBind(SemiProduct);
exports.andThenBind = andThenBind;
//# sourceMappingURL=Identity.js.map