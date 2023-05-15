var _a;
import * as Chunk from "@effect/data/Chunk";
import * as Context from "@effect/data/Context";
import * as Equal from "@effect/data/Equal";
import * as MutableRef from "@effect/data/MutableRef";
import * as SortedSet from "@effect/data/SortedSet";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as effect from "@effect/io/internal_effect_untraced/effect";
import * as fiber from "@effect/io/internal_effect_untraced/fiber";
import * as TestAnnotation from "@effect/io/internal_effect_untraced/testing/testAnnotation";
import * as TestAnnotationMap from "@effect/io/internal_effect_untraced/testing/testAnnotationMap";
import * as Ref from "@effect/io/Ref";
/** @internal */
export const AnnotationsTypeId = /*#__PURE__*/Symbol.for("@effect/test/Annotations");
/** @internal */
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
export const Tag = /*#__PURE__*/Context.Tag();
/** @internal */
export const isAnnotations = u => {
  return typeof u === "object" && u != null && AnnotationsTypeId in u;
};
/** @internal */
export const make = ref => new AnnotationsImpl(ref);
//# sourceMappingURL=annotations.mjs.map