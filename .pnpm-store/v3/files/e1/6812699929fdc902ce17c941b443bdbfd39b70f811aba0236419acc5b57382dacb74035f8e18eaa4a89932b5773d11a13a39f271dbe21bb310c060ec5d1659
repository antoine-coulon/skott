import * as ChunkPatch from "@effect/data/Differ/ChunkPatch";
import * as ContextPatch from "@effect/data/Differ/ContextPatch";
import * as HashMapPatch from "@effect/data/Differ/HashMapPatch";
import * as HashSetPatch from "@effect/data/Differ/HashSetPatch";
import * as OrPatch from "@effect/data/Differ/OrPatch";
import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
import { constant, identity } from "@effect/data/Function";
/** @internal */
export const DifferTypeId = /*#__PURE__*/Symbol.for("@effect/data/Differ");
/** @internal */
class DifferImpl {
  constructor(params) {
    this._id = DifferTypeId;
    this._P = identity;
    this._V = identity;
    this.empty = params.empty;
    this.diff = params.diff;
    this.combine = params.combine;
    this.patch = params.patch;
  }
}
/** @internal */
export const make = params => new DifferImpl(params);
/** @internal */
export const environment = () => make({
  empty: ContextPatch.empty(),
  combine: (first, second) => ContextPatch.combine(second)(first),
  diff: (oldValue, newValue) => ContextPatch.diff(oldValue, newValue),
  patch: (patch, oldValue) => ContextPatch.patch(oldValue)(patch)
});
/** @internal */
export const chunk = differ => make({
  empty: ChunkPatch.empty(),
  combine: (first, second) => ChunkPatch.combine(second)(first),
  diff: (oldValue, newValue) => ChunkPatch.diff(oldValue, newValue, differ),
  patch: (patch, oldValue) => ChunkPatch.patch(oldValue, differ)(patch)
});
/** @internal */
export const hashMap = differ => make({
  empty: HashMapPatch.empty(),
  combine: (first, second) => HashMapPatch.combine(second)(first),
  diff: (oldValue, newValue) => HashMapPatch.diff(oldValue, newValue, differ),
  patch: (patch, oldValue) => HashMapPatch.patch(oldValue, differ)(patch)
});
/** @internal */
export const hashSet = () => make({
  empty: HashSetPatch.empty(),
  combine: (first, second) => HashSetPatch.combine(second)(first),
  diff: (oldValue, newValue) => HashSetPatch.diff(oldValue, newValue),
  patch: (patch, oldValue) => HashSetPatch.patch(oldValue)(patch)
});
/** @internal */
export const orElseResult = /*#__PURE__*/Dual.dual(2, (self, that) => make({
  empty: OrPatch.empty(),
  combine: (first, second) => OrPatch.combine(second)(first),
  diff: (oldValue, newValue) => OrPatch.diff(oldValue, newValue, self, that),
  patch: (patch, oldValue) => OrPatch.patch(oldValue, self, that)(patch)
}));
/** @internal */
export const transform = /*#__PURE__*/Dual.dual(3, (self, f, g) => make({
  empty: self.empty,
  combine: (first, second) => self.combine(first, second),
  diff: (oldValue, newValue) => self.diff(g(oldValue), g(newValue)),
  patch: (patch, oldValue) => f(self.patch(patch, g(oldValue)))
}));
/** @internal */
export const update = () => updateWith((_, a) => a);
/** @internal */
export const updateWith = f => make({
  empty: identity,
  combine: (first, second) => {
    if (first === identity) {
      return second;
    }
    if (second === identity) {
      return first;
    }
    return a => second(first(a));
  },
  diff: (oldValue, newValue) => {
    if (Equal.equals(oldValue, newValue)) {
      return identity;
    }
    return constant(newValue);
  },
  patch: (patch, oldValue) => f(oldValue, patch(oldValue))
});
/** @internal */
export const zip = /*#__PURE__*/Dual.dual(2, (self, that) => make({
  empty: [self.empty, that.empty],
  combine: (first, second) => [self.combine(first[0], second[0]), that.combine(first[1], second[1])],
  diff: (oldValue, newValue) => [self.diff(oldValue[0], newValue[0]), that.diff(oldValue[1], newValue[1])],
  patch: (patch, oldValue) => [self.patch(patch[0], oldValue[0]), that.patch(patch[1], oldValue[1])]
}));
//# sourceMappingURL=Differ.mjs.map