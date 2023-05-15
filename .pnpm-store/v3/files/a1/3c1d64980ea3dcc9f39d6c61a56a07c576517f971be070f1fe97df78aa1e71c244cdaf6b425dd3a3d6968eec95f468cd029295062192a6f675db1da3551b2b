/**
 * @since 1.0.0
 */
import * as Dual from "@effect/data/Function"
import * as MutableHashMap from "@effect/data/MutableHashMap"

const TypeId: unique symbol = Symbol.for("@effect/data/MutableHashSet") as TypeId

/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface MutableHashSet<V> extends Iterable<V> {
  readonly _id: TypeId
  readonly _V: (_: V) => V

  /** @internal */
  readonly keyMap: MutableHashMap.MutableHashMap<V, boolean>
}

/** @internal */
class MutableHashSetImpl<V> implements MutableHashSet<V> {
  readonly _id: TypeId = TypeId
  readonly _V: (_: V) => V = (_) => _

  constructor(readonly keyMap: MutableHashMap.MutableHashMap<V, boolean>) {}

  [Symbol.iterator](): Iterator<V> {
    return Array.from(this.keyMap).map(([_]) => _)[Symbol.iterator]()
  }

  toString() {
    return `MutableHashSet(${Array.from(this).map(String).join(", ")})`
  }

  toJSON() {
    return {
      _tag: "MutableHashSet",
      values: Array.from(this)
    }
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON()
  }
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const empty = <K = never>(): MutableHashSet<K> => new MutableHashSetImpl(MutableHashMap.empty())

/**
 * @since 1.0.0
 * @category constructors
 */
export const fromIterable = <K = never>(keys: Iterable<K>): MutableHashSet<K> =>
  new MutableHashSetImpl(MutableHashMap.fromIterable(Array.from(keys).map((k) => [k, true])))

/**
 * @since 1.0.0
 * @category constructors
 */
export const make = <Keys extends ReadonlyArray<unknown>>(
  ...keys: Keys
): MutableHashSet<Keys[number]> => fromIterable(keys)

/**
 * @since 1.0.0
 * @category elements
 */
export const add: {
  <V>(key: V): (self: MutableHashSet<V>) => MutableHashSet<V>
  <V>(self: MutableHashSet<V>, key: V): MutableHashSet<V>
} = Dual.dual<
  <V>(key: V) => (self: MutableHashSet<V>) => MutableHashSet<V>,
  <V>(self: MutableHashSet<V>, key: V) => MutableHashSet<V>
>(2, (self, key) => (MutableHashMap.set(self.keyMap, key, true), self))

/**
 * @since 1.0.0
 * @category elements
 */
export const has: {
  <V>(key: V): (self: MutableHashSet<V>) => boolean
  <V>(self: MutableHashSet<V>, key: V): boolean
} = Dual.dual<
  <V>(key: V) => (self: MutableHashSet<V>) => boolean,
  <V>(self: MutableHashSet<V>, key: V) => boolean
>(2, (self, key) => MutableHashMap.has(self.keyMap, key))

/**
 * @since 1.0.0
 * @category elements
 */
export const remove: {
  <V>(key: V): (self: MutableHashSet<V>) => MutableHashSet<V>
  <V>(self: MutableHashSet<V>, key: V): MutableHashSet<V>
} = Dual.dual<
  <V>(key: V) => (self: MutableHashSet<V>) => MutableHashSet<V>,
  <V>(self: MutableHashSet<V>, key: V) => MutableHashSet<V>
>(2, (self, key) => (MutableHashMap.remove(self.keyMap, key), self))

/**
 * @since 1.0.0
 * @category elements
 */
export const size = <V>(self: MutableHashSet<V>): number => MutableHashMap.size(self.keyMap)
