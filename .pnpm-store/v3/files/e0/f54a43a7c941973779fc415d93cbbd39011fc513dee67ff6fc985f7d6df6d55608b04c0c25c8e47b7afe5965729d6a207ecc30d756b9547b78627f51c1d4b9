import type { Chunk } from "@effect/data/Chunk"
import type { Context } from "@effect/data/Context"
import type * as D from "@effect/data/Differ"
import * as ChunkPatch from "@effect/data/Differ/ChunkPatch"
import * as ContextPatch from "@effect/data/Differ/ContextPatch"
import * as HashMapPatch from "@effect/data/Differ/HashMapPatch"
import * as HashSetPatch from "@effect/data/Differ/HashSetPatch"
import * as OrPatch from "@effect/data/Differ/OrPatch"
import type { Either } from "@effect/data/Either"
import * as Equal from "@effect/data/Equal"
import * as Dual from "@effect/data/Function"
import { constant, identity } from "@effect/data/Function"
import type { HashMap } from "@effect/data/HashMap"
import type { HashSet } from "@effect/data/HashSet"

/** @internal */
export const DifferTypeId: D.TypeId = Symbol.for("@effect/data/Differ") as D.TypeId

/** @internal */
class DifferImpl<Value, Patch> implements D.Differ<Value, Patch> {
  readonly empty: Patch
  readonly diff: (oldValue: Value, newValue: Value) => Patch
  readonly combine: (first: Patch, second: Patch) => Patch
  readonly patch: (patch: Patch, oldValue: Value) => Value
  readonly _id: D.TypeId = DifferTypeId
  readonly _P: (_: Patch) => Patch = identity
  readonly _V: (_: Value) => Value = identity
  constructor(params: {
    empty: Patch
    diff: (oldValue: Value, newValue: Value) => Patch
    combine: (first: Patch, second: Patch) => Patch
    patch: (patch: Patch, oldValue: Value) => Value
  }) {
    this.empty = params.empty
    this.diff = params.diff
    this.combine = params.combine
    this.patch = params.patch
  }
}

/** @internal */
export const make = <Value, Patch>(params: {
  readonly empty: Patch
  readonly diff: (oldValue: Value, newValue: Value) => Patch
  readonly combine: (first: Patch, second: Patch) => Patch
  readonly patch: (patch: Patch, oldValue: Value) => Value
}): D.Differ<Value, Patch> => new DifferImpl(params)

/** @internal */
export const environment = <A>(): D.Differ<Context<A>, ContextPatch.ContextPatch<A, A>> =>
  make({
    empty: ContextPatch.empty(),
    combine: (first, second) => ContextPatch.combine(second)(first),
    diff: (oldValue, newValue) => ContextPatch.diff(oldValue, newValue),
    patch: (patch, oldValue) => ContextPatch.patch(oldValue)(patch)
  })

/** @internal */
export const chunk = <Value, Patch>(
  differ: D.Differ<Value, Patch>
): D.Differ<Chunk<Value>, ChunkPatch.ChunkPatch<Value, Patch>> =>
  make({
    empty: ChunkPatch.empty(),
    combine: (first, second) => ChunkPatch.combine(second)(first),
    diff: (oldValue, newValue) => ChunkPatch.diff(oldValue, newValue, differ),
    patch: (patch, oldValue) => ChunkPatch.patch(oldValue, differ)(patch)
  })

/** @internal */
export const hashMap = <Key, Value, Patch>(
  differ: D.Differ<Value, Patch>
): D.Differ<HashMap<Key, Value>, HashMapPatch.HashMapPatch<Key, Value, Patch>> =>
  make({
    empty: HashMapPatch.empty(),
    combine: (first, second) => HashMapPatch.combine(second)(first),
    diff: (oldValue, newValue) => HashMapPatch.diff(oldValue, newValue, differ),
    patch: (patch, oldValue) => HashMapPatch.patch(oldValue, differ)(patch)
  })

