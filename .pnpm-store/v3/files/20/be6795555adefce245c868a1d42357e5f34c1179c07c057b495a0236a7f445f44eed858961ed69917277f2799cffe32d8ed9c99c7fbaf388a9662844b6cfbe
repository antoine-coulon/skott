/**
 * @since 1.0.0
 */
import * as Equal from "@effect/data/Equal"
import * as Dual from "@effect/data/Function"

const TypeId: unique symbol = Symbol.for("@effect/data/MutableRef") as TypeId

/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface MutableRef<T> {
  readonly _id: TypeId
  readonly _T: (_: never) => T

  /** @internal */
  current: T
}

class MutableRefImpl<T> implements MutableRef<T> {
  _T: (_: never) => T = (_) => _
  _id: typeof TypeId = TypeId

  constructor(public current: T) {}

  toString() {
    return `MutableRef(${String(this.current)})`
  }

  toJSON() {
    return {
      _tag: "MutableRef",
      current: this.current
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
export const make = <T>(value: T): MutableRef<T> => new MutableRefImpl(value)

/**
 * @since 1.0.0
 * @category general
 */
export const compareAndSet: {
  <T>(oldValue: T, newValue: T): (self: MutableRef<T>) => boolean
  <T>(self: MutableRef<T>, oldValue: T, newValue: T): boolean
} = Dual.dual<
  <T>(oldValue: T, newValue: T) => (self: MutableRef<T>) => boolean,
  <T>(self: MutableRef<T>, oldValue: T, newValue: T) => boolean
>(3, (self, oldValue, newValue) => {
  if (Equal.equals(oldValue, self.current)) {
    self.current = newValue
    return true
  }
  return false
})

/**
 * @since 1.0.0
 * @category numeric
 */
export const decrement = (self: MutableRef<number>): MutableRef<number> => update(self, (n) => n - 1)

/**
 * @since 1.0.0
 * @category numeric
 */
export const decrementAndGet = (self: MutableRef<number>): number => updateAndGet(self, (n) => n - 1)

/**
 * @since 1.0.0
 * @category general
 */
export const get = <T>(self: MutableRef<T>): T => self.current

/**
 * @since 1.0.0
 * @category numeric
 */
export const getAndDecrement = (self: MutableRef<number>): number => getAndUpdate(self, (n) => n - 1)

/**
 * @since 1.0.0
 * @category numeric
 */
export const getAndIncrement = (self: MutableRef<number>): number => getAndUpdate(self, (n) => n + 1)

/**
 * @since 1.0.0
 * @category general
 */
export const getAndSet: {
  <T>(value: T): (self: MutableRef<T>) => T
  <T>(self: MutableRef<T>, value: T): T
} = Dual.dual<
  <T>(value: T) => (self: MutableRef<T>) => T,
  <T>(self: MutableRef<T>, value: T) => T
>(2, (self, value) => {
  const ret = self.current
  self.current = value
  return ret
})

/**
 * @since 1.0.0
 * @category general
 */
export const getAndUpdate: {
  <T>(f: (value: T) => T): (self: MutableRef<T>) => T
  <T>(self: MutableRef<T>, f: (value: T) => T): T
} = Dual.dual<
  <T>(f: (value: T) => T) => (self: MutableRef<T>) => T,
  <T>(self: MutableRef<T>, f: (value: T) => T) => T
>(2, (self, f) => getAndSet(self, f(get(self))))

/**
 * @since 1.0.0
 * @category numeric
 */
export const increment = (self: MutableRef<number>): MutableRef<number> => update(self, (n) => n + 1)

/**
 * @since 1.0.0
 * @category numeric
 */
export const incrementAndGet = (self: MutableRef<number>): number => updateAndGet(self, (n) => n + 1)

/**
 * @since 1.0.0
 * @category general
 */
export const set: {
  <T>(value: T): (self: MutableRef<T>) => MutableRef<T>
  <T>(self: MutableRef<T>, value: T): MutableRef<T>
} = Dual.dual<
  <T>(value: T) => (self: MutableRef<T>) => MutableRef<T>,
  <T>(self: MutableRef<T>, value: T) => MutableRef<T>
>(2, (self, value) => {
  self.current = value
  return self
})

/**
 * @since 1.0.0
 * @category general
 */
export const setAndGet: {
  <T>(value: T): (self: MutableRef<T>) => T
  <T>(self: MutableRef<T>, value: T): T
} = Dual.dual<
  <T>(value: T) => (self: MutableRef<T>) => T,
  <T>(self: MutableRef<T>, value: T) => T
>(2, (self, value) => {
  self.current = value
  return self.current
})

/**
 * @since 1.0.0
 * @category general
 */
export const update: {
  <T>(f: (value: T) => T): (self: MutableRef<T>) => MutableRef<T>
  <T>(self: MutableRef<T>, f: (value: T) => T): MutableRef<T>
} = Dual.dual<
  <T>(f: (value: T) => T) => (self: MutableRef<T>) => MutableRef<T>,
  <T>(self: MutableRef<T>, f: (value: T) => T) => MutableRef<T>
>(2, (self, f) => set(self, f(get(self))))

/**
 * @since 1.0.0
 * @category general
 */
export const updateAndGet: {
  <T>(f: (value: T) => T): (self: MutableRef<T>) => T
  <T>(self: MutableRef<T>, f: (value: T) => T): T
} = Dual.dual<
  <T>(f: (value: T) => T) => (self: MutableRef<T>) => T,
  <T>(self: MutableRef<T>, f: (value: T) => T) => T
>(2, (self, f) => setAndGet(self, f(get(self))))

/**
 * @since 1.0.0
 * @category boolean
 */
export const toggle = (self: MutableRef<boolean>): MutableRef<boolean> => update(self, (_) => !_)
