import * as Chunk from "@effect/data/Chunk";
import * as Either from "@effect/data/Either";
import { dual } from "@effect/data/Function";
import * as List from "@effect/data/List";
import * as Option from "@effect/data/Option";
import * as String from "@effect/data/String";
import * as configError from "@effect/io/internal_effect_untraced/configError";
/** @internal */
export const empty = {
  _tag: "Empty"
};
/** @internal */
export const andThen = /*#__PURE__*/dual(2, (self, that) => ({
  _tag: "AndThen",
  first: self,
  second: that
}));
/** @internal */
export const mapName = /*#__PURE__*/dual(2, (self, f) => andThen(self, {
  _tag: "MapName",
  f
}));
/** @internal */
export const nested = /*#__PURE__*/dual(2, (self, name) => andThen(self, {
  _tag: "Nested",
  name
}));
/** @internal */
export const unnested = /*#__PURE__*/dual(2, (self, name) => andThen(self, {
  _tag: "Unnested",
  name
}));
/** @internal */
export const patch = /*#__PURE__*/dual(2, (path, patch) => {
  let input = List.of(patch);
  let output = path;
  while (List.isCons(input)) {
    const patch = input.head;
    switch (patch._tag) {
      case "Empty":
        {
          input = input.tail;
          break;
        }
      case "AndThen":
        {
          input = List.cons(patch.first, List.cons(patch.second, input.tail));
          break;
        }
      case "MapName":
        {
          output = Chunk.map(output, patch.f);
          input = input.tail;
          break;
        }
      case "Nested":
        {
          output = Chunk.prepend(output, patch.name);
          input = input.tail;
          break;
        }
      case "Unnested":
        {
          const containsName = Option.contains(String.Equivalence)(patch.name)(Chunk.head(output));
          if (containsName) {
            output = Chunk.tailNonEmpty(output);
            input = input.tail;
          } else {
            return Either.left(configError.MissingData(output, `Expected ${patch.name} to be in path in ConfigProvider#unnested`));
          }
          break;
        }
    }
  }
  return Either.right(output);
});
//# sourceMappingURL=pathPatch.mjs.map