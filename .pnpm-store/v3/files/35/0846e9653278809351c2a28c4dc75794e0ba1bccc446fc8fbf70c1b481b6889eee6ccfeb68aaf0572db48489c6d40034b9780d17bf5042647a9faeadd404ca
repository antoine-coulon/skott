var _a;
import { dual } from "@effect/data/Function";
/** @internal */
export const TestAnnotationMapTypeId = /*#__PURE__*/Symbol.for("@effect/test/TestAnnotationMap");
/** @internal */
class TestAnnotationMapImpl {
  constructor(map) {
    this.map = map;
    this[_a] = TestAnnotationMapTypeId;
  }
}
_a = TestAnnotationMapTypeId;
/** @internal */
export const isTestAnnotationMap = u => {
  return typeof u === "object" && u != null && TestAnnotationMapTypeId in u;
};
/** @internal */
export const empty = () => new TestAnnotationMapImpl(new Map());
/** @internal */
export const make = map => {
  return new TestAnnotationMapImpl(map);
};
/** @internal */
export const overwrite = /*#__PURE__*/dual(3, (self, key, value) => make(self.map.set(key, value)));
/** @internal */
export const update = /*#__PURE__*/dual(3, (self, key, f) => {
  let value = self.map.get(key);
  if (value === undefined) {
    value = key.initial;
  }
  return overwrite(key, f(value))(self);
});
/**
 * Retrieves the annotation of the specified type, or its default value if
 * there is none.
 *
 * @internal
 */
export const get = /*#__PURE__*/dual(2, (self, key) => {
  const value = self.map.get(key);
  if (value === undefined) {
    return key.initial;
  }
  return value;
});
/**
 * Appends the specified annotation to the annotation map.
 *
 * @internal
 */
export const annotate = /*#__PURE__*/dual(3, (self, key, value) => update(self, key, _ => key.combine(_, value)));
/** @internal */
export const combine = /*#__PURE__*/dual(2, (self, that) => {
  const result = new Map(self.map);
  for (const entry of that.map) {
    if (result.has(entry[0])) {
      const value = result.get(entry[0]);
      result.set(entry[0], entry[0].combine(value, entry[1]));
    } else {
      result.set(entry[0], entry[1]);
    }
  }
  return make(result);
});
//# sourceMappingURL=testAnnotationMap.mjs.map