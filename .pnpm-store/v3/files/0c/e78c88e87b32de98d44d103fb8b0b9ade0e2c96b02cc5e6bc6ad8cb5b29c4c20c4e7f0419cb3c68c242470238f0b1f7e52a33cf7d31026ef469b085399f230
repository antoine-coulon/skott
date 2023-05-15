/**
 * @since 1.0.0
 */
import * as Dual from "@effect/data/Function"
import * as HashMap from "@effect/data/HashMap"
import * as MutableRef from "@effect/data/MutableRef"
import * as Option from "@effect/data/Option"

const TypeId: unique symbol = Symbol.for("@effect/data/MutableHashMap") as TypeId

/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface MutableHashMap<K, V> extends Iterable<readonly [K, V]> {
  readonly _id: TypeId

  /** @internal */
  readonly backingMap: MutableRef.MutableRef<HashMap.HashMap<K, V>>
}

/** @internal */
class MutableHashMapImpl<K, V> implements MutableHashMap<K, V> {
  readonly _id: TypeId = TypeId

  readonly backingMap = MutableRef.make(HashMap.empty());

  [Symbol.iterator](): Iterator<readonly [K, V]> {
    return this.backingMap.current[Symbol.iterator]()
  }

  toString() {
    return `MutableHashMap(${Array.from(this).map(([k, v]) => `[${String(k)}, ${String(v)}]`).join(", ")})`
  }

  toJSON() {
    return {
      _tag: "MutableHashMap",
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
export const empty = <K = never, V = never>(): MutableHashMap<K, V> => new MutableHashMapImpl<K, V>()

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: <Entries extends Array<readonly [any, any]>>(
  ...entries: Entries
) => MutableHashMap<
  Entries[number] extends readonly [infer K, any] ? K : never,
  Entries[number] extends readonly [any, infer V] ? V : never
> = (...entries) => fromIterable(entries)

/**
 * @since 1.0.0
 * @category conversions
 */
export const fromIterable = <K, V>(entries: Iterable<readonly [K, V]>): MutableHashMap<K, V> => {
  const map = empty<K, V>()
  for (const entry of entries) {
    set(map, entry[0], entry[1])
  }
  return map
}

/**
 * @since 1.0.0
 * @category elements
 */
export const get: {
  <K>(key: K): <V>(self: MutableHashMap<K, V>) => Option.Option<V>
  <K, V>(self: MutableHashMap<K, V>, key: K): Option.Option<V>
} = Dual.dual<
  <K>(key: K) => <V>(self: MutableHashMap<K, V>) => Option.Option<V>,
  <K, V>(self: MutableHashMap<K, V>, key: K) => Option.Option<V>
>(2, <K, V>(self: MutableHashMap<K, V>, key: K) => HashMap.get(self.backingMap.current, key))

/**
 * @since 1.0.0
 * @category elements
 */
export const has: {
  <K>(key: K): <V>(self: MutableHashMap<K, V>) => boolean
  <K, V>(self: MutableHashMap<K, V>, key: K): boolean
} = Dual.dual<
  <K>(key: K) => <V>(self: MutableHashMap<K, V>) => boolean,
  <K, V>(self: MutableHashMap<K, V>, key: K) => boolean
>(2, (self, key) => Option.isSome(get(self, key)))

/**
 * Updates the value of the specified key within the `MutableHashMap` if it exists.
 *
 * @since 1.0.0
 * @category mutations
 */
export const modify: {
  <K, V>(key: K, f: (v: V) => V): (self: MutableHashMap<K, V>) => MutableHashMap<K, V>
  <K, V>(self: MutableHashMap<K, V>, key: K, f: (v: V) => V): MutableHashMap<K, V>
} = Dual.dual<
  <K, V>(key: K, f: (v: V) => V) => (self: MutableHashMap<K, V>) => MutableHashMap<K, V>,
  <K, V>(self: MutableHashMap<K, V>, key: K, f: (v: V) => V) => MutableHashMap<K, V>
>(
  3,
  <K, V>(self: MutableHashMap<K, V>, key: K, f: (v: V) => V) => {
    MutableRef.update(self.backingMap, HashMap.modify(key, f))
    return self
  }
)

/**
 * Set or remove the specified key in the `MutableHashMap` using the specified
 * update function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const modifyAt: {
  <K, V>(key: K, f: (value: Option.Option<V>) => Option.Option<V>): (self: MutableHashMap<K, V>) => MutableHashMap<K, V>
  <K, V>(self: MutableHashMap<K, V>, key: K, f: (value: Option.Option<V>) => Option.Option<V>): MutableHashMap<K, V>
} = Dual.dual<
  <K, V>(
    key: K,
    f: (value: Option.Option<V>) => Option.Option<V>
  ) => (self: MutableHashMap<K, V>) => MutableHashMap<K, V>,
  <K, V>(
    self: MutableHashMap<K, V>,
    key: K,
    f: (value: Option.Option<V>) => Option.Option<V>
  ) => MutableHashMap<K, V>
>(3, (self, key, f) => {
  const result = f(get(self, key))
  if (Option.isSome(result)) {
    set(self, key, result.value)
  } else {
    remove(self, key)
  }
  return self
})

/**
 * @since 1.0.0
 * @category mutations
 */
export const remove: {
  <K>(key: K): <V>(self: MutableHashMap<K, V>) => MutableHashMap<K, V>
  <K, V>(self: MutableHashMap<K, V>, key: K): MutableHashMap<K, V>
} = Dual.dual<
  <K>(key: K) => <V>(self: MutableHashMap<K, V>) => MutableHashMap<K, V>,
  <K, V>(self: MutableHashMap<K, V>, key: K) => MutableHashMap<K, V>
>(2, <K, V>(self: MutableHashMap<K, V>, key: K) => {
  MutableRef.update(self.backingMap, HashMap.remove(key))
  return self
})

/**
 * @since 1.0.0
 * @category mutations
 */
export const set: {
  <K, V>(key: K, value: V): (self: MutableHashMap<K, V>) => MutableHashMap<K, V>
  <K, V>(self: MutableHashMap<K, V>, key: K, value: V): MutableHashMap<K, V>
} = Dual.dual<
  <K, V>(key: K, value: V) => (self: MutableHashMap<K, V>) => MutableHashMap<K, V>,
  <K, V>(self: MutableHashMap<K, V>, key: K, value: V) => MutableHashMap<K, V>
>(3, <K, V>(self: MutableHashMap<K, V>, key: K, value: V) => {
  MutableRef.update(self.backingMap, HashMap.set(key, value))
  return self
})

/**
 * @since 1.0.0
 * @category elements
 */
export const size = <K, V>(self: MutableHashMap<K, V>): number => HashMap.size(MutableRef.get(self.backingMap))
