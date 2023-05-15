/**
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function";
/**
 * Returns a default `productMany` implementation.
 *
 * @category constructors
 * @since 1.0.0
 */
export const productMany = (map, product) => (self, collection) => {
  let out = map(self, a => [a]);
  for (const fa of collection) {
    out = map(product(out, fa), ([[head, ...tail], a]) => [head, ...tail, a]);
  }
  return out;
};
/**
 * Returns a default `product` composition.
 *
 * @since 1.0.0
 */
export const productComposition = (F, G) => (self, that) => F.map(F.product(self, that), ([ga, gb]) => G.product(ga, gb));
/**
 * Returns a default `productMany` composition.
 *
 * @since 1.0.0
 */
export const productManyComposition = (F, G) => (self, collection) => F.map(F.productMany(self, collection), ([ga, ...gas]) => G.productMany(ga, gas));
/**
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind = F => dual(3, (self, name, that) => F.imap(F.product(self, that), ([a, b]) => Object.assign({}, a, {
  [name]: b
}), ({
  [name]: b,
  ...rest
}) => [rest, b]));
/**
 * Appends an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const appendElement = F => dual(2, (self, that) => F.imap(F.product(self, that), ([a, b]) => [...a, b], ab => [ab.slice(0, -1), ab[ab.length - 1]]));
/**
 * @since 1.0.0
 */
export const nonEmptyTuple = F => (...elements) => F.productMany(elements[0], elements.slice(1));
/**
 * @since 1.0.0
 */
export const nonEmptyStruct = F => fields => {
  const keys = Object.keys(fields);
  return F.imap(F.productMany(fields[keys[0]], keys.slice(1).map(k => fields[k])), ([value, ...values]) => {
    const out = {
      [keys[0]]: value
    };
    for (let i = 0; i < values.length; i++) {
      out[keys[i + 1]] = values[i];
    }
    return out;
  }, r => keys.map(k => r[k]));
};
//# sourceMappingURL=SemiProduct.mjs.map