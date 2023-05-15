import * as Chunk from "@effect/data/Chunk"
import type { Differ } from "@effect/data/Differ"
import type * as OP from "@effect/data/Differ/OrPatch"
import type { Either } from "@effect/data/Either"
import * as E from "@effect/data/Either"
import * as Equal from "@effect/data/Equal"
import * as Dual from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"

/** @internal */
export const OrPatchTypeId: OP.TypeId = Symbol.for("@effect/data/Differ/OrPatch") as OP.TypeId

function variance<A, B>(a: A): B {
  return a as unknown as B
}

/** @internal */
export class Empty<Value, Value2, Patch, Patch2> implements OP.OrPatch<Value, Value2, Patch, Patch2> {
  readonly _tag = "Empty"
  readonly _Value: (_: Value) => Value = variance
  readonly _Value2: (_: Value2) => Value2 = variance
  readonly _Patch: (_: Patch) => Patch = variance
  readonly _Patch2: (_: Patch2) => Patch2 = variance
  readonly _id: OP.TypeId = OrPatchTypeId;

  [Hash.symbol]() {
    return Hash.string(`OrPatch(Empty)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id
  }
}

/** @internal */
export class AndThen<Value, Value2, Patch, Patch2> implements OP.OrPatch<Value, Value2, Patch, Patch2> {
  readonly _tag = "AndThen"
  readonly _Value: (_: Value) => Value = variance
  readonly _Value2: (_: Value2) => Value2 = variance
  readonly _Patch: (_: Patch) => Patch = variance
  readonly _Patch2: (_: Patch2) => Patch2 = variance
  readonly _id: OP.TypeId = OrPatchTypeId
  constructor(
    readonly first: OP.OrPatch<Value, Value2, Patch, Patch2>,
    readonly second: OP.OrPatch<Value, Value2, Patch, Patch2>
  ) {}

  [Hash.symbol]() {
    return Hash.string(`OrPatch(AndThen)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id &&
      Equal.equals(this.first, (that as this).first) &&
      Equal.equals(this.second, (that as this).second)
  }
}

/** @internal */
export class SetLeft<Value, Value2, Patch, Patch2> implements OP.OrPatch<Value, Value2, Patch, Patch2> {
  readonly _tag = "SetLeft"
  readonly _Value: (_: Value) => Value = variance
  readonly _Value2: (_: Value2) => Value2 = variance
  readonly _Patch: (_: Patch) => Patch = variance
  readonly _Patch2: (_: Patch2) => Patch2 = variance
  readonly _id: OP.TypeId = OrPatchTypeId
  constructor(readonly value: Value) {}

  [Hash.symbol]() {
    return Hash.string(`OrPatch(SetLeft)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id &&
      Equal.equals(this.value, (that as this).value)
  }
}

/** @internal */
export class SetRight<Value, Value2, Patch, Patch2> implements OP.OrPatch<Value, Value2, Patch, Patch2> {
  readonly _tag = "SetRight"
  readonly _Value: (_: Value) => Value = variance
  readonly _Value2: (_: Value2) => Value2 = variance
  readonly _Patch: (_: Patch) => Patch = variance
  readonly _Patch2: (_: Patch2) => Patch2 = variance
  readonly _id: OP.TypeId = OrPatchTypeId
  constructor(readonly value: Value2) {}

  [Hash.symbol]() {
    return Hash.string(`OrPatch(SetRight)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id &&
      Equal.equals(this.value, (that as this).value)
  }
}

/** @internal */
export class UpdateLeft<Value, Value2, Patch, Patch2> implements OP.OrPatch<Value, Value2, Patch, Patch2> {
  readonly _tag = "UpdateLeft"
  readonly _Value: (_: Value) => Value = variance
  readonly _Value2: (_: Value2) => Value2 = variance
  readonly _Patch: (_: Patch) => Patch = variance
  readonly _Patch2: (_: Patch2) => Patch2 = variance
  readonly _id: OP.TypeId = OrPatchTypeId
  constructor(readonly patch: Patch) {}

