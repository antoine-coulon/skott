"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = exports.isAnnotations = exports.Tag = exports.AnnotationsTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var MutableRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var SortedSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/SortedSet"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect"));
var fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiber"));
var TestAnnotation = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/testing/testAnnotation"));
var TestAnnotationMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/testing/testAnnotationMap"));
var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Ref"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const AnnotationsTypeId = /*#__PURE__*/Symbol.for("@effect/test/Annotations");
/** @internal */
exports.AnnotationsTypeId = AnnotationsTypeId;
class AnnotationsImpl {
  constructor(ref) {
    this.ref = ref;
    this[_a] = AnnotationsTypeId;
  }
  get(key) {
    return Debug.bodyWithTrace(trace => core.map(TestAnnotationMap.get(key))(Ref.get(this.ref)).traced(trace));
  }
  annotate(key, value) {
    return Debug.bodyWithTrace(trace => Ref.update(this.ref, TestAnnotationMap.annotate(key, value)).traced(trace));
  }
  supervisedFibers() {
    return Debug.bodyWithTrace(trace => effect.descriptorWith(descriptor => core.flatMap(either => {
      switch (either._tag) {
        case "Left":
          {
            return core.succeed(SortedSet.empty(fiber.Order));
          }
        case "Right":
          {
            return core.map(SortedSet.filter(fiber => !Equal.equals(fiber.id(), descriptor.id)))(core.map(Chunk.reduce(SortedSet.empty(fiber.Order), (a, b) => SortedSet.union(b)(a)))(core.forEach(ref => core.sync(() => MutableRef.get(ref)))(either.right)));
          }
      }
    })(this.get(TestAnnotation.fibers))).traced(trace));
  }
}
_a = AnnotationsTypeId;
/** @internal */
const Tag = /*#__PURE__*/Context.Tag();
/** @internal */
exports.Tag = Tag;
const isAnnotations = u => {
  return typeof u === "object" && u != null && AnnotationsTypeId in u;
};
/** @internal */
exports.isAnnotations = isAnnotations;
const make = ref => new AnnotationsImpl(ref);
exports.make = make;
//# sourceMappingURL=annotations.js.map