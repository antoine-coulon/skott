"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.overwrite = exports.make = exports.isTestAnnotationMap = exports.get = exports.empty = exports.combine = exports.annotate = exports.TestAnnotationMapTypeId = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var _a;
/** @internal */
const TestAnnotationMapTypeId = /*#__PURE__*/Symbol.for("@effect/test/TestAnnotationMap");
/** @internal */
exports.TestAnnotationMapTypeId = TestAnnotationMapTypeId;
class TestAnnotationMapImpl {
  constructor(map) {
    this.map = map;
    this[_a] = TestAnnotationMapTypeId;
  }
}
_a = TestAnnotationMapTypeId;
/** @internal */
const isTestAnnotationMap = u => {
  return typeof u === "object" && u != null && TestAnnotationMapTypeId in u;
};
/** @internal */
exports.isTestAnnotationMap = isTestAnnotationMap;
const empty = () => new TestAnnotationMapImpl(new Map());
/** @internal */
exports.empty = empty;
const make = map => {
  return new TestAnnotationMapImpl(map);
};
/** @internal */
exports.make = make;
const overwrite = /*#__PURE__*/(0, _Function.dual)(3, (self, key, value) => make(self.map.set(key, value)));
/** @internal */
exports.overwrite = overwrite;
const update = /*#__PURE__*/(0, _Function.dual)(3, (self, key, f) => {
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
exports.update = update;
const get = /*#__PURE__*/(0, _Function.dual)(2, (self, key) => {
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
exports.get = get;
const annotate = /*#__PURE__*/(0, _Function.dual)(3, (self, key, value) => update(self, key, _ => key.combine(_, value)));
/** @internal */
exports.annotate = annotate;
const combine = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => {
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
exports.combine = combine;
//# sourceMappingURL=testAnnotationMap.js.map