import * as Chunk from "@effect/data/Chunk"
import type { Context, Tag } from "@effect/data/Context"
import type * as CP from "@effect/data/Differ/ContextPatch"
import * as Equal from "@effect/data/Equal"
import * as Dual from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"
import { ContextImpl } from "@effect/data/internal/Context"

/** @internal */
export const ContextPatchTypeId: CP.TypeId = Symbol.for(
  "@effect/data/Differ/ContextPatch"
) as CP.TypeId

function variance<A, B>(a: A): B {
  return a as unknown as B
}

/** @internal */
export class Empty<Input, Output> implements CP.ContextPatch<Input, Output> {
  readonly _tag = "Empty"
  readonly _Input: (_: Input) => void = variance
  readonly _Output: (_: never) => Output = variance
  readonly _id: CP.TypeId = ContextPatchTypeId;

  [Hash.symbol]() {
    return Hash.string(`ContextPatch(Empty)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id
  }
}

/** @internal */
export class AndThen<Input, Output, Output2> implements CP.ContextPatch<Input, Output2> {
  readonly _tag = "AndThen"
  readonly _id: CP.TypeId = ContextPatchTypeId
  readonly _Input: (_: Input) => void = variance
  readonly _Output: (_: never) => Output2 = variance
  constructor(
    readonly first: CP.ContextPatch<Input, Output>,
    readonly second: CP.ContextPatch<Output, Output2>
  ) {}

  [Hash.symbol]() {
    return Hash.string(`ContextPatch(AndThen)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id &&
      Equal.equals(this.first, (that as this).first) &&
      Equal.equals(this.second, (that as this).second)
  }
}

/** @internal */
export class AddService<Env, T> implements CP.ContextPatch<Env, Env | T> {
  readonly _tag = "AddService"
  readonly _id: CP.TypeId = ContextPatchTypeId
  readonly _Input: (_: Env) => void = variance
  readonly _Output: (_: never) => Env | T = variance
  constructor(readonly tag: Tag<T>, readonly service: T) {}

  [Hash.symbol]() {
    return Hash.string(`ContextPatch(AddService)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id &&
      Equal.equals(this.tag, (that as this).tag) &&
      Equal.equals(this.service, (that as this).service)
  }
}

/** @internal */
export class RemoveService<Env, T> implements CP.ContextPatch<Env | T, Env> {
  readonly _tag = "RemoveService"
  readonly _id: CP.TypeId = ContextPatchTypeId
  readonly _Input: (_: Env | T) => void = variance
  readonly _Output: (_: never) => Env = variance
  constructor(readonly tag: Tag<T>) {}

  [Hash.symbol]() {
    return Hash.string(`ContextPatch(RemoveService)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id &&
      Equal.equals(this.tag, (that as this).tag)
  }
}

/** @internal */
export class UpdateService<Env, T> implements CP.ContextPatch<Env | T, Env | T> {
  readonly _tag = "UpdateService"
  readonly _id: CP.TypeId = ContextPatchTypeId
  readonly _Input: (_: Env | T) => void = variance
  readonly _Output: (_: never) => Env | T = variance
  constructor(
    readonly tag: Tag<T>,
    readonly update: (service: T) => T
  ) {
  }

  [Hash.symbol]() {
    return Hash.string(`ContextPatch(AndThen)`)
  }

  [Equal.symbol](that: unknown) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id &&
      "_tag" in that && that["_tag"] === this._id &&
      Equal.equals(this.tag, (that as this).tag) &&
      Equal.equals(this.update, (that as this).update)
  }
}

type Instruction =
  | Empty<any, any>
  | AndThen<any, any, any>
  | AddService<any, any>
  | RemoveService<any, any>
  | UpdateService<any, any>

/** @internal */
export const empty = <Input = never, Output = never>(): CP.ContextPatch<Input, Output> => new Empty()

/** @internal */
export const diff = <Input, Output>(
  oldValue: Context<Input>,
  newValue: Context<Output>
): CP.ContextPatch<Input, Output> => {
  const missingServices = new Map(oldValue.unsafeMap)
  let patch = empty<any, any>()
  for (const [tag, newService] of newValue.unsafeMap.entries()) {
    if (missingServices.has(tag)) {
      const old = missingServices.get(tag)!
      missingServices.delete(tag)
      if (!Equal.equals(old, newService)) {
        patch = combine(new UpdateService(tag, () => newService))(patch)
      }
    } else {
      missingServices.delete(tag)
      patch = combine(new AddService(tag, newService))(patch)
    }
  }
  for (const [tag] of missingServices.entries()) {
    patch = combine(new RemoveService(tag))(patch)
  }
  return patch
}

/** @internal */
export const combine = Dual.dual<
  <Output, Output2>(
    that: CP.ContextPatch<Output, Output2>
  ) => <Input>(
    self: CP.ContextPatch<Input, Output>
  ) => CP.ContextPatch<Input, Output2>,
  <Input, Output, Output2>(
    self: CP.ContextPatch<Input, Output>,
    that: CP.ContextPatch<Output, Output2>
  ) => CP.ContextPatch<Input, Output2>
>(2, (self, that) => new AndThen(self, that))

/** @internal */
export const patch = Dual.dual<
  <Input>(
    context: Context<Input>
  ) => <Output>(
    self: CP.ContextPatch<Input, Output>
  ) => Context<Output>,
  <Input, Output>(
    self: CP.ContextPatch<Input, Output>,
    context: Context<Input>
  ) => Context<Output>
>(2, <Input, Output>(self: CP.ContextPatch<Input, Output>, context: Context<Input>) => {
  let wasServiceUpdated = false
  let patches: Chunk.Chunk<CP.ContextPatch<unknown, unknown>> = Chunk.of(
    self as CP.ContextPatch<unknown, unknown>
  )
  const updatedContext: Map<Tag<any>, unknown> = new Map(context.unsafeMap)
  while (Chunk.isNonEmpty(patches)) {
    const head: Instruction = Chunk.headNonEmpty(patches) as Instruction
    const tail = Chunk.tailNonEmpty(patches)
    switch (head._tag) {
      case "Empty": {
        patches = tail
        break
      }
      case "AddService": {
        updatedContext.set(head.tag, head.service)
        patches = tail
        break
      }
      case "AndThen": {
        patches = Chunk.prepend(Chunk.prepend(tail, head.second), head.first)
        break
      }
      case "RemoveService": {
        updatedContext.delete(head.tag)
        patches = tail
        break
      }
      case "UpdateService": {
        updatedContext.set(head.tag, head.update(updatedContext.get(head.tag)))
        wasServiceUpdated = true
        patches = tail
        break
      }
    }
  }
  if (!wasServiceUpdated) {
    return new ContextImpl(updatedContext) as Context<Output>
  }
  const map = new Map()
  for (const [tag] of context.unsafeMap) {
    if (updatedContext.has(tag)) {
      map.set(tag, updatedContext.get(tag))
      updatedContext.delete(tag)
    }
  }
  for (const [tag, s] of updatedContext) {
    map.set(tag, s)
  }
  return new ContextImpl(map) as Context<Output>
})
