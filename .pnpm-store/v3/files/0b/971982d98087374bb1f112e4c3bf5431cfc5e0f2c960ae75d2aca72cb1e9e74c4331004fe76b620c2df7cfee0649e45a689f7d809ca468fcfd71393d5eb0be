var _a;
import * as Chunk from "@effect/data/Chunk";
import * as Context from "@effect/data/Context";
import * as Either from "@effect/data/Either";
import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
import * as HashSet from "@effect/data/HashSet";
/** @internal */
const TestAnnotationSymbolKey = "@effect/test/TestAnnotation";
/** @internal */
export const TestAnnotationTypeId = /*#__PURE__*/Symbol.for(TestAnnotationSymbolKey);
/** @internal */
class TestAnnotationImpl {
  constructor(identifier, tag, initial, combine) {
    this.identifier = identifier;
    this.tag = tag;
    this.initial = initial;
    this.combine = combine;
    this[_a] = TestAnnotationTypeId;
  }
  [(_a = TestAnnotationTypeId, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.tag))(Hash.combine(Hash.hash(this.identifier))(Hash.hash(TestAnnotationSymbolKey)));
  }
  [Equal.symbol](that) {
    return isTestAnnotation(that) && this.identifier === that.identifier && Equal.equals(this.tag, that.tag);
  }
}
/** @internal */
export const isTestAnnotation = u => {
  return typeof u === "object" && u != null && TestAnnotationTypeId in u;
};
/** @internal */
export const make = (identifier, tag, initial, combine) => {
  return new TestAnnotationImpl(identifier, tag, initial, combine);
};
/** @internal */
export const compose = (left, right) => {
  if (Either.isLeft(left) && Either.isLeft(right)) {
    return Either.left(left.left + right.left);
  }
  if (Either.isRight(left) && Either.isRight(right)) {
    return Either.right(Chunk.concat(right.right)(left.right));
  }
  if (Either.isRight(left) && Either.isLeft(right)) {
    return right;
  }
  if (Either.isLeft(left) && Either.isRight(right)) {
    return right;
  }
  throw new Error("BUG: TestAnnotation.compose - please report an issue at https://github.com/Effect-TS/io/issues");
};
/** @internal */
export const fibers = /*#__PURE__*/make("fibers", /*#__PURE__*/Context.Tag(), /*#__PURE__*/Either.left(0), compose);
/**
 * An annotation which counts ignored tests.
 *
 * @internal
 */
export const ignored = /*#__PURE__*/make("ignored", /*#__PURE__*/Context.Tag(), 0, (a, b) => a + b);
/**
 * An annotation which counts repeated tests.
 *
 * @internal
 */
export const repeated = /*#__PURE__*/make("repeated", /*#__PURE__*/Context.Tag(), 0, (a, b) => a + b);
/**
 * An annotation which counts retried tests.
 *
 * @internal
 */
export const retried = /*#__PURE__*/make("retried", /*#__PURE__*/Context.Tag(), 0, (a, b) => a + b);
/**
 * An annotation which tags tests with strings.
 *
 * @internal
 */
export const tagged = /*#__PURE__*/make("tagged", /*#__PURE__*/Context.Tag(), /*#__PURE__*/HashSet.empty(), (a, b) => HashSet.union(b)(a));
//# sourceMappingURL=testAnnotation.mjs.map