import * as Chunk from "@effect/data/Chunk"
import * as Either from "@effect/data/Either"
import { dual, pipe } from "@effect/data/Function"
import * as List from "@effect/data/List"
import * as Option from "@effect/data/Option"
import * as String from "@effect/data/String"
import type * as ConfigError from "@effect/io/Config/Error"
import type * as PathPatch from "@effect/io/Config/Provider/PathPatch"
import * as configError from "@effect/io/internal_effect_untraced/configError"

/** @internal */
export const empty: PathPatch.PathPatch = {
  _tag: "Empty"
}

/** @internal */
export const andThen = dual<
  (that: PathPatch.PathPatch) => (self: PathPatch.PathPatch) => PathPatch.PathPatch,
  (self: PathPatch.PathPatch, that: PathPatch.PathPatch) => PathPatch.PathPatch
>(2, (self, that) => ({
  _tag: "AndThen",
  first: self,
  second: that
}))

/** @internal */
export const mapName = dual<
  (f: (string: string) => string) => (self: PathPatch.PathPatch) => PathPatch.PathPatch,
  (self: PathPatch.PathPatch, f: (string: string) => string) => PathPatch.PathPatch
>(2, (self, f) => andThen(self, { _tag: "MapName", f }))

/** @internal */
export const nested = dual<
  (name: string) => (self: PathPatch.PathPatch) => PathPatch.PathPatch,
  (self: PathPatch.PathPatch, name: string) => PathPatch.PathPatch
>(2, (self, name) => andThen(self, { _tag: "Nested", name }))

/** @internal */
export const unnested = dual<
  (name: string) => (self: PathPatch.PathPatch) => PathPatch.PathPatch,
  (self: PathPatch.PathPatch, name: string) => PathPatch.PathPatch
>(2, (self, name) => andThen(self, { _tag: "Unnested", name }))

/** @internal */
export const patch = dual<
  (
    patch: PathPatch.PathPatch
  ) => (
    path: Chunk.Chunk<string>
  ) => Either.Either<ConfigError.ConfigError, Chunk.Chunk<string>>,
  (
    path: Chunk.Chunk<string>,
    patch: PathPatch.PathPatch
  ) => Either.Either<ConfigError.ConfigError, Chunk.Chunk<string>>
>(2, (path, patch) => {
  let input = List.of(patch)
  let output: Chunk.Chunk<string> = path
  while (List.isCons(input)) {
    const patch = input.head
    switch (patch._tag) {
      case "Empty": {
        input = input.tail
        break
      }
      case "AndThen": {
        input = List.cons(patch.first, List.cons(patch.second, input.tail))
        break
      }
      case "MapName": {
        output = Chunk.map(output, patch.f)
        input = input.tail
        break
      }
      case "Nested": {
        output = Chunk.prepend(output, patch.name)
        input = input.tail
        break
      }
      case "Unnested": {
        const containsName = pipe(
          Chunk.head(output),
          Option.contains(String.Equivalence)(patch.name)
        )
        if (containsName) {
          output = Chunk.tailNonEmpty(output as Chunk.NonEmptyChunk<string>)
          input = input.tail
        } else {
          return Either.left(configError.MissingData(
            output,
            `Expected ${patch.name} to be in path in ConfigProvider#unnested`
          ))
        }
        break
      }
    }
  }
  return Either.right(output)
})
