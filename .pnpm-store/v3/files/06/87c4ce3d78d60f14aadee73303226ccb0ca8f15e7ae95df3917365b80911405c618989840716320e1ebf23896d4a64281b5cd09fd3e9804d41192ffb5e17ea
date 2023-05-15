/**
 * @since 1.0.0
 */
import * as Hash from "@effect/data/Hash";
/**
 * @since 1.0.0
 * @category symbols
 */
export const symbol = /*#__PURE__*/Symbol.for("@effect/data/Equal");
export function equals() {
  if (arguments.length === 1) {
    return self => compareBoth(self, arguments[0]);
  }
  return compareBoth(arguments[0], arguments[1]);
}
function compareBoth(self, that) {
  if (self === that) {
    return true;
  }
  const selfType = typeof self;
  if (selfType !== typeof that) {
    return false;
  }
  if ((selfType === "object" || selfType === "function") && self !== null && that !== null) {
    if (isEqual(self) && isEqual(that)) {
      return Hash.hash(self) === Hash.hash(that) && self[symbol](that);
    }
  }
  return false;
}
/**
 * @since 1.0.0
 * @category guards
 */
export const isEqual = u => typeof u === "object" && u !== null && symbol in u;
/**
 * @since 1.0.0
 * @category instances
 */
export const equivalence = () => (self, that) => Hash.hash(self) === Hash.hash(that) && equals(self, that);
//# sourceMappingURL=Equal.mjs.map