import * as semigroup from "@effect/data/typeclass/Semigroup";
/**
 * @category constructors
 * @since 1.0.0
 */
export const fromSemigroup = (S, empty) => ({
  combine: S.combine,
  combineMany: S.combineMany,
  empty,
  combineAll: collection => S.combineMany(empty, collection)
});
/**
 * Get a monoid where `combine` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `maxBound` value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const min = B => fromSemigroup(semigroup.min(B), B.maxBound);
/**
 * Get a monoid where `combine` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `minimum` value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const max = B => fromSemigroup(semigroup.max(B), B.minBound);
/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `combine`.
 *
 * @category combinators
 * @since 1.0.0
 */
export const reverse = M => fromSemigroup(semigroup.reverse(M), M.empty);
/**
 * @category instances
 * @since 1.0.0
 */
export const string = /*#__PURE__*/fromSemigroup(semigroup.string, "");
/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @category instances
 * @since 1.0.0
 */
export const numberSum = /*#__PURE__*/fromSemigroup(semigroup.numberSum, 0);
/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @category instances
 * @since 1.0.0
 */
export const numberMultiply = /*#__PURE__*/fromSemigroup(semigroup.numberMultiply, 1);
/**
 * `number` monoid under addition.
 *
 * The `bigint` value is `0n`.
 *
 * @category instances
 * @since 1.0.0
 */
export const bigintSum = /*#__PURE__*/fromSemigroup(semigroup.bigintSum, 0n);
/**
 * `bigint` monoid under multiplication.
 *
 * The `empty` value is `1n`.
 *
 * @category instances
 * @since 1.0.0
 */
export const bigintMultiply = /*#__PURE__*/fromSemigroup(semigroup.bigintMultiply, 1n);
/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanEvery = /*#__PURE__*/fromSemigroup(semigroup.booleanEvery, true);
/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanSome = /*#__PURE__*/fromSemigroup(semigroup.booleanSome, false);
/**
 * `boolean` monoid under exclusive disjunction.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanXor = /*#__PURE__*/fromSemigroup(semigroup.booleanXor, false);
/**
 * `boolean` monoid under equivalence.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanEqv = /*#__PURE__*/fromSemigroup(semigroup.booleanEqv, true);
/**
 * Similar to `Promise.all` but operates on `Monoid`s.
 *
 * ```
 * [Monoid<A>, Monoid<B>, ...] -> Monoid<[A, B, ...]>
 * ```
 *
 * This function creates and returns a new `Monoid` for a tuple of values based on the given `Monoid`s for each element in the tuple.
 * The returned `Monoid` combines two tuples of the same type by applying the corresponding `Monoid` passed as arguments to each element in the tuple.
 *
 * The `empty` value of the returned `Monoid` is the tuple of `empty` values of the input `Monoid`s.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple = (...elements) => {
  const empty = elements.map(m => m.empty);
  return fromSemigroup(semigroup.tuple(...elements), empty);
};
/**
 * Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.
 *
 * The `empty` value is the empty array.
 *
 * @category combinators
 * @since 1.0.0
 */
export const array = () => fromSemigroup(semigroup.array(), []);
/**
 * This function creates and returns a new `Monoid` for a struct of values based on the given `Monoid`s for each property in the struct.
 * The returned `Monoid` combines two structs of the same type by applying the corresponding `Monoid` passed as arguments to each property in the struct.
 *
 * The `empty` value of the returned `Monoid` is a struct where each property is the `empty` value of the corresponding `Monoid` in the input `monoids` object.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export const struct = fields => {
  const empty = {};
  for (const k in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, k)) {
      empty[k] = fields[k].empty;
    }
  }
  return fromSemigroup(semigroup.struct(fields), empty);
};
//# sourceMappingURL=Monoid.mjs.map