/** @internal */
export const hashSet = <Value>(): D.Differ<HashSet<Value>, HashSetPatch.HashSetPatch<Value>> =>
  make({
    empty: HashSetPatch.empty(),
    combine: (first, second) => HashSetPatch.combine(second)(first),
    diff: (oldValue, newValue) => HashSetPatch.diff(oldValue, newValue),
    patch: (patch, oldValue) => HashSetPatch.patch(oldValue)(patch)
  })

/** @internal */
export const orElseResult = Dual.dual<
  <Value2, Patch2>(that: D.Differ<Value2, Patch2>) => <Value, Patch>(
    self: D.Differ<Value, Patch>
  ) => D.Differ<Either<Value, Value2>, OrPatch.OrPatch<Value, Value2, Patch, Patch2>>,
  <Value, Patch, Value2, Patch2>(
    self: D.Differ<Value, Patch>,
    that: D.Differ<Value2, Patch2>
  ) => D.Differ<Either<Value, Value2>, OrPatch.OrPatch<Value, Value2, Patch, Patch2>>
>(2, (self, that) =>
  make({
    empty: OrPatch.empty(),
    combine: (first, second) => OrPatch.combine(second)(first),
    diff: (oldValue, newValue) => OrPatch.diff(oldValue, newValue, self, that),
    patch: (patch, oldValue) => OrPatch.patch(oldValue, self, that)(patch)
  }))

/** @internal */
export const transform = Dual.dual<
  <Value, Value2>(
    f: (value: Value) => Value2,
    g: (value: Value2) => Value
  ) => <Patch>(self: D.Differ<Value, Patch>) => D.Differ<Value2, Patch>,
  <Value, Patch, Value2>(
    self: D.Differ<Value, Patch>,
    f: (value: Value) => Value2,
    g: (value: Value2) => Value
  ) => D.Differ<Value2, Patch>
>(3, (self, f, g) =>
  make({
    empty: self.empty,
    combine: (first, second) => self.combine(first, second),
    diff: (oldValue, newValue) => self.diff(g(oldValue), g(newValue)),
    patch: (patch, oldValue) => f(self.patch(patch, g(oldValue)))
  }))

/** @internal */
export const update = <A>(): D.Differ<A, (a: A) => A> => updateWith((_, a) => a)

/** @internal */
export const updateWith = <A>(f: (x: A, y: A) => A): D.Differ<A, (a: A) => A> =>
  make({
    empty: identity,
    combine: (first, second) => {
      if (first === identity) {
        return second
      }
      if (second === identity) {
        return first
      }
      return (a) => second(first(a))
    },
    diff: (oldValue, newValue) => {
      if (Equal.equals(oldValue, newValue)) {
        return identity
      }
      return constant(newValue)
    },
    patch: (patch, oldValue) => f(oldValue, patch(oldValue))
  })

/** @internal */
export const zip = Dual.dual<
  <Value2, Patch2>(that: D.Differ<Value2, Patch2>) => <Value, Patch>(
    self: D.Differ<Value, Patch>
  ) => D.Differ<readonly [Value, Value2], readonly [Patch, Patch2]>,
  <Value, Patch, Value2, Patch2>(
    self: D.Differ<Value, Patch>,
    that: D.Differ<Value2, Patch2>
  ) => D.Differ<readonly [Value, Value2], readonly [Patch, Patch2]>
>(2, (self, that) =>
  make({
    empty: [self.empty, that.empty] as const,
    combine: (first, second) => [
      self.combine(first[0], second[0]),
      that.combine(first[1], second[1])
    ],
    diff: (oldValue, newValue) => [
      self.diff(oldValue[0], newValue[0]),
      that.diff(oldValue[1], newValue[1])
    ],
    patch: (patch, oldValue) => [
      self.patch(patch[0], oldValue[0]),
      that.patch(patch[1], oldValue[1])
    ]
  }))
