"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagged = exports.retried = exports.repeated = exports.make = exports.isTestAnnotation = exports.ignored = exports.fibers = exports.compose = exports.TestAnnotationTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const TestAnnotationSymbolKey = "@effect/test/TestAnnotation";
/** @internal */
const TestAnnotationTypeId = /*#__PURE__*/Symbol.for(TestAnnotationSymbolKey);
/** @internal */
exports.TestAnnotationTypeId = TestAnnotationTypeId;
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
const isTestAnnotation = u => {
  return typeof u === "object" && u != null && TestAnnotationTypeId in u;
};
/** @internal */
exports.isTestAnnotation = isTestAnnotation;
const make = (identifier, tag, initial, combine) => {
  return new TestAnnotationImpl(identifier, tag, initial, combine);
};
/** @internal */
exports.make = make;
const compose = (left, right) => {
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
exports.compose = compose;
const fibers = /*#__PURE__*/make("fibers", /*#__PURE__*/Context.Tag(), /*#__PURE__*/Either.left(0), compose);
/**
 * An annotation which counts ignored tests.
 *
 * @internal
 */
exports.fibers = fibers;
const ignored = /*#__PURE__*/make("ignored", /*#__PURE__*/Context.Tag(), 0, (a, b) => a + b);
/**
 * An annotation which counts repeated tests.
 *
 * @internal
 */
exports.ignored = ignored;
const repeated = /*#__PURE__*/make("repeated", /*#__PURE__*/Context.Tag(), 0, (a, b) => a + b);
/**
 * An annotation which counts retried tests.
 *
 * @internal
 */
exports.repeated = repeated;
const retried = /*#__PURE__*/make("retried", /*#__PURE__*/Context.Tag(), 0, (a, b) => a + b);
/**
 * An annotation which tags tests with strings.
 *
 * @internal
 */
exports.retried = retried;
const tagged = /*#__PURE__*/make("tagged", /*#__PURE__*/Context.Tag(), /*#__PURE__*/HashSet.empty(), (a, b) => HashSet.union(b)(a));
exports.tagged = tagged;
//# sourceMappingURL=testAnnotation.js.map