  [Hash.symbol]() {
    return Hash.string(`OrPatch(UpdateLeft)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id &&
      Equal.equals(this.patch, (that as this).patch)
  }
}

/** @internal */
export class UpdateRight<Value, Value2, Patch, Patch2> implements OP.OrPatch<Value, Value2, Patch, Patch2> {
  readonly _tag = "UpdateRight"
  readonly _Value: (_: Value) => Value = variance
  readonly _Value2: (_: Value2) => Value2 = variance
  readonly _Patch: (_: Patch) => Patch = variance
  readonly _Patch2: (_: Patch2) => Patch2 = variance
  readonly _id: OP.TypeId = OrPatchTypeId
  constructor(readonly patch: Patch2) {}

  [Hash.symbol]() {
    return Hash.string(`OrPatch(UpdateRight)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id &&
      Equal.equals(this.patch, (that as this).patch)
  }
}

type Instruction =
  | AndThen<any, any, any, any>
  | Empty<any, any, any, any>
  | SetLeft<any, any, any, any>
  | SetRight<any, any, any, any>
  | UpdateLeft<any, any, any, any>
  | UpdateRight<any, any, any, any>

/** @internal */
export const empty = <Value, Value2, Patch, Patch2>(): OP.OrPatch<
  Value,
  Value2,
  Patch,
  Patch2
> => new Empty()

/** @internal */
export const diff = <Value, Value2, Patch, Patch2>(
  oldValue: Either<Value, Value2>,
  newValue: Either<Value, Value2>,
  left: Differ<Value, Patch>,
  right: Differ<Value2, Patch2>
): OP.OrPatch<Value, Value2, Patch, Patch2> => {
  switch (oldValue._tag) {
    case "Left": {
      switch (newValue._tag) {
        case "Left": {
          const valuePatch = left.diff(oldValue.left, newValue.left)
          if (Equal.equals(valuePatch, left.empty)) {
            return new Empty()
          }
          return new UpdateLeft(valuePatch)
        }
        case "Right": {
          return new SetRight(newValue.right)
        }
      }
    }
    case "Right": {
      switch (newValue._tag) {
        case "Left": {
          return new SetLeft(newValue.left)
        }
        case "Right": {
          const valuePatch = right.diff(oldValue.right, newValue.right)
          if (Equal.equals(valuePatch, right.empty)) {
            return new Empty()
          }
          return new UpdateRight(valuePatch)
        }
      }
    }
  }
}

/** @internal */
export const combine = Dual.dual<
  <Value, Value2, Patch, Patch2>(
    that: OP.OrPatch<Value, Value2, Patch, Patch2>
  ) => (
    self: OP.OrPatch<Value, Value2, Patch, Patch2>
  ) => OP.OrPatch<Value, Value2, Patch, Patch2>,
  <Value, Value2, Patch, Patch2>(
    self: OP.OrPatch<Value, Value2, Patch, Patch2>,
    that: OP.OrPatch<Value, Value2, Patch, Patch2>
  ) => OP.OrPatch<Value, Value2, Patch, Patch2>
>(2, (self, that) => new AndThen(self, that))

/** @internal */
export const patch = Dual.dual<
  <Value, Value2, Patch, Patch2>(
    oldValue: Either<Value, Value2>,
    left: Differ<Value, Patch>,
    right: Differ<Value2, Patch2>
  ) => (self: OP.OrPatch<Value, Value2, Patch, Patch2>) => Either<Value, Value2>,
  <Value, Value2, Patch, Patch2>(
    self: OP.OrPatch<Value, Value2, Patch, Patch2>,
    oldValue: Either<Value, Value2>,
    left: Differ<Value, Patch>,
    right: Differ<Value2, Patch2>
  ) => Either<Value, Value2>
>(4, <Value, Value2, Patch, Patch2>(
  self: OP.OrPatch<Value, Value2, Patch, Patch2>,
  oldValue: Either<Value, Value2>,
  left: Differ<Value, Patch>,
  right: Differ<Value2, Patch2>
) => {
  let patches: Chunk.Chunk<OP.OrPatch<Value, Value2, Patch, Patch2>> = Chunk.of(self)
  let result = oldValue
  while (Chunk.isNonEmpty(patches)) {
    const head: Instruction = Chunk.headNonEmpty(patches) as Instruction
    const tail = Chunk.tailNonEmpty(patches)
    switch (head._tag) {
      case "Empty": {
        patches = tail
        break
      }
      case "AndThen": {
        patches = Chunk.prepend(head.first)(Chunk.prepend(head.second)(tail))
        break
      }
      case "UpdateLeft": {
        if (result._tag === "Left") {
          result = E.left(left.patch(head.patch, result.left))
        }
        patches = tail
        break
      }
      case "UpdateRight": {
        if (result._tag === "Right") {
          result = E.right(right.patch(head.patch, result.right))
        }
        patches = tail
        break
      }
      case "SetLeft": {
        result = E.left(head.value)
        patches = tail
        break
      }
      case "SetRight": {
        result = E.right(head.value)
        patches = tail
        break
      }
    }
  }
  return result
})
