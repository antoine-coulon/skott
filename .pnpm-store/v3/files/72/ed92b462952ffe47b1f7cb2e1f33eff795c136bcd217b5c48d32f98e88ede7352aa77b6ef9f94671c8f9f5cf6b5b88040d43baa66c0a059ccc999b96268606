"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unnested = exports.patch = exports.nested = exports.mapName = exports.empty = exports.andThen = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var List = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/List"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var String = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/String"));
var configError = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/configError"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const empty = {
  _tag: "Empty"
};
/** @internal */
exports.empty = empty;
const andThen = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => ({
  _tag: "AndThen",
  first: self,
  second: that
}));
/** @internal */
exports.andThen = andThen;
const mapName = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => andThen(self, {
  _tag: "MapName",
  f
}));
/** @internal */
exports.mapName = mapName;
const nested = /*#__PURE__*/(0, _Function.dual)(2, (self, name) => andThen(self, {
  _tag: "Nested",
  name
}));
/** @internal */
exports.nested = nested;
const unnested = /*#__PURE__*/(0, _Function.dual)(2, (self, name) => andThen(self, {
  _tag: "Unnested",
  name
}));
/** @internal */
exports.unnested = unnested;
const patch = /*#__PURE__*/(0, _Function.dual)(2, (path, patch) => {
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
exports.patch = patch;
//# sourceMappingURL=pathPatch.js